import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supabaseClient';

// Evolution API credentials (already known)
const EVO_URL = 'https://go.workflowapi.com.br/message/sendText/evonexus'; // replace with your instance name if different
const EVO_API_KEY = 'ed260550-affc-42f1-92e3-45affea89e05';

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

  // Generate 6‑digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min

  // Store OTP in Supabase (table otp_codes must exist)
  const { error: dbErr } = await supabase.from('otp_codes').upsert({
    phone,
    otp,
    expires_at: expiresAt,
  }, { onConflict: 'phone' });

  if (dbErr) {
    console.error('Supabase OTP insert error:', dbErr);
    return res.status(500).json({ success: false, message: 'DB error' });
  }

  // Send via Evolution API
  try {
    const payload = {
      number: phone,
      text: `✅ *Seu código OTP*: ${otp}\n🔐 Sistema Britto – login seguro`,
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
    return res.status(502).json({ success: false, message: 'OTP not sent' });
  } catch (e) {
    console.error('Evolution request failed:', e);
    return res.status(502).json({ success: false, message: 'OTP request failed' });
  }
}
