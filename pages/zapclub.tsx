import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

/* ============================================================
 * Design System: Sistema Britto AI‑Native UI
 * Badge: rounded-full, border border-green-500/30, px-3 py-1, bg-green-500/10, text-green-400
 * Section bg alternates: [transparent] / bg-[#0a0a0a] / [transparent] / bg-[#0a0a0a]
 * CTA: bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg
 * ============================================================ */

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
        title="ZapClub — Comunidade de IA para Negócios no WhatsApp | Sistema Britto"
        description="Comunidade no WhatsApp com moderador de IA 24h. Pare de fazer tudo sozinho. R$ 50/mês, 7 dias de garantia."
        path="/zapclub"
      />

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== HERO ===== */}
        <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <Image src="/felipe-britto-v2.webp" alt="" fill className="absolute inset-0 object-cover opacity-[0.03] mix-blend-overlay" priority />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            {badge('✦ IA para negócios · Desconto de 1° Lote', 'mb-4')}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              22% dos seus concorrentes<br />
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                já operam com IA 24h.
              </span>
              <br />
              <span className="text-white">E você, já sabe por onde começar?</span>
            </h1>
            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto">
              O medo de implementar errado e perder dinheiro trava mais que a falta de informação.
            </p>
          </div>
        </section>

        {/* ===== O CUSTO DE ESPERAR ===== */}
        <section className="py-8 sm:py-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">Todo dia sem IA é um dia de vantagem pro concorrente</h2>
            <p className="text-neutral-400 text-sm mb-8">Cada dia que você espera, alguém avança.</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                { metric: '22%', desc: 'das PMEs brasileiras usam IA de forma estruturada. O resto improvisa.', source: 'Sebrae / SEGS, 2025' },
                { metric: 'R$ 1,4 tri', desc: 'é quanto o Brasil pode perder em produtividade até 2030 se ficar pra trás em IA.', source: 'FGV / MIT, 2024' },
                { metric: '44% → 10%', desc: '"usam IA", mas só 10% saíram do básico. Metade ainda improvisa.', source: 'PEGN, 2025' },
              ].map((item, i) => (
                <div key={`stat-${i}`} className="bg-white/[0.03] rounded-xl p-4 border border-green-500/15">
                  <p className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">{item.metric}</p>
                  <p className="text-neutral-400 text-xs leading-relaxed">{item.desc}</p>
                  {'source' in item && <p className="text-neutral-600 text-[10px] mt-1">{item.source}</p>}
                </div>
              ))}
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              80% das empresas no mundo já usam IA no dia a dia. No Brasil, 22% fazem de forma estruturada — e metade dos que "usam IA" ainda improvisa. O gap não é tecnologia. É execução. Quem entra agora, entra na frente.
            </p>
          </div>
        </section>

        {/* ===== A DOR ===== */}
        <section className="py-8 sm:py-10 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-3">
              {[
                { icon: '😰', title: 'Você faz tudo sozinho', text: 'Dono, gestor, operador, financeiro. E agora tem que entender IA também? Não tem braço, não tem tempo, e o medo de errar trava tudo.' },
                { icon: '🧊', title: 'Paralisia por medo de errar', text: 'Sabe que IA existe. Sabe que precisa. Mas não sabe por onde começar. Enquanto isso, o concorrente já atende com IA.' },
                { icon: '📼', title: 'Curso gravado que não vira ação', text: 'Assiste 10h de vídeo, anota tudo, e na segunda-feira não aplica nada.' },
                { icon: '🗑️', title: 'Ferramenta que ninguém usa', text: 'Paga por IA, deixa largada porque ninguém sabe usar. Todo mês, dinheiro no lixo.' },
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

        {/* ===== O QUE É ===== */}
        <section className="py-8 sm:py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-5">
              {badge('O remédio pra insegurança', 'mb-3')}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                O ZapClub não é um curso.<br />
                <span className="text-green-400">É um grupo de Implementação.</span>
              </h2>
            </div>

            {/* Foto da comunidade */}
            <div className="flex justify-center mb-5">
              <Image
                src="/zapclub-community.webp"
                alt="Comunidade ZapClub no WhatsApp"
                width={600} height={400}
                className="w-full max-w-lg rounded-xl border border-white/[0.06]"
                loading="lazy"
              />
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl mx-auto">
              Um espaço com outros empresários aplicando IA nos negócios deles, com suporte disponível 24h. Para te guiar passo a passo, responde na hora, adapta ao seu contexto. Não deixa você errar sozinho.
            </p>
            <p className="text-neutral-400 text-sm mb-6 max-w-2xl mx-auto">
              Você não assiste vídeo e torce pra dar certo na segunda. Você pergunta, testa, ajusta. Se travar, tem o moderador e a comunidade pra segurar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { icon: '🤖', label: 'Moderador de IA 24h' },
                { icon: '🎙️', label: 'Mande áudio, receba orientação na hora' },
                { icon: '🤝', label: 'Comunidade de empresários que aplicam IA' },
                { icon: '🔧', label: 'Prática no seu negócio' },
                { icon: '📊', label: 'Avaliação por nível' },
                { icon: '⏱️', label: 'Avança no seu ritmo' },
              ].map((item, i) => (
                <div key={`feat-${i}`} className="flex items-center gap-2 py-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-neutral-300 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRA QUEM É ===== */}
        <section className="py-8 sm:py-10 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4">
              {badge('Pra quem é o ZapClub', 'mb-2', 'green')}
              <p className="text-neutral-400 text-sm mb-6">Se você dá conta de tudo sozinho, sente que falta braço, e sabe que IA é o caminho mas tem medo de errar — esse espaço é seu.</p>
            </div>

            <div className="space-y-2 mb-6">
              {[
                'Tem medo de implementar IA errado',
                'Dá conta de tudo sozinho',
                'Já tentou IA, travou e deixou pra lá',
                'Falta braço pra tocar operação',
                'Quer dominar base pra não ser enganado',
                'Sabe que cada dia sem IA o concorrente ganha',
              ].map((item, i) => (
                <div key={`sim-${i}`} className="flex items-center gap-2 py-2">
                  <span className="text-[#22C55E] flex-shrink-0">✓</span>
                  <span className="text-neutral-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] pt-4 mt-4">
              <div className="text-center mb-4">
                {badge('Pra quem não é', 'mb-4', 'red')}
                <p className="text-neutral-500 text-xs">Se você busca atalho sem esforço, esse não é o lugar.</p>
              </div>
              <div className="space-y-1.5">
                {[
                    'Quer que IA resolva tudo sozinha',
                    'Não disposto a testar, errar e ajustar',
                    'Acha que vídeo gravado substitui acompanhamento',
                    'Acha que não precisa de IA',
                    ].map((item, i) => (
                  <div key={`nao-${i}`} className="flex items-center gap-2">
                    <span className="text-red-500/60 flex-shrink-0">✗</span>
                    <span className="text-neutral-500 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SISTEMA DE PROGRESSÃO (ELOS) + CTA DE IMPULSO ===== */}
        <section className="py-8 sm:py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              {badge('Sistema de Progressão', 'mb-3')}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Um caminho claro pra ter controle e segurança</h2>
              <p className="text-neutral-400 text-sm">Cada elo destrava o próximo. Você só avança quando faz na prática com o seu negócio.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
              {[
                { tier: 'Cobre', emoji: '🔶', name: 'Conquistador de Tokens', desc: 'Entende tokens, limites e quotas' },
                { tier: 'Prata', emoji: '🥈', name: 'Triangulador de Modelos', desc: 'Compara GPT, Claude, Gemini' },
                { tier: 'Ouro', emoji: '🥇', name: 'Manipulador de Ferramentas', desc: 'Busca na web, executa código' },
                { tier: 'Platina', emoji: '💎', name: 'Desenvolvedor de Skills', desc: 'Cria prompts reutilizáveis para o SEU negócio' },
                { tier: 'Diamante', emoji: '👑', name: 'Maestro de Rotinas', desc: 'Workflows que rodam enquanto você dorme' },
              ].map((item, i) => (
                <div key={`elo-${i}`} className="bg-white/[0.02] rounded-xl p-3.5 border border-white/[0.08]">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{item.tier}</span>
                  <div className="text-center my-2">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <h3 className="text-white text-xs font-bold mb-1">{item.name}</h3>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA 1 — IMPULSO */}
            <div className="text-center">
              <a
                href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] text-black px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98]"
              >
                QUERO FAZER PARTE
              </a>
              <p className="text-neutral-500 text-xs mt-2">R$ 50/mês · 7 dias de garantia</p>
            </div>
          </div>
        </section>

        {/* ===== RESULTADOS + CTA DE EMOÇÃO ===== */}
        <section className="py-8 sm:py-10 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              {badge('Depois do ZapClub', 'mb-3')}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">O que muda quando você para de fazer tudo sozinho</h2>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { icon: '🗣️', text: 'Conversa com dev e agência sem ser enganado. Sabe o que pedir.' },
                { icon: '🔍', text: 'Identifica automação antes do concorrente. Não depois.' },
                { icon: '🛡️', text: 'Implementa IA sem medo de perder dinheiro. Porque não tá sózinho.' },
                { icon: '⚡', text: 'Para de dar conta de tudo no braço. Passa a operar com braço extra que trabalha 24h.' },
              ].map((item, i) => (
                <div key={`result-${i}`} className="flex items-start gap-3 py-3 border-b border-white/[0.04]">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <p className="text-neutral-300 text-sm sm:text-base font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* CTA 2 — EMOÇÃO */}
            <div className="text-center">
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                O empresário que implementa IA hoje não é o que tem mais dinheiro. É o que não aguenta mais dar conta de tudo sozinho. Ele entra porque a insegurança de esperar é maior que a de tentar.
              </p>
              <a
                href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] text-black px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98]"
              >
                QUERO FAZER PARTE
              </a>
              <p className="text-neutral-500 text-xs mt-2">R$ 50/mês · 7 dias de garantia</p>
            </div>
          </div>
        </section>

        {/* ===== AUTORIDADE ===== */}
        <section className="py-8 sm:py-10 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-block mb-5">
              <div className="absolute -inset-4 rounded-full bg-green-500/20 blur-xl" />
              <Image
                src="/felipe-autoridade.webp"
                alt="Felipe Britto"
                width={176} height={176}
                className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full object-cover"
                loading="lazy"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Felipe Britto</h2>
            <p className="text-green-400 text-sm font-medium mb-5">IA aplicada a negócios reais, sem complicar o que precisa funcionar.</p>

            {badge('Quem conduz', 'mb-5')}

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 max-w-xl mx-auto">
              Eu criei o ZapClub para reunir empresários que querem usar IA na prática, mas não têm tempo para ficar perdidos entre ferramentas, promessas e tutoriais soltos.
            </p>
            <p className="text-neutral-400 text-sm mb-5 max-w-xl mx-auto">
              Minha experiência vem da operação: testando ferramentas, criando automações, estruturando sistemas e traduzindo tecnologia em soluções que pequenos negócios conseguem usar de verdade.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {[
                '3 anos aplicando IA em negócios',
                '20 anos em robótica e tecnologia',
                'Founder de 2 SaaS',
                'Atende empresas que dominam com IA',
              ].map((item, i) => (
                <span key={`cred-${i}`} className="border border-green-500/20 rounded-full px-3 py-1 text-[11px] text-neutral-400">
                  {item}
                </span>
              ))}
            </div>

            <p className="text-green-400 text-sm font-bold">Você aprende com quem opera. Não com quem só ensina teoria.</p>
          </div>
        </section>

        {/* ===== GARANTIA + CTA DE LÓGICA ===== */}
        <section className="py-8 sm:py-10 px-4 bg-[#0a0a0a]">
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl p-6 sm:p-8 border border-green-500/20 bg-white/[0.01]">
              <div className="text-center mb-6">
                <Image
                  src="/garantia-selo.webp"
                  alt="Garantia de 7 dias"
                  width={120} height={120}
                  className="w-28 sm:w-32 h-auto mx-auto mb-3 object-contain"
                  loading="lazy"
                />
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Se em até 7 dias você achar que o ZapClub não é pra você, devolvemos cada centavo. Sem perguntas, sem burocracia. O risco é todo nosso.
                </p>
              </div>

              <div className="text-center border-t border-white/[0.06] pt-5">
                <p className="text-neutral-400 text-sm mb-1">Você leu até aqui. Falta pouco pra destravar.</p>
                <p className="text-white font-bold text-xl mb-1">R$ 50<span className="text-neutral-500 text-sm">/mês</span></p>
                <p className="text-neutral-500 text-xs mb-5">Moderador de IA 24h · Grupo de empresários · Sem enrolação</p>

                {/* CTA 3 — LÓGICA */}
                <a
                  href="https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#22C55E] hover:bg-[#16A34A] text-black px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] w-full"
                >
                  QUERO FAZER PARTE
                </a>
                <p className="text-neutral-500 text-xs mt-2">7 dias de garantia · Risco zero</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}