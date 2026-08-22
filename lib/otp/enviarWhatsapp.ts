// Envio do código por WhatsApp — WhatsApp Cloud API (Meta), não Evolution
// Go. O canal configurado no CRM (crm.workflowapi.com.br) pra este número é
// whatsapp_cloud (Meta Graph API), então o envio de OTP tem que falar com
// essa API, não com o gateway Evolution Go (que é usado por outros números).
//
// Usa o template AUTHENTICATION "otp_acesso_video" (aprovado no Meta Business
// Manager em 15/08/2026, id 1043176005238539) — categoria AUTHENTICATION é
// obrigatória pra mensagens de código fora da janela de 24h, e o corpo/botão
// do template já vêm pré-aprovados (não dá pra mandar texto livre).

const WA_CLOUD_PHONE_NUMBER_ID = process.env.WA_CLOUD_PHONE_NUMBER_ID || '';
const WA_CLOUD_API_KEY = process.env.WA_CLOUD_API_KEY || '';
const WA_CLOUD_OTP_TEMPLATE = process.env.WA_CLOUD_OTP_TEMPLATE || 'otp_acesso_video';
const WA_CLOUD_GRAPH_VERSION = process.env.WA_CLOUD_GRAPH_VERSION || 'v23.0';

// wamid é o id que a Meta devolve pra mensagem enviada. Ele volta daqui porque
// é o que o espelho no CRM usa como source_id — sem ele o CRM trataria a
// mensagem como nova e tentaria mandar de novo. Ver lib/otp/registrarNoCrm.ts.
export type ResultadoEnvio = { status: 'enviado'; wamid: string } | { status: 'erro'; mensagem: string };

export async function enviarCodigoWhatsapp(numero: string, codigo: string, _nome?: string): Promise<ResultadoEnvio> {
  if (!WA_CLOUD_PHONE_NUMBER_ID || !WA_CLOUD_API_KEY) {
    return { status: 'erro', mensagem: 'WA_CLOUD_PHONE_NUMBER_ID/WA_CLOUD_API_KEY não configurados' };
  }

  const url = `https://graph.facebook.com/${WA_CLOUD_GRAPH_VERSION}/${WA_CLOUD_PHONE_NUMBER_ID}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to: numero,
    type: 'template',
    template: {
      name: WA_CLOUD_OTP_TEMPLATE,
      language: { code: 'pt_BR' },
      components: [
        { type: 'body', parameters: [{ type: 'text', text: codigo }] },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [{ type: 'text', text: codigo }],
        },
      ],
    },
  };

  try {
    const resposta = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WA_CLOUD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const corpo = await resposta.text();

    if (!resposta.ok) {
      return { status: 'erro', mensagem: `HTTP ${resposta.status}: ${corpo.slice(0, 300)}` };
    }

    // Formato da Graph: { messages: [{ id: "wamid...." }] }. Se por algum
    // motivo não vier, o envio ainda foi um sucesso — só o espelho no CRM é
    // que fica de fora (registrarOtpNoCrm sai cedo com wamid vazio).
    let wamid = '';
    try {
      wamid = JSON.parse(corpo)?.messages?.[0]?.id || '';
    } catch {
      wamid = '';
    }

    return { status: 'enviado', wamid };
  } catch (erro) {
    return { status: 'erro', mensagem: erro instanceof Error ? erro.message : 'erro desconhecido' };
  }
}
