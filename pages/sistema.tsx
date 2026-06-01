import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

const ARQUITETURA = [
  {
    id: 'hermes',
    icon: '⚡',
    name: 'Hermes',
    color: '#22C55E',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    tag: 'O cérebro que orquestra',
    desc: 'O agente mestre. Ele coordena a workforce inteira: Kanban, webhooks, memória persistente. NVIDIA NIM, Claude Code, OpenRouter — rodando direto no seu servidor.',
    detail: 'É o Hermes que decide quem faz o quê. Lead entra no WhatsApp? Ele dispara o agente de vendas. Tarefa vence? Ele escala. Métrica cai? Ele gera alerta. Tudo via Kanban automatizado — você vê o quadro se movendo sozinho.',
    features: [
      'Workforce multi-agente com Kanban automatizado',
      'Memória de contexto persistente entre sessões',
      'Webhooks pra disparar fluxos em tempo real',
      'NVIDIA NIM + Claude Code + OpenRouter',
    ],
  },
  {
    id: 'evonexus',
    icon: '🤖',
    name: 'EvoNexus',
    color: '#7C3AED',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    tag: 'Onde os agentes vivem',
    desc: 'Plataforma de execução. Claude Code e OpenCode rodam em containers isolados, cada agente com seu próprio ambiente, memória e tools.',
    detail: 'Imagina 12 devs seniores trabalhando ao mesmo tempo — só que em segundos. Cada um com seu contexto, suas ferramentas, sua especialidade. Eles abrem PR, revisam código, fazem deploy. O EvoNexus garante que um não pisa no trabalho do outro.',
    features: [
      'Sandbox por agente — containers isolados',
      'Claude Code + OpenCode em paralelo',
      'Memória individual + compartilhada entre agentes',
      'Logs, métricas e feedback loop automático',
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
    desc: 'VPS dedicado. Docker Swarm. Traefik com SSL automático. Supabase com PostgreSQL, Auth e Storage. Domínio próprio. Sem lock-in de plataforma.',
    detail: 'Nada de SaaS que muda o preço do nada. Nada de vendor lock-in. O código é seu, roda no seu servidor, com seu domínio. Se quiser migrar amanhã, migra. Se quiser white-label, é só trocar a logo.',
    features: [
      'VPS dedicado com Docker Swarm e Traefik',
      'Supabase: PostgreSQL, Auth, Storage, Realtime',
      'Domínio próprio + SSL via Cloudflare',
      'Backup diário em GlusterFS + monitoramento 24/7',
    ],
  },
];

const O_QUE_EU_FACO = [
  {
    icon: '🔍',
    step: '01',
    title: 'Entendo seu negócio',
    desc: 'Agendamos uma call de 30 min. Você me conta onde dói. Eu mapeio os processos que a IA vai assumir. Sem blá-blá-blá — a gente sai da call com um plano.',
    detail: 'Não é formulário de 50 perguntas. É conversa de negócio. Eu entendo seu funil, seu time, suas ferramentas. O que já funciona, o que tá travado, o que você quer escalar. Com isso, eu desenho a arquitetura dos agentes.',
  },
  {
    icon: '🏗️',
    step: '02',
    title: 'Monto o sistema pra você',
    desc: 'Hermes configurado no seu domínio. Agentes criados sob medida pros seus processos. Kanban, webhooks, memória — tudo rodando em 48h.',
    detail: 'Você não recebe um template. Você recebe um sistema feito pro seu negócio. O agente de vendas sabe seu script. O de conteúdo conhece seu tom. O de finanças entende seu ERP. Cada agente é configurado com seu contexto, suas regras, suas ferramentas.',
  },
  {
    icon: '🚀',
    step: '03',
    title: 'Ativo, testo e te entrego',
    desc: 'Sistema rodando. Agentes executando. Você vê o Kanban se mover sozinho. Suporte nos primeiros 7 dias pra ajustar o que precisar.',
    detail: 'Não entrego e sumo. Primeira semana a gente afina junto. O agente de vendas tá respondendo certo? O Kanban tá priorizando bem? A memória tá retendo o que importa? Ajusto, testo de novo e só saio quando você falar "tá rodando liso".',
  },
];

export default function Sistema() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

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
        title="Sistema Sob Encomenda — Hermes + EvoNexus + Infra Própria — Sistema Britto"
        description="Eu monto um sistema de IA completo rodando no seu servidor. Hermes orquestrando dezenas de agentes, EvoNexus executando, infra que é sua. Setup em 48h."
        path="/sistema"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative shadow-2xl shadow-green-500/10">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors">&times;</button>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1.5 mb-4">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Sistema Sob Encomenda</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Vamos montar seu sistema</h3>
                    <p className="text-gray-400 text-sm">Preencha abaixo e eu entro em contato em até 24h.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none backdrop-blur-sm transition-colors" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none backdrop-blur-sm transition-colors" required />
                    </div>
                    <PhoneInput
                      value={formData.whatsapp}
                      onChange={(v) => setFormData({...formData, whatsapp: v})}
                      accentColor="#22C55E"
                    />
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]">
                      QUERO MEU SISTEMA →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Dados salvos!</h3>
                  <p className="text-gray-300 text-sm">Redirecionando pro quiz…</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-green-400 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/8 via-purple-500/3 to-[#0a0a0a]" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green-500/6 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Sob Encomenda</span>
            </div>

            {/* GANCHO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Eu monto um sistema de IA<br />
              <span className="text-green-400">pro seu negócio.</span>
            </h1>

            {/* DOR */}
            <div className="max-w-2xl mx-auto mb-6 space-y-3">
              <p className="text-xl text-gray-300 leading-relaxed">
                Não é template. Não é SaaS. Não é "assine e reze pra funcionar".
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                É um sistema montado sob medida — com agentes de IA rodando direto no seu servidor. Hermes orquestrando. EvoNexus executando. Infra que é sua. <span className="text-white font-semibold">Você é dono do código.</span>
              </p>
            </div>

            {/* SOLUÇÃO */}
            <div className="bg-[#111111]/80 border border-green-500/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-10 backdrop-blur-sm">
              <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
                Em <span className="text-green-400">48 horas</span> seu sistema tá no ar. Agentes configurados pro seu negócio. Kanban rodando. Webhooks ativos. <span className="text-green-400">Setup completo, do zero ao deploy.</span>
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO MEU SISTEMA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz rápido. Resposta personalizada em 2 minutos.
            </p>
          </div>
        </section>

        {/* ===== O QUE EU FAÇO (COMO FUNCIONA) ===== */}
        <section className="py-24 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Como funciona</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sistema sob encomenda, não produto de prateleira</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Em 3 etapas, eu transformo seu negócio num sistema de IA rodando 24/7. Sem template. Sem fórmula pronta.
              </p>
            </div>

            <div className="space-y-6">
              {O_QUE_EU_FACO.map((item, i) => (
                <div
                  key={item.step}
                  className={`group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeCard === item.step
                      ? 'border-green-500/40 shadow-lg shadow-green-500/5'
                      : 'border-white/[0.06] hover:border-green-500/20'
                  }`}
                  onClick={() => setActiveCard(activeCard === item.step ? null : item.step)}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-green-400 font-mono font-bold text-sm opacity-60">{item.step}</span>
                          <h3 className="text-white font-bold text-xl sm:text-2xl">{item.title}</h3>
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed mb-2">{item.desc}</p>
                        <p className={`text-gray-500 text-sm leading-relaxed transition-all duration-300 ${
                          activeCard === item.step ? 'opacity-100 max-h-40 mt-3' : 'opacity-0 max-h-0 overflow-hidden'
                        }`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini CTA entre as etapas */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm mb-4">Não tem etapa 4. É isso. Sistema montado, rodando, no ar.</p>
            </div>
          </div>
        </section>

        {/* ===== ARQUITETURA (HERMES + EVONEXUS + INFRA) ===== */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Arquitetura</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que roda no seu servidor</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Três camadas. Um sistema. Cada uma com seu papel — e todas conversando entre si.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {ARQUITETURA.map((c) => (
                <div
                  key={c.id}
                  className={`group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-7 border ${c.border} transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    activeCard === c.id ? 'ring-1 ring-offset-1 ring-offset-[#0a0a0a]' : ''
                  }`}
                  style={{ ...(activeCard === c.id ? { borderColor: c.color } : {}) }}
                  onClick={() => setActiveCard(activeCard === c.id ? null : c.id)}
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
                  {/* Detail expand */}
                  <div className={`mt-4 pt-4 border-t border-white/[0.06] transition-all duration-300 ${
                    activeCard === c.id ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0 overflow-hidden border-transparent'
                  }`}>
                    <p className="text-gray-500 text-xs leading-relaxed">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INFRA PRÓPRIA ===== */}
        <section className="py-24 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Infraestrutura</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Você é dono. Sempre.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Nada de plataforma que muda o preço do nada. Nada de vendor lock-in. O código é seu. O servidor é seu.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🐳', title: 'Docker Swarm', desc: 'Containers orquestrados. Deploy sem downtime. Rollback se algo quebrar.' },
                { icon: '🌐', title: 'Traefik + Cloudflare', desc: 'SSL automático. CDN global. DNS gerenciado.' },
                { icon: '💾', title: 'Supabase + PostgreSQL', desc: 'Auth, storage, realtime. Banco relacional com RLS.' },
                { icon: '📡', title: 'Redis + MinIO', desc: 'Cache instantâneo. Object storage pra arquivos e backups.' },
                { icon: '🔄', title: 'n8n + Evolution API', desc: 'Automação de fluxos. WhatsApp Business API nativo.' },
                { icon: '🛡️', title: 'Backup + Monitoramento', desc: 'Snapshot diário. Alerta no WhatsApp se der ruim.' },
              ].map((item, i) => (
                <div key={i} className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-0.5">
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

        {/* ===== STACK TECNOLÓGICA ===== */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stack que roda no seu sistema</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Cada peça dessa stack é instalada, configurada e integrada no seu servidor. Você recebe acesso a tudo.
              </p>
            </div>

            {/* Stack visual */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { name: 'Hermes', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
                { name: 'EvoNexus', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                { name: 'Claude Code', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
                { name: 'OpenCode', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                { name: 'NVIDIA NIM', color: 'text-green-300', bg: 'bg-green-600/10', border: 'border-green-600/20' },
                { name: 'OpenRouter', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
                { name: 'Docker Swarm', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
                { name: 'Traefik', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
                { name: 'Supabase', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                { name: 'PostgreSQL', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
                { name: 'Redis', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
                { name: 'MinIO', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                { name: 'n8n', color: 'text-red-300', bg: 'bg-red-600/10', border: 'border-red-600/20' },
                { name: 'Evolution API', color: 'text-lime-400', bg: 'bg-lime-500/10', border: 'border-lime-500/20' },
                { name: 'Cloudflare', color: 'text-orange-300', bg: 'bg-orange-600/10', border: 'border-orange-600/20' },
                { name: 'GlusterFS', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
                { name: 'Portainer', color: 'text-blue-300', bg: 'bg-blue-600/10', border: 'border-blue-600/20' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`${tech.bg} border ${tech.border} rounded-xl p-4 text-center hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm`}
                >
                  <span className={`${tech.color} font-bold text-sm`}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ LEVA ===== */}
        <section className="py-24 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que você recebe</h2>
              <p className="text-gray-400 text-lg">Um sistema completo. Não um pedaço.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '⚡', title: 'Hermes configurado no seu domínio', desc: 'O agente mestre orquestrando Kanban, webhooks e memória. NVIDIA NIM, Claude Code e OpenRouter integrados. Tudo rodando no seu servidor — você tem acesso root.' },
                { icon: '🤖', title: 'EvoNexus com agents sob medida', desc: 'Agentes configurados pros seus processos. Vendas, marketing, finanças, suporte — cada um com memória e tools específicas pro seu negócio. Não é template genérico.' },
                { icon: '🏗️', title: 'Infra completa. Sua.', desc: 'VPS dedicado, Docker Swarm, Traefik, Supabase, Redis, MinIO, n8n, Evolution API. Domínio próprio com SSL. Backup diário. Monitoramento 24/7.' },
                { icon: '🔗', title: 'Webhooks e automações ativos', desc: 'Lead entra no WhatsApp? Dispara qualificação. Tarefa vence no Kanban? Escala pro agente. Métrica cai? Gera alerta. Tudo conectado em tempo real.' },
                { icon: '📊', title: 'Dashboard unificado', desc: 'Leads, conteúdo, infra, projetos, receita — um só lugar. Dados que os agentes usam pra tomar decisão e você usa pra acompanhar tudo.' },
                { icon: '📅', title: 'Setup em 48h + 7 dias de suporte', desc: 'Sistema no ar em 48 horas. Primeira semana com ajustes finos inclusos. Depois, suporte via WhatsApp. Sem contrato longo — cancele quando quiser.' },
              ].map((item, i) => (
                <div key={i} className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-purple-500/3 to-transparent" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-green-500/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/6 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Vamos montar seu sistema?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Call de 30 min. Eu entendo seu negócio, você entende o sistema. Sem compromisso.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO MEU SISTEMA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz de qualificação. Sem compromisso. Resposta em 2 minutos.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}