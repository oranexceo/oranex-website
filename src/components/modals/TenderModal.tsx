import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OranexLogo } from '../OranexLogo';
import { X, Upload, CheckCircle2, FileText, AlertCircle, Building2, ShieldAlert, Globe } from 'lucide-react';
import { LANGUAGES, getSuggestedLanguagesForCountry } from '../../i18n/languages';

export const TenderModal: React.FC = () => {
  const { isTenderModalOpen, closeTenderModal, submitLead, language, t } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Ethiopia',
    preferredLanguage: 'en',
    preferredTenderLanguage: 'Same as tender document',
    serviceLevel: 'Level 2: Sourcing + Tender Preparation',
    tenderTitle: '',
    procuringEntity: '',
    lotNumber: '',
    targetDate: '',
    deliveryLocation: 'In-Country Project Site / Modjo Dry Port',
    specificationDetails: '',
    notes: ''
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync initial language preference from context
  useEffect(() => {
    if (language) {
      setFormData((prev) => ({ ...prev, preferredLanguage: language }));
    }
  }, [language]);

  if (!isTenderModalOpen) return null;

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
    if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.tenderTitle) {
      setErrorMsg('Please complete all required fields (*).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await submitLead({
        type: 'TENDER_REQUEST',
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        preferredLanguage: formData.preferredLanguage,
        preferredTenderLanguage: formData.preferredTenderLanguage,
        serviceLevel: formData.serviceLevel,
        productOrScope: `Tender: ${formData.tenderTitle} (${formData.procuringEntity || 'Not specified'})`,
        specificationDetails: `Target Market: ${formData.country} | Service Level: ${formData.serviceLevel} | Comm Lang: ${formData.preferredLanguage} | Tender Lang: ${formData.preferredTenderLanguage} | Lot: ${formData.lotNumber} | Specs: ${formData.specificationDetails}`,
        targetDate: formData.targetDate,
        deliveryLocation: `${formData.deliveryLocation} (${formData.country})`,
        notes: formData.notes,
        attachedFileNames: attachedFiles.map((f) => f.name),
        sourceOrigin: 'Tender Fast-Track Modal'
      });
      setIsSuccess(true);
    } catch {
      setErrorMsg('Failed to process tender submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <OranexLogo size={32} showText={false} />
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                <Building2 className="w-3.5 h-3.5" />
                <span>Africa-Wide Tender Support &amp; Sourcing Desk</span>
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Submit Tender Requirement or BoQ
              </h3>
            </div>
          </div>
          <button
            onClick={closeTenderModal}
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
              Tender Dossier Received
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Our tender procurement specialists will conduct an initial compliance matrix assessment on your Bill of Quantities (BoQ) and contact you within 24–48 hours to discuss international manufacturer alignment.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                closeTenderModal();
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                All bid documentation, tender specifications, and client pricing data are treated under rigorous non-disclosure agreements.
              </span>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sara Tesfaye"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. East Africa Infrastructure PLC"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
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
                  placeholder="tenders@organization.et"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
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
                  placeholder="+251 92 334 5566"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tender Title or Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tenderTitle}
                  onChange={(e) => setFormData({ ...formData, tenderTitle: e.target.value })}
                  placeholder="e.g. Supply of Submersible Pumps and Control Panels"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target African Market *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none bg-white"
                >
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Somalia">Somalia</option>
                  <option value="Sudan">Sudan</option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="DRC">DR Congo</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Ivory Coast">Côte d'Ivoire</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Angola">Angola</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Other African Market">Other African Market</option>
                </select>
                {/* Non-intrusive country-aware language suggestions */}
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500">Suggested:</span>
                  {suggestedLangs.map((s) => (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredLanguage: s.code })}
                      className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                        formData.preferredLanguage === s.code
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                      }`}
                      title={`Click to set communication language to ${s.name}`}
                    >
                      {s.nativeName} ({s.code.toUpperCase()})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Preferences (Section 36 & 37) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-3.5 rounded-lg border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-700" />
                  <span>Preferred Communication Language *</span>
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none bg-white font-medium"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Language our sourcing desk will use for direct communication.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Preferred Tender / Proposal Language *
                </label>
                <select
                  value={formData.preferredTenderLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredTenderLanguage: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none bg-white font-medium"
                >
                  <option value="Same as tender document">Same as tender document (Recommended)</option>
                  <option value="en">English</option>
                  <option value="fr">French (Français)</option>
                  <option value="ar">Arabic (العربية)</option>
                  <option value="pt">Portuguese (Português)</option>
                  <option value="sw">Swahili (Kiswahili)</option>
                  <option value="am">Amharic (አማርኛ)</option>
                  <option value="Other / Specify">Other / Specify in notes</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Formal language required for submission documents &amp; specs.
                </p>
              </div>
            </div>

            {/* Target Service Level (Section 38) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tender Service Level Required *
              </label>
              <select
                value={formData.serviceLevel}
                onChange={(e) => setFormData({ ...formData, serviceLevel: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none bg-white font-medium"
              >
                <option value="Level 0: Tender Assessment">Level 0: Tender Assessment (BoQ review &amp; feasibility)</option>
                <option value="Level 1: Tender Preparation">Level 1: Tender Preparation (Compliance sheets, MAF, dossier)</option>
                <option value="Level 2: Sourcing + Tender Preparation">Level 2: Sourcing + Tender Preparation (OEM pricing discovery)</option>
                <option value="Level 3: Full Tender Supply Support">Level 3: Full Tender Supply Support (Factory, inspection, CIF port)</option>
                <option value="Level 4: End-to-End Tender & Project Execution">Level 4: End-to-End Project Execution (Turnkey, install, training)</option>
              </select>
            </div>

            {/* Master V8 Dynamic Guidance for Selected Service Level */}
            {formData.serviceLevel.startsWith('Level 0') && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1 animate-in fade-in-50">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Tender Assessment &amp; Go/No-Go Decision Support</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  ORANEX will review BoQ lines, technical standards, deadline feasibility, and international sourcing risks. Output advisory options: <strong>GO · GO WITH CONDITIONS · NO-GO</strong>.
                </p>
                <p className="text-[10px] text-amber-950 font-bold italic pt-0.5">
                  IMPORTANT: The final participation decision belongs to the customer.
                </p>
              </div>
            )}

            {(formData.serviceLevel.startsWith('Level 3') || formData.serviceLevel.startsWith('Level 4')) && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 italic animate-in fade-in-50">
                * Note: If awarded, ORANEX can continue supporting the procurement, shipping, and site execution process under a separate or agreed post-award arrangement.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Procuring Institution (Optional)
                </label>
                <input
                  type="text"
                  value={formData.procuringEntity}
                  onChange={(e) => setFormData({ ...formData, procuringEntity: e.target.value })}
                  placeholder="e.g. Ministry of Water & Energy / UN Agency / Private Developer"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lot / Item Number
                </label>
                <input
                  type="text"
                  value={formData.lotNumber}
                  onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                  placeholder="e.g. Lot 1 & Lot 3"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tender Closing Date
                </label>
                <input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
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
                  placeholder="In-Country Project Site"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Summary of Scope &amp; Support Needed
              </label>
              <textarea
                rows={2}
                value={formData.specificationDetails}
                onChange={(e) => setFormData({ ...formData, specificationDetails: e.target.value })}
                placeholder="Mention if you require Manufacturer Authorization Letters (MAL), compliance matrices, pricing benchmarking, or turnkey shipping..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload BoQ / RfP Documents (Excel, PDF, Word)
              </label>
              <div className="border border-dashed border-slate-300 rounded p-4 text-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.xlsx,.xls,.doc,.docx"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <Upload className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs text-slate-700 font-medium">
                    Attach Tender Terms of Reference, BoQ spreadsheets, or Technical Specs
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Encrypted file upload (Max 25MB)
                  </span>
                </div>
              </div>

              {attachedFiles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-900 text-xs rounded border border-emerald-200"
                    >
                      <FileText className="w-3 h-3 text-emerald-700" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-emerald-500 hover:text-red-500"
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
                onClick={closeTenderModal}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Uploading...' : 'Submit Tender for Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
