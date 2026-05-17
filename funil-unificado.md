# Funil Unificado — Sistema Britto (v2)

## Princípio: 2 fluxos, 3 portas de entrada, 1 destino

### Mapa de Fluxo

```
                        /qualificacao-whatsapp
                       /                      \
Home → (escolhe) → Página de produto → → → → → /qualificacao-digital
                                                /
WhatsApp → /whatsapp → modal (só email) → /resultado-whatsapp
Workforce → /workforce → modal (nome/email/zap) → /resultado-workforce
DevOps → /devops → modal (nome/email/zap) → /resultado-digital
SaaS → /saas → modal (nome/email/zap) → /resultado-digital
```

### Regras de Ouro

1. **Toda página de produto DEVE ter 1 modal que coleta dados.**
2. **Toda página de produto DEVE levar a 1 página de resultado.**
3. **Toda página de resultado DEVE ter CTA claro: checkout OU WhatsApp.**
4. **NUNCA** redirecionar direto pro WhatsApp sem mostrar resultado primeiro.

### Fluxo A — WhatsApp (R$ 297/mês, checkout direto)
```
/whatsapp → modal (email) → /resultado-whatsapp (plano + order bump + preço) → checkout AbacatePay
```

### Fluxo B — Workforce (R$ 2.500+/mês, WhatsApp do Felipe)
```
/workforce → modal (nome/email/whatsapp) → /resultado-workforce (resumo + cases + CTA) → WhatsApp
```

### Fluxo C — Digital (DevOps/SaaS, sob medida)
```
/devops → modal → /resultado-digital (2 cards: DevOps ou SaaS)
/saas → modal → /resultado-digital (2 cards: DevOps ou SaaS)
```

### O que NÃO fazer
- ❌ Modal → WhatsApp direto (sem resultado, sem confirmação)
- ❌ CTA na Home → /qualificacao (sem contexto do produto)
- ❌ Página de resultado sem customer data no sessionStorage
- ❌ Redirecionar pra qualificação genérica sem saber o que o lead quer