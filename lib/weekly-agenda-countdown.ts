// Extraído de VibeSellerLanding.tsx — usado pela Consultoria a Laser, pelo
// Sprint e pela Implementação, que compartilham a mesma condição semanal
// (3 vagas, ciclo renova domingo 00h em São Paulo). Uma função só evita que
// as três páginas divirjam no cálculo do horário de reset.
export function weeklyAgendaCountdown(now = Date.now()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(new Date(now));
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? 'Sun';
  const weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[weekday] ?? 0;
  const daysUntilSunday = (7 - weekdayIndex) % 7 || 7;
  // Domingo às 00h em São Paulo equivale a 03h UTC.
  const resetAt = Date.UTC(value('year'), value('month') - 1, value('day') + daysUntilSunday, 3, 0, 0);
  const remaining = Math.max(0, resetAt - now);
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}min`;
}
