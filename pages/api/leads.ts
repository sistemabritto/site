import type { NextApiRequest, NextApiResponse } from 'next';

// ─── Config ──────────────────────────────────────────────────────
const EVOCRM_BASE_URL = 'https://evoapi.workflowapi.com.br';
// Token de escopo completo do CRM. Estava escrito aqui, num repositório
// PÚBLICO, e sem sequer consultar o ambiente — trocar o token no CRM
// derrubaria a gravação de leads sem ninguém entender por quê.
const EVOCRM_API_TOKEN = process.env.EVOCRM_API_TOKEN || '';
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

  // Extrai UTM do objeto "utm" (formato do quiz) ou dos campos flat
  const utmSource = utm_source || utm?.utm_source || '';
  const utmMedium = utm_medium || utm?.utm_medium || '';
  const utmCampaign = utm_campaign || utm?.utm_campaign || '';
  const utmContent = utm?.utm_content || '';
  const utmTerm = utm?.utm_term || '';

  // ── 1. Salvar Supabase (best effort) ────────────────────────────
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('leads').insert({
        name: name || '',
        email: email || '',
        phone: phoneNumber,  // coluna correta é "phone", não "whatsapp"
        source: source || 'site',
        answers: answers ? JSON.stringify(answers) : null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        created_at: new Date().toISOString(),
      });
      if (!error) results.supabase = true;
    }
  } catch (err) {
    console.error('[Supabase] lead save failed:', err);
  }

  // ── 2. Criar lead no EvoCRM ────────────────────────────────────
  // Achado ao vivo em 30/07/2026: contact.email é OBRIGATÓRIO na API do
  // EvoCRM — sem ele, todo POST volta 422 "contact.email is required".
  // O código antigo tratava QUALQUER 422 como "duplicado = sucesso", então
  // esse erro de validação ficava mascarado e o lead NUNCA era criado pra
  // quem chegava só com WhatsApp (ex.: gate de OTP da página de vídeo, que
  // não pede e-mail). Gera um e-mail sintético determinístico a partir do
  // telefone quando o usuário não informou — determinístico é o que garante
  // que a MESMA pessoa sempre bate no MESMO e-mail sintético, então o
  // dedupe por telefone do EvoCRM (confirmado por teste real: "Phone number
  // ... already registered to another contact") continua funcionando.
  const emailEfetivo = email || (phoneNumber ? `whatsapp-${phoneNumber.replace(/\D/g, '')}@sem-email.sistemabritto.com.br` : '');

  try {
    const dealName = `${name || 'Lead'} · ${source || 'site'}`;
    const payload: any = {
      contact: {
        name: name || 'Lead sem nome',
        email: emailEfetivo,
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

    if (response.ok) {
      results.evocrm = true;
    } else if (response.status === 422) {
      // 422 cobre dois casos bem diferentes: contato já existe (dedupe de
      // verdade, mesma pessoa reconhecida pelo telefone — sucesso) ou um
      // campo obrigatório faltando (erro de verdade, precisa aparecer no
      // log). Só o primeiro conta como sucesso.
      const body = await response.text();
      const jaExiste = /already registered|already exists|duplicate/i.test(body);
      if (jaExiste) {
        results.evocrm = true;
      } else {
        console.error('[EvoCRM] lead create falhou por validação (não é dedupe):', body);
      }
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