import Head from 'next/head';

interface MetaProps {
 title: string;
 description: string;
 path?: string;
 ogImage?: string;
 noIndex?: boolean;
 schema?: Record<string, unknown>[];
}

export default function Meta({ title, description, path = '', ogImage = '/og-image.jpg', noIndex = false, schema = [] }: MetaProps) {
  const baseUrl = 'https://www.sistemabritto.com.br';
  const url = `${baseUrl}${path}`;
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="keywords" content="WhatsApp Business, automação, IA, agentes autônomos, EvoNexus, Claude Code, Hermes, CRM, evolução API, Sistema Britto" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#0a0a0a" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook / WhatsApp / Telegram */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sistema Britto | Workforce de IA" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Sistema Britto" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      
      {/* Favicon & PWA */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/icon-192.png" sizes="192x192" />
      <link rel="icon" type="image/png" href="/icon-512.png" sizes="512x512" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Font Preconnect — LP Wizard: Carregamento < 1s */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/*
        Schema base is intentionally limited to the organization and this WebPage.
        Services, Offers, FAQ and Article belong only to pages whose visible
        content supports them; callers can provide those through `schema`.
      */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.sistemabritto.com.br/#organization",
              "name": "Sistema Britto",
              "url": "https://www.sistemabritto.com.br",
              "logo": "https://www.sistemabritto.com.br/images/logo-sistema-britto.png",
              "description": "Sistema Britto cria soluções de IA, automação e software sob medida para operações comerciais.",
              "sameAs": [
                "https://github.com/sistemabritto",
                "https://blog.sistemabritto.com.br",
                "https://www.instagram.com/sistemabritto/"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://www.sistemabritto.com.br/#website",
              "url": "https://www.sistemabritto.com.br/",
              "name": "Sistema Britto",
              "inLanguage": "pt-BR",
              "publisher": { "@id": "https://www.sistemabritto.com.br/#organization" }
            },
            {
              "@type": "WebPage",
              "@id": `${url}#webpage`,
              "url": url,
              "name": title,
              "description": description,
              "inLanguage": "pt-BR",
              "isPartOf": { "@id": "https://www.sistemabritto.com.br/#website" },
              "about": { "@id": "https://www.sistemabritto.com.br/#organization" }
            },
            ...schema
          ]
        })
      }} />
    </Head>
  );
}
