# UX Upgrade — Recomendações baseadas no claude-cookbooks

**Data:** 2026-06-09  
**Site:** sistemabritto.com.br  
**Referência:** https://github.com/anthropics/claude-cookbooks

---

## 1. ⚡ Progress Indicator com Feedback de Etapa (Quiz)

**O que mudar:** O quiz tem um progress bar simples (`h-2`). Adicionar micro-feedback visual por etapa completa.

**Onde:** `/quiz` — componente de progress

**Como implementar:**
```tsx
// Antes: progress bar genérico
<div className="bg-primary-500 h-2 rounded-full" style={{ width: `${progress}%` }} />

// Depois: progress com steps visuais + confetti micro na última etapa
<div className="flex gap-2 mb-6">
  {allQuestions.map((q, i) => (
    <div key={q.id} className={`flex-1 h-2 rounded-full transition-all duration-500 ${
      i < currentStep ? 'bg-green-500' : 
      i === currentStep ? 'bg-green-500/50 animate-pulse' : 
      'bg-white/10'
    }`} />
  ))}
</div>
// + micro-confetti CSS animation quando completa a última pergunta
```

**Por que:** O claude-cookbooks usa "step completion" visual em todos os notebooks interativos (células executadas ficam verdes). Isso reduz ansiedade do usuário e aumenta completion rate.

---

## 2. 🤖 Typing Indicator no SDR Preview

**O que mudar:** Na home, onde mostra "dezenas de especialistas", adicionar um preview de como o agente SDR conversa — com typing animation.

**Onde:** `index.tsx` — seção hero ou abaixo do hero

**Como implementar:**
```tsx
// Componente: SDRPreview.tsx
const SDRPreview = () => {
  const messages = [
    { from: 'bot', text: 'Oi, tudo bem? 😊' },
    { from: 'bot', text: 'Me conta: qual parte do seu atendimento você quer automatizar?' },
    { from: 'user', text: 'Quero automatizar o WhatsApp da minha clínica' },
    { from: 'bot', text: 'Show! Clínica é o nosso forte — quer ver como funciona na prática?' },
  ];
  // typing animation com delay entre mensagens
  // useEffect com setTimeout para revelar mensagens uma a uma
  // typing dots (●●●) antes de cada resposta do bot
};

// Na home:
<section className="py-16 px-4">
  <SDRPreview />
  <p className="text-gray-400 text-sm mt-4">Isso roda 24h. Sem pausa. Sem erro.</p>
</section>
```

**Por que:** O claude-cookbooks mostra **output em tempo real** (streaming) em todos os agent demos. Ver o agente "pensando e respondendo" é mais convincente do que qualquer descrição estática. É a prova visual de que funciona.

---

## 3. 🔄 Evaluator-Optimizer Pattern para Copy

**O que mudar:** Implementar o pattern "evaluator-optimizer" do cookbook para A/B test automático de copy no hero.

**Onde:** API `/api/leads` + componente Hero

**Como implementar:**
```tsx
// Manter 2-3 variações de hero copy no backend
// Rotear 33/33/33 para visitantes novos
// Trackear conversion por variação
// O "evaluator" = métrica de conversion
// O "optimizer" = promover a variação com melhor taxa

// Hero variant component:
const heroVariants = {
  A: "10% dos seus concorrentes já operam com IA 24h.",
  B: "Seu WhatsApp perde leads enquanto você dorme.",  
  C: "Cada dia sem IA é R$XXX indo embora.",
};
```

**Por que:** O cookbook de evaluator-optimizer mostra que iteração baseada em feedback supera abordagem estática. Em vez de apostar em 1 copy, iterar baseado em dados reais.

---

## 4. 🎯 Routing Pattern para Personalização Dinâmica

**O que mudar:** Quando o visitante chega com UTM, a HOME deve adaptar conteúdo (não só o SDR).

**Onde:** `index.tsx` — hero + seção de produtos

**Como implementar:**
```tsx
// Routing pattern do basic_workflows.ipynb
// Detectar UTM na URL e rearranjar a ordem dos products[]
useEffect(() => {
  const source = new URLSearchParams(window.location.search).get('utm_source');
  if (source === 'socialjobs') {
    // SocialJobs aparece primeiro, com destaque
    setProducts(prev => {
      const social = prev.find(p => p.id === 'socialjobs');
      const others = prev.filter(p => p.id !== 'socialjobs');
      return [social, ...others];
    });
  }
  // mesmo para whatsapp, sistema, vps
}, []);
```

**Por que:** O routing pattern do cookbook seleciona o caminho especializado baseado no input. Se o lead veio de /socialjobs, mostrar WhatsApp primeiro é desperdício de atenção.

---

## 5. 🧪 Interactive Demo "Try Before Buy"

**O que mudar:** Adicionar um sandbox/demo interativo onde o visitante pode testar o SDR em tempo real direto no site.

**Onde:** Nova seção na home, entre hero e produtos

**Como implementar:**
```tsx
// Mini-chat widget que chama a EvoCRM API
// ou um mock com respostas pré-definidas
const ChatDemo = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const handleSend = async (text) => {
    setMessages(prev => [...prev, { from: 'user', text }]);
    // chamar endpoint /api/sdr-demo (mock ou real)
    const reply = await fetchSDRReply(text);
    setMessages(prev => [...prev, { from: 'bot', text: reply }]);
  };
};

// Renderizar como chat bubble flutuante ou seção inline
```

