import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

const NETWORKS = [
  { icon: '📺', name: 'YouTube', desc: 'Shorts que ranqueiam sozinhos. Vídeos longos com script gerado por IA.', metric: 'Shorts + Longos' },
  { icon: '🎵', name: 'TikTok', desc: 'Reels virais com trending audio. Hook nos primeiros 2 segundos.', metric: 'Reels Virais' },
  { icon: '📸', name: 'Instagram', desc: 'Feed curado, reels diários e stories que convertem.', metric: 'Feed + Reels + Stories' },
  { icon: '💼', name: 'LinkedIn', desc: 'Autoridade + prospecção B2B. Posts que colocam você como referência.', metric: 'Autoridade B2B' },
  { icon: '✖️', name: 'X (Twitter)', desc: 'Threads que explodem. Opinião que vira debate e atrai seguidores.', metric: 'Threads + Opinião' },
];

const AGENTS = [
  { name: 'Pixel', domain: 'Conteúdo', desc: 'Cria posts, legendas e calendário editorial. Sabe seu tom de voz de cor.', detail: 'Memória persistente do seu estilo. Nunca repete formato. Aprende o que engaja e replica.' },
  { name: 'Mako', domain: 'Marketing', desc: 'Campanhas, SEO, marca e copy estratégica.', detail: 'Analisa concorrentes, sugere ângulos, posiciona sua marca no ponto certo.' },
  { name: 'Nova', domain: 'Produto', desc: 'Posicionamento e narrativa de lançamento.', detail: 'Transforma feature em benefício. Sabe vender sem parecer vendedor.' },
  { name: 'Pulse', domain: 'Comunidade', desc: 'Engajamento, DMs e sentimento do público.', detail: 'Responde comentários, qualifica DMs e identifica quando alguém tá pronto pra comprar.' },
];

