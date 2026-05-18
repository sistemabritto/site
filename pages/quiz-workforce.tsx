import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';

const PHONE = '5511914088571';

const QUESTIONS = [
  {
    id: 'w1',
    question: 'Qual seu principal desafio hoje?',
    options: [
      { label: 'Perder leads no WhatsApp — ninguém responde', value: 'perdendo-leads' },
      { label: 'Equipe sobrecarregada com atendimento repetitivo', value: 'equipe-sobrecarregada' },
      { label: 'Quero criar agentes de IA personalizados para minha empresa', value: 'agentes-custom' },
      { label: 'Já tenho agentes, quero orquestrar e escalar', value: 'orquestrar' },
    ],
  },
  {
    id: 'w2',
    question: 'Quantas pessoas trabalham na sua operação hoje?',
    options: [
      { label: 'Só eu (freelancer / MEI)', value: 'sozinho' },
      { label: '2 a 5 pessoas', value: 'pequeno' },
      { label: '6 a 15 pessoas', value: 'medio' },
      { label: 'Mais de 15 pessoas', value: 'grande' },
    ],
  },
  {
    id: 'w3',
    question: 'Qual seu orçamento mensal pra isso?',
    options: [
      { label: 'Até R$ 300/mês', value: 'ate-300' },
      { label: 'R$ 300 a R$ 1.000/mês', value: '300-1000' },
      { label: 'R$ 1.000 a R$ 5.000/mês', value: '1000-5000' },
      { label: 'Acima de R$ 5.000/mês', value: '5000+' },
    ],
  },
];

export default function QuizWorkforce() {
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
          setCustomerData({
            name: customer.name || '',
            email: customer.email || '',
            whatsapp: customer.whatsapp || '',
          });
        } catch {}
      }
    }
  }, []);

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
          source: 'quiz-workforce',
          answers: finalAnswers,
        }),
      });
    } catch (e) {
      console.error('Erro ao salvar lead:', e);
    }

    setTimeout(() => {
      const w1 = finalAnswers['w1'] || '';
      const w3 = finalAnswers['w3'] || '';

      // Se for baixo ticket (até R$300) OU perdendo leads -> leva pra página do WhatsApp
      if (w3 === 'ate-300' || w1 === 'perdendo-leads') {
        window.location.href = '/resultado-whatsapp';
      } else {
        // Workforce de verdade -> manda pro WhatsApp do Felipe
        const msg = encodeURIComponent(
          `Fala, Felipe. Fiz o quiz da Workforce e quero saber mais.\n\nDesafio: ${w1}\nEquipe: ${finalAnswers['w2']}\nOrçamento: ${w3}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`
        );
        window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
      }
    }, 800);
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta
        title="Quiz Workforce — Sistema Britto"
        description="Descubra qual solução é ideal pro seu negócio."
        path="/quiz-workforce"
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
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
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
                  className="w-full text-left p-6 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200 group disabled:opacity-50"
                >
                  <span className="text-white text-lg font-medium group-hover:text-purple-400 transition-colors">
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