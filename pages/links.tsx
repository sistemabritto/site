import { useEffect, useState } from 'react';
import Image from 'next/image';
import Meta from '../components/Meta';
import WhatsAppIcon from '../components/WhatsAppIcon';
import FollowerLot from '../components/FollowerLot';
import { trackCta, getStoredUtms } from './_app';

/**
 * /links — página de bio (substitui Linktree).
 *
 * Por que não Linktree: aqui os cliques passam por trackCta → /api/track (mesma
 * tabela cta_clicks que o /admin já lê) e cada destino carrega o próprio
 * utm_content, então dá pra saber qual link da bio virou lead lá no CRM. Num
 * Linktree o tráfego morre num domínio de terceiro e chega no site sem origem.
 *
 * Atualização Vibe Seller de 03/09/2026: a página conduz da prova gratuita
 * para a execução autônoma no Desafio e, só depois, para os níveis de entrega
 * assistida. Assim cada oferta aparece quando a pessoa já entendeu seu valor.
 */

const WHATSAPP_DIRETO =
  'https://wa.me/5511914088571?text=Olá!%20Vim%20pela%20bio%20do%20Instagram%20e%20quero%20entender%20como%20aplicar%20IA%20no%20meu%20negócio';
const COMUNIDADE_URL = 'https://chat.whatsapp.com/IXPNhwhT8C0GSGxV0b5LMS';

type Aula = {
  slug: string;
  href: string;
  img: string;
  titulo: string;
  descricao: string;
  duracao: string;
};

const AULAS: Aula[] = [
  {
    slug: 'aula-crm',
    href: '/aula-vps-crm-do-zero',
    img: '/images/links/aula-vps-crm.jpg',
    titulo: 'Monte seu CRM do zero',
    descricao:
      'Do servidor vazio ao Evo CRM no ar: VPS, Docker, DNS e Traefik. Aula completa, passo a passo.',
    duracao: '18 min',
  },
  {
    slug: 'call-pos-ia',
    href: '/call-sobrevivencia-pos-ia',
    img: '/images/links/call-pos-ia.jpg',
    titulo: 'Sobrevivência pós-IA',
    descricao:
      'O que muda no seu negócio com a IA no meio do jogo — e o que dá pra fazer agora, não em 2030.',
    duracao: 'Call completa',
  },
];

type Servico = {
  slug: string;
  href: string;
  img: string;
  titulo: string;
  descricao: string;
  nivel: string;
};

const SERVICOS: Servico[] = [
  {
    slug: 'sprint-vibe-seller',
    href: '/sprint-vibe-seller',
    img: '/covers/sprint-vibe-seller.png',
    titulo: 'Sprint Vibe Seller',
    descricao: 'Tire seu projeto do improviso com suporte individual no WhatsApp e 5 checkpoints para avançar do problema validado à solução pronta para crescer.',
    nivel: 'Eu faço com você',
  },
  {
    slug: 'implementacao-vibe-seller',
    href: '/implementacao-vibe-seller',
    img: '/covers/implementacao-vibe-seller.png',
    titulo: 'Implementação Vibe Seller',
    descricao: 'Transforme uma oportunidade validada em um sistema pronto para operar: estratégia, arquitetura, construção e plano de escala entregues para você.',
    nivel: 'Eu faço para você',
  },
];

/**
 * Monta o href com atribuição. O primeiro render (servidor + hidratação) usa
 * source/medium fixos pra não dar mismatch; depois o useEffect abaixo troca
 * pelos UTM reais da sessão, quando a pessoa chegou por uma campanha.
 */
function hrefComUtm(base: string, content: string, utms: Record<string, string>) {
  const params = new URLSearchParams({
    utm_source: utms.utm_source || 'links',
    utm_medium: utms.utm_medium || 'bio',
    utm_content: content,
  });
  if (utms.utm_campaign) params.set('utm_campaign', utms.utm_campaign);
  return `${base}?${params.toString()}`;
}

function AulaCard({ aula, utms }: { aula: Aula; utms: Record<string, string> }) {
  return (
    <a
      href={hrefComUtm(aula.href, aula.slug, utms)}
      onClick={() => trackCta('/links', aula.slug, 'aula')}
      className="group block overflow-hidden rounded-2xl border border-surface-700 bg-surface-900 transition-colors duration-200 hover:border-green-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    >
      <div className="relative aspect-video">
        <Image
          src={aula.img}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-green-400 px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-widest text-black">
          Grátis
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-heading text-lg font-bold text-white">{aula.titulo}</h3>
          <span className="flex-shrink-0 text-xs text-gray-400">{aula.duracao}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">{aula.descricao}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold text-green-400">
          Assistir agora
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </a>
  );
}

function ServicoCard({ servico, utms }: { servico: Servico; utms: Record<string, string> }) {
  return (
    <a
      href={hrefComUtm(servico.href, servico.slug, utms)}
      onClick={() => trackCta('/links', servico.slug, 'servico')}
      className="group flex items-center gap-4 rounded-2xl border border-surface-700 bg-surface-900 p-4 transition-colors duration-200 hover:border-green-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-surface-950">
        <Image src={servico.img} alt="" fill sizes="64px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-heading font-bold text-white">{servico.titulo}</h3>
          <span className="rounded-full border border-green-400/30 bg-green-400/10 px-2 py-0.5 text-[11px] font-semibold text-green-400">
            {servico.nivel}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-gray-400">{servico.descricao}</p>
      </div>

      <span
        aria-hidden="true"
        className="flex-shrink-0 text-gray-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-400"
      >
        →
      </span>
    </a>
  );
}

