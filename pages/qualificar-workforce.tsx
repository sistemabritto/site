import { useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Question = {
  id: string;
  label: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 'faturamento',
    label: 'Faturamento mensal da empresa?',
    options: ['Menos de R$ 10.000', 'R$ 10.000 — R$ 50.000', 'R$ 50.000 — R$ 200.000', 'Mais de R$ 200.000'],
  },
  {
    id: 'automatizar',
    label: 'O que precisa automatizar?',
    options: ['Atendimento ao cliente', 'Vendas', 'Marketing', 'Financeiro', 'Operacional', 'Não sei'],
  },
  {
    id: 'equipe_tecnica',
    label: 'Tem equipe técnica (dev, tech lead)?',
    options: ['Sim, time completo', 'Sim, 1-2 pessoas', 'Não, zero'],
  },
  {
    id: 'urgencia',
    label: 'Quer começar em quanto tempo?',
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

export default function QualificarWorkforce() {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [questions[currentQ].id]: value });
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
      if (Array.isArray(answer)) {
        answer.forEach((a) => {
          if (SCORES[q.id]?.[a] !== undefined) {
            score += SCORES[q.id][a];
          }
        });
      } else if (answer && SCORES[q.id]?.[answer] !== undefined) {
        score += SCORES[q.id][answer];
      }
    });
    return score;
  };

  const getResult = () => {
    const score = calculateScore();
    const faturamento = answers.faturamento as string;
    const highFaturamento = faturamento === 'Mais de R$ 200.000' || faturamento === 'R$ 50.000 — R$ 200.000';
    const urgent = answers.urgencia === 'Agora' || answers.urgencia === 'Em 1-2 semanas';

    if (score >= 5 && highFaturamento && urgent) {
      return {
        fit: true,
        title: 'Você tem fit!',
        desc: 'Sua empresa está pronta para uma workforce de IA. Vamos mostrar como funciona na prática.',
        cta: 'Ver apresentação →',
        ctaLink: '/consultoria-devops',
      };
    }

    return {
      fit: false,
      title: 'Ainda não é o momento ideal',
      desc: 'Mas a gente tem soluções mais acessíveis pra você começar.',
      cta: 'Ver solução WhatsApp IA →',
      ctaLink: '/whatsapp',
    };
  };

  const q = questions[currentQ];

  return (
    <>
      <Meta title="Qualificar — Workforce de IA" description="Responda 4 perguntas rápidas e descubra se sua empresa está pronta para uma workforce de IA." path="/qualificar-workforce" />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4" style={{ color: '#ffffff' }}>
        <div className="max-w-lg w-full">
          {!showResult ? (
            <div className="bg-[#111111] rounded-3xl p-8 border border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">{currentQ + 1} / {questions.length}</span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-8 h-1 rounded-full ${i <= currentQ ? 'bg-purple-500' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">{q.label}</h2>
              <div className="space-y-3">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left bg-[#0a0a0a] border border-white/10 hover:border-purple-500/50 rounded-xl px-5 py-4 text-white transition-all hover:bg-white/5"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] rounded-3xl p-8 border border-purple-500/20 text-center">
              <div className="text-5xl mb-4">{getResult().fit ? '🎯' : '🤔'}</div>
              <h2 className="text-2xl font-bold text-white mb-3">{getResult().title}</h2>
              <p className="text-gray-300 mb-8">{getResult().desc}</p>
              <a href={getResult().ctaLink} className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
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
