import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getExtendedTranslations } from '../i18n/extendedTranslations';
import {
  FileSpreadsheet,
  CheckCircle2,
  ShieldAlert,
  Upload,
  ArrowRight,
  Layers,
  FileCheck2,
  Building2,
  HelpCircle,
  Globe,
  MessageCircle,
  FileText,
  Briefcase,
  Zap,
  Droplet,
  FlaskConical,
  Truck,
  Cpu,
  Factory,
  HardHat,
  Anchor,
  Check,
  Minus,
  AlertTriangle,
  HelpCircleIcon
} from 'lucide-react';

export const TendersView: React.FC = () => {
  const { openTenderModal, openQuoteModal, openWhatsAppModal, language, t } = useApp();
  const ext = getExtendedTranslations(language);

  const [activeStep, setActiveStep] = useState(0);

  // Five distinct service levels mapped to active language
  const serviceLevels = [
    {
      levelId: 'Level 0',
      title: t.tenders.level0.name,
      tagline: t.tenders.level0.tagline,
      desc: t.tenders.level0.description,
      deliverables: t.tenders.level0.deliverables,
      decisionSupport: ['GO', 'GO WITH CONDITIONS', 'NO-GO'],
      note: 'The final participation decision belongs to the customer.',
      cta: t.tenders.level0.cta,
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      accentColor: 'border-slate-300 hover:border-slate-500',
      action: () => openTenderModal()
    },
    {
      levelId: 'Level 1',
      title: t.tenders.level1.name,
      tagline: t.tenders.level1.tagline,
      desc: t.tenders.level1.description,
      deliverables: t.tenders.level1.deliverables,
      decisionSupport: null,
      note: null,
      cta: t.tenders.level1.cta,
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      accentColor: 'border-blue-200 hover:border-blue-500',
      action: () => openTenderModal()
    },
    {
      levelId: 'Level 2',
      title: t.tenders.level2.name,
      tagline: t.tenders.level2.tagline,
      desc: t.tenders.level2.description,
      deliverables: t.tenders.level2.deliverables,
      decisionSupport: null,
      note: null,
      cta: t.tenders.level2.cta,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      accentColor: 'border-emerald-300 hover:border-emerald-500',
      recommended: true,
      action: () => openTenderModal()
    },
    {
      levelId: 'Level 3',
      title: t.tenders.level3.name,
      tagline: t.tenders.level3.tagline,
      desc: t.tenders.level3.description,
      deliverables: t.tenders.level3.deliverables,
      decisionSupport: null,
      note: 'If awarded, Oranex can continue supporting the procurement and supply process under a separate or agreed post-award arrangement.',
      cta: t.tenders.level3.cta,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
      accentColor: 'border-amber-300 hover:border-amber-500',
      action: () => openTenderModal()
    },
    {
      levelId: 'Level 4',
      title: t.tenders.level4.name,
      tagline: t.tenders.level4.tagline,
      desc: t.tenders.level4.description,
      deliverables: t.tenders.level4.deliverables,
      decisionSupport: null,
      note: 'Post-award execution is subject to contract award and separate or agreed contractual arrangements.',
      cta: t.tenders.level4.cta,
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-300',
      accentColor: 'border-purple-300 hover:border-purple-500',
      action: () => openTenderModal()
    }
  ];

  // Section 7: Tender Comparison Matrix Rows
  const comparisonRows = [
    { name: 'Tender Review', values: ['✓', '✓', '✓', '✓', '✓'] },
    { name: 'Requirement Extraction', values: ['✓', '✓', '✓', '✓', '✓'] },
    { name: 'Compliance Checklist', values: ['✓', '✓', '✓', '✓', '✓'] },
    { name: 'Bid Preparation', values: ['Review', '✓', '✓', '✓', '✓'] },
    { name: 'International Sourcing', values: ['—', 'Customer', '✓', '✓', '✓'] },
    { name: 'Manufacturer / OEM Search', values: ['—', 'Customer', '✓', '✓', '✓'] },
    { name: 'Technical Documents', values: ['Review', 'Customer', '✓', '✓', '✓'] },
    { name: 'Supplier Quotations', values: ['Review', 'Customer', '✓', '✓', '✓'] },
    { name: 'Commercial Coordination', values: ['—', 'Customer', '✓', '✓', '✓'] },
    { name: 'Submission Readiness', values: ['✓', '✓', '✓', '✓', '✓'] },
    { name: 'Procurement', values: ['—', '—', '—', '✓*', '✓*'] },
    { name: 'Import Coordination', values: ['—', '—', '—', '✓*', '✓*'] },
    { name: 'Delivery', values: ['—', '—', '—', '✓*', '✓*'] },
    { name: 'Installation', values: ['—', '—', '—', '—', '✓*'] },
    { name: 'Commissioning', values: ['—', '—', '—', '—', '✓*'] },
    { name: 'Training', values: ['—', '—', '—', '—', '✓*'] },
    { name: 'Handover', values: ['—', '—', '—', '—', '✓*'] },
    { name: 'Warranty / After-Sales', values: ['—', '—', '—', '—', '✓*'] }
  ];

  const tenderPhases = [
    {
      name: 'IDENTIFY',
      title: 'Opportunity Identification & Screening',
      desc: 'Screening federal, regional, multilateral (UN, World Bank, AfDB), NGO, and commercial tenders against verified OEM technical capabilities and qualification rules.'
    },
    {
      name: 'ASSESS',
      title: 'Technical Specification & BoQ Assessment',
      desc: 'Line-by-line review of tender specifications, Bill of Quantities (BoQ), international standard compliance (ISO, ASTM, DIN, EN), and delivery lead time feasibility.'
    },
    {
      name: 'PREPARE',
      title: 'Bid Dossier & Compliance Packaging',
      desc: 'Assembling manufacturer technical data sheets (TDS), certificates of analysis (COA), ISO factory accreditations, Manufacturer Authorization Letters (MAL), and line-by-line compliance matrices.'
    },
    {
      name: 'SOURCE',
      title: 'International Sourcing & OEM Benchmarking',
      desc: 'Engaging vetted OEM factories in Europe, Asia, the Middle East, and Americas to benchmark competitive ex-factory pricing, volume tiers, and container vessel allocations.'
    },
    {
      name: 'SUBMIT',
      title: 'Bid Submission Coordination',
      desc: 'Ensuring technical proposal documentation is packaged strictly in accordance with procuring entity requirements, tender submission formats, and milestone declarations.'
    },
    {
      name: 'PROCURE',
      title: 'Contract Procurement & Quality Inspection',
      desc: 'Following contract award, executing OEM purchase agreements, letter of credit coordination, overseas factory pre-shipment inspections, and batch testing.'
    },
    {
      name: 'IMPORT',
      title: 'International Maritime & Multimodal Freight',
      desc: 'Managing multimodal ocean freight, shipping line bookings, container staging, port transit bonds, and customs transit clearance into destination entry ports and dry ports.'
    },
    {
      name: 'DELIVER',
      title: 'Destination Haulage & Site Logistics',
      desc: 'Securing coordinated inland transport and heavy haulage directly to project sites, regional stores, municipal depots, or distribution yards across Ethiopia and target African markets.'
    },
    {
      name: 'EXECUTE',
      title: 'Assembly, Commissioning & Site Engineering',
      desc: 'Supervising on-site mechanical erection, electrical integration, trial runs, and performance sign-offs with qualified commissioning engineers.'
    },
    {
      name: 'SUPPORT',
      title: 'Handover, Training & Long-Term Spares',
      desc: 'Executing formal project handovers, providing technical operation manuals, conducting operator staff training, and establishing long-term spare parts liaison.'
    }
  ];

  const procurementCategories = [
    {
      title: 'Government Procurement',
      desc: 'Federal ministries, state utilities, municipal authorities, and regional government infrastructure projects.',
      icon: Building2
    },
    {
      title: 'NGO Procurement',
      desc: 'International humanitarian relief, non-profit development programs, WASH interventions, and community projects.',
      icon: Briefcase
    },
    {
      title: 'UN & Development Projects',
      desc: 'Multilateral procurement for UN agencies (UNICEF, UNDP, FAO, UNHCR), World Bank, and AfDB financed tenders.',
      icon: Globe
    },
    {
      title: 'Institutional Procurement',
      desc: 'Universities, polytechnics, national research institutes, teaching hospitals, and vocational training centers.',
      icon: FileText
    },
    {
      title: 'Commercial Tenders',
      desc: 'Large-scale private developers, corporate construction packages, and private commercial tender packages.',
      icon: Layers
    },
    {
      title: 'Industrial Procurement',
      desc: 'Industrial park tenants, manufacturing facilities, chemical plants, and processing mills requiring continuous inputs.',
      icon: Factory
    },
    {
      title: 'Infrastructure Projects',
      desc: 'Civil engineering works, highways, bridges, dry ports, rail terminals, and industrial park utility backbones.',
      icon: HardHat
    },
    {
      title: 'Equipment Procurement',
      desc: 'Specialized testing devices, commercial tools, industrial measuring rigs, and workshop equipment.',
      icon: Cpu
    },
    {
      title: 'Machinery Procurement',
      desc: 'Heavy industrial production lines, agro-processing machinery, packaging equipment, and mineral crushing gear.',
      icon: Factory
    },
    {
      title: 'Laboratory & Scientific',
      desc: 'Analytical laboratory instruments, chromatography systems, precision spectrometers, reagents, and certified glassware.',
      icon: FlaskConical
    },
    {
      title: 'Energy Projects',
      desc: 'Power distribution transformers, medium-voltage switchgear, solar arrays, transmission conductors, and substations.',
      icon: Zap
    },
    {
      title: 'Water Projects',
      desc: 'Submersible water pumps, ductile iron & HDPE pipe fittings, chlorination stations, and water treatment filtration skids.',
      icon: Droplet
    },
    {
      title: 'ICT & Technical Equipment',
      desc: 'Enterprise server racks, optical fiber cabling, backup power UPS systems, and telecommunications hardware.',
      icon: Cpu
    },
    {
      title: 'Specialized Supply Requirements',
      desc: 'Custom-engineered components, hazardous-grade industrial chemicals, and urgent emergency replacement parts.',
      icon: FileCheck2
    }
  ];

  const renderComparisonValue = (val: string) => {
    if (val === '✓') {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{ext.tenderView.legendSupported}</span>
        </span>
      );
    }
    if (val === '✓*') {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs" title="Post-award under separate arrangement">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>✓* ({ext.tenderView.legendPostAward})</span>
        </span>
      );
    }
    if (val === '—') {
      return (
        <span className="inline-flex items-center text-slate-300 font-bold text-sm">
          <Minus className="w-4 h-4 text-slate-300" />
        </span>
      );
    }
    if (val === 'Customer') {
      return (
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {ext.tenderView.legendCustomer}
        </span>
      );
    }
    if (val === 'Review') {
      return (
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          {ext.tenderView.legendReviewed}
        </span>
      );
    }
    return <span className="text-xs">{val}</span>;
  };

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section 4: Dedicated Formal Tender Hero Section */}
        <div className="bg-slate-950 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-4xl space-y-6">
            {/* Africa-Wide Kicker */}
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Globe className="w-4 h-4" />
              <span>{ext.tenderView.kicker}</span>
            </div>

            {/* Headline (Master V8 Section 4) */}
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight tracking-tight">
              {ext.tenderView.headline}
            </h1>

            {/* Subheadline (Master V8 Section 4) */}
            <p className="text-base sm:text-xl text-emerald-300 font-medium leading-snug">
              {ext.tenderView.subheadline}
            </p>

            {/* Context narrative */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {ext.tenderView.narrative}
            </p>

            {/* CTAs (Section 4) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={openTenderModal}
                className="px-6 py-3.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{ext.tenderView.ctaSubmit}</span>
              </button>

              <button
                onClick={openTenderModal}
                className="px-5 py-3.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{ext.tenderView.ctaReview}</span>
              </button>

              <button
                onClick={() =>
                  openWhatsAppModal(
                    'Hello ORANEX, I would like to speak to a procurement specialist regarding tender support across Africa.'
                  )
                }
                className="px-5 py-3.5 text-xs font-semibold text-emerald-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.cta.chatWhatsApp}</span>
              </button>
            </div>

            {/* Mandatory Regulatory & Market Parameter Disclosure */}
            <div className="mt-6 p-4 bg-slate-900/90 border border-slate-800 rounded-lg text-[11px] text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-400 text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>{ext.tenderView.disclosureTitle}</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {ext.tenderView.disclosureText}
              </p>
              <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 leading-relaxed">
                {ext.tenderView.disclosureFooter}
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: TENDER SERVICE SELECTOR */}
        <div id="service-levels" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Layers className="w-4 h-4" />
                <span>{ext.tenderView.selectorKicker}</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
                {ext.tenderView.selectorTitle}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                {ext.tenderView.selectorSubtitle}
              </p>
            </div>

            <button
              onClick={openTenderModal}
              className="px-6 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-blue-900 rounded-md transition-colors shadow-sm self-start md:self-auto cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{ext.tenderView.ctaSubmit}</span>
            </button>
          </div>

          {/* 5 Distinct Service Cards (Stacked on Mobile, Grid on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceLevels.map((lvl) => (
              <div
                key={lvl.levelId}
                className={`bg-white border-2 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all duration-200 ${lvl.accentColor} ${
                  lvl.recommended ? 'ring-2 ring-emerald-500/30 border-emerald-400 shadow-md' : 'border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Level Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${lvl.badgeColor}`}>
                      {lvl.levelId}
                    </span>
                    {lvl.recommended && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-300">
                        Most Requested
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-slate-900">
                      {lvl.title}
                    </h3>
                    <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                      {lvl.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lvl.desc}
                  </p>

                  {/* Level 0 Decision Support Status Highlight (Section 5) */}
                  {lvl.decisionSupport && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg space-y-1.5">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>Decision-Support Advisory Output:</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-300">GO</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-300">GO WITH CONDITIONS</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded border border-red-300">NO-GO</span>
                      </div>
                      <div className="text-[10px] text-amber-900/80 italic pt-1">
                        IMPORTANT: The final participation decision belongs to the customer.
                      </div>
                    </div>
                  )}

                  {/* Deliverables List */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Scope &amp; Deliverables:
                    </div>
                    {lvl.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specific Note or Disclaimer */}
                  {lvl.note && !lvl.decisionSupport && (
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 italic">
                      {lvl.note}
                    </div>
                  )}
                </div>

                {/* CTA Action */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={lvl.action}
                    className="w-full py-3 px-4 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>{lvl.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Fast-Track Direct Submission Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border-2 border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    Fast-Track Africa Submission
                  </span>
                  <h3 className="text-xl font-display font-extrabold text-white mt-1">
                    SUBMIT YOUR TENDER
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have an active tender document, RfP, or Bill of Quantities? Upload your files to our Addis Ababa procurement desk for multi-level technical review and manufacturer pricing discovery.
                </p>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-[11px] text-slate-300 space-y-1">
                  <div className="font-semibold text-emerald-300">Confidentiality Guarantee:</div>
                  <div className="text-[10px] text-slate-400">All submissions protected under corporate non-disclosure terms.</div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={openTenderModal}
                  className="w-full py-3.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors text-center cursor-pointer shadow-md"
                >
                  SUBMIT YOUR TENDER
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: TENDER COMPARISON TABLE (Master V8 Specification) */}
        <div id="tender-comparison" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900">
                {ext.tenderView.comparisonKicker}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-1">
                {ext.tenderView.comparisonTitle}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                {ext.tenderView.comparisonSubtitle}
              </p>
            </div>

            {/* Quick Legend Bar */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900">{ext.tenderView.legendTitle}</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> {ext.tenderView.legendSupported}</span>
              <span className="flex items-center gap-1"><span className="text-emerald-700 font-bold">✓*</span> {ext.tenderView.legendPostAward}</span>
              <span className="flex items-center gap-1"><span className="text-blue-700 font-semibold">{ext.tenderView.legendReviewed}</span></span>
              <span className="flex items-center gap-1"><span className="text-slate-500 font-semibold">{ext.tenderView.legendCustomer}</span></span>
              <span className="flex items-center gap-1"><Minus className="w-3.5 h-3.5 text-slate-300" /> {ext.tenderView.legendNotIncluded}</span>
            </div>
          </div>

          {/* Responsive Comparison Table with Horizontal Scroll */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-display">
                  <th className="py-4 px-4 font-bold tracking-wider text-xs border-b border-slate-800 sticky left-0 bg-slate-900 z-10 min-w-[200px]">
                    {ext.tenderView.colActivity}
                  </th>
                  <th className="py-4 px-3 font-bold text-center border-b border-slate-800 min-w-[120px]">
                    <div className="text-[10px] text-emerald-400 font-mono">LEVEL 0</div>
                    <div>{ext.tenderView.colLevel0}</div>
                  </th>
                  <th className="py-4 px-3 font-bold text-center border-b border-slate-800 min-w-[130px]">
                    <div className="text-[10px] text-blue-400 font-mono">LEVEL 1</div>
                    <div>{ext.tenderView.colLevel1}</div>
                  </th>
                  <th className="py-4 px-3 font-bold text-center border-b border-slate-800 min-w-[140px] bg-emerald-950/60">
                    <div className="text-[10px] text-emerald-300 font-mono">LEVEL 2 ★</div>
                    <div>{ext.tenderView.colLevel2}</div>
                  </th>
                  <th className="py-4 px-3 font-bold text-center border-b border-slate-800 min-w-[130px]">
                    <div className="text-[10px] text-amber-400 font-mono">LEVEL 3</div>
                    <div>{ext.tenderView.colLevel3}</div>
                  </th>
                  <th className="py-4 px-3 font-bold text-center border-b border-slate-800 min-w-[140px]">
                    <div className="text-[10px] text-purple-400 font-mono">LEVEL 4</div>
                    <div>{ext.tenderView.colLevel4}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonRows.map((row, rIdx) => {
                  const isPostAward = rIdx >= 10;
                  const rowLabel = ext.tenderView.rows[rIdx] || row.name;
                  return (
                    <tr
                      key={rIdx}
                      className={`hover:bg-slate-50 transition-colors ${
                        rIdx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                      } ${isPostAward && rIdx === 10 ? 'border-t-2 border-slate-400' : ''}`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-inherit z-10">
                        <div className="flex items-center justify-between">
                          <span>{rowLabel}</span>
                          {isPostAward && (
                            <span className="text-[9px] font-mono uppercase text-slate-400 font-normal">
                              {ext.tenderView.legendPostAward}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center border-r border-slate-100">
                        {renderComparisonValue(row.values[0])}
                      </td>
                      <td className="py-3.5 px-3 text-center border-r border-slate-100">
                        {renderComparisonValue(row.values[1])}
                      </td>
                      <td className="py-3.5 px-3 text-center border-r border-slate-100 bg-emerald-50/30">
                        {renderComparisonValue(row.values[2])}
                      </td>
                      <td className="py-3.5 px-3 text-center border-r border-slate-100">
                        {renderComparisonValue(row.values[3])}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {renderComparisonValue(row.values[4])}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mandatory Footnote as specified in Section 7 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>{ext.tenderView.footnoteTitle}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              {ext.tenderView.footnoteText}
            </p>
          </div>
        </div>

        {/* Supported Procurement Categories (Prompt Section 9) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-900">
              {ext.tenderView.categoriesKicker}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
              {ext.tenderView.categoriesTitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              {ext.tenderView.categoriesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {procurementCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg hover:border-blue-500/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded bg-white border border-slate-200 text-blue-900 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {cat.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => openQuoteModal({ productOrScope: `${cat.title} Inquiry` })}
                    className="text-[11px] font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 self-start pt-2 border-t border-slate-200/60 w-full cursor-pointer"
                  >
                    <span>{ext.tenderView.categoriesCta}</span>
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 10-Step Interactive Workflow */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              {ext.tenderView.workflowKicker}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
              {ext.tenderView.workflowTitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {ext.tenderView.workflowSubtitle}
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {tenderPhases.map((phase, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`font-mono text-[10px] mb-1 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}>
                    0{idx + 1}
                  </div>
                  <div className="text-xs font-bold truncate">{phase.name}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Details */}
          <div className="p-6 bg-[#F8FAFC] border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                Stage 0{activeStep + 1} Protocol Breakdown
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900">
                {tenderPhases[activeStep].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {tenderPhases[activeStep].desc}
              </p>
            </div>

            <button
              onClick={openTenderModal}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Submit Tender for this Stage
            </button>
          </div>
        </div>

        {/* Tender Readiness Checklist & BoQ Review */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-display font-bold text-slate-900">
              What We Review in Your BoQ
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you submit a Bill of Quantities or RfP specification to ORANEX, our engineering and procurement team performs a thorough compliance audit:
            </p>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Exact standard compliance (ISO, ASTM, DIN, EN, or regional national standards)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Manufacturer Authorization Letter (MAL) and warranty commitments</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Production lead times vs. tender penalty &amp; liquidated damages schedule</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Container stuffing optimization, freight transit corridors, and demurrage risk</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Pre-shipment inspection (PSI) parameters and certified laboratory testing protocols</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Institutional &amp; Project Grounding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Supporting contractors, public authorities, and development agencies across core sectors:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Federal & Regional Ministries',
                  'Public Utilities (Water & Energy)',
                  'UN Agencies (UNICEF, UNDP, FAO, UNHCR)',
                  'International Humanitarian NGOs',
                  'Industrial Park Developers',
                  'Civil & Building Contractors',
                  'Commercial Project Developers'
                ].map((org, oIdx) => (
                  <span key={oIdx} className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium">
                    {org}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openTenderModal}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded transition-colors text-center cursor-pointer"
              >
                Upload Tender Documents for Assessment
              </button>
              <button
                onClick={() => openQuoteModal({ productOrScope: 'General Tender Advisory' })}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors text-center cursor-pointer"
              >
                Request Advisory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
