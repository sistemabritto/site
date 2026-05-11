import Head from 'next/head';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import ROICalculator from '../components/ROICalculator';
import ClubPlugPlay from '../components/ClubPlugPlay';
import WhatsAppCTA from '../components/WhatsAppCTA';
import Mission from '../components/Mission';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow API Studio</title>
        <meta
          name="description"
          content="Workflow API Studio é uma empresa especializada em automação de processos e integração de APIs para pequenas e médias empresas (PMEs) que desejam escalar suas operações com eficiência."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Workflow API Studio" />
        <meta
          property="og:description"
          content="Automação simples, resultados poderosos. Transforme seu WhatsApp em um canal que vende por você."
        />
        <meta property="og:image" content="/images/og-image.png" />
        
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

      <main>
        <Hero />
        <Benefits />
        <ROICalculator />
        <ClubPlugPlay />
        <WhatsAppCTA />
        <Mission />
        <Footer />
      </main>
    </>
  );
}
