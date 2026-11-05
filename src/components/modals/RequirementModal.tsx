import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OranexLogo } from '../OranexLogo';
import { X, Upload, CheckCircle2, FileText, AlertCircle, Globe } from 'lucide-react';
import { LANGUAGES, getSuggestedLanguagesForCountry } from '../../i18n/languages';

export const RequirementModal: React.FC = () => {
  const { isRequirementModalOpen, closeRequirementModal, submitLead, language } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Ethiopia',
    preferredLanguage: 'en',
    productOrScope: '',
    specificationDetails: '',
    quantity: '',
    unit: '',
    deliveryLocation: 'Modjo Dry Port / Addis Ababa',
    notes: ''
  });

  useEffect(() => {
    if (language) {
      setFormData((prev) => ({ ...prev, preferredLanguage: language }));
    }
  }, [language]);

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isRequirementModalOpen) return null;

  const suggestedLangs = getSuggestedLanguagesForCountry(formData.country);

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
    if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.productOrScope) {
      setErrorMsg('Please complete all required fields (*).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await submitLead({
        type: 'PRODUCT_REQUEST',
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        preferredLanguage: formData.preferredLanguage,
        productOrScope: formData.productOrScope,
        quantity: formData.quantity,
        unit: formData.unit,
        specificationDetails: `Market: ${formData.country} | Lang: ${formData.preferredLanguage} | Specs: ${formData.specificationDetails}`,
        deliveryLocation: `${formData.deliveryLocation} (${formData.country})`,
        notes: formData.notes,
        attachedFileNames: attachedFiles.map((f) => f.name),
        sourceOrigin: 'Direct Requirement Modal'
      });
      setIsSuccess(true);
    } catch {
      setErrorMsg('Submission could not be completed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <OranexLogo size={32} showText={false} />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-900 block">
                Tell Us What You Need
              </span>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Submit Your Product or Material Specification
              </h3>
            </div>
          </div>
          <button
            onClick={closeRequirementModal}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Requirement Received
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you. Your requirement has been received. Our team will review the information and determine the appropriate sourcing or procurement pathway.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                closeRequirementModal();
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Entity *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Awash Agro Processing"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.et"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+251 9X XXX XXXX"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Market / Destination *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none bg-white"
                >
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Somalia">Somalia</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Other African Market">Other African Market</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-700" />
                  <span>Preferred Language *</span>
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none bg-white font-medium"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product, Spare Part, or Equipment Needed *
              </label>
              <input
                type="text"
                required
                value={formData.productOrScope}
                onChange={(e) => setFormData({ ...formData, productOrScope: e.target.value })}
                placeholder="Describe what you need — OEM part number, chemical grade, or machinery"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity &amp; Unit
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 10 Drums / 500 kg"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  placeholder="Modjo / Addis Ababa"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specification Details / Part Numbers / Current Brand
              </label>
              <textarea
                rows={2}
                value={formData.specificationDetails}
                onChange={(e) => setFormData({ ...formData, specificationDetails: e.target.value })}
                placeholder="Give us any information you have: dimensions, drawings, material grade, or machine serial number..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Document upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attach Drawing, Photo, or Datasheet (Optional)
              </label>
              <div className="border border-dashed border-slate-300 rounded p-3 text-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 pointer-events-none">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span>Choose file or drag photo here</span>
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

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={closeRequirementModal}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
