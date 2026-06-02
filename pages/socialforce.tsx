import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

const NETWORKS = [
  { icon: '📺', name: 'YouTube', desc: 'Shorts e vídeos que ranqueiam' },
  { icon: '🎵', name: 'TikTok', desc: 'Reels virais com trending audio' },
  { icon: '📸', name: 'Instagram', desc: 'Posts, reels e stories diários' },
  { icon: '💼', name: 'LinkedIn', desc: 'Autoridade + prospecção B2B' },
  { icon: '✖️', name: 'X (Twitter)', desc: 'Threads e opinião que engaja' },
];

const CASES = [
  {
    antes: 'Escritório de Advocacia',
    antesDesc: 'Zero presença digital. Ninguém conhecia o escritório fora da cidade.',
    depois: '3 meses depois: 40% dos novos clientes vieram pelo LinkedIn. Autoridade construída sem esforço manual.',
  },
  {
    antes: 'Clínica Estética',
    antesDesc: 'Postava 1 vez por semana. Sem reels. Zero alcance orgânico.',
    depois: 'Conteúdo diário em 5 redes. Reels com 50K+ views. Agenda lotou em 2 meses.',
  },
  {
    antes: 'SaaS de Produtividade',
    antesDesc: 'Blog morto. Sem social. Usuários só vinham de ads pagos.',
    depois: 'YouTube + X como canais de aquisição. CAC caiu 60% com conteúdo orgânico.',
  },
];

export default function SocialForce() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try { setCustomerData(JSON.parse(stored)); } catch {}
      }
    }
  }, []);

  const handleSDR = () => {
  const NL = '%0A';
  const msg = encodeURIComponent(
  `🟠 *Lead SocialJobs*${NL}${NL}` +
  `———${NL}` +
  `👤 ${customerData.name || '—'}${NL}` +
  `📧 ${customerData.email || '—'}${NL}` +
  `📱 ${customerData.whatsapp || '—'}`
  );
  window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
  };

  return (
    <>
      <Meta
        title="Social Force — Conteúdo Infinito em 5 Redes — Sistema Britto"
        description="Dezenas de agentes de IA criando posts diários em YouTube, TikTok, Instagram, LinkedIn e X. Sua marca presente em todo lugar."
        path="/socialforce"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== HERO ===== */}
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Social Force</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Sua marca em <span className="text-orange-400">5 redes</span>.<br />
              Todo dia. Sem você postar nada.
            </h1>

            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Dezenas de agentes de IA criando posts, reels, shorts e threads diários.
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              YouTube, TikTok, Instagram, LinkedIn e X — conteúdo infinito, publicado automaticamente, 7 dias por semana.
            </p>

            <button
              onClick={handleSDR}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              FALAR COM SDR →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Nosso SDR qualifica seu perfil e monta o plano ideal. Sem compromisso.
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
              onClick={handleSDR}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              FALAR COM SDR →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Sem compromisso. Nosso SDR entende seu negócio e monta o plano ideal.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}