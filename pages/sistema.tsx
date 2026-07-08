import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

/* ─── Tipos de projeto que a gente faz ─── */
const PROJETOS = [
  {
    id: 'saas',
    icon: '🚀',
    name: 'SaaS',
    tag: 'Produto digital recorrente',
    desc: 'Plataforma com assinatura, onboarding, dashboard e billing. Do MVP ao lançamento — com IA integrada ou não. Você define as features, a gente constrói.',
    exemplos: ['Plataforma de agendamento', 'CRM simples', 'Gestão de cursos online', 'Marketplace de serviços'],
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    name: 'Loja Virtual',
    tag: 'E-commerce que converte',
    desc: 'Catálogo, carrinho, checkout, pagamento e gestão de pedidos. Integrado com gateway de pagamento brasileiro. Sem Shopify — é seu código, sua margem.',
    exemplos: ['Loja de produtos físicos', 'Infoprodutos + upsell', 'Assinatura de caixinha', 'Marketplace próprio'],
  },
  {
    id: 'assistente',
    icon: '🤖',
    name: 'Assistente de IA',
    tag: 'Automação inteligente',
    desc: 'Agente de IA com memória, ferramentas e personalidade configurada. Atende cliente, qualifica lead, responde suporte — 24h, no WhatsApp ou web.',
    exemplos: ['Atendente de WhatsApp', 'Assistente de vendas', 'Suporte técnico automatizado', 'Onboarding de clientes'],
  },
  {
    id: 'funil',
    icon: '🎯',
    name: 'Funil de Vendas',
    tag: 'LP + Quiz + Checkout',
    desc: 'Landing page que converte, quiz de qualificação e checkout integrado. Pixel do Facebook, UTM tracking, redirecionamento condicional. Funil completo — não só a landing.',
    exemplos: ['LP de qualificação com quiz', 'Página de vendas VSL', 'Funil de alta conversão', 'Webinar funnel + replay'],
  },
  {
    id: 'integracao',
    icon: '🔗',
    name: 'Integração Custom',
    tag: 'Conecta tudo que você usa',
    desc: 'APIs que não conversam, sistemas que não se integram, processos manuais que podiam ser automáticos. A gente constrói a ponte — e bota IA pra operar.',
    exemplos: ['ERP ↔ WhatsApp', 'CRM ↔ n8n', 'Planilha → Dashboard automático', 'Webhook de pagamento → ativação'],
  },
  {
    id: 'whitelabel',
    icon: '🏷️',
    name: 'White-Label',
    tag: 'Sua marca, seu produto',
    desc: 'Sistema completo com sua logo, seu domínio, sua identidade. Você revende pra seus clientes como se fosse seu. Sem menção ao Sistema Britto em lugar nenhum.',
    exemplos: ['Plataforma de automação pra agências', 'SaaS revendável', 'Painel de gestão pra franquias', 'App de atendimento multi-cliente'],
  },
];

