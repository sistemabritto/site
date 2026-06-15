import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ZapClub() {
 return (
  <>
  <Meta
   title="ZapClub — Comunidade de IA para Negócios no WhatsApp | Sistema Britto"
   description="Comunidade no WhatsApp com moderador de IA 24h. Pare de fazer tudo sozinho. R$ 50/mês, 7 dias de garantia."
   path="/zapclub"
  />

  <Navbar />

  <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

  {/* ===== HERO ===== */}
  <section className="relative pt-32 pb-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-[#0a0a0a] to-[#0a0a0a]" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] max-h-[600px] w-full h-full bg-[#7C3AED]/8 rounded-full blur-3xl" />

  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
  10% dos seus concorrentes<br />
  <span className="bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">já operam com IA 24h. E você ainda não sabe por onde começar?</span>
  </h1>

  <p className="text-neutral-200 text-lg max-w-2xl mx-auto font-medium mb-4">
  O medo de implementar errado e perder dinheiro trava mais que a falta de informação. O ZapClub é uma comunidade mão na massa, com moderação ativa 24h, que te tira de cima do muro e te coloca pra executar. Com orientação e o suporte do grupo.
  </p>
  <p className="text-lg text-neutral-300 mb-8 max-w-xl mx-auto">
  Em vez de passar meses pesquisando, você passa minutos aplicando o que já funciona.
  </p>

  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <a
   href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
   target="_blank"
   rel="noopener noreferrer"
   className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
  >
   QUERO FAZER PARTE
  </a>
  </div>

  <p className="text-neutral-400 text-sm mt-4">R$ 50/mês · 7 dias de garantia</p>
  </div>
  </section>

  {/* ===== A DOR ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Você conhece essa sensação</h2>

  <div className="space-y-8">
  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">😰</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Você faz tudo sozinho</h3>
  <p className="text-neutral-200">Dono, gestor, operador, financeiro. E agora tem que entender IA também? Não tem braço, não tem tempo, e o medo de errar trava tudo.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">🧊</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Paralisia por medo de errar</h3>
  <p className="text-neutral-200">Sabe que IA existe. Sabe que precisa. Mas não sabe por onde começar. E se implementar errado? E se jogar dinheiro fora? Enquanto isso, o concorrente já atende cliente com IA.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">📼</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Curso gravado que não vira ação</h3>
  <p className="text-neutral-200">Assiste 10h de vídeo, anota tudo, e na segunda-feira não aplica nada. Vídeo passivo não substitui quem responde sua dúvida na hora.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">🗑️</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Ferramenta que ninguém usa</h3>
  <p className="text-neutral-200">Paga por IA, deixa largada porque ninguém na equipe sabe como usar. Todo mês, dinheiro no lixo. E a insegurança só cresce.</p>
  </div>
  </div>
  </div>
  </div>
  </section>

  {/* ===== O CUSTO DE ESPERAR ===== */}
  <section className="py-16 px-4 bg-[#0a0a0a]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Todo dia sem IA é um dia de vantagem pro concorrente</h2>
  <p className="text-neutral-300 text-lg text-center mb-12 max-w-3xl mx-auto">
  É fato, não achismo. Cada dia que você espera, alguém avança.
  </p>

  <div className="grid md:grid-cols-3 gap-6 mb-12">
  {[
  { metric: '75%', label: 'das empresas que demorarem a adotar IA vão perder mercado até 2027. Fonte: analistas do setor.' },
  { metric: 'R$ 1,4 tri', label: 'é quanto o Brasil pode perder em produtividade até 2030 se ficar pra trás em IA. Estudos do MIT e FGV.' },
  { metric: '60%', label: 'dos empresários temem mais implementar errado que o custo da ferramenta. Pesquisa Gartner.' },
  ].map((item, i) => (
  <div key={i} className="bg-[#111111] p-6 rounded-xl border border-[#7C3AED]/20">
   <p className="text-4xl font-bold text-[#A78BFA] mb-2">{item.metric}</p>
   <p className="text-neutral-300 text-sm leading-relaxed">{item.label}</p>
  </div>
  ))}
  </div>

  <p className="text-neutral-200 text-lg text-center max-w-3xl mx-auto">
  IA não é mais luxo de grande empresa. É o fôlego que o empresário pequeno precisa pra escalar pagando menos e indo mais longe. Quem não entra agora, paga depois. Em margem, em cliente, em posição.
  </p>

  {/* ===== SISTEMA DE PROGRESSÃO (ELOS) ===== */}
  <div className="mt-16">
  <div className="text-center mb-4">
  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  Sistema de Progressão
  </span>
  </div>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Um caminho claro pra ter controle e segurança</h2>
  <p className="text-neutral-300 text-lg text-center mb-14 max-w-3xl mx-auto">
  Cada elo destrava o próximo. Você só avança quando faz na prática com o seu negócio de verdade. O moderador valida. A comunidade acompanha.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
  {/* COBRE */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#CD7F32]/50 hover:border-[#CD7F32] transition-all duration-300 hover:-translate-y-2">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#CD7F32] text-black">Cobre</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#CD7F32]/10 border border-[#CD7F32]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">🔶</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Conquistador de Tokens</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Entende tokens, limites e quotas. Faz a IA funcionar na primeira tentativa sem gastar à toa.
  </p>
  <div className="mt-3 pt-3 border-t border-[#CD7F32]/20">
  <span className="text-[#CD7F32] text-xs font-bold">Task: Enviar 1 prompt funcional para caso real do seu negócio</span>
  </div>
  </div>

  {/* PRATA */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#A8B4C0]/50 hover:border-[#C0C0C0] transition-all duration-300 hover:-translate-y-2">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#C0C0C0] text-black">Prata</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">🥈</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Triangulador de Modelos</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Sabe qual modelo usar para cada tarefa. Compara GPT, Claude, Gemini. Economiza custos, ganha resultado.
  </p>
  <div className="mt-3 pt-3 border-t border-[#A8B4C0]/20">
  <span className="text-[#C0C0C0] text-xs font-bold">Task: Implementar 1 automação no negócio e mostrar resultado</span>
  </div>
  </div>

  {/* OURO */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#F5D061]/50 hover:border-[#F5D061] transition-all duration-300 hover:-translate-y-2">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#F5D061] text-black">Ouro</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#F5D061]/10 border border-[#F5D061]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">🥇</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Manipulador de Ferramentas e Integrações</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Usa ferramentas que a IA não tem nativamente. Busca na web, executa código, conecta dados externos.
  </p>
  <div className="mt-3 pt-3 border-t border-[#F5D061]/20">
  <span className="text-[#F5D061] text-xs font-bold">Task: Montar assistente de negócio e usar 3x em situações reais</span>
  </div>
  </div>

  {/* PLATINA */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#E0E0E0]/50 hover:border-[#E0E0E0] transition-all duration-300 hover:-translate-y-2">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#E0E0E0] text-black">Platina</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#E0E0E0]/10 border border-[#E0E0E0]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">💎</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Desenvolvedor de Skills</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Cria prompts reutilizáveis, templates e fluxos customizados para o SEU negócio. Não depende mais de prompting genérico.
  </p>
  <div className="mt-3 pt-3 border-t border-[#E0E0E0]/20">
  <span className="text-[#E0E0E0] text-xs font-bold">Task: Criar 1 skill/template reutilizável para o seu negócio</span>
  </div>
  </div>

  {/* DIAMANTE */}
  <div className="relative bg-gradient-to-b from-[#111111] to-[#7C3AED]/10 rounded-2xl p-5 border-2 border-[#7DD3FC]/60 hover:border-[#7DD3FC] transition-all duration-300 hover:-translate-y-2">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#7DD3FC] text-black animate-pulse">Diamante</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#7DD3FC]/10 border border-[#7DD3FC]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">👑</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Maestro de Rotinas</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Monta workflows que rodam sozinhos. IA operando enquanto você dorme. O negócio que não precisa de você o tempo todo.
  </p>
  <div className="mt-3 pt-3 border-t border-[#7DD3FC]/20">
  <span className="text-[#7DD3FC] text-xs font-bold">Task: 3 processos rodando em IA, medir resultado financeiro</span>
  </div>
  </div>
  </div>
  </div>
  </div>
  </section>

  {/* ===== O QUE É ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <div className="text-center mb-12">
  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  O remédio pra insegurança
  </span>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
  O ZapClub não é um curso
  </h2>
  </div>

  {/* Foto da comunidade — rounded landscape */}
  <div className="flex justify-center mb-8">
  <img
   src="/zapclub-community.webp"
   alt="Comunidade ZapClub"
   className="w-full max-w-[600px] rounded-3xl object-cover border-2 border-[#7C3AED]/40"
   loading="lazy"
  />
  </div>

  <p className="text-[#A78BFA] text-xl font-bold text-center mb-6">É uma comunidade no Zap.</p>

  <p className="text-neutral-200 text-lg leading-relaxed mb-6">
  É um grupo no WhatsApp com outros empresários aplicando IA nos negócios deles, e um moderador de IA disponível 24h. Ele guia passo a passo, responde na hora, adapta ao seu contexto. Não deixa você errar sozinho.
  </p>
  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  Você não assiste vídeo e torce pra dar certo na segunda. Você pergunta, testa, ajusta. Se travar, tem o moderador e a comunidade pra segurar. Fazer tudo sozinho acaba quando você entra num lugar onde ninguém tá sózinho.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {[
  { icon: '🤖', label: 'Moderador de IA 24h tirando dúvida e orientando' },
  { icon: '🎙️', label: 'Mande áudio, receba orientação na hora' },
  { icon: '🤝', label: 'Comunidade de empresários que já aplicam IA' },
  { icon: '🔧', label: 'Prática no seu negócio, não teoria genérica' },
  { icon: '📊', label: 'Avaliação por nível até dominar o conteúdo' },
  { icon: '⏱️', label: 'Avança no seu ritmo, sem pressão' },
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3 bg-[#0a0a0a] rounded-xl p-4 border border-[#7C3AED]/20">
  <span className="text-2xl">{item.icon}</span>
  <span className="text-neutral-200 text-sm font-medium">{item.label}</span>
  </div>
  ))}
  </div>
  </div>
  </section>

  {/* ===== PRA QUEM É ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Pra quem é o ZapClub</h2>
  <p className="text-neutral-200 text-lg text-center mb-12 max-w-3xl mx-auto">
  Se você dá conta de tudo sozinho, sente que falta braço, e sabe que IA é o caminho mas tem medo de errar, esse espaço é seu.
  </p>

  <div className="space-y-4 mb-16">
  {[
  'Tem medo de implementar IA errado e perder dinheiro',
  'Dá conta de tudo sozinho e sabe que não dá pra continuar assim',
  'Já tentou usar IA, travou na implementação e deixou pra lá',
  'Falta braço pra tocar a operação direito',
  'Quer dominar a base pra não ser enganado por agência ou dev',
  'Sabe que cada dia sem IA é um dia que o concorrente ganha',
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3">
  <span className="text-[#22C55E] text-lg">✓</span>
  <span className="text-neutral-200">{item}</span>
  </div>
  ))}
  </div>

  <div className="bg-[#111111] rounded-2xl p-8 border border-red-500/20 max-w-2xl mx-auto">
  <h3 className="text-white text-xl font-bold mb-3">Pra quem não é</h3>
  <p className="text-neutral-300 mb-6">
  Esse não é um mapa da mina nem um passe de mágica. Se você busca atalho sem esforço, esse lugar não é pra você.
  </p>
  <div className="space-y-3">
  {[
  'Quem quer que a IA resolva tudo sozinha, sem entender o que tá rolando',
  'Quem não tá disposto a testar, errar e ajustar na prática',
  'Quem acha que vídeo gravado substitui acompanhamento e comunidade',
  'Quem acha que "não precisa de IA" e vai esperar o mercado virar',
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3">
  <span className="text-red-400 text-lg">✗</span>
  <span className="text-neutral-300 text-sm">{item}</span>
  </div>
  ))}
  </div>
  </div>
  </div>
  </section>

  {/* ===== RESULTADO ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">O que muda quando você para de fazer tudo sozinho</h2>
  <p className="text-neutral-200 text-lg text-center mb-12 max-w-3xl mx-auto">
  Depois do ZapClub, você não vira expert em tecnologia. Vira um empresário que sabe o que a IA pode fazer pela sua empresa e usa isso. Sem insegurança. Sem ficar sózinho.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
  { icon: '🗣️', text: 'Conversa com dev e agência sem ser enganado. Sabe o que pedir.' },
  { icon: '🔍', text: 'Identifica automação antes do concorrente. Não depois.' },
  { icon: '🛡️', text: 'Implementa IA sem medo de perder dinheiro. Porque não tá sózinho.' },
  { icon: '⚡', text: 'Para de dar conta de tudo no braço. Passa a operar com braço extra que trabalha 24h.' },
  ].map((item, i) => (
  <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-[#7C3AED]/20 hover:border-[#7C3AED]/50 transition-all duration-300 hover:-translate-y-1">
  <span className="text-3xl block mb-3">{item.icon}</span>
  <p className="text-neutral-200 font-medium">{item.text}</p>
  </div>
  ))}
  </div>
  </div>
  </section>

  {/* ===== AUTORIDADE ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-3xl mx-auto">
  <div className="flex flex-col items-center">
  {/* Foto do Felipe — rounded landscape */}
  <div className="relative mb-6">
  <div className="absolute -inset-3 rounded-3xl bg-[#7C3AED]/20 blur-xl" />
  <img
   src="/felipe-britto-v2.webp"
   alt="Felipe Britto"
   className="relative w-full max-w-[360px] rounded-3xl object-cover border-2 border-[#7C3AED]/40"
   loading="lazy"
  />
  </div>

  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  Quem conduz
  </span>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Felipe Britto</h2>
  <p className="text-[#A78BFA] text-lg font-medium mb-8">IA aplicada a negócios reais, sem complicar o que precisa funcionar.</p>

  <p className="text-neutral-200 text-lg leading-relaxed mb-6 text-center">
  Eu criei o ZapClub para reunir empresários que querem usar IA na prática, mas não têm tempo para ficar perdidos entre ferramentas, promessas e tutoriais soltos. Aqui, o foco é simples: entender onde a IA pode economizar tempo, melhorar atendimento, organizar processos e gerar mais fôlego para o negócio crescer.
  </p>
  <p className="text-neutral-200 text-lg leading-relaxed mb-8 text-center">
  Minha experiência vem da operação: testando ferramentas, criando automações, estruturando sistemas e traduzindo tecnologia em soluções que pequenos negócios conseguem usar de verdade.
  </p>

  <div className="flex flex-wrap justify-center gap-3 mb-8">
  {[
  '3 anos aplicando IA em negócios',
  '20 anos em robótica e tecnologia',
  'Founder de 2 SaaS no mercado',
  'Atende empresas que dominam com IA',
  ].map((item, i) => (
  <span key={i} className="bg-[#111111] border border-[#7C3AED]/30 rounded-full px-4 py-2 text-sm text-neutral-200">
  {item}
  </span>
  ))}
  </div>

  <p className="text-[#A78BFA] text-lg font-bold text-center">
  Você aprende com quem opera. Não com quem só ensina teoria.
  </p>
  </div>
  </div>
  </section>

  {/* ===== URGÊNCIA ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-3xl mx-auto text-center">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Cada dia sem IA é um dia de vantagem pro concorrente</h2>
  <p className="text-neutral-200 text-lg leading-relaxed mb-6">
  O empresário que implementa IA hoje não é o que tem mais dinheiro. É o que não aguenta mais dar conta de tudo sozinho. Ele entra porque a insegurança de esperar é maior que a de tentar. E tenta com guia. Sem método, não executa. Sem comunidade, desiste.
  </p>
  <p className="text-neutral-300 text-lg leading-relaxed mb-10">
  O ZapClub é a entrada. Sem risco de implementar errado. Com moderador 24h, com grupo, com respaldo.
  </p>
  <a
  href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
   target="_blank"
   rel="noopener noreferrer"
   className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
  >
  QUERO FAZER PARTE
  </a>
  </div>
  </section>

  {/* ===== GARANTIA ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-md mx-auto text-center">
  <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#7C3AED]/30">
  <span className="text-5xl block mb-4">🛡️</span>
  <h3 className="text-white text-2xl font-bold mb-4">Garantia de 7 dias</h3>
  <p className="text-neutral-200 leading-relaxed">
  Se em até 7 dias você achar que o ZapClub não é pra você, devolvemos cada centavo. Sem perguntas, sem burocracia, sem "vamos tentar resolver antes". O risco é todo nosso.
  </p>
  </div>
  </div>
  </section>

  {/* ===== CTA FINAL ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-2xl mx-auto text-center">
  <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#7C3AED]/5 rounded-3xl p-8 border border-[#7C3AED]/30">

  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
  Você leu até aqui. Falta pouco pra destravar.
  </h2>

  <p className="text-neutral-200 text-lg mb-4">
  50 conto, suporte 24h, acesso a um grupo de empresários que aplicam IA de verdade e clareza pra não perder tempo e dinheiro com tentativa e erro.
  </p>
  <p className="text-neutral-300 mb-10">
  Sem enrolação. Se não gostar em 7 dias, devolvemos cada centavo.
  </p>

  <a
  href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
   target="_blank"
   rel="noopener noreferrer"
   className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 w-full justify-center"
  >
  QUERO FAZER PARTE
  </a>
  <p className="text-neutral-400 text-sm mt-4">7 dias de garantia · Risco zero</p>
  </div>
  </div>
  </section>

  <Footer />
  </main>
  </>
 );
}