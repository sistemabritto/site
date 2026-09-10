import type { NextApiRequest, NextApiResponse } from 'next';
import { attachExistingCrmLead } from '../../lib/lead-crm';

// ─── Config ──────────────────────────────────────────────────────
const EVOCRM_BASE_URL = 'https://evoapi.workflowapi.com.br';
// Token de escopo completo do CRM. Estava escrito aqui, num repositório
// PÚBLICO, e sem sequer consultar o ambiente — trocar o token no CRM
// derrubaria a gravação de leads sem ninguém entender por quê.
const EVOCRM_API_TOKEN = process.env.EVOCRM_API_TOKEN || '';
// Um pipeline por ORIGEM de lead, criados no CRM em 22/08/2026.
//
// Antes tudo caía em "Leads do Site" — que já tem 52 leads de uma lista
// importada à mão. Misturar quem confirmou o WhatsApp por OTP numa aula com
// uma lista fria torna o funil ilegível: a taxa de resposta de um não diz nada
// sobre a do outro. Separar por ESTÁGIO não resolveria, porque os estágios ali
// são passos de funil (Novo Lead → Contato → … → Fechado): assim que o lead
// avançasse, a origem sumia.
//
// "Leads do Site" continua sendo o fallback pra qualquer origem nova que
// apareça sem mapeamento — melhor cair num pipeline conhecido que sumir.
const PIPELINES: Record<string, { pipeline: string; stage: string }> = {
  'aula-vps-crm-do-zero': {
    pipeline: '2b861a13-4809-45c7-ba6f-fd8be6e050ee', // "Aula CRM (VPS)"
    stage: 'bc435c12-47fd-4a2a-a13c-1648210cc84c',
  },
  'video-completo': {
    pipeline: 'f31954fb-e5bf-4639-9cb0-0c8de6e2cb30', // "Call Pós-IA"
    stage: 'f026c5bb-d85a-471d-92b1-abce11161f8c',
  },
};
const PIPELINE_PADRAO = {
  pipeline: 'eb72af5c-28f7-4948-ae50-9c81922d161e', // "Leads do Site"
  stage: '0e31e649-af37-4a6f-87fb-cd25d52225e5', // "Novo Lead"
};

