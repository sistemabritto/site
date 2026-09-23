import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './auth';

const PIPELINE_ID = '57599c7e-e678-4807-ade8-07efca578616';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!verifyToken(token)) return res.status(401).json({ error: 'Token inválido' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: 'Banco de aplicações indisponível' });

  try {
    const supabase = createClient(url, key);
    const { data: applications, error } = await supabase.from('funnel_applications')
      .select('id,company_key,lead_name,lead_email,lead_phone,answers,attribution,routing_decision,submitted_at,crm_contact_id,crm_opportunity_id,crm_synced_at')
      .eq('company_key', 'sistema-britto').order('submitted_at', { ascending: false }).limit(200);
    if (error) {
      console.error('[Admin applications]', error.code);
      return res.status(502).json({ error: 'Não foi possível carregar as aplicações' });
    }

    const ids = (applications || []).map(row => row.id);
    const jobsByApplication = new Map<string, { state: string; attempts: number; last_error: string | null }>();
    if (ids.length) {
      const { data: jobs, error: jobsError } = await supabase.from('funnel_integration_outbox')
        .select('application_id,state,attempts,last_error').in('application_id', ids);
      if (jobsError) return res.status(502).json({ error: 'Não foi possível carregar o estado da integração' });
      for (const job of jobs || []) jobsByApplication.set(job.application_id, job);
    }

    const crmStages = new Map<string, string>();
    let crmAvailable = false;
    const crmToken = process.env.EVOCRM_API_TOKEN;
    if (crmToken) {
      try {
        const response = await fetch(`${process.env.EVOCRM_API_URL || 'https://evoapi.workflowapi.com.br'}/api/v1/pipelines/${PIPELINE_ID}`, {
          headers: { api_access_token: crmToken }, signal: AbortSignal.timeout(8000),
        });
        if (response.ok) {
          const payload = await response.json();
          for (const stage of payload.data?.stages || []) {
            for (const item of stage.items || []) crmStages.set(item.id, stage.name);
          }
          crmAvailable = true;
        }
      } catch { /* The queue state remains visible if CRM is unavailable. */ }
    }

    return res.status(200).json({
      applications: (applications || []).map(row => ({
        id: row.id, company_key: row.company_key, name: row.lead_name,
        email: String(row.lead_email || '').endsWith('@sem-email.sistemabritto.com.br') ? '' : row.lead_email,
        phone: row.lead_phone, answers: row.answers, attribution: row.attribution,
        decision: row.routing_decision, submitted_at: row.submitted_at,
        crm_contact_id: row.crm_contact_id, crm_opportunity_id: row.crm_opportunity_id,
        crm_synced_at: row.crm_synced_at, crm_stage: row.crm_opportunity_id ? crmStages.get(row.crm_opportunity_id) || null : null,
        sync: jobsByApplication.get(row.id) || { state: 'missing', attempts: 0, last_error: null },
      })),
      crm_available: crmAvailable,
    });
  } catch {
    return res.status(502).json({ error: 'Não foi possível carregar as aplicações' });
  }
}