export default function Links() {
  const [utms, setUtms] = useState<Record<string, string>>({});
  const [community, setCommunity] = useState({ count: 9, goal: 100, priceAfterGoal: 20 });

  useEffect(() => {
    setUtms(getStoredUtms());
    fetch('/api/community/evolution-alliance')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setCommunity({ count: data.count, goal: data.goal, priceAfterGoal: data.priceAfterGoal }))
      .catch(() => undefined);
  }, []);

  return (
    <>
      <Meta
        title="Sistema Britto | Oportunidades, IA e sistemas que capturam valor"
        description="Desafio Monetizar com IA, aulas gratuitas e sistemas para transformar oportunidades em receita, economia, margem ou equity."
        path="/links"
        ogImage="/images/links/aula-vps-crm.jpg"
      />

      {/* Sem Navbar/Footer de propósito: página de bio é uma tela só, sem menu
          competindo com os links — quem chega do Instagram vem pra escolher um
          destino, não pra navegar o site. */}
      <main className="min-h-screen bg-surface-950 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto w-full max-w-xl">
          {/* ===== Cabeçalho ===== */}
          <header className="text-center">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-green-400/40">
              <Image
                src="/felipe-autoridade.webp"
                alt="Felipe Britto"
                fill
                sizes="96px"
                priority
                className="object-cover"
              />
            </div>

            <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Sistema Britto
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">
              Rastrear oportunidades, vibe codar soluções e capturar valor com IA.
            </p>
          </header>

          <a
            href={COMUNIDADE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackCta('/links', 'evolution-alliance', 'banner-topo')}
            className="group mt-8 block overflow-hidden rounded-3xl border border-green-400/45 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_46%),linear-gradient(135deg,#0c2118,#10121d)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-green-400/80"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-whatsapp-500"><WhatsAppIcon className="h-6 w-6 text-black" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-green-400">Evolution Alliance</span>
                <span className="mt-2 block font-heading text-xl font-bold text-white">Entre grátis antes dos 100 membros.</span>
                <span className="mt-2 block text-sm leading-relaxed text-gray-300">Ao atingir 100 membros fundadores, a entrada passa a custar R$ {community.priceAfterGoal}. Quem entrou antes continua dentro.</span>
              </span>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs font-semibold text-gray-300"><span>{community.count} membros agora</span><span>{community.goal} vagas fundadoras</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-green-400 transition-all duration-700" style={{ width: `${Math.min(100, (community.count / community.goal) * 100)}%` }} /></div>
            </div>
            <span className="mt-5 inline-flex font-heading text-sm font-bold text-green-400">Entrar na comunidade agora →</span>
          </a>

          {/* ===== Aulas gratuitas: prova e contexto antes da oferta ===== */}
          <section aria-labelledby="sec-aulas" className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <h2
                id="sec-aulas"
                className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-400"
              >
                Comece grátis
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-surface-700" />
            </div>

            <div className="grid gap-4">
              {AULAS.map((aula) => (
                <AulaCard key={aula.slug} aula={aula} utms={utms} />
              ))}
            </div>

          </section>

          {/* ===== Oferta de entrada: primeiro passo pago depois das aulas ===== */}
          <section aria-labelledby="sec-desafio" className="mt-10">
            <a
              href={hrefComUtm('/desafio-monetizar-com-ia', 'desafio-21-dias', utms)}
              onClick={() => trackCta('/links', 'desafio-monetizar-com-ia', 'oferta-entrada')}
              className="group block overflow-hidden rounded-3xl border border-[#a3ff12]/45 bg-[radial-gradient(circle_at_top_right,rgba(163,255,18,0.22),transparent_48%),linear-gradient(135deg,#111b19,#10121d)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-[#a3ff12]/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]"
            >
              <div className="relative -mx-6 -mt-6 mb-6 aspect-square overflow-hidden">
                <Image src="/covers/desafio-monetizar-com-ia.png" alt="Desafio Monetizar com IA — 21 dias" fill sizes="(max-width: 640px) 100vw, 520px" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <span className="inline-flex rounded-full border border-[#a3ff12]/35 bg-[#a3ff12]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#c4ff72]">Eu ensino · você faz · 21 dias</span>
              <h2 id="sec-desafio" className="mt-4 font-heading text-2xl font-bold leading-tight text-white">Desafio Monetizar com IA</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">Encontre valor escondido em um problema real, transforme-o em uma oferta testável e saia do consumo de ferramentas para a validação no mercado.</p>
              <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-[#c4ff72]">Conhecer o caminho de 21 dias <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
            </a>
            <FollowerLot />
          </section>

          {/* ===== Serviços ===== */}
          <section aria-labelledby="sec-servicos" className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <h2
                id="sec-servicos"
                className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-400"
              >
                Trabalhar comigo
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-surface-700" />
            </div>

            <div className="grid gap-3">
              {SERVICOS.map((servico) => (
                <ServicoCard key={servico.slug} servico={servico} utms={utms} />
              ))}
            </div>
          </section>

          {/* ===== Contato direto ===== */}
          <a
            href={WHATSAPP_DIRETO}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackCta('/links', 'whatsapp-direto', 'contato')}
            className="mt-10 flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-whatsapp-500 px-6 font-heading font-bold text-black transition-colors duration-200 hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
          >
            <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-black" />
            <span>Falar comigo no WhatsApp</span>
          </a>

          <footer className="mt-10 text-center">
            <a
              href="/"
              onClick={() => trackCta('/links', 'site-completo', 'footer')}
              className="text-sm text-gray-400 underline-offset-4 transition-colors hover:text-green-400 hover:underline"
            >
              sistemabritto.com.br
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
