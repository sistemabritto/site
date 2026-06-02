import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash, createHmac } from 'crypto';
import { createClient } from '@supabase/supabase-js';

// EvoCRM config
const EVOCRM_API_URL = process.env.EVOCRM_API_URL || 'https://evoapi.workflowapi.com.br';
const EVOCRM_API_TOKEN = process.env['EVOCRM' + '_API_TOKEN'] || '3e21328779b31ad40f791f18126b86ffd41cb9739b7a9c3fde42bc296f20f20a';
const PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e';
const STAGE_PROPOSTA = '3f77b2f1-3e95-4a9d-a5bc-0dfce1aff4a5';
const STAGE_FECHADO = 'f6229e34-46c2-4a10-890b-df5969489033';

// Evolution API config
const EVO_API_URL = process.env.EVO_API_URL || 'https://go.workflowapi.com.br';
const EVO_INSTANCE = process.env.EVO_INSTANCE || 'sistema-britto-business';
const EVO_TOKEN = process.env.EVO_TOKEN || 'ed260550-affc-42f1-92e3-45affea89e05';
const SDR_PHONE = '5511914088571';

// AbacatePay webhook secret (configurar no .env)
const ABACATEPAY_WEBHOOK_SECRET = process.env.ABACATEPAY_WEBHOOK_SECRET || '';

// Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

function formatPhoneE164(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`;
  if (digits.length === 11) return `+55${digits}`;
  if (digits.length === 10) return `+55${digits}`;
  return `+55${digits}`;
}

async function sendWhatsApp(number: string, text: string) {
  try {
    const response = await fetch(`${EVO_API_URL}/send/text/${EVO_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVO_TOKEN,
      },
      body: JSON.stringify({ number, text }),
    });
    return response.ok;
  } catch (e) {
    console.error('[Evo API Error]', e);
    return false;
  }
}

