import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env['SUPABASE' + '_SERVICE_KEY'] || '';

// POST /api/track — register pageview or CTA click
// Body: { type: 'pageview' | 'cta', ...payload }
// Public endpoint — no auth required (RLS allows INSERT)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { type } = req.body;

  if (type === 'pageview') {
    const { session_id, path, referrer, utm_source, utm_medium, utm_campaign, utm_content } = req.body;

    if (!session_id || !path) {
      return res.status(400).json({ error: 'session_id and path required' });
    }

    const { error } = await supabase.from('pageviews').insert({
      session_id,
      path,
      referrer: referrer || '',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      utm_content: utm_content || '',
    });

    if (error) {
      console.error('pageview insert error:', error.message);
      return res.status(200).json({ ok: false }); // silent fail — never block the user
    }

    return res.status(200).json({ ok: true });
  }

  if (type === 'cta') {
    const { session_id, page, cta_label, cta_action } = req.body;

    if (!session_id || !page || !cta_label) {
      return res.status(400).json({ error: 'session_id, page, cta_label required' });
    }

    const { error } = await supabase.from('cta_clicks').insert({
      session_id,
      page,
      cta_label,
      cta_action: cta_action || '',
    });

    if (error) {
      console.error('cta_click insert error:', error.message);
      return res.status(200).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: 'type must be pageview or cta' });
}
