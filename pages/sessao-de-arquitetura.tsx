import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import Image from 'next/image';
import { getStoredUtms, trackCta } from './_app';
import { ARCHITECTURE_SESSION, architectureCheckoutUrl } from '../lib/architecture-session';
import { weeklyAgendaCountdown } from '../lib/weekly-agenda-countdown';

const DELIVERABLES = [
  ['PRD do seu projeto', 'O documento que sai da sessão: prioridade, escopo, critério de sucesso e o seu Gambito de Valor documentado — pronto pra executar com qualquer time, inclusive o nosso.'],
  ['Prioridade', 'O problema que merece atenção primeiro e como avaliar se a mudança funcionou.'],
  ['Viabilidade', 'Integrações, dependências e estimativa de custos com premissas claras.'],
  ['Próximo passo', 'Adaptar uma ferramenta, ajustar processo, executar com apoio ou contratar implementação.'],
];

export default function ArchitectureSession() {
  const [checkout, setCheckout] = useState(architectureCheckoutUrl());
  const [agendaCountdown, setAgendaCountdown] = useState('');
  useEffect(() => { setCheckout(architectureCheckoutUrl(getStoredUtms())); }, []);
  useEffect(() => {
    const updateCountdown = () => setAgendaCountdown(weeklyAgendaCountdown());
    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const onCheckout = (placement: string) => {
    // Analytics must never prevent a ready buyer from following the real anchor.
    try { trackCta(ARCHITECTURE_SESSION.path, 'arquitetura-checkout', placement); } catch { /* best effort */ }
  };
  const button = 'inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#a3ff12] px-6 py-4 text-center font-bold text-black transition-colors hover:bg-lime-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime-300 sm:w-auto';

  return <>
    <Meta title={`${ARCHITECTURE_SESSION.name} com Felipe Britto | PRD do seu projeto em uma sessão`}
      description={`Saia com o PRD do seu projeto — prioridade, escopo, integrações e custos — antes de investir em IA, CRM ou desenvolvimento. R$ ${ARCHITECTURE_SESSION.price} (de R$ ${ARCHITECTURE_SESSION.originalPrice}), só ${ARCHITECTURE_SESSION.weeklySlots} agendas por semana nessa condição.`}
      path={ARCHITECTURE_SESSION.path} ogImage="/consultoria-a-laser-hero.jpg" />
    <main className="min-h-screen bg-surface-950 px-5 py-5 text-white sm:py-8">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Marca" className="flex items-center justify-between border-b border-white/10 pb-5">
          <a href="/" aria-label="Sistema Britto — início" className="inline-flex min-h-11 items-center"><Image src="/images/logo-sistema-britto.png" alt="Sistema Britto" width={180} height={60} className="h-11 w-auto" priority /></a>
          <span className="text-xs text-gray-400">Estratégia antes da execução</span>
        </nav>
        <header className="grid gap-10 py-8 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a3ff12]">{ARCHITECTURE_SESSION.name} · com Felipe Britto</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">Transforme interesse em um caminho claro até a venda.</h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-300">Sua empresa atrai atenção, mas o cliente não avança? Em uma sessão, a gente define o que corrigir no site, no CRM e na operação — e você sai com o PRD do projeto documentado, antes de comprar mais uma ferramenta.</p>
          <div className="mt-6"><a href={checkout} onClick={() => onCheckout('sessao-hero-v2')} className={button}>Quero meu PRD · R$ {ARCHITECTURE_SESSION.price} →</a></div>
          <p className="mt-3 text-sm text-gray-400">Sessão individual de planejamento. Implementação à parte. Pagamento via Cakto; agendamento após confirmação.</p>
          </div>
          <aside aria-label="Condição da semana" className="relative">
            <Image src="/consultoria-a-laser-hero.jpg" alt="Felipe Britto — Consultoria a Laser" width={1024} height={1024} className="mb-5 w-full rounded-2xl border border-lime-400/25 object-cover" priority />
            <div className="rounded-2xl border border-lime-400/25 bg-gradient-to-br from-lime-400/10 via-surface-900 to-surface-900 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">Porta de entrada</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="font-heading text-5xl font-black leading-none tracking-[-0.06em] text-white">R$ {ARCHITECTURE_SESSION.price}</p>
              <p className="mb-1 text-sm text-slate-500 line-through">R$ {ARCHITECTURE_SESSION.originalPrice}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">O valor vira crédito total se você avançar pro Sprint ou pra Implementação.</p>
            <div className="mt-5 rounded-2xl border border-violet-300/25 bg-violet-300/[0.08] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-white">{ARCHITECTURE_SESSION.weeklySlots} agendas nesta condição</p>
                <span className="rounded-full border border-violet-200/30 bg-violet-200/10 px-2.5 py-1 text-xs font-bold text-violet-100">semanal</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5" aria-label={`Condição limitada a ${ARCHITECTURE_SESSION.weeklySlots} agendas por semana`}>
                <span className="h-1.5 rounded-full bg-violet-200" />
                <span className="h-1.5 rounded-full bg-violet-200" />
                <span className="h-1.5 rounded-full bg-violet-200" />
              </div>
              <p className="mt-3 text-xs text-violet-100/85">Novo ciclo domingo, 00h · {agendaCountdown ? `renova em ${agendaCountdown}` : 'calculando horário…'}</p>
            </div>
            <ol className="mt-6 space-y-5 border-t border-white/10 pt-6">{[['01', 'Encontrar o ponto de perda', 'O visitante chega, entende a oferta e consegue avançar?'], ['02', 'Escolher a correção prioritária', 'Copy, formulário, atendimento ou integração: o que vem primeiro?'], ['03', 'Documentar o PRD', 'Seu Gambito de Valor: escopo, dependências, custos e critério de sucesso, prontos pra executar.']].map(([n, title, copy]) => <li key={n} className="flex gap-4"><span className="text-sm font-bold text-[#a3ff12]">{n}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-gray-300">{copy}</p></div></li>)}</ol>
            </div>
          </aside>
        </header>
        <section className="border-t border-surface-700 py-10" aria-labelledby="gargalos">
          <h2 id="gargalos" className="font-heading text-3xl font-bold">Mais tráfego não conserta um caminho interrompido.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{[['Visibilidade sem próximo passo', 'O interessado encontra sua empresa, mas não entende por que entrar em contato.'], ['Cadastro sem continuidade', 'O contato chega, mas se perde entre formulário, WhatsApp e CRM.'], ['Ferramentas sem prioridade', 'Cada nova solução cria outra integração — sem resolver o problema que trava a venda.']].map(([title, copy]) => <article key={title} className="rounded-xl border border-white/10 bg-surface-900 p-6"><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-lg leading-relaxed text-gray-300">{copy}</p></article>)}</div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">Se você veio do guia de visibilidade em IA, este é o próximo passo: decidir como transformar uma presença acessível em uma oferta clara e um atendimento que acompanha a oportunidade. Sem prometer citação no ChatGPT ou vendas garantidas.</p>
        </section>
        <section aria-labelledby="entrega" className="border-t border-surface-700 py-10">
          <h2 id="entrega" className="font-heading text-3xl font-bold">Uma decisão documentada, não mais uma lista de ferramentas.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">{DELIVERABLES.map(([title, copy]) => <article key={title} className="rounded-xl border border-surface-700 bg-surface-900 p-6"><h3 className="text-xl font-bold text-green-400">{title}</h3><p className="mt-3 leading-relaxed text-gray-300">{copy}</p></article>)}</div>
          <div className="mt-8"><a href={checkout} onClick={() => onCheckout('sessao-entrega-v2')} className={button}>Quero meu PRD · R$ {ARCHITECTURE_SESSION.price} →</a></div>
        </section>
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface-900 p-6 sm:flex-row sm:items-center sm:p-8" aria-labelledby="felipe">
          <Image src="/felipe-autoridade.webp" alt="Felipe Britto" width={160} height={160} className="h-32 w-32 rounded-2xl object-cover" />
          <div><p className="text-xs font-semibold uppercase tracking-wider text-[#a3ff12]">Quem conduz a sessão</p><h2 id="felipe" className="mt-2 text-2xl font-bold">Felipe Britto · Sistema Britto</h2><p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-300">A conversa conecta o problema do negócio à execução: IA, CRM, automação e sistemas. A {ARCHITECTURE_SESSION.name} existe para definir uma direção antes de propor um Sprint ou uma Implementação — inclusive quando o melhor caminho é aproveitar o que você já tem.</p></div>
        </section>
        <section aria-labelledby="caminhos" className="border-t border-surface-700 py-10">
          <h2 id="caminhos" className="font-heading text-3xl font-bold">A mesma porta de entrada. A execução depende do seu caso.</h2>
          <p className="mt-5 leading-relaxed text-gray-300">Se fizer sentido avançar, o Sprint é o acompanhamento para executar com você; a Implementação é a construção feita para sua empresa. Os R$ {ARCHITECTURE_SESSION.price} da sessão entram como crédito total no valor do projeto — você não paga de novo pelo diagnóstico. Você não precisa escolher um projeto completo antes da conversa.</p>
          <p className="mt-4 leading-relaxed text-gray-300">Se adaptar o que já existe ou mudar o processo for melhor, essa será a recomendação. Não há garantia de menção no ChatGPT ou de aumento de vendas.</p>
          <div className="mt-4 flex flex-wrap gap-x-6"><a className="inline-flex min-h-11 items-center text-green-400 underline underline-offset-4" href="/sprint-vibe-seller">Entender o Sprint</a><a className="inline-flex min-h-11 items-center text-green-400 underline underline-offset-4" href="/implementacao-vibe-seller">Entender a Implementação</a></div>
        </section>
        <section id="investimento" aria-labelledby="valor" className="scroll-mt-6 rounded-2xl border border-green-400/40 bg-surface-900 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-400">{ARCHITECTURE_SESSION.name}</p>
          <div className="mt-3 flex items-end gap-3">
            <h2 id="valor" className="font-heading text-4xl font-bold">R$ {ARCHITECTURE_SESSION.price}</h2>
            <p className="mb-1 text-lg text-gray-500 line-through">R$ {ARCHITECTURE_SESSION.originalPrice}</p>
          </div>
          <p className="mt-2 text-sm font-semibold text-violet-200">Só {ARCHITECTURE_SESSION.weeklySlots} agendas por semana nessa condição — ciclo novo todo domingo, 00h.</p>
          <p className="mt-4 leading-relaxed text-gray-300">Pagamento único da sessão. Confira as condições no checkout antes de concluir. Após a confirmação, você recebe o acesso para escolher um horário disponível.</p>
          <ol className="my-6 list-decimal space-y-3 pl-5 text-gray-300"><li>Compre a sessão no checkout seguro da Cakto.</li><li>Receba as orientações e escolha o horário disponível.</li><li>Traga o contexto: site, processo atual e problema prioritário. Não envie senhas ou dados de clientes.</li></ol>
          <a href={checkout} onClick={() => onCheckout('sessao-investimento-v2')} className={button}>Quero minha {ARCHITECTURE_SESSION.name} · R$ {ARCHITECTURE_SESSION.price} →</a>
          <p className="mt-4 text-sm text-gray-400">Sem cadastro adicional neste site. O pagamento e os dados necessários são tratados no checkout. Contratação de projeto é uma decisão posterior.</p>
        </section>
        <section aria-labelledby="duvidas" className="py-10">
          <h2 id="duvidas" className="font-heading text-2xl font-bold">Antes de decidir</h2>
          <details className="mt-5 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">É uma implementação de SEO ou CRM por R$ 150?</summary><p className="mt-3 text-gray-300">Não. É a sessão individual para definir problema, prioridades e escopo — o PRD do seu projeto. Mudanças no site, integrações ou desenvolvimento dependem de uma proposta de execução separada.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Preciso ser técnico ou já ter um projeto definido?</summary><p className="mt-3 text-gray-300">Não precisa programar. Traga uma necessidade concreta da empresa e participe da decisão. A sessão existe justamente para definir o que vale executar.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Por que R$ 150 e não R$ 300?</summary><p className="mt-3 text-gray-300">R$ 300 é o valor normal. Como a sessão é individual e depende da agenda do Felipe, apenas as {ARCHITECTURE_SESSION.weeklySlots} primeiras agendas liberadas na semana entram no valor promocional de R$ {ARCHITECTURE_SESSION.price}.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Se eu avançar pro Sprint ou Implementação, pago a sessão de novo?</summary><p className="mt-3 text-gray-300">Não. O valor pago na sessão (R$ 150 ou R$ 300) entra como crédito total no projeto — não é descontado parcialmente, é abatido inteiro.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Onde confiro as condições da compra?</summary><p className="mt-3 text-gray-300">Confira preço e condições no checkout antes de pagar. As políticas do site estão nos links abaixo. Se houver dúvida sobre o escopo, esclareça antes da compra.</p></details>
        </section>
        <footer className="flex flex-wrap items-center gap-x-5 border-t border-surface-700 py-6 text-sm text-gray-400"><span>Felipe Britto · Sistema Britto</span><a href="/politicas-de-privacidade" className="inline-flex min-h-11 items-center underline">Privacidade</a><a href="/termos-de-uso" className="inline-flex min-h-11 items-center underline">Termos</a></footer>
      </div>
    </main>
  </>;
}
