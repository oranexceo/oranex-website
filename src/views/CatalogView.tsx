import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Package,
  ArrowRight,
  ShieldCheck,
  Tag,
  Calculator,
  DollarSign,
  Building2,
  Boxes,
  CheckCircle2
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { allProducts, openQuoteModal, navigate, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [allProducts]);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.productFamily.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allProducts, searchTerm, categoryFilter]);

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header and Hero Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
            {language === 'zh' ? '统一采购目录' : language === 'am' ? 'የተዋሃደ የምርት ማውጫ' : 'Unified Sourcing Directory'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            {language === 'zh'
              ? 'ORANEX 总采购产品与装备目录'
              : language === 'am'
              ? 'የኦራኔክስ የምርት እና የመሣሪያዎች ካታሎግ'
              : 'ORANEX Master Product & Equipment Catalogue'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
            {language === 'zh'
              ? '所有产品均享受原厂直供底价。支持单品打样、集装箱拼箱与埃塞俄比亚海关关税测算。'
              : language === 'am'
              ? 'የተረጋገጡ የኮንስትራክሽን ኬሚካሎች፣ ጥሬ ዕቃዎች፣ ከባድ ማሽነሪዎች እና የኢንዱስትሪ አቅርቦቶች በቀጥታ የፋብሪካ ዋጋ።'
              : 'Direct factory access across construction chemicals, raw materials, heavy machinery, batching plants, and hardware.'}
          </p>
        </div>

        {/* Quick Calculator Action Callout */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('landed-cost-calculator')}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition inline-flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-slate-950" />
            <span>
              {language === 'zh' ? '测算埃塞到岸价' : language === 'am' ? 'የመጨረሻ ዋጋ አስላ' : 'Landed Cost Calculator'}
            </span>
          </button>
          <button
            onClick={() => navigate('merkato-consolidation')}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition inline-flex items-center gap-2"
          >
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'zh' ? '麦卡托拼箱中心' : language === 'am' ? 'የመርካቶ ጭነት' : 'Merkato LCL Hub'}
            </span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === 'zh'
                ? '按产品名称、SKU 或规格搜索...'
                : language === 'am'
                ? 'በስም ወይም በዝርዝር ይፈልጉ...'
                : 'Search by product name, SKU, or specification...'
            }
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 shrink-0">
            {language === 'zh' ? '分类：' : language === 'am' ? 'ምድብ:' : 'Category:'}
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none w-full md:w-auto font-medium"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-blue-600 font-bold">{item.sku || 'CAT-SKU'}</span>
                <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                  {item.productFamily}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition">
                {item.name}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                {item.shortDescription}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>MOQ:</span>
                  <strong>{item.moq}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Origin:</span>
                  <strong>{item.origin}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <strong>{item.packaging}</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-bold">
                {item.brand || 'Our Chinese partner'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('landed-cost-calculator')}
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl transition inline-flex items-center gap-1"
                  title="Estimate Ethiopian customs duty and landed cost"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'zh' ? '到岸价' : language === 'am' ? 'የመጨረሻ ዋጋ' : 'Landed Cost'}</span>
                </button>

                <button
                  onClick={() => openQuoteModal(item)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  {language === 'zh' ? '询价 RFQ' : language === 'am' ? 'RFQ ጠይቅ' : 'Request RFQ'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
