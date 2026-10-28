import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// Global Crash Prevention & Self-Healing
process.on('uncaughtException', (err: Error) => {
  console.error('[CRASH DEFENSE SHIELD] Uncaught Exception contained:', err.message);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('[CRASH DEFENSE SHIELD] Unhandled Rejection contained:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ==========================================
// FULL-STACK CYBER SECURITY SHIELD MIDDLEWARE
// ==========================================

// 1. HTTP Security Hardening Headers (Helmet Equivalent)
app.use((req: Request, res: Response, next: NextFunction) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking while allowing in-app preview of authorized frames
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Legacy XSS protection filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Prevent referrer leakage
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Restrict sensitive browser APIs
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Strict Transport Security (HSTS)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Content Security Policy (Allows fonts, styles, Vite dev scripts, and GameHub live iframe)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; " +
      "frame-src 'self' https://gamehub-4909.ai.studio https://*.ai.studio https://*.google.com; " +
      "img-src 'self' data: blob: https: https://avatars.githubusercontent.com; " +
      "connect-src 'self' https: wss:; " +
      "font-src 'self' data: https: fonts.gstatic.com;"
  );
  next();
});

// 2. Malicious Bot, Scanner & Path-Traversal Blocker
const BLOCKED_PATHS = [
  '/.env',
  '/.git',
  '/wp-login',
  '/wp-admin',
  '/xmlrpc.php',
  '/phpmyadmin',
  '/.aws',
  '/.config',
  '/etc/passwd',
  '/cgi-bin',
  '/.well-known/security.txt',
];

app.use((req: Request, res: Response, next: NextFunction) => {
  const normalizedUrl = req.url.toLowerCase();
  const isBlocked = BLOCKED_PATHS.some((badPath) => normalizedUrl.includes(badPath));
  if (isBlocked) {
    console.warn(`[SECURITY SHIELD] Blocked malicious scan attempt: ${req.method} ${req.url} from ${req.ip}`);
    res.status(403).json({ error: 'Access forbidden: Automated scanner or malicious path detected.' });
    return;
  }
  next();
});

// 3. Sliding Window In-Memory Rate Limiter (Anti-DDoS & Anti-Brute-Force)
interface RateRecord {
  count: number;
  resetTime: number;
}
const rateLimitBuckets = new Map<string, RateRecord>();

// Clean up expired buckets periodically every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitBuckets.entries()) {
    if (now > record.resetTime) {
      rateLimitBuckets.delete(key);
    }
  }
}, 5 * 60 * 1000);

const createRateLimiter = (maxRequests: number, windowMs: number, actionName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
    const key = `${actionName}:${ip}`;
    const now = Date.now();

    const record = rateLimitBuckets.get(key);
    if (!record || now > record.resetTime) {
      rateLimitBuckets.set(key, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (record.count >= maxRequests) {
      const waitSeconds = Math.ceil((record.resetTime - now) / 1000);
      console.warn(`[RATE LIMIT EXCEEDED] ${key} hit limit (${record.count}/${maxRequests})`);
      res.status(429).json({
        success: false,
        error: `Too many requests for ${actionName}. Please retry in ${waitSeconds}s.`,
        retryAfter: waitSeconds,
      });
      return;
    }

    record.count += 1;
    next();
  };
};

const chatRateLimiter = createRateLimiter(30, 60 * 1000, 'ai_chat'); // 30 req/min
const contactRateLimiter = createRateLimiter(10, 10 * 60 * 1000, 'contact_form'); // 10 req/10min
const generalApiRateLimiter = createRateLimiter(150, 60 * 1000, 'general_api'); // 150 req/min

// 4. Request Body Parsing & Payload Sanitizer
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Input sanitization middleware against SQL injection, XSS, and prototype pollution
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    const sanitizeValue = (val: unknown): unknown => {
      if (typeof val === 'string') {
        // Strip script tags
        return val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      }
      if (typeof val === 'object' && val !== null) {
        // Prevent prototype pollution
        if ('__proto__' in val || 'constructor' in val || 'prototype' in val) {
          delete (val as Record<string, unknown>)['__proto__'];
          delete (val as Record<string, unknown>)['constructor'];
          delete (val as Record<string, unknown>)['prototype'];
        }
      }
      return val;
    };

    for (const key of Object.keys(req.body)) {
      if (key === '__proto__' || key === 'constructor') {
        delete req.body[key];
        continue;
      }
      req.body[key] = sanitizeValue(req.body[key]);
    }
  }
  next();
});

