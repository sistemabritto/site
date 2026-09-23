-- Aplica a matriz de privilégios às tabelas já existentes do site.
-- Os SQLs de criação legados receberam os mesmos GRANTs para novos ambientes.
-- Tabelas ainda não criadas são ignoradas: a criação deve incluir seus próprios
-- REVOKE/GRANT no mesmo arquivo, conforme supabase/README.md.
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'leads', 'customers', 'otp_codes', 'admin_logs', 'secret_config',
    'payment_events', 'purchases', 'fulfillment_jobs',
    'site_config', 'tracking_profiles', 'pageviews', 'cta_clicks',
    'quiz_funnel', 'checkout_metadata', 'clientes_base'
  ] LOOP
    IF to_regclass(format('public.%I', table_name)) IS NULL THEN
      RAISE NOTICE 'Tabela public.% ausente; privilégios não aplicados', table_name;
      CONTINUE;
    END IF;

    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated', table_name);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO service_role', table_name);
  END LOOP;

  FOREACH table_name IN ARRAY ARRAY['site_config', 'tracking_profiles'] LOOP
    IF to_regclass(format('public.%I', table_name)) IS NOT NULL THEN
      EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', table_name);
    END IF;
  END LOOP;

  FOREACH table_name IN ARRAY ARRAY['pageviews', 'cta_clicks', 'quiz_funnel'] LOOP
    IF to_regclass(format('public.%I', table_name)) IS NOT NULL THEN
      EXECUTE format('GRANT INSERT ON public.%I TO anon, authenticated', table_name);
    END IF;
  END LOOP;
END $$;
