import React, { useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


/* ─── Network SVGs ─── */
const YoutubeLogo = () => (
  <svg viewBox="0 0 461.001 461.001" className="w-8 h-8"><path fill="#F61C0D" d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.475 148.014L196.77 280.62c-3.024 1.56-6.582-.846-6.582-4.247V184.63c0-3.402 3.558-5.808 6.582-4.247l104.012 65.213c3.024 1.56 3.024 6.934 0 8.494z"/></svg>
);

const TiktokLogo = () => (
  <svg viewBox="0 0 512 512" className="w-8 h-8"><path fill="#25F4EE" d="M412.7 52.2c-23.7-3.4-47.4-6.9-71.1-10.3-3.4-.5-6.9-1-10.3-1.5v96.3c0 53.1-43 96.1-96.1 96.1-53.1 0-96.1-43-96.1-96.1 0-53.1 43-96.1 96.1-96.1 15.3 0 29.8 3.6 42.8 10V52.2c-13.6-4.8-28.2-7.4-43.3-7.4-73.6 0-133.3 59.7-133.3 133.3S160.4 311.4 234 311.4s133.3-59.7 133.3-133.3V80.5c23.7 3.4 47.4 6.9 71.1 10.3V52.2z"/><path fill="#FE2C55" d="M367.3 148.1c-13 23.7-38.2 39.8-67 39.8-42.2 0-76.4-34.2-76.4-76.4 0-42.2 34.2-76.4 76.4-76.4 4.7 0 9.3.4 13.8 1.2V0H234C134.4 0 53.6 80.8 53.6 180.4s80.8 180.4 180.4 180.4 180.4-80.8 180.4-180.4V52.2l-47.1 95.9z"/></svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8"><defs><radialGradient id="ig1" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#fdf497"/><stop offset="0.05" stopColor="#fdf497"/><stop offset="0.45" stopColor="#fd5949"/><stop offset="0.6" stopColor="#d6249f"/><stop offset="0.9" stopColor="#285AEB"/></radialGradient></defs><rect width="40" height="40" rx="12" fill="url(#ig1)"/><rect x="3" y="3" width="34" height="34" rx="10" fill="#0a0a0a" stroke="#fff" strokeWidth="0.5"/><circle cx="20" cy="20" r="7.5" fill="none" stroke="#fff" strokeWidth="1.8"/><circle cx="29" cy="11" r="2" fill="#fff"/></svg>
);

const LinkedinLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="8" fill="#0A66C2"/><path fill="#fff" d="M16.5 19h-5v16h5V19zm-2.5-7.5a3 3 0 100 6 3 3 0 000-6zM36.5 19h-5v8c0 2.5-1 4-3.2 4-2.2 0-3.3-1.5-3.3-4v-8h-5v8.5c0 5.5 2.8 8.5 7 8.5 2.5 0 4.5-1.2 5.5-3.2V35h4.5V19h-.5z"/></svg>
);

const XLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8"><rect width="48" height="48" rx="8" fill="#000"/><path fill="#fff" d="M27.3 13.5h5.5L22.7 26.7 34.5 35h-5.8l-6.7-6.8L15 35H9.5l10.8-14.2L9 13.5h6l6 6.4 6.3-6.4zm-1.9 19.3h2L14.5 15.2h-2.2l13.1 17.6z"/></svg>
);

/* ─── Data ─── */
const NETWORKS = [
  { name: 'YouTube', desc: 'Shorts que ranqueiam sozinhos. Vídeos longos com script gerado por IA, thumbnails que clicam, SEO otimizado em cada descrição.', metric: 'Shorts + Longos', logo: YoutubeLogo },
  { name: 'TikTok', desc: 'Reels virais com trending audio. Hook nos primeiros 2 segundos. Legenda que segura a atenção até o final. Conteúdo que o algoritmo entrega de graça.', metric: 'Reels Virais', logo: TiktokLogo },
  { name: 'Instagram', desc: 'Feed curado e visual, reels diários que bombam, stories que convertem e carrosséis que educam. Sua marca bonita e presente todo santo dia.', metric: 'Feed + Reels + Stories', logo: InstagramLogo },
  { name: 'LinkedIn', desc: 'Autoridade + prospecção B2B. Posts que colocam você como referência no nicho. Textos longos que geram oportunidades e conexões de valor.', metric: 'Autoridade B2B', logo: LinkedinLogo },
  { name: 'X (Twitter)', desc: 'Threads que explodem. Opinião que vira debate e atrai seguidores. Replies estratégicas em posts virais pra roubar atenção.', metric: 'Threads + Opinião', logo: XLogo },
];

