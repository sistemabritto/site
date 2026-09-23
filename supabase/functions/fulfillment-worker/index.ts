import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

type Purchase = {
  id: string;
  provider: string;
  provider_checkout_id: string;
  product_name: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  amount_brl: number | null;
  utm: Record<string, unknown> | null;
};

type FulfillmentJob = {
  id: string;
  purchase_id: string;
  job_type: string;
  channel: string;
  attempts: number;
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const workerSecret = Deno.env.get("FULFILLMENT_WORKER_SECRET") || "";
const evolutionUrl = (Deno.env.get("EVOLUTION_API_URL") || "").replace(/\/$/, "");
const evolutionToken = Deno.env.get("EVOLUTION_FELIPE_TOKEN") || "";
// crm.workflowapi.com.br é a SPA; somente evoapi responde JSON da API.
const crmUrl = (Deno.env.get("EVO_CRM_API_URL") || "https://evoapi.workflowapi.com.br").replace(/\/$/, "");
const crmToken = Deno.env.get("EVO_CRM_TOKEN") || "";
const crmPipelineId = Deno.env.get("EVO_CRM_PIPELINE_ID") || "eb72af5c-28f7-4948-ae50-9c81922d161e";
const crmWonStageId = Deno.env.get("EVO_CRM_WON_STAGE_ID") || "f6229e34-46c2-4a10-890b-df5969489033";
const crmClassPipelineId = "2b861a13-4809-45c7-ba6f-fd8be6e050ee";
const crmClassWonStageId = "d6d2860d-d724-4aba-b7bf-5a8ae811fee8";
const maxAttempts = 5;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function digits(value: string | null): string {
  return (value || "").replace(/\D/g, "");
}

function productKind(name: string): "challenge" | "session" | "crm_lesson" | "other" {
  const normalized = name.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (normalized.includes("desafio monetizar")) return "challenge";
  if (normalized.includes("sessao de arquitetura")) return "session";
  if (normalized.includes("evo crm em operacao")) return "crm_lesson";
  return "other";
}

function welcomeMessage(purchase: Purchase): string {
  const firstName = purchase.customer_name?.trim().split(/\s+/)[0];
  const greeting = firstName ? `Olá, ${firstName}!` : "Olá!";
  const kind = productKind(purchase.product_name);
  if (kind === "challenge") {
    return `${greeting} Pagamento confirmado no Desafio Monetizar com IA. A Cakto enviou o acesso para o e-mail usado na compra. Se não encontrar, confira também spam e promoções. Se precisar de ajuda, responda aqui.`;
  }
  if (kind === "session") {
    return `${greeting} Pagamento confirmado para a Sessão de Arquitetura Vibe Seller. O link para escolher o horário foi enviado ao e-mail da compra. Se precisar de ajuda, responda aqui.`;
  }
  if (kind === "crm_lesson") {
    return `${greeting} Pagamento confirmado para a aula Evo CRM em operação. Confira o acesso no e-mail usado na compra; se não chegar, responda aqui para resolvermos.`;
  }
  return `${greeting} Seu pagamento de ${purchase.product_name} foi confirmado. As instruções de acesso foram enviadas ao e-mail da compra. Se precisar de ajuda, responda aqui.`;
}

function sourceUrl(purchase: Purchase): string {
  const kind = productKind(purchase.product_name);
  if (kind === "challenge") return "https://www.sistemabritto.com.br/desafio-monetizar-com-ia";
  if (kind === "session") return "https://www.sistemabritto.com.br/implementacao-vibe-seller";
  if (kind === "crm_lesson") return "https://www.sistemabritto.com.br/aula-evo-crm-em-operacao";
  return "https://www.sistemabritto.com.br";
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value.trim().toLocaleLowerCase("pt-BR"));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sendWhatsApp(purchase: Purchase): Promise<void> {
  const number = digits(purchase.customer_phone);
  if (!number) throw new Error("customer_phone_missing");
  if (!evolutionUrl || !evolutionToken) throw new Error("evolution_not_configured");

  const response = await fetch(`${evolutionUrl}/send/text`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: evolutionToken,
      "user-agent": "SistemaBrittoFulfillment/1.0",
    },
    body: JSON.stringify({ number, text: welcomeMessage(purchase) }),
  });
  if (!response.ok) throw new Error(`evolution_http_${response.status}`);
}