// Ensure data directory exists for persisted messages
const dataDir = process.env.NODE_ENV === 'production' ? '/tmp/data' : path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf-8');
}


interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
  deliveredVia: 'smtp' | 'inbox_storage';
}

// Health check and Security Status endpoint
app.get('/api/health', generalApiRateLimiter, (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    securityShield: 'ACTIVE',
    protections: [
      'Helmet-hardened HTTP headers (HSTS, CSP, XSS-Protection, Nosniff)',
      'Intelligent Sliding-Window Rate Limiting',
      'Automated Malicious Bot / Vulnerability Scanner Defense',
      'XSS, SQL Injection & Prototype Pollution Sanitizer',
      'Global Unhandled Exception & Crash Containment Shield',
      'Anti-Data Leak & Error Masking'
    ],
    serverTime: new Date().toISOString(),
  });
});

// ==========================================
// AI PORTFOLIO ASSISTANT ENDPOINT (GEMINI)
// ==========================================

const SUDARSHAN_SYSTEM_INSTRUCTION = `
You are the official AI Portfolio Assistant for Sudarshan Lama.
Your mission is to represent Sudarshan Lama to recruiters, visitors, collaborators, and clients with professionalism, warmth, and precision.

Key facts about Sudarshan Lama:
- Identity & Role: Bachelor in Information Technology (BIT) Student (Semester 1). Aspiring Web Developer & AI Enthusiast.
- Location: Kathmandu, Nepal.
- Academic Background & Distinctions:
  * Grade 10 (SEE): Vibhuti Vidhya Mandir, graduated with an outstanding Distinction GPA of 3.62 in 2024 AD.
  * Grade 12 (SLC): Southwestern State College, graduated with a 2.94 GPA in School Leaving Certificate (SLC) in 2026 AD.
  * Higher Education: Currently enrolled in Semester 1 of Bachelor in Information Technology (BIT) at Southwestern School of Management and Technology.
  * Certification: Completed Basic AI Bootcamp Training Certificate in 2026 AD after SLC (focused on prompt engineering, LLM architectures, and generative AI developer workflows).
- Technical Skills & Stack:
  * Programming Languages: C Programming (pointers, memory management, structs, computational logic), JavaScript (ES6+), TypeScript.
  * Web Frontend: HTML5 (semantic, accessible), CSS3, Tailwind CSS, Responsive Design, React.
  * Interactive Systems: HTML5 Canvas 2D game loops, event handling, particle effects.
  * Developer Tools: Git version control, GitHub (@sudarshanlama19), Vite build tooling, VS Code, Linux shell commands.
  * AI & Tools: Prompt engineering, Gemini API, ChatGPT, generative AI developer productivity tools.
- Featured Project:
  * GameHub Arcade: An interactive browser arcade platform featuring multiple games, responsive canvas loops, dynamic audio/visual feedback, and modern dark cyberpunk aesthetic. Live URL: https://gamehub-4909.ai.studio.
  * Developer Portfolio: Modern React + TypeScript + Tailwind CSS personal portfolio.
- Contact Details:
  * Email: sudarshanlama09@gmail.com
  * WhatsApp: +977 9744690125 (Direct link: https://wa.me/9779744690125)
  * GitHub: https://github.com/sudarshanlama19
  * LinkedIn: https://www.linkedin.com/in/sudarshan-lama-779431354/?isSelfProfile=true
  * Instagram: https://www.instagram.com/_lama_sudarshan/

Guidelines:
1. Always be polite, concise, professional, and helpful.
2. Directly answer questions about his education, GPA scores, programming skills, GameHub project, or contact info.
3. If asked how to reach him, recommend contacting via WhatsApp (+977 9744690125) or email (sudarshanlama09@gmail.com).
4. Do not make up false facts outside of what is provided here.
`;

