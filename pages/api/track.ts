import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// POST /api/track — register pageview, CTA click, or quiz stage
// Public endpoint — no auth required
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type } = req.body;

  if (!supabaseKey) {
    console.error('track error: no Supabase key available');
    return res.status(200).json({ ok: false });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pageview tracking
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
        return res.status(200).json({ ok: false });
      }

      return res.status(200).json({ ok: true });
    }

    // CTA click tracking
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

    // Quiz funnel stage tracking
    if (type === 'quiz') {
      const { session_id, stage, quiz_source, timestamp } = req.body;

      if (!session_id || !stage) {
        return res.status(400).json({ error: 'session_id and stage required' });
      }

      const { error } = await supabase.from('quiz_funnel').insert({
        session_id,
        stage,
        quiz_source: quiz_source || '',
        timestamp: timestamp || new Date().toISOString(),
      });

      if (error) {
        console.error('quiz_funnel insert error:', error.message);
        return res.status(200).json({ ok: false });
      }

      return res.status(200).json({ ok: true });
    }

    // Legacy: support old format without type (just stage field from quiz)
    if (!type && req.body.stage) {
      const { stage, timestamp } = req.body;
      const session_id = req.body.session_id || `anon-${Date.now()}`;

      const { error } = await supabase.from('quiz_funnel').insert({
        session_id,
        stage,
        quiz_source: req.body.quiz_source || '',
        timestamp: timestamp || new Date().toISOString(),
      });

      if (error) {
        console.error('quiz_funnel insert error (legacy):', error.message);
        return res.status(200).json({ ok: false });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'type must be pageview, cta, or quiz' });
  } catch (err: any) {
    console.error('track error:', err?.message || err);
    return res.status(200).json({ ok: false });
  }
}