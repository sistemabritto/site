import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// GET /api/config/tracking — public endpoint (o _app.tsx lê sem auth)
// Devolve apenas os perfis ATIVOS com meta_pixel_id preenchido — é o que o
// site injeta no browser. Token CAPI nunca sai daqui (vive em secret_config).
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from('tracking_profiles')
      .select('slug, nome, meta_pixel_id, google_tag_id, ativo')
      .eq('ativo', true)
      .order('ordem', { ascending: true });

    if (error || !data) {
      return res.status(200).json({ companies: [] });
    }

    const companies = data
      .filter((row) => row.meta_pixel_id) // sem pixel não há o que injetar
      .map((row) => ({
        slug: row.slug,
        nome: row.nome,
        meta_pixel_id: row.meta_pixel_id,
        google_tag_id: row.google_tag_id || '',
      }));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ companies });
  } catch {
    return res.status(200).json({ companies: [] });
  }
}
