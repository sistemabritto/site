import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { enviarEvento } from '../../../../lib/metaCapi';

// Checkout da ENTRADA (R$400 de R$800 parcelado) do pacote Ferreira Vieira —
// a outra opção é pagar à vista com desconto (checkout/ferreira-vieira-
// avista.ts, R$600). Uma proposta só, duas formas de pagamento.
const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || '';
const PRODUCT_ID = 'prod_jyHWJqCJQfWZzB1DCmbUBUt3'; // ferreira-vieira-etapa1-v2, R$400
const EXTERNAL_ID = 'ferreira-vieira-entrada';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!ABACATEPAY_KEY) {
    console.error('[checkout/ferreira-vieira-entrada] ABACATEPAY_API_KEY ausente');
    return res.status(500).json({ error: 'Checkout não configurado' });
  }

  const input = req.method === 'GET' ? req.query : req.body;
  const { customer_name, customer_email, customer_cellphone } = input as Record<string, string>;

  const returnUrl = `${SITE_URL}/obrigado?origem=ferreira-vieira`;
  const body: Record<string, unknown> = {
    items: [{ id: PRODUCT_ID, quantity: 1, externalId: EXTERNAL_ID }],
    returnUrl,
    completionUrl: returnUrl,
    methods: ['PIX', 'CARD'],
    metadata: { source: EXTERNAL_ID },
  };

  if (customer_email) {
    body.customer = {
      email: String(customer_email),
      name: customer_name ? String(customer_name) : String(customer_email).split('@')[0],
      cellphone: customer_cellphone ? String(customer_cellphone) : String(customer_email),
    };
  }

  try {
    const response = await fetch(`${ABACATEPAY_API}/checkouts/create`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ABACATEPAY_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (data.success && data.data?.url) {
      void enviarEvento({
        eventName: 'InitiateCheckout',
        eventId: crypto.randomUUID(),
        sourceUrl: `${SITE_URL}/api/abacatepay/checkout/ferreira-vieira-entrada`,
        value: 400,
        currency: 'BRL',
        contentName: EXTERNAL_ID,
        email: customer_email ? String(customer_email) : undefined,
        phone: customer_cellphone ? String(customer_cellphone) : undefined,
      }).catch((e) => console.error('[checkout/ferreira-vieira-entrada] CAPI InitiateCheckout falhou', e));

      if (req.method === 'GET') return res.redirect(302, data.data.url);
      return res.status(200).json({ url: data.data.url });
    }

    console.error('[checkout/ferreira-vieira-v2 Error]', JSON.stringify(data));
    return res.status(400).json({ error: data.error || 'Erro ao criar checkout' });
  } catch (error) {
    console.error('[checkout/ferreira-vieira-v2 Exception]', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
