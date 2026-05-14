import Head from 'next/head';

interface MetaProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export default function Meta({ title, description, path = '', ogImage = '/og-image.svg' }: MetaProps) {
  const baseUrl = 'https://www.sistemabritto.com.br';
  const url = `${baseUrl}${path}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="WhatsApp Business, automação, IA, agentes autônomos, EvoNexus, Claude Code, Hermes, CRM, evolução API, Sistema Britto" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#D4AF37" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sistema Britto — Workforce de IA" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Favicon & PWA */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}
