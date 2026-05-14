import type { NextApiRequest, NextApiResponse } from 'next';

const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || 'abc_dev_6xbMgNHha22tetRbE0GUpuWZ';

// Mapeamento de produtos
const PRODUCTS: Record<string, string> = {
  'whatsapp-ia-basico': 'prod_jRg20GUgAmEjhy3QCr45ZtKn',
  'crm-ia-completo': 'prod_CWRuQwLLLJyKcFcUYCEfwUAG',
  'evonexus-premium': 'prod_uqRB2KTALEQWumHkp3h2PJLX',
  'hermes-selfhosted': 'prod_bzFSpy31qQc2z6rTpBhASz2X',
  'consultoria-tecnica-whatsapp': 'prod_ORDER_BUMP_CONSULTORIA_250',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, customer, orderBump } = req.body;
    
    const abacateProductId = PRODUCTS[productId] || productId;

    // Montar items (produto principal + order bump se marcado)
    const items = [{ id: abacateProductId, quantity: 1 }];
    if (orderBump) {
      const bumpId = PRODUCTS['consultoria-tecnica-whatsapp'];
      if (bumpId) {
        items.push({ id: bumpId, quantity: 1 });
      }
    }

    // Criar checkout na AbacatePay
    const response = await fetch(`${ABACATEPAY_API}/checkouts/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ABACATEPAY_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        customer: customer ? {
          email: customer.email,
          name: customer.name,
          cellphone: customer.cellphone,
          // Pré-preencher telefone no checkout
          metadata: {
            whatsapp: customer.cellphone,
          },
        } : undefined,
        returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br'}/obrigado`,
        completionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br'}/obrigado`,
      }),
    });

    const data = await response.json();

    if (data.success && data.data?.url) {
      res.status(200).json({ url: data.data.url });
    } else {
      console.error('[AbacatePay Error]', data);
      res.status(400).json({ error: data.error || 'Erro ao criar checkout' });
    }
  } catch (error) {
    console.error('[Checkout Error]', error);
    res.status(500).json({ error: 'Erro interno' });
  }
}
