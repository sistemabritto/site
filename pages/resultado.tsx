import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import PhoneInput from '../components/PhoneInput';
import { useRouter } from 'next/router';

const PHONE = '5511914088571';
const CHECKOUT_URL = 'https://pay.abacatepay.com/checkout/D3c0yX8Tg';

interface CustomerData {
  name: string;
  email: string;
  whatsapp: string;
}

export default function Resultado() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<CustomerData>({ name: '', email: '', whatsapp: '' });
  const [loading, setLoading] = useState(true);
  const [showDataModal, setShowDataModal] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);

  const [orderBump, setOrderBump] = useState(false);
  const basePrice = 297;
  const bumpPrice = 250;
  const finalPrice = orderBump ? basePrice + bumpPrice : basePrice;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try { setCustomerData(JSON.parse(storedCustomer)); } catch {}
      }
    }
    setLoading(false);
  }, []);

  const handleCheckout = () => {
    if (!customerData.email || !customerData.whatsapp) {
      setPendingCheckout(true);
      setShowDataModal(true);
      return;
    }
    doCheckout();
  };

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerData.email || !customerData.whatsapp) return;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customerData));
    }

    setShowDataModal(false);
    doCheckout();
  };

  const doCheckout = () => {
    const name = customerData.name || '';
    const email = customerData.email || '';
    const whatsapp = customerData.whatsapp || '';

    const url = new URL(CHECKOUT_URL);
    url.searchParams.set('customer', JSON.stringify({
      name,
      email,
      cellphone: whatsapp,
    }));

    window.location.href = url.toString();
  };

  const handleWhatsAppFallback = () => {
  const NL = '%0A';
  const msg = encodeURIComponent(
  `🟢 *Quero o WhatsApp + IA*${NL}${NL}` +
  `*Plano:* R$ ${finalPrice}/mês${NL}` +
  `*Especialista:* ${orderBump ? 'Sim' : 'Não'}${NL}${NL}` +
  `———${NL}` +
  `👤 ${customerData.name || '—'}${NL}` +
  `📧 ${customerData.email || '—'}${NL}` +
  `📱 ${customerData.whatsapp || '—'}`
  );
  window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-white">Analisando suas respostas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta 
      title="CRM WhatsApp + IA — Sistema Britto"
      description="Automação de WhatsApp com IA. CRM inteligente que vende 24/7. A partir de R$ 297/mês."
      path="/resultado"
      noIndex={true}
      />

      {/* ===== MODAL CAPTURA (se faltar dados) ===== */}
      {showDataModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
            <button 
              onClick={() => setShowDataModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >×</button>
            
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-2">Quase lá!</h3>
              <p className="text-gray-300 text-sm">Seus dados = checkout mais rápido. Sem repetir tudo.</p>
            </div>

            <form onSubmit={handleDataSubmit} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <PhoneInput
                  value={customerData.whatsapp}
                  onChange={(v) => setCustomerData({...customerData, whatsapp: v})}
                  accentColor="#22C55E"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!customerData.email || !customerData.whatsapp}
                className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUAR →
              </button>
              
              <p className="text-gray-500 text-xs text-center">
                Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>. Somente assuntos do seu interesse.
              </p>
            </form>
          </div>
        </div>
      )}
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <div className="max-w-2xl mx-auto px-4 py-20">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 border border-green-500/30 mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Seu plano ideal:
            </h1>
          </div>

          {/* Plan Card — Plano Único */}
          <div className="bg-[#111111] rounded-3xl p-8 sm:p-10 border border-green-500/30 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">CRM WhatsApp + IA</h2>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-primary-500 text-black">
                Plano Único
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-white text-lg">R$</span>
              <span className="text-6xl font-bold text-white">{finalPrice.toLocaleString('pt-BR')}</span>
              <span className="text-gray-400 text-xl">/mês</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">Cancele quando quiser. Sem fidelidade.</p>

            <ul className="space-y-4 mb-8">
              {[
                'Atendente de IA 24/7 no WhatsApp',
                'Qualificação automática de leads',
                'Agendamento inteligente',
                'CRM integrado com funil comercial',
                'Follow-up automático',
                'Setup em até 48h',
                'Suporte via WhatsApp',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400 text-xl mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* ORDER BUMP */}
            <div 
              className={`rounded-xl p-4 cursor-pointer transition-all border-2 mb-6 ${
                orderBump 
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37]' 
                  : 'bg-[#0a0a0a] border-white/10 hover:border-[#D4AF37]/50'
              }`}
              onClick={() => setOrderBump(!orderBump)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    orderBump 
                      ? 'bg-[#D4AF37] border-[#D4AF37]' 
                      : 'border-gray-500'
                  }`}>
                    {orderBump && <span className="text-black font-bold text-xs">✓</span>}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">+ Especialista Técnico no WhatsApp</span>
                    <span className="text-[#D4AF37] font-bold text-sm">R$ 250/mês</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    Não configure IA sozinho. Tenha um especialista pra garantir que tudo funcione.
                    <strong className="text-white"> SLA 24h</strong>.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs px-2 py-0.5 rounded-full font-semibold">
                      ⚡ Recomendado
                    </span>
                    <span className="text-gray-400 text-xs">
                      Quem tem IA precisa de suporte humano pra configurar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary-500 hover:bg-primary-600 text-black py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
            >
              {orderBump ? `ASSINAR COMBO — R$ ${finalPrice}/mês →` : `ASSINAR AGORA — R$ ${finalPrice}/mês →`}
            </button>

            <p className="text-gray-500 text-sm text-center mt-4">
              Sem fidelidade. Cancele quando quiser. 7 dias de garantia.
            </p>
          </div>

          {/* Garantia */}
          <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 text-center mb-8">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="text-lg font-bold text-white mb-2">7 dias de garantia incondicional</h3>
            <p className="text-gray-400 text-sm">Se não gostar, devolvemos seu dinheiro. Sem perguntas.</p>
          </div>

          {/* Fallback WhatsApp */}
          <div className="text-center">
            <button
              onClick={handleWhatsAppFallback}
              className="text-gray-500 hover:text-green-400 text-sm underline transition-colors"
            >
              Prefere falar com a gente primeiro? Chama no WhatsApp →
            </button>
          </div>

        </div>
      </main>
    </>
  );
}