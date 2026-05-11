'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="nav-logo">
          Workflow API
        </Link>
        <ul className="nav-links">
          <li><Link href="/servicos">Serviços</Link></li>
          <li><Link href="/sobre">Sobre</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contato">Contato</Link></li>
        </ul>
      </div>
    </nav>
  );
}
