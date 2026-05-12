import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Termos de Uso — dark mode, completo
 * workflowapi.com.br/termos-de-uso
 */

export default function TermosDeUso() {
  return (
    <>
      <Head>
        <title>Termos de Uso — Workflow API Studio</title>
        <meta name="description" content="Termos e condições de uso dos serviços da Workflow API Studio." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-surface-950">
        {/* Header */}
        <div className="aurora-bg">
          <div className="bg-surface-950/90">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/logo-white.png"
                  alt="Workflow API Studio"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className="text-white font-heading font-bold text-lg">
                  Workflow<span className="text-primary-400">API</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                Termos de Uso
              </h1>
              <p className="text-neutral-300 text-sm">
                Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="prose-dark space-y-10 text-neutral-200 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar o site <strong className="text-white">workflowapi.com.br</strong> e/ou utilizar os serviços oferecidos pela <strong className="text-white">Workflow API Studio</strong> ("Empresa"), você ("Usuário") concorda com estes Termos de Uso em sua integralidade. Caso não concorde com qualquer disposição, não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">2. Descrição dos Serviços</h2>
              <p>
                A Workflow API Studio oferece serviços de automação e inteligência artificial aplicados ao WhatsApp Business, incluindo:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Agentes de IA para qualificação de leads e atendimento automatizado</li>
                <li>Fluxos de automação e mensagens estratégicas via WhatsApp</li>
                <li>Integração com ChatGPT e modelos de linguagem para atendimento inteligente</li>
                <li>Painel multi-usuário para gestão de conversas em tempo real</li>
                <li>Clube Plug & Play — acesso a ferramentas de IA para atendimento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">3. Cadastro e Conta</h2>
              <p>
                Para utilizar determinados serviços, poderá ser necessário fornecer informações de cadastro. O Usuário se compromete a:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Fornecer informações verdadeiras, completas e atualizadas</li>
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>Notificar imediatamente qualquer uso não autorizado da sua conta</li>
                <li>Ser responsável por todas as atividades realizadas através da sua conta</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">4. Uso Aceitável</h2>
              <p>O Usuário concorda em não utilizar os serviços para:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Enviar spam, mensagens não solicitadas ou conteúdo abusivo</li>
                <li>Violar direitos de propriedade intelectual de terceiros</li>
                <li>Coletar dados pessoais de terceiros sem consentimento</li>
                <li>Realizar atividades ilegais ou fraudulentas</li>
                <li>Interferir no funcionamento dos serviços ou infraestrutura</li>
                <li>Desenvolver ou utilizar mecanismos que contornem restrições técnicas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo textos, imagens, logotipos, marcas, software, design e demais elementos, é propriedade da Workflow API Studio ou de seus licenciadores, protegido pelas leis de propriedade intelectual aplicáveis.
              </p>
              <p className="mt-3">
                É proibida a reprodução, distribuição, modificação ou utilização de qualquer conteúdo sem autorização prévia e expressa.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">6. Agentes de IA e Automação</h2>
              <p>
                Os agentes de IA operam com base em modelos de linguagem e regras configuradas. O Usuário reconhece que:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>As respostas dos agentes são geradas automaticamente e podem conter imprecisões</li>
                <li>A Empresa não garante a precisão absoluta das respostas geradas por IA</li>
                <li>O Usuário é responsável por revisar e supervisionar as interações dos agentes com seus clientes</li>
                <li>Configurações inadequadas dos agentes são de responsabilidade do Usuário</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">7. Disponibilidade e SLA</h2>
              <p>
                A Empresa se esforça para manter os serviços disponíveis 24/7, mas não garante disponibilidade ininterrupta. Manutenções programadas, atualizações e falhas técnicas podem resultar em indisponibilidade temporária. A Empresa notificará o Usuário sobre manutenções programadas sempre que possível.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">8. Pagamentos e Reembolsos</h2>
              <p>
                Os valores dos serviços são divulgados no momento da contratação. O Usuário concorda que:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Os pagamentos são processados por plataformas de pagamento seguras de terceiros</li>
                <li>A Empresa reserva-se o direito de ajustar preços, com comunicação prévia</li>
                <li>Reembolsos serão avaliados caso a caso, conforme a política comercial vigente</li>
                <li>Serviços já prestados não são passíveis de reembolso integral</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">9. Limitação de Responsabilidade</h2>
              <p>
                A Workflow API Studio não se responsabiliza por:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Danos indiretos, incidentais ou consequenciais decorrentes do uso dos serviços</li>
                <li>Interrupções causadas por fornecedores de infraestrutura de terceiros</li>
                <li>Conteúdo gerado pelos agentes de IA que não reflitam a posição da Empresa</li>
                <li>Perda de dados resultante de caso fortuito ou força maior</li>
                <li>Indisponibilidade do WhatsApp ou APIs de terceiros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">10. Rescisão</h2>
              <p>
                A Empresa poderá suspender ou encerrar o acesso do Usuário aos serviços, sem aviso prévio, em caso de violação destes Termos. O Usuário poderá encerrar sua conta a qualquer momento, mediante comunicação via WhatsApp ou e-mail.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">11. Alterações nos Termos</h2>
              <p>
                A Empresa reserva-se o direito de modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas através do site ou por e-mail. O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">12. Legislação Aplicável e Foro</h2>
              <p>
                Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de São Paulo - SP para dirimir quaisquer controvérsias decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">13. Contato</h2>
              <p>
                Para dúvidas sobre estes Termos de Uso:
              </p>
              <div className="mt-4 glass-strong rounded-xl p-6 border border-white/10 space-y-2">
                <p><strong className="text-white">Empresa:</strong> Workflow API Studio</p>
                <p><strong className="text-white">E-mail:</strong> <a href="mailto:felipe@workflowapi.com.br" className="text-primary-400 hover:text-primary-300">felipe@workflowapi.com.br</a></p>
                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/5511914088571?text=Olá!%20Tenho%20dúvidas%20sobre%20os%20termos%20de%20uso" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a></p>
                <p><strong className="text-white">Endereço:</strong> São Paulo - SP, Brasil</p>
              </div>
            </section>

          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link href="/" className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
