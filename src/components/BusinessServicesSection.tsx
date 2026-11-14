import React from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { Globe, Factory, FileCheck2, Wrench, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const BusinessServicesSection: React.FC = () => {
  const { businessServices, openQuoteModal, navigate, language, t } = useApp();
  const sec = getSectionTranslations(language);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return Globe;
      case 'Factory': return Factory;
      case 'FileCheck2': return FileCheck2;
      case 'Wrench': return Wrench;
      default: return Globe;
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{sec.businessServicesSection.kicker}</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-white mt-1">
              {sec.businessServicesSection.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              {sec.businessServicesSection.subtitle}
            </p>
          </div>

          <button
            onClick={() => navigate('solutions')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>{sec.businessServicesSection.exploreServicesBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Service-Oriented Cards (Option B) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessServices.map((service, idx) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center group-hover:bg-blue-900/60 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>

                  <div className="text-[11px] font-medium text-emerald-400 mb-3">
                    {service.tagline || ''}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {service.summary || service.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-800/80 mb-6">
                    {(service.deliverables || service.bullets || []).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => openQuoteModal({ productOrScope: `${service.title} Service Inquiry` })}
                    className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 py-1.5 px-3 rounded transition-colors w-full text-center cursor-pointer shadow-xs"
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