// ─── Suporte Supabase ─────────────────────────────────────────────
let supabaseClient: any = null;
async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    // SUPABASE_SERVICE_ROLE_KEY não existe no ambiente da Vercel — as chaves
    // configuradas são SUPABASE_SERVICE_KEY e SUPABASE_SECRET_KEY. Lendo só o
    // nome errado, isto caía no anon key e TODO insert de lead era rejeitado
    // pelo RLS ("new row violates row-level security policy"), silenciosamente:
    // o catch abaixo engolia o erro e o lead sumia. Confirmado em 22/08/2026 —
    // a tabela leads tinha 2 linhas enquanto pageviews (que já lia a variável
    // certa em api/track.ts) tinha 267. Ordem espelha a de api/track.ts.
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY ||
        process.env.SUPABASE_SECRET_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        ''
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

  const { name, email, whatsapp, source, answers, utm, utm_source, utm_medium, utm_campaign } = req.body || {};
  if ([name, email, whatsapp, source, utm_source, utm_medium, utm_campaign].some(v => v != null && (typeof v !== 'string' || v.length > 500)) ||
      (utm != null && (typeof utm !== 'object' || Array.isArray(utm) || Object.values(utm).some(v => typeof v !== 'string' || v.length > 500)))) {
    return res.status(400).json({ success: false, error: 'Dados inválidos.' });
  }

  // Validação mínima
  if (!email && !whatsapp) {
    return res.status(400).json({ error: 'Email ou WhatsApp obrigatório' });
  }

  const phoneNumber = normalizePhone(whatsapp || '');
  if ((email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      (whatsapp && !/^\+[1-9]\d{7,14}$/.test(phoneNumber))) {
    return res.status(400).json({ success: false, error: 'Informe um contato válido.' });
  }
  // leads.email is UNIQUE and NOT NULL. An empty string made every phone-only
  // submission after the first fail with 23505. This internal identifier must
  // never be used as a deliverable email address.
  const emailEfetivo = email?.trim().toLowerCase() || `whatsapp-${phoneNumber.replace(/\D/g, '')}@sem-email.sistemabritto.com.br`;
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
      const { error } = await supabase.from('leads').upsert({
        name: name || '',
        email: emailEfetivo,
        phone: phoneNumber,  // coluna correta é "phone", não "whatsapp"
        source: source || 'site',
        answers: answers || null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        created_at: new Date().toISOString(),
      }, { onConflict: 'email', ignoreDuplicates: true });
      if (!error) results.supabase = true;
      else console.error('[Supabase] lead save failed', { code: error.code });
    }
  } catch {
    console.error('[Supabase] lead save unavailable');
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

  try {
    const dealName = `${name || 'Lead'} · ${source || 'site'}`;
    const destino = PIPELINES[source] || PIPELINE_PADRAO;
    const payload: any = {
      contact: {
        name: name || 'Lead sem nome',
        email: emailEfetivo,
      },
      deal: {
        pipeline_id: destino.pipeline,
        stage_id: destino.stage,
        title: dealName,
      },
      custom_fields: {
        source: source || 'site',
        lead_source: 'public_api',
      },
    };

    if (phoneNumber) payload.contact.phone_number = phoneNumber;

    // UTM: usa as variáveis JÁ NORMALIZADAS lá em cima, que aceitam tanto o
    // formato flat (utm_source) quanto o aninhado (utm: { utm_source }) usado
    // pelo quiz. Antes isto lia utm_source/utm_medium/utm_campaign crus, então
    // lead vindo com UTM aninhado gravava a origem no Supabase e chegava SEM
    // atribuição nenhuma no CRM — e utm_content/utm_term não chegavam nunca.
    if (utmSource) payload.custom_fields.utm_source = utmSource;
    if (utmMedium) payload.custom_fields.utm_medium = utmMedium;
    if (utmCampaign) payload.custom_fields.utm_campaign = utmCampaign;
    if (utmContent) payload.custom_fields.utm_content = utmContent;
    if (utmTerm) payload.custom_fields.utm_term = utmTerm;

    if (!EVOCRM_API_TOKEN) throw new Error('CRM unavailable');
    const existing = await attachExistingCrmLead({ phone: phoneNumber, email: emailEfetivo,
      pipeline: destino.pipeline, stage: destino.stage, fields: payload.custom_fields }, EVOCRM_API_TOKEN);
    if (existing === 'saved') {
      results.evocrm = true;
    } else if (existing === 'missing') {
    const response = await fetch(`${EVOCRM_BASE_URL}/public/api/v1/leads`, {
      method: 'POST',
      signal: AbortSignal.timeout(8000),
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': EVOCRM_API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const body = await response.json();
      results.evocrm = body.success === true && Boolean(body.lead_id && body.deal_id);
    } else if (response.status === 422) {
      // 422 cobre dois casos bem diferentes: contato já existe (dedupe de
      // verdade, mesma pessoa reconhecida pelo telefone — sucesso) ou um
      // campo obrigatório faltando (erro de verdade, precisa aparecer no
      // log). Só o primeiro conta como sucesso.
      const body = await response.text();
      const jaExiste = /already registered|already exists|duplicate/i.test(body);
      if (jaExiste) {
        results.evocrm = await attachExistingCrmLead({ phone: phoneNumber, email: emailEfetivo,
          pipeline: destino.pipeline, stage: destino.stage, fields: payload.custom_fields }, EVOCRM_API_TOKEN) === 'saved';
      } else {
        console.error('[EvoCRM] lead validation failed', { status: response.status });
      }
    } else {
      console.error('[EvoCRM] lead create failed:', response.status);
    }
    } else console.error('[EvoCRM] existing lead lookup failed');
  } catch {
    console.error('[EvoCRM] lead sync unavailable');
  }

  // ── Sucesso se pelo menos um salvou ─────────────────────────────
  const saved = results.supabase || results.evocrm;
  return res.status(saved ? 200 : 500).json({
    success: saved,
    results,
  });
}
