import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = process.env.EVO_API_URL || 'https://go.workflowapi.com.br';
const INSTANCE_TOKEN = process.env.EVO_INSTANCE_VENDAS_TOKEN || '';

function participantCount(group: Record<string, unknown>): number {
  const participants = group.Participants ?? group.participants;
  if (Array.isArray(participants)) return participants.length;
  const count = group.ParticipantCount ?? group.participantCount ?? group.size;
  return typeof count === 'number' ? count : Number(count || 0);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

  if (!INSTANCE_TOKEN) {
    return res.status(200).json({ count: 9, goal: 100, priceAfterGoal: 20, live: false });
  }

  try {
    const response = await fetch(`${API_URL}/group/list`, {
      headers: { apikey: INSTANCE_TOKEN, Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Evolution respondeu ${response.status}`);
    const payload = await response.json();
    const groups = Array.isArray(payload?.data) ? payload.data : [];
    const matches = groups.filter((group: Record<string, unknown>) =>
      String(group.Name ?? group.name ?? '').trim().toLowerCase() === 'evolution alliance'
    );
    const count = Math.max(0, ...matches.map(participantCount));
    if (!count) throw new Error('Grupo não encontrado');

    return res.status(200).json({ count, goal: 100, priceAfterGoal: 20, live: true });
  } catch (error) {
    console.error('[community/evolution-alliance]', error instanceof Error ? error.message : error);
    return res.status(200).json({ count: 9, goal: 100, priceAfterGoal: 20, live: false });
  }
}
