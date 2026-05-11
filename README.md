# Workflow API Studio - Site Standalone

Site oficial da Workflow API Studio, migrado do Plasmic para Next.js puro.

## 🚀 Deploy na Vercel

### 1. Conectar repositório na Vercel

```bash
# Acessar Vercel
https://vercel.com/new

# Importar repositório: sistemabritto/site
# Configurar pasta raiz: /
```

### 2. Variáveis de Ambiente (se necessário)

Nenhuma variável necessária no momento.

### 3. Deploy

```bash
# Push para main aciona deploy automático
git push origin main

# Ou deploy manual
vercel --prod
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Start em produção
npm start
```

## 📁 Estrutura

```
site-workflowapi/
├── components/          # Componentes React
│   ├── Hero.tsx
│   ├── AgentCard.tsx
│   ├── Benefits.tsx
│   ├── ROICalculator.tsx
│   ├── ClubPlugPlay.tsx
│   ├── WhatsAppCTA.tsx
│   ├── Mission.tsx
│   └── Footer.tsx
├── pages/
│   ├── index.tsx       # Homepage
│   ├── _app.tsx        # App wrapper
│   └── api/            # API routes (opcional)
├── public/
│   ├── images/         # Imagens otimizadas
│   └── favicon.ico
├── styles/
│   └── globals.css     # Estilos globais
├── next.config.mjs     # Config Next.js
├── package.json
└── tsconfig.json       # TypeScript config
```

## 🔄 Migração do Plasmic

### O que foi migrado:
- ✅ Hero section com 4 agentes
- ✅ Benefits (3 cards)
- ✅ Calculadora de ROI
- ✅ Clube Plug & Play CTA
- ✅ WhatsApp CTA principal
- ✅ Mission section
- ✅ Footer

### Próximos passos:
- [ ] Otimizar imagens (baixar do Plasmic CDN)
- [ ] Adicionar analytics (GA4)
- [ ] Manter Facebook Pixel
- [ ] Linkar blog Ghost (blog.workflowapi.com.br)
- [ ] Adicionar /llms.txt + robots.txt

## 📊 Links Importantes

- **Produção:** https://workflowapi.com.br
- **Blog:** https://blog.workflowapi.com.br
- **GitHub:** https://github.com/sistemabritto/site
- **Vercel:** https://vercel.com/sistemabritto

## 🎨 Design System

### Cores
- Primary: `#667eea` → `#764ba2` (gradient)
- Background: `#f8f9fa`
- Text: `#1a1a1a`
- Muted: `#666`, `#999`

### Fontes
- Padrão: Arial, Helvetica, sans-serif
- Títulos: Bold, 2rem+
- Corpo: 1rem, line-height 1.5

## 📞 Contato

- Email: felipe@workflowapi.com.br
- WhatsApp: +55 11 91408-8571

---

**Responsável:** @excarplex (CTO)
**Última atualização:** 11/05/2026
