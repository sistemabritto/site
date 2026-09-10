import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import { trackCta, getStoredUtms } from './_app';

// Vídeo completo da aula, publicado via Nexus share (raw view — content-type
// video/mp4, compatível com <video src>). Mesmo padrão de
// pages/call-sobrevivencia-pos-ia.tsx: token fixo porque hoje é um único vídeo.
const VIDEO_SRC = 'https://nexus.workflowapi.com.br/api/shares/-r1VfIEHQ8ZUnm-LE1a6Jd7hKY9DWpShBALeFBG-ZRo/view';
const VIDEO_POSTER = 'https://nexus.workflowapi.com.br/api/shares/2ixI_7hUeoItjExBKmXEFWmlFwMswpZsP_xC1QQwJpQ/view';
const VIDEO_TITULO = 'Monte seu CRM do zero';
const VIDEO_SUBTITULO = 'Do servidor vazio ao Evo CRM no ar — VPS, Docker, DNS e Traefik, passo a passo.';
const SESSION_KEY = 'sb_aula_vps_crm_verificado';

// Preserva origem da sessão; identifica a ponte comercial na chegada.
const ARQUITETURA_URL = '/sessao-de-arquitetura?utm_content=aula-crm-arquitetura-v1';

// Sem prazo de expiração nesta página — pedido do Felipe em 21/08/2026: é
// conteúdo/aula, não uma call com data de validade.

const ETAPAS = [
  'Comprar e subir a VPS do zero',
  'Rodar o Setup Orion e instalar o Docker Swarm',
  'Apontar o DNS e configurar o Traefik com SSL',
  'Subir o Evo CRM e criar sua primeira instância',
];

/** Passos numerados da aula — o que a pessoa leva ao assistir. */
function Etapas() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {ETAPAS.map((etapa, i) => (
        <li
          key={etapa}
          className="flex items-start gap-3 rounded-xl border border-surface-700 bg-surface-900 p-4"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-green-400/10 font-heading text-sm font-bold text-green-400"
          >
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-gray-300">{etapa}</span>
        </li>
      ))}
    </ol>
  );
}

