import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🏗️',
    title: 'Arquitetura e Planejamento',
    desc: 'Especificação técnica, diagramas de sistema, tech decisions documentadas — agentes que planejam antes de codificar.',
  },
  {
    icon: '⚡',
    title: 'Code Review Automatizado',
    desc: 'Revisão de PRs com IA: segurança, performance, padrões, boas práticas. Comentários inline antes do merge.',
  },
  {
    icon: '🔍',
    title: 'Debug Inteligente',
    desc: 'Root cause analysis, profiling de performance, incident response — agentes que investigam como sênior.',
  },
  {
    icon: '🧪',
    title: 'Testes Automáticos',
    desc: 'Geração de testes unitários, de integração e E2E. Cobertura que evolui com o código.',
  },
  {
    icon: '🛡️',
    title: 'Segurança e Compliance',
    desc: 'Auditoria de código, scanning de vulnerabilidades, LGPD/GDPR — revisão contínua, não pontual.',
  },
  {
    icon: '🚀',
    title: 'DevOps e Deploy',
    desc: 'CI/CD, infra como código, rollback automático — agentes que mantêm sua stack rodando.',
  },
];

const workflow = [
  { phase: 'Discovery', icon: '🔎', desc: 'Entendimento do requisito e análise de impacto' },
  { phase: 'Planning', icon: '📋', desc: 'Specs técnicos e breakdown de tarefas' },
  { phase: 'Build', icon: '🔧', desc: 'Implementação com code review automatizado' },
  { phase: 'Verify', icon: '✅', desc: 'QA automatizado e security scan' },
  { phase: 'Deploy', icon: '🚀', desc: 'CI/CD com rollback automático' },
];

const benefits = [
  {
    label: 'Multi-model fallback',
    desc: 'Se um modelo falha, outro assume. Zero downtime no seu pipeline.',
    color: 'gold',
  },
  {
    label: 'Multi-provider',
    desc: 'OpenAI, Anthropic, Google, AWS — sem vendor lock-in.',
    color: 'gold',
  },
  {
    label: 'Token governance',
    desc: 'Orçamento por projeto, alertas de consumo, relatórios de custo.',
    color: 'gold',
  },
];

const integrations = [
  'Claude Code', 'GitHub', 'GitLab', 'VS Code', 'JetBrains', 'Linear', 'Jira',
  'Slack', 'Discord', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Vercel', 'CI/CD'
];

export default function ClaudeCodePage() {
  return (
    <>
      <Head>
        <title>Claude Code — Workforce de Engenharia | Workflow API Studio</title>
        <meta name="description" content="Agentes de IA para desenvolvimento de software. Code review, arquitetura, debug, testes e DevOps automatizados com Claude Code." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 aurora-bg">
          <div className="absolute inset-0 bg-surface-950/90" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
              Claude Code Integration
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 leading-tight font-bold">
              Engenharia de software<br />
              <span className="gold-text">turbinada por IA</span>
            </h1>
            <p className="text-neutral-200 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-medium">
              Code review, arquitetura, debugging, testes, segurança — um time de agentes autônomos que codifica,
              revisa e entrega features 24/7. Governança multi-agente. Zero retrabalho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20Claude%20Code%20no%20meu%20time%20de%20engenharia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
              >
                Implementar Claude Code →
              </a>
              <a
                href="https://docs.anthropic.com/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-white/15"
              >
                Ver docs do Claude Code ↗
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">O que os agentes fazem</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Engenharia de ponta a ponta — sem gargalo humano.</p>
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

        {/* Workflow */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Workflow de entrega</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Cada fase com agentes especializados.</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {workflow.map((step, i) => (
                <div key={step.phase} className="glass-strong rounded-xl p-4 border border-gold-500/20 text-center">
                  <span className="text-2xl mb-2 block">{step.icon}</span>
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-wider">Fase {i + 1}</span>
                  <h3 className="text-white font-bold text-sm mt-1">{step.phase}</h3>
                  <p className="text-neutral-300 text-xs mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Por que usar Claude Code</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Infra que escala com seu time.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div key={b.label} className="glass-strong rounded-2xl p-6 border border-gold-500/20">
                  <h3 className="text-gold-400 font-bold text-base mb-2">{b.label}</h3>
                  <p className="text-neutral-200 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Stack e integrações</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Conectado com as ferramentas que você já usa.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {integrations.map((name) => (
                <span key={name} className="glass-strong px-4 py-2 rounded-full text-neutral-200 text-sm font-medium border border-white/10">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 font-bold">
              Pronto pra ter uma workforce de engenharia?
            </h2>
            <p className="text-neutral-200 text-lg mb-8 font-medium">
              Implementamos Claude Code no seu repositório em 48h. Sem contrato longo.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20Claude%20Code%20no%20meu%20time"
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
