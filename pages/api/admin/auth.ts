import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// Admin password — set ADMIN_PASSWORD in Vercel env vars.
//
// Sem fallback, e a concatenação de string saiu junto. Ela existia para
// escapar de scanner de segredo, o que só escondia o problema: a senha estava
// legível num repositório PÚBLICO, e qualquer falha na variável de ambiente
// devolvia o painel inteiro a ela, em silêncio.
// Sem ADMIN_PASSWORD configurada, ninguém entra — que é o comportamento certo.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

function hashPassword(password: string, salt: string): string {
  return crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
}

function generateToken(): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(ADMIN_PASSWORD, salt);
  return `${salt}:${hash}`;
}

export function verifyToken(token: string): boolean {
  if (!ADMIN_PASSWORD) return false;   // sem senha configurada, nada é válido
  try {
    const [salt, hash] = token.split(':');
    if (!salt || !hash) return false;
    const expected = hashPassword(ADMIN_PASSWORD, salt);
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected));
  } catch {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { password } = req.body;
    if (!ADMIN_PASSWORD) {
      console.error('auth: ADMIN_PASSWORD não configurada');
      return res.status(500).json({ error: 'Autenticação não configurada' });
    }
    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    const token = generateToken();
    return res.status(200).json({ token });
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Token invalido' });
    }
    return res.status(200).json({ valid: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}