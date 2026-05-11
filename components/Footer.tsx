import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="/hc/academy/articles/1729769068-politicas-de-privacidade" className="footer-link">
            LGPD
          </a>
          <a href="/privacy" className="footer-link">
            Política de Privacidade
          </a>
          <a href="/terms" className="footer-link">
            Terms of Use
          </a>
          <a href="mailto:felipe@workflowapi.com.br" className="footer-link">
            Contato
          </a>
        </div>
        
        <div className="footer-contact">
          <a href="mailto:felipe@workflowapi.com.br">felipe@workflowapi.com.br</a>
          <br />
          <a href="tel:+5511914088571">+55 11 91408-8571</a>
        </div>
        
        <div className="footer-bottom">
          <p>Privacy & Policy</p>
          <p>Copyright © {currentYear} Workflow API Studio. Todos os direitos reservados.</p>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          padding: 40px 20px 20px;
          background: #1a1a1a;
          color: #999;
          text-align: center;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .footer-links {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        
        .footer-link {
          color: #999;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .footer-link:hover {
          color: white;
        }
        
        .footer-contact {
          margin-bottom: 24px;
          padding-top: 24px;
          border-top: 1px solid #333;
        }
        
        .footer-contact a {
          color: #999;
          text-decoration: none;
          display: block;
          margin: 8px 0;
        }
        
        .footer-contact a:hover {
          color: white;
        }
        
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid #333;
          font-size: 0.9rem;
        }
        
        .footer-bottom p {
          margin: 8px 0;
        }
      `}</style>
    </footer>
  );
}
