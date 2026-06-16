import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

/* Badge reutilizável */
const badge = (text: string, extra = '', color: 'green' | 'red' = 'green') => {
  const colors = {
    green: 'text-green-400 border-green-500/30 bg-green-500/10',
    red: 'text-red-400 border-red-500/30 bg-red-500/10',
  };
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest ${colors[color]} px-3 py-1 rounded-full ${extra}`}>
      {text}
    </span>
  );
};

export default function ZapClub() {
  return (
    <>
      <Meta
        title="ZapClub — IA na Prática para Empresários | Comunidade no WhatsApp"
        description="Comunidade de empresários que aplicam IA nos negócios. Moderador de IA 24h, grupo no WhatsApp, sem vídeo chato. Implementação na prática."
        path="/zapclub"
      />

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== HERO ===== */}
        <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/8 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              {badge('Comunidade no WhatsApp')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center leading-[1.1] mb-4">
              IA que sai do papel e entra no{' '}
              <span className="text-green-400">seu negócio</span>
            </h1>
            <p className="text-neutral-400 text-center text-sm sm:text-base max-w-xl mx-auto mb-6">
              Não é curso. É grupo de empresários aplicando IA todo dia, com moderador disponível 24h.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href="#proposta"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                QUERO FAZER PARTE →
              </a>
              <span className="text-neutral-500 text-xs">R$ 50/mês · 7 dias de garantia</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              <div className="bg-white/[0.03] rounded-xl p-3 border border-green-500/15 text-center">
                <p className="text-xs text-neutral-500 mb-1">Membros ativos</p>
                <p className="text-lg font-bold text-green-400">+500</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3 border border-green-500/15 text-center">
                <p className="text-xs text-neutral-500 mb-1">Dúvidas/dia</p>
                <p className="text-lg font-bold text-green-400">+200</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3 border border-green-500/15 text-center">
                <p className="text-xs text-neutral-500 mb-1">Automações criadas</p>
                <p className="text-lg font-bold text-green-400">+1.000</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== O PROBLEMA ===== */}
        <section className="py-16 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Você conhece essa sensação
              </h2>
              <p className="text-neutral-400 text-sm">
                O cenário que mais trava empresário hoje em dia
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: '😰', title: 'Você faz tudo sozinho', text: 'Dono, gestor, operador, financeiro. E agora tem que entender IA também? Não tem braço, não tem tempo.' },
                { icon: '🧊', title: 'Paralisia por medo de errar', text: 'Sabe que IA existe. Sabe que precisa. Mas não sabe por onde começar. Enquanto isso, o concorrente já atende com IA.' },
                { icon: '📼', title: 'Curso gravado que não vira ação', text: 'Assiste 10h de vídeo, anota tudo, e na segunda-feira não aplica nada.' },
                { icon: '🗑️', title: 'Ferramenta que ninguém usa', text: 'Paga por IA, deixa largada porque ninguém na equipe sabe como usar. Todo mês, dinheiro no lixo.' },
              ].map((item, i) => (
                <div key={`dor-${i}`} className="flex items-start gap-3 bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-white text-sm font-bold mb-0.5">{item.title}</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== A SOLUÇÃO ===== */}
        <section id="proposta" className="py-16 sm:py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center mb-4">
              {badge('O remédio pra insegurança')}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              O ZapClub não é um curso.
            </h2>
            <p className="text-green-400 text-lg font-semibold mb-2">
              É um grupo de Implementação.
            </p>

            {/* Foto comunidade */}
            <div className="flex justify-center mb-5">
              <Image
                src="/zapclub-community.webp"
                alt="Comunidade ZapClub no WhatsApp"
                width={600} height={400}
                className="w-full max-w-lg rounded-xl border border-white/[0.06]"
                loading="lazy"
              />
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-4">
              Um espaço com outros empresários aplicando IA nos negócios deles, com moderador disponível 24h. Ele guia passo a passo, responde na hora, adapta ao seu contexto. Não deixa você errar sozinho.
            </p>
            <p className="text-neutral-400 text-sm max-w-2xl mx-auto mb-10">
              Você não assiste vídeo e torce pra dar certo na segunda. Você pergunta, testa, ajusta. Se travar, tem o moderador e a comunidade pra segurar.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
              {[
                { icon: '🤖', label: 'Moderador de IA 24h' },
                { icon: '🎙', label: 'Áudio → orientação na hora' },
                { icon: '🤝', label: 'Comunidade de empresários' },
                { icon: '🔧', label: 'Prática no seu negócio' },
                { icon: '📊', label: 'Avaliação por nível' },
                { icon: '⏱️', label: 'Avança no seu ritmo' },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.06] text-center">
                  <span className="text-xl mb-1 block">{item.icon}</span>
                  <span className="text-xs text-neutral-300">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Para quem é */}
            <div className="max-w-md mx-auto mb-6">
              <div className="text-center mb-4">
                {badge('Pra quem é o ZapClub', 'mb-3', 'green')}
              </div>
              <ul className="space-y-2 text-left">
                {[
                  'Tem medo de implementar IA errado',
                  'Dá conta de tudo sozinho',
                  'Já tentou usar IA, travou e deixou pra lá',
                  'Falta braço pra tocar a operação',
                  'Quer dominar a base pra não ser enganado',
                  'Sabe que cada dia sem IA = concorrente ganha',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Para quem não é */}
            <div className="max-w-md mx-auto mb-10">
              <div className="text-center mb-4">
                {badge('Pra quem não é', 'mb-3', 'red')}
              </div>
              <ul className="space-y-2 text-left">
                {[
                  'Quer que IA resolva tudo sozinha, sem entender',
                  'Não disposto a testar, errar e ajustar',
                  'Acha que vídeo gravado substitui acompanhamento',
                  'Acha que não precisa de IA',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-400 text-sm">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sistema de Progressão */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="text-center mb-6">
                {badge('Sistema de Progressão')}
              </div>
              <p className="text-neutral-400 text-sm mb-6">
                Cada elo destrava o próximo. Você só avança quando faz na prática com o seu negócio de verdade.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { level: 'Cobre', name: 'Conquistador de Tokens', emoji: '🔶', desc: 'Tokens, limites e quotas.' },
                  { level: 'Prata', name: 'Triangulador de Modelos', emoji: '🥈', desc: 'GPT, Claude, Gemini.' },
                  { level: 'Ouro', name: 'Manipulador de Ferramentas', emoji: '🥇', desc: 'Busca web, executa código.' },
                  { level: 'Platina', name: 'Desenvolvedor de Skills', emoji: '💎', desc: 'Prompts reutilizáveis.' },
                  { level: 'Diamante', name: 'Maestro de Rotinas', emoji: '👑', desc: 'Workflows rodando sozinhos.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.06] text-center">
                    <span className="text-2xl mb-1 block">{item.emoji}</span>
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider mb-0.5">{item.level}</p>
                    <p className="text-xs text-white font-semibold mb-0.5">{item.name}</p>
                    <p className="text-[10px] text-neutral-500 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quem conduz */}
            <div className="max-w-md mx-auto text-center mb-12">
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-5">
                  <Image
                    src="/felipe-autoridade.webp"
                    alt="Felipe Britto"
                    width={144} height={144}
                    className="rounded-full object-cover border-2 border-green-500/30"
                    priority
                  />
                </div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Quem conduz</p>
                <h3 className="text-white font-bold text-lg">Felipe Britto</h3>
                <p className="text-green-400 text-sm mb-3">IA aplicada a negócios reais</p>
                <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
                  3 anos aplicando IA em negócios · 20 anos em robótica e tecnologia · Founder de 2 SaaS · Atende empresas que dominam com IA
                </p>
              </div>
            </div>

            {/* Depois do ZapClub */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="text-center mb-6">
                {badge('Depois do ZapClub')}
              </div>
              <div className="space-y-3">
                {[
                  { emoji: '🗣', text: 'Conversa com dev e agência sem ser enganado. Sabe o que pedir.' },
                  { emoji: '🔍', text: 'Identifica automação antes do concorrente. Não depois.' },
                  { emoji: '🛡', text: 'Implementa IA sem medo de perder dinheiro. Porque não tá sozinho.' },
                  { emoji: '⚡', text: 'Deixa de dar conta de tudo no braço. Agora tem braço extra 24h.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <p className="text-neutral-300 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <div className="max-w-xl mx-auto text-center mb-10">
              <div className="flex flex-col items-center gap-4">
                <a
                  href="https://wa.me/SEU_NUMERO?text=Olá!%20Quero%20fazer%20parte%20do%20ZapClub!"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  QUERO FAZER PARTE →
                </a>
                <div className="space-y-1">
                  <p className="text-white font-bold text-sm">R$ 50/mês</p>
                  <div className="flex items-center gap-2 text-neutral-400 text-xs">
                    <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">7 DIAS DE GARANTIA</span>
                  </div>
                  <p className="text-neutral-500 text-[10px]">Sem perguntas. Sem burocracia. Risco zero.</p>
                </div>
              </div>
            </div>

            {/* Garantia visual */}
            <div className="flex justify-center">
              <div className="bg-white/[0.03] rounded-2xl p-5 border border-green-500/15 max-w-xs text-center">
                <div className="text-3xl mb-2">🛡</div>
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Garantia de 7 dias</p>
                <p className="text-neutral-400 text-[10px] leading-relaxed">
                  Se em até 7 dias você achar que o ZapClub não é pra você, devolvemos cada centavo. Sem perguntas, sem burocracia.
                </p>
              </div>
            </div>

            <p className="text-neutral-600 text-xs mt-10">
              Feito por Felipe Britto · IA aplicada a negócios reais
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