/* ─── Como funciona ─── */
const ETAPAS = [
  {
    icon: '🔍',
    step: '01',
    title: 'Você me conta o que precisa',
    desc: 'Call de 30 min. Sem formulário de 50 perguntas. Você fala, eu ouço. No final, a gente sai com o escopo claro e o prazo definido.',
    detail: 'Pode ser "quero um SaaS de agendamento" ou "meu ERP não fala com meu WhatsApp". Pode ser "quero revender automação pra agências" ou "preciso de uma LP que converta". Não importa o tamanho — importa a clareza. Quanto mais específico você for, mais rápido a gente entrega.',
  },
  {
    icon: '🏗️',
    step: '02',
    title: 'Eu construo sob medida',
    desc: 'Design, código, infra, integrações — tudo feito pro seu negócio. Roda no seu domínio, com a sua marca. Código limpo, documentado, que você pode escalar.',
    detail: 'Não é template. Não é fork de projeto open source. É código escrito do zero, configurado pros seus processos. O assistente de IA sabe seu script de vendas. A loja tem suas categorias e meios de pagamento. O funil segue sua copy. Cada detalhe é seu.',
  },
  {
    icon: '🚀',
    step: '03',
    title: 'Entrego, testo e ajusto',
    desc: 'Sistema no ar. Você testa. O que não tá redondo, eu ajusto. Suporte nos primeiros 7 dias incluso — sem cobrar extra pra afinar.',
    detail: 'Não entrego e sumo. A primeira semana é de calibração. O checkout tá fluindo? O funil tá rastreando os UTMs? A IA tá respondendo no tom certo? Eu fico até você falar "tá rodando liso". Depois disso, suporte contínuo via WhatsApp.',
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
        title="Soluções Web Sob Encomenda — SaaS, Loja, IA, Funil, Integrações — Sistema Britto"
        description="Eu construo soluções web sob medida pro seu negócio. SaaS, loja virtual, assistente de IA, funil de vendas, integração custom, white-label. Código seu, domínio seu, marca sua."
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
                      <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Soluções Web</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Vamos construir seu projeto</h3>
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
                      QUERO MEU PROJETO →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Dados salvos!</h3>
                  <p className="text-gray-300 text-sm">Recebi. Já já eu entro em contato.</p>
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
          <div className="absolute top-1/3 left-1/4 max-w-[500px] max-h-[500px] w-full h-full bg-green-500/6 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 max-w-[400px] max-h-[400px] w-full h-full bg-purple-500/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Soluções Web Sob Encomenda</span>
            </div>

            {/* GANCHO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Eu construo a solução web<br />
              <span className="text-green-400">que seu negócio precisa.</span>
            </h1>

            {/* DOR */}
            <div className="max-w-2xl mx-auto mb-6 space-y-3">
              <p className="text-xl text-gray-300 leading-relaxed">
                SaaS, loja virtual, assistente de IA, funil de vendas, integração custom — <span className="text-white font-semibold">sob medida, com a sua marca, no seu domínio.</span>
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Não é template. Não é "assine e reze". É código seu, infra sua, rodando 24h. Se quiser revender, é white-label. Se quiser usar, é seu assistente. Você decide.
              </p>
            </div>

            {/* SOLUÇÃO */}
            <div className="bg-[#111111]/80 border border-green-500/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-10 backdrop-blur-sm">
              <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
                Call de 30 min. Você me conta o problema. Eu monto a solução. <span className="text-green-400">Entrego em dias, não meses.</span>
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO MEU PROJETO →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Call de 30 min. Sem compromisso.
            </p>
          </div>
        </section>

        {/* ===== TIPOS DE PROJETO ===== */}
        <section className="py-24 px-4 bg-[#111111]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que a gente constrói</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Cada projeto é único. Mas aqui estão os tipos que mais aparecem. O seu pode ser um desses — ou uma combinação de vários.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJETOS.map((p) => (
                <div
                  key={p.id}
                  className={`group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                    activeCard === p.id
                      ? 'border-green-500/40 shadow-lg shadow-green-500/5'
                      : 'border-white/[0.06] hover:border-green-500/20'
                  }`}
                  onClick={() => setActiveCard(activeCard === p.id ? null : p.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                      <span className="text-2xl">{p.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{p.name}</h3>
                      <span className="text-green-400 text-xs font-bold uppercase tracking-wider">{p.tag}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{p.desc}</p>

                  {/* Exemplos — sempre visível */}
                  <div className="bg-[#111111]/60 rounded-xl p-3 border border-white/[0.04]">
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider font-bold mb-2">Exemplos</div>
                    <ul className="space-y-1">
                      {p.exemplos.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                          <span className="text-green-400 mt-0.5 flex-shrink-0">→</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé da seção */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm">
                Não encontrou o que precisa? <span className="text-green-400">Fala comigo.</span> Se é solução web, a gente faz.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PROJETOS QUE SAÍRAM DAQUI ===== */}
 <section className="py-24 px-4 bg-[#111111]/50">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-14">
 <span className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-6">
 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
 <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Projetos reais</span>
 </span>
 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projetos que saíram daqui</h2>
 <p className="text-gray-400 text-lg max-w-2xl mx-auto">
 A gente não fala de clientes por nome. Mas alguns projetos são públicos — e mostram o que a gente constrói.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* ZapMágico */}
 <div className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
 <span className="text-2xl">🎩</span>
 </div>
 <div>
 <h3 className="text-white font-bold text-lg">ZapMágico</h3>
 <a href="https://zapmagico.com.br" target="_blank" rel="noopener noreferrer" className="text-green-400 text-xs font-semibold hover:underline">zapmagico.com.br →</a>
 </div>
 </div>
 <p className="text-gray-300 text-sm leading-relaxed mb-3">
 Automação de WhatsApp para pequenos negócios. Interface white-label, fluxos pré-configurados e billing automático. O cliente assina e usa — sem precisar entender de infra.
 </p>
 <div className="flex flex-wrap gap-2">
 {['White-label', 'WhatsApp', 'Assinatura', 'Multi-tenant'].map(tag => (
 <span key={tag} className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">{tag}</span>
 ))}
 </div>
 </div>

 {/* VoiceDream */}
 <div className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
 <span className="text-2xl">🎙️</span>
 </div>
 <div>
 <h3 className="text-white font-bold text-lg">VoiceDream</h3>
 <a href="https://voicedream.com.br" target="_blank" rel="noopener noreferrer" className="text-green-400 text-xs font-semibold hover:underline">voicedream.com.br →</a>
 </div>
 </div>
 <p className="text-gray-300 text-sm leading-relaxed mb-3">
 SaaS de áudio com IA. Plataforma completa de gravação, edição e síntese de voz. Stack moderna, infra própria e interface limpa que o usuário final usa sem fricção.
 </p>
 <div className="flex flex-wrap gap-2">
 {['SaaS', 'IA de Voz', 'Next.js', 'WebSocket', 'Upload de áudio'].map(tag => (
 <span key={tag} className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">{tag}</span>
 ))}
 </div>
 </div>
 </div>

 <div className="text-center mt-8">
 <p className="text-gray-500 text-sm">
 Esses são só dois exemplos. Cada projeto tem sua particularidade — e a gente adapta o stack, o prazo e a arquitetura pro seu caso.
 </p>
 </div>
 </div>
 </section>

 {/* ===== COMO FUNCIONA ===== */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Como funciona</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Do problema à solução em 3 etapas</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Sem proposta de 40 páginas. Sem sprints de 3 meses. Call → build → entrega.
              </p>
            </div>

            <div className="space-y-6">
              {ETAPAS.map((item) => (
                <div
                  key={item.step}
                  className={`group bg-[#111111]/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 cursor-pointer ${
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

            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm">Não tem etapa 4. É isso. Problema → solução → no ar.</p>
            </div>
          </div>
        </section>

        {/* ===== WHITE-LABEL (DESTAQUE) ===== */}
        <section className="py-24 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">White-Label</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sua marca. Seu domínio. Seu produto.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Todo sistema que a gente constrói pode ser white-label. Zero menção ao Sistema Britto. Você revende como se fosse seu — porque é seu.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '🏷️', title: 'Marca 100% sua', desc: 'Logo, cores, domínio, email — tudo com a identidade da sua empresa. O cliente final nunca sabe que foi a gente quem construiu.' },
                { icon: '💰', title: 'Revenda pra quem quiser', desc: 'Agências vendem automação pra clientes. Consultores vendem assistentes de IA. Empresas revendem SaaS pra franquias. A margem é sua.' },
                { icon: '🏗️', title: 'Código e infra são seus', desc: 'Roda no seu VPS, com seu domínio, seu banco de dados. Sem lock-in. Se quiser migrar amanhã, migra. Se quiser escalar, escala.' },
                { icon: '🤝', title: 'Suporte contínuo opcional', desc: 'A gente entrega e você assume. Ou fecha suporte mensal pra manutenção, atualizações e novos features. Você escolhe.' },
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

        {/* ===== STACK VISUAL ===== */}
        <section className="py-16 px-4 bg-[#111111]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-xl font-bold text-white mb-2">Stack disponível</h3>
              <p className="text-gray-500 text-sm">A gente usa o que faz sentido pro seu projeto. Nem tudo entra em todo projeto.</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                'Next.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS',
                'PostgreSQL', 'Supabase', 'Redis', 'MinIO',
                'Docker', 'Traefik', 'Cloudflare', 'GlusterFS',
                'Hermes', 'EvoNexus', 'Claude Code', 'OpenCode',
                'NVIDIA NIM', 'OpenRouter', 'n8n', 'Evolution API',
                'AbacatePay', 'Stripe', 'Asaas', 'Omie',
                'Vercel', 'Portainer',
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-[#0a0a0a]/80 px-3.5 py-2 rounded-full text-gray-300 text-xs font-medium border border-white/[0.06] hover:border-green-500/30 hover:text-green-400 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ RECEBE ===== */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que você recebe</h2>
              <p className="text-gray-400 text-lg">Um sistema completo. Não um pedaço.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '💻', title: 'Código seu, documentado', desc: 'Repositório no seu GitHub. Código limpo, tipado, documentado. Sem dívida técnica. Sem dependência de alguém que "sabe como funciona".' },
                { icon: '🌐', title: 'No seu domínio, com a sua marca', desc: 'Domínio que você escolhe. SSL automático. Identidade visual sua. White-label se quiser revender — zero menção ao Sistema Britto.' },
                { icon: '🔗', title: 'Integrações prontas', desc: 'WhatsApp, pagamento, ERP, CRM — o que seu negócio precisa pra funcionar. Cada integração é construída e testada pro seu caso.' },
                { icon: '📊', title: 'Dashboard e métricas', desc: 'Se o projeto precisa de painel, a gente constrói. Leads, vendas, conteúdo, infra — dados que você usa pra decidir.' },
                { icon: '🛡️', title: 'Infra que não cai', desc: 'VPS dedicado, Docker, backup diário, monitoramento. Se der problema, você sabe em 30 segundos — e a gente resolve.' },
                { icon: '📅', title: 'Entrega rápida + suporte', desc: 'Prazo definido na call. Sem surpresa. Primeiros 7 dias de suporte incluso. Depois, suporte mensal opcional via WhatsApp.' },
              ].map((item, i) => (
                <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5">
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
        <section className="py-24 px-4 relative overflow-hidden bg-[#111111]/50">
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-purple-500/3 to-transparent" />
          <div className="absolute top-1/2 left-1/3 max-w-[400px] max-h-[400px] w-full h-full bg-green-500/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 max-w-[300px] max-h-[300px] w-full h-full bg-purple-500/6 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Tem um projeto em mente?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Call de 30 min. Você fala, eu ouço. A gente sai com escopo e prazo. Sem compromisso.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO MEU PROJETO →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Sem compromisso. A gente conversa e você decide.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}