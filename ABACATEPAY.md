# AbacatePay Integration — Sistema Britto

## Configuração
- **API Key:** `abc_dev_stLP4GLSqfgnHygHA6uuCSKs`
- **Base URL:** `https://api.abacatepay.com/v2`
- **Valores:** Sempre em **centavos** (R$ 297 = 29700)
- **Auth:** Header `Authorization: Bearer {API_KEY}`

## Produtos Criados

| Nome | External ID | Product ID | Preço | Tipo |
|------|-------------|------------|-------|------|
| WhatsApp IA Básico | `whatsapp-ia-basico` | `prod_jRg20GUgAmEjhy3QCr45ZtKn` | R$ 297/mês | Assinatura |
| CRM + IA Completo | `crm-ia-completo` | `prod_CWRuQwLLLJyKcFcFcUYCEfwUAG` | R$ 750/mês | Assinatura |
| EvoNexus Premium | `evonexus-premium` | `prod_uqRB2KTALEQWumHkp3h2PJLX` | R$ 2.500/mês | Assinatura |
| Hermes Self-Hosted | `hermes-selfhosted` | `prod_bzFSpy31qQc2z6rTpBhASz2X` | R$ 3.500 | Setup único |

## Webhook
- **ID:** `webh_dev_L50xzQKcxpGfTR6p0JCQCWWW`
- **Endpoint:** `https://workflowapi.com.br/api/abacatepay/webhook`
- **Secret:** `sb_abacate_wh_secret_2026`
- **Eventos:** checkout.completed, checkout.refunded, transparent.completed, transparent.refunded, subscription.completed, subscription.cancelled, subscription.renewed

## Fluxo de Pagamento

### Checkout Hospedado (Recomendado)
```bash
curl -X POST "https://api.abacatepay.com/v2/checkouts/create" \
  -H "Authorization: Bearer abc_dev_stLP4GLSqfgnHygHA6uuCSKs" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"id": "prod_jRg20GUgAmEjhy3QCr45ZtKn", "quantity": 1}],
    "customer": {"email": "cliente@email.com", "name": "Nome Cliente"},
    "returnUrl": "https://www.sistemabritto.com.br/obrigado"
  }'
```

Resposta:
```json
{
  "data": {
    "id": "chk_...",
    "url": "https://pay.abacatepay.com/checkout/..."
  },
  "success": true
}
```

### Webhook Payload (exemplo)
```json
{
  "event": "checkout.completed",
  "data": {
    "id": "chk_...",
    "externalId": "whatsapp-ia-basico",
    "customer": {
      "email": "cliente@email.com",
      "name": "Nome Cliente"
    },
    "items": [{"id": "prod_...", "name": "WhatsApp IA Básico"}]
  }
}
```

## Próximos Passos
1. ✅ Produtos criados na AbacatePay
2. ✅ Webhook configurado
3. ⏳ Criar API route `/api/abacatepay/webhook` no Next.js
4. ⏳ Criar componente `PlanCard` com botão "Assinar" → AbacatePay
5. ⏳ Integrar com CRM (EvoNexus) para notificar novo cliente
