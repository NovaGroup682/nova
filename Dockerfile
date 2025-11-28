FROM node:20-slim

WORKDIR /app

# Устанавливаем curl и другие системные утилиты
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем Node зависимости
RUN npm install --legacy-peer-deps

# Копируем весь проект
COPY . .

# Собираем проект
RUN npm run build

# Указываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
