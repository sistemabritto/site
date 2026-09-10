import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import { getStoredUtms, trackCta } from './_app';
import { ARCHITECTURE_SESSION, architectureCheckoutUrl } from '../lib/architecture-session';

const DELIVERABLES = [
  ['Prioridade', 'O problema que merece atenção primeiro e como avaliar se a mudança funcionou.'],
  ['Escopo', 'O que entra agora, o que fica de fora e a ordem de execução.'],
  ['Viabilidade', 'Integrações, dependências e estimativa de custos com premissas claras.'],
  ['Próximo passo', 'Adaptar uma ferramenta, ajustar processo, executar com apoio ou contratar implementação.'],
];

export default function ArchitectureSession() {
  const [checkout, setCheckout] = useState(architectureCheckoutUrl());
  useEffect(() => { setCheckout(architectureCheckoutUrl(getStoredUtms())); }, []);

  const onCheckout = (placement: string) => {
    // Analytics must never prevent a ready buyer from following the real anchor.
    try { trackCta(ARCHITECTURE_SESSION.path, 'arquitetura-checkout', placement); } catch { /* best effort */ }
  };
  const button = 'inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-green-400 px-6 py-4 text-center font-bold text-black transition-colors hover:bg-green-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green-300 sm:w-auto';

  return <>
    <Meta title="Sessão de Arquitetura com Felipe Britto | Plano para sua empresa"
      description="Defina prioridade, escopo, integrações e custos antes de investir em IA, CRM ou desenvolvimento. Sessão individual, mesma porta de entrada do Sprint e da Implementação."
      path={ARCHITECTURE_SESSION.path} />
    <main className="min-h-screen bg-surface-950 px-5 py-8 text-white sm:py-12">
      <div className="mx-auto max-w-3xl">
        <a href="/links" className="inline-flex min-h-11 items-center text-sm text-gray-300 underline underline-offset-4">Sistema Britto</a>
        <header className="py-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-400">Para donos e gestores · sessão individual</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Antes de investir em mais tecnologia, defina o que sua empresa precisa resolver.</h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">Você quer melhorar a presença digital, organizar os contatos no CRM ou aplicar IA na operação? Na Sessão de Arquitetura com Felipe Britto, transformamos seu contexto em prioridade, escopo e plano de execução.</p>
          <p className="mt-4 leading-relaxed text-gray-300">Traga o site e o problema que você identificou no material. A conversa começa pelo negócio — não pela ferramenta.</p>
          <div className="mt-8"><a href="#investimento" className={button}>Ver a entrega da sessão e o investimento →</a></div>
          <p className="mt-4 text-sm text-gray-400">Você compra uma sessão de planejamento. Desenvolvimento e acompanhamento não estão incluídos nesse valor.</p>
        </header>
        <section aria-labelledby="entrega" className="border-t border-surface-700 py-10">
          <h2 id="entrega" className="font-heading text-3xl font-bold">Uma decisão documentada, não mais uma lista de ferramentas.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">{DELIVERABLES.map(([title, copy]) => <article key={title} className="rounded-xl border border-surface-700 bg-surface-900 p-6"><h3 className="text-xl font-bold text-green-400">{title}</h3><p className="mt-3 leading-relaxed text-gray-300">{copy}</p></article>)}</div>
        </section>
        <section aria-labelledby="caminhos" className="border-t border-surface-700 py-10">
          <h2 id="caminhos" className="font-heading text-3xl font-bold">A mesma porta de entrada. A execução depende do seu caso.</h2>
          <p className="mt-5 leading-relaxed text-gray-300">Se fizer sentido avançar, o Sprint é o acompanhamento para executar com você; a Implementação é a construção feita para sua empresa. O valor da sessão é abatido conforme as condições da proposta. Você não precisa escolher um projeto completo antes da conversa.</p>
          <p className="mt-4 leading-relaxed text-gray-300">Se adaptar o que já existe ou mudar o processo for melhor, essa será a recomendação. Não há garantia de menção no ChatGPT ou de aumento de vendas.</p>
          <div className="mt-4 flex flex-wrap gap-x-6"><a className="inline-flex min-h-11 items-center text-green-400 underline underline-offset-4" href="/sprint-vibe-seller">Entender o Sprint</a><a className="inline-flex min-h-11 items-center text-green-400 underline underline-offset-4" href="/implementacao-vibe-seller">Entender a Implementação</a></div>
        </section>
        <section id="investimento" aria-labelledby="valor" className="scroll-mt-6 rounded-2xl border border-green-400/40 bg-surface-900 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-400">Sessão de Arquitetura</p>
          <h2 id="valor" className="mt-3 font-heading text-4xl font-bold">R$ {ARCHITECTURE_SESSION.price}</h2>
          <p className="mt-4 leading-relaxed text-gray-300">Pagamento único da sessão. Confira as condições no checkout antes de concluir. Após a confirmação, você recebe o acesso para escolher um horário disponível.</p>
          <ol className="my-6 list-decimal space-y-3 pl-5 text-gray-300"><li>Compre a sessão no checkout seguro da Cakto.</li><li>Receba as orientações e escolha o horário disponível.</li><li>Traga o contexto: site, processo atual e problema prioritário. Não envie senhas ou dados de clientes.</li></ol>
          <a href={checkout} onClick={() => onCheckout('sessao-investimento-v1')} className={button}>Comprar Sessão de Arquitetura · R$ {ARCHITECTURE_SESSION.price} →</a>
          <p className="mt-4 text-sm text-gray-400">Sem cadastro adicional neste site. O pagamento e os dados necessários são tratados no checkout. Contratação de projeto é uma decisão posterior.</p>
        </section>
        <section aria-labelledby="duvidas" className="py-10">
          <h2 id="duvidas" className="font-heading text-2xl font-bold">Antes de decidir</h2>
          <details className="mt-5 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">É uma implementação de SEO ou CRM por R$ 150?</summary><p className="mt-3 text-gray-300">Não. É a sessão individual para definir problema, prioridades e escopo. Mudanças no site, integrações ou desenvolvimento dependem de uma proposta de execução separada.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Preciso ser técnico ou já ter um projeto definido?</summary><p className="mt-3 text-gray-300">Não precisa programar. Traga uma necessidade concreta da empresa e participe da decisão. A sessão existe justamente para definir o que vale executar.</p></details>
          <details className="mt-4 rounded-xl border border-surface-700 p-5"><summary className="min-h-11 cursor-pointer py-2 font-bold">Onde confiro as condições da compra?</summary><p className="mt-3 text-gray-300">Confira preço e condições no checkout antes de pagar. As políticas do site estão nos links abaixo. Se houver dúvida sobre o escopo, esclareça antes da compra.</p></details>
        </section>
        <footer className="flex flex-wrap items-center gap-x-5 border-t border-surface-700 py-6 text-sm text-gray-400"><span>Felipe Britto · Sistema Britto</span><a href="/politicas-de-privacidade" className="inline-flex min-h-11 items-center underline">Privacidade</a><a href="/termos-de-uso" className="inline-flex min-h-11 items-center underline">Termos</a></footer>
      </div>
    </main>
  </>;
}
