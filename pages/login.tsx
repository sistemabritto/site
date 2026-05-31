import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

// Dynamic import helper - only loads Supabase at runtime (browser), never at build time
async function getSupabase() {
  const mod = await import('../utils/supabaseClient');
  return mod.supabase;
}

export default function Login() {
  const router = useRouter();
  const { next, redirect } = router.query;
  const target = (next as string) || (redirect as string) || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.error('Google login error:', error);
        // Fallback: redirect manually to Supabase OAuth
        const supabaseUrl = 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
        const redirectUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
        window.location.href = redirectUrl;
      }
      // If no error, Supabase handles the redirect automatically
    } catch (err: any) {
      console.error('Unexpected error:', err);
      // Fallback: redirect manually
      const supabaseUrl = 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
      const redirectUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
      window.location.href = redirectUrl;
    }
  };

  const handleWhatsAppClick = () => {
    setShowPhoneModal(true);
    setOtpSent(false);
    setPhoneNumber('');
    setOtpCode('');
  };

  const [sentOtp, setSentOtp] = useState('');

  const handleSendOTP = async () => {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert('Digite um número válido com DDD.');
      return;
    }

    setOtpLoading(true);
    // If phone already has 55 country code prefix, don't add it again
    const fullNumber = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullNumber }),
      });
      const data = await res.json();
      if (data.success && data.otp) {
        setSentOtp(data.otp); // Store OTP for client-side verification
        setOtpSent(true);
      } else {
        console.error('OTP error:', data);
        alert('⚠️ Falha ao enviar OTP. Verifique o número e tente novamente.');
      }
    } catch (e) {
      console.error('OTP request failed:', e);
      alert('⚠️ Erro ao enviar OTP. Tente novamente.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      alert('Digite o código de 6 dígitos.');
      return;
    }

    // Client-side OTP verification (demo mode)
    if (otpCode === sentOtp) {
      setShowPhoneModal(false);
      // Use window.location for reliable redirect
      window.location.href = target;
    } else {
      alert('❌ Código inválido. Tente novamente.');
    }
  };

  // If already authenticated, redirect immediately
  useEffect(() => {
    getSupabase().then((supabase) => {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          router.replace(target);
        }
      });
    });
  }, [router, target]);

  return (
    <>
      <Meta title="Login — Sistema Britto" description="Acesse sua conta via Google ou WhatsApp" path="/login" />
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
        <div className="bg-[#111111] p-8 rounded-2xl border border-[#D4AF37]/20 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2">Entrar</h1>
          <p className="text-gray-400 text-sm mb-8">Acesse sua conta</p>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogle}
            disabled={isLoading}
            className={`
              w-full px-6 py-3 rounded-lg font-medium mb-4 
              flex items-center justify-center gap-3 
              border border-gray-300 bg-white text-gray-700
              transition-all duration-200 
              ${!isLoading ? 'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0' : ''}
              ${isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.6 5.6 0 0 1-2.43 3.68v3.07h3.94c2.3-2.12 3.63-5.24 3.63-8.76z" fill="#4285F4"/>
                  <path d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.94-3.07a6.36 6.36 0 0 1-9.4-3.24H2.17v3.08C4.15 21.7 7.78 24 12 24z" fill="#34A853"/>
                  <path d="M5.59 14.78a7.64 7.64 0 0 1 0-5.56L2.17 6.14C.8 8.08 0 10.3 0 12.72c0 2.42.8 4.64 2.17 6.57l3.42-2.66z" fill="#FBBC05"/>
                  <path d="M12 4.9a7.7 7.7 0 0 1 5.44 2.13l3.86-3.86A12.53 12.53 0 0 0 12 0C7.78 0 4.15 2.3 2.17 5.59l3.42 2.66A7.68 7.68 0 0 1 12 4.9z" fill="#EA4335"/>
                </svg>
                <span>Continuar com Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-gray-500 text-sm">ou</span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            disabled={isLoading}
            className={`
              w-full px-6 py-3 rounded-lg font-medium 
              flex items-center justify-center gap-3 
              bg-[#25D366] text-white
              transition-all duration-200 
              ${!isLoading ? 'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0' : ''}
              ${isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 flex-shrink-0" />
            <span>Entrar com WhatsApp</span>
          </button>

          <p className="mt-6 text-gray-500 text-xs">
            Ao continuar, você concorda com nossos <a href="/termos-de-uso" className="text-[#D4AF37] hover:underline">Termos de Uso</a>.
          </p>
        </div>
      </main>

      {/* WhatsApp Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] p-6 rounded-2xl border border-[#D4AF37]/20 max-w-sm w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {otpSent ? 'Digite o código' : 'Seu WhatsApp'}
              </h2>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="text-gray-400 hover:text-white transition text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {!otpSent ? (
              <>
                <PhoneInput
                  value={phoneNumber}
                  onChange={(v) => setPhoneNumber(v)}
                  accentColor="#D4AF37"
                  required
                />

                {/* Receive Code Button */}
                <button
                  onClick={handleSendOTP}
                  disabled={otpLoading || !phoneNumber}
                  className={`
                    w-full px-6 py-3 rounded-lg font-medium 
                    flex items-center justify-center gap-3 
                    bg-[#25D366] text-white
                    transition-all duration-200 
                    ${otpLoading || !phoneNumber ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1ebe57]'}
                  `}
                >
                  {otpLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 flex-shrink-0" />
                      <span>Receber código</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-4 text-left">
                    Enviamos um código de 6 dígitos para <span className="text-white font-medium">+55 {phoneNumber}</span>
                  </p>
                  <label className="block text-gray-400 text-sm mb-2 text-left">Código</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-[0.5em] placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition"
                    maxLength={6}
                    autoFocus
                  />
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOTP}
                  disabled={otpLoading || otpCode.length !== 6}
                  className={`
                    w-full px-6 py-3 rounded-lg font-medium 
                    flex items-center justify-center gap-3 
                    bg-[#25D366] text-white
                    transition-all duration-200 
                    ${otpLoading || otpCode.length !== 6 ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1ebe57]'}
                  `}
                >
                  {otpLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Entrar</span>
                  )}
                </button>

                {/* Resend */}
                <button
                  onClick={() => { setOtpSent(false); setOtpCode(''); }}
                  className="mt-4 text-gray-400 text-sm hover:text-white transition"
                >
                  ← Voltar e editar número
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
