ALTER TABLE fulfillment_jobs
  ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS fulfillment_jobs_stale_claim_idx
  ON fulfillment_jobs(status, claimed_at)
  WHERE status = 'processing';

COMMENT ON COLUMN fulfillment_jobs.claimed_at IS
  'Lease timestamp used to recover jobs left processing after a worker crash.';
