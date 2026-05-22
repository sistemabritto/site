import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';

const QUESTIONS = [
  {
    id: 'p1',
    question: 'Quantos leads sua empresa recebe por mês no WhatsApp?',
    options: [
      { label: 'Menos de 100', value: '0-100' },
      { label: '100 a 500', value: '100-500' },
      { label: '500 a 1000', value: '500-1000' },
      { label: 'Mais de 1000', value: '1000+' },
    ],
  },
  {
    id: 'p2',
    question: 'Qual seu ticket médio atual?',
    options: [
      { label: 'Até R$ 100', value: 'ate-100' },
      { label: 'R$ 100 - R$ 500', value: '100-500' },
      { label: 'R$ 500 - R$ 2.000', value: '500-2000' },
      { label: 'Acima de R$ 2.000', value: '2000+' },
    ],
  },
  {
    id: 'p3',
    question: 'Quanto tempo sua equipe leva pra responder um lead no WhatsApp?',
    options: [
      { label: 'Imediato (até 5 min)', value: 'imediato' },
      { label: 'Rápido (5-30 min)', value: 'rapido' },
      { label: 'Demorado (30 min - 2h)', value: 'demorado' },
      { label: 'Muito demorado (+2h)', value: 'muito-demorado' },
    ],
  },
  {
    id: 'p4',
    question: 'Qual nível de automação você quer?',
    options: [
      { label: 'Básico: só qualificar e agendar (R$ 297/mês)', value: 'basico' },
      { label: 'Completo: CRM avançado + reativação (R$ 750/mês)', value: 'completo' },
      { label: 'Workforce: 10+ agentes especializados (R$ 2.500+/mês)', value: 'premium' },
    ],
  },
];

export default function Qualificacao() {
  const [step, setStep] = useState<'email' | 'quiz'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [hasExistingData, setHasExistingData] = useState(false);

  useEffect(() => {
    // Carregar UTM params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'].forEach(key => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      setUtmParams(utm);

      // Tentar recuperar dados do cliente do sessionStorage (vindo do WhatsApp)
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try {
          const customer = JSON.parse(storedCustomer);
          if (customer.name) setName(customer.name);
          if (customer.email) setEmail(customer.email);
          if (customer.whatsapp) setWhatsapp(customer.whatsapp);
          if (customer.name && customer.email && customer.whatsapp) {
            setHasExistingData(true);
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !whatsapp) return;

    // Salvar/atualizar dados do cliente no sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify({ name, email, whatsapp }));
    }

    // Salvar lead no CRM
    try {
      await fetch('/api/qualificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'lead_captured',
          email,
          name,
          whatsapp,
          utm: utmParams,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[Lead Capture Error]', err);
    }

    setStep('quiz');
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;

    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processQualification(newAnswers);
    }
  };

  const processQualification = async (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);

    const isHighTicket = finalAnswers['p4'] === 'sim';

    // Garantir que os dados estão salvos no sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify({ name, email, whatsapp }));
      sessionStorage.setItem('qualificacao_answers', JSON.stringify(finalAnswers));
    }

    try {
      await fetch('/api/qualificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'qualification_completed',
          email,
          name,
          whatsapp,
          answers: finalAnswers,
          utm: utmParams,
          result: isHighTicket ? 'high-ticket' : 'downsell',
          timestamp: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        }),
      });
    } catch (e) {
      console.error('[Qualificacao] Erro ao salvar:', e);
    }

 setTimeout(() => {
 if (isHighTicket) {
 const msg = encodeURIComponent(`Fala, Felipe. Fiz o teste de perfil e deu **Workforce**. Tô precisando de braço digital. Me chama.\n\nNome: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}`);
 window.location.href = `https://wa.me/5511914088571?text=${msg}`;
 } else {
 const answersParam = encodeURIComponent(JSON.stringify(finalAnswers));
 window.location.href = `/resultado?answers=${answersParam}`;
 }
 }, 500);
  };

  // Tela de captura de email
  if (step === 'email') {
    return (
      <>
        <Meta 
          title="Qualificação — Sistema Britto"
          description="Responda 4 perguntas rápidas e descubra o plano ideal para sua empresa."
          path="/qualificacao"
        />
        
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Orçamento em Tempo Real</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {hasExistingData ? 'Seus dados já estão aqui!' : 'Antes de começar...'}
              </h1>
              <p className="text-gray-300 text-lg">
                {hasExistingData 
                  ? 'Confirme seus dados e faça a qualificação. Leva menos de 2 minutos.'
                  : 'Precisamos dos seus dados pra personalizar sua qualificação.'}
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
                <label className="block text-gray-300 text-sm font-semibold mb-2">Seu WhatsApp *</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                />
                <p className="text-gray-500 text-xs mt-1">Pra gente te avisar quando seu plano estiver pronto</p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                {hasExistingData ? 'CONTINUAR QUALIFICAÇÃO →' : 'COMEÇAR QUALIFICAÇÃO →'}
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

  // Tela do quiz
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
        title="Qualificação — Sistema Britto"
        description="Responda 4 perguntas rápidas para ver se sua empresa é elegível"
        path="/qualificacao"
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
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
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
                  className="w-full text-left p-6 rounded-xl border border-white/10 hover:border-green-500/50 hover:bg-primary-500/10 transition-all duration-200 group"
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
