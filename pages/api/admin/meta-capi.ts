import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './auth';
import { salvarTokenCapi, statusCapi } from '../../../lib/metaCapi';

// GET  /api/admin/meta-capi — estado atual (nunca o token completo)
// POST /api/admin/meta-capi — salva um novo access token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Token invalido' });
  }

  if (req.method === 'GET') {
    const status = await statusCapi();
    return res.status(200).json(status);
  }

  if (req.method === 'POST') {
    const { access_token } = req.body as { access_token?: string };
    if (!access_token || typeof access_token !== 'string' || access_token.trim().length < 20) {
      return res.status(400).json({ error: 'access_token inválido' });
    }
    try {
      await salvarTokenCapi(access_token.trim());
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'falha ao salvar' });
    }
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
