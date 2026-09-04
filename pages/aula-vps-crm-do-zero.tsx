import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { trackCta, getStoredUtms } from './_app';

// Vídeo completo da aula, publicado via Nexus share (raw view — content-type
// video/mp4, compatível com <video src>). Mesmo padrão de
// pages/call-sobrevivencia-pos-ia.tsx: token fixo porque hoje é um único vídeo.
const VIDEO_SRC = 'https://nexus.workflowapi.com.br/api/shares/-r1VfIEHQ8ZUnm-LE1a6Jd7hKY9DWpShBALeFBG-ZRo/view';
const VIDEO_POSTER = 'https://nexus.workflowapi.com.br/api/shares/2ixI_7hUeoItjExBKmXEFWmlFwMswpZsP_xC1QQwJpQ/view';
const VIDEO_TITULO = 'Monte seu CRM do zero';
const VIDEO_SUBTITULO = 'Do servidor vazio ao Evo CRM no ar — VPS, Docker, DNS e Traefik, passo a passo.';
const SESSION_KEY = 'sb_aula_vps_crm_verificado';

// Próximo passo para quem terminou a aula: desafio de 21 dias, com origem
// própria para separar os cliques que vieram desta página de vídeo.
const DESAFIO_URL =
  'https://www.sistemabritto.com.br/desafio-monetizar-com-ia?utm_source=video&utm_medium=content&utm_campaign=desafio-monetizar-com-ia&utm_content=aula-vps-crm-do-zero';

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

/** CTA do Desafio — aparece depois do vídeo liberado. */
function DesafioCta() {
  return (
    <section
      aria-labelledby="cta-desafio"
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

        <h2 id="cta-desafio" className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
          Pare de só construir. Comece a monetizar.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          No Desafio Monetizar com IA, você usa o que aprendeu para encontrar um gargalo de
          alto valor, testar uma intervenção e começar a transformar valor em receita.
        </p>

        <a
          href={DESAFIO_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackCta('/aula-vps-crm-do-zero', 'conhecer-desafio', 'video-crm')}
          className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-green-400 px-7 py-3 font-heading font-bold text-black transition-colors duration-200 hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
        >
          <span>Conhecer o Desafio</span>
          <span aria-hidden="true">→</span>
        </a>

        <p className="mt-3 text-xs text-gray-500">21 dias · rastrear, testar e monetizar com IA</p>
      </div>
    </section>
  );
}

export default function AulaVpsCrmDoZero() {
  const [nome, setNome] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verificado, setVerificado] = useState(false);

  // Sessão do navegador, não persistente — mesmo racional de
  // call-sobrevivencia-pos-ia.tsx: reforçar o WhatsApp a cada nova sessão é
  // aceitável aqui e evita reconstruir um fluxo de auth completo pra uma
  // única página.
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1') {
      setVerificado(true);
    }
  }, []);

  const numeroCompleto = () => {
    const limpo = phoneNumber.replace(/[^0-9]/g, '');
    return limpo.startsWith('55') ? limpo : `55${limpo}`;
  };

  const handleSendOTP = async () => {
    const limpo = phoneNumber.replace(/[^0-9]/g, '');
    if (limpo.length < 10) {
      alert('Digite um WhatsApp válido com DDD.');
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: numeroCompleto(), name: nome || undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        alert(data.message || 'Não conseguimos enviar o código. Tente novamente.');
      }
    } catch (e) {
      console.error('OTP send failed:', e);
      alert('Erro ao enviar o código. Tente novamente.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      alert('Digite o código de 6 dígitos.');
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: numeroCompleto(), otp: otpCode }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Código inválido ou expirado.');
        return;
      }

      // Lead + deal no EvoCRM — best effort. Falhar aqui não pode travar
      // quem já provou o número por WhatsApp de assistir o vídeo.
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome || undefined,
          whatsapp: numeroCompleto(),
          source: 'aula-vps-crm-do-zero',
          utm: getStoredUtms(),
        }),
      }).catch((e) => console.error('[aula-vps-crm] lead create failed:', e));

      trackCta('/aula-vps-crm-do-zero', 'otp-verificado', 'unlock');
      sessionStorage.setItem(SESSION_KEY, '1');
      setVerificado(true);
    } catch (e) {
      console.error('OTP verify failed:', e);
      alert('Erro ao verificar o código. Tente novamente.');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <>
      <Meta
        title={`${VIDEO_TITULO} | Sistema Britto`}
        description="Confirme seu WhatsApp para assistir à aula completa."
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

            <div className="mt-10">
              <h2 className="mb-4 font-heading text-lg font-semibold text-white">
                O que você monta nessa aula
              </h2>
              <Etapas />
            </div>

            <div className="mt-10">
              <DesafioCta />
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
                  Confirme seu WhatsApp pra liberar o acesso à aula completa.
                </p>
              </div>

              {!otpSent ? (
                <>
                  <label htmlFor="nome" className="mb-2 block text-xs font-medium text-gray-400">
                    Seu nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className="mb-5 min-h-[48px] w-full rounded-lg border border-surface-700 bg-surface-800 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-green-400 focus:outline-none"
                  />
                  <PhoneInput
                    value={phoneNumber}
                    onChange={(v) => setPhoneNumber(v)}
                    accentColor="#4ADE80"
                    required
                  />
                  <button
                    onClick={handleSendOTP}
                    disabled={otpLoading || !phoneNumber}
                    className={`mt-5 flex min-h-[48px] w-full items-center justify-center gap-3 rounded-lg bg-whatsapp-500 px-6 py-3 font-heading font-bold text-black transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 ${
                      otpLoading || !phoneNumber
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:bg-green-600'
                    }`}
                  >
                    {otpLoading ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black"
                        />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-black" />
                        <span>Receber código</span>
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
                    Enviamos um código de 6 dígitos no seu WhatsApp. Sem spam.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">
                    Enviamos um código de 6 dígitos para{' '}
                    <span className="font-medium text-white">{phoneNumber}</span>
                  </p>
                  <label htmlFor="otp" className="sr-only">
                    Código de 6 dígitos
                  </label>
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="mb-4 min-h-[56px] w-full rounded-lg border border-surface-700 bg-surface-800 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white placeholder-gray-600 transition-colors focus:border-green-400 focus:outline-none"
                    maxLength={6}
                    autoFocus
                  />
                  <button
                    onClick={handleVerifyOTP}
                    disabled={otpLoading || otpCode.length !== 6}
                    className={`flex min-h-[48px] w-full items-center justify-center gap-3 rounded-lg bg-whatsapp-500 px-6 py-3 font-heading font-bold text-black transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 ${
                      otpLoading || otpCode.length !== 6
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:bg-green-600'
                    }`}
                  >
                    {otpLoading ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black"
                        />
                        <span>Verificando...</span>
                      </>
                    ) : (
                      <span>Assistir agora</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode('');
                    }}
                    className="mt-4 min-h-[44px] w-full text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                  >
                    ← Voltar e editar número
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
