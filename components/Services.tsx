import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    id: 'whatsapp',
    icon: '💬',
    gradient: 'from-green-500/20 to-emerald-600/20',
    border: 'border-green-500/30',
    iconBg: 'bg-green-500/20',
    title: 'WhatsApp Business + CRM + IA',
    subtitle: 'Atendimento comercial automatizado',
    description: 'Seu WhatsApp vira uma central comercial com IA. Qualifica leads, agenda, vende e alimenta seu CRM — tudo automático, 24/7.',
    features: [
      'Qualificação de leads 24/7 com IA',
      'Agendamento automático de consultas',
      'Funil comercial completo no WhatsApp + CRM',
      'Integração com Pipedrive, Sticky e mais',
      'Reativação de leads dormentes',
      'Multi-atendentes com IA assistida',
    ],
    cta: 'Ver detalhes do WhatsApp',
    href: '/whatsapp',
    highlights: [
      { icon: '🔄', label: 'Fallback de modelos', desc: 'Se um modelo cai, outro assume' },
      { icon: '🌐', label: 'Multi-provider', desc: 'OpenAI, Anthropic, Google, AWS' },
      { icon: '📊', label: 'Gestão de tokens', desc: 'Controle de custo em tempo real' },
    ],
  },
  {
    id: 'evonexus',
    icon: '🏢',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    title: 'EvoNexus Business',
    subtitle: 'Workforce de negócio — 17 agentes',
    description: 'Do financeiro ao jurídico, do marketing ao RH — agentes autônomos que gerenciam sua operação com reports e decisões em tempo real.',
    features: [
      'Finanças: fluxo de caixa, relatórios, projeções',
      'Projetos: gestão de sprints, métricas, entregas',
      'Comunidade: moderação, sentimento, engajamento',
      'Marketing: calendário editorial, SEO, campanhas',
      'Vendas: pipeline, propostas, qualificação',
      'Jurídico: contratos, compliance, NDA',
    ],
    cta: 'Ver agentes de negócio',
    href: '/evonexus',
    highlights: [
      { icon: '🧠', label: 'Agentes especializados', desc: 'Cada um com memória própria' },
      { icon: '🔄', label: 'OpenClaude', desc: '6 backends, tokens free' },
      { icon: '📊', label: 'Dashboard', desc: 'Relatórios e métricas em tempo real' },
    ],
  },
  {
    id: 'claude-code',
    icon: '💻',
    gradient: 'from-purple-500/20 to-violet-600/20',
    border: 'border-purple-500/30',
    iconBg: 'bg-purple-500/20',
    title: 'Engineering via Claude Code',
    subtitle: 'Workforce de engenharia — 21 agentes',
    description: 'Arquitetura, code review, debugging, testes, segurança — um time de IA que codifica, revisa e entrega features sem retrabalho humano.',
    features: [
      'Arquitetura: planejamento, reviews de tech decisions',
      'Implementação: code, testes, deploy automatizado',
      'Debug: profiling, otimização, incident response',
      'Segurança: auditoria de código, vulns, compliance',
      'Design: UX, UI, protótipos interativos',
      'DevOps: CI/CD, infra como código, monitoramento',
    ],
    cta: 'Ver agentes de engenharia',
    href: '/claude-code',
    highlights: [
      { icon: '🛡️', label: 'Governança multi-agente', desc: 'Consenso antes de cada deploy' },
      { icon: '🔄', label: 'OpenClaude', desc: 'OpenRouter, OpenAI, Gemini, AWS' },
      { icon: '📊', label: 'Tokens por sprint', desc: 'Orçamento e consumo por projeto' },
    ],
  },
];

export default function Services() {
  const reveal = useScrollReveal(0.15);

  return (
    <section id="servicos" className="relative py-20 sm:py-32 bg-surface-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950" />
      
      <div ref={reveal} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4 border border-gold-500/30 px-4 py-2 rounded-full bg-gold-500/10">
            Ecossistema
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Três pilares para
            <span className="gold-text block mt-2">escalar sua operação</span>
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto font-medium">
            Uma workforce de IA completa — do WhatsApp com CRM até deploy em produção.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className="order-2 lg:order-1">
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.iconBg} border ${service.border} mb-6`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>

                <span className="inline-block text-gold-400 text-xs font-bold uppercase tracking-wider mb-3">
                  {service.subtitle}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-heading text-white mb-4 leading-tight font-bold">
                  {service.title}
                </h3>
                
                <p className="text-neutral-300 text-base leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                      <span className="text-gold-500 mt-0.5 flex-shrink-0 text-lg">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={service.href}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-surface-900 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-1"
                >
                  {service.cta}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Highlights Side - Cards */}
              <div className="order-1 lg:order-2 mb-8 lg:mb-0">
                <div className="relative">
                  {/* Decorative gradient blob */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} rounded-3xl blur-2xl opacity-30`} />
                  
                  <div className="relative space-y-4">
                    {service.highlights.map((hl, i) => (
                      <div
                        key={i}
                        className={`glass-strong rounded-2xl p-6 border ${service.border} hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group bg-surface-900/90 backdrop-blur-xl`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{hl.icon}</span>
                          <div>
                            <h4 className="text-gold-400 font-bold text-base mb-1">{hl.label}</h4>
                            <p className="text-neutral-400 text-sm leading-relaxed">{hl.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <p className="text-neutral-400 text-sm mb-6">
            Quer ver o ecossistema completo?
          </p>
          <a
            href="/hermes"
            className="inline-flex items-center gap-2 glass-strong text-gold-400 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:bg-white/10 border border-gold-500/30"
          >
            Conhecer o Hermes Agent → Framework aberto
          </a>
        </div>
      </div>
    </section>
  );
}
