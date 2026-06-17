import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Exclusão de Dados do Usuário — Meta Data Deletion Policy
 * sistemabritto.com.br/exclusao-dos-dados
 * Data Deletion Request — Meta App Review compliance
 */

export default function ExclusaoDeDados() {
  return (
  <>
  <Meta 
  title="Exclusão de Dados | Sistema Britto"
  description="Solicite a exclusão dos seus dados pessoais do nosso sistema. Conforme políticas da Meta e LGPD."
  path="/exclusao-dos-dados"
  />
  <Navbar />

  <div className="min-h-screen bg-surface-950 pt-20">
        {/* Header */}
        <div className="aurora-bg">
          <div className="bg-surface-950/90">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <div className="flex items-center gap-3 mb-6">
              <Image
              src="/images/logo-sistema-britto.png"
              alt="Sistema Britto"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              />
              <span className="text-white font-heading font-bold text-lg">
              Sistema Britto
              </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                Exclusão de Dados do Usuário
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
              <h2 className="text-white font-heading font-bold text-xl mb-4">1. Solicitação de Exclusão de Dados</h2>
              <p>
                Em conformidade com as políticas da <strong className="text-white">Meta</strong> (Facebook/Instagram) para aplicativos conectados à plataforma, e com a <strong className="text-white">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>, você pode solicitar a exclusão completa dos seus dados pessoais armazenados em nossos sistemas.
              </p>
              <p className="mt-3">
                Esta página atende aos requisitos da Meta para que desenvolvedores de aplicativos disponibilizem um mecanismo claro e acessível para que usuários solicitem a remoção de seus dados.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">2. Quais Dados São Excluídos</h2>
              <p>Ao solicitar a exclusão, os seguintes dados serão removidos permanentemente:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-white">Informações pessoais:</strong> nome, e-mail, número de WhatsApp e telefone</li>
                <li><strong className="text-white">Histórico de conversas:</strong> mensagens trocadas com nossos agentes de IA via WhatsApp</li>
                <li><strong className="text-white">Dados de interação:</strong> respostas de formulários, quizzes e qualificações</li>
                <li><strong className="text-white">Dados de navegação:</strong> registros de IP, cookies e preferências associados ao seu perfil</li>
                <li><strong className="text-white">Dados de anúncios:</strong> eventos de conversão e interações com Facebook Pixel vinculados ao seu identificador</li>
                <li><strong className="text-white">Metadados:</strong> datas de criação, origem (UTM), e informações contextuais associadas ao seu registro</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">3. Como Solicitar a Exclusão</h2>
              <p>Você pode solicitar a exclusão dos seus dados das seguintes formas:</p>

              <div className="mt-6 space-y-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h3 className="text-white font-heading font-bold text-base mb-2">📧 Opção 1 — Envio de E-mail</h3>
                  <p>Envie um e-mail para <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300 font-medium">felipe@sistemabritto.com.br</a> com o assunto <strong className="text-white">"Solicitação de Exclusão de Dados"</strong> e informe:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-300">
                    <li>Seu nome completo</li>
                    <li>O e-mail utilizado no cadastro</li>
                    <li>O número de WhatsApp associado</li>
                    <li>Confirmação de que deseja a exclusão completa dos seus dados</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h3 className="text-white font-heading font-bold text-base mb-2">💬 Opção 2 — WhatsApp</h3>
                  <p>Envie uma mensagem pelo WhatsApp para <a href="https://wa.me/5511914088571?text=Olá!%20Gostaria%20de%20solicitar%20a%20EXCLUSÃO%20COMPLETA%20dos%20meus%20dados%20do%20sistema.%20Meu%20e-mail%20de%20cadastro%20é:" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-medium">+55 11 91408-8571</a> solicitando a exclusão dos seus dados. Informe seu e-mail de cadastro na mensagem.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h3 className="text-white font-heading font-bold text-base mb-2">🌐 Opção 3 — Formulário Online</h3>
                  <p>Acesse nosso <a href="https://wa.me/5511914088571?text=Olá!%20Quero%20solicitar%20a%20exclusão%20dos%20meus%20dados%20pessoais%20(conforme%20LGPD%20e%20políticas%20da%20Meta)" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-medium">canal de atendimento</a> e solicite diretamente a remoção. Responderemos em até <strong className="text-white">5 dias úteis</strong> confirmando a exclusão.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">4. Prazo de Atendimento</h2>
              <p>
                Processaremos sua solicitação de exclusão em até <strong className="text-white">5 (cinco) dias úteis</strong> após a confirmação da sua identidade. Em casos complexos, o prazo pode ser estendido por mais 5 dias úteis, mediante comunicação prévia.
              </p>
              <p className="mt-3">
                Após o processamento, você receberá uma confirmação por e-mail ou WhatsApp informando que todos os seus dados foram removidos permanentemente dos nossos sistemas ativos e backups.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">5. Exclusão de Dados via Meta (Facebook/Instagram)</h2>
              <p>
                Se você acessou nosso aplicativo através do Facebook ou Instagram (via Meta Login), seus dados também podem ser gerenciados diretamente nas configurações da sua conta Meta:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Acesse <strong className="text-white">Configurações e Privacidade</strong> no Facebook ou Instagram</li>
                <li>Vá em <strong className="text-white">Configurações → Aplicativos e Sites</strong></li>
                <li>Encontre o aplicativo <strong className="text-white">Sistema Britto</strong></li>
                <li>Clique em <strong className="text-white">Remover</strong> para revogar o acesso e solicitar a exclusão dos dados compartilhados conosco</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-300 text-xs font-medium">
                  ⚠️ Importante: A remoção do aplicativo nas configurações da Meta remove o vínculo entre sua conta Meta e nosso sistema, mas pode não excluir dados já armazenados em nossos servidores. Recomendamos também utilizar uma das opções na Seção 3 acima para garantir a exclusão completa.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">6. Exceções</h2>
              <p>
                Determinados dados podem ser retidos mesmo após sua solicitação de exclusão, quando exigido por lei ou para cumprimento de obrigações legais e regulatórias, incluindo:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Dados necessários para cumprimento de obrigações fiscais e contábeis (retenção legal de até 5 anos)</li>
                <li>Dados envolvidos em disputas legais até sua resolução final</li>
                <li>Registros de transações financeiras exigidos por lei</li>
              </ul>
              <p className="mt-3">
                Nestes casos, os dados serão retidos pelo prazo mínimo exigido por lei e posteriormente excluídos de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">7. Segurança no Processo de Exclusão</h2>
              <p>
                Antes de processar a exclusão, adotamos medidas para verificar sua identidade e garantir que a solicitação é legítima:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Confirmação de identidade através do e-mail cadastrado</li>
                <li>Verificação adicional via WhatsApp, se necessário</li>
                <li>Registro da solicitação com data, hora e protocolo</li>
              </ul>
              <p className="mt-3">
                Após a exclusão, os dados são removidos de forma segura dos nossos sistemas ativos e dos backups no prazo definido. Os backups são sobrescritos ciclicamente, garantindo que não haja cópias residuais após o ciclo completo.
              </p>
            </section>

            <section>
              <h2 className="text-white font-heading font-bold text-xl mb-4">8. Contato para Dúvidas</h2>
              <p>
                Se tiver dúvidas sobre o processo de exclusão de dados ou sobre seus direitos como titular de dados:
              </p>
              <div className="mt-4 glass-strong rounded-xl p-6 border border-white/10 space-y-2">
                <p><strong className="text-white">Empresa:</strong> Sistema Britto</p>
                <p><strong className="text-white">E-mail:</strong> <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">felipe@sistemabritto.com.br</a></p>
                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/5511914088571?text=Olá!%20Tenho%20dúvidas%20sobre%20a%20exclusão%20de%20dados" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a></p>
                <p><strong className="text-white">DPO:</strong> <a href="mailto:dpo@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">dpo@sistemabritto.com.br</a></p>
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