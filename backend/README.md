# Sistema de Marketplace/Afiliados - Backend

API REST desenvolvida com NestJS para gerenciamento de marketplace com programa de afiliados.

## 🚀 Stack

- NestJS + TypeScript
- Prisma ORM + PostgreSQL
- Docker & Docker Compose
- JWT Authentication
- Jest (Unit Tests)

## ⚡ Início Rápido

```bash
docker compose up -d --build
```

**URLs:**
- 🌐 API: http://localhost:3000
- 📚 Swagger: http://localhost:3000/api/docs

## 🔐 Autenticação

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

## 🧪 Testes

### Executar Testes Unitários
```bash
npm test
```

### Cobertura de Testes
```bash
npm run test:cov
```

### Testes Individuais
```bash
npm test -- partner.service.spec.ts
```

**Testes implementados:**
- ✅ Partner Service (cálculo de comissões)
- ✅ Product Service (CRUD de produtos)
- ✅ Sale Service (validações de venda)
- ✅ User Service (gestão de usuários)
- ✅ Report Service (geração de relatórios)

## 📚 Endpoints Principais

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

## 🏗️ Arquitetura

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
│   └── http/          # Controllers, Presenters, Requests
└── main.ts            # Entry point
```

## 🗄️ Banco de Dados

### Migrations
```bash
npm run prisma:migrate
```

### Seed (popular banco)
```bash
npm run prisma:seed
```
## 📝 Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="fake-jwt-secret-key"
PORT=3000
```

## 📖 Documentação da API

Acesse o Swagger em: http://localhost:3000/api/docs