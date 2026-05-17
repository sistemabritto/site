import Head from 'next/head';

interface MetaProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export default function Meta({ title, description, path = '', ogImage = '/og-image.jpg' }: MetaProps) {
  const baseUrl = 'https://www.sistemabritto.com.br';
  const url = `${baseUrl}${path}`;
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
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
              "description": "Empresa brasileira que implementa workforces de IA para empresas. WhatsApp com IA, EvoNexus, Hermes Agent, Claude Code.",
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
              "description": "Implementação de IA no WhatsApp Business. Qualificação automática de leads, agendamento 24/7, CRM integrado.",
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
              "@id": "https://www.sistemabritto.com.br/evonexus#service",
              "name": "EvoNexus — Workforce de IA para Negócios",
              "url": "https://www.sistemabritto.com.br/evonexus",
              "provider": { "@id": "https://www.sistemabritto.com.br/#organization" },
              "description": "Workforce completa de IA com 38 agentes especializados em negócios e engenharia. Multi-provider, dashboard web, memória persistente."
            },
            {
              "@type": "Service",
              "@id": "https://www.sistemabritto.com.br/hermes#service",
              "name": "Hermes Agent — Framework Aberto de IA",
              "url": "https://www.sistemabritto.com.br/hermes",
              "provider": { "@id": "https://www.sistemabritto.com.br/#organization" },
              "description": "Framework open-source de agentes de IA com Kanban nativo, multi-provider real, skills em markdown."
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
                    "text": "Empresa brasileira que implementa workforces de IA para empresas. Serviços: WhatsApp com IA, EvoNexus (38 agentes), Hermes Agent (framework aberto), Claude Code (engenharia de software com IA)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto custa o WhatsApp com IA?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A partir de R$ 297/mês para WhatsApp com IA. Planos de workforce (EvoNexus) sob consulta. Sem fidelidade, cancela quando quiser."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Em quanto tempo fica pronto?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WhatsApp com IA em 48 horas. Workforce completa (EvoNexus) em até 30 dias. DevOps e SaaS sob consulta."
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
