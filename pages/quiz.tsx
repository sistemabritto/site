import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import PhoneInput from '../components/PhoneInput';

const PHONE = '5511914088571';

const QUESTIONS = [
 {
 id: 'q1',
 question: 'O que você mais precisa agora?',
 options: [
 { label: 'Atender e vender no WhatsApp com IA 24/7', value: 'crm', icon: '' },
 { label: 'Conteúdo infinito nas redes sociais — posts automáticos e virais', value: 'social', icon: '' },
 { label: 'Algo sob encomenda — app, site, infra, SaaS', value: 'custom', icon: '' },
 ],
 },
 {
 id: 'q2',
 question: 'Qual seu maior gargalo hoje?',
 options: [
 { label: 'Perco leads porque não respondo rápido', value: 'leads-perdidos', icon: '' },
 { label: 'Não tenho presença nas redes — ninguém me conhece', value: 'sem-presenca', icon: '' },
 { label: 'Preciso de algo que não existe no mercado', value: 'nao-existe', icon: '' },
 { label: 'Meu negócio cresceu e a operação não acompanha', value: 'cresceu', icon: '' },
 ],
 },
 {
 id: 'q3',
 question: 'Quanto você já investiu em solução assim antes?',
 options: [
 { label: 'Nada ainda — é minha primeira vez', value: 'nada', icon: '' },
 { label: 'Já gastei com freelas mas não deu certo', value: 'freelas', icon: '' },
 { label: 'Já pago ferramentas mas quero consolidar', value: 'ferramentas', icon: '' },
 { label: 'Invisto pesado e quero otimizar', value: 'pesado', icon: '' },
 ],
 },
 {
 id: 'q4',
 question: 'Em quanto tempo você quer isso rodando?',
 options: [
 { label: 'Urgente — essa semana', value: 'urgente', icon: '' },
 { label: 'Rápido — até 15 dias', value: 'rapido', icon: '' },
 { label: 'Tranquilo — até 30 dias', value: 'tranquilo', icon: '' },
 { label: 'Estou planejando — 2 a 3 meses', value: 'planejando', icon: '' },
 ],
 },
];

type Outcome = 'crm' | 'social' | 'custom';

function calculateOutcome(answers: Record<string, string>): Outcome {
  const solution = answers['q1'] || '';
  const gargalo = answers['q2'] || '';

  if (solution === 'crm') return 'crm';
  if (solution === 'social') return 'social';
  if (solution === 'custom') return 'custom';

  // Fallback
  if (gargalo === 'leads-perdidos' || gargalo === 'cresceu') return 'crm';
  if (gargalo === 'sem-presenca') return 'social';
  return 'custom';
}

