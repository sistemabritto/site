import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🔄',
    title: 'Auto-aprendizado contínuo',
    desc: 'Cria skills da experiência, melhora durante o uso, persiste conhecimento entre sessões.',
  },
  {
    icon: '🎯',
    title: 'Multi-provider REAL',
    desc: 'NVIDIA, OpenAI, Anthropic, Google, Ollama — troca de modelo por task, sem code changes.',
  },
  {
    icon: '📋',
    title: 'Kanban nativo',
    desc: 'Cada task é um agente. Skills em markdown, plugins em Python, execução paralela.',
  },
  {
    icon: '⚡',
    title: 'Runs anywhere',
    desc: 'Local, Docker, SSH, Vercel, GPU cluster. Serverless que custa quase zero quando idle.',
  },
  {
    icon: '🤖',
    title: 'Delega e paraleliza',
    desc: 'Spawn subagents isolados. Escreve scripts Python que chamam tools via RPC.',
  },
  {
    icon: '📅',
    title: 'Automações agendadas',
    desc: 'Cron scheduler built-in. Reports diários, backups, audits — tudo em linguagem natural.',
  },
];

const integrations = [
  'Telegram', 'Discord', 'Slack', 'WhatsApp', 'Signal', 'Email',
  'NVIDIA NIM', 'OpenRouter', 'OpenAI', 'Anthropic', 'Google', 'Ollama',
  'Docker', 'SSH', 'Vercel', 'Modal', 'Daytona', 'Singularity',
];

export default function HermesPage() {
  return (
    <>
      <Head>
        <title>Hermes Agent — Framework Aberto de IA | Workflow API Studio</title>
        <meta name="description" content="O framework de IA auto-aprendente. Multi-provider, kanban nativo, automações agendadas. Liberdade total de vendor lock-in." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

        {/* Hero com Banner */}
        <section className="relative pt-32 pb-20 bg-surface-950 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-surface-950 to-surface-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Banner do Hermes */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent z-10" />
              <img 
                src="/images/hermes/banner.png" 
                alt="Hermes Agent Banner" 
                className="w-full max-w-4xl mx-auto rounded-2xl"
              />
            </div>

            <span className="inline-block text-orange-400 text-sm font-bold uppercase tracking-wider mb-4 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
              By Nous Research
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 leading-tight font-bold">
              O framework de IA que
              <span className="gold-text block mt-2">aprende com você</span>
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-medium">
              Hermes é o único agente com built-in learning loop — cria skills da experiência, 
              melhora durante o uso, busca no próprio histórico e constrói modelo profundo de quem você é.
              <br />
              <span className="text-gray-200">Liberdade total. Sem vendor lock-in. Rode em qualquer lugar.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20o%20Hermes%20Agent%20no%20meu%20negócio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-orange-500/25"
              >
                Implementar Hermes
                <span>→</span>
              </a>
              <a
                href="https://hermes-agent.nousresearch.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-white/15"
              >
                Documentação ↗
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-widest mb-4 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
                Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 leading-tight font-bold">
                Por que Hermes é diferente
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="glass-strong rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/50 hover:bg-white/10 transition-all"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-white font-bold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrações */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-widest mb-4 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
              Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 leading-tight font-bold">
              Integra com tudo
            </h2>
            <p className="text-white text-lg mb-12 font-medium max-w-2xl mx-auto">
              Conecta com seus canais, seus providers, sua infra.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="glass-strong px-4 py-2 rounded-full text-gray-300 text-sm font-medium border border-white/10 hover:border-orange-500/30 transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 font-bold">
              Pronto pra ter liberdade total de IA?
            </h2>
            <p className="text-white text-lg mb-8 font-medium">
              Implementamos, configuramos e treinamos seu Hermes em 48h.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20o%20Hermes%20Agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-orange-500/25"
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