function normalizedPhone(raw: string | null): string {
  let value = digits(raw);
  if (value.startsWith("55") && value.length === 13 && Number(value.slice(2, 4)) >= 31 && Number(value[5]) >= 7) {
    value = value.slice(0, 4) + value.slice(5);
  }
  return value;
}

async function crmRequest(method: string, path: string, body?: Record<string, unknown>) {
  if (!crmUrl || !crmToken) throw new Error("crm_not_configured");
  const response = await fetch(`${crmUrl}${path}`, {
    method, signal: AbortSignal.timeout(12000),
    headers: { "content-type": "application/json", api_access_token: crmToken },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => null);
  if (!payload || typeof payload !== "object") throw new Error("crm_non_json_response");
  return { ok: response.ok, status: response.status, payload };
}

function crmItems(payload: any): Array<{ id: string; contact_id?: string; completed_at?: string | null; custom_fields?: Record<string, unknown> }> {
  const data = payload?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.payload)) return data.payload;
  throw new Error("crm_items_shape_unexpected");
}

async function findCrmContact(purchase: Purchase): Promise<string | null> {
  const phone = normalizedPhone(purchase.customer_phone);
  const email = purchase.customer_email?.trim().toLowerCase() || "";
  const matches = new Set<string>();
  for (const query of [purchase.customer_phone, purchase.customer_email]) {
    if (!query) continue;
    const found = await crmRequest("GET", `/api/v1/contacts/search?q=${encodeURIComponent(query)}`);
    if (!found.ok) throw new Error(`crm_search_http_${found.status}`);
    const rows = Array.isArray((found.payload as any).data) ? (found.payload as any).data
      : Array.isArray((found.payload as any).data?.payload) ? (found.payload as any).data.payload : null;
    if (!rows) throw new Error("crm_contacts_shape_unexpected");
    for (const row of rows) {
      if ((phone && normalizedPhone(row.phone_number || null) === phone) ||
          (email && String(row.email || "").toLowerCase() === email)) {
        if (row.id) matches.add(String(row.id));
      }
    }
  }
  if (matches.size > 1) throw new Error("crm_contact_identity_conflict");
  return [...matches][0] || null;
}

