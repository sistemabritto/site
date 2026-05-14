import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers, timestamp, userAgent } = req.body;

    console.log('[Qualificação Lead]', {
      answers,
      timestamp,
      userAgent,
      result: answers?.p4_investment === 'sim' ? 'high-ticket' : 'downsell',
    });

    // TODO: Enviar para Evo CRM via webhook
    // TODO: Notificar WhatsApp SDR

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('[Qualificação Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
