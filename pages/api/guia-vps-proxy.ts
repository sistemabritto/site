import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Proxy server-side de /guia-vps pro share do Nexus, mesmo padrão de
// pages/api/guia-ia-proxy.ts — ver aquele arquivo e .claude/rules/artifacts.md
// (repo evo-nexus) pro porquê completo. Resumo:
//
// 1. Grava o pageview na tabela `pageviews` do site (o painel único de
//    medição), não só no /shares do Nexus.
// 2. Repassa o header Content-Security-Policy do Nexus (`default-src 'none'`)
//    — o share bloqueia todo JS de propósito.
const SHARE_URL = 'https://nexus.workflowapi.com.br/api/shares/AzYj_LoTTREtsnkqDtxWjkMFokoRxVawFneZpAMGppg/view';
const PUBLIC_PATH = '/guia-vps';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

async function registrarPageview(req: NextApiRequest): Promise<void> {
  if (!supabaseKey) {
    console.error('[guia-vps-proxy] sem chave do Supabase — pageview não gravado');
    return;
  }
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const q = req.query;
    // Página sem JS (CSP bloqueia tudo), então cada visita é a própria
    // sessão. O clique do CTA é medido separadamente pelo próprio
    // /api/shares/<token>/click do Nexus (ShareEvent), não por aqui.
    const session_id = `guia-vps-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const { error } = await supabase.from('pageviews').insert({
      session_id,
      path: PUBLIC_PATH,
      referrer: String(req.headers.referer || req.headers.referrer || ''),
      utm_source: String(q.utm_source || ''),
      utm_medium: String(q.utm_medium || ''),
      utm_campaign: String(q.utm_campaign || ''),
      utm_content: String(q.utm_content || ''),
    });
    if (error) console.error('[guia-vps-proxy] pageview insert error:', error.message);
  } catch (err) {
    console.error('[guia-vps-proxy] pageview tracking indisponível:', err instanceof Error ? err.message : err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Best-effort e nunca bloqueia a entrega do conteúdo.
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
    console.error('[guia-vps-proxy] proxy falhou:', err instanceof Error ? err.message : err);
    res.status(502).send('Material indisponível no momento.');
  }
}
