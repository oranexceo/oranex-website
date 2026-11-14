import React from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_PLATFORMS, SOLUTIONS_DATA, PARTNERS_DATA } from '../data/mockData';
import {
  ShieldCheck,
  Building2,
  HardHat,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Ship,
  Sprout,
  FlaskConical,
  BarChart2,
  Cpu,
  FileText
} from 'lucide-react';

export const SolutionsView: React.FC = () => {
  const { navigate, openQuoteModal, subTab } = useApp();

  React.useEffect(() => {
    if (subTab === 'agrilink' || subTab === 'odata' || subTab === 'osemi') {
      navigate('construction-industrial');
    }
  }, [subTab, navigate]);

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
          Enterprise Business Units
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          ORANEX Divisions & Specialized Solutions
        </h1>
        <p className="text-sm text-slate-600">
          Oranex Trading One Member PLC operates specialized commercial platforms designed to bridge Ethiopian enterprise demand with international manufacturing, certified chemical engineering, and technical supply chain execution.
        </p>
      </div>

      {/* Divisions Showcase */}
      <div className="space-y-8">
        {BUSINESS_PLATFORMS.map((platform) => (
          <div
            key={platform.id}
            id={platform.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800">
                  {platform.code}
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                  {platform.badge}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{platform.name}</h2>
              <p className="text-sm font-semibold text-blue-700">{platform.tagline}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {platform.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              {platform.id === 'turnkey-materials-sourcing' ? (
                <button
                  onClick={() => navigate('construction-materials-sourcing')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow-lg"
                >
                  Enter Turnkey Sourcing
                </button>
              ) : platform.id === 'construction-industrial' ? (
                <button
                  onClick={() => navigate('construction-industrial')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow"
                >
                  Enter Construction Division
                </button>
              ) : platform.id === 'ochemi' ? (
                <button
                  onClick={() => navigate('construction-industrial', 'construction-chemicals')}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow"
                >
                  View OCHEMI Catalogue
                </button>
              ) : platform.id === 'tender-services' ? (
                <button
                  onClick={() => navigate('tenders')}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow"
                >
                  Explore Tenders & RFQs
                </button>
              ) : platform.id === 'oem-private-label' ? (
                <button
                  onClick={() => navigate('construction-industrial', 'global-sourcing-oem')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow"
                >
                  OEM & Packaging Programs
                </button>
              ) : platform.id === 'merkato-consolidation' ? (
                <button
                  onClick={() => navigate('merkato-consolidation')}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow"
                >
                  Merkato LCL Hub & Calculator
                </button>
              ) : (
                <button
                  onClick={() => openQuoteModal()}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center"
                >
                  Request Information
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Solutions Grid */}
      <div className="space-y-6 pt-6">
        <div>
          <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
            Operational Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            End-to-End Procurement & Technical Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOLUTIONS_DATA.map((sol) => (
            <div key={sol.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                {sol.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{sol.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{sol.description}</p>
              <ul className="text-xs text-slate-700 space-y-1 pt-2 border-t border-slate-100">
                {sol.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
