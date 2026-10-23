import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, CheckCircle, School, Sparkles, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp } from './MotionWrappers.tsx';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-[#090F1C]/60">
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
              Academic Foundation & Certifications
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
              EDUCATION & CERTIFICATIONS
            </h2>
            <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
          </motion.div>

          {/* Timeline Container with Staggered Entrance */}
          <motion.div
            className="relative border-l-2 border-blue-600/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10"
            variants={staggerContainer}
          >
            {EDUCATION_DATA.map((item) => {
              const isCurrent = item.period === 'Current';
              const isCert = item.period === 'Certification';

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
                        : isCert
                        ? 'bg-purple-950/80 border-2 border-purple-500/70 text-purple-300'
                        : 'bg-slate-900 border-2 border-blue-500/50 text-blue-400'
                    }`}
                  >
                    {isCert ? (
                      <Award className="w-4 md:w-5 h-4 md:h-5 text-purple-300" />
                    ) : (
                      <GraduationCap className="w-4 md:w-5 h-4 md:h-5" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div className={`p-6 md:p-8 rounded-3xl bg-[#0D1525] border transition-all duration-300 shadow-xl ${
                    isCert ? 'border-purple-800/40 hover:border-purple-500/50' : 'border-white/10 hover:border-blue-500/40'
                  }`}>
                    {/* Top Header inside Card */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          isCert
                            ? 'bg-purple-950/60 text-purple-300 border-purple-800/50'
                            : 'bg-blue-950/60 text-blue-300 border-blue-800/40'
                        }`}>
                          {item.period}
                        </span>
                        {item.status && (
                          <span className={`text-xs font-medium flex items-center gap-1.5 ${
                            isCert ? 'text-purple-300' : 'text-emerald-400'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${isCert ? 'bg-purple-400' : 'bg-emerald-400 animate-pulse'}`} />
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
                    <div className="flex flex-wrap items-center gap-2 text-sm text-blue-300 font-medium mb-2">
                      {isCert ? (
                        <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                      ) : (
                        <School className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                      {item.mapUrl ? (
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors group/map cursor-pointer"
                          title={`Open in Google Maps: ${item.address || item.institution}`}
                        >
                          <span className="font-semibold group-hover/map:underline underline-offset-4 decoration-cyan-400">
                            {item.institution}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-blue-950/80 border border-blue-800/40 text-cyan-300 group-hover/map:bg-blue-600 group-hover/map:text-white group-hover/map:border-cyan-400 transition-all">
                            <MapPin className="w-3 h-3 text-cyan-400 group-hover/map:text-white" />
                            <span>Google Maps</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-70 group-hover/map:opacity-100" />
                          </span>
                        </a>
                      ) : (
                        <span>{item.institution}</span>
                      )}
                    </div>

                    {/* Address linking directly to Google Maps */}
                    {item.address && (
                      <div className="mb-4">
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors group/addr"
                          title={`View location on Google Maps: ${item.address}`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-blue-400 group-hover/addr:text-cyan-300 shrink-0" />
                          <span className="group-hover/addr:underline underline-offset-2">{item.address}</span>
                        </a>
                      </div>
                    )}

                    {/* GPA Metric if present */}
                    {item.gpa && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 mb-4">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-slate-300">Achieved GPA:</span>
                        <span className="text-sm font-bold font-mono text-amber-300 tabular-nums">
                          {item.gpa}
                        </span>
                        {item.gpa === '3.62' && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                            Distinction
                          </span>
                        )}
                      </div>
                    )}

                    {/* Key Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
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
