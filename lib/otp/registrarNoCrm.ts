// Espelha o OTP enviado como uma conversa no inbox "whatsapp-cloud" do EvoCRM.
//
// Por que espelhar em vez de mandar PELO CRM: o template otp_acesso_video é
// AUTHENTICATION e tem botão URL COPY_CODE, que exige um componente `button`
// no payload da Graph API. O WhatsappCloudService do CRM monta só o componente
// `body` (app/services/whatsapp/providers/whatsapp_cloud_service.rb,
// template_body_parameters) — mandar o OTP por lá hoje voltaria erro 132000 da
// Meta e ninguém receberia código. Então o envio continua direto na Graph
// (mesmo phone_number_id do canal, 1207450899109215) e aqui só registramos o
// que já foi entregue.
//
// O registro não redispara nada: Base::SendOnChannelService#invalid_message?
// trata mensagem com source_id preenchido como "originada do canal" e não
// reenvia. Verificado ao vivo em 22/08/2026 — mensagem criada com source_id
// ficou status 0 (sent) sem nenhuma chamada à Meta.
//
// Efeito prático: a resposta do lead (que já chega no CRM pelo webhook da
// Meta) cai na MESMA conversa, com o OTP visível acima. É isso que o Felipe
// chamou de "monitorar com coexistência".

const EVOCRM_BASE_URL = 'https://evoapi.workflowapi.com.br';
const EVOCRM_API_TOKEN = process.env.EVOCRM_API_TOKEN || '';
// Inbox "whatsapp-cloud" (+15559636660), o mesmo número que a Graph usa.
const INBOX_ID = process.env.EVOCRM_OTP_INBOX_ID || 'a79c18dd-9d75-4eae-8e5c-2479294c6d40';

type Json = any;

async function crm(caminho: string, init?: RequestInit): Promise<{ ok: boolean; status: number; body: Json }> {
  const resposta = await fetch(`${EVOCRM_BASE_URL}/api/v1${caminho}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      api_access_token: EVOCRM_API_TOKEN,
      ...(init?.headers || {}),
    },
  });
  const texto = await resposta.text();
  let body: Json = null;
  try {
    body = texto ? JSON.parse(texto) : null;
  } catch {
    body = texto;
  }
  return { ok: resposta.ok, status: resposta.status, body };
}

/** O CRM guarda telefone com +, mas source_id do canal cloud é só dígitos. */
function comMais(numero: string): string {
  const digitos = numero.replace(/\D/g, '');
  return `+${digitos}`;
}

async function acharOuCriarContato(numero: string, nome?: string): Promise<string | null> {
  const busca = await crm(`/contacts/search?q=${encodeURIComponent(comMais(numero))}`);
  const encontrados: Json[] = busca.body?.data ?? [];
  const exato = encontrados.find((c) => c?.phone_number === comMais(numero));
  if (exato?.id) return exato.id;

  const criado = await crm('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      name: nome || `WhatsApp ${numero.replace(/\D/g, '').slice(-4)}`,
      phone_number: comMais(numero),
      inbox_id: INBOX_ID,
    }),
  });
  return criado.body?.data?.id ?? criado.body?.data?.contact?.id ?? null;
}

/**
 * Reaproveita uma conversa aberta do contato neste inbox em vez de abrir uma
 * nova a cada código. Sem isso, quem pedisse OTP três vezes viraria três
 * conversas soltas e o histórico ficaria impossível de acompanhar.
 */
async function acharOuCriarConversa(contatoId: string, numero: string): Promise<string | null> {
  const digitos = numero.replace(/\D/g, '');

  const existentes = await crm(`/contacts/${contatoId}/conversations`);
  const lista: Json[] = existentes.body?.data ?? [];
  const aberta = lista.find((c) => c?.inbox_id === INBOX_ID && c?.status !== 'resolved');
  if (aberta?.id) return aberta.id;

  // contact_inbox é pré-requisito da conversa: é ele que liga o contato ao
  // source_id que a Meta usa. 204 (criado) e 4xx (já existia) são ambos ok.
  await crm(`/contacts/${contatoId}/contact_inboxes`, {
    method: 'POST',
    body: JSON.stringify({ inbox_id: INBOX_ID, source_id: digitos }),
  });

  const criada = await crm('/conversations', {
    method: 'POST',
    body: JSON.stringify({ source_id: digitos, inbox_id: INBOX_ID, contact_id: contatoId }),
  });
  return criada.body?.data?.id ?? null;
}

/**
 * Best effort: qualquer falha aqui é logada e engolida. Registrar a conversa é
 * conveniência de acompanhamento — não pode impedir alguém de receber o código
 * que já saiu.
 */
export async function registrarOtpNoCrm(opcoes: {
  numero: string;
  nome?: string;
  wamid: string;
  conteudo: string;
}): Promise<void> {
  const { numero, nome, wamid, conteudo } = opcoes;
  if (!EVOCRM_API_TOKEN || !wamid) return;

  try {
    const contatoId = await acharOuCriarContato(numero, nome);
    if (!contatoId) {
      console.error('[otp/crm] não consegui resolver o contato para', numero.slice(-4));
      return;
    }

    const conversaId = await acharOuCriarConversa(contatoId, numero);
    if (!conversaId) {
      console.error('[otp/crm] não consegui resolver a conversa para', numero.slice(-4));
      return;
    }

    const msg = await crm(`/conversations/${conversaId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content: conteudo,
        message_type: 'outgoing',
        // source_id é o que impede o reenvio pela Meta — ver comentário do topo.
        source_id: wamid,
      }),
    });
    if (!msg.ok) {
      console.error('[otp/crm] mensagem não registrada:', msg.status, JSON.stringify(msg.body).slice(0, 300));
    }
  } catch (erro) {
    console.error('[otp/crm] erro ao espelhar OTP:', erro);
  }
}
