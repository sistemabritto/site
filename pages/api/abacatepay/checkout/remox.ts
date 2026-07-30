import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { enviarEvento, clientInfoFromReq } from '../../../../lib/metaCapi';

// Assinatura mensal recorrente da proposta Remox — R$ 297/mês, sem setup e sem
// fidelidade. Usa /subscriptions/create (como checkout/zapclub.ts), NÃO
// /checkouts/create: o produto tem cycle=MONTHLY, e cobrança avulsa num produto
// recorrente cobraria uma vez só e mataria a receita recorrente silenciosamente.
//
// Diferente de zapclub.ts em um ponto deliberado: aqui o GET responde 302 em vez
// de JSON. O destino é um botão dentro de uma proposta HTML estática servida
// pelo /shares do Nexus — sem JS, sem fetch. Um endpoint que devolve JSON exigiria
// script na página, e o Nexus serve o share com CSP restritiva.
const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || '';
const PRODUCT_ID = 'prod_MCkD0FWqb0smuYfehR3ke6JX'; // remox-crm-mensal, R$ 297,00/mês
const EXTERNAL_ID = 'remox-crm-mensal';
const VALOR = 297;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!ABACATEPAY_KEY) {
    console.error('[checkout/remox] ABACATEPAY_API_KEY ausente');
    return res.status(500).json({ error: 'Checkout não configurado' });
  }

  const input = req.method === 'GET' ? req.query : req.body;

  try {
    const {
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      customer_name, customer_email, customer_cellphone,
    } = input;

    const utm: Record<string, string> = {
      ...(utm_source ? { utm_source: String(utm_source) } : {}),
      ...(utm_medium ? { utm_medium: String(utm_medium) } : {}),
      ...(utm_campaign ? { utm_campaign: String(utm_campaign) } : {}),
      ...(utm_term ? { utm_term: String(utm_term) } : {}),
      ...(utm_content ? { utm_content: String(utm_content) } : {}),
    };

    const qs = new URLSearchParams(utm).toString();
    const returnUrl = `${SITE_URL}/obrigado${qs ? '?' + qs : ''}`;

    const body: Record<string, unknown> = {
      items: [{ id: PRODUCT_ID, quantity: 1, externalId: EXTERNAL_ID }],
      returnUrl,
      completionUrl: returnUrl,
      metadata: { source: EXTERNAL_ID, page: '/proposta-remox', ...utm },
    };

    if (customer_email) {
      body.customer = {
        email: String(customer_email),
        name: customer_name ? String(customer_name) : String(customer_email).split('@')[0],
        cellphone: customer_cellphone ? String(customer_cellphone) : String(customer_email),
      };
    }

    console.log('[checkout/remox Request]', JSON.stringify(body));

    const response = await fetch(`${ABACATEPAY_API}/subscriptions/create`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ABACATEPAY_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[checkout/remox Response]', JSON.stringify(data));

    if (data.success && data.data?.url) {
      // Fire-and-forget: o CAPI nunca pode atrasar nem derrubar o redirect —
      // quem clicou em "assinar" tem de chegar no checkout de qualquer jeito.
      void enviarEvento({
        eventName: 'InitiateCheckout',
        eventId: crypto.randomUUID(),
        sourceUrl: `${SITE_URL}/proposta-remox`,
        value: VALOR,
        currency: 'BRL',
        contentName: EXTERNAL_ID,
        email: customer_email ? String(customer_email) : undefined,
        phone: customer_cellphone ? String(customer_cellphone) : undefined,
        ...clientInfoFromReq(req),
      }).catch((e) => console.error('[checkout/remox] CAPI InitiateCheckout falhou', e));

      if (req.method === 'GET') {
        return res.redirect(302, data.data.url);
      }
      return res.status(200).json({ url: data.data.url });
    }

    console.error('[checkout/remox Error]', JSON.stringify(data));
    return res.status(400).json({ error: data.error || 'Erro ao criar checkout' });
  } catch (error) {
    console.error('[checkout/remox Exception]', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
