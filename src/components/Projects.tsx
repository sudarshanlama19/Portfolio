import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Github, Gamepad2, Globe, Monitor, CheckCircle } from 'lucide-react';
import { FEATURED_PROJECT } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

export const Projects: React.FC = () => {
  const [showLiveEmbed, setShowLiveEmbed] = useState<boolean>(false);

  return (
    <section id="websites" className="py-28 relative bg-[#090F1C]/70 scroll-mt-10">
      {/* Anchor for backward compatibility with #projects */}
      <div id="projects" className="absolute -top-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
            variants={fadeInSlideUp}
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
                Digital Creations & Platforms
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
                MY WEBSITES
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Live Interactive Web Experience</span>
            </div>
          </motion.div>

          {/* Featured Showcase Card for GameHub with Staggered Elements */}
          <motion.div
            className="group relative rounded-3xl bg-[#0D1525] border border-blue-900/40 hover:border-blue-500/60 transition-all duration-500 overflow-hidden shadow-2xl p-6 md:p-10"
            variants={fadeInScale}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Image Showcase */}
              <motion.div className="lg:col-span-7 overflow-hidden rounded-2xl relative" variants={fadeInSlideUp}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">
                  <img
                    src={FEATURED_PROJECT.image}
                    alt={FEATURED_PROJECT.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-70" />

                  {/* Number Badge floating */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-blue-400 flex items-center gap-2">
                    <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>FEATURED WEBSITE</span>
                  </div>

                  {/* Live Link Badge */}
                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Quick overlay launcher on hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
                    <span className="text-xs font-mono text-cyan-300">
                      gamehub-4909.ai.studio
                    </span>
                    <a
                      href={FEATURED_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white hover:text-blue-400 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Launch Online</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Information & Action Column */}
              <motion.div className="lg:col-span-5 flex flex-col justify-center space-y-5" variants={fadeInSlideUp}>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 block mb-1">
                    {FEATURED_PROJECT.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-white group-hover:text-blue-300 transition-colors">
                    {FEATURED_PROJECT.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {FEATURED_PROJECT.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-1 border-t border-white/5">
                  {FEATURED_PROJECT.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Built With
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {FEATURED_PROJECT.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-blue-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:scale-102 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setShowLiveEmbed(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span>In-App Preview</span>
                  </button>

                  <a
                    href={FEATURED_PROJECT.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    aria-label="GitHub Repository"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Live In-App Iframe Modal */}
          {showLiveEmbed && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="preview-title"
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowLiveEmbed(false)}
            >
              <div
                className="relative w-full max-w-6xl h-[88vh] bg-[#0D1525] border border-blue-900/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Bar */}
                <div className="flex items-center justify-between p-4 bg-[#080C14] border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h4 id="preview-title" className="text-sm font-bold text-white">
                        GameHub Live Website Preview
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        https://gamehub-4909.ai.studio
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={FEATURED_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                    >
                      <span>Open in Full Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setShowLiveEmbed(false)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Iframe */}
                <div className="flex-1 w-full h-full bg-black relative">
                  <iframe
                    src={FEATURED_PROJECT.liveUrl}
                    title="GameHub Live Platform"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
