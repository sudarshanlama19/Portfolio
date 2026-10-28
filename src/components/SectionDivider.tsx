import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'diamond' | 'code' | 'glow' | 'minimal';
  accentColor?: 'blue' | 'cyan' | 'purple';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'diamond',
  accentColor = 'blue',
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-7xl mx-auto px-6 md:px-10 py-6 sm:py-8 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* 1. Base Gradient Track Line */}
      <div className="relative w-full h-[1px] flex items-center justify-center">
        {/* Soft Ambient Background Line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Dynamic Theme Gradient Glow Line */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/40 via-cyan-400/40 to-transparent transition-opacity duration-500 ${
            accentColor === 'purple'
              ? 'via-purple-500/40 via-indigo-400/40'
              : accentColor === 'cyan'
              ? 'via-cyan-400/50 via-blue-400/40'
              : 'via-blue-500/40 via-cyan-400/40'
          }`}
        />

        {/* 2. Sweeping Light Beam / Shimmer Animation */}
        <motion.div
          className="absolute h-[1.5px] w-36 sm:w-64 rounded-full bg-gradient-to-r from-transparent via-cyan-300 via-white to-transparent blur-[0.5px]"
          animate={{
            x: ['-180%', '180%'],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Ambient Radial Halo at Center */}
        <div className="absolute w-44 sm:w-64 h-8 bg-blue-600/10 blur-xl rounded-full" />
      </div>

      {/* 3. Center Decorative Geometric Emblem */}
      <div className="relative z-10 px-4 flex items-center justify-center">
        {variant === 'diamond' && (
          <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <div className="w-6 h-6 rounded-lg bg-[#090F1C] border border-blue-500/40 rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              {/* Inner Glowing Core */}
              <div className="w-2 h-2 rounded-sm bg-gradient-to-tr from-cyan-400 to-blue-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </div>
            {/* Flanking Micro Dots */}
            <span className="absolute -left-3 w-1 h-1 rounded-full bg-blue-400/60" />
            <span className="absolute -right-3 w-1 h-1 rounded-full bg-blue-400/60" />
          </div>
        )}

        {variant === 'code' && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#090F1C] border border-blue-500/30 text-[10px] font-mono text-cyan-400 tracking-widest shadow-md">
            <span className="text-blue-500">&lt;</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-blue-500">/&gt;</span>
          </div>
        )}

        {variant === 'glow' && (
          <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse" />
            </div>
          </div>
        )}

        {variant === 'minimal' && (
          <div className="flex items-center gap-1.5 bg-[#070B13] px-2">
            <span className="w-1 h-1 rounded-full bg-blue-400/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            <span className="w-1 h-1 rounded-full bg-blue-400/50" />
          </div>
        )}
      </div>
    </div>
  );
};
