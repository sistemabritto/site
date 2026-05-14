import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Meta from '../components/Meta';

// Perguntas de qualificação (PLACEHOLDERS - definir com Felipe)
const QUESTIONS = [
  {
    id: 'p1_volume',
    event: 'Qualification_P1_Volume',
    question: 'Quantos leads sua empresa recebe por mês no WhatsApp?',
    options: [
      { label: 'Menos de 100', value: '0-100' },
      { label: '100 a 500', value: '100-500' },
      { label: '500 a 1000', value: '500-1000' },
      { label: 'Mais de 1000', value: '1000+' },
    ],
  },
  {
    id: 'p2_ticket',
    event: 'Qualification_P2_Ticket',
    question: 'Qual seu ticket médio atual?',
    options: [
      { label: 'Até R$ 100', value: 'ate-100' },
      { label: 'R$ 100 - R$ 500', value: '100-500' },
      { label: 'R$ 500 - R$ 2000', value: '500-2000' },
      { label: 'Acima de R$ 2000', value: '2000+' },
    ],
  },
  {
    id: 'p3_time',
    event: 'Qualification_P3_Time',
    question: 'Quanto tempo sua equipe leva pra responder um lead no WhatsApp?',
    options: [
      { label: 'Imediato (até 5 min)', value: 'imediato' },
      { label: 'Rápido (5-30 min)', value: 'rapido' },
      { label: 'Demorado (30 min - 2h)', value: 'demorado' },
      { label: 'Muito demorado (+2h)', value: 'muito-demorado' },
    ],
  },
  {
    id: 'p4_investment',
    event: 'Qualification_P4_Investment',
    question: 'Pra implementar essa força de trabalho, investimento a partir de R$ 3.000. Você está disposto, é capaz e tem o dinheiro na mão?',
    options: [
      { label: 'Sim, estou disposto', value: 'sim', redirect: 'high-ticket' },
      { label: 'Não, preciso de algo mais acessível', value: 'nao', redirect: 'downsell' },
    ],
  },
];

export default function Qualificacao() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  // Track event no Facebook Pixel
  const trackEvent = (eventName: string, eventData?: any) => {
    if (typeof window !== 'undefined') {
      // Facebook Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', eventName, eventData);
      }
      
      // Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName.toLowerCase().replace('_', ' '), eventData);
      }

      // Console log pra debug
      console.log('[Track Event]', eventName, eventData);
    }
  };

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;

    // Track resposta
    trackEvent(currentQuestion.event, {
      question_id: currentQuestion.id,
      answer: value,
      step: currentStep + 1,
      total_steps: QUESTIONS.length,
    });

    // Salvar resposta
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Avançar ou finalizar
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Última pergunta - processar
      processQualification(newAnswers);
    }
  };

  const processQualification = (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);

    const p4Answer = finalAnswers['p4_investment'];
    const isHighTicket = p4Answer === 'sim';

    // Track final qualification
    trackEvent('Qualification_Completed', {
      answers: finalAnswers,
      result: isHighTicket ? 'high-ticket' : 'downsell',
    });

    // Enviar para Evo CRM (webhook)
    fetch('/api/qualificacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: finalAnswers,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      }),
    })
      .catch(console.error);

    // Redirecionar
    setTimeout(() => {
      if (isHighTicket) {
        router.push('/agendamento');
      } else {
        router.push('/whatsapp-ia');
      }
    }, 500);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta 
        title="Qualificação — Sistema Britto"
        description="Responda 4 perguntas rápidas para ver se sua empresa é elegível"
        path="/qualificacao"
      />
      
      <main className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Questão {currentStep + 1} de {QUESTIONS.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <div className="w-full bg-surface-900 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-surface-900 rounded-3xl p-8 sm:p-12 border border-white/10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-tight">
              {currentQuestion.question}
            </h1>

            <div className="space-y-4">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-6 rounded-xl border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-200 group"
                >
                  <span className="text-white text-lg font-medium group-hover:text-green-400 transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Back button (se não for primeira pergunta) */}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-8 text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Voltar
              </button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              🔒 Suas respostas são confidenciais e serão usadas apenas para qualificação
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
