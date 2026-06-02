import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);

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
      solution: 'IA que qualifica, agenda, vende e reativa — 24/7, sem folga.',
      features: [
        'Qualifica leads 24/7 com IA',
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

  const cases = [
    { 
      name: 'Dr. Ricardo', 
      role: 'Clínica de Odontologia — SP',
      avatar: '👨‍⚕️',
      stars: 5,
      before: '400 leads/mês perdendo 60% por falta de follow-up. 1 recepcionista sobrecarregada.',
      after: 'IA qualifica, agenda e reconfirma 24/7.',
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
                  <p className="text-gray-400 text-sm">
                    Seus dados preenchem automaticamente. Sem repetir nada.
                  </p>
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
                    QUERO MEUS BRAÇOS →
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
            10% dos seus concorrentes<br />
            <span className="text-green-400">já operam com IA 24/7.</span><br />
            Sua empresa ainda faz tudo no braço?
          </h1>

          {/* DOR — twist the knife */}
          <div className="max-w-2xl mx-auto mb-8 space-y-4">
            <p className="text-xl text-gray-300 leading-relaxed">
              Postagem uma vez por semana, quando dá tempo. Quando chega alguém no WhatsApp, a conversa acaba em ghosting... Enquanto isso, seu concorrente já tem <span className="text-white font-semibold">IA atendendo, vendendo e criando conteúdo</span> enquanto ele dorme.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
              Cada dia sem IA é uma oportunidade pro seu concorrente. Uma oportunidade que podia ser sua. Uma hora recuperada que poderia virar lucro, mas vira apagamento de incêndio.
            </p>
          </div>

          {/* SOLUÇÃO */}
          <div className="bg-[#111111]/80 border border-green-500/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-10 backdrop-blur-sm">
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
            Já pensou em ter <span className="text-green-400">dezenas de especialistas</span> trabalhando 24/7 por você. WhatsApp que vende sozinho. Conteúdo diário nas redes sociais. <span className="text-green-400">Pagando menos de um salário mínimo?</span>
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
            QUERO MEUS BRAÇOS →
          </button>
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

      {/* ===== CASES — depoimentos realistas ===== */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quem já parou de fazer no braço</h2>
            <p className="text-gray-400 text-lg">Antes e depois de ter braço de IA.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="p-6">
                  {/* Avatar + Nome + Estrelas */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-lg">
                      {c.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{c.name}</h3>
                      <p className="text-gray-500 text-xs">{c.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: c.stars }).map((_, s) => (
                      <span key={s} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                      <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Antes</div>
                      <p className="text-gray-400 text-sm leading-relaxed">{c.before}</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                      <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Depois</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{c.after}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-green-500/20 px-6 py-4 bg-green-500/5">
                  <p className="text-green-400 font-bold text-sm">{c.result}</p>
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
            QUERO MEUS BRAÇOS →
          </button>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}