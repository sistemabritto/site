import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Footer — Dark mode, links corretos
 */

const footerLinks = [
  { label: 'Política de Privacidade', href: '/politicas-de-privacidade' },
  { label: 'Termos de Uso', href: '/termos-de-uso' },
  { label: 'Blog', href: 'https://blog.workflowapi.com.br', external: true },
];

export default function Footer() {
  return (
    <footer className="bg-surface-950 border-t border-white/10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-white.png"
                alt="Workflow API Studio"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-white font-heading font-bold text-lg">
                Workflow<span className="text-primary-400">API</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
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
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                      <span className="ml-1 text-xs opacity-50">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
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
                <a href="mailto:felipe@workflowapi.com.br" className="text-sm text-white/50 hover:text-white transition-colors">
                  felipe@workflowapi.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511914088571?text=Olá!%20Vi%20o%20site%20de%20vocês%20e%20gostaria%20de%20mais%20informações"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  +55 11 91408-8571
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Workflow API Studio. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/politicas-de-privacidade" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
