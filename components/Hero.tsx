import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative min-h-[90dvh] sm:min-h-screen flex items-center justify-center overflow-hidden aurora-bg">
      <div className="absolute inset-0 bg-surface-950/90" />

      <div ref={reveal} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center reveal">
        <div className="inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2.5 mb-8 border border-gold-500/30">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <span className="text-white text-sm font-bold">
            Ecossistema de Agentes Inteligentes
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading text-white mb-6 tracking-tight leading-tight font-bold">
          Workforce de IA
          <br />
          <span className="gold-text">operando seu negócio</span>
        </h1>

        <p className="text-lg sm:text-xl text-neutral-200 max-w-2xl mx-auto mb-12 leading-relaxed">
          Agentes autônomos que atendem clientes, gerenciam finanças, coordenam projetos e escrevem código.
          <strong className="text-white"> Uma workforce completa que nunca dorme.</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20conhecer%20a%20workforce%20de%20IA%20para%20meu%20negócio"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg shadow-gold-500/25"
          >
            <span>Conversar com especialista</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 hover:bg-white/15 border border-white/20"
          >
            Ver soluções
            <span className="text-sm">↓</span>
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-neutral-200 text-sm font-semibold">
          <div className="flex -space-x-2">
            {['🧑', '👩', '👨', '👩', '🧑'].map((emoji, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full glass-strong flex items-center justify-center text-sm border border-white/20 bg-surface-800"
              >
                {emoji}
              </div>
            ))}
          </div>
          <span>Workforces operando clínicas, delivery, SaaS e mais</span>
        </div>
      </div>
    </section>
  );
}
