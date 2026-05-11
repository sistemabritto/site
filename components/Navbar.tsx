import React, { useState, useEffect } from 'react';

/**
 * Navbar — Glassmorphism, sticky, mobile-first
 * AI-Native UI style: minimal chrome, ambient feel
 */

const navLinks = [
  { label: 'Agentes', href: '#agentes' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'ROI', href: '#roi' },
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
          ? 'glass-dark py-3 shadow-lg shadow-surface-950/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg aurora-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-white font-heading font-bold text-lg tracking-tight">
              Workflow<span className="text-primary-400">API</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
                {link.external && (
                  <span className="ml-1 text-xs opacity-50">↗</span>
                )}
              </a>
            ))}
            <a
              href="https://wa.me/5511914088571"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cta-glow"
            >
              Falar com Especialista
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 bg-white rounded transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`h-0.5 bg-white rounded transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 bg-white rounded transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 glass-strong rounded-2xl p-6 space-y-4 animate-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="block text-white/80 hover:text-white text-base font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5511914088571"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-primary-500 text-white px-6 py-3 rounded-full font-semibold mt-4 cta-glow"
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
