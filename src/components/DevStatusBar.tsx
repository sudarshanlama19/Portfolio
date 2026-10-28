import React from 'react';
import { GitBranch, Terminal, ExternalLink, Code2, Cpu, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface DevStatusBarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const DevStatusBar: React.FC<DevStatusBarProps> = ({ theme, toggleTheme }) => {
  return (
    <aside
      aria-label="Developer Environment Status"
      className="hidden md:flex fixed bottom-0 left-0 right-0 z-30 h-7 bg-[#050810]/95 backdrop-blur-md border-t border-blue-950/80 px-4 items-center justify-between text-[11px] font-mono text-slate-400 select-none shadow-2xl"
    >
      {/* Left items: Git branch, dev mode, build status */}
      <div className="flex items-center gap-4">
        <a
          href={PERSONAL_INFO.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-cyan-400 hover:text-white transition-colors"
          title="GitHub Repository"
        >
          <GitBranch className="w-3 h-3 text-cyan-400" />
          <span>git:main</span>
        </a>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="hidden lg:inline">build: 0 errors, 0 warnings</span>
          <span className="lg:hidden">build: ok</span>
        </div>

        <div className="hidden xl:flex items-center gap-1 text-slate-500">
          <span>// BIT Curriculum: Purbanchal Univ. Affiliated</span>
        </div>
      </div>

      {/* Center item: Current Program & Project */}
      <div className="hidden sm:flex items-center gap-3 text-slate-300">
        <span className="text-slate-500">runtime:</span>
        <span className="text-blue-300 font-semibold">BIT Semester 1</span>
        <span className="text-slate-600">•</span>
        <a
          href="https://gamehub-4909.ai.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
          title="Flagship Website: GameHub Arcade"
        >
          <span>GameHub Arcade</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Right items: Tech badges, encoding, theme */}
      <div className="flex items-center gap-4">
        <span className="text-slate-400 hidden lg:inline">TypeScript 5.8</span>
        <span className="text-slate-600 hidden lg:inline">|</span>
        <span className="text-slate-400 hidden xl:inline">UTF-8</span>
        <span className="text-slate-600 hidden xl:inline">|</span>
        <span className="text-purple-300 flex items-center gap-1">
          <Code2 className="w-3 h-3 text-purple-400" />
          <span>C & Web Stack</span>
        </span>
        <span className="text-slate-600">|</span>
        <button
          onClick={toggleTheme}
          className="text-cyan-400 hover:text-white transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          [{theme.toUpperCase()}]
        </button>
      </div>
    </aside>
  );
};
