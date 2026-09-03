import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

type CaktoPayload = { secret?: string; event?: string; data?: Record<string, any> };

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
const webhookSecret = Deno.env.get("CAKTO_WEBHOOK_SECRET") || "";

const statusByEvent: Record<string, string> = {
  purchase_approved: "paid", subscription_renewed: "paid", purchase_refused: "refused",
  pix_gerado: "waiting_payment", boleto_gerado: "waiting_payment",
  picpay_gerado: "waiting_payment", openfinance_nubank_gerado: "waiting_payment",
  refund: "refunded", chargeback: "chargedback", subscription_canceled: "canceled",
  checkout_abandonment: "abandoned",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let payload: CaktoPayload;
  try { payload = await request.json(); }
  catch { return json({ error: "invalid_json" }, 400); }

  if (!webhookSecret || payload.secret !== webhookSecret) return json({ error: "unauthorized" }, 401);

  const event = text(payload.event);
  const data = payload.data || {};
  const orderId = text(data.id) || text(data.refId);
  if (!event || !orderId) return json({ error: "missing_event_or_order" }, 400);

  const providerEventId = `${event}:${orderId}`;
  const { error: eventError } = await supabase.from("payment_events").insert({
    provider: "cakto", provider_event_id: providerEventId, event_type: event,
    checkout_id: text(data.checkoutUrl), external_id: text(data.refId), status: "processing",
    // Nunca persista o segredo usado para autenticar a chamada.
    payload: { event, data },
  });
  if (eventError?.code === "23505") {
    const { data: existing } = await supabase.from("payment_events")
      .select("status")
      .eq("provider", "cakto")
      .eq("provider_event_id", providerEventId)
      .maybeSingle();
    if (existing?.status === "processed") return json({ ok: true, duplicate: true });
    if (existing?.status === "processing") return json({ ok: true, in_progress: true });
    await supabase.from("payment_events").update({ status: "processing" })
      .eq("provider", "cakto").eq("provider_event_id", providerEventId);
  } else if (eventError) {
    return json({ error: "event_persist_failed" }, 500);
  }

  const product = data.product || {};
  const customer = data.customer || {};
  const status = statusByEvent[event] || text(data.status) || "received";
  const { data: purchase, error: purchaseError } = await supabase.from("purchases").upsert({
    provider: "cakto", provider_checkout_id: orderId, external_id: text(data.refId),
    product_name: text(product.name) || text(data.offer?.name) || "Produto Cakto",
    customer_name: text(customer.name), customer_email: text(customer.email), customer_phone: text(customer.phone),
    amount_brl: Number(data.amount ?? data.baseAmount ?? data.offer?.price ?? 0), currency: "BRL", status,
    utm: { source: text(data.utm_source), medium: text(data.utm_medium), campaign: text(data.utm_campaign), term: text(data.utm_term), content: text(data.utm_content), sck: text(data.sck) },
    paid_at: text(data.paidAt), updated_at: new Date().toISOString(),
  }, { onConflict: "provider,provider_checkout_id" }).select("id").single();

  if (purchaseError || !purchase) {
    await supabase.from("payment_events").update({ status: "failed" }).eq("provider", "cakto").eq("provider_event_id", providerEventId);
    return json({ error: "purchase_persist_failed" }, 500);
  }

  const jobs: Record<string, unknown>[] = [];
  if (event === "purchase_approved" || event === "subscription_renewed") {
    for (const [jobType, channel] of [
      ["purchase_welcome", "email"],
      ["purchase_welcome", "whatsapp"],
      ["sync_customer", "crm"],
      ["track_purchase", "meta"],
    ]) {
      jobs.push({ purchase_id: purchase.id, job_type: jobType, channel, idempotency_key: `cakto:${orderId}:${event}:${channel}` });
    }
  } else if (["refund", "chargeback", "subscription_canceled"].includes(event)) {
    jobs.push({ purchase_id: purchase.id, job_type: "review_or_revoke_access", channel: "operations", idempotency_key: `cakto:${orderId}:${event}:operations` });
  }

  if (jobs.length) {
    const { error: jobsError } = await supabase.from("fulfillment_jobs").upsert(jobs, { onConflict: "idempotency_key", ignoreDuplicates: true });
    if (jobsError) {
      await supabase.from("payment_events").update({ status: "failed" }).eq("provider", "cakto").eq("provider_event_id", providerEventId);
      return json({ error: "jobs_persist_failed" }, 500);
    }
  }

  await supabase.from("payment_events").update({ status: "processed", processed_at: new Date().toISOString() })
    .eq("provider", "cakto").eq("provider_event_id", providerEventId);
  return json({ ok: true });
});
