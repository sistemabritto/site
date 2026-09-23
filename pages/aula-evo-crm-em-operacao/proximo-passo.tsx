import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Meta from '../../components/Meta';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ARCHITECTURE_SESSION, architectureCheckoutUrl } from '../../lib/architecture-session';
import { getStoredUtms, trackCta } from '../_app';

const PAGE = '/aula-evo-crm-em-operacao/proximo-passo';
const SOURCE = 'sessao-start-caso-crm';
const QUESTIONS = [
  { key: 'channels', title: 'De onde chegam oportunidades reais hoje?', options: [
    ['Ainda não recebo contatos', 'none'], ['De um canal', 'one'], ['De dois ou mais canais', 'many'],
  ] },
  { key: 'owner', title: 'Quem acompanha cada contato até o próximo passo?', options: [
    ['Uma pessoa definida para cada contato', 'defined'], ['Eu acompanho tudo sozinho', 'self'], ['Nem sempre fica claro', 'unclear'],
  ] },
  { key: 'bottleneck', title: 'Onde o processo mais trava?', options: [
    ['Na entrada ou distribuição dos contatos', 'intake'], ['No retorno e acompanhamento', 'followup'], ['Ainda estou aprendendo a ferramenta', 'learning'],
  ] },
  { key: 'timing', title: 'Quando você precisa resolver isso?', options: [
    ['Nos próximos 30 dias', '30'], ['Em até 3 meses', '90'], ['Sem prazo; estou explorando', 'later'],
  ] },
] as const;

type Answers = Partial<Record<(typeof QUESTIONS)[number]['key'] | 'business' | 'desiredResult' | 'investment', string>>;

function visitId() {
  try {
    const existing = sessionStorage.getItem('crm_case_application_session');
    if (existing) return existing;
    const created = crypto.randomUUID();
    sessionStorage.setItem('crm_case_application_session', created);
    return created;
  } catch { return crypto.randomUUID(); }
}

function trackStage(stage: string) {
  if (typeof window === 'undefined') return;
  void fetch('/api/track', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
    body: JSON.stringify({ type: 'quiz', session_id: visitId(), stage, quiz_source: SOURCE }),
  }).catch(() => {});
}

