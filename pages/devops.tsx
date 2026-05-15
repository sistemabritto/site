import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function DevOps() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', company: '', problem: '' });
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
          source: 'devops-landing',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });
    } catch (err) {
      console.error('Lead save error', err);
    }
    
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = '/qualificacao';
    }, 1500);
  };

  return (
    <>
      <Meta 
        title="Infraestrutura e Suporte Técnico — Sistema Britto"
        description="Docker, APIs, deploy, segurança. Especialista técnico no seu WhatsApp com SLA 24h."
        path="/devops"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-[#D4AF37]/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">⚙️</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Fale com um especialista</h3>
                    <p className="text-gray-300 text-sm">Descreva seu problema. A gente responde em até 24h.</p>
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
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp *</label>
                      <input type="tel" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" required />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Empresa</label>
                      <input type="text" placeholder="Nome da empresa" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">O que tá acontecendo? *</label>
                      <textarea placeholder="Ex: Servidor derrubando, API lenta..." value={formData.problem} onChange={(e) => setFormData({...formData, problem: e.target.value})} rows={3} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none resize-none" required />
                    </div>
                    <button type="submit" disabled={!formData.email || !formData.whatsapp} className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      ENVIAR →
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido</h3>
                  <p className="text-gray-300 text-sm">Especialista responde em até 24h.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Infra + Suporte</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sua infra não pode<br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#C5A028] bg-clip-text text-transparent">depender de sorte.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Servidor cai. Deploy quebra. API fica lenta. A gente resolve em até 24h.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Especialista técnico no seu WhatsApp. Docker, APIs, segurança, troubleshooting.
            </p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25">
              PRECISO DE AJUDA →
            </button>
          </div>
        </section>

        {/* ===== DOR ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Cê tá nessa?</h2>
            <div className="space-y-4">
              {[
                { emoji: '🔥', text: 'Servidor cai em horário de pico. Cliente reclama. Você corre pra resolver.' },
                { emoji: '🐛', text: 'Deploy quebra produção. Rollback manual. Horas perdidas.' },
                { emoji: '🔓', text: 'Vulnerabilidade de segurança. Você nem sabia que existia.' },
                { emoji: '📉', text: 'API lenta. Cliente abandona. Venda perdida.' },
                { emoji: '🤯', text: 'Depende de freelancer que some quando você mais precisa.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVIÇOS ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">O que a gente resolve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🐳', title: 'Docker & Containers', desc: 'Build, deploy, orquestração. Container rodando certo, sempre.' },
                { icon: '🔌', title: 'APIs & Integrações', desc: 'Criação, documentação, monitoramento. API que não cai.' },
                { icon: '🚀', title: 'Deploy & CI/CD', desc: 'Pipeline automatizado. Deploy sem medo de quebrar.' },
                { icon: '🔒', title: 'Segurança', desc: 'Auditoria, hardening, SSL, WAF. Seu sistema protegido.' },
                { icon: '📊', title: 'Monitoramento', desc: 'Alertas em tempo real. Você sabe antes do cliente.' },
                { icon: '🛠️', title: 'Troubleshooting', desc: 'Problema? A gente resolve. SLA 24h no seu WhatsApp.' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
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
            <h2 className="text-3xl font-bold text-white mb-6">Sem palestra. Sem enrolação.</h2>
            <p className="text-gray-300 text-lg mb-8">Especialista técnico no seu WhatsApp. SLA 24h. Resolve pra você.</p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25">
              PRECISO DE AJUDA →
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
