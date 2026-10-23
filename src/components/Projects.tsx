import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Play,
  Github,
  Gamepad2,
  Monitor,
  CheckCircle,
  Sparkles,
  Code2,
  RefreshCw,
  Layers,
  ArrowUpRight,
  Smartphone,
  Tablet,
  Laptop,
  RotateCcw,
  Lock,
  Maximize2
} from 'lucide-react';
import { FEATURED_PROJECT, PERSONAL_INFO } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale, defaultViewport } from './MotionWrappers.tsx';

export const Projects: React.FC = () => {
  const [showLiveEmbed, setShowLiveEmbed] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewOrientation, setPreviewOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [iframeKey, setIframeKey] = useState<number>(1);

  return (
    <section id="projects" className="py-24 relative bg-[#090F1C]/70 scroll-mt-8">
      {/* Anchor for backward compatibility with #websites */}
      <div id="websites" className="absolute -top-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Section Header with Intersection-Observer Slide Up */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            variants={fadeInSlideUp}
            viewport={defaultViewport}
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
                Live Web Platform Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
                FEATURED WEBSITE
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live & Deployed Online</span>
            </div>
          </motion.div>

          {/* Sole Featured Project: GameHub Arcade with Intersection-Observer Reveal */}
          <motion.div
            className="group relative rounded-3xl bg-[#0D1525] border border-blue-900/50 hover:border-blue-500/60 transition-all duration-500 overflow-hidden shadow-2xl p-6 md:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: '-40px 0px' }}
            variants={fadeInScale}
          >
            {/* Project Header Info Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Interactive Web Arcade Platform</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                <span>Vite + Canvas Engine</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Production Release</span>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              variants={staggerContainer}
              viewport={defaultViewport}
            >
              {/* Visual Showcase with Intersection-Observer Slide Up */}
              <motion.div className="lg:col-span-7 overflow-hidden rounded-2xl relative" variants={fadeInSlideUp}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">
                  <img
                    src={FEATURED_PROJECT.image}
                    alt={FEATURED_PROJECT.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80" />

                  {/* Badge floating */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-cyan-400" />
                    <span>FLAGSHIP ARCADE PLATFORM</span>
                  </div>

                  {/* Live Link Badge */}
                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Action Bar at Bottom of Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-black/90 backdrop-blur-md border border-white/10 text-xs">
                    <span className="text-slate-300 font-medium">
                      Hosted at gamehub-4909.ai.studio
                    </span>
                    <a
                      href={FEATURED_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Launch App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Information Column */}
              <motion.div className="lg:col-span-5 flex flex-col justify-center space-y-4" variants={fadeInSlideUp}>
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block mb-1">
                    {FEATURED_PROJECT.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-white group-hover:text-blue-300 transition-colors">
                    {FEATURED_PROJECT.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {FEATURED_PROJECT.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-2 border-t border-white/5 text-xs sm:text-sm text-slate-300">
                  {FEATURED_PROJECT.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {FEATURED_PROJECT.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:scale-102 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setShowLiveEmbed(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span>In-App Preview</span>
                  </button>

                  <a
                    href={FEATURED_PROJECT.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    aria-label="GitHub Repository"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* LIVE MULTI-DEVICE WEBSITE PREVIEWS MODAL (DESKTOP, TABLET, MOBILE) */}
          {showLiveEmbed && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="preview-title"
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/92 backdrop-blur-2xl"
              onClick={() => setShowLiveEmbed(false)}
            >
              <div
                className="relative w-full max-w-7xl h-[94vh] bg-[#0A0F1D] border border-blue-900/70 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Top Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:px-6 bg-[#060A13] border-b border-white/10 shrink-0">
                  {/* Left: Project Branding */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 id="preview-title" className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <span>GameHub Arcade — Live Platform</span>
                        <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                          Active Sandbox
                        </span>
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        gamehub-4909.ai.studio
                      </span>
                    </div>
                  </div>

                  {/* Middle: Interactive Device Switcher Tabs */}
                  <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        previewDevice === 'desktop'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Desktop Preview (1280px)"
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>

                    <button
                      onClick={() => setPreviewDevice('tablet')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        previewDevice === 'tablet'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Tablet Frame Preview (768px)"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Tablet</span>
                    </button>

                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        previewDevice === 'mobile'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Mobile Frame Preview (375px)"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>

                    {previewDevice !== 'desktop' && (
                      <button
                        onClick={() =>
                          setPreviewOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'))
                        }
                        className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 text-xs transition-colors cursor-pointer ml-1"
                        title={`Rotate Device (${previewOrientation})`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIframeKey((k) => k + 1)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors cursor-pointer"
                      title="Reload Live Preview"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={FEATURED_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Open Full Tab</span>
                    </a>

                    <button
                      onClick={() => setShowLiveEmbed(false)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Device Frame Viewport Container */}
                <div className="flex-1 w-full h-full bg-[#05070D] flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
                  {/* Subtle Grid Canvas Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* 1. DESKTOP VIEWPORT FRAME */}
                  {previewDevice === 'desktop' && (
                    <motion.div
                      key="desktop-frame"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full max-w-6xl flex flex-col rounded-2xl bg-[#0F172A] border border-slate-700/80 shadow-2xl overflow-hidden relative z-10"
                    >
                      {/* Browser Window Bar */}
                      <div className="h-9 bg-[#1E293B] border-b border-slate-700/80 px-4 flex items-center justify-between shrink-0 select-none">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                        </div>

                        {/* Centered URL Bar */}
                        <div className="flex items-center gap-1.5 px-4 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[11px] text-slate-300 w-72 sm:w-96 justify-center">
                          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">https://gamehub-4909.ai.studio</span>
                        </div>

                        <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
                          1280 × 800 (Responsive)
                        </div>
                      </div>

                      {/* Iframe Viewport */}
                      <div className="flex-1 w-full h-full bg-black relative">
                        <iframe
                          key={`desktop-${iframeKey}`}
                          src={FEATURED_PROJECT.liveUrl}
                          title="Desktop Device Live Preview"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* 2. TABLET VIEWPORT FRAME */}
                  {previewDevice === 'tablet' && (
                    <motion.div
                      key={`tablet-${previewOrientation}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`relative z-10 bg-slate-950 border-[12px] border-slate-800 rounded-[32px] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
                        previewOrientation === 'portrait'
                          ? 'w-[740px] max-w-full h-[95%]'
                          : 'w-[900px] max-w-full h-[76%]'
                      }`}
                    >
                      {/* Tablet Top Bezel with Front Camera */}
                      <div className="h-5 bg-slate-900 flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 shadow-inner" />
                      </div>

                      {/* Iframe Viewport */}
                      <div className="flex-1 w-full h-full bg-black relative">
                        <iframe
                          key={`tablet-${iframeKey}-${previewOrientation}`}
                          src={FEATURED_PROJECT.liveUrl}
                          title="Tablet Device Live Preview"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* 3. MOBILE VIEWPORT FRAME */}
                  {previewDevice === 'mobile' && (
                    <motion.div
                      key={`mobile-${previewOrientation}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`relative z-10 bg-slate-950 border-[10px] border-slate-800 rounded-[44px] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
                        previewOrientation === 'portrait'
                          ? 'w-[375px] max-w-[95%] h-[96%]'
                          : 'w-[740px] max-w-[95%] h-[380px]'
                      }`}
                    >
                      {/* Mobile Top Speaker & Dynamic Island */}
                      <div className="h-7 bg-slate-950 flex items-center justify-center shrink-0 pt-1">
                        <div className="w-24 h-4 rounded-full bg-black border border-slate-800/80 flex items-center justify-end px-2">
                          <span className="w-2 h-2 rounded-full bg-slate-800" />
                        </div>
                      </div>

                      {/* Iframe Viewport */}
                      <div className="flex-1 w-full h-full bg-black relative">
                        <iframe
                          key={`mobile-${iframeKey}-${previewOrientation}`}
                          src={FEATURED_PROJECT.liveUrl}
                          title="Mobile Device Live Preview"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      </div>

                      {/* Bottom Home Indicator */}
                      <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
                        <span className="w-28 h-1 rounded-full bg-slate-600" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
