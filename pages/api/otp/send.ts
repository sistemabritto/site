import type { NextApiRequest, NextApiResponse } from 'next';

// Evolution API credentials
const EVO_URL = 'https://go.workflowapi.com.br/send/text';
const EVO_API_KEY = 'ed260550-affc-42f1-92e3-45affea89e05';

// In-memory OTP store (use Redis/DB in production)
const otpStore = new Map<string, { otp: string; expires: number }>();

/**
 * POST /api/otp/send
 * Body: { phone: string }
 * Returns: { success: boolean, message?: string }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { phone } = req.body as { phone?: string };
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number required' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in memory (5 min expiry)
  otpStore.set(phone, { otp, expires: Date.now() + 5 * 60 * 1000 });

  // Send via Evolution API
  try {
    const payload = {
      number: phone,
      text: `✅ *Seu código de acesso*: ${otp}\n\n🔐 Sistema Britto\n\nExpira em 5 minutos.`,
    };
    const evoRes = await fetch(EVO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: EVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    const evoData = await evoRes.json();
    if (evoRes.ok && evoData.message === 'success') {
      return res.status(200).json({ success: true, message: 'OTP enviado' });
    }
    console.error('Evolution response error:', evoData);
    return res.status(502).json({ success: false, message: 'Evolution API error' });
  } catch (e) {
    console.error('Evolution request failed:', e);
    return res.status(502).json({ success: false, message: 'OTP request failed' });
  }
}
