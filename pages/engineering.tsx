import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const capabilities = [
  {
    icon: '🏗️',
    title: 'Arquitetura e Planejamento',
    desc: 'Specs técnicos, reviews de tech decisions, diagramas de sistema e planejamento de sprints — tudo gerado por agentes com visão de conjunto.',
  },
  {
    icon: '⚡',
    title: 'Implementação Automatizada',
    desc: 'Código, testes e deploy em pipeline contínuo. Agentes implementam features, corrigem bugs e submetem PRs sem intervenção humana.',
  },
  {
    icon: '🔍',
    title: 'Debug e Otimização',
    desc: 'Profiling de performance, root cause analysis, incident response — agentes identificam e resolvem problemas antes de virar crise.',
  },
  {
    icon: '🛡️',
    title: 'Segurança e Compliance',
    desc: 'Auditoria de código, scanning de vulnerabilidades, NDA automatizado, conformidade LGPD/GDPR — revisão contínua, não pontual.',
  },
  {
    icon: '🎨',
    title: 'Design e Prototipação',
    desc: 'UX research, UI components, protótipos interativos — agentes de design que transformam requisitos em interfaces funcionais.',
  },
  {
    icon: '🚀',
    title: 'DevOps e Infraestrutura',
    desc: 'CI/CD, infra como código, monitoramento, auto-scaling — agentes que mantêm sua stack rodando sem pager-duty.',
  },
];

const workflow = [
  {
    phase: 'Discovery',
    icon: '🔎',
    desc: 'Entendimento do requisito, análise de impacto, identificação de dependências.',
  },
  {
    phase: 'Planning',
    icon: '📋',
    desc: 'Specs técnicos, breakdown de tarefas, estimativa de esforço e riscos.',
  },
  {
    phase: 'Build',
    icon: '🔧',
    desc: 'Implementação, code review automatizado, testes unitários e de integração.',
  },
  {
    phase: 'Verify',
    icon: '✅',
    desc: 'QA automatizado, security scan, performance check, aceite do produto.',
  },
  {
    phase: 'Deploy',
    icon: '🚀',
    desc: 'CI/CD, rollback automático, monitoramento pós-deploy, retro.',
  },
];

const tools = ['Claude Code', 'GitHub Copilot', 'Hermes Agent', 'CI/CD (GitHub Actions, GitLab)', 'Docker / Swarm', 'Vercel', 'AWS / GCP / Azure', 'Terraform / Pulumi', 'PostgreSQL / SQLite', 'Redis / Valkey', 'Prometheus / Grafana', 'Sentry / Datadog'];

export default function EngineeringPage() {
  return (
    <>
      <Head>
        <title>Workforce de Engenharia | Workflow API Studio</title>
        <meta name="description" content="Agentes de IA para desenvolvimento de software. Arquitetura, code review, debugging, testes, segurança e DevOps automatizados." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 aurora-bg">
          <div className="absolute inset-0 bg-surface-950/90" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
              Engineering Workforce
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 leading-tight font-bold">
              Um time de IA que<br />
              <span className="gold-text">codifica, revisa e entrega</span>
            </h1>
            <p className="text-neutral-200 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-medium">
              Arquitetura, code review, debugging, testes, segurança, DevOps — agentes autônomos que funcionam como um
              time de engenharia completo. Governança por consenso multi-agente. Zero retrabalho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20a%20workforce%20de%20engenharia%20—%20vi%20no%20site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
              >
                Montar minha workforce →
              </a>
            </div>
          </div>
        </section>

        {/* Capacidades */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">O que a workforce faz</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Engenharia de ponta a ponta — sem gargalo humano.</p>
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

        {/* Workflow */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Workflow de entrega</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Cada fase com agentes especializados. Governança por consenso.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {workflow.map((step, i) => (
                <div key={step.phase} className="glass-strong rounded-2xl p-5 border border-gold-500/20 relative">
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-wider">Fase {i + 1}</span>
                  <span className="text-2xl my-2 block">{step.icon}</span>
                  <h3 className="text-white font-bold text-base mb-1">{step.phase}</h3>
                  <p className="text-neutral-200 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ferramentas */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Stack e integrações</h2>
            <p className="text-neutral-200 text-lg mb-12 font-medium">Conectado com as ferramentas que seu time já usa.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {tools.map((name) => (
                <span key={name} className="glass-strong px-4 py-2 rounded-full text-neutral-200 text-sm font-medium border border-white/10">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Tech pillars */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 text-center">
                <span className="text-3xl mb-3 block">🔄</span>
                <h3 className="text-white font-bold text-base mb-2">Fallback de múltiplos modelos</h3>
                <p className="text-neutral-200 text-sm">Modelos diferentes para tasks diferentes. Sem ponto único de falha.</p>
              </div>
              <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 text-center">
                <span className="text-3xl mb-3 block">🌐</span>
                <h3 className="text-white font-bold text-base mb-2">Multi-provider</h3>
                <p className="text-neutral-200 text-sm">OpenAI, Anthropic, Google, AWS — escolha por custo, velocidade ou capacidade.</p>
              </div>
              <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 text-center">
                <span className="text-3xl mb-3 block">📊</span>
                <h3 className="text-white font-bold text-base mb-2">Gestão de tokens por projeto</h3>
                <p className="text-neutral-200 text-sm">Orçamento e consumo atrelados a cada sprint. Alertas e limites configuráveis.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 font-bold">
              Pronto pra ter uma workforce de engenharia?
            </h2>
            <p className="text-neutral-200 text-lg mb-8 font-medium">
              Montamos, configuramos e ativamos sua workforce em 48h. Sem contrato longo.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20montar%20uma%20workforce%20de%20engenharia%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
            >
              Conversar com especialista →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
