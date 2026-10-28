import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Compass, Target, Rocket, CheckCircle2, User } from 'lucide-react';
import { PERSONAL_INFO, ABOUT_STATS } from '../data/portfolioData.ts';
import {
  staggerContainer,
  staggerFast,
  fadeInSlideUp,
  fadeInScale,
  defaultViewport,
} from './MotionWrappers.tsx';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Section Header with Intersection-Observer Slide Up */}
          <motion.div
            className="mb-12"
            variants={fadeInSlideUp}
            viewport={defaultViewport}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
              Background & Academic Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
              ABOUT ME
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
          </motion.div>

          {/* Narrative Block with Intersection-Observer Trigger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
            <motion.div
              className="lg:col-span-8 space-y-5"
              variants={fadeInSlideUp}
              viewport={defaultViewport}
            >
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white leading-snug">
                Turning logical problem solving into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                  creative digital experiences
                </span>.
              </h3>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                {PERSONAL_INFO.bio}
              </p>

              {/* Four Core Pillars with Staggered Slide-Up */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                variants={staggerFast}
              >
                <motion.div
                  variants={fadeInSlideUp}
                  className="p-5 rounded-2xl bg-[#0D1525] border border-blue-900/40 hover:border-blue-500/50 transition-colors space-y-2 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 pb-1 border-b border-white/5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Academic Background</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {PERSONAL_INFO.background}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInSlideUp}
                  className="p-5 rounded-2xl bg-[#0D1525] border border-blue-900/40 hover:border-blue-500/50 transition-colors space-y-2 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 pb-1 border-b border-white/5">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Personal Interests</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {PERSONAL_INFO.interests}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInSlideUp}
                  className="p-5 rounded-2xl bg-[#0D1525] border border-blue-900/40 hover:border-blue-500/50 transition-colors space-y-2 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-indigo-400 pb-1 border-b border-white/5">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <span>Current Learning Goals</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {PERSONAL_INFO.learningGoals}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInSlideUp}
                  className="p-5 rounded-2xl bg-[#0D1525] border border-blue-900/40 hover:border-blue-500/50 transition-colors space-y-2 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 pb-1 border-b border-white/5">
                    <Rocket className="w-4 h-4 text-emerald-400" />
                    <span>Future Ambitions</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {PERSONAL_INFO.futureAmbitions}
                  </p>
                </motion.div>
              </motion.div>

              {/* Work Ethic Checkmarks */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Clean semantic HTML5 & responsive modern CSS styling",
                  "Procedural C problem-solving & fundamental programming",
                  "Interactive web gaming (Canvas game loops) & JavaScript",
                  "Hands-on AI tools integration & prompt engineering",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Profile Summary Panel */}
            <motion.div
              className="lg:col-span-4 p-6 rounded-3xl bg-[#0B1220] border border-blue-900/60 shadow-2xl space-y-4"
              variants={fadeInScale}
              viewport={defaultViewport}
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Developer Summary
                  </h4>
                  <span className="text-xs text-slate-400">Undergraduate BIT Student</span>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-xs sm:text-sm">
                <div className="pb-2.5 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Degree Program</span>
                  <span className="text-cyan-300 font-bold">BIT Semester 1</span>
                </div>
                <div className="pb-2.5 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Location</span>
                  <span className="text-slate-200">Kathmandu, Nepal</span>
                </div>
                <div className="pb-2.5 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Grade 10 SEE</span>
                  <span className="text-amber-300 font-bold">GPA 3.62 (Distinction)</span>
                </div>
                <div className="pb-2.5 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Grade 12 SLC</span>
                  <span className="text-slate-200 font-bold">GPA 2.94</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Primary Focus</span>
                  <span className="text-emerald-400 font-bold">Web & AI Development</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Dedicated to building creative, practical digital projects.</span>
              </div>
            </motion.div>
          </div>

          {/* 4 Feature Metric Cards with Scroll Reveal */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18, margin: '-20px 0px' }}
            variants={staggerContainer}
          >
            {ABOUT_STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInSlideUp}
                className="p-5 rounded-2xl bg-[#0D1525]/90 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-1">
                  {stat.metric}
                </div>
                <h4 className="text-base font-bold font-display text-white mb-1.5">
                  {stat.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
