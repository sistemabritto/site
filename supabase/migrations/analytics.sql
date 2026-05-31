-- =============================================
-- pageviews + cta_clicks — Analytics do Site
-- Run this in Supabase SQL Editor (after site_config.sql)
-- =============================================

-- Pageviews — 1 row por page load
CREATE TABLE IF NOT EXISTS pageviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT DEFAULT '',
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  utm_content TEXT DEFAULT '',
  country TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices pra analytics rápida
CREATE INDEX IF NOT EXISTS idx_pageviews_created_at ON pageviews (created_at);
CREATE INDEX IF NOT EXISTS idx_pageviews_path ON pageviews (path);
CREATE INDEX IF NOT EXISTS idx_pageviews_session ON pageviews (session_id);
CREATE INDEX IF NOT EXISTS idx_pageviews_utm_source ON pageviews (utm_source);

-- RLS — leitura só service_role, escrita pública (o tracker do site precisa inserir sem auth)
ALTER TABLE pageviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert pageviews"
  ON pageviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only service_role can read pageviews"
  ON pageviews FOR SELECT
  USING (auth.role() = 'service_role');

-- =============================================
-- CTA Clicks — registra cada click em botão CTA
-- =============================================
CREATE TABLE IF NOT EXISTS cta_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page TEXT NOT NULL,
  cta_label TEXT NOT NULL,
  cta_action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cta_clicks_created_at ON cta_clicks (created_at);
CREATE INDEX IF NOT EXISTS idx_cta_clicks_page ON cta_clicks (page);
CREATE INDEX IF NOT EXISTS idx_cta_clicks_session ON cta_clicks (session_id);

ALTER TABLE cta_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert cta clicks"
  ON cta_clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only service_role can read cta clicks"
  ON cta_clicks FOR SELECT
  USING (auth.role() = 'service_role');
