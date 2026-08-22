import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { gerarCodigoOtp, hashCodigoOtp } from '@/lib/otp/crypto';
import { enviarCodigoWhatsapp } from '@/lib/otp/enviarWhatsapp';
import { registrarOtpNoCrm } from '@/lib/otp/registrarNoCrm';
import {
  validarTelefoneBrasil, OTP_TTL_MINUTOS,
  LIMITE_POR_NUMERO_HORA, LIMITE_POR_NUMERO_DIA, LIMITE_POR_IP_HORA, TETO_GLOBAL_HORA,
  cooldownSegundos,
} from '@/lib/otp/config';

// POST /api/otp/send — reescrito em 29/07/2026. A versão anterior era uma
// demo que devolvia o próprio código na resposta (não verificava nada de
// verdade) e não tinha rate limit nenhum — ver .claude/rules/otp-whatsapp.md
// no repo evo-nexus pro checklist completo que esta versão segue.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

// Resposta idêntica pra número aceito e pra rate-limit — só o formato
// inválido (400) difere, porque isso é validação de entrada, não existência.
const RESPOSTA_GENERICA = {
  success: true,
  message: 'Se o número for válido, você recebe um código pelo WhatsApp em instantes.',
};

function pegarIp(req: NextApiRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const primeiro = Array.isArray(fwd) ? fwd[0] : fwd;
  return (primeiro || '').split(',')[0].trim() || req.socket.remoteAddress || 'desconhecido';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { phone, name } = req.body as { phone?: string; name?: string };
  const numero = phone ? validarTelefoneBrasil(phone) : null;
  // Nome é só personalização da mensagem — nunca vira critério de validação
  // nem afeta rate limit, senão viraria um jeito de burlar o limite por
  // número mudando o nome enviado.
  const nome = (name || '').trim().slice(0, 60) || undefined;
  if (!numero) {
    return res.status(400).json({ success: false, message: 'Informe um WhatsApp válido com DDD (+55).' });
  }

  if (!supabaseKey) {
    console.error('[otp/send] SUPABASE_SERVICE_KEY ausente');
    return res.status(500).json({ success: false, message: 'Serviço indisponível.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const ip = pegarIp(req);
  const agora = new Date();
  const umaHoraAtras = new Date(agora.getTime() - 3600_000).toISOString();
  const umDiaAtras = new Date(agora.getTime() - 86400_000).toISOString();

  // 1. Teto global — o disjuntor. Checa primeiro porque é o que protege
  // mesmo contra ataque distribuído por muitos IPs/números diferentes.
  const { count: totalGlobal } = await supabase
    .from('otp_codes').select('id', { count: 'exact', head: true }).gte('created_at', umaHoraAtras);
  if ((totalGlobal ?? 0) >= TETO_GLOBAL_HORA) {
    console.error(`[otp/send] TETO GLOBAL atingido: ${totalGlobal}/${TETO_GLOBAL_HORA} na última hora`);
    return res.status(429).json({ success: false, message: 'Serviço temporariamente indisponível. Tente mais tarde.' });
  }

  // 2. Limite por IP.
  const { count: porIp } = await supabase
    .from('otp_codes').select('id', { count: 'exact', head: true }).eq('ip', ip).gte('created_at', umaHoraAtras);
  if ((porIp ?? 0) >= LIMITE_POR_IP_HORA) {
    return res.status(429).json(RESPOSTA_GENERICA);
  }

  // 3. Limite por número (hora e dia) + cooldown com backoff.
  const { data: recentesDoNumero } = await supabase
    .from('otp_codes').select('created_at').eq('phone', numero).gte('created_at', umDiaAtras)
    .order('created_at', { ascending: false });
  const lista = recentesDoNumero ?? [];
  const doDia = lista.length;
  const daHora = lista.filter((r) => r.created_at >= umaHoraAtras).length;

  if (doDia >= LIMITE_POR_NUMERO_DIA || daHora >= LIMITE_POR_NUMERO_HORA) {
    return res.status(429).json(RESPOSTA_GENERICA);
  }

  if (lista.length > 0) {
    const ultimoEnvio = new Date(lista[0].created_at).getTime();
    const cooldownMs = cooldownSegundos(daHora) * 1000;
    const faltamMs = cooldownMs - (agora.getTime() - ultimoEnvio);
    if (faltamMs > 0) {
      return res.status(429).json({
        success: false,
        message: `Aguarde ${Math.ceil(faltamMs / 1000)}s antes de pedir outro código.`,
      });
    }
  }

  const codigo = gerarCodigoOtp();
  const expiresAt = new Date(agora.getTime() + OTP_TTL_MINUTOS * 60_000).toISOString();

  const { error: dbError } = await supabase.from('otp_codes').insert({
    phone: numero, code_hash: hashCodigoOtp(codigo), ip, expires_at: expiresAt, attempts: 0,
  });
  if (dbError) {
    console.error('[otp/send] erro ao gravar código:', dbError);
    return res.status(500).json({ success: false, message: 'Erro interno.' });
  }

  const envio = await enviarCodigoWhatsapp(numero, codigo, nome);
  if (envio.status === 'erro') {
    console.error('[otp/send] falha no envio:', envio.mensagem);
    return res.status(502).json({ success: false, message: 'Não conseguimos enviar o código. Tente novamente.' });
  }

  // Espelha a conversa no inbox whatsapp-cloud do CRM, pra acompanhar o lead
  // por lá. Deliberadamente SEM o código: quem abrir o CRM não precisa (nem
  // deve) conseguir ler um OTP válido de outra pessoa — a conversa serve pra
  // saber que a pessoa passou por aqui e pra receber a resposta dela.
  await registrarOtpNoCrm({
    numero,
    nome,
    wamid: envio.wamid,
    conteudo: 'Código de verificação enviado pelo site (template otp_acesso_video). Código omitido por segurança.',
  });

  return res.status(200).json(RESPOSTA_GENERICA);
}
