// Envio do código por WhatsApp — adaptado de sistemabritto/zapoferta
// (lib/whatsapp/evolution-go.ts), que já resolve dois problemas reais:
// 1) tenta /send/text (rota correta) e cai pra /message/sendText/:instance
//    só se a primeira devolver 404 — cobre os dois formatos de deploy da
//    Evolution API sem precisar saber qual está no ar.
// 2) confere se o JID que a API devolveu bate com o número que a gente
//    pediu pra mandar — sem isso um bug de instância errada manda a
//    mensagem pro contato errado sem ninguém perceber.

const EVO_API_URL = (process.env.EVO_API_URL || 'https://go.workflowapi.com.br').replace(/\/$/, '');
const EVO_TOKEN = process.env.EVO_TOKEN || '';
const EVO_INSTANCE = process.env.EVO_INSTANCE || '';

export type ResultadoEnvio = { status: 'enviado' } | { status: 'erro'; mensagem: string };

function reduzirNumeroBrasil(num: string): string | null {
  const m = num.match(/^55(\d{2})(\d{8,9})$/);
  if (!m) return null;
  let assinante = m[2];
  if (assinante.length === 9 && assinante.startsWith('9')) assinante = assinante.slice(1);
  return `55${m[1]}${assinante}`;
}

function numerosEquivalentes(esperado: string, recebido: string): boolean {
  if (esperado === recebido) return true;
  const a = reduzirNumeroBrasil(esperado);
  const b = reduzirNumeroBrasil(recebido);
  return Boolean(a && b && a === b);
}

async function postar(url: string, body: Record<string, unknown>) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: EVO_TOKEN,
      // Sem isto o gateway devolve 403 pro User-Agent padrão de alguns
      // clientes HTTP — confirmado contra este mesmo gateway em 28/07/2026
      // (ver dashboard/backend/notifications.py no repo evo-nexus). O fetch
      // do Node normalmente não cai nisso, mas custa nada garantir.
      'User-Agent': 'Mozilla/5.0 (compatible; SistemaBrittoBot/1.0)',
    },
    body: JSON.stringify(body),
  });
}

async function enviarComFallback(numero: string, texto: string) {
  const payload = { number: numero, text: texto, delay: 800, linkPreview: false };

  const respostaGo = await postar(`${EVO_API_URL}/send/text`, payload);
  if (respostaGo.status !== 404) return respostaGo;

  // Fallback pro formato antigo, só quando o novo devolve 404 (rota não existe
  // nesta instância) — nunca em caso de 401/403/500, que são erro de verdade.
  return postar(`${EVO_API_URL}/message/sendText/${EVO_INSTANCE}`, payload);
}

export async function enviarCodigoWhatsapp(numero: string, codigo: string, nome?: string): Promise<ResultadoEnvio> {
  if (!EVO_TOKEN || !EVO_INSTANCE) {
    return { status: 'erro', mensagem: 'EVO_TOKEN/EVO_INSTANCE não configurados' };
  }

  const texto = [
    nome ? `🔐 *Sistema Britto* — oi, ${nome}! Aqui está seu código de acesso` : '🔐 *Sistema Britto* — código de acesso',
    '',
    `*${codigo}*`,
    '',
    '⏳ Expira em 5 minutos.',
    '🔒 Não compartilhe com ninguém.',
  ].join('\n');

  try {
    const resposta = await enviarComFallback(numero, texto);
    const corpo = await resposta.text();

    if (!resposta.ok) {
      return { status: 'erro', mensagem: `HTTP ${resposta.status}: ${corpo.slice(0, 200)}` };
    }

    let payload: { key?: { remoteJid?: string }; data?: { Info?: { Chat?: string } } } = {};
    try {
      payload = JSON.parse(corpo || '{}');
    } catch {
      // corpo não-JSON em resposta 2xx — segue sem a checagem de JID
    }
    const jidRecebido = (payload.key?.remoteJid || payload.data?.Info?.Chat || '').replace(/@.*/, '');
    if (jidRecebido && !numerosEquivalentes(numero, jidRecebido)) {
      return {
        status: 'erro',
        mensagem: `destinatário divergente: esperado ${numero}, retornado ${jidRecebido}`,
      };
    }

    return { status: 'enviado' };
  } catch (erro) {
    return { status: 'erro', mensagem: erro instanceof Error ? erro.message : 'erro desconhecido' };
  }
}
