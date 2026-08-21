import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { trackCta } from './_app';

// Vídeo completo da aula, publicado via Nexus share (raw view — content-type
// video/mp4, compatível com <video src>). Mesmo padrão de
// pages/call-sobrevivencia-pos-ia.tsx: token fixo porque hoje é um único
// vídeo.
const VIDEO_SRC = 'https://nexus.workflowapi.com.br/api/shares/-r1VfIEHQ8ZUnm-LE1a6Jd7hKY9DWpShBALeFBG-ZRo/view';
const VIDEO_POSTER = 'https://nexus.workflowapi.com.br/api/shares/2ixI_7hUeoItjExBKmXEFWmlFwMswpZsP_xC1QQwJpQ/view';
const VIDEO_TITULO = 'Monte seu CRM do zero (VPS + Docker + Evo CRM)';
const SESSION_KEY = 'sb_aula_vps_crm_verificado';

// Sem prazo de expiração nesta página — pedido do Felipe em 21/08/2026:
// é conteúdo/aula, não uma call com data de validade, então fica sempre
// disponível pra quem confirmar o WhatsApp.

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
      <main className="min-h-screen bg-[#0a0a0a] text-white px-4 py-20">
        {verificado ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">{VIDEO_TITULO}</h1>
            <video
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-2xl border border-[#D4AF37]/20 bg-black"
            />

            <div className="mt-8 rounded-2xl border border-[#21262d] bg-[#111111] p-6">
              <h2 className="text-lg font-semibold mb-2">Sobre essa aula</h2>
              <p className="text-gray-400 text-sm">
                Passo a passo completo: comprar a VPS, instalar o Setup Orion, configurar
                DNS e Traefik, e subir seu próprio Evo CRM do zero.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-[#111111] p-8 rounded-2xl border border-[#D4AF37]/20 text-center">
            <h1 className="text-2xl font-bold mb-2">{VIDEO_TITULO}</h1>
            <p className="text-gray-400 text-sm mb-8">
              Confirme seu WhatsApp pra liberar o acesso à aula completa.
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
