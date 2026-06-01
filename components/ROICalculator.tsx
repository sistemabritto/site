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
    <section id="roi" className="py-20 sm:py-32 bg-[#111111]">
      <div ref={reveal} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-12">
          <span className="inline-block text-[#D4AF37] text-sm font-bold uppercase tracking-wider mb-4">
            Calculadora de ROI
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Quanto você
            <span className="text-[#D4AF37]"> deixa na mesa</span> todo mês?
          </h2>
          <p className="text-gray-300 text-lg font-medium">
            Ajuste os valores e veja o impacto real no seu negócio.
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-3xl p-8 sm:p-10 border border-white/10">
          <div className="mb-8">
            <label className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-sm">Leads por dia no WhatsApp</span>
              <span className="text-[#D4AF37] font-bold text-xl">{leads}</span>
            </label>
            <input
              type="range"
              min={5}
              max={100}
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div className="mb-10">
            <label className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-sm">Ticket médio (R$)</span>
              <span className="text-[#D4AF37] font-bold text-xl">R$ {ticket}</span>
            </label>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={ticket}
              onChange={(e) => setTicket(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111111] rounded-xl p-4 text-center border border-white/10">
              <p className="text-gray-400 text-xs font-semibold mb-1">Leads convertidos/mês</p>
              <p className="text-white font-bold text-2xl">{monthlyROI.convertedLeads}</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-4 text-center border border-white/10">
              <p className="text-gray-400 text-xs font-semibold mb-1">Receita estimada</p>
              <p className="text-[#D4AF37] font-bold text-2xl">R$ {monthlyROI.monthlyRevenue.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-4 text-center border border-white/10">
              <p className="text-gray-400 text-xs font-semibold mb-1">Custo do agente</p>
              <p className="text-white font-bold text-2xl">R$ {monthlyROI.agentCost}</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-4 text-center border border-white/10">
              <p className="text-gray-400 text-xs font-semibold mb-1">Economia vs equipe</p>
              <p className="text-[#D4AF37] font-bold text-2xl">R$ {monthlyROI.savingsVsTeam.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#D4AF37]/30 to-[#D4AF37]/20 rounded-2xl p-6 text-center mb-8 border border-[#D4AF37]/30">
            <p className="text-gray-300 text-sm font-semibold mb-1">Impacto mensal estimado</p>
            <p className="text-white font-bold text-4xl">
              +R$ {monthlyROI.net.toLocaleString('pt-BR')}
            </p>
          </div>

          <a
            href="/whatsapp"
            className="block w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black text-center py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-[#D4AF37]/25"
          >
            Quero esses resultados →
          </a>
        </div>
      </div>
    </section>
  );
}
