import React from 'react';
import PlanCard from './PlanCard';

const plans = [
  {
    name: 'WhatsApp IA Básico',
    price: 297,
    description: 'Para quem quer começar a automatizar o atendimento no WhatsApp',
    features: [
      'Qualificação automática de leads via IA',
      'Follow-up inteligente 24h',
      'Agendamento automático de consultas',
      '1 número de WhatsApp',
      'Relatórios básicos de conversão',
      'Suporte via WhatsApp',
    ],
    badge: 'Inicial',
    productId: 'whatsapp-ia-basico',
  },
  {
    name: 'CRM + IA Completo',
    price: 750,
    description: 'Para negócios que querem maximizar conversões com CRM integrado',
    features: [
      'Tudo do plano Básico',
      'CRM integrado com funil comercial',
      'Reativação de leads dormentes',
      'Multi-atendentes com IA assistida',
      'Integração Pipedrive/Sticky',
      'Campanhas de reativação automáticas',
      'Relatórios avançados de ROI',
    ],
    badge: 'Mais Popular',
    highlighted: true,
    productId: 'crm-ia-completo',
  },
  {
    name: 'EvoNexus Premium',
    price: 2500,
    description: 'Empresa completa com dezenas de agentes especializados operando 24h',
    features: [
      'Dezenas de agentes especializados',
      'Módulos: Fin, Projetos, Vendas, RH, Marketing, Jurídico',
      'Engineering agents (Code, Review, Debug, Testes, DevOps)',
      'OpenClaude com 6 backends (tokens free)',
      'Dashboard web + memória persistente',
      'Rotinas agendadas (diárias, semanais, mensais)',
      'Onboarding dedicado',
      'Suporte prioritário',
    ],
    badge: 'Empresarial',
    productId: 'evonexus-premium',
  },
  {
    name: 'Hermes Self-Hosted',
    price: 3500,
    description: 'Framework completo na sua infraestrutura — autonomia total',
    features: [
      'Framework Hermes multi-provider',
      'Kanban nativo com memória persistente',
      'Skills em markdown + plugins Python',
      'Deploy: Docker Swarm, Vercel, local',
      'NVIDIA, OpenAI, Anthropic, Google, Ollama',
      'Delega e paraleliza com subagents',
      'Automações agendadas (cron built-in)',
      'Setup e treinamento inclusos',
    ],
    badge: 'Setup Único',
    ctaLabel: 'Contratar Setup',
    productId: 'hermes-selfhosted',
  },
];

export default function PlansSection() {
  return (
    <section id="planos" className="py-20 sm:py-32 bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Escolha seu<br />
            <span className="gold-text">plano ideal</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto font-medium mt-4">
            Do WhatsApp automatizado à empresa completa em IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              badge={plan.badge}
              highlighted={plan.highlighted}
              productId={plan.productId}
              ctaLabel={plan.ctaLabel || 'Assinar'}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-6">
            Não sabe qual plano escolher?
          </p>
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20ajuda%20para%20escolher%20o%20plano%20ideal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-strong text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
          >
            Falar com especialista →
          </a>
        </div>
      </div>
    </section>
  );
}
