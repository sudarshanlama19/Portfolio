import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Sparkles, Layout, Cpu } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData.ts';
import { staggerContainer, fadeInSlideUp, fadeInScale } from './MotionWrappers.tsx';

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
        return <Cpu className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            variants={fadeInSlideUp}
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block mb-2">
                Technical Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white">
                SKILLS & TOOLKIT
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" />
            </div>

            {/* Interactive Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[#0D1525] rounded-xl border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Skills' },
                { id: 'web', label: 'Core Web' },
                { id: 'programming', label: 'Programming' },
                { id: 'ai', label: 'AI & Prompts' },
                { id: 'design', label: 'Design' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
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

          {/* Skills Grid with Staggered Entrance */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="p-6 rounded-2xl bg-[#0D1525]/90 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                >
                  <div>
                    {/* Category & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <span className="text-xs font-mono text-blue-400">
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Status bar */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="capitalize">{skill.category} Track</span>
                    <span className="text-blue-400/90 font-medium">Hands-on Active</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Informative Note for Recruiters & Mentors */}
          <motion.div
            className="mt-12 p-6 rounded-2xl bg-blue-950/20 border border-blue-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            variants={fadeInSlideUp}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Undergraduate Curriculum & Practical Coding Focus
                </h4>
                <p className="text-xs text-slate-400">
                  Focusing on procedural C, computational mathematics, and modular modern web interfaces.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="text-xs text-blue-400 hover:text-white font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              Discuss Technical Stack →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
