import React from 'react';
import { useApp } from '../context/AppContext';
import { getExtendedTranslations } from '../i18n/extendedTranslations';
import { Search, Boxes, Ship, Truck, CheckCircle2, HeadphonesIcon } from 'lucide-react';

export const CoreProcess: React.FC = () => {
  const { language, t } = useApp();
  const ext = getExtendedTranslations(language);

  const stepIcons = [Search, Boxes, Ship, Truck, CheckCircle2, HeadphonesIcon];
  const steps = ext.coreProcessSteps.map((st, idx) => ({
    ...st,
    icon: stepIcons[idx] || Search
  }));

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-400">
            {t.coreProcess.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            {t.coreProcess.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            {t.coreProcess.subtitle}
          </p>
        </div>

        {/* Desktop Horizontal Process Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-blue-500/50 rounded-lg p-5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-blue-400">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-slate-300 group-hover:text-blue-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-sm text-white tracking-wide">
                    {step.label}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 text-[10px] text-slate-400 font-medium">
                  {step.num} · {step.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
