import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Termos de Uso — Sistema Britto
 * sistemabritto.com.br/termos-de-uso
 */

export default function TermosDeUso() {
 return (
 <>
 <Meta
 title="Termos de Uso | Sistema Britto"
 description="Termos e condições de uso dos serviços oferecidos pela Sistema Britto."
 path="/termos-de-uso"
 />
 <Navbar />

 <div className="min-h-screen bg-surface-950 pt-20">
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
 Termos de Uso
 </h1>
 <p className="text-neutral-300 text-sm">
 Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
 </p>
 </div>
 </div>
 </div>

 <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
 <div className="prose-dark space-y-10 text-neutral-200 text-sm leading-relaxed">

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">1. Aceitação dos Termos</h2>
 <p>
 Ao acessar o site <strong className="text-white">sistemabritto.com.br</strong> ou utilizar qualquer serviço oferecido pela <strong className="text-white">Sistema Britto</strong> (“Empresa”), você confirma ter lido e aceito estes Termos de Uso em sua integralidade. Caso não concorde, não utilize nossos serviços.
 </p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">2. Serviços Oferecidos</h2>
 <p>A Sistema Britto fornece serviços de automação e inteligência artificial aplicados a negócios, incluindo:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Automação de WhatsApp Business com agentes de IA qualificadores.</li>
 <li>Gestão de conversas e CRM integrado ao WhatsApp.</li>
 <li>Produção automatizada de conteúdo para redes sociais (SocialJobs).</li>
 <li>Desenvolvimento de sistemas web sob encomenda.</li>
 <li>Estruturação de infraestrutura em nuvem (VPS configurada).</li>
 </ul>
 <p className="mt-3">A descrição completa e os valores atualizados dos serviços estão disponíveis em nosso site ou mediante contato direto.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">3. Cadastro e Conta</h2>
 <p>Alguns serviços podem exigir informações de cadastro. O usuário se compromete a:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Fornecer dados verdadeiros, completos e atualizados.</li>
 <li>Manter a confidencialidade das suas credenciais.</li>
 <li>Notificar imediatamente qualquer uso indevido da conta.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">4. Uso Aceitável</h2>
 <p>O usuário concorda em não utilizar os serviços para:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Práticas de spam ou envio de mensagens não solicitadas.</li>
 <li>Coleta de dados pessoais de terceiros sem consentimento.</li>
 <li>Atividades ilegais, fraudulentas ou que violem direitos de terceiros.</li>
 <li>Engenharia reversa, descompilação ou modificação de qualquer parte dos sistemas.</li>
 <li>Interferência no funcionamento da infraestrutura dos serviços.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">5. Propriedade Intelectual</h2>
 <p>Todo o conteúdo do site — textos, imagens, logotipos, marcas, software, código, design e demais elementos — pertence à Sistema Britto ou a seus licenciadores, sendo protegido pela legislação brasileira de propriedade intelectual.</p>
 <p className="mt-3">É vedada a reprodução, distribuição, modificação ou exploração de qualquer conteúdo sem autorização prévia e expressa por escrito.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">6. Agentes de IA e Conteúdo Gerado</h2>
 <p>Os serviços podem utilizar modelos de linguagem para gerar respostas, conteúdo ou ações automatizadas. O usuário reconhece e concorda que:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>As saídas geradas são automáticas e podem conter imprecisões.</li>
 <li>Uma resposta gerada por IA não constitui parecer profissional, legal, financeiro ou médico.</li>
 <li>O usuário é o responsável final por revisar e validar os resultados antes de utilizá-los junto a seus clientes.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">7. Disponibilidade</h2>
 <p>A Empresa busca manter os serviços disponíveis em regime contínuo, mas não garante operação ininterrupta. Indisponibilidades para manutenção programada, atualizações de segurança ou eventos fora do controle da Empresa não configuram violação destes Termos.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">8. Pagamentos e Reembolsos</h2>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Os pagamentos são processados por plataformas de pagamento seguras de terceiros.</li>
 <li>Valores e planos são divulgados no momento da contratação ou mediante proposta comercial.</li>
 <li>A Empresa reserva-se o direito de ajustar preços, com comunicação prévia.</li>
 <li>Reembolsos são avaliados caso a caso, conforme as condições comerciais vigentes no momento da contratação.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">9. Limitação de Responsabilidade</h2>
 <p>A Sistema Britto não se responsabiliza por:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Danos indiretos, incidentais ou consequenciais decorrentes do uso dos serviços.</li>
 <li>Conteúdo gerado por agentes de IA que não reflitam a posição da Empresa.</li>
 <li>Indisponibilidades decorrentes de falhas em APIs de terceiros (Meta, WhatsApp, provedores de nuvem).</li>
 <li>Perda de dados por caso fortuito, força maior ou negligência do usuário.</li>
 <li>Decision-making do cliente com base em saídas automatizadas sem revisão humana.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">10. Rescisão</h2>
 <p>A Empresa poderá suspender ou encerrar o acesso do usuário aos serviços sem aviso prévio, em caso de violação destes Termos. O cliente pode encerrar sua relação comercial a qualquer momento, pelos canais de contato oficiais.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">11. Alterações nos Termos</h2>
 <p>A Empresa pode atualizar estes Termos a qualquer momento. Alterações significativas serão comunicadas pelo site ou por e-mail. O uso continuado após a publicação de alterações constitui aceitação dos termos revisados.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">12. Legislação e Foro</h2>
 <p>Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de São Paulo - SP para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">13. Contato</h2>
 <div className="mt-4 glass-strong rounded-xl p-6 border border-white/10 space-y-2">
 <p><strong className="text-white">Empresa:</strong> Sistema Britto</p>
 <p><strong className="text-white">E-mail:</strong> <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">felipe@sistemabritto.com.br</a></p>
 <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/5511914088571?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20os%20termos%20de%20uso" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a></p>
 <p><strong className="text-white">Endereço:</strong> São Paulo - SP, Brasil</p>
 </div>
 </section>

 </div>

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
