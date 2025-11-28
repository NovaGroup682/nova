# Используем официальный Node.js slim образ
FROM node:20-slim

# Рабочая директория
WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем все файлы проекта
COPY . .

# Делаем production билд
RUN npm run build

# Время выполнения: используем порт из переменной окружения Timeweb
ENV PORT=3000
EXPOSE $PORT

# Запуск приложения в продакшн режиме с нужным портом
CMD ["sh", "-c", "npm start -p $PORT"]

