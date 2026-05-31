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
      window.location.href = '/qualificacao-digital';
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
              {!submitted ? (
                <>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                  >×</button>
                  
<div className="text-center mb-6">
 <div className="text-4xl mb-3">⚡</div>
 <h3 className="text-2xl font-bold text-white mb-2">Sua empresa ainda faz tudo no braço?</h3>
 <p className="text-gray-300 text-sm">
   Seu email = diagnóstico em 2 minutos. Sem repetir nada.
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
                    <PhoneInput
                    value={formData.whatsapp}
                    onChange={(v) => setFormData({...formData, whatsapp: v})}
                    accentColor="#22C55E"
                    required
                    />

<button
                      type="submit"
                      className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all"
                    >
                      QUERO MEU BRAÇO →
                    </button>
                    
                    <p className="text-gray-500 text-xs text-center">Sem compromisso. Resposta em até 24h.</p>
                  </form>
                </>
              ) : (
              <div className="text-center py-8">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-2">Dados salvos com sucesso!</h3>
              <p className="text-gray-300 text-sm">Te redirecionando pro checkout seguro...</p>
              <p className="text-gray-500 text-xs mt-2">Aguarde, não feche esta janela.</p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
              <div className="bg-green-400 h-full rounded-full" style={{ width: '100%', animation: 'progressBar 1.5s ease-in-out' }}></div>
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
 <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
 <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Para donos de negócio digital</span>
            </div>
 <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
  <strong className="text-green-400">10% dos seus concorrentes</strong><br />
  <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">já operam com IA 24/7.</span><br />
  Sua empresa ainda faz tudo no braço?
  </h1>
  <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
  Servidor cai, deploy quebra, lead morre no WhatsApp. Você perde hora com problema técnico enquanto eles faturam sem levantar um dedo.
  </p>
<p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
 <strong className="text-green-400">Não é falta de esforço. É falta de braço.</strong> A gente bota dezenas de agentes de IA pra trabalhar 24/7 por você. Setup em 48h. Resultado em 7 dias.
</p>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                QUERO MEU BRAÇO →
              </button>
              <a href="/quiz-infra" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                PRECISO DE BRAÇO →
              </a>
</div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="solucoes" className="py-24 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <Services />
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Você não precisa de cases genéricos.</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Você precisa saber o que acontece antes e depois de ter braço de IA.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Clínica de Odontologia', 
                  before: '400 leads/mês perdendo 60% por falta de follow-up. 1 recepcionista sobrecarregada.',
                  after: 'IA qualifica, agenda e reconfirma 24/7.',
                  result: '1.200 leads/mês • 3x mais consultas • zero lead perdido'
                },
                { 
                  name: 'Estúdio de Pilates', 
                  before: '3h/dia no WhatsApp marcando e remarcando aulas. Instrutor virava atendente.',
                  after: 'IA faz tudo sozinha. Aluno marca, remarca, cancela sem interação humana.',
                  result: '20h/semana economizadas • sem erro de agenda'
                },
                { 
                  name: 'Delivery', 
                  before: 'Pedidos chegavam no WhatsApp e sumiam. Cliente ligava reclamando. Equipe no limite.',
                  after: 'Do pedido ao delivery, tudo automático via IA. Cliente recebe atualização em tempo real.',
                  result: '3x mais pedidos • mesma equipe • NPS subiu 40pts'
                },
              ].map((c, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 text-left hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Antes</div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{c.before}</p>
                  <div className="text-xs text-green-400 uppercase tracking-wider mb-2 font-semibold">Depois</div>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{c.after}</p>
                  <div className="border-t border-green-500/20 pt-3 mt-2">
                    <div className="text-green-400 text-lg font-bold">{c.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ROICalculator />

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Cada dia sem automação<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">é dinheiro indo embora.</span>
</h2>
<p className="text-gray-300 text-lg mb-8">
Do WhatsApp ao SaaS. A gente dá braço pra sua operação.
</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                QUERO MEU BRAÇO →
              </button>
              <a href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                WHATSAPP + IA →
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}