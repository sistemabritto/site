import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Obrigado() {
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'approved' | 'unknown'>('pending');

  useEffect(() => {
    // Verificar status do pagamento via query params
    const { status: qs } = router.query;
    if (qs === 'approved') setStatus('approved');
    else if (qs === 'pending') setStatus('pending');
    else setStatus('unknown');
  }, [router]);

  return (
    <>
      <Meta 
        title="Obrigado! — Sistema Britto"
        description="Seu pedido foi recebido com sucesso!"
        path="/obrigado"
      />
      
      <main className="min-h-screen bg-surface-950" style={{ color: '#ffffff' }}>
        <Navbar />
        
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center reveal">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-500/20 border border-gold-500/30 mb-8">
              <svg className="w-10 h-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading text-white mb-6 font-bold">
              {status === 'approved' ? '🎉 Pagamento Aprovado!' : 'Pedido Recebido!'}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {status === 'approved' 
                ? 'Seu plano foi ativado com sucesso! Em breve um de nossos especialistas entrará em contato para as boas-vindas.'
                : 'Recebemos seu pedido! Assim que o pagamento for confirmado, entraremos em contato.'}
            </p>

            {status === 'pending' && (
              <div className="bg-surface-900 rounded-2xl p-6 border border-white/10 mb-8">
                <p className="text-gray-400 text-sm mb-4">
                  Aguardando confirmação do pagamento...
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <a
                href="https://wa.me/5511914088571?text=Olá!%20Acabei%20de%20assinar%20meu%20plano%20e%20gostaria%20de%20iniciar%20o%20onboarding"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-surface-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/25"
              >
                Iniciar Onboarding →
              </a>

              <div className="block">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
                >
                  ← Voltar ao início
                </a>
              </div>
            </div>

            <div className="mt-12 p-6 bg-surface-900/50 rounded-2xl border border-white/10">
              <h3 className="text-white font-bold mb-3">Próximos passos:</h3>
              <ol className="text-left text-gray-300 text-sm space-y-2">
                <li>1. Você receberá um e-mail de confirmação</li>
                <li>2. Nossa equipe entrará em contato em até 24h</li>
                <li>3. Sessão de onboarding para configurar tudo</li>
                <li>4. Ativação do seu agente de IA</li>
              </ol>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
