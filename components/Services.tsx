import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const products = [
  {
    id: 'hermes',
    name: 'Hermes',
    icon: '⚡',
    gradient: 'from-orange-500/20 to-amber-600/20',
    border: 'border-orange-500/30',
    badge: 'Framework Aberto',
    title: 'Liberdade total de provider',
    problem: 'Chega de limite de tokens da Anthropic. Chega de vendor lock-in.',
    solution: 'Hermes: multi-provider REAL. NVIDIA, OpenAI, Anthropic, Google, Ollama — por task.',
    features: [
      'NVIDIA NIM, OpenAI, Anthropic, Google, Ollama — escolha por task',
      'Kanban nativo: cada task é um agente',
      'Auto-aprendizado: skills da experiência, melhora durante uso',
      'Delega e paraleliza: subagents isolados via RPC',
      'Automações agendadas: cron built-in, reports diários',
      'Runs anywhere: local, Docker, Vercel, GPU cluster',
    ],
    cta: 'Ver Hermes',
    href: '/hermes',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    gradient: 'from-green-500/20 to-emerald-600/20',
    border: 'border-green-500/30',
    badge: 'Comercial',
    title: 'Seu WhatsApp como central comercial',
    problem: 'Chega de lead perdido no WhatsApp. Chega de digitação manual no CRM.',
    solution: 'IA que qualifica, agenda, vende e reativa — 24/7, sem folga.',
    features: [
      'Qualifica leads 24/7 com IA',
      'Agenda automático de consultas',
      'Funil completo no WhatsApp + CRM',
      'Reativa leads dormentes',
      'Multi-atendentes com IA assistida',
    ],
    cta: 'Ver WhatsApp com IA',
    href: '/whatsapp',
  },
  {
    id: 'evonexus',
    name: 'EvoNexus',
    icon: '🏢',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    badge: 'Empresa Completa',
    title: 'Seu time de IA que nunca dorme',
    problem: 'Chega de trocar de ferramenta o tempo todo. Chega de dashboard que não conversa.',
    solution: 'EvoNexus + OpenClaude: 6 backends, tokens free, sem vendor lock-in.',
    features: [
      'Finanças, Projetos, Vendas, RH, Jurídico, Marketing',
      'Claude Code: code review, debug, deploy multi-agente',
      'OpenClaude: OpenRouter, OpenAI, Gemini, AWS, Vertex, Codex',
      'Rotinas agendadas (diárias, semanais, mensais)',
      'Dashboard web + memória persistente',
    ],
    cta: 'Ver EvoNexus',
    href: '/evonexus',
  },
];

export default function Services() {
  const reveal = useScrollReveal(0.15);

  return (
    <section id="servicos" className="relative py-24 sm:py-32 bg-surface-950 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl" />
      
      <div ref={reveal} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-gold-500 text-xs font-bold uppercase tracking-widest mb-4 border border-gold-500/30 px-4 py-2 rounded-full bg-gold-500/10">
            Ecossistema Completo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Workforce de IA<br />
            <span className="gold-text">do zero ao deploy</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto font-medium mt-4">
            Chega de limites de tokens. Chega de vendor lock-in.
            <br />
            <span className="text-gray-200">Escolha seu caminho ou use os 4.</span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-black/80 rounded-3xl p-8 border border-white/15 hover:bg-black/90 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-2 shadow-2xl">
                {/* Gradient blob */}
                <div className={`absolute -inset-px bg-gradient-to-r ${product.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} border ${product.border}`}>
                      <span className="text-2xl">{product.icon}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full bg-gold-500/10">
                      {product.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-heading text-white font-bold mb-2 group-hover:text-gold-400 transition-colors">
                    {product.title}
                  </h3>

                  {/* Problem */}
                  <p className="text-red-400 text-sm font-medium mb-3">
                    {product.problem}
                  </p>

                  {/* Solution */}
                  <p className="text-green-400 text-sm font-medium mb-6">
                    {product.solution}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                        <span className="text-gold-400 mt-0.5 flex-shrink-0">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-gold-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                    {product.cta}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-6">
            Não sabe por onde começar?
          </p>
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20ajuda%20para%20escolher%20a%20workforce%20ideal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-1"
          >
            Falar com especialista →
          </a>
        </div>
      </div>
    </section>
  );
}
