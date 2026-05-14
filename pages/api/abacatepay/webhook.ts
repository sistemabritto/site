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
    
    // Enviar para EvoNexus/CRM via webhook interno
    const crmWebhook = process.env.CRM_WEBHOOK_URL;
    if (crmWebhook) {
      await fetch(crmWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_customer',
          customer: {
            name: customer?.name,
            email: customer?.email,
            phone: customer?.cellphone,
          },
          product: items?.[0]?.name || externalId,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    // Opcional: Enviar WhatsApp automático via Evolution API
    const evolutionApi = process.env.EVOLUTION_API_URL;
    const instanceId = process.env.EVOLUTION_INSTANCE_ID;
    const apiToken = process.env.EVOLUTION_API_TOKEN;
    
    if (evolutionApi && instanceId && apiToken) {
      const message = `🎉 *Pagamento Aprovado!*\n\nOlá ${customer?.name || 'Cliente'},\nSeu plano *${items?.[0]?.name || 'Sistema Britto'}* foi ativado com sucesso!\n\nEm breve um de nossos especialistas entrará em contato para as boas-vindas.`;
      
      await fetch(`${evolutionApi}/message/sendText/${instanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiToken,
        },
        body: JSON.stringify({
          number: customer?.cellphone?.replace(/\D/g, '') || '',
          message,
        }),
      });
    }

    console.log('[CRM Notified]', customer?.email);
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
