import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Github, Linkedin, Instagram, Mail, Send, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';
import { PhotoPlacement } from './EditPhotoModal.tsx';

interface HeroProps {
  profilePhoto: string;
  photoSizeLevel?: number;
  photoPlacement?: PhotoPlacement;
  onChangePhotoSize?: (level: number) => void;
  onChangePhotoPlacement?: (placement: PhotoPlacement) => void;
  onEditPhoto?: () => void;
  onDropPhoto?: (file: File) => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profilePhoto,
  photoSizeLevel = 3,
  onOpenResume,
}) => {
  const [isPhotoHovered, setIsPhotoHovered] = useState<boolean>(false);
  // Substantially increased photo size classes
  const sizeClasses: Record<number, string> = {
    1: 'w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72',
    2: 'w-48 h-60 sm:w-56 sm:h-72 md:w-68 md:h-84',
    3: 'w-56 h-72 sm:w-68 sm:h-84 md:w-80 md:h-[26rem] lg:w-92 lg:h-[29rem]',
    4: 'w-64 h-80 sm:w-76 sm:h-96 md:w-92 md:h-[30rem] lg:w-[26rem] lg:h-[33rem]',
    5: 'w-72 h-92 sm:w-88 sm:h-[28rem] md:w-[28rem] md:h-[34rem] lg:w-[32rem] lg:h-[38rem]',
  };

  const auraClasses: Record<number, string> = {
    1: 'w-48 h-48 sm:w-64 sm:h-64',
    2: 'w-60 h-60 sm:w-76 sm:h-76',
    3: 'w-72 h-72 sm:w-96 sm:h-96',
    4: 'w-84 h-84 sm:w-[28rem] sm:h-[28rem]',
    5: 'w-96 h-96 sm:w-[32rem] sm:h-[32rem]',
  };

  const sizeLabels: Record<number, string> = {
    1: 'Compact',
    2: 'Medium',
    3: 'Large',
    4: 'Extra Large',
    5: 'Maximum',
  };

  // Free-Floating Large Photo Element positioned beside the name
  const renderPhotoElement = () => (
    <motion.div
      className="relative shrink-0 select-none flex items-center justify-center pointer-events-none"
      variants={fadeInScale}
    >
      {/* Ambient Blue Backlight Aura */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-blue-600/40 via-cyan-400/25 to-transparent blur-[90px] opacity-85 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
          auraClasses[photoSizeLevel] || auraClasses[3]
        }`}
      />

      {/* Transparent Cutout Silhouette Frame */}
      <div
        className={`relative flex items-end justify-center transition-all duration-300 ease-out mx-auto ${
          sizeClasses[photoSizeLevel] || sizeClasses[3]
        }`}
      >
        <img
          src={profilePhoto}
          alt="Sudarshan Lama"
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain object-bottom filter drop-shadow-[0_20px_45px_rgba(59,130,246,0.38)] transition-transform duration-500 ease-out"
        />
      </div>
    </motion.div>
  );

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-start pt-10 sm:pt-16 md:pt-20 pb-12 overflow-hidden"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={PERSONAL_INFO.heroImage}
          alt="Backdrop visual"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-10 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B13] via-[#070B13]/90 to-[#070B13]/70" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* 1. TOP STATUS BADGE (Positioned lower with comfortable breathing room) */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5 mt-4 sm:mt-7 mb-5"
          variants={fadeInSlideUp}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>BIT Student • Available for Creative Projects</span>
          </div>
        </motion.div>

        {/* 2. CENTERED PHOTO WITH NAME AS BACKGROUND & HOVER EFFECT */}
        <motion.div
          className="relative flex flex-col items-center justify-center my-4 sm:my-6 w-full max-w-5xl mx-auto"
          variants={fadeInSlideUp}
        >
          {/* Centered Photo Frame with Name as Background */}
          <div
            className="relative flex items-center justify-center cursor-pointer group py-4 px-2"
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
          >
            {/* NAME DIRECTLY AT THE BACK OF THE PHOTO */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-visible">
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
                className={`font-extrabold font-montserrat-extrabold tracking-tight transition-all duration-500 text-center select-none leading-none ${
                  isPhotoHovered
                    ? 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-white opacity-100 scale-105 drop-shadow-[0_0_55px_rgba(34,211,238,0.95)]'
                    : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white/25 sm:text-white/30 opacity-70 scale-100 drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]'
                }`}
              >
                Sudarshan
              </span>
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
                className={`font-extrabold font-montserrat-extrabold tracking-tight transition-all duration-500 text-center select-none leading-none mt-1 sm:mt-2 ${
                  isPhotoHovered
                    ? 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white opacity-100 scale-105 drop-shadow-[0_0_55px_rgba(59,130,246,0.95)]'
                    : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white/25 sm:text-white/30 opacity-70 scale-100 drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]'
                }`}
              >
                Lama
              </span>
            </div>

            {/* Photo Element */}
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-104">
              {renderPhotoElement()}
            </div>
          </div>

          {/* 3. SMALL DESCRIPTION BELOW PHOTO */}
          <div className="flex flex-col items-center text-center max-w-xl mx-auto mt-4 sm:mt-6 space-y-2.5">
            {/* Headline */}
            <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-blue-300 font-display">
              BIT Student | Aspiring Web Developer | AI Enthusiast
            </h2>

            {/* Introduction Sentence */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-lg mx-auto">
              I enjoy learning new technologies and building creative digital projects.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/35 hover:shadow-cyan-500/25 active:scale-95 cursor-pointer"
              >
                <span>Explore My Projects</span>
                <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/70 text-cyan-300 hover:text-white border border-cyan-800/60 hover:border-cyan-400 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Résumé (PDF)</span>
                </button>
              )}

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-blue-500/30 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                <span>Let's Connect</span>
              </a>
            </div>

            {/* Connected Social Profiles */}
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                aria-label="GitHub Profile (@sudarshanlama19)"
                title="GitHub: @sudarshanlama19"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                aria-label="LinkedIn Profile (Sudarshan Lama)"
                title="LinkedIn: Sudarshan Lama"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                aria-label="Instagram Profile (@_lama_sudarshan)"
                title="Instagram: @_lama_sudarshan"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/9779744690125"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-emerald-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                aria-label="WhatsApp (+977 9744690125)"
                title="WhatsApp: +977 9744690125"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.188 8.188 0 0 1-5.82 2.41c-1.45 0-2.88-.39-4.13-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.217 8.217 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24zm-4.71 4.31c-.19 0-.41.01-.58.19-.18.18-.7.68-.7 1.66s.72 1.93.82 2.06c.1.14 1.4 2.14 3.39 3 1.99.87 1.99.58 2.35.54.36-.03 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.37-.22s-1.17-.58-1.35-.64c-.18-.07-.31-.1-.44.1-.13.19-.51.64-.63.78-.11.13-.23.15-.42.06s-.8-.3-1.53-.94c-.57-.51-.95-1.13-1.06-1.32-.11-.19-.01-.3.08-.39.09-.08.19-.22.29-.33.09-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.04-.1-.44-1.07-.61-1.46-.16-.39-.33-.33-.48-.34-.12-.01-.27-.01-.42-.01z"/>
                </svg>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                aria-label="Send direct email"
                title="Email: sudarshanlama09@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* 3. QUICK METRICS RIBBON */}
        <motion.div
          className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-4 max-w-xl w-full text-center"
          variants={fadeInSlideUp}
        >
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              Current Program
            </span>
            <span className="text-xs sm:text-sm md:text-base font-bold text-cyan-300">
              BIT Semester 1
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              SEE Distinction
            </span>
            <span className="text-xs sm:text-sm md:text-base font-bold text-amber-300">
              GPA 3.62
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              Focus Areas
            </span>
            <span className="text-xs sm:text-sm md:text-base font-bold text-blue-400">
              Web & AI Development
            </span>
          </div>
        </motion.div>

        {/* 4. SCROLL DOWN INDICATOR */}
        <motion.div
          className="pt-8 flex flex-col items-center justify-center"
          variants={fadeInSlideUp}
        >
          <a
            href="#about"
            className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
            aria-label="Scroll down to About section"
          >
            <span className="text-[11px] uppercase font-bold tracking-widest">
              Scroll Down
            </span>
            <div className="w-6 h-10 rounded-full border border-slate-700 flex items-start justify-center p-1 group-hover:border-blue-500 transition-colors">
              <div className="w-1.5 h-2 rounded-full bg-blue-400 animate-bounce" />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
