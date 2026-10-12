import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Compass, Code2, Camera, Github, Linkedin, Instagram, Mail, Sparkles, Plus, Minus } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

interface HeroProps {
  profilePhoto: string;
  photoSizeLevel: number;
  onChangePhotoSize: (level: number) => void;
  onEditPhoto: () => void;
  onDropPhoto?: (file: File) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profilePhoto,
  photoSizeLevel,
  onChangePhotoSize,
  onEditPhoto,
  onDropPhoto,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onDropPhoto) {
      onDropPhoto(file);
    } else {
      onEditPhoto();
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoSizeLevel < 5) onChangePhotoSize(photoSizeLevel + 1);
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoSizeLevel > 1) onChangePhotoSize(photoSizeLevel - 1);
  };

  const sizeClasses: Record<number, string> = {
    1: 'w-48 h-60 sm:w-56 sm:h-68 md:w-68 md:h-[320px]',
    2: 'w-56 h-68 sm:w-64 sm:h-80 md:w-80 md:h-[380px]',
    3: 'w-64 h-76 sm:w-76 sm:h-92 md:w-92 md:h-[440px] lg:w-[420px] lg:h-[460px]',
    4: 'w-72 h-84 sm:w-88 sm:h-[420px] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[540px]',
    5: 'w-80 h-96 sm:w-96 sm:h-[480px] md:w-[480px] md:h-[600px] lg:w-[540px] lg:h-[620px]',
  };

  const auraClasses: Record<number, string> = {
    1: 'w-52 h-52 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px]',
    2: 'w-60 h-60 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px]',
    3: 'w-68 h-68 sm:w-84 sm:h-84 md:w-[440px] md:h-[440px]',
    4: 'w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px]',
    5: 'w-96 h-96 sm:w-[440px] sm:h-[440px] md:w-[580px] md:h-[580px]',
  };

  const sizeLabels: Record<number, string> = {
    1: 'Compact',
    2: 'Medium',
    3: 'Large',
    4: 'Extra Large',
    5: 'Maximum',
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-start pt-1 sm:pt-2 pb-16 overflow-hidden"
    >
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={PERSONAL_INFO.heroImage}
          alt="Backdrop visual"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-15 filter contrast-125"
        />
        {/* Deep gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B13] via-[#070B13]/90 to-[#070B13]/70" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* 1. PHOTO ON THE TOP ABOVE NAME (Zero Top Gap, Adjustable Size & Free-Floating Frame) */}
        <motion.div
          className="relative -mt-4 sm:-mt-8 mb-5 sm:mb-7 group cursor-pointer"
          variants={fadeInScale}
          onClick={onEditPhoto}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          title="Click to customize photo or use zoom controls"
        >
          {/* Ethereal Ambient Aura scaled with photo size */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-blue-600/40 via-cyan-400/30 to-transparent blur-[110px] opacity-80 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
              auraClasses[photoSizeLevel] || auraClasses[3]
            }`}
          />

          {/* Free-Floating Photo Frame (Dynamic Adjustable Size) */}
          <div
            className={`relative flex items-end justify-center transition-all duration-300 ease-out ${
              sizeClasses[photoSizeLevel] || sizeClasses[3]
            } ${
              isDragOver ? 'scale-105 filter brightness-110 ring-2 ring-blue-400 ring-offset-4 ring-offset-[#070B13] rounded-3xl' : ''
            }`}
          >
            <img
              src={profilePhoto}
              alt="Sudarshan Lama"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain object-top filter drop-shadow-[0_20px_40px_rgba(59,130,246,0.4)] group-hover:scale-103 transition-transform duration-500 ease-out select-none"
            />

            {/* Quick Floating Action Controls: Size Adjuster & Edit Badge */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 group-hover:border-blue-500/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom Out Button */}
              <button
                onClick={handleZoomOut}
                disabled={photoSizeLevel <= 1}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Decrease Photo Size"
                aria-label="Decrease Photo Size"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Current Size Label */}
              <span className="text-[10px] font-mono font-semibold uppercase px-2 text-blue-300 select-none whitespace-nowrap">
                {sizeLabels[photoSizeLevel] || 'Large'}
              </span>

              {/* Zoom In Button */}
              <button
                onClick={handleZoomIn}
                disabled={photoSizeLevel >= 5}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Increase Photo Size"
                aria-label="Increase Photo Size"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              <span className="w-px h-4 bg-white/20 mx-0.5" />

              {/* Edit Photo Trigger */}
              <button
                onClick={onEditPhoto}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap"
                aria-label="Change Profile Photo"
              >
                <Camera className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. Live Status Indicator */}
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 w-fit backdrop-blur-md mb-4 mt-2"
          variants={fadeInSlideUp}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[11px] font-medium tracking-wider uppercase text-blue-300">
            BIT Semester 1 • Open to Collaboration
          </span>
        </motion.div>

        {/* 3. Huge Name Display */}
        <motion.div className="space-y-1 mb-3" variants={fadeInSlideUp}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-[0.95]">
            SUDARSHAN
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
              LAMA
            </span>
          </h1>
        </motion.div>

        {/* 4. Subtitle */}
        <motion.p
          className="text-base sm:text-xl font-medium tracking-wide text-blue-300/90 font-display mb-4"
          variants={fadeInSlideUp}
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* 5. Intro Description */}
        <motion.p
          className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mx-auto mb-8"
          variants={fadeInSlideUp}
        >
          "{PERSONAL_INFO.intro}"
        </motion.p>

        {/* 6. CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
          variants={fadeInSlideUp}
        >
          <a
            href="#websites"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/30 active:scale-95"
          >
            <span>Explore My Websites</span>
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-blue-500/30 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95"
          >
            <span>Get in Touch</span>
          </a>
        </motion.div>

        {/* 7. Connected Social Media Accounts Bar */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          variants={fadeInSlideUp}
        >
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-md"
            aria-label="GitHub Profile (@sudarshanlama19)"
            title="GitHub: @sudarshanlama19"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-md"
            aria-label="LinkedIn Profile (Sudarshan Lama)"
            title="LinkedIn: Sudarshan Lama"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-md"
            aria-label="Instagram Profile (@_lama_sudarshan)"
            title="Instagram: @_lama_sudarshan"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-md"
            aria-label="Send direct email"
            title="Email: sudarshanlama09@gmail.com"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>

        {/* 8. Quick Metrics Ribbon */}
        <motion.div
          className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg w-full text-center"
          variants={fadeInSlideUp}
        >
          <div>
            <span className="text-xs text-slate-400 block">Academics</span>
            <span className="text-sm sm:text-base font-bold font-mono text-white">BIT Sem 1</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Distinction GPA</span>
            <span className="text-sm sm:text-base font-bold font-mono text-cyan-300">3.62 GPA</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Focus Areas</span>
            <span className="text-sm sm:text-base font-bold text-blue-400">Web & AI</span>
          </div>
        </motion.div>

        {/* 9. Scroll Down Indicator */}
        <motion.div
          className="pt-10 flex flex-col items-center justify-center"
          variants={fadeInSlideUp}
        >
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors"
            aria-label="Scroll down to About section"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest">
              Scroll Down
            </span>
            <div className="w-7 h-11 rounded-full border border-slate-700 flex items-start justify-center p-1.5 group-hover:border-blue-500 transition-colors">
              <div className="w-1.5 h-2 rounded-full bg-blue-400 animate-bounce" />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
