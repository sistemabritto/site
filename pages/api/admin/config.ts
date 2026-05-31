import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env['SUPABASE' + '_SERVICE_KEY'] || '';

function getSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// GET /api/admin/config — read all config (public read, but admin-only access to this endpoint)
export async function getConfig(): Promise<Record<string, string>> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('site_config')
    .select('key, value');

  if (error || !data) return {};
  const config: Record<string, string> = {};
  for (const row of data) {
    config[row.key] = row.value;
  }
  return config;
}

// Upsert a config key
async function setConfig(key: string, value: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('site_config')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

  return !error;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify admin auth for all methods
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (req.method !== 'GET' || !token) {
    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Token invalido' });
    }
  }

  // GET — return all config
  if (req.method === 'GET') {
    const config = await getConfig();
    return res.status(200).json({ config });
  }

  // POST — update config keys
  if (req.method === 'POST') {
    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Token invalido' });
    }

    const { updates } = req.body as { updates: Record<string, string> };
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'updates object required' });
    }

    const results: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(updates)) {
      // Only allow whitelisted config keys
      const allowedKeys = ['meta_pixel_id', 'evocrm_api_status', 'site_name'];
      if (!allowedKeys.includes(key)) {
        results[key] = false;
        continue;
      }
      results[key] = await setConfig(key, value);
    }

    // Log the action
    const supabase = getSupabase();
    await supabase.from('admin_logs').insert({
      action: 'config_update',
      details: updates,
    });

    return res.status(200).json({ success: true, results });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