const AGENTS = [
  {
    name: 'Pixel',
    domain: 'Conteúdo',
    emoji: '✍️',
    color: '#8B5CF6',
    desc: 'Cria posts, legendas e calendário editorial. Sabe seu tom de voz de cor — e quando quebrar as regras pra engajar mais.',
    detail: 'Memória persistente do seu estilo. Nunca repete formato. Aprende o que engaja e replica. Escreve como você, só que mais rápido e todo dia. Se você curte um tom descontraído, ele mantém. Se é corporativo, ele adapta. É o agente que mais trabalha — e o que mais entrega.',
    produces: 'Posts · Legendas · Carrosséis · Legendas de Reels',
  },
  {
    name: 'Mako',
    domain: 'Marketing',
    emoji: '📈',
    color: '#3B82F6',
    desc: 'Campanhas, SEO, marca e copy estratégica. O estrategista que vê o tabuleiro inteiro antes de mover a peça.',
    detail: 'Analisa concorrentes, sugere ângulos, posiciona sua marca no ponto certo. Sabe quando é hora de vender e quando é hora de educar. Traduz métricas em ação — se um reel bombou, ele descobre por quê e replica o padrão.',
    produces: 'Campanhas · Copy de Venda · SEO · Posicionamento',
  },
  {
    name: 'Nova',
    domain: 'Produto',
    emoji: '🚀',
    color: '#10B981',
    desc: 'Posicionamento e narrativa de lançamento. Transforma feature em benefício e benefício em desejo.',
    detail: 'Sabe vender sem parecer vendedor. Constrói narrativas que fazem o cliente sentir que precisa do produto agora. Cria gatilhos mentais sutis, histórias que prendem atenção e CTAs que convertem sem agredir.',
    produces: 'Narrativas · Copy de Lançamento · Posicionamento · CTAs',
  },
  {
    name: 'Pulse',
    domain: 'Comunidade',
    emoji: '💬',
    color: '#F43F5E',
    desc: 'Engajamento, DMs e sentimento do público. O agente que nunca dorme e nunca deixa um comentário sem resposta.',
    detail: 'Responde comentários, qualifica DMs e identifica quando alguém tá pronto pra comprar. Monitora menções, responde stories e mantém a comunidade viva enquanto você dorme. É o agente mais humano da equipe.',
    produces: 'Respostas · DMs Qualificadas · Monitoramento · Relações',
  },
  {
    name: 'Orion',
    domain: 'Visual',
    emoji: '🎨',
    color: '#F97316',
    desc: 'Direção visual, paletas e identidade. Garante que cada post pareça sair do mesmo estúdio — o seu.',
    detail: 'Cria thumbnails, define paletas, sugere referências visuais e mantém a coerência do feed. Sabe que um feed bonito vende mais que um feed bagunçado. Trabalha junto com o Pixel pra cada post ter cara de marca.',
    produces: 'Thumbnails · Paletas · Referências · Identidade Visual',
  },
  {
    name: 'Flux',
    domain: 'Agendamento',
    emoji: '📅',
    color: '#06B6D4',
    desc: 'Calendário editorial inteligente. Sabe o melhor horário pra cada rede e ajusta sozinho quando o engajamento muda.',
    detail: 'Monta o calendário da semana inteira. Se um horário não performa, ele muda. Se um formato bomba, ele replica. Se o concorrente posta num horário, ele evita ou confronta. É o maestro que organiza o caos.',
    produces: 'Calendário · Horários Ótimos · Ajustes Automáticos · Pacing',
  },
];

