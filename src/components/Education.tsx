import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, CheckCircle, School } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-28 relative bg-[#090F1C]/60">
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
              Academic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
              EDUCATION
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
          </motion.div>

          {/* Timeline Container with Staggered Entrance */}
          <motion.div
            className="relative border-l-2 border-blue-600/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12"
            variants={staggerContainer}
          >
            {EDUCATION_DATA.map((item, index) => {
              const isCurrent = item.period === 'Current';

              return (
                <motion.div
                  key={item.id}
                  variants={fadeInSlideUp}
                  className="relative group"
                >
                  {/* Timeline Node Icon */}
                  <div
                    className={`absolute -left-[35px] md:-left-[51px] top-1.5 w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'bg-slate-900 border-2 border-blue-500/50 text-blue-400'
                    }`}
                  >
                    <GraduationCap className="w-4 md:w-5 h-4 md:h-5" />
                  </div>

                  {/* Card Container */}
                  <div className="p-6 md:p-8 rounded-2xl bg-[#0D1525] border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl">
                    {/* Top Header inside Card */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950/60 text-blue-300 border border-blue-800/40">
                          {item.period}
                        </span>
                        {item.status && (
                          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {item.status}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    {/* Degree & Institution */}
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-1">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-blue-300 font-medium mb-4">
                      <School className="w-4 h-4 text-blue-400" />
                      <span>{item.institution}</span>
                    </div>

                    {/* GPA Metric if present */}
                    {item.gpa && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 mb-4">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-slate-300">Achieved GPA:</span>
                        <span className="text-sm font-bold font-mono text-amber-300 tabular-nums">
                          {item.gpa}
                        </span>
                      </div>
                    )}

                    {/* Key Highlights */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
