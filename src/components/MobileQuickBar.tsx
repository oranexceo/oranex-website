import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, MessageSquare, Upload, HelpCircle } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  const { openQuoteModal, openRequirementModal, openTenderModal, openWhatsAppModal } = useApp();

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 py-2 px-3 flex items-center justify-between gap-1 shadow-2xl"
    >
      <button
        onClick={() => openQuoteModal()}
        className="flex-1 py-1.5 px-2 bg-blue-600 active:bg-blue-700 text-white rounded text-[11px] font-semibold tracking-tight text-center truncate flex items-center justify-center gap-1"
      >
        <FileText className="w-3 h-3 shrink-0" />
        <span className="truncate">Quote</span>
      </button>

      <button
        onClick={openRequirementModal}
        className="flex-1 py-1.5 px-2 bg-slate-800 active:bg-slate-700 border border-slate-700 text-slate-200 rounded text-[11px] font-semibold tracking-tight text-center truncate flex items-center justify-center gap-1"
      >
        <HelpCircle className="w-3 h-3 shrink-0" />
        <span className="truncate">Tell Us</span>
      </button>

      <button
        onClick={openTenderModal}
        className="flex-1 py-1.5 px-2 bg-emerald-950 active:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded text-[11px] font-semibold tracking-tight text-center truncate flex items-center justify-center gap-1"
      >
        <Upload className="w-3 h-3 shrink-0" />
        <span className="truncate">Tender</span>
      </button>

      <button
        onClick={() => openWhatsAppModal()}
        className="py-1.5 px-2.5 bg-emerald-600 active:bg-emerald-700 text-white rounded text-[11px] font-semibold tracking-tight text-center flex items-center justify-center shrink-0"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
