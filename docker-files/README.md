# CRUD 3 Camadas com Docker

Aplicação simples de CRUD (Create, Read, Update, Delete) para cadastro de pessoas.

## 🏗️ Arquitetura

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  PostgreSQL │
│  (React)    │     │  (Node.js)  │     │   (DB)      │
│  :5173      │     │  :3001      │     │  :5432      │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 📦 Estrutura de Pastas

```
projeto/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       └── ... (código React)
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── init.sql
└── README.md
```

## 🚀 Como Executar

1. **Clone o repositório e entre na pasta:**
   ```bash
   cd projeto
   ```

2. **Suba todos os containers:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api
   - PostgreSQL: localhost:5432

## 🔧 Comandos Úteis

```bash
# Subir em background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Parar e remover volumes (apaga dados do banco)
docker-compose down -v

# Acessar o banco via psql
docker exec -it crud-postgres psql -U postgres -d cruddb
```

## 📡 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pessoas` | Listar todas as pessoas |
| GET | `/api/pessoas/:id` | Buscar pessoa por ID |
| POST | `/api/pessoas` | Criar nova pessoa |
| PUT | `/api/pessoas/:id` | Atualizar pessoa |
| DELETE | `/api/pessoas/:id` | Remover pessoa |
| GET | `/api/health` | Health check |

## 📝 Exemplo de Requisição

```bash
# Criar pessoa
curl -X POST http://localhost:3001/api/pessoas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Oliveira", "idade": 25, "cidade": "Curitiba"}'

# Listar pessoas
curl http://localhost:3001/api/pessoas
```

## 🔒 Variáveis de Ambiente

### Backend
- `DATABASE_URL`: URL de conexão com PostgreSQL
- `PORT`: Porta do servidor (padrão: 3001)

### Frontend
- `VITE_API_URL`: URL da API backend

## 🛠️ Tecnologias

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL 15
- **Containerização:** Docker, Docker Compose
