import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import PhoneInput from '../components/PhoneInput';

const features = [
  { icon: '🎯', title: 'Qualificação automática de leads', desc: 'IA faz perguntas-chave, classifica por interesse e envia pro CRM já segmentado.' },
  { icon: '📅', title: 'Agendamento 24h', desc: 'Cliente marca, remarca e cancela sozinho. Sem erro humano, sem retrabalho.' },
  { icon: '🔄', title: 'Reativação de leads dormentes', desc: 'Recupera leads parados há semanas com mensagens personalizadas e ofertas certas.' },
  { icon: '📊', title: 'CRM integrado nativamente', desc: 'Pipedrive, Sticky, RD Station — tudo sincronizado em tempo real, sem digitação.' },
  { icon: '👥', title: 'Multi-atendentes com IA assistida', desc: 'Seu time humano assume quando precisa, com histórico completo e sugestões de resposta.' },
  { icon: '⚡', title: 'Resposta em <1 segundo', desc: 'Lead não espera. Seu WhatsApp responde na hora, a qualquer horário.' },
];

const cases = [
  { name: 'Clínica de Odontologia', result: '3x mais consultas agendadas', desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma automaticamente.' },
  { name: 'Estúdio de Pilates', result: '20h/semana economizadas', desc: 'Antes 3h/dia no WhatsApp marcando e remarcando. Hoje a IA faz tudo sozinha.' },
  { name: 'Delivery', result: '3x mais pedidos, mesma equipe', desc: 'Do pedido ao delivery, tudo automático. Cliente elogia a velocidade.' },
];

export default function WhatsApp() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [orderBump, setOrderBump] = useState(false);

  const handleSubmit = async () => {
  if (!email) return;
 
  // Salvar dados no sessionStorage
  if (typeof window !== 'undefined') {
  sessionStorage.setItem('qualificacao_customer', JSON.stringify({ name, email, whatsapp }));
  }
 
  // Salvar lead no CRM
  try {
  await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  name,
  email,
  whatsapp,
  source: 'whatsapp-landing',
  orderBump,
  utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
  utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
  utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
  }),
  });
  } catch (e) {
  console.error('Lead save error:', e);
  }
    
    setSubmitted(true);
    
    // Redirecionar pro checkout depois de 1.5s
    setTimeout(() => {
      handleCheckout();
    }, 1500);
  };

  const handleCheckout = async () => {
    setLoading(true);
    const productId = orderBump ? 'whatsapp-ia-combo-consultoria' : 'whatsapp-ia-basico';
    try {
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId,
          customer: {
          email,
          name: name || email.split('@')[0],
          cellphone: whatsapp || email,
          },
        }),
      });
      const data = await res.json();
      console.log('[Checkout Response]', data);
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL');
      }
    } catch (err) {
      console.error('[Checkout Error]', err);
      const NL = '%0A';
      const msg = encodeURIComponent(
      `🟢 *Quero o WhatsApp + IA*${NL}${NL}` +
      `———${NL}` +
      `📧 ${email || '—'}`
      );
      window.location.href = `https://wa.me/5511914088571?text=${msg}`;
    }
  };

  const openCheckout = () => {
    setShowModal(true);
  };

  return (
    <>
      <Meta 
        title="WhatsApp + IA — Sistema Britto"
        description="Seu WhatsApp como central comercial. IA que qualifica, agenda, vende e reativa leads 24h. R$ 297/mês. Sem fidelidade."
        path="/whatsapp"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL EMAIL + WHATSAPP + ORDER BUMP ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
              {!submitted ? (
                <>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                  >×</button>
                  
                  <div className="text-center mb-6">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quase lá!</h3>
                  <p className="text-gray-300 text-sm">Preencha seus dados para ativar o WhatsApp IA.</p>
                  </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                <div>
                <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" required />
                </div>
                <PhoneInput value={whatsapp} onChange={(v) => setWhatsapp(v)} accentColor="#22C55E" required />

                    {/* ORDER BUMP */}
 <div 
 className={`rounded-xl p-4 cursor-pointer transition-all border-2 ${
 orderBump 
 ? 'bg-[#D4AF37]/10 border-[#D4AF37]' 
 : 'bg-[#0a0a0a] border-white/10 hover:border-[#D4AF37]/50'
 }`}
 onClick={() => setOrderBump(!orderBump)}
 >
 <div className="flex items-start gap-3">
 <div className="mt-0.5">
 <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
 orderBump 
 ? 'bg-[#D4AF37] border-[#D4AF37]' 
 : 'border-gray-500'
 }`}>
 {orderBump && <span className="text-black font-bold text-xs">✓</span>}
 </div>
 </div>
<div className="flex-1">
 <div className="flex items-center justify-between">
 <span className="text-white font-bold text-sm">+ Especialista Técnico no WhatsApp</span>
 <span className="text-[#D4AF37] font-bold text-sm">R$ 250/mês</span>
 </div>
 <p className="text-gray-300 text-xs mt-1 leading-relaxed">
 Não configure IA sozinho. Tenha um especialista pra garantir que seu CRM não trave e 
 suas vendas não parem. <strong className="text-white">SLA 24h</strong>.
 </p>
 <div className="mt-2 flex items-center gap-2">
 <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs px-2 py-0.5 rounded-full font-semibold">
 ⚡ Recomendado
 </span>
 <span className="text-gray-400 text-xs">
 Quem tem IA precisa de suporte humano pra configurar
 </span>
 </div>
 </div>
 </div>
 </div>

 <button
 type="submit"
 disabled={!email || loading}
 className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {loading ? 'Carregando...' : orderBump ? 'CONTINUAR — R$ 547/mês →' : 'CONTINUAR — R$ 297/mês →'}
 </button>
                    
                    <p className="text-gray-500 text-xs text-center">Ao continuar, você concorda com nossos <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">termos</a> e <a href="/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">políticas de privacidade</a>. Somente assuntos do seu interesse.</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Dados salvos com sucesso!</h3>
                <p className="text-gray-300 text-sm">Te redirecionando pro checkout seguro...</p>
                <p className="text-gray-500 text-xs mt-2">Aguarde, não feche esta janela.</p>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                <div className="bg-green-400 h-full rounded-full" style={{ width: '100%', animation: 'progressBar 1.5s ease-in-out' }}></div>
                </div>
                <style jsx>{`
                @keyframes progressBar {
                from { width: 0%; }
                to { width: 100%; }
                }
                `}</style>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] max-h-[600px] w-full h-full bg-primary-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Vagas Disponíveis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Seu concorrente responde<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">em 1 segundo.</span><br />
              Você, em 1 hora.
            </h1>
            
            <p className="text-gray-200 text-lg max-w-2xl mx-auto font-medium mb-4">
              Enquanto você dorme, 47 leads mandaram mensagem no seu WhatsApp. 
              Amanhã, 30 deles vão pro concorrente.
            </p>
<p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
  <strong>Não é falta de esforço. É falta de braço.</strong> A IA resolve isso por R$ 297/mês.
  </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openCheckout}
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                ATIVAR MEU WHATSAPP IA →
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-4">Sem fidelidade. Cancele quando quiser. 7 dias de garantia incondicional.</p>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="py-12 bg-[#111111]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">24h</div>
                <div className="text-gray-200 text-sm">Atendimento automático</div>
              </div>
              <div className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">&lt;1s</div>
                <div className="text-gray-200 text-sm">Tempo de resposta</div>
              </div>
              <div className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">3x</div>
                <div className="text-gray-200 text-sm">Mais conversões</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRINTS CRM ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-primary-500/10">
                Na prática
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                É assim que seu CRM vai funcionar:
              </h2>
              <p className="text-gray-300 text-lg">Leads qualificados, organizados e prontos pra fechar. Sem trabalho manual.</p>
            </div>

            <div className="mb-8">
              <img 
                src="/images/evo/chat-atendimento.webp" 
                alt="Chat de atendimento"
                className="w-full max-w-5xl mx-auto rounded-2xl border border-green-500/30 shadow-2xl shadow-primary-500/10"
              />
              <p className="text-gray-300 text-sm mt-4 text-center">Atendimento automático com IA que qualifica e classifica leads em tempo real</p>
            </div>

            <div className="mb-8">
              <img 
                src="/images/evo/page-pipeline.webp" 
                alt="Pipeline de vendas"
                className="w-full max-w-4xl mx-auto rounded-2xl border border-green-500/30 shadow-xl shadow-primary-500/10"
              />
              <p className="text-gray-300 text-sm mt-4 text-center">Pipeline automático: leads quentes, mornos e frios organizados por valor</p>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-20 sm:py-32 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-primary-500/10">
              Funcionalidades
              </span><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Funcionalidades que<br />
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">transformam seu WhatsApp</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-20 sm:py-32 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-primary-500/10">
              Cases
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Resultados comprovados
            </h2>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((c, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-green-400 text-3xl font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OFERTA ===== */}
        <section id="plano" className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Oferta de lançamento
            </h2>
            <p className="text-gray-400 mb-8">Preço válido enquanto durarem as vagas.</p>
            {/* Garantia de 7 dias */}
            <div className="inline-flex items-center gap-2 bg-primary-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-bold mb-4">
              7 dias de garantia incondicional
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-900/10 rounded-3xl p-8 border border-green-500/30 mb-8">
              <ul className="space-y-4 text-left mb-8">
                {[
                  'Atendente de IA 24h no WhatsApp',
                  'Qualificação automática de leads',
                  'Agendamento inteligente de consultas',
                  'CRM básico com funil comercial',
                  'Follow-up automático',
                  'Relatórios de conversão',
                  'Suporte via WhatsApp',
                  'Setup incluso (sem taxa extra)',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-green-500/30">
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-gray-300 text-lg">De</span>
                  <span className="text-gray-400 text-2xl line-through">R$ 750</span>
                  <span className="text-gray-300 text-lg">por</span>
                  <span className="text-white text-6xl font-bold">R$ 297</span>
                  <span className="text-gray-300 text-xl">/mês</span>
                </div>

                <button
                  onClick={openCheckout}
                  className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-primary-500/25 w-full justify-center"
                >
                  ATIVAR MEU WHATSAPP IA →
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
