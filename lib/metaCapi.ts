import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Meta Conversions API — eventos de servidor pro Meta, complementares (ou
// substitutos, quando o navegador bloqueia o Pixel) ao pixel client-side já
// injetado em _app.tsx via /api/config/pixel.
//
// O access token é um segredo de verdade (permite mandar evento de compra
// falso pra conta de anúncio) — por isso vive em `secret_config`, não em
// `site_config` (que tem SELECT público de propósito pro pixel_id). Nunca
// devolver o valor do token pra fora desta função.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

const GRAPH_API_VERSION = 'v21.0';
const TOKEN_KEY = 'meta_capi_access_token';

function getSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function salvarTokenCapi(accessToken: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('secret_config')
    .upsert({ key: TOKEN_KEY, value: accessToken, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw new Error(error.message);
}

async function lerTokenCapi(): Promise<string> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('secret_config')
    .select('value')
    .eq('key', TOKEN_KEY)
    .single();
  if (error || !data) return '';
  return data.value || '';
}

async function lerPixelId(): Promise<string> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'meta_pixel_id')
    .single();
  if (error || !data) return '';
  return data.value || '';
}

/** Estado seguro pra exibir no admin — nunca o token inteiro. */
export async function statusCapi(): Promise<{ pixel_id: string; configurado: boolean; token_preview: string | null }> {
  const [token, pixelId] = await Promise.all([lerTokenCapi(), lerPixelId()]);
  return {
    pixel_id: pixelId,
    configurado: token.length > 0,
    token_preview: token ? `••••${token.slice(-4)}` : null,
  };
}

/** Envia um evento de teste real pro Graph API — é a validação: token e
 * pixel errados voltam erro explícito da Meta, não um "parece ok" nosso. */
export async function validarCapi(): Promise<{ ok: boolean; detalhe: string }> {
  const [token, pixelId] = await Promise.all([lerTokenCapi(), lerPixelId()]);
  if (!token) return { ok: false, detalhe: 'Nenhum token salvo ainda' };
  if (!pixelId) return { ok: false, detalhe: 'meta_pixel_id não configurado (aba Config)' };

  const eventId = crypto.randomUUID();
  const body = {
    data: [{
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: 'https://www.sistemabritto.com.br',
      user_data: {
        // Hash exigido pelo Graph API mesmo em evento de validação sintético.
        client_ip_address: '127.0.0.1',
        client_user_agent: 'meta-capi-validation/1.0',
      },
    }],
    test_event_code: undefined,
    access_token: token,
  };

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      const msg = data?.error?.message || `Graph API respondeu ${res.status}`;
      return { ok: false, detalhe: msg };
    }
    return { ok: true, detalhe: `evento recebido (events_received: ${data.events_received ?? '?'}, fbtrace_id: ${data.fbtrace_id ?? '?'})` };
  } catch (err: any) {
    return { ok: false, detalhe: err?.message || 'falha de rede ao chamar o Graph API' };
  }
}
