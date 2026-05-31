import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// GET /api/admin/debug — Supabase health check for internal monitoring
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ ok: false, error: 'Missing env vars' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fast health check — just count rows
    const { count: pageviewCount } = await supabase
      .from('pageviews')
      .select('*', { count: 'exact', head: true });

    return res.json({
      ok: true,
      pageviews: pageviewCount || 0,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(500).json({ ok: false, error: 'Supabase unreachable' });
  }
}