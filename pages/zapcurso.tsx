import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import CheckoutModal from '../components/CheckoutModal';

export default function ZapCurso() {
 const [openCheckout, setOpenCheckout] = useState(false);

 return (
  <>
  <Meta
   title="ZapCurso IA para Negócios — Aprenda IA pelo WhatsApp | Sistema Britto"
   description="Tutor de IA no seu WhatsApp. Aprenda na prática, no seu ritmo, com respostas em tempo real. R$ 50. Garantia de 7 dias."
   path="/zapcurso"
  />

  <Navbar />

  <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

  {/* ===== HERO ===== */}
  <section className="relative pt-32 pb-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-[#0a0a0a] to-[#0a0a0a]" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] max-h-[600px] w-full h-full bg-[#7C3AED]/8 rounded-full blur-3xl" />

  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  <div className="inline-flex items-center gap-2 bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-full px-4 py-2 mb-6">
  <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
  <span className="text-[#A78BFA] text-xs font-bold uppercase tracking-wider">IA para Negócios</span>
  </div>

  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
  Seu concorrente já está usando IA.<br />
  <span className="bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">Você ainda não sabe por onde começar.</span>
  </h1>

  <p className="text-neutral-200 text-lg max-w-2xl mx-auto font-medium mb-4">
  A paralisia não é falta de informação. É falta de método no bolso. O ZapCurso coloca um tutor de IA no seu WhatsApp. Você avança no seu ritmo, tira dúvida por áudio e recebe resposta na hora.
  </p>
  <p className="text-lg text-neutral-300 mb-8 max-w-xl mx-auto">
  Em vez de passar horas pesquisando, você passa horas executando.
  </p>

  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <button
  onClick={() => setOpenCheckout(true)}
  className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
  >
  QUERO COMEÇAR AGORA →
  </button>
  </div>

  <p className="text-neutral-400 text-sm mt-4">R$ 50 · Pagamento único · 7 dias de garantia incondicional</p>
  </div>
  </section>

  {/* ===== CHEGA DE ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Chega de…</h2>

  <div className="space-y-8">
  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">🧊</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Paralisia</h3>
  <p className="text-neutral-200">Sabe que IA existe, sabe que precisa, mas não sabe por onde começar. E enquanto você pensa, alguém já está atendendo cliente com IA.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">📼</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Curso gravado</h3>
  <p className="text-neutral-200">Assiste 10h de vídeo, anota tudo, e na segunda-feira não aplica nada. Conteúdo passivo não gera execução.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">🗑️</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Ferramenta abandonada</h3>
  <p className="text-neutral-200">Paga por IA, deixa largada porque ninguém na equipe entende como usar. Dinheiro no lixo todo mês.</p>
  </div>
  </div>

  <div className="flex items-start gap-4">
  <span className="text-2xl mt-1">⏳</span>
  <div>
  <h3 className="text-white text-lg font-bold mb-1">Perder tempo</h3>
  <p className="text-neutral-200">Tenta implementar sozinho, quebra a execução e volta para o zero na próxima semana. O ciclo se repete.</p>
  </div>
  </div>
  </div>
  </div>
  </section>

  {/* ===== O QUE É ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-4xl mx-auto">
  <div className="text-center mb-12">
  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  Como funciona
  </span>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">O que é o ZapCurso</h2>
  </div>

  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  É um tutor com IA no seu WhatsApp. Ele te ensina a dominar a base de IA para negócios — sem jargão, sem enrolação, sem pausas para reflexão. E depois te conduz passo a passo até você implementar ou supervisionar uma solução real na sua empresa.
  </p>
  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  Funciona no ritmo do seu dia, porque aprender de verdade não precisa de horário fixo. Precisa de 15 minutos de manhã? Funciona. Tem 30 minutos no intervalo? Também. Manda áudio, recebe resposta em tempo real. O tutor não é um professor que fala para uma sala de 200 pessoas. É um operador que te acompanha como se fosse um braço extra.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {[
  { icon: '💬', label: 'Aprendizado guiado por IA no WhatsApp' },
  { icon: '🎙️', label: 'Resposta em tempo real — mande áudio, receba orientação na hora' },
  { icon: '🔧', label: 'Prática e feedback aplicado ao seu negócio' },
  { icon: '📊', label: 'Avaliação por nível até você dominar o conteúdo' },
  { icon: '⏱️', label: 'Avança no seu ritmo, sem pressão de turma' },
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3 bg-[#111111] rounded-xl p-4 border border-[#7C3AED]/20">
  <span className="text-2xl">{item.icon}</span>
  <span className="text-neutral-200 text-sm font-medium">{item.label}</span>
  </div>
  ))}
  </div>
  </div>
  </section>

  {/* ===== PARA QUEM É ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Para quem é o ZapCurso</h2>
  <p className="text-neutral-200 text-lg text-center mb-12 max-w-3xl mx-auto">
  Se você é dono de pequena empresa, gestor ou operador e já percebeu que a IA não é coisa de futuro — é ferramenta de quem está no mercado agora — esse espaço é seu.
  </p>

  <div className="space-y-4 mb-16">
  {[
  'Quer aplicar IA no negócio, mas não sabe por onde começar',
  'Já tentou usar IA, paralisou na implementação e deixou para lá',
  'Quer dominar a base para tomar decisões ou supervisionar sua equipe',
  'Não tem tempo para cursos longos, vídeos chatos e conteúdo teórico',
  'Quer se destacar antes que o concorrente tome a dianteira',
  ].map((item, i) => (
  <div key={i} className="flex items-center gap-3">
  <span className="text-[#22C55E] text-lg">✓</span>
  <span className="text-neutral-200">{item}</span>
  </div>
  ))}
  </div>

  <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-red-500/20 max-w-2xl mx-auto">
  <h3 className="text-white text-xl font-bold mb-3">Para quem não é</h3>
  <p className="text-neutral-300 mb-6">
  Esse não é um mapa da mina e nem um passe de mágica. Se você busca um atalho sem esforço, esse lugar não é para você.
  </p>
  <div className="space-y-3">
  {[
  'Quem quer que a IA resolva tudo sozinha, sem entender o que está por trás',
  'Quem não está disposto a testar, errar e ajustar na prática',
  'Quem acha que curso gravado substitui acompanhamento personalizado',
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
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">O que muda quando você domina a base</h2>
  <p className="text-neutral-200 text-lg text-center mb-12 max-w-3xl mx-auto">
  Depois do ZapCurso, você não vira um expert em tecnologia. Você vira um empresário que entende o que a IA pode e não pode fazer pela sua empresa. E com isso:
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
  { icon: '🗣️', text: 'Conversa com desenvolvedores e agências sem ser enganado' },
  { icon: '🔍', text: 'Identifica gaps e oportunidades de automação antes do concorrente' },
  { icon: '🛡️', text: 'Implementa ou supervisiona soluções de IA com segurança' },
  { icon: '⚡', text: 'Para de assistir o mercado e passa a operar com ele' },
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
  <div className="max-w-3xl mx-auto text-center">
  <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4 border border-[#7C3AED]/40 px-4 py-2 rounded-full bg-[#7C3AED]/10">
  Quem conduz
  </span>
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Felipe Britto</h2>
  <p className="text-neutral-300 mb-8">Empreendedor digital. Desenvolvedor de ofertas.</p>

  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  Quem já viveu o erro de comprar ferramenta sem saber usar. De tentar implementar sozinho e quebrar. De passar semanas tentando ensinar o time sem resultado. E que também viveu o acerto: 3 anos aplicando IA em negócios reais, 20 anos em robótica e tecnologia, founder de 2 SaaS no mercado e atendendo empresas que usam IA para dominar seus mercados.
  </p>

  <div className="flex flex-wrap justify-center gap-3 mb-8">
  {[
  '3 anos aplicando IA em negócios',
  '20 anos em robótica e tecnologia',
  'Founder de 2 SaaS no mercado',
  'Atende empresas que dominam com IA',
  ].map((item, i) => (
  <span key={i} className="bg-[#0a0a0a] border border-[#7C3AED]/30 rounded-full px-4 py-2 text-sm text-neutral-200">
  {item}
  </span>
  ))}
  </div>

  <p className="text-[#A78BFA] text-lg font-bold">
  Você aprende com quem opera — não com quem só ensina teoria.
  </p>
  </div>
  </section>

  {/* ===== URGÊNCIA ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-3xl mx-auto text-center">
  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">O custo de esperar</h2>
  <p className="text-neutral-200 text-lg leading-relaxed mb-10">
  Cada semana sem IA no seu negócio é uma semana que seu concorrente usa para ficar mais rápido, mais barato e mais eficiente. Quando você decidir começar, pode ser tarde para aprender do zero enquanto o mercado já mudou. O ZapCurso é o ponto de entrada.
  </p>
  <button
  onClick={() => setOpenCheckout(true)}
  className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-[0.98]"
  >
  QUERO COMEÇAR AGORA →
  </button>
  </div>
  </section>

  {/* ===== GARANTIA ===== */}
  <section className="py-20 px-4 bg-[#111111]">
  <div className="max-w-md mx-auto text-center">
  <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#7C3AED]/30">
  <span className="text-5xl block mb-4">🛡️</span>
  <h3 className="text-white text-2xl font-bold mb-4">Garantia de 7 dias</h3>
  <p className="text-neutral-200 leading-relaxed">
  Se em até 7 dias você achar que o ZapCurso não é para você, devolvemos cada centavo. Sem perguntas, sem burocracia, sem "vamos tentar resolver antes". O risco é todo nosso.
  </p>
  </div>
  </div>
  </section>

  {/* ===== CTA FINAL ===== */}
  <section className="py-20 px-4 bg-[#0a0a0a]">
  <div className="max-w-2xl mx-auto text-center">
  <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#7C3AED]/5 rounded-3xl p-8 border border-[#7C3AED]/30">
  <h2 className="text-3xl font-bold text-white mb-4">
  Tutor de IA no seu WhatsApp
  </h2>
  <p className="text-neutral-300 text-lg mb-6">
  Aprenda na prática. No seu ritmo. Com respostas em tempo real.
  </p>

  <ul className="space-y-3 text-left mb-8">
  {[
  'Aprendizado guiado por IA no WhatsApp',
  'Envie áudio, receba orientação na hora',
  'Prática aplicada ao seu negócio',
  'Avaliação por nível até dominar o conteúdo',
  'Avança no seu ritmo',
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
  <span className="text-neutral-300 text-lg">pagamento único</span>
  </div>

  <button
  onClick={() => setOpenCheckout(true)}
  className="inline-flex items-center gap-3 bg-[#22C55E] hover:bg-[#16A34A] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 w-full justify-center"
  >
  QUERO COMEÇAR AGORA →
  </button>
  </div>

  <p className="text-neutral-400 text-sm mt-4">7 dias de garantia incondicional · Risco zero</p>
  </div>
  </div>
  </section>

  <CheckoutModal
  open={openCheckout}
  onClose={() => setOpenCheckout(false)}
  source="zapcurso"
  productName="ZapCurso IA para Negócios"
  productId="zapcurso-ia-negocios"
  />

  <Footer />
  </main>
  </>
 );
}
