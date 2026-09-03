import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { clientInfoFromReq, enviarEvento } from '../../../../lib/metaCapi';

const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || '';
// O produto precisa ser criado no painel de pagamentos e configurado no
// ambiente. Não há fallback/hardcode: apontar uma oferta nova para um produto
// existente cobraria pela coisa errada.
const PRODUCT_ID = process.env.ABACATEPAY_DESAFIO_MONETIZAR_COM_IA_PRODUCT_ID || '';
const EXTERNAL_ID = 'desafio-monetizar-com-ia';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!ABACATEPAY_KEY || !PRODUCT_ID) {
    console.error('[checkout/desafio-monetizar-com-ia] checkout não configurado');
    return res.status(503).json({ error: 'Inscrições ainda não foram liberadas. Seu interesse foi registrado; tente novamente quando a turma abrir.' });
  }

  try {
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content, customer_name, customer_email, customer_cellphone } = req.query;
    const utm = {
      ...(utm_source ? { utm_source: String(utm_source) } : {}),
      ...(utm_medium ? { utm_medium: String(utm_medium) } : {}),
      ...(utm_campaign ? { utm_campaign: String(utm_campaign) } : {}),
      ...(utm_term ? { utm_term: String(utm_term) } : {}),
      ...(utm_content ? { utm_content: String(utm_content) } : {}),
    };
    const qs = new URLSearchParams({ ...utm, product: EXTERNAL_ID }).toString();
    const returnUrl = `${SITE_URL}/obrigado-desafio${qs ? `?${qs}` : ''}`;
    const body: Record<string, unknown> = {
      items: [{ id: PRODUCT_ID, quantity: 1, externalId: EXTERNAL_ID }],
      returnUrl,
      completionUrl: returnUrl,
      methods: ['PIX', 'CARD'],
      metadata: { source: EXTERNAL_ID, page: '/desafio-monetizar-com-ia', ...utm },
    };

    if (customer_email) {
      body.customer = {
        email: String(customer_email),
        name: customer_name ? String(customer_name) : String(customer_email).split('@')[0],
        cellphone: customer_cellphone ? String(customer_cellphone) : String(customer_email),
      };
    }

    const response = await fetch(`${ABACATEPAY_API}/checkouts/create`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ABACATEPAY_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!data.success || !data.data?.url) {
      console.error('[checkout/desafio-monetizar-com-ia] checkout recusado', JSON.stringify(data));
      return res.status(400).json({ error: data.error || 'Não foi possível abrir o checkout agora.' });
    }

    void enviarEvento({
      eventName: 'InitiateCheckout',
      eventId: crypto.randomUUID(),
      sourceUrl: `${SITE_URL}/desafio-monetizar-com-ia`,
      value: 97,
      currency: 'BRL',
      contentName: EXTERNAL_ID,
      email: customer_email ? String(customer_email) : undefined,
      phone: customer_cellphone ? String(customer_cellphone) : undefined,
      ...clientInfoFromReq(req),
    }).catch((error) => console.error('[checkout/desafio-monetizar-com-ia] CAPI falhou', error));

    return res.status(200).json({ url: data.data.url });
  } catch (error) {
    console.error('[checkout/desafio-monetizar-com-ia] exceção', error);
    return res.status(500).json({ error: 'Erro interno ao criar checkout.' });
  }
}
