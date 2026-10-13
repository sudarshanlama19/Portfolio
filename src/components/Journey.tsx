import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Sparkles, Compass } from 'lucide-react';
import { JOURNEY_DATA } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div className="mb-14" variants={fadeInSlideUp}>
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
              Timeline of Milestones & Learning
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
              MY JOURNEY & MILESTONES
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
          </motion.div>

          {/* Storytelling Timeline */}
          <div className="relative">
            {/* Central vertical track for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent -translate-x-1/2" />

            {/* Items */}
            <motion.div className="space-y-10" variants={staggerContainer}>
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
                    <div className="w-full md:w-1/2 md:px-8">
                      <div
                        className={`p-6 sm:p-7 rounded-3xl bg-[#0D1525] border transition-all duration-300 shadow-xl ${
                          milestone.highlight
                            ? 'border-blue-500/70 shadow-blue-900/30'
                            : 'border-white/10 hover:border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl sm:text-2xl font-bold font-display text-cyan-400">
                            {milestone.year}
                          </span>
                          {milestone.highlight && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1.5 shadow-sm">
                              <Sparkles className="w-3.5 h-3.5" />
                              Current Focus
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2">
                          {milestone.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Node Dot */}
                    <div className="relative flex items-center justify-center my-3 md:my-0">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white z-10 shadow-lg ${
                          milestone.highlight
                            ? 'bg-blue-600 ring-4 ring-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                            : 'bg-slate-900 border-2 border-blue-500/50 text-blue-400'
                        }`}
                      >
                        <Flag className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Empty counterpart for balance on desktop */}
                    <div className="hidden md:block w-1/2 md:px-8" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Forward Looking Vision Banner */}
          <motion.div
            className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0D1525] to-blue-950/30 border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6"
            variants={fadeInScale}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">
                <Compass className="w-4 h-4" />
                <span>Next Horizon & Ambition</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Full-Stack Software Engineering & Advanced AI Systems
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-sans leading-relaxed">
                Deepening knowledge in data structures, algorithms, modern full-stack web platforms, and practical artificial intelligence applications.
              </p>
            </div>

            <a
              href="#contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-lg shadow-blue-600/30"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
