import type { NextApiRequest, NextApiResponse } from 'next';

const EVO_API_URL = process.env.EVO_API_URL || 'https://go.workflowapi.com.br';
const EVO_INSTANCE = process.env.EVO_INSTANCE || 'sistema-britto-business';
const EVO_TOKEN = process.env.EVO_TOKEN || 'ed260550-affc-42f1-92e3-45affea89e05';
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

async function sendWhatsAppNotification(message: string) {
  try {
    const response = await fetch(`${EVO_API_URL}/message/sendText/${EVO_INSTANCE}`, {
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
    const { answers, utm, result, event, email, name } = body;

    console.log('[Qualificação Lead]', {
      event,
      email,
      name,
      answers,
      utm,
      result,
      timestamp: body.timestamp,
    });

    // Se for captura de email, salvar lead e retornar
    if (event === 'lead_captured') {
      const message = `📧 *NOVO LEAD CAPTURADO*\n\n*Nome:* ${name || 'Não informado'}\n*Email:* ${email}\n\nAguardando qualificação...`;
      await sendWhatsAppNotification(message);
      return res.status(200).json({ received: true });
    }

    // Formatar mensagem pro SDR
    const message = formatAnswers(body);

    // Enviar notificação pro WhatsApp do SDR
    const sent = await sendWhatsAppNotification(message);
    console.log('[WhatsApp Notification]', sent ? 'Sent' : 'Failed');

    res.status(200).json({ received: true, notified: sent });
  } catch (error) {
    console.error('[Qualificação Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
