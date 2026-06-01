import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import ROICalculator from '../components/ROICalculator';
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

  return (
    <>
      <Meta 
        title="Sistema Britto — Automação de IA para seu negócio"
        description="WhatsApp com IA, DevOps e Workforce de agentes. Automatize vendas, atendimento e operações em 48 horas."
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
                      Seus dados preenchem o quiz automático. Sem repetir nada.
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
                      QUERO MEU BRAÇO →
                    </button>
                    
                    <p className="text-gray-500 text-xs text-center">Sem compromisso. Resposta em até 24h.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Dados salvos!</h3>
                  <p className="text-gray-300 text-sm">Redirecionando pro quiz de qualificação…</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-green-400 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/8 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Para donos de negócio digital</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              10% dos seus concorrentes<br />
              <span className="text-green-400">já operam com IA 24/7.</span><br />
              Sua empresa ainda faz tudo no braço?
            </h1>

            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              WhatsApp que vende sozinho. Conteúdo infinito nas redes. Infra que não cai.<br />
              Dezenas de agentes de IA trabalhando enquanto você dorme.
            </p>

            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Não é falta de esforço. <span className="text-green-400 font-semibold">É falta de braço.</span> A gente bota o braço de IA que sua empresa precisa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
              >
                QUERO MEU BRAÇO →
              </button>
              <a href="/quiz" className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/10 border border-white/10 hover:border-green-500/30">
                DESCUBRA MINHA SOLUÇÃO →
              </a>
            </div>
          </div>
        </section>

        {/* ===== 3 CAMINHOS ===== */}
        <section className="py-24 px-4" id="solucoes">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">3 caminhos. Um sistema.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Escolha o que sua empresa precisa agora. O sistema cresce com você.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* WhatsApp */}
              <div className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5 group-hover:bg-green-500/20 transition-colors">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp IA</h3>
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-3">Atende, qualifica e vende 24/7</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Seu WhatsApp vira uma máquina de vendas. A IA qualifica leads, agenda reuniões e fecha negócios — sem você digitar uma palavra.
                </p>
                <a href="/quiz?source=whatsapp" className="inline-flex items-center gap-2 text-green-400 font-semibold text-sm hover:text-green-300 transition-colors">
                  Começar agora →
                </a>
              </div>

              {/* SocialJobs */}
              <div className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">SocialJobs</h3>
                <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">Conteúdo infinito em 5 redes</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Dezenas de agentes criando posts diários em YouTube, TikTok, Instagram, LinkedIn e X. Sua marca em todo lugar, todo dia.
                </p>
                <a href="/socialjobs" className="inline-flex items-center gap-2 text-orange-400 font-semibold text-sm hover:text-orange-300 transition-colors">
                  Ver SocialJobs →
                </a>
              </div>

              {/* Sistema Completo */}
              <div className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <span className="text-3xl">🏗️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sistema Completo</h3>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">Infra própria + Orquestração</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  WhatsApp IA, SocialJobs, infra própria e dezenas de agentes coordenados por Kanban. Seu domínio. Seu código. White-label.
                </p>
                <a href="/sistema" className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-sm hover:text-[#C5A028] transition-colors">
                  Ver Sistema →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="py-24 px-4 bg-[#111111]/50">
          <div className="max-w-6xl mx-auto">
            <Services />
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quem já parou de fazer no braço</h2>
              <p className="text-gray-400 text-lg">Antes e depois de ter braço de IA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Clínica de Odontologia', 
                  before: '400 leads/mês perdendo 60% por falta de follow-up. 1 recepcionista sobrecarregada.',
                  after: 'IA qualifica, agenda e reconfirma 24/7.',
                  result: '3x mais consultas. Zero lead perdido.',
                  color: '#22C55E',
                },
                { 
                  name: 'Estúdio de Pilates', 
                  before: '3h/dia no WhatsApp marcando e remarcando aulas. Instrutor virava atendente.',
                  after: 'IA faz tudo sozinha. Aluno marca, remarca, cancela sem interação humana.',
                  result: '20h/semana economizadas.',
                  color: '#22C55E',
                },
                { 
                  name: 'Delivery', 
                  before: 'Pedidos chegavam no WhatsApp e sumiam. Cliente ligava reclamando.',
                  after: 'Do pedido ao delivery, tudo automático via IA.',
                  result: '3x mais pedidos. Mesma equipe.',
                  color: '#22C55E',
                },
              ].map((c, i) => (
                <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-4">{c.name}</h3>
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

        <ROICalculator />

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Cada dia sem automação<br />
              <span className="text-green-400">é dinheiro indo embora.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              WhatsApp IA, conteúdo infinito nas redes ou sistema completo — a gente dá braço pra sua operação.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
              >
                QUERO MEU BRAÇO →
              </button>
              <a href="/quiz" className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/10 border border-white/10 hover:border-green-500/30">
                DESCUBRA MINHA SOLUÇÃO →
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}