// Tracking por etapa
let stageTimestamps: Record<string, string> = {};

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return `srv-${Date.now()}`;
  let sid = sessionStorage.getItem('sb_session_id');
  if (!sid) {
    sid = `qs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem('sb_session_id', sid);
  }
  return sid;
}

function trackStage(stage: string, extra: Record<string, string> = {}) {
  const ts = new Date().toISOString();
  stageTimestamps[stage] = ts;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('quiz_stages', JSON.stringify(stageTimestamps));
    const sessionId = getOrCreateSessionId();
    const quizSource = sessionStorage.getItem('quiz_source') || '';
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'quiz', session_id: sessionId, stage, quiz_source: quizSource, timestamp: ts, ...extra }),
    }).catch(() => {});
  }
}

export default function Quiz() {
  const [step, setStep] = useState<'email' | 'quiz' | 'budget'>('quiz'); // <-- começa no quiz por padrão
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizOutcome, setQuizOutcome] = useState<Outcome | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [hasExistingData, setHasExistingData] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [quizSource, setQuizSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    // Source param
    const source = params.get('source');
    if (source) {
      setQuizSource(source);
      sessionStorage.setItem('quiz_source', source);
    }

    // Read existing data from sessionStorage
    const storedCustomer = sessionStorage.getItem('qualificacao_customer');
    let hasCustomerData = false;
    if (storedCustomer) {
      try {
        const customer = JSON.parse(storedCustomer);
        if (customer.name) setName(customer.name);
        if (customer.email) setEmail(customer.email);
        if (customer.whatsapp) setWhatsapp(customer.whatsapp);
        hasCustomerData = !!(customer.name && customer.email && customer.whatsapp);
      } catch {}
    }

    // Read data from URL params (overrides sessionStorage)
    const urlName = params.get('name');
    const urlEmail = params.get('email');
    const urlWhatsapp = params.get('whatsapp');

    if (urlName) setName(urlName);
    if (urlEmail) setEmail(urlEmail);
    if (urlWhatsapp) setWhatsapp(urlWhatsapp);

    // Determine if we should skip email capture
    const hasEnoughData = !!(urlName && urlEmail && urlWhatsapp) || hasCustomerData;
    setHasExistingData(hasEnoughData);

    // If data exists, go straight to quiz
    if (hasEnoughData) {
      setStep('quiz');
    } else {
      // Need email capture
      setStep('email');
    }

    // UTM
    const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'].forEach(key => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      setUtmParams(utm);
    }

    setLoading(false);
    trackStage('quiz-visited');
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify({ name, email, whatsapp }));
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, whatsapp,
          source: 'quiz-capture',
          answers_partial: answers,
          utm: utmParams,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[Lead Capture Error]', err);
    }

    trackStage('email-captured');
    setStep('quiz');
  };

  const handleAnswer = (value: string) => {
    if (!QUESTIONS[currentStep]) return;
    const qId = QUESTIONS[currentStep].id;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    // Track each answer
    trackStage(`answered-${qId}`);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processQuiz(newAnswers);
    }
  };

  const processQuiz = async (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify({ name, email, whatsapp }));
      sessionStorage.setItem('qualificacao_answers', JSON.stringify(finalAnswers));
    }

    trackStage('quiz-completed');

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, whatsapp,
          source: 'quiz-completed',
          answers: finalAnswers,
          utm: utmParams,
          stages: stageTimestamps,
          quiz_source: quizSource,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[Lead Save Error]', err);
    }

    const outcome = calculateOutcome(finalAnswers);
    setQuizOutcome(outcome);

    if (outcome === 'crm') {
    // CRM vai direto pra página de resultado
    window.location.href = '/resultado';
    } else {
    // Social ou Custom → fita de validação de preço
    setIsSubmitting(false);
    setStep('budget');
    }
    };

  // === HELPERS: WhatsApp message builder ===
  const labels: Record<string, string> = {
  crm: 'WhatsApp + IA',
  social: 'SocialJobs',
  custom: 'Sob encomenda',
  'leads-perdidos': 'Perco leads por demora',
  'sem-presenca': 'Sem presença nas redes',
  'nao-existe': 'Preciso de algo que não existe',
  'cresceu': 'Operação não acompanha o crescimento',
  'nada': 'Primeira vez',
  'freelas': 'Já gastei com freelas',
  'ferramentas': 'Já pago ferramentas',
  'pesado': 'Invosto pesado',
  'urgente': 'Essa semana',
  'rapido': 'Até 15 dias',
  'tranquilo': 'Até 30 dias',
  'planejando': '2 a 3 meses',
  };

  const L = (key: string) => labels[key] || key;
  const NL = '%0A';

  const buildWhatsAppMsg = (type: 'socialjobs' | 'sistema' | 'custom') => {
  const headerEmoji = type === 'socialjobs' ? '🟠' : type === 'sistema' ? '🔵' : '🟣';
  const headerText = type === 'socialjobs'
  ? 'Quero o SocialJobs'
  : type === 'sistema'
  ? 'Quero o Sistema Sob Medida'
  : 'Preciso de algo sob encomenda';

  const msg = encodeURIComponent(
  `${headerEmoji} *${headerText}*${NL}${NL}` +
  `*Interesse:* ${L(quizOutcome || '')}${NL}` +
  `*Gargalo:* ${L(answers['q2'])}${NL}` +
  `*Investiu antes:* ${L(answers['q3'])}${NL}` +
  `*Prazo:* ${L(answers['q4'])}${NL}${NL}` +
  `———${NL}` +
  `👤 ${name || '—'}${NL}` +
  `📧 ${email || '—'}${NL}` +
  `📱 ${whatsapp || '—'}`
  );
  return msg;
  };

  const handleBudgetYes = () => {
  trackStage('budget-yes');
  const savedSource = typeof window !== 'undefined' ? sessionStorage.getItem('quiz_source') : null;
  let msgType: 'socialjobs' | 'sistema' | 'custom';

  if (quizOutcome === 'social') {
  msgType = savedSource === 'sistema' ? 'sistema' : 'socialjobs';
  } else {
  msgType = 'custom';
  }

  const msg = buildWhatsAppMsg(msgType);
  window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
  };

  const handleBudgetNo = () => {
  trackStage('budget-no');
  // Downsell VPS
  sessionStorage.setItem('vps_downsell_source', quizOutcome === 'social' ? 'socialjobs' : 'sistema');
  window.location.href = '/vps';
  };

  const handleSkipEmail = () => {
  // Skip email and go straight to quiz
  setStep('quiz');
  trackStage('email-skipped');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto" />
      </div>
    );
  }

  // === TELA DE VALIDAÇÃO DE ORÇAMENTO ===
 if (step === 'budget' && quizOutcome) {
 const isSocial = quizOutcome === 'social';
 const budgetText = isSocial
 ? 'O investimento para postar todo dia no automático em 5 redes sociais diferentes é a partir de R$500 por mês. Você tem capacidade financeira de investir esse valor no seu negócio agora?'
 : 'O investimento para colocar o seu sistema sob medida no ar varia bastante de acordo com a sua necessidade. Então, neste momento, você tem capacidade financeira de investir a partir de R$1.500 para viabilizar esse seu projeto agora?';
 const emoji = isSocial ? '🟠' : '🟣';
 const title = isSocial ? 'SocialJobs' : 'Sistema Sob Medida';

 return (
 <>
 <Meta
 title={`${title} — Sistema Britto`}
 description="Próximo passo."
 path="/quiz"
 />
 <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
 <div className="w-full max-w-lg">
 <div className="text-center mb-8">
 <span className="text-5xl mb-4 block">{emoji}</span>
 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 {title}
 </h1>
 </div>

 <div className="bg-[#111111] rounded-3xl p-8 sm:p-10 border border-white/10">
 <p className="text-gray-300 text-lg leading-relaxed mb-10 text-center">
 {budgetText}
 </p>
 <div className="space-y-4">
 <button
 onClick={handleBudgetYes}
 className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-500/25"
 >
 SIM, QUERO INVESTIR
 </button>
 <button
 onClick={handleBudgetNo}
 className="w-full bg-transparent border border-white/20 hover:border-white/40 text-gray-300 hover:text-white py-4 rounded-full font-medium text-base transition-all duration-300"
 >
 AINDA NÃO
 </button>
 </div>
 </div>

 <div className="mt-8 text-center">
 <p className="text-gray-500 text-sm">Seus dados são protegidos conforme LGPD.</p>
 </div>
 </div>
 </main>
 </>
 );
 }

 // === TELA DE CAPTURA ===
  if (step === 'email') {
    return (
      <>
        <Meta
          title="Qualificação — Sistema Britto"
          description="Descubra a solução ideal pro seu negócio. Leva menos de 2 minutos."
          path="/quiz"
        />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Qualificação Rápida</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Antes de começar...
              </h1>
              <p className="text-gray-300 text-lg">
                Preencha rapidinho pra sua solução chegar personalizada.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="bg-[#111111] rounded-3xl p-8 border border-white/10">
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-semibold mb-2">Seu nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  required
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-semibold mb-2">Seu melhor email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: joao@empresa.com.br"
                  required
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <PhoneInput
                  value={whatsapp}
                  onChange={(v) => setWhatsapp(v)}
                  accentColor="#22C55E"
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                COMEÇAR →
              </button>
              <button
                type="button"
                onClick={handleSkipEmail}
                className="w-full mt-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                Pular etapa — só quero o quiz
              </button>
              <p className="text-gray-500 text-xs text-center mt-4">
                Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>.
              </p>
            </form>
          </div>
        </main>
      </>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  // === TELA DO QUIZ ===
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <>
      <Meta
        title="Qualificação — Sistema Britto"
        description="Descubra a solução ideal pro seu negócio. Leva menos de 2 minutos."
        path="/quiz"
      />
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Pergunta {currentStep + 1} de {QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-[#111111] rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-[#111111] rounded-3xl p-8 sm:p-12 border border-white/10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-tight">
              {currentQuestion.question}
            </h1>
            <div className="space-y-4">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
                  disabled={isSubmitting}
                  className="w-full text-left p-6 rounded-xl border border-white/10 hover:border-green-500/50 hover:bg-primary-500/10 transition-all duration-200 group disabled:opacity-50"
                >
                  <span className="text-white text-lg font-medium group-hover:text-green-400 transition-colors">
                    {option.icon ? `${option.icon} ` : ''}{option.label}
                  </span>
                </button>
              ))}
            </div>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-8 text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Voltar
              </button>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">Seus dados são protegidos conforme LGPD.</p>
          </div>
        </div>
      </main>
    </>
  );
}