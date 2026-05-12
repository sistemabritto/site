import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { label: 'Política de Privacidade', href: '/politicas-de-privacidade' },
  { label: 'Termos de Uso', href: '/termos-de-uso' },
  { label: 'Blog', href: 'https://blog.workflowapi.com.br', external: true },
];

export default function Footer() {
  return (
    <footer className="bg-surface-900 border-t border-white/15 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <img src="/images/logo-loop.svg" alt="Workflow API Studio" className="w-10 h-10" />
              </div>
              <span className="text-white font-heading font-bold text-lg">
                Workflow<span className="gold-text">API</span>
              </span>
            </div>
            <p className="text-neutral-200 text-sm leading-relaxed font-medium">
              Workforces de IA que operam seu negócio — do WhatsApp à engenharia de software.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-200 hover:text-white font-medium transition-colors"
                    >
                      {link.label}
                      <span className="ml-1 text-xs opacity-70">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-200 hover:text-white font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:felipe@workflowapi.com.br" className="text-sm text-neutral-200 hover:text-white font-medium transition-colors">
                  felipe@workflowapi.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511914088571?text=Olá!%20Vi%20o%20site%20de%20vocês%20e%20gostaria%20de%20mais%20informações"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-200 hover:text-white font-medium transition-colors"
                >
                  +55 11 91408-8571
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-300 font-medium">
            © {new Date().getFullYear()} Workflow API Studio. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/politicas-de-privacidade" className="text-xs text-neutral-300 hover:text-white font-medium transition-colors">
              Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-xs text-neutral-300 hover:text-white font-medium transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
