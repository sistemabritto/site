import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

export default function VPS() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          setCustomerData(JSON.parse(stored));
        } catch {}
      }
    }
  }, []);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Fala, Felipe. Fiz a qualificação e quero estruturar minha infra/VPS. Bora conversar?\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`
    );
    window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
  };

  return (
    <>
      <Meta
        title="Sua VPS Estruturada — Sistema Britto"
        description="Infraestrutura completa pra sua VPS. Docker, deploy, segurança, monitoramento."
        path="/vps"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">{'\uD83D\uDD27'}</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Sua VPS, <span className="text-[#D4AF37]">100% estruturada</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Servidor que não cai. Deploy que não quebra. Segurança que não falha.
            </p>
            <p className="text-gray-400 mb-8">
              Docker, monitoramento, backup automático, SSL, firewall. Tudo configurado e com SLA 24h.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDCBB'}</div>
                <h3 className="text-white font-bold mb-2">Docker & Deploy</h3>
                <p className="text-gray-400 text-sm">Contêineres, CI/CD, rollback automático. Deploy em 1 comando.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDD0C'}</div>
                <h3 className="text-white font-bold mb-2">Monitoramento 24/7</h3>
                <p className="text-gray-400 text-sm">Uptime, CPU, RAM, disco. Alerta no WhatsApp se algo cair.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDD12'}</div>
                <h3 className="text-white font-bold mb-2">Segurança</h3>
                <p className="text-gray-400 text-sm">Firewall, SSL, backup diário, proteção contra DDoS.</p>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-[#D4AF37]/25"
            >
              FALAR COM ESPECIALISTA {'\u2192'}
            </button>
            <p className="text-gray-500 text-sm mt-3">Orçamento sob medida. Resposta em até 24h.</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}