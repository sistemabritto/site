import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';

const QUESTIONS = [
  {
    id: 'd1',
    question: 'Qual seu objetivo principal agora?',
    options: [
      { label: 'Estruturar minha infra (VPS, Docker, Deploy)', value: 'infra' },
      { label: 'Criar um SaaS/Produto Digital do zero', value: 'saas' },
      { label: 'Ambos: Infra + Produto Próprio', value: 'ambos' },
    ],
  },
  {
    id: 'd2',
    question: 'Qual seu maior problema hoje?',
    options: [
      { label: 'Servidor cai / Deploy quebra / API lenta', value: 'infra-problema' },
      { label: 'Falta de automação / Processos manuais', value: 'automacao' },
      { label: 'Quero um SaaS específico que não existe no mercado', value: 'ideia-saas' },
      { label: 'Já tenho ideia, preciso executar', value: 'execucao' },
    ],
  },
  {
    id: 'd3',
    question: 'Qual seu orçamento mensal pra isso?',
    options: [
      { label: 'Até R$ 500/mês', value: 'ate-500' },
      { label: 'R$ 500 - R$ 2.000/mês', value: '500-2000' },
      { label: 'R$ 2.000 - R$ 5.000/mês', value: '2000-5000' },
      { label: 'Acima de R$ 5.000/mês', value: '5000+' },
    ],
  },
  {
    id: 'd4',
    question: 'Em quanto tempo você quer isso rodando?',
    options: [
      { label: 'Urgente (essa semana)', value: 'urgente' },
      { label: 'Rápido (até 15 dias)', value: '15-dias' },
      { label: 'Tranquilo (até 30 dias)', value: '30-dias' },
      { label: 'Estou planejando (2-3 meses)', value: 'planejando' },
    ],
  },
];

export default function QualificacaoDigital() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    // Carregar UTM params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      setUtmParams(utm);

      // Recuperar dados do cliente do sessionStorage
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try {
          const customer = JSON.parse(storedCustomer);
          setCustomerData({
            name: customer.name || '',
            email: customer.email || '',
            whatsapp: customer.whatsapp || '',
          });
        } catch {
          // ignore
        }
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
      processQualification(newAnswers);
    }
  };

  const processQualification = async (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);

    // Salvar dados no sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customerData));
      sessionStorage.setItem('qualificacao_answers', JSON.stringify(finalAnswers));
    }

    // Salvar qualificação no CRM
    try {
      await fetch('/api/qualificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'qualification_digital_completed',
          ...customerData,
          answers: finalAnswers,
          utm: utmParams,
          result: 'digital-funnel',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error('[Qualificacao Digital] Erro ao salvar:', e);
    }

  // Enviar direto pro WhatsApp com a mensagem montada
  setTimeout(() => {
    const d1 = finalAnswers['d1'] || '';
    const d2 = finalAnswers['d2'] || '';
    const d3 = finalAnswers['d3'] || '';
    const d4 = finalAnswers['d4'] || '';
    
    let msg = '';
    if (d1 === 'infra' || d1 === 'ambos') {
      msg = `Fala, Felipe. Fiz a qualificação DIGITAL e quero cuidar da minha INFRAESTRUTURA.\n\nObjetivo: ${d1}\nProblema: ${d2}\nOrçamento: ${d3}\nPrazo: ${d4}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    } else if (d1 === 'saas') {
      msg = `Fala, Felipe. Fiz a qualificação DIGITAL e quero CRIAR UM SAAS/PRODUTO DIGITAL.\n\nObjetivo: ${d1}\nProblema: ${d2}\nOrçamento: ${d3}\nPrazo: ${d4}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    } else {
      msg = `Fala, Felipe. Fiz a qualificação DIGITAL e preciso de um orçamento sob medida.\n\nResumo: ${d1} - ${d2}\nOrçamento: ${d3}\nPrazo: ${d4}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    }
    
    window.location.href = `https://wa.me/5511914088571?text=${encodeURIComponent(msg)}`;
  }, 500);
};

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  // Tela de carregamento
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

  return (
    <>
      <Meta 
        title="Qualificação Digital — Sistema Britto"
        description="Descubra se sua empresa é elegível para nossa força de trabalho digital."
        path="/qualificacao-digital"
      />
      
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Questão {currentStep + 1} de {QUESTIONS.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <div className="w-full bg-[#111111] rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
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
                  className="w-full text-left p-6 rounded-xl border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-white text-lg font-medium group-hover:text-green-400 transition-colors">
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
                ← Voltar
              </button>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              🔒 Suas respostas são confidenciais
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
