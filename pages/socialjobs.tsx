import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

const NETWORKS = [
  { icon: '📺', name: 'YouTube', desc: 'Shorts e vídeos que ranqueiam sozinhos' },
  { icon: '🎵', name: 'TikTok', desc: 'Reels virais com trending audio' },
  { icon: '📸', name: 'Instagram', desc: 'Posts, reels e stories diários' },
  { icon: '💼', name: 'LinkedIn', desc: 'Autoridade + prospecção B2B' },
  { icon: '✖️', name: 'X (Twitter)', desc: 'Threads e opinião que engaja' },
];

const AGENTS = [
  { name: 'Pixel', domain: 'Conteúdo', desc: 'Cria posts, legendas e calendário editorial' },
  { name: 'Mako', domain: 'Marketing', desc: 'Campanhas, SEO, marca e copy estratégica' },
  { name: 'Nova', domain: 'Produto', desc: 'Posicionamento e narrativa de lançamento' },
  { name: 'Pulse', domain: 'Comunidade', desc: 'Engajamento, DMs e sentimento do público' },
];

const INTEGRATIONS = ['Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'X (Twitter)', 'Notion', 'Google Workspace', 'Discord', 'Telegram', 'Canva'];

const CASES = [
  {
    antes: 'Escritório de Advocacia',
    antesDesc: 'Zero presença digital. Ninguém conhecia o escritório fora da cidade.',
    depois: 'Meses depois: dezenas de novos clientes vieram pelo LinkedIn. Autoridade construída sem esforço manual.',
  },
  {
    antes: 'Clínica Estética',
    antesDesc: 'Postava 1 vez por semana. Sem reels. Zero alcance orgânico.',
    depois: 'Conteúdo diário em 5 redes. Reels com dezenas de milhares de views. Agenda lotou.',
  },
  {
    antes: 'SaaS de Produtividade',
    antesDesc: 'Blog morto. Sem social. Usuários só vinham de ads pagos.',
    depois: 'YouTube + X como canais de aquisição. CAC caiu significativamente com conteúdo orgânico.',
  },
];

export default function SocialJobs() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setCustomerData(data);
          setFormData(data);
        } catch {}
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    const customer = { name: formData.name, email: formData.email, whatsapp: formData.whatsapp };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customer));
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customer, source: 'socialjobs-landing' }),
      });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }

    setSubmitted(true);

    setTimeout(() => {
     const qs = new URLSearchParams({
     source: 'socialjobs',
     name: customer.name || '',
     email: customer.email || '',
     whatsapp: customer.whatsapp || '',
     }).toString();
     window.location.href = `/quiz?${qs}`;
     }, 800);
  };

  return (
    <>
      <Meta
        title="SocialJobs — Conteúdo Infinito em 5 Redes com IA — Sistema Britto"
        description="Dezenas de agentes de IA criando posts diários em YouTube, TikTok, Instagram, LinkedIn e X. Sua marca presente em todo lugar, todo dia."
        path="/socialjobs"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL DE CAPTURA ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-orange-500/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🔥</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quer conteúdo todo dia nas redes?</h3>
                    <p className="text-gray-300 text-sm">Seus dados preenchem o quiz automático. Sem repetir nada.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none" required />
                    </div>
                    <PhoneInput
                      value={formData.whatsapp}
                      onChange={(v) => setFormData({...formData, whatsapp: v})}
                      accentColor="#F97316"
                    />
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black py-4 rounded-full font-bold text-lg transition-all">
                      QUERO CONTEÚDO TODO DIA →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido!</h3>
                  <p className="text-gray-300 text-sm">Redirecionando pro quiz de qualificação…</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">SocialJobs</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Sua marca em <span className="text-orange-400">5 redes</span>.<br />
              Todo dia. Sem você postar nada.
            </h1>

            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Dezenas de agentes de IA criando posts, reels, shorts e threads diários — personalizados pro seu negócio.
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              YouTube, TikTok, Instagram, LinkedIn e X — conteúdo infinito, publicado automaticamente, 7 dias por semana.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              QUERO CONTEÚDO TODO DIA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Resposta em 2 minutos. Sem compromisso.
            </p>
          </div>
        </section>

        {/* ===== 5 REDES ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">5 redes. Post diário em cada uma.</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              A IA cria, edita e publica. Você aprova ou deixa no automático.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {NETWORKS.map((net, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0a] rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all text-center"
                >
                  <div className="text-4xl mb-3">{net.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{net.name}</h3>
                  <p className="text-gray-400 text-sm">{net.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Como funciona</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Conectamos', desc: '5 redes sociais linkadas ao sistema em 48h.' },
                { step: '02', title: 'IA cria', desc: 'Dezenas de agentes geram posts, reels, shorts e threads alinhados à sua marca.' },
                { step: '03', title: 'Você aprova', desc: 'Todo conteúdo passa por você antes de publicar. Ou deixa no automático.' },
                { step: '04', title: 'Publica', desc: 'Conteúdo vai pro ar todo dia. Consistência que o algoritmo ama.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-orange-500/30 font-mono mb-4">{item.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENTES POR TRÁS ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
                Workforce
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">Agentes especializados por trás de cada post</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Não é um chatbot gerando texto. É uma workforce de IA com agentes especialistas — cada um com memória persistente e skills do domínio.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AGENTS.map((agent) => (
                <div key={agent.name} className="bg-[#0a0a0a] rounded-xl p-5 border border-orange-500/20 hover:border-orange-500/50 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-orange-400 font-bold text-lg">{agent.name}</span>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">{agent.domain}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
              Stack
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Integrado com o que você já usa</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Conectado nativamente com as redes e ferramentas do seu dia a dia.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {INTEGRATIONS.map((name) => (
                <span key={name} className="bg-[#111111] px-4 py-2 rounded-full text-gray-200 text-sm font-medium border border-white/10 hover:border-orange-500/30 transition-colors">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ LEVA ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">O que você leva</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🎬', title: 'Conteúdo diário em 5 redes', desc: 'YouTube Shorts, TikTok, Instagram Reels + Feed, LinkedIn, X — todo dia.' },
                { icon: '🤖', title: 'Dezenas de agentes de IA', desc: 'Cada agente especialista — copy, design, vídeo, legendas, hashtags.' },
                { icon: '📅', title: 'Calendário editorial automático', desc: 'IA planeja a semana inteira. Você só aprova.' },
                { icon: '🎯', title: 'Copy otimizada pra engajamento', desc: 'Legendas que convertem. CTAs que levam pro seu WhatsApp ou site.' },
                { icon: '📊', title: 'Métricas e ajuste semanal', desc: 'O que tá funcionando, o que melhorar, qual rede priorizar.' },
                { icon: '🛡️', title: '7 dias de garantia', desc: 'Se não gostar do conteúdo nos primeiros 7 dias, devolvemos seu dinheiro.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Quem já faz</h2>
            <div className="space-y-6">
              {CASES.map((c, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-8 border border-white/10">
                  <h3 className="text-white font-bold text-lg mb-4">{c.antes}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">Antes</div>
                      <p className="text-gray-400 text-sm">{c.antesDesc}</p>
                    </div>
                    <div>
                      <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">Depois</div>
                      <p className="text-gray-300 text-sm">{c.depois}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Cada dia sem presença digital<br />
              <span className="text-orange-400">é dinheiro indo embora.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Seus concorrentes já postam todo dia. E você?
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              QUERO CONTEÚDO TODO DIA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Sem compromisso. Quiz rápido e recomendação personalizada.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
