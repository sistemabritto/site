import type { NextApiRequest, NextApiResponse } from 'next';

// GET /api/admin/debug — show ALL Supabase env vars
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const envKeys = Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('supabase'));
  const envDump: Record<string, string> = {};
  for (const k of envKeys) {
    const v = process.env[k] || '';
    envDump[k] = `len=${v.length} prefix=${v.slice(0, 15)}...`;
  }

  return res.json({
    all_supabase_keys: envKeys,
    values: envDump,
    direct_access: {
      dot: process.env.SUPABASE_SERVICE_KEY ? `len=${process.env.SUPABASE_SERVICE_KEY.length}` : 'UNDEFINED',
      bracket: process.env['SUPABASE_SERVICE_KEY'] ? `len=${process.env['SUPABASE_SERVICE_KEY'].length}` : 'UNDEFINED',
    },
  });
}