import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, ShieldCheck, HelpCircle, Package, MapPin, Building, Phone, Mail, User, CheckCircle2 } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, quotePrefillProduct, submitLead, language } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productOrCategory: '',
    estimatedQuantity: '',
    deliveryLocation: 'Modjo Dry Port (Bonded Rail Transit)',
    brandingPreference: 'Recommend the best option' as 'Oranex / OCHEMI brand' | 'My company\'s brand / private label' | 'Original manufacturer\'s brand' | 'Recommend the best option',
    requestedBrandName: '',
    packagingRequirements: 'Standard Manufacturer Export Packaging',
    notes: '',
    incoterm: 'CIF Djibouti / DAP Modjo'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (quotePrefillProduct) {
      setFormData((prev) => ({
        ...prev,
        productOrCategory: `${quotePrefillProduct.name} (SKU: ${quotePrefillProduct.sku || 'N/A'})`,
        packagingRequirements: quotePrefillProduct.packaging || prev.packagingRequirements,
        notes: `Inquiry regarding ${quotePrefillProduct.name}. Target specification: ASTM/EN compliance standard.`
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productOrCategory: prev.productOrCategory || 'Construction Chemicals / Machinery'
      }));
    }
    setIsSubmitted(false);
  }, [quotePrefillProduct, isQuoteModalOpen]);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      productOrCategory: formData.productOrCategory,
      estimatedQuantity: formData.estimatedQuantity || 'As per project specification',
      deliveryLocation: formData.deliveryLocation,
      brandingPreference: formData.brandingPreference,
      requestedBrandName: formData.requestedBrandName,
      packagingRequirements: formData.packagingRequirements,
      notes: `${formData.notes} | Incoterm: ${formData.incoterm}`,
      sourceOrigin: quotePrefillProduct ? `Product: ${quotePrefillProduct.name}` : 'Construction & Industrial Portal RFQ',
      preferredLanguage: language
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeQuoteModal();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeQuoteModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ORANEX × Our Chinese partner Procurement Gateway</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Request an International Quotation (RFQ)
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Direct international pricing from Our Chinese partner with local technical support and project coordination by Oranex Trading.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">RFQ Submitted Successfully!</h3>
            <p className="text-sm text-slate-600 max-w-md">
              Your inquiry has been logged. Our international procurement team at Our Chinese partner and local technical advisors at Oranex Trading will prepare a formal Proforma / Quotation within 24–48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Commercial notice */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Procurement Model:</strong> Ethiopian buyers contract directly with international supply partner <strong>Our Chinese partner</strong> for offshore manufacturing and export supply, while <strong>Oranex Trading One Member PLC</strong> facilitates local technical qualification, sampling, and account coordination.
              </span>
            </div>

            {/* Product & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Product / Requirement <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.productOrCategory}
                    onChange={(e) => setFormData({ ...formData, productOrCategory: e.target.value })}
                    placeholder="e.g. OCHEMI PCE 50%, Batching Plant, Rebar"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Estimated Quantity / Volume <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.estimatedQuantity}
                  onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                  placeholder="e.g. 20 Metric Tons / 1 Unit"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Branding Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Branding & Packaging Preference <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Oranex / OCHEMI brand', label: 'Oranex / OCHEMI Brand', desc: 'Approved standard formulation with technical backing' },
                  { id: 'My company\'s brand / private label', label: 'Customer Private Label (OEM)', desc: 'Custom packaging and your company branding' },
                  { id: 'Original manufacturer\'s brand', label: 'Original Factory Brand', desc: 'Direct international manufacturer label' },
                  { id: 'Recommend the best option', label: 'Recommend Best Option', desc: 'Advise based on lead time & pricing economics' }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex flex-col p-3 rounded-xl border cursor-pointer transition ${
                      formData.brandingPreference === opt.id
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="brandingPreference"
                        value={opt.id}
                        checked={formData.brandingPreference === opt.id}
                        onChange={() => setFormData({ ...formData, brandingPreference: opt.id as any })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-semibold text-slate-900">{opt.label}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 pl-5">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.brandingPreference === "My company's brand / private label" && (
              <div className="animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Requested Brand / Trademark Name
                </label>
                <input
                  type="text"
                  value={formData.requestedBrandName}
                  onChange={(e) => setFormData({ ...formData, requestedBrandName: e.target.value })}
                  placeholder="Enter your registered trade name or private label specification"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            )}

            {/* Delivery Terms & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Delivery Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <select
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Modjo Dry Port (Bonded Rail Transit)">Modjo Dry Port (Bonded Rail Transit)</option>
                    <option value="Port of Djibouti (CIF Djibouti)">Port of Djibouti (CIF Djibouti Free Zone)</option>
                    <option value="Kality / Addis Ababa Inland Terminal">Kality / Addis Ababa Inland Terminal</option>
                    <option value="Dire Dawa Dry Port">Dire Dawa Dry Port</option>
                    <option value="Project Site Direct Delivery (Turnkey)">Project Site Direct Delivery (Turnkey)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Packaging Requirements
                </label>
                <input
                  type="text"
                  value={formData.packagingRequirements}
                  onChange={(e) => setFormData({ ...formData, packagingRequirements: e.target.value })}
                  placeholder="e.g. 1000L IBC Tanks, 25kg Valve Bags, Bulk"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eng. Dawit Alemu"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company / Organization <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Ethiopian Construction Works Corp"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Corporate Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dawit@company.et"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 91 123 4567"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Project Notes & Specifics */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Project Scope, Technical Standards & Specifications
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Include required standards (ASTM, EN, DIN), solid content percentage, target slump retention, concrete grade, target delivery date..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={closeQuoteModal}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                Submit RFQ to Our Chinese partner & Oranex
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
