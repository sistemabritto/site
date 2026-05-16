import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Workforce() {
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
          source: 'workforce-landing',
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
        title="Workforce de IA — Força de trabalho digital 24/7"
        description="Dezenas de agentes de IA que vendem, atendem, cobram e operam sua empresa 24/7. Não é chatbot. É braço."
        path="/workforce"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
 <div className="text-center mb-6">
 <div className="text-4xl mb-3">🚀</div>
 <h3 className="text-2xl font-bold text-white mb-2">Solicitar orçamento</h3>
 <p className="text-gray-300 text-sm">Suas respostas = qualificação personalizada. Sem repetir tudo.</p>
 </div>
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
 <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" />
 </div>
 <div>
 <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
 <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" required />
 </div>
 <div>
 <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp *</label>
 <input type="tel" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" required />
 </div>
 <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all">
 SOLICITAR ORÇAMENTO →
 </button>
 <p className="text-gray-500 text-xs text-center">Sem spam. Promessa.</p>
 </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido</h3>
                  <p className="text-gray-300 text-sm">Especialista entra em contato em até 24h.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Força de trabalho digital</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Você não precisa de mais ferramentas.<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Você precisa de mais braço.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Não é falta de esforço. É falta de braço.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Dezenas de agentes de IA. Cada um com uma função. Todos trabalhando 24 horas por dia, 7 dias por semana, respondendo clientes e escalando vendas. Sem você levantar um dedo.
            </p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25">
              SOLICITAR ORÇAMENTO →
            </button>
          </div>
        </section>

        {/* ===== PROBLEMA ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">O problema é tentar escalar operação manual em 2026.</h2>
            <div className="space-y-4">
              {[
                { emoji: '📞', text: 'Cliente manda mensagem. Ninguém responde. Ele compra do concorrente.' },
                { emoji: '💸', text: 'Venda perdida. Follow-up esquecido. Dinheiro na mesa.' },
                { emoji: '🤯', text: 'Equipe sobrecarregada. Turnover alto. Treinar gente nova o tempo todo.' },
                { emoji: '📉', text: 'Crescer significa contratar mais. Mais gente = mais problema.' },
                { emoji: '😴', text: 'Fim de semana. Feriado. Noite. Sua operação para quando você para.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENTES ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Quem trabalha pra você:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '💬', title: 'SDR de IA', desc: 'Qualifica lead, agenda, follow-up. Nunca dorme.' },
                { icon: '🛒', title: 'Fechador de IA', desc: 'Tira dúvida, quebra objeção, manda link de pagamento.' },
                { icon: '💰', title: 'Cobrador de IA', desc: 'Cobra, renegocia, recupera inadimplente. Sem constrangimento.' },
                { icon: '🔧', title: 'Suporte de IA', desc: 'Tira dúvida, resolve problema simples, escala pro humano quando necessário. Cliente nunca fica sem resposta.' },
                { icon: '📊', title: 'Analista de IA', desc: 'Gera relatório, dashboard, insight. Você sabe o que tá acontecendo.' },
                { icon: '📢', title: 'Marketing de IA', desc: 'Cria conteúdo, dispara campanha, otimiza anúncio. Escala sem aumentar equipe.' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-300 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Chega de virar refém da própria operação.</h2>
            <p className="text-gray-300 text-lg mb-8">Dezenas de agentes de IA. Um time inteiro que trabalha 24/7. Você foca em crescer. A gente cuida do resto.</p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25">
              SOLICITAR ORÇAMENTO →
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
