import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scroll)));
      setShowBackToTop(totalScroll > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress dimensions
  const strokeWidth = 3;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Top horizontal progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Action Button (FAB) for Scroll-To-Top Animation */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Scroll-To-Top FAB Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-12 h-12 rounded-full bg-[#0D1525]/90 hover:bg-[#132038] text-white shadow-2xl shadow-blue-600/40 border border-blue-500/40 hover:border-cyan-400 flex items-center justify-center cursor-pointer backdrop-blur-md transition-colors group overflow-hidden"
              aria-label="Scroll to top of page"
              title="Scroll to top"
            >
              {/* Circular Scroll Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 52 52">
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  className="stroke-slate-800/80"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  className="stroke-cyan-400 transition-all duration-150 ease-out"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-blue-500/10 group-hover:bg-cyan-500/20 blur-sm pointer-events-none transition-colors" />

              {/* Arrow Icon with Hover Micro-Bounce */}
              <ArrowUp className="w-5 h-5 text-cyan-300 group-hover:text-white transition-all transform group-hover:-translate-y-1 relative z-10" />
            </motion.button>

            {/* Hover Tooltip Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -6, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap"
                >
                  Scroll to top
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
