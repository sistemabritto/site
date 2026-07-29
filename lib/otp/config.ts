// Config e validação de telefone do OTP — ver .claude/rules/otp-whatsapp.md
// no repo evo-nexus antes de mexer aqui. Cada constante existe porque a
// versão "óbvia" já saiu errada em produção pelo menos uma vez (rule
// completa, com o porquê de cada uma).

export const OTP_TTL_MINUTOS = 5;
export const OTP_MAX_TENTATIVAS = 5;

// Rate limit em três camadas — a terceira (teto global) é o disjuntor: sem
// ela, IP se troca com VPN/CGNAT e o limite por IP sozinho é decorativo.
export const LIMITE_POR_NUMERO_HORA = 3;
export const LIMITE_POR_NUMERO_DIA = 5;
export const LIMITE_POR_IP_HORA = 10;
export const TETO_GLOBAL_HORA = 50;

// Cooldown com backoff: 60s → 120s → 300s, calculado a partir de quantos
// reenvios já houve pro mesmo número na última hora.
export const COOLDOWN_BASE_S = 60;
export const COOLDOWN_TETO_S = 300;

export function normalizarTelefone(phone: string | null | undefined): string {
  return (phone ?? "").replace(/\D/g, "");
}

/**
 * Só Brasil: DDI 55 + DDD (2 dígitos) + número (8 ou 9 dígitos) = 12 ou 13
 * dígitos. Aceita com ou sem "+". Recusa qualquer outro DDI — allowlist, não
 * blocklist, porque o allowlist não vaza quando alguém inventa um DDI novo.
 */
export function validarTelefoneBrasil(phoneRaw: string | null | undefined): string | null {
  const digits = normalizarTelefone(phoneRaw);
  if (!digits.startsWith("55")) return null;
  if (digits.length !== 12 && digits.length !== 13) return null;
  return digits;
}

export function cooldownSegundos(reenviosNaUltimaHora: number): number {
  return Math.min(COOLDOWN_BASE_S * Math.pow(2, reenviosNaUltimaHora), COOLDOWN_TETO_S);
}
