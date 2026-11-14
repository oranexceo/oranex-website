import React from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { ArrowRight, Check, Cpu } from 'lucide-react';

export const OranexOEMSection: React.FC = () => {
  const { navigate, openQuoteModal, language } = useApp();
  const sec = getSectionTranslations(language);

  const categories = sec.oranexOem.categories;
  const processFlow = sec.oranexOem.processFlow;

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Cpu className="w-4 h-4" />
              <span>{sec.oranexOem.kicker}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              {sec.oranexOem.title}
            </h2>

            <p className="text-base text-slate-300 italic">
              {sec.oranexOem.quote}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {sec.oranexOem.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('solutions', 'oranex-oem')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{sec.oranexOem.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openQuoteModal({ productOrScope: 'Oranex OEM Industrial Supply' })}
                className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors cursor-pointer"
              >
                {sec.oranexOem.requestBtn}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              {sec.oranexOem.categoriesTitle}
            </div>

            {/* Grid of categories (No pill enclosures, clean typography) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200"
                >
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>

            {/* Sourcing Process Timeline */}
            <div className="border-t border-slate-800 pt-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-3">
                {sec.oranexOem.processTitle}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-[10px] font-semibold tracking-wider">
                {processFlow.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2 bg-slate-900/80 border border-slate-800 rounded text-slate-300"
                  >
                    <span className="text-blue-400 block font-mono text-[9px] mb-0.5">0{sIdx + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
