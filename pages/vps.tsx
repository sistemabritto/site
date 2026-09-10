import { useState } from 'react';
import Image from 'next/image';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import { getStoredUtms, trackCta } from './_app';
import { VPS_OFFER, vpsSupportUrl } from '../lib/vps-offer';

const FEATURES = [
  ['01', 'Aplicações organizadas', 'Docker e Compose para organizar serviços, volumes e configurações. O dimensionamento depende do que vai rodar.'],
  ['02', 'Domínio e acesso', 'Domínio, HTTPS e firewall para expor o necessário. A aplicação também precisa de autenticação e atualizações.'],
  ['03', 'Backup com critério', 'Rotina diária prevista na oferta. Retenção, destino externo e procedimento de restauração definidos para seu ambiente.'],
  ['04', 'Visibilidade da operação', 'Monitoramento de disponibilidade e recursos. Combine os canais de alerta e quem age quando um problema é detectado.'],
];
const button = 'inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a3ff12] px-6 py-4 text-center font-bold text-black hover:bg-lime-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime-300 disabled:opacity-60';
const track = (label: string, action: string) => { try { trackCta('/vps', label, action); } catch {} };

export default function VPS() {
  const [support, setSupport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const total = VPS_OFFER.basePrice + (support ? VPS_OFFER.supportPrice : 0);
  async function checkout() {
    if (loading) return;
    setLoading(true); setError(''); track('vps-checkout', support ? 'com-suporte' : 'base');
    try {
      // Never use an email as a cellphone or silently copy another funnel's PII.
      const response = await fetch('/api/abacatepay/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: support ? VPS_OFFER.supportProduct : VPS_OFFER.baseProduct,
          returnUrl: `${window.location.origin}/obrigado`, metadata: { ...getStoredUtms(), page: '/vps' } }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error('checkout unavailable');
      const destination = new URL(data.url);
      if (destination.protocol !== 'https:' || !(destination.hostname === 'abacatepay.com' || destination.hostname.endsWith('.abacatepay.com'))) throw new Error('invalid checkout destination');
      window.location.assign(destination.href);
    } catch {
      setError('Não conseguimos abrir o checkout. Tente novamente ou confirme a contratação com Felipe pelo WhatsApp acima.');
      track('vps-checkout-erro', 'sem-redirecionamento-silencioso');
    } finally { setLoading(false); }
  }
  return <>
    <Meta title="VPS Estruturada | Infraestrutura para sua operação — Sistema Britto"
      description="Estruture o ambiente para CRM, automações e aplicações. Conheça o plano de R$ 297/mês e confirme o dimensionamento e o suporte necessário." path="/vps" />
    <main className="min-h-screen bg-surface-950 px-5 text-white">
      <nav aria-label="Navegação" className="mx-auto flex max-w-5xl items-center justify-between gap-4 border-b border-white/10 py-5">
        <a href="/" aria-label="Sistema Britto — início"><Image src="/images/logo-sistema-britto.png" alt="Sistema Britto" width={180} height={60} priority className="h-11 w-auto" /></a>
        <a href="#plano" className="inline-flex min-h-11 items-center text-sm text-gray-300 underline underline-offset-4">Plano e escopo</a>
      </nav>
      <div className="mx-auto max-w-5xl">
        <header className="grid gap-10 py-10 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-widest text-[#a3ff12]">VPS Estruturada · Sistema Britto</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">Sua operação merece mais que um servidor improvisado.</h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-300">CRM, automações e aplicações precisam de uma base organizada. Estruture o ambiente com Docker, HTTPS, backup e monitoramento — sabendo o que está incluído e quem cuida de cada parte.</p>
            <a href="#plano" className={`${button} mt-6 w-full sm:w-auto`}>Quero conhecer o plano · R$ 297/mês →</a>
            <p className="mt-3 text-sm text-gray-400">Dimensionamento e condições confirmados antes da contratação. Desenvolvimento de aplicações não está incluído.</p>
          </div>
          <aside className="rounded-2xl border border-lime-400/25 bg-gradient-to-br from-lime-400/10 to-surface-900 p-6 sm:p-8" aria-label="Estrutura ilustrativa">
            <p className="text-xs uppercase tracking-widest text-[#a3ff12]">Exemplo ilustrativo de estrutura</p><h2 className="mt-5 text-2xl font-bold">Aplicações acima.<br />Responsabilidades claras abaixo.</h2>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-sm">{['CRM', 'Automações', 'Seu sistema'].map(t=><span key={t} className="rounded-lg border border-white/15 bg-surface-950 p-3">{t}</span>)}</div>
            <div className="mt-3 rounded-lg border border-lime-400/25 p-4 text-center font-semibold text-[#a3ff12]">Docker · domínio · HTTPS</div>
            <p className="mt-3 rounded-lg border border-white/15 p-4 text-center text-sm text-gray-300">Backup · recursos · monitoramento</p>
            <p className="mt-5 text-sm text-gray-400">Compatibilidade e capacidade precisam ser avaliadas. Não significa aplicações ilimitadas ou disponibilidade garantida.</p>
          </aside>
        </header>
        <section className="border-t border-white/10 py-12" aria-labelledby="base">
          <h2 id="base" className="max-w-3xl text-3xl font-bold">Você quer usar o CRM. Não descobrir o backup depois da falha.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">A aula gratuita mostra como montar a base. Esta oferta é para quem quer contratar a estruturação do ambiente. Se o gargalo ainda é descobrir o que automatizar, comece pela Sessão de Arquitetura.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">{FEATURES.map(([n,title,copy])=><article key={n} className="rounded-xl border border-white/10 bg-surface-900 p-6"><p className="text-sm font-bold text-[#a3ff12]">{n}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-lg leading-relaxed text-gray-300">{copy}</p></article>)}</div>
        </section>
        <section id="plano" className="grid scroll-mt-6 gap-8 rounded-2xl border border-lime-400/25 bg-surface-900 p-6 sm:p-8 lg:grid-cols-2" aria-labelledby="preco">
          <div><p className="text-sm font-semibold text-[#a3ff12]">VPS Estruturada</p><h2 id="preco" className="mt-3 text-4xl font-bold">R$ 297<span className="text-lg font-normal text-gray-400">/mês</span></h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-300">Para quem já sabe quais aplicações precisa colocar no ar e quer uma base configurada para operá-las.</p>
            <h3 className="mt-6 font-bold">Confirme antes de contratar:</h3>
            <ul className="mt-3 list-disc space-y-3 pl-5 text-gray-300"><li>vCPU, RAM, disco e custo da infraestrutura incluída.</li><li>Aplicações, acessos e migração que entram no escopo.</li><li>Destino e retenção dos backups, restauração e alertas.</li><li>Prazo de ativação, atendimento e condições de cancelamento.</li></ul>
            <p className="mt-5 text-sm text-gray-400">Não prometemos servidor “inquebrável”, segurança absoluta ou recuperação instantânea. Capacidade e prazos dependem do ambiente e do escopo confirmado.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-950 p-5 sm:p-6">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/15 p-4"><input type="checkbox" checked={support} onChange={e=>setSupport(e.target.checked)} className="mt-1 h-5 w-5 accent-lime-400" /><span><strong className="block">Adicionar suporte técnico</strong><span className="mt-2 block text-sm leading-relaxed text-gray-300">+ R$ 250/mês. Apoio com deploy e dúvidas do ambiente, conforme escopo e horários combinados. Não inclui desenvolvimento ilimitado.</span></span></label>
            <p aria-live="polite" aria-atomic="true" className="mt-6 text-xl font-bold">Total: R$ {total}/mês</p>
            <a href={vpsSupportUrl(support)} onClick={()=>track('vps-confirmar-configuracao',support?'com-suporte':'base')} className={`${button} mt-5 w-full`}>Quero confirmar minha configuração →</a>
            <p className="mt-3 text-sm text-gray-400">Abre uma conversa no WhatsApp. Preencha o que pretende rodar; não envie senhas.</p>
            <details className="mt-6 border-t border-white/10 pt-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold">Já confirmei o escopo. Quero ir ao checkout.</summary>
              <p className="my-4 text-sm text-gray-300">Confira configuração, recorrência e condições no atendimento e no checkout antes de concluir.</p>
              <button onClick={checkout} disabled={loading} className={`${button} w-full`}>{loading?'Abrindo checkout…':`Continuar · R$ ${total}/mês →`}</button>
              {error&&<p role="alert" className="mt-4 rounded-lg border border-red-400/40 p-3 text-sm text-red-200">{error}</p>}
            </details>
          </div>
        </section>
        <section className="py-12" aria-labelledby="decisao"><h2 id="decisao" className="text-3xl font-bold">O servidor está decidido. E a solução?</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-white/10 p-6"><h3 className="text-xl font-bold">Quero aprender e fazer por conta</h3><p className="mt-3 text-lg text-gray-300">A aula mostra a montagem da base para o CRM. Você assume a configuração e a operação.</p><a href="/aula-vps-crm-do-zero?utm_source=site&utm_medium=internal&utm_campaign=vps&utm_content=aprender" className="mt-4 inline-flex min-h-11 items-center text-[#a3ff12] underline">Assistir à aula gratuita →</a></article>
          <article className="rounded-xl border border-lime-400/25 bg-lime-400/5 p-6"><h3 className="text-xl font-bold">Preciso decidir o que implantar</h3><p className="mt-3 text-lg text-gray-300">Na Sessão de Arquitetura, definimos prioridade, escopo e integrações antes de contratar infraestrutura ou desenvolvimento.</p><a href="/sessao-de-arquitetura?utm_source=site&utm_medium=internal&utm_campaign=vps&utm_content=arquitetura" onClick={()=>track('vps-arquitetura','definir-escopo')} className="mt-4 inline-flex min-h-11 items-center text-[#a3ff12] underline">Conhecer a sessão · R$ 150 →</a></article>
        </div></section>
        <section className="border-t border-white/10 py-10"><h2 className="text-2xl font-bold">Infraestrutura não substitui implementação.</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">Construir sistemas, integrar o CRM à operação e revisar o processo comercial são trabalhos diferentes de configurar o servidor. Sprint e Implementação são definidos a partir do seu contexto, sem exigir que você compre tudo junto.</p></section>
      </div>
    </main><Footer />
  </>;
}
