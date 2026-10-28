import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  FileText,
  Home,
  User,
  GraduationCap,
  Code2,
  Gamepad2,
  Compass,
  Send,
  ChevronRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home', icon: Home },
    { label: 'About', href: '#about', id: 'about', icon: User },
    { label: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { label: 'Skills', href: '#skills', id: 'skills', icon: Code2 },
    { label: 'Projects', href: '#projects', id: 'projects', icon: Gamepad2 },
    { label: 'Journey', href: '#journey', id: 'journey', icon: Compass },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Send },
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
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'journey', 'contact'];
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
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs tracking-wider uppercase font-semibold text-slate-300">
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

          {/* Zone 3: Actions (Theme Toggle, Résumé, Connect CTA, Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* View Résumé Button */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:text-white bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/50 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
                title="View / Download Résumé (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Résumé</span>
              </button>
            )}

            {/* Connect CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95 whitespace-nowrap"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all cursor-pointer active:scale-95 shrink-0 ${
                mobileMenuOpen
                  ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/50 shadow-sm shadow-blue-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer & Backdrop */}
      {/* 1. Backdrop Overlay with Fade Animation */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-In Drawer Panel with Smooth Spring-like Transform */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] sm:max-w-xs bg-[#090F1C] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header & Content */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-sm font-bold font-display uppercase tracking-wide text-white">
                SUDARSHAN LAMA
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-slate-300 hover:text-white" />
            </button>
          </div>

          {/* Navigation Links with Category Icons & Auto-Close */}
          <nav className="flex flex-col gap-1.5 pt-4" id="mobile-navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleNavLinkClick}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold font-display uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/25 text-cyan-300 border border-blue-500/40 shadow-sm shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{link.label}</span>
                  </div>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Actions & Socials */}
        <div className="pt-5 border-t border-white/10 space-y-3 mt-4">
          {onOpenResume && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/60 rounded-xl font-bold font-display text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Résumé (PDF)</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={handleNavLinkClick}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold font-display text-xs uppercase tracking-wider text-center block shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
          >
            Let's Connect
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
            Sudarshan Lama • BIT Student
          </p>
        </div>
      </aside>
    </>
  );
};
