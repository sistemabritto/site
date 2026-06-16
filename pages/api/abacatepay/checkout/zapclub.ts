import type { NextApiRequest, NextApiResponse } from 'next';

const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || 'abc_dev_stLP4GLSqfgnHygHA6uuCSKs';
const PRODUCT_ID = 'prod_jRg20GUgAmEjhy3QCr45ZtKn'; // whatsapp-ia-basico
const EXTERNAL_ID = 'zapclub';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET com ?productId=zapclub&utm_source=...' });
  }

  try {
    const {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      customer_name,
      customer_email,
      customer_cellphone,
    } = req.query;

    const utm = {
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
      metadata: {
        source: 'zapclub',
        ...utm,
      },
    };

    if (customer_email) {
      body.customer = {
        email: String(customer_email),
        name: customer_name ? String(customer_name) : String(customer_email).split('@')[0],
        cellphone: customer_cellphone ? String(customer_cellphone) : String(customer_email),
      };
    }

    console.log('[AbacatePay /zapclub Request]', JSON.stringify(body));

    const response = await fetch(`${ABACATEPAY_API}/subscriptions/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ABACATEPAY_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[AbacatePay /zapclub Response]', JSON.stringify(data));

    if (data.success && data.data?.url) {
      return res.status(200).json({ url: data.data.url });
    }

    console.error('[AbacatePay /zapclub Error]', JSON.stringify(data));
    return res.status(400).json({ error: data.error || 'Erro ao criar checkout' });
  } catch (error) {
    console.error('[AbacatePay /zapclub Exception]', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