**Por que:** O cookbook de managed_agents tem "session_browser_demo" — demos interativas convertem mais do que screenshots ou descrições. O visitante prova o produto antes de se qualificar.

---

## 6. 📊 ROI Calculator com Output Visual

**O que mudar:** O `ROICalculator.tsx` existe mas pode ser mais impactante com visual style de "relatório gerado por IA" (como o data_analyst_agent).

**Onde:** Página /whatsapp ou /sistema

**Como implementar:**
- Após o usuário preencher os inputs, gerar um "mini-relatório" visual
- Usar progress bars, ícones e cores para mostrar economia
- Adicionar animação de "crescimento" nos números (count-up)
- Incluir CTA direto abaixo do resultado: "Quero esses resultados →"

**Por que:** O data_analyst_agent do cookbook gera relatórios visuais a partir de dados brutos. Transformar inputs do usuário em "insight visual" é mais persuasivo do que números crus.

---

## 7. 🏗️ Orchestrator-Workers para Funil Multi-Agente

**O que mudar:** Quando o SDR qualifica, em vez de mandar direto pro WhatsApp, orquestrar múltiplos "micro-agentes" no backend que preparam o contexto:

**Onde:** Backend `/api/leads` + EvoCRM

**Como implementar:**
```python
# Orchestrator recebe o lead qualificado
# Worker 1: gera proposta personalizada baseada nas respostas
# Worker 2: busca cases do mesmo segmento
# Worker 3: prepara mensagem de follow-up
# Orchestrator compila tudo e manda pro SDR

# Resultado: quando o especialista atende, já tem:
# - Proposta rascunho
# - Cases relevantes
# - Script de follow-up
```

**Por que:** O orchestrator-workers pattern do cookbook mostra que tarefas complexas se beneficiam de decomposição dinâmica. Em vez de um SDR genérico, cada lead recebe atenção de múltiplos especialistas.

---

## 8. ♿ Acessibilidade + Schema.org para LLMs

**O que mudar:** Adicionar structured data (JSON-LD) em cada página para que LLMs e crawlers entendam melhor o conteúdo.

**Onde:** Todas as páginas — componente `Meta.tsx`

**Como implementar:**
```tsx
// Em Meta.tsx, adicionar JSON-LD para Organization + Service
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sistema Britto",
  "url": "https://www.sistemabritto.com.br",
  "description": "Automação com IA, DevOps e workforces de agentes autônomos",
  "areaServed": "BR",
  "service": [
    {
      "@type": "Service", 
      "name": "WhatsApp com IA",
      "description": "Atendimento automático 24/7 via WhatsApp com agentes de IA",
      "url": "https://www.sistemabritto.com.br/whatsapp"
    },
    // ... outros serviços
  ]
})}} />
```

**Por que:** LLMs como ChatGPT, Claude e Perplexity usam schema.org para entender contexto. O llms.txt + schema.org juntos maximizam descoberta.

---

## 9. 🎨 Visual Design: Dark Glass Morphism

**O que mudar:** Aplicar glass morphism sutil nos cards de produto e seções, inspirado no estilo dos cookbooks.

**Onde:** Cards de produto na home, resultado page

**Como implementar:**
```tsx
// Antes: bg-black/80 com border branca
// Depois: glass effect com blur + gradient
<div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl shadow-2xl">
  {/* Inner glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl" />
</div>
```

**Por que:** O claude-cookbooks usa design limpo e moderno que prioriza legibilidade. Glass morphism com dark theme transmite sofisticação sem poluir o conteúdo.

---

## 10. 🔄 Human-in-the-Loop Gate no Quiz

**O que mudar:** Adicionar uma etapa "gate" no quiz — quando o lead é high-value (urgente + invisto pesado), pausar e perguntar se quer falar com especialista AGORA.

**Onde:** `/quiz` — após processQuiz()

**Como implementar:**
```tsx
// Se answers = {urgente + pesado}: 
// Mostrar modal: "Parece que você precisa disso ontem. Quer falar com um especialista agora?"
// Se sim → wa.me direto com prioridade
// Se não → seguir fluxo normal

const isHighValue = answers.q4 === 'urgente' && answers.q3 === 'pesado';
if (isHighValue) {
  setShowHighValueGate(true);
  // não redireciona automaticamente
}
```

**Por que:** O CMA_gate_human_in_the_loop do cookbook mostra que "gates" aumentam qualidade sem adicionar fricção para quem não precisa. High-value leads merecem atendimento prioritário.

---

## Prioridade de Implementação

1. **🔴 Alta** — Routing por UTM (#4) — impacto direto em conversão
2. **🔴 Alta** — SDR Preview animado (#2) — prova visual do produto
3. **🟡 Média** — Progress indicator (#1) — melhora completion rate do quiz
4. **🟡 Média** — Schema.org/JSON-LD (#8) — descoberta por LLMs
5. **🟡 Média** — Glass morphism (#9) — upgrade visual rápido
6. **🟢 Baixa** — Interactive demo (#5) — complexo mas diferencial
7. **🟢 Baixa** — HITL gate (#10) — edge case, poucos leads high-value
8. **🟢 Baixa** — ROI calculator visual (#6) — nice-to-have
9. **⚪ Depois** — A/B test evaluator (#3) — precisa de volume
10. **⚪ Depois** — Orchestrator multi-agente (#7) — backend complexo
