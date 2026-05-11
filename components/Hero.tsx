import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Hero Section — AI-Native UI + Aurora + Glassmorphism
 * Mobile-first, fancy, insano
 */

const agents = [
  {
    name: 'Lucas',
    role: 'Conselheiro Cristão',
    emoji: '🕊️',
    link: 'https://click.workflowapi.com.br/lucas',
    color: 'from-blue-500 to-blue-700',
    description: 'Orientação espiritual personalizada via WhatsApp',
  },
  {
    name: 'Trinity',
    role: 'Secretária Comercial',
    emoji: '💼',
    link: 'https://click.workflowapi.com.br/atendimento',
    color: 'from-primary-500 to-primary-700',
    description: 'Atendimento e qualificação de leads 24/7',
  },
  {
    name: 'Luna',
    role: 'Agente de Reservas',
    emoji: '📅',
    link: 'https://click.workflowapi.com.br/luna',
    color: 'from-accent-500 to-accent-600',
    description: 'Agendamento automático e gestão de reservas',
  },
  {
    name: 'Tina',
    role: 'Delivery de Pizzas',
    emoji: '🍕',
    link: 'https://click.workflowapi.com.br/delivery',
    color: 'from-orange-500 to-red-600',
    description: 'Pedidos e delivery automatizados no WhatsApp',
  },
];

export default function Hero() {
  const reveal = useScrollReveal(0.1);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg">
      {/* Mesh Overlay */}
      <div className="absolute inset-0 bg-surface-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-50" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />

      {/* Content */}
      <div ref={reveal} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center reveal">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-white/90 text-sm font-medium">
            IA ativa agora — 5 empresas usando em tempo real
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight">
          Agentes de IA que
          <br />
          <span className="aurora-text">trabalham por você</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Automações inteligentes no WhatsApp que qualificam leads, agendam, vendem e entregam — 24 horas por dia, 7 dias por semana.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://wa.me/5511914088571?text=Olá+gostaria+de+ver+as+agentes+em+ação"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cta-glow"
          >
            <span>Ver em ação agora</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#agentes"
            className="inline-flex items-center gap-2 glass text-white/80 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200"
          >
            Conhecer agentes
            <span className="text-sm">↓</span>
          </a>
        </div>

        {/* Agent Cards Grid */}
        <div id="agentes" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {agents.map((agent, i) => (
            <a
              key={agent.name}
              href={agent.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-6 text-left transition-all duration-300 hover:glass-strong hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Agent Emoji + Gradient */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {agent.emoji}
              </div>

              <h3 className="text-white font-heading font-bold text-lg mb-1">
                {agent.name}
              </h3>
              <p className="text-white/60 text-sm font-medium mb-3">
                {agent.role}
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                {agent.description}
              </p>

              {/* Typing Indicator */}
              <div className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="typing-dot w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="typing-dot w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="typing-dot w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-green-400 text-xs ml-2">Online</span>
              </div>
            </a>
          ))}
        </div>

        {/* Social Proof mini */}
        <div className="mt-12 flex items-center justify-center gap-3 text-white/50 text-sm">
          <div className="flex -space-x-2">
            {['🧑‍💼', '👩‍⚕️', '👨‍🍳', '👩‍💼', '🧑‍🔧'].map((emoji, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-sm border-2 border-surface-900/50"
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
