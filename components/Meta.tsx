import Head from 'next/head';

interface MetaProps {
 title: string;
 description: string;
 path?: string;
 ogImage?: string;
 noIndex?: boolean;
}

export default function Meta({ title, description, path = '', ogImage = '/og-image.jpg', noIndex = false }: MetaProps) {
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
      <meta property="og:image:alt" content="Sistema Britto — Workforce de IA" />
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
      
      {/* Schema JSON-LD — Organization + Service + FAQ */}
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
              "description": "Empresa brasileira que implementa automação com IA, infraestrutura DevOps e sistemas sob medida. WhatsApp com IA, SocialJobs, Sistema Sob Medida, VPS Estruturada.",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-91408-8571",
                "contactType": "sales",
                "availableLanguage": ["Portuguese", "English", "Spanish"]
              },
              "sameAs": [
                "https://wa.me/5511914088571",
                "https://github.com/sistemabritto",
                "https://blog.sistemabritto.com.br"
              ]
            },
            {
              "@type": "Service",
              "@id": "https://www.sistemabritto.com.br/whatsapp#service",
              "name": "WhatsApp com IA (Evolution API)",
              "url": "https://www.sistemabritto.com.br/whatsapp",
              "provider": { "@id": "https://www.sistemabritto.com.br/#organization" },
              "description": "Implementação de IA no WhatsApp Business. Qualificação automática de leads, agendamento 24h, CRM integrado.",
              "category": "AI Automation",
              "offers": {
                "@type": "Offer",
                "price": "297",
                "priceCurrency": "BRL",
                "priceValidUntil": "2027-12-31",
                "availability": "https://schema.org/InStock"
              }
            },
            {
            "@type": "Service",
            "@id": "https://www.sistemabritto.com.br/sistema#service",
            "name": "Sistema Sob Medida",
            "url": "https://www.sistemabritto.com.br/sistema",
            "provider": { "@id": "https://www.sistemabritto.com.br/#organization" },
            "description": "Sistemas web sob encomenda: SaaS, apps, infraestrutura, funis, integrações e white-label. Stack: Claude Code, Hermes Agent, EvoNexus, n8n, Supabase, Next.js.",
            "category": "Custom Software Development",
            "offers": {
            "@type": "Offer",
            "price": "1500",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
            }
            },
            {
            "@type": "Service",
            "@id": "https://www.sistemabritto.com.br/socialjobs#service",
            "name": "SocialJobs — Conteúdo Infinito em 5 Redes com IA",
            "url": "https://www.sistemabritto.com.br/socialjobs",
            "provider": { "@id": "https://www.sistemabritto.com.br/#organization" },
            "description": "Dezenas de agentes de IA criando posts diários em YouTube, TikTok, Instagram, LinkedIn e X automaticamente.",
            "category": "AI Content Automation",
            "offers": {
            "@type": "Offer",
            "price": "500",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
            }
            },
            {
            "@type": "Service",
            "@id": "https://www.sistemabritto.com.br/vps#service",
            "name": "VPS Estruturada",
            "url": "https://www.sistemabritto.com.br/vps",
            "provider": { "@id": "https://www.sistemabritto.com.br/#organization" },
            "description": "Infraestrutura pronta com Docker, SSL automático, backups diários e monitoramento. Setup em 24h.",
            "category": "Managed Infrastructure",
            "offers": {
            "@type": "Offer",
            "price": "297",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
            }
            },
            {
              "@type": "FAQPage",
              "@id": "https://www.sistemabritto.com.br/#faq",
              "mainEntity": [
                {
                "@type": "Question",
                "name": "O que é o Sistema Britto?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "Empresa brasileira que implementa automação com IA, infraestrutura DevOps e sistemas sob medida. Serviços: WhatsApp com IA, SocialJobs (conteúdo automático em 5 redes), Sistema Sob Medida (SaaS, apps, infra) e VPS Estruturada."
                }
                },
                {
                "@type": "Question",
                "name": "Quanto custa?",
                "acceptedAnswer": {
                "@type": "Answer",
                "text": "WhatsApp com IA a partir de R$ 297/mês. SocialJobs a partir de R$ 500/mês. Sistema Sob Medida a partir de R$ 1500. VPS Estruturada a partir de R$ 297/mês. Sem fidelidade, cancela quando quiser."
                }
                },
                {
                  "@type": "Question",
                  "name": "Em quanto tempo fica pronto?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WhatsApp com IA em 48 horas. SocialJobs em até 7 dias. Sistema Sob Medida e VPS Estruturada sob consulta — depende da complexidade."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Precisa de contrato de fidelidade?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Não. Todos os planos são mensais, sem fidelidade. Cancele quando quiser."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Funciona fora do Brasil?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim. Suporte em português, inglês e espanhol. Atendemos clientes na América Latina, EUA e Europa."
                  }
                }
              ]
            }
          ]
        })
      }} />
    </Head>
  );
}
