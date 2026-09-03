# Sistema Britto — Site

Site comercial e funil da Sistema Britto, construído com Next.js e publicado na Vercel.

## Arquitetura atual

- `/` — posicionamento Vibe Seller e escada de ofertas
- `/links` — página da bio com atribuição por UTM
- `/desafio-monetizar-com-ia` — caminho assíncrono de 21 dias para quem executa sozinho
- `/sprint-vibe-seller` — acompanhamento individual de 9 semanas: “eu faço com você”
- `/implementacao-vibe-seller` — implementação sob medida de 9 semanas: “eu faço para você”
- `/whatsapp` e `/vps` — soluções específicas; VPS é alternativa para quem vai operar a própria infraestrutura
- `/admin` — leads, analytics e configuração operacional
- `pages/api` — captura, tracking, checkout, webhooks e integrações server-side

`/sistema`, `/socialjobs`, `/zapclub` e `/zapcurso` são URLs legadas e redirecionam para a oferta canônica mais próxima. Não devem voltar a ser usadas em links internos, menu, rodapé ou sitemap.

## Escada comercial

1. **Desafio Monetizar com IA**: a pessoa aprende e executa de forma assíncrona.
2. **Sessão de Arquitetura**: porta de entrada compartilhada do Sprint e da Implementação; documenta problema, escopo, custos e próximos passos. O valor pago vira crédito se a pessoa avançar.
3. **Sprint**: 9 semanas em que Felipe acompanha a execução individualmente.
4. **Implementação**: 9 semanas em que Felipe constrói e entrega a solução pronta para operar.

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

### Contador de lote do Desafio

O componente de lote consulta `/api/instagram/followers`, que usa a Instagram Graph API apenas no servidor e mantém resposta em cache de 15 minutos. Para ativar o contador realmente atualizado na Vercel, configure estas variáveis de produção (nunca com prefixo `NEXT_PUBLIC`):

- `INSTAGRAM_BUSINESS_ACCOUNT_ID`
- `INSTAGRAM_GRAPH_ACCESS_TOKEN`

Sem elas, a página não inventa uma contagem; ela apenas mostra o lote inicial até 5.000 seguidores.

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
