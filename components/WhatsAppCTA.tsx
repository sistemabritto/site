import React from 'react';

/**
 * WhatsApp CTA - Seção principal de conversão
 * "Transforme seu WhatsApp em um canal que vende por você"
 */

export default function WhatsAppCTA() {
  return (
    <section className="whatsapp-cta">
      <div className="container">
        <h2 className="cta-title">
          Transforme seu WhatsApp em um canal que vende por você
        </h2>
        
        <div className="cta-content">
          <div className="cta-timeline">
            Em até <strong>1 hora</strong>, você terá seu atendimento estruturado com automações inteligentes e IA funcionando no seu WhatsApp — ao vivo com <strong>Felipe Britto</strong>, estrategista especialista em escalar negócios locais, clínicas e prestadores de serviço.
          </div>
          
          <ul className="cta-features">
            <li>✅ Funil personalizado pra sua realidade</li>
            <li>✅ Automação e mensagens estratégicas configuradas</li>
            <li>✅ ChatGPT plugado no seu número pra testar por 7 dias</li>
            <li>✅ Sessão prática: você vê funcionando na hora</li>
            <li>✅ Sem instalação: só precisa escanear um QR Code</li>
          </ul>
          
          <a 
            href="https://wa.me/5511914088571?text=Olá+gostaria+de+ter+acesso+imediato+as+ferramentas+para+colocar+Chatgpt+no+meu+Whatsapp"
            className="cta-button"
          >
            Quero ativar meu WhatsApp com inteligência
          </a>
          
          <p className="cta-urgency">
            Vagas limitadas por conta da agenda do especialista
          </p>
          
          <p className="cta-question">
            Faria sentido começar agora e deixar seu atendimento trabalhando por você ainda essa semana?
          </p>
          
          <a 
            href="https://wa.me/5511914088571"
            className="cta-secondary"
          >
            Obter Orçamento
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .whatsapp-cta {
          padding: 80px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .cta-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 32px;
        }
        
        .cta-content {
          background: white;
          color: #1a1a1a;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        
        .cta-timeline {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .cta-timeline strong {
          color: #667eea;
        }
        
        .cta-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }
        
        .cta-features li {
          font-size: 1rem;
          line-height: 1.8;
          padding: 8px 0;
        }
        
        .cta-button {
          display: block;
          width: 100%;
          padding: 18px 32px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
        }
        
        .cta-urgency {
          text-align: center;
          color: #dc3545;
          font-weight: 600;
          margin: 16px 0 0 0;
        }
        
        .cta-question {
          text-align: center;
          margin: 24px 0 16px;
          font-size: 1rem;
          color: #666;
        }
        
        .cta-secondary {
          display: block;
          width: 100%;
          padding: 14px 32px;
          font-size: 1rem;
          font-weight: 600;
          color: #667eea;
          background: white;
          border: 2px solid #667eea;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          box-sizing: border-box;
          transition: all 0.2s;
        }
        
        .cta-secondary:hover {
          background: #667eea;
          color: white;
        }
        
        @media (max-width: 768px) {
          .cta-content {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
