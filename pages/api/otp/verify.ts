import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory OTP store (shared with send.ts in production use Redis/DB)
// For now, we import from a shared module
const otpStore = (global as any).__otp_store || new Map<string, { otp: string; expires: number }>();
if (!(global as any).__otp_store) {
  (global as any).__otp_store = otpStore;
}

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

  const stored = otpStore.get(phone);
  if (!stored) {
    return res.status(401).json({ success: false, message: 'OTP not found' });
  }

  if (Date.now() > stored.expires) {
    otpStore.delete(phone);
    return res.status(401).json({ success: false, message: 'OTP expired' });
  }

  if (stored.otp !== otp) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  // Valid — delete and return success
  otpStore.delete(phone);
  return res.status(200).json({ success: true, message: 'Verified' });
}
