-- Processa a outbox de pós-compra sem depender de n8n.
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

DO $$
DECLARE
  existing_job_id BIGINT;
BEGIN
  SELECT jobid INTO existing_job_id
  FROM cron.job
  WHERE jobname = 'fulfillment-worker-every-minute'
  LIMIT 1;

  IF existing_job_id IS NOT NULL THEN
    PERFORM cron.unschedule(existing_job_id);
  END IF;
END $$;

SELECT cron.schedule(
  'fulfillment-worker-every-minute',
  '* * * * *',
  $cron$
    SELECT net.http_post(
      url := 'https://mnzpcilebqqgbqdgwtlw.supabase.co/functions/v1/fulfillment-worker',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-worker-secret', (
          SELECT decrypted_secret
          FROM vault.decrypted_secrets
          WHERE name = 'fulfillment_worker_secret'
          ORDER BY created_at DESC
          LIMIT 1
        )
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 30000
    );
  $cron$
);
