-- Deploy the function and confirm its secret before applying this schedule.
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

do $$
declare existing_job_id bigint;
begin
  select jobid into existing_job_id from cron.job
  where jobname = 'funnel-crm-worker-every-minute' limit 1;
  if existing_job_id is not null then
    perform cron.unschedule(existing_job_id);
  end if;
end $$;

select cron.schedule(
  'funnel-crm-worker-every-minute', '* * * * *',
  $cron$
    select net.http_post(
      url := 'https://mnzpcilebqqgbqdgwtlw.supabase.co/functions/v1/funnel-crm-worker',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-worker-secret', (
          select decrypted_secret from vault.decrypted_secrets
          where name = 'fulfillment_worker_secret'
          order by created_at desc limit 1
        )
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 30000
    );
  $cron$
);
