import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Ecossistema() {
  const reveal = useScrollReveal(0.15);

  return (
    <section className="py-20 sm:py-32 bg-surface-950">
      <div ref={reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
            Ecossistema
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Duas frentes,<br />
            <span className="gold-text">mesmo poder</span>
          </h2>
          <p className="text-neutral-200 text-lg max-w-2xl mx-auto font-medium">
            EvoNexus para operações estruturadas, Hermes para liberdade total.
            Escolha seu caminho ou use os dois.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* EvoNexus */}
          <a
            href="/evonexus"
            className="glass-strong rounded-3xl p-8 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🏢</span>
              <div>
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-gold-400 transition-colors">
                  EvoNexus
                </h3>
                <p className="text-neutral-300 text-sm">Business + Engineering Layer</p>
              </div>
            </div>
 <p className="text-neutral-200 text-sm leading-relaxed mb-6">
  38 agentes especializados (17 de negócio + 21 de engenharia) orquestrados via Claude Code.
  Rotinas agendadas, memória persistente, dashboard web, multi-provider via OpenClaude.
 </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>Business Layer: 17 agentes (Finanças, Projetos, Vendas, RH, etc.)</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>Engineering Layer: 21 agentes (Code, Review, Debug, Testes, etc.)</span>
              </li>
 <li className="flex items-start gap-2 text-neutral-200 text-sm">
   <span className="text-gold-500 mt-0.5">✓</span>
   <span>OpenClaude: tokens free via OpenRouter</span>
 </li>
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>6 backends: OpenRouter, OpenAI, Gemini, AWS Bedrock, Vertex AI, Codex</span>
              </li>
            </ul>
            <div className="flex items-center gap-2 text-gold-400 font-semibold group-hover:gap-3 transition-all">
              <span>Ver EvoNexus</span>
              <span>→</span>
            </div>
          </a>

          {/* Hermes */}
          <a
            href="/hermes"
            className="glass-strong rounded-3xl p-8 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">⚡</span>
              <div>
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-gold-400 transition-colors">
                  Hermes Agent
                </h3>
                <p className="text-neutral-300 text-sm">Framework Aberto</p>
              </div>
            </div>
            <p className="text-neutral-200 text-sm leading-relaxed mb-6">
              Framework open-source pra quem quer controle total. Kanban nativo, multi-provider real,
              skills em markdown. Ideal pra devs e empresas que querem sem lock-in.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>NVIDIA, OpenAI, Anthropic, Google, Ollama — provedor por task</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>Kanban nativo: cada task é um agente</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>Skills em markdown, plugins em Python</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-200 text-sm">
                <span className="text-gold-500 mt-0.5">✓</span>
                <span>Docker Swarm, Vercel, local — sua infra</span>
              </li>
            </ul>
            <div className="flex items-center gap-2 text-gold-400 font-semibold group-hover:gap-3 transition-all">
              <span>Ver Hermes</span>
              <span>→</span>
            </div>
          </a>
        </div>

        {/* Claude Code / OpenCode */}
        <div className="glass-strong rounded-3xl p-8 border border-gold-500/20 mb-12">
 <div className="text-center mb-8">
   <h3 className="text-xl font-heading font-bold text-white mb-2">
     Motor por trás do EvoNexus
   </h3>
   <p className="text-neutral-300 text-sm">
     Claude Code + OpenClaude = base do EvoNexus
   </p>
 </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Claude Code</h4>
              <p className="text-neutral-200 text-sm leading-relaxed mb-4">
                CLI da Anthropic que transforma seu terminal em workspace de IA.
                Code review, arquitetura, debug, testes — tudo via terminal.
              </p>
              <a
                href="/claude-code"
                className="text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors inline-flex items-center gap-1"
              >
                Saiba mais sobre Claude Code →
              </a>
            </div>
 <div>
   <h4 className="text-white font-bold mb-2">OpenClaude / OpenRouter</h4>
   <p className="text-neutral-200 text-sm leading-relaxed mb-4">
     Fork do Claude Code que libera o uso de OpenRouter (tokens free),
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

        <div className="text-center">
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Quero%20implementar%20o%20ecossistema%20completo%20(EvoNexus%20%2B%20Hermes)"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-0.5"
          >
            Implementar ecossistema completo
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
