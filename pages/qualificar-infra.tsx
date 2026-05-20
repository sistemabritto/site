import { useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Question = {
  id: string;
  label: string;
  type: 'select';
  options: string[];
};

const questions: Question[] = [
  {
    id: 'faturamento',
    label: 'Faturamento mensal da empresa?',
    type: 'select',
    options: ['Menos de R$ 10.000', 'R$ 10.000 — R$ 50.000', 'R$ 50.000 — R$ 200.000', 'Mais de R$ 200.000'],
  },
  {
    id: 'servidor',
    label: 'Como está hospedado seu sistema hoje?',
    type: 'select',
    options: ['Servidor próprio (on-premise)', 'VPS (DigitalOcean, AWS, etc.)', 'Hospedagem compartilhada (cPanel)', 'Não sei / Sem site ainda'],
  },
  {
    id: 'pesadelo',
    label: 'Qual seu pesadelo técnico atual?',
    type: 'select',
    options: ['Site cai do nada', 'Deploy quebra toda semana', 'Sem backup, se perde perde tudo', 'Tudo isso + servidor lento'],
  },
  {
    id: 'equipe_tecnica',
    label: 'Tem equipe técnica?',
    type: 'select',
    options: ['Sim, time completo', 'Sim, 1-2 pessoas', 'Não, zero'],
  },
  {
    id: 'urgencia',
    label: 'Quer começar em quanto tempo?',
    type: 'select',
    options: ['Agora', 'Em 1-2 semanas', '1-3 meses', 'Só pesquisando'],
  },
];

const SCORES: Record<string, Record<string, number>> = {
  faturamento: {
    'Menos de R$ 10.000': 0,
    'R$ 10.000 — R$ 50.000': 1,
    'R$ 50.000 — R$ 200.000': 2,
    'Mais de R$ 200.000': 3,
  },
  servidor: {
    'Servidor próprio (on-premise)': 2,
    'VPS (DigitalOcean, AWS, etc.)': 2,
    'Hospedagem compartilhada (cPanel)': 1,
    'Não sei / Sem site ainda': 0,
  },
  pesadelo: {
    'Site cai do nada': 2,
    'Deploy quebra toda semana': 2,
    'Sem backup, se perde perde tudo': 2,
    'Tudo isso + servidor lento': 3,
  },
  equipe_tecnica: {
    'Sim, time completo': 3,
    'Sim, 1-2 pessoas': 2,
    'Não, zero': 0,
  },
  urgencia: {
    'Agora': 3,
    'Em 1-2 semanas': 2,
    '1-3 meses': 1,
    'Só pesquisando': 0,
  },
};

export default function QualificarInfra() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQ].id]: value };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer && SCORES[q.id]?.[answer] !== undefined) {
        score += SCORES[q.id][answer];
      }
    });
    return score;
  };

  const getResult = () => {
    const score = calculateScore();
    const faturamento = answers.faturamento;
    const pesadelo = answers.pesadelo;
    const equipe = answers.equipe_tecnica;
    const urgencia = answers.urgencia;

    const highFaturamento = faturamento === 'Mais de R$ 200.000' || faturamento === 'R$ 50.000 — R$ 200.000';
    const criticalPain = pesadelo === 'Tudo isso + servidor lento';
    const urgent = urgencia === 'Agora' || urgencia === 'Em 1-2 semanas';
    const noTeam = equipe === 'Não, zero';

    if (score >= 7 && highFaturamento && urgent && (criticalPain || noTeam)) {
      return {
        fit: true,
        title: 'Você tem fit para consultoria!',
        desc: 'Sua infra precisa de braço de verdade. A gente te mostra como estruturar tudo em call.',
        cta: 'Agendar call →',
        ctaLink: '/login?redirect=consultoria-devops',
      };
    }

    if (score >= 4 && !noTeam) {
      return {
        fit: false,
        title: 'VPS Estruturada é pra você',
        desc: 'Você já tem alguma base técnica. Nossa VPS já vem pronta com Docker, backup, SSL e monitoramento.',
        cta: 'Ver VPS →',
        ctaLink: '/vps',
      };
    }

    return {
      fit: false,
      title: 'WhatsApp IA é o começo',
      desc: 'Comece pelo atendimento. Depois a gente escala pro resto.',
      cta: 'Ver WhatsApp IA →',
      ctaLink: '/whatsapp',
    };
  };

  const q = questions[currentQ];

  return (
    <>
      <Meta title="Qualificar — Infraestrutura" description="Responda 5 perguntas rápidas e descubra qual solução de infraestrutura faz sentido pra você." path="/qualificar-infra" />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4" style={{ color: '#ffffff' }}>
        <div className="max-w-lg w-full">
          {!showResult ? (
            <div className="bg-[#111111] rounded-3xl p-8 border border-[#D4AF37]/20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">{currentQ + 1} / {questions.length}</span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-8 h-1 rounded-full ${i <= currentQ ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">{q.label}</h2>
              <div className="space-y-3">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left bg-[#0a0a0a] border border-white/10 hover:border-[#D4AF37]/50 rounded-xl px-5 py-4 text-white transition-all hover:bg-white/5"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] rounded-3xl p-8 border border-[#D4AF37]/20 text-center">
              <div className="text-5xl mb-4">{getResult().fit ? '🎯' : '🛡️'}</div>
              <h2 className="text-2xl font-bold text-white mb-3">{getResult().title}</h2>
              <p className="text-gray-300 mb-8">{getResult().desc}</p>
              <a href={getResult().ctaLink} className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-8 py-4 rounded-full font-bold text-lg transition-all">
                {getResult().cta}
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
