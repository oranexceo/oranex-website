import React from 'react';
import { useApp } from '../context/AppContext';
import { IndustryPortfolioSection } from '../components/sourcing/IndustryPortfolioSection';
import { ConsolidatedLclSection } from '../components/sourcing/ConsolidatedLclSection';
import {
  ShieldCheck,
  Building2,
  HardHat,
  ArrowRight,
  Globe2,
  Award,
  ChevronRight,
  TrendingUp,
  FlaskConical,
  Truck,
  Layers,
  FileCheck2,
  CheckCircle2,
  Package,
  Sparkles,
  Calculator,
  Boxes,
  FileText,
  Ship,
  Scale
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate, openQuoteModal, tenders, language, t } = useApp();

  const coreServiceCategories = [
    {
      id: 'global-sourcing',
      num: '01',
      title: 'Global Sourcing',
      amharicTitle: 'ዓለም አቀፍ ምንጭ ፍለጋ',
      chineseTitle: '全球寻源与原厂直采',
      arabicTitle: 'التوريد العالمي',
      icon: Globe2,
      desc: 'Direct factory identification, rigorous manufacturer vetting, and sample verification across key industrial hubs in Asia and international markets.',
      highlight: 'Direct factory pricing • Zero broker layers'
    },
    {
      id: 'procurement',
      num: '02',
      title: 'Procurement & Supply Coordination',
      amharicTitle: 'የግዥ እና አቅርቦት አስተዳደር',
      chineseTitle: '大宗采购与商务协调',
      arabicTitle: 'إدارة المشتريات والتوريد',
      icon: FileCheck2,
      desc: 'End-to-end commercial representation, tender support, contract negotiation, and line-item Bill of Quantities (BOQ) execution.',
      highlight: 'Full BOQ pricing • Bank proformas for L/C'
    },
    {
      id: 'construction-industrial',
      num: '03',
      title: 'Construction & Industrial Supply',
      amharicTitle: 'የኮንስትራክሽን እና ኢንዱስትሪ አቅርቦት',
      chineseTitle: '工程建材与工业重型装备',
      arabicTitle: 'توريد مواد البناء والمعدات',
      icon: HardHat,
      desc: 'Specialized supply of ASTM Grade 60 rebar, OCHEMI concrete chemicals, commercial batching plants, road bitumen 60/70, and factory machinery.',
      highlight: 'ASTM/EN conformity • Mill Test Certificates'
    },
    {
      id: 'wholesale-consolidation',
      num: '04',
      title: 'Wholesale & Container Consolidation',
      amharicTitle: 'የጅምላ እና የኮንቴነር ማጠቃለያ',
      chineseTitle: '大宗批发与拼箱集运 (LCL)',
      arabicTitle: 'تجميع الحاويات المشتركة والتجارة',
      icon: Boxes,
      desc: 'Multi-supplier order consolidation from 2 CBM upward, China warehouse staging in Yiwu & Guangzhou, and shared groupage container shipping.',
      highlight: 'From 2 CBM • Multi-supplier integration'
    },
    {
      id: 'logistics-coordination',
      num: '05',
      title: 'Logistics Coordination',
      amharicTitle: 'የሎጂስቲክስ ቅንጅት',
      chineseTitle: '多式联运物流与到岸协同',
      arabicTitle: 'التنسيق اللوجستي والنقل المتعدد',
      icon: Ship,
      desc: 'Freight booking, ocean transit monitoring, Djibouti port transit clearance, and bonded multimodal rail transit directly to Modjo Dry Port.',
      highlight: 'Port of Djibouti → Modjo Dry Port delivery'
    }
  ];

  return (
    <div className="space-y-16 pb-16 bg-slate-50">
      {/* SECTION 1: MASTER HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-20 lg:py-28 px-4 sm:px-8 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          {/* Top Brand Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider rounded">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>ORANEX TRADING ONE MEMBER PLC</span>
            </div>
            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-slate-300 font-medium">
              Ethiopia-based, internationally connected.
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Global Sourcing &amp; Procurement Partner
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              International Sourcing • Procurement Coordination • Industrial Supply • Container Consolidation
            </p>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl pt-2">
              ORANEX connects Ethiopian contractors, developers, retailers, wholesalers, and factories directly with verified international manufacturers. We manage technical specifications, quality verification, and consolidated multimodal shipping to Modjo Dry Port.
            </p>
          </div>

          {/* Standardized Primary Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openQuoteModal({ productOrScope: 'General RFQ / Procurement Inquiry' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition transform active:scale-95"
            >
              <span>Submit an RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('construction-materials-sourcing')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 shadow-sm transition"
            >
              <HardHat className="w-4 h-4 text-blue-400" />
              <span>Submit Your BOQ</span>
            </button>

            <button
              onClick={() => navigate('merkato-consolidation')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition transform active:scale-95"
            >
              <Boxes className="w-4 h-4 text-slate-950" />
              <span>Consolidated Sourcing (LCL)</span>
            </button>

            <button
              onClick={() => navigate('landed-cost-calculator')}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Calculate Landed Cost</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,#3b82f6,transparent_70%)] pointer-events-none" />
      </section>

      {/* SECTION 2: 5 CORE SERVICE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
            Core Service Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Five Dedicated Capabilities Powering Your Supply Chain
          </h2>
          <p className="text-sm text-slate-600">
            A comprehensive, transparent B2B service architecture designed to eliminate trading intermediaries, reduce freight overhead, and ensure rigorous technical specification matching and compliance documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {coreServiceCategories.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {service.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition">
                    {language === 'zh'
                      ? service.chineseTitle
                      : language === 'am'
                      ? service.amharicTitle
                      : language === 'ar'
                      ? service.arabicTitle
                      : service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-blue-900">
                    {service.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: CONSOLIDATED SOURCING & LCL SOLUTIONS (PART 7) */}
      <ConsolidatedLclSection />

      {/* SECTION 4: INDUSTRIES & MARKET OPPORTUNITIES (PART 6) */}
      <IndustryPortfolioSection />

      {/* SECTION 5: ACTIVE TENDER & BOQ CO-SOURCING PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" />
                <span>Commercial Tender &amp; Project Sourcing</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Active Project Procurement &amp; BOQ Schedules
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Co-bidding and consolidated procurement execution for major commercial real estate, industrial infrastructure, and public works tenders in Ethiopia.
              </p>
            </div>
            <button
              onClick={() => openQuoteModal({ productOrScope: 'Tender Specification & BOQ Submission' })}
              className="self-start md:self-auto px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
            >
              Submit Your BOQ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tenders.map((tender) => (
              <div
                key={tender.id}
                className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-3 hover:border-slate-600 transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 font-bold">{tender.referenceNumber}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    {tender.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{tender.title}</h4>
                <p className="text-xs text-slate-400">Target Location: {tender.targetLocation}</p>
                <div className="text-xs text-slate-300">
                  <span className="text-slate-400 block mb-1 font-semibold">Scope of Supply:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
                    {tender.scopeOfSupply.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 flex justify-between items-center text-[11px] border-t border-slate-700/60">
                  <span className="text-slate-400">Deadline: {tender.submissionDeadline}</span>
                  <button
                    onClick={() => openQuoteModal({ productOrScope: `Bid Co-Sourcing for ${tender.referenceNumber}` })}
                    className="text-blue-400 hover:underline font-bold"
                  >
                    Bid Co-Sourcing →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: LANDED COST & REGULATORY ENGINE PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Ethiopian Landed Cost Calculator</span>
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Transparent Landed Cost &amp; Customs Duty Valuation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Calculate total delivered costs before issuing bank orders: CIF Djibouti seaport, Ethiopian Customs tariffs (0–35%), VAT (15%), Sur-tax, withholding taxes, and bonded transit to Modjo Dry Port.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('landed-cost-calculator')}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
            >
              Open Landed Cost Calculator
            </button>
            <button
              onClick={() => openQuoteModal({ productOrScope: 'Customs & Landed Cost Consultation' })}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-300 transition"
            >
              Request a Procurement Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
