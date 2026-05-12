import React, { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ROICalculator() {
  const reveal = useScrollReveal(0.15);
  const [leads, setLeads] = useState(20);
  const [ticket, setTicket] = useState(150);

  const monthlyROI = useMemo(() => {
    const convertedLeads = Math.round(leads * 0.3);
    const monthlyRevenue = convertedLeads * ticket;
    const agentCost = 497;
    const savingsVsTeam = 3500;
    return { convertedLeads, monthlyRevenue, agentCost, savingsVsTeam, net: monthlyRevenue - agentCost + savingsVsTeam };
  }, [leads, ticket]);

  return (
    <section id="roi" className="py-20 sm:py-32 bg-surface-900">
      <div ref={reveal} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
            Calculadora de ROI
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4 leading-tight">
            Quanto você
            <span className="gold-text"> deixa na mesa</span> todo mês?
          </h2>
          <p className="text-neutral-200 text-lg font-medium">
            Ajuste os valores e veja o impacto real no seu negócio.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-8 sm:p-10">
          <div className="mb-8">
            <label className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-sm">Leads por dia no WhatsApp</span>
              <span className="text-gold-500 font-heading font-bold text-xl">{leads}</span>
            </label>
            <input
              type="range"
              min={5}
              max={100}
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              className="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
          </div>

          <div className="mb-10">
            <label className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-sm">Ticket médio (R$)</span>
              <span className="text-gold-500 font-heading font-bold text-xl">R$ {ticket}</span>
            </label>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={ticket}
              onChange={(e) => setTicket(Number(e.target.value))}
              className="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-800 rounded-xl p-4 text-center border border-white/10
">
              <p className="text-neutral-300 text-xs font-semibold mb-1">Leads convertidos/mês</p>
              <p className="text-white font-heading font-bold text-2xl">{monthlyROI.convertedLeads}</p>
            </div>
            <div className="bg-surface-800 rounded-xl p-4 text-center border border-white/10
">
              <p className="text-neutral-300 text-xs font-semibold mb-1">Receita estimada</p>
              <p className="text-gold-400 font-heading font-bold text-2xl">R$ {monthlyROI.monthlyRevenue.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-surface-800 rounded-xl p-4 text-center border border-white/10
">
              <p className="text-neutral-300 text-xs font-semibold mb-1">Custo do agente</p>
              <p className="text-white font-heading font-bold text-2xl">R$ {monthlyROI.agentCost}</p>
            </div>
            <div className="bg-surface-800 rounded-xl p-4 text-center border border-white/10
">
              <p className="text-neutral-300 text-xs font-semibold mb-1">Economia vs equipe</p>
              <p className="text-gold-400 font-heading font-bold text-2xl">R$ {monthlyROI.savingsVsTeam.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gold-600/30 to-gold-500/20 rounded-2xl p-6 text-center mb-8 border border-gold-500/30">
            <p className="text-neutral-200 text-sm font-semibold mb-1">Impacto mensal estimado</p>
            <p className="text-white font-heading font-bold text-4xl">
              +R$ {monthlyROI.net.toLocaleString('pt-BR')}
            </p>
          </div>

          <a
            href="https://wa.me/5511914088571?text=Olá!%20Vi%20a%20calculadora%20de%20ROI%20no%20site%20e%20quero%20saber%20quanto%20posso%20economizar%20com%20automação"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gold-500 hover:bg-gold-600 text-surface-900 text-center py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
          >
            Quero esses resultados
          </a>
        </div>
      </div>
    </section>
  );
}
