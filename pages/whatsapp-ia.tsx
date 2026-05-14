import Meta from '../components/Meta';

export default function WhatsAppIA297() {
  return (
    <>
      <Meta 
        title="WhatsApp IA — R$ 297/mês | Sistema Britto"
        description="Atendimento automático no WhatsApp 24/7. Qualificação de leads, agendamento, follow-up. Sem fidelidade."
        path="/whatsapp-ia"
        ogImage="/og-image.png"
      />
      
      <main className="min-h-screen bg-black" style={{ color: '#ffffff' }}>
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-green-900/20 to-black">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                Vagas Disponíveis
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Seu WhatsApp no<br />
              <span className="text-green-400">automático 24/7</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              IA que atende, qualifica e agenda clientes pra você. 
              <br />
              Por menos que um salário mínimo.
            </p>

            <div className="flex items-baseline justify-center gap-2 mb-8">
              <span className="text-gray-400 text-lg">De</span>
              <span className="text-gray-500 text-3xl line-through">R$ 750</span>
              <span className="text-gray-400 text-lg">por</span>
              <span className="text-white text-6xl font-bold">R$ 297</span>
              <span className="text-gray-400 text-xl">/mês</span>
            </div>

            <a
              href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20WhatsApp%20IA%20de%20R$297"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              QUERO MEU ATENDIMENTO AUTOMÁTICO →
            </a>

            <p className="text-gray-500 text-sm mt-6">
              Sem fidelidade. Cancele quando quiser.
            </p>
          </div>
        </section>

        {/* Problema */}
        <section className="py-20 px-4 bg-surface-950">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Você perde vendas porque:
            </h2>

            <div className="space-y-6">
              {[
                { icon: '❌', text: 'Demora pra responder no WhatsApp' },
                { icon: '❌', text: 'Esquece de fazer follow-up' },
                { icon: '❌', text: 'Não tem tempo de qualificar cada lead' },
                { icon: '❌', text: 'Perde cliente fora do horário comercial' },
                { icon: '❌', text: 'Não consegue acompanhar tudo manualmente' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-surface-900 p-6 rounded-xl border border-red-500/20">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-gray-300 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solução */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Com o WhatsApp IA você tem:
            </h2>

            <div className="space-y-6">
              {[
                { icon: '✅', title: 'Atendimento 24/7', desc: 'Sua empresa atende mesmo de madrugada, fim de semana e feriado' },
                { icon: '✅', title: 'Qualificação Automática', desc: 'A IA faz as perguntas certas e te entrega o lead pronto pra fechar' },
                { icon: '✅', title: 'Agendamento Inteligente', desc: 'Consulta marcada automaticamente na sua agenda' },
                { icon: '✅', title: 'Follow-up Automático', desc: 'A IA cobra, acompanha e reativa lead dormente sozinha' },
                { icon: '✅', title: 'CRM Integrado', desc: 'Todos os leads organizados. Você sabe exatamente quem tá em cada etapa' },
              ].map((item, i) => (
                <div key={i} className="bg-surface-900 p-6 rounded-xl border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oferta */}
        <section className="py-20 px-4 bg-surface-950">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              O que você recebe:
            </h2>

            <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-3xl p-8 border border-green-500/50 mb-8">
              <ul className="space-y-4 text-left">
                {[
                  'Atendente de IA 24/7 no WhatsApp',
                  'Qualificação automática de leads',
                  'Agendamento inteligente de consultas',
                  'CRM básico com funil comercial',
                  'Follow-up automático',
                  'Relatórios de conversão',
                  'Suporte via WhatsApp',
                  'Setup incluso (sem taxa extra)',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-green-500/30">
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-gray-400 text-lg">De</span>
                  <span className="text-gray-500 text-2xl line-through">R$ 750</span>
                  <span className="text-gray-400 text-lg">por</span>
                  <span className="text-white text-6xl font-bold">R$ 297</span>
                  <span className="text-gray-400 text-xl">/mês</span>
                </div>

                <a
                  href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20WhatsApp%20IA%20de%20R$297"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25 w-full justify-center"
                >
                  QUERO MEU WHATSAPP IA →
                </a>

                <p className="text-gray-400 text-sm mt-4">
                  Sem fidelidade. Cancele quando quiser.
                </p>
              </div>
            </div>

            {/* Garantia */}
            <div className="bg-surface-900 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🛡️</span>
                <div>
                  <h3 className="text-lg font-bold text-white">7 dias de garantia</h3>
                  <p className="text-gray-400 text-sm">
                    Se não gostar, devolvemos seu dinheiro. Sem perguntas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Dúvidas Frequentes
            </h2>

            <div className="space-y-6">
              {[
                { q: 'Preciso de chip novo?', a: 'Não! Funciona no seu número atual. Você pode usar um número específico ou fazer o desvio do seu principal.' },
                { q: 'Demora pra configurar?', a: 'O setup leva 24-48h. A gente configura tudo pra você. É só aprovar e começar a usar.' },
                { q: 'Posso cancelar?', a: 'Pode cancelar quando quiser. Sem multa. Sem fidelidade. Sem letra miúda.' },
                { q: 'Funciona no meu negócio?', a: 'Se você usa WhatsApp pra atender cliente, funciona. Clínica, escritório, loja, delivery, serviços — todos os segmentos.' },
              ].map((item, i) => (
                <div key={i} className="bg-surface-900 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-4">
              © 2026 Sistema Britto. Todos os direitos reservados.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <a href="/termos-de-uso" className="text-gray-400 hover:text-white">Termos</a>
              <span className="text-gray-600">•</span>
              <a href="/politicas-de-privacidade" className="text-gray-400 hover:text-white">Privacidade</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
