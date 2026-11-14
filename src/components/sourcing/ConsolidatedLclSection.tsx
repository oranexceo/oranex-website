import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Boxes,
  Package,
  Layers,
  Truck,
  FileCheck2,
  Ship,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Warehouse,
  FileText
} from 'lucide-react';

export const ConsolidatedLclSection: React.FC = () => {
  const { openQuoteModal, navigate, language } = useApp();

  const consolidationPillars = [
    {
      step: '01',
      title: 'Multi-Supplier Purchasing',
      icon: Layers,
      summary: 'Coordinate multi-vendor procurement across multiple Chinese manufacturers and wholesale markets into a consolidated consignment.',
      details: 'Ethiopian commercial buyers, contractors, and merchants often require items from multiple distinct producers. Working with our international supply network, we coordinate procurement across specialized industrial clusters including Yiwu commodities, Foshan ceramics and sanitaryware, Guangzhou lighting, and Ningbo hardware.'
    },
    {
      step: '02',
      title: 'LCL vs. FCL Optimization',
      icon: Scale,
      summary: 'Flexible cargo volume from 2 CBM shared groupage up to dedicated 20ft & 40ft HQ full container loads.',
      details: 'When cargo volume is below standard full container thresholds, Less than Container Load (LCL) groupage consolidates verified consignments from 2 CBM upward (subject to cargo compatibility and sailing schedules). When orders reach full container capacity, dedicated Full Container Load (FCL) shipping is arranged.'
    },
    {
      step: '03',
      title: 'China Partner Staging & Receiving',
      icon: Warehouse,
      summary: 'Partner staging and consolidation facilities in Yiwu, Guangzhou, Foshan & Ningbo for receiving, cargo check & palletization.',
      details: 'Goods are delivered to partner staging facilities in major commercial hubs. Cargo receiving teams inspect carton counts and markings against purchase orders, perform voltage compatibility checks (220V/50Hz for Ethiopia), and palletize or crate consignments for secure maritime handling.'
    },
    {
      step: '04',
      title: 'Bank-Compliant Shipping Documentation',
      icon: FileCheck2,
      summary: 'Coordinated commercial invoices, packing lists, CCPIT certificates, and proformas aligned with Ethiopian banking requirements.',
      details: 'Multi-supplier sourcing requires structured administrative coordination. ORANEX facilitates consolidated or coordinated documentation tailored to National Bank of Ethiopia (NBE) guidelines and commercial bank requirements (CBE, Awash Bank, Dashen Bank).'
    },
    {
      step: '05',
      title: 'Corridor Logistics & Staging Liaison',
      icon: Truck,
      summary: 'End-to-end milestone updates from China departure through Port of Djibouti discharge to Modjo Dry Port.',
      details: 'Milestone tracking covers vessel departure from Chinese ports, maritime transit across the Red Sea corridor, bonded discharge at Port of Djibouti, and multimodal transit to Modjo Dry Port. Formal customs declarations and import permits are handled by the importer of record with our operational liaison.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider rounded">
              <Boxes className="w-3.5 h-3.5 text-amber-400" />
              <span>Consolidated Sourcing &amp; LCL Solutions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Consolidated Sourcing &amp; LCL Solutions
            </h2>

            {/* Official Positioning Statement */}
            <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-sky-200 leading-snug">
              &ldquo;Source from multiple suppliers. Consolidate your procurement. Coordinate shipments more efficiently.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Overcome high minimum order quantities, fragmented supplier shipments, and prohibitive airfreight costs. ORANEX enables Ethiopian enterprises to combine purchases from different Chinese factories into single, coordinated container consignments.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => openQuoteModal({ productOrScope: 'Consolidated Sourcing & LCL Quote Request' })}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition transform active:scale-95"
            >
              Request a Consolidated Sourcing Quote
            </button>
            <button
              onClick={() => navigate('merkato-consolidation')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition"
            >
              Explore Merkato Hub
            </button>
          </div>
        </div>

        {/* 5 Structural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consolidationPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className={`bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-slate-600 transition ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      STEP {pillar.step}
                    </span>
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-medium text-amber-200/90 leading-snug">
                    {pillar.summary}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-sky-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Managed End-to-End by ORANEX</span>
                </div>
              </div>
            );
          })}

          {/* Quick Callout Card / Metric summary */}
          <div className="bg-gradient-to-br from-blue-900/90 to-indigo-950/90 rounded-2xl p-6 border border-blue-700/60 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Commercial Consolidation Advantage</span>
              </span>
              <h3 className="text-xl font-black text-white">
                Reduce Freight Friction &amp; Administrative Overhead
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Consolidated groupage significantly lowers per-unit ocean freight costs, eliminates duplicate documentary handling fees, and simplifies port clearance compared to managing fragmented supplier shipments.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LCL shared groupage from 2 CBM (scheduled sailings)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-loading verification at partner staging facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modjo Dry Port multimodal transit tracking</span>
              </div>
            </div>

            <button
              onClick={() => openQuoteModal({ productOrScope: 'Consolidated Sourcing & LCL Quote Request' })}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-slate-100 transition"
            >
              <span>Request a Consolidated Sourcing Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
