import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verificarCodigoOtp } from '@/lib/otp/crypto';
import { validarTelefoneBrasil, OTP_MAX_TENTATIVAS } from '@/lib/otp/config';

// POST /api/otp/verify — reescrito em 29/07/2026. A versão anterior sempre
// devolvia success:true sem checar nada — era um stub que nunca verificou
// coisa nenhuma.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

const RESPOSTA_INVALIDO = { success: false, message: 'Código inválido ou expirado.' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { phone, otp } = req.body as { phone?: string; otp?: string };
  const numero = phone ? validarTelefoneBrasil(phone) : null;
  if (!numero || !otp || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ success: false, message: 'Dados inválidos.' });
  }

  if (!supabaseKey) {
    console.error('[otp/verify] SUPABASE_SERVICE_KEY ausente');
    return res.status(500).json({ success: false, message: 'Serviço indisponível.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: registro } = await supabase
    .from('otp_codes')
    .select('id, code_hash, attempts, expires_at, used_at')
    .eq('phone', numero)
    .is('used_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string; code_hash: string; attempts: number; expires_at: string; used_at: string | null }>();

  // Mesma resposta pra "não existe código" e "código errado" — não revela
  // qual das duas coisas aconteceu.
  if (!registro) {
    return res.status(400).json(RESPOSTA_INVALIDO);
  }

  if (new Date(registro.expires_at).getTime() < Date.now()) {
    return res.status(400).json(RESPOSTA_INVALIDO);
  }

  if (registro.attempts >= OTP_MAX_TENTATIVAS) {
    return res.status(400).json(RESPOSTA_INVALIDO);
  }

  if (!verificarCodigoOtp(otp, registro.code_hash)) {
    await supabase.from('otp_codes').update({ attempts: registro.attempts + 1 }).eq('id', registro.id);
    return res.status(400).json(RESPOSTA_INVALIDO);
  }

  // Uso único: consumir na primeira validação bem-sucedida.
  await supabase.from('otp_codes').update({ used_at: new Date().toISOString() }).eq('id', registro.id);

  return res.status(200).json({ success: true, message: 'Verificado.' });
}
