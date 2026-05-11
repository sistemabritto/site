import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Club Plug & Play — CTA section com aurora gradient
 */

export default function ClubPlugPlay() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Aurora BG */}
      <div className="absolute inset-0 aurora-bg opacity-90" />
      <div className="absolute inset-0 bg-surface-950/60" />

      <div ref={reveal} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-4">
          Clube Plug & Play
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Comece agora pelo
          <br />
          <span className="text-accent-400">Clube Plug & Play</span>
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Acesso imediato às melhores ferramentas para atendimento usando inteligência artificial — inove rápido e sem limites.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://checkout.nubank.com.br/j681LmTjW7xa917"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-surface-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
          >
            Conhecer as vantagens
            <span>→</span>
          </a>
          <a
            href="https://wa.me/5511914088571?text=Quero+implementar+agora"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:glass-strong"
          >
            Implementar Agora
            <span>⚡</span>
          </a>
        </div>
      </div>
    </section>
  );
}
