import type { NextApiRequest, NextApiResponse } from 'next';

// EvoCRM Create Lead API config
const EVOCRM_API_URL = process.env.EVOCRM_API_URL || 'https://evoapi.workflowapi.com.br';
const EVOCRM_API_TOKEN = process.env.EVOCRM_API_TOKEN || '3e21328779b31ad40f791f18126b86ffd41cb9739b7a9c3fde42bc296f20f20a';

// Pipeline "Leads do Site" — IDs fixos do EvoCRM
const PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e';
const STAGE_NOVO_LEAD = '0e31e649-af37-4a6f-87fb-cd25d52225e5';
const STAGE_CONTATO = 'eafa17b3-b043-4b17-8f6e-2ba94b5eb1a8';
const STAGE_QUALIFICACAO = '534893fe-843e-4731-9783-e26064ac8498';

// Mapear source → stage ID
function getStageForSource(source: string): string {
  // Quiz/qualificação leads vão direto pra Qualificação
  if (source?.includes('quiz') || source?.includes('qualificacao') || source?.includes('workforce')) {
    return STAGE_QUALIFICACAO;
  }
  // Landing pages com WhatsApp vão pra Contato (já tem meio de contato)
  if (source?.includes('whatsapp') || source?.includes('landing')) {
    return STAGE_CONTATO;
  }
  // Default: Novo Lead
  return STAGE_NOVO_LEAD;
}

// Formatar telefone brasileiro pro formato E.164 (+55XXXXXXXXXXX)
function formatPhoneE164(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`;
  if (digits.length === 11) return `+55${digits}`;
  if (digits.length === 10) return `+55${digits}`;
  return `+55${digits}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      whatsapp,
      company,
      source = 'unknown',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      orderBump = false,
      qualification_answers = null,
      plan = '',
      value = 0,
    } = req.body;

    if (!name && !email) {
      return res.status(400).json({ error: 'Name or email is required' });
    }

    const stageId = getStageForSource(source);

    // Montar deal title descritivo
    const dealTitle = plan
      ? `Lead Site — ${plan} (${source})`
      : `Lead Site — ${source}`;

    // Montar payload pro EvoCRM Create Lead
    const evoPayload: any = {
      contact: {
        name: name || 'Lead sem nome',
        email: email || undefined,
        phone_number: whatsapp ? formatPhoneE164(whatsapp) : undefined,
        company: company || undefined,
      },
      deal: {
        title: dealTitle,
        pipeline_id: PIPELINE_ID,
        stage_id: stageId,
        value: value || undefined,
      },
      custom_fields: {
        source,
        order_bump: orderBump ? 'true' : 'false',
        plan: plan || undefined,
        qualification_answers: qualification_answers ? JSON.stringify(qualification_answers) : undefined,
      },
      metadata: {
        utm_source: utm_source || 'direct',
        utm_medium: utm_medium || 'none',
        utm_campaign: utm_campaign || 'none',
        captured_at: new Date().toISOString(),
      },
    };

    // Limpar campos undefined/null
    evoPayload.contact = Object.fromEntries(
      Object.entries(evoPayload.contact).filter(([, v]) => v !== undefined)
    );
    evoPayload.custom_fields = Object.fromEntries(
      Object.entries(evoPayload.custom_fields).filter(([, v]) => v !== undefined && v !== '')
    );

    // Chamar EvoCRM Create Lead API
    const evoResponse = await fetch(`${EVOCRM_API_URL}/public/api/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': EVOCRM_API_TOKEN,
      },
      body: JSON.stringify(evoPayload),
    });

    const evoData = await evoResponse.json();

    if (!evoResponse.ok) {
      console.error('[EvoCRM Create Lead Error]', evoResponse.status, evoData);
      // Não bloqueia o fluxo do usuário, mas retorna o erro pro log
      return res.status(200).json({
        success: false,
        error: 'evoCRM_error',
        details: evoData,
        fallback: true,
      });
    }

    console.log('[EvoCRM Lead Created]', evoData.data?.lead_id, source);
    res.status(200).json({
      success: true,
      leadId: evoData.data?.lead_id,
      dealId: evoData.data?.deal_id,
    });
  } catch (error) {
    console.error('[Leads API Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
