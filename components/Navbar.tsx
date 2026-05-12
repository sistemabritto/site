import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'ROI', href: '#roi' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Blog', href: 'https://blog.workflowapi.com.br', external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-200">
              <img src="/images/logo-loop.svg" alt="Workflow API Studio" className="w-10 h-10" />
            </div>
            <span className="text-white font-heading font-bold text-lg tracking-tight">
              Workflow<span className="gold-text">API</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-neutral-200 hover:text-gold-400 text-sm font-semibold transition-colors duration-200"
              >
                {link.label}
                {link.external && (
                  <span className="ml-1 text-xs opacity-70">↗</span>
                )}
              </a>
            ))}
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20conversar%20com%20um%20especialista%20em%20workforce%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-600 text-surface-900 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-gold-500/25"
            >
              Falar com Especialista
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-white rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-white rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-white rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 glass-strong rounded-2xl p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="block text-neutral-200 hover:text-gold-400 text-base font-semibold py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20conversar%20com%20um%20especialista%20em%20workforce%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gold-500 text-surface-900 px-6 py-3 rounded-full font-bold mt-4 shadow-lg shadow-gold-500/25"
              onClick={() => setMobileOpen(false)}
            >
              Falar com Especialista
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
