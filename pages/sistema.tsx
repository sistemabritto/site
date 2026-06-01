import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

const PILARES = [
  {
    id: 'whatsapp',
    icon: '💬',
    name: 'WhatsApp IA',
    color: 'green',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    desc: 'Atende, qualifica e vende 24/7',
    features: [
      'Qualifica leads automaticamente',
      'Agenda consultas sem intervenção',
      'Funil completo no WhatsApp + CRM',
      'Reativa leads dormentes',
    ],
  },
  {
    id: 'socialjobs',
    icon: '🔥',
    name: 'SocialJobs',
    color: 'orange',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    desc: 'Conteúdo infinito em 5 redes',
    features: [
      'Posts diários em YouTube, TikTok, Instagram, LinkedIn e X',
      'Dezenas de agentes criando conteúdo personalizado',
      'Calendário editorial automático',
      'Copy otimizada pra engajamento',
    ],
  },
  {
    id: 'infra',
    icon: '🔧',
    name: 'Infra & DevOps',
    color: 'gold',
    border: 'border-[#D4AF37]/30',
    bg: 'bg-[#D4AF37]/10',
    text: 'text-[#D4AF37]',
    desc: 'Servidor que não cai, deploy que não quebra',
    features: [
      'Docker configurado + CI/CD',
      'Monitoramento 24/7 com alerta no WhatsApp',
      'Backup automático diário',
      'SSL automático + firewall',
    ],
  },
];

const AGENTS = [
  { name: 'Clawdia', domain: 'Operações', desc: 'Agenda, e-mails, tarefas, decisões' },
  { name: 'Flux', domain: 'Finanças', desc: 'Stripe, ERP, fluxo de caixa, relatórios' },
  { name: 'Atlas', domain: 'Projetos', desc: 'Linear, GitHub, sprints, métricas' },
  { name: 'Pixel', domain: 'Redes Sociais', desc: 'Conteúdo, calendário, analytics' },
  { name: 'Mako', domain: 'Marketing', desc: 'Campanhas, SEO, marca, conteúdo' },
  { name: 'Sage', domain: 'Estratégia', desc: 'OKRs, roadmap, priorização' },
  { name: 'Nex', domain: 'Vendas', desc: 'Pipeline, propostas, qualificação' },
  { name: 'Aria', domain: 'RH / Pessoas', desc: 'Recrutamento, onboarding, desempenho' },
  { name: 'Lex', domain: 'Jurídico', desc: 'Contratos, compliance, risco' },
  { name: 'Nova', domain: 'Produto', desc: 'Specs, roadmaps, métricas' },
  { name: 'Dex', domain: 'Dados / BI', desc: 'Análise, SQL, dashboards' },
  { name: 'Zara', domain: 'Customer Success', desc: 'Triagem, escalação, saúde' },
];

const INTEGRATIONS = ['Google Workspace', 'GitHub', 'Linear', 'Stripe', 'Omie', 'Asaas', 'Bling', 'Discord', 'Telegram', 'WhatsApp', 'Instagram', 'YouTube', 'LinkedIn', 'Notion', 'Obsidian', 'Fathom', 'Todoist'];

export default function Sistema() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);

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
      window.location.href = '/quiz?source=sistema';
    }, 800);
  };

  return (
    <>
      <Meta
        title="Sistema Completo — Workforce de IA do Zero ao Deploy — Sistema Britto"
        description="WhatsApp IA, SocialJobs, Infra & DevOps numa workforce só. Dezenas de agentes especializados operando seu negócio 24/7."
        path="/sistema"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL DE CAPTURA ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-[#D4AF37]/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">⚡</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quer seu negócio no piloto automático?</h3>
                    <p className="text-gray-300 text-sm">Seus dados preenchem o quiz automático. Sem repetir nada.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" required />
                    </div>
                    <PhoneInput
                      value={formData.whatsapp}
                      onChange={(v) => setFormData({...formData, whatsapp: v})}
                      accentColor="#D4AF37"
                    />
                    <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-4 rounded-full font-bold text-lg transition-all">
                      QUERO MEU SISTEMA →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido!</h3>
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
        <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/15 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Sistema Completo</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Seu negócio no<br />
              <span className="text-[#D4AF37]">piloto automático</span>
            </h1>

            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              WhatsApp IA, conteúdo infinito nas redes e infra que não cai — tudo numa workforce só.
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Dezenas de agentes especializados operando vendas, marketing, projetos, finanças e suporte. 24/7. Sem folga.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 shadow-2xl shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:scale-105"
            >
              QUERO MEU SISTEMA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz de qualificação. Resposta personalizada em 2 minutos.
            </p>
          </div>
        </section>

        {/* ===== 3 PILARES ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">3 pilares. Uma workforce.</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Escolha um ou use todos. Cada um com agentes especialistas dedicados.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {PILARES.map((p) => (
                <div key={p.id} className={`bg-[#0a0a0a] rounded-2xl p-8 border ${p.border} hover:scale-[1.02] transition-all`}>
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className={`${p.text} font-bold text-xl mb-2`}>{p.name}</h3>
                  <p className="text-gray-300 text-sm mb-6">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className={`${p.text} mt-0.5 flex-shrink-0`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENTES ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4 border border-[#D4AF37]/30 px-4 py-2 rounded-full bg-[#D4AF37]/10">
                Workforce
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Seu novo time de IA</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Dezenas de agentes especializados. Cada um com memória persistente e skills do domínio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AGENTS.map((agent) => (
                <div key={agent.name} className="bg-[#111111] rounded-xl p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#D4AF37] font-bold text-lg">{agent.name}</span>
                    <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-semibold">{agent.domain}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4 border border-[#D4AF37]/30 px-4 py-2 rounded-full bg-[#D4AF37]/10">
              Stack
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Integrado com o que você usa</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Conectado nativamente com as ferramentas do seu dia a dia.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {INTEGRATIONS.map((name) => (
                <span key={name} className="bg-[#0a0a0a] px-4 py-2 rounded-full text-gray-200 text-sm font-medium border border-white/10 hover:border-[#D4AF37]/30 transition-colors">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ LEVA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">O que você leva</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '💬', title: 'WhatsApp que vende sozinho', desc: 'IA qualifica, agenda e fecha vendas 24/7. Seu time só entra na hora de assinar.' },
                { icon: '🔥', title: 'Conteúdo infinito em 5 redes', desc: 'Posts diários criados por agentes especialistas. YouTube, TikTok, Instagram, LinkedIn e X.' },
                { icon: '🔧', title: 'Infra que não cai', desc: 'Docker, monitoramento, backup, SSL. Servidor rodando igual navio.' },
                { icon: '🤖', title: 'Dezenas de agentes especializados', desc: 'Finanças, projetos, RH, jurídico, marketing — cada área com IA própria.' },
                { icon: '📊', title: 'Dashboard unificado', desc: 'Acompanhe tudo: leads, conteúdo, infra, projetos. Um só lugar.' },
                { icon: '⚡', title: 'Setup em 48h', desc: 'Ativamos seu sistema completo. Sem contrato longo. Cancele quando quiser.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20 flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Enquanto você decide,<br />
              <span className="text-[#D4AF37]">seus concorrentes já automatizaram.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Workforce completa. Setup em 48h. Sem contrato longo.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 shadow-2xl shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:scale-105"
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
