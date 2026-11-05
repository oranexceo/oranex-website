import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { OranexLogo } from '../OranexLogo';
import {
  Search,
  X,
  Package,
  Layers,
  ArrowRight,
  Calculator,
  Boxes,
  Building2,
  FileText,
  FileCheck,
  Send,
  Sparkles
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    closeSearchModal,
    products,
    solutions,
    navigate,
    openQuoteModal,
    language
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Core Tools and Navigation Shortcuts
  const quickTools = [
    {
      title: language === 'zh' ? '埃塞俄比亚进口到岸总成本与关税计算器' : language === 'am' ? 'የኢትዮጵያ ጉምሩክ እና የመጨረሻ ዋጋ ማስያ' : language === 'ar' ? 'حاسبة التكلفة الإجمالية والجمارك الإثيوبية' : 'Ethiopian Import Landed Cost & Customs Calculator',
      desc: language === 'zh' ? '测算CIF、海关关税(0-35%)、增值税15%、附加税10%、吉布提与莫乔干港陆运' : language === 'am' ? 'የCIF፣ የጉምሩክ ቀረጥ፣ የተጨማሪ እሴት ታክስ እና የሞጆ ወደብ ወጪዎች' : language === 'ar' ? 'حساب الرسوم الجمركية والضرائب ومصاريف ميناء مودجو' : 'Live CIF Djibouti, Customs duty (0-35%), VAT (15%), Sur-tax (10%) & Modjo Dry Port',
      icon: Calculator,
      badge: 'Calculator',
      action: () => {
        closeSearchModal();
        navigate('landed-cost-calculator');
      },
      keywords: ['calculator', 'landed cost', 'customs', 'duty', 'tax', 'vat', 'sur-tax', 'modjo', 'djibouti', 'cif', 'cbe', 'tariff', 'ቀረጥ', 'ማስያ', '关税', '计算器']
    },
    {
      title: language === 'zh' ? '麦卡托批发与拼箱直采 (LCL Groupage)' : language === 'am' ? 'የመርካቶ ጅምላ እና የጋራ ኮንቴነር (LCL)' : language === 'ar' ? 'تجميع وتوريد بضائع تجار ميركاتو (LCL)' : 'Merkato Wholesale & Container Consolidation (LCL)',
      desc: language === 'zh' ? '义乌/广州集运，2 CBM起拼，银行外汇合规形式发票，货物CBM计算器' : language === 'am' ? 'የጋራ ኮንቴነር ከ2 CBM ጀምሮ፣ ይዉ እና ጓንግዙ መጋዘኖች፣ የባንክ ፕሮፎርማ' : language === 'ar' ? 'تجميع حاويات مشتركة من 2 CBM، فواتير بنكية معتمدة، ومستودعات إيوو' : 'Shared containers from 2 CBM, Yiwu & Guangzhou warehouse, bank proformas for CBE/Awash',
      icon: Boxes,
      badge: 'Wholesale LCL',
      action: () => {
        closeSearchModal();
        navigate('merkato-consolidation');
      },
      keywords: ['merkato', 'wholesale', 'lcl', 'consolidation', 'yiwu', 'guangzhou', 'cbm', 'groupage', 'proforma', 'cbe', 'tera', 'መርካቶ', 'ጅምላ', 'ኮንቴነር', '拼箱', '麦卡托']
    },
    {
      title: language === 'zh' ? '一站式工程建材与交钥匙集采' : language === 'am' ? 'ተርንኪ የግንባታ ዕቃዎች አቅርቦት' : language === 'ar' ? 'توريد مواد البناء والحلول المتكاملة' : 'Construction Materials & Turnkey Sourcing',
      desc: language === 'zh' ? '沥青路面、混凝土外加剂、建筑精装、重型机械与建材生产线' : language === 'am' ? 'የመንገድ ሥራ፣ የኮንክሪት ኬሚካሎች፣ የግንባታ ማጠናቀቂያ እና ማሽነሪዎች' : language === 'ar' ? 'مواد الطرق والخرسانة والتشطيبات ومعدات المصانع' : 'Road materials, concrete solutions, structural finishing & manufacturing plants',
      icon: Building2,
      badge: 'Turnkey BOQ',
      action: () => {
        closeSearchModal();
        navigate('construction-materials-sourcing');
      },
      keywords: ['turnkey', 'boq', 'construction', 'sourcing', 'materials', 'asphalt', 'bitumen', 'concrete', 'finishing', 'machinery', 'ተርንኪ', 'ግንባታ', 'አቅርቦት', '建材', '交钥匙']
    },
    {
      title: language === 'zh' ? '提交工程量清单 (BOQ) / 索取官方报价' : language === 'am' ? 'የBOQ ዝርዝር ያስገቡ / ዋጋ ይጠይቁ' : language === 'ar' ? 'تقديم جدول الكميات BOQ / طلب عرض أسعار' : 'Submit BOQ / Request Official Quotation',
      desc: language === 'zh' ? '上传项目清单、图纸或采购规格书，ORANEX 团队直接对接原厂' : language === 'am' ? 'የፕሮጀክትዎን የBOQ ሰነድ ያስገቡ፣ ፈጣን የፋብሪካ ዋጋ እንመልሳለን' : language === 'ar' ? 'ارفع جدول الكميات أو المواصفات للمراجعة الفورية' : 'Upload drawings, specifications or BOQs for factory-direct evaluation',
      icon: Send,
      badge: 'RFQ & BOQ',
      action: () => {
        closeSearchModal();
        openQuoteModal({ name: 'Turnkey Project BOQ Inquiry' });
      },
      keywords: ['boq', 'quote', 'rfq', 'inquiry', 'pricing', 'quotation', 'upload', 'ዋጋ', 'ሰነድ', '报价', '询价']
    },
    {
      title: language === 'zh' ? '下载 2026 年建材总采购目录 (PDF)' : language === 'am' ? 'የ2026 የግንባታ ካታሎግ ያውርዱ (PDF)' : language === 'ar' ? 'تحميل كتالوج 2026 لمواد البناء (PDF)' : 'Download 2026 Construction Sourcing Catalogue (PDF)',
      desc: language === 'zh' ? '完整收录五大工程类目、技术参数与联系方式' : language === 'am' ? 'ሙሉ የምርት ማውጫ እና የቴክኒክ መግለጫ' : language === 'ar' ? 'الكتالوج الرسمي الشامل لجميع المواد والمواصفات' : 'Full 5-category procurement catalogue with technical specs and direct contacts',
      icon: FileText,
      badge: 'PDF',
      action: () => {
        closeSearchModal();
        const link = document.createElement('a');
        link.href = '/Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf';
        link.download = 'Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      keywords: ['catalogue', 'pdf', 'download', '2026', 'brochure', 'specs', 'ካታሎግ', 'ያውርዱ', '下载', '目录']
    }
  ];

  const matchedTools = cleanQuery
    ? quickTools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(cleanQuery) ||
          tool.desc.toLowerCase().includes(cleanQuery) ||
          tool.keywords.some((k) => k.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchedProducts = cleanQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.productFamily.toLowerCase().includes(cleanQuery) ||
          p.shortDescription.toLowerCase().includes(cleanQuery) ||
          (p.sku && p.sku.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchedSolutions = cleanQuery
    ? solutions.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          (s.shortDescription || s.description || '').toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults =
    matchedTools.length > 0 ||
    matchedProducts.length > 0 ||
    matchedSolutions.length > 0;

  const handleProductSelect = (product: any) => {
    closeSearchModal();
    // Pre-fill quote modal or navigate to catalog
    navigate('catalog');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50">
          <OranexLogo size={28} showText={false} />
          <Search className="w-5 h-5 text-blue-600 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'zh'
                ? '搜索建材、化学品、沥青、机械、关税计算器、拼箱...'
                : language === 'am'
                ? 'ኬሚካሎችን፣ ቢቱመን፣ ማሽነሪዎችን፣ የመጨረሻ ዋጋ ማስያ ወይም መርካቶ ጅምላ ፈልግ...'
                : language === 'ar'
                ? 'ابحث عن المواد والكيماويات والآلات وحاسبة الجمارك...'
                : 'Search bitumen, PCE admixtures, tiles, machinery, landed cost, Merkato LCL...'
            }
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition"
              title="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="text-xs text-slate-500 hover:text-slate-800 font-mono px-2 py-1 border border-slate-200 rounded-lg hover:bg-slate-100 transition shadow-sm"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {!query && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {language === 'zh'
                      ? '快速直达工具与采购枢纽'
                      : language === 'am'
                      ? 'ፈጣን መዳረሻ እና የግዥ መድረኮች'
                      : language === 'ar'
                      ? 'الأدوات السريعة ومنصات التوريد'
                      : 'Quick Access & Sourcing Hubs'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickTools.slice(0, 4).map((tool, idx) => (
                    <button
                      key={idx}
                      onClick={tool.action}
                      className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 text-left transition group shadow-sm flex items-start gap-3"
                    >
                      <tool.icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate">
                            {tool.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{tool.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {language === 'zh' ? '热门搜索词' : language === 'am' ? 'ተወዳጅ ፍለጋዎች' : language === 'ar' ? 'عمليات البحث الشائعة' : 'Popular Search Keywords'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Paving Bitumen 60/70',
                    'PCE Superplasticizer 50%',
                    'Landed Cost Calculator',
                    'Merkato Shared Container (LCL)',
                    'Dry-mix Mortar Line',
                    'Ceramic Tiles & Sanitary',
                    'Submersible Pumps',
                    'Excavator 22-Ton',
                    'Turnkey BOQ Submission'
                  ].map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-xs font-medium transition border border-slate-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {language === 'zh' ? `未找到与 “${query}” 直接匹配的结果` : `No direct results found for "${query}"`}
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === 'zh'
                  ? 'ORANEX 提供全品类工程物资寻源服务。您可以直接提交工程量清单(BOQ)或与我们的采购总监联系。'
                  : 'ORANEX provides custom sourcing across all industrial and construction categories. You can submit your BOQ or contact our procurement desk directly.'}
              </p>
              <button
                onClick={() => {
                  closeSearchModal();
                  openQuoteModal({ name: `Inquiry: ${query}` });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '提交该需求咨询' : 'Submit Custom Inquiry'}</span>
              </button>
            </div>
          )}

          {/* Matched Tools */}
          {matchedTools.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {language === 'zh' ? '直达工具与服务' : 'Calculators & Procurement Hubs'} ({matchedTools.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedTools.map((tool, idx) => (
                  <button
                    key={idx}
                    onClick={tool.action}
                    className="w-full text-left p-3 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/80 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-800 flex items-center gap-2">
                          <span>{tool.title}</span>
                          <span className="text-[10px] font-mono bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded font-semibold">
                            {tool.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">{tool.desc}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {language === 'zh' ? '匹配建材与工业品' : 'Materials & Equipment'} ({matchedProducts.length})
                </span>
              </div>
              <div className="space-y-1">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition flex items-center justify-between gap-3 group"
                  >
                    <div
                      className="cursor-pointer flex-1"
                      onClick={() => handleProductSelect(prod)}
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-2">
                        <span>{prod.name}</span>
                        {prod.sku && (
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            {prod.sku}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {prod.category} • {prod.productFamily}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          closeSearchModal();
                          navigate('landed-cost-calculator');
                        }}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 transition"
                        title="Calculate Landed Cost"
                      >
                        {language === 'zh' ? '测关税' : 'Landed Cost'}
                      </button>
                      <button
                        onClick={() => {
                          closeSearchModal();
                          openQuoteModal(prod);
                        }}
                        className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-[10px] font-bold text-white transition shadow-sm"
                      >
                        {language === 'zh' ? '询底价' : 'Quote'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Solutions */}
          {matchedSolutions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-900" />
                <span>
                  {language === 'zh' ? '业务模式与解决方案' : 'Solutions & Models'} ({matchedSolutions.length})
                </span>
              </div>
              <div className="space-y-1">
                {matchedSolutions.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => {
                      closeSearchModal();
                      navigate('solutions', sol.id);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                        {sol.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {sol.shortDescription || sol.description}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-[10px]">ESC</kbd> to close</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">WhatsApp: <strong className="text-slate-800">+251 912 233 688</strong></span>
          </div>
          <button
            onClick={() => {
              closeSearchModal();
              navigate('catalog');
            }}
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            {language === 'zh' ? '浏览全部产品目录 →' : 'View Master Catalogue →'}
          </button>
        </div>
      </div>
    </div>
  );
};
