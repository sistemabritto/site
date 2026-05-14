import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Meta 
        title="Sistema Britto — Workforce de IA para seu negócio"
        description="Agentes autônomos que atendem clientes, gerenciam finanças, coordenam projetos e escrevem código. Uma workforce completa que nunca dorme."
        path="/"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Workforce de IA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Sua empresa vai ter uma<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">força de trabalho de IA</span><br />
              em 48 horas.
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">Ou você não paga nada.</p>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              Sem contratar. Sem infra. Sem saber programar. Uma workforce completa — atendimento, vendas, finanças, projetos — que opera seu negócio 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/workforce" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25">
                CONHECER A WORKFORCE →
              </a>
              <a href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                WhatsApp + IA
              </a>
            </div>
          </div>
        </section>

        {/* ===== SOLUÇÕES ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Soluções</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Escolha o ponto de partida ideal para seu negócio.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Workforce */}
              <a href="/workforce" className="group bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">🏭</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Workforce de IA</h3>
                <p className="text-gray-300 mb-6">Empresas que precisam de uma equipe completa de agentes: atendimento, vendas, finanças, projetos, marketing.</p>
                <div className="text-green-400 font-semibold">A partir de R$ 297/mês →</div>
              </a>

              {/* WhatsApp */}
              <a href="/whatsapp" className="group bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">💬</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">WhatsApp + IA</h3>
                <p className="text-gray-300 mb-6">Transforme seu WhatsApp em uma máquina de vendas com IA que qualifica, agenda e fecha 24/7.</p>
                <div className="text-green-400 font-semibold">R$ 297/mês →</div>
              </a>

              {/* Qualificação */}
              <a href="/qualificacao" className="group bg-black/80 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Qualificação Gratuita</h3>
                <p className="text-gray-300 mb-6">Responda 4 perguntas e descubra o plano ideal para sua empresa. Sem compromisso.</p>
                <div className="text-green-400 font-semibold">Fazer agora →</div>
              </a>
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Resultados reais</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Empresas que já usam nossa workforce.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Clínica OdontoLife', result: '3x mais consultas', desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma.' },
                { name: 'Studio Pilates', result: '20h/semana economizadas', desc: 'Antes 3h/dia no WhatsApp. Hoje a IA faz tudo sozinha.' },
                { name: 'Delivery Pizzaria', result: '3x mais pedidos', desc: 'Do pedido ao delivery, tudo automático. Mesma equipe.' },
              ].map((c, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 text-center">
                  <div className="text-green-400 text-2xl font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-gray-300 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Comece agora. Sem fidelidade. 7 dias de garantia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/workforce" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25">
                COMEÇAR AGORA →
              </a>
              <a href="/qualificacao" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                Fazer qualificação gratuita
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
