import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import PhoneInput from '../components/PhoneInput';
import { useRouter } from 'next/router';

interface PlanResult {
  id: string;
  name: string;
  price: number;
  tag: string;
  tagColor: string;
  features: string[];
  productId: string;
}

const PLANS: Record<string, PlanResult> = {
  essencial: {
    id: 'essencial',
    name: 'Essencial',
    price: 297,
    tag: 'Recomendado para você',
    tagColor: 'bg-white text-black',
    features: [
      'Atendente de IA 24/7 no WhatsApp',
      'Qualificação automática de leads',
      'Agendamento inteligente de consultas',
      'CRM básico com funil comercial',
      'Follow-up automático',
      'Suporte via WhatsApp',
    ],
    productId: 'whatsapp-ia-basico',
  },
  completo: {
    id: 'completo',
    name: 'Completo',
    price: 750,
    tag: 'Mais Popular',
    tagColor: 'bg-primary-500 text-black',
    features: [
      'Tudo do Essencial',
      'CRM completo com funil avançado',
      'Reativação de leads dormentes',
      'Multi-atendentes com IA assistida',
      'Integração Pipedrive/Sticky',
      'Relatórios de ROI',
      'Suporte prioritário',
    ],
    productId: 'crm-ia-completo',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 2500,
    tag: 'Empresarial',
    tagColor: 'bg-[#D4AF37] text-black',
    features: [
      'Tudo do Completo',
      'Dezenas de agentes especializados',
      'Finanças, Projetos, Marketing, Jurídico',
      'Engineering agents (Code, Review, Debug)',
      'Dashboard web completo',
      'Onboarding dedicado',
      'Suporte prioritário 24h',
    ],
    productId: 'evonexus-premium',
  },
};

// Combos com order bump
const COMBOS: Record<string, { productId: string; price: number }> = {
  essencial: { productId: 'whatsapp-ia-combo-consultoria', price: 547 },
  completo: { productId: 'crm-ia-completo-combo-consultoria', price: 1000 },
  premium: { productId: 'evonexus-premium-combo-consultoria', price: 2750 },
};

function calculatePlan(answers: Record<string, string>): string {
  const automationLevel = answers['p4'] || '';

  // Se escolheu nível direto na P4, usa isso
  if (automationLevel === 'basico') return 'essencial';
  if (automationLevel === 'completo') return 'completo';
  if (automationLevel === 'premium') return 'premium';
  
  // Fallback: se não tiver P4, usa essencial
  return 'essencial';
}

export default function Resultado() {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [orderBump, setOrderBump] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);

  useEffect(() => {
    const answersParam = router.query.answers as string;
    let answers: Record<string, string> = {};

    if (answersParam) {
      try {
        answers = JSON.parse(decodeURIComponent(answersParam));
      } catch {
        // ignore
      }
    } else if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_answers');
      if (stored) {
        try {
          answers = JSON.parse(stored);
        } catch {
          // ignore
        }
      }
    }

    // Recuperar dados do cliente do sessionStorage
    if (typeof window !== 'undefined') {
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try {
          setCustomerData(JSON.parse(storedCustomer));
        } catch {
          // ignore
        }
      }
    }

    const planId = calculatePlan(answers);
    setPlan(PLANS[planId] || PLANS.essencial);
    setLoading(false);
  }, [router.query]);

  const handleCheckout = async () => {
    // Se não tiver dados do cliente, pedir antes
    if (!customerData.email || !customerData.whatsapp) {
      setPendingCheckout(true);
      setShowDataModal(true);
      return;
    }
    
    await doCheckout();
  };

  const handleDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerData.email || !customerData.whatsapp) return;
    
    // Salvar no sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customerData));
    }
    
    setShowDataModal(false);
    await doCheckout();
  };

  const doCheckout = async () => {
    if (!plan) return;
    
    // Premium → WhatsApp direto (high ticket)
    if (plan.id === 'premium') {
      // Mensagem sem preço, conforme regra de copy
      const msg = encodeURIComponent(`Olá! Fiz a qualificação e quero conhecer o plano Premium. Nome: ${customerData.name}, Email: ${customerData.email}`);
      window.location.href = `https://wa.me/5511914088571?text=${msg}`;
      return;
    }

    // Essencial e Completo → Checkout AbacatePay
    try {
      const productId = orderBump ? COMBOS[plan.id]?.productId : plan.productId;
      
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId,
          orderBump,
          customer: customerData.email ? {
            email: customerData.email,
            name: customerData.name,
            cellphone: customerData.whatsapp,
          } : undefined,
        }),
      });
      const data = await res.json();
      console.log('[Checkout Response]', data);
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL');
      }
    } catch (err) {
      console.error('[Checkout Error]', err);
      const msg = encodeURIComponent(`Olá! Quero o plano ${plan.name} (R$${plan.price}/mês). Nome: ${customerData.name}, Email: ${customerData.email}`);
      window.location.href = `https://wa.me/5511914088571?text=${msg}`;
    }
  };

  if (loading || !plan) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-white">Analisando suas respostas...</p>
        </div>
      </div>
    );
  }

  const finalPrice = orderBump ? (COMBOS[plan.id]?.price || plan.price) : plan.price;

  return (
    <>
      <Meta 
        title={`Plano ${plan.name} recomendado — Sistema Britto`}
        description="Veja o plano ideal para sua empresa baseado nas suas respostas."
        path="/resultado"
      />

      {/* ===== MODAL CAPTURA DADOS (se não tiver) ===== */}
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
              
              <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>. Somente assuntos do seu interesse.</p>
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
              Plano recomendado para você:
            </h1>
          </div>

          {/* Plan Card */}
          <div className="bg-[#111111] rounded-3xl p-8 sm:p-10 border border-green-500/30 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">{plan.name}</h2>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${plan.tagColor}`}>
                {plan.tag}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-white text-lg">R$</span>
              <span className="text-6xl font-bold text-white">{finalPrice.toLocaleString('pt-BR')}</span>
              <span className="text-gray-400 text-xl">/mês</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
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
            Não configure IA sozinho. Tenha um especialista pra garantir que seu Docker não quebre e 
            sua API não saia do ar. <strong className="text-white">SLA 24h</strong>.
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
          <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="text-lg font-bold text-white mb-2">7 dias de garantia incondicional</h3>
            <p className="text-gray-400 text-sm">Se não gostar, devolvemos seu dinheiro. Sem perguntas.</p>
          </div>

          {/* Outros planos */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Quer ver outros planos?</p>
            <a href="/workforce#plano" className="text-green-400 hover:text-green-300 font-semibold">
              Ver todos os planos →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
