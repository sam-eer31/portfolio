'use server';

import { Resend } from 'resend';
import { getContactEmailHtml } from './emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'Missing required fields' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['sameershahidsiddiqui365@gmail.com'],
      replyTo: email,
      subject: `✨ New Inquiry from ${name} | Portfolio Contact`,
      html: getContactEmailHtml(name, email, message),
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Internal Server Error' };
  }
}
