import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env['SUPABASE' + '_SERVICE_KEY'] || '';

// GET /api/admin/debug — test Supabase connection + tables
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabaseServiceKey) {
    return res.json({ error: 'SUPABASE_SERVICE_KEY not set' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Test: can we insert into pageviews?
    const { error: insertErr } = await supabase.from('pageviews').insert({
      session_id: 'debug-test',
      path: '/debug',
      referrer: '',
      utm_source: 'debug',
    });

    // Test: can we select from site_config?
    const { data: config, error: selectErr } = await supabase
      .from('site_config')
      .select('key, value');

    return res.json({
      service_key_len: supabaseServiceKey.length,
      service_key_prefix: supabaseServiceKey.slice(0, 20),
      pageview_insert: insertErr ? `ERR: ${insertErr.message}` : 'OK',
      site_config: selectErr ? `ERR: ${selectErr.message}` : `${config?.length || 0} rows`,
    });
  } catch (e: any) {
    return res.json({ catch_error: e?.message || String(e) });
  }
}