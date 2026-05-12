import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Benefits Section — Dark mode, MAX CONTRAST
 */

const benefits = [
  {
    icon: '🎯',
    title: 'Qualificação Automática',
    description: 'Seus agentes de IA qualificam cada lead que chega no WhatsApp, perguntando o certo na hora certa.',
    stat: '3x',
    statLabel: 'mais leads qualificados',
  },
  {
    icon: '⏰',
    title: 'Disponível 24/7',
    description: 'Nunca mais perca um cliente porque estava dormindo ou fora do expediente.',
    stat: '24/7',
    statLabel: 'sem pausa',
  },
  {
    icon: '💰',
    title: 'Redução de Custo',
    description: 'Automatize o trabalho de 3 atendentes pagando uma fração do custo.',
    stat: '68%',
    statLabel: 'de economia',
  },
  {
    icon: '🚀',
    title: 'Implementação Rápida',
    description: 'Em 1 hora seu agente de IA já está funcionando no seu WhatsApp — sem instalar nada.',
    stat: '1h',
    statLabel: 'para ativar',
  },
];

export default function Benefits() {
  const reveal = useScrollReveal(0.15);

  return (
    <section id="beneficios" className="py-20 sm:py-32 bg-surface-900">
      <div ref={reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary-400 text-sm font-bold uppercase tracking-wider mb-4">
            Benefícios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Resultados que você
            <span className="aurora-text"> mede no WhatsApp</span>
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto font-medium">
            Cada agente é configurado para sua operação. Veja o que muda no primeiro mês.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="glass-strong rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 group"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{b.icon}</div>

              {/* Title */}
              <h3 className="text-white font-heading font-bold text-lg mb-2">
                {b.title}
              </h3>

              {/* Description — alto contraste */}
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                {b.description}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-white/15">
                <span className="text-primary-400 font-heading font-bold text-2xl">{b.stat}</span>
                <span className="text-neutral-400 text-xs ml-2 font-medium">{b.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
