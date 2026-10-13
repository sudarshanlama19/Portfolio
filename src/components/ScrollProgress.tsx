import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));
      setShowBackToTop(totalScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top horizontal progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button (Positioned on the left side to avoid AI assistant) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 transition-all duration-300 active:scale-95 group border border-white/20"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
};
