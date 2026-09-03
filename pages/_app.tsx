import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

// Generate or retrieve a session ID (persists for 30 min in sessionStorage)
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const KEY = 'sb_sid';
  const TS_KEY = 'sb_sid_ts';
  const existing = sessionStorage.getItem(KEY);
  const ts = sessionStorage.getItem(TS_KEY);

  // Reset session after 30 min inactivity
  if (existing && ts && Date.now() - parseInt(ts) < 1800000) {
    sessionStorage.setItem(TS_KEY, Date.now().toString());
    return existing;
  }

  const newSid = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(KEY, newSid);
  sessionStorage.setItem(TS_KEY, Date.now().toString());
  return newSid;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const UTM_STORE_KEY = 'sb_utm';

// Extrai UTM da URL atual e PERSISTE na sessão.
//
// Antes isto lia só window.location.search, sem guardar nada: quem chegava em
// /links?utm_source=instagram e clicava num card perdia a atribuição na
// primeira navegação, e o lead do OTP (que acontece 2–3 páginas depois)
// chegava sempre sem origem. Agora a primeira URL com UTM da sessão manda —
// gravamos uma vez e não sobrescrevemos com vazio, então navegar internamente
// não apaga a origem, mas uma nova campanha (nova URL com utm_source) sim.
function getUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v;
  }

  try {
    if (fromUrl.utm_source) {
      sessionStorage.setItem(UTM_STORE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(UTM_STORE_KEY);
    if (stored) return { ...JSON.parse(stored), ...fromUrl };
  } catch {
    // sessionStorage indisponível (modo privado / cookies bloqueados):
    // segue com o que veio na URL em vez de quebrar o pageview.
  }
  return fromUrl;
}

// UTM da sessão, pra anexar no payload de lead. Use isto em qualquer
// formulário que chame /api/leads — a API já aceita o objeto aninhado.
export function getStoredUtms(): Record<string, string> {
  return getUtms();
}

// Fire-and-forget tracking call
function track(type: 'pageview' | 'cta', payload: Record<string, string>) {
  const session_id = getSessionId();
  if (!session_id) return;

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, session_id, ...payload }),
    keepalive: true,
  }).catch(() => {}); // silently fail, never block UX
}

// Track a CTA click — import and call from any button onClick
export function trackCta(page: string, label: string, action: string = '') {
  track('cta', { page, cta_label: label, cta_action: action });
}

// Meta Pixel component — reads ID from Supabase via /api/config/pixel
function MetaPixel() {
 const [pixelId, setPixelId] = useState<string>('');

 useEffect(() => {
 fetch('/api/config/pixel')
 .then(r => r.json())
 .then(data => {
 if (data.pixel_id) setPixelId(data.pixel_id);
 })
 .catch(() => {
 const fallback = localStorage.getItem('meta_pixel_id');
 if (fallback) setPixelId(fallback);
 });
 }, []);

 if (!pixelId) return null;

 return (
 <>
 <Script
 id="meta-pixel-init"
 strategy="afterInteractive"
 dangerouslySetInnerHTML={{
 __html: `
 !function(f,b,e,v,n,t,s)
 {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
 n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
 n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];
 s.parentNode.insertBefore(t,s)}(window, document,'script',
 'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '${pixelId}');
 fbq('track', 'PageView');
 `,
 }}
 />
 <noscript>
 <img
 height="1"
 width="1"
 style={{ display: 'none' }}
 src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
 alt=""
 />
 </noscript>
 </>
 );
}

// Google Tag Manager component — reads ID from Supabase via /api/config/gtm
function GoogleTagManager() {
 const [gtmId, setGtmId] = useState<string>('');

 useEffect(() => {
 fetch('/api/config/gtm')
 .then(r => r.json())
 .then(data => {
 if (data.gtm_id) setGtmId(data.gtm_id);
 })
 .catch(() => {});
 }, []);

 if (!gtmId) return null;

 return (
 <>
 <Script
 id="gtm-script"
 strategy="afterInteractive"
 dangerouslySetInnerHTML={{
 __html: `
 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
 })(window,document,'script','dataLayer','${gtmId}');
 `,
 }}
 />
 <noscript>
 <iframe
 src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
 height="0"
 width="0"
 style={{ display: 'none', visibility: 'hidden' }}
 />
 </noscript>
 </>
 );
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track pageview on every route change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleRouteChange = (path: string) => {
      const utms = getUtms();
      track('pageview', {
        path,
        referrer: document.referrer || '',
        ...utms,
      });
    };

    // Track initial page load
    handleRouteChange(window.location.pathname);

    // Track subsequent route changes
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <MetaPixel />
      <GoogleTagManager />
      <Script
        defer
        data-domain="www.sistemabritto.com.br"
        src="https://track.workflowapi.com.br/js/script.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
