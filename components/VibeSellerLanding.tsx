import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import Meta from './Meta';
import PhoneInput from './PhoneInput';
import FollowerLot from './FollowerLot';
import { getStoredUtms, trackCta } from '../pages/_app';

type OfferKind = 'desafio' | 'sprint' | 'implementacao';

type OfferConfig = {
  kind: OfferKind;
  cover: string;
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
  checkoutUrl?: string;
  processTitle: string;
  deliverablesTitle: string;
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
    cover: '/covers/desafio-monetizar-com-ia.png',
    path: '/desafio-monetizar-com-ia',
    metaTitle: 'Desafio Monetizar com IA | 21 dias para validar uma oportunidade',
    metaDescription: 'Em 21 dias, encontre um problema caro, transforme-o em uma oferta ou solução testável e coloque a primeira validação no mundo. R$ 97.',
    eyebrow: '21 dias · uma oportunidade real · Método Mapa Vibe Seller',
    headline: 'Não procure a próxima ideia de SaaS.',
    emphasis: 'Encontre uma forma de monetizar valor com IA.',
    lead: 'Você não entra para colecionar ferramenta, prompt ou aula. Entra para rastrear um problema caro, decidir se vale construir e colocar uma hipótese real no mercado.',
    price: 'R$ 97',
    primaryCta: 'Quero entrar no Desafio',
    formTitle: 'Sua inscrição no Desafio',
    formLead: 'Preencha seus dados para abrir o checkout. Você receberá as instruções da turma no contato informado após a confirmação.',
    submitLabel: 'Ir para o checkout →',
    checkoutUrl: 'https://pay.cakto.com.br/oko7cox',
    processTitle: '21 dias para sair da ideia e chegar a um teste real.',
    deliverablesTitle: 'Você termina com uma decisão e uma oferta testável.',
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
      'Aulas gravadas e uma sequência assíncrona de 21 mensagens para guiar sua execução',
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
      { question: 'E se eu encontrar uma oportunidade maior?', answer: 'Quando você precisa de acompanhamento ou quer que alguém execute junto/com você, o próximo passo é a Sessão de Arquitetura. Ela decide qual nível de entrega faz sentido.' },
    ],
    nextStep: { title: 'Encontrou uma oportunidade maior?', copy: 'Se a validação pede acompanhamento ou execução, comece pela Sessão de Arquitetura. Ela transforma o contexto em plano e mostra o nível de entrega certo.', href: '/sprint-vibe-seller', cta: 'Ver acompanhamento →' },
    schema: [{
      '@type': 'Course',
      '@id': 'https://www.sistemabritto.com.br/desafio-monetizar-com-ia#course',
      name: 'Desafio Monetizar com IA',
      description: 'Desafio de 21 dias para rastrear uma oportunidade, decidir build versus buy e validar uma forma de capturar valor com IA.',
      provider: { '@id': 'https://www.sistemabritto.com.br/#organization' },
      url: 'https://www.sistemabritto.com.br/desafio-monetizar-com-ia',
      offers: { '@type': 'Offer', price: '97.00', priceCurrency: 'BRL', availability: 'https://schema.org/InStock' },
    }],
  },
  sprint: {
    kind: 'sprint',
    cover: '/covers/sprint-vibe-seller.png',
    path: '/sprint-vibe-seller',
    metaTitle: 'Sprint Vibe Seller | Acompanhamento de 9 semanas para tirar sua solução do papel',
    metaDescription: 'Você não toca seu projeto sozinho: 9 semanas de suporte individual pelo WhatsApp, 5 checkpoints e uma garantia de repescagem. Comece pela Sessão de Arquitetura por R$ 150.',
    eyebrow: '9 semanas · eu faço com você',
    headline: 'Você não precisa tocar',
    emphasis: 'seu projeto sozinho.',
    lead: 'No Sprint, eu acompanho a execução com você por 9 semanas: decisões, prioridades, construção e validação. Você continua dono do projeto — mas para de destravar tudo no escuro. O primeiro passo é comprar a Sessão de Arquitetura de R$ 150.',
    price: 'Comece pela Sessão de Arquitetura · R$ 150',
    primaryCta: 'Comprar sessão de arquitetura · R$ 150',
    formTitle: 'Comprar Sessão de Arquitetura',
    formLead: 'É a porta de entrada comum para Sprint e Implementação. Você compra a sessão por R$ 150, recebe o link de agenda após a confirmação e esse valor é abatido se avançarmos.',
    submitLabel: 'Ir para o checkout de R$ 150 →',
    checkoutUrl: 'https://pay.cakto.com.br/35xvemn',
    processTitle: 'Nove semanas, cinco checkpoints e suporte individual de verdade.',
    deliverablesTitle: 'Clareza na sessão. Direção individual até a solução virar venda.',
    proof: 'A Sessão de Arquitetura define a rota. Se o Sprint for o nível certo, entramos em três sprints de três semanas com suporte individual no WhatsApp e cinco checkpoints para fazer o projeto sair da ideia, ganhar forma e chegar ao mercado.',
    steps: [
      { label: 'Semanas 1–3', title: 'Rota e escopo', copy: 'Fechamos problema, comprador, métrica, solução mínima e o que não entra agora.' },
      { label: 'Semanas 4–6', title: 'Construir e validar', copy: 'Você executa com suporte individualizado pelo WhatsApp e checkpoints para destravar as decisões importantes.' },
      { label: 'Semanas 7–9', title: 'Lançar e ajustar', copy: 'Organizamos a primeira versão, a forma de apresentar ao mercado e os próximos testes de escala.' },
    ],
    deliverables: [
      'Sessão de Arquitetura individual, com escopo e custos estimados',
      '9 semanas de suporte individualizado pelo WhatsApp — não é grupo e não é comunidade genérica',
      'Cinco checkpoints individuais no Meet para decidir, ajustar e destravar',
      'Prioridades, mini-PRD e plano de execução vivo',
      'Direção de build, buy, processo e distribuição conforme o projeto evolui',
      'Garantia de 7 dias de arrependimento e 1 mês de repescagem sem custo se, cumpridos os combinados, o projeto não recuperar o investimento em 9 semanas',
    ],
    fit: [
      'Você tem uma operação real, uma dor recorrente e alguém que pode decidir.',
      'Você quer executar, mas precisa de alguém experiente para acompanhar decisões e destravar o caminho.',
      'Você aceita fazer a parte que é sua entre os cinco checkpoints, com ritmo e acordos claros.',
    ],
    notFit: [
      'Você só quer indicação de ferramenta.',
      'Você quer terceirizar todo o desenvolvimento e receber o código pronto.',
      'Você não consegue reservar tempo para executar entre os checkpoints.',
    ],
    faqs: [
      { question: 'O Sprint começa pelo checkout de R$ 150?', answer: 'Sim. Você compra a Sessão de Arquitetura diretamente por R$ 150. Ela define escopo, prioridades e custos. Se o Sprint for o próximo passo, esse valor é abatido do acompanhamento.' },
      { question: 'O acompanhamento é em grupo?', answer: 'Não. O suporte é individualizado pelo WhatsApp durante as 9 semanas e existem cinco checkpoints individuais no Meet. A ideia é olhar seu contexto, destravar a próxima decisão e manter o projeto em movimento.' },
      { question: 'Como funcionam as duas garantias?', answer: 'A primeira é de 7 dias: se você entrar e perceber que o Sprint não é para você, pode pedir cancelamento dentro desse prazo. A segunda é de execução: se você cumprir os combinados do projeto e, ao fim das 9 semanas, ainda não tiver recuperado o investimento com as vendas da solução, ganha 1 mês de repescagem sem custo para acelerar a comercialização. A repescagem não é reembolso; é extensão individual de acompanhamento e depende de evidências das ações e vendas combinadas.' },
      { question: 'Qual é a diferença para implementação?', answer: 'No Sprint eu faço com você: acompanho, destravo e direciono sua execução. Na Implementação eu faço para você: construo e entrego o código, a estrutura e o plano de escala.' },
      { question: 'O Sprint inclui desenvolvimento completo?', answer: 'Não como serviço terceirizado. Ele inclui direção e acompanhamento para você executar com velocidade; se a melhor decisão for eu construir, a proposta correta é a Implementação.' },
    ],
    nextStep: { title: 'Prefere receber a solução pronta?', copy: 'A mesma Sessão de Arquitetura também define se a Implementação é o nível adequado. Se avançar, o valor da sessão entra como crédito.', href: '/implementacao-vibe-seller', cta: 'Ver implementação →' },
    schema: [{
      '@type': 'Service',
      '@id': 'https://www.sistemabritto.com.br/sprint-vibe-seller#service',
      name: 'Sprint Vibe Seller',
      description: 'Acompanhamento individual de 9 semanas para transformar uma oportunidade em solução validada e pronta para crescer.',
      provider: { '@id': 'https://www.sistemabritto.com.br/#organization' },
      url: 'https://www.sistemabritto.com.br/sprint-vibe-seller',
      offers: { '@type': 'Offer', price: '150.00', priceCurrency: 'BRL', description: 'Sessão de Arquitetura, abatida se o cliente avançar para o Sprint.' },
    }],
  },
  implementacao: {
    kind: 'implementacao',
    cover: '/covers/implementacao-vibe-seller.png',
    path: '/implementacao-vibe-seller',
    metaTitle: 'Implementação Vibe Seller | Sistema sob medida pronto para operar',
    metaDescription: 'Em 9 semanas, eu construo sua solução e entrego código, estrutura pronta para operar e plano de escala. R$ 150 na sessão, R$ 2.350 na entrada e R$ 2.500 quando estiver ready to market.',
    eyebrow: '9 semanas · eu faço para você',
    headline: 'Você pediu orçamento de uma solução.',
    emphasis: 'Mas o projeto ainda não foi definido.',
    lead: 'Sem escopo, tudo parece caber e qualquer orçamento vira chute. Você compra primeiro a Sessão de Arquitetura de R$ 150; nela definimos o problema, a rota, as integrações e os custos antes de decidir se eu construo para você.',
    price: 'Comece pela Sessão de Arquitetura · R$ 150',
    primaryCta: 'Comprar sessão de arquitetura · R$ 150',
    formTitle: 'Comprar Sessão de Arquitetura',
    formLead: 'Você compra a sessão por R$ 150. Depois da confirmação, recebe o link para escolher o horário; se avançarmos para a implementação, esse valor é abatido.',
    submitLabel: 'Ir para o checkout de R$ 150 →',
    checkoutUrl: 'https://pay.cakto.com.br/35xvemn',
    processTitle: 'Primeiro a arquitetura. Depois, nove semanas para colocar uma solução pronta para vender no mundo.',
    deliverablesTitle: 'Você sai da sessão com clareza. Avançando, recebe a solução pronta para operar e fazer dinheiro.',
    proof: 'Uma sessão individual para sair com o projeto documentado antes de ser orçado. Para a Implementação de R$ 5.000, você paga R$ 150 na sessão, R$ 2.350 na entrada e deixa R$ 2.500 para quando a solução estiver ready to market.',
    steps: [
      { label: 'Sessão', title: 'Arquitetura e decisão', copy: 'Documentamos problema, critério de sucesso, escopo, integrações, custos e o nível de entrega adequado.' },
      { label: 'Semanas 1–6', title: 'Construção', copy: 'Eu construo a solução: produto, automação, dados, integrações e experiência necessários para capturar o valor.' },
      { label: 'Semanas 7–9', title: 'Entrega e escala', copy: 'Testamos, colocamos para operar, entregamos código/documentação e um plano objetivo para o próximo ciclo.' },
    ],
    deliverables: [
      'Sessão de Arquitetura individual, com fluxo e custos estimados',
      'Escopo inicial: o que entra, o que fica fora e em qual ordem',
      'Integrações, dependências e principais riscos mapeados',
      'Estimativa de custos de construção e operação, com premissas visíveis',
      'Se avançar: código, configurações e documentação entregues para sua operação',
      'Se avançar: plano de lançamento, medição e escala pronto para executar',
      'Garantia de 7 dias de arrependimento e 1 mês de repescagem sem custo se, cumpridos os combinados, o projeto não recuperar o investimento em 9 semanas',
    ],
    fit: [
      'Você tem uma ideia, gargalo ou processo concreto para discutir.',
      'Você quer receber uma solução sob medida, em vez de montar tudo sozinho.',
      'Você pode tomar ou influenciar a decisão do projeto.',
    ],
    notFit: [
      'Você quer somente uma cotação rápida sem diagnóstico.',
      'Você quer começar desenvolvimento sem definir o problema, métrica ou escopo.',
      'Você busca uma ferramenta genérica quando uma solução específica não é necessária.',
    ],
    faqs: [
      { question: 'O que acontece depois da compra?', answer: 'A Cakto confirma o pagamento e envia o link de acesso para você escolher o horário disponível. Antes da conversa, você recebe uma orientação curta para trazer o contexto certo.' },
      { question: 'Qual é a diferença para o Sprint?', answer: 'Os dois passam pela mesma Sessão de Arquitetura. No Sprint eu faço com você durante 9 semanas; na Implementação eu faço para você e entrego a solução pronta para operar.' },
      { question: 'Como funciona o investimento de R$ 5.000?', answer: 'A Sessão de Arquitetura custa R$ 150 e conta como parte do projeto. Se decidirmos avançar, você paga R$ 2.350 de entrada. Isso deixa R$ 2.500 para a etapa em que a solução estiver ready to market: pronta para ser apresentada, vendida ou colocada para operar conforme o escopo combinado. Não é uma cobrança escondida; é uma forma de dividir o risco e alinhar a entrega ao momento em que ela pode fazer dinheiro.' },
      { question: 'Como funcionam as duas garantias?', answer: 'A primeira é de 7 dias: se você entrar e perceber que a Implementação não é para você, pode pedir cancelamento nesse prazo. A segunda é de execução: se cumprirmos os combinados e, ao fim das 9 semanas, a solução ainda não tiver recuperado o investimento com as vendas, você ganha 1 mês de repescagem sem custo para acelerar a comercialização. A repescagem é uma extensão de acompanhamento, não um reembolso, e usa evidências das ações e vendas combinadas.' },
      { question: 'Por que o preço está em R$ 150?', answer: 'O valor normal é R$ 300. Como a sessão é individual e depende da agenda do Felipe, apenas as 3 primeiras agendas liberadas na semana entram no valor promocional.' },
    ],
    nextStep: { title: 'Ainda quer participar ativamente da construção?', copy: 'Se você prefere fazer com acompanhamento em vez de terceirizar a execução, o Sprint é o nível certo. A Sessão de Arquitetura continua sendo a mesma porta de entrada.', href: '/sprint-vibe-seller', cta: 'Ver Sprint →' },
    schema: [{
      '@type': 'Service',
      '@id': 'https://www.sistemabritto.com.br/implementacao-vibe-seller#service',
      name: 'Implementação Vibe Seller',
      description: 'Sessão individual de arquitetura para documentar escopo, integrações, riscos e custos estimados antes de uma implementação sob medida.',
      provider: { '@id': 'https://www.sistemabritto.com.br/#organization' },
      url: 'https://www.sistemabritto.com.br/implementacao-vibe-seller',
      offers: { '@type': 'Offer', price: '150.00', priceCurrency: 'BRL', availability: 'https://schema.org/LimitedAvailability' },
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
  const modalId = `checkout-${kind}`;

  useEffect(() => setUtms(getStoredUtms()), []);

  const source = useMemo(() => `${kind}-vibe-seller`, [kind]);

  const goToCheckout = (placement: string) => {
    if (!offer.checkoutUrl) return;
    const checkoutValue = kind === 'desafio' ? 97 : 150;
    trackCta(offer.path, `${kind}-checkout`, placement);
    const browserWindow = window as typeof window & { fbq?: (...args: unknown[]) => void; dataLayer?: Record<string, unknown>[] };
    browserWindow.fbq?.('track', 'InitiateCheckout', {
      content_name: kind === 'desafio' ? 'Desafio Monetizar com IA' : 'Sessão de Arquitetura Vibe Seller',
      content_category: 'Vibe Seller',
      currency: 'BRL',
      value: checkoutValue,
    });
    browserWindow.dataLayer?.push({ event: 'begin_checkout', offer: kind, value: checkoutValue, currency: 'BRL' });
    const checkoutUrl = new URL(offer.checkoutUrl);
    Object.entries(utms).forEach(([key, value]) => {
      if (key.startsWith('utm_') && value) checkoutUrl.searchParams.set(key, value);
    });
    checkoutUrl.searchParams.set('utm_content', `${kind}-checkout`);
    window.location.assign(checkoutUrl.toString());
  };

  const openForm = (placement: string) => {
    // Sprint e Implementação não são aplicação: a compra é da Sessão de Arquitetura.
    if (kind !== 'desafio') {
      goToCheckout(placement);
      return;
    }
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
      let leadSaved = false;
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
        leadSaved = lead.ok;
      } catch {
        // A captura ajuda o CRM, mas nunca deve bloquear uma compra pronta.
      }

      if (offer.checkoutUrl) {
        goToCheckout('checkout-cakto');
        return;
      }

      if (!leadSaved) throw new Error('Não foi possível registrar seus dados. Tente novamente.');

      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Meta title={offer.metaTitle} description={offer.metaDescription} path={offer.path} ogImage={offer.cover} schema={offer.schema} />
      <main className="min-h-screen overflow-x-hidden bg-[#080b12] text-white">
        <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-3 font-heading font-bold tracking-tight text-white" aria-label="Sistema Britto">
            <Image src="/images/logo-sistema-britto.png" alt="Sistema Britto" width={180} height={60} className="h-11 w-auto object-contain" priority />
            <span className="sr-only">Sistema Britto</span>
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
                <p className="mt-3 text-sm text-slate-400">{offer.kind === 'desafio' ? 'Primeiro você entende o método. O investimento aparece logo abaixo.' : 'Pagamento único · agenda enviada após a confirmação · valor abatido se você avançar.'}</p>
              </div>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-2xl backdrop-blur sm:p-6">
              <Image src={offer.cover} alt={`Capa ${offer.metaTitle}`} width={1024} height={1024} className="mb-6 w-full rounded-2xl object-cover" priority />
              <div className="px-2 pb-2 sm:px-2">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">A transformação</p>
              <p className="mt-4 font-heading text-2xl font-bold leading-tight text-white">{offer.proof}</p>
              {offer.kind !== 'desafio' && <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">Porta de entrada</p>
                <p className="mt-1 text-sm text-slate-500 line-through">Valor normal: R$ 300</p>
                <p className="mt-1 font-heading text-4xl font-bold text-white">R$ 150</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Válido para as 3 primeiras agendas da semana. Vira crédito se você avançar.</p>
              </div>}
              </div>
            </aside>
          </div>
        </section>

        {offer.kind === 'sprint' && <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-300">Você executa. Eu acompanho.</p>
            <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">Acompanhamento individual para o projeto não morrer entre uma ideia e a próxima decisão.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['WHATSAPP', 'Acompanhamento individual para priorizar a próxima ação e não acumular dúvidas.'],
                ['5 CHECKPOINTS', 'Cinco encontros individuais no Meet ao longo de nove semanas para decisões que exigem contexto.'],
                ['3 SPRINTS', 'Rota, construção e lançamento em ciclos de três semanas com entregas visíveis.'],
                ['DECISÃO', 'Build, buy, processo ou pausa: a resposta segue evidência, não apego à ideia.'],
              ].map(([title, copy]) => <article key={title} className="rounded-2xl border border-violet-300/20 bg-violet-300/[0.05] p-6"><p className="font-heading text-xl font-black text-violet-300">{title}</p><p className="mt-3 text-sm leading-relaxed text-slate-300">{copy}</p></article>)}
            </div>
          </div>
        </section>}

        {offer.kind === 'implementacao' && <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">O que eu posso construir para você</p>
            <h2 className="mt-3 max-w-4xl font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">O projeto começa pelo seu processo. A tecnologia vem depois.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['SaaS e produto digital', 'MVP, recorrência, onboarding, billing e risco de comoditização.'],
                ['WhatsApp e agentes de IA', 'Atendimento, qualificação, follow-up, agenda e CRM.'],
                ['Funil e checkout', 'Landing page, quiz, pagamento, eventos e atribuição.'],
                ['Integrações customizadas', 'ERP, CRM, n8n, APIs, dados e automações entre sistemas.'],
                ['E-commerce e assinatura', 'Catálogo, carrinho, pagamento, pedidos e operação.'],
                ['White-label', 'Produto com sua marca, domínio, operação e modelo de revenda.'],
              ].map(([title, copy]) => <article key={title} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.045] p-6"><h3 className="font-heading text-xl font-bold text-cyan-100">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{copy}</p></article>)}
            </div>
            <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-300"><strong className="text-white">Importante:</strong> a sessão não serve para carimbar uma ideia. Se comprar, adaptar uma ferramenta ou mudar o processo for melhor do que construir, essa será a recomendação.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['O que entra agora', 'A menor versão que resolve o gargalo e pode ser entregue em um ciclo de nove semanas.'],
                ['O que fica de fora', 'Funcionalidades que parecem urgentes, mas não provam valor nem mudam a decisão agora.'],
                ['Quanto custa operar', 'Estimativa de construção, infraestrutura, integrações e premissas que sustentam a proposta.'],
              ].map(([title, copy]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#080b12] p-6"><h3 className="font-heading text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{copy}</p></article>)}
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-[#0d1320] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Produto e operação</p>
                <h3 className="mt-3 font-heading text-2xl font-bold">ZapMágico</h3>
                <p className="mt-4 leading-relaxed text-slate-300">Automação de WhatsApp para pequenos negócios com experiência white-label, fluxos prontos e cobrança recorrente.</p>
                <a className="mt-5 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-100" href="https://zapmagico.com.br" target="_blank" rel="noreferrer">Conhecer o projeto ↗</a>
              </article>
              <article className="rounded-3xl border border-white/10 bg-[#0d1320] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Tecnologia, empresa e equity</p>
                <h3 className="mt-3 font-heading text-2xl font-bold">Voice Dream</h3>
                <p className="mt-4 leading-relaxed text-slate-300">Tecnologia de voz criada com IA que evoluiu para ativo, empresa, investimento seed e participação societária.</p>
                <a className="mt-5 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-100" href="https://voicedream.com.br" target="_blank" rel="noreferrer">Conhecer o projeto ↗</a>
              </article>
            </div>
          </div>
        </section>}

        <section className="border-y border-white/10 bg-[#0d1320] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">Como funciona</p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">{offer.processTitle}</h2>
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
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">{offer.deliverablesTitle}</h2>
            </div>
            <ul className="space-y-4">
              {offer.deliverables.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-slate-200"><span className="mt-0.5 font-bold text-[#a3ff12]">✓</span><span>{item}</span></li>)}
            </ul>
          </div>
        </section>

        {offer.kind !== 'desafio' && <section className="border-y border-[#a3ff12]/20 bg-[#a3ff12]/[0.045] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">Dupla garantia</p>
            <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">Você não fica preso a uma decisão ruim — e eu não desapareço quando o projeto precisa vender.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-[#080b12] p-6"><p className="font-heading text-xl font-bold text-white">7 dias de arrependimento</p><p className="mt-3 leading-relaxed text-slate-300">Entrou e percebeu que esse não é o caminho certo? Você pode pedir cancelamento dentro de 7 dias.</p></article>
              <article className="rounded-2xl border border-white/10 bg-[#080b12] p-6"><p className="font-heading text-xl font-bold text-white">1 mês de repescagem</p><p className="mt-3 leading-relaxed text-slate-300">Cumpriu os combinados e, em 9 semanas, o projeto ainda não recuperou o investimento com vendas? Você ganha mais 1 mês de acompanhamento sem custo para acelerar a comercialização.</p></article>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">A repescagem é uma extensão individual de acompanhamento, não reembolso, e usa as evidências de execução e vendas combinadas no projeto.</p>
          </div>
        </section>}

        {offer.kind === 'desafio' && <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-[#a3ff12]/35 bg-[#a3ff12]/[0.07] p-8 text-center sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#c4ff72]">Primeira turma · pagamento único</p>
            <p className="mt-4 font-heading text-5xl font-bold">R$ 97</p>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">Menos que uma assinatura de ferramenta que você talvez nem use. Aqui você passa 21 dias decidindo onde existe valor antes de construir.</p>
            <button onClick={() => openForm('price-context')} className="mt-7 min-h-12 rounded-xl bg-[#a3ff12] px-7 py-4 font-extrabold text-black transition hover:bg-[#c4ff72]">Quero entrar no Desafio →</button>
            <FollowerLot />
          </div>
        </section>}

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
            </> : <div className="py-10 text-center"><p className="text-4xl">✓</p><h2 className="mt-5 font-heading text-3xl font-bold">Dados recebidos.</h2><p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-300">Você será encaminhado para o checkout. Depois da confirmação, enviamos o link para escolher a agenda e os próximos passos.</p><button onClick={() => setFormOpen(false)} className="mt-7 rounded-xl border border-white/20 px-5 py-3 font-bold transition hover:border-[#a3ff12] hover:text-[#c4ff72]">Fechar</button></div>}
          </div>
        </div>
      )}
    </>
  );
}

export { OFFERS };
