import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Smooth springs for fluid trailing cursor effect
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  const ringX = useSpring(-100, { stiffness: 220, damping: 22 });
  const ringY = useSpring(-100, { stiffness: 220, damping: 22 });

  useEffect(() => {
    // Only enable custom cursor on devices that support fine pointer hover (e.g. mice)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Detect hovered interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer')
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Central Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClicked ? 0.6 : isHovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          isHovered
            ? 'w-10 h-10 border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            : 'w-7 h-7 border-blue-400/50 bg-blue-500/5'
        }`}
        style={{
          x: ringX,
          y: ringY,
          scale: isClicked ? 0.8 : isHovered ? 1.25 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
