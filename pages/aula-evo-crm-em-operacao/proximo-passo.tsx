import { useEffect, useState } from 'react';
import Link from 'next/link';
import Meta from '../../components/Meta';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ARCHITECTURE_SESSION, architectureCheckoutUrl } from '../../lib/architecture-session';
import { getStoredUtms, trackCta } from '../_app';

const PAGE = '/aula-evo-crm-em-operacao/proximo-passo';
const SOURCE = 'aula-evo-crm-pos-aula';
const questions = [
  {
    title: 'Por onde chegam seus contatos hoje?',
    options: [
      { label: 'Ainda não recebo contatos', value: 'none' },
      { label: 'Um canal principal', value: 'one' },
      { label: 'Vários canais', value: 'many' },
    ],
  },
  {
    title: 'Quem acompanha cada oportunidade até o próximo passo?',
    options: [
      { label: 'Uma pessoa definida', value: 'owner' },
      { label: 'Eu acompanho tudo sozinho', value: 'self' },
      { label: 'Não há uma regra clara', value: 'unclear' },
    ],
  },
  {
    title: 'Quando esse processo precisa funcionar?',
    options: [
      { label: 'Nos próximos 30 dias', value: '30' },
      { label: 'Em até 3 meses', value: '90' },
      { label: 'Ainda estou estudando', value: 'later' },
    ],
  },
] as const;

type Answers = { channel?: string; owner?: string; timing?: string };

function sessionId(): string {
  try {
    const existing = sessionStorage.getItem('crm_aula_quiz_session');
    if (existing) return existing;
    const created = crypto.randomUUID();
    sessionStorage.setItem('crm_aula_quiz_session', created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
}

function trackQuiz(stage: string) {
  if (typeof window === 'undefined') return;
  void fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'quiz', session_id: sessionId(), stage, quiz_source: SOURCE }),
    keepalive: true,
  }).catch(() => {});
}

