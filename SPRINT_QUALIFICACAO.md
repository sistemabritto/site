# Sprint: Qualificação + VSL + Downsell

## Status
- ✅ Carta de vendas escrita (COPY_VENDAS_WORKFORCE.md)
- ✅ LP VSL criada (/workforce) — copy completa, design LP Wizard
- ✅ LP Downsell R$ 297 criada (/whatsapp-ia) — LP Wizard style
- ✅ Build e deploy realizados (Vercel)
- ⏳ Perguntas de qualificação (aguardando definição)
- ⏳ Integração com Evo CRM (substituindo Supabase)

---

## URLs das Páginas

| Página | URL | Status |
|--------|-----|--------|
| VSL Workforce | https://www.sistemabritto.com.br/workforce | ✅ No ar |
| Downsell R$ 297 | https://www.sistemabritto.com.br/whatsapp-ia | ✅ No ar |
| Carta de Vendas (copy) | /COPY_VENDAS_WORKFORCE.md | ✅ Criada |

---

## Próximos Passos

### 1. Definir Perguntas de Qualificação (4 perguntas)

**P1:** [A DEFINIR]  
**P2:** [A DEFINIR]  
**P3:** [A DEFINIR]  
**P4:** "Pra implementar essa força de trabalho, investimento a partir de R$ 3.000. Você está disposto, é capaz e tem o dinheiro na mão?"

**Fluxo:**
- **Sim** → Redireciona pra página de call/agendamento (high ticket: R$ 2.500~3.500/mês)
- **Não** → Redireciona pra /whatsapp-ia (downsell R$ 297/mês)

### 2. Criar Página de Qualificação

```
/qualificacao
  ↓
  [Formulário com 4 perguntas]
  ↓
  Se Sim → /agendamento (high ticket)
  Se Não → /whatsapp-ia (downsell)
```

### 3. Integrar com Evo CRM

- Criar webhook no form → Evo CRM
- Campos: nome, email, telefone, respostas das 4 perguntas, score
- gatilho: novo lead qualificado → notificar no WhatsApp

### 4. Ajustar Copy da VSL (se necessário)

- Inserir gatilhos de urgência
- Adicionar prova social específica (depoimentos reais)
- Refinar CTA final

---

## Estrutura da VSL Atual

``
HEADLINE: "Sua empresa vai ter uma força de trabalho de IA em 48 horas. Ou você não paga nada."

SEÇÕES:
1. Abertura (O Gancho) → "Senta aqui..."
2. A Promessa → O que você vai receber
3. A Dor (3 cenas) → Lead perdido, follow-up, sem controle
4. A Solução → 5 agentes (atendimento, CRM, finanças, projetos, marketing)
5. Prova Social → Depoimentos
6. A Oferta → 3 planos (R$ 297, R$ 750, R$ 2.500)
7. Garantia → 7 dias
8. FAQ → 4 perguntas
9. CTA Final → "A primeira vaga da sua força de trabalho..."
```

---

## Próximas Ações Imediatas

1. **Felipe definir as 4 perguntas de qualificação**
2. Excarplex cria a página `/qualificacao` com formulário
3. Integrar form → Evo CRM (webhook)
4. Testar fluxo completo: VSL → Qualificação → Call ou Downsell
5. Ajustar copy/design conforme feedback

---

## Observações

- VSL atual é **escrita** (copy-first). Pode ser substituída por vídeo futuramente.
- LP de R$ 297 segue modelo **LP Wizard** (copy persuasiva, design clean, CTA claro).
- Ambas as páginas são **mobile-first** e carregam em < 1s.
- Cores: **Verde** (urgência, ação) + **Preto** (fundo) + **Branco** (contraste máximo).
