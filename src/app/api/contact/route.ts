import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import content from 'content';

export async function POST(request: NextRequest) {
  try {
    const {
      regionName,
      clientName,
      phone,
      subject = 'Новая заявка с сайта Nova Group'
    } = await request.json();

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

    return NextResponse.json({
      success: true,
      message: 'Email отправлен успешно'
    });
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка отправки email' },
      { status: 500 }
    );
  }
}