/** Ponte comercial para donos: planejamento antes de implementar. */
function ArquiteturaCta() {
  return (
    <section
      aria-labelledby="cta-arquitetura"
      className="relative overflow-hidden rounded-2xl border border-green-400/30 bg-surface-900 p-6 sm:p-8"
    >
      {/* brilho decorativo — puramente visual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-green-400/10 blur-3xl"
      />

      <div className="relative">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-400">
          Próximo passo
        </p>

        <h2 id="cta-arquitetura" className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
          O CRM no ar é o começo. Agora organize o caminho até a venda.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          Na Sessão de Arquitetura, olhamos o processo da sua empresa: entrada dos contatos,
          atendimento, oportunidades e próximas ações. Você sai com prioridades, escopo
          e uma rota de aplicação antes de contratar implementação.
        </p>

        <a
          href={ARQUITETURA_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackCta('/aula-vps-crm-do-zero', 'conhecer-arquitetura', 'aula-crm-ponte-v1')}
          className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-green-400 px-7 py-3 font-heading font-bold text-black transition-colors duration-200 hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
        >
          <span>Ver a Sessão de Arquitetura</span>
          <span aria-hidden="true">→</span>
        </a>

        <p className="mt-3 text-xs text-gray-500">Sessão individual · planejamento · execução contratada separadamente</p>
      </div>
    </section>
  );
}

export default function AulaVpsCrmDoZero() {
  const [nome, setNome] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const [formError, setFormError] = useState('');

  // Convenience for free material, not an authentication credential.
  useEffect(() => {
    try {
      const until = Number(localStorage.getItem('sb_aula_crm_access_until'));
      if (until > Date.now() || sessionStorage.getItem(SESSION_KEY) === '1') setVerificado(true);
    } catch { /* Storage can be disabled; the form still works. */ }
  }, []);

  const handleCapture = async () => {
    if (otpLoading) return;
    const digits = phoneNumber.replace(/\D/g, '');
    const phone = digits.length === 10 || digits.length === 11 ? '55' + digits : digits;
    if (!nome.trim() || !/^55\d{10,11}$/.test(phone)) {
      setFormError('Informe seu nome e um WhatsApp brasileiro com DDD.');
      return;
    }
    setFormError('');
    setOtpLoading(true);
    try { trackCta('/aula-vps-crm-do-zero', 'cadastro-iniciado', 'formulario-v2'); } catch {}
    try {
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome.trim(), whatsapp: phone,
          source: 'aula-vps-crm-do-zero', utm: getStoredUtms() }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('save failed');
      // Never declare a phone verified: this is an unverified lead capture.
      setVerificado(true);
      try { localStorage.setItem('sb_aula_crm_access_until', String(Date.now() + 30 * 86400000)); } catch {}
      try { trackCta('/aula-vps-crm-do-zero', 'cadastro-salvo', 'unlock'); } catch {}
    } catch {
      setFormError('Não conseguimos salvar seu cadastro. Seus dados continuam aqui; tente novamente.');
      try { trackCta('/aula-vps-crm-do-zero', 'cadastro-erro', 'formulario-v2'); } catch {}
    } finally { setOtpLoading(false); }
  };


  return (
    <>
      <Meta
        title={`${VIDEO_TITULO} | Sistema Britto`}
        description="Acesse a aula gratuita com nome e WhatsApp, sem senha ou código de verificação."
        path="/aula-vps-crm-do-zero"
        noIndex={true}
      />
      <Navbar />

      <main className="min-h-screen bg-surface-950 px-4 py-16 text-white sm:py-20">
        {verificado ? (
          <div className="mx-auto max-w-4xl">
            <header className="mb-8">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                VPS · Docker · Traefik · Evo CRM
              </p>
              <h1 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                {VIDEO_TITULO}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
                {VIDEO_SUBTITULO}
              </p>
            </header>

            <video
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-2xl border border-surface-700 bg-black shadow-2xl shadow-green-400/5"
            />

            <div className="mt-6"><ArquiteturaCta /></div>

            <div className="mt-10">
              <h2 className="mb-4 font-heading text-lg font-semibold text-white">
                O que você monta nessa aula
              </h2>
              <Etapas />
            </div>


          </div>
        ) : (
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-surface-700 bg-surface-900 p-7 sm:p-8">
              <div className="mb-6 text-center">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                  Aula liberada
                </p>
                <h1 className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
                  {VIDEO_TITULO}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  Deixe seu nome e WhatsApp para assistir. Sem senha, sem esperar um código.
                </p>
              </div>

              <form onSubmit={(event) => { event.preventDefault(); void handleCapture(); }} aria-busy={otpLoading}>
                <label htmlFor="nome" className="mb-2 block text-sm text-gray-300">Seu nome</label>
                <input id="nome" autoComplete="name" required maxLength={100} value={nome}
                  onChange={event => setNome(event.target.value)}
                  className="mb-5 min-h-12 w-full rounded-lg border border-surface-700 bg-surface-800 px-4 py-3 text-white focus:outline focus:outline-2 focus:outline-green-400" />
                <PhoneInput value={phoneNumber} onChange={setPhoneNumber} accentColor="#4ADE80" required />
                {formError && <p role="alert" className="mt-4 rounded-lg border border-red-400/40 p-3 text-sm text-red-200">{formError}</p>}
                <button type="submit" disabled={otpLoading}
                  className="mt-5 min-h-12 w-full rounded-lg bg-[#a3ff12] px-5 py-3 font-bold text-black hover:bg-lime-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime-300 disabled:opacity-60">
                  {otpLoading ? 'Salvando seu acesso…' : 'Quero assistir à aula gratuita'}
                </button>
                <p className="mt-4 text-center text-sm leading-relaxed text-gray-400">Sem senha e sem código por WhatsApp. Usamos os dados para registrar seu interesse e dar continuidade ao atendimento. <a href="/politicas-de-privacidade" className="underline">Privacidade</a>.</p>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
