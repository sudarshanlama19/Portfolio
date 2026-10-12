import emailjs from '@emailjs/browser';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export interface EmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const STORAGE_KEY = 'sudarshan_emailjs_config';

export function getEmailJSConfig(): EmailJSConfig {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
  }

  return {
    serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || '',
    templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || '',
    publicKey: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || '',
  };
}

export function saveEmailJSConfig(config: EmailJSConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

/**
 * Dispatches an email using the EmailJS browser SDK with fallback mechanisms
 */
export async function sendEmailWithEmailJS(data: EmailData, config?: EmailJSConfig): Promise<{ success: boolean; method: string; message: string }> {
  const activeConfig = config || getEmailJSConfig();

  // 1. If EmailJS credentials are configured, send using EmailJS Browser SDK
  if (activeConfig.serviceId && activeConfig.templateId && activeConfig.publicKey) {
    try {
      emailjs.init({
        publicKey: activeConfig.publicKey,
      });

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject || `Portfolio Message from ${data.name}`,
        message: data.message,
        to_email: PERSONAL_INFO.email,
      };

      const res = await emailjs.send(
        activeConfig.serviceId,
        activeConfig.templateId,
        templateParams,
        { publicKey: activeConfig.publicKey }
      );

      return {
        success: true,
        method: 'EmailJS SDK',
        message: `Email dispatched successfully via EmailJS (${res.text || 'OK'}).`,
      };
    } catch (err: any) {
      console.warn('EmailJS SDK delivery error, trying fallback gateway:', err);
    }
  }

  // 2. Fallback: Local Server Route Handler /api/contact
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        method: 'Portfolio Server Route',
        message: json.message || 'Delivered to server inbox & queued for email delivery.',
      };
    }
  } catch (serverErr) {
    console.warn('Server route unavailable, falling back to direct web gateway:', serverErr);
  }

  // 3. Fallback: FormSubmit Gateway directly to Sudarshan's email
  try {
    const gatewayRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(PERSONAL_INFO.email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        _subject: data.subject || `Portfolio Message from ${data.name}`,
        message: data.message,
      }),
    });

    if (gatewayRes.ok) {
      return {
        success: true,
        method: 'Direct Email Gateway',
        message: `Dispatched directly to ${PERSONAL_INFO.email}.`,
      };
    }
  } catch (gwErr) {
    console.warn('Gateway error:', gwErr);
  }

  throw new Error('All automated delivery channels were unreachable. Please use the direct mail app.');
}
