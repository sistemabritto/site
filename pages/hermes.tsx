import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  { icon: '🔄', title: 'Auto-aprendizado contínuo', desc: 'Cria skills da experiência, melhora durante o uso, persiste conhecimento entre sessões.' },
  { icon: '🎯', title: 'Multi-provider REAL', desc: 'NVIDIA, OpenAI, Anthropic, Google, Ollama — troca de modelo por task, sem code changes.' },
  { icon: '📋', title: 'Kanban nativo', desc: 'Cada task é um agente. Skills em markdown, plugins em Python, execução paralela.' },
  { icon: '⚡', title: 'Runs anywhere', desc: 'Local, Docker, SSH, Vercel, GPU cluster. Serverless que custa quase zero quando idle.' },
  { icon: '🤖', title: 'Delega e paraleliza', desc: 'Spawn subagents isolados. Escreve scripts Python que chamam tools via RPC.' },
  { icon: '📅', title: 'Automações agendadas', desc: 'Cron scheduler built-in. Reports diários, backups, audits — tudo em linguagem natural.' },
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
        <title>Hermes Agent — Framework Aberto de IA | Sistema Britto</title>
        <meta name="description" content="O framework de IA auto-aprendente. Multi-provider, kanban nativo, automações agendadas. Liberdade total de vendor lock-in." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />

        {/* Hero com Banner */}
        <section className="relative pt-32 pb-20 bg-surface-950 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-surface-950 to-surface-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="inline-flex items-center justify-center gap-2 bg-black/80 text-white border border-white/20 hover:border-orange-500/50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-black/90"
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
                  className="bg-black/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/50 hover:bg-black/90 transition-all"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-white font-bold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard / Mission Control */}
        <section className="py-20 bg-surface-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-widest mb-4 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
                Mission Control
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 leading-tight font-bold">
                Kanban + Dashboard
              </h2>
              <p className="text-white text-lg max-w-2xl mx-auto font-medium">
                Cada task é um agente. Cada agente tem skills, memória e histórico. 
                Tudo visível, tudo rastreável.
              </p>
            </div>
            
            {/* Sidebar + Kanban Layout */}
            <div className="flex flex-col xl:flex-row gap-4 max-w-6xl mx-auto">
              {/* Sidebar */}
              <div className="w-full xl:w-64 flex-shrink-0">
                <div className="bg-[#0a1929] rounded-xl border border-white/10 p-4">
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-lg mb-1">HERMES</h3>
                    <p className="text-gray-400 text-xs">AGENT</p>
                  </div>
                  <nav className="space-y-1">
                    {['SESSIONS', 'ANALYTICS', 'MODELS', 'LOGS', 'CRON', 'SKILLS', 'PLUGINS', 'PROFILES : MULTI AGEN...', 'CONFIG', 'KEYS', 'DOCUMENTATION'].map((item) => (
                      <a key={item} href="#" className="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded transition-colors hover:bg-white/5">
                        {item}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-gray-400 text-xs mb-2">SYSTEM</p>
                    <p className="text-gray-300 text-xs">GATEWAY STATUS: OFF</p>
                    <p className="text-gray-300 text-xs">ACTIVE SESSION: 0</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="text-gray-300 hover:text-white text-xs flex items-center gap-1">
                      <span>🔄</span> Update Hermes
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-400">v0.13.0</span>
                    <span className="text-xs text-gray-400">NOUS RESEARCH</span>
                  </div>
                </div>
              </div>
              
              {/* Kanban Board */}
              <div className="flex-1">
                <div className="bg-[#0a1929] rounded-xl border border-white/10 p-4">
                  {/* Board Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-white font-bold text-xl mb-1">KANBAN</h2>
                      <div className="flex items-center gap-2">
                        <div className="bg-white/10 rounded px-3 py-1.5 flex items-center gap-2">
                          <span className="text-yellow-500 text-sm">🔧</span>
                          <span className="text-white text-sm">SB Infra · 7</span>
                          <span className="text-gray-400 text-xs">7 TASKS</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded font-medium transition-colors">+ NEW BOARD</button>
                      <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded font-medium transition-colors">ARCHIVE</button>
                    </div>
                  </div>
                  
                  {/* Alert Banner */}
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded px-4 py-2 mb-4 flex items-center justify-between">
                    <span className="text-yellow-400 text-sm font-medium">⚠️ TASKS NEED ATTENTION</span>
                    <button className="text-gray-400 text-xs hover:text-white">Show</button>
                  </div>
                  
                  {/* Filters */}
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">SEARCH</label>
                      <input type="text" placeholder="Filter cards..." className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm w-48" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">TENANT</label>
                      <select className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                        <option>All tenants</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">ASSIGNEE</label>
                      <select className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                        <option>All profiles</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Kanban Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {/* TRIAGE */}
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-white font-bold text-xs uppercase">TRIAGE</span>
                        </div>
                        <span className="text-gray-400 text-xs">0</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">RAW IDEAS — A SPECIFIER WILL FLESH OUT THE SPEC</p>
                      <div className="border border-dashed border-gray-600 rounded p-4 text-center">
                        <p className="text-gray-500 text-xs">— NO TASKS —</p>
                      </div>
                    </div>
                    
                    {/* TODO */}
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                          <span className="text-white font-bold text-xs uppercase">TODO</span>
                        </div>
                        <span className="text-gray-400 text-xs">0</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">WAITING ON DEPENDENCIES OR UNASSIGNED</p>
                      <div className="border border-dashed border-gray-600 rounded p-4 text-center">
                        <p className="text-gray-500 text-xs">— NO TASKS —</p>
                      </div>
                    </div>
                    
                    {/* READY */}
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-white font-bold text-xs uppercase">READY</span>
                        </div>
                        <span className="text-gray-400 text-xs">2</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">ASSIGNED AND WAITING FOR A DISPATCHER PICK</p>
                      <div className="space-y-2">
                        <div className="bg-gray-800/80 rounded p-3 border border-orange-500/30">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">T_948828E8</span>
                            <span className="bg-orange-500/20 text-orange-400 text-xs px-1.5 py-0.5 rounded">P1</span>
                          </div>
                          <p className="text-white text-xs font-medium leading-relaxed">IMPLEMENTAR AUTO-DEPLOY NO SERVIDOR PRODUÇÃO</p>
                          <p className="text-orange-400 text-xs mt-1">@DEVOPS ~2</p>
                          <p className="text-gray-500 text-xs mt-1">2D AGO</p>
                        </div>
                        <div className="bg-gray-800/80 rounded p-3 border border-orange-500/30">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">T_83858933</span>
                            <span className="bg-orange-500/20 text-orange-400 text-xs px-1.5 py-0.5 rounded">P1</span>
                          </div>
                          <p className="text-white text-xs font-medium leading-relaxed">CRIAR RELATÓRIO DE FATURAMENTO MENSAL AUTOMATIZADO</p>
                          <p className="text-orange-400 text-xs mt-1">@FINANCEIRO ~1</p>
                          <p className="text-gray-500 text-xs mt-1">1D AGO</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* IN PROGRESS */}
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-white font-bold text-xs uppercase">IN PROGRESS</span>
                        </div>
                        <span className="text-gray-400 text-xs">0</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">CLAIMED BY A WORKER — IN-FLIGHT</p>
                      <div className="border border-dashed border-gray-600 rounded p-4 text-center">
                        <p className="text-gray-500 text-xs">— NO TASKS —</p>
                      </div>
                    </div>
                    
                    {/* BLOCKED */}
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-white font-bold text-xs uppercase">BLOCKED</span>
                        </div>
                        <span className="text-gray-400 text-xs">0</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">WORKER ASKED FOR HUMAN INPUT</p>
                      <div className="border border-dashed border-gray-600 rounded p-4 text-center">
                        <p className="text-gray-500 text-xs">— NO TASKS —</p>
                      </div>
                    </div>
                    
                    {/* DONE */}
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-white font-bold text-xs uppercase">DONE</span>
                        </div>
                        <span className="text-gray-400 text-xs">3</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">COMPLETED</p>
                      <div className="space-y-2">
                        <div className="bg-gray-900/50 rounded p-3 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">T_249ECA2A</span>
                            <span className="bg-blue-500/20 text-blue-400 text-xs px-1.5 py-0.5 rounded">P1</span>
                          </div>
                          <p className="text-gray-300 text-xs line-through">CONTEÚDO SEO / LLMS — COPY DO...</p>
                          <p className="text-orange-400 text-xs mt-1">@EXCARPLEX ~1</p>
                          <p className="text-gray-500 text-xs mt-1">3D AGO</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrações */}
        <section className="py-20 bg-surface-900">
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
                  className="bg-black/80 px-4 py-2 rounded-full text-gray-300 text-sm font-medium border border-white/10 hover:border-orange-500/30 transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-surface-950">
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
