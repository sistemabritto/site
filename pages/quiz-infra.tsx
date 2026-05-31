import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import PhoneInput from '../components/PhoneInput';

const PHONE = '5511914088571';

const QUESTIONS = [
  {
    id: 'i1',
    question: 'Qual seu objetivo principal?',
    options: [
      { label: 'Estruturar minha infra (VPS, Docker, deploy)', value: 'infra' },
      { label: 'Criar um SaaS / Produto Digital', value: 'saas' },
      { label: 'Ambos: infra + produto próprio', value: 'ambos' },
    ],
  },
  {
    id: 'i2',
    question: 'Qual seu maior problema hoje?',
    options: [
      { label: 'Servidor cai / Deploy quebra / API lenta', value: 'infra-problema' },
      { label: 'Preciso de um dev mas não quero contratar CLT', value: 'sem-dev' },
      { label: 'Quero criar um SaaS do zero', value: 'criar-saas' },
      { label: 'Já tenho ideia, preciso executar rápido', value: 'executar' },
    ],
  },
  {
    id: 'i3',
    question: 'Qual seu orçamento mensal pra isso?',
    options: [
      { label: 'Até R$ 500/mês', value: 'ate-500' },
      { label: 'R$ 500 - R$ 2.000/mês', value: '500-2000' },
      { label: 'R$ 2.000 - R$ 5.000/mês', value: '2000-5000' },
      { label: 'Acima de R$ 5.000/mês', value: '5000+' },
    ],
  },
];

export default function QuizInfra() {
  const [step, setStep] = useState<'email' | 'quiz'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          const customer = JSON.parse(stored);
          const parsed = {
            name: customer.name || '',
            email: customer.email || '',
            whatsapp: customer.whatsapp || '',
          };
          setCustomerData(parsed);
          setName(parsed.name);
          setEmail(parsed.email);
          setWhatsapp(parsed.whatsapp);
        } catch {}
      }
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !whatsapp) return;

    const data = { name, email, whatsapp };
    setCustomerData(data);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(data));
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'quiz-infra',
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
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customerData));
      sessionStorage.setItem('qualificacao_answers', JSON.stringify(finalAnswers));
    }

    // Salvar lead
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customerData,
          source: 'quiz-infra',
          answers: finalAnswers,
        }),
      });
    } catch (e) {
      console.error('Erro ao salvar lead:', e);
    }

    setTimeout(() => {
      const i1 = finalAnswers['i1'] || '';
      const i3 = finalAnswers['i3'] || '';

      // Se for infra + orçamento adequado -> mostra página VPS
      if ((i1 === 'infra' || i1 === 'ambos') && (i3 === '500-2000' || i3 === '2000-5000' || i3 === '5000+')) {
        window.location.href = '/vps';
      } else {
        // Não fitou -> manda pro WhatsApp do Felipe
        const msg = encodeURIComponent(
          `Fala, Felipe. Fiz a qualificação de Infra/SaaS. Bora conversar?\n\nObjetivo: ${i1}\nProblema: ${finalAnswers['i2']}\nOrçamento: ${i3}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`
        );
        window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
      }
    }, 800);
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  // Email capture step
  if (step === 'email') {
    return (
      <>
        <Meta
          title="Quiz Infra & SaaS — Sistema Britto"
          description="Descubra a melhor solução de infraestrutura pro seu negócio."
          path="/quiz-infra"
        />

        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Antes de começar...
              </h1>
              <p className="text-gray-300 text-lg">
                Precisamos dos seus dados pra personalizar sua qualificação.
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
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
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
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <PhoneInput
                  value={whatsapp}
                  onChange={(v) => setWhatsapp(v)}
                  accentColor="#D4AF37"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#c9a230] text-black py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-[#D4AF37]/25"
              >
                COMEÇAR QUIZ →
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                🔒 Seus dados são confidenciais. Não enviamos spam.
              </p>
            </form>
          </div>
        </main>
      </>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta
        title="Quiz Infra & SaaS — Sistema Britto"
        description="Descubra a melhor solução de infraestrutura pro seu negócio."
        path="/quiz-infra"
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
                className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
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
                  className="w-full text-left p-6 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-200 group disabled:opacity-50"
                >
                  <span className="text-white text-lg font-medium group-hover:text-[#D4AF37] transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-8 text-gray-400 hover:text-white transition-colors text-sm"
              >
                {'\u2190'} Voltar
              </button>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">{'\uD83D\uDD12'} Suas respostas são confidenciais</p>
          </div>
        </div>
      </main>
    </>
  );
}