const INTEGRATIONS = ['Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'X (Twitter)', 'WhatsApp', 'Stripe', 'Linear', 'GitHub', 'Todoist'];

const BENEFITS = [
  { icon: '🎬', title: 'Conteúdo todo dia sem você pensar', desc: 'YouTube Shorts, TikTok, Instagram Reels, LinkedIn, X — a IA cria, edita e agenda. Você aprova ou deixa no automático.' },
  { icon: '🤖', title: 'Dezenas de agentes, cada um especialista', desc: 'Não é um chatbot genérico. É uma workforce com agentes de copy, vídeo, SEO, comunicação e marca.' },
  { icon: '📅', title: 'Calendário editorial que se ajusta sozinho', desc: 'A IA planeja a semana inteira. Se um reel bomba, ela replica o formato. Se um horário não funciona, ela muda.' },
  { icon: '🎯', title: 'Copy que vende sem parecer vendedor', desc: 'Legendas que convertem. Hooks que param o scroll. CTAs que levam pro seu WhatsApp ou site.' },
  { icon: '📊', title: 'O que funciona escala. O que não funciona, corta.', desc: 'Métricas semanais. A IA identifica o que tá engajando, qual rede priorizar e onde investir mais.' },
  { icon: '🛡️', title: '7 dias pra testar. Sem risco.', desc: 'Se o conteúdo não te convencer nos primeiros 7 dias, devolvemos seu investimento. Zero burocracia.' },
];

const STEPS = [
  { num: '01', title: 'Conectamos', desc: '5 redes linkadas ao sistema em 48h. Sua conta, sua audiência, seus dados.' },
  { num: '02', title: 'IA cria', desc: 'Dezenas de agentes geram posts, reels, shorts e threads alinhados ao seu tom de voz.' },
  { num: '03', title: 'Você aprova', desc: 'Todo conteúdo passa por você antes de publicar. Ou deixa no piloto automático.' },
  { num: '04', title: 'Publica e aprende', desc: 'Conteúdo vai pro ar todo dia. A IA mede o que engajou e ajusta a próxima semana.' },
];

const NEXUS_IMAGES = [
  { src: 'https://openclaude.evolutionfoundation.com.br/assets/print-agents-B4xXbObQ.webp', alt: 'Painel Multi-Agentes — dezenas de agentes coordenados', label: 'Painel Multi-Agentes' },
  { src: 'https://openclaude.evolutionfoundation.com.br/assets/print-chat-DELVefMZ.webp', alt: 'Chat IA — agentes respondendo em tempo real', label: 'Chat IA em Tempo Real' },
  { src: 'https://openclaude.evolutionfoundation.com.br/assets/print-integrations-mcX4DEEM.webp', alt: 'Integrações — conectado com tudo que você usa', label: 'Integrações Nativas' },
];

export default function SocialJobs() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-orange-500/30 relative shadow-2xl shadow-orange-500/10">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors">&times;</button>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1.5 mb-4">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                      <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">SocialJobs</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Seu conteúdo nunca mais para</h3>
                    <p className="text-gray-400 text-sm">Seus dados preenchem o quiz automático. Sem repetir nada.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none backdrop-blur-sm transition-colors" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none backdrop-blur-sm transition-colors" required />
                    </div>
                    <PhoneInput
                      value={formData.whatsapp}
                      onChange={(v) => setFormData({...formData, whatsapp: v})}
                      accentColor="#F97316"
                    />
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
                      QUERO CONTEÚDO TODO DIA →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🔥</div>
                  <h3 className="text-xl font-bold text-white mb-2">Bora criar conteúdo!</h3>
                  <p className="text-gray-300 text-sm">Redirecionando pro quiz de qualificação…</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== LIGHTBOX ===== */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md" style={{ backgroundColor: 'rgba(0,0,0,0.92)' }} onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl transition-colors z-10">&times;</button>
            <img src={NEXUS_IMAGES[selectedImage].src} alt={NEXUS_IMAGES[selectedImage].alt} className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()} />
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/8 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">SocialJobs</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Enquanto seu concorrente posta,<br />
              <span className="text-orange-400">você ainda depende de alguém...</span>
            </h1>

            <p className="text-xl text-gray-300 mb-3 max-w-2xl mx-auto leading-relaxed">
              Dezenas de agentes de IA criando posts, reels, shorts e threads diários — personalizados pro seu negócio.
            </p>
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
              YouTube, TikTok, Instagram, LinkedIn e X — conteúdo infinito, publicado automaticamente, 7 dias por semana.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO CONTEÚDO TODO DIA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz rápido. Sem compromisso. Resposta em 2 minutos.
            </p>
          </div>
        </section>

        {/* ===== SCREENSHOTS DO NEXUS ===== */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {NEXUS_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="group relative bg-[#111111]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06] hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-bold text-sm">{img.label}</span>
                    <p className="text-gray-400 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Clique para ampliar</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 5 REDES ===== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">5 redes. Post diário em cada uma.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A IA cria, edita e publica. Você aprova ou deixa no automático.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {NETWORKS.map((net, i) => (
                <div
                  key={i}
                  className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{net.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{net.name}</h3>
                  <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">{net.metric}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{net.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Como funciona</h2>
              <p className="text-gray-400 text-lg">Do zero ao post publicado em 4 passos.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0" />
              {STEPS.map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-orange-500/60 font-mono">{item.num}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENTES POR TRÁS ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Workforce</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Agentes especializados por trás de cada post</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Não é um chatbot gerando texto. É uma workforce com agentes especialistas — cada um com memória persistente e skills do domínio.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AGENTS.map((agent) => (
                <div
                  key={agent.name}
                  className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-0.5"
                  onMouseEnter={() => setHoveredAgent(agent.name)}
                  onMouseLeave={() => setHoveredAgent(null)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-sm">{agent.name[0]}</span>
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg">{agent.name}</span>
                      <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">{agent.domain}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{agent.desc}</p>
                  <p className={`text-gray-500 text-xs leading-relaxed transition-all duration-300 ${hoveredAgent === agent.name ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {agent.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Stack</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Conectado com o que você usa</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Integração nativa com as redes e ferramentas do seu dia a dia.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {INTEGRATIONS.map((name) => (
                <span key={name} className="bg-[#0a0a0a]/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-gray-200 text-sm font-medium border border-white/[0.06] hover:border-orange-500/30 hover:text-orange-300 transition-all duration-200">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ LEVA ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que você leva</h2>
              <p className="text-gray-400 text-lg">Resultados concretos, não promessas vagas.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {BENEFITS.map((item, i) => (
                <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/30 transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Cada dia sem postar<br />
              <span className="text-orange-400">é dinheiro que seu concorrente leva.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Seus concorrentes já automatizaram conteúdo. E você?
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO CONTEÚDO TODO DIA →
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Quiz rápido. Sem compromisso. Sem contrato longo.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}