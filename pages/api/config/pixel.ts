import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// GET /api/config/pixel — public endpoint, returns only the pixel ID
// Used by _app.tsx to inject Meta Pixel globally
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'meta_pixel_id')
      .single();

    if (error || !data) {
      return res.status(200).json({ pixel_id: '' });
    }

    // Cache for 5 minutes on CDN/Vercel edge
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return res.status(200).json({ pixel_id: data.value || '' });
  } catch {
    return res.status(200).json({ pixel_id: '' });
  }
}
