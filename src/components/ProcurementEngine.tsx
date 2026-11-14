import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getExtendedTranslations } from '../i18n/extendedTranslations';
import {
  Layers,
  Search,
  Ship,
  CheckCircle2,
  ChevronRight,
  Terminal,
  FileSpreadsheet,
  FileText,
  Boxes,
  ArrowRight,
  ShieldCheck,
  Globe,
  Truck,
  Wrench,
  Cpu
} from 'lucide-react';

export const ProcurementEngine: React.FC = () => {
  const { openTenderModal, openQuoteModal, openRequirementModal, language } = useApp();
  const ext = getExtendedTranslations(language);
  const [activeTab, setActiveTab] = useState<'architecture' | 'tender' | 'rfq' | 'requirement' | 'sourcing' | 'import' | 'execution'>('architecture');

  const pipelineStages = ext.procurementEngine.stages;

  return (
    <section id="procurement-engine" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{ext.procurementEngine.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {ext.procurementEngine.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            {ext.procurementEngine.subtitle}
          </p>
        </div>

        {/* 9-Stage Unified Sequence Ribbon */}
        <div className="mb-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              {ext.procurementEngine.sequenceKicker}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              {ext.procurementEngine.sequenceFormula}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {pipelineStages.map((stg) => (
              <div
                key={stg.code}
                className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-2.5 text-center group hover:border-emerald-500/50 transition-colors"
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold mb-0.5">
                  {stg.code}
                </div>
                <div className="text-xs font-bold text-white tracking-wide">
                  {stg.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-1">
                  {stg.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conceptual Architecture Interactive Diagram */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold">
              {ext.procurementEngine.diagramKicker}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
              {ext.procurementEngine.diagramTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5">
              {ext.procurementEngine.diagramSubtitle}
            </p>
          </div>

          {/* Top Layer: 3 Entry Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
            {/* Entry 1: Tenders */}
            <div
              onClick={() => setActiveTab('tender')}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                activeTab === 'tender'
                  ? 'bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950/80 rounded border border-emerald-800/80">
                  Channel 01
                </span>
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-white">{ext.procurementEngine.channels.tenders}</h4>
              <p className="text-xs text-emerald-300 font-mono mt-0.5">{ext.procurementEngine.engines.tender}</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                BoQ audit, technical compliance matrix, OEM authorization letters &amp; bid preparation.
              </p>
            </div>

            {/* Entry 2: RFQs */}
            <div
              onClick={() => setActiveTab('rfq')}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                activeTab === 'rfq'
                  ? 'bg-slate-950 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-400 px-2 py-0.5 bg-blue-950/80 rounded border border-blue-800/80">
                  Channel 02
                </span>
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-base font-bold text-white">{ext.procurementEngine.channels.rfqs}</h4>
              <p className="text-xs text-blue-300 font-mono mt-0.5">{ext.procurementEngine.engines.rfq}</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Direct ex-factory quotation, bank proforma invoicing for LC, and commercial procurement.
              </p>
            </div>

            {/* Entry 3: Direct Requirements */}
            <div
              onClick={() => setActiveTab('requirement')}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                activeTab === 'requirement'
                  ? 'bg-slate-950 border-amber-500 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 px-2 py-0.5 bg-amber-950/80 rounded border border-amber-800/80">
                  Channel 03
                </span>
                <Boxes className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-white">{ext.procurementEngine.channels.requirements}</h4>
              <p className="text-xs text-amber-300 font-mono mt-0.5">{ext.procurementEngine.engines.requirement}</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Open specification intake, TDS/COA chemical matching, and specialized product sourcing.
              </p>
            </div>
          </div>

          {/* Central Convergence Connector */}
          <div className="flex items-center justify-center my-4">
            <div className="px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>{language === 'fr' ? 'Les 3 voies convergent vers le moteur central d’exécution' : language === 'ar' ? 'تلتقي المسارات الثلاثة في محرك التنفيذ الرئيسي' : language === 'pt' ? 'Todas as 3 vias convergem no motor central de execução' : language === 'sw' ? 'Njia zote 3 zinajiunga kwenye mtambo mkuu wa utekelezaji' : language === 'am' ? 'ሦስቱም መንገዶች ወደ ዋናው የሥራ ማስኬጃ ሞተር ይገናኛሉ' : 'All 3 Pathways Converge into the Core Execution Engine'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400 rotate-90" />
            </div>
          </div>

          {/* Core Operational Pipeline (Downstream Stages) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                id: 'sourcing',
                name: ext.procurementEngine.engines.sourcing,
                desc: 'OEM vetting & pricing',
                icon: Search,
                tag: 'Europe · Asia · Americas'
              },
              {
                id: 'procurement',
                name: ext.procurementEngine.engines.procurement,
                desc: 'Contracts & LC execution',
                icon: ShieldCheck,
                tag: 'Banking & Compliance'
              },
              {
                id: 'import',
                name: ext.procurementEngine.engines.import,
                desc: 'Multimodal freight',
                icon: Ship,
                tag: 'Djibouti & Modjo Transit'
              },
              {
                id: 'logistics',
                name: ext.procurementEngine.engines.logistics,
                desc: 'Dry port to site haulage',
                icon: Truck,
                tag: 'Destination Haulage'
              },
              {
                id: 'execution',
                name: ext.procurementEngine.engines.execution,
                desc: 'Assembly & commissioning',
                icon: Wrench,
                tag: 'Field Engineering'
              },
              {
                id: 'support',
                name: ext.procurementEngine.engines.support,
                desc: 'Training & ongoing spares',
                icon: Cpu,
                tag: 'Long-term SLA'
              }
            ].map((node, nIdx) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-mono text-[9px] text-slate-500 mb-0.5">0{nIdx + 4}</div>
                    <h5 className="text-[11px] font-bold text-white tracking-wide">
                      {node.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {node.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-emerald-400">
                    {node.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Module Detail Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-400">
                  Operational Protocol
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400">Addis Ababa Sourcing Desk</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white">
                {activeTab === 'tender' && 'Tender Engine Protocol'}
                {activeTab === 'rfq' && 'RFQ & Proforma Engine Protocol'}
                {activeTab === 'requirement' && 'Requirement Engine Protocol'}
                {activeTab === 'sourcing' && 'Global Sourcing Engine Protocol'}
                {activeTab === 'import' && 'Import & Multimodal Engine Protocol'}
                {activeTab === 'execution' && 'Project Execution Protocol'}
                {activeTab === 'architecture' && 'Unified Core Architecture'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTab === 'tender' &&
                  'Structures complex institutional bids across ministries, public utilities, and NGOs. Performs line-by-line BoQ verification, compliance matrix assembly, manufacturer authorization letters (MAF), and submission packaging.'}
                {activeTab === 'rfq' &&
                  'Transforms buyer requests into verified manufacturer quotes, formal commercial proforma invoices for Letter of Credit (LC) opening, and freight-optimized delivery terms to Modjo Dry Port and regional entry corridors.'}
                {activeTab === 'requirement' &&
                  'Intakes open technical requirements, chemical formulations, industrial inputs, or machinery specs without requiring client supplier knowledge, immediately activating global factory matching.'}
                {activeTab === 'architecture' &&
                  'Eliminates fragmented procurement silos. All three inbound demands route through identical international vetting, consolidated shipping lines, certified pre-shipment inspections, and coordinated inland delivery logistics.'}
                {activeTab === 'sourcing' &&
                  'Direct engagement with audited OEM factories across Europe, Asia, Americas, and the Middle East, benchmarking ex-factory prices, ISO certifications, and container availability.'}
                {activeTab === 'import' &&
                  'End-to-end multimodal transport coordination through Djibouti Port, transit customs bonds, and Modjo Dry Port clearance with complete demurrage risk minimization.'}
                {activeTab === 'execution' &&
                  'On-site field assembly, mechanical and electrical erection, test runs, certified operator training, and formal commissioning sign-offs for turnkey installations.'}
              </p>

              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-white uppercase text-[10px] tracking-wider">
                  Verified Standards:
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified ISO, ASTM, DIN, EN &amp; Ethiopian Standards</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Corporate Non-Disclosure &amp; Commercial Confidentiality</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Multi-Currency Compliance (USD, EUR, RMB &amp; LC matching)</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Actions */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Direct Intake Triggers</span>
                </div>
                <span>Select Your Entry Point</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={openTenderModal}
                  className="w-full p-4 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Route 1: Formal Tender Intake
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Upload BoQ or RFP for 5-level technical and supply support
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => openQuoteModal({ productOrScope: 'RFQ / Commercial Proforma Request' })}
                  className="w-full p-4 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        Route 2: RFQ &amp; Commercial Proforma Intake
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Request ex-factory quote and proforma for bank LC processing
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={openRequirementModal}
                  className="w-full p-4 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        Route 3: Direct Requirement Intake
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Submit custom raw material, machinery, or spare parts specifications
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 italic pt-2">
                All pathways operate under applicable procurement rules, customer authorization, local regulations, and contractual arrangements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
