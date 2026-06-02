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
          productId: UPSELL_PRODUCT,
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
      noIndex={true}
      />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <Navbar />
        
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center reveal">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-500/20 border border-green-500/30 mb-8">
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

            {/* Redes Sociais */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-gray-400 text-sm">Siga a Sistema Britto</p>
              <div className="flex items-center gap-5">
                <a
                  href="https://instagram.com/sistemabritto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-500 transition-colors transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href="https://youtube.com/@sistemabritto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-red-500 transition-colors transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/company/sistema-britto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a
                  href="https://github.com/sistemabritto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