export default function AulaCrmProximoPasso() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const submission = useRef<{ id: string; signature: string } | null>(null);
  const [decision, setDecision] = useState<string | null>(null);
  const [checkout, setCheckout] = useState(architectureCheckoutUrl({
    utm_source: 'site', utm_medium: 'estudo-de-caso', utm_campaign: 'aula-evo-crm', utm_content: 'aplicacao',
  }));

  useEffect(() => {
    const utm = getStoredUtms();
    setCheckout(architectureCheckoutUrl({ ...utm, utm_source: utm.utm_source || 'site',
      utm_medium: 'estudo-de-caso', utm_campaign: 'aula-evo-crm', utm_content: 'aplicacao' }));
    trackStage('case-page-viewed');
  }, []);

  const start = () => {
    setStep(0);
    trackStage('application-opened');
    requestAnimationFrame(() => document.getElementById('aplicacao')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const answer = (value: string) => {
    const question = QUESTIONS[step];
    if (!question) return;
    setAnswers(current => ({ ...current, [question.key]: value }));
    trackStage(`${question.key}-${value}`);
    setStep(step + 1);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !consent) return;
    setError('');
    setSending(true);
    try {
      const signature = JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), whatsapp: whatsapp.trim(), answers });
      if (!submission.current || submission.current.signature !== signature) {
        submission.current = { id: crypto.randomUUID(), signature };
      }
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(),
          whatsapp: whatsapp.trim(), source: 'sessao-start-caso-crm-aplicacao', answers,
          submission_id: submission.current.id, session_id: visitId(), consent,
          utm: { ...getStoredUtms(), utm_medium: 'estudo-de-caso', utm_campaign: 'aula-evo-crm' } }),
      });
      const result = await response.json();
      if (response.status === 409) submission.current = null;
      if (!response.ok || result.success !== true) throw new Error('save_failed');
      setDecision(result.decision);
      trackStage('application-submitted');
      setStep(QUESTIONS.length + 1);
    } catch {
      setError('Não conseguimos salvar sua aplicação agora. Seus dados continuam aqui; tente novamente.');
    } finally { setSending(false); }
  };

  const recommended = decision === 'session_checkout' || decision === 'session_details';

  const onCheckout = () => {
    trackStage('session-checkout-clicked');
    trackCta(PAGE, 'checkout-sessao-de-start', 'aplicacao-qualificada');
    try {
      const browser = window as typeof window & { fbq?: (...args: unknown[]) => void; dataLayer?: Record<string, unknown>[] };
      browser.fbq?.('track', 'InitiateCheckout', { content_name: ARCHITECTURE_SESSION.name,
        currency: 'BRL', value: ARCHITECTURE_SESSION.price });
      browser.dataLayer?.push({ event: 'begin_checkout', offer: 'sessao-de-start', source: SOURCE,
        currency: 'BRL', value: ARCHITECTURE_SESSION.price });
    } catch { /* Analytics não impede o checkout. */ }
  };

  return <>
    <Meta title="Do CRM instalado ao próximo passo | Sistema Britto"
      description="Veja a demonstração do Evo CRM e conte onde sua operação trava. Uma aplicação curta indica o próximo passo."
      path={PAGE} noIndex />
    <Navbar />
    <main className="min-h-screen bg-surface-950 px-4 pb-20 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <header>
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#a3ff12]">Demonstração real · Evo CRM</p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">Colocar o CRM no ar é o começo. O que acontece com o próximo contato?</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">Na gravação abaixo, eu mostro a instalação do Evo CRM numa VPS. Depois, veja o passo que falta para uma oportunidade ganhar responsável e retorno. Assista antes de contar como funciona na sua empresa.</p>
        </header>

        <section className="mt-8" aria-labelledby="caso-titulo">
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black">
            <iframe title="Demonstração da instalação do Evo CRM" src="https://www.youtube-nocookie.com/embed/VQNtBqSKZKM?rel=0"
              loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen className="h-full w-full" />
          </div>
          <h2 id="caso-titulo" className="mt-6 font-heading text-2xl font-bold">O resultado mostrado: CRM instalado e acessível</h2>
          <p className="mt-3 leading-relaxed text-gray-300">Esta é uma demonstração da minha própria instalação. Ela comprova esse resultado específico; não é um depoimento de cliente nem uma promessa de aumento de vendas. O próximo teste é fazer o contato entrar, definir quem acompanha e registrar o retorno.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['01', 'Entrada visível', 'Saber de onde veio cada contato.'],
              ['02', 'Responsável claro', 'Uma pessoa assume o próximo movimento.'],
              ['03', 'Retorno marcado', 'O acompanhamento não depende da memória.'],
            ].map(([number, title, description]) => <div key={number} className="rounded-xl border border-white/15 bg-surface-900 p-4">
              <p className="text-xs font-bold text-[#a3ff12]">{number}</p>
              <h3 className="mt-2 font-heading text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-gray-300">{description}</p>
            </div>)}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#a3ff12]/35 bg-surface-900 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a3ff12]">Adapte ao seu caso</p>
          <h2 className="mt-3 font-heading text-2xl font-bold">Sua operação precisa só do passo a passo ou de um fluxo desenhado para ela?</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-gray-300">Responda quatro perguntas objetivas e conte brevemente o seu caso. Se já há contatos reais e um gargalo de acompanhamento, eu mostro a Sessão de Start: conversa individual e PRD por R$ {ARCHITECTURE_SESSION.price}. Implementação é contratada à parte. Se está começando, você recebe o caminho da aula prática.</p>
          <button type="button" onClick={start} className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#a3ff12] px-5 py-3 font-bold text-black transition hover:bg-[#c4ff72] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#a3ff12] sm:w-auto">Quero encontrar meu próximo passo →</button>
          <p className="mt-4 text-sm text-gray-400"><Link href="/sessao-de-start?utm_source=site&utm_medium=estudo-de-caso&utm_campaign=aula-evo-crm&utm_content=acesso-direto"
            onClick={() => trackCta(PAGE, 'sessao-direta', 'sem-aplicacao')} className="text-[#c4ff72] underline">Já decidi pela Sessão? Veja os detalhes direto</Link></p>
        </section>

        {step >= 0 && <section id="aplicacao" className="mt-10 scroll-mt-28 rounded-2xl border border-white/15 bg-surface-900 p-6 sm:p-8" aria-live="polite">
          {step < QUESTIONS.length ? <>
            <p className="text-sm font-bold text-[#c4ff72]">Pergunta {step + 1} de {QUESTIONS.length}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full rounded-full bg-[#a3ff12]" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold">{QUESTIONS[step].title}</h2>
            <div className="mt-5 grid gap-3">{QUESTIONS[step].options.map(([label, value]) => <button key={value} type="button"
              onClick={() => answer(value)} className="min-h-14 cursor-pointer rounded-xl border border-white/20 bg-surface-800 px-4 py-3 text-left font-semibold transition hover:border-[#a3ff12] hover:bg-[#a3ff12]/10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]">{label}</button>)}</div>
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="mt-5 min-h-11 cursor-pointer text-sm text-gray-300 underline hover:text-white">Voltar</button>}
          </> : step === QUESTIONS.length ? <>
            <p className="text-sm font-bold text-[#c4ff72]">Última etapa</p>
            <h2 className="mt-3 font-heading text-2xl font-bold">Conte o que está acontecendo no seu negócio.</h2>
            <p className="mt-2 text-sm text-gray-300">Vou usar suas respostas para indicar um próximo passo e preparar a conversa, se você decidir pela Sessão. Ela custa R$ {ARCHITECTURE_SESSION.price}; a aplicação não reserva horário nem cobra nada.</p>
            <form onSubmit={submit} className="mt-6 grid gap-4" aria-busy={sending}>
              <div><label htmlFor="case-business" className="mb-2 block text-sm font-semibold">O que você vende e como chegam os clientes hoje?</label><textarea id="case-business" required minLength={15} maxLength={1200} rows={3} value={answers.business || ''} onChange={event => setAnswers(current => ({ ...current, business: event.target.value }))} className="w-full rounded-xl border border-white/20 bg-surface-800 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
              <div><label htmlFor="case-result" className="mb-2 block text-sm font-semibold">O que precisaria mudar para essa conversa valer a pena?</label><textarea id="case-result" required minLength={15} maxLength={1200} rows={3} value={answers.desiredResult || ''} onChange={event => setAnswers(current => ({ ...current, desiredResult: event.target.value }))} className="w-full rounded-xl border border-white/20 bg-surface-800 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
              <fieldset><legend className="mb-2 text-sm font-semibold">Se a Sessão for indicada, investir R$ {ARCHITECTURE_SESSION.price} faz sentido agora?</legend>
                <div className="grid gap-2">{[
                  ['Sim, posso investir', 'yes'], ['Quero entender os detalhes antes', 'details'], ['Agora não', 'not-now'],
                ].map(([label, value]) => <label key={value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-white/20 bg-surface-800 px-4 py-2 text-sm"><input type="radio" name="investment" required checked={answers.investment === value} onChange={() => setAnswers(current => ({ ...current, investment: value }))} className="h-5 w-5 accent-[#a3ff12]" />{label}</label>)}</div>
              </fieldset>
              <div><label htmlFor="case-name" className="mb-2 block text-sm font-semibold">Nome</label><input id="case-name" required maxLength={100} autoComplete="name" value={name} onChange={event => setName(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/20 bg-surface-800 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
              <div><label htmlFor="case-whatsapp" className="mb-2 block text-sm font-semibold">WhatsApp</label><input id="case-whatsapp" required type="tel" minLength={10} maxLength={20} autoComplete="tel" value={whatsapp} onChange={event => setWhatsapp(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/20 bg-surface-800 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
              <div><label htmlFor="case-email" className="mb-2 block text-sm font-semibold">E-mail <span className="font-normal text-gray-400">(opcional)</span></label><input id="case-email" type="email" maxLength={200} autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/20 bg-surface-800 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
              <label className="flex gap-3 text-sm leading-relaxed text-gray-300"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 h-5 w-5 accent-[#a3ff12]" /> Aceito receber minha recomendação e contato sobre esta aplicação. <Link href="/politicas-de-privacidade" className="text-[#c4ff72] underline">Privacidade</Link>.</label>
              {error && <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
              <button type="submit" disabled={sending} className="min-h-12 cursor-pointer rounded-xl bg-[#a3ff12] px-5 py-3 font-bold text-black transition hover:bg-[#c4ff72] disabled:cursor-wait disabled:opacity-60">{sending ? 'Salvando…' : 'Ver minha recomendação →'}</button>
            </form>
          </> : <>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a3ff12]">Aplicação recebida</p>
            <h2 className="mt-3 font-heading text-2xl font-bold">{recommended ? 'Vale desenhar o fluxo da sua operação.' : 'Comece pelo fluxo mínimo da aula.'}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{recommended
              ? 'Você já tem contatos e um prazo para resolver a entrada ou o acompanhamento. Na Sessão de Start eu ajudo a priorizar etapas, responsáveis e integrações e entrego um PRD com escopo e custos estimados.'
              : answers.investment === 'not-now'
                ? 'Você indicou que investir na Sessão agora não faz sentido. A instalação gratuita e a próxima aula prática permitem testar um fluxo mínimo antes de decidir por ajuda individual.'
                : 'Pelas respostas, o melhor primeiro passo é instalar ou testar o processo básico com um contato de exemplo. A aula prática de operação está sendo preparada; a instalação já está disponível gratuitamente.'}</p>
            {recommended ? <div className="mt-6 rounded-xl border border-[#a3ff12]/35 bg-surface-800 p-5">
              <h3 className="font-heading text-xl font-bold">Sessão de Start · R$ {ARCHITECTURE_SESSION.price}</h3>
              <p className="mt-2 text-sm text-gray-300">Conversa individual + PRD de prioridades, escopo e custos estimados. Implementação separada.</p>
              {answers.investment === 'details'
                ? <Link href="/sessao-de-start?utm_source=site&utm_medium=estudo-de-caso&utm_campaign=aula-evo-crm&utm_content=aplicacao-detalhes" onClick={() => trackCta(PAGE, 'detalhes-sessao-de-start', 'aplicacao-duvidas')} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#a3ff12] px-5 py-3 text-center font-bold text-black hover:bg-[#c4ff72] sm:w-auto">Entender a Sessão antes de decidir →</Link>
                : <a href={checkout} onClick={onCheckout} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#a3ff12] px-5 py-3 text-center font-bold text-black hover:bg-[#c4ff72] sm:w-auto">Agendar minha Sessão →</a>}
            </div> : <Link href="/aula-evo-crm-em-operacao" onClick={() => trackCta(PAGE, 'aula-crm-interesse', 'aplicacao-inicio')}
              className="mt-6 inline-flex min-h-12 items-center rounded-xl border border-[#a3ff12]/50 px-5 py-3 font-bold text-[#c4ff72] hover:bg-[#a3ff12]/10">Ver a aula prática →</Link>}
            <p className="mt-5 text-sm text-gray-400">Você pode <Link href="/sessao-de-start" className="text-[#c4ff72] underline">conhecer a Sessão de Start</Link> a qualquer momento.</p>
          </>}
        </section>}
      </div>
    </main>
    <Footer />
  </>;
}
