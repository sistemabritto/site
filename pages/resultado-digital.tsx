import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const PHONE = '5511914088571';

export default function ResultadoDigital() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [produto, setProduto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try { setCustomerData(JSON.parse(storedCustomer)); } catch {}
      }
      const storedAnswers = sessionStorage.getItem('qualificacao_answers');
      if (storedAnswers) {
        try {
          const parsed = JSON.parse(storedAnswers);
          if (parsed.produto) setProduto(parsed.produto);
        } catch {}
      }
    }
    setLoading(false);
  }, []);

  const handleWhatsAppContact = () => {
    const isDevops = produto === 'devops';
    const isSaaS = produto === 'saas';
    
    let message = '';
    if (isDevops) {
      message = `Fala, Felipe. Tô precisando de braço técnico pra infraestrutura/DevOps. Bora conversar?\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    } else if (isSaaS) {
      message = `Fala, Felipe. Tô precisando de braço pra criar um SaaS. Bora conversar?\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    } else {
      message = `Fala, Felipe. Preciso de um orçamento sob medida. Bora conversar?\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    }
    
    window.location.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
        <p className="text-white">Preparando sua consultoria...</p>
      </div>
    );
  }

  const isDevops = produto === 'devops';
  const isSaaS = produto === 'saas';

  return (
    <>
      <Meta 
        title={isDevops ? "Infraestrutura & DevOps — Sistema Britto" : isSaaS ? "SaaS Sob Encomenda — Sistema Britto" : "Soluções Digitais Sob Medida — Sistema Britto"}
        description="Sua solução digital sob medida. Infraestrutura, DevOps ou SaaS."
        path="/resultado-digital"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <section className="pt-32 pb-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">{isDevops ? '⚙️' : isSaaS ? '💻' : '🚀'}</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isDevops ? 'Sua infra não pode depender de sorte.' : isSaaS ? 'Você tem a ideia. A gente constrói o SaaS.' : 'Seu perfil é para soluções sob medida'}
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              {isDevops ? 'Servidor cai, deploy quebra, API lenta. Não é falta de esforço. É falta de braço.' : isSaaS ? 'Do MVP ao produto final. Infra própria, pagamentos recorrentes, escala.' : 'Infraestrutura ou SaaS — você escolhe.'}
            </p>
            
            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div className={`bg-[#111111] rounded-2xl p-6 border-2 ${isDevops ? 'border-[#D4AF37]' : 'border-white/10'}`}>
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-xl font-bold text-white mb-2">Infraestrutura & DevOps</h3>
                <p className="text-gray-300 text-sm mb-4">Servidor próprio, Docker, deploy, monitoramento, segurança. SLA 24h.</p>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(`Fala, Felipe. Quero estruturar minha INFRA. Me chama.\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`);
                    window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-3 rounded-full font-bold transition-all"
                >
                  QUERO INFRA →
                </button>
              </div>
              <div className={`bg-[#111111] rounded-2xl p-6 border-2 ${isSaaS ? 'border-pink-500' : 'border-white/10'}`}>
                <div className="text-3xl mb-3">💻</div>
                <h3 className="text-xl font-bold text-white mb-2">SaaS Sob Encomenda</h3>
                <p className="text-gray-300 text-sm mb-4">Do zero ao faturamento em 30 dias. Você é dono do código, da marca e do lucro.</p>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(`Fala, Felipe. Quero criar um SAAS. Me chama.\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`);
                    window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
                  }}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-black py-3 rounded-full font-bold transition-all"
                >
                  QUERO SAAS →
                </button>
              </div>
            </div>

            {/* CTA principal */}
            <button
              onClick={handleWhatsAppContact}
              className="bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-primary-500/25"
            >
              FALAR COM FELIPE AGORA →
            </button>
            <p className="text-gray-500 text-sm mt-3">Orçamento sob medida em até 24h. Sem compromisso.</p>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Quem já fez com a gente:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-[#D4AF37] font-bold mb-2">🔧 Infraestrutura</div>
                <p className="text-gray-300 text-sm">Infra completa pra escritório de advocacia. Servidor próprio, backup, segurança, zero downtime.</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-2">💻 SaaS de Áudio</div>
                <p className="text-gray-300 text-sm">Do zero ao faturamento em 30 dias. Infra própria, pagamentos recorrentes, 50% de margem.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}