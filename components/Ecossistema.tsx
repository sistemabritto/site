import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Ecossistema() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="py-24 sm:py-32 bg-surface-950">
      <div ref={reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold-500 text-xs font-bold uppercase tracking-widest mb-4 border border-gold-500/30 px-4 py-2 rounded-full bg-gold-500/10">
            Ecossistema
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Duas formas de usar<br />
            <span className="gold-text">IA que roda seu negócio</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-medium mt-4">
            Estruturado ou sob medida. Escolha seu caminho.
          </p>
        </div>

        {/* Two Main Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* EvoNexus */}
          <a
            href="/evonexus"
            className="group relative glass-strong rounded-3xl p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 bg-surface-900/90 backdrop-blur-xl"
          >
            {/* Gradient glow on hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative">
              {/* Icon + Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
                  <span className="text-2xl">🏢</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">
                  Pronto para uso
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading text-white font-bold mb-3 group-hover:text-blue-400 transition-colors">
                EvoNexus
              </h3>
              
              <p className="text-neutral-400 text-sm mb-6">
                Empresa completa em IA: 38 agentes especializados (negócio + engenharia) 
                que rodam sua operação no piloto automático.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>Business: Fin, Projetos, Vendas, RH, Marketing, Jurídico</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>Engineering: Code, Review, Debug, Testes, DevOps</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>OpenClaude: 6 backends, tokens free via OpenRouter</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>Dashboard web + memória persistente</span>
                </li>
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                Conhecer EvoNexus
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>

          {/* Hermes */}
          <a
            href="/hermes"
            className="group relative glass-strong rounded-3xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 bg-surface-900/90 backdrop-blur-xl"
          >
            {/* Gradient glow on hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-orange-500/20 to-amber-600/20 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative">
              {/* Icon + Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-500/30">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">
                  Framework aberto
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading text-white font-bold mb-3 group-hover:text-orange-400 transition-colors">
                Hermes Agent
              </h3>
              
              <p className="text-neutral-400 text-sm mb-6">
                Liberdade total: multi-provider real, Kanban nativo, 
                skills em markdown. Pra quem quer controle total da stack.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>NVIDIA, OpenAI, Anthropic, Google, Ollama — por task</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>Kanban nativo: cada task é um agente</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>Skills em markdown, plugins em Python</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300 text-sm">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>Docker Swarm, Vercel, local — sua infra</span>
                </li>
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-2 text-orange-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                Conhecer Hermes
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Motor Section */}
        <div className="glass-strong rounded-3xl p-8 border border-gold-500/30 bg-surface-900/90 backdrop-blur-xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-heading text-white font-bold mb-2">
              O motor por trás do EvoNexus
            </h3>
            <p className="text-neutral-400 text-sm">
              Claude Code + OpenClaude = base que torna tudo possível
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Claude Code */}
            <div>
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Claude Code
              </h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                CLI da Anthropic que transforma seu terminal em workspace de IA.
                Code review, arquitetura, debug, testes — tudo via terminal.
              </p>
              <a
                href="/claude-code"
                className="text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors inline-flex items-center gap-1"
              >
                Saiba mais →
              </a>
            </div>
            
            {/* OpenClaude */}
            <div>
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">🔓</span>
                OpenClaude
              </h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                Fork do Claude Code que libera OpenRouter (tokens free), 
                OpenAI, Gemini, AWS Bedrock, Vertex AI. Sem vendor lock-in.
              </p>
              <a
                href="https://openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors inline-flex items-center gap-1"
              >
                Ver OpenRouter ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-neutral-400 text-sm mb-6">
            Quer implementar o ecossistema completo?
          </p>
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20o%20ecossistema%20completo%20(EvoNexus%20%2B%20Hermes)"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-1"
          >
            Falar com especialista
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
