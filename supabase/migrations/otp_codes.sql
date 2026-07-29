-- =============================================
-- otp_codes — OTP por WhatsApp, ver .claude/rules/otp-whatsapp.md
-- Run this in Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  ip TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices pelas três checagens de rate limit (por número, por IP, teto global
-- por janela de tempo) — sem eles cada POST /api/otp/send vira table scan.
CREATE INDEX IF NOT EXISTS idx_otp_codes_phone_created ON otp_codes(phone, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_otp_codes_ip_created ON otp_codes(ip, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_otp_codes_created ON otp_codes(created_at DESC);

ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- Só o backend (SUPABASE_SERVICE_KEY) toca nesta tabela — nunca o browser.
CREATE POLICY "Only service_role can access otp_codes"
  ON otp_codes FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
