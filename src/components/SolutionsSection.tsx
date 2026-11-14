import React from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { Globe, Factory, Boxes, FileCheck2, Cpu, Wrench, ArrowRight } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const { navigate, openQuoteModal, language, t } = useApp();
  const sec = getSectionTranslations(language);

  const iconMap: Record<string, React.ElementType> = {
    'international-sourcing': Globe,
    'industrial-supply': Factory,
    'consolidated-import': Boxes,
    'tenders': FileCheck2,
    'oranex-oem': Cpu,
    'project-solutions': Wrench
  };

  const solutions = sec.solutionsSection.solutions.map((item) => ({
    ...item,
    icon: iconMap[item.id] || Globe
  }));

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-800">
              {sec.solutionsSection.kicker}
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mt-1">
              {sec.solutionsSection.title}
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              {sec.solutionsSection.subtitle}
            </p>
          </div>
          <button
            onClick={() => navigate('solutions')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>{sec.solutionsSection.viewAllBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (item.id === 'tenders') {
                        navigate('tenders');
                      } else {
                        navigate('solutions', item.id);
                      }
                    }}
                    className="text-xs font-semibold text-slate-900 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.cta.exploreSolutions}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openQuoteModal({ productOrScope: item.title })}
                    className="text-[11px] font-medium text-slate-500 hover:text-blue-900 underline cursor-pointer"
                  >
                    {t.cta.requestQuote}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
