import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Método', href: '/#metodo' },
  { label: 'Desafio', href: '/desafio-monetizar-com-ia' },
  { label: 'Sprint', href: '/sprint-vibe-seller' },
  { label: 'Implementação', href: '/implementacao-vibe-seller' },
  { label: 'WhatsApp com IA', href: '/whatsapp' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? 'border-white/10 bg-[#080b12]/95 shadow-xl shadow-black/20 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Sistema Britto — página inicial" className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#a3ff12]/40">
          <img src="/images/logo-sistema-britto.png" alt="Sistema Britto" className="h-10 w-auto sm:h-11" />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded px-1 py-2 text-sm font-semibold text-slate-200 transition hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">
              {link.label}
            </Link>
          ))}
          <Link href="/sprint-vibe-seller" className="inline-flex min-h-11 items-center rounded-xl bg-[#a3ff12] px-5 py-2 text-sm font-extrabold text-black transition hover:bg-[#c4ff72] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#a3ff12]/40">
            Reservar sessão
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-[#a3ff12]/60 lg:hidden"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
        >
          <span aria-hidden="true" className="flex h-5 w-6 flex-col justify-between">
            <span className={`h-0.5 w-full rounded bg-current transition ${mobileOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-full rounded bg-current transition ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full rounded bg-current transition ${mobileOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      <div id="menu-mobile" className={`overflow-hidden border-t border-white/10 bg-[#080b12] transition-[max-height] duration-200 lg:hidden ${mobileOpen ? 'max-h-[32rem]' : 'max-h-0 border-transparent'}`}>
        <div className="space-y-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-100 transition hover:bg-white/5 hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">
              {link.label}
            </Link>
          ))}
          <Link href="/sprint-vibe-seller" onClick={closeMenu} className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[#a3ff12] px-5 py-3 font-extrabold text-black transition hover:bg-[#c4ff72] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#a3ff12]/40">
            Reservar sessão de arquitetura
          </Link>
          <a href="https://blog.sistemabritto.com.br" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">
            Blog <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
