import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe2, BrainCircuit, Rocket, CheckCircle2, Terminal } from 'lucide-react';
import { PERSONAL_INFO, ABOUT_STATS } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

export const About: React.FC = () => {
  const statIcons = [
    <BookOpen className="w-5 h-5 text-blue-400" />,
    <Globe2 className="w-5 h-5 text-cyan-400" />,
    <BrainCircuit className="w-5 h-5 text-indigo-400" />,
    <Rocket className="w-5 h-5 text-sky-400" />,
  ];

  return (
    <section id="about" className="py-28 relative">
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
              Discovery & Narrative
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
              ABOUT ME
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
          </motion.div>

          {/* Narrative Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <motion.div className="lg:col-span-8 space-y-6" variants={fadeInSlideUp}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white leading-snug">
                Curious technologist turning logical code into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  interactive digital reality
                </span>.
              </h3>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Currently navigating the first semester of my Bachelor in Information Technology (BIT) at university,
                I balance foundational computer science (computational mathematics, logic, and procedural C programming)
                with modern front-end web engineering, interactive browser platforms, and cutting-edge artificial intelligence workflows.
              </p>

              {/* Core Values / Work Ethic */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Clean semantic code architecture",
                  "Procedural C problem-solving & memory discipline",
                  "Interactive web gaming & canvas loops",
                  "Continuous AI tool & workflow integration",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Info Side Panel */}
            <motion.div
              className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#0D1525] border border-white/10 shadow-xl space-y-4"
              variants={fadeInScale}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400">
                <Terminal className="w-4 h-4" />
                <span>Developer Summary</span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="pb-3 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Current Program</span>
                  <span className="font-semibold text-white">BIT (Semester 1)</span>
                </div>
                <div className="pb-3 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Location</span>
                  <span className="font-semibold text-white">Kathmandu, Nepal</span>
                </div>
                <div className="pb-3 border-b border-white/5 flex justify-between items-center">
                  <span className="text-slate-400">Grade 10 Distinction</span>
                  <span className="font-semibold font-mono text-cyan-300">3.62 GPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Primary Focus</span>
                  <span className="font-semibold text-blue-400">Web Platforms & Games</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Feature Cards (Staggered Children) */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {ABOUT_STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInSlideUp}
                className="p-6 rounded-2xl bg-[#0D1525]/80 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {statIcons[index]}
                </div>
                <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
                  {stat.metric}
                </div>
                <h4 className="text-lg font-bold font-display text-white mb-2">
                  {stat.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
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
