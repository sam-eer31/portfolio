'use client';

import { useState, useEffect } from 'react';
import { sendEmail } from '@/app/actions/sendEmail';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (status === 'success') {
      timeout = setTimeout(() => {
        setStatus('idle');
      }, 60000); // 1 minute
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await sendEmail(formData);

    if (result?.error) {
      setStatus('error');
      setErrorMessage(result.error);
    } else {
      setStatus('success');
      form.reset();
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full h-full flex flex-col items-center justify-center p-8 text-center min-h-[300px]"
        style={{ animation: 'fadeScale 0.5s ease-out forwards' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes drawCheck {
            0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
            100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
          }
        `}} />
        <div className="w-20 h-20 bg-[#3b82f6]/20 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <svg className="w-10 h-10 text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ animation: 'drawCheck 0.8s ease-out forwards' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Message Sent!</h3>
        <p className="text-gray-400 text-lg">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 relative z-10" aria-label="Contact Form">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            autoComplete="name"
            maxLength={100}
            className="w-full bg-[#050607] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all shadow-inner"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            autoComplete="email"
            maxLength={254}
            className="w-full bg-[#050607] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all shadow-inner"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="How can I help you?"
          required
          rows={4}
          maxLength={5000}
          className="w-full bg-[#050607] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all resize-none shadow-inner"
        ></textarea>
      </div>

      {status === 'error' && (
        <div role="alert" aria-live="assertive" className="text-red-400 text-sm text-center">
          {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group relative inline-flex items-center justify-center w-full sm:w-auto self-end h-12 px-8 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] border border-white/10 cursor-pointer"
      >
        <span className="relative z-10 flex items-center">
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  );
}
