import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

const CAMADAS = [
  {
    id: 'automacao',
    icon: '💬',
    name: 'Automação',
    color: '#22C55E',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    tag: 'O que seu cliente vê',
    desc: 'WhatsApp que vende sozinho. Conteúdo infinito em 5 redes. Seu negócio operando 24/7 sem você.',
    features: [
      'WhatsApp IA qualifica, agenda e fecha vendas sem intervenção',
      'Posts diários em YouTube, TikTok, Instagram, LinkedIn e X',
      'Dezenas de agentes criando conteúdo personalizado',
      'Funil completo no WhatsApp + CRM integrado',
    ],
  },
  {
    id: 'infra',
    icon: '🏗️',
    name: 'Infra Própria',
    color: '#D4AF37',
    border: 'border-[#D4AF37]/30',
    bg: 'bg-[#D4AF37]/10',
    text: 'text-[#D4AF37]',
    tag: 'Você é dono do código',
    desc: 'Seu domínio. Seu servidor. Seu código. Sem depender de plataforma terceira. White-label incluso.',
    features: [
      'VPS dedicado com Docker Swarm e Traefik',
      'Domínio próprio com SSL automático via Cloudflare',
      'Supabase com PostgreSQL, Auth e Storage',
      'Backup automático diário + monitoramento 24/7',
    ],
  },
  {
    id: 'orquestracao',
    icon: '🧠',
    name: 'Orquestração',
    color: '#7C3AED',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    tag: 'O cérebro por trás',
    desc: 'Dezenas de agentes coordenados por Kanban, webhooks e memória persistente. NVIDIA NIM, Claude Code, OpenRouter.',
    features: [
      'Multi-agente com memória de contexto entre sessões',
      'Kanban automatizado — agentes criam e executam tarefas',
      'Webhooks pra disparar fluxos em tempo real',
      'NVIDIA NIM + OpenRouter + Claude Code como engine',
    ],
  },
];

const AGENTS = [
  { name: 'Clawdia', domain: 'Operações', desc: 'Agenda, e-mails, tarefas, decisões', detail: 'Orquestra o dia a dia. Se um lead entra pelo WhatsApp, ela avisa o Nex. Se uma tarefa vence, ela escala pro Atlas.' },
  { name: 'Nex', domain: 'Vendas', desc: 'Pipeline, propostas, qualificação', detail: 'Recebe leads qualificados do WhatsApp IA. Monta proposta. Encaminha pro Flux calcular preço.' },
  { name: 'Flux', domain: 'Finanças', desc: 'ERP, fluxo de caixa, relatórios', detail: 'Quando o Nex fecha um deal, o Flux registra no Omie e atualiza o dashboard de receita.' },
  { name: 'Atlas', domain: 'Projetos', desc: 'Linear, GitHub, sprints, métricas', detail: 'Recebe specs da Nova, cria tickets no Linear, abre PR no GitHub, rastreia deploy.' },
  { name: 'Pixel', domain: 'Redes Sociais', desc: 'Conteúdo, calendário, analytics', detail: 'Cria posts diários. Se um reel bomba, avisa o Mako pra investir mais naquele formato.' },
  { name: 'Mako', domain: 'Marketing', desc: 'Campanhas, SEO, marca, conteúdo', detail: 'Estratégia de marca. Posicionamento. O que dizer, onde dizer, quando dizer.' },
  { name: 'Nova', domain: 'Produto', desc: 'Specs, roadmaps, métricas', detail: 'Transforma feedback em spec. Prioriza backlog. Comanda lançamentos com a Clawdia.' },
  { name: 'Sage', domain: 'Estratégia', desc: 'OKRs, roadmap, priorização', detail: 'Conecta visão de longo prazo com execução semanal. Garante que todo agente puxa pro mesmo lado.' },
  { name: 'Aria', domain: 'RH / Pessoas', desc: 'Recrutamento, onboarding, desempenho', detail: 'Triagem de currículos, onboarding automatizado, check-ins de desempenho.' },
  { name: 'Lex', domain: 'Jurídico', desc: 'Contratos, compliance, risco', detail: 'Revisa contratos, monitora compliance, alerta sobre riscos regulatórios.' },
  { name: 'Dex', domain: 'Dados / BI', desc: 'Análise, SQL, dashboards', detail: 'Converte dados em decisão. Dashboards que o Flux consulta e o Sage usa pra priorizar.' },
  { name: 'Zara', domain: 'Customer Success', desc: 'Triagem, escalação, saúde', detail: 'Monitora saúde do cliente. Se churning risk sobe, avisa Nex e Clawdia pra agir.' },
];

