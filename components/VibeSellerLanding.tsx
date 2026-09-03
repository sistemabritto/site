import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import Meta from './Meta';
import PhoneInput from './PhoneInput';
import { getStoredUtms, trackCta } from '../pages/_app';

type OfferKind = 'desafio' | 'sprint' | 'implementacao';

type OfferConfig = {
  kind: OfferKind;
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  emphasis: string;
  lead: string;
  price: string;
  primaryCta: string;
  formTitle: string;
  formLead: string;
  submitLabel: string;
  checkout: boolean;
  proof: string;
  steps: { label: string; title: string; copy: string }[];
  deliverables: string[];
  fit: string[];
  notFit: string[];
  faqs: { question: string; answer: string }[];
  nextStep: { title: string; copy: string; href?: string; cta?: string };
  schema: Record<string, unknown>[];
};

const OFFERS: Record<OfferKind, OfferConfig> = {
  desafio: {
    kind: 'desafio',
    path: '/desafio-monetizar-com-ia',
    metaTitle: 'Desafio Monetizar com IA | 21 dias para validar uma oportunidade',
    metaDescription: 'Em 21 dias, encontre um problema caro, transforme-o em uma oferta ou solução testável e coloque a primeira validação no mundo. R$ 97.',
    eyebrow: '21 dias · R$ 97 · Método Mapa Vibe Seller',
    headline: 'Não procure a próxima ideia de SaaS.',
    emphasis: 'Encontre uma forma de monetizar valor com IA.',
    lead: 'Você não entra para colecionar ferramenta, prompt ou aula. Entra para rastrear um problema caro, decidir se vale construir e colocar uma hipótese real no mercado.',
    price: 'R$ 97',
    primaryCta: 'Quero entrar no Desafio',
    formTitle: 'Sua inscrição no Desafio',
    formLead: 'Preencha seus dados para abrir o checkout. Você receberá as instruções da turma no contato informado após a confirmação.',
    submitLabel: 'Ir para o checkout →',
    checkout: true,
    proof: 'A tese vem de operação real: produto que não reteve, diferencial que a IA commoditizou e tecnologia que virou equity. O método existe para você não construir no escuro.',
    steps: [
      { label: 'Dias 1–7', title: 'Rastrear', copy: 'Escolha uma dor, estime o custo da inação e defina quem sente e quem paga.' },
      { label: 'Dias 8–14', title: 'Vibe Codar', copy: 'Decida build, buy ou ignore; monte a menor oferta, proposta ou solução capaz de ser testada.' },
      { label: 'Dias 15–21', title: 'Monetizar', copy: 'Leve a hipótese ao mercado, leia a resposta e decida com evidência: seguir, ajustar ou matar.' },
    ],
    deliverables: [
      '21 missões curtas organizadas em três sprints',
      'Mapa Vibe Seller para priorizar oportunidade, comprador e captura de valor',
      'Matriz Build / Buy / Ignore para não criar software commodity',
      'Roteiros de conversa, pré-venda, página e teste mínimo',
      'Checkpoints coletivos gravados — sem consultoria individual disfarçada',
    ],
    fit: [
      'Você constrói, vende ou opera e tem acesso a um nicho, negócio ou audiência.',
      'Você quer encontrar receita, economia, margem ou equity — não só uma ferramenta nova.',
      'Você aceita falar com mercado e testar uma hipótese antes de construir por semanas.',
    ],
    notFit: [
      'Você procura promessa de faturamento em prazo fixo.',
      'Você quer uma lista pronta de “ideias de SaaS”.',
      'Você quer acompanhamento individual diário por R$ 97.',
    ],
    faqs: [
      { question: 'Vou faturar em 21 dias?', answer: 'Não existe promessa de faturamento em prazo fixo. O resultado do Desafio é uma oportunidade priorizada, uma oferta ou solução testável e uma validação real; faturamento depende de problema, comprador, proposta e execução.' },
      { question: 'Preciso saber programar?', answer: 'Não. Construir é uma das decisões possíveis. Em alguns casos a resposta correta será comprar, ajustar processo ou vender serviço antes de escrever código.' },
      { question: 'O que é o Mapa Vibe Seller?', answer: 'É a ferramenta de decisão do Desafio. Ela organiza dor, custo da inação, comprador, distribuição, build versus buy, risco de comoditização e próximo teste.' },
      { question: 'E se eu encontrar uma oportunidade maior?', answer: 'Quem tiver uma operação, dor comprovada e poder de decisão pode aplicar para o Sprint Vibe Seller, que transforma a oportunidade em plano e mini-PRD.' },
    ],
    nextStep: { title: 'Encontrou uma oportunidade maior?', copy: 'Se ela atravessa áreas, integrações ou investimento, o Sprint Vibe Seller transforma a hipótese em decisão de negócio e roadmap.', href: '/sprint-vibe-seller', cta: 'Conhecer o Sprint →' },
    schema: [{
      '@type': 'Course',
      '@id': 'https://www.sistemabritto.com.br/desafio-monetizar-com-ia#course',
      name: 'Desafio Monetizar com IA',
      description: 'Desafio de 21 dias para rastrear uma oportunidade, decidir build versus buy e validar uma forma de capturar valor com IA.',
      provider: { '@id': 'https://www.sistemabritto.com.br/#organization' },
      url: 'https://www.sistemabritto.com.br/desafio-monetizar-com-ia',
      offers: { '@type': 'Offer', price: '97.00', priceCurrency: 'BRL', availability: 'https://schema.org/PreOrder' },
    }],
  },
  sprint: {
    kind: 'sprint',
    path: '/sprint-vibe-seller',
    metaTitle: 'Sprint Vibe Seller | Diagnóstico, decisão e mini-PRD',
    metaDescription: 'Em até 7 dias, transforme uma oportunidade plausível em uma decisão de negócio, mapa de captura de valor e roadmap de 30 dias. R$ 1.497.',
    eyebrow: 'Diagnóstico produtizado · R$ 1.497',
    headline: 'Você encontrou um problema.',
    emphasis: 'Agora precisa decidir se vale atacar.',
    lead: 'O Sprint Vibe Seller transforma uma oportunidade plausível em uma decisão de negócio: construir, comprar, vender serviço, licenciar ou descartar antes de gastar energia no caminho errado.',
    price: 'R$ 1.497',
    primaryCta: 'Quero aplicar para o Sprint',
    formTitle: 'Aplicação para o Sprint',
    formLead: 'Conte qual processo está travando sua operação. A aplicação existe para garantir que o Sprint é o nível certo antes de qualquer pagamento.',
    submitLabel: 'Enviar aplicação →',
    checkout: false,
    proof: 'Não é uma call solta. Você termina com um ativo de decisão: problema, vazamento, escolha build/buy, recomendação e plano de 30 dias.',
    steps: [
      { label: 'Etapa 1', title: 'Diagnóstico', copy: 'Mapeamos o processo atual, onde o valor vaza e quais premissas precisam ser verificadas.' },
      { label: 'Etapa 2', title: 'Decisão', copy: 'Comparamos construir, comprar, ajustar processo, vender serviço ou não fazer nada.' },
      { label: 'Etapa 3', title: 'Roadmap', copy: 'Você recebe mini-PRD e plano de 30 dias para executar ou contratar com clareza.' },
    ],
    deliverables: [
      'Sessão de diagnóstico estruturada',
      'Mapa do processo atual e do vazamento de valor',
      'Estimativa de ordem de grandeza com premissas visíveis',
      'Decisão Build / Buy / Processo / Ignore',
      'Mini-PRD e roadmap de 30 dias',
      'Recomendação explícita: seguir, pausar ou descartar',
    ],
    fit: [
      'Você tem uma operação real, uma dor recorrente e alguém que pode decidir.',
      'O problema envolve mais de uma etapa, pessoa, integração ou investimento.',
      'Você quer reduzir escopo errado antes de contratar desenvolvimento.',
    ],
    notFit: [
      'Você só quer indicação de ferramenta.',
      'Você ainda não consegue apontar uma dor ou processo concreto.',
      'Você espera desenvolvimento ou suporte diário dentro do Sprint.',
    ],
    faqs: [
      { question: 'O Sprint inclui desenvolvimento?', answer: 'Não. Ele resolve a decisão e o escopo. Desenvolvimento, implantação e operação fazem parte da implementação quando há oportunidade validada.' },
      { question: 'Por que não contratar direto a implementação?', answer: 'Porque construir sem problema, métrica e escopo transforma projeto em tentativa cara. O Sprint diminui esse risco e deixa um documento utilizável mesmo se você não continuar com a Sistema Britto.' },
      { question: 'A aplicação me obriga a comprar?', answer: 'Não. Ela serve para entender contexto e confirmar que o Sprint é adequado. Uma aplicação não é cobrança.' },
    ],
    nextStep: { title: 'Oportunidade validada e pronta para sair do papel?', copy: 'A implementação começa quando existe responsável, escopo e critério de sucesso — não antes.', href: '/implementacao-vibe-seller', cta: 'Ver implementação →' },
    schema: [{
      '@type': 'Service',
      '@id': 'https://www.sistemabritto.com.br/sprint-vibe-seller#service',
      name: 'Sprint Vibe Seller',
      description: 'Diagnóstico produtizado com decisão de oportunidade, mapa de captura de valor e mini-PRD.',
      provider: { '@id': 'https://www.sistemabritto.com.br/#organization' },
      url: 'https://www.sistemabritto.com.br/sprint-vibe-seller',
      offers: { '@type': 'Offer', price: '1497.00', priceCurrency: 'BRL' },
    }],
  },
  implementacao: {
    kind: 'implementacao',
    path: '/implementacao-vibe-seller',
    metaTitle: 'Implementação Vibe Seller | Sistemas que capturam valor',
    metaDescription: 'Implementação de sistemas, automações e operações de IA a partir de R$ 5.000, com oportunidade, escopo e critério de sucesso definidos.',
    eyebrow: 'Projeto sob medida · A partir de R$ 5.000',
    headline: 'A oportunidade já está clara.',
    emphasis: 'Agora vamos transformar valor em operação.',
    lead: 'A implementação Vibe Seller não começa por uma lista de telas. Começa pela oportunidade validada, pelo processo que precisa mudar e pela métrica que provará resultado.',
    price: 'A partir de R$ 5.000',
    primaryCta: 'Quero discutir uma implementação',
    formTitle: 'Aplicação para implementação',
    formLead: 'Conte o processo, o impacto esperado e onde você acredita que está o gargalo. Vamos avaliar escopo, não empurrar ferramenta.',
    submitLabel: 'Enviar contexto do projeto →',
    checkout: false,
    proof: 'O projeto é um meio para capturar valor: receita recuperada, custo removido, margem ampliada, ativo criado ou operação que finalmente escala.',
    steps: [
      { label: '01', title: 'Escopo de valor', copy: 'Aproveitamos diagnóstico ou validamos contexto para fechar problema, critério de sucesso e responsável.' },
      { label: '02', title: 'Construção certa', copy: 'Sistema, WhatsApp, agentes, dados, conteúdo ou infraestrutura entram porque servem ao resultado — não porque estão na moda.' },
      { label: '03', title: 'Medição e handoff', copy: 'Testamos o fluxo, documentamos o que foi feito e definimos como o resultado continuará sendo acompanhado.' },
    ],
    deliverables: [
      'Escopo e critério de sucesso documentados',
      'Construção ou integração proporcional ao problema validado',
      'Testes e instrumentação de eventos relevantes',
      'Documentação e handoff operacional',
      'Primeiro ciclo de medição depois de entrar no ar',
    ],
    fit: [
      'Você tem uma oportunidade validada e uma pessoa responsável pela decisão.',
      'O problema tem impacto relevante em receita, economia, margem ou ativo.',
      'Você aceita medir resultado e ajustar a operação depois da entrega.',
    ],
    notFit: [
      'Você quer “um app de IA” sem problema, usuário ou distribuição definidos.',
      'Você quer orçamento por tela antes de explicar o valor que a tela precisa gerar.',
      'Você precisa de uma tarefa pequena que pode ser resolvida por processo ou ferramenta existente.',
    ],
    faqs: [
      { question: 'Quais tipos de projeto entram?', answer: 'Recuperação de lead e WhatsApp, CRM e sistemas, automação de conteúdo, dados/agentes e infraestrutura. O diagnóstico define se esses são os meios certos.' },
      { question: 'O projeto começa sempre em R$ 5.000?', answer: 'Esse é o ponto de partida público. O investimento final depende de escopo, risco, integrações, critério de sucesso e responsabilidade operacional.' },
      { question: 'Preciso fazer o Sprint antes?', answer: 'Para oportunidades complexas, sim. Se o problema já tiver escopo e evidência suficientes, podemos avaliar direto na aplicação.' },
    ],
    nextStep: { title: 'Ainda não tem escopo suficiente?', copy: 'O Sprint Vibe Seller existe para tomar a decisão antes de transformar incerteza em projeto.', href: '/sprint-vibe-seller', cta: 'Começar pelo Sprint →' },
    schema: [{
      '@type': 'Service',
      '@id': 'https://www.sistemabritto.com.br/implementacao-vibe-seller#service',
      name: 'Implementação Vibe Seller',
      description: 'Implementação de sistemas e automações de IA baseada em oportunidade validada, escopo e critério de sucesso.',
      provider: { '@id': 'https://www.sistemabritto.com.br/#organization' },
      url: 'https://www.sistemabritto.com.br/implementacao-vibe-seller',
      offers: { '@type': 'Offer', price: '5000.00', priceCurrency: 'BRL' },
    }],
  },
};