async function syncCrm(purchase: Purchase): Promise<void> {
  const phone = digits(purchase.customer_phone);
  const email = purchase.customer_email?.trim() || "";
  if (!phone && !email) throw new Error("customer_contact_missing");
  if (!email) throw new Error("customer_email_missing_for_crm");

  const classPurchase = productKind(purchase.product_name) === "crm_lesson";
  const pipelineId = classPurchase ? crmClassPipelineId : crmPipelineId;
  const stageId = classPurchase ? crmClassWonStageId : crmWonStageId;
  const orderId = purchase.provider_checkout_id;
  const path = `/api/v1/pipelines/${pipelineId}/pipeline_items`;
  const getItems = async () => {
    const response = await crmRequest("GET", `${path}?status=all`);
    if (!response.ok) throw new Error(`crm_items_http_${response.status}`);
    return crmItems(response.payload);
  };
  const fields = (previous: Record<string, unknown> = {}) => {
    const ids = Array.isArray(previous.purchase_order_ids)
      ? previous.purchase_order_ids.filter((id): id is string => typeof id === "string") : [];
    if (!ids.includes(orderId)) ids.push(orderId);
    return {
      ...previous, source: previous.source || "cakto", purchase_source: "cakto",
      product: purchase.product_name,
      amount: purchase.amount_brl == null ? "" : Number(purchase.amount_brl).toFixed(2),
      provider: purchase.provider, checkout_id: orderId,
      purchase_order_id: orderId, purchase_order_ids: ids,
      utm_source: purchase.utm?.source || "",
      utm_medium: purchase.utm?.medium || "",
      utm_campaign: purchase.utm?.campaign || "",
      utm_content: purchase.utm?.content || "",
      utm_term: purchase.utm?.term || "",
      sck: purchase.utm?.sck || "",
    };
  };
  let items = await getItems();
  const hasOrder = () => items.some(item => item.custom_fields?.purchase_order_id === orderId ||
    (Array.isArray(item.custom_fields?.purchase_order_ids) && item.custom_fields.purchase_order_ids.includes(orderId)));
  if (hasOrder()) return;

  const attach = async (contactId: string) => {
    const active = items.find(item => item.contact_id === contactId && !item.completed_at);
    const result = active
      ? await crmRequest("PATCH", `${path}/${active.id}`, { pipeline_stage_id: stageId, custom_fields: fields(active.custom_fields) })
      : await crmRequest("POST", path, { type: "contact", item_id: contactId,
          pipeline_stage_id: stageId, custom_fields: fields() });
    if (!result.ok || !(result.payload as any)?.data?.id) throw new Error(`crm_item_write_http_${result.status}`);
  };

  const contactId = await findCrmContact(purchase);
  if (contactId) { await attach(contactId); return; }

  const created = await crmRequest("POST", "/public/api/v1/leads", {
    contact: { name: purchase.customer_name || "Cliente Cakto", email,
      ...(phone ? { phone_number: `+${phone}` } : {}) },
    deal: { title: `PAGAMENTO · ${purchase.product_name}`, pipeline_id: pipelineId, stage_id: stageId },
    custom_fields: fields(),
    metadata: { event: "purchase_approved", captured_at: new Date().toISOString() },
  });
  if (created.ok && (created.payload as any)?.success && (created.payload as any)?.lead_id && (created.payload as any)?.deal_id) return;
  // A criação pública pode devolver 422 quando o mesmo telefone já pertence a
  // outro e-mail. Rebuscar o contato e vincular a compra; nunca tratar 422
  // genericamente como sucesso.
  if (created.status === 422) {
    const concurrentContact = await findCrmContact(purchase);
    if (concurrentContact) {
      items = await getItems();
      if (hasOrder()) return;
      await attach(concurrentContact);
      return;
    }
  }
  throw new Error(`crm_lead_write_http_${created.status}`);
}

