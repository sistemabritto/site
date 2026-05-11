import React from 'react';
import AgentCard from './AgentCard';

/**
 * Hero Section - "Conheça nossas agentes inteligentes 🤖✨"
 * 
 * Dados extraídos do site original:
 * - Lucas: Conselheiro Cristão
 * - Trinity: Secretária Comercial  
 * - Luna: Agente de Reservas
 * - Tina: Delivery de Pizzas
 */

const agents = [
  {
    name: 'Lucas',
    role: 'Conselheiro Cristão',
    image: '/images/lucas.png', // a trocar pela imagem real
    link: 'https://click.workflowapi.com.br/lucas',
  },
  {
    name: 'Trinity',
    role: 'Secretária Comercial',
    image: '/images/trinity.png',
    link: 'https://click.workflowapi.com.br/atendimento',
  },
  {
    name: 'Luna',
    role: 'Agente de Reservas',
    image: '/images/luna.png',
    link: 'https://click.workflowapi.com.br/luna',
  },
  {
    name: 'Tina',
    role: 'Delivery de Pizzas',
    image: '/images/tina.png',
    link: 'https://click.workflowapi.com.br/delivery',
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">
          Conheça nossas agentes inteligentes 🤖✨
        </h1>
        <p className="hero-subtitle">
          Treinadas pra resolver de verdade. Veja como funcionam na prática.
        </p>
        
        <div className="agents-grid">
          {agents.map((agent) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              role={agent.role}
              image={agent.image}
              link={agent.link}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          padding: 80px 20px 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }
        
        .hero-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 48px;
          opacity: 0.95;
        }
        
        .agents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
          }
          .agents-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
