import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import content from 'content';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function validateFormData(data: Record<string, unknown>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (data.website || data.url || data.email) {
    errors.push('Bot detected: honeypot field filled');
  }

  if (!data.clientName || typeof data.clientName !== 'string') {
    errors.push('Имя обязательно для заполнения');
  } else if (data.clientName.length < 2 || data.clientName.length > 50) {
    errors.push('Имя должно содержать от 2 до 50 символов');
  } else if (!/^[а-яёА-ЯЁa-zA-Z\s\-']+$/.test(data.clientName)) {
    errors.push('Имя содержит недопустимые символы');
  }

  if (!data.regionName || typeof data.regionName !== 'string') {
    errors.push('Регион обязателен для заполнения');
  } else if (data.regionName.length < 2 || data.regionName.length > 100) {
    errors.push('Регион должен содержать от 2 до 100 символов');
  }

  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('Телефон обязателен для заполнения');
  } else {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    const cleanPhone = data.phone.replace(/[\s\-()]/g, '');
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
      errors.push('Некорректный формат телефона');
    }
  }

  const spamWords = [
    'viagra',
    'casino',
    'loan',
    'credit',
    'free',
    'win',
    'winner',
    'congratulations'
  ];
  const textToCheck = `${data.clientName} ${data.regionName}`.toLowerCase();
  if (spamWords.some((word) => textToCheck.includes(word))) {
    errors.push('Спам-контент обнаружен');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const key = ip;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW
    };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }

  record.count++;
  rateLimitStore.set(key, record);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - record.count,
    resetTime: record.resetTime
  };
}

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare

  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim());
    const clientIP = ips[0];

    if (clientIP && clientIP !== '::1' && clientIP !== '127.0.0.1') {
      return clientIP;
    }
  }

  if (realIP && realIP !== '::1' && realIP !== '127.0.0.1') {
    return realIP;
  }

  if (
    cfConnectingIP &&
    cfConnectingIP !== '::1' &&
    cfConnectingIP !== '127.0.0.1'
  ) {
    return cfConnectingIP;
  }

  return '::1';
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  console.warn(`Request from IP: ${ip}, User-Agent: ${userAgent}`);
  console.warn(
    `Headers: x-forwarded-for: ${request.headers.get('x-forwarded-for')}, x-real-ip: ${request.headers.get('x-real-ip')}`
  );

  try {
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      console.warn(
        `Rate limit exceeded for IP: ${ip}, User-Agent: ${userAgent}`
      );
      return NextResponse.json(
        {
          success: false,
          message: 'Слишком много запросов. Попробуйте позже.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (rateLimit.resetTime - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }

    const formData = await request.json();

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      console.warn(
        `Validation failed for IP: ${ip}, Errors: ${validation.errors.join(', ')}`
      );
      return NextResponse.json(
        {
          success: false,
          message: 'Ошибка валидации данных',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    const {
      regionName,
      clientName,
      phone,
      subject = 'Новая заявка с сайта Nova Group'
    } = formData;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Nova Group" <${process.env.EMAIL_USER}>`,
      to: content.contacts.email,
      subject: subject,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Регион:</strong> ${regionName}</p>
        <p><strong>Имя клиента:</strong> ${clientName}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    const processingTime = Date.now() - startTime;

    return NextResponse.json(
      {
        success: true,
        message: 'Email отправлен успешно',
        processingTime
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      }
    );
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(
      `Error processing form submission from IP: ${ip}, Time: ${processingTime}ms, Error:`,
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Ошибка отправки email',
        processingTime
      },
      { status: 500 }
    );
  }
}
