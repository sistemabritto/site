import type { NextApiRequest, NextApiResponse } from 'next';

const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || 'abc_dev_6xbMgNHha22tetRbE0GUpuWZ';

const PRODUCTS: Record<string, string> = {
  // Produtos individuais
  'whatsapp-ia-basico': 'prod_jRg20GUgAmEjhy3QCr45ZtKn',
  'crm-ia-completo': 'prod_CWRuQwLLLJyKcFcUYCEfwUAG',
  'evonexus-premium': 'prod_uqRB2KTALEQWumHkp3h2PJLX',
  'hermes-selfhosted': 'prod_bzFSpy31qQc2z6rTpBhASz2X',
  // Combos (produto + consultoria R$250)
  'whatsapp-ia-combo-consultoria': 'prod_0GBDbERsmaarw0GMRkRLg2EF',
  'crm-ia-completo-combo-consultoria': 'prod_GsYQrUcz0GTEe1aYrXJXsT05',
  'evonexus-premium-combo-consultoria': 'prod_cSXakYDjq5tLnf0KT1gDmbHE',
};

// Cria customer na AbacatePay e retorna o ID
async function createCustomer(customer: { email: string; name: string; cellphone: string }): Promise<string | null> {
  try {
    const res = await fetch(`${ABACATEPAY_API}/customers/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ABACATEPAY_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email: customer.email,
          name: customer.name,
          cellphone: customer.cellphone,
        },
      }),
    });

    const data = await res.json();
    
    if (data.success && data.data?.id) {
      return data.data.id;
    }

    console.error('[Customer Create Error]', data);
    return null;
  } catch (error) {
    console.error('[Customer Error]', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, customer: customerData } = req.body;
    const abacateProductId = PRODUCTS[productId] || productId;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

    let customerId: string | null = null;

    // Se tiver dados do customer, CRIA ele primeiro e pega o ID
    if (customerData?.email && customerData?.cellphone) {
      customerId = await createCustomer({
        email: customerData.email,
        name: customerData.name || customerData.email.split('@')[0],
        cellphone: customerData.cellphone,
      });
      
      console.log('[Customer Created]', customerId ? customerId : 'FAILED');
    }

    const body: Record<string, unknown> = {
      items: [{ id: abacateProductId, quantity: 1 }],
      returnUrl: siteUrl + '/obrigado',
      completionUrl: siteUrl + '/obrigado',
    };

    // Usa customerId se conseguiu criar
    if (customerId) {
      body.customerId = customerId;
    }

    console.log('[AbacatePay Request]', JSON.stringify(body));

    const response = await fetch(`${ABACATEPAY_API}/subscriptions/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ABACATEPAY_KEY}`,
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
