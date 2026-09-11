// Usado pela Sessão de Start, pelo Sprint e pela Implementação, que
// compartilham a mesma condição semanal (3 vagas, ciclo renova domingo 00h
// em São Paulo). Uma função só evita que as páginas divirjam no cálculo.
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
  const seconds = Math.floor((remaining % 60_000) / 1_000);
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}min ${String(seconds).padStart(2, '0')}s`;
}

// Dia da semana (fuso São Paulo), índice com segunda-feira em 0 — pra exibir
// a tira SEG..DOM na ordem que o brasileiro lê, mesmo o ciclo resetando
// domingo de manhã.
function weekdayIndexMondayFirst(now: number): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short' }).formatToParts(new Date(now));
  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? 'Sun';
  const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return map[weekday] ?? 6;
}

export type DayState = 'past' | 'today' | 'future';
const WEEKDAY_LABELS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

// Tira visual da semana: dias já passados ficam apagados, hoje em destaque,
// os que faltam na cor normal — só pra dar clareza visual, não é o cálculo
// oficial do reset (esse continua em weeklyAgendaCountdown).
export function weekProgress(now = Date.now()): { label: string; state: DayState }[] {
  const todayIndex = weekdayIndexMondayFirst(now);
  return WEEKDAY_LABELS.map((label, i) => ({
    label,
    state: i < todayIndex ? 'past' : i === todayIndex ? 'today' : 'future',
  }));
}
