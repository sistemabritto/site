-- Cakto usa as tabelas genéricas de pagamentos/outbox já criadas na
-- fundação do checkout. Estes índices mantêm consulta e retry eficientes.
CREATE INDEX IF NOT EXISTS payment_events_provider_type_received_idx
  ON payment_events(provider, event_type, received_at DESC);

CREATE INDEX IF NOT EXISTS purchases_provider_status_paid_idx
  ON purchases(provider, status, paid_at DESC);

CREATE INDEX IF NOT EXISTS fulfillment_jobs_purchase_idx
  ON fulfillment_jobs(purchase_id, created_at DESC);

COMMENT ON TABLE payment_events IS
  'Inbox idempotente de eventos de pagamento; payload bruto é restrito ao service_role.';
COMMENT ON TABLE fulfillment_jobs IS
  'Outbox de tarefas pós-compra; receivers HTTP nunca executam trabalho lento diretamente.';
