import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { trackCta } from './_app';

// Vídeo completo da call, publicado via Nexus share (raw view — content-type
// video/mp4, compatível com <video src>). Token fixo porque hoje é um único
// vídeo; se isso virar recorrente, o caminho certo é receber o token por
// query param ou por um registro no Supabase, não hardcode por vídeo novo.
const VIDEO_SRC = 'https://nexus.workflowapi.com.br/api/shares/y-mt5gH2iVv3NQxlRa0glP_SMwWdKS7adO21ISdUjLw/view';
const VIDEO_POSTER = 'https://nexus.workflowapi.com.br/api/shares/EJjnZ8cv3PSmJLzjzZ-SUwdb47UcQaEPqMDuhiGUFEE/view';
const VIDEO_TITULO = 'Call de Sobrevivência pós-IA';
const SESSION_KEY = 'sb_video_verificado';

// Prazo pedido pelo Felipe em 30/07/2026: acesso encerra terça 04/08/2026 às
// 23:59 (horário de Brasília). Estendido pelo Felipe em 15/08/2026 até
// segunda-feira 31/08/2026 às 23:59, pra dar tempo do fluxo de OTP
// funcionar de ponta a ponta antes do prazo real fechar. new Date com
// offset explícito -03:00 evita depender do timezone do servidor de
// build/render.
const PRAZO_FINAL = new Date('2026-08-31T23:59:00-03:00');

// Depois de 30min assistidos o CTA de checkout aparece — pedido do Felipe,
// mesmo link usado no botão "Já decidiu?" de pages/sistema.tsx.
const SEGUNDOS_PARA_CTA = 30 * 60;

const RESUMO_URL = 'https://docs.google.com/document/d/17Yr60Ri_5pbc29-dTNUbAS6B219jJuHL7SJcQlgylWc/edit?usp=sharing';
const APRESENTACAO_URL = 'https://nexus.workflowapi.com.br/share/SaDmbburXhBY6GWH-pZTYs3zFJvwNVB0mP7k9CUgEx0';

