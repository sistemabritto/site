import React from 'react';

export default function ClubPlugPlay() {
  return (
    <section className="club-plug-play">
      <div className="container">
        <h2 className="club-title">
          Comece agora pelo Clube Plug & Play
        </h2>
        <p className="club-subtitle">
          Acesso imediato às melhores ferramentas para atendimento usando inteligência artificial para inovar rápido e sem limites
        </p>
        
        <div className="club-actions">
          <a href="https://checkout.nubank.com.br/j681LmTjW7xa917" className="btn-primary">
            Conhecer as vantagens
          </a>
          <a href="https://wa.me/5511914088571" className="btn-secondary">
            Implementar Agora
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .club-plug-play {
          padding: 80px 20px;
          background: #ffffff;
          text-align: center;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .club-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 16px;
          color: #1a1a1a;
        }
        
        .club-subtitle {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 32px;
          line-height: 1.5;
        }
        
        .club-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          display: inline-block;
          padding: 16px 32px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
        }
        
        .btn-secondary {
          display: inline-block;
          padding: 16px 32px;
          font-size: 1rem;
          font-weight: 600;
          color: #667eea;
          background: white;
          border: 2px solid #667eea;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }
        
        @media (max-width: 768px) {
          .club-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
