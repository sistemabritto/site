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

    const customerData = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customerData));
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customerData,
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
      const msg = encodeURIComponent(
        `Fala, Felipe. Quero saber mais sobre a Workforce de IA. Pode me chamar?\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`
      );
      window.location.href = `https://wa.me/5511914088571?text=${msg}`;
    }, 1000);
  };

  return (
    <>
      <Meta
        title="Workforce de IA — Sistema Britto"
        description="Dezenas de agentes de IA. Ou framework livre pra construir os seus. EvoNexus + Hermes."
        path="/workforce"
      />

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-purple-500/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">{'\u00D7'}</button>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{'\uD83D\uDE80'}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Peça seu braço IA</h3>
                    <p className="text-gray-300 text-sm">Preenche aí que a gente te explica como funciona.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none" required />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp *</label>
                      <input type="tel" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none" required />
                    </div>
<button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-full font-bold text-lg transition-all">
                        QUERO MEU BRAÇO →
                      </button>
                    <p className="text-gray-500 text-xs text-center">Sem spam. Promessa.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">{'\u2705'}</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido</h3>
                  <p className="text-gray-300 text-sm">Redirecionando pro WhatsApp...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Força de trabalho digital</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Você não precisa de mais ferramentas.<br />
              <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">Você precisa de mais braço.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Dezenas de agentes de IA. Cada um com uma função. Operação 24/7 sem você levantar um dedo.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Duas frentes numa só: agentes prontos com controle visual e rotinas organizadas (EvoNexus) + framework autônomo com self-healing e navegação em browser (Hermes).
            </p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
                QUERO MEU BRAÇO →
              </button>
          </div>
        </section>

        {/* ===== DUAS FRENTES ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">As duas frentes da Workforce</h2>

            {/* EvoNexus */}
            <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-purple-500/20 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-purple-400">{'\uD83D\uDD0C'}</span> EvoNexus
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Orquestração visual de dezenas de agentes com rotinas organizadas. Cada agente tem função, tom de voz e gatilho específico.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-purple-400 mt-0.5">{'\u2713'}</span>
                      Painel visual com status de cada agente
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-purple-400 mt-0.5">{'\u2713'}</span>
                      Rotinas programadas (SDR, cobrança, marketing)
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-purple-400 mt-0.5">{'\u2713'}</span>
                      Relatórios semanais automáticos
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-purple-400 mt-0.5">{'\u2713'}</span>
                      Transferência inteligente entre agentes
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
                    <p className="text-purple-400 font-bold text-lg mb-2">Resultado em 48h</p>
                    <p className="text-gray-300 text-sm">Agentes prontos. Só conectar no WhatsApp e ligar as rotinas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hermes */}
            <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-green-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-green-400">{'\uD83E\uDD16'}</span> Hermes
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Framework livre e autônomo. Self-healing: se um agente quebra, ele se recupera sozinho. Navegação em browser, terminal, arquivos, GitHub.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-green-400 mt-0.5">{'\u2713'}</span>
                      Self-healing automático (recovery sem intervenção)
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-green-400 mt-0.5">{'\u2713'}</span>
                      Navegação em browser (age como humano na web)
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-green-400 mt-0.5">{'\u2713'}</span>
                      Multi-provider: NVIDIA, OpenRouter, Anthropic, Google
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-green-400 mt-0.5">{'\u2713'}</span>
                      Cron jobs, webhooks, kanban em SQLite
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30">
                    <p className="text-green-400 font-bold text-lg mb-2">Full custom</p>
                    <p className="text-gray-300 text-sm">Framework open-source. Sem lock-in. Você controla tudo.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===== AGENTES ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Quem trabalha pra você:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '\uD83D\uDCAC', title: 'SDR de IA', desc: 'Qualifica lead, agenda, follow-up. Nunca dorme.' },
                { icon: '\uD83D\uDED2', title: 'Fechador de IA', desc: 'Tira dúvida, quebra objeção, manda link de pagamento.' },
                { icon: '\uD83D\uDCB0', title: 'Cobrador de IA', desc: 'Cobra, renegocia, recupera inadimplente.' },
                { icon: '\uD83D\uDD27', title: 'Suporte de IA', desc: 'Tira dúvida, resolve problema simples, escala pro humano.' },
                { icon: '\uD83D\uDCCA', title: 'Analista de IA', desc: 'Gera relatório, dashboard, insight.' },
                { icon: '\uD83D\uDCE2', title: 'Marketing de IA', desc: 'Cria conteúdo, dispara campanha, otimiza anúncio.' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-300 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="py-16 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Stack de tecnologia</h2>
            <p className="text-gray-400 mb-8">Tudo que roda por trás dos agentes:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Docker Swarm', 'NVIDIA API', 'Hermes Agent', 'Evolution API', 'Ghost CMS', 'Supabase', 'Vercel', 'SQLite', 'Next.js', 'Python'].map((tech, i) => (
                <span key={i} className="bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Chega de fazer tudo manual.</h2>
            <p className="text-gray-300 text-lg mb-8">EvoNexus + Hermes. Agentes prontos e framework livre. Os dois.</p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
              QUERO MEU BRAÇO →
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}