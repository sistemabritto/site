import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function PoliticasDePrivacidade() {
 return (
 <>
 <Meta
 title="Política de Privacidade | Sistema Britto"
 description="Tratamento de dados pessoais conforme a LGPD. Saiba como coletamos, usamos, compartilhamos e protegemos seus dados."
 path="/politicas-de-privacidade"
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
 Política de Privacidade
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
 <h2 className="text-white font-heading font-bold text-xl mb-4">1. Controlador de Dados</h2>
 <p>
 A <strong className="text-white">Sistema Britto</strong> é a controladora dos dados pessoais tratados por meio do site
 <strong className="text-white">sistemabritto.com.br</strong> e dos serviços de automação comercial ligados ao ecossistema EvoCRM / Evolution API.
 </p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">2. Dados Coletados</h2>
 <p>Coletamos apenas os dados estritamente necessários para cada etapa de atendimento e entrega:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li><strong className="text-white">Dados de identificação:</strong> nome completo, e-mail e número de WhatsApp.</li>
 <li><strong className="text-white">Dados de contato comercial:</strong> origem do contato, canal de entrada e anotações de qualificação.</li>
 <li><strong className="text-white">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas acessadas, origem do tráfego e registros de cookie.</li>
 <li><strong className="text-white">Dados de conversação:</strong> mensagens trocadas com agentes automatizados, quando o usuário interage pelo WhatsApp.</li>
 <li><strong className="text-white">Dados de publicidade:</strong> eventos de conversão e dados de campanha quando há integração com Meta (Facebook/Instagram Ads).</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">3. Finalidades do Tratamento</h2>
 <p>Os dados são utilizados para:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Atendimento comercial e qualificação de oportunidade.</li>
 <li>Prestação dos serviços contratados pelo cliente.</li>
 <li>Envio de comunicações relacionadas ao serviço, quando permitido.</li>
 <li>Segurança, prevenção a fraudes e conformidade regulatória.</li>
 <li>Mensuração de desempenho de campanhas publicitárias.</li>
 <li>Melhoria contínua do site e dos fluxos automatizados.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">4. Base Legal</h2>
 <p>O tratamento se fundamenta nas bases legais previstas na LGPD:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li><strong className="text-white">Execução de contrato ou medidas preparatórias:</strong> quando o usuário solicita um serviço, um orçamento ou uma demonstração.</li>
 <li><strong className="text-white">Legítimo interesse:</strong> quando necessário para segurança, prevenção a fraudes ou melhoria do serviço.</li>
 <li><strong className="text-white">Consentimento:</strong> quando expressamente fornecido pelo usuário, especialmente para comunicações de marketing e cookies não essenciais.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">5. Compartilhamento com Terceiros</h2>
 <p>Podemos compartilhar dados com operadores e provedores que atuam em nosso nome, inclusive fora do Brasil quando necessário:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li><strong className="text-white">Plataformas de anúncios:</strong> Meta Platforms (Facebook e Instagram), exclusivamente para mensuração e otimização de campanhas.</li>
 <li><strong className="text-white">Processadores de pagamento:</strong> plataformas de pagamento contratadas para processar transações.</li>
 <li><strong className="text-white">Infraestrutura e hospedagem:</strong> provedores de nuvem e serviços de mensageria usados para operar os fluxos automatizados.</li>
 <li><strong className="text-white">Autoridades:</strong> quando exigido por lei, ordem judicial ou obrigação regulatória.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">6. Cookies e Tecnologias de Rastreamento</h2>
 <p>Utilizamos cookies essenciais e, quando permitido, cookies de análise e publicidade. Os dados coletados por meio dessas tecnologias podem ser compartilhados com a Meta para mensuração de anúncios.</p>
 <p className="mt-3">Você pode gerenciar preferências de cookies no painel do navegador, observando que a desativação pode afetar a experiência do site.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">7. Armazenamento e Segurança</h2>
 <p>Adotamos medidas técnicas e administrativas compatíveis com a LGPD:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Criptografia em trânsito (HTTPS/TLS).</li>
 <li>Controles de acesso e monitoramento.</li>
 <li>Backups periódicos segregados por finalidade.</li>
 <li>Exclusão segura e irreversível quando aplicável.</li>
 </ul>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">8. Retenção de Dados</h2>
 <p>Mantemos os dados pelo período necessário ao cumprimento das finalidades informadas ou por exigência legal. Dados de marketing são mantidos enquanto houver consentimento ativo, podendo ser atualizados ou excluídos mediante solicitação.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">9. Direitos do Titular</h2>
 <p>Você pode, a qualquer momento:</p>
 <ul className="list-disc pl-5 mt-3 space-y-2">
 <li>Confirmar a existência de tratamento e solicitar acesso aos dados.</li>
 <li>Solicitar correção, anonimização, bloqueio ou eliminação de dados.</li>
 <li>Revogar consentimento para comunicações ou para compartilhamento com a Meta.</li>
 <li>Solicitar a portabilidade dos dados, quando cabível.</li>
 <li>Questionar decisões automatizadas quando elas impactarem você diretamente.</li>
 </ul>
 <p className="mt-3">Para exercer esses direitos, utilize um dos canais abaixo.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">10. Encarregado de Proteção de Dados (DPO)</h2>
 <p>Para dúvidas, solicitações ou registros relacionados à privacidade, o canal oficial é:</p>
 <div className="mt-4 glass-strong rounded-xl p-6 border border-white/10 space-y-2">
 <p><strong className="text-white">E-mail:</strong> <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">felipe@sistemabritto.com.br</a></p>
 <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/5511914088571?text=Ol%C3%A1!%20Gostaria%20de%20tratar%20de%20um%20assunto%20de%20privacidade%20e%20prote%C3%A7%C3%A3o%20de%20dados" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a></p>
 <p><strong className="text-white">Endereço:</strong> São Paulo - SP, Brasil</p>
 </div>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">11. Alterações</h2>
 <p>Esta política pode ser atualizada para refletir mudanças legais, tecnológicas ou operacionais. A data da versão vigente é indicada no início desta página.</p>
 </section>

 <section>
 <h2 className="text-white font-heading font-bold text-xl mb-4">12. Contato</h2>
 <div className="mt-4 glass-strong rounded-xl p-6 border border-white/10 space-y-2">
 <p><strong className="text-white">Empresa:</strong> Sistema Britto</p>
 <p><strong className="text-white">E-mail:</strong> <a href="mailto:felipe@sistemabritto.com.br" className="text-primary-400 hover:text-primary-300">felipe@sistemabritto.com.br</a></p>
 <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/5511914088571?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20a%20pol%C3%ADtica%20de%20privacidade" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">+55 11 91408-8571</a></p>
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
