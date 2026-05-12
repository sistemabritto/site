import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const features = [
  { icon: '✅', text: 'CRM integrado com funil comercial automático' },
  { icon: '✅', text: 'Qualificação inteligente de leads via IA' },
  { icon: '✅', text: 'Agendamento automático de consultas e reuniões' },
  { icon: '✅', text: 'Reativação de leads com campanhas automáticas' },
  { icon: '✅', text: 'Gestão de multi-atendentes com IA assistida' },
  { icon: '✅', text: 'Integração com Pipedrive, Sticky e outras ferramentas' },
];

export default function WhatsAppCTA() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative py-20 sm:py-32 bg-surface-950">
      <div ref={reveal} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
              WhatsApp Business + CRM
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 leading-tight">
              Seu WhatsApp como
              <span className="gold-text"> central comercial</span>
            </h2>

            <div className="bg-gradient-to-r from-gold-600/20 to-surface-800/40 rounded-2xl p-6 border border-gold-500/30 mb-8">
              <p className="text-white text-base leading-relaxed font-medium">
                Transforme seu WhatsApp em uma máquina de vendas. Qualificação automática, follow-ups inteligentes,
                agendamento de consultas e um CRM completo rodando direto no celular — com IA que aprende o padrão do seu negócio.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{f.icon}</span>
                  <span className="text-white text-sm leading-relaxed font-medium">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            <h3 className="font-heading font-bold text-2xl text-white mb-3 text-center">
              Ative seu WhatsApp
            </h3>
            <p className="text-white text-sm mb-8 text-center font-medium">
              CRM + IA em 24h · Sem contrato · Resultados ou dinheiro de volta
            </p>

            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20transformar%20meu%20WhatsApp%20em%20uma%20central%20comercial%20com%20IA%20e%20CRM"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gold-500 hover:bg-gold-600 text-surface-900 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25 mb-5"
            >
              Quero meu WhatsApp com CRM
            </a>

            <p className="text-gold-500 text-xs font-bold mt-5 animate-pulse text-center">
              ⚡ Vagas limitadas — agenda disponível esta semana
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
