import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// GET/POST /api/admin/tracking — perfil de tracking por empresa.
// Token CAPI por empresa vive em secret_config com chave meta_capi_access_token_<slug>
// (mesma lógica do token global). GET só devolve preview do token.

function exigirAuth(req: NextApiRequest): boolean {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  return verifyToken(token);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!exigirAuth(req)) {
    return res.status(401).json({ error: 'Token invalido' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  if (req.method === 'GET') {
    const { data: perfis, error } = await supabase
      .from('tracking_profiles')
      .select('*')
      .order('ordem', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });

    const slugs = (perfis || []).map((p: any) => p.slug);
    const chaves = slugs.map((slug: string) => `meta_capi_access_token_${slug}`);
    const { data: tokens } = await supabase.from('secret_config').select('key, value').in('key', chaves);

    const tokenPorSlug: Record<string, string> = {};
    for (const t of tokens || []) {
      tokenPorSlug[t.key.replace('meta_capi_access_token_', '')] = t.value || '';
    }

    const companies = (perfis || []).map((p: any) => ({
      slug: p.slug,
      nome: p.nome,
      meta_pixel_id: p.meta_pixel_id || '',
      google_tag_id: p.google_tag_id || '',
      ativo: !!p.ativo,
      ordem: p.ordem,
      token_configurado: Boolean(tokenPorSlug[p.slug]),
      token_preview: tokenPorSlug[p.slug] ? `••••${tokenPorSlug[p.slug].slice(-4)}` : null,
    }));
    return res.status(200).json({ companies });
  }

  // POST — atualiza um perfil: { slug, nome?, meta_pixel_id?, google_tag_id?, ativo?, access_token? }
  const { slug, nome, meta_pixel_id, google_tag_id, ativo, access_token } = req.body || {};
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
    return res.status(400).json({ error: 'slug inválido (use letras minúsculas, números e hífen)' });
  }

  const perfil: Record<string, unknown> = {};
  if (nome !== undefined) perfil.nome = String(nome);
  if (meta_pixel_id !== undefined) perfil.meta_pixel_id = String(meta_pixel_id).trim();
  if (google_tag_id !== undefined) perfil.google_tag_id = String(google_tag_id).trim();
  if (ativo !== undefined) perfil.ativo = Boolean(ativo);
  if (Object.keys(perfil).length > 0) {
    perfil.atualizado_em = new Date().toISOString();
    const { error } = await supabase.from('tracking_profiles').upsert(perfil, { onConflict: 'slug' });
    if (error) return res.status(500).json({ error: error.message });
  }

  // Token CAPI separado (segredo — só service_role lê/escreve secret_config)
  let tokenSalvo = false;
  if (typeof access_token === 'string' && access_token.trim()) {
    const { error } = await supabase.from('secret_config').upsert({
      key: `meta_capi_access_token_${slug}`,
      value: access_token.trim(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });
    if (error) return res.status(500).json({ error: error.message });
    tokenSalvo = true;
  }

  return res.status(200).json({ ok: true, slug, tokenSalvo });
}