async function trackMetaPurchase(purchase: Purchase): Promise<void> {
  const [{ data: pixel }, { data: token }] = await Promise.all([
    supabase.from("site_config").select("value").eq("key", "meta_pixel_id").maybeSingle(),
    supabase.from("secret_config").select("value").eq("key", "meta_capi_access_token").maybeSingle(),
  ]);
  if (!pixel?.value || !token?.value) throw new Error("meta_capi_not_configured");

  const userData: Record<string, string[]> = {};
  if (purchase.customer_email) userData.em = [await sha256(purchase.customer_email)];
  const phone = digits(purchase.customer_phone);
  if (phone) userData.ph = [await sha256(phone)];
  if (!Object.keys(userData).length) throw new Error("meta_user_data_missing");

  const response = await fetch(`https://graph.facebook.com/v21.0/${pixel.value}/events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      data: [{
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: `cakto:${purchase.provider_checkout_id}:purchase`,
        action_source: "website",
        event_source_url: sourceUrl(purchase),
        user_data: userData,
        custom_data: {
          value: purchase.amount_brl == null ? undefined : Number(purchase.amount_brl),
          currency: "BRL",
          content_name: purchase.product_name,
        },
      }],
      access_token: token.value,
    }),
  });
  if (!response.ok) throw new Error(`meta_http_${response.status}`);
}

async function runJob(job: FulfillmentJob, purchase: Purchase): Promise<void> {
  if (job.job_type === "purchase_welcome" && job.channel === "email") {
    // Cakto Members/emailAccess entrega o e-mail transacional. O worker registra
    // o estágio como concluído sem duplicar a comunicação do checkout.
    return;
  }
  if (job.job_type === "purchase_welcome" && job.channel === "whatsapp") {
    await sendWhatsApp(purchase);
    return;
  }
  if (job.job_type === "sync_customer" && job.channel === "crm") {
    await syncCrm(purchase);
    return;
  }
  if (job.job_type === "track_purchase" && job.channel === "meta") {
    await trackMetaPurchase(purchase);
    return;
  }
  if (job.job_type === "review_or_revoke_access" && job.channel === "operations") {
    // A revogação automática será habilitada quando todos os produtos tiverem
    // uma política de acesso uniforme. Por ora, preserva o evento auditável.
    return;
  }
  throw new Error("unsupported_job");
}

async function failOrRetry(job: FulfillmentJob, error: unknown) {
  const attempts = job.attempts + 1;
  const message = error instanceof Error ? error.message.slice(0, 200) : "unknown_error";
  const terminal = attempts >= maxAttempts;
  const delayMinutes = Math.min(2 ** attempts, 60);
  await supabase.from("fulfillment_jobs").update({
    status: terminal ? "failed" : "pending",
    attempts,
    last_error: message,
    claimed_at: null,
    available_at: new Date(Date.now() + delayMinutes * 60_000).toISOString(),
  }).eq("id", job.id).eq("status", "processing");
  return terminal ? "failed" : "retry";
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!workerSecret || request.headers.get("x-worker-secret") !== workerSecret) {
    return json({ error: "unauthorized" }, 401);
  }

  // Recupera claims abandonados por timeout/crash. Os canais externos são
  // at-least-once; não prometemos exactly-once sem suporte do provedor.
  await supabase.from("fulfillment_jobs").update({ status: "pending", claimed_at: null })
    .eq("status", "processing")
    .lt("claimed_at", new Date(Date.now() - 10 * 60_000).toISOString());

  const { data: jobs, error: jobsError } = await supabase.from("fulfillment_jobs")
    .select("id,purchase_id,job_type,channel,attempts")
    .eq("status", "pending")
    .lte("available_at", new Date().toISOString())
    .order("created_at", { ascending: true })
    .limit(20);
  if (jobsError) return json({ error: "jobs_query_failed" }, 500);

  const result = { claimed: 0, completed: 0, retry: 0, failed: 0, skipped: 0 };
  for (const job of (jobs || []) as FulfillmentJob[]) {
    const { data: claimed } = await supabase.from("fulfillment_jobs")
      .update({ status: "processing", claimed_at: new Date().toISOString() })
      .eq("id", job.id)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();
    if (!claimed) { result.skipped++; continue; }
    result.claimed++;

    const { data: purchase, error: purchaseError } = await supabase.from("purchases")
      .select("id,provider,provider_checkout_id,product_name,customer_name,customer_email,customer_phone,amount_brl,utm")
      .eq("id", job.purchase_id)
      .single();
    if (purchaseError || !purchase) {
      const outcome = await failOrRetry(job, new Error("purchase_not_found"));
      result[outcome]++;
      continue;
    }

    try {
      await runJob(job, purchase as Purchase);
      await supabase.from("fulfillment_jobs").update({
        status: "completed", attempts: job.attempts + 1, last_error: null,
        completed_at: new Date().toISOString(), claimed_at: null,
      }).eq("id", job.id).eq("status", "processing");
      result.completed++;
    } catch (error) {
      const outcome = await failOrRetry(job, error);
      result[outcome]++;
    }
  }

  return json({ ok: true, ...result });
});
