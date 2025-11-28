FROM node:20-slim

# Рабочая директория
WORKDIR /app

# Переменная окружения для Timeweb
ENV PORT 8080

# Системные зависимости
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Копируем package.json
COPY package*.json ./

# Устанавливаем зависимости через npm (правильно)
RUN npm install --legacy-peer-deps

# Копируем остальной проект
COPY . .

# Собираем Next.js
RUN npm run build

# Экспонируем порт
EXPOSE 8080

# Запуск
CMD ["npm", "start"]
