import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Club Plug & Play — Dark mode, MAX CONTRAST
 */

export default function ClubPlugPlay() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-100" />
      <div className="absolute inset-0 bg-surface-950/80" />

      <div ref={reveal} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <span className="inline-block text-accent-400 text-sm font-bold uppercase tracking-wider mb-4">
          Clube Plug & Play
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
          Comece agora pelo
          <br />
          <span className="gold-text">Clube Plug & Play</span>
        </h2>
        <p className="text-neutral-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Acesso imediato às melhores ferramentas para atendimento usando inteligência artificial — inove rápido e sem limites.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://checkout.nubank.com.br/j681LmTjW7xa917"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
          >
            Conhecer as vantagens
            <span>→</span>
          </a>
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20o%20Clube%20Plug%20and%20Play%20no%20meu%20negócio%20—%20vi%20no%20site"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-white/15"
          >
            Implementar Agora
            <span>⚡</span>
          </a>
        </div>
      </div>
    </section>
  );
}
