import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import SDRPreview from '../components/SDRPreview';
import { useState, useEffect } from 'react';

export default function Home() {
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
const [submitted, setSubmitted] = useState(false);
const [heroVariant, setHeroVariant] = useState<'default' | 'whatsapp' | 'socialjobs' | 'sistema'>('default');

// ── UTM Routing: reordena produtos e adapta hero por origem ──
useEffect(() => {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || params.get('source') || '';
  if (source === 'whatsapp' || source === 'crm') setHeroVariant('whatsapp');
  else if (source === 'socialjobs' || source === 'social') setHeroVariant('socialjobs');
  else if (source === 'sistema' || source === 'custom') setHeroVariant('sistema');
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.whatsapp) return;
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(formData));
    }
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'home-modal',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }
    
    setSubmitted(true);
    
    setTimeout(() => {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(formData));
      window.location.href = '/quiz';
    }, 1000);
  };

  const products = [
    {
      id: 'whatsapp',
      name: 'WhatsApp com IA',
      icon: '💬',
      gradient: 'from-green-500/20 to-emerald-600/20',
      border: 'border-green-500/30',
      borderHover: 'hover:border-green-500/50',
      badge: 'Vendas & Atendimento',
      title: 'Seu WhatsApp como central comercial',
      problem: 'Lead entra e morre sem resposta. Cliente espera, desiste e vai pro concorrente.',
      solution: 'IA que qualifica, agenda, vende e reativa — 24h, sem folga.',
      features: [
        'Qualifica leads 24h com IA',
        'Agenda automático de consultas',
        'Funil completo no WhatsApp + CRM',
        'Reativa leads dormentes',
        'Multi-atendentes com IA assistida',
      ],
      cta: 'Ver WhatsApp com IA →',
      href: '/whatsapp',
    },
    {
      id: 'socialjobs',
      name: 'SocialJobs',
      icon: '🔥',
      gradient: 'from-orange-500/20 to-amber-600/20',
      border: 'border-orange-500/30',
      borderHover: 'hover:border-orange-500/50',
      badge: 'Conteúdo Infinito',
      title: 'Sua marca em 5 redes, todo dia',
      problem: 'Postagem uma vez por semana — se der tempo. Conteúdo genérico que ninguém vê.',
      solution: 'Dezenas de agentes criando posts, reels e shorts personalizados — publicação diária automática.',
      features: [
        'Conteúdo diário em YouTube, TikTok, Instagram, LinkedIn e X',
        'Dezenas de agentes especialistas por domínio',
        'Calendário editorial automático',
        'Copy otimizada pra engajamento',
        'Aprova ou deixa no automático',
      ],
      cta: 'Ver SocialJobs →',
      href: '/socialjobs',
    },
    {
      id: 'sistema',
      name: 'Sistema Sob Medida',
      icon: '⚡',
      gradient: 'from-[#D4AF37]/20 to-amber-700/20',
      border: 'border-[#D4AF37]/30',
      borderHover: 'hover:border-[#D4AF37]/50',
      badge: 'Sob Medida',
      title: 'A solução web que seu negócio precisa',
      problem: 'SaaS, loja virtual, assistente, funil — cada negócio precisa de algo diferente.',
      solution: 'Eu construo do zero com a marca do cliente, no domínio dele. White-label. Código próprio.',
      features: [
        'SaaS, loja virtual, assistente IA, funil de vendas',
        'Marca do cliente, domínio do cliente, código do cliente',
        'White-label pra revender se quiser',
        'Integração com pagamentos, ERP, CRM',
        'Setup em 48h, sem contrato longo',
      ],
      cta: 'Ver Sistema Sob Medida →',
      href: '/sistema',
    },
  ];

  const realReviews = [
	{ 
		name: 'Waldemar Ramos', 
		date: '9 meses atrás',
		photo: 'https://lh3.googleusercontent.com/a-/ALV-UjXKNlCwle8oZ1TFwZL6nbY9AVcjbkKOVVEP_wRAwWQBCnwcgfGMrQ=s1920-c-rp-mo-br100',
		stars: 5,
		text: 'Profissional Top. Entregou no prazo com um preço bem justo. Foi muito prestativo e sanou todas as minhas dúvidas. Recomendadíssimo!!!',
	},
	{ 
		name: 'João Fernandes Athayde', 
		date: '1 ano atrás',
		photo: 'https://lh3.googleusercontent.com/a-/ALV-UjWZaI9eKWU2eh2bZaL6s7WC1XlCPrbM4cQNR64I_4P5ZEg1fnE=s1920-c-rp-mo-br100',
		stars: 5,
		text: 'Comprometimento!! Muito bom...',
	},
	{ 
		name: 'Thiago Rathge', 
		date: '1 ano atrás',
		photo: 'https://lh3.googleusercontent.com/a-/ALV-UjXSz0Ys7fdNq4auTuDoVTbNvunhaYwAwxrWPHQuU2EJlkZjkK19=s1920-c-rp-mo-br100',
		stars: 5,
		text: 'Meu amigo, o cara manda bem demais mesmo! Super engraçado e excelente profissional. Super recomendo a todos!',
	},
 ];

 const cases = [
    { 
      name: 'Dr. Ricardo', 
      role: 'Clínica de Odontologia — SP',
      avatar: '👨‍⚕️',
      stars: 5,
      before: '400 leads/mês perdendo 60% por falta de follow-up. 1 recepcionista sobrecarregada.',
      after: 'IA qualifica, agenda e reconfirma 24h.',
      result: '3x mais consultas agendadas. Zero lead perdido.',
    },
    { 
      name: 'Ana Paula', 
      role: 'Estúdio de Pilates — RJ',
      avatar: '🧘‍♀️',
      stars: 5,
      before: '3h/dia no WhatsApp marcando e remarcando aulas. Instrutor virava atendente.',
      after: 'IA faz tudo sozinha. Aluno marca, remarca, cancela sem interação humana.',
      result: '20h/semana economizadas. Alunos mais satisfeitos.',
    },
    { 
      name: 'Marcos', 
      role: 'Delivery — MG',
      avatar: '🛵',
      stars: 5,
      before: 'Pedidos chegavam no WhatsApp e sumiam. Cliente ligava reclamando.',
      after: 'Do pedido ao delivery, tudo automático via IA.',
      result: '3x mais pedidos processados. Mesma equipe.',
    },
  ];

  return (
    <>
    <Meta 
      title="Sistema Britto — Automação de IA para seu negócio"
      description="WhatsApp com IA, conteúdo automático nas redes e sistemas web sob medida. Automatize vendas, atendimento e operações em 48 horas."
      path="/"
    />
    
    <Navbar />
    
    <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

      {/* ===== MODAL CAPTURA ===== */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative shadow-2xl shadow-green-500/10">
            {!submitted ? (
              <>
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
                >&times;</button>
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1.5 mb-4">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Sistema Britto</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sua empresa ainda faz tudo no braço?</h3>
                  </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none backdrop-blur-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none backdrop-blur-sm transition-colors"
                      required
                    />
                  </div>
                  <PhoneInput
                    value={formData.whatsapp}
                    onChange={(v) => setFormData({...formData, whatsapp: v})}
                    accentColor="#22C55E"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    CONSTRUA SEUS ESPECIALISTAS →
                  </button>
                  
                  <p className="text-gray-500 text-xs text-center">Sem compromisso. Resposta em até 24h.</p>
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

      {/* ===== HERO — GANCHO + DOR + SOLUÇÃO ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/8 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] max-h-[600px] w-full h-full bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Para donos de negócio digital</span>
          </div>

          {/* GANCHO */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          22% dos seus concorrentes<br />
          <span className="text-green-400">já operam com IA 24h.</span><br />
          E você, ainda faz tudo no braço?
          </h1>

          {/* DOR — twist the knife */}
          <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <p className="text-xl text-gray-300 leading-relaxed">
          Postagem uma vez por semana, quando dá tempo. Quando chega alguém no WhatsApp, a conversa acaba em ghosting... Enquanto isso, seu concorrente já tem <span className="text-white font-semibold">IA atendendo, vendendo e criando conteúdo</span> enquanto ele dorme.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
          E ainda assim, só metade dos empresários que "usam IA" no Brasil saíram do básico. O resto improvisa e paga caro por isso.
          </p>
          </div>

          {/* SOLUÇÃO */}
          <div className="bg-[#111111]/80 border border-green-500/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-10 backdrop-blur-sm">
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
            Já pensou em ter <span className="text-green-400">dezenas de especialistas</span> trabalhando 24h por você. WhatsApp que vende sozinho. Conteúdo diário nas redes sociais. <span className="text-green-400">Pagando menos de um salário mínimo?</span>
            </p>
            <p className="text-gray-400 text-sm mt-3">
            Seu problema não é falta de esforço. É falta de braço. E os braços chegaram.
            </p>
          </div>

          {/* CTA ÚNICO */}
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
          >
            CONSTRUA SEUS ESPECIALISTAS →
          </button>
        </div>
      </section>

      {/* ===== SDR PREVIEW — prova visual do agente ===== */}
      <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
      <div className="text-center mb-10">
      <span className="inline-block text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30 px-4 py-2 rounded-full bg-[#D4AF37]/10">
      Seu especialista 24h
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
      Assim que seu lead manda &quot;oi&quot;...
      </h2>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">
      A IA já qualifica, responde e avança o funil. Sem esperar, sem perder.
      </p>
      </div>
      <SDRPreview />
      </div>
      </section>

      {/* ===== 3 CAMINHOS — seção unificada ===== */}
      <section className="py-24 sm:py-32 px-4" id="solucoes">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30 px-4 py-2 rounded-full bg-[#D4AF37]/10">
              O que a gente faz
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Mão de obra de IA<br />
              <span className="text-[#D4AF37]">do atendimento ao deploy</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Três caminhos. Uma operação. Comece por um e expanda quando quiser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.href}
                className="group relative"
              >
                <div className={`h-full bg-black/80 rounded-3xl p-8 border border-white/15 ${product.borderHover} hover:bg-black/90 transition-all duration-300 hover:-translate-y-2 shadow-2xl`}>
                  {/* Gradient glow */}
                  <div className={`absolute -inset-px bg-gradient-to-r ${product.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} border ${product.border}`}>
                        <span className="text-2xl">{product.icon}</span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-[#D4AF37]/10">
                        {product.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {product.title}
                    </h3>

                    {/* Problem */}
                    <p className="text-red-400 text-sm font-medium mb-3">
                      {product.problem}
                    </p>

                    {/* Solution */}
                    <p className="text-green-400 text-sm font-medium mb-6">
                      {product.solution}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                          <span className="text-[#D4AF37] mt-0.5 flex-shrink-0">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group-hover:gap-3 transition-all duration-300">
                      {product.cta}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS REAIS — Google Reviews ===== */}
      <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quem usa, <span className="text-green-400">recomenda</span></h2>
      <p className="text-gray-400 text-lg">Avaliações reais do Google.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {realReviews.map((r, i) => (
      <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
      {/* Avatar + Nome + Estrelas */}
      <div className="flex items-center gap-3 mb-4">
      <img 
      src={r.photo} 
      alt={r.name}
      className="w-10 h-10 rounded-full object-cover border border-white/10"
      />
      <div>
      <h3 className="text-white font-bold text-sm">{r.name}</h3>
      <p className="text-gray-500 text-xs">{r.date}</p>
      </div>
      </div>
      <div className="flex gap-0.5 mb-4">
      {Array.from({ length: r.stars }).map((_, s) => (
      <span key={s} className="text-yellow-400 text-sm">★</span>
      ))}
      </div>

      <p className="text-gray-300 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
      </div>
      <div className="border-t border-green-500/20 px-6 py-3 bg-green-500/5">
      <a href="https://www.google.com/maps/place/Workflow+API+Studio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 text-xs font-semibold hover:underline">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      Ver no Google
      </a>
      </div>
      </div>
      ))}
      </div>
      </div>
      </section>

      {/* ===== CTA FINAL — único botão ===== */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] max-h-[400px] w-full h-full bg-green-500/5 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Cada dia sem automação<br />
            <span className="text-green-400">é dinheiro indo embora.</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            WhatsApp IA, conteúdo infinito nas redes ou sistema sob medida — a gente dá braço pra sua operação.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
          >
            CONSTRUA SEUS ESPECIALISTAS →
          </button>
        </div>
      </section>

      {/* ===== JORNADA — ESCOLHA POR ONDE COMEÇAR ===== */}
      <section className="py-24 px-4 bg-[#111111]/30">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
      <span className="inline-block text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30 px-4 py-2 rounded-full bg-[#D4AF37]/10">
      Escolha por onde começar
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
      Seu momento é único. Comece de onde dói mais.
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
      Cada caminho resolve um gargalo. Eles se combinam quando você quiser.
      </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* Card 1 — SocialJobs */}
      <a
      href="https://wa.me/5511914088571?text=Olá!%20Quero%20minha%20operação%20de%20conteúdo%20com%20IA"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#0a0a0a]/80 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
      <span className="text-2xl">🔥</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
      Quero atrair mais clientes
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
      Conteúdo diário, calendário editorial, publicação em 5 redes. Consistência que alimenta tráfego orgânico e pago.
      </p>
      <div className="flex items-center gap-2 text-orange-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
      Ver SocialJobs
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
      </a>

      {/* Card 2 — WhatsApp IA */}
      <a
      href="https://wa.me/5511914088571?text=Olá!%20Quero%20ativar%20meu%20WhatsApp%20com%20inteligência%20artificial"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#0a0a0a]/80 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
      <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
      <span className="text-2xl">💬</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
      Quero responder leads mais rápido
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
      IA que qualifica, agenda e vende 24h. Zero lead perdido por demora. CRM + WhatsApp integrado.
      </p>
      <div className="flex items-center gap-2 text-green-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
      Ver WhatsApp com IA
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
      </a>

      {/* Card 3 — Sistema Sob Medida */}
      <a
      href="https://wa.me/5511914088571?text=Olá!%20Quero%20construir%20um%20sistema%20web%20sob%20medida"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#0a0a0a]/80 border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
      <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
      <span className="text-2xl">⚡</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors">
      Quero construir um sistema próprio
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
      SaaS, funis, assistentes IA, integrações. Código do cliente, marca do cliente, sem vendor lock-in.
      </p>
      <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group-hover:gap-3 transition-all duration-300">
      Ver Sistema Sob Medida
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
      </a>

      {/* Card 4 — VPS */}
      <a
      href="https://wa.me/5511914088571?text=Olá!%20Quero%20hospedar%20minha%20operação%20em%20VPS%20estruturada"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#0a0a0a]/80 border border-white/[0.08] rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
      <span className="text-2xl">🖥️</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors">
      Quero hospedar minha operação
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
      VPS configurada, SSL automático, backup diário, monitoramento. Você dirige, a gente cuida da infra.
      </p>
      <div className="flex items-center gap-2 text-gray-300 font-bold text-sm group-hover:gap-3 group-hover:text-white transition-all duration-300">
      Ver VPS Estruturada
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
      </a>

      {/* Card 5 — ZapClub */}
      <a
      href="https://wa.me/5511914088571?text=Olá!%20Quero%20entrar%20no%20ZapClub%20para%20aprender%20IA%20com%20suporte"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#0a0a0a]/80 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
      <span className="text-2xl">🎓</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
      Quero aprender IA com suporte
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
      Comunidade para aplicar IA na prática. Progressão por níveis, suporte direto e implementação guiada.
      </p>
      <div className="flex items-center gap-2 text-purple-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
      Ver ZapClub
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
      </a>
      </div>
      </div>
      </section>

      {/* ===== HOME VITRINE — mini preview do SocialJobs em operação ===== */}
      <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
      <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
      <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">SocialJobs em operação</span>
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
      Este site é operado pelo mesmo sistema que vendemos
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
      A Sistema Britto é o primeiro cliente do SocialJobs. Todo conteúdo, posts e campanhas que você vê aqui saem da mesma plataforma que usamos para operar nossos clientes.
      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Mockup 1 — Calendário */}
      <div className="bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
      <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-4">Calendário editorial</div>
      <div className="space-y-2">
      {[
      { day: 'Seg', status: '✓', title: 'Post LinkedIn: IA no atendimento' },
      { day: 'Ter', status: '✓', title: 'Reel Instagram: 3 erros...' },
      { day: 'Qua', status: '→', title: 'Carrossel: Como começar...' },
      { day: 'Qui', status: '○', title: 'Thread X: O futuro do...' },
      { day: 'Sex', status: '○', title: 'YouTube Short: Automatize...' },
      ].map((item, i) => (
      <div key={i} className="flex items-center gap-3 bg-[#0a0a0a]/60 rounded-lg p-2.5">
      <span className={`text-xs font-bold w-8 ${
      item.status === '✓' ? 'text-green-400' : item.status === '→' ? 'text-orange-400' : 'text-gray-600'
      }`}>{item.status}</span>
      <div className="flex-1 min-w-0">
      <div className="text-white text-xs font-semibold truncate">{item.title}</div>
      <div className="text-gray-600 text-[10px]">{item.day}</div>
      </div>
      </div>
      ))}
      </div>
      </div>

      {/* Mockup 2 — Métricas */}
      <div className="bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
      <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-4">Métricas da semana</div>
      <div className="grid grid-cols-2 gap-3">
      {[
      { label: 'Posts publicados', value: '24', color: 'text-orange-400' },
      { label: 'Redes ativas', value: '5', color: 'text-orange-400' },
      { label: 'Alcance', value: '12%', color: 'text-green-400', suffix: '↑' },
      { label: 'Engajamento', value: '4,2%', color: 'text-green-400', suffix: '↑' },
      ].map((m, i) => (
      <div key={i} className="bg-[#0a0a0a]/60 rounded-lg p-3">
      <div className={`text-xl font-bold ${m.color}`}>{m.value}{m.suffix || ''}</div>
      <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">{m.label}</div>
      </div>
      ))}
      </div>
      </div>

      {/* Mockup 3 — Pipeline visual */}
      <div className="bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
      <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-4">Pipeline de conteúdo</div>
      <div className="space-y-2.5">
      {[
      { step: 'Ideia', active: false },
      { step: 'Rascunho', active: false },
      { step: 'Revisão', active: false },
      { step: '✓ Aprovado', active: true },
      { step: '→ Agendado', active: true },
      ].map((s, i) => (
      <div key={i} className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.active ? 'bg-orange-400' : 'bg-gray-700'}`} />
      <span className={`text-xs ${s.active ? 'text-white font-semibold' : 'text-gray-500'}`}>{s.step}</span>
      </div>
      ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/[0.06]">
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Próximo a publicar</div>
      <div className="text-white text-xs font-semibold truncate">Automação na prática: case real...</div>
      <div className="text-gray-500 text-[10px]">YT · IG · TK · LI — amanhã 09h</div>
      </div>
      </div>
      </div>
      </div>

      <div className="text-center mt-8">
      <p className="text-gray-500 text-sm mb-4">
      Não é demo. Não é GIF. É a operação real da Sistema Britto rodando no SocialJobs.
      </p>
      <a
      href="https://wa.me/5511914088571?text=Olá!%20Quero%20minha%20operação%20de%20conteúdo%20com%20IA"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105"
      >
      Quero minha operação de conteúdo →
      </a>
      </div>
      </div>
      </section>

      {/* ===== DEPOIMENTOS REAIS — Google Reviews ===== */}
      <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quem usa, <span className="text-green-400">recomenda</span></h2>
      <p className="text-gray-400 text-lg">Avaliações reais do Google.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {realReviews.map((r, i) => (
      <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
      {/* Avatar + Nome + Estrelas */}
      <div className="flex items-center gap-3 mb-4">
      <img
      src={r.photo}
      alt={r.name}
      className="w-10 h-10 rounded-full object-cover border border-white/10"
      />
      <div>
      <h3 className="text-white font-bold text-sm">{r.name}</h3>
      <p className="text-gray-500 text-xs">{r.date}</p>
      </div>
      </div>
      <div className="flex gap-0.5 mb-4">
      {Array.from({ length: r.stars }).map((_, s) => (
      <span key={s} className="text-yellow-400 text-sm">★</span>
      ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
      </div>
      <div className="border-t border-green-500/20 px-6 py-3 bg-green-500/5">
      <a href="https://www.google.com/maps/place/Workflow+API+Studio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 text-xs font-semibold hover:underline">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      Ver no Google
      </a>
      </div>
      </div>
      ))}
      </div>
      </div>
      </section>

      {/* ===== CTA FINAL — único botão ===== */}
      <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] max-h-[400px] w-full h-full bg-green-500/5 rounded-full blur-[100px]" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
      Cada dia sem automação<br />
      <span className="text-green-400">é dinheiro indo embora.</span>
      </h2>
      <p className="text-gray-300 text-lg mb-8">
      WhatsApp IA, conteúdo infinito nas redes ou sistema sob medida — a gente dá braço pra sua operação.
      </p>
      <button
      onClick={() => setShowModal(true)}
      className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
      >
      CONSTRUA SEUS ESPECIALISTAS →
      </button>
      </div>
      </section>

      <Footer />
      </main>
      </>
      );
      }