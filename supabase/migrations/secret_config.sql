-- =============================================
-- secret_config — segredos de integração (Meta CAPI, etc.)
-- Run this in Supabase SQL Editor
-- =============================================
--
-- Diferente de site_config (que tem SELECT público de propósito, porque o
-- meta_pixel_id precisa ser lido sem auth por _app.tsx), esta tabela NUNCA
-- tem policy de leitura pra anon/authenticated. Só o service_role (usado
-- pelas rotas /api/admin/* via SUPABASE_SERVICE_KEY) lê e escreve aqui.
-- Guardar um access token de verdade em site_config vazaria pra qualquer
-- um com a anon key pública do site, via REST direto no Supabase.

CREATE TABLE IF NOT EXISTS secret_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE secret_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service_role can read secret config"
  ON secret_config FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Only service_role can insert secret config"
  ON secret_config FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service_role can update secret config"
  ON secret_config FOR UPDATE
  USING (auth.role() = 'service_role');
