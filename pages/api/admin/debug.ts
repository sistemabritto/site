import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// GET /api/admin/debug — test Supabase connection + tables
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabaseUrl || !supabaseKey) {
    return res.json({ error: 'Missing env vars', url: !!supabaseUrl, key: !!supabaseKey });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test 1: insert pageview
  const { error: insertErr, data: insertData } = await supabase.from('pageviews').insert({
    session_id: 'debug-test',
    path: '/debug',
    utm_source: 'debug',
  }).select();

  // Test 2: select from pageviews
  const { data: selectData, error: selectErr } = await supabase
    .from('pageviews')
    .select('id, session_id, path, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  // Test 3: select from site_config
  const { data: configData, error: configErr } = await supabase
    .from('site_config')
    .select('key, value')
    .limit(3);

  return res.json({
    env: {
      url_prefix: supabaseUrl.slice(0, 30),
      key_len: supabaseKey.length,
      key_prefix: supabaseKey.slice(0, 20),
      key_role: (() => { try { const p = supabaseKey.split('.')[1]; return JSON.parse(atob(p)).role; } catch { return 'unknown'; } })(),
    },
    insert: insertErr ? `ERR: ${insertErr.message} (${insertErr.code})` : 'OK',
    select: selectErr ? `ERR: ${selectErr.message} (${selectErr.code})` : `${selectData?.length || 0} rows`,
    config: configErr ? `ERR: ${configErr.message} (${configErr.code})` : `${configData?.length || 0} rows`,
  });
}