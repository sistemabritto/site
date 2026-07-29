import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { enviarEvento, clientInfoFromReq } from '../../../../lib/metaCapi';

// Checkout avulso (não assinatura) para a call de PRD de R$147 — a oferta
// principal de /sistema desde 27/07/2026. Diferente de checkout/zapclub.ts e
// checkout.ts (que criam ASSINATURA via /subscriptions/create): esta é uma
// cobrança única, então usa /checkouts/create (ver docs.abacatepay.com/pages/
// payment/create — frequência ONE_TIME por padrão quando o produto não tem
// `cycle`).
const ABACATEPAY_API = 'https://api.abacatepay.com/v2';
const ABACATEPAY_KEY = process.env.ABACATEPAY_API_KEY || '';
const PRODUCT_ID = 'prod_XR4saZFbcDxNPdmtXEK2jGXt'; // call-prd-sistema, R$ 147,00
const EXTERNAL_ID = 'call-prd-sistema';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sistemabritto.com.br';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!ABACATEPAY_KEY) {
    console.error('[checkout/sistema] ABACATEPAY_API_KEY ausente');
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

    // Salva UTM por email ANTES do redirect — é isso que o webhook lê depois
    // pra atribuir a origem no lead do CRM (mesmo padrão de checkout.ts).
    if (customer_email && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('checkout_metadata').upsert({
          email: String(customer_email),
          product_id: EXTERNAL_ID,
          page: '/sistema',
          ...utm,
        }, { onConflict: 'email' });
      } catch (e) {
        console.error('[checkout/sistema] Metadata Save Error', e);
      }
    }

    const body: Record<string, unknown> = {
      items: [{ id: PRODUCT_ID, quantity: 1, externalId: EXTERNAL_ID }],
      returnUrl,
      completionUrl: returnUrl,
      methods: ['PIX', 'CARD'],
      metadata: { source: EXTERNAL_ID, page: '/sistema', ...utm },
    };

    if (customer_email) {
      body.customer = {
        email: String(customer_email),
        name: customer_name ? String(customer_name) : String(customer_email).split('@')[0],
        cellphone: customer_cellphone ? String(customer_cellphone) : String(customer_email),
      };
    }

    console.log('[checkout/sistema Request]', JSON.stringify(body));

    const response = await fetch(`${ABACATEPAY_API}/checkouts/create`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ABACATEPAY_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[checkout/sistema Response]', JSON.stringify(data));

    if (data.success && data.data?.url) {
      // InitiateCheckout via CAPI — fire-and-forget, nunca atrasa o redirect.
      // event_id gerado aqui mesmo (não há Pixel client-side gêmeo pra este
      // evento ainda; se um dia entrar, precisa usar o mesmo id via query
      // param pra deduplicar em vez de gerar um novo).
      void enviarEvento({
        eventName: 'InitiateCheckout',
        eventId: crypto.randomUUID(),
        sourceUrl: `${SITE_URL}/sistema`,
        value: 147,
        currency: 'BRL',
        contentName: EXTERNAL_ID,
        email: customer_email ? String(customer_email) : undefined,
        phone: customer_cellphone ? String(customer_cellphone) : undefined,
        ...clientInfoFromReq(req),
      }).catch((e) => console.error('[checkout/sistema] CAPI InitiateCheckout falhou', e));

      if (req.method === 'GET') {
        return res.redirect(302, data.data.url);
      }
      return res.status(200).json({ url: data.data.url });
    }

    console.error('[checkout/sistema Error]', JSON.stringify(data));
    return res.status(400).json({ error: data.error || 'Erro ao criar checkout' });
  } catch (error) {
    console.error('[checkout/sistema Exception]', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