export default function AulaCrmProximoPasso() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checkout, setCheckout] = useState(architectureCheckoutUrl({
    utm_source: 'site', utm_medium: 'pos-aula', utm_campaign: 'aula-evo-crm', utm_content: 'quiz-pos-aula',
  }));

  useEffect(() => {
    const existing = getStoredUtms();
    setCheckout(architectureCheckoutUrl({
      ...existing,
      utm_source: existing.utm_source || 'site',
      utm_medium: 'pos-aula',
      utm_campaign: 'aula-evo-crm',
      utm_content: 'quiz-pos-aula',
    }));
    trackQuiz('crm-aula-quiz-visited');
  }, []);

  const answer = (value: string) => {
    const key = (['channel', 'owner', 'timing'] as const)[step];
    if (!key) return;
    setAnswers(current => ({ ...current, [key]: value }));
    trackQuiz(`crm-aula-${key}-${value}`);
    if (step < questions.length - 1) setStep(step + 1);
    else {
      setStep(questions.length);
      trackQuiz('crm-aula-quiz-completed');
    }
  };

  const isComplete = step === questions.length;
  const recommend = isComplete && answers.channel !== 'none' && answers.timing !== 'later'
    && (answers.channel === 'many' || answers.owner === 'unclear');

  const onSessionCheckout = () => {
    trackQuiz('crm-aula-session-checkout');
    trackCta(PAGE, 'checkout-sessao-de-start', 'quiz-recomendado');
    try {
      const browserWindow = window as typeof window & {
        fbq?: (...args: unknown[]) => void;
        dataLayer?: Record<string, unknown>[];
      };
      browserWindow.fbq?.('track', 'InitiateCheckout', {
        content_name: ARCHITECTURE_SESSION.name, currency: 'BRL', value: ARCHITECTURE_SESSION.price,
      });
      browserWindow.dataLayer?.push({
        event: 'begin_checkout', offer: 'sessao-de-start',
        source: SOURCE, currency: 'BRL', value: ARCHITECTURE_SESSION.price,
      });
    } catch { /* Analytics não impede a navegação ao checkout. */ }
  };

  return <>
    <Meta title="Seu próximo passo depois da aula de Evo CRM | Sistema Britto"
      description="Três perguntas para decidir se o checklist basta ou se vale desenhar o processo da sua empresa na Sessão de Start."
      path={PAGE} noIndex />
    <Navbar />
    <main className="min-h-screen bg-surface-950 px-4 pb-20 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-2xl">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#a3ff12]">Depois da aula prática</p>
        <h1 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">Qual é o próximo passo para o seu CRM?</h1>
        <p className="mt-4 text-gray-300">São três perguntas para decidir se vale aplicar o checklist primeiro ou desenhar seu processo numa Sessão de Start. A sessão é um serviço pago de R$ {ARCHITECTURE_SESSION.price}.</p>
        <p className="mt-3 text-sm"><Link href="/sessao-de-start?utm_source=site&utm_medium=pos-aula&utm_campaign=aula-evo-crm&utm_content=quiz-pular" onClick={() => trackCta(PAGE, 'ver-sessao-direto', 'pular-quiz')} className="text-[#c4ff72] underline">Já sei que preciso da Sessão? Ver detalhes e preço →</Link></p>

        {!isComplete ? (
          <section className="mt-8 rounded-2xl border border-white/15 bg-surface-900 p-6 sm:p-8" aria-labelledby="question-title">
            <p className="text-sm font-semibold text-[#c4ff72]">Pergunta {step + 1} de {questions.length}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><div className="h-full rounded-full bg-[#a3ff12]" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
            <h2 id="question-title" className="mt-6 font-heading text-2xl font-bold">{questions[step].title}</h2>
            <div className="mt-5 grid gap-3">{questions[step].options.map(option => (
              <button key={option.value} type="button" onClick={() => answer(option.value)}
                className="min-h-14 rounded-xl border border-white/20 bg-surface-800 px-4 py-3 text-left font-semibold text-white transition hover:border-[#a3ff12] hover:bg-[#a3ff12]/10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]">
                {option.label}
              </button>
            ))}</div>
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="mt-5 min-h-11 text-sm text-gray-300 underline hover:text-white">Voltar à pergunta anterior</button>}
          </section>
        ) : (
          <section className="mt-8 rounded-2xl border border-[#a3ff12]/35 bg-surface-900 p-6 sm:p-8" aria-live="polite">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c4ff72]">Sua recomendação</p>
            <h2 className="mt-3 font-heading text-2xl font-bold">{recommend ? 'Vale desenhar o fluxo do seu caso.' : 'Comece aplicando o fluxo mínimo.'}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{recommend
              ? 'Você já recebe contatos com mais de um canal ou sem uma regra clara de responsável. A Sessão de Start ajuda a definir prioridade, passagem de bastão, integrações e um PRD para executar.'
              : 'Use o checklist da aula para testar entrada, dono e retorno com seus próprios dados. Quando a operação tiver mais canais, pessoas ou urgência, pode valer uma conversa de planejamento.'}</p>
            <div className="mt-6 rounded-xl border border-white/15 bg-surface-800 p-5">
              <h3 className="font-heading text-xl font-bold">Sessão de Start · R$ {ARCHITECTURE_SESSION.price}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">Conversa individual e PRD com prioridades, escopo e custos estimados. Instalação do CRM e implementação são contratadas à parte.</p>
              {recommend && <a href={checkout} onClick={onSessionCheckout} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#a3ff12] px-5 py-3 text-center font-bold text-black hover:bg-[#c4ff72] sm:w-auto">Agendar Sessão de Start · R$ {ARCHITECTURE_SESSION.price} →</a>}
              <p className="mt-4 text-sm"><Link href="/sessao-de-start?utm_source=site&utm_medium=pos-aula&utm_campaign=aula-evo-crm&utm_content=quiz-detalhes" onClick={() => trackCta(PAGE, 'detalhes-sessao-de-start', recommend ? 'quiz-recomendado' : 'quiz-checklist')} className="text-[#c4ff72] underline">{recommend ? 'Ver detalhes da Sessão' : 'Conhecer a Sessão se eu precisar de ajuda'} →</Link></p>
            </div>
            <button type="button" onClick={() => { setAnswers({}); setStep(0); trackQuiz('crm-aula-quiz-restarted'); }} className="mt-6 min-h-11 text-sm text-gray-300 underline hover:text-white">Refazer respostas</button>
          </section>
        )}
      </div>
    </main>
    <Footer />
  </>;
}
