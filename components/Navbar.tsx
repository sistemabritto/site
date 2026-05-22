import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Workforce', href: '/workforce' },
  { label: 'WhatsApp', href: '/whatsapp' },
  { label: 'VPS', href: '/vps' },
  { label: 'Blog', href: 'https://blog.sistemabritto.com.br', external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    const customerData = { name: formData.name, email: formData.email, whatsapp: formData.whatsapp };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customerData));
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customerData, source: 'navbar-cta' }),
      });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }

    setSubmitted(true);

    setTimeout(() => {
      window.location.href = '/quiz-infra';
    }, 800);
  };

  return (
    <>
      {/* Modal de captura */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
            {!submitted ? (
              <>
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">&#x1F680;</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sua empresa ainda faz tudo no braço?</h3>
                  <p className="text-gray-300 text-sm">Seu email nos ajuda a entender o que você precisa. Sem repetir nada.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                    <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp</label>
                    <input type="tel" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" />
                  </div>
                  <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all">
                    CONTINUAR &#x2192;
                  </button>
                  <p className="text-gray-500 text-xs text-center">Sem spam. Promessa.</p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">&#x2705;</div>
                <h3 className="text-xl font-bold text-white mb-2">Recebido!</h3>
                <p className="text-gray-300 text-sm">Redirecionando pro quiz...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 shadow-lg shadow-black/50'
            : 'bg-transparent py-4'
        }`}
        style={{ backgroundColor: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Sistema Britto */}
            <a 
              href="/" 
              className="group transition-all duration-500 hover:scale-105"
            >
              <img 
                src="/images/logo-sistema-britto.png" 
                alt="Sistema Britto" 
                className="h-12 sm:h-14 w-auto transition-transform duration-500 group-hover:scale-110"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-200 hover:text-green-400 text-sm font-semibold transition-colors duration-200 relative group"
                >
                  {link.label}
                  {link.external && (
                    <span className="ml-1 text-xs opacity-70">&#x2197;</span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary-500 hover:bg-primary-600 text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105"
              >
                PRECISO DE BRAÇO →
              </button>
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

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <div className="rounded-2xl p-6 space-y-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="block text-gray-200 hover:text-green-400 text-base font-semibold py-2 transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); setShowModal(true); }}
                className="block w-full text-center bg-primary-500 text-black px-6 py-3 rounded-full font-bold mt-4 shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-all duration-200"
              >
                PRECISO DE BRAÇO →
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}