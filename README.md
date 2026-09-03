# Sistema Britto — Site

Site comercial e funil da Sistema Britto, construído com Next.js e publicado na Vercel.

## Arquitetura atual

- `/` — posicionamento Vibe Seller e escada de ofertas
- `/links` — página da bio com atribuição por UTM
- `/desafio-monetizar-com-ia` — produto coletivo de entrada (R$ 97)
- `/sprint-vibe-seller` — diagnóstico estratégico e mini-PRD (R$ 1.497)
- `/implementacao-vibe-seller` — sessão de arquitetura e entrada para projetos sob medida
- `/whatsapp`, `/socialjobs`, `/vps` e `/zapclub` — soluções comerciais específicas
- `/admin` — leads, analytics e configuração operacional
- `pages/api` — captura, tracking, checkout, webhooks e integrações server-side

`/sistema` é uma URL legada e redireciona para `/implementacao-vibe-seller`.

## Desenvolvimento

```bash
npm ci
npm run build
npm run dev
```

O repositório usa o Pages Router. Mudanças em `main` disparam o deploy de produção; trabalhe em branch, valide o build e faça revisão antes do merge.

## Integrações

- Supabase: leads, eventos, configuração e fulfillment
- Meta Pixel + CAPI: configuração lida no servidor; nunca exponha token
- GTM: ID público servido por endpoint de configuração
- Cakto: checkouts das ofertas e webhook idempotente em Supabase Edge Functions
- Evolution API: contagem da Evolution Alliance e mensagens operacionais
- Ghost: blog em `blog.sistemabritto.com.br`

O pós-compra das ofertas novas não depende de n8n. A Cakto chama
`cakto-webhook`, que registra o evento e cria jobs na outbox. O cron nativo do
Supabase chama `fulfillment-worker` a cada minuto para confirmação por
WhatsApp, sincronização com o EvoCRM e Meta CAPI, com retry e idempotência.

As credenciais ficam em variáveis da Vercel e/ou configuração server-side no Supabase. Não copie segredos para o repositório, logs ou respostas de API públicas.

## Tracking

Os CTAs usam `trackCta` em `pages/_app.tsx`. UTMs são preservadas na sessão e enviadas ao checkout quando aplicável. Ao criar ou alterar um CTA, valide:

1. evento no site;
2. UTMs no destino;
3. origem no lead/pedido;
4. webhook após pagamento.

## Produção

- Site: https://www.sistemabritto.com.br
- Blog: https://blog.sistemabritto.com.br
- Repositório: https://github.com/sistemabritto/site
