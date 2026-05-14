import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import GoogleReviews from '../components/GoogleReviews';
import ROICalculator from '../components/ROICalculator';
import WhatsAppCTA from '../components/WhatsAppCTA';
import Ecossistema from '../components/Ecossistema';
import Mission from '../components/Mission';
import Footer from '../components/Footer';
import PlansSection from '../components/PlansSection';

export default function Home() {
  return (
    <>
      <Meta 
        title="Sistema Britto — Workforce de IA para seu negócio"
        description="Agentes autônomos que atendem clientes, gerenciam finanças, coordenam projetos e escrevem código. Uma workforce completa que nunca dorme."
        path="/"
      />
      
 <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
 <Navbar />
 <Hero />
 <Services />
 <GoogleReviews />
 <ROICalculator />
 <PlansSection />
 <WhatsAppCTA />
 <Ecossistema />
 <Mission />
 <Footer />
 </main>
    </>
  );
}