const BENEFITS = [
  {
    icon: '🎬',
    title: 'Conteúdo todo dia sem você pensar',
    desc: 'YouTube Shorts, TikTok, Instagram Reels, LinkedIn, X — a IA cria, edita e agenda. Você aprova ou deixa no automático. São dezenas de agentes trabalhando em paralelo, cada um especialista no que faz. Você não precisa abrir o Canva, nem pensar em legenda, nem escolher horário. Tudo chega pronto pra publicar — ou publica sozinho.',
  },
  {
    icon: '🤖',
    title: 'Dezenas de agentes, cada um especialista',
    desc: 'Não é um chatbot genérico. É uma workforce com agentes de copy, vídeo, SEO, comunicação e marca. Cada agente tem memória persistente — aprende seu tom de voz, seus melhores horários, os formatos que mais engajam. Eles colaboram entre si, revisam o trabalho um do outro e entregam conteúdo que parece feito por uma equipe inteira.',
  },
  {
    icon: '📅',
    title: 'Calendário editorial que se ajusta sozinho',
    desc: 'A IA planeja a semana inteira baseada em dados, não em achismo. Se um reel bomba, ela replica o formato. Se um horário não funciona, ela muda. Se uma rede performa mais na terça, ela prioriza terça. O calendário evolui junto com seu público — sem você mexer em nada.',
  },
  {
    icon: '🎯',
    title: 'Copy que vende sem parecer vendedor',
    desc: 'Legendas que convertem. Hooks que param o scroll. CTAs que levam pro seu WhatsApp ou site. Nada de texto genérico de IA — cada legenda é construída com gatilhos mentais, narrativa e propósito. O resultado? Mais cliques, mais DMs, mais vendas — sem parecer pushy.',
  },
  {
    icon: '📊',
    title: 'O que funciona escala. O que não funciona, corta.',
    desc: 'Métricas semanais. A IA identifica o que tá engajando, qual rede priorizar e onde investir mais. Ela não só mostra dados — ela age. Se um formato caiu, ela troca. Se um tipo de post tá perdendo alcance, ela ajusta. Você recebe relatórios claros e ações automáticas, não planilhas confusas.',
  },
  {
    icon: '🛡️',
    title: '7 dias pra testar. Sem risco.',
    desc: 'Se o conteúdo não te convencer nos primeiros 7 dias, devolvemos seu investimento. Zero burocracia. Você entra, conecta suas redes e vê a máquina trabalhar. Se não gostar, sai com o dinheiro de volta. Simples assim.',
  },
];

const STEPS = [
  { num: '01', title: 'Conectamos', desc: '5 redes linkadas ao sistema em 48h. Sua conta, sua audiência, seus dados. Sem migrar nada, sem criar contas novas.' },
  { num: '02', title: 'IA cria', desc: 'Dezenas de agentes geram posts, reels, shorts e threads alinhados ao seu tom de voz. Cada um especialista no seu domínio.' },
  { num: '03', title: 'Você aprova', desc: 'Todo conteúdo passa por você antes de publicar. Ou deixa no piloto automático. Você decide o nível de controle.' },
  { num: '04', title: 'Publica e aprende', desc: 'Conteúdo vai pro ar todo dia. A IA mede o que engajou e ajusta a próxima semana. Quanto mais usa, melhor fica.' },
];

const NEXUS_IMAGES = [
  { src: 'https://openclaude.evolutionfoundation.com.br/assets/print-agents-B4xXbObQ.webp', alt: 'Painel Multi-Agentes — dezenas de agentes coordenados', label: 'Painel Multi-Agentes' },
  { src: 'https://openclaude.evolutionfoundation.com.br/assets/print-chat-DELVefMZ.webp', alt: 'Criação de Conteúdo Automática — agentes gerando posts em tempo real', label: 'Criação de Conteúdo Automática' },
  { src: 'https://openclaude.evolutionfoundation.com.br/assets/print-integrations-mcX4DEEM.webp', alt: 'Integrações — conectado com tudo que você usa', label: 'Integrações Nativas' },
];