export default function VibeSellerLanding({ kind }: { kind: OfferKind }) {
  const offer = OFFERS[kind];
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [utms, setUtms] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', context: '' });
  const modalId = `aplicar-${kind}`;

  useEffect(() => setUtms(getStoredUtms()), []);

  const source = useMemo(() => `${kind}-vibe-seller`, [kind]);

  const openForm = (placement: string) => {
    trackCta(offer.path, offer.primaryCta, placement);
    setError('');
    setFormOpen(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.email || !form.whatsapp) {
      setError('Informe e-mail e WhatsApp para continuar.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const lead = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          source,
          answers: { context: form.context, offer: kind },
          utm: utms,
        }),
      });
      if (!lead.ok) throw new Error('Não foi possível registrar seus dados.');

      if (offer.checkout) {
        const params = new URLSearchParams({
          ...utms,
          customer_name: form.name,
          customer_email: form.email,
          customer_cellphone: form.whatsapp,
        });
        const checkout = await fetch(`/api/abacatepay/checkout/desafio-monetizar-com-ia?${params}`);
        const data = await checkout.json();
        if (!checkout.ok || !data.url) {
          throw new Error(data.error || 'O checkout ainda não está disponível.');
        }
        window.location.assign(data.url);
        return;
      }

      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Meta title={offer.metaTitle} description={offer.metaDescription} path={offer.path} ogImage="/felipe-autoridade.webp" schema={offer.schema} />
      <main className="min-h-screen overflow-x-hidden bg-[#080b12] text-white">
        <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-3 font-heading font-bold tracking-tight text-white" aria-label="Sistema Britto">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a3ff12] font-black text-black">SB</span>
            <span>Sistema Britto</span>
          </a>
          <a href="https://instagram.com/sistemabritto" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-300 transition hover:text-[#a3ff12]">@sistemabritto ↗</a>
        </header>

        <section className="relative px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(163,255,18,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(112,71,255,0.18),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-[#a3ff12]/35 bg-[#a3ff12]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c4ff72]">{offer.eyebrow}</p>
              <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                {offer.headline}<br /><span className="text-[#a3ff12]">{offer.emphasis}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{offer.lead}</p>
              <div className="mt-9">
                <button onClick={() => openForm('hero')} className="min-h-12 rounded-xl bg-[#a3ff12] px-7 py-4 text-base font-extrabold text-black shadow-[0_12px_35px_rgba(163,255,18,0.22)] transition hover:-translate-y-0.5 hover:bg-[#c4ff72] focus:outline-none focus:ring-4 focus:ring-[#a3ff12]/30">
                  {offer.primaryCta} →
                </button>
                <p className="mt-3 text-sm text-slate-400">{offer.kind === 'desafio' ? 'Pagamento único · acesso às instruções após confirmação' : 'Aplicação sem compromisso · contexto antes de proposta'}</p>
              </div>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">A transformação</p>
              <p className="mt-4 font-heading text-2xl font-bold leading-tight text-white">{offer.proof}</p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">Investimento</p>
                <p className="mt-1 font-heading text-4xl font-bold text-white">{offer.price}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0d1320] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">Como funciona</p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">Uma sequência de decisões. Não uma pilha de ferramentas.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {offer.steps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-[#080b12] p-6">
                  <p className="text-sm font-bold text-[#c4ff72]">{step.label}</p>
                  <h3 className="mt-5 font-heading text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-300">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">O que você leva</p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">Algo que continua útil depois da página fechar.</h2>
            </div>
            <ul className="space-y-4">
              {offer.deliverables.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-slate-200"><span className="mt-0.5 font-bold text-[#a3ff12]">✓</span><span>{item}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="bg-[#0d1320] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#a3ff12]/25 bg-[#a3ff12]/[0.06] p-7">
              <h2 className="font-heading text-2xl font-bold">É para você se…</h2>
              <ul className="mt-6 space-y-4">{offer.fit.map((item) => <li key={item} className="flex gap-3 text-slate-200"><span className="text-[#a3ff12]">✓</span>{item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#080b12] p-7">
              <h2 className="font-heading text-2xl font-bold">Não é para você se…</h2>
              <ul className="mt-6 space-y-4">{offer.notFit.map((item) => <li key={item} className="flex gap-3 text-slate-300"><span className="text-slate-500">×</span>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">Perguntas diretas</p>
            <div className="mt-7 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] px-6">
              {offer.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-heading text-lg font-bold text-white marker:hidden">{faq.question}<span className="float-right text-[#a3ff12] transition group-open:rotate-45">+</span></summary><p className="pt-4 leading-relaxed text-slate-300">{faq.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#a3ff12]/30 bg-[linear-gradient(135deg,rgba(163,255,18,0.16),rgba(112,71,255,0.12))] p-8 text-center sm:p-14">
            <h2 className="font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">{offer.nextStep.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{offer.nextStep.copy}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={() => openForm('final')} className="min-h-12 rounded-xl bg-[#a3ff12] px-7 py-4 font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-[#c4ff72]">{offer.primaryCta} →</button>
              {offer.nextStep.href && <a href={offer.nextStep.href} className="min-h-12 rounded-xl border border-white/25 px-7 py-4 font-bold text-white transition hover:border-[#a3ff12] hover:text-[#c4ff72]">{offer.nextStep.cta}</a>}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-400"><a className="hover:text-white" href="/politicas-de-privacidade">Privacidade</a><span className="mx-3">·</span><a className="hover:text-white" href="/termos-de-uso">Termos</a><span className="mx-3">·</span>© {new Date().getFullYear()} Sistema Britto</footer>
      </main>

      {formOpen && (
        <div id={modalId} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={offer.formTitle}>
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/15 bg-[#0d1320] p-6 shadow-2xl sm:p-8">
            <button onClick={() => setFormOpen(false)} className="float-right rounded-lg p-2 text-xl text-slate-400 transition hover:text-white" aria-label="Fechar">×</button>
            {!submitted ? <>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">{offer.price}</p>
              <h2 className="mt-3 pr-8 font-heading text-3xl font-bold">{offer.formTitle}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{offer.formLead}</p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-slate-200">Nome<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#a3ff12]" placeholder="Seu nome" /></label>
                <label className="block text-sm font-semibold text-slate-200">E-mail *<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#a3ff12]" placeholder="voce@empresa.com" /></label>
                <PhoneInput value={form.whatsapp} onChange={(whatsapp) => setForm({ ...form, whatsapp })} accentColor="#a3ff12" required />
                <label className="block text-sm font-semibold text-slate-200">{offer.kind === 'desafio' ? 'Onde você quer encontrar valor? (opcional)' : 'Qual processo ou oportunidade você quer resolver? *'}<textarea required={offer.kind !== 'desafio'} value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#a3ff12]" placeholder="Ex.: perdemos leads que chegam pelo WhatsApp e não recebem próxima ação." /></label>
                {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
                <button disabled={loading} type="submit" className="min-h-12 w-full rounded-xl bg-[#a3ff12] px-6 py-4 font-extrabold text-black transition hover:bg-[#c4ff72] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Preparando…' : offer.submitLabel}</button>
                <p className="text-center text-xs leading-relaxed text-slate-400">Ao continuar, você concorda com os <a className="underline hover:text-white" href="/termos-de-uso" target="_blank" rel="noreferrer">termos</a> e a <a className="underline hover:text-white" href="/politicas-de-privacidade" target="_blank" rel="noreferrer">política de privacidade</a>.</p>
              </form>
            </> : <div className="py-10 text-center"><p className="text-4xl">✓</p><h2 className="mt-5 font-heading text-3xl font-bold">Aplicação recebida.</h2><p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-300">Seu contexto foi registrado. A próxima etapa será alinhada pelo contato informado, se o projeto tiver o perfil certo.</p><button onClick={() => setFormOpen(false)} className="mt-7 rounded-xl border border-white/20 px-5 py-3 font-bold transition hover:border-[#a3ff12] hover:text-[#c4ff72]">Fechar</button></div>}
          </div>
        </div>
      )}
    </>
  );
}

export { OFFERS };
