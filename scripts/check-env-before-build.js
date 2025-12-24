#!/usr/bin/env node

/**
 * Скрипт для проверки переменных окружения перед билдом
 * Выводит информацию о найденных переменных
 */

const fs = require('fs');
const path = require('path');

// Загружаем переменные из .env файлов (в том же порядке, что и Next.js)
// Приоритет: .env.local > .env.production/.env.development > .env
// Переменные из файлов с более высоким приоритетом перезаписывают предыдущие
const envFiles = [
  '.env',
  `.env.${process.env.NODE_ENV || 'production'}`,
  '.env.local'
];

const loadedFiles = [];

envFiles.forEach((envFile) => {
  const envPath = path.join(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Убираем кавычки
          // Перезаписываем переменные (файлы с более высоким приоритетом идут позже)
          process.env[key.trim()] = value.trim();
        }
      }
    });
    loadedFiles.push(envFile);
  }
});

const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS'];

console.log('\n🔍 Проверка переменных окружения перед билдом...\n');

if (loadedFiles.length > 0) {
  console.log(`📁 Загружено из файлов: ${loadedFiles.join(', ')}\n`);
}

let allPresent = true;
const foundVars = [];
const missingVars = [];

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    // Показываем только первые и последние 3 символа для безопасности
    const maskedValue =
      value.length > 6
        ? `${value.substring(0, 3)}${'*'.repeat(Math.min(value.length - 6, 20))}${value.substring(value.length - 3)}`
        : '***';
    foundVars.push({ name: varName, masked: maskedValue });
    console.log(`✅ ${varName}: ${maskedValue} (найдена)`);
  } else {
    missingVars.push(varName);
    console.log(`❌ ${varName}: НЕ НАЙДЕНА`);
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allPresent) {
  console.log('✅ Все необходимые переменные окружения найдены и будут использованы');
  console.log(`📦 Найдено переменных: ${foundVars.length}/${requiredEnvVars.length}`);
  console.log('🚀 Запуск билда...\n');
  console.log('='.repeat(60) + '\n');
  process.exit(0); // Успех - продолжаем билд
} else {
  console.log('❌ Некоторые переменные окружения отсутствуют!');
  console.log(`⚠️  Найдено: ${foundVars.length}/${requiredEnvVars.length}`);
  console.log(`❌ Отсутствует: ${missingVars.join(', ')}`);
  console.log('\n💡 Создайте файл .env.local в корне проекта:');
  console.log('   EMAIL_USER=your-email@gmail.com');
  console.log('   EMAIL_PASS=your-app-password');
  console.log('\n   Или передайте переменные через командную строку:');
  console.log('   EMAIL_USER=xxx EMAIL_PASS=yyy npm run build');
  console.log('\n' + '='.repeat(60) + '\n');
  process.exit(1); // Ошибка - останавливаем билд
}

