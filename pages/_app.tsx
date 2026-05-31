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

// Extract UTM params from URL
function getUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
  };
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
  }).catch(() => {}); // silently fail — never block UX
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
      <Component {...pageProps} />
    </>
  );
}