export default function SocialJobs() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <Meta
        title="SocialJobs — Conteúdo Infinito em 5 Redes com IA — Sistema Britto"
        description="Dezenas de agentes de IA criando posts diários em YouTube, TikTok, Instagram, LinkedIn e X. Sua marca presente em todo lugar, todo dia."
        path="/socialjobs"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== LIGHTBOX ===== */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md" style={{ backgroundColor: 'rgba(0,0,0,0.92)' }} onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl transition-colors z-10">&times;</button>
            <img
              src={NEXUS_IMAGES[selectedImage].src}
              alt={NEXUS_IMAGES[selectedImage].alt}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl border border-white/10 cursor-zoom-in hover:scale-105 transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* ===== HERO — GANCHO ===== */}
        <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/8 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] max-h-[500px] w-full h-full bg-orange-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">SocialJobs</span>
            </div>

            {/* GANCHO — the hook that grabs */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Enquanto seu concorrente posta,<br />
              <span className="text-orange-400">você ainda depende de alguém...</span>
            </h1>

            {/* DOR — twist the knife */}
            <div className="max-w-2xl mx-auto mb-8 space-y-4">
              <p className="text-xl text-gray-300 leading-relaxed">
                Horas perdidas no Canva tentando deixar o feed bonito. Freelancer que atrasa a entrega e entrega fora do tom. Aquele post que você faz uma vez por semana — enquanto seu concorrente posta <span className="text-white font-semibold">todo dia</span>, em <span className="text-white font-semibold">todas as redes</span>.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                E o pior: cada dia sem postar é um dia que seu concorrente rouba sua audiência. Seus seguidores esquecem você. O algoritmo te penaliza. Sua marca fica invisível — e invisível não vende.
              </p>
            </div>

            {/* SOLUÇÃO — reveal the answer */}
            <div className="bg-[#111111]/80 border border-orange-500/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-10 backdrop-blur-sm">
              <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
                Agora imagine <span className="text-orange-400">dezenas de agentes de IA</span> que criam, editam e publicam por você — em YouTube, TikTok, Instagram, LinkedIn e X — <span className="text-orange-400">todo dia, sem parar</span>.
              </p>
              <p className="text-gray-400 text-sm mt-3">
                Não é um chatbot. É uma workforce inteira de especialistas trabalhando 24h pro seu negócio.
              </p>
            </div>

            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20SocialJobs%20para%20criar%20conteúdo%20automático%20nas%20minhas%20redes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO CONTEÚDO TODO DIA →
            </a>

            <p className="text-gray-500 text-sm mt-4">
              Sem compromisso. A gente conversa e você decide.
            </p>
          </div>
        </section>

        {/* ===== O QUE É O SOCIALJOBS ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">O que é</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que é o SocialJobs?</h2>
            </div>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                O <span className="text-white font-semibold">SocialJobs</span> é um sistema de inteligência artificial que gerencia toda a presença digital do seu negócio nas 5 principais redes sociais — <span className="text-orange-400">YouTube, TikTok, Instagram, LinkedIn e X</span>.
              </p>
              <p>
                Não é uma ferramenta de agendamento. Não é um gerador de legenda. É uma <span className="text-white font-semibold">workforce de dezenas de agentes de IA</span> — cada um especialista no seu domínio — que trabalham em conjunto pra criar conteúdo de qualidade, alinhado ao seu tom de voz, e publicar automaticamente todos os dias.
              </p>
              <p>
                Um agente cria a legenda. Outro revisa o copy. Outro escolhe o melhor horário. Outro monitora o engajamento. Outro responde comentários. Eles colaboram entre si, revisam o trabalho um do outro e entregam conteúdo que parece feito por uma equipe inteira de social media — só que trabalha 24h, nunca atrasa e nunca pede aumento.
              </p>
              <p>
                Você conecta suas redes, define seu tom de voz e aprova os posts. Ou deixa no piloto automático. <span className="text-white font-semibold">O SocialJobs faz o resto.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {[
                { value: '5', label: 'Redes Sociais' },
                { value: '24h', label: 'Funcionando' },
                { value: '∞', label: 'Conteúdo Gerado' },
                { value: '7 dias', label: 'Garantia' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0a0a0a]/80 rounded-2xl p-5 border border-white/[0.06] text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SCREENSHOTS DO NEXUS ===== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Veja a máquina trabalhando</h2>
              <p className="text-gray-400 text-lg">Aqui é real. O painel. Os agentes. As integrações. Clique pra ampliar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NEXUS_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="group relative bg-[#111111]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06] hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-64 sm:h-72 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-white font-bold text-base">{img.label}</span>
                    <p className="text-gray-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Clique para ampliar →</p>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 5 REDES ===== */}
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Redes Sociais</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">5 redes. Post diário em cada uma.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A IA cria conteúdo específico pra cada plataforma — porque o que funciona no TikTok não funciona no LinkedIn. Cada rede tem seu formato, seu tom, seu horário. E o SocialJobs sabe disso.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {NETWORKS.map((net, i) => {
                const Logo = net.logo;
                return (
                  <div
                    key={i}
                    className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-orange-500/30 transition-colors">
                        <Logo />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{net.name}</h3>
                        <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">{net.metric}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{net.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Como funciona</h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Do zero ao post publicado em 4 passos. Simples, rápido e sem complicação.
              </p>
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
        <section className="py-20 px-4 bg-[#111111]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Workforce</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Conheça os agentes por trás de cada post</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Não é um chatbot gerando texto. É uma workforce com dezenas de agentes especialistas — cada um com memória persistente, personalidade própria e skills do domínio. Eles colaboram entre si, revisam o trabalho um do outro e entregam conteúdo que parece feito por uma equipe inteira.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AGENTS.map((agent) => (
                <div
                  key={agent.name}
                  className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-0.5"
                  onMouseEnter={() => setHoveredAgent(agent.name)}
                  onMouseLeave={() => setHoveredAgent(null)}
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <svg width="44" height="44" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="22" fill={agent.color} fillOpacity="0.2" />
                        <circle cx="22" cy="22" r="22" fill="none" stroke={agent.color} strokeWidth="1.5" strokeOpacity="0.4" />
                        <text x="22" y="23" textAnchor="middle" dominantBaseline="central" fontSize="18" fill={agent.color} fontWeight="bold">{agent.name[0]}</text>
                      </svg>
                      <span className="absolute -bottom-1 -right-1 text-base">{agent.emoji}</span>
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg">{agent.name}</span>
                      <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">{agent.domain}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">{agent.desc}</p>

                  {/* Mini illustration — what this agent produces */}
                  <div className="bg-[#111111]/60 rounded-xl p-3 mb-3 border border-white/[0.04]">
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider font-bold mb-1">O que produz</div>
                    <div className="text-gray-300 text-xs leading-relaxed">{agent.produces}</div>
                  </div>

                  {/* Detail on hover */}
                  <p className={`text-gray-500 text-xs leading-relaxed transition-all duration-300 ${hoveredAgent === agent.name ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {agent.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* More agents tease */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                ...e mais dezenas de outros agentes especializados em SEO, analytics, copy de resposta, thumbnails, trending topics e muito mais.
              </p>
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ LEVA ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">O que você leva</h2>
              <p className="text-gray-400 text-lg">Resultados concretos, não promessas vagas. Cada benefício aqui é o que acontece quando dezenas de agentes trabalham pro seu negócio todo dia.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {BENEFITS.map((item, i) => (
                <div key={i} className="group bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/30 transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] max-h-[400px] w-full h-full bg-orange-500/8 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Cada dia sem postar<br />
              <span className="text-orange-400">é dinheiro que seu concorrente leva.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Seus concorrentes já automatizaram conteúdo. E você?
            </p>

            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20SocialJobs%20para%20criar%20conteúdo%20automático%20nas%20minhas%20redes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-[0.98]"
            >
              QUERO CONTEÚDO TODO DIA →
            </a>

            <p className="text-gray-500 text-sm mt-4">
              Sem compromisso. Sem contrato longo.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
