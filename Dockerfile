FROM node:20-slim

WORKDIR /app

# 1. Устанавливаем системные утилиты
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# 2. Копируем package.json
COPY package*.json ./

# 3. Устанавливаем npm зависимости
RUN npm install --legacy-peer-deps

# 4. Копируем весь проект
COPY . .

# 5. Сборка проекта
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
