import type { NextApiRequest, NextApiResponse } from 'next';

// Leads salvos em memória (em produção, usar DB)
const leads: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, whatsapp, source, utm_source, utm_medium, utm_campaign } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const lead = {
      id: Date.now().toString(),
      name: name || '',
      email,
      whatsapp: whatsapp || '',
      source: source || 'website',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      createdAt: new Date().toISOString(),
    };

    leads.push(lead);
    console.log('[LEAD CAPTURED]', lead);

    // Enviar notificação via Evolution API (WhatsApp pro SDR)
    try {
      const evoUrl = process.env.EVO_API_URL || 'https://go.workflowapi.com.br';
      const evoToken = process.env.EVO_API_TOKEN || '';
      const evoInstance = process.env.EVO_INSTANCE || 'sistema-britto-business';
      const sdrNumber = process.env.SDR_WHATSAPP || '5511914088571';

      if (evoToken) {
        await fetch(`${evoUrl}/message/sendText/${evoInstance}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': evoToken,
          },
          body: JSON.stringify({
            number: sdrNumber,
            text: `🔔 NOVO LEAD!\n\nNome: ${name || 'Não informado'}\nEmail: ${email}\nWhatsApp: ${whatsapp || 'Não informado'}\nFonte: ${source || 'website'}\n\nCorre!`,
          }),
        });
      }
    } catch (evoErr) {
      console.error('[EVO NOTIFICATION ERROR]', evoErr);
    }

    return res.status(200).json({ success: true, leadId: lead.id });
  }

  if (req.method === 'GET') {
    // Listar leads (proteger em produção)
    return res.status(200).json({ leads: leads.slice(-50).reverse() });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
