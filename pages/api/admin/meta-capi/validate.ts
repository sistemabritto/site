import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../auth';
import { validarCapi } from '../../../../lib/metaCapi';

// POST /api/admin/meta-capi/validate — manda um evento de teste real pro
// Graph API com o token salvo. Validação de verdade: erro da própria Meta,
// não um "parece ok" nosso.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Token invalido' });
  }

  const resultado = await validarCapi();
  return res.status(resultado.ok ? 200 : 400).json(resultado);
}
