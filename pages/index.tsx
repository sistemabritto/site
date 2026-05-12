import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import GoogleReviews from '../components/GoogleReviews';
import ROICalculator from '../components/ROICalculator';
import WhatsAppCTA from '../components/WhatsAppCTA';
import Ecossistema from '../components/Ecossistema';
import Mission from '../components/Mission';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow API Studio — Workforce de IA para seu negócio</title>
        <meta name="description" content="Agentes autônomos que atendem clientes, gerenciam finanças, coordenam projetos e escrevem código. Uma workforce completa que nunca dorme." />
        <meta name="keywords" content="WhatsApp Business, automação, IA, agentes autônomos, EvoNexus, Claude Code, Hermes, CRM, evolução API" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#F59E0B" />
        
        <meta property="og:title" content="Workflow API Studio — Workforce de IA para seu negócio" />
        <meta property="og:description" content="Agentes autônomos que atendem clientes, gerenciam finanças, coordenam projetos e escrevem código." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workflowapi.com.br" />
        <meta property="og:locale" content="pt_BR" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Workflow API Studio — Workforce de IA para seu negócio" />
        <meta name="twitter:description" content="Agentes autônomos que atendem clientes, gerenciam finanças, coordenam projetos e escrevem código." />
        
        <link rel="icon" href="/favicon.svg" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      
      <meta property="og:image" content="https://workflowapi.com.br/og-image.svg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Workflow API Studio — Workforce de IA" />
      
      <meta name="twitter:image" content="https://workflowapi.com.br/og-image.svg" />
        
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

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />
        <Hero />
        <Services />
        <GoogleReviews />
        <ROICalculator />
        <WhatsAppCTA />
        <Ecossistema />
        <Mission />
        <Footer />
      </main>
    </>
  );
}
