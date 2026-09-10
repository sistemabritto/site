export const VPS_OFFER = { basePrice: 297, supportPrice: 250, baseProduct: 'vps-gerenciada', supportProduct: 'vps-gerenciada-combo-suporte' };
export function vpsSupportUrl(support = false) {
  const text = `Olá, Felipe! Quero confirmar a configuração da VPS Estruturada${support ? ' com suporte técnico' : ''}.\nQuero rodar: [aplicações]\nUso esperado: [pessoas ou volume]\nJá tenho servidor: [sim/não]`;
  return `https://wa.me/5511914088571?text=${encodeURIComponent(text)}`;
}
