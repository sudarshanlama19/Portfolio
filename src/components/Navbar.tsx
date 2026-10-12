import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'My Websites', href: '#websites', id: 'websites' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Scrollspy and header compact state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Scrollspy active section
      const sections = ['home', 'about', 'education', 'skills', 'websites', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    // Automatically close the mobile menu on link click to enhance UX
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#070B13]/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'py-3 sm:py-3.5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={handleNavLinkClick}
            className="group flex items-center gap-2 text-base md:text-lg font-bold font-display tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
            SUDARSHAN LAMA
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-semibold text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-white ${
                    isActive ? 'text-blue-400' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme Toggle, Connect CTA, Hamburger) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95 whitespace-nowrap"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer & Backdrop */}
      {/* 1. Backdrop Overlay with Fade Animation */}
      <div
        className={`fixed inset-0 z-40 bg-black/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-In Drawer Panel with Smooth Spring-like Transform */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[300px] sm:max-w-xs bg-[#090F1C] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-sm font-bold font-display uppercase tracking-wide text-white">
                Navigation
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Automatic Close on Click */}
          <nav className="flex flex-col gap-2 pt-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleNavLinkClick}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold font-display uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Actions & Socials */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <a
            href="#contact"
            onClick={handleNavLinkClick}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold font-display text-xs uppercase tracking-wider text-center block shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
          >
            Get In Touch
          </a>

          {/* Quick Social Icons inside Drawer */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[10px] text-center text-slate-500 font-mono">
            Sudarshan Lama • BIT Sem 1
          </p>
        </div>
      </aside>
    </>
  );
};
