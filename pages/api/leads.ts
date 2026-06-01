import type { NextApiRequest, NextApiResponse } from 'next';

// ─── Config ──────────────────────────────────────────────────────
const EVOCRM_BASE_URL = 'https://evoapi.workflowapi.com.br';
const EVOCRM_API_TOKEN = '3e21328779b31ad40f791f18126b86ffd41cb9739b7a9c3fde42bc296f20f20a'; // token escopo completo
const PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e'; // pipeline "Leads do Site"
const DEFAULT_STAGE_ID = '0e31e649-af37-4a6f-87fb-cd25d52225e5'; // "Novo Lead"

// ─── Suporte Supabase ─────────────────────────────────────────────
let supabaseClient: any = null;
async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  } catch {
    return null;
  }
  return supabaseClient;
}

// ─── Helpers ──────────────────────────────────────────────────────
function normalizePhone(phone: string): string {
  if (!phone) return '';
  // Remove tudo que não é dígito ou +
  let cleaned = phone.replace(/[^\d+]/g, '');
  // Se não tem +55, adiciona
  if (!cleaned.startsWith('+')) {
    cleaned = '+55' + cleaned.replace(/^55/, '');
  }
  return cleaned;
}

// ─── API Handler ──────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, whatsapp, source, answers, utm, utm_source, utm_medium, utm_campaign } = req.body;

  // Validação mínima
  if (!email && !whatsapp) {
    return res.status(400).json({ error: 'Email ou WhatsApp obrigatório' });
  }

  const phoneNumber = normalizePhone(whatsapp || '');
  const results: { supabase?: boolean; evocrm?: boolean } = {};

  // ── 1. Salvar Supabase (best effort) ────────────────────────────
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('leads').insert({
        name: name || '',
        email: email || '',
        whatsapp: phoneNumber,
        source: source || 'site',
        answers: answers ? JSON.stringify(answers) : null,
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        created_at: new Date().toISOString(),
      });
      if (!error) results.supabase = true;
    }
  } catch (err) {
    console.error('[Supabase] lead save failed:', err);
  }

  // ── 2. Criar lead no EvoCRM ────────────────────────────────────
  try {
    const dealName = `${name || 'Lead'} — ${source || 'site'}`;
    const payload: any = {
      contact: {
        name: name || 'Lead sem nome',
      },
      deal: {
        pipeline_id: PIPELINE_ID,
        stage_id: DEFAULT_STAGE_ID,
        name: dealName,
      },
      custom_fields: {
        source: source || 'site',
        lead_source: 'public_api',
      },
    };

    if (email) payload.contact.email = email;
    if (phoneNumber) payload.contact.phone_number = phoneNumber;

    // UTM fields
    if (utm_source) payload.custom_fields.utm_source = utm_source;
    if (utm_medium) payload.custom_fields.utm_medium = utm_medium;
    if (utm_campaign) payload.custom_fields.utm_campaign = utm_campaign;

    const response = await fetch(`${EVOCRM_BASE_URL}/public/api/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': EVOCRM_API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 422) {
      // 201 = created, 422 = duplicate (lead already exists) — both are success
      results.evocrm = true;
    } else {
      const body = await response.text();
      console.error('[EvoCRM] lead create failed:', response.status, body);
    }
  } catch (err) {
    console.error('[EvoCRM] network error:', err);
  }

  // ── Sucesso se pelo menos um salvou ─────────────────────────────
  const saved = results.supabase || results.evocrm;
  return res.status(saved ? 200 : 500).json({
    success: saved,
    results,
  });
}