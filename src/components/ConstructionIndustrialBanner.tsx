import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ArrowRight, ShieldCheck, Globe, FlaskConical, Wrench, HardHat } from 'lucide-react';

export const ConstructionIndustrialBanner: React.FC = () => {
  const { navigate, openQuoteModal } = useApp();

  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 px-4 sm:px-6 border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                First-Class Business Division
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Oranex &times; Our Chinese partner Partnership
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Construction &amp; Industrial Supply Chain
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              From <strong className="text-white">OCHEMI</strong> concrete superplasticizers and batching plants to heavy earthmoving equipment and industrial MRO supplies, connect directly with international manufacturers through Our Chinese partner with localized engineering support in Ethiopia.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-200">OCHEMI Chemicals</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-medium text-slate-200">Batching Plants</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-200">Heavy Machinery</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-medium text-slate-200">Private Label &amp; OEM</span>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Direct Sourcing Portal
              </div>
              <div className="text-lg font-bold text-white">
                Explore the Division
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review structured specifications across Categories A through G, Incoterms transit timelines, and private-label programs.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('construction-industrial')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <span>Enter Division Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openQuoteModal()}
                className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                Request Quotation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
