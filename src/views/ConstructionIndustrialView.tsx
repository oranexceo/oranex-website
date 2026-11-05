import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  CONSTRUCTION_CATEGORIES,
  CONSTRUCTION_PRODUCTS_DATA,
  ProductCategoryInfo
} from '../data/constructionProducts';
import { Product } from '../types';
import {
  ShieldCheck,
  Building2,
  HardHat,
  Globe2,
  Layers,
  Wrench,
  Factory,
  Truck,
  FlaskConical,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  Clock,
  Package,
  MapPin,
  Tag,
  PhoneCall,
  Send,
  HelpCircle,
  Award,
  Download
} from 'lucide-react';

export const ConstructionIndustrialView: React.FC = () => {
  const { subTab, navigate, openQuoteModal, submitLead } = useApp();

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (subTab && subTab !== 'overview' && subTab !== 'global-sourcing-oem' && subTab !== 'technical-services' && subTab !== 'quote') {
      return subTab;
    }
    return 'all';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeBrandFilter, setActiveBrandFilter] = useState('all');

  // Technical Support Form State
  const [techForm, setTechForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceType: 'Concrete Mix Design & Admixture Trial',
    targetConcreteGrade: 'C35/C45 Bridge Girder / High-Rise',
    projectLocation: 'Addis Ababa',
    description: ''
  });
  const [techSubmitted, setTechSubmitted] = useState(false);

  // Sync subTab changes
  React.useEffect(() => {
    if (subTab && subTab !== 'overview' && subTab !== 'global-sourcing-oem' && subTab !== 'technical-services' && subTab !== 'quote') {
      setSelectedCategory(subTab);
    }
  }, [subTab]);

  const filteredProducts = useMemo(() => {
    return CONSTRUCTION_PRODUCTS_DATA.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.productFamily.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand =
        activeBrandFilter === 'all' ||
        (activeBrandFilter === 'ochemi' && p.brand?.toLowerCase().includes('ochemi')) ||
        (activeBrandFilter === 'oem' && p.brandingOptions?.includes('OEM Original Manufacturer')) ||
        (activeBrandFilter === 'private-label' && p.brandingOptions?.includes('Private Label / Customer Brand'));

      return matchCat && matchSearch && matchBrand;
    });
  }, [selectedCategory, searchQuery, activeBrandFilter]);

  const handleTechSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: techForm.name,
      company: techForm.company,
      email: techForm.email,
      phone: techForm.phone,
      productOrCategory: `Technical Support: ${techForm.serviceType}`,
      estimatedQuantity: `Target Grade: ${techForm.targetConcreteGrade}`,
      deliveryLocation: techForm.projectLocation,
      notes: techForm.description,
      sourceOrigin: 'Technical Services Form',
      preferredLanguage: 'en'
    });
    setTechSubmitted(true);
    setTimeout(() => setTechSubmitted(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-20 px-4 sm:px-8 overflow-hidden border-b border-blue-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Oranex × Our Chinese partner International Alliance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Your Complete Construction & Industrial Supply Partner
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              From concrete admixtures and building materials to industrial machinery and specialized equipment, Oranex connects Ethiopian businesses with international sourcing capabilities, technical expertise, and project-focused supply solutions.
            </p>

            <div className="pt-2 text-xs sm:text-sm font-semibold tracking-wide text-blue-400">
              Local market expertise. International sourcing. Technical support. Flexible branding.
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate('construction-materials-sourcing')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition transform active:scale-95"
              >
                <Building2 className="w-4 h-4" />
                <span>Turnkey Materials Sourcing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition"
              >
                <span>Request a Quotation</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('product-catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                <span>Explore Categories</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Business Value Propositions */}
      <section className="py-14 px-4 sm:px-8 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-blue-500 transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. Global Sourcing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect directly with verified international manufacturers and qualified suppliers through strategic sourcing partner <strong>Our Chinese partner</strong>.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-blue-500 transition group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. Comprehensive Procurement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Source chemicals, cements, machinery, equipment, steel, and industrial spares through one structured, coordinated relationship.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-blue-500 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. Flexible Branding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose approved Oranex/OCHEMI branded products, original manufacturer OEM supply, or customer-specific private-label programs.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-blue-500 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4. Technical Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Access local laboratory trials, concrete mix designs, batching dispenser setup, and on-site troubleshooting across Ethiopia.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Direct Purchasing Model Explainer (Our Chinese partner & Oranex Roles) */}
      <section className="py-10 px-4 sm:px-8 bg-blue-50/50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-200 shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent International Procurement Framework</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  How the Oranex × Our Chinese partner Supply Model Works
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To ensure maximum cost efficiency and direct factory pricing, <strong>Oranex is not the middleman importer</strong> of every product. Ethiopian commercial buyers contract directly with <strong>Our Chinese partner</strong> for international supply, while Oranex provides local market coordination, account management, and technical guidance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      Role of Our Chinese partner (International Partner):
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>• Global manufacturer sourcing & factory audits</li>
                      <li>• Direct export quotations & proforma issuance</li>
                      <li>• Container consolidation & shipping logistics</li>
                      <li>• Mill certificates & export documentation</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-indigo-900 block mb-1">
                      Role of Oranex Trading (Local Partner):
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>• Local requirement scoping & customer liaison</li>
                      <li>• Technical product trials & concrete mix design</li>
                      <li>• Private-label branding coordination</li>
                      <li>• Dry port / site delivery milestone monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl shrink-0 space-y-3">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest block">
                  Commercial Incoterms
                </span>
                <h4 className="text-base font-bold">Supported Delivery Terms</h4>
                <div className="text-xs text-slate-300 space-y-2">
                  <div><strong>CIF Port of Djibouti</strong> (Free Zone transfer)</div>
                  <div><strong>DAP Modjo Dry Port</strong> (Bonded railway multimodal)</div>
                  <div><strong>FOB International Port</strong> (Customer vessel)</div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal()}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center"
                  >
                    Request Proforma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Catalog Section (Categories A through G) */}
      <section id="product-catalog-section" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <FlaskConical className="w-4 h-4" />
              <span>Structured B2B Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Construction & Industrial Product Portfolio
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Detailed specifications, standards compliance, minimum order quantities (MOQs), and branding models.
            </p>
          </div>

          <button
            onClick={() => openQuoteModal()}
            className="self-start md:self-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow"
          >
            Custom Sourcing Request
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Categories ({CONSTRUCTION_PRODUCTS_DATA.length})
          </button>

          {CONSTRUCTION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.shortName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                selectedCategory === cat.id ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.code}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU, chemical compound, equipment or standard..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Branding Filter:
            </span>
            <select
              value={activeBrandFilter}
              onChange={(e) => setActiveBrandFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">All Branding Formats</option>
              <option value="ochemi">OCHEMI Specialist Series</option>
              <option value="private-label">Private Label / Customer Brand Available</option>
              <option value="oem">Original Factory OEM Brand</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* Product Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {product.sku && (
                      <span className="text-[11px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {product.sku}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {product.productFamily}
                    </span>
                  </div>
                  {product.brand && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      {product.brand}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Specifications & Details */}
              <div className="p-6 space-y-4 flex-1 text-xs">
                {/* Specifications table */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div>
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block mb-2">
                      Technical Specifications
                    </span>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 font-mono text-[11px]">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="flex justify-between gap-2 border-b border-slate-100 pb-1 last:border-0 last:pb-0">
                          <span className="text-slate-500 font-sans">{key}:</span>
                          <span className="text-slate-900 font-semibold text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications list */}
                <div>
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block mb-2">
                    Key Applications
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications.map((app, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 text-[11px] px-2.5 py-1 rounded-lg border border-blue-100/60"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Commercial specs */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Packaging:</span>
                    <span className="font-medium text-slate-800">{product.packaging}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Minimum Order (MOQ):</span>
                    <span className="font-medium text-slate-800">{product.moq}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Origin:</span>
                    <span className="font-medium text-slate-800">{product.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lead Time:</span>
                    <span className="font-medium text-slate-800">{product.leadTime}</span>
                  </div>
                </div>

                {/* Branding options */}
                {product.brandingOptions && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-400 text-[11px] block mb-1">Branding Programs:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.brandingOptions.map((b, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Our Chinese partner Direct Supply</span>
                </span>
                <button
                  onClick={() => openQuoteModal(product)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Looking for a custom chemical formulation, specific machinery model, or rare civil engineering material?
            </p>
            <button
              onClick={() => openQuoteModal()}
              className="mt-4 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Submit Custom Procurement Requirement
            </button>
          </div>
        )}
      </section>

      {/* 5. Flexible Branding & OEM Program */}
      <section className="py-16 px-4 sm:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
              Brand Flexibility & Private Labeling
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Choose the Brand Structure That Fits Your Market
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Whether you are an established Ethiopian distributor wanting your own private brand or a contractor relying on Oranex-approved formulations, our supply chain accommodates flexible packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 space-y-4">
              <span className="px-2.5 py-1 rounded bg-blue-900/60 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                Option 01
              </span>
              <h3 className="text-xl font-bold text-white">Oranex & OCHEMI Brand</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-approved chemical formulations and specifications under the <strong>OCHEMI</strong> product family, backed by Oranex technical documentation, local testing, and warranty.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>• Fastest delivery & standard labeling</li>
                <li>• Proven laboratory mix designs for Ethiopia</li>
                <li>• Ready ASTM C494 / EN 934 certificates</li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-blue-900/40 to-slate-800/80 p-8 rounded-2xl border border-blue-500/50 shadow-lg space-y-4 relative">
              <div className="absolute top-4 right-4 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                POPULAR
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                Option 02
              </span>
              <h3 className="text-xl font-bold text-white">Customer Private Label (OEM)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct manufacturing under your company’s registered brand name, custom packaging graphics, multi-language instructions (English & Amharic), and brand exclusivity.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>• Custom packaging (drums, IBC, 25kg bags)</li>
                <li>• Protect your brand identity in the local market</li>
                <li>• Subject to factory MOQ agreements</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 space-y-4">
              <span className="px-2.5 py-1 rounded bg-slate-700 text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                Option 03
              </span>
              <h3 className="text-xl font-bold text-white">Original Factory Manufacturer Brand</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct international manufacturer brand for machinery, batching plants, and certified raw materials where global brand pedigree is required by tender consultants.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>• Full OEM factory warranties and manuals</li>
                <li>• Recognized internationally by consultants</li>
                <li>• Original mill test certificates (MTC)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technical Services & Request Form */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-4 h-4" />
              <span>Separately Scoped Technical Assistance</span>
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              On-Site Technical Services & Laboratory Trials
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Construction chemicals and modern batching plants require precision calibration. Oranex provides local field engineers in Addis Ababa to support trial mixes, dispenser setup, and site troubleshooting.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: 'Concrete Mix Design Trials', desc: 'Laboratory testing of PCE dosages against local Ethiopian cements (Dangote, Derba, Messebo, Mugher) for target slump and 28-day compressive strengths.' },
                { title: 'Plant Dosing System Calibration', desc: 'Assistance installing and calibrating automated liquid admixture flowmeters and dispensers on commercial batching plants.' },
                { title: 'Hot Weather Slump Retention Trials', desc: 'Tailored chemical combinations for extended transit times in congested urban corridors without flash setting.' },
                { title: 'Structural Mortar & Waterproofing Guidance', desc: 'On-site technical briefings for crystalline waterproofing application, repair mortar bonding, and joint sealing.' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Request Technical Support or Site Trial
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our technical engineering team will review your project parameters and schedule laboratory or site assistance.
            </p>

            {techSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-900">Request Logged Successfully</h4>
                <p className="text-xs text-slate-600 mt-1">
                  An Oranex technical advisor will contact you within 24 hours to schedule the requested trial or consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTechSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={techForm.name}
                      onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                      placeholder="e.g. Eng. Yohannes Tadesse"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Contractor *</label>
                    <input
                      type="text"
                      required
                      value={techForm.company}
                      onChange={(e) => setTechForm({ ...techForm, company: e.target.value })}
                      placeholder="e.g. Midroc Construction"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={techForm.email}
                      onChange={(e) => setTechForm({ ...techForm, email: e.target.value })}
                      placeholder="yohannes@company.com"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={techForm.phone}
                      onChange={(e) => setTechForm({ ...techForm, phone: e.target.value })}
                      placeholder="+251 91 234 5678"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Required</label>
                    <select
                      value={techForm.serviceType}
                      onChange={(e) => setTechForm({ ...techForm, serviceType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Concrete Mix Design & Admixture Trial">Concrete Mix Design & Admixture Trial</option>
                      <option value="Slump Retention & High-Strength Optimization">Slump Retention & High-Strength Optimization</option>
                      <option value="Batching Plant Dosing Calibration">Batching Plant Dosing Calibration</option>
                      <option value="Crystalline Waterproofing Specification">Crystalline Waterproofing Specification</option>
                      <option value="General Technical Consultation">General Technical Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Project Location</label>
                    <input
                      type="text"
                      value={techForm.projectLocation}
                      onChange={(e) => setTechForm({ ...techForm, projectLocation: e.target.value })}
                      placeholder="e.g. Addis Ababa / Modjo / Hawassa"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Specific Challenge or Mix Requirement
                  </label>
                  <textarea
                    rows={3}
                    value={techForm.description}
                    onChange={(e) => setTechForm({ ...techForm, description: e.target.value })}
                    placeholder="Specify target slump, cement type, aggregate sources, curing condition, or current challenges..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Technical Service Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
