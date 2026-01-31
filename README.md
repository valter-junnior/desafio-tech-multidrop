# Sistema de Marketplace/Afiliados

Sistema completo de marketplace com programa de afiliados, desenvolvido com NestJS (Backend) e React (Frontend).

## Stack Backend

- NestJS + TypeScript
- Prisma ORM + PostgreSQL
- Docker & Docker Compose
- JWT Authentication
- Winston Logger (rotação diária)
- Jest (Unit Tests)

## Stack Frontend

- React 19 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router Dom
- TanStack Query (React Query)
- Zustand (State Management)
- Axios + Zod

## Decisões técnicas

### Backend

#### Arquitetura

Inicialmente considerei DDD + Clean Architecture, mas optei por uma abordagem mais pragmática mantendo apenas Clean Architecture com as camadas essenciais: Repository, Service, DTO e Controllers. Esta escolha equilibra organização e simplicidade para o escopo do projeto.

#### Prisma ORM

Configurado dentro de `infrastructure/database` em vez da raiz do projeto. Esta decisão mantém as dependências técnicas isoladas na camada de infraestrutura, facilitando eventual migração para outro ORM.

#### Camadas auxiliares

- **Presenters**: Transformam entidades de domínio em respostas HTTP
- **Requests**: Validam e tipam dados de entrada via class-validator
- **Mappers**: Convertem entre camadas (Prisma ↔ Domain entities)

Estas camadas desacoplam o domínio dos detalhes de comunicação externa, permitindo que mudanças na API não afetem a lógica de negócio.

### Frontend

#### Arquitetura baseada em Features

Optei por uma arquitetura baseada em features separada por domínios (`auth`, `user`, `product`, `sale`, `report`). Esta organização permite melhor separação entre componentes compartilhados (no `shared/`) e componentes específicos de cada domínio, facilitando manutenção e escalabilidade.

#### Stack de gerenciamento de estado

- **TanStack Query (React Query)**: Gerenciamento de estado assíncrono e cache de requisições HTTP, reduzindo chamadas desnecessárias à API
- **Zustand**: State management global leve e simples para dados síncronos (auth, UI state)
- **React Hook Form + Zod**: Validação de formulários com tipagem forte e performance otimizada

#### Vite como Build Tool

Escolhi o Vite pela inicialização instantânea e HMR extremamente rápido, proporcionando melhor experiência de desenvolvimento.

### Melhorias 

Para ambientes de produção e escalabilidade, as seguintes melhorias seriam implementadas:

#### Arquitetura
- **Domain-Driven Design (DDD)**: Implementar DDD completo para melhor separação de bounded contexts e agregados complexos
- **Event Sourcing**: Para auditoria completa de operações críticas (vendas, comissões)
- **CQRS**: Separação de comandos e queries para otimizar leitura/escrita

#### Observabilidade
- **Logging Distribuído**: Sistema de notificações em tempo real via Discord/Slack para erros críticos
- **APM**: Application Performance Monitoring com Datadog ou New Relic

#### Performance & Resiliência
- **Cache**: Redis para cache de produtos, comissões e relatórios frequentes
- **Rate Limiting**: Proteção contra abuso de API

#### Banco de Dados
- **UUIDs**: Migração de IDs sequenciais para UUID v7 (ordenáveis por timestamp)
- **Soft Delete**: Implementação de exclusão lógica para auditoria

## Início Rápido

### Backend

```bash
docker compose up -d --build
```

**URLs:**
- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

**URL:**
- App: http://localhost:5173

## Autenticação

A API utiliza autenticação JWT. Para acessar endpoints protegidos:

1. **Obter token JWT** (simulado - use qualquer payload válido):
```bash
# Exemplo de token JWT fake para testes
# Configure o header Authorization: Bearer <seu-token>
```

2. **Endpoints Públicos** (não requerem autenticação):
   - `GET /` - Health check

3. **Endpoints Protegidos** (requerem JWT):
   - `POST /users` - Criar usuário
   - `POST /products` - Criar produto
   - `POST /sales` - Registrar venda
   - `GET /partners/:id/commissions` - Comissões (PARTNER, ADMIN)
   - `GET /reports/sales` - Relatórios (ADMIN)

**Roles disponíveis:**
- `ADMIN` - Acesso completo
- `PARTNER` - Acesso a comissões
- `CUSTOMER` - Cliente do marketplace

**Variável de Ambiente:**
```env
JWT_SECRET=fake-jwt-secret-key
```

## Testes

### Executar Testes Unitários
```bash
npm test
```

**Testes implementados:**
- Partner Service (cálculo de comissões)
- Product Service (CRUD de produtos)
- Sale Service (validações de venda)
- User Service (gestão de usuários)
- Report Service (geração de relatórios)

## Endpoints Principais

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários (paginado)
- `GET /users/:id` - Buscar usuário por ID

### Produtos
- `POST /products` - Criar produto
- `GET /products` - Listar produtos (paginado)
- `GET /products/:id` - Buscar produto por ID

### Vendas
- `POST /sales` - Registrar venda
- `GET /sales` - Listar vendas (paginado)
- `GET /sales/:id` - Buscar venda por ID

### Parceiros
- `GET /partners/:id/commissions` - Comissões do parceiro 🔒

### Relatórios
- `GET /reports/sales` - Relatório de vendas 🔒

🔒 = Requer autenticação JWT

## Arquitetura

### Backend

```
src/
├── application/        # Casos de uso e DTOs
│   ├── dtos/          # Data Transfer Objects
│   └── services/      # Services + testes unitários
├── core/              # Domínio (Entities, Enums)
│   ├── entities/      # Entidades de domínio
│   ├── enums/         # Enumerações
│   └── repositories/  # Interfaces dos repositórios
├── infrastructure/    # Implementações técnicas
│   ├── auth/          # JWT Strategy, Guards, Decorators
│   ├── database/      # Prisma, Migrations, Seeders
│   ├── logger/        # Winston Logger (rotação diária)
│   └── http/          # Controllers, Presenters, Requests, Filters
└── main.ts            # Entry point
```

### Frontend

```
src/
├── app/
│   ├── config/         # Configurações (constants, query-client)
│   ├── routes/         # Configuração de rotas (ProtectedRoute)
│   └── services/       # Services da API (auth, user, product, sale, report)
├── features/           # Funcionalidades por domínio
│   ├── auth/           # Autenticação (hooks, pages)
│   ├── user/           # Usuários (components, hooks, pages)
│   ├── product/        # Produtos (components, hooks, pages)
│   ├── sale/           # Vendas (components, hooks, pages)
│   └── report/         # Relatórios (components, hooks, pages)
├── layout/             # Layouts principais (MainLayout)
├── shared/             # Recursos compartilhados
│   ├── components/     # Componentes reutilizáveis
│   ├── hooks/          # Hooks customizados
│   └── libs/           # Bibliotecas utilitárias
├── types/              # Tipagens TypeScript (dto, entities)
└── main.tsx            # Entry point
```

## Banco de Dados

### Migrations
```bash
npm run prisma:migrate
```

### Seed (popular banco)
```bash
npm run prisma:seed
```
## Variáveis de Ambiente

### Backend

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="fake-jwt-secret-key"
PORT=3000
LOG_LEVEL=info  # error, warn, info, debug
```

### Frontend

```env
VITE_API_URL="http://localhost:3000"
```

## Documentação da API

Acesse o Swagger em: http://localhost:3000/api/docs