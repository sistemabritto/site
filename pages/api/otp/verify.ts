import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supabaseClient';

/**
 * POST /api/otp/verify
 * Body: { phone: string, otp: string }
 * Returns: { success: boolean, message?: string }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { phone, otp } = req.body as { phone?: string; otp?: string };
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP required' });
  }

  // Check OTP in Supabase
  const { data, error } = await supabase
    .from('otp_codes')
    .select('*')
    .eq('phone', phone)
    .eq('otp', otp)
    .single();

  if (error || !data) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  // Check if OTP is expired
  if (new Date(data.expires_at) < new Date()) {
    // Delete expired OTP
    await supabase.from('otp_codes').delete().eq('phone', phone);
    return res.status(401).json({ success: false, message: 'OTP expired' });
  }

  // OTP is valid — delete it (one-time use)
  await supabase.from('otp_codes').delete().eq('phone', phone);

  // Create a session for the user (using Supabase magic link approach)
  // For now, we just return success — the client will handle the session
  return res.status(200).json({ success: true, message: 'OTP verified' });
}
