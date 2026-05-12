import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    id: 'whatsapp',
    icon: '💬',
    title: 'WhatsApp Business + CRM + IA',
    subtitle: 'Atendimento comercial automatizado',
    description: 'Agentes de IA no WhatsApp que qualificam leads, agendam consultas, fecham vendas e ativam funis de CRM. Integrado com Evolution API, pipedrive, beds24 e ferramentas de automação.',
    features: ['Qualificação de leads 24/7', 'Agendamento automático de consultas', 'Funil comercial completo no WhatsApp + CRM', 'Integração sticky com pipedrive', 'Reativação de leads dormantes', 'Multi-atendentes com IA assistida'],
    cta: 'Ativar WhatsApp com IA',
    message: 'Olá!%20Quero%20ativar%20meu%20WhatsApp%20com%20inteligência%20artificial%20e%20CRM%20—%20vi%20no%20site%20de%20vocês',
  },
  {
    id: 'evonexus',
    icon: '🏢',
    title: 'Workforce de Negócio',
    subtitle: '17 agentes operacionais via EvoNexus',
    description: 'Do financeiro ao jurídico, do marketing ao RH — um time de agentes autônomos gerencia sua operação com reports, decisões e acompanhamento em tempo real.',
    features: ['Finanças: fluxo de caixa, relatórios, projeções', 'Projetos: gestão de sprints, métricas, entregas', 'Comunidade: moderação, sentimento, engajamento', 'Marketing: calendário editorial, SEO, campanhas', 'Vendas: pipeline, propostas, qualificação', 'Jurídico: contratos, compliance, NDA'],
    cta: 'Ver agentes de negócio',
    message: 'Olá!%20Quero%20conhecer%20a%20workforce%20de%20agentes%20de%20negócio%20do%20EvoNexus',
  },
  {
    id: 'engineering',
    icon: '💻',
    title: 'Workforce de Engenharia',
    subtitle: '21 agentes de desenvolvimento via Claude Code',
    description: 'Code review, arquitetura, debugging, testes, segurança — um time de IA que codifica, revisa e entrega features 24/7 sem retrabalho humano.',
    features: ['Arquitetura: planejamento, reviews de tech decisions', 'Implementação: code, testes, deploy', 'Debug: profiling, optimização, incident response', 'Segurança: auditoria de código, vulns, compliance', 'Design: UX, UI, protótipos', 'DevOps: CI/CD, infra, monitoramento'],
    cta: 'Ver agentes de engenharia',
    message: 'Olá!%20Quero%20conhecer%20a%20workforce%20de%20agentes%20de%20engenharia%20do%20EvoNexus',
  },
];

export default function Services() {
  const reveal = useScrollReveal(0.15);

  return (
    <section id="servicos" className="py-20 sm:py-32 bg-surface-950">
      <div ref={reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
            Soluções
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Três pilares para
            <span className="gold-text"> escalar sua operação</span>
          </h2>
          <p className="text-neutral-200 text-lg max-w-2xl mx-auto font-medium">
            Uma workforce de IA completa — desde o primeiro contato com o cliente até deploy em produção.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <span className="inline-block text-neutral-300 text-sm font-bold uppercase tracking-wider mb-3">
                  {service.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading text-white mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-neutral-200 text-base leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-neutral-200 text-sm"
                    >
                      <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/5511914088571?text=${service.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-6 py-3 rounded-full font-bold transition-all duration-200 shadow-lg shadow-gold-500/25"
                >
                  {service.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="glass-strong rounded-3xl p-8 h-full min-h-[300px] flex flex-col justify-center">
                  <pre className="text-gold-300 text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {`# ${service.title}
// workforce em operação

class ${service.id === 'whatsapp' ? 'WhatsAppAgent' : service.id === 'evonexus' ? 'BusinessLayer' : 'EngineeringLayer'} {
  status: 'active'
  uptime: '24/7'
  models: ['claude-3-7',
           'qwen-122b',
           'deepseek-v3']
  
  async process() {
    // action loop
    // sem prompt injection
    // com rate limit
  }
}
`}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
