import type { NextApiRequest, NextApiResponse } from 'next';

const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || 'abc_dev_6xbMgNHha22tetRbE0GUpuWZ';

const PRODUCTS: Record<string, string> = {
  'whatsapp-ia-basico': 'prod_jRg20GUgAmEjhy3QCr45ZtKn',
  'crm-ia-completo': 'prod_CWRuQwLLLJyKcFcUYCEfwUAG',
  'evonexus-premium': 'prod_uqRB2KTALEQWumHkp3h2PJLX',
  'hermes-selfhosted': 'prod_bzFSpy31qQc2z6rTpBhASz2X',
  'whatsapp-ia-combo-consultoria': 'prod_0GBDbERsmaarw0GMRkRLg2EF',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, customer, orderBump } = req.body;
    
    // Se order bump marcado, usa produto combo (R$297 + R$250 = R$547/mês)
    const finalProductId = orderBump ? 'whatsapp-ia-combo-consultoria' : productId;
    const abacateProductId = PRODUCTS[finalProductId] || finalProductId;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

    const body: Record<string, unknown> = {
      items: [{ id: abacateProductId, quantity: 1 }],
      returnUrl: siteUrl + '/obrigado',
      completionUrl: siteUrl + '/obrigado',
    };

    if (customer) {
      body.customer = {
        email: customer.email,
        name: customer.name,
        cellphone: customer.cellphone,
      };
    }

    console.log('[AbacatePay Request]', JSON.stringify(body));

    const response = await fetch(ABACATEPAY_API + '/subscriptions/create', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + ABACATEPAY_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[AbacatePay Response]', data);

    if (data.success && data.data?.url) {
      res.status(200).json({ url: data.data.url });
    } else {
      console.error('[AbacatePay Error]', data);
      res.status(400).json({ error: data.error || 'Erro ao criar assinatura' });
    }
  } catch (error) {
    console.error('[Checkout Error]', error);
    res.status(500).json({ error: 'Erro interno' });
  }
}
