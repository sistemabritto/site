import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import PhoneInput from '../components/PhoneInput';

const PHONE = '5511914088571';

const QUESTIONS = [
  {
    id: 'i1',
    question: 'Como você usa o WhatsApp no seu negócio hoje?',
    options: [
      { label: 'Atendo manualmente, um por um', value: 'manual' },
      { label: 'Tenho algumas automações, mas nada inteligente', value: 'semi-auto' },
      { label: 'Quero automatizar do zero', value: 'do-zero' },
      { label: 'Já uso IA, mas quero escalar mais', value: 'escalar' },
    ],
  },
  {
    id: 'i2',
    question: 'Qual seu maior gargalo no atendimento?',
    options: [
      { label: 'Resposta lenta = cliente vai embora', value: 'resposta-lenta' },
      { label: 'Não consigo filtrar quem é lead de quem é curiosidade', value: 'sem-filtro' },
      { label: 'Follow-up inexistente ou falho', value: 'follow-up' },
      { label: 'Dependo de pessoas pra tudo', value: 'depende-pessoas' },
    ],
  },
  {
    id: 'i3',
    question: 'O que faria mais diferença pra você agora?',
    options: [
      { label: 'Um agente de IA que qualifica e atende no WhatsApp 24/7', value: 'agente-ia' },
      { label: 'Funis de vendas automatizados que convertem sozinhos', value: 'funil-auto' },
      { label: 'Estratégia + ferramenta configuradas com especialista', value: 'estrategia-completa' },
      { label: 'Quero entender o que é possível antes de decidir', value: 'entender-primeiro' },
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
    const i2 = finalAnswers['i2'] || '';
    const i3 = finalAnswers['i3'] || '';

    // Lead qualificado -> página de qualificação
    if (i3 === 'agente-ia' || i3 === 'funil-auto' || i3 === 'estrategia-completa') {
    window.location.href = '/qualificacao';
    } else {
    // Quer entender melhor -> manda pro WhatsApp do Felipe
    const msg = encodeURIComponent(
    `Fala, Felipe! Fiz o quiz de automação e quero entender melhor as possibilidades.\n\nComo uso WhatsApp: ${i1}\nGargalo: ${i2}\nO que quero: ${i3}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`
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
          title="Quiz Automação WhatsApp — Sistema Britto"
          description="Descubra como automatizar seu atendimento no WhatsApp com IA."
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
                        Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>. Somente assuntos do seu interesse.
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
        title="Quiz Automação WhatsApp — Sistema Britto"
        description="Descubra como automatizar seu atendimento no WhatsApp com IA."
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
            <p className="text-gray-500 text-sm">Seus dados são protegidos conforme LGPD. Somente assuntos do seu interesse.</p>
          </div>
        </div>
      </main>
    </>
  );
}