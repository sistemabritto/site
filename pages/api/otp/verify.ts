import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /api/otp/verify
 * Body: { phone: string, otp: string }
 * Returns: { success: boolean, message?: string }
 *
 * Note: In demo mode, the OTP is returned in /api/otp/send response
 * and verified client-side. This endpoint is a placeholder for production.
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

  // In demo mode, verification is done client-side
  // In production: check against Redis/DB
  return res.status(200).json({ success: true, message: 'Verified' });
}
