import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const EVOCRM_API_URL = 'https://evoapi.workflowapi.com.br/public/api/v1';
const EVOCRM_TOKEN='3e2132...f20a';

const DEFAULT_PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e';
const NOVO_LEAD_STAGE_ID = '0e31e649-af37-4a6f-87fb-cd25d52225e5';
const QUALIFICACAO_STAGE_ID = '534893fe-843e-4731-9783-e26064ac8498';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, email, name, whatsapp, phone, answers, result, utm, timestamp, userAgent } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }

  const phone_number = whatsapp || phone || '';
  const now = timestamp || new Date().toISOString();
  let supabaseOk = false;
  let evocrmOk = false;

  // 1) Save/upsert to Supabase leads
  if (supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from('leads').upsert({
        name: name || email.split('@')[0],
        email,
        phone: phone_number,
        source: event || 'qualificacao',
        utm_source: utm?.utm_source || '',
        utm_medium: utm?.utm_medium || '',
        utm_campaign: utm?.utm_campaign || '',
        utm_content: utm?.utm_content || '',
        answers: answers ? JSON.stringify(answers) : null,
        created_at: now,
      }, { onConflict: 'email' });
      if (!error) supabaseOk = true;
      else console.error('Supabase qualificacao error:', error.message);
    } catch (err: any) {
      console.error('Supabase qualificacao exception:', err?.message || err);
    }
  }

  // 2) Create/update lead in EvoCRM
  try {
    const stageId = (event === 'qualification_completed' || event === 'qualification_digital_completed')
      ? QUALIFICACAO_STAGE_ID
      : NOVO_LEAD_STAGE_ID;

    const leadPayload: any = {
      contact: {
        name: name || email.split('@')[0],
        email,
        phone_number: phone_number ? (phone_number.startsWith('+') ? phone_number : `+55${phone_number.replace(/\D/g, '')}`) : '',
      },
      deal: {
        pipeline_id: DEFAULT_PIPELINE_ID,
        stage_id: stageId,
        name: `${name || email.split('@')[0]} — ${event || 'qualificacao'}`,
      },
      custom_fields: {
        source: event || 'qualificacao',
        lead_source: 'public_api',
        order_bump: false,
        value: 0,
        lead_metadata: {
          utm_source: utm?.utm_source || 'direct',
          utm_medium: utm?.utm_medium || '',
          utm_campaign: utm?.utm_campaign || '',
          captured_at: now,
          qualification_event: event || '',
          ...(result ? { result } : {}),
          ...(answers ? { answers } : {}),
          ...(userAgent ? { user_agent: userAgent.slice(0, 200) } : {}),
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
      console.error('EvoCRM qualificacao error:', evoResp.status, errBody.slice(0, 300));
    }
  } catch (err: any) {
    console.error('EvoCRM qualificacao exception:', err?.message || err);
  }

  return res.status(200).json({
    ok: supabaseOk || evocrmOk,
    supabase: supabaseOk,
    evocrm: evocrmOk,
  });
}