import { createHmac, randomInt, timingSafeEqual } from 'crypto';

// Mesmo padrão do zapoferta (sistemabritto/zapoferta, lib/auth/crypto.ts):
// código de fonte criptográfica, nunca Math.random(); hash com segredo
// próprio, nunca o código em texto puro na tabela; comparação em tempo
// constante, nunca `===` num segredo.

function segredo(): string {
  const s = process.env.OTP_SECRET;
  if (!s || s === 'change-me-before-production') {
    throw new Error('OTP_SECRET precisa estar configurado (nunca o valor default em produção)');
  }
  return s;
}

export function gerarCodigoOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

export function hashCodigoOtp(codigo: string): string {
  return createHmac('sha256', segredo()).update(codigo).digest('hex');
}

export function verificarCodigoOtp(codigo: string, hashEsperado: string): boolean {
  const atual = Buffer.from(hashCodigoOtp(codigo), 'hex');
  const esperado = Buffer.from(hashEsperado, 'hex');
  if (atual.length !== esperado.length) return false;
  return timingSafeEqual(atual, esperado);
}
