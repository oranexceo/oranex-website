import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSectionTranslations } from '../i18n/sectionTranslations';
import { getExtendedTranslations } from '../i18n/extendedTranslations';
import { Upload, CheckCircle2, FileText, X, AlertCircle } from 'lucide-react';

export const TellUsRequirementSection: React.FC = () => {
  const { submitLead, language } = useApp();
  const sec = getSectionTranslations(language);
  const ext = getExtendedTranslations(language);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    productOrScope: '',
    specificationDetails: '',
    quantity: '',
    unit: '',
    application: '',
    brandPreference: '',
    manufacturerPreference: '',
    deliveryLocation: 'Modjo Dry Port / Addis Ababa',
    targetDate: '',
    notes: ''
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.productOrScope) {
      setErrorMsg('Please complete all essential fields marked with an asterisk (*).');
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
        productOrScope: formData.productOrScope,
        quantity: formData.quantity,
        unit: formData.unit,
        specificationDetails: `Spec: ${formData.specificationDetails} | Application: ${formData.application} | Brand Pref: ${formData.brandPreference} | Mfr Pref: ${formData.manufacturerPreference}`,
        deliveryLocation: formData.deliveryLocation,
        targetDate: formData.targetDate,
        notes: formData.notes,
        attachedFileNames: attachedFiles.map((f) => f.name),
        sourceOrigin: 'Homepage "Tell Us What You Need" Section'
      });

      setSubmitted(true);
    } catch {
      setErrorMsg('An error occurred while submitting your requirement. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tell-us-section" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {sec.tellUsRequirement.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            {sec.tellUsRequirement.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            {sec.tellUsRequirement.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-2xl animate-in fade-in-50">
            <div className="w-14 h-14 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              {sec.tellUsRequirement.fields.successTitle}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              {sec.tellUsRequirement.fields.successDesc}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  company: '',
                  phone: '',
                  email: '',
                  productOrScope: '',
                  specificationDetails: '',
                  quantity: '',
                  unit: '',
                  application: '',
                  brandPreference: '',
                  manufacturerPreference: '',
                  deliveryLocation: 'Modjo Dry Port / Addis Ababa',
                  targetDate: '',
                  notes: ''
                });
                setAttachedFiles([]);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors"
            >
              {sec.tellUsRequirement.fields.submitAnother}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-10 shadow-2xl space-y-6"
          >
            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Contact Person Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.company}
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Nile Packaging PLC"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.email}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.phone}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+251 9X XXX XXXX"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Product & Scope Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.productOrScope}
                </label>
                <input
                  type="text"
                  required
                  value={formData.productOrScope}
                  onChange={(e) => setFormData({ ...formData, productOrScope: e.target.value })}
                  placeholder="e.g. SLES 70% Surfactant, or Rotary Packaging Line"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.quantity}
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.unit}
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="MT / Units"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Specifications & Technical Details */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.specificationDetails}
                </label>
                <textarea
                  rows={3}
                  value={formData.specificationDetails}
                  onChange={(e) => setFormData({ ...formData, specificationDetails: e.target.value })}
                  placeholder="Chemical purity, technical grade, dimensions, tolerances, electrical ratings, capacity requirements..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.application}
                  </label>
                  <input
                    type="text"
                    value={formData.application}
                    onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    placeholder="e.g. Detergent Manufacturing"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.brandPreference}
                  </label>
                  <input
                    type="text"
                    value={formData.brandPreference}
                    onChange={(e) => setFormData({ ...formData, brandPreference: e.target.value })}
                    placeholder="e.g. European / Asian / Any verified OEM"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.manufacturerPreference}
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturerPreference}
                    onChange={(e) => setFormData({ ...formData, manufacturerPreference: e.target.value })}
                    placeholder="Specific factory (if known)"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.deliveryLocation}
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {sec.tellUsRequirement.fields.targetDate}
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {sec.tellUsRequirement.fields.notes}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Target CIF/FOB pricing, payment terms, trial sample requirements..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Document Upload Area */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {sec.tellUsRequirement.fields.uploadTitle}
              </label>
              <div className="border border-dashed border-slate-700 rounded-lg p-4 bg-slate-900/50 hover:bg-slate-900 transition-colors text-center relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <Upload className="w-6 h-6 text-slate-400 mb-1.5" />
                  <div className="text-xs text-slate-300 font-medium">
                    {ext.formLabels?.attachFiles || 'Click or drag files here to attach'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {sec.tellUsRequirement.fields.uploadHint}
                  </div>
                </div>
              </div>

              {attachedFiles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {attachedFiles.map((file, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span className="truncate max-w-[180px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(fIdx)}
                        className="text-slate-400 hover:text-red-400 ml-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-slate-400">
                {ext.formLabels?.confidentialityNotice || 'All specifications, proprietary formulas, and tender data are handled under strict confidentiality.'}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? sec.tellUsRequirement.fields.submitting : sec.tellUsRequirement.fields.submitBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
