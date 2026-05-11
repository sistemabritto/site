import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import ROICalculator from '../components/ROICalculator';
import WhatsAppCTA from '../components/WhatsAppCTA';
import ClubPlugPlay from '../components/ClubPlugPlay';
import Mission from '../components/Mission';
import Footer from '../components/Footer';

/**
 * Workflow API Studio — Homepage
 * AI-Native UI + Glassmorphism + Aurora
 * Mobile-first, fancy, insano
 */

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow API Studio — Agentes de IA no WhatsApp</title>
        <meta name="description" content="Automações inteligentes no WhatsApp que qualificam leads, agendam, vendem e entregam — 24h por dia, 7 dias por semana. Comece agora." />
        <meta name="keywords" content="WhatsApp Business, automação, IA, chatbot, agente inteligente, leads, vendas, agendamento, delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#7C3AED" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Workflow API Studio — Agentes de IA no WhatsApp" />
        <meta property="og:description" content="Automações inteligentes que qualificam leads, vendem e entregam por você. 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workflowapi.com.br" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Workflow API Studio — Agentes de IA no WhatsApp" />
        <meta name="twitter:description" content="Automações inteligentes que qualificam leads, vendem e entregam por você. 24/7." />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Facebook Pixel */}
        <script
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
              fbq('init', '714576184493722');
              fbq('track', 'PageView');
            `,
          }}
        />
      </Head>

      <main className="min-h-screen bg-surface-50">
        <Navbar />
        <Hero />
        <Benefits />
        <ROICalculator />
        <WhatsAppCTA />
        <ClubPlugPlay />
        <Mission />
        <Footer />
      </main>
    </>
  );
}
