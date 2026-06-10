import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

const WHATSAPP_NUMBER = '5511914088571';
const WHATSAPP_LABEL = encodeURIComponent('Olá! Vi o site e gostaria de mais informações sobre o WhatsApp + IA');

export default function WhatsApp() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_LABEL}`;

  return (
    <>
      <Meta
        title="WhatsApp + IA — Sistema Britto"
        description="Seu WhatsApp como central comercial. IA que qualifica, agenda, vende e reativa leads 24h. R$ 297/mês. Sem fidelidade."
        path="/whatsapp"
      />

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        {/* HERO */}
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
              Enquanto você dorme, 47 leads mandaram mensagem no seu WhatsApp. Amanhã, 30 deles vão pro concorrente.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              <strong>Não é falta de esforço. É falta de braço.</strong> A IA resolve isso por R$ 297/mês.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                ATIVAR MEU WHATSAPP IA →
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-4">Sem fidelidade. Cancele quando quiser. 7 dias de garantia incondicional.</p>
          </div>
        </section>

        {/* STATS */}
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

        {/* PRINTS CRM */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-primary-500/10">
                Na prática
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">É assim que seu CRM vai funcionar:</h2>
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

        {/* FEATURES */}
        <section className="py-20 sm:py-32 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-primary-500/10">
                Funcionalidades
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
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

        {/* CASES */}
        <section className="py-20 sm:py-32 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-primary-500/10">
                Cases
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Resultados comprovados</h2>
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

        {/* OFERTA */}
        <section id="plano" className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Oferta de lançamento</h2>
            <p className="text-gray-400 mb-8">Preço válido enquanto durarem as vagas.</p>

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

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-primary-500/25 w-full justify-center"
                >
                  ATIVAR MEU WHATSAPP IA →
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
