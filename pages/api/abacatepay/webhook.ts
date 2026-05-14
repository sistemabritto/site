import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';

// Webhook da AbacatePay para notificar pagamentos
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const signature = req.headers['x-abacatepay-signature'] as string;
    
    // Verificar assinatura HMAC (opcional, mas recomendado em produção)
    // const expectedSignature = createHash('sha256')
    //   .update(JSON.stringify(body) + process.env.ABACATEPAY_WEBHOOK_SECRET)
    //   .digest('hex');
    // if (signature !== expectedSignature) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    const { event, data } = body;

    console.log('[AbacatePay Webhook]', event, data);

    // Processar eventos
    switch (event) {
      case 'checkout.completed':
      case 'subscription.completed':
        // Novo pagamento aprovado → notificar CRM/SDR
        await notifyCRM(data);
        break;
      
      case 'subscription.cancelled':
        // Assinatura cancelada → atualizar status
        await handleCancellation(data);
        break;

      case 'checkout.refunded':
      case 'subscription.refunded':
        // Reembolso → notificar equipe
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

// Notificar CRM quando pagamento for aprovado
async function notifyCRM(data: any) {
  try {
    const { customer, items, externalId } = data;
    
    const productNames: Record<string, string> = {
      'whatsapp-ia-basico': 'WhatsApp IA Básico (R$ 297/mês)',
      'crm-ia-completo': 'CRM + IA Completo (R$ 750/mês)',
      'evonexus-premium': 'EvoNexus Premium (R$ 2.500/mês)',
      'hermes-selfhosted': 'Hermes Self-Hosted (R$ 3.500)',
    };

    const productName = productNames[externalId] || items?.[0]?.name || externalId;
    const customerName = customer?.name || 'Cliente';
    const customerEmail = customer?.email || 'Não informado';
    const customerPhone = customer?.cellphone || 'Não informado';

    // 1. Notificar SDR via Evolution API (WhatsApp)
    const evolutionApi = process.env.EVO_API_URL || 'https://go.workflowapi.com.br';
    const instanceId = process.env.EVO_INSTANCE || 'sistema-britto-business';
    const apiToken = process.env.EVO_TOKEN || 'ed260550-affc-42f1-92e3-45affea89e05';
    const sdrPhone = '5511914088571';
    
    const sdrMessage = `🎉 *NOVO PAGAMENTO APROVADO!*\n\n*Produto:* ${productName}\n*Cliente:* ${customerName}\n*Email:* ${customerEmail}\n*Telefone:* ${customerPhone}\n\n⚠️ Entrar em contato para onboarding!`;
    
    try {
      await fetch(`${evolutionApi}/message/sendText/${instanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiToken,
        },
        body: JSON.stringify({
          number: sdrPhone,
          text: sdrMessage,
        }),
      });
      console.log('[SDR Notified] WhatsApp sent to', sdrPhone);
    } catch (e) {
      console.error('[SDR Notify Error]', e);
    }

    // 2. Enviar mensagem de boas-vindas pro cliente
    if (customer?.cellphone) {
      const welcomeMessage = `🎉 *Pagamento aprovado!*\n\nOlá ${customerName.split(' ')[0]}!\n\nSeu plano *${productName}* foi ativado com sucesso.\n\nEm breve um de nossos especialistas vai entrar em contato pra configurar tudo pra você.\n\nEnquanto isso, se tiver qualquer dúvida, é só responder essa mensagem.`;
      
      try {
        await fetch(`${evolutionApi}/message/sendText/${instanceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiToken,
          },
          body: JSON.stringify({
            number: customer.cellphone.replace(/\D/g, ''),
            text: welcomeMessage,
          }),
        });
        console.log('[Customer Notified] WhatsApp sent to', customer.cellphone);
      } catch (e) {
        console.error('[Customer Notify Error]', e);
      }
    }

    // 3. Enviar para CRM webhook (se configurado)
    const crmWebhook = process.env.CRM_WEBHOOK_URL;
    if (crmWebhook) {
      await fetch(crmWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_customer',
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
          },
          product: productName,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    console.log('[CRM Notified]', customerEmail);
  } catch (error) {
    console.error('[NotifyCRM Error]', error);
  }
}

async function handleCancellation(data: any) {
  console.log('[Cancellation]', data);
  // Lógica de cancelamento
}

async function handleRefund(data: any) {
  console.log('[Refund]', data);
  // Lógica de reembolso
}
