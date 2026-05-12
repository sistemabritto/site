import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '📋',
    title: 'Kanban Nativo',
    desc: 'Cada task é um agente. Board compartilhado, histórico completo, zero setup — só rodar.',
  },
  {
    icon: '🔄',
    title: 'Multi-Provider Real',
    desc: 'NVIDIA, OpenAI, Anthropic, Google, Ollama — troca de modelo por task, sem vendor lock-in.',
  },
  {
    icon: '⚡',
    title: 'Execução Autônoma',
    desc: 'Agentes rodam em background, entregam resultado, atualizam o board. Você só revisa.',
  },
  {
    icon: '🔌',
    title: 'Plugins e Skills',
    desc: 'Skills em markdown, plugins em Python. Estenda com terminal, browser, file, kanban, cron.',
  },
  {
    icon: '🛡️',
    title: 'Governança Completa',
    desc: 'Logs em JSONL, métricas de tokens, custo por agente, auditoria de decisões.',
  },
  {
    icon: '🚀',
    title: 'Deploy Simples',
    desc: 'Docker Swarm, Vercel, local — sua infra, suas regras. Sem SaaS, sem lock-in.',
  },
];

const architecture = [
  { layer: 'Core', desc: 'Hermes Agent — orchestrator em Python com tool calling estruturado' },
  { layer: 'Tools', desc: 'terminal, browser, file, kanban, cron, search, vision, delegate' },
  { layer: 'Memory', desc: 'SQLite + skills em markdown — contexto persistente entre sessões' },
  { layer: 'UI', desc: 'Dashboard React + Telegram bot — controle total na mão' },
  { layer: 'Scheduler', desc: 'Cron jobs, triggers, webhooks — automação sob demanda' },
];

const useCases = [
  {
    title: 'Devs que querem coding agent',
    desc: 'Code review, debug, testes, arquitetura — seu par de programação 24/7.',
  },
  {
    title: 'Empresas que querem automação',
    desc: 'WhatsApp, CRM, blog, dashboards — automações que rodam sozinhas.',
  },
  {
    title: 'Researchers que querem controle',
    desc: 'Multi-model, multi-provider, logs completos — reprodutibilidade total.',
  },
];

const integrations = [
  'NVIDIA NIM', 'OpenAI', 'Anthropic', 'Google AI', 'Ollama', 'vLLM',
  'Telegram', 'Discord', 'GitHub', 'GitLab', 'Linear', 'Notion',
  'Docker', 'SQLite', 'PostgreSQL', 'Redis', 'Valkey', 'S3', 'GCS'
];

export default function HermesPage() {
  return (
    <>
      <Head>
        <title>H Hermes Agent — Framework Aberto | Workflow API Studio</title>
        <meta name="description" content="Hermes Agent: framework aberto para agentes autônomos. Kanban, multi-provider (NVIDIA, OpenAI, Anthropic), plugins, skills em markdown." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 aurora-bg">
          <div className="absolute inset-0 bg-surface-950/90" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
              Hermes Agent Framework
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 leading-tight font-bold">
              Framework aberto pra<br />
              <span className="gold-text">liberdade total</span>
            </h1>
            <p className="text-neutral-200 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-medium">
              Enquanto o EvoNexus usa Claude Code como motor, o Hermes é seu framework curinga —
              multi-provider real (NVIDIA, OpenAI, Anthropic, Google), kanban nativo, skills em markdown.
              Ideal pra quem quer controle total, sem vendor lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20Hermes%20Agent%20no%20meu%20projeto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
              >
                Começar com Hermes →
              </a>
              <a
                href="https://hermes-agent.nousresearch.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-white/15"
              >
                Ver docs ↗
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Por que Hermes?</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Feito por devs, pra devs. Sem frescura.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="glass-strong rounded-2xl p-6 border border-gold-500/20 hover:bg-white/10 transition-all">
                  <span className="text-3xl mb-3 block">{f.icon}</span>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-neutral-200 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Arquitetura</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Simples, modular, escalável.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {architecture.map((item, i) => (
                <div key={item.layer} className="glass-strong rounded-xl p-4 border border-gold-500/20">
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-wider">Camada {i + 1}</span>
                  <h3 className="text-white font-bold text-base mt-1">{item.layer}</h3>
                  <p className="text-neutral-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Quem usa Hermes</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">De dev solo a enterprise.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((uc) => (
                <div key={uc.title} className="glass-strong rounded-2xl p-6 border border-gold-500/20">
                  <h3 className="text-gold-400 font-bold text-base mb-2">{uc.title}</h3>
                  <p className="text-neutral-200 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Stack e integrações</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Conectado com o que importa.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {integrations.map((name) => (
                <span key={name} className="glass-strong px-4 py-2 rounded-full text-neutral-200 text-sm font-medium border border-white/10">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">EvoNexus vs Hermes</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Dois caminhos, mesmo objetivo.</p>
            <div className="overflow-x-auto">
              <table className="w-full glass-strong rounded-2xl border border-gold-500/20">
                <thead>
                  <tr className="border-b border-gold-500/20">
                    <th className="text-left p-4 text-white font-bold">Característica</th>
                    <th className="text-left p-4 text-gold-400 font-bold">EvoNexus</th>
                    <th className="text-left p-4 text-gold-400 font-bold">Hermes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-neutral-200">Motor</td>
                    <td className="p-4 text-neutral-300">Claude Code + OpenCode</td>
                    <td className="p-4 text-neutral-300">Hermes Agent</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-neutral-200">Providers</td>
                    <td className="p-4 text-neutral-300">OpenClaude (6 backends)</td>
                    <td className="p-4 text-neutral-300">NVIDIA, OpenAI, Anthropic, Google, Ollama</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-neutral-200">Interface</td>
                    <td className="p-4 text-neutral-300">Terminal + Dashboard</td>
                    <td className="p-4 text-neutral-300">Kanban + Telegram</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-neutral-200">Foco</td>
                    <td className="p-4 text-neutral-300">38 agentes especializados</td>
                    <td className="p-4 text-neutral-300">Liberdade total, sem lock-in</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-neutral-200">Deploy</td>
                    <td className="p-4 text-neutral-300">Local + Dashboard</td>
                    <td className="p-4 text-neutral-300">Docker Swarm, Vercel, local</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 font-bold">
              Pronto pra ter liberdade total?
            </h2>
            <p className="text-neutral-200 text-lg mb-8 font-medium">
              Hermes é open-source. Implemente, modifique, estenda. Sem contrato, sem lock-in.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20Hermes%20Agent%20no%20meu%20projeto"
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