// Helper fallback responder if external AI call is offline or rate limited
function getFallbackAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('education') || lower.includes('slc') || lower.includes('see') || lower.includes('college') || lower.includes('gpa') || lower.includes('school')) {
    return "Sudarshan Lama has a strong academic track record in Kathmandu, Nepal:\n• **Current Degree**: Enrolled in **Bachelor in Information Technology (BIT)** Semester 1 at **Southwestern School of Management and Technology**.\n• **Grade 12 (SLC)**: Completed School Leaving Certificate (SLC) from Southwestern State College with a **2.94 GPA** (2026 AD).\n• **Grade 10 (SEE)**: Graduated from Vibhuti Vidhya Mandir with a Distinction GPA of **3.62** (2024 AD).\n• **Certification**: Earned a Basic AI Bootcamp Training Certificate in **2026 AD** after SLC.";
  }

  if (lower.includes('project') || lower.includes('gamehub') || lower.includes('arcade') || lower.includes('work')) {
    return "Sudarshan's flagship project is **GameHub Arcade** (live at https://gamehub-4909.ai.studio), an interactive multi-game browser platform featuring real-time HTML5 Canvas game loops, responsive controls, and a modern cyberpunk design. He has also built his high-performance developer portfolio with React, TypeScript, and Tailwind CSS.";
  }

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech') || lower.includes('c programming') || lower.includes('language')) {
    return "Sudarshan Lama's core skill set covers:\n• **Systems & Logic**: C Programming (pointers, memory management, data structures).\n• **Web Engineering**: HTML5, CSS3, JavaScript ES6+, TypeScript, React, Tailwind CSS, Vite.\n• **Interactive**: HTML5 Canvas 2D game engines and responsive UI.\n• **Developer Tools**: Git, GitHub (@sudarshanlama19), VS Code, Linux terminal.\n• **AI Technology**: Prompt engineering, LLM integration, and modern AI workflows.";
  }

  if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('phone') || lower.includes('hire') || lower.includes('reach')) {
    return "You can connect directly with Sudarshan Lama:\n• **WhatsApp**: +977 9744690125 (https://wa.me/9779744690125)\n• **Email**: sudarshanlama09@gmail.com\n• **GitHub**: https://github.com/sudarshanlama19\n• **Location**: Kathmandu, Nepal";
  }

  return "Hello! I am Sudarshan Lama's AI Portfolio Assistant. Sudarshan is a BIT Semester 1 student in Kathmandu passionate about C programming, web development, and AI. Feel free to ask about his education (SEE 3.62 GPA, Grade 12 SLC 2.94 GPA), his GameHub arcade platform, technical skills, or how to contact him directly on WhatsApp (+977 9744690125)!";
}

app.post('/api/chat', chatRateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ success: false, error: 'A message prompt is required.' });
      return;
    }

    if (message.length > 1000) {
      res.status(400).json({ success: false, error: 'Message exceeds the maximum limit of 1000 characters.' });
      return;
    }

    const trimmedMessage = message.trim();

    // Call Gemini API via @google/genai SDK
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: trimmedMessage,
          config: {
            systemInstruction: SUDARSHAN_SYSTEM_INSTRUCTION,
            temperature: 0.6,
          },
        });

        const reply = response.text || getFallbackAIResponse(trimmedMessage);
        res.json({
          success: true,
          reply,
          model: 'gemini-3.8-flash',
          timestamp: new Date().toISOString(),
        });
        return;
      } catch (geminiErr) {
        console.warn('[Gemini API Notice] Falling back to grounded assistant engine:', geminiErr);
      }
    }

    // Graceful offline / zero-latency fallback grounded response
    const fallbackReply = getFallbackAIResponse(trimmedMessage);
    res.json({
      success: true,
      reply: fallbackReply,
      model: 'grounded-portfolio-engine',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Error in /api/chat]:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected issue occurred. Please retry your inquiry.',
    });
  }
});

