import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Factory, FileCheck2, Wrench, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PlatformsView: React.FC = () => {
  const { businessServices, openQuoteModal, openRequirementModal, navigate } = useApp();

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
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-semibold">ORANEX Business Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            ORANEX Business Services
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Supporting organizations with structured international sourcing, recurring industrial supply, cross-border tender support, and turnkey project delivery across African markets.
          </p>
        </div>

        {/* 4 Dedicated Business Services Cards */}
        <div className="space-y-6">
          {businessServices.map((service, idx) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-400 block">
                          Service 0{idx + 1}
                        </span>
                        <h2 className="text-2xl font-display font-bold text-slate-900">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      {service.tagline}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {service.summary}
                    </p>
                  </div>

                  <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-100 rounded-xl p-5 space-y-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Core Deliverables &amp; Capabilities
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {service.deliverables.map((item, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-800 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="text-[11px] text-slate-500">
                        Integrated across Ethiopia and African regional corridors
                      </span>
                      <button
                        onClick={() => openQuoteModal({ productOrScope: `${service.title} Service Scope Inquiry` })}
                        className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors self-stretch sm:self-auto text-center cursor-pointer"
                      >
                        Inquire for {service.title}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
