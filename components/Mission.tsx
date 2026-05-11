import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Mission() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative py-16 sm:py-24 bg-surface-50">
      <div ref={reveal} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-surface-900 mb-4">
          Nossa Missão
        </h2>
        <p className="text-xl sm:text-2xl text-surface-700/80 leading-relaxed">
          Fazemos automações que <strong className="text-primary-600">economizam tempo ⏱️</strong>{' '}
          <strong className="text-accent-500">cortam custos 💸</strong>{' '}
          e <strong className="text-green-600">escalam suas vendas 📈</strong>
        </p>
      </div>
    </section>
  );
}
