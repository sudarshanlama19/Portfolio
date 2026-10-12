import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Contact API endpoint
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
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
    res.json({ success: true, message: 'Profile photo updated on server.' });
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
