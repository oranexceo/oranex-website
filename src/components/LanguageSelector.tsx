import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageCode } from '../i18n/languages';

interface LanguageSelectorProps {
  variant?: 'header' | 'topbar' | 'mobile' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { language, setLanguage, currentLanguageConfig, availableLanguages, direction } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
          <Globe className="w-3.5 h-3.5 text-blue-700" />
          <span>Select Interface Language / ቋንቋ / اللغة</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                type="button"
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white font-medium shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
                dir={lang.direction}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{lang.nativeName}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    {lang.name}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Header / Topbar dropdown button
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800/20 cursor-pointer shadow-2xs"
        aria-expanded={isOpen}
        aria-label="Language Selector"
      >
        <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="font-semibold text-slate-900">{currentLanguageConfig.code.toUpperCase()}</span>
        <span className="hidden sm:inline text-slate-500 text-[11px]">· {currentLanguageConfig.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} mt-1.5 w-60 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 duration-150`}
          role="menu"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between">
            <span>African & International Languages</span>
            <span className="font-mono text-emerald-600">6 Ready</span>
          </div>

          <div className="py-1">
            {availableLanguages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  type="button"
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  role="menuitem"
                  dir={lang.direction}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center font-mono text-[10px] font-bold text-slate-400 bg-slate-100 rounded py-0.5">
                      {lang.code.toUpperCase()}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 leading-tight">
                        {lang.nativeName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {lang.name} · {lang.regionHint}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            Independent language preference saved for this device.
          </div>
        </div>
      )}
    </div>
  );
};
