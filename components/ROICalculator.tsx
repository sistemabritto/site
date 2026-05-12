import React, { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * ROI Calculator — Dark mode, high contrast sliders
 */

export default function ROICalculator() {
  const reveal = useScrollReveal(0.15);
  const [leadsPerDay, setLeadsPerDay] = useState(15);
  const [avgTicket, setAvgTicket] = useState(150);
  const [conversionRate, setConversionRate] = useState(12);

  const calculation = useMemo(() => {
    const monthlyLeads = leadsPerDay * 30;
    const currentConversions = Math.round(monthlyLeads * (conversionRate / 100));
    const aiConversionBoost = 1.68;
    const aiConversions = Math.round(currentConversions * aiConversionBoost);
    const extraRevenue = (aiConversions - currentConversions) * avgTicket;
    const hoursSaved = leadsPerDay * 0.15 * 30;
    const hourlyRate = 45;
    const laborSavings = hoursSaved * hourlyRate;
    const totalSavings = extraRevenue + laborSavings;
    return { monthlyLeads, currentConversions, aiConversions, extraRevenue, laborSavings, totalSavings };
  }, [leadsPerDay, avgTicket, conversionRate]);

  return (
    <section id="roi" className="relative py-20 sm:py-32 bg-surface-950 overflow-hidden">
      {/* Aurora subtle */}
      <div className="absolute inset-0 aurora-bg opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />

      <div ref={reveal} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Calculadora de ROI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Quanto você está perdendo
            <br />
            <span className="aurora-text">sem automação?</span>
          </h2>
        </div>

        {/* Calculator Card */}
        <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                Leads por dia
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={leadsPerDay}
                onChange={(e) => setLeadsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
              <div className="mt-2 text-3xl font-heading font-bold text-white">
                {leadsPerDay}
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                Ticket médio (R$)
              </label>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
              <div className="mt-2 text-3xl font-heading font-bold text-white">
                R$ {avgTicket.toLocaleString('pt-BR')}
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                Taxa de conversão (%)
              </label>
              <input
                type="range"
                min="2"
                max="40"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
              <div className="mt-2 text-3xl font-heading font-bold text-white">
                {conversionRate}%
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 rounded-2xl p-6 sm:p-8 border border-white/10 text-center mb-8">
            <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">
              Economia mensal estimada
            </p>
            <p className="text-5xl sm:text-6xl font-heading font-bold text-white mb-2">
              R$ {calculation.totalSavings.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </p>
            <p className="text-white/40 text-sm">
              +{calculation.aiConversions - calculation.currentConversions} vendas extras/mês · {Math.round(calculation.laborSavings / 45)}h economizadas
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/5511914088571?text=Olá!%20Vi%20a%20calculadora%20de%20ROI%20no%20site%20e%20quero%20saber%20quanto%20posso%20economizar%20com%20automação"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-4 rounded-full font-semibold text-lg transition-all duration-300 cta-glow"
          >
            Quero esse resultado — Falar com especialista
          </a>
        </div>
      </div>
    </section>
  );
}
