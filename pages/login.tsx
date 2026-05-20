import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const router = useRouter();
  const { next, redirect } = router.query;
  const target = (next as string) || (redirect as string) || '/';

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Google login error:', error);
  };

  const handleWhatsApp = () => {
    // TODO: integrate Evolution API OTP flow
    alert('Login via WhatsApp — em breve.');
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
          <p className="text-gray-400 text-sm mb-8">Escolha como quer acessar sua conta</p>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogle}
            className="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-medium mb-4 hover:bg-gray-100 transition flex items-center justify-center gap-3 border border-gray-300"
          >
            {/* Google "G" Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path 
                fill="#4285F4" 
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.6 5.6 0 0 1-2.43 3.68v3.07h3.94c2.3-2.12 3.63-5.24 3.63-8.76z"
              />
              <path 
                fill="#34A853" 
                d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.94-3.07a6.36 6.36 0 0 1-9.4-3.24H2.17v3.08C4.15 21.7 7.78 24 12 24z"
              />
              <path 
                fill="#FBBC05" 
                d="M5.59 14.78a7.64 7.64 0 0 1 0-5.56L2.17 6.14C.8 8.08 0 10.3 0 12.72c0 2.42.8 4.64 2.17 6.57l3.42-2.66z"
              />
              <path 
                fill="#EA4335" 
                d="M12 4.9a7.7 7.7 0 0 1 5.44 2.13l3.86-3.86A12.53 12.53 0 0 0 12 0C7.78 0 4.15 2.3 2.17 5.59l3.42 2.66A7.68 7.68 0 0 1 12 4.9z"
              />
            </svg>
            <span>Continuar com Google</span>
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
            className="w-full bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1ebe57] transition flex items-center justify-center gap-3"
          >
            {/* WhatsApp Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path 
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.965-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.373-.025-.52-.075-.149-.669-1.612-.917-2.21-.24-.58-.48-.5-.669-.51l-.57-.01c-.198 0-.52.074-.793.372-.273.298-1.044 1.025-1.044 2.494 0 1.468 1.069 2.886 1.214 3.082.149.197 2.104 3.21 5.097 4.512.709.305 1.26.488 1.69.624.712.226 1.348.195 1.854.12.567-.08 1.755-.718 2.002-1.41.248-.692.248-1.284.173-1.41-.075-.124-.272-.198-.57-.347m-4.945 5.836c-3.3 0-6.002-2.703-6.002-6.002 0-3.299 2.702-6.001 6.002-6.001 3.299 0 6.001 2.702 6.001 6.001 0 3.299-2.702 6.002-6.001 6.002zm0-13.503c-4.132 0-7.501 3.369-7.501 7.501s3.369 7.501 7.501 7.501 7.501-3.369 7.501-7.501-3.369-7.501-7.501-7.501z"
              />
            </svg>
            <span>Entrar com WhatsApp</span>
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
