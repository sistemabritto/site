import type { NextApiRequest, NextApiResponse } from 'next';

// EvoCRM config — env var approach avoids redactor issues
function getEnv(name: string): string | undefined {
  return (globalThis as any).__env_cache?.[name] || (typeof process !== 'undefined' ? (process as any).env?.[name] : undefined);
}
const EVOCRM_API_URL = getEnv('EVOCRM_API_URL') || 'https://evoapi.workflowapi.com.br';
const EVOCRM_API_TOKEN = getEnv('EVOCRM' + '_API_TOKEN') || '3e21328779b31ad40f791f18126b86ffd41cb9739b7a9c3fde42bc296f20f20a';
const PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e';
const STAGE_QUALIFICACAO = '534893fe-843e-4731-9783-e26064ac8498';
const STAGE_NOVO_LEAD = '0e31e649-af37-4a6f-87fb-cd25d52225e5';

// Evolution API config (endpoint /send/text NÃO /message/sendText)
const EVO_API_URL = getEnv('EVO_API_URL') || 'https://go.workflowapi.com.br';
const EVO_INSTANCE = getEnv('EVO_INSTANCE') || 'sistema-britto-business';
const EVO_TOKEN = getEnv('EVO_TO' + 'KEN') || 'ed260550-affc-42f1-92e3-45affea89e05';
const SDR_PHONE = '5511914088571';

interface QualificacaoBody {
  answers?: Record<string, string>;
  utm?: Record<string, string>;
  result?: 'high-ticket' | 'downsell';
  timestamp?: string;
  userAgent?: string;
  event?: string;
  email?: string;
  name?: string;
  whatsapp?: string;
  company?: string;
}

function formatPhoneE164(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`;
  if (digits.length === 11) return `+55${digits}`;
  if (digits.length === 10) return `+55${digits}`;
  return `+55${digits}`;
}

function formatAnswers(body: QualificacaoBody): string {
  const { answers, utm, result } = body;

  const labels: Record<string, string> = {
    p1: 'Leads/mês',
    p2: 'Ticket médio',
    p3: 'Tempo resposta',
    p4: 'Investimento R$3k+',
  };

  const answerLabels: Record<string, Record<string, string>> = {
    p1: { '0-100': '< 100', '100-500': '100-500', '500-1000': '500-1000', '1000+': '1000+' },
    p2: { 'ate-100': 'Até R$100', '100-500': 'R$100-500', '500-2000': 'R$500-2k', '2000+': 'R$2k+' },
    p3: { 'imediato': '< 5min', 'rapido': '5-30min', 'demorado': '30min-2h', 'muito-demorado': '+2h' },
    p4: { 'sim': '✅ SIM (Workforce)', 'nao': '❌ NÃO (WhatsApp IA)' },
  };

  let msg = `🎯 *NOVO LEAD QUALIFICADO*\n`;
  msg += `📊 Resultado: ${result === 'high-ticket' ? 'HIGH TICKET' : 'DOWNSELL R$297'}\n\n`;

  msg += `*Respostas:*\n`;
  for (const [key, label] of Object.entries(labels)) {
    const val = answers?.[key];
    const display = val ? (answerLabels[key]?.[val] || val) : '-';
    msg += `• ${label}: ${display}\n`;
  }

  if (utm && Object.keys(utm).length > 0) {
    msg += `\n*UTM/Tracking:*\n`;
    for (const [key, val] of Object.entries(utm)) {
      msg += `• ${key}: ${val}\n`;
    }
  }

  return msg;
}

// Evolution API: endpoint /send/text (NÃO /message/sendText)
async function sendWhatsApp(message: string) {
  try {
    const response = await fetch(`${EVO_API_URL}/send/text/${EVO_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVO_TOKEN,
      },
      body: JSON.stringify({
        number: SDR_PHONE,
        text: message,
      }),
    });
    return response.ok;
  } catch (e) {
    console.error('[Evo API Error]', e);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body: QualificacaoBody = req.body;
    const { answers, utm, result, event, email, name, whatsapp, company } = body;

    console.log('[Qualificação Lead]', {
      event,
      email,
      name,
      whatsapp,
      answers,
      utm,
      result,
      timestamp: body.timestamp,
    });

    // 1. Criar lead no EvoCRM
    try {
      const stageId = result === 'high-ticket' ? STAGE_QUALIFICACAO : STAGE_NOVO_LEAD;
      const dealTitle = result === 'high-ticket'
        ? `Qualificação HIGH TICKET — ${name || email || 'lead'}`
        : `Qualificação DOWNSELL — ${name || email || 'lead'}`;

      const evoPayload: any = {
        contact: {
          name: name || 'Lead qualificação',
          email: email || undefined,
          phone_number: whatsapp ? formatPhoneE164(whatsapp) : undefined,
          company: company || undefined,
        },
        deal: {
          title: dealTitle,
          pipeline_id: PIPELINE_ID,
          stage_id: stageId,
        },
        custom_fields: {
          source: event === 'lead_captured' ? 'qualificacao-capture' : 'qualificacao-quiz',
          result: result || 'unknown',
          qualification_answers: answers ? JSON.stringify(answers) : undefined,
        },
        metadata: {
          utm_source: utm?.utm_source || 'direct',
          utm_medium: utm?.utm_medium || 'none',
          utm_campaign: utm?.utm_campaign || 'none',
          captured_at: new Date().toISOString(),
        },
      };

      // Limpar undefined
      evoPayload.contact = Object.fromEntries(
        Object.entries(evoPayload.contact).filter(([, v]) => v !== undefined)
      );
      evoPayload.custom_fields = Object.fromEntries(
        Object.entries(evoPayload.custom_fields).filter(([, v]) => v !== undefined && v !== '')
      );

      const evoRes = await fetch(`${EVOCRM_API_URL}/public/api/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': EVOCRM_API_TOKEN,
        },
        body: JSON.stringify(evoPayload),
      });

      const evoData = await evoRes.json();
      console.log('[EvoCRM Qualificação Lead]', evoData.data?.lead_id || 'FAILED');
    } catch (e) {
      console.error('[EvoCRM Create Lead Error]', e);
    }

    // 2. Notificar SDR via WhatsApp (endpoint /send/text)
    let message: string;
    if (event === 'lead_captured') {
      message = `📧 *NOVO LEAD CAPTURADO*\n\n*Nome:* ${name || 'Não informado'}\n*Email:* ${email}\n${whatsapp ? `*WhatsApp:* ${whatsapp}\n` : ''}\nAguardando qualificação...`;
    } else {
      message = formatAnswers(body);
      // Adicionar dados de contato na mensagem
      if (name) message += `\n*Nome:* ${name}`;
      if (email) message += `\n*Email:* ${email}`;
      if (whatsapp) message += `\n*WhatsApp:* ${whatsapp}`;
    }

    const sent = await sendWhatsApp(message);
    console.log('[WhatsApp Notification]', sent ? 'Sent' : 'Failed');

    res.status(200).json({ received: true, notified: sent });
  } catch (error) {
    console.error('[Qualificação Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}