import Image from 'next/image';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { trackCta } from './_app';

const offers = [
  { name: 'Desafio Monetizar com IA', price: 'R$ 97', tag: 'Comece aqui · 21 dias', image: '/covers/desafio-monetizar-com-ia.png', href: '/desafio-monetizar-com-ia', copy: 'Rastreie um problema caro, transforme-o em uma oferta testável e leve a primeira validação ao mercado.', cta: 'Entrar no desafio' },
  { name: 'Sprint Vibe Seller', price: 'R$ 1.497', tag: 'Diagnóstico e decisão', image: '/covers/sprint-vibe-seller.png', href: '/sprint-vibe-seller', copy: 'Transforme uma oportunidade plausível em decisão, mapa de valor, mini-PRD e plano de 30 dias.', cta: 'Aplicar para o Sprint' },
  { name: 'Sessão + Implementação', price: 'Sessão por R$ 150', tag: 'Arquitetura antes do código', image: '/covers/implementacao-vibe-seller.png', href: '/implementacao-vibe-seller', copy: 'Saia com arquitetura, escopo e custos estimados. Se fizer sentido avançar, implementações começam em R$ 5.000.', cta: 'Reservar uma das 3 agendas' },
];

const cases = [
  { name: 'Laboratório de Insights', lesson: 'Produto funcionando não é o mesmo que unit economics funcionando.', outcome: '70 usuários e uma lição cara sobre retenção, infraestrutura e sustentabilidade.' },
  { name: 'Jurismart', lesson: 'Uma vantagem pode desaparecer antes de o produto chegar ao mercado.', outcome: 'A capacidade central foi comoditizada quando o ChatGPT chegou às mãos dos advogados.' },
  { name: 'Voice Dream', lesson: 'Tecnologia também pode ser monetizada como ativo, valuation e equity.', outcome: 'Construção acelerada por IA, investimento seed e participação societária.' },
];

export default function Home() {
  return (
    <>
      <Meta title="Sistema Britto | Rastrear, Vibe Codar e Monetizar" description="Encontre valor não capturado, valide oportunidades e transforme IA em receita, economia, margem ou equity com o método Vibe Seller." path="/" ogImage="/covers/desafio-monetizar-com-ia.png" />
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-[#080b12] text-white">
        <section className="relative flex min-h-[92vh] items-center px-5 pb-20 pt-32 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(163,255,18,.18),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(212,175,55,.13),transparent_30%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="inline-flex rounded-full border border-[#a3ff12]/35 bg-[#a3ff12]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#c4ff72]">Felipe Britto · Vibe Seller 🦈</p>
              <h1 className="mt-7 max-w-4xl font-heading text-5xl font-black leading-[.94] tracking-[-.055em] sm:text-7xl xl:text-8xl">Saber Vibe Coding <span className="text-[#a3ff12]">não vai te deixar rico.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">Construir ficou barato. O dinheiro está em rastrear valor não capturado, criar a solução certa e encontrar uma forma inteligente de monetizá-lo.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="/desafio-monetizar-com-ia" onClick={() => trackCta('/', 'ENTRAR NO DESAFIO', 'hero')} className="rounded-xl bg-[#a3ff12] px-7 py-4 text-center font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-[#c4ff72]">Começar por R$ 97 →</a>
                <a href="#metodo" className="rounded-xl border border-white/15 px-7 py-4 text-center font-bold text-white transition hover:border-[#a3ff12]/60">Entender o método</a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-6 rounded-[2.5rem] bg-[#a3ff12]/10 blur-3xl" /><Image src="/covers/desafio-monetizar-com-ia.png" alt="Desafio Monetizar com IA em 21 dias" width={1024} height={1024} priority className="relative w-full rounded-3xl border border-white/10 shadow-2xl" /></div>
          </div>
        </section>

        <section id="metodo" className="border-y border-white/10 bg-[#0d1320] px-5 py-20 sm:px-8"><div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#c4ff72]">O método</p><h2 className="mt-4 max-w-4xl font-heading text-4xl font-bold tracking-[-.04em] sm:text-6xl">Não comece pelo software. Comece pelo valor.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{[
            ['01 · RASTREAR', 'Onde existe dinheiro mal resolvido?', 'Encontre dor, desperdício, demanda, comprador e distribuição antes de escolher tecnologia.'],
            ['02 · VIBE CODAR', 'Qual é a menor solução que prova valor?', 'Decida entre construir, comprar, ajustar processo ou ignorar. IA é meio, não a oportunidade.'],
            ['03 · MONETIZAR', 'Como esse valor será capturado?', 'Receita, economia, margem ou equity. Um SaaS é apenas uma das possibilidades.'],
          ].map(([label, title, copy]) => <article key={label} className="rounded-3xl border border-white/10 bg-[#080b12] p-7"><p className="text-sm font-bold text-[#c4ff72]">{label}</p><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-4 leading-relaxed text-slate-300">{copy}</p></article>)}</div>
        </div></section>

        <section className="px-5 py-24 sm:px-8" id="ofertas"><div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#c4ff72]">A escada certa</p><h2 className="mt-4 font-heading text-4xl font-bold tracking-[-.04em] sm:text-6xl">Descobrir. Decidir. Implementar.</h2><p className="mt-5 text-lg leading-relaxed text-slate-300">Você entra no nível proporcional à evidência e ao risco da oportunidade.</p></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">{offers.map((offer, index) => <a key={offer.name} href={offer.href} onClick={() => trackCta('/', offer.cta, `escada-${index + 1}`)} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] transition hover:-translate-y-1 hover:border-[#a3ff12]/50"><Image src={offer.image} alt={`Capa ${offer.name}`} width={1024} height={1024} className="aspect-square w-full object-cover" /><div className="p-6"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-wider text-[#c4ff72]">{offer.tag}</span><span className="font-bold text-white">{offer.price}</span></div><h3 className="mt-4 text-2xl font-bold transition group-hover:text-[#a3ff12]">{offer.name}</h3><p className="mt-3 leading-relaxed text-slate-300">{offer.copy}</p><span className="mt-6 inline-flex font-bold text-[#c4ff72]">{offer.cta} →</span></div></a>)}</div>
        </div></section>

        <section className="border-y border-white/10 bg-[#0d1320] px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#c4ff72]">Experiência antes do nome</p><h2 className="mt-4 font-heading text-4xl font-bold tracking-[-.04em] sm:text-6xl">A tese nasceu construindo, errando e capturando valor.</h2></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">{cases.map(item => <article key={item.name} className="rounded-3xl border border-white/10 bg-[#080b12] p-7"><h3 className="text-2xl font-bold text-white">{item.name}</h3><p className="mt-4 font-semibold text-[#c4ff72]">{item.lesson}</p><p className="mt-4 leading-relaxed text-slate-300">{item.outcome}</p></article>)}</div>
        </div></section>

        <section className="px-5 py-24 text-center sm:px-8"><div className="mx-auto max-w-4xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#c4ff72]">Seu próximo passo</p><h2 className="mt-4 font-heading text-4xl font-black tracking-[-.04em] sm:text-6xl">Não procure ideias. Procure dinheiro mal resolvido.</h2><p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">Em 21 dias, saia da curiosidade e coloque uma hipótese real diante de um comprador.</p><a href="/desafio-monetizar-com-ia" onClick={() => trackCta('/', 'COMEÇAR DESAFIO', 'final')} className="mt-9 inline-flex rounded-xl bg-[#a3ff12] px-8 py-4 font-extrabold text-black transition hover:bg-[#c4ff72]">Começar o Desafio por R$ 97 →</a></div></section>
        <Footer />
      </main>
    </>
  );
}
