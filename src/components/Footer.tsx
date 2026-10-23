import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#060910] border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand & Subtitle */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="text-2xl font-black font-display tracking-tight text-white hover:text-blue-400 transition-colors inline-block mb-2"
            >
              {PERSONAL_INFO.name}
            </a>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Social Links with Glowing Theme Accent Border Effect */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub Profile"
              title="GitHub: sudarshanlama19"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn: Sudarshan Lama"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Instagram Profile"
              title="Instagram: _lama_sudarshan"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/9779744690125"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="WhatsApp (+977 9744690125)"
              title="WhatsApp: +977 9744690125"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.188 8.188 0 0 1-5.82 2.41c-1.45 0-2.88-.39-4.13-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.217 8.217 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24zm-4.71 4.31c-.19 0-.41.01-.58.19-.18.18-.7.68-.7 1.66s.72 1.93.82 2.06c.1.14 1.4 2.14 3.39 3 1.99.87 1.99.58 2.35.54.36-.03 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.37-.22s-1.17-.58-1.35-.64c-.18-.07-.31-.1-.44.1-.13.19-.51.64-.63.78-.11.13-.23.15-.42.06s-.8-.3-1.53-.94c-.57-.51-.95-1.13-1.06-1.32-.11-.19-.01-.3.08-.39.09-.08.19-.22.29-.33.09-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.04-.1-.44-1.07-.61-1.46-.16-.39-.33-.33-.48-.34-.12-.01-.27-.01-.42-.01z"/>
              </svg>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="footer-social-btn"
              aria-label="Email Sudarshan"
              title="Email: sudarshanlama09@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-colors active:scale-95 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sudarshan Lama. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Designed with precision • Full-Stack Express & React
          </p>
        </div>
      </div>
    </footer>
  );
};
