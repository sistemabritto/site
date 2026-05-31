import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// GET /api/admin/debug — detailed Supabase health check
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabaseUrl || !supabaseKey) {
    return res.json({ error: 'Missing env vars', url: !!supabaseUrl, key: !!supabaseKey });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test pageviews
  const { count: pageviewCount, error: pvErr } = await supabase
    .from('pageviews')
    .select('*', { count: 'exact', head: true });

  // Test cta_clicks
  const { count: ctaCount, error: ctaErr } = await supabase
    .from('cta_clicks')
    .select('*', { count: 'exact', head: true });

  // Test site_config
  const { data: configData, error: configErr } = await supabase
    .from('site_config')
    .select('key, value')
    .limit(10);

  return res.json({
    env: {
      url: supabaseUrl.slice(0, 35),
      key_len: supabaseKey.length,
      key_role: (() => { try { const p = supabaseKey.split('.')[1]; const pad = p + '=='.slice(0, p.length % 4); return JSON.parse(atob(pad)).role; } catch { return 'unknown'; } })(),
    },
    pageviews: pvErr ? `ERR: ${pvErr.message}` : `OK (${pageviewCount} rows)`,
    cta_clicks: ctaErr ? `ERR: ${ctaErr.message}` : `OK (${ctaCount} rows)`,
    site_config: configErr ? `ERR: ${configErr.message}` : `OK (${configData?.length || 0} rows)`,
  });
}