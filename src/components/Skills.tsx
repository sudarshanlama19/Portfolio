import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Sparkles, Layout, Cpu, BookOpen, Layers } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData.ts';
import { staggerContainer, staggerFast, fadeInSlideUp, defaultViewport } from './MotionWrappers.tsx';

export const Skills: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'programming' | 'ai' | 'design'>('all');

  const filteredSkills = filter === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === filter);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'web':
        return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'programming':
        return <Code className="w-4 h-4 text-blue-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'web':
        return 'Web Development';
      case 'programming':
        return 'Core Programming';
      case 'ai':
        return 'AI & Tooling';
      default:
        return 'Tools & Workflow';
    }
  };

  return (
    <section id="skills" className="py-24 relative">
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
                Technical Competencies & Tools
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
                SKILLS & TOOLKIT
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[#0D1525] rounded-xl border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All' },
                { id: 'web', label: 'Core Web' },
                { id: 'programming', label: 'Programming (C)' },
                { id: 'ai', label: 'AI Tools' },
                { id: 'design', label: 'Tools & Workflow' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    filter === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid with Intersection Observer Staggered Slide-Up */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12, margin: '-20px 0px' }}
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  variants={fadeInSlideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="p-5 rounded-2xl bg-[#0D1525]/90 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                >
                  <div>
                    {/* Category & Icon */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-base sm:text-lg font-bold font-display text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {skill.description}
                    </p>
                  </div>

                  {/* Clean Category Footer */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span>{getCategoryLabel(skill.category)}</span>
                    <span className="text-emerald-400 font-medium">Active</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Curriculum & Coding Focus Box with Intersection-Observer Slide Up */}
          <motion.div
            className="mt-10 p-5 rounded-2xl bg-blue-950/20 border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInSlideUp}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Undergraduate Curriculum & Practical Coding Focus
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Tribhuvan University affiliated Bachelor in Information Technology (BIT) Semester 1 coursework in C, digital logic, and modern web frameworks.
                </p>
              </div>
            </div>

            <a
              href="#projects"
              className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-blue-200 hover:text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
            >
              View Featured Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
