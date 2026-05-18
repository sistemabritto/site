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
 <h3 className="text-2xl font-bold text-white mb-2">Fala com a gente</h3>
 <p className="text-gray-300 text-sm">
 Preenche aí que a gente te explica como funciona.
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
                      className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all"
                    >
                      FALAR COM ESPECIALISTA →
                    </button>
                    
                    <p className="text-gray-500 text-xs text-center">Sem compromisso. Resposta em até 24h.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Dados salvos!</h3>
                  <p className="text-gray-300 text-sm">Te redirecionando...</p>
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

 {/* VSL Placeholder */}
 <div className="max-w-2xl mx-auto mb-10">
 <a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }} className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-green-500/20 hover:border-green-500/50 transition-all duration-300">
 <img 
 src="/images/vsl-thumbnail.jpg" 
 alt="Clique para assistir" 
 className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
 />
 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="flex flex-col items-center gap-2 rounded-xl bg-green-500/60 px-6 py-4 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-sm group-hover:scale-105 transition-all duration-300 animate-pulse">
 <p className="text-sm font-bold text-black">▶ Seu vídeo já começou</p>
 <p className="text-xs text-black/70">Clique para assistir</p>
 </div>
 </div>
 </a>
 <p className="text-gray-500 text-xs text-center mt-2">2 min • Felipe Britto explica como funciona</p>
 </div>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <button 
  onClick={() => setShowModal(true)}
  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25"
  >
  QUERO MEU BRAÇO DE IA →
  </button>
<a href="/quiz-infra" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
  PRECISO DE INFRA OU SAAS →
</a>
</div>
          </div>
        </section>

        {/* ===== SERVIÇOS ===== */}
        <section id="solucoes" className="py-24 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">3 soluções. 1 problema: falta de braço.</h2>
<p className="text-gray-400 text-center mb-16 text-lg">Do atendimento ao código. Da infra ao SaaS. A gente dá braço pra sua operação.</p>

            {/* DEGRAU 1 */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">PRIMEIRO PASSO</span>
                <span className="text-gray-400 text-sm">Comece por aqui</span>
              </div>
              <a href="/whatsapp" className="group block bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl mb-4">💬</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">CRM com IA no WhatsApp</h3>
                    <p className="text-gray-300 mb-4">Lead manda mensagem, ninguém responde. Venda se perde no follow-up. Equipe sobrecarregada.</p>
                    <p className="text-gray-300 mb-4">IA qualifica, agenda, cobra e fecha 24/7. CRM integrado. Zero trabalho manual.</p>
                    <p className="text-green-400 font-semibold">A partir de R$ 297/mês</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                      <p className="text-red-400 text-sm font-semibold mb-1">Custo de oportunidade</p>
                      <p className="text-gray-300 text-sm">Cada lead não respondido = R$ 50-500 perdido. 30 leads/dia = <strong className="text-white">R$ 45k/mês no lixo</strong>.</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <p className="text-green-400 text-sm font-semibold mb-1">Benefício imediato</p>
                      <p className="text-gray-300 text-sm">3x mais conversões em 14 dias. Equipe foca no que importa.</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* DEGRAU 2: INFRAESTRUTURA & SAAS (unificado) */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gradient-to-r from-[#D4AF37] to-pink-500 text-black px-3 py-1 rounded-full text-xs font-bold">INFRA & SAAS</span>
                <span className="text-gray-400 text-sm">Sob medida</span>
              </div>
              <a href="/quiz-infra" className="group block bg-gradient-to-br from-[#D4AF37]/10 to-pink-500/10 rounded-3xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl mb-4">🔧</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">Infraestrutura & Produto Próprio</h3>
                    <p className="text-gray-300 mb-4">Sua operação cresceu. O servidor cai, o deploy quebra, a API fica lenta. Ou você tem uma ideia de SaaS e não sabe por onde começar. Nos dois casos, é falta de braço técnico.</p>
                    <p className="text-gray-300 mb-4">Especialista no WhatsApp com SLA 24h. Docker, deploy, segurança, APIs. Ou do zero ao MVP em 30 dias. Você foca no negócio, a gente constrói.</p>
                    <p className="text-[#D4AF37] font-semibold">Solicitar orçamento</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                      <p className="text-red-400 text-sm font-semibold mb-1">Custo de oportunidade</p>
                      <p className="text-gray-300 text-sm">Cada hora sua resolvendo problema técnico ou tentando contratar dev = hora que não vende. <strong className="text-white">R$ 200-500/hora perdida</strong>.</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#D4AF37]/10 to-pink-500/10 border border-[#D4AF37]/20 rounded-xl p-4">
                      <p className="text-[#D4AF37] text-sm font-semibold mb-1">Resultado real</p>
                      <p className="text-gray-300 text-sm">Zero downtime + R$ 900 em tokens gerando R$ 5.000 de faturamento. Produto próprio no ar em 30 dias.</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* DEGRAU 3 */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">WORKFORCE COMPLETA</span>
                <span className="text-gray-400 text-sm">Operação completa</span>
              </div>
              <a href="/quiz-workforce" className="group block bg-black/80 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl mb-4">🏭</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Workforce de IA</h3>
                    <p className="text-gray-300 mb-4">Você precisa de mais braços, não de mais ferramentas. Vendas, atendimento, finanças, projetos — tudo manual.</p>
                    <p className="text-gray-300 mb-4">38 agentes de IA especializados. Cada um com uma função. Todos integrados. Operação 24/7 sem você levantar um dedo.</p>
                    <p className="text-purple-400 font-semibold">Solicitar orçamento</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                      <p className="text-red-400 text-sm font-semibold mb-1">Custo de oportunidade</p>
                      <p className="text-gray-300 text-sm">Cada processo manual = gargalo. <strong className="text-white">R$ 10k-50k/mês em eficiência perdida</strong>.</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                      <p className="text-purple-400 text-sm font-semibold mb-1">Benefício imediato</p>
                      <p className="text-gray-300 text-sm">47 leads qualificados, 23 consultas agendadas, R$ 12k cobrados — toda segunda-feira.</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Resultados reais</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Empresas que já usam nossas soluções.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Clínica OdontoLife', result: '3x mais consultas', desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma.' },
                { name: 'Studio Pilates', result: '20h/semana economizadas', desc: 'Antes 3h/dia no WhatsApp. Hoje a IA faz tudo sozinha.' },
                { name: 'Delivery Pizzaria', result: '3x mais pedidos', desc: 'Do pedido ao delivery, tudo automático. Mesma equipe.' },
              ].map((c, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 text-center">
                  <div className="text-green-400 text-2xl font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-gray-300 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
