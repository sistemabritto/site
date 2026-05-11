import React from 'react';
import Link from 'next/link';

interface AgentCardProps {
  name: string;
  role: string;
  image: string;
  link: string;
}

export default function AgentCard({ name, role, image, link }: AgentCardProps) {
  return (
    <Link href={link} className="agent-card">
      <div className="agent-image">
        {/* Placeholder - substituir pela imagem real */}
        <div className="agent-placeholder">{name[0]}</div>
      </div>
      <h3 className="agent-name">{name}</h3>
      <p className="agent-role">{role}</p>
      
      <style jsx>{`
        .agent-card {
          display: block;
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-decoration: none;
          color: #1a1a1a;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .agent-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        .agent-image {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          border-radius: 50%;
          overflow: hidden;
          background: #f0f0f0;
        }
        
        .agent-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: #667eea;
          background: #f5f5f5;
        }
        
        .agent-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 8px;
          text-align: center;
        }
        
        .agent-role {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </Link>
  );
}
