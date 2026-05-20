import Meta from '../components/Meta';
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
];

const integrations = [
  'Google Workspace', 'GitHub', 'Linear', 'Stripe', 'Omie', 'Asaas',
  'Bling', 'Discord', 'Telegram', 'WhatsApp', 'Instagram', 'LinkedIn',
  'Notion', 'Obsidian', 'Fathom', 'Todoist'
];

export default function Workforce() {
  return (
    <>
      <Meta
        title="Workforce de IA — Sistema Britto"
        description="Dezenas de agentes de IA operando 24/7. Ou framework livre pra construir os seus."
        path="/workforce"
      />

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Força de trabalho digital</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sua empresa no<br />
              <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">piloto automático</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Dezenas de agentes de IA. Cada um com uma função. Operação 24/7 sem você levantar um dedo.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Finanças, projetos, marketing, vendas, RH, jurídico — cada área com agentes especializados que executam, geram relatórios e tomam decisões. Tudo orquestrado. Tudo rodando.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/qualificar-workforce" className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
                QUERO MEU BRAÇO →
              </a>
              <a href="/qualificar-infra" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                AINDA NÃO SEI O QUE PRECISO →
              </a>
            </div>
          </div>
        </section>

        {/* ===== AGENTES ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Quem trabalha pra você</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Cada agente com função, tom de voz e gatilho específico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/50 transition-all">
                  <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">{agent.domain}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{agent.name}</h3>
                  <p className="text-gray-400 text-sm">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Como funciona</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Qualificar', desc: 'Você conta o que precisa. A gente mapeia os gargalos.' },
                { step: '02', title: 'Montar Stack', desc: 'Escolhe os agentes. Configura integrações. Personaliza voz.' },
                { step: '03', title: 'Ligar', desc: 'Deploy em 48h. Agentes começam a operar imediatamente.' },
                { step: '04', title: 'Monitorar', desc: 'Dashboard em tempo real. Ajuste fino semanal. Evolução contínua.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-purple-500/30 font-mono mb-4">{item.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">O que você leva</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '🎯', title: 'Multi-provider REAL', desc: 'NVIDIA, OpenAI, Anthropic, Google, Ollama — troca de modelo por task, sem code changes.' },
                { icon: '📋', title: 'Kanban nativo', desc: 'Cada task é um agente. Skills em markdown, plugins em Python, execução paralela.' },
                { icon: '⚡', title: 'Self-healing', desc: 'Se um agente quebra, ele se recupera sozinho. Sem intervenção humana.' },
                { icon: '🤖', title: 'Delega e paraleliza', desc: 'Spawn subagents isolados. Escreve scripts Python que chamam tools via RPC.' },
                { icon: '📅', title: 'Automações agendadas', desc: 'Cron scheduler built-in. Reports diários, backups, audits — tudo em linguagem natural.' },
                { icon: '🔒', title: 'Sem lock-in', desc: 'Framework open-source. Controle total da stack. Rode local, Docker, ou nuvem.' },
              ].map((f, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INTEGRAÇÕES ===== */}
        <section className="py-16 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Integra com tudo</h2>
            <p className="text-gray-400 mb-8">Seu stack atual, conectado:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((tech, i) => (
                <span key={i} className="bg-[#111111] border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Resultado real</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Antes e depois de ter braço de IA.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Clínica de Odontologia', before: '400 leads/mês perdendo 60% por falta de follow-up. 1 recepcionista sobrecarregada.', after: 'IA qualifica, agenda e reconfirma 24/7.', result: '1.200 leads/mês • 3x mais consultas' },
                { name: 'Estúdio de Pilates', before: '3h/dia no WhatsApp marcando e remarcando aulas. Instrutor virava atendente.', after: 'IA faz tudo sozinha. Aluno marca, remarca, cancela sem interação humana.', result: '20h/semana economizadas' },
                { name: 'Delivery', before: 'Pedidos chegavam no WhatsApp e sumiam. Cliente ligava reclamando. Equipe no limite.', after: 'Do pedido ao delivery, tudo automático via IA. Cliente recebe atualização em tempo real.', result: '3x mais pedidos • NPS subiu 40pts' },
              ].map((c, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Antes</div>
                  <p className="text-gray-300 text-sm mb-4">{c.before}</p>
                  <div className="text-xs text-purple-400 uppercase tracking-wider mb-2 font-semibold">Depois</div>
                  <p className="text-gray-200 text-sm mb-4">{c.after}</p>
                  <div className="border-t border-purple-500/20 pt-3 mt-2">
                    <div className="text-purple-400 text-lg font-bold">{c.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Chega de fazer tudo no braço.</h2>
            <p className="text-gray-300 text-lg mb-8">Dezenas de agentes. Setup em 48h. Resultado em 7 dias.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/qualificar-workforce" className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
                QUERO MEU BRAÇO →
              </a>
              <a href="/qualificar-infra" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                AINDA NÃO SEI O QUE PRECISO →
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
