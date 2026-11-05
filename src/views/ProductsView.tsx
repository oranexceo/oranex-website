import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, SupplyModelTag, ProductStatus } from '../types';
import { Search, Filter, FileText, ArrowRight, Check, ShieldCheck, Download, AlertCircle, Eye, X } from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { products, openQuoteModal, openWhatsAppModal, openRequirementModal } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSupplyTag, setSelectedSupplyTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalProduct, setDetailModalProduct] = useState<Product | null>(null);

  const categories = [
    'All',
    'Industrial Raw Materials',
    'Industrial Chemicals',
    'Machinery & Equipment',
    'Spare Parts & Components',
    'Laboratory & Scientific',
    'Construction Materials',
    'Energy & Electrical',
    'Water & Environmental',
    'Packaging',
    'FMCG'
  ];

  const supplyTags: (SupplyModelTag | 'All')[] = [
    'All',
    'Direct Manufacturer',
    'OEM Available',
    'Oranex OEM',
    'Private Label',
    'Consolidated Import',
    'Project Supply',
    'Source on Request'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchTag =
        selectedSupplyTag === 'All' ||
        p.supplyModelTags.includes(selectedSupplyTag as SupplyModelTag);
      const matchQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.productFamily.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchTag && matchQuery;
    });
  }, [products, selectedCategory, selectedSupplyTag, searchQuery]);

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span>Home</span>
              <span aria-hidden="true">/</span>
              <span className="text-slate-900 font-semibold">Products &amp; Industrial Inputs</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Industrial Product &amp; Material Directory
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Source verified raw materials, specialty chemicals, machinery lines, and precision components directly from international OEMs and manufacturers.
            </p>
          </div>

          <button
            onClick={openRequirementModal}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors whitespace-nowrap shadow-sm self-start md:self-auto cursor-pointer"
          >
            Don't See Your Item? Source on Demand
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, chemical grade, application, or family..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Supply Model Dropdown */}
            <div className="w-full md:w-64">
              <select
                value={selectedSupplyTag}
                onChange={(e) => setSelectedSupplyTag(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none bg-white text-slate-700"
              >
                {supplyTags.map((tag, idx) => (
                  <option key={idx} value={tag}>
                    Supply Model: {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs (Interactive Filter Buttons per Rule A) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Criteria */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <div>
            Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> verified product specifications
          </div>
          {(selectedCategory !== 'All' || selectedSupplyTag !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSupplyTag('All');
                setSearchQuery('');
              }}
              className="text-blue-900 font-medium hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-xl mx-auto space-y-4">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-display font-bold text-base text-slate-900">
              No Catalogued Items Match This Filter
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We position our capabilities around the customer's requirement rather than a static catalogue. Tell us what you need and our sourcing desk will search global manufacturer networks.
            </p>
            <button
              onClick={openRequirementModal}
              className="px-5 py-2.5 bg-blue-900 text-white text-xs font-semibold rounded hover:bg-blue-800 transition-colors"
            >
              Request Custom Sourcing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Product Image slot with fallback container */}
                <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <FileText className="w-10 h-10" />
                    </div>
                  )}

                  {/* Clean unboxed metadata overlay */}
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {product.status}
                  </div>
                </div>

                {/* Product Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line (No static pills) */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <span className="font-semibold text-blue-900">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{product.productFamily}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-950 transition-colors leading-snug mb-2">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>

                    {/* Supply Model Tags (Quiet unboxed indicators) */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[10px] text-slate-600">
                      {product.supplyModelTags.map((tag, tIdx) => (
                        <span key={tIdx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quick Specs Snapshot */}
                    <div className="space-y-1 py-2.5 border-t border-slate-100 text-xs">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, val], sIdx) => (
                        <div key={sIdx} className="flex justify-between text-[11px]">
                          <span className="text-slate-500">{key}:</span>
                          <span className="font-semibold text-slate-800 text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Buttons */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDetailModalProduct(product)}
                        className="w-full py-2 px-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Specs</span>
                      </button>

                      <button
                        onClick={() => openQuoteModal({ productOrScope: product.name, unit: product.packaging })}
                        className="w-full py-2 px-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Request Quote</span>
                      </button>
                    </div>

                    <button
                      onClick={() => openWhatsAppModal(`Hello Oranex, I am interested in sourcing ${product.name}.`)}
                      className="w-full text-center text-[11px] font-medium text-slate-500 hover:text-emerald-700 transition-colors py-1 cursor-pointer"
                    >
                      Ask About This Product via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Product Specification Modal */}
        {detailModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{detailModalProduct.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{detailModalProduct.productFamily}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 mt-0.5">
                    {detailModalProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setDetailModalProduct(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Product Description
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {detailModalProduct.shortDescription}
                  </p>
                </div>

                {/* Technical Specifications Table */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Verified Technical Specifications
                  </h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                        <tr>
                          <th className="py-2.5 px-3">Parameter / Property</th>
                          <th className="py-2.5 px-3">Specification / Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {Object.entries(detailModalProduct.specifications).map(([key, val], idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 text-slate-600 font-medium">{key}</td>
                            <td className="py-2 px-3 text-slate-900 font-mono tabular-nums">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 italic">
                    Additional technical parameters, custom purity grades, and TDS available upon request.
                  </div>
                </div>

                {/* Packaging & Origin Logistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Packaging Standard:</span>
                    <span className="font-semibold text-slate-800">{detailModalProduct.packaging}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Manufacturer &amp; Origin:</span>
                    <span className="font-semibold text-slate-800">{detailModalProduct.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Minimum Order Quantity (MOQ):</span>
                    <span className="font-semibold text-slate-800">{detailModalProduct.moq || 'Available on inquiry'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Estimated Lead Time to Port:</span>
                    <span className="font-semibold text-slate-800">{detailModalProduct.leadTime || 'Vessel dependent'}</span>
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Industrial Applications
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {detailModalProduct.applications.map((app, aIdx) => (
                      <div key={aIdx} className="p-2 bg-slate-100 text-slate-800 rounded font-medium">
                        {app}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Documentation */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Technical Documentation (TDS / COA / SDS)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {detailModalProduct.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-700" />
                          <div>
                            <div className="font-semibold text-slate-800">{doc.type}</div>
                            <div className="text-[10px] text-slate-400">{doc.size}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => openQuoteModal({ productOrScope: `${detailModalProduct.name} - ${doc.type} Document Request` })}
                          className="text-xs text-blue-900 font-semibold hover:underline"
                        >
                          Request
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Action Footer */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Compliant with international and Ethiopian regulatory standards.
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        const name = detailModalProduct.name;
                        setDetailModalProduct(null);
                        openQuoteModal({ productOrScope: name });
                      }}
                      className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors"
                    >
                      Request a Quote
                    </button>
                    <button
                      onClick={() => {
                        const name = detailModalProduct.name;
                        setDetailModalProduct(null);
                        openWhatsAppModal(`Hello Oranex, I would like to discuss sourcing ${name}.`);
                      }}
                      className="px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded transition-colors"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
