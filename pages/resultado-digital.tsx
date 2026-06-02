import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

export default function ResultadoDigital() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try { setCustomerData(JSON.parse(storedCustomer)); } catch {}
      }
    }
    setLoading(false);
  }, []);

  const handleWhatsAppContact = (servico: string) => {
  const NL = '%0A';
  const serviceLabels: Record<string, string> = {
  infra: 'Infraestrutura / DevOps',
  saas: 'Criação de SaaS',
  sobmedida: 'Orçamento sob medida',
  };
  const label = serviceLabels[servico] || servico;
  const message =
  `🟣 *Preciso de algo sob encomenda*${NL}${NL}` +
  `*Serviço:* ${label}${NL}${NL}` +
  `———${NL}` +
  `👤 ${customerData.name || '—'}${NL}` +
  `📧 ${customerData.email || '—'}${NL}` +
  `📱 ${customerData.whatsapp || '—'}`;
  window.location.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" />
        <p className="text-white">Preparando sua solução sob medida...</p>
      </div>
    );
  }

  return (
    <>
      <Meta 
      title="Soluções Sob Encomenda — Sistema Britto"
      description="Infraestrutura, DevOps ou SaaS. Sua solução digital sob medida."
      path="/resultado-digital"
      noIndex={true}
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <section className="pt-32 pb-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">🛠️</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Soluções <span className="text-purple-400">Sob Encomenda</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Sua ideia, nosso braço. Do MVP ao faturamento.
            </p>
            <p className="text-gray-400 mb-8">
              Infra própria, código seu, sem mensalidade de plataforma.
            </p>
            
            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="bg-[#111111] rounded-2xl p-6 border-2 border-[#D4AF37] hover:border-[#C5A028] transition-all">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-xl font-bold text-white mb-2">Infraestrutura & DevOps</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Servidor próprio, Docker, deploy, monitoramento, segurança. Tudo automatizado.
                </p>
                <button
                  onClick={() => handleWhatsAppContact('infra')}
                  className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-3 rounded-full font-bold transition-all"
                >
                  QUERO INFRA →
                </button>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border-2 border-purple-500 hover:border-purple-400 transition-all">
                <div className="text-3xl mb-3">💻</div>
                <h3 className="text-xl font-bold text-white mb-2">SaaS Sob Encomenda</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Do zero ao faturamento — app, site, pagamento recorrente. Código 100% seu.
                </p>
                <button
                  onClick={() => handleWhatsAppContact('saas')}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-black py-3 rounded-full font-bold transition-all"
                >
                  QUERO MEU SAAS →
                </button>
              </div>
            </div>

            {/* CTA principal */}
            <button
              onClick={() => handleWhatsAppContact('geral')}
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
              <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-2">💻 SaaS de Áudio</div>
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