import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ClubPlugPlay() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative py-20 sm:py-32 bg-surface-900">
      <div ref={reveal} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
          EvoNexus + Hermes
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
          Sua workforce de IA completa em
          <br />
          <span className="gold-text">48 horas</span>
        </h2>
        <p className="text-neutral-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Instalamos e configuramos todo o ecossistema: Evolution API no WhatsApp, EvoNexus operacional
          com agentes de negócio, e o Hermes autônomo nas redes. Sua workforce trabalhando sem você tocar em nada.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20minha%20workforce%20de%20IA%20completa%20com%20EvoNexus%20e%20Hermes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-0.5"
          >
            Quero minha workforce
            <span>→</span>
          </a>
          <a
            href="https://docs.evolutionfoundation.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:bg-white/15"
          >
            Ver documentação
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
