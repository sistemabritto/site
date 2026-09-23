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
