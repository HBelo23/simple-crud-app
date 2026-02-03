FROM node:20-alpine

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta do Vite
EXPOSE 5173

# Rodar em modo desenvolvimento (hot reload)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
