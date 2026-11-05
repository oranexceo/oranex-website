import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Upload, CheckCircle2, ShieldCheck, FileText, AlertCircle, X } from 'lucide-react';

export const SupplierPartnerView: React.FC = () => {
  const { submitLead } = useApp();

  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    website: '',
    productCategories: '',
    manufacturingCapability: '',
    exportMarkets: '',
    certifications: '',
    moq: '',
    leadTime: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: ''
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.country || !formData.contactPerson || !formData.email) {
      setErrorMsg('Please complete all required fields (*).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await submitLead({
        type: 'SUPPLIER_PARTNERSHIP',
        name: formData.contactPerson,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        productOrScope: `Supplier Partnership: ${formData.productCategories || 'Manufacturing'}`,
        specificationDetails: `Website: ${formData.website} | Capabilities: ${formData.manufacturingCapability} | Export Markets: ${formData.exportMarkets} | Certifications: ${formData.certifications} | MOQ: ${formData.moq} | Lead Time: ${formData.leadTime} | Message: ${formData.message}`,
        attachedFileNames: attachedFiles.map((f) => f.name),
        sourceOrigin: 'Supplier Partnership Portal'
      });
      setIsSuccess(true);
    } catch {
      setErrorMsg('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-900 mb-2">
            <Globe className="w-4 h-4" />
            <span>International Manufacturer Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Are You a Manufacturer or Supplier?
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            «Oranex works with manufacturers, OEMs and suppliers interested in accessing business opportunities in Ethiopia.»
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-white border border-emerald-500/40 rounded-xl p-8 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Partnership Application Submitted
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thank you for introducing <span className="font-semibold text-slate-900">{formData.companyName}</span>. Our procurement and technical evaluation team will review your catalogue, capacity parameters, and export certifications against active commercial demand in Ethiopia.
            </p>
            <div className="text-[11px] text-slate-400 italic">
              Notice: Partnership approval is subject to rigorous supplier qualification, technical audit verification, and commercial feasibility.
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  companyName: '',
                  country: '',
                  website: '',
                  productCategories: '',
                  manufacturingCapability: '',
                  exportMarkets: '',
                  certifications: '',
                  moq: '',
                  leadTime: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  message: ''
                });
                setAttachedFiles([]);
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              Submit Another Profile
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-950 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <span>
                Oranex acts as your authorized in-country distribution and tender execution partner in Ethiopia, managing import customs, warehousing, and client relationship delivery.
              </span>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Company Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Apex Industrial Technologies"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Country of Origin / Plant *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. Germany / China / UAE"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Corporate Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Products & Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Categories / Specialization
                </label>
                <input
                  type="text"
                  value={formData.productCategories}
                  onChange={(e) => setFormData({ ...formData, productCategories: e.target.value })}
                  placeholder="e.g. Polymers, Concrete Admixtures, Slurry Pumps, Lab Instruments"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Manufacturing Facility Capacity
                </label>
                <input
                  type="text"
                  value={formData.manufacturingCapability}
                  onChange={(e) => setFormData({ ...formData, manufacturingCapability: e.target.value })}
                  placeholder="e.g. 50,000 MT/year output across 3 production lines"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* International Footprint */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Export Markets
                </label>
                <input
                  type="text"
                  value={formData.exportMarkets}
                  onChange={(e) => setFormData({ ...formData, exportMarkets: e.target.value })}
                  placeholder="e.g. Middle East, Africa, Europe"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certifications (ISO/CE/ASTM)
                </label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="ISO 9001, CE Mark, REACH"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Standard MOQ
                </label>
                <input
                  type="text"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  placeholder="e.g. 1 x 20ft FCL"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ex-Works Lead Time
                </label>
                <input
                  type="text"
                  value={formData.leadTime}
                  onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                  placeholder="e.g. 20-30 days"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Person Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Full Name & Title"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="export@company.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+49 / +86 / +971..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Partnership Proposal &amp; Technical Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your interest in Ethiopian industrial distribution, OEM representation, or tender bidding participation..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Corporate Catalogue, TDS, or Certificates (Optional)
              </label>
              <div className="border border-dashed border-slate-300 rounded p-4 text-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 pointer-events-none">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span>Attach PDF catalogue, product TDS, or ISO certifications</span>
                </div>
              </div>

              {attachedFiles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-900 text-xs rounded border border-blue-200"
                    >
                      <FileText className="w-3 h-3 text-blue-600" />
                      <span className="truncate max-w-[140px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-blue-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Partnership submissions are reviewed under commercial non-disclosure.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {isSubmitting ? 'Transmitting...' : 'Submit Partnership Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
