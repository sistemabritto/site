import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'WhatsApp', href: '/whatsapp' },
  { label: 'EvoNexus', href: '/evonexus' },
  { label: 'Hermes', href: '/hermes' },
  { label: 'Blog', href: 'https://blog.sistemabritto.com.br', external: true },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong py-2 shadow-lg shadow-black/50 scale-[0.98]'
          : 'bg-transparent py-4 scale-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Horizontal com movimento */}
          <a 
            href="/" 
            className="group transition-all duration-500 hover:scale-105"
          >
            <img 
              src="/images/logo-horizontal.svg" 
              alt="Sistema Britto" 
              className="h-10 sm:h-12 w-auto transition-transform duration-500 group-hover:scale-110"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-neutral-200 hover:text-green-400 text-sm font-semibold transition-colors duration-200 relative group"
              >
                {link.label}
                {link.external && (
                  <span className="ml-1 text-xs opacity-70">↗</span>
                )}
                {/* Hover underline animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20conversar%20com%20um%20especialista%20em%20workforce%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-surface-900 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105"
            >
              Falar com Especialista
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 transition-transform duration-300 hover:scale-110"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu com animação */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <div className="glass-strong rounded-2xl p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="block text-neutral-200 hover:text-green-400 text-base font-semibold py-2 transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20conversar%20com%20um%20especialista%20em%20workforce%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-green-500 text-surface-900 px-6 py-3 rounded-full font-bold mt-4 shadow-lg shadow-green-500/25 hover:bg-green-600 transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
