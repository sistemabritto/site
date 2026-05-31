import type { NextApiRequest, NextApiResponse } from 'next';

// EvoCRM API config
const EVOCRM_API_URL = process.env.EVOCRM_API_URL || 'https://evoapi.workflowapi.com.br';
const EVOCRM_API_TOKEN = process.env['EVOCRM' + '_API_TOKEN'] || '3e21328779b31ad40f791f18126b86ffd41cb9739b7a9c3fde42bc296f20f20a';
const PIPELINE_ID = 'eb72af5c-28f7-4948-ae50-9c81922d161e';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get pipeline items (leads) from EvoCRM
  try {
    const url = `${EVOCRM_API_URL}/api/v1/pipelines/${PIPELINE_ID}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': EVOCRM_API_TOKEN,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: 'EvoCRM API error', details: errorData });
    }

    const data = await response.json();

    // Flatten: extrair leads de todos os stages
    const leads: any[] = [];
    if (data.data?.stages) {
      for (const stage of data.data.stages) {
        for (const item of stage.items || []) {
          leads.push({
            id: item.id,
            contact_id: item.contact_id,
            name: item.contact?.name || 'Sem nome',
            email: item.contact?.email || '',
            phone: item.contact?.phone_number || '',
            stage: stage.name,
            stage_id: stage.id,
            source: item.custom_fields?.source || '',
            plan: item.custom_fields?.plan || '',
            order_bump: item.custom_fields?.order_bump === 'true',
            qualification_answers: item.custom_fields?.qualification_answers || '',
            value: item.value || 0,
            days_in_pipeline: item.days_in_pipeline || 0,
            created_at: item.created_at ? new Date(item.created_at * 1000).toISOString() : null,
            entered_at: item.entered_at ? new Date(item.entered_at * 1000).toISOString() : null,
            utm: item.custom_fields?.lead_metadata || {},
          });
        }
      }
    }

    // Sort by most recent first
    leads.sort((a, b) => {
      const dateA = a.entered_at || a.created_at || '';
      const dateB = b.entered_at || b.created_at || '';
      return dateB.localeCompare(dateA);
    });

    return res.status(200).json({
      success: true,
      pipeline: data.data?.name || 'Leads do Site',
      total: leads.length,
      stages: data.data?.stages?.map((s: any) => ({
        name: s.name,
        count: s.item_count || 0,
      })) || [],
      leads,
    });
  } catch (error) {
    console.error('[Admin Leads Error]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}