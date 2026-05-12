import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Mission() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="py-20 sm:py-32 bg-surface-900">
      <div ref={reveal} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <span className="inline-block text-accent-400 text-sm font-bold uppercase tracking-wider mb-4">
          Nossa Missão
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 leading-tight">
          Democratizar o acesso à inteligência artificial para
          <span className="gold-text"> negócios brasileiros</span>
        </h2>
        <p className="text-neutral-200 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Acreditamos que todo negócio — do autônomo à clínica, da pizzaria ao escritório de advocacia — merece ter atendimento inteligente, rápido e disponível 24 horas. Sem complexidade, sem contrato longo, sem dor de cabeça.
        </p>
      </div>
    </section>
  );
}
