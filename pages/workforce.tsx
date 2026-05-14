import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const benefits = [
  { icon: '🤖', title: 'Agentes especializados', desc: 'Cada agente cuida de uma tarefa: vendas, suporte, cobrança, onboarding. Especialização = resultado.' },
  { icon: '📞', title: 'WhatsApp, Instagram, Telegram', desc: 'Todos os canais em um só lugar. Seu time não precisa alternar entre apps.' },
  { icon: '🧠', title: 'IA que aprende com seu negócio', desc: 'Treinada com seus dados, sua voz, seu histórico. Não é genérica — é sua.' },
  { icon: '⚡', title: 'Resposta em <1 segundo', desc: 'Lead não espera. Seu cliente é atendido na hora, 24/7, sem fila.' },
  { icon: '📊', title: 'CRM integrado', desc: 'Pipedrive, Sticky, RD Station. Tudo sincronizado. Sem digitação, sem erro.' },
  { icon: '🔒', title: 'Segurança enterprise', desc: 'Seus dados criptografados. Compliance LGPD. Backup automático.' },
];

const useCases = [
  {
    industry: 'Clínicas e Consultórios',
    pain: 'Paciente manda mensagem às 23h, ninguém responde. Amanhã ele já marcou com o concorrente.',
    solution: 'IA agenda, confirma, reconfirma. Mostra convênios, tira dúvidas, prepara ficha pré-atendimento.',
    result: '3x mais consultas agendadas, 20h/semana economizadas',
  },
  {
    industry: 'Escritórios de Advocacia',
    pain: 'Cliente manda docs no WhatsApp, se perde, esquece. Você gasta horas organizando.',
    solution: 'IA recebe, organiza, classifica, anexa no processo. Envia checklist, cobra pendências.',
    result: '100% dos documentos organizados, 0 papel perdido',
  },
  {
    industry: 'E-commerce e Delivery',
    pain: 'Pedido chega, cliente quer rastreio, muda endereço, quer cancelar. Tudo no WhatsApp.',
    solution: 'IA acompanha pedido todo: confirmação, separação, envio, entrega. Upsell automático.',
    result: '3x mais pedidos, mesma equipe',
  },
  {
    industry: 'Imobiliárias e Corretores',
    pain: 'Lead frio, lead quente, lead sumiu. Ninguém sabe quem tá em que fase.',
    solution: 'IA qualifica, segmenta, envia imóveis, agenda visita. Integra com CRM.',
    result: '2x mais visitas agendadas, 5x mais conversão',
  },
];

const plans = [
  {
    name: 'Básico',
    price: 'R$ 297',
    desc: 'Pra quem tá começando e quer testar a IA',
    features: [
      '1 agente de IA',
      'Até 500 conversas/mês',
      'WhatsApp apenas',
      'CRM básico',
      'Suporte por email',
    ],
    cta: '/qualificacao',
    highlight: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 750',
    desc: 'O mais popular. Time em crescimento.',
    features: [
      '3 agentes de IA',
      'Até 2.000 conversas/mês',
      'WhatsApp + Instagram',
      'CRM completo',
      'Relatórios avançados',
      'Suporte prioritário',
    ],
    cta: '/qualificacao',
    highlight: true,
  },
  {
    name: 'Empresarial',
    price: 'R$ 2.500',
    desc: 'Para operações consolidadas.',
    features: [
      'Agentes ilimitados',
      'Conversas ilimitadas',
      'Todos os canais',
      'CRM + API',
      'Onboarding dedicado',
      'SLA 24h',
    ],
    cta: '/qualificacao',
    highlight: false,
  },
];

const faqs = [
  { q: 'Demora pra implementar?', a: '30 dias em média. A gente cuida de tudo: integração, treino da IA, testes. Você só aprovar.' },
  { q: 'Preciso de chip novo?', a: 'Não. Funciona no seu número atual. Pode ser desvio ou número específico.' },
  { q: 'Meus clientes vão saber que é IA?', a: 'Só se você quiser. A IA se apresenta como você mandar.' },
  { q: 'Posso cancelar?', a: 'Pode. Sem multa. Sem fidelidade. 7 dias de garantia.' },
  { q: 'Funciona pro meu negócio?', a: 'Se usa WhatsApp pra atender, funciona. Clínica, escritório, loja, delivery, serviço — todos.' },
];

export default function Workforce() {
  return (
    <>
      <Meta 
        title="Workforce — Sistema Britto"
        description="Seu exército de IA. Multi-agentes especializados que vendem, atendem e cobram 24/7."
        path="/workforce"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        
        {/* ===== HERO: CARTA DE VENDAS ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Workforce AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Seu exército de IA<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">pronto pra guerra</span>
            </h1>
            
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Não é mais um "chatbot". É um **time de agentes especializados** que trabalham 24/7:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {['Vendedor que não dorme', 'Suporte que não erra', 'Cobrador que não esquece', 'SDR que não desiste'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-black/60 rounded-xl p-4 border border-green-500/20">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              Cada agente cuida de uma tarefa. Juntos, eles escalam seu atendimento sem aumentar a equipe.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/qualificacao"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                QUERO MEU WORKFORCE →
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 glass-strong text-white px-8 py-5 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
              >
                Saber mais
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-6">
              7 dias de garantia. Sem fidelidade. Implementação em 30 dias.
            </p>
          </div>
        </section>

        {/* ===== O PROBLEMA ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Você perde dinheiro porque:
            </h2>
            <div className="space-y-4">
              {['Demora pra responder no WhatsApp', 'Esquece follow-up de lead quente', 'Não qualifica quem é cliente de verdade', 'Perde venda fora do horário comercial', 'Time sobrecarregado, cliente insatisfeito'].map((text, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-200 text-lg">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== A SOLUÇÃO ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                Funcionalidades
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Tudo que você precisa<br />
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">em um só lugar</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((f, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASOS DE USO ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Casos reais de uso
              </h2>
              <p className="text-gray-400 text-lg">
                Cada negócio tem sua dor. A gente tem o agente certo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, i) => (
                <div key={i} className="bg-black/60 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">{useCase.industry}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-red-400 text-sm font-semibold mb-2">DOR</p>
                      <p className="text-gray-300 text-sm">{useCase.pain}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-semibold mb-2">SOLUÇÃO</p>
                      <p className="text-gray-300 text-sm">{useCase.solution}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-green-400 font-bold">{useCase.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PLANOS ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Planos que escalam com você
              </h2>
              <p className="text-gray-400 text-lg">
                Comece pequeno. Cresça sem limite.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-8 border ${
                    plan.highlight
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 bg-black/60'
                  }`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                  <div className="text-3xl font-bold text-white mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-green-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.cta}
                    className={`block text-center py-3 rounded-full font-bold transition-all ${
                      plan.highlight
                        ? 'bg-green-500 hover:bg-green-600 text-black'
                        : 'glass-strong hover:bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    Começar agora
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Perguntas frequentes
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-black/60 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Pronto pra escalar?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              7 dias de garantia. Sem fidelidade. Implementação em 30 dias.
            </p>
            <Link
              href="/qualificacao"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              FAZER ORÇAMENTO →
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
