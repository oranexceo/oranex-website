import React from 'react';
import { useApp } from '../context/AppContext';
import { getExtendedTranslations } from '../i18n/extendedTranslations';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import {
  FileSpreadsheet,
  FileText,
  Search,
  ArrowRight,
  Upload,
  Layers,
  ChevronRight,
  CheckCircle2,
  Factory,
  Boxes,
  Cog,
  Wrench,
  Globe
} from 'lucide-react';

export const QuickCustomerEntry: React.FC = () => {
  const { navigate, openQuoteModal, openRequirementModal, openTenderModal, language, t } = useApp();
  const ext = getExtendedTranslations(language);
  const sec = getSectionTranslations(language);

  const secondaryQuickLinks = [
    {
      title: ext.quickEntry.secondaryLinks[0]?.title || 'Browse Catalogue & Source',
      desc: ext.quickEntry.secondaryLinks[0]?.desc || 'Over 50+ verified chemicals, polymers, steel & inputs',
      icon: Search,
      action: () => navigate('products')
    },
    {
      title: ext.quickEntry.secondaryLinks[1]?.title || 'Industrial Supply Pathway',
      desc: ext.quickEntry.secondaryLinks[1]?.desc || 'Raw materials, packaging, and recurring factory inputs',
      icon: Factory,
      action: () => navigate('solutions', 'industrial-supply')
    },
    {
      title: ext.quickEntry.secondaryLinks[2]?.title || 'Machinery & Equipment',
      desc: ext.quickEntry.secondaryLinks[2]?.desc || 'Turnkey plant lines, testing devices & commissioning',
      icon: Cog,
      action: () => navigate('solutions', 'project-solutions')
    },
    {
      title: ext.quickEntry.secondaryLinks[3]?.title || 'Consolidated Import Program',
      desc: ext.quickEntry.secondaryLinks[3]?.desc || 'Combined container cargo & reduced port clearance costs',
      icon: Boxes,
      action: () => navigate('solutions', 'consolidated-import')
    },
    {
      title: ext.quickEntry.secondaryLinks[4]?.title || 'Spare Parts & Precision Wear',
      desc: ext.quickEntry.secondaryLinks[4]?.desc || 'OEM & compatible mechanical, electrical & plant spares',
      icon: Wrench,
      action: () => openRequirementModal()
    },
    {
      title: ext.quickEntry.secondaryLinks[5]?.title || 'Tender & Africa Coverage',
      desc: ext.quickEntry.secondaryLinks[5]?.desc || 'Multi-level tender engineering across 20+ African markets',
      icon: Globe,
      action: () => navigate('tenders')
    }
  ];

  return (
    <section id="what-do-you-need" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (Master V8 Section 3) */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
            <Layers className="w-4 h-4 text-blue-700" />
            <span>{t.whatDoYouNeed.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            {t.whatDoYouNeed.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed font-normal">
            {t.whatDoYouNeed.subtitle}
          </p>
        </div>

        {/* 3 Primary Master Pathways (Cards 1, 2, 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* ---------------- CARD 1: FORMAL TENDER ---------------- */}
          <div className="relative bg-[#F8FAFC] hover:bg-white border-2 border-slate-200 hover:border-emerald-500/80 rounded-2xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-md border border-emerald-200">
                  {sec.quickEntryExtra.pathway01Badge}
                </span>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 group-hover:text-emerald-950 transition-colors">
                  {t.whatDoYouNeed.card1Title}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold mt-1">
                  {t.whatDoYouNeed.card1Subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whatDoYouNeed.card1Desc}
              </p>

              {/* Flow Sequence Banner */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {ext.quickEntry.executionPathwayLabel}
                </div>
                <div className="text-[11px] font-semibold text-slate-800 flex flex-wrap items-center gap-1.5 leading-snug">
                  {ext.quickEntry.card1Pathway}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                {ext.quickEntry.card1Deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Action */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 space-y-3">
              <button
                onClick={openTenderModal}
                className="w-full py-3.5 px-4 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{t.whatDoYouNeed.card1Cta}</span>
              </button>
              <button
                onClick={() => navigate('tenders')}
                className="w-full text-center text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>{ext.quickEntry.card1Explore}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ---------------- CARD 2: RFQ / PROFORMA ---------------- */}
          <div className="relative bg-[#F8FAFC] hover:bg-white border-2 border-slate-200 hover:border-blue-500/80 rounded-2xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-blue-100 text-blue-900 rounded-md border border-blue-200">
                  {sec.quickEntryExtra.pathway02Badge}
                </span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 group-hover:text-blue-950 transition-colors">
                  {t.whatDoYouNeed.card2Title}
                </h3>
                <p className="text-xs text-blue-800 font-semibold mt-1">
                  {t.whatDoYouNeed.card2Subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whatDoYouNeed.card2Desc}
              </p>

              {/* Flow Sequence Banner */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {ext.quickEntry.executionPathwayLabel}
                </div>
                <div className="text-[11px] font-semibold text-slate-800 flex flex-wrap items-center gap-1.5 leading-snug">
                  {ext.quickEntry.card2Pathway}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                {ext.quickEntry.card2Deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Action */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 space-y-3">
              <button
                onClick={() => openQuoteModal({ productOrScope: 'RFQ / Commercial Proforma Request' })}
                className="w-full py-3.5 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.whatDoYouNeed.card2Cta}</span>
              </button>
              <button
                onClick={() => navigate('solutions', 'consolidated-import')}
                className="w-full text-center text-xs font-semibold text-slate-600 hover:text-blue-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>{ext.quickEntry.card2Explore}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ---------------- CARD 3: DIRECT REQUIREMENT ---------------- */}
          <div className="relative bg-[#F8FAFC] hover:bg-white border-2 border-slate-200 hover:border-amber-500/80 rounded-2xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                  {sec.quickEntryExtra.pathway03Badge}
                </span>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 group-hover:text-amber-950 transition-colors">
                  {t.whatDoYouNeed.card3Title}
                </h3>
                <p className="text-xs text-amber-800 font-semibold mt-1">
                  {t.whatDoYouNeed.card3Subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t.whatDoYouNeed.card3Desc}
              </p>

              {/* Flow Sequence Banner */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {ext.quickEntry.executionPathwayLabel}
                </div>
                <div className="text-[11px] font-semibold text-slate-800 flex flex-wrap items-center gap-1.5 leading-snug">
                  {ext.quickEntry.card3Pathway}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                {ext.quickEntry.card3Deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Action */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 space-y-3">
              <button
                onClick={openRequirementModal}
                className="w-full py-3.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>{t.whatDoYouNeed.card3Cta}</span>
              </button>
              <button
                onClick={() => navigate('products')}
                className="w-full text-center text-xs font-semibold text-slate-600 hover:text-amber-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>{ext.quickEntry.card3Explore}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Category Direct-Routing Grid (Preserving All Previous Quick Access) */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {sec.quickEntryExtra.routingKicker}
              </span>
              <h3 className="text-base font-display font-bold text-slate-900">
                {t.whatDoYouNeed.secondaryTitle}
              </h3>
            </div>
            <button
              onClick={openRequirementModal}
              className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{sec.quickEntryExtra.customSpecPrompt}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryQuickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={item.action}
                  className="p-4 bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-blue-300 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-700 group-hover:text-blue-900 group-hover:border-blue-200 flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition-colors flex items-center justify-between">
                      <span className="truncate">{item.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
