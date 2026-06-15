import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ZapClub() {
 return (
  <>
  <Meta
   title="ZapClub — Comunidade de IA para Negocios no WhatsApp | Sistema Britto"
   description="Comunidade no WhatsApp com moderador de IA 24h. Pare de fazer tudo sozinho. R$ 50/mes, 7 dias de garantia."
   path="/zapclub"
  />

  <Navbar />

  <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

  {/* ===== HERO ===== */}
  <section className="relative pt-32 pb-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-[#0a0a0a] to-[#0a0a0a]" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] max-h-[600px] w-full h-full bg-[#7C3AED]/8 rounded-full blur-3xl" />

  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  {/* Logo horizontal */}
  <div className="mb-8">
   <img src="/zapclub-logo.jpg" alt="ZapClub" className="h-12 sm:h-14 mx-auto" loading="eager" />
  </div>

  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
  10% dos seus concorrentes<br />
  <span className="bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">ja operam com IA 24h. E voce ainda nao sabe por onde comecar?</span>
  </h1>

  <p className="text-neutral-200 text-lg max-w-2xl mx-auto font-medium mb-4">
  O medo de implementar errado e perder dinheiro trava mais que a falta de informacao. O ZapClub e uma comunidade mao na massa, com moderacao ativa 24h, que te tira da zona de inseguranca e te coloca pra executar. Com orientacao e o suporte do grupo.
  </p>
  <p className="text-lg text-neutral-300 mb-8 max-w-xl mx-auto">
  Em vez de passar meses pesquisando, voce passa minutos aplicando o que ja funciona.
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

  <p className="text-neutral-400 text-sm mt-4">R$ 50/mes · 7 dias de garantia</p>
  </div>
  </section>

  {/* ===== A DOR ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Voce conhece essa sensacao</h2>

  <div className="space-y-8">
  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">😰</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Voce faz tudo sozinho</h3>
  <p className="text-neutral-200">Dono, gestor, operador, financeiro. E agora tem que entender IA tambem? Nao tem braco, nao tem tempo, e o medo de errar trava tudo.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">🧊</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Paralisia por medo de errar</h3>
  <p className="text-neutral-200">Sabe que IA existe. Sabe que precisa. Mas nao sabe por onde comecar. E se implementar errado? E se jogar dinheiro fora? Enquanto isso, o concorrente ja atende cliente com IA.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">📼</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Curso gravado que nao vira acao</h3>
  <p className="text-neutral-200">Assiste 10h de video, anota tudo, e na segunda-feira nao aplica nada. Video passivo nao substitui quem responde sua duvida na hora.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">🗑️</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Ferramenta que ninguem usa</h3>
  <p className="text-neutral-200">Paga por IA, deixa largada porque ninguem na equipe sabe como usar. Todo mes, dinheiro no lixo. E a inseguranca so cresce.</p>
  </div>
  </div>
  </div>
  </div>
  </section>

  {/* ===== O CUSTO DE ESPERAR ===== */}
  <section className="py-16 px-4 bg-[#0a0a0a]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Todo dia sem IA e um dia de vantagem pro concorrente</h2>
  <p className="text-neutral-300 text-lg text-center mb-12 max-w-3xl mx-auto">
  Dado, nao premissa. Cada dia que voce espera, alguem avanca.
  </p>

  <div className="grid md:grid-cols-3 gap-6 mb-12">
  {[
  { metric: '75%', label: 'das empresas que demorarem a adotar IA vao perder mercado ate 2027. Fonte: analistas do setor.' },
  { metric: 'R$ 1,4 tri', label: 'e o que o Brasil pode perder em produtividade ate 2030 sem acelerar IA. Estudos do MIT e FGV.' },
  { metric: '60%', label: 'dos empresarios temem mais implementar errado que o custo da ferramenta. Pesquisa Gartner.' },
  ].map((item, i) => (
  <div key={i} className="bg-[#111111] p-6 rounded-xl border border-[#7C3AED]/20">
   <p className="text-4xl font-bold text-[#A78BFA] mb-2">{item.metric}</p>
   <p className="text-neutral-300 text-sm leading-relaxed">{item.label}</p>
  </div>
  ))}
  </div>

  <p className="text-neutral-200 text-lg text-center max-w-3xl mx-auto">
  IA nao e mais luxo de grande empresa. E o folego que o empresario pequeno precisa pra escalar pagando menos e indo mais longe. Quem nao entra agora, paga depois. Em margem, em cliente, em posicao.
  </p>
  </div>
  </section>

  {/* ===== O QUE E ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <div className="text-center mb-12">
  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  O remedio pra inseguranca
  </span>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
  O ZapClub nao e um curso.<br />E uma comunidade no Zap.
  </h2>
  </div>

  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  E um grupo no WhatsApp com outros empresarios aplicando IA nos negocios deles, e um moderador de IA disponivel 24h. Ele guia passo a passo, responde na hora, adapta ao seu contexto. Nao deixa voce errar sozinho.
  </p>
  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  Voce nao assiste video e torce pra dar certo na segunda. Voce pergunta, testa, ajusta. Se travar, tem o moderador e a comunidade pra segurar. Fazer tudo sozinho acaba quando voce entra num lugar onde ninguem ta sozinho.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {[
  { icon: '🤖', label: 'Moderador de IA 24h tirando duvida e orientando' },
  { icon: '🎙️', label: 'Mande audio, receba orientacao na hora' },
  { icon: '🤝', label: 'Comunidade de empresarios que ja aplicam IA' },
  { icon: '🔧', label: 'Pratica no seu negocio, nao teoria generica' },
  { icon: '📊', label: 'Avaliacao por nivel ate dominar o conteudo' },
  { icon: '⏱️', label: 'Avanca no seu ritmo, sem pressao' },
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3 bg-[#0a0a0a] rounded-xl p-4 border border-[#7C3AED]/20">
  <span className="text-2xl">{item.icon}</span>
  <span className="text-neutral-200 text-sm font-medium">{item.label}</span>
  </div>
  ))}
  </div>
  </div>
  </section>

  {/* ===== SEU CAMINHO (ELOS) ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]" id="caminho">
  <div className="max-w-5xl mx-auto">
  <div className="text-center mb-4">
  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  Sistema de Progressao
  </span>
  </div>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Um roadmap para ter clareza e seguranca</h2>
  <p className="text-neutral-300 text-lg text-center mb-14 max-w-3xl mx-auto">
  Cada elo destrava o proximo. Voce so avanca quando entrega uma task com o seu negocio de verdade. O moderador valida. A comunidade acompanha.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
  {/* COBRE */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#CD7F32]/50 hover:border-[#CD7F32] transition-all duration-300 hover:-translate-y-2 group">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#CD7F32] text-black border-2 border-[#CD7F32]">Cobre</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#CD7F32]/10 border border-[#CD7F32]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">🔶</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Conquistador de Tokens</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Entende tokens, limites e quotas. Faz a IA funcionar na primeira tentativa sem gastar a toa.
  </p>
  <div className="mt-3 pt-3 border-t border-[#CD7F32]/20">
  <span className="text-[#CD7F32] text-xs font-bold">Task: Enviar 1 prompt funcional para caso real do seu negocio</span>
  </div>
  </div>

  {/* PRATA */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#A8B4C0]/50 hover:border-[#C0C0C0] transition-all duration-300 hover:-translate-y-2 group">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#C0C0C0] text-black border-2 border-[#C0C0C0]">Prata</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">🥈</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Triangulador de Modelos</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Sabe qual modelo usar para cada tarefa. Compara GPT, Claude, Gemini. Economiza custos, ganha resultado.
  </p>
  <div className="mt-3 pt-3 border-t border-[#A8B4C0]/20">
  <span className="text-[#C0C0C0] text-xs font-bold">Task: Implementar 1 automacao no negocio e mostrar resultado</span>
  </div>
  </div>

  {/* OURO */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#F5D061]/50 hover:border-[#F5D061] transition-all duration-300 hover:-translate-y-2 group">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#F5D061] text-black border-2 border-[#F5D061]">Ouro</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#F5D061]/10 border border-[#F5D061]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">🥇</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Manipulador de Tools & MCPs</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Usa ferramentas que a IA nao tem nativamente. Busca na web, executa codigo, conecta dados externos.
  </p>
  <div className="mt-3 pt-3 border-t border-[#F5D061]/20">
  <span className="text-[#F5D061] text-xs font-bold">Task: Montar assistente de negocio e usar 3x em situacoes reais</span>
  </div>
  </div>

  {/* PLATINA */}
  <div className="relative bg-[#111111] rounded-2xl p-5 border-2 border-[#E0E0E0]/50 hover:border-[#E0E0E0] transition-all duration-300 hover:-translate-y-2 group">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#E0E0E0] text-black border-2 border-[#E0E0E0]">Platina</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#E0E0E0]/10 border border-[#E0E0E0]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">💎</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Desenvolvedor de Skills</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Cria prompts reutilizaveis, templates e fluxos customizados para o SEU negocio. Nao depende mais de prompting generico.
  </p>
  <div className="mt-3 pt-3 border-t border-[#E0E0E0]/20">
  <span className="text-[#E0E0E0] text-xs font-bold">Task: Criar 1 skill/template reutilizavel para o seu negocio</span>
  </div>
  </div>

  {/* DIAMANTE */}
  <div className="relative bg-gradient-to-b from-[#111111] to-[#7C3AED]/10 rounded-2xl p-5 border-2 border-[#7DD3FC]/60 hover:border-[#7DD3FC] transition-all duration-300 hover:-translate-y-2 group">
  <div className="absolute -top-3 -right-3">
  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#7DD3FC] text-black border-2 border-[#7DD3FC] animate-pulse">Diamante</span>
  </div>
  <div className="w-12 h-12 rounded-xl bg-[#7DD3FC]/10 border border-[#7DD3FC]/30 flex items-center justify-center mb-3">
  <span className="text-2xl">👑</span>
  </div>
  <h3 className="text-white text-sm font-bold mb-1">Maestro de Rotinas</h3>
  <p className="text-neutral-400 text-xs leading-relaxed">
  Monta workflows que rodam sozinhos. IA operando enquanto voce dorme. O negocio que nao precisa de voce o tempo todo.
  </p>
  <div className="mt-3 pt-3 border-t border-[#7DD3FC]/20">
  <span className="text-[#7DD3FC] text-xs font-bold">Task: 3 processos rodando em IA, medir resultado financeiro</span>
  </div>
  </div>
  </div>

  <p className="text-neutral-400 text-sm text-center">
  Cada elo tem uma task pratica com o seu negocio. O moderador aprova. Voce avanca. Sem video gravado. Sem exercicio ficticio.
  </p>
  </div>
  </section>

  {/* ===== PARA QUEM E ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Pra quem e o ZapClub</h2>
  <p className="text-neutral-200 text-lg text-center mb-12 max-w-3xl mx-auto">
  Se voce da conta de tudo sozinho, sente que falta braco, e sabe que IA e o caminho mas tem medo de errar, esse espaco e seu.
  </p>

  <div className="space-y-4 mb-16">
  {[
  'Tem medo de implementar IA errado e perder dinheiro',
  'Da conta de tudo sozinho e sabe que nao da pra continuar assim',
  'Ja tentou usar IA, travou na implementacao e deixou pra la',
  'Falta braco pra tocar a operacao direito',
  'Quer dominar a base pra nao ser enganado por agencia ou dev',
  'Sabe que cada dia sem IA e um dia que o concorrente ganha',
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3">
  <span className="text-[#22C55E] text-lg">✓</span>
  <span className="text-neutral-200">{item}</span>
  </div>
  ))}
  </div>

  <div className="bg-[#111111] rounded-2xl p-8 border border-red-500/20 max-w-2xl mx-auto">
  <h3 className="text-white text-xl font-bold mb-3">Pra quem nao e</h3>
  <p className="text-neutral-300 mb-6">
  Esse nao e um mapa da mina nem um passe de magica. Se voce busca atalho sem esforco, esse lugar nao e pra voce.
  </p>
  <div className="space-y-3">
  {[
  'Quem quer que a IA resolva tudo sozinha, sem entender o que ta rolando',
  'Quem nao ta disposto a testar, errar e ajustar na pratica',
  'Quem acha que video gravado substitui acompanhamento e comunidade',
  'Quem acha que "nao precisa de IA" e vai esperar o mercado virar',
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
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">O que muda quando voce para de fazer tudo sozinho</h2>
  <p className="text-neutral-200 text-lg text-center mb-12 max-w-3xl mx-auto">
  Depois do ZapClub, voce nao vira expert em tecnologia. Vira um empresario que sabe o que a IA pode fazer pela sua empresa e usa isso. Sem inseguranca. Sem ficar sozinho.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
  { icon: '🗣️', text: 'Conversa com dev e agencia sem ser enganado. Sabe o que pedir.' },
  { icon: '🔍', text: 'Identifica automacao antes do concorrente. Nao depois.' },
  { icon: '🛡️', text: 'Implementa IA sem medo de perder dinheiro. Porque nao ta sozinho.' },
  { icon: '⚡', text: 'Para de dar conta de tudo no braco. Passa a operar com braco extra que trabalha 24h.' },
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
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-3xl mx-auto">
  <div className="flex flex-col items-center">
  {/* Foto com fade-to-black */}
  <div className="relative w-40 h-40 mb-6">
  <img
   src="/felipe-britto.webp"
   alt="Felipe Britto"
   className="w-full h-full rounded-full object-cover"
   style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
   loading="lazy"
  />
  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
  </div>

  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  Quem conduz
  </span>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Felipe Britto</h2>
  <p className="text-neutral-300 mb-8">Empreendedor digital. Desenvolvedor de ofertas.</p>

  <p className="text-neutral-200 text-lg leading-relaxed mb-10 text-center">
  Ja comprou ferramenta sem saber usar. Tentou implementar sozinho, quebrou. Passou semanas tentando ensinar o time sem resultado. Tambem viveu o acerto: 3 anos aplicando IA em negocios reais, 20 anos em robotica e tecnologia, founder de 2 SaaS no mercado, atendendo empresas que usam IA pra dominar os mercados delas.
  </p>

  <div className="flex flex-wrap justify-center gap-3 mb-8">
  {[
  '3 anos aplicando IA em negocios',
  '20 anos em robotica e tecnologia',
  'Founder de 2 SaaS no mercado',
  'Atende empresas que dominam com IA',
  ].map((item, i) => (
  <span key={i} className="bg-[#0a0a0a] border border-[#7C3AED]/30 rounded-full px-4 py-2 text-sm text-neutral-200">
  {item}
  </span>
  ))}
  </div>

  <p className="text-[#A78BFA] text-lg font-bold text-center">
  Voce aprende com quem opera. Nao com quem so ensina teoria.
  </p>
  </div>
  </div>
  </section>

  {/* ===== URGÊNCIA ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-3xl mx-auto text-center">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Cada dia sem IA e um dia de vantagem pro concorrente</h2>
  <p className="text-neutral-200 text-lg leading-relaxed mb-6">
  O empresario que implementa IA hoje nao e o que tem mais dinheiro. E o que nao aguenta mais dar conta de tudo sozinho. Ele entra porque a inseguranca de esperar e maior que a de tentar. E tenta com guia. Sem metodo, nao executa. Sem comunidade, desiste.
  </p>
  <p className="text-neutral-300 text-lg leading-relaxed mb-10">
  O ZapClub e a entrada. Sem risco de implementar errado. Com moderador 24h, com grupo, com respaldo.
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
  Se em ate 7 dias voce achar que o ZapClub nao e pra voce, devolvemos cada centavo. Sem perguntas, sem burocracia, sem "vamos tentar resolver antes". O risco e todo nosso.
  </p>
  </div>
  </div>
  </section>

  {/* ===== CTA FINAL ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-2xl mx-auto text-center">
  <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#7C3AED]/5 rounded-3xl p-8 border border-[#7C3AED]/30">
  {/* Logo horizontal */}
  <div className="mb-6">
  <img src="/zapclub-logo.jpg" alt="ZapClub" className="h-10 mx-auto" loading="lazy" />
  </div>

  <p className="text-neutral-200 text-lg mb-6">
  Chega de tentar sozinho. Moderacao ativa 24h, grupo de empresarios que aplicam IA de verdade, e um roadmap pra voce saber exatamente o que fazer. Sem pergunta sem resposta. Sem passo em falso.
  </p>

  <ul className="space-y-3 text-left mb-8">
  {[
  'Moderador de IA 24h tira duvida e orienta na hora',
  'Grupo de empresarios que aplicam IA, nao so assistem video',
  'Mao na massa no seu negocio, nao exercicio generico',
  'Progressao por nivel com validacao pratica',
  'Avanca no seu ritmo, sem pressao de turma',
  ].map((item, i) => (
  <li key={i} className="flex items-center gap-3 text-neutral-200">
  <span className="text-[#22C55E] text-xl">✓</span>
  <span>{item}</span>
  </li>
  ))}
  </ul>

  <div className="pt-6 border-t border-[#7C3AED]/30">
  <div className="flex items-baseline justify-center gap-2 mb-6">
  <span className="text-white text-5xl font-bold">R$ 50</span>
  <span className="text-neutral-300 text-lg">/mes</span>
  </div>

  <a
  href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 w-full justify-center"
  >
  QUERO FAZER PARTE
  </a>
  </div>

  <p className="text-neutral-400 text-sm mt-4">7 dias de garantia · Risco zero</p>
  </div>
  </div>
  </section>

  <Footer />
  </main>
  </>
 );
}