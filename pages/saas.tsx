import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import { useState } from 'react';

export default function SaaS() {
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
          source: 'saas-landing',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }
    
  setSubmitted(true);
  
  // Vai pra página de resultado
  setTimeout(() => {
    sessionStorage.setItem('qualificacao_customer', JSON.stringify(formData));
    sessionStorage.setItem('qualificacao_answers', JSON.stringify({ produto: 'saas' }));
    window.location.href = '/resultado-digital';
  }, 1000);
};

  return (
    <>
      <Meta 
        title="SaaS Sob Encomenda — Do zero ao faturamento"
        description="Criamos seu SaaS do MVP ao produto final. Infra própria, escala, faturamento desde o primeiro mês."
        path="/saas"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-pink-500/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
 <div className="text-center mb-6">
 <div className="text-4xl mb-3">🎙️</div>
 <h3 className="text-2xl font-bold text-white mb-2">Falar com especialista</h3>
 <p className="text-gray-300 text-sm">Sua ideia. Nosso time. Produto no ar em 30 dias.</p>
 </div>
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
 <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none" />
 </div>
 <div>
 <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
 <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none" required />
 </div>
 <PhoneInput value={formData.whatsapp} onChange={(v) => setFormData({...formData, whatsapp: v})} accentColor="#EC4899" required />
 <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-black py-4 rounded-full font-bold text-lg transition-all">
 FALAR COM ESPECIALISTA →
 </button>
 <p className="text-gray-500 text-xs text-center">Sem spam. Promessa.</p>
 </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido</h3>
                  <p className="text-gray-300 text-sm">Especialista entra em contato em até 24h.</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-pink-400 h-full rounded-full" style={{ width: '100%', animation: 'progressBar 1.5s ease-in-out' }}></div>
                  </div>
                  <style jsx>{`
                    @keyframes progressBar {
                      from { width: 0%; }
                      to { width: 100%; }
                    }
                  `}</style>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              <span className="text-pink-400 text-xs font-bold uppercase tracking-wider">Sob encomenda</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Você tem a ideia.<br />
              <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">A gente constrói o SaaS.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Do MVP ao produto final. Infra própria, pagamentos recorrentes, escala. Faturamento desde o primeiro mês.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Não é falta de esforço. É falta de braço. A gente constrói seu SaaS em 30 dias. Você foca em vender.
            </p>
<button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-pink-500/25">
FALAR COM ESPECIALISTA →
</button>
</div>
</section>
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">O problema é tentar construir SaaS sem time técnico.</h2>
            <div className="space-y-4">
              {[
                { emoji: '💡', text: 'Ideia clara. Sem time pra executar. Freelancer some. Prazo estoura.' },
                { emoji: '💸', text: 'Orçamento inicial vira o dobro. Prazo de 3 meses vira 12. Você trava.' },
                { emoji: '🤯', text: 'Você é o especialista do negócio. Não de código. Mas tem que gerenciar dev.' },
                { emoji: '📉', text: 'Concorrente lança primeiro. Você perde o timing. O mercado não espera.' },
                { emoji: '🔧', text: 'Produto pronto. Infra quebra. Escala não segura. Cliente reclama.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SOLUÇÃO ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Como a gente resolve:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🚀', title: 'MVP em 30 dias', desc: 'Do zero ao produto no ar. Valida rápido, itera, escala.' },
                { icon: '💰', title: 'Pagamentos recorrentes', desc: 'Assinatura, cobrança, upsell. Tudo integrado.' },
                { icon: '📈', title: 'Escala sob demanda', desc: 'Infra que cresce com você. Sem travar. Sem downtime.' },
                { icon: '🔒', title: 'Infra própria', desc: 'Seu código. Seu servidor. Seu controle. Zero lock-in.' },
                { icon: '📊', title: 'Dashboard completo', desc: 'Vendas, churn, LTV. Você sabe tudo o que acontece.' },
                { icon: '🛠️', title: 'Suporte técnico', desc: 'Equipe dedicada. SLA 24h. Problema resolvido rápido.' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-pink-500/20">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-300 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASE ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Quem já fez com a gente:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111111] rounded-2xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-2">SaaS de Áudio</div>
                <p className="text-gray-300 text-sm mb-4">
                  Do zero ao faturamento em 30 dias.
                  Infra própria, pagamentos recorrentes, escala.
                </p>
                <div className="text-white text-sm">
                  <strong className="text-pink-400">Resultado:</strong> Faturamento desde o primeiro mês. 50% de margem.
                </div>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-2">Infra para Escritório</div>
                <p className="text-gray-300 text-sm mb-4">
                  Infraestrutura completa. 
                  Servidor próprio, backup, segurança, zero downtime.
                </p>
                <div className="text-white text-sm">
                  <strong className="text-pink-400">Resultado:</strong> Zero queda. Zero reclamação. Escala imediata.
                </div>
              </div>
            </div>
          </div>
        </section>

 {/* ===== CTA ===== */}
<section className="py-20 px-4 bg-[#111111]">
<div className="max-w-3xl mx-auto text-center">
<h2 className="text-3xl font-bold text-white mb-6">Chega de adiar seu SaaS por falta de braço técnico.</h2>
<p className="text-gray-300 text-lg mb-8">Você traz a ideia. A gente constrói, opera e escala. Produto no ar em 30 dias.</p>
<button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-pink-500/25">
FALAR COM ESPECIALISTA →
</button>
</div>
</section>

{/* ===== LINK CRUZADO DevOps ===== */}
<section className="py-12 px-4 bg-[#0a0a0a] border-t border-[#D4AF37]/20">
<div className="max-w-3xl mx-auto text-center">
<p className="text-gray-400 text-sm mb-4">Já tem produto e precisa de infra?</p>
<a href="/devops" className="text-[#D4AF37] hover:text-[#C5A028] font-semibold text-lg">
  Conheça Infraestrutura e DevOps →
</a>
</div>
</section>

        <Footer />
      </main>
    </>
  );
}
