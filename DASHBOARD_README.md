# Dashboard Fonte da Juventude 📊

Dashboard completo de analytics para o funil de quiz "Fonte da Juventude".

## 🎯 Funcionalidades

### 📈 Métricas Principais
- **Total de Visitantes**: Pessoas que iniciaram o quiz
- **Leads Capturados**: WhatsApps coletados
- **Taxa de Captura**: Conversão de visitantes para leads
- **Vendas**: Total de compras aprovadas
- **Taxa de Conversão**: De leads para vendas

### 🔄 Funil Visual
Visualização completa da jornada do usuário através de 15 etapas:
- Steps 1-11 do quiz
- Resultado personalizado
- Página de vendas
- Checkout
- Compra finalizada

Barras coloridas indicam performance:
- 🟢 Verde: 70%+ (excelente)
- 🟡 Amarelo: 40-70% (moderado)
- 🔴 Vermelho: <40% (crítico)

### 📊 Gráfico de Evolução
Acompanhe leads e vendas ao longo do tempo:
- Últimos 7 dias
- Últimos 14 dias
- Últimos 30 dias

### 📋 Tabela de Leads
Visualize todos os leads capturados com:
- Nome e WhatsApp (clicável para abrir conversa)
- Idade e sintomas reportados
- Idade biológica calculada
- Última etapa alcançada
- Status de compra

**Funcionalidades:**
- 🔍 Busca por nome ou WhatsApp
- 🎯 Filtro por status (todos / compraram / não compraram)
- 📄 Paginação (20 por página)
- 📥 Exportar CSV
- 📱 Layout responsivo (cards em mobile, tabela em desktop)

### 🕒 Seletor de Período
Filtre todos os dados por:
- Hoje
- Ontem
- Últimos 7/14/30 dias
- Todo período
- Personalizado (escolha datas)

### 🔄 Auto-Refresh
- Atualização automática a cada 30 segundos
- Indicador de "Atualizado há X segundos"
- Botão de refresh manual

## 🚀 Como Acessar

1. **Configure as variáveis de ambiente**
   - Veja instruções em `SUPABASE_CONFIG.md`

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Acesse o dashboard**
   ```
   http://localhost:3000/dashboard
   ```

## 🗄️ Estrutura do Banco de Dados

### Tabelas
- `leads` - Dados de contato
- `quiz_respostas` - Respostas do quiz
- `quiz_resultados` - Cálculos (IMC, idade biológica)
- `funil_etapas` - Rastreamento de progresso
- `compras` - Registro de vendas

### Views (pré-calculadas)
- `funil_resumo` - Métricas do funil
- `leads_por_dia` - Agregação diária
- `leads_sem_compra` - Leads qualificados
- `abandono_por_etapa` - Análise de abandono

### Funções
- `calcular_imc(altura_cm, peso_kg)` - Calcula IMC
- `calcular_idade_biologica(...)` - Calcula idade biológica
- `registrar_etapa(session_id, etapa, lead_id)` - Atualiza progresso

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── dashboard/
│       └── page.tsx                    # Página principal
├── components/
│   └── dashboard/
│       ├── metrics-cards.tsx           # Cards de métricas
│       ├── funnel-chart.tsx            # Gráfico do funil
│       ├── leads-chart.tsx             # Gráfico de evolução
│       ├── leads-table.tsx             # Tabela de leads
│       └── period-selector.tsx         # Seletor de período
└── lib/
    ├── database.types.ts               # Tipos TypeScript gerados
    └── supabase.ts                     # Cliente Supabase
```

## 🎨 Design

- **Cores**: Paleta clean (branco, cinza, verde emerald)
- **Tipografia**: Inter (variável)
- **Componentes**: Cards com sombra suave, bordas arredondadas
- **Responsividade**: Mobile-first, breakpoints em `sm`, `lg`

## 📊 Métricas de Performance

- ⚡ Auto-refresh sem reload completo
- 🚀 Queries otimizadas (views pré-calculadas)
- 📱 Layout adaptativo (mobile/desktop)
- ♿ Acessível (semântica HTML correta)

## 🔐 Segurança

**⚠️ IMPORTANTE:** Esta rota ainda não está protegida!

Para proteger o dashboard, adicione autenticação:
1. **Senha simples**: Variável de ambiente + middleware
2. **Supabase Auth**: Login com email/senha
3. **OAuth**: Google, GitHub, etc.

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## 📝 Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar RLS policies no Supabase
- [ ] Adicionar mais gráficos (pizza, barras)
- [ ] Notificações em tempo real (novos leads)
- [ ] Integração com WhatsApp Business API
- [ ] Relatórios PDF exportáveis
- [ ] Dashboard mobile app (PWA)

## 🐛 Troubleshooting

**Erro: "Failed to fetch"**
- Verifique se as variáveis de ambiente estão configuradas
- Confirme se o projeto Supabase está ativo
- Verifique a conexão com a internet

**Dados não aparecem**
- Verifique se há dados nas tabelas do Supabase
- Confira os filtros de período
- Veja o console do navegador para erros

**Layout quebrado**
- Limpe o cache do Next.js: `rm -rf .next`
- Reinstale as dependências: `npm install`
- Reinicie o servidor: `npm run dev`

---

**Desenvolvido com ❤️ para Fonte da Juventude**
