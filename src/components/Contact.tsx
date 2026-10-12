import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Send, Copy, Check, ExternalLink, Settings, Sparkles, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
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
    <section id="contact" className="py-28 relative bg-[#090F1C]/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Left Column: Heading, Profiles & Social Links */}
          <motion.div className="lg:col-span-5 space-y-8" variants={fadeInSlideUp}>
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

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              "Have an idea, project, or collaboration in mind? Let's connect."
            </p>

            {/* Direct Email Card */}
            <div className="p-4 rounded-2xl bg-[#0D1525] border border-white/10 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-blue-400 transition-colors"
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

            {/* Interactive Social Media Accounts */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Interactive Connected Profiles
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
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-300 transition-colors">
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
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-300 transition-colors">
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
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-pink-300 transition-colors">
                      @_lama_sudarshan
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with EmailJS SDK */}
          <motion.div className="lg:col-span-7" variants={fadeInScale}>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1525] border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Send a Direct Message
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                    hasEmailJSKeys
                      ? 'bg-emerald-950/80 border-emerald-800/60 text-emerald-300'
                      : 'bg-blue-950/80 border-blue-800/40 text-blue-300'
                  }`}>
                    {hasEmailJSKeys ? 'EmailJS SDK Active' : 'Email Engine Active'}
                  </span>
                  <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Configure EmailJS Keys"
                    aria-label="EmailJS Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Your message is dispatched securely to Sudarshan's email inbox ({PERSONAL_INFO.email}).
              </p>

              {/* Optional EmailJS Configuration Drawer */}
              {showConfig && (
                <form onSubmit={handleSaveConfig} className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-blue-800/40 space-y-3">
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
                  className={`mb-6 p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
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
                      <div className="text-xs mt-1 text-slate-300 opacity-90">
                        {statusMessage.details}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="user-name" className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                      Your Name
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-email" className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                      Your Email
                    </label>
                    <input
                      id="user-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="user-subject" className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    id="user-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Project Collaboration or Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user-msg" className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="user-msg"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold font-display uppercase tracking-wider rounded-xl text-xs sm:text-sm shadow-xl shadow-blue-600/25 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Sudarshan</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
