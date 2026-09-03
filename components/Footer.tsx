import Link from 'next/link';

const groups = [
  {
    title: 'Comece aqui',
    links: [
      { label: 'Desafio Monetizar com IA', href: '/desafio-monetizar-com-ia' },
      { label: 'Sessão de Arquitetura', href: '/sprint-vibe-seller' },
      { label: 'Sprint Vibe Seller', href: '/sprint-vibe-seller' },
      { label: 'Implementação Vibe Seller', href: '/implementacao-vibe-seller' },
    ],
  },
  {
    title: 'Soluções',
    links: [
      { label: 'WhatsApp com IA', href: '/whatsapp' },
      { label: 'VPS para quem vai operar', href: '/vps' },
      { label: 'Blog', href: 'https://blog.sistemabritto.com.br', external: true },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Política de privacidade', href: '/politicas-de-privacidade' },
      { label: 'Termos de uso', href: '/termos-de-uso' },
      { label: 'Exclusão de dados', href: '/exclusao-dos-dados' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080b12] px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_repeat(3,1fr)]">
          <div>
            <img src="/images/logo-sistema-britto.png" alt="Sistema Britto" className="h-12 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-300">Rastreie valor não capturado, decida o que vale construir e transforme oportunidade em receita, margem, economia ou equity.</p>
            <a href="https://wa.me/5511914088571?text=Olá!%20Quero%20entender%20qual%20caminho%20faz%20sentido%20para%20a%20minha%20oportunidade." target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-lg text-sm font-bold text-[#c4ff72] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">
              Falar sobre uma oportunidade <span aria-hidden="true">→</span>
            </a>
          </div>
          {groups.map((group) => (
            <section key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-bold uppercase tracking-[.14em] text-white">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 transition hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">{link.label} <span aria-hidden="true">↗</span></a>
                    ) : (
                      <Link href={link.href} className="text-sm text-slate-300 transition hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sistema Britto. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/sistemabritto" target="_blank" rel="noopener noreferrer" className="hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">Instagram</a>
            <a href="https://www.linkedin.com/in/fsbritto/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c4ff72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3ff12]">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
