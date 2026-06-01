import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import PhoneInput from '../components/PhoneInput';

const PHONE = '5511914088571';

const QUESTIONS = [
  {
    id: 'q1',
    question: 'O que você mais precisa agora?',
    options: [
      { label: 'Atender e vender no WhatsApp com IA 24/7', value: 'crm', icon: '💬' },
      { label: 'Conteúdo infinito nas redes sociais — posts automáticos e virais', value: 'social', icon: '🔥' },
      { label: 'Algo sob encomenda — app, site, infra, SaaS', value: 'custom', icon: '🛠️' },
    ],
  },
  {
    id: 'q2',
    question: 'Qual seu maior gargalo hoje?',
    options: [
      { label: 'Perco leads porque não respondo rápido', value: 'leads-perdidos', icon: '' },
      { label: 'Não tenho presença nas redes sociais — ninguém me conhece', value: 'sem-presenca', icon: '' },
      { label: 'Preciso de algo que não existe no mercado', value: 'nao-existe', icon: '' },
      { label: 'Meu negócio cresceu e a operação não acompanha', value: 'cresceu', icon: '' },
    ],
  },
  {
    id: 'q3',
    question: 'Qual seu orçamento mensal?',
    options: [
        { label: 'Até R$ 300/mês', value: 'ate-300', icon: '' },
        { label: 'R$ 300 a R$ 1.000/mês', value: '300-1000', icon: '' },
        { label: 'R$ 1.000 a R$ 5.000/mês', value: '1000-5000', icon: '' },
        { label: 'Acima de R$ 5.000/mês', value: '5000+', icon: '' },
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

// 3 outcomes baseados no que o cara quer
type Outcome = 'crm' | 'social' | 'custom';

function calculateOutcome(answers: Record<string, string>): Outcome {
  const solution = answers['q1'] || '';
  const gargalo = answers['q2'] || '';

  if (solution === 'crm') return 'crm';
  if (solution === 'social') return 'social';
  if (solution === 'custom') return 'custom';

  // Fallback pelo gargalo
  if (gargalo === 'leads-perdidos' || gargalo === 'cresceu') return 'crm';
  if (gargalo === 'sem-presenca') return 'social';
  return 'custom';
}

export default function Quiz() {
  const [step, setStep] = useState<'email' | 'quiz'>('email');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [hasExistingData, setHasExistingData] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'].forEach(key => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      setUtmParams(utm);

      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          const customer = JSON.parse(stored);
          if (customer.name) setName(customer.name);
          if (customer.email) setEmail(customer.email);
          if (customer.whatsapp) setWhatsapp(customer.whatsapp);
          if (customer.name && customer.email && customer.whatsapp) {
            setHasExistingData(true);
          }
        } catch {}
      }
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !whatsapp) return;

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
          utm: utmParams,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[Lead Capture Error]', err);
    }

    setStep('quiz');
  };

  const handleAnswer = (value: string) => {
    if (!QUESTIONS[currentStep]) return;
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: value };
    setAnswers(newAnswers);

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

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, whatsapp,
          source: 'quiz-completed',
          answers: finalAnswers,
          utm: utmParams,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[Lead Save Error]', err);
    }

    const outcome = calculateOutcome(finalAnswers);

    setTimeout(() => {
      if (outcome === 'crm') {
        window.location.href = '/resultado';
      } else if (outcome === 'social') {
        window.location.href = '/socialforce';
      } else {
        // Custom → WhatsApp do Felipe com contexto
        const msg = encodeURIComponent(
          `Fala, Felipe. Fiz a qualificação e preciso de algo SOB ENCOMENDA.\n\nDesafio: ${finalAnswers['q2']}\nOrçamento: ${finalAnswers['q3']}\nPrazo: ${finalAnswers['q4']}\n\nNome: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}`
        );
        window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
      }
    }, 800);
  };

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
                {hasExistingData ? 'Seus dados já estão aqui!' : 'Antes de começar...'}
              </h1>
              <p className="text-gray-300 text-lg">
                {hasExistingData
                  ? 'Confirme seus dados e descubra a solução ideal. Leva menos de 2 minutos.'
                  : 'Precisamos dos seus dados pra personalizar sua recomendação.'}
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
                {hasExistingData ? 'DESCOBRIR MINHA SOLUÇÃO →' : 'COMEÇAR →'}
              </button>
              <p className="text-gray-500 text-xs text-center mt-4">
                Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>. Somente assuntos do seu interesse.
              </p>
            </form>
          </div>
        </main>
      </>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

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
            <p className="text-gray-500 text-sm">Seus dados são protegidos conforme LGPD. Somente assuntos do seu interesse.</p>
          </div>
        </div>
      </main>
    </>
  );
}
