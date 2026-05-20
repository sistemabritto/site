import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export async function getServerSideProps() {
  return { props: {} };
}

export default function Login() {
  const router = useRouter();
  const { next, redirect } = router.query;
  const target = (next as string) || (redirect as string) || '/';
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        console.error('Google login error:', error);
        alert('Erro ao fazer login com Google. Tente novamente.');
        setIsLoading(false);
      }
      // Se não houver erro, o redirect vai acontecer automaticamente
      // Não desativamos o loading imediatamente pois a página vai redesenhar
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Erro inesperado. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleWhatsApp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '5571999841612' }),
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Código OTP enviado ao WhatsApp');
      } else {
        console.error('OTP error:', data);
        alert('⚠️ Falha ao enviar OTP. Tente novamente.');
      }
    } catch (e) {
      console.error('OTP request failed:', e);
      alert('⚠️ Erro inesperado ao enviar OTP');
    } finally {
      setIsLoading(false);
    }
  };


  // If already authenticated, redirect immediately
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        router.replace(target);
      }
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
                {/* Google Logo */}
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
            onClick={handleWhatsApp}
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
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 flex-shrink-0" />
                <span>Entrar com WhatsApp</span>
              </>
            )}
          </button>

          <p className="mt-6 text-gray-500 text-xs">
            Ao continuar, você concorda com nossos <a href="/termos-de-uso" className="text-[#D4AF37] hover:underline">Termos de Uso</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
