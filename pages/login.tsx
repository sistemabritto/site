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
    alert('Login via WhatsApp OTP ainda não implementado.');
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
      <Meta title="Login — Sistema Britto" description="Acesse sua conta via Google ou WhatsApp OTP" path="/login" />
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
        <div className="bg-[#111111] p-8 rounded-2xl border border-[#D4AF37]/20 text-center">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <button
            onClick={handleGoogle}
            className="bg-white text-black px-6 py-3 rounded-full font-bold mb-4 hover:bg-gray-200 transition"
          >
            Login com Google
          </button>
          <br />
          <button
            onClick={handleWhatsApp}
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold hover:bg-[#C5A028] transition"
          >
            Login com WhatsApp (OTP)
          </button>
          <p className="mt-4 text-gray-400">Depois do login será redirecionado para <strong>{target}</strong></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
