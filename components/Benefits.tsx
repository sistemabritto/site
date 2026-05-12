import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Benefits Section — Dark mode, high contrast cards
 */

const benefits = [
  {
    icon: '🎯',
    title: 'Qualificação Automática',
    description: 'Fluxos de segmentação que classificam leads pelo WhatsApp, integrados ao seu CRM. Sem esforço manual.',
    stat: '3x',
    statLabel: 'mais leads qualificados',
  },
  {
    icon: '💬',
    title: 'Interação em Tempo Real',
    description: 'Painel multi-usuário para acompanhar conversas ao vivo. Intervenha quando quiser, a IA faz o resto.',
    stat: '24/7',
    statLabel: 'atendimento sem pausa',
  },
  {
    icon: '🔔',
    title: 'Notificações Estratégicas',
    description: 'Mensagens programadas sob medida. Lembretes, follow-ups e ofertas no momento certo.',
    stat: '68%',
    statLabel: 'mais conversões',
  },
];

export default function Benefits() {
  const reveal = useScrollReveal(0.15);

  return (
    <section id="beneficios" className="relative py-20 sm:py-32 bg-surface-900">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px aurora-bg opacity-50" />

      <div ref={reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Por que Workflow API
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Automação simples,
            <br />
            <span className="aurora-text">resultados poderosos</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Tecnologia acessível para negócios de qualquer tamanho. Do primeiro lead ao cliente fiel.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group relative bg-surface-800 rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10"
            >
              {/* Icon */}
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {b.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                {b.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {b.description}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-3xl font-heading font-bold aurora-text">
                  {b.stat}
                </span>
                <span className="block text-xs text-white/40 mt-1">
                  {b.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
