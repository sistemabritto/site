-- Intake can be committed even when EvoCRM is unavailable. The worker owns
-- delivery; the browser never receives database or CRM credentials.
create table public.funnel_applications (
  id uuid primary key,
  company_key text not null,
  funnel_key text not null,
  lead_name text not null,
  lead_email text not null,
  lead_phone text not null,
  session_id text,
  answers jsonb not null,
  attribution jsonb not null default '{}'::jsonb,
  consent_version text not null,
  consent_at timestamptz not null,
  routing_decision text not null check (routing_decision in ('session_checkout', 'session_details', 'low_ticket_waitlist')),
  submitted_at timestamptz not null default now(),
  crm_contact_id text,
  crm_opportunity_id text,
  crm_synced_at timestamptz,
  constraint funnel_applications_company_key_check check (company_key ~ '^[a-z0-9-]+$'),
  constraint funnel_applications_funnel_key_check check (funnel_key ~ '^[a-z0-9-]+$')
);

create index funnel_applications_company_submitted_idx
  on public.funnel_applications (company_key, submitted_at desc);
create index funnel_applications_email_idx
  on public.funnel_applications (company_key, lower(lead_email));

create table public.funnel_integration_outbox (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.funnel_applications(id),
  company_key text not null,
  event_type text not null check (event_type in ('application_submitted')),
  idempotency_key text not null unique,
  state text not null default 'pending' check (state in ('pending', 'processing', 'delivered', 'retry', 'dead')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  claimed_at timestamptz,
  delivered_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

create index funnel_integration_outbox_claim_idx
  on public.funnel_integration_outbox (state, next_attempt_at, created_at);

alter table public.funnel_applications enable row level security;
alter table public.funnel_integration_outbox enable row level security;
revoke all on public.funnel_applications, public.funnel_integration_outbox from anon, authenticated;
grant select, insert, update, delete on public.funnel_applications, public.funnel_integration_outbox to service_role;
-- No browser role has access to application answers or contact details.

-- PostgREST invokes this as one database transaction. A retry with the same
-- UUID is safe; changing the payload under an existing UUID is rejected.
create function public.record_case_application(
  p_id uuid,
  p_name text,
  p_email text,
  p_phone text,
  p_session_id text,
  p_answers jsonb,
  p_attribution jsonb,
  p_decision text
) returns uuid
language plpgsql
set search_path = ''
as $$
declare
  existing public.funnel_applications%rowtype;
begin
  insert into public.funnel_applications
    (id, company_key, funnel_key, lead_name, lead_email, lead_phone, session_id, answers, attribution, consent_version, consent_at, routing_decision)
  values
    (p_id, 'sistema-britto', 'sessao-start-caso-crm', p_name, p_email, p_phone, p_session_id,
     p_answers, coalesce(p_attribution, '{}'::jsonb), 'crm-case-v1', now(), p_decision)
  on conflict (id) do nothing;

  select * into existing from public.funnel_applications where id = p_id;
  if existing.id is null or existing.company_key <> 'sistema-britto'
     or existing.funnel_key <> 'sessao-start-caso-crm'
     or existing.lead_email <> p_email or existing.lead_phone <> p_phone
     or existing.answers <> p_answers or existing.routing_decision <> p_decision then
    raise exception 'submission_id_conflict' using errcode = '23505';
  end if;

  insert into public.funnel_integration_outbox
    (application_id, company_key, event_type, idempotency_key)
  values
    (p_id, 'sistema-britto', 'application_submitted', 'crm:application:' || p_id::text)
  on conflict (idempotency_key) do nothing;
  return p_id;
end;
$$;

revoke all on function public.record_case_application(uuid, text, text, text, text, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.record_case_application(uuid, text, text, text, text, jsonb, jsonb, text) to service_role;

-- Claiming and updating in one statement avoids two workers taking the same
-- job. A crashed claim can be reclaimed after ten minutes.
create function public.claim_funnel_integration_outbox(p_limit integer default 20)
returns setof public.funnel_integration_outbox
language sql
set search_path = ''
as $$
  update public.funnel_integration_outbox as target
  set state = 'processing', claimed_at = now(), attempts = target.attempts + 1
  from (
    select id from public.funnel_integration_outbox
    where (state in ('pending', 'retry') and next_attempt_at <= now())
       or (state = 'processing' and claimed_at < now() - interval '10 minutes')
    order by created_at
    limit least(greatest(p_limit, 1), 20)
    for update skip locked
  ) as candidate
  where target.id = candidate.id
  returning target.*;
$$;

revoke all on function public.claim_funnel_integration_outbox(integer) from public, anon, authenticated;
grant execute on function public.claim_funnel_integration_outbox(integer) to service_role;
