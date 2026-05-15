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
              Você não precisa de mais<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">ferramentas.</span><br />
              Você precisa de mais<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">braços.</span>
            </h1>
            
            <p className="text-gray-200 text-xl mb-6 leading-relaxed">
              38 agentes de IA. Cada um com uma função. Todos trabalhando 24 horas por dia, 7 dias por semana, 
              sem férias, sem atraso, sem pedir aumento.
            </p>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Enquanto você dorme, eles estão qualificando leads, agendando consultas, cobrando inadimplentes, 
              respondendo clientes e escalando vendas. Sem você levantar um dedo.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/qualificacao"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                CONTRATAR MEU WORKFORCE →
              </Link>
              <a
                href="#prova"
                className="inline-flex items-center gap-2 text-white px-8 py-5 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
              >
                Ver resultados reais
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-6">
              7 dias de garantia. Sem fidelidade. Setup em até 30 dias.
            </p>
          </div>
        </section>

        {/* ===== O PROBLEMA ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Vamos ser honestos...
            </h2>
            <p className="text-gray-400 text-center mb-12">Sua operação hoje é um gargalo. Você sabe disso.</p>
            
            <div className="space-y-4">
              {[
                { emoji: '😤', text: 'Lead manda mensagem às 23h. Ninguém responde. Amanhã ele comprou do concorrente que responde automático.' },
                { emoji: '💸', text: 'Você (ou seu funcionário) gasta 2-3 horas por dia só marcando, remarcando e cobrando pelo WhatsApp.' },
                { emoji: '🤯', text: 'Follow-up? Que follow-up? Tanta mensagem que a lead quente se perde no meio do chaos.' },
                { emoji: '📉', text: 'Você não tem ideia de quantos leads tem, em que fase estão, e quanto dinheiro está deixando na mesa.' },
                { emoji: '🔄', text: 'Contratou mais gente, mas o problema só aumentou. Mais gente = mais custo + mais gestão + mais erro.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[#0a0a0a] rounded-xl border border-green-500/30">
              <p className="text-gray-200 text-lg text-center">
                O problema não é você. Não é seu time. <br />
                <strong className="text-white">O problema é tentar escalar operação manual em 2026.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ===== A SOLUÇÃO ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Imagine chegar na segunda-feira e encontrar
            </h2>
            <p className="text-green-400 text-xl text-center mb-12 font-bold">
              47 leads qualificados, 23 consultas agendadas e R$ 12.000 cobrados.
            </p>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Sem você ter feito nada no fim de semana. Seus agentes de IA trabalharam por você.
            </p>

            <h3 className="text-2xl font-bold text-white mb-8 text-center">Seu time digital:</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { emoji: '🎯', title: 'SDR de IA', desc: 'Qualifica cada lead que chega. Faz as perguntas certas, classifica por interesse e manda pro CRM. Nunca esquece ninguém. Nunca dorme.' },
                { emoji: '📅', title: 'Agendador de IA', desc: 'Marca, remarca e reconfirma consultas automaticamente. Integra com sua agenda. Paciente não precisa esperar você ver a mensagem.' },
                { emoji: '💰', title: 'Cobrador de IA', desc: 'Envia lembretes de pagamento, negocia parcelamento, cobra inadimplência. Sem constrangimento, sem desculpa.' },
                { emoji: '🛒', title: 'Vendedor de IA', desc: 'Apresenta produtos, faz upsell ("quer adicionar algo?"), fecha pedido. 24/7. Todo dia.' },
                { emoji: '📊', title: 'Analista de IA', desc: 'Gera relatórios, identifica gargalos, mostra exatamente onde você está perdendo dinheiro.' },
                { emoji: '🔧', title: 'Suporte de IA', desc: 'Tira dúvidas, resolve problemas simples, escala pro humano quando necessário. Cliente nunca fica sem resposta.' },
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

        {/* ===== PROVA SOCIAL ===== */}
        <section id="prova" className="py-20 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Isso não é teoria.
            </h2>
            <p className="text-gray-400 text-center mb-12">São resultados reais de empresas reais usando o Workforce.</p>

            <div className="space-y-8">
              <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🦷</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Clínica OdontoLife</h3>
                    <p className="text-gray-400 text-sm">Cascavel, PR</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-1">ANTES DO WORKFORCE:</p>
                    <p className="text-gray-300">Recebia 400 leads/mês. Secretária respondia quando dava conta — tempo médio: 47 minutos. 
                    Paciente esperava, desistia, ia pro concorrente. 30% das consultas eram no-show porque ninguém reconfirmava.</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-sm font-semibold mb-1">DEPOIS DO WORKFORCE:</p>
                    <p className="text-gray-300">IA qualifica o lead em 3 segundos, agenda automaticamente, reconfirma 24h antes, cobra no dia. 
                    Secretária agora só faz o atendimento presencial.</p>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                    <p className="text-green-400 font-bold text-lg">Resultado: 1.200 consultas/mês. 3x mais. Mesma equipe. Zero contratações.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Escritório Advocacia</h3>
                    <p className="text-gray-400 text-sm">Curitiba, PR</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-1">ANTES DO WORKFORCE:</p>
                    <p className="text-gray-300">Cliente mandava documentos pelo WhatsApp. Se perdiam na conversa. 
                    Advogado gastava 3 horas/dia organizando papel. Prazo perdido = processo atrasado.</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-sm font-semibold mb-1">DEPOIS DO WORKFORCE:</p>
                    <p className="text-gray-300">IA recebe o documento, organiza por tipo, classifica, anexa no processo e envia checklist automático pro cliente. 
                    Advogado foca no que importa: o processo.</p>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                    <p className="text-green-400 font-bold text-lg">Resultado: 100% dos documentos organizados. 0 prazo perdido. 3h/dia devolvidas ao advogado.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🍕</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Pizzaria Delivery</h3>
                    <p className="text-gray-400 text-sm">Londrina, PR</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-1">ANTES DO WORKFORCE:</p>
                    <p className="text-gray-300">Atendente anotava pedido no WhatsApp, passava pro entregador, confirmava endereço. 
                    Tudo manual. Caos nos horários de pico. Cliente reclamava de demora.</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-sm font-semibold mb-1">DEPOIS DO WORKFORCE:</p>
                    <p className="text-gray-300">IA recebe pedido, confirma endereço, calcula tempo de entrega, faz upsell ("quer uma bebida por R$8?"), 
                    acompanha o delivery e pede avaliação depois.</p>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                    <p className="text-green-400 font-bold text-lg">Resultado: 3x mais pedidos processados. Mesma equipe. Nota no Google subiu de 3.8 para 4.7.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== NÚMEROS ===== */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '3x', label: 'Mais conversões', icon: '📈' },
                { value: '24/7', label: 'Sem parar', icon: '⏰' },
                { value: '<1s', label: 'Tempo de resposta', icon: '⚡' },
                { value: '67%', label: 'Menos trabalho manual', icon: '📉' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 text-center border border-green-500/20">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-gray-200 text-sm">{stat.label}</div>
                </div>
              ))}
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
