import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const capabilities = [
  {
    icon: '🎯',
    title: 'Qualificação automática de leads',
    desc: 'O agente identifica intenção, perfil e estágio do funil — e classifica cada contato sem intervenção humana.',
  },
  {
    icon: '📅',
    title: 'Agendamento 24/7',
    desc: 'Consulta, serviço, reunião — o cliente agenda direto no WhatsApp. Sem telefone, sem espera, sem erro humano.',
  },
  {
    icon: '💰',
    title: 'Funil comercial completo',
    desc: 'Do primeiro contato ao fechamento. Propostas, follow-ups, objeções — tudo automatizado com inteligência.',
  },
  {
    icon: '🔄',
    title: 'Reativação de leads dormentes',
    desc: 'IA identifica leads parados e inicia abordagens personalizadas para trazer de volta ao funil.',
  },
  {
    icon: '📊',
    title: 'CRM integrado',
    desc: 'Pipedrive, Sticky, HubSpot — cada conversa alimenta o CRM automaticamente. Zero digitação manual.',
  },
  {
    icon: '👥',
    title: 'Multi-atendentes com IA assistida',
    desc: 'Humano e IA trabalham juntos. IA tria, qualifica e escala; humano fecha e personaliza.',
  },
];

const industries = [
  { name: 'Clínicas e Consultórios', use: 'Agendamento, confirmação, reagendamento automático' },
  { name: 'Delivery e Restaurantes', use: 'Pedido, cardápio, acompanhamento de entrega' },
  { name: 'Escritórios de Serviço', use: 'Qualificação de leads, propostas, follow-up' },
  { name: 'Auto Escolas', use: 'Matrícula, agendamento de aulas, renovação' },
  { name: 'Imobiliárias', use: 'Qualificação de compradores, agendamento de visitas' },
  { name: 'E-commerce', use: 'Status de pedido, troca, devolução, suporte' },
];

const steps = [
  { num: '01', title: 'Diagnóstico', desc: 'Analisamos seu fluxo comercial e identificamos onde a IA gera mais impacto.' },
  { num: '02', title: 'Configuração', desc: 'Conectamos Evolution API, CRM, calendário e ferramentas em 48h.' },
  { num: '03', title: 'Treinamento', desc: 'Aprendemos seu tom, suas ofertas, suas objeções — e configuramos o agente.' },
  { num: '04', title: 'Ativação', desc: 'Agente no ar. Você acompanha tudo pelo dashboard em tempo real.' },
];

export default function WhatsAppPage() {
  return (
    <>
      <Head>
        <title>WhatsApp Business + CRM + IA | Workflow API Studio</title>
        <meta name="description" content="Transforme seu WhatsApp em central comercial com IA. Qualificação de leads, agendamento automático, funil de vendas e CRM integrado." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 aurora-bg">
          <div className="absolute inset-0 bg-surface-950/90" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
              WhatsApp Business + CRM + IA
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 leading-tight font-bold">
              Seu WhatsApp como<br />
              <span className="gold-text">central comercial</span>
            </h1>
            <p className="text-neutral-200 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-medium">
              Agente de IA que qualifica leads, agenda consultas, fecha vendas e alimenta seu CRM — tudo dentro do WhatsApp.
              Sem telefone, sem espera, sem lead perdido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Quero%20transformar%20meu%20WhatsApp%20em%20central%20comercial%20com%20IA%20—%20vi%20no%20site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
              >
                Ativar meu WhatsApp com IA →
              </a>
            </div>
          </div>
        </section>

        {/* Capacidades */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">O que o agente faz</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Automação inteligente — não robô genérico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap) => (
                <div key={cap.title} className="glass-strong rounded-2xl p-6 border border-gold-500/20 hover:bg-white/10 transition-all">
                  <span className="text-3xl mb-3 block">{cap.icon}</span>
                  <h3 className="text-white font-bold text-lg mb-2">{cap.title}</h3>
                  <p className="text-neutral-200 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Segmentos */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Por segmento</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Cada negócio tem um fluxo. O agente se adapta ao seu.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((ind) => (
                <div key={ind.name} className="glass-strong rounded-xl p-5 border border-white/10 hover:border-gold-500/30 transition-all">
                  <h4 className="text-white font-bold text-base mb-1">{ind.name}</h4>
                  <p className="text-neutral-300 text-sm">{ind.use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Como funciona</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Do diagnóstico à ativação em 48h.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="glass-strong rounded-2xl p-6 border border-gold-500/20">
                  <span className="text-gold-500 font-heading font-bold text-4xl mb-3 block">{step.num}</span>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-neutral-200 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech highlights */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 text-center">
                <span className="text-3xl mb-3 block">🔄</span>
                <h3 className="text-white font-bold text-base mb-2">Fallback de múltiplos modelos</h3>
                <p className="text-neutral-200 text-sm">Se um modelo cai, outro assume. Zero downtime no atendimento.</p>
              </div>
              <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 text-center">
                <span className="text-3xl mb-3 block">🌐</span>
                <h3 className="text-white font-bold text-base mb-2">Multi-provider</h3>
                <p className="text-neutral-200 text-sm">OpenAI, Anthropic, Google, AWS — sem lock-in, sem dependência.</p>
              </div>
              <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 text-center">
                <span className="text-3xl mb-3 block">📊</span>
                <h3 className="text-white font-bold text-base mb-2">Gestão de tokens</h3>
                <p className="text-neutral-200 text-sm">Controle de custo e consumo por agente, em tempo real.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 font-bold">
              Pronto pra transformar seu WhatsApp?
            </h2>
            <p className="text-neutral-200 text-lg mb-8 font-medium">
              Em 48h seu WhatsApp vira uma central comercial com IA. Sem contrato longo.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20ativar%20meu%20WhatsApp%20com%20IA%20e%20CRM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
            >
              Falar com especialista →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
