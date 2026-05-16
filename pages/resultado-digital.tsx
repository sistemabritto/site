import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';

export default function ResultadoDigital() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answersParam = router.query.answers as string;
    let parsedAnswers: Record<string, string> = {};

    if (answersParam) {
      try {
        parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
      } catch {
        // ignore
      }
    }
    setAnswers(parsedAnswers);

    // Recuperar dados do cliente
    if (typeof window !== 'undefined') {
      const storedCustomer = sessionStorage.getItem('qualificacao_customer');
      if (storedCustomer) {
        try {
          setCustomerData(JSON.parse(storedCustomer));
        } catch {
          // ignore
        }
      }
    }
    setLoading(false);
  }, [router.query]);

  const handleWhatsAppContact = () => {
    const d1 = answers['d1'] || '';
    const d2 = answers['d2'] || '';
    const d3 = answers['d3'] || '';
    
    let message = '';
    
    if (d1 === 'infra' || d1 === 'ambos') {
      message = `Olá! Fiz a qualificação DIGITAL e quero cuidar da minha INFRAESTRUTURA.\n\nObjetivo: ${d1}\nProblema: ${d2}\nOrçamento: ${d3}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    } else if (d1 === 'saas') {
      message = `Olá! Fiz a qualificação DIGITAL e quero CRIAR UM SAAS/PRODUTO DIGITAL.\n\nObjetivo: ${d1}\nProblema: ${d2}\nOrçamento: ${d3}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    } else {
      message = `Olá! Fiz a qualificação DIGITAL e preciso de um orçamento sob medida.\n\nResumo: ${d1} - ${d2}\nOrçamento: ${d3}\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`;
    }

    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/5511914088571?text=${encoded}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-white">Analisando seu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta 
        title="Soluções Digitais Sob Medida — Sistema Britto"
        description="Infraestrutura e SaaS sob encomenda para escalar seu negócio digital."
        path="/resultado-digital"
      />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        <div className="max-w-3xl mx-auto px-4 py-20">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Seu perfil é para soluções sob medida
            </h1>
            <p className="text-gray-300 text-lg">
              Você precisa de infraestrutura robusta ou um produto digital próprio.
            </p>
          </div>

          {/* Card Principal */}
          <div className="bg-[#111111] rounded-3xl p-8 sm:p-10 border border-green-500/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              O que a gente faz pra você:
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🔧</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Infraestrutura & DevOps</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Servidor próprio, Docker, Deploy automático, APIs, Monitoramento, Segurança.
                      Para quem não quer depender de sorte e precisa de estabilidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💻</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">SaaS Sob Encomenda</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Do zero ao lançamento. Ideia, validação, MVP, escala.
                      Você é dono do código, da marca e do lucro.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30 mb-8">
              <p className="text-green-400 font-bold text-lg mb-2">
                Por que isso é pra você?
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Seu qualificação indicou que você precisa de algo além do pronto. 
                Quer controle total, white label, ou criar um ativo digital que possa vender depois.
              </p>
            </div>

            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-500 hover:bg-green-600 text-black py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              FALAR COM ESPECIALISTA AGORA →
            </button>

            <p className="text-gray-500 text-sm text-center mt-4">
              Orçamento sob medida em até 24h. Sem compromisso.
            </p>
          </div>

          {/* Cases */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Quem já fez com a gente:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111111] rounded-2xl p-6 border border-white/10">
                <div className="text-green-400 font-bold mb-2">SaaS de Áudio</div>
                <p className="text-gray-300 text-sm">
                  Do zero ao faturamento em 30 dias.
                  Infra própria, pagamentos recorrentes, escala.
                </p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-white/10">
                <div className="text-green-400 font-bold mb-2">Infra para Escritório</div>
                <p className="text-gray-300 text-sm">
                  Infraestrutura completa. 
                  Servidor próprio, backup, segurança, zero downtime.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
