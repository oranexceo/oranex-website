import React from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { FileSpreadsheet, ShieldAlert, CheckCircle, ArrowRight, Upload, Globe } from 'lucide-react';

export const TenderSection: React.FC = () => {
  const { openTenderModal, navigate, language, t } = useApp();
  const sec = getSectionTranslations(language);

  const tenderPhases = [
    'IDENTIFY', 'ASSESS', 'PREPARE', 'SOURCE', 'SUBMIT', 'PROCURE', 'IMPORT', 'DELIVER', 'EXECUTE', 'SUPPORT'
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Globe className="w-4 h-4" />
              <span>{t.tenderSection.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              {t.tenderSection.title}
            </h2>

            <p className="text-xl text-emerald-400 font-semibold">
              {t.tenderSection.subtitle}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              «{t.tenderSection.desc}»
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.tenderSection.subDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={openTenderModal}
                className="px-6 py-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{t.tenderSection.ctaUpload}</span>
              </button>

              <button
                onClick={() => navigate('tenders')}
                className="px-5 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
              >
                {t.tenderSection.ctaExplore}
              </button>
            </div>

            {/* Mandatory Regulatory / Eligibility Note (Section 31) */}
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded text-[11px] text-slate-400 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {t.tenderSection.disclaimer}
              </span>
            </div>
          </div>

          {/* Right Visual Flow: Tender Document Becoming a Delivered Project */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>{sec.tenderSectionExtra.pipelineTitle}</span>
                <span className="text-emerald-400 font-semibold">{sec.tenderSectionExtra.stageCount}</span>
              </div>

              {/* Visual 10-Step Flow Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-semibold tracking-wider mb-6">
                {tenderPhases.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="font-mono text-[9px] text-slate-500 mb-0.5">0{idx + 1}</div>
                    <div>{phase}</div>
                  </div>
                ))}
              </div>

              {/* Realistic Visual Comparison Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <div className="font-semibold text-white mb-2 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                    <span>{sec.tenderSectionExtra.inboundTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-400 text-[11px]">
                    {sec.tenderSectionExtra.inboundPoints.map((pt, pIdx) => (
                      <li key={pIdx}>· {pt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-lg">
                  <div className="font-semibold text-emerald-300 mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{sec.tenderSectionExtra.deliveredTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    {sec.tenderSectionExtra.deliveredPoints.map((pt, pIdx) => (
                      <li key={pIdx}>· {pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
