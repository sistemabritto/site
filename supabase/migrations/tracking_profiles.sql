-- =============================================
-- tracking_profiles — 1 perfil de tracking por empresa
-- Run this in Supabase SQL Editor (depois de site_config.sql)
--
-- Cada empresa do Sistema Britto (Remox, ZapClub, Ferreira Vieira, Desafio
-- Monetizar com IA, Sistema Britto) tem SEU próprio Meta Pixel + token CAPI
-- + GA4/GTM. Antes disso tudo disparam pro pixel único do site e não dava
-- pra separar conversão por empresa no Ads Manager.
--
-- Regras de leitura/escrita (mesmo padrão de site_config + secret_config):
--   - Pixel ID e tag Google são dados de "instalação", o _app.tsx precisa lê-
--     los sem auth → SELECT público.
--   - O token CAPI é segredo de verdade (permite mandar evento de compra
--     falso pra conta de anúncio) → NUNCA vive aqui; vive em secret_config
--     com a chave `meta_capi_access_token_<slug>` (ver rotas /api/admin/tracking).
--   - Escrita: só service_role (rotas /api/admin/*).
-- =============================================

CREATE TABLE IF NOT EXISTS tracking_profiles (
  slug TEXT PRIMARY KEY,                -- 'sistema-britto', 'remox', 'zapclub', ...
  nome TEXT NOT NULL,                   -- nome de exibição no painel admin
  meta_pixel_id TEXT NOT NULL DEFAULT '',   -- vazio = empresa sem pixel ainda
  google_tag_id TEXT NOT NULL DEFAULT '',   -- GA4 (G-...) ou GTM (GTM-...); vazio = desligado
  ativo BOOLEAN NOT NULL DEFAULT FALSE,     -- FALSE = nenhum script injetado, nenhum CAPI
  ordem INTEGER NOT NULL DEFAULT 100,       -- ordenação no painel
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tracking_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tracking profiles are publicly readable"
  ON tracking_profiles FOR SELECT
  USING (true);

CREATE POLICY "Only service_role can insert tracking profiles"
  ON tracking_profiles FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service_role can update tracking profiles"
  ON tracking_profiles FOR UPDATE
  USING (auth.role() = 'service_role');

-- Empresas já conhecidas do funil. Só a que já tinha tracking configurado
-- (Sistema Britto: pixel + GA4 G-NC93NWMZC8 que hoje quebra no slot GTM)
-- começa ATIVA — as outras ficam em aberto, sem script no site, até alguém
-- colar o pixel de cada uma na página de tracking.
INSERT INTO tracking_profiles (slug, nome, meta_pixel_id, google_tag_id, ativo, ordem) VALUES
  ('sistema-britto',        'Sistema Britto',         '1047639217757176', 'G-NC93NWMZC8', TRUE,  10),
  ('remox',                 'Remox',                  '',                 '',             FALSE, 20),
  ('zapclub',               'ZapClub',                '',                 '',             FALSE, 30),
  ('ferreira-vieira',       'Ferreira Vieira',        '',                 '',             FALSE, 40),
  ('desafio-monetizar-ia',  'Desafio Monetizar com IA','',                '',             FALSE, 50)
ON CONFLICT (slug) DO NOTHING;