const INFRA_DETAILS = [
  { icon: '🐳', title: 'Docker Swarm', desc: 'Containers orquestrados. Deploy sem downtime. Rollback automático se algo quebra.' },
  { icon: '🌐', title: 'Traefik + Cloudflare', desc: 'Reverse proxy com SSL automático. CDN global. Domínio com DNS gerenciado.' },
  { icon: '💾', title: 'Supabase + PostgreSQL', desc: 'Auth, storage e realtime. Banco relacional com RLS. Sem Firebase lock-in.' },
  { icon: '📡', title: 'Redis + MinIO', desc: 'Cache pra resposta instantânea. Object storage pra arquivos e backups.' },
  { icon: '🔄', title: 'n8n + Evolution API', desc: 'Automação de fluxos. WhatsApp Business API nativo. Webhooks pra tudo.' },
  { icon: '🛡️', title: 'Backup + Monitoramento', desc: 'Snapshot diário em GlusterFS. Alerta no WhatsApp se algo sair do ar.' },
];

const ORCHESTRATION = [
  { icon: '🎯', title: 'Kanban Automatizado', desc: 'Agentes criam tickets, executam tarefas e atualizam status sozinhos. Quadro sempre atualizado.' },
  { icon: '🔗', title: 'Webhooks em Tempo Real', desc: 'Lead entra → dispara qualificação → notifica agente de vendas → agenda reunião. Tudo em segundos.' },
  { icon: '🧠', title: 'Memória Persistente', desc: 'Cada agente lembra do contexto. Se o cliente disse que prefere WhatsApp, a IA nunca pergunta de novo.' },
  { icon: '⚡', title: 'Multi-Engine de IA', desc: 'NVIDIA NIM pra inferência rápida. Claude Code pra código. OpenRouter pra flexibilidade de modelo.' },
];

const INTEGRATIONS = ['Google Workspace', 'GitHub', 'Linear', 'Stripe', 'Omie', 'Asaas', 'Bling', 'Discord', 'Telegram', 'WhatsApp', 'Instagram', 'YouTube', 'LinkedIn', 'Notion', 'Obsidian', 'Fathom', 'Todoist', 'Supabase', 'Docker', 'Cloudflare'];

