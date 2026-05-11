import React from 'react';

const benefits = [
  {
    title: 'Qualificação',
    description: 'Fluxos de segmentação automática integrado ao seu CRM',
    icon: '🎯',
  },
  {
    title: 'Interação',
    description: 'Painel multi usuário para acompanhar as conversas ao vivo',
    icon: '💬',
  },
  {
    title: 'Notificações',
    description: 'Envio de mensagens estratégicas programadas sob medida',
    icon: '🔔',
  },
];

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="container">
        <h2 className="benefits-title">
          Automação simples, resultados poderosos
        </h2>
        <p className="benefits-subtitle">
          Tecnologia acessível para negócios de qualquer tamanho
        </p>
        
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .benefits {
          padding: 80px 20px;
          background: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .benefits-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 16px;
          color: #1a1a1a;
        }
        
        .benefits-subtitle {
          font-size: 1.1rem;
          text-align: center;
          color: #666;
          margin-bottom: 48px;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        
        .benefit-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          transition: transform 0.2s;
        }
        
        .benefit-card:hover {
          transform: translateY(-4px);
        }
        
        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .benefit-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 12px;
          color: #1a1a1a;
        }
        
        .benefit-description {
          font-size: 0.95rem;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .benefits {
            padding: 60px 20px;
          }
          .benefits-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
