import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Copy, Check, ExternalLink, Settings, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { sendEmailWithEmailJS, getEmailJSConfig, saveEmailJSConfig, EmailJSConfig } from '../utils/emailService.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    details?: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // EmailJS configuration settings state
  const [showConfig, setShowConfig] = useState(false);
  const [emailConfig, setEmailConfig] = useState<EmailJSConfig>({
    serviceId: '',
    templateId: '',
    publicKey: '',
  });

  useEffect(() => {
    setEmailConfig(getEmailJSConfig());
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailJSConfig(emailConfig);
    setShowConfig(false);
    setStatusMessage({
      type: 'success',
      text: 'EmailJS Configuration Saved!',
      details: 'Your EmailJS credentials are saved locally in your browser.',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      // Race with a 4.5-second timeout to guarantee the UI never gets stuck in a loading state
      const timeoutPromise = new Promise<{ success: boolean; method: string; message: string }>((_, reject) =>
        setTimeout(() => reject(new Error('Network request timed out')), 4500)
      );

      const result = await Promise.race([
        sendEmailWithEmailJS(formData, emailConfig),
        timeoutPromise,
      ]);

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: `Message Dispatched Successfully! (${result.method})`,
          details: result.message || `Your inquiry has been forwarded to ${PERSONAL_INFO.email}.`,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err: any) {
      console.warn('Submission fallback triggered:', err);
      // Fallback: Launch mail client with pre-filled content
      const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Sudarshan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

      setStatusMessage({
        type: 'success',
        text: 'Inquiry Prepared in Your Email App!',
        details: `Your default email program was opened with your message ready to send to ${PERSONAL_INFO.email}.`,
      });
    } finally {
      // Guaranteed reset - NEVER stays in loading state
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const hasEmailJSKeys = Boolean(emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey);

  return (
    <section id="contact" className="py-24 relative bg-[#090F1C]/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Section Header: Placed at top so send message box cannot block it */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            variants={fadeInSlideUp}
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
                Get In Touch
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-none">
                LET'S BUILD
                <span className="block text-blue-400">SOMETHING</span>
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-md">
              "Have an idea, project, or collaboration in mind? Let's connect."
            </p>
          </motion.div>

          {/* Grid Layout: Contact Info & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Contact & Social Links */}
            <motion.div className="lg:col-span-5 space-y-6" variants={fadeInSlideUp}>
              {/* Direct Email Card */}
              <div className="p-4 rounded-2xl bg-[#0D1525] border border-blue-900/40 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct WhatsApp Card (Directly Connects on Click/Interaction) */}
            <a
              href="https://wa.me/9779744690125"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#0D1525] hover:bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500/60 flex items-center justify-between shadow-lg transition-all duration-300 group cursor-pointer"
              title="Click to directly connect on WhatsApp: +977 9744690125"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.188 8.188 0 0 1-5.82 2.41c-1.45 0-2.88-.39-4.13-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.217 8.217 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24zm-4.71 4.31c-.19 0-.41.01-.58.19-.18.18-.7.68-.7 1.66s.72 1.93.82 2.06c.1.14 1.4 2.14 3.39 3 1.99.87 1.99.58 2.35.54.36-.03 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.37-.22s-1.17-.58-1.35-.64c-.18-.07-.31-.1-.44.1-.13.19-.51.64-.63.78-.11.13-.23.15-.42.06s-.8-.3-1.53-.94c-.57-.51-.95-1.13-1.06-1.32-.11-.19-.01-.3.08-.39.09-.08.19-.22.29-.33.09-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.04-.1-.44-1.07-.61-1.46-.16-.39-.33-.33-.48-.34-.12-.01-.27-.01-.42-.01z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block">
                    WhatsApp (Direct Connect)
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors font-mono">
                    +977 9744690125
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                  Chat Directly
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
            </a>

            {/* Connected Social Media Accounts */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Social Profiles & Links
              </span>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#0D1525] hover:bg-blue-600/15 border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">GitHub</span>
                    <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition-colors">
                      github.com/sudarshanlama19
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#0D1525] hover:bg-blue-600/15 border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">LinkedIn</span>
                    <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition-colors">
                      linkedin.com/in/sudarshan-lama
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </a>

              {/* Instagram */}
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#0D1525] hover:bg-blue-600/15 border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-white group-hover:bg-pink-600 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Instagram</span>
                    <span className="text-xs text-slate-400 group-hover:text-pink-300 transition-colors">
                      @_lama_sudarshan
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
              </a>

              {/* WhatsApp Social Row */}
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#0D1525] hover:bg-emerald-600/15 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-white group-hover:bg-emerald-600 transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.188 8.188 0 0 1-5.82 2.41c-1.45 0-2.88-.39-4.13-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.217 8.217 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24zm-4.71 4.31c-.19 0-.41.01-.58.19-.18.18-.7.68-.7 1.66s.72 1.93.82 2.06c.1.14 1.4 2.14 3.39 3 1.99.87 1.99.58 2.35.54.36-.03 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.37-.22s-1.17-.58-1.35-.64c-.18-.07-.31-.1-.44.1-.13.19-.51.64-.63.78-.11.13-.23.15-.42.06s-.8-.3-1.53-.94c-.57-.51-.95-1.13-1.06-1.32-.11-.19-.01-.3.08-.39.09-.08.19-.22.29-.33.09-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.04-.1-.44-1.07-.61-1.46-.16-.39-.33-.33-.48-.34-.12-.01-.27-.01-.42-.01z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">WhatsApp</span>
                    <span className="text-xs text-slate-400 group-hover:text-emerald-300 transition-colors font-mono">
                      +977 9744690125
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div className="lg:col-span-7" variants={fadeInScale}>
            <div className="p-6 sm:p-9 rounded-3xl bg-[#0D1525] border border-blue-900/50 shadow-2xl relative">
              {/* Form Card Header */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-semibold text-sm">Send a Direct Message</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-950/80 border border-blue-800/40 text-blue-300">
                    Direct Delivery
                  </span>
                  <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Configure Email Delivery"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mb-5 font-sans">
                Sends directly to <span className="text-cyan-300 font-semibold">{PERSONAL_INFO.email}</span> with automated validation and instant feedback.
              </p>

              {/* Optional EmailJS Configuration Drawer */}
              {showConfig && (
                <form onSubmit={handleSaveConfig} className="mb-5 p-4 rounded-2xl bg-slate-900/90 border border-blue-800/40 space-y-3 font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      EmailJS SDK Settings
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowConfig(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                        Service ID
                      </label>
                      <input
                        type="text"
                        value={emailConfig.serviceId}
                        onChange={(e) => setEmailConfig({ ...emailConfig, serviceId: e.target.value })}
                        placeholder="service_xxx"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                        Template ID
                      </label>
                      <input
                        type="text"
                        value={emailConfig.templateId}
                        onChange={(e) => setEmailConfig({ ...emailConfig, templateId: e.target.value })}
                        placeholder="template_xxx"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                        Public Key
                      </label>
                      <input
                        type="text"
                        value={emailConfig.publicKey}
                        onChange={(e) => setEmailConfig({ ...emailConfig, publicKey: e.target.value })}
                        placeholder="publicKey_xxx"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              )}

              {statusMessage && (
                <div
                  className={`mb-5 p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-red-950/40 border-red-800 text-red-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">{statusMessage.text}</div>
                    {statusMessage.details && (
                      <div className="text-xs mt-1 text-slate-300 opacity-90 font-mono">
                        {statusMessage.details}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="user-name" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      // name
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-email" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                      // email
                    </label>
                    <input
                      id="user-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="user-subject" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                    // subject
                  </label>
                  <input
                    id="user-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Project Collaboration or Job Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user-msg" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
                    // message_payload
                  </label>
                  <textarea
                    id="user-msg"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold uppercase tracking-wider rounded-xl text-xs sm:text-sm shadow-xl shadow-blue-600/25 transition-all duration-200 active:scale-98 flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? 'Transmitting Message...' : 'Send Message'}
                </button>

                {/* Direct WhatsApp Connect Action */}
                <a
                  href={`https://wa.me/9779744690125${formData.message ? `?text=${encodeURIComponent(`Hi Sudarshan,\nName: ${formData.name || 'Friend'}\n\n${formData.message}`)}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  title="Directly connect to WhatsApp: +977 9744690125"
                >
                  <svg className="w-4 h-4 fill-current text-emerald-400 shrink-0" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.188 8.188 0 0 1-5.82 2.41c-1.45 0-2.88-.39-4.13-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.217 8.217 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24zm-4.71 4.31c-.19 0-.41.01-.58.19-.18.18-.7.68-.7 1.66s.72 1.93.82 2.06c.1.14 1.4 2.14 3.39 3 1.99.87 1.99.58 2.35.54.36-.03 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.37-.22s-1.17-.58-1.35-.64c-.18-.07-.31-.1-.44.1-.13.19-.51.64-.63.78-.11.13-.23.15-.42.06s-.8-.3-1.53-.94c-.57-.51-.95-1.13-1.06-1.32-.11-.19-.01-.3.08-.39.09-.08.19-.22.29-.33.09-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.04-.1-.44-1.07-.61-1.46-.16-.39-.33-.33-.48-.34-.12-.01-.27-.01-.42-.01z"/>
                  </svg>
                  <span>Connect Directly on WhatsApp: +977 9744690125</span>
                </a>
              </form>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
