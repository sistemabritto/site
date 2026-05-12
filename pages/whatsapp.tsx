import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🎯',
    title: 'Qualificação automática de leads',
    desc: 'IA que faz 7 perguntas-chave, classifica por interesse e envia pro CRM já segmentado.',
  },
  {
    icon: '📅',
    title: 'Agendamento 24/7',
    desc: 'Seu cliente marca, remarca e cancela sozinho. Sem erro humano, sem retrabalho.',
  },
  {
    icon: '🔄',
    title: 'Reativação de leads dormentes',
    desc: 'Recupera leads parados há semanas com mensagens personalizadas e ofertas certas.',
  },
  {
    icon: '📊',
    title: 'CRM integrado nativamente',
    desc: 'Pipedrive, Sticky, RD Station — tudo sincronizado em tempo real, sem digitação.',
  },
  {
    icon: '👥',
    title: 'Multi-atendentes com IA assistida',
    desc: 'Seu time humano assume quando precisa, com histórico completo e sugestões de resposta.',
  },
  {
    icon: '⚡',
    title: 'Resposta em <1 segundo',
    desc: 'Lead não espera. Seu WhatsApp responde na hora, a qualquer horário.',
  },
];

const cases = [
  {
    name: 'Clínica OdontoLife',
    result: '3x mais consultas agendadas',
    desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma automaticamente.',
  },
  {
    name: 'Studio Pilates',
    result: '20h/semana economizadas',
    desc: 'Antes 3h/dia no WhatsApp marcando e remarcando. Hoje a IA faz tudo sozinha.',
  },
  {
    name: 'Delivery Pizzaria',
    result: '3x mais pedidos, mesma equipe',
    desc: 'Do pedido ao delivery, tudo automático. Cliente elogia a velocidade.',
  },
];

export default function WhatsApp() {
  return (
    <>
      <Head>
        <title>WhatsApp Business + IA | Workflow API Studio</title>
        <meta
          name="description"
          content="Seu WhatsApp como central comercial. IA que qualifica, agenda, vende e reativa leads — 24/7, integrado ao seu CRM."
        />
      </Head>
      <Navbar />
      
      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-surface-950 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-surface-950 to-surface-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {/* Badge Evolution API */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <img 
                  src="https://raw.githubusercontent.com/EvolutionAPI/evolution-api/main/public/hover-evolution.png" 
                  alt="Evolution API" 
                  className="w-6 h-6"
                />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                  Powered by Evolution API
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white font-bold mb-6 leading-tight">
                Seu WhatsApp como
                <span className="gold-text block mt-2">central comercial</span>
              </h1>
              
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-medium mt-4">
                IA que qualifica leads, agenda consultas, fecha vendas e reativa clientes — 
                24/7, integrado ao seu CRM. Sem digitação manual, sem lead perdido.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-strong rounded-2xl p-6 text-center bg-surface-900/90 backdrop-blur-xl border-green-500/20">
                <div className="text-4xl font-heading font-bold text-green-400 mb-2">24/7</div>
                <div className="text-neutral-400 text-sm">Atendimento automático</div>
              </div>
              <div className="glass-strong rounded-2xl p-6 text-center bg-surface-900/90 backdrop-blur-xl border-green-500/20">
                <div className="text-4xl font-heading font-bold text-green-400 mb-2">&lt;1s</div>
                <div className="text-neutral-400 text-sm">Tempo de resposta</div>
              </div>
              <div className="glass-strong rounded-2xl p-6 text-center bg-surface-900/90 backdrop-blur-xl border-green-500/20">
                <div className="text-4xl font-heading font-bold text-green-400 mb-2">3x</div>
                <div className="text-neutral-400 text-sm">Mais conversões</div>
              </div>
            </div>
          </div>
        </section>

        {/* Evolution API Partnership */}
        <section className="py-16 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-strong rounded-3xl p-8 border border-green-500/30 bg-surface-900/90 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-heading text-white font-bold mb-4">
                    Embaixador e Contributor da Evolution API
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    Somos parceiros oficiais da <strong>Evolution API</strong> — a plataforma open-source 
                    que conecta WhatsApp, automação e IA em um só lugar. Como embaixadores, temos 
                    acesso antecipado a features, suporte prioritário e capacidade de implementar 
                    soluções customizadas para seu negócio.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-neutral-300 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Implementação oficial Evolution API</span>
                    </li>
                    <li className="flex items-start gap-2 text-neutral-300 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Suporte direto dos desenvolvedores</span>
                    </li>
                    <li className="flex items-start gap-2 text-neutral-300 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Features customizadas para seu caso</span>
                    </li>
                  </ul>
                  <p className="text-neutral-500 text-xs mt-4">
                    Integrações nativas: Typebot, Chatwoot, Dify, OpenAI, RabbitMQ, Apache Kafka, 
                    Amazon SQS, Socket.io, Amazon S3 / MinIO
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://raw.githubusercontent.com/EvolutionAPI/evolution-api/main/public/hover-evolution.png" 
                    alt="Evolution API Logo" 
                    className="w-64 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-32 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                Funcionalidades
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
                Tudo que seu WhatsApp
                <span className="gold-text block mt-2">precisava ter</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="glass-strong rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 bg-surface-900/90 backdrop-blur-xl"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-heading text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-20 sm:py-32 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                Cases
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
                Resultados reais
                <span className="gold-text block mt-2">em números</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="glass-strong rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 bg-surface-900/90 backdrop-blur-xl"
                >
                  <div className="text-green-400 text-3xl font-heading font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white font-bold mb-6">
              Pronto para transformar
              <span className="gold-text"> seu WhatsApp?</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              Implementamos sua central comercial com IA em até 48h.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20WhatsApp%20com%20IA%20na%20minha%20empresa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-1"
            >
              Falar com especialista
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
