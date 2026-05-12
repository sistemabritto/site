import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const agents = [
  { name: 'Clawdia', domain: 'Operações', desc: 'Agenda, e-mails, tarefas, decisões' },
  { name: 'Flux', domain: 'Finanças', desc: 'Stripe, ERP, fluxo de caixa, relatórios' },
  { name: 'Atlas', domain: 'Projetos', desc: 'Linear, GitHub, sprints, métricas' },
  { name: 'Pulse', domain: 'Comunidade', desc: 'Discord, WhatsApp, sentimento' },
  { name: 'Pixel', domain: 'Redes Sociais', desc: 'Conteúdo, calendário, analytics' },
  { name: 'Sage', domain: 'Estratégia', desc: 'OKRs, roadmap, priorização' },
  { name: 'Nex', domain: 'Vendas', desc: 'Pipeline, propostas, qualificação' },
  { name: 'Mentor', domain: 'Cursos', desc: 'Trilhas de aprendizado, módulos' },
  { name: 'Mako', domain: 'Marketing', desc: 'Campanhas, SEO, marca, conteúdo' },
  { name: 'Aria', domain: 'RH / Pessoas', desc: 'Recrutamento, onboarding, desempenho' },
  { name: 'Zara', domain: 'Customer Success', desc: 'Triagem, escalação, saúde' },
  { name: 'Lex', domain: 'Jurídico', desc: 'Contratos, compliance, NDA, risco' },
  { name: 'Nova', domain: 'Produto', desc: 'Specs, roadmaps, métricas, pesquisa' },
  { name: 'Dex', domain: 'Dados / BI', desc: 'Análise, SQL, dashboards' },
  { name: 'Lumen', domain: 'Retenção de Aprendizado', desc: 'Repetição espaçada, quizzes' },
  { name: 'Kai', domain: 'Pessoal', desc: 'Saúde, hábitos, rotina' },
  { name: 'Oracle', domain: 'Conhecimento', desc: 'Docs do workspace, how-to, config' },
];

const integrations = ['Google Workspace', 'GitHub', 'Linear', 'Stripe', 'Omie', 'Asaas', 'Bling', 'Discord', 'Telegram', 'WhatsApp', 'Instagram', 'YouTube', 'LinkedIn', 'Notion', 'Obsidian', 'Fathom', 'Todoist'];

export default function EvoNexusPage() {
  return (
    <>
      <Head>
        <title>EvoNexus — Workforce de Negócio | Workflow API Studio</title>
        <meta name="description" content="Agentes autônomos de negócio via EvoNexus. Finanças, projetos, marketing, vendas, RH, jurídico — tudo automatizado com IA." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

  {/* Hero */}
  <section className="pt-32 pb-20 aurora-bg">
    <div className="absolute inset-0 bg-surface-950/90" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
        EvoNexus Business Layer
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 leading-tight font-bold">
        Um time de agentes IA<br />
        <span className="gold-text">operando seu negócio</span>
      </h1>
      <p className="text-neutral-200 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-medium">
        Finanças, projetos, comunidade, marketing, vendas, RH, jurídico — cada domínio com agentes especializados
        que executam rotinas diárias, geram relatórios e tomam decisões. Tudo orquestrado pelo EvoNexus.
      </p>
      
      {/* Ecossistema Image */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent z-10" />
        <img 
          src="/images/evo/ecossistema.webp" 
          alt="Ecossistema EvoNexus" 
          className="w-full max-w-4xl mx-auto rounded-2xl border border-gold-500/30 shadow-2xl shadow-gold-500/20"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20a%20workforce%20de%20negócio%20do%20EvoNexus%20no%20meu%20negócio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
              >
                Implementar no meu negócio
                <span>→</span>
              </a>
              <a
                href="https://docs.evolutionfoundation.com.br/evo-nexus/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-white/15"
              >
                Ver documentação ↗
              </a>
            </div>
          </div>
        </section>

  {/* Agentes */}
  <section className="py-20 bg-surface-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Agentes especializados</h2>
      <p className="text-neutral-200 text-lg mb-12 font-medium">Cada agente tem system prompt, memória persistente e skills específicas do domínio.</p>
      
      {/* Business Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-strong rounded-xl p-6 border border-green-500/30">
          <div className="text-green-400 text-3xl mb-3">⚡</div>
          <h3 className="text-white font-bold mb-2">+40% produtividade</h3>
          <p className="text-neutral-400 text-sm">Agentes cuidam do operacional, seu time foca no estratégico.</p>
        </div>
        <div className="glass-strong rounded-xl p-6 border border-blue-500/30">
          <div className="text-blue-400 text-3xl mb-3">📊</div>
          <h3 className="text-white font-bold mb-2">Decisão em tempo real</h3>
          <p className="text-neutral-400 text-sm">Relatórios automáticos, dashboards ao vivo, alertas proativos.</p>
        </div>
        <div className="glass-strong rounded-xl p-6 border border-purple-500/30">
          <div className="text-purple-400 text-3xl mb-3">💰</div>
          <h3 className="text-white font-bold mb-2">-60% custo operacional</h3>
          <p className="text-neutral-400 text-sm">Automação de tarefas repetitivas em todos os departamentos.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <div key={agent.name} className="glass-strong rounded-xl p-5 border border-gold-500/20 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold-500 font-heading font-bold text-lg">{agent.name}</span>
                    <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full font-semibold">{agent.domain}</span>
                  </div>
                  <p className="text-neutral-200 text-sm">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrações */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 font-bold">Integrações nativas</h2>
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

        {/* CTA Final */}
        <section className="py-20 bg-surface-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 font-bold">
              Pronto pra ter uma workforce de negócio?
            </h2>
            <p className="text-neutral-200 text-lg mb-8 font-medium">
              Instalamos, configuramos e ativamos seu EvoNexus em 48h. Sem contrato longo.
            </p>
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20a%20workforce%20de%20negócio%20do%20EvoNexus"
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
