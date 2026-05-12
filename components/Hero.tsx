import React from 'react';
import Image from 'next/image';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Hero Section — Dark mode, aurora gradient, high contrast
 * Sem cards de agentes (links quebrados removidos)
 */

export default function Hero() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-surface-950/60" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/15 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />

      {/* Content */}
      <div ref={reveal} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center reveal">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 mb-8 border border-white/15">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-white text-sm font-medium">
            IA ativa agora — 5 empresas usando em tempo real
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
          Agentes de IA que
          <br />
          <span className="aurora-text">trabalham por você</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Automações inteligentes no WhatsApp que qualificam leads, agendam, vendem e entregam — 24 horas por dia, 7 dias por semana.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Vi%20o%20site%20de%20vocês%20e%20quero%20ver%20os%20agentes%20de%20IA%20funcionando%20na%20prática"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cta-glow"
          >
            <span>Ver em ação agora</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#beneficios"
            className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 hover:bg-white/15"
          >
            Saiba mais
            <span className="text-sm">↓</span>
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-white/60 text-sm">
          <div className="flex -space-x-2">
            {['🧑‍💼', '👩‍⚕️', '👨‍🍳', '👩‍💼', '🧑‍🔧'].map((emoji, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full glass-strong flex items-center justify-center text-sm border border-white/15"
              >
                {emoji}
              </div>
            ))}
          </div>
          <span>+50 empresas já automatizaram</span>
        </div>
      </div>
    </section>
  );
}
