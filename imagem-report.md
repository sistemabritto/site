# 🎨 Relatório de Imagens para Conversão — Sistema Britto

**Data:** 16/05/2026
**Análise:** Mobile-first
**Total de imagens sugeridas:** 6

---

## 📊 Resumo por Página

| Página | Imagens Atuais | Gaps | Prioridade |
|--------|---------------|------|-----------|
| `/` (Home) | 0 | Hero sem imagem, serviços sem ícones | 🔥 Alta |
| `/whatsapp` | 2 | Hero sem mockup de celular | 🔥 Alta |
| `/workforce` | 0 | 0 imagens em página high-ticket | 🔥 Alta |
| `/devops` | 0 | 0 imagens em página técnica | ⚡ Média |
| `/saas` | 0 | 0 imagens de case/produto | ⚡ Média |

---

## 🖼️ Imagens Sugeridas (6 no total)

### #1 — Hero WhatsApp Mockup (ALTA)
**Página:** `/whatsapp`
**Local:** Acima do CTA principal, logo após o subtítulo
**Formato:** 1280x720 (16:9 landscape)
**Prompt Z.AI:**
```
Modern smartphone mockup showing WhatsApp chat interface with automated AI responses, dark theme UI, green accent colors, professional business context, 3D render style, high quality, product photography lighting, clean background
```
**Por quê:** Em mobile, o lead precisa BATER O OLHO e entender que é WhatsApp automatizado. Print real do produto > texto.

---

### #2 — Dashboard Workforce (ALTA)
**Página:** `/workforce`
**Local:** Hero section, substituindo o gradiente vazio
**Formato:** 1440x900 (16:10)
**Prompt Z.AI:**
```
Futuristic AI workforce dashboard interface, multiple agent cards showing SDR, Closer, Support roles, dark theme with neon accents, data visualization, analytics graphs, modern SaaS design, high quality 3D render
```
**Por quê:** Workforce é high-ticket (R$2.5k+). Página sem imagem passa amadorismo. Dashboard conceitual tangibiliza o produto.

---

### #3 — Hero Home Abstract (ALTA)
**Página:** `/` (Home)
**Local:** Background do hero, atrás do título
**Formato:** 1920x1080 (full banner)
**Prompt Z.AI:**
```
Abstract technology background, dark gradient with subtle green glowing neural network patterns, hexagonal shapes, minimalist design, web banner style, professional corporate aesthetic, low contrast for text overlay
```
**Por quê:** Home é a porta de entrada. Background abstrato segura o lead e dá ar premium.

---

### #4 — Diagrama DevOps (MÉDIA)
**Página:** `/devops`
**Local:** Após a seção de "dores", antes do CTA
**Formato:** 1280x720
**Prompt Z.AI:**
```
Simple architecture diagram showing Docker container workflow, CI/CD pipeline visualization, dark theme, clean lines, icons for server, database, API, security shield, minimalist infographic style
```
**Por quê:** DevOps é abstrato. Diagrama visual ajuda leigo a entender o serviço.

---

### #5 — Mockup SaaS Dashboard (MÉDIA)
**Página:** `/saas`
**Local:** Hero section
**Formato:** 1440x900
**Prompt Z.AI:**
```
SaaS product dashboard mockup, analytics interface with charts and metrics, dark theme, modern UI design, clean layout, professional business software, high quality 3D render
```
**Por quê:** SaaS sob encomenda precisa mostrar "o que o cliente vai ter". Mockup genérico já tangibiliza.

---

### #6 — Timeline SaaS (BAIXA)
**Página:** `/saas`
**Local:** Após o hero, antes do CTA
**Formato:** 1280x400 (panorâmica)
**Prompt Z.AI:**
```
Timeline infographic showing product development stages: Day 1 (idea), Month 1 (MVP), Month 3 (launch), modern design, dark theme, progress indicators, minimalist style
```
**Por quê:** Mostra o processo e reduz ansiedade do cliente sobre prazos.

---

## 🛠️ Como Gerar (Z.AI)

```bash
# Exemplo: #1 — Hero WhatsApp Mockup
curl -X POST "https://api.z.ai/api/paas/v4/images/generations" \
  -H "Authorization: Bearer SUA_NOVA_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-image",
    "prompt": "Modern smartphone mockup showing WhatsApp chat interface with automated AI responses, dark theme UI, green accent colors, professional business context, 3D render style, high quality",
    "size": "1280x720",
    "quality": "hd"
  }'
```

**Observações:**
- Use `glm-image` para qualidade HD (leva ~20s)
- Use `cogview-4-250304` para teste rápido (~5s)
- Links expiram em 30 dias → baixe imediatamente
- Baixe e salve em `/opt/data/skills/ghost-cms/references/site-workflowapi/public/images/`

---

## 📁 Estrutura de Arquivos Sugerida

```
public/images/
├── hero-whatsapp-mockup.webp
├── workforce-dashboard.webp
├── home-hero-abstract.webp
├── devops-diagram.webp
├── saas-dashboard.webp
└── saas-timeline.webp
```

---

## ✅ Próximos Passos

1. **Gerar nova API key** em https://z.ai/manage-apikey/apikey-list
2. **Testar prompt** com `cogview-4-250304` (rápido, barato)
3. **Gerar em HD** com `glm-image` as 6 imagens
4. **Baixar e salvar** no diretório `public/images/`
5. **Atualizar os arquivos TSX** pra incluir as imagens
6. **Testar em mobile** (Lighthouse, responsividade)
7. **Deploy**

---

**Autor:** Excarplex (CTO Sistema Britto)
**Status:** Aguardando nova API key Z.AI
