import React from 'react';

/**
 * Footer — Dark, minimal, blog link
 */

const footerLinks = [
  { label: 'LGPD', href: '/hc/academy/articles/1729769068-politicas-de-privacidade' },
  { label: 'Privacidade', href: '/privacy' },
  { label: 'Termos', href: '/terms' },
  { label: 'Blog', href: 'https://blog.workflowapi.com.br', external: true },
];

export default function Footer() {
  return (
    <footer className="bg-surface-950 text-white/40 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg aurora-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-white font-heading font-bold text-lg">
                Workflow<span className="text-primary-400">API</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Automações inteligentes no WhatsApp que qualificam, vendem e entregam por você.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                    {link.external && <span className="ml-1 text-xs opacity-50">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Agentes */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
              Agentes
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Lucas', url: 'https://click.workflowapi.com.br/lucas' },
                { name: 'Trinity', url: 'https://click.workflowapi.com.br/atendimento' },
                { name: 'Luna', url: 'https://click.workflowapi.com.br/luna' },
                { name: 'Tina', url: 'https://click.workflowapi.com.br/delivery' },
              ].map((agent) => (
                <li key={agent.name}>
                  <a
                    href={agent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {agent.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:felipe@workflowapi.com.br" className="text-sm hover:text-white transition-colors">
                  felipe@workflowapi.com.br
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511914088571" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  +55 11 91408-8571
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Workflow API Studio. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
