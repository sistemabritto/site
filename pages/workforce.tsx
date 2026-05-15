import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Workforce() {
  return (
    <>
      <Meta 
        title="Workforce — Seu Exército de IA | Sistema Britto"
        description="Multi-agentes de IA que vendem, atendem, cobram e escalam seu negócio 24/7. Não é chatbot. É força de trabalho digital."
        path="/workforce"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        
        {/* ===== HERO: CARTA DE VENDAS ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Workforce AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              E se você tivesse<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">38 funcionários de IA</span><br />
              trabalhando 24/7?
            </h1>
            
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Não é chatbot. Não é "assistente virtual". É uma <strong>força de trabalho digital completa</strong> — 
              cada agente com uma especialidade, todos integrados ao seu WhatsApp, CRM e operação.
            </p>

            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              Enquanto você dorme, seus agentes estão qualificando leads, agendando consultas, 
              cobrando inadimplentes e escalando vendas. Sem férias. Sem atraso. Sem erro.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/qualificacao"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                QUERO MEU WORKFORCE →
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 text-white px-8 py-5 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
              >
                Ver como funciona
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-6">
              7 dias de garantia. Sem fidelidade. Setup em até 30 dias.
            </p>
          </div>
        </section>

        {/* ===== PROBLEMA: CHEGA DE... ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Chega de...
            </h2>
            <p className="text-gray-400 text-center mb-12">Você se identifica com algum desses?</p>
            
            <div className="space-y-4">
              {[
                { emoji: '😤', text: 'Lead manda mensagem às 23h e ninguém responde. Amanhã ele já comprou do concorrente.' },
                { emoji: '💸', text: 'Gastar 3 horas por dia no WhatsApp marcando, remarcando e cobrando.' },
                { emoji: '🤯', text: 'Esquecer de fazer follow-up e perder venda quente que tava na mão.' },
                { emoji: '📉', text: 'Não saber quantos leads você tem, em que fase estão, e quanto valem.' },
                { emoji: '😩', text: 'Contratar mais gente pra atender mais, e mesmo assim não dar conta.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 text-lg">
                O problema não é você. É <strong>processo manual</strong> numa era que exige <strong>escala digital</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SOLUÇÃO: O QUE É ===== */}
        <section id="como-funciona" className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              O que é o Workforce?
            </h2>
            <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
              Um time de agentes de IA especializados que trabalham juntos pra escalar seu negócio. 
              Cada um cuida de uma função. Juntos, eles são imparáveis.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { emoji: '🎯', title: 'SDR de IA', desc: 'Qualifica leads, faz follow-up, classifica por interesse. Nunca esquece ninguém.' },
                { emoji: '📅', title: 'Agendador de IA', desc: 'Marca, remarca e reconfirma consultas. Integra com sua agenda.' },
                { emoji: '💰', title: 'Cobrador de IA', desc: 'Envia lembretes, negocia, cobra inadimplência. Sem constrangimento.' },
                { emoji: '🛒', title: 'Vendedor de IA', desc: 'Apresenta produtos, faz upsell, fecha pedido. 24/7.' },
                { emoji: '📊', title: 'Analista de IA', desc: 'Gera relatórios, identifica gargalos, sugere otimizações.' },
                { emoji: '🔧', title: 'Suporte de IA', desc: 'Tira dúvidas, resolve problemas, escala pro humano quando necessário.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROVA SOCIAL: NÚMEROS ===== */}
        <section className="py-16 bg-[#111111]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Números que falam</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '3x', label: 'Mais conversões', icon: '📈' },
                { value: '24/7', label: 'Atendimento contínuo', icon: '⏰' },
                { value: '<1s', label: 'Tempo de resposta', icon: '⚡' },
                { value: '67%', label: 'Redução no follow-up', icon: '📉' },
              ].map((stat, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-gray-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASOS REAIS ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Na prática, funciona assim:
            </h2>

            <div className="space-y-8">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🦷</span>
                  <h3 className="text-xl font-bold text-white">Clínica OdontoLife</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-semibold">ANTES:</p>
                  <p className="text-gray-300">Recebia 400 leads/mês no WhatsApp. Secretária respondia quando dava. 
                  Paciente esperava 2h+ pra confirmar consulta. 30% desistia.</p>
                  <p className="text-gray-400 text-sm font-semibold">DEPOIS:</p>
                  <p className="text-gray-300">IA qualifica, agenda, reconfirma e cobra no dia. Tempo de resposta: 3 segundos.</p>
                  <p className="text-green-400 font-bold">Resultado: 1.200 consultas/mês. 3x mais. Mesma equipe.</p>
                </div>
              </div>

              <div className="bg-[#111111] rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚖️</span>
                  <h3 className="text-xl font-bold text-white">Escritório Advocacia</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-semibold">ANTES:</p>
                  <p className="text-gray-300">Cliente mandava documentos no WhatsApp. Se perdiam. Advogado gastava horas organizando.</p>
                  <p className="text-gray-400 text-sm font-semibold">DEPOIS:</p>
                  <p className="text-gray-300">IA recebe, organiza, classifica e anexa no processo. Envia checklist automático.</p>
                  <p className="text-green-400 font-bold">Resultado: 100% dos docs organizados. 0 papel perdido.</p>
                </div>
              </div>

              <div className="bg-[#111111] rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🍕</span>
                  <h3 className="text-xl font-bold text-white">Pizzaria Delivery</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm font-semibold">ANTES:</p>
                  <p className="text-gray-300">Atendente fazia pedido, anotava endereço, passava pro entregador. Tudo no WhatsApp. Caos.</p>
                  <p className="text-gray-400 text-sm font-semibold">DEPOIS:</p>
                  <p className="text-gray-300">IA recebe pedido, confirma endereço, calcula tempo, faz upsell ("quer uma bebida?"), acompanha entrega.</p>
                  <p className="text-green-400 font-bold">Resultado: 3x mais pedidos. Mesma equipe. Cliente elogia a velocidade.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PLANOS ===== */}
        <section id="planos" className="py-20 px-4 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Escolha seu nível
            </h2>
            <p className="text-gray-400 text-center mb-12">Comece pequeno. Escale sem limite.</p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Básico */}
              <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Básico</h3>
                <p className="text-gray-400 text-sm mb-6">Pra quem tá começando</p>
                <div className="text-4xl font-bold text-white mb-6">R$ 297<span className="text-lg text-gray-400">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  {['1 agente de IA', 'Até 500 conversas/mês', 'WhatsApp apenas', 'CRM básico', 'Suporte por email'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/qualificacao" className="block text-center py-3 rounded-full font-bold border border-white/20 text-white hover:bg-white/10 transition-all">
                  Começar
                </Link>
              </div>

              {/* Profissional */}
              <div className="bg-[#0a0a0a] rounded-2xl p-8 border-2 border-green-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                  MAIS POPULAR
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Profissional</h3>
                <p className="text-gray-400 text-sm mb-6">Time em crescimento</p>
                <div className="text-4xl font-bold text-white mb-6">R$ 750<span className="text-lg text-gray-400">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  {['3 agentes de IA', 'Até 2.000 conversas/mês', 'WhatsApp + Instagram', 'CRM completo', 'Relatórios avançados', 'Suporte prioritário'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/qualificacao" className="block text-center py-3 rounded-full font-bold bg-green-500 hover:bg-green-600 text-black transition-all">
                  Começar
                </Link>
              </div>

              {/* Empresarial */}
              <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/30">
                <h3 className="text-xl font-bold text-white mb-2">Empresarial</h3>
                <p className="text-gray-400 text-sm mb-6">Operação consolidada</p>
                <div className="text-4xl font-bold text-white mb-6">R$ 2.500<span className="text-lg text-gray-400">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  {['Agentes ilimitados', 'Conversas ilimitadas', 'Todos os canais', 'CRM + API', 'Onboarding dedicado', 'SLA 24h'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-[#D4AF37]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/qualificacao" className="block text-center py-3 rounded-full font-bold border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                  Falar com especialista
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== GARANTIA ===== */}
        <section className="py-16 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold text-white mb-4">7 dias de garantia incondicional</h2>
            <p className="text-gray-300">
              Se em 7 dias você não ver resultado, devolvemos cada centavo. 
              Sem perguntas. Sem burocracia. Sem letra miúda.
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Perguntas frequentes</h2>
            <div className="space-y-6">
              {[
                { q: 'Demora pra implementar?', a: '30 dias em média. A gente cuida de tudo: integração, treino da IA, testes. Você só aprova.' },
                { q: 'Preciso de chip novo?', a: 'Não. Funciona no seu número atual. Pode ser desvio ou número específico.' },
                { q: 'Meus clientes vão saber que é IA?', a: 'Só se você quiser. A IA se apresenta como você mandar — com o nome da sua empresa, com o tom da sua marca.' },
                { q: 'Posso cancelar?', a: 'Pode. Sem multa. Sem fidelidade. 7 dias de garantia incondicional.' },
                { q: 'Funciona pro meu negócio?', a: 'Se você usa WhatsApp pra atender cliente, funciona. Clínica, escritório, loja, delivery, serviço — todos os segmentos.' },
                { q: 'E se a IA errar?', a: 'Ela escala pro humano quando não tem certeza. Você define o nível de autonomia. E ela aprende com cada interação.' },
              ].map((faq, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Pronto pra ter seu exército de IA?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Responda 4 perguntas rápidas e descubra qual plano é ideal pra você.
            </p>
            <Link
              href="/qualificacao"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              FAZER MINHA QUALIFICAÇÃO →
            </Link>
            <p className="text-gray-500 text-sm mt-4">Leva menos de 2 minutos</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
