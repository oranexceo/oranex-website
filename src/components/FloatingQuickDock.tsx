import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  Phone,
  FileText,
  Boxes,
  Building2,
  Search,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export const FloatingQuickDock: React.FC = () => {
  const { navigate, openQuoteModal, openSearchModal, language } = useApp();
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto transition-all duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-2xl p-1.5 flex items-center justify-between sm:justify-start gap-1 sm:gap-2 text-white">
        {/* Toggle Minimize Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition shrink-0"
          title={isMinimized ? 'Expand quick tools' : 'Minimize quick tools'}
        >
          {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {!isMinimized && (
          <>
            {/* Quick Search */}
            <button
              onClick={() => openSearchModal()}
              className="px-2.5 py-1.5 rounded-xl hover:bg-slate-800 transition text-left flex items-center gap-1.5 shrink-0 text-slate-300 hover:text-white"
              title="Search Products, Tools & Calculators (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="hidden lg:inline text-xs font-semibold">
                {language === 'zh' ? '搜索' : language === 'am' ? 'ፈልግ' : 'Search'}
              </span>
            </button>
            {/* 1. Turnkey Sourcing */}
            <button
              onClick={() => navigate('construction-materials-sourcing')}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-slate-800 transition text-left flex items-center gap-1.5 shrink-0"
            >
              <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="hidden md:inline text-xs font-semibold">
                {language === 'zh' ? '一站式建材' : language === 'am' ? 'ተርንኪ አቅርቦት' : language === 'ar' ? 'توريد مواد' : 'Turnkey Sourcing'}
              </span>
            </button>

            {/* 2. Merkato Consolidation */}
            <button
              onClick={() => navigate('merkato-consolidation')}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-slate-800 transition text-left flex items-center gap-1.5 shrink-0"
            >
              <Boxes className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden md:inline text-xs font-semibold">
                {language === 'zh' ? '麦卡托拼箱' : language === 'am' ? 'የመርካቶ ጭነት' : language === 'ar' ? 'تجميع ميركاتو' : 'Merkato LCL'}
              </span>
            </button>

            {/* 3. Landed Cost Calculator */}
            <button
              onClick={() => navigate('landed-cost-calculator')}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition text-left flex items-center gap-1.5 shrink-0 font-bold"
            >
              <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs">
                {language === 'zh' ? '到岸成本' : language === 'am' ? 'የመጨረሻ ዋጋ' : language === 'ar' ? 'حاسبة التكلفة' : 'Landed Cost'}
              </span>
            </button>

            {/* 4. Request RFQ */}
            <button
              onClick={() => openQuoteModal()}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition text-left flex items-center gap-1.5 shrink-0 font-bold shadow-md"
            >
              <FileText className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs">
                {language === 'zh' ? '索取报价' : language === 'am' ? 'ዋጋ ጠይቅ' : language === 'ar' ? 'طلب عرض' : 'Request RFQ'}
              </span>
            </button>

            {/* 5. Direct WhatsApp Desk */}
            <a
              href="https://wa.me/251912233688?text=Hello%20Eng.%20Petros,%20I%20am%20inquiring%20about%20ORANEX%20procurement%20services"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shrink-0 font-bold shadow-md"
              title="Chat directly on WhatsApp with Eng. Petros Abebe Mengesha (+251 912 233 688)"
            >
              <Phone className="w-4 h-4 text-white shrink-0" />
              <span className="hidden sm:inline text-xs">WhatsApp</span>
            </a>
          </>
        )}

        {isMinimized && (
          <div className="flex items-center gap-3 px-2 py-1 text-xs text-slate-300">
            <span className="font-semibold text-blue-400">ORANEX Quick Tools</span>
            <button
              onClick={() => navigate('landed-cost-calculator')}
              className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-[11px] font-bold"
            >
              Calculator
            </button>
            <a
              href="https://wa.me/251912233688"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px]"
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
