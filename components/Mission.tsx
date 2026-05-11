import React from 'react';

export default function Mission() {
  return (
    <section className="mission">
      <div className="container">
        <h2 className="mission-title">Nossa Missão</h2>
        <p className="mission-text">
          Fazemos automações que economizam tempo ⏱️ cortam custos 💸 e escalam suas vendas 📈
        </p>
      </div>
      
      <style jsx>{`
        .mission {
          padding: 60px 20px;
          background: #f8f9fa;
          text-align: center;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .mission-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 16px;
          color: #1a1a1a;
        }
        
        .mission-text {
          font-size: 1.25rem;
          color: #666;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