function useContagemRegressiva(prazo: Date) {
  const [restante, setRestante] = useState(() => prazo.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRestante(prazo.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [prazo]);
  return restante;
}

function formatarContagem(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const dias = Math.floor(total / 86400);
  const horas = Math.floor((total % 86400) / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  const par = (n: number) => String(n).padStart(2, '0');
  return dias > 0
    ? `${dias}d ${par(horas)}h ${par(minutos)}m ${par(segundos)}s`
    : `${par(horas)}h ${par(minutos)}m ${par(segundos)}s`;
}

export default function VideoCompleto() {
  const [nome, setNome] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);

  const restanteMs = useContagemRegressiva(PRAZO_FINAL);
  const expirado = restanteMs <= 0;

  // Sessão do navegador, não persistente — reforçar o WhatsApp a cada nova
  // sessão é aceitável aqui (o vídeo não é sensível o bastante pra justificar
  // um sistema de sessão assinada só pra isso) e evita reconstruir um fluxo
  // de auth completo pra uma única página.
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1') {
      setVerificado(true);
    }
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!mostrarCheckout && e.currentTarget.currentTime >= SEGUNDOS_PARA_CTA) {
      setMostrarCheckout(true);
      trackCta('/call-sobrevivencia-pos-ia', 'checkout-liberado-30min', 'video');
    }
  };

  const irParaCheckout = () => {
    trackCta('/call-sobrevivencia-pos-ia', 'PAGAR R$147 AGORA', 'pos-video');
    window.location.href = `/api/abacatepay/checkout/sistema${typeof window !== 'undefined' ? window.location.search : ''}`;
  };

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
          source: 'video-completo',
        }),
      }).catch((e) => console.error('[video] lead create failed:', e));

      trackCta('/call-sobrevivencia-pos-ia', 'otp-verificado', 'unlock');
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
        description="Confirme seu WhatsApp para assistir ao vídeo completo."
        path="/call-sobrevivencia-pos-ia"
        noIndex={true}
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] text-white px-4 py-20">
        {!expirado && (
          <div className="max-w-4xl mx-auto mb-6 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-3 text-center">
            <span className="text-sm text-gray-300">Acesso disponível por mais </span>
            <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">{formatarContagem(restanteMs)}</span>
          </div>
        )}

        {expirado ? (
          <div className="max-w-md mx-auto bg-[#111111] p-8 rounded-2xl border border-[#D4AF37]/20 text-center">
            <h1 className="text-2xl font-bold mb-2">O prazo pra assistir acabou</h1>
            <p className="text-gray-400 text-sm">
              O acesso a este vídeo encerrou em 31/08/2026. Fala com a gente no WhatsApp se quiser saber os próximos passos.
            </p>
            <a
              href="https://sistemabritto.com.br/whatsapp"
              className="mt-6 inline-block bg-[#25D366] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#1ebe57] transition"
            >
              Falar no WhatsApp
            </a>
          </div>
        ) : verificado ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">{VIDEO_TITULO}</h1>
            <video
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              controls
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              className="w-full rounded-2xl border border-[#D4AF37]/20 bg-black"
            />

            {mostrarCheckout && (
              <div className="mt-6 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-6 text-center">
                <p className="text-white font-medium mb-1">Curtindo o conteúdo?</p>
                <p className="text-gray-400 text-sm mb-4">
                  A call de 1h que produz o PRD do seu projeto — R$ 147, abatidos se fecharmos.
                </p>
                <button
                  onClick={irParaCheckout}
                  className="bg-[#25D366] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#1ebe57] transition"
                >
                  Pagar R$ 147 agora →
                </button>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-[#21262d] bg-[#111111] p-6">
              <h2 className="text-lg font-semibold mb-4">Materiais da call</h2>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href={RESUMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCta('/call-sobrevivencia-pos-ia', 'resumo-gemini', 'materiais')}
                  className="flex-1 text-center bg-[#1a1a1a] border border-gray-700 hover:border-[#D4AF37] text-white px-5 py-3 rounded-lg font-medium transition"
                >
                  📄 Resumo da reunião
                </a>
                <a
                  href={APRESENTACAO_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCta('/call-sobrevivencia-pos-ia', 'apresentacao', 'materiais')}
                  className="flex-1 text-center bg-[#1a1a1a] border border-gray-700 hover:border-[#D4AF37] text-white px-5 py-3 rounded-lg font-medium transition"
                >
                  📊 Apresentação
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Ah, e um spoiler: vem uma oferta exclusiva pra quem tá no grupo, vale muito a pena ficar de olho 👀
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-[#111111] p-8 rounded-2xl border border-[#D4AF37]/20 text-center">
            <h1 className="text-2xl font-bold mb-2">{VIDEO_TITULO}</h1>
            <p className="text-gray-400 text-sm mb-8">
              Confirme seu WhatsApp pra liberar o acesso ao vídeo completo.
            </p>

            {!otpSent ? (
              <>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition mb-4"
                />
                <PhoneInput
                  value={phoneNumber}
                  onChange={(v) => setPhoneNumber(v)}
                  accentColor="#D4AF37"
                  required
                />
                <button
                  onClick={handleSendOTP}
                  disabled={otpLoading || !phoneNumber}
                  className={`
                    w-full px-6 py-3 rounded-lg font-medium mt-4
                    flex items-center justify-center gap-3
                    bg-[#25D366] text-black transition-all duration-200
                    ${otpLoading || !phoneNumber ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1ebe57]'}
                  `}
                >
                  {otpLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="w-5 h-5 flex-shrink-0 text-black" />
                      <span>Receber código</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-sm mb-4 text-left">
                  Enviamos um código de 6 dígitos para{' '}
                  <span className="text-white font-medium">{phoneNumber}</span>
                </p>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-[0.5em] placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition mb-4"
                  maxLength={6}
                  autoFocus
                />
                <button
                  onClick={handleVerifyOTP}
                  disabled={otpLoading || otpCode.length !== 6}
                  className={`
                    w-full px-6 py-3 rounded-lg font-medium
                    flex items-center justify-center gap-3
                    bg-[#25D366] text-black transition-all duration-200
                    ${otpLoading || otpCode.length !== 6 ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1ebe57]'}
                  `}
                >
                  {otpLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Assistir agora</span>
                  )}
                </button>
                <button
                  onClick={() => { setOtpSent(false); setOtpCode(''); }}
                  className="mt-4 text-gray-400 text-sm hover:text-white transition"
                >
                  ← Voltar e editar número
                </button>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
