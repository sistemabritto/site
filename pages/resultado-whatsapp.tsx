import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

export default function ResultadoWhatsApp() {
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

  const checkoutUrl = 'https://pay.abacatepay.com/checkout/D3c0yX8Tg';

  const handleCheckout = () => {
    const name = customerData.name || '';
    const email = customerData.email || '';
    const whatsapp = customerData.whatsapp || '';
    
    const url = new URL(checkoutUrl);
    url.searchParams.set('customer', JSON.stringify({
      name: name,
      email: email,
      cellphone: whatsapp,
    }));
    
    window.location.href = url.toString();
  };

  return (
    <>
      <Meta
        title="WhatsApp + IA — Seu plano ideal — Sistema Britto"
        description="Automação de WhatsApp com IA. A partir de R$ 297/mês."
        path="/resultado-whatsapp"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        
        {/* HERO */}
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">{'\uD83E\uDD16'}</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              WhatsApp com <span className="text-green-400">IA</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Comece por aqui. O melhor custo-benefício pra sair do zero.
            </p>
            <p className="text-gray-400 mb-8">
              CRM inteligente + IA que vende no WhatsApp. Sem fidelidade. Resultado em 48h.
            </p>

            {/* Plano */}
            <div className="bg-[#111111] rounded-3xl p-10 border border-green-500/30 max-w-lg mx-auto mb-12">
              <div className="text-green-400 text-sm font-bold uppercase tracking-wider mb-2">PLANO ÚNICO</div>
              <div className="text-5xl font-bold text-white mb-2">R$ 297</div>
              <div className="text-gray-400 text-sm mb-6">por mês • cancele quando quiser</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400">{'\u2713'}</span>
                  IA que qualifica e fecha vendas 24/7
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400">{'\u2713'}</span>
                  CRM integrado (Evolution API)
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400">{'\u2713'}</span>
                  Suporte técnico com SLA de 24h
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400">{'\u2713'}</span>
                  Setup em até 48h
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400">{'\u2713'}</span>
                  7 dias de garantia
                </li>
              </ul>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary-500 hover:bg-primary-600 text-black py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-primary-500/25"
              >
                QUERO MEU WHATSAPP COM IA {'\u2192'}
              </button>
              <p className="text-gray-500 text-sm mt-3">Pagamento seguro via AbacatePay</p>
            </div>

            {/* Order Bump */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 max-w-lg mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">OPCIONAL</span>
                <span className="text-gray-400 text-sm">Adicionar Especialista Técnico</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Quem tem IA precisa de suporte humano pra configurar. Especialista no WhatsApp com SLA 24h.
              </p>
              <p className="text-green-400 font-bold text-lg mb-4">+ R$ 250/mês</p>
              <button
                onClick={() => window.location.href = 'https://wa.me/' + PHONE + '?text=Quero+WhatsApp+com+IA+com+especialista'}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-bold transition-all border border-white/20"
              >
                QUERO COM ESPECIALISTA {'\u2192'}
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-8">
              Dúvidas? Fala com a gente no {' '}
              <a href={`https://wa.me/${PHONE}`} className="text-green-400 underline">WhatsApp</a>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}