export default function Sistema() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setCustomerData(data);
          setFormData(data);
        } catch {}
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    const customer = { name: formData.name, email: formData.email, whatsapp: formData.whatsapp };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customer));
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customer, source: 'sistema-landing' }),
      });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }

    setSubmitted(true);

    setTimeout(() => {
      const qs = new URLSearchParams({
        source: 'sistema',
        name: customer.name || '',
        email: customer.email || '',
        whatsapp: customer.whatsapp || '',
      }).toString();
      window.location.href = `/quiz?${qs}`;
    }, 800);
  };

  return (
    <>
      <Meta
        title="Sistema Completo — Workforce de IA do Zero ao Deploy — Sistema Britto"
        description="WhatsApp IA, SocialJobs, Infra própria e orquestração multi-agente. Dezenas de agentes operando seu negócio 24/7. Você é dono do código."
        path="/sistema"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL DE CAPTURA ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-[#D4AF37]/30 relative shadow-2xl shadow-[#D4AF37]/10">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors">&times;</button>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-3 py-1.5 mb-4">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                      <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Sistema</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Seu negócio no piloto automático</h3>
                    <p className="text-gray-400 text-sm">Seus dados preenchem o quiz automático. Sem repetir nada.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none backdrop-blur-sm transition-colors" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none backdrop-blur-sm transition-colors" required />
                    </div>
                    <PhoneInput
                      value={formData.whatsapp}
                      onChange={(v) => setFormData({...formData, whatsapp: v})}
                      accentColor="#D4AF37"
                    />
                    <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-[0.98]">
                      QUERO MEU SISTEMA →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Bora automatizar!</h3>
                  <p className="text-gray-300 text-sm">Redirecionando pro quiz de qualificação…</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-[#D4AF37] h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/8 via-purple-500/5 to-[#0a0a0a]" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Sistema Completo</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Seu negócio roda sozinho<br />
              <span className="text-[#D4AF37]">ou você ainda é o motor?</span>
            </h1>

            <p className="text-xl text-gray-300 mb-3 max-w-3xl mx-auto leading-relaxed">
              WhatsApp IA, conteúdo infinito nas redes, infra própria e dezenas de agentes orquestrados por Kanban.
            </p>
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
              Você é dono do código. Roda no seu servidor. Sem lock-in. Sem depender de plataforma.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO MEU SISTEMA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz de qualificação. Resposta personalizada em 2 minutos.
            </p>
          </div>
        </section>

        {/* ===== 3 CAMADAS ===== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">3 camadas. Um sistema.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Não são 3 serviços separados. São 3 camadas do mesmo sistema — integradas, coordenadas, rodando sozinhas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {CAMADAS.map((c) => (
                <div
                  key={c.id}
                  className={`group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-7 border ${c.border} transition-all duration-300 hover:-translate-y-1 cursor-pointer ${activeLayer === c.id ? 'ring-1 ring-offset-1 ring-offset-[#0a0a0a]' : ''}`}
                  style={{ ...(activeLayer === c.id ? { borderColor: c.color } : {}) }}
                  onClick={() => setActiveLayer(activeLayer === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">{c.icon}</span>
                    <div>
                      <h3 className={`${c.text} font-bold text-xl`}>{c.name}</h3>
                      <span className={`text-xs ${c.text} opacity-70`}>{c.tag}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-5 leading-relaxed">{c.desc}</p>
                  <ul className="space-y-2.5">
                    {c.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className={`${c.text} mt-0.5 flex-shrink-0 text-xs`}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WORKFORCE ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Workforce</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Seu novo time de IA</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Dezenas de agentes especializados. Cada um com memória persistente e skills do domínio. Eles conversam entre si e executam via Kanban.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AGENTS.map((agent) => (
                <div
                  key={agent.name}
                  className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  onMouseEnter={() => setHoveredAgent(agent.name)}
                  onMouseLeave={() => setHoveredAgent(null)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-xs">{agent.name[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-base">{agent.name}</span>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-semibold">{agent.domain}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{agent.desc}</p>
                  <p className={`text-gray-500 text-xs leading-relaxed transition-all duration-300 ${hoveredAgent === agent.name ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {agent.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INFRA PRÓPRIA ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Infra Própria</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Seu domínio. Seu servidor. Seu código.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Sem depender de plataforma. Sem lock-in. Você pode migrar, escalar ou white-label quando quiser.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INFRA_DETAILS.map((item, i) => (
                <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1 text-sm">{item.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ORQUESTRAÇÃO ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Orquestração</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O cérebro por trás do sistema</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Agentes não trabalham sozinhos. Eles se comunicam, delegam tarefas e aprendem com cada interação.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {ORCHESTRATION.map((item, i) => (
                <div key={i} className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Stack</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Integrado com o que você usa</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Conectado nativamente com as ferramentas do seu dia a dia.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {INTEGRATIONS.map((name) => (
                <span key={name} className="bg-[#111111]/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-gray-200 text-sm font-medium border border-white/[0.06] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all duration-200">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ LEVA ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que você leva</h2>
              <p className="text-gray-400 text-lg">Um sistema completo, não um pedaço.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '💬', title: 'WhatsApp que vende sozinho', desc: 'IA qualifica, agenda e fecha vendas 24/7. Seu time só entra na hora de assinar. Funil completo integrado ao CRM.' },
                { icon: '🔥', title: 'Conteúdo infinito em 5 redes', desc: 'Posts diários criados por agentes especialistas. YouTube, TikTok, Instagram, LinkedIn e X — sem você tocar em nada.' },
                { icon: '🏗️', title: 'Infra que é sua de verdade', desc: 'VPS dedicado, Docker, SSL, domínio próprio. Sem depender de ninguém. White-label se quiser revender.' },
                { icon: '🧠', title: 'Dezenas de agentes coordenados', desc: 'Finanças, projetos, RH, jurídico, marketing — cada área com IA própria que conversa com as outras via Kanban.' },
                { icon: '📊', title: 'Dashboard unificado', desc: 'Leads, conteúdo, infra, projetos, receita. Um só lugar. Dados que os agentes usam pra tomar decisão.' },
                { icon: '⚡', title: 'Setup em 48h. Sem contrato longo.', desc: 'Ativamos seu sistema completo. Cancele quando quiser. Sem multa. Sem burocracia.' },
              ].map((item, i) => (
                <div key={i} className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-[#D4AF37]/30 transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-purple-500/3 to-transparent" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#D4AF37]/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/6 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Enquanto você decide,<br />
              <span className="text-[#D4AF37]">seus concorrentes já automatizaram.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Sistema completo. Infra própria. Setup em 48h. Sem contrato longo.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO MEU SISTEMA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz de qualificação. Sem compromisso.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}