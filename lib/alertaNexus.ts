// Reporta um alerta pro EvoNexus, que já é o canal único de notificação do
// workspace (Telegram, hoje — ver notifications.py no repo evo-nexus). O
// site NUNCA fala com o Telegram diretamente: não precisa da credencial do
// bot, só precisa dizer "isso falhou" pra quem já sabe como avisar.
//
// Endpoint dedicado (`POST /api/alerts/site`), autenticado por SITE_ALERT_TOKEN
// — token escopado só a este uso, não o DASHBOARD_API_TOKEN de escopo total
// (ver dashboard/backend/routes/_helpers.py::valid_site_alert_token). Fail-open
// sempre: sem a env configurada, ou com o Nexus fora do ar, loga no console e
// segue — isto nunca pode derrubar a resposta da API que chamou.
export async function alertarNexus(titulo: string, mensagem: string): Promise<void> {
  const baseUrl = process.env.NEXUS_ALERT_URL || 'https://nexus.workflowapi.com.br';
  const token = process.env.SITE_ALERT_TOKEN;
  if (!token) {
    console.error('[alertaNexus] SITE_ALERT_TOKEN não configurado — alerta não enviado:', titulo);
    return;
  }
  try {
    const resposta = await fetch(`${baseUrl}/api/alerts/site`, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, mensagem }),
    });
    if (!resposta.ok) {
      console.error('[alertaNexus] envio falhou:', resposta.status, await resposta.text());
    }
  } catch (erro) {
    console.error('[alertaNexus] envio indisponível:', erro instanceof Error ? erro.message : erro);
  }
}
