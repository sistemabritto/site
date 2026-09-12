import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Proxy server-side de /guia-ia pro share do Nexus, com duas coisas que um
// rewrite puro do next.config.js não dava:
//
// 1. Grava o pageview na MESMA tabela `pageviews` que todo o resto do site
//    usa — sem isto, tráfego orgânico pra esse material ficava invisível no
//    /admin (o painel único de medição), só existindo no /shares do Nexus,
//    um painel separado que ninguém olha no dia a dia. Ver
//    .claude/rules/artifacts.md ("Material com marca própria...") no repo
//    evo-nexus pro porquê e como replicar pro próximo guia.
// 2. Repassa o header Content-Security-Policy do Nexus (`default-src 'none'`)
//    — sem isto, um proxy ingênuo perde essa defesa (o share existe
//    justamente pra bloquear todo JS, inclusive de prompt injection lendo a
//    sessão do superadmin).
const SHARE_URL = 'https://nexus.workflowapi.com.br/api/shares/S-cWKBHHyY3u3hZKrlFVs3i1Ine0oz7Y1ZTMeMH9MO8/view';
const PUBLIC_PATH = '/guia-ia';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

async function registrarPageview(req: NextApiRequest): Promise<void> {
  if (!supabaseKey) {
    console.error('[guia-ia-proxy] sem chave do Supabase — pageview não gravado');
    return;
  }
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const q = req.query;
    // Página sem JS (CSP bloqueia tudo), então não existe sessionStorage pra
    // persistir um session_id entre páginas — cada visita é a própria
    // sessão. O clique de dentro do guia é medido separadamente pelo próprio
    // /api/shares/<token>/click do Nexus (ShareEvent), não por aqui.
    const session_id = `guia-ia-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const { error } = await supabase.from('pageviews').insert({
      session_id,
      path: PUBLIC_PATH,
      referrer: String(req.headers.referer || req.headers.referrer || ''),
      utm_source: String(q.utm_source || ''),
      utm_medium: String(q.utm_medium || ''),
      utm_campaign: String(q.utm_campaign || ''),
      utm_content: String(q.utm_content || ''),
    });
    if (error) console.error('[guia-ia-proxy] pageview insert error:', error.message);
  } catch (err) {
    console.error('[guia-ia-proxy] pageview tracking indisponível:', err instanceof Error ? err.message : err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Best-effort e nunca bloqueia a entrega do conteúdo — falhar em medir não
  // pode impedir o lead de ler o material.
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
    console.error('[guia-ia-proxy] proxy falhou:', err instanceof Error ? err.message : err);
    res.status(502).send('Material indisponível no momento.');
  }
}
