import React from 'react';
import Meta from '../components/Meta';

export default function WorkforceLP() {
  return (
    <>
      <Meta 
        title="Workforce de IA — Sistema Britto"
        description="Sua empresa vai ter uma força de trabalho de IA em 48 horas. Ou você não paga nada."
        path="/workforce"
        ogImage="/og-image.png"
      />
      
      <main className="min-h-screen bg-black" style={{ color: '#ffffff' }}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-black to-black" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                Vagas Limitadas
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Sua empresa vai ter uma<br />
              <span className="text-green-400">força de trabalho de IA</span><br />
              em 48 horas.
            </h1>

            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Ou você não paga nada.
            </p>

            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              Sem contratar. Sem infra. Sem saber programar. Uma workforce completa — atendimento, vendas, finanças, projetos — que opera seu negócio 24/7 por menos que um salário mínimo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/qualificacao"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                QUERO MINHA WORKFORCE DE IA →
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 glass-strong text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:bg-white/10 border border-white/20"
              >
                Saiba mais ↓
              </a>
            </div>

            <p className="text-gray-500 text-sm mt-8">
              7 dias de garantia incondicional
            </p>
          </div>
        </section>

        {/* A Dor */}
        <section id="como-funciona" className="py-20 px-4 bg-surface-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Você já deve ter percebido:
            </h2>

            <div className="space-y-8">
              <div className="bg-surface-900 rounded-2xl p-8 border border-red-500/20">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">
                      Atender cliente é um buraco sem fundo
                    </h3>
                    <p className="text-gray-400">
                      Qualifica, responde, agenda, reativa, cobra, suporte... E no fim do mês, o que sobra? Exaustão. Leads perdidos. E aquela sensação de que você é refém do seu próprio negócio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-900 rounded-2xl p-8 border border-red-500/20">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">
                      Cada lead não atendido é dinheiro indo embora
                    </h3>
                    <p className="text-gray-400">
                      Cada hora que seu time passa respondendo pergunta repetitiva é dinheiro queimado. Cada follow-up que não é feito é venda perdida.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-900 rounded-2xl p-8 border border-red-500/20">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">
                      Você não tem controle
                    </h3>
                    <p className="text-gray-400">
                      Quanto você faturou esse mês? Quanto gastou? Qual o ticket médio? Se você não consegue responder essas perguntas em 10 segundos, você não tem um negócio — você tem um problema.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* A Solução */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Em 48 horas, sua empresa vai ter:
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Uma força de trabalho que não dorme, não pede aumento e não tira férias.
            </p>

            <div className="grid gap-6">
              {[
                { icon: '🧠', title: 'Atendente de IA 24/7', desc: 'Qualifica leads, agenda consultas, faz follow-up inteligente, reativa leads dormentes' },
                { icon: '📊', title: 'CRM Inteligente', desc: 'Cada lead cai no funil certo. Frio → nutrição. Morno → follow-up. Quente → notificação pro vendedor' },
                { icon: '💰', title: 'Agente Financeiro', desc: 'Fluxo de caixa em tempo real. Contas a pagar/receber. DRE automático. Alerta de inadimplência' },
                { icon: '🏗️', title: 'Agente de Projetos', desc: 'Tarefas, prazos, entregas. Cada membro do time sabe o que fazer. O agente cobra, acompanha e reporta' },
                { icon: '📢', title: 'Agente de Marketing', desc: 'Cria conteúdo, programa posts, analisa métricas. Tudo automático' },
              ].map((item, i) => (
                <div key={i} className="bg-surface-900 rounded-2xl p-6 border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{item.icon}</span>
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

        {/* Planos */}
        <section id="planos" className="py-20 px-4 bg-surface-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Escolha seu plano
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Essencial */}
              <div className="bg-surface-900 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">Essencial</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white text-sm">R$</span>
                  <span className="text-5xl font-bold text-white">297</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Atendente de IA 24/7 no WhatsApp', 'Qualificação automática de leads', 'Agendamento inteligente', 'CRM básico com funil', 'Follow-up automático', 'Suporte via WhatsApp'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20plano%20Essencial%20de%20R$297"
                  className="block w-full text-center bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  Começar Agora
                </a>
              </div>

              {/* Completo */}
              <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-3xl p-8 border border-green-500/50 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase">
                  Mais Popular
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Completo</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white text-sm">R$</span>
                  <span className="text-5xl font-bold text-white">750</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Tudo do Essencial', 'CRM completo com funil avançado', 'Reativação de leads dormentes', 'Multi-atendentes com IA assistida', 'Integração Pipedrive/Sticky', 'Relatórios de ROI'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20plano%20Completo%20de%20R$750"
                  className="block w-full text-center bg-green-500 text-black py-4 rounded-full font-bold hover:bg-green-600 transition-colors"
                >
                  Começar Agora
                </a>
              </div>

              {/* Premium */}
              <div className="bg-surface-900 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white text-sm">R$</span>
                  <span className="text-5xl font-bold text-white">2.500</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Tudo do Completo', '38 agentes especializados', 'Finanças, Projetos, Marketing, Jurídico', 'Engineering agents', 'Dashboard web completo', 'Onboarding dedicado', 'Suporte prioritário 24h'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5511914088571?text=Olá!%20Quero%20o%20plano%20Premium%20de%20R$2500"
                  className="block w-full text-center bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  Começar Agora
                </a>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm mb-4">
                7 dias de garantia incondicional
              </p>
              <p className="text-gray-500 text-xs">
                Se em 7 dias você não ver resultado, devolvemos cada centavo. Sem burocracia.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              {[
                { q: 'Preciso saber programar?', a: 'Não. A gente configura tudo pra você em 48 horas.' },
                { q: 'Meus clientes vão saber que é IA?', a: 'Só se você quiser. A IA pode se apresentar como assistente, atendente virtual ou com o nome da sua empresa.' },
                { q: 'E se eu quiser cancelar?', a: 'Pode cancelar quando quiser. Sem multa. Sem fidelidade.' },
                { q: 'Funciona pro meu tipo de negócio?', a: 'Se você tem WhatsApp, funciona. Clínica, escritório, loja, SaaS, delivery — todos os segmentos.' },
              ].map((item, i) => (
                <div key={i} className="bg-surface-900 rounded-2xl p-6 border border-white/10">
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
