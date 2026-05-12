import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * WhatsApp CTA — Dark mode, MAX CONTRAST
 */

const features = [
  { icon: '✅', text: 'Funil personalizado pra sua realidade' },
  { icon: '✅', text: 'Automação e mensagens estratégicas configuradas' },
  { icon: '✅', text: 'ChatGPT plugado no seu número por 7 dias' },
  { icon: '✅', text: 'Sessão prática: você vê funcionando na hora' },
  { icon: '✅', text: 'Sem instalação: só escanear um QR Code' },
];

export default function WhatsAppCTA() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="relative py-20 sm:py-32 bg-surface-900">
      <div ref={reveal} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <span className="inline-block text-primary-400 text-sm font-bold uppercase tracking-wider mb-4">
              WhatsApp Business + IA
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 leading-tight">
              Transforme seu WhatsApp em um canal que
              <span className="aurora-text"> vende por você</span>
            </h2>

            <div className="bg-gradient-to-r from-primary-900/40 to-accent-900/30 rounded-2xl p-6 border border-primary-500/30 mb-8">
              <p className="text-neutral-200 text-base leading-relaxed font-medium">
                Em até <strong className="text-primary-400">1 hora</strong>, você terá seu atendimento estruturado com automações inteligentes e IA funcionando no seu WhatsApp — ao vivo com <strong className="text-primary-400">Felipe Britto</strong>, estrategista especialista em escalar negócios locais, clínicas e prestadores de serviço.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{f.icon}</span>
                  <span className="text-neutral-200 text-sm leading-relaxed font-medium">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — CTA Card */}
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            {/* WhatsApp Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            <h3 className="font-heading font-bold text-2xl text-white mb-3 text-center">
              Ative agora
            </h3>
            <p className="text-neutral-300 text-sm mb-6 text-center font-medium">
              Sessão ao vivo · Sem compromisso · Resultado na hora
            </p>

            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20ativar%20meu%20WhatsApp%20com%20inteligência%20artificial%20—%20vi%20no%20site%20de%20vocês"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 mb-3"
            >
              Quero ativar meu WhatsApp com IA
            </a>

            <a
              href="https://wa.me/5511914088571?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20automação%20do%20meu%20atendimento%20no%20WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center glass text-neutral-200 hover:text-white hover:bg-white/10 py-3 rounded-full font-semibold text-sm transition-all duration-200 border border-white/15"
            >
              Obter Orçamento
            </a>

            <p className="text-red-400 text-xs font-bold mt-4 animate-pulse text-center">
              ⚡ Vagas limitadas por conta da agenda
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
