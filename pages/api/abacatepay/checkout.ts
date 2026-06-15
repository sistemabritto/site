import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || 'abc_dev_6xbMgNHha22tetRbE0GUpuWZ';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

const PRODUCTS: Record<string, string> = {
  'whatsapp-ia-basico': 'prod_jRg20GUgAmEjhy3QCr45ZtKn',
  'crm-ia-completo': 'prod_CWRuQwLLLJyKcFcUYCEfwUAG',
  'evonexus-premium': 'prod_uqRB2KTALEQWumHkp3h2PJLX',
  'hermes-selfhosted': 'prod_bzFSpy31qQc2z6rTpBhASz2X',
  'whatsapp-ia-combo-consultoria': 'prod_0GBDbERsmaarw0GMRkRLg2EF',
  'crm-ia-completo-combo-consultoria': 'prod_GsYQrUcz0GTEe1aYrXJXsT05',
  'evonexus-premium-combo-consultoria': 'prod_cSXakYDjq5tLnf0KT1gDmbHE',
  'vps-gerenciada': 'prod_tZQyF6wjgnECwGAy203fPL0U',
  'vps-gerenciada-combo-suporte': 'prod_DREjFsNq1ApYt31ggWssMJzL',
};

// Cria ou busca customer na AbacatePay
async function getOrCreateCustomer(customer: { email: string; name?: string; cellphone?: string }): Promise<string | null> {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Tenta achar customer existente no Supabase
    const { data: existing } = await supabase
      .from('customers')
      .select('abacate_customer_id')
      .eq('email', customer.email)
      .single();

    if (existing?.abacate_customer_id) {
      console.log('[Customer Found]', existing.abacate_customer_id);
      return existing.abacate_customer_id;
    }

    // Cria novo customer na AbacatePay
    const res = await fetch(`${ABACATEPAY_API}/customers/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ABACATEPAY_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customer.email,
        name: customer.name || customer.email.split('@')[0],
        cellphone: customer.cellphone || customer.email, // Fallback: usa email se não tiver telefone
      }),
    });

    const data = await res.json();
    
    if (data.success && data.data?.id) {
      const customerId = data.data.id;
      
      // Salva no Supabase
      await supabase.from('customers').insert({
        abacate_customer_id: customerId,
        email: customer.email,
        name: customer.name || customer.email.split('@')[0],
        cellphone: customer.cellphone || customer.email,
      });

      console.log('[Customer Created]', customerId);
      return customerId;
    }

    console.error('[Customer Create Error]', data);
    return null;
  } catch (error) {
    console.error('[Customer Error]', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 // Aceita POST (body) e GET (query param) para suportar /api/abacatepay/checkout/zapcurso
 const body = req.method === 'GET' ? req.query : req.body;

 if (req.method !== 'POST' && req.method !== 'GET') {
  return res.status(405).json({ error: 'Method not allowed' });
 }

  try {
    const { productId, customer: customerData, returnUrl, metadata } = body;
    const abacateProductId = PRODUCTS[productId] || productId;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

    // Metadata = UTMs + source page — salva no Supabase pra webhook usar depois
    if (metadata && customerData?.email) {
    try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.from('checkout_metadata').upsert({
    email: customerData.email,
    product_id: productId,
    ...metadata,
    }, { onConflict: 'email' });
    console.log('[Metadata Saved]', customerData.email, metadata);
    } catch (e) {
    console.error('[Metadata Save Error]', e);
    }
    }

    let customerId: string | null = null;

    // Se tiver email, tenta criar/buscar customer
    if (customerData?.email) {
      customerId = await getOrCreateCustomer({
        email: customerData.email,
        name: customerData.name,
        cellphone: customerData.cellphone,
      });
    }

    const body: Record<string, unknown> = {
      items: [{ id: abacateProductId, quantity: 1 }],
      returnUrl: returnUrl || siteUrl + '/obrigado',
      completionUrl: returnUrl || siteUrl + '/obrigado',
    };

    // Usa customerId se conseguiu criar
    if (customerId) {
      body.customerId = customerId;
      console.log('[AbacatePay Request with Customer]', customerId);
    } else {
      console.log('[AbacatePay Request without Customer]');
    }

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
