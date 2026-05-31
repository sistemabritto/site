import type { NextApiRequest, NextApiResponse } from 'next';

// GET /api/admin/debug — show ALL Supabase env vars
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const envKeys = Object.keys(process.env).filter(k => k.toLowerCase().includes('sup') || k.toLowerCase().includes('key') || k.toLowerCase().includes('anon'));
  const envDump: Record<string, string> = {};
  for (const k of envKeys) {
    const v = process.env[k] || '';
    envDump[k] = `len=${v.length} prefix=${v.slice(0, 15)}...`;
  }

  return res.json({
    total_env_keys: Object.keys(process.env).length,
    filtered_keys: envKeys,
    values: envDump,
    next_public_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
  });
}