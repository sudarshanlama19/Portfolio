import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95 cursor-pointer text-xs font-semibold ${className}`}
      title={language === 'en' ? 'नेपाली भाषामा हेर्नुहोस् (Switch to Nepali)' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <Languages className="w-3.5 h-3.5 text-blue-400" />
      <span className="font-mono uppercase tracking-wider">
        {language === 'en' ? 'EN' : 'नेपाली'}
      </span>
    </button>
  );
};
