import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';

interface PlanResult {
  id: string;
  name: string;
  price: number;
  tag: string;
  tagColor: string;
  features: string[];
  ctaText: string;
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
    ctaText: 'Começar Agora — R$ 297/mês',
    productId: 'whatsapp-ia-basico',
  },
  completo: {
    id: 'completo',
    name: 'Completo',
    price: 750,
    tag: 'Mais Popular',
    tagColor: 'bg-green-500 text-black',
    features: [
      'Tudo do Essencial',
      'CRM completo com funil avançado',
      'Reativação de leads dormentes',
      'Multi-atendentes com IA assistida',
      'Integração Pipedrive/Sticky',
      'Relatórios de ROI',
      'Suporte prioritário',
    ],
    ctaText: 'Começar Agora — R$ 750/mês',
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
      '38 agentes especializados',
      'Finanças, Projetos, Marketing, Jurídico',
      'Engineering agents (Code, Review, Debug)',
      'Dashboard web completo',
      'Onboarding dedicado',
      'Suporte prioritário 24h',
    ],
    ctaText: 'Falar com Especialista',
    productId: 'evonexus-premium',
  },
};

function calculatePlan(answers: Record<string, string>): string {
  const leads = answers['p1'] || '';
  const ticket = answers['p2'] || '';
  const responseTime = answers['p3'] || '';
  const investment = answers['p4'] || '';

  if (investment === 'sim') return 'premium';
  if (ticket === '2000+' || leads === '1000+') return 'completo';
  if (ticket === '500-2000' || leads === '500-1000' || responseTime === 'muito-demorado') return 'completo';
  
  return 'essencial';
}

export default function Resultado() {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });

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
    if (!plan) return;
    
    // Premium → WhatsApp direto (high ticket)
    if (plan.id === 'premium') {
      const msg = encodeURIComponent(`Olá! Fiz a qualificação e quero conhecer o plano Premium (R$2.500/mês). Nome: ${customerData.name}, Email: ${customerData.email}`);
      window.location.href = `https://wa.me/5511914088571?text=${msg}`;
      return;
    }

    // Essencial e Completo → Checkout AbacatePay
    try {
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: plan.productId,
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
        const msg = encodeURIComponent(`Olá! Quero o plano ${plan.name} (R$${plan.price}/mês). Nome: ${customerData.name}, Email: ${customerData.email}`);
        window.location.href = `https://wa.me/5511914088571?text=${msg}`;
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

  return (
    <>
      <Meta 
        title={`Plano ${plan.name} recomendado — Sistema Britto`}
        description="Veja o plano ideal para sua empresa baseado nas suas respostas."
        path="/resultado"
      />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <div className="max-w-2xl mx-auto px-4 py-20">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
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
              <span className="text-6xl font-bold text-white">{plan.price.toLocaleString('pt-BR')}</span>
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

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-black py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              {plan.ctaText}
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
            <a href="/workforce#planos" className="text-green-400 hover:text-green-300 font-semibold">
              Ver todos os planos →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