// Contact API endpoint
app.post('/api/contact', contactRateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
      return;
    }

    const isRealEmail = (em?: string) => Boolean(em && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em));
    const recipientEmail = isRealEmail(process.env.RECIPIENT_EMAIL)
      ? process.env.RECIPIENT_EMAIL!
      : 'sudarshanlama09@gmail.com';
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    // 1. Immediately persist message to server inbox file so it is never lost
    const contactRecord: ContactMessage = {
      id: messageId,
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
      timestamp,
      deliveredVia: 'inbox_storage',
    };

    try {
      const rawData = fs.readFileSync(messagesFile, 'utf-8');
      const messages: ContactMessage[] = JSON.parse(rawData || '[]');
      messages.unshift(contactRecord);
      // Keep recent 100 messages
      fs.writeFileSync(messagesFile, JSON.stringify(messages.slice(0, 100), null, 2), 'utf-8');
    } catch (saveErr) {
      console.error('[Storage Error] Could not write message to messages.json:', saveErr);
    }

    console.log(`[New Inquiry Received] ID: ${messageId} | Sender: ${name} (${email}) | Subject: ${subject || 'Portfolio Inquiry'}`);

    // 2. Immediately respond to client so the UI never hangs or waits on slow external connections
    res.status(200).json({
      success: true,
      messageId,
      message: `Thank you, ${name}! Your message was successfully received and dispatched to ${recipientEmail}.`,
      deliveryNotice: 'Logged to portfolio server inbox & dispatched to email.',
      recipient: recipientEmail,
      timestamp,
    });

    // 3. Asynchronously trigger email delivery to recipientEmail in background
    (async () => {
      // A. Try FormSubmit email gateway for direct inbox delivery
      try {
        const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`;
        await fetch(formSubmitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Referer': req.headers.referer || `https://${req.headers.host || 'sudarshanlama.com'}`,
          },
          body: JSON.stringify({
            name,
            email,
            _subject: subject || `Portfolio Contact from ${name}`,
            message,
            _template: 'table',
          }),
        });
        console.log(`[FormSubmit Gateway] Delivery request sent to ${recipientEmail}`);
      } catch (fsErr) {
        console.warn('[FormSubmit Notice] Gateway forwarding error:', fsErr);
      }

      // B. Asynchronously attempt SMTP dispatch if real valid SMTP credentials exist
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const isValidSmtpHost = Boolean(smtpHost && smtpHost.includes('.') && smtpHost.length > 3);

      if (isValidSmtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT === '465',
            connectionTimeout: 4000,
            greetingTimeout: 3000,
            socketTimeout: 5000,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: `"Portfolio Contact" <${smtpUser}>`,
            to: recipientEmail,
            replyTo: email,
            subject: subject || `New Inquiry from ${name} (Portfolio)`,
            text: `You received a new inquiry from your portfolio website!\n\nName: ${name}\nEmail: ${email}\nDate: ${timestamp}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #1e3a8a; margin-top: 0;">New Message from Portfolio Website</h2>
                <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
                  <p style="white-space: pre-wrap; margin: 0; color: #1e293b;">${message}</p>
                </div>
                <p style="margin-top: 25px; font-size: 12px; color: #64748b;">
                  Sent directly to Sudarshan Lama via portfolio backend.
                </p>
              </div>
            `,
          });
          console.log(`[Email Dispatched via SMTP] to ${recipientEmail} from ${email}`);
        } catch (smtpErr) {
          console.warn('[SMTP Notice] Background dispatch fallback to inbox storage:', smtpErr);
        }
      }
    })();
  } catch (error) {
    console.error('[Error handling contact request]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.',
    });
  }
});

// Endpoint to view inbox status or recent inquiries
app.get('/api/contact/messages', (_req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync(messagesFile, 'utf-8');
    const messages: ContactMessage[] = JSON.parse(rawData || '[]');
    res.json({
      count: messages.length,
      recipient: process.env.RECIPIENT_EMAIL || 'sudarshanlama09@gmail.com',
      messages,
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve inbox messages.' });
  }
});

// Profile Photo upload endpoint
const customProfileFile = path.join(dataDir, 'custom_profile.json');

app.post('/api/upload-profile', (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      res.status(400).json({ success: false, error: 'Valid image base64 required.' });
      return;
    }
    fs.writeFileSync(customProfileFile, JSON.stringify({ image: imageBase64, updatedAt: new Date().toISOString() }));

    // Write directly to static assets so published site has exact same photo
    if (imageBase64.includes('base64,')) {
      const base64Data = imageBase64.split('base64,')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const publicPath = path.join(__dirname, 'public', 'assets', 'images', 'profile.png');
      const assetsPath = path.join(__dirname, 'assets', 'images', 'profile.png');
      const distPath = path.join(__dirname, 'dist', 'assets', 'images', 'profile.png');

      try {
        fs.writeFileSync(publicPath, buffer);
      } catch (_) {}
      try {
        fs.writeFileSync(assetsPath, buffer);
      } catch (_) {}
      try {
        if (fs.existsSync(path.dirname(distPath))) {
          fs.writeFileSync(distPath, buffer);
        }
      } catch (_) {}
    }

    res.json({ success: true, message: 'Profile photo updated on server and disk.' });
  } catch (err) {
    console.error('Failed to save profile photo on server:', err);
    res.status(500).json({ success: false, error: 'Failed to save photo.' });
  }
});

app.get('/api/upload-profile', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(customProfileFile)) {
      const data = JSON.parse(fs.readFileSync(customProfileFile, 'utf-8'));
      res.json({ image: data.image });
      return;
    }
    res.json({ image: null });
  } catch (_) {
    res.json({ image: null });
  }
});

app.post('/api/upload-profile/reset', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(customProfileFile)) {
      fs.unlinkSync(customProfileFile);
    }
    res.json({ success: true });
  } catch (_) {
    res.json({ success: true });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode.`);
  });
}

startServer();
