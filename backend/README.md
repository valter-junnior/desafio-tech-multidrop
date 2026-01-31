# Backend - Sistema de Marketplace/Afiliados

API REST desenvolvida com NestJS para gerenciamento de marketplace com programa de afiliados.

## Stack

- **NestJS** + TypeScript
- **Prisma ORM** + PostgreSQL
- **JWT** Authentication
- **Winston** Logger (rotação diária)
- **Docker** & Docker Compose
- **Swagger** (documentação)
- **Jest** (testes unitários)

## Início Rápido

```bash
# Subir com Docker
docker compose up -d --build
```

**URLs:**
- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="fake-jwt-secret-key"
PORT=3000
LOG_LEVEL=info  # error, warn, info, debug
```

## Arquitetura

```
src/
├── application/        # Casos de uso
│   ├── dtos/          # Data Transfer Objects
│   └── services/      # Services + testes
├── core/              # Domínio
│   ├── entities/      # Entidades
│   ├── enums/         # Enumerações
│   └── repositories/  # Interfaces
├── infrastructure/    # Implementações
│   ├── auth/          # JWT, Guards
│   ├── database/      # Prisma
│   ├── logger/        # Winston
│   └── http/          # Controllers, Filters
└── main.ts
```

## Endpoints

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar (paginado)
- `GET /users/:id` - Buscar por ID

### Produtos
- `POST /products` - Criar produto
- `GET /products` - Listar (paginado)
- `GET /products/:id` - Buscar por ID

### Vendas
- `POST /sales` - Registrar venda
- `GET /sales` - Listar (paginado)
- `GET /sales/:id` - Buscar por ID

### Parceiros
- `GET /partners/:id/commissions` - Comissões 🔒

### Relatórios
- `GET /reports/sales` - Relatório 🔒

🔒 = Requer JWT

## Testes

```bash
npm test
```