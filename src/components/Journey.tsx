import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Sparkles, ChevronRight } from 'lucide-react';
import { JOURNEY_DATA } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div className="mb-16" variants={fadeInSlideUp}>
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
              Milestones & Growth
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
              MY JOURNEY
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
          </motion.div>

          {/* Storytelling Timeline with Staggered Entrance */}
          <div className="relative">
            {/* Central vertical track for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-blue-600 to-transparent -translate-x-1/2" />

            {/* Items */}
            <motion.div className="space-y-12" variants={staggerContainer}>
              {JOURNEY_DATA.map((milestone, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    variants={fadeInSlideUp}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Left / Right Card */}
                    <div className="w-full md:w-1/2 md:px-10">
                      <div
                        className={`p-6 sm:p-8 rounded-3xl bg-[#0D1525] border transition-all duration-300 shadow-xl ${
                          milestone.highlight
                            ? 'border-blue-500/60 shadow-blue-900/20'
                            : 'border-white/10 hover:border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-black font-mono text-cyan-400">
                            {milestone.year}
                          </span>
                          {milestone.highlight && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1 shadow-sm">
                              <Sparkles className="w-3 h-3" />
                              Key Pivot
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2">
                          {milestone.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Node Dot */}
                    <div className="relative flex items-center justify-center my-4 md:my-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 shadow-lg ${
                          milestone.highlight
                            ? 'bg-blue-600 ring-4 ring-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                            : 'bg-slate-900 border-2 border-blue-500/50 text-blue-400'
                        }`}
                      >
                        <Flag className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Empty counterpart for balance on desktop */}
                    <div className="hidden md:block w-1/2 md:px-10" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Forward Looking Vision Banner */}
          <motion.div
            className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0D1525] to-blue-950/30 border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6"
            variants={fadeInScale}
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                Next Chapter
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Preparing for Advanced Software Engineering & AI Integration
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Deepening understanding of algorithmic complexity, data structures, full-stack systems, and modern AI engineering tools.
              </p>
            </div>

            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Connect with Sudarshan</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
