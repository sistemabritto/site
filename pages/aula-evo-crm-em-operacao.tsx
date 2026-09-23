import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getStoredUtms, trackCta } from './_app';

const PAGE = '/aula-evo-crm-em-operacao';
const FREE_CLASS = '/aula-vps-crm-do-zero';

const passos = [
  ['01', 'Entrada', 'Criar uma oportunidade de teste a partir de um canal de entrada.'],
  ['02', 'Dono', 'Definir a etapa e quem assume o próximo contato.'],
  ['03', 'Retorno', 'Registrar a próxima ação e conferir se o acompanhamento ficou visível.'],
];

export default function AulaEvoCrmEmOperacao() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const registerInterest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    setError('');
    setSaving(true);
    try {
      trackCta(PAGE, 'interesse-aula-crm', 'formulario-pre-lancamento');
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          source: 'aula-evo-crm-em-operacao-interesse',
          utm: getStoredUtms(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('interest_save_failed');
      setSaved(true);
      trackCta(PAGE, 'interesse-aula-crm-salvo', 'formulario-pre-lancamento');
    } catch {
      setError('Não conseguimos salvar seu interesse agora. Seus dados continuam no formulário; tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return <>
    <Meta
      title="Evo CRM em operação | Aula prática · Sistema Britto"
      description="Continuação prática da aula gratuita de instalação: entrada, responsável e retorno de uma oportunidade real no Evo CRM. Primeira edição por R$ 29."
      path={PAGE}
      noIndex
    />
    <Navbar />
    <main className="min-h-screen bg-surface-950 px-4 pb-20 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <header className="grid gap-9 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#a3ff12]">Aula prática 01 · Evo CRM</p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">O CRM está no ar. Agora faça uma oportunidade andar.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">Na continuação da aula de instalação, eu mostro na tela como organizar a entrada de um contato, definir quem assume e marcar o próximo retorno no Evo CRM.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="rounded-full border border-[#a3ff12]/40 bg-[#a3ff12]/10 px-4 py-2 font-bold text-[#c4ff72]">Primeira edição · R$ 29</span>
              <span>Aula nova, gravada em tela</span>
            </div>
          </div>
          <aside className="rounded-2xl border border-[#a3ff12]/30 bg-surface-900 p-6 sm:p-8" aria-label="Disponibilidade da aula">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a3ff12]">Em preparação</p>
            <h2 className="mt-3 font-heading text-2xl font-bold">Receba o aviso quando a aula abrir.</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">O vídeo novo, o checklist e a entrega ainda estão sendo preparados. Deixe seu e-mail para saber quando a compra estiver disponível.</p>
            {saved ? (
              <p role="status" className="mt-6 rounded-xl border border-[#a3ff12]/40 bg-[#a3ff12]/10 p-4 text-sm font-semibold text-[#c4ff72]">Interesse registrado. Vamos avisar quando a aula estiver pronta.</p>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={registerInterest} aria-busy={saving}>
                <div><label htmlFor="aula-crm-name" className="mb-2 block text-sm font-semibold">Seu nome</label><input id="aula-crm-name" name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/20 bg-surface-800 px-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
                <div><label htmlFor="aula-crm-email" className="mb-2 block text-sm font-semibold">Seu e-mail</label><input id="aula-crm-email" name="email" type="email" autoComplete="email" required maxLength={200} value={email} onChange={event => setEmail(event.target.value)} className="min-h-12 w-full rounded-xl border border-white/20 bg-surface-800 px-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3ff12]" /></div>
                {error && <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
                <button type="submit" disabled={saving} className="min-h-12 w-full rounded-xl bg-[#a3ff12] px-5 py-3 font-bold text-black transition hover:bg-[#c4ff72] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#a3ff12] disabled:opacity-60">{saving ? 'Registrando…' : 'Avisar quando a aula abrir'}</button>
                <p className="text-xs leading-relaxed text-gray-400">Usaremos seu contato para avisar sobre esta aula e dar continuidade ao atendimento. <Link href="/politicas-de-privacidade" className="underline hover:text-white">Privacidade</Link>.</p>
              </form>
            )}
          </aside>
        </header>

        <section aria-labelledby="resultado" className="py-12">
          <h2 id="resultado" className="font-heading text-3xl font-bold">O que você vai colocar para funcionar</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{passos.map(([number, title, description]) => <article key={number} className="rounded-2xl border border-white/10 bg-surface-900 p-6"><span className="font-heading text-sm font-bold text-[#a3ff12]">{number}</span><h3 className="mt-3 font-heading text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-300">{description}</p></article>)}</div>
          <p className="mt-5 text-sm leading-relaxed text-gray-400">A aula acompanha um checklist de verificação e uma configuração de exemplo para você adaptar. Evo CRM instalado e acesso de configuração são pré-requisitos; VPS e outras ferramentas são cobradas à parte quando usadas.</p>
        </section>

        <section aria-labelledby="antes" className="rounded-2xl border border-white/10 bg-surface-900 p-6 sm:p-8">
          <h2 id="antes" className="font-heading text-2xl font-bold">Ainda não instalou o Evo CRM?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">Assista primeiro à aula gratuita de instalação. Ela vai da VPS vazia até o CRM no ar; esta nova aula começa no passo seguinte.</p>
          <a href={FREE_CLASS} onClick={() => trackCta(PAGE, 'aula-gratuita-instalacao', 'pre-requisito')} className="mt-5 inline-flex min-h-12 items-center rounded-xl border border-[#a3ff12]/50 px-5 py-3 font-bold text-[#c4ff72] transition hover:bg-[#a3ff12]/10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#a3ff12]">Assistir à instalação gratuita →</a>
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
