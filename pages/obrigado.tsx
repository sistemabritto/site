import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Produto de upsell (consultoria técnica)
const UPSELL_PRODUCT = 'prod_consultoria_tecnica_250';

export default function Obrigado() {
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'approved' | 'unknown'>('pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { status: qs } = router.query;
    if (qs === 'approved') setStatus('approved');
    else if (qs === 'pending') setStatus('pending');
    else setStatus('unknown');
  }, [router]);

  const handleUpsell = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: 'consultoria-tecnica-whatsapp',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error('Upsell error:', e);
    }
    setLoading(false);
  };

  const skipUpsell = () => {
    window.location.href = '/';
  };

  return (
    <>
      <Meta 
        title="Obrigado! — Sistema Britto"
        description="Seu pedido foi recebido com sucesso!"
        path="/obrigado"
      />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <Navbar />
        
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center reveal">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 mb-8">
              <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}

            {/* UPSell SECTION */}
            {status === 'approved' && (
              <div className="mt-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 rounded-3xl p-8 border border-[#D4AF37]/30">
                <h2 className="text-2xl font-bold text-white mb-4">
                  🚀 Potencialize seu resultado!
                </h2>
                <p className="text-gray-300 mb-6">
                  Adicione suporte técnico humano especializado via WhatsApp com SLA de 24h.
                  Configuração, integrações, troubleshooting — tudo incluso.
                </p>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-gray-400 text-lg line-through">R$ 250</span>
                  <span className="text-[#D4AF37] text-4xl font-bold">R$ 150</span>
                  <span className="text-gray-300 text-lg">/único</span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleUpsell}
                    disabled={loading}
                    className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Carregando...' : 'SIM! Quero potencializar meu resultado →'}
                  </button>
                  
                  <button
                    onClick={skipUpsell}
                    className="w-full glass-strong text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
                  >
                    Não, obrigado. Vou configurar sozinho.
                  </button>
                </div>

                <p className="text-gray-500 text-xs mt-4">
                  Oferta válida apenas nesta página. Após sair, não haverá mais disponibilidade.
                </p>
              </div>
            )}

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
