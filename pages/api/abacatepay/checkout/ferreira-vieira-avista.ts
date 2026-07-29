import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { enviarEvento, clientInfoFromReq } from '../../../../lib/metaCapi';

// Checkout À VISTA (R$600, 25% de desconto sobre os R$800) do pacote Ferreira
// Vieira — a outra opção é a entrada parcelada (checkout/ferreira-vieira-
// entrada.ts, R$400 de R$800). Uma proposta só, duas formas de pagamento.
const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || '';
const PRODUCT_ID = 'prod_q5SruHTydTcxnGuqMbPXWELK'; // ferreira-vieira-avista, R$600
const EXTERNAL_ID = 'ferreira-vieira-avista';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!ABACATEPAY_KEY) {
    console.error('[checkout/ferreira-vieira-avista] ABACATEPAY_API_KEY ausente');
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
        sourceUrl: `${SITE_URL}/api/abacatepay/checkout/ferreira-vieira-avista`,
        value: 600,
        currency: 'BRL',
        contentName: EXTERNAL_ID,
        email: customer_email ? String(customer_email) : undefined,
        phone: customer_cellphone ? String(customer_cellphone) : undefined,
        ...clientInfoFromReq(req),
      }).catch((e) => console.error('[checkout/ferreira-vieira-avista] CAPI InitiateCheckout falhou', e));

      if (req.method === 'GET') return res.redirect(302, data.data.url);
      return res.status(200).json({ url: data.data.url });
    }

    console.error('[checkout/ferreira-vieira-avista Error]', JSON.stringify(data));
    return res.status(400).json({ error: data.error || 'Erro ao criar checkout' });
  } catch (error) {
    console.error('[checkout/ferreira-vieira-avista Exception]', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
