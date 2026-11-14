import React from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { ArrowRight, ShieldCheck, Globe, Anchor, FileCheck2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openQuoteModal, openRequirementModal, openTenderModal, navigate, language, t } = useApp();
  const sec = getSectionTranslations(language);

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Hero Image with Measured Scrim for WCAG AA Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_global_logistics_1790427783630.jpg"
          alt="International container shipping logistics terminal and freight corridor connecting to Ethiopia"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Left Value Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Domain Context Kicker (No Pill Enclosures) */}
            <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-blue-400 font-semibold">
              <span>{t.hero.kicker}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              {t.hero.title}
            </h1>

            {/* Supporting Statement (Prompt Section 15) */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            {/* 3 Strategic CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>{t.cta.requestQuote}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openRequirementModal}
                className="px-6 py-3 text-sm font-semibold text-slate-100 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
              >
                {t.cta.tellUsWhatYouNeed}
              </button>

              <button
                onClick={openTenderModal}
                className="px-5 py-3 text-sm font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 rounded-md transition-colors cursor-pointer"
              >
                {t.cta.iHaveATender}
              </button>
            </div>

            {/* Sourcing Pathway Micro-Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{sec.heroExtra.microBar.regions}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Anchor className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{sec.heroExtra.microBar.portTransit}</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{sec.heroExtra.microBar.verifiedDocs}</span>
              </div>
            </div>
          </div>

          {/* Right Corridor Card: Interactive Quick Pathway Indicator */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-2xl backdrop-blur-md">
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-1">
                {t.hero.pathwayTitle}
              </div>
              <div className="text-lg font-display font-bold text-white mb-4">
                {t.hero.pathwaySubtitle}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                {t.hero.pathwayDesc}
              </p>

              <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-blue-400 font-semibold">01</span>
                  <div>
                    <span className="text-white font-medium">{sec.heroExtra.corridor.step1Title}</span>
                    <span className="text-slate-400 ml-1">{sec.heroExtra.corridor.step1Desc}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-blue-400 font-semibold">02</span>
                  <div>
                    <span className="text-white font-medium">{sec.heroExtra.corridor.step2Title}</span>
                    <span className="text-slate-400 ml-1">{sec.heroExtra.corridor.step2Desc}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-blue-400 font-semibold">03</span>
                  <div>
                    <span className="text-white font-medium">{sec.heroExtra.corridor.step3Title}</span>
                    <span className="text-slate-400 ml-1">{sec.heroExtra.corridor.step3Desc}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('solutions')}
                className="mt-6 w-full py-2.5 text-xs font-semibold text-center text-blue-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors"
              >
                {sec.heroExtra.corridor.exploreBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
