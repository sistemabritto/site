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
const crmUrl = (Deno.env.get("EVO_CRM_URL") || "").replace(/\/$/, "");
const crmToken = Deno.env.get("EVO_CRM_TOKEN") || "";
const crmPipelineId = Deno.env.get("EVO_CRM_PIPELINE_ID") || "eb72af5c-28f7-4948-ae50-9c81922d161e";
const crmWonStageId = Deno.env.get("EVO_CRM_WON_STAGE_ID") || "f6229e34-46c2-4a10-890b-df5969489033";
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

function productKind(name: string): "challenge" | "session" | "other" {
  const normalized = name.toLocaleLowerCase("pt-BR");
  if (normalized.includes("desafio monetizar")) return "challenge";
  if (normalized.includes("sessão de arquitetura") || normalized.includes("sessao de arquitetura")) return "session";
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
  return `${greeting} Seu pagamento de ${purchase.product_name} foi confirmado. As instruções de acesso foram enviadas ao e-mail da compra. Se precisar de ajuda, responda aqui.`;
}

function sourceUrl(purchase: Purchase): string {
  const kind = productKind(purchase.product_name);
  if (kind === "challenge") return "https://www.sistemabritto.com.br/desafio-monetizar-com-ia";
  if (kind === "session") return "https://www.sistemabritto.com.br/implementacao-vibe-seller";
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

async function syncCrm(purchase: Purchase): Promise<void> {
  if (!crmUrl || !crmToken) throw new Error("crm_not_configured");
  const phone = digits(purchase.customer_phone);
  if (!phone && !purchase.customer_email) throw new Error("customer_contact_missing");

  const response = await fetch(`${crmUrl}/public/api/v1/leads`, {
    method: "POST",
    headers: { "content-type": "application/json", api_access_token: crmToken },
    body: JSON.stringify({
      contact: {
        name: purchase.customer_name || "Cliente Cakto",
        ...(phone ? { phone_number: `+${phone}` } : {}),
        ...(purchase.customer_email ? { email: purchase.customer_email } : {}),
      },
      deal: {
        title: `PAGAMENTO · ${purchase.product_name}`,
        pipeline_id: crmPipelineId,
        stage_id: crmWonStageId,
      },
      custom_fields: {
        source: "cakto",
        product: purchase.product_name,
        amount: purchase.amount_brl == null ? "" : Number(purchase.amount_brl).toFixed(2),
        provider: purchase.provider,
        checkout_id: purchase.provider_checkout_id,
        ...(purchase.utm || {}),
      },
      metadata: { event: "purchase_approved", captured_at: new Date().toISOString() },
    }),
  });
  // O endpoint público do CRM deve tratar a deduplicação por telefone/e-mail.
  if (!response.ok && response.status !== 409) throw new Error(`crm_http_${response.status}`);
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
