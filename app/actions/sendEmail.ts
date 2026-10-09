'use server';

import { Resend } from 'resend';
import { getContactEmailHtml } from './emailTemplate';

export async function sendEmail(formData: FormData) {
  const rawName = formData.get('name');
  const rawEmail = formData.get('email');
  const rawMessage = formData.get('message');

  const name = typeof rawName === 'string' ? rawName.trim() : '';
  const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' };
  }

  if (name.length > 100) {
    return { error: 'Name must be 100 characters or fewer.' };
  }

  if (email.length > 254) {
    return { error: 'Email must be 254 characters or fewer.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }

  if (message.length > 5000) {
    return { error: 'Message must be 5000 characters or fewer.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is not configured.');
    return { error: 'Email service is currently unavailable. Please reach out via LinkedIn or GitHub.' };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['sameershahidsiddiqui365@gmail.com'],
      replyTo: email,
      subject: `✨ New Inquiry from ${name} | Portfolio Contact`,
      html: getContactEmailHtml(name, email, message),
    });

    if (error) {
      console.error('Resend API error:', error);
      return { error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'An unexpected error occurred while sending your message. Please try again.' };
  }
}
