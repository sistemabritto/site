-- =============================================
-- site_config table for Sistema Britto
-- Run this in Supabase SQL Editor
-- =============================================

-- Tabela de configurações do site (single-row por key)
CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT DEFAULT 'admin'
);

-- Habilitar RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Policy: leitura pública (o _app.tsx precisa ler o pixel ID sem auth)
CREATE POLICY "Site config is publicly readable"
  ON site_config FOR SELECT
  USING (true);

-- Policy: escrita só com service_role (APIs server-side usam SUPABASE_SERVICE_KEY)
CREATE POLICY "Only service_role can write site config"
  ON site_config FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service_role can update site config"
  ON site_config FOR UPDATE
  USING (auth.role() = 'service_role');

-- Inserir configs padrão
INSERT INTO site_config (key, value) VALUES
  ('meta_pixel_id', ''),
  ('evocrm_api_status', 'connected'),
  ('site_name', 'Sistema Britto')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- admin_logs — log de ações do painel
-- =============================================
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service_role can read admin logs"
  ON admin_logs FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Only service_role can insert admin logs"
  ON admin_logs FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
