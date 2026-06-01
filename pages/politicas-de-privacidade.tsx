import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Política de Privacidade — LGPD compliant
 * sistemabritto.com.br/politicas-de-privacidade
 */

export default function PoliticasDePrivacidade() {
  return (
  <>
  <Meta 
  title="Política de Privacidade | Sistema Britto"
  description="Política de privacidade e tratamento de dados pessoais conforme LGPD."
  path="/politicas-de-privacidade"
  />
  <Navbar />

  <div className="min-h-screen bg-surface-950 pt-20">
        {/* Header */}
        <div className="aurora-bg">
          <div className="bg-surface-950/90">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/logo-white.png"
                  alt="Sistema Britto"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className="text-white font-heading font-bold text-lg">
                  Workflow<span className="text-primary-400">API</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                Política de Privacidade
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
              <h2 className="text-white font-heading font-bold text-xl mb-4">1. Informações Gerais</h2>
              <p>
                A <strong className="text-white">Sistema Britto</strong> ("nós", "nosso" ou "empresa"), inscrita no CNPJ sob o número a ser definido, com sede na cidade de São Paulo - SP, é a controladora dos dados pessoais coletados através do site <strong className="text-white">sistemabritto.com.br</strong> e dos serviços de automação via WhatsApp.
              </p>
              <p className="mt-3">
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais, em conformidade com a <strong className="text-white">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">2. Dados que Coletamos</h2>
              <p>Coletamos os seguintes dados pessoais:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-white">Dados de identificação:</strong> nome completo, número de WhatsApp, e-mail e nome da empresa, fornecidos voluntariamente ao entrar em contato conosco.</li>
                <li><strong className="text-white">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e fonte de tráfego, coletados automaticamente via cookies e tecnologias similares.</li>
                <li><strong className="text-white">Dados de interação:</strong> mensagens enviadas aos nossos agentes de IA via WhatsApp, incluindo conteúdo conversacional processado para prestação do serviço de automação.</li>
                <li><strong className="text-white">Dados de conversão:</strong> informações sobre interações com anúncios e eventos de conversão, coletados via Facebook Pixel para mensuração de campanhas publicitárias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">3. Finalidades do Tratamento</h2>
              <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Prestação dos serviços de automação e agentes de IA via WhatsApp</li>
                <li>Qualificação de leads e atendimento comercial personalizado</li>
                <li>Envio de comunicações sobre nossos serviços, quando autorizado</li>
                <li>Melhoria contínua dos nossos serviços e experiência do usuário</li>
                <li>Mensuração e otimização de campanhas publicitárias</li>
                <li>Cumprimento de obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">4. Base Legal para o Tratamento</h2>
              <p>O tratamento dos seus dados pessoais se fundamenta nas seguintes bases legais previstas na LGPD:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-white">Consentimento (Art. 7º, I):</strong> para envio de comunicações de marketing e coleta de dados de navegação via cookies</li>
                <li><strong className="text-white">Execução de contrato (Art. 7º, V):</strong> para prestação dos serviços contratados</li>
                <li><strong className="text-white">Legítimo interesse (Art. 7º, IX):</strong> para qualificação de leads, melhoria dos serviços e segurança do sistema</li>
                <li><strong className="text-white">Cumprimento de obrigação legal (Art. 7º, II):</strong> para obrigações fiscais e regulatórias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">5. Compartilhamento de Dados</h2>
              <p>Seus dados poderão ser compartilhados com:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-white">Provedores de serviços:</strong> empresas que atuam em nosso nome para processamento de pagamentos, hospedagem e infraestrutura</li>
                <li><strong className="text-white">Plataformas de anúncios:</strong> Meta (Facebook/Instagram) para mensuração e otimização de campanhas</li>
                <li><strong className="text-white">Autoridades:</strong> quando exigido por lei ou decisão judicial</li>
              </ul>
              <p className="mt-3">Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.</p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">6. Cookies e Tecnologias de Rastreamento</h2>
              <p>Utilizamos as seguintes tecnologias:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-white">Cookies essenciais:</strong> necessários para o funcionamento do site</li>
                <li><strong className="text-white">Cookies de análise:</strong> para entender como os visitantes usam o site</li>
                <li><strong className="text-white">Facebook Pixel:</strong> para rastreamento de conversões e otimização de anúncios</li>
              </ul>
              <p className="mt-3">Você pode gerenciar suas preferências de cookies nas configurações do navegador.</p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">7. Armazenamento e Segurança</h2>
              <p>
                Seus dados pessoais são armazenados em servidores seguros localizados no Brasil e/ou em países que oferecem nível adequado de proteção de dados. Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, destruição, perda ou alteração, incluindo:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
                <li>Controle de acesso baseado em funções</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e plano de recuperação de desastres</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">8. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Dados de navegação são retidos por até 12 meses. Dados contratuais são mantidos pelo prazo legal aplicável.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">9. Seus Direitos (Titular de Dados)</h2>
              <p>Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-white">Confirmação e acesso:</strong> confirmar a existência e acessar seus dados pessoais</li>
                <li><strong className="text-white">Correção:</strong> solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                <li><strong className="text-white">Anonimização ou eliminação:</strong> solicitar a anonimização ou eliminação de dados desnecessários</li>
                <li><strong className="text-white">Portabilidade:</strong> solicitar a portabilidade dos seus dados a outro fornecedor</li>
                <li><strong className="text-white">Revogação do consentimento:</strong> revogar o consentimento a qualquer momento</li>
                <li><strong className="text-white">Oposição:</strong> opor-se ao tratamento realizado sem seu consentimento</li>
              </ul>
              <p className="mt-3">
                Para exercer seus direitos, entre em contato conosco através do e-mail <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">felipe@sistemabritto.com.br</a> ou pelo WhatsApp <a href="https://wa.me/5511914088571?text=Olá!%20Gostaria%20de%20exercer%20meus%20direitos%20de%20titular%20de%20dados%20conforme%20a%20LGPD" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">10. Agente de Proteção de Dados (DPO)</h2>
              <p>
                Para questões relacionadas à proteção de dados pessoais, você pode contatar nosso Encarregado de Proteção de Dados (DPO) pelo e-mail <a href="mailto:dpo@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">dpo@sistemabritto.com.br</a>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">11. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações significativas serão comunicadas através do nosso site. A data de última atualização é indicada no topo desta página.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">12. Contato</h2>
              <p>
                Para dúvidas, solicitações ou reclamações sobre esta política ou o tratamento dos seus dados pessoais:
              </p>
              <div className="mt-4 glass-strong rounded-xl p-6 border border-white/10 space-y-2">
                <p><strong className="text-white">Empresa:</strong> Sistema Britto</p>
                <p><strong className="text-white">E-mail:</strong> <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">felipe@sistemabritto.com.br</a></p>
                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/5511914088571?text=Olá!%20Tenho%20dúvidas%20sobre%20a%20política%20de%20privacidade" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a></p>
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
          <Footer />
          </>
  );
}
