import React from 'react';
import {
  X,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Phone,
  Mail,
  Building2
} from 'lucide-react';

interface CataloguePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBoqForm?: () => void;
}

export const CataloguePreviewModal: React.FC<CataloguePreviewModalProps> = ({
  isOpen,
  onClose,
  onOpenBoqForm
}) => {
  if (!isOpen) return null;

  const pdfUrl = '/Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf';

  const catalogueSections = [
    {
      title: 'Category 1: Road Construction & Asphalt Materials',
      highlights: ['Paving Bitumen 60/70', 'MC-30 & RC-70 Cutback Bitumen', 'Geosynthetics & Subgrade Geogrids', 'Corrugated Drainage Pipes', 'Highway W-Beam Guardrails & Thermoplastic Road Marking Paints']
    },
    {
      title: 'Category 2: Concrete, Ready-Mix & Precast Solutions',
      highlights: ['OCHEMI PCE 50% High-Range Superplasticizers (ASTM C494 Type F/G)', 'SNF Powder & Sodium Lignosulphonate', 'Extended-Setting Retarders & Accelerators', 'Crystalline Capillary Waterproofing', 'Precast Lifting Anchors & Formwork Systems']
    },
    {
      title: 'Category 3: Building Construction & Finishing Materials',
      highlights: ['Deformed Steel Rebar Grade 60 (BS 4449 / ASTM A615)', 'White Portland Cement CEM I 52.5R & Microsilica (SiO2 ≥ 94%)', 'Torch-on APP/SBS Modified Bituminous Membranes', 'Full-Body Commercial Porcelain Flooring Tiles', 'Curtain Wall Facade Glass, Aluminum Panels & MEP Piping']
    },
    {
      title: 'Category 4: Construction Equipment, Tools & Site Supplies',
      highlights: ['Hydraulic Excavators, Wheel Loaders & Motor Graders', 'Asphalt Pavers & Tandem Compactor Rollers', 'Diesel Generator Sets (50kVA–1000kVA)', 'Surveying Total Stations & Compression Testing Machines', 'Certified Site Safety PPE & Grade 8.8/10.9 Fasteners']
    },
    {
      title: 'Category 5: Construction Material Manufacturing Support',
      highlights: ['Ready-Mix Concrete Batching Plants (HZS60 to HZS180)', 'Automated Dry-Mix Mortar & Tile Adhesive Blending/Packaging Lines', 'Asphalt Concrete Hot-Mix Plants (80–240 TPH) & Decanting Units', 'Raw Polymers: Cellulose Ether HPMC & Redispersible Powder RDP']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Approved Document • 2026 Edition</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            ORANEX Construction Materials & Turnkey Sourcing Catalogue 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Complete technical procurement catalogue covering 5 core construction supply divisions, international manufacturing coordination with Our Chinese partner, and turnkey Ethiopian project execution.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={pdfUrl}
              download="Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download 2026 Catalogue (PDF)</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition border border-white/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            {onOpenBoqForm && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBoqForm();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition ml-auto"
              >
                <span>Submit BOQ for Items in Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Document Summary Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf
                </h4>
                <p className="text-xs text-slate-500">
                  Format: PDF Document • Sourcing Partner: Our Chinese partner • Lead Officer: Eng. Petros Abebe Mengesha
                </p>
              </div>
            </div>
            <a
              href={pdfUrl}
              download="Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Direct Download</span>
            </a>
          </div>

          {/* Table of Contents & Specifications Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Catalogue Contents & Scope of Supply</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">5 Supply Categories</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catalogueSections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">{sec.title}</h4>
                  <ul className="space-y-1">
                    {sec.highlights.map((item, i) => (
                      <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sourcing Contact Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-slate-900">
                Official Technical Sourcing Officer
              </div>
              <div className="text-slate-600">
                Eng. Petros Abebe Mengesha • Mobile / WhatsApp: <strong>+251 912 233 688</strong> • Email: <strong>Oranexceo@gmail.com</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                ORANEX TRADING ONE MEMBER PLC • Addis Ababa, Ethiopia • www.oranex.com.et
              </div>
            </div>
            <a
              href="https://wa.me/251912233688"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center gap-1.5 shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

          {/* Commercial Disclosure */}
          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-4 leading-relaxed">
            * <strong>Notice:</strong> All materials, machinery lines, and chemical formulations listed in this catalogue are supplied in direct coordination with vetted international manufacturers through Our Chinese partner. All supplies are subject to technical specification review, supplier confirmation, import eligibility, availability and mutually agreed commercial terms.
          </div>
        </div>
      </div>
    </div>
  );
};
