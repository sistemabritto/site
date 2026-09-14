import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Proxy server-side de /guia-openreply pro share do Nexus, mesmo padrão de
// pages/api/guia-ia-proxy.ts e pages/api/guia-vps-proxy.ts — ver aquele
// arquivo e .claude/rules/artifacts.md (repo evo-nexus) pro porquê completo.
const SHARE_URL = 'https://nexus.workflowapi.com.br/api/shares/xbbH5ibssxtS_fCYoIXdHrwW-RqdSthWORAf8C45_9o/view';
const PUBLIC_PATH = '/guia-openreply';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

async function registrarPageview(req: NextApiRequest): Promise<void> {
  if (!supabaseKey) {
    console.error('[guia-openreply-proxy] sem chave do Supabase — pageview não gravado');
    return;
  }
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const q = req.query;
    const session_id = `guia-openreply-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const { error } = await supabase.from('pageviews').insert({
      session_id,
      path: PUBLIC_PATH,
      referrer: String(req.headers.referer || req.headers.referrer || ''),
      utm_source: String(q.utm_source || ''),
      utm_medium: String(q.utm_medium || ''),
      utm_campaign: String(q.utm_campaign || ''),
      utm_content: String(q.utm_content || ''),
    });
    if (error) console.error('[guia-openreply-proxy] pageview insert error:', error.message);
  } catch (err) {
    console.error('[guia-openreply-proxy] pageview tracking indisponível:', err instanceof Error ? err.message : err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  void registrarPageview(req);

  try {
    const upstream = await fetch(SHARE_URL, { signal: AbortSignal.timeout(10000) });
    if (!upstream.ok) {
      res.status(upstream.status).send('Material indisponível no momento.');
      return;
    }
    const html = await upstream.text();
    const csp = upstream.headers.get('content-security-policy');
    if (csp) res.setHeader('Content-Security-Policy', csp);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.status(200).send(html);
  } catch (err) {
    console.error('[guia-openreply-proxy] proxy falhou:', err instanceof Error ? err.message : err);
    res.status(502).send('Material indisponível no momento.');
  }
}
