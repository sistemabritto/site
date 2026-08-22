import { useEffect, useState } from 'react';
import Image from 'next/image';
import Meta from '../components/Meta';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { trackCta, getStoredUtms } from './_app';

/**
 * /links — página de bio (substitui Linktree).
 *
 * Por que não Linktree: aqui os cliques passam por trackCta → /api/track (mesma
 * tabela cta_clicks que o /admin já lê) e cada destino carrega o próprio
 * utm_content, então dá pra saber qual link da bio virou lead lá no CRM. Num
 * Linktree o tráfego morre num domínio de terceiro e chega no site sem origem.
 *
 * Ordem pedida pelo Felipe em 22/08/2026: aulas gratuitas primeiro, serviços
 * (todos com mensalidade) depois. Quem chega da bio não conhece o trabalho —
 * o conteúdo grátis é o que qualifica antes de qualquer oferta.
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
  preco: string;
};

const SERVICOS: Servico[] = [
  {
    slug: 'zapclub',
    href: '/zapclub',
    img: '/images/links/zapclub.png',
    titulo: 'ZapClub',
    descricao:
      'Comunidade no WhatsApp com moderador de IA 24h. Você pergunta, alguém que já fez responde.',
    preco: 'R$ 50/mês',
  },
  {
    slug: 'socialjobs',
    href: '/socialjobs',
    img: '/images/links/socialjobs.png',
    titulo: 'SocialJobs',
    descricao:
      'Agentes de IA que pesquisam o tema, escrevem e publicam em cada rede. Você só aprova.',
    preco: 'Operação mensal',
  },
  {
    slug: 'whatsapp',
    href: '/whatsapp',
    img: '/images/links/whatsapp.png',
    titulo: 'WhatsApp que responde 24h',
    descricao:
      'A mensagem que chega às 22h47 é respondida às 22h47. IA que qualifica, agenda e vende.',
    preco: 'Assinatura mensal',
  },
  {
    slug: 'sistema',
    href: '/sistema',
    img: '/images/links/sistema.png',
    titulo: 'Seu sistema sob medida',
    descricao:
      'Uma hora de call e você sai com o PRD do projeto: escopo, prazo por etapa e preço fechado.',
    preco: 'R$ 147 a call',
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
            {servico.preco}
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

  useEffect(() => {
    setUtms(getStoredUtms());
  }, []);

  return (
    <>
      <Meta
        title="Sistema Britto | Aulas grátis, comunidade e sistemas de IA"
        description="Aulas gratuitas de IA aplicada a negócio, comunidade no WhatsApp e os sistemas que a gente constrói. Comece pelo conteúdo grátis."
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
              Sistemas de IA que postam, engajam e atendem sozinhos — e o passo a passo pra você
              montar o seu.
            </p>
          </header>

          {/* ===== Aulas gratuitas (topo, como pedido) ===== */}
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

            {/* Comunidade — também gratuita, então fica junto do bloco grátis */}
            <a
              href={COMUNIDADE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCta('/links', 'evolution-alliance', 'comunidade')}
              className="group mt-4 flex items-center gap-4 rounded-2xl border border-green-400/30 bg-green-400/5 p-4 transition-colors duration-200 hover:border-green-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-whatsapp-500">
                <WhatsAppIcon className="h-6 w-6 text-black" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading font-bold text-white">Evolution Alliance</span>
                <span className="mt-1 block text-sm leading-relaxed text-gray-400">
                  Comunidade de quem constrói com a Evolution API. Entrada gratuita.
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex-shrink-0 text-green-400 transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
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
