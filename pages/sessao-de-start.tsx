import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import Image from 'next/image';
import { getStoredUtms, trackCta } from './_app';
import { ARCHITECTURE_SESSION, architectureCheckoutUrl } from '../lib/architecture-session';
import { weeklyAgendaCountdown, weekProgress, type DayState } from '../lib/weekly-agenda-countdown';

const DELIVERABLES = [
  ['PRD do seu projeto', 'O documento que sai da sessão: prioridade, escopo, critério de sucesso e o seu Gambito de Valor documentado, pronto pra executar com qualquer time, inclusive o nosso, ou pra você entregar direto pras suas próprias IAs construírem o projeto.'],
  ['Prioridade', 'O problema que merece atenção primeiro e como avaliar se a mudança funcionou.'],
  ['Viabilidade', 'Integrações, dependências e estimativa de custos com premissas claras, uso minha experiência pra desenhar a infraestrutura com o melhor custo-benefício possível pro seu caso.'],
  ['Próximo passo', 'Adaptar uma ferramenta, ajustar processo, executar com apoio ou contratar implementação.'],
];

export default function ArchitectureSession() {
  const [checkout, setCheckout] = useState(architectureCheckoutUrl());
  const [agendaCountdown, setAgendaCountdown] = useState('');
  const [weekDays, setWeekDays] = useState<{ label: string; state: DayState }[]>([]);
  useEffect(() => { setCheckout(architectureCheckoutUrl(getStoredUtms())); }, []);
  useEffect(() => {
    const update = () => { setAgendaCountdown(weeklyAgendaCountdown()); setWeekDays(weekProgress()); };
    update();
    // A cada segundo, de propósito — o contador com segundos precisa dar
    // sensação de movimento, não só marcar hora e minuto.
    const intervalId = window.setInterval(update, 1_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const onCheckout = (placement: string) => {
    // Analytics must never prevent a ready buyer from following the real anchor.
    try { trackCta(ARCHITECTURE_SESSION.path, 'arquitetura-checkout', placement); } catch { /* best effort */ }
  };
  const button = 'inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#a3ff12] px-6 py-4 text-center font-bold text-black transition-colors hover:bg-lime-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime-300 sm:w-auto';
  const buttonGhost = 'inline-flex min-h-11 items-center justify-center rounded-xl border border-[#a3ff12]/40 px-6 py-3 text-center font-bold text-[#a3ff12] transition-colors hover:bg-[#a3ff12]/10 sm:w-auto';

  return <>
    <Meta title={`${ARCHITECTURE_SESSION.name} com Felipe Britto | PRD do seu projeto em uma sessão`}
      description={`Saia com o PRD do seu projeto (prioridade, escopo, integrações e custos) antes de investir em IA, CRM ou desenvolvimento. R$ ${ARCHITECTURE_SESSION.price} (de R$ ${ARCHITECTURE_SESSION.originalPrice}), só ${ARCHITECTURE_SESSION.weeklySlots} agendas por semana nessa condição.`}
      path={ARCHITECTURE_SESSION.path} ogImage="/covers/sessao-de-start.png" />
    <main className="min-h-screen bg-surface-950 px-5 py-5 text-white sm:py-8">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Marca" className="flex items-center justify-between border-b border-white/10 pb-5">
          <a href="/" aria-label="Sistema Britto, início" className="inline-flex min-h-11 items-center"><Image src="/images/logo-sistema-britto.png" alt="Sistema Britto" width={180} height={60} className="h-11 w-auto" priority /></a>
          <span className="text-xs text-gray-400">Estratégia antes da execução</span>
        </nav>

        {/* 1. HEADLINE — dor, sem mecanismo, sem preço */}
        <header className="grid gap-10 py-8 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a3ff12]">{ARCHITECTURE_SESSION.name} · com Felipe Britto</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">Atenção não é o problema. É o que vem <span className="text-[#a3ff12]">depois dela</span>.</h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-300">Sua empresa atrai visita, lead, seguidor. O cliente ainda não fecha. Numa conversa, a gente decide o que corrigir primeiro, antes de comprar mais uma ferramenta.</p>
          <div className="mt-6"><a href="#gargalos" onClick={() => onCheckout('sessao-hero-scroll')} className={button}>Quero saber o que corrigir primeiro →</a></div>
          <p className="mt-3 text-sm text-gray-400">Sessão individual de planejamento com Felipe Britto.</p>
          </div>
          <aside aria-label="Sessão de Start" className="relative">
            <Image src="/covers/sessao-de-start.png" alt="Sessão de Start · Sistema Britto" width={1024} height={1024} className="w-full rounded-2xl border border-lime-400/25 object-cover" priority />
          </aside>
        </header>

        {/* 2. DORES — situação específica, consequência vivida, culpa nunca do leitor */}
        <section className="border-t border-surface-700 py-10" id="gargalos" aria-labelledby="gargalos-h">
          <h2 id="gargalos-h" className="font-heading text-3xl font-bold">Mais tráfego não conserta um caminho <span className="text-[#a3ff12]">interrompido</span>.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{[['Visibilidade sem próximo passo', 'O interessado encontra sua empresa, entende o que você faz, e mesmo assim não sabe por que entrar em contato agora.'], ['Cadastro sem continuidade', 'O contato chega (pelo site, pelo anúncio, pela indicação) e se perde entre formulário, WhatsApp e CRM sem ninguém dono da próxima ação.'], ['Ferramentas sem prioridade', 'Cada mês entra uma solução nova. Nenhuma delas resolve o gargalo real, porque ninguém parou pra descobrir qual é.']].map(([title, copy]) => <article key={title} className="rounded-xl border border-white/10 bg-surface-900 p-6"><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-lg leading-relaxed text-gray-300">{copy}</p></article>)}</div>
        </section>

        {/* 3. VANTAGENS DE RESOLVER — a visão do paraíso */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="vantagens">
          <h2 id="vantagens" className="font-heading text-3xl font-bold">O que muda quando existe um <span className="text-[#a3ff12]">documento</span>, não uma sensação.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{[['Você para de comprar no escuro', 'Cada ferramenta nova tem um motivo documentado, ou não entra.'], ['Sua empresa sabe o que fazer amanhã', 'Prioridade escrita substitui reunião repetida sobre o mesmo assunto.'], ['A conversa muda de figura', 'Você chega numa agência, num freelancer ou no seu próprio time já com escopo, não com uma ideia solta.']].map(([title, copy]) => <article key={title} className="rounded-xl border border-white/10 bg-surface-900 p-6"><h3 className="text-lg font-bold text-[#a3ff12]">{title}</h3><p className="mt-3 leading-relaxed text-gray-300">{copy}</p></article>)}</div>
        </section>

        {/* 4. CONTEXTO DA OPORTUNIDADE — por que agora */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="contexto">
          <h2 id="contexto" className="font-heading text-3xl font-bold">IA <span className="text-[#a3ff12]">baixou o custo</span> de construir quase qualquer coisa.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">O que ficou caro é saber o que construir primeiro. Se você veio do guia de visibilidade em IA, este é o próximo passo: decidir como transformar uma presença acessível em uma oferta clara e um atendimento que acompanha a oportunidade. Sem prometer citação no ChatGPT ou vendas garantidas.</p>
        </section>

        {/* 5. RAIZ DO PROBLEMA — reframe, culpa externa */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="raiz">
          <h2 id="raiz" className="font-heading text-3xl font-bold">Ninguém te ensinou a <span className="text-[#a3ff12]">priorizar</span>. Só a comprar mais uma ferramenta.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">Toda oferta de tecnologia vende a própria ferramenta como a prioridade. Nenhuma delas te ajuda a decidir <em>se</em> ela é a prioridade certa pro seu caso. O resultado é uma pilha de assinaturas resolvendo problemas que não eram os mais caros, enquanto o gargalo real continua exatamente onde estava.</p>
        </section>

        {/* 6. COMO A SOLUÇÃO RESOLVE — mecanismo (o PRD) */}
        <section aria-labelledby="entrega" className="border-t border-surface-700 py-10">
          <h2 id="entrega" className="font-heading text-3xl font-bold">Uma decisão <span className="text-[#a3ff12]">documentada</span>, não mais uma lista de ferramentas.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">{DELIVERABLES.map(([title, copy]) => <article key={title} className="rounded-xl border border-surface-700 bg-surface-900 p-6"><h3 className="text-xl font-bold text-green-400">{title}</h3><p className="mt-3 leading-relaxed text-gray-300">{copy}</p></article>)}</div>
        </section>

        {/* 7. INTENÇÕES DO CRIADOR — humaniza, cria confiança */}
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface-900 p-6 sm:flex-row sm:items-center sm:p-8" aria-labelledby="felipe">
          <Image src="/felipe-autoridade.webp" alt="Felipe Britto" width={160} height={160} className="h-32 w-32 rounded-2xl object-cover" />
          <div><p className="text-xs font-semibold uppercase tracking-wider text-[#a3ff12]">Quem conduz a sessão</p><h2 id="felipe" className="mt-2 text-2xl font-bold">Felipe Britto · Sistema Britto</h2><p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-300">A conversa conecta o problema do negócio à execução: IA, CRM, automação e sistemas. A {ARCHITECTURE_SESSION.name} existe para definir uma direção antes de propor um Sprint ou uma Implementação, inclusive quando o melhor caminho é aproveitar o que você já tem.</p></div>
        </section>

        {/* 8. INIMIGO COMUM — externo, específico, nunca o leitor */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="inimigo">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-2xl" aria-hidden="true">🎯</span>
            <h2 id="inimigo" className="font-heading text-3xl font-bold">O <span className="text-[#a3ff12]">vilão</span> não é você. É quem te vende ferramenta antes de te ouvir.</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">{[['Agência', 'chega com pacote fechado'], ['Curso', 'promete o mesmo sistema pra todo mundo'], ['Vendedor', 'empurra a licença mensal antes de entender sua operação']].map(([who, what]) => <div key={who} className="rounded-lg border border-white/10 bg-surface-900 p-4"><p className="font-bold text-white">{who}</p><p className="mt-1 text-sm text-gray-300">{what}</p></div>)}</div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">Todos vendem <strong className="text-white">a solução deles</strong>, não a prioridade da sua empresa. É esse o padrão que a sessão quebra: primeiro o diagnóstico, escrito, com o seu nome; depois, se fizer sentido, a ferramenta.</p>
        </section>

        {/* 9. CUSTO DA INAÇÃO — temporal, real, sem número inventado */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="custo">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-2xl" aria-hidden="true">⏳</span>
            <h2 id="custo" className="font-heading text-3xl font-bold">Cada semana sem prioridade clara é mais uma tentativa no <span className="text-[#a3ff12]">escuro</span>.</h2>
          </div>
          <ul className="mt-6 space-y-3">{['Mais uma ferramenta comprada por impulso porque “todo mundo tá usando”.', 'Mais uma reunião que termina sem decisão.', 'Mais um mês adiando o que já dá pra resolver.'].map((item) => <li key={item} className="flex gap-3 rounded-lg border border-white/10 bg-surface-900 p-4 text-gray-300"><span className="text-[#a3ff12]" aria-hidden="true">→</span><span>{item}</span></li>)}</ul>
          <p className="mt-5 max-w-3xl leading-relaxed text-gray-300">Decidir sem escopo é decidir no escuro, e no escuro a resposta mais fácil é sempre &ldquo;vamos deixar como está&rdquo;.</p>
        </section>

        {/* 10. OUTRO LADO DA MOEDA — contraste após o medo */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="outro-lado">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-2xl" aria-hidden="true">💡</span>
            <h2 id="outro-lado" className="font-heading text-3xl font-bold">Com o <span className="text-[#a3ff12]">PRD</span> em mãos, a próxima decisão de tecnologia para de ser <span className="text-[#a3ff12]">aposta</span>.</h2>
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">A mesma pergunta que hoje gera três reuniões vira uma consulta ao documento. Contratar, adaptar ou esperar deixa de ser sensação: vira <strong className="text-white">critério escrito</strong>, que você pode mostrar pra sócio, investidor ou pra quem for executar.</p>
        </section>

        {/* 11. PROVA VISUAL — o entregável real, sem depoimento inventado */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="prova">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-500/10 text-2xl" aria-hidden="true">📄</span>
            <h2 id="prova" className="font-heading text-3xl font-bold"><span className="text-[#a3ff12]">Literalmente</span> isto é o que você recebe.</h2>
          </div>
          <div className="mt-6 rounded-xl border border-surface-700 bg-surface-900 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">O documento tem 4 blocos</p>
            <div className="mt-3 flex flex-wrap gap-2">{['PRD do projeto', 'Prioridade', 'Viabilidade', 'Próximo passo'].map((b) => <span key={b} className="rounded-full border border-[#a3ff12]/40 bg-[#a3ff12]/10 px-3 py-1 text-sm font-semibold text-[#a3ff12]">{b}</span>)}</div>
            <p className="mt-4 leading-relaxed text-gray-300">Não é um relatório genérico de 20 páginas. Pronto pra você executar sozinho, com sua equipe, ou com a gente.</p>
          </div>
        </section>

        {/* 12. 1º CTA DE URGÊNCIA — escassez real, ainda sem preço */}
        <section className="relative overflow-hidden rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-500/15 via-surface-900 to-surface-900 p-6 sm:p-10" aria-label="Condição da semana">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-violet-300/30 bg-violet-300/10 px-6 py-5 text-center">
              <p className="font-heading text-5xl font-black leading-none text-white">{ARCHITECTURE_SESSION.weeklySlots}<span className="text-2xl font-bold text-violet-200"> de {ARCHITECTURE_SESSION.weeklySlots}</span></p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-200">vagas com condição especial</p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">Essa semana</p>
              <h3 className="mt-1 font-heading text-2xl font-bold text-white">A agenda do Felipe não escala.</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-gray-300">A condição especial vale só pra essas {ARCHITECTURE_SESSION.weeklySlots} conversas, não é número de marketing, é o limite real da semana dele. Depois de domingo à 00h, o ciclo fecha e reabre com um lote novo, do zero, <strong className="text-white">sem garantia de que o valor promocional se repete</strong>.</p>
              <div className="mt-4 flex gap-1.5" aria-hidden="true">
                {(weekDays.length ? weekDays : [{ label: 'SEG', state: 'future' as DayState }, { label: 'TER', state: 'future' as DayState }, { label: 'QUA', state: 'future' as DayState }, { label: 'QUI', state: 'future' as DayState }, { label: 'SEX', state: 'future' as DayState }, { label: 'SAB', state: 'future' as DayState }, { label: 'DOM', state: 'future' as DayState }]).map((day) => (
                  <div key={day.label} className={`flex-1 rounded-md py-1.5 text-center text-[10px] font-bold tracking-wide ${day.state === 'today' ? 'bg-[#a3ff12] text-black' : day.state === 'past' ? 'bg-white/5 text-white/25' : 'bg-violet-300/15 text-violet-100'}`}>{day.label}</div>
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-violet-100">⏳ {agendaCountdown ? `Fecha em ${agendaCountdown}` : 'calculando horário…'}</p>
              <div className="mt-5"><a href="#investimento" className={buttonGhost}>Ver como funciona a agenda ↓</a></div>
            </div>
          </div>
        </section>

        {/* 13. AS 3 PARTES — provocante / racional / misteriosa */}
        <section className="border-t border-surface-700 py-10" aria-labelledby="tres-partes">
          <h2 id="tres-partes" className="font-heading text-3xl font-bold">O que costuma acontecer numa sessão</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-white/10 bg-surface-900 p-6"><h3 className="text-lg font-bold">&ldquo;Como assim isso nunca teve nome?&rdquo;</h3><p className="mt-3 leading-relaxed text-gray-300">Boa parte dos gargalos que aparecem na sessão já existiam há meses. Só nunca tinham sido descritos numa frase, e uma vez descritos, ficam óbvios.</p></article>
            <article className="rounded-xl border border-white/10 bg-surface-900 p-6"><h3 className="text-lg font-bold">As mesmas 3 perguntas voltam sempre</h3><p className="mt-3 leading-relaxed text-gray-300">WhatsApp, CRM e prioridade aparecem em quase toda sessão, em negócios completamente diferentes. O padrão se repete: a resposta certa, não.</p></article>
            <article className="rounded-xl border border-white/10 bg-surface-900 p-6"><h3 className="text-lg font-bold">Tem uma pergunta que muda a sessão</h3><p className="mt-3 leading-relaxed text-gray-300">Normalmente aparece depois da quinta pergunta, e não é sobre tecnologia. Quem já passou pela sessão sabe qual é.</p></article>
          </div>
        </section>

        {/* Caminhos pro Sprint/Implementação — contexto antes do preço final */}
        <section aria-labelledby="caminhos" className="border-t border-surface-700 py-10">
          <h2 id="caminhos" className="font-heading text-3xl font-bold">A mesma porta de entrada. A execução depende do seu caso.</h2>
          <p className="mt-5 leading-relaxed text-gray-300">Se fizer sentido avançar, o Sprint é o acompanhamento para executar com você; a Implementação é a construção feita para sua empresa. O valor da sessão entra como crédito total no projeto, você não paga de novo pelo diagnóstico. Você não precisa escolher um projeto completo antes da conversa.</p>
          <p className="mt-4 leading-relaxed text-gray-300">Se adaptar o que já existe ou mudar o processo for melhor, essa será a recomendação. Não há garantia de menção no ChatGPT ou de aumento de vendas.</p>
          <div className="mt-4 flex flex-wrap gap-x-6"><a className="inline-flex min-h-11 items-center text-green-400 underline underline-offset-4" href="/sprint-vibe-seller">Entender o Sprint</a><a className="inline-flex min-h-11 items-center text-green-400 underline underline-offset-4" href="/implementacao-vibe-seller">Entender a Implementação</a></div>
        </section>

        {/* 14. CTA FINAL COM PREÇO + GARANTIA */}
        <section id="investimento" aria-labelledby="valor" className="scroll-mt-6 rounded-2xl border border-green-400/40 bg-surface-900 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-400">{ARCHITECTURE_SESSION.name}</p>
          <div className="mt-3 flex items-end gap-3">
            <h2 id="valor" className="font-heading text-4xl font-bold">R$ {ARCHITECTURE_SESSION.price}</h2>
            <p className="mb-1 text-lg text-gray-500 line-through">R$ {ARCHITECTURE_SESSION.originalPrice}</p>
          </div>
          <p className="mt-2 text-sm font-semibold text-violet-200">50% de desconto, condição válida só pros {ARCHITECTURE_SESSION.weeklySlots} primeiros a decidir dar o start nesta semana. Depois disso, volta a R$ {ARCHITECTURE_SESSION.originalPrice}.</p>
          <p className="mt-2 text-sm font-medium text-slate-300">Se você avançar pro Sprint ou pra Implementação, o valor pago aqui vira crédito total no projeto.</p>
          <div className="mt-6"><a href={checkout} onClick={() => onCheckout('sessao-investimento-v2')} className={button}>Quero dar o start no meu projeto →</a></div>
        </section>

        <section aria-labelledby="duvidas" className="py-10">
          <h2 id="duvidas" className="font-heading text-2xl font-bold">Antes de <span className="text-[#a3ff12]">decidir</span></h2>
          <details className="mt-5 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">O que eu recebo depois de comprar?</summary><p className="mt-3 text-gray-300">A Cakto confirma o pagamento e você recebe o acesso para escolher um horário disponível. Antes da conversa, traga o contexto: site, processo atual e o problema que mais te incomoda. Não envie senha ou dado de cliente, a sessão não precisa disso.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">É uma implementação de SEO ou CRM por R$ 150?</summary><p className="mt-3 text-gray-300">Não. É a sessão individual para definir problema, prioridades e escopo: o PRD do seu projeto. Mudanças no site, integrações ou desenvolvimento dependem de uma proposta de execução separada.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Preciso ser técnico ou já ter um projeto definido?</summary><p className="mt-3 text-gray-300">Não precisa programar. Traga uma necessidade concreta da empresa e participe da decisão. A sessão existe justamente para definir o que vale executar.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Por que R$ 150 e não R$ 300?</summary><p className="mt-3 text-gray-300">R$ 300 é o valor normal. A condição de 50% de desconto vale só pros {ARCHITECTURE_SESSION.weeklySlots} primeiros a decidir dar o start na semana, depois disso, o preço volta a R$ {ARCHITECTURE_SESSION.originalPrice} até o próximo ciclo, sem garantia de que a promoção se repete.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Se eu avançar pro Sprint ou Implementação, pago a sessão de novo?</summary><p className="mt-3 text-gray-300">Não. <strong className="text-white">O valor pago aqui vira crédito total no projeto</strong> (inteiro, não parcial). Se você pagou R$ 150 na sessão e o Sprint ou a Implementação custam R$ 5.000, o que falta pagar é R$ 4.850. Não existe cobrar a sessão de novo em nenhuma etapa seguinte.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Posso usar o PRD com minhas próprias IAs, sem contratar vocês?</summary><p className="mt-3 text-gray-300">Pode. O documento é seu: prioridade, escopo e critério de sucesso por escrito servem de instrução tanto pra um time humano quanto pras IAs que você já usa. A sessão define o quê construir; quem constrói é decisão sua.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Onde confiro as condições da compra?</summary><p className="mt-3 text-gray-300">Confira preço e condições no checkout antes de pagar. As políticas do site estão no rodapé. Se houver dúvida sobre o escopo, esclareça antes da compra.</p></details>
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