// Busca UTMs salvos no checkout_metadata pelo email
async function getUtmsForCustomer(email: string): Promise<Record<string, string>> {
  if (!email || !supabaseKey) return {};
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from('checkout_metadata')
      .select('utm_source, utm_medium, utm_campaign, utm_content, utm_term, page, product_id')
      .eq('email', email)
      .single();
    
    if (data) {
      const utms: Record<string, string> = {};
      if (data.utm_source) utms.utm_source = data.utm_source;
      if (data.utm_medium) utms.utm_medium = data.utm_medium;
      if (data.utm_campaign) utms.utm_campaign = data.utm_campaign;
      if (data.utm_content) utms.utm_content = data.utm_content;
      if (data.utm_term) utms.utm_term = data.utm_term;
      if (data.page) utms.page = data.page;
      return utms;
    }
  } catch (e) {
    console.error('[Get UTMs Error]', e);
  }
  return {};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ✅ Validação de assinatura HMAC da AbacatePay
    if (ABACATEPAY_WEBHOOK_SECRET) {
      const signature = req.headers['abacatepay-signature'] as string || 
                        req.headers['x-abacatepay-signature'] as string || '';
      
      if (!signature) {
        console.error('[Webhook] Missing signature header');
        return res.status(401).json({ error: 'Missing signature' });
      }

      const rawBody = JSON.stringify(req.body);
      const expectedSig = createHmac('sha256', ABACATEPAY_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSig && `sha256=${expectedSig}` !== signature) {
        console.error('[Webhook] Invalid signature', { expected: expectedSig, got: signature });
        return res.status(401).json({ error: 'Invalid signature' });
      }
      
      console.log('[Webhook] Signature validated ✅');
    } else {
      console.warn('[Webhook] ⚠️ No ABACATEPAY_WEBHOOK_SECRET set — skipping validation');
    }

    const body = req.body;
    const { event, data } = body;

    console.log('[AbacatePay Webhook]', event, data);

    switch (event) {
      case 'checkout.completed':
      case 'subscription.completed':
        await notifyCRM(data);
        break;

      case 'subscription.cancelled':
        await handleCancellation(data);
        break;

      case 'checkout.refunded':
      case 'subscription.refunded':
        await handleRefund(data);
        break;

      default:
        console.log(`[AbacatePay] Evento não tratado: ${event}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('[AbacatePay Webhook Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function notifyCRM(data: any) {
  try {
    const { customer, items, externalId } = data;

    const productNames: Record<string, string> = {
      'whatsapp-ia-basico': 'WhatsApp IA Básico (R$ 297/mês)',
      'crm-ia-completo': 'CRM + IA Completo (R$ 750/mês)',
      'evonexus-premium': 'EvoNexus Premium (R$ 2.500/mês)',
      'hermes-selfhosted': 'Hermes Self-Hosted (R$ 3.500)',
      'whatsapp-ia-combo-consultoria': 'WhatsApp IA + Consultoria (R$ 547/mês)',
      'crm-ia-completo-combo-consultoria': 'CRM + IA + Consultoria (R$ 1.000/mês)',
      'evonexus-premium-combo-consultoria': 'EvoNexus Premium + Consultoria (R$ 2.750/mês)',
    };

    const productName = productNames[externalId] || items?.[0]?.name || externalId;
    const customerName = customer?.name || 'Cliente';
    const customerEmail = customer?.email || 'Não informado';
    const customerPhone = customer?.cellphone || '';

    // ✅ Busca UTMs do checkout_metadata (salvo quando o cliente clicou no CTA)
    const utms = await getUtmsForCustomer(customerEmail);
    console.log('[UTMs for customer]', customerEmail, utms);

    // 1. Criar/atualizar lead no EvoCRM — stage Fechado + UTMs em custom_fields
    try {
      const evoPayload: any = {
        contact: {
          name: customerName,
          email: customerEmail,
          phone_number: customerPhone ? formatPhoneE164(customerPhone) : undefined,
        },
        deal: {
          title: `PAGAMENTO — ${productName}`,
          pipeline_id: PIPELINE_ID,
          stage_id: STAGE_FECHADO,
        },
        custom_fields: {
          source: utms.utm_source || 'abacatepay',
          product: productName,
          external_id: externalId || '',
          // ✅ UTMs em custom_fields do CRM
          ...(utms.utm_medium ? { utm_medium: utms.utm_medium } : {}),
          ...(utms.utm_campaign ? { utm_campaign: utms.utm_campaign } : {}),
          ...(utms.utm_content ? { utm_content: utms.utm_content } : {}),
          ...(utms.utm_term ? { utm_term: utms.utm_term } : {}),
          ...(utms.page ? { landing_page: utms.page } : {}),
        },
        metadata: {
          event: 'payment_approved',
          captured_at: new Date().toISOString(),
        },
      };

      // Limpar undefined
      evoPayload.contact = Object.fromEntries(
        Object.entries(evoPayload.contact).filter(([, v]) => v !== undefined)
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
      console.log('[EvoCRM Lead Created]', evoData.data?.lead_id || 'FAILED', evoData);
    } catch (e) {
      console.error('[EvoCRM Create Lead Error]', e);
    }

    // 2. Notificar SDR via Evolution API (WhatsApp)
    const sdrMessage = `🎉 *NOVO PAGAMENTO APROVADO!*\n\n*Produto:* ${productName}\n*Cliente:* ${customerName}\n*Email:* ${customerEmail}\n*Telefone:* ${customerPhone || 'Não informado'}${utms.utm_source ? `\n*UTM:* ${utms.utm_source} / ${utms.utm_medium || '-'} / ${utms.utm_campaign || '-'}` : ''}\n\n⚠️ Entrar em contato para onboarding!`;

    await sendWhatsApp(SDR_PHONE, sdrMessage);

    // 3. Enviar mensagem de boas-vindas pro cliente
    if (customerPhone) {
      const phone = customerPhone.replace(/\D/g, '');
      const welcomeMessage = `🎉 *Pagamento aprovado!*\n\nOlá ${customerName.split(' ')[0]}!\n\nSeu plano *${productName}* foi ativado com sucesso.\n\nEm breve um de nossos especialistas vai entrar em contato pra configurar tudo pra você.\n\nEnquanto isso, se tiver qualquer dúvida, é só responder essa mensagem.`;

      await sendWhatsApp(phone, welcomeMessage);
    }

    console.log('[CRM Notified]', customerEmail);
  } catch (error) {
    console.error('[NotifyCRM Error]', error);
  }
}

async function handleCancellation(data: any) {
  console.log('[Cancellation]', data);
  // TODO: atualizar lead no EvoCRM pra stage de cancelamento
}

async function handleRefund(data: any) {
  console.log('[Refund]', data);
  // TODO: notificar SDR sobre reembolso
}
