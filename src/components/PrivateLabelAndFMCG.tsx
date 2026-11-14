import React from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { ShieldCheck, Boxes, ArrowRight } from 'lucide-react';

export const PrivateLabelAndFMCG: React.FC = () => {
  const { openQuoteModal, language } = useApp();
  const sec = getSectionTranslations(language);

  const privateLabelProcess = sec.privateLabelAndFMCG.privateLabel.process;
  const fmcgProcess = sec.privateLabelAndFMCG.fmcg.process;

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 13: Private Label & Framework Supply */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-900 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{sec.privateLabelAndFMCG.privateLabel.kicker}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">
                {sec.privateLabelAndFMCG.privateLabel.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {sec.privateLabelAndFMCG.privateLabel.desc}
              </p>

              {/* Process Flow */}
              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase text-slate-500 mb-2.5">
                  {sec.privateLabelAndFMCG.privateLabel.pathwayTitle}
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-700">
                  {privateLabelProcess.map((step, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="p-1.5 bg-white border border-slate-200 rounded">
                        {step}
                      </span>
                      {idx < privateLabelProcess.length - 1 && (
                        <span className="text-slate-400">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={() => openQuoteModal({ productOrScope: 'Private Label & Framework Supply Discussion' })}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-950 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{sec.privateLabelAndFMCG.privateLabel.requestBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section 14: FMCG Consolidated Import */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-2">
                <Boxes className="w-4 h-4" />
                <span>{sec.privateLabelAndFMCG.fmcg.kicker}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">
                {sec.privateLabelAndFMCG.fmcg.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {sec.privateLabelAndFMCG.fmcg.desc}
              </p>

              {/* Process Flow */}
              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase text-slate-500 mb-2.5">
                  {sec.privateLabelAndFMCG.fmcg.pathwayTitle}
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-700">
                  {fmcgProcess.map((step, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="p-1.5 bg-white border border-slate-200 rounded">
                        {step}
                      </span>
                      {idx < fmcgProcess.length - 1 && (
                        <span className="text-slate-400">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={() => openQuoteModal({ productOrScope: 'FMCG Consolidated Import Inquiry' })}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{sec.privateLabelAndFMCG.fmcg.requestBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
