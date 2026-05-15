import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
      window.location.href = '/qualificacao';
    }, 1500);
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

        {/* ===== MODAL ORÇAMENTO ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
              {!submitted ? (
                <>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                  >×</button>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Orçamento em Tempo Real</h3>
                    <p className="text-gray-300 text-sm">Seus dados = qualificação personalizada. Sem repetir depois.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.email || !formData.whatsapp}
                      className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      SOLICITAR ORÇAMENTO →
                    </button>
                    
                    <p className="text-gray-500 text-xs text-center">Sem compromisso. Resposta em até 24h.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Dados salvos!</h3>
                  <p className="text-gray-300 text-sm">Te redirecionando pra qualificação...</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Vagas Limitadas</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Seu concorrente já usa<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">IA pra operar 24/7.</span><br />
              Você ainda faz tudo manual.
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Enquanto você dorme, 47 leads mandaram mensagem. Amanhã, 30 vão pro concorrente.
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              Não é falta de esforço. É falta de escala. A gente resolve isso em 48 horas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                ORÇAMENTO EM TEMPO REAL →
              </button>
              <a href="/workforce" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                Ver soluções
              </a>
            </div>
          </div>
        </section>

        {/* ===== SERVIÇOS ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">3 soluções. 1 problema: escala.</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Escolha por onde começar. Todas se conectam.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* WhatsApp + IA */}
              <a href="/whatsapp" className="group bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">💬</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">WhatsApp + IA</h3>
                <p className="text-gray-300 mb-6">Seu WhatsApp vira máquina de vendas. IA qualifica, agenda, cobra e fecha 24/7. Sem você levantar um dedo.</p>
                <div className="text-green-400 font-semibold">A partir de R$ 297/mês →</div>
              </a>

              {/* DevOps + Suporte */}
              <a href="/workforce" className="group bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">⚙️</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">DevOps + Suporte</h3>
                <p className="text-gray-300 mb-6">Infra, Docker, APIs, deploy, segurança. Especialista técnico no seu WhatsApp com SLA 24h. Resolve pra você.</p>
                <div className="text-green-400 font-semibold">Solicitar orçamento →</div>
              </a>

              {/* Workforce */}
              <a href="/workforce" className="group bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">🏭</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Workforce de IA</h3>
                <p className="text-gray-300 mb-6">38 agentes especializados. Vendas, atendimento, finanças, projetos — tudo automatizado e integrado.</p>
                <div className="text-green-400 font-semibold">Solicitar orçamento →</div>
              </a>
            </div>
          </div>
        </section>

        {/* ===== ESTEIRA ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Como funciona</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Você solicita orçamento</h3>
                  <p className="text-gray-300">Preenche nome, email e WhatsApp. Sem compromisso.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Faz a qualificação</h3>
                  <p className="text-gray-300">4 perguntas rápidas. Descobrimos o plano ideal pro seu negócio.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebe o plano personalizado</h3>
                  <p className="text-gray-300">Com preço, prazo e escopo. Se aprovar, começa em 48h.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Sua operação escala</h3>
                  <p className="text-gray-300">IA trabalhando 24/7. Você foca no que importa: crescer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Resultados reais</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Empresas que já usam nossas soluções.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Clínica OdontoLife', result: '3x mais consultas', desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma.' },
                { name: 'Studio Pilates', result: '20h/semana economizadas', desc: 'Antes 3h/dia no WhatsApp. Hoje a IA faz tudo sozinha.' },
                { name: 'Delivery Pizzaria', result: '3x mais pedidos', desc: 'Do pedido ao delivery, tudo automático. Mesma equipe.' },
              ].map((c, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-green-500/20 text-center">
                  <div className="text-green-400 text-2xl font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-gray-300 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Cada dia sem automação<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">é dinheiro indo embora.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Para de perder tempo. Comece agora.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                ORÇAMENTO EM TEMPO REAL →
              </button>
              <a href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                Ver WhatsApp + IA
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
