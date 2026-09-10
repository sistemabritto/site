// Same entry product used by Sprint and Implementation. Never duplicate checkout IDs.
export const ARCHITECTURE_SESSION = {
  path: '/sessao-de-arquitetura',
  checkoutUrl: 'https://pay.cakto.com.br/35xvemn',
  price: 150,
} as const;

export function architectureCheckoutUrl(utms: Record<string, string> = {}): string {
  const url = new URL(ARCHITECTURE_SESSION.checkoutUrl);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    if (utms[key]) url.searchParams.set(key, utms[key]);
  }
  // Keep the originating magnet/content; do not overwrite it with the checkout name.
  if (!url.searchParams.has('utm_content')) url.searchParams.set('utm_content', 'sessao-arquitetura');
  return url.toString();
}
