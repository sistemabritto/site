-- Supabase Schema para Sistema Britto
-- Rodar no SQL Editor do Supabase

-- Tabela de Leads (captura inicial)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  email TEXT,
  whatsapp TEXT,
  company TEXT,
  source TEXT, -- 'whatsapp-landing', 'workforce-landing', 'devops-landing', 'saas-landing'
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  order_bump BOOLEAN DEFAULT FALSE,
  qualification_answers JSONB, -- Respostas da qualificação
  status TEXT DEFAULT 'new' -- 'new', 'contacted', 'qualified', 'converted'
);

-- Tabela de Customers (para AbacatePay)
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  abacate_customer_id TEXT UNIQUE, -- ID do customer na AbacatePay
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  cellphone TEXT,
  last_checkout_url TEXT,
  last_checkout_at TIMESTAMPTZ
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads(source);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS customers_email_idx ON customers(email);
CREATE INDEX IF NOT EXISTS customers_abacate_idx ON customers(abacate_customer_id);
