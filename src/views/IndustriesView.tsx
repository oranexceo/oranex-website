import React from 'react';
import { useApp } from '../context/AppContext';
import { IndustryPortfolioSection, INDUSTRY_SECTORS } from '../components/sourcing/IndustryPortfolioSection';
import {
  ShieldCheck,
  Building2,
  Boxes,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  PhoneCall,
  Mail
} from 'lucide-react';

export const IndustriesView: React.FC = () => {
  const { openQuoteModal, navigate, language } = useApp();

  return (
    <div className="space-y-12 pb-16 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => navigate('home')} className="hover:text-white transition">
              Home
            </button>
            <span>/</span>
            <span className="text-white font-semibold">Industries &amp; Market Opportunities</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider rounded">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>ORANEX Trading One Member PLC</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Target Industries &amp; Sourcing Opportunities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Direct factory procurement, quality verification, and consolidated logistics designed specifically for Ethiopian enterprises across hospitality, real estate development, commercial retail, wholesale trading, and industrial manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Industry Portfolio Component */}
      <IndustryPortfolioSection />

      {/* Bottom Procurement Liaison Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Procurement &amp; Supply Coordination Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Have Specific Technical Specifications or a Multi-Item BOQ?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our engineering and sourcing specialists in Addis Ababa review itemized specifications, provide certified factory quotations, and arrange pre-shipment inspections in China.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => openQuoteModal({ productOrScope: 'General Industry Sourcing Inquiry' })}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
            >
              Submit an RFQ
            </button>
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition"
            >
              Contact Our Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
