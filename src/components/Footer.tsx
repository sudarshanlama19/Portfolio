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

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
              title="GitHub: sudarshanlama19"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn: Sudarshan Lama"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
              aria-label="Instagram Profile"
              title="Instagram: _lama_sudarshan"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
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
