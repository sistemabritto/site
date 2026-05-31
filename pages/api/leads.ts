import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const EVOCRM_API_URL = 'https://evoapi.workflowapi.com.br/public/api/v1';
const EVOCRM_TOKEN='3e21328779b31ad40f791f18126b86ffd41cb9739b7a9c3fde42bc296f20f20a';

const DEFAULT_PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e';
const DEFAULT_STAGE_ID = '0e31e649-af37-4a6f-87fb-cd25d52225e5';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, whatsapp, phone, source, utm_source, utm_medium, utm_campaign, utm_content, answers, order_bump, value } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }

  const phone_number = whatsapp || phone || '';
  const now = new Date().toISOString();

  let supabaseOk = false;
  let supabaseError = '';
  let evocrmOk = false;
  let evocrmError = '';

  // 1) Save to Supabase
  if (supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error, status } = await supabase.from('leads').insert({
        name: name || '',
        email,
        phone: phone_number,
        source: source || 'direct',
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        utm_content: utm_content || '',
        answers: answers ? JSON.stringify(answers) : null,
        order_bump: order_bump || false,
        value: value || 0,
        created_at: now,
      });
      if (!error) {
        supabaseOk = true;
      } else {
        supabaseError = `${error.code}: ${error.message}${error.details ? ' — ' + error.details : ''}`;
        console.error('Supabase insert error:', error.code, error.message, error.details);
      }
    } catch (err: any) {
      supabaseError = `catch: ${err?.message || String(err)}`;
      console.error('Supabase exception:', supabaseError);
    }
  } else {
    supabaseError = 'no key configured';
  }

  // 2) Create lead in EvoCRM
  try {
    const leadPayload: any = {
      contact: {
        name: name || email.split('@')[0],
        email,
        phone_number: phone_number ? (phone_number.startsWith('+') ? phone_number : `+55${phone_number.replace(/\D/g, '')}`) : '',
      },
      deal: {
        pipeline_id: DEFAULT_PIPELINE_ID,
        stage_id: DEFAULT_STAGE_ID,
        name: `${name || email.split('@')[0]} — ${source || 'site'}`,
      },
      custom_fields: {
        source: source || 'direct',
        lead_source: 'public_api',
        order_bump: order_bump || false,
        value: value || 0,
        lead_metadata: {
          utm_source: utm_source || 'direct',
          utm_medium: utm_medium || '',
          utm_campaign: utm_campaign || '',
          utm_content: utm_content || '',
          captured_at: now,
          ...(answers ? { answers } : {}),
        },
      },
    };

    const evoResp = await fetch(`${EVOCRM_API_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': EVOCRM_TOKEN,
      },
      body: JSON.stringify(leadPayload),
    });

    if (evoResp.ok) {
      evocrmOk = true;
    } else {
      const errBody = await evoResp.text();
      evocrmError = errBody.slice(0, 200);
    }
  } catch (err: any) {
    evocrmError = err?.message || 'fetch failed';
  }

  return res.status(200).json({
    ok: supabaseOk || evocrmOk,
    supabase: supabaseOk,
    supabaseError: supabaseError || undefined,
    evocrm: evocrmOk,
    evocrmError: evocrmError || undefined,
  });
}