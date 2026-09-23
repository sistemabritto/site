import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

type Application = {
  id: string; company_key: string; lead_name: string; lead_email: string; lead_phone: string;
  answers: Record<string, string>; attribution: Record<string, string>; routing_decision: string;
};
type Job = { id: string; application_id: string; attempts: number };
type CrmItem = { id: string; contact_id?: string; completed_at?: string | null; custom_fields?: Record<string, unknown> };

const supabase = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "", {
  auth: { persistSession: false, autoRefreshToken: false },
});
const secret = Deno.env.get("FULFILLMENT_WORKER_SECRET") || "";
const crmUrl = (Deno.env.get("EVO_CRM_URL") || "").replace(/\/$/, "");
const crmToken = Deno.env.get("EVO_CRM_TOKEN") || "";
const pipelineId = "57599c7e-e678-4807-ade8-07efca578616";
const firstStageId = "a8814c54-7668-434b-ac1b-52d7bb655528";
const maxAttempts = 6;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

async function crm(method: string, path: string, body?: Record<string, unknown>) {
  if (!crmUrl || !crmToken) throw new Error("crm_not_configured");
  const response = await fetch(`${crmUrl}${path}`, {
    method,
    headers: { "content-type": "application/json", api_access_token: crmToken },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(12000),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`crm_http_${response.status}`);
  return payload;
}

function asItems(payload: any): CrmItem[] {
  const data = payload?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.payload)) return data.payload;
  throw new Error("crm_items_shape_unexpected");
}

function crmFields(application: Application, previous: Record<string, unknown> = {}) {
  const ids = Array.isArray(previous.application_ids) ? previous.application_ids.filter((id: unknown): id is string => typeof id === "string") : [];
  if (!ids.includes(application.id)) ids.push(application.id);
  return {
    ...previous,
    source: "sessao-start-caso-crm-aplicacao",
    company_key: application.company_key,
    application_id: application.id,
    application_ids: ids,
    routing_decision: application.routing_decision,
    business_summary: String(application.answers.business || "").slice(0, 300),
    desired_result_summary: String(application.answers.desiredResult || "").slice(0, 300),
    utm_source: application.attribution.utm_source || "",
    utm_medium: application.attribution.utm_medium || "",
    utm_campaign: application.attribution.utm_campaign || "",
    application_admin_url: `https://www.sistemabritto.com.br/admin?application_id=${application.id}`,
  };
}

async function findContact(application: Application): Promise<string | null> {
  const phone = application.lead_phone.replace(/\D/g, "");
  for (const query of [application.lead_phone, application.lead_email]) {
    const payload = await crm("GET", `/api/v1/contacts/search?q=${encodeURIComponent(query)}`);
    const contacts = Array.isArray(payload.data) ? payload.data : [];
    const contact = contacts.find((row: any) =>
      String(row.phone_number || "").replace(/\D/g, "") === phone ||
      String(row.email || "").toLowerCase() === application.lead_email.toLowerCase());
    if (contact?.id) return contact.id;
  }
  return null;
}

async function sync(application: Application): Promise<{ contactId: string; itemId: string }> {
  const contactId = await findContact(application);
  const items = asItems(await crm("GET", `/api/v1/pipelines/${pipelineId}/pipeline_items?status=all`));
  const bySubmission = items.find(item => item.custom_fields?.application_id === application.id ||
    (Array.isArray(item.custom_fields?.application_ids) && item.custom_fields.application_ids.includes(application.id)));
  if (bySubmission) return { contactId: bySubmission.contact_id || contactId || "", itemId: bySubmission.id };

  const active = contactId && items.find(item => item.contact_id === contactId && !item.completed_at);
  if (active) {
    const updated = await crm("PATCH", `/api/v1/pipelines/${pipelineId}/pipeline_items/${active.id}`, {
      custom_fields: crmFields(application, active.custom_fields),
    });
    if (!updated?.data?.id) throw new Error("crm_update_not_confirmed");
    return { contactId, itemId: active.id };
  }

  if (contactId) {
    const created = await crm("POST", `/api/v1/pipelines/${pipelineId}/pipeline_items`, {
      type: "contact", item_id: contactId, pipeline_stage_id: firstStageId,
      custom_fields: crmFields(application),
    });
    if (!created?.data?.id) throw new Error("crm_item_not_confirmed");
    return { contactId, itemId: created.data.id };
  }

  const created = await crm("POST", "/public/api/v1/leads", {
    contact: { name: application.lead_name, email: application.lead_email, phone_number: application.lead_phone },
    deal: { pipeline_id: pipelineId, stage_id: firstStageId, title: `Aplicação CRM · ${application.lead_name}` },
    custom_fields: crmFields(application),
    metadata: { form_slug: "sessao-start-caso-crm" },
  });
  if (!created?.success || !created?.lead_id || !created?.deal_id) throw new Error("crm_lead_not_confirmed");
  return { contactId: created.lead_id, itemId: created.deal_id };
}

async function retry(job: Job, error: unknown) {
  const message = error instanceof Error ? error.message.slice(0, 200) : "unknown_error";
  const terminal = job.attempts >= maxAttempts;
  const delayMinutes = Math.min(2 ** job.attempts, 60);
  await supabase.from("funnel_integration_outbox").update({
    state: terminal ? "dead" : "retry", last_error: message, claimed_at: null,
    next_attempt_at: new Date(Date.now() + delayMinutes * 60000).toISOString(),
  }).eq("id", job.id).eq("state", "processing");
  return terminal ? "dead" : "retry";
}

Deno.serve(async request => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!secret || request.headers.get("x-worker-secret") !== secret) return json({ error: "unauthorized" }, 401);

  const { data: jobs, error } = await supabase.rpc("claim_funnel_integration_outbox", { p_limit: 5 });
  if (error) return json({ error: "outbox_claim_failed" }, 500);

  const result = { claimed: 0, delivered: 0, retry: 0, dead: 0 };
  for (const job of (jobs || []) as Job[]) {
    result.claimed++;
    try {
      const { data: application, error: readError } = await supabase.from("funnel_applications")
        .select("id,company_key,lead_name,lead_email,lead_phone,answers,attribution,routing_decision")
        .eq("id", job.application_id).single();
      if (readError || !application) throw new Error("application_not_found");
      const ids = await sync(application as Application);
      const { error: appError } = await supabase.from("funnel_applications").update({
        crm_contact_id: ids.contactId, crm_opportunity_id: ids.itemId, crm_synced_at: new Date().toISOString(),
      }).eq("id", job.application_id);
      if (appError) throw new Error("application_link_failed");
      const { error: doneError } = await supabase.from("funnel_integration_outbox").update({
        state: "delivered", delivered_at: new Date().toISOString(), claimed_at: null, last_error: null,
      }).eq("id", job.id).eq("state", "processing");
      if (doneError) throw new Error("outbox_delivery_mark_failed");
      result.delivered++;
    } catch (caught) {
      const state = await retry(job, caught);
      result[state]++;
    }
  }
  return json({ ok: true, ...result });
});
