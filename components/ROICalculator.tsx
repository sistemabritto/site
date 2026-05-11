import React, { useState } from 'react';

/**
 * Calculadora de ROI - "Calcule o impacto das automações na sua empresa"
 * 
 * Cálculo baseado em:
 * - Conversas/dia
 * - Novas oportunidades/mês
 * - Resultado: Despesas eliminadas/mês
 */

export default function ROICalculator() {
  const [conversationsPerDay, setConversationsPerDay] = useState(50);
  const [opportunitiesPerMonth, setOpportunitiesPerMonth] = useState(100);
  
  // Cálculo simplificado (ajustar conforme lógica real)
  const monthlySavings = conversationsPerDay * opportunitiesPerMonth * 0.5;
  
  return (
    <section className="roi-calculator">
      <div className="container">
        <h2 className="roi-title">
          Reduza o custo invisível de fazer tudo manualmente
        </h2>
        <p className="roi-subtitle">
          Calcule o impacto das automações na sua empresa
        </p>
        
        <div className="calculator">
          <div className="inputs">
            <div className="input-group">
              <label htmlFor="conversations">
                Novas Oportunidades
                <span className="input-hint">(opcional)</span>
              </label>
              <input
                type="number"
                id="conversations"
                value={conversationsPerDay}
                onChange={(e) => setConversationsPerDay(Number(e.target.value) || 0)}
                className="input-field"
              />
              <span className="input-suffix">/dia</span>
            </div>
            
            <div className="input-group">
              <label htmlFor="opportunities">
                Novas Oportunidades
                <span className="input-hint">(opcional)</span>
              </label>
              <input
                type="number"
                id="opportunities"
                value={opportunitiesPerMonth}
                onChange={(e) => setOpportunitiesPerMonth(Number(e.target.value) || 0)}
                className="input-field"
              />
              <span className="input-suffix">/mês</span>
            </div>
          </div>
          
          <div className="result">
            <div className="result-value">
              R$ {monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="result-label">/mês</div>
            <div className="result-description">
              Despesas Eliminadas
            </div>
          </div>
          
          <button className="cta-button">
            Experimentar Agora
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .roi-calculator {
          padding: 80px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .roi-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 16px;
          color: #1a1a1a;
        }
        
        .roi-subtitle {
          font-size: 1.1rem;
          text-align: center;
          color: #666;
          margin-bottom: 40px;
        }
        
        .calculator {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .input-group {
          position: relative;
        }
        
        .input-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1a1a1a;
        }
        
        .input-hint {
          font-weight: normal;
          color: #999;
          font-size: 0.85rem;
        }
        
        .input-field {
          width: 100%;
          padding: 12px 16px;
          font-size: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          transition: border-color 0.2s;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #667eea;
        }
        
        .input-suffix {
          position: absolute;
          right: 12px;
          bottom: 12px;
          color: #999;
        }
        
        .result {
          text-align: center;
          padding: 32px 0;
          border-top: 2px solid #f0f0f0;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 24px;
        }
        
        .result-value {
          font-size: 3rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 8px;
        }
        
        .result-label {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 8px;
        }
        
        .result-description {
          font-size: 0.95rem;
          color: #999;
        }
        
        .cta-button {
          width: 100%;
          padding: 16px 32px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
        }
        
        @media (max-width: 768px) {
          .inputs {
            grid-template-columns: 1fr;
          }
          .calculator {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
