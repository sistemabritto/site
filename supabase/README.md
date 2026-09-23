# Acesso à Data API nas próximas migrações

A partir de 30/10/2026, uma tabela nova em `public` só entra na Data API com `GRANT` explícito. Coloque os privilégios **na mesma migração que cria a tabela**, depois de habilitar RLS. Não copie as permissões de outra tabela sem conferir quem usa a rota.

```sql
create table public.exemplo (...);
alter table public.exemplo enable row level security;

-- Neutraliza os privilégios padrão em projetos antigos e novos.
revoke all on public.exemplo from anon, authenticated;

-- Serviço server-side, quando usa supabase-js / PostgREST.
grant select, insert, update, delete on public.exemplo to service_role;

-- Somente quando a aplicação realmente precisa de acesso público:
-- grant select on public.exemplo to anon, authenticated;
-- grant insert on public.exemplo to anon;
-- crie também políticas RLS para as operações concedidas.
```

Tabelas com dados pessoais, pagamentos, OTPs e segredos ficam sem `GRANT` para `anon` e `authenticated`. Para tabelas com `bigserial` ou `identity`, conceda também `USAGE, SELECT` na sequência à função que faz `INSERT`. Views, funções e schemas expostos exigem revisão própria.

Os arquivos SQL legados deste projeto são aplicados pelo SQL Editor; `supabase-schema.sql` cria `leads` e `customers`. Ao adicionar uma tabela, registre seu SQL de criação e seus privilégios no controle de versão. Confirme no painel **Project Settings → Data API** quais schemas estão expostos e use o Security Advisor antes de aplicar em produção.

Fonte: [aviso oficial de mudança](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) e [guia de segurança da Data API](https://supabase.com/docs/guides/api/securing-your-api).

## Aplicações do estudo de caso CRM

O funil usa `funnel_applications` como histórico imutável de envios e `funnel_integration_outbox` para entregar cada envio ao pipeline **Sessão de Start · Aplicação CRM** (`57599c7e-e678-4807-ade8-07efca578616`). A rota `/api/leads` recebe `submission_id` e só confirma depois de `record_case_application` gravar aplicação + tarefa na mesma transação. `/admin` lê a aplicação, a fila e a etapa atual do CRM. O worker `funnel-crm-worker` reaproveita contato/oportunidade quando cabível e registra o vínculo de IDs no Supabase.

Ordem de publicação:

1. Conferir no projeto ligado os grants, RLS e segredo `fulfillment_worker_secret` do Vault; a função usa `FULFILLMENT_WORKER_SECRET` e `EVO_CRM_TOKEN`. Os workers usam `EVO_CRM_API_URL` quando configurado ou `https://evoapi.workflowapi.com.br` por padrão. `EVO_CRM_URL=https://crm.workflowapi.com.br` aponta para a SPA HTML e não serve como base JSON. Confirmar a conectividade **da Edge Function** após deploy; o build local não a prova. O worker de pagamentos vincula compradores da aula Evo CRM ao estágio “Fechado” do pipeline “Aula CRM (VPS)” sem duplicar contato; o pagamento continua tendo `purchases`/`payment_events` no Supabase como origem contábil.
2. Publicar `funnel-crm-worker`, depois aplicar `20260923173448_funnel_applications_outbox.sql` e `20260923174215_schedule_funnel_crm_worker.sql`. A migração de agendamento chama a função a cada minuto. Não executar `db reset --linked` em produção.
3. Publicar o site depois das migrações. Com a versão antiga do site, as novas tabelas ficam ociosas; com o site novo antes das migrações, a aplicação recebe erro 503.
4. Antes de tráfego, fazer uma aplicação controlada e conferir o mesmo ID no Supabase, fila, CRM e `/admin`; repetir o mesmo envio, simular falha/recuperação e conferir o pagamento da Cakto. A ligação automática do pedido Cakto à aplicação e a atribuição de responsável/próxima tarefa comercial ainda são etapas pendentes.

Auditoria de grants em 23/09/2026: a consulta ao banco ativo encontrou três tabelas
legadas que não constavam das migrações locais (`quiz_funnel`, `checkout_metadata` e
`clientes_base`). A migração `20260923163922_explicit_data_api_grants.sql` cobre as
três quando presentes; `quiz_funnel` recebe somente `INSERT` para `anon` e
`authenticated`, pois `/api/track` pode usar a chave pública. As outras duas
ficam acessíveis apenas ao `service_role` por esta matriz. Para uma tabela nova,
coloque o `GRANT` no próprio arquivo que a cria e confira RLS e políticas.

As tabelas novas não concedem acesso a `anon` ou `authenticated`; somente rotas e workers com credencial de serviço leem dados pessoais. A função RPC exposta tem `EXECUTE` exclusivo do `service_role`.
