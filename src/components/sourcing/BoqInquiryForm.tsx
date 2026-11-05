import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Upload,
  CheckCircle2,
  Building,
  MapPin,
  Calendar,
  Layers,
  Package,
  Phone,
  Mail,
  User,
  ShieldCheck,
  X,
  FileCheck2,
  AlertCircle,
  Loader2,
  Paperclip,
  Lock
} from 'lucide-react';

export interface BoqInquiryFormProps {
  initialPackage?: string;
  initialCategory?: string;
  onSuccess?: () => void;
}

export interface UploadedBoqDocument {
  id?: string;
  name: string;
  size: string;
  bytes: number;
  type: string;
  storagePath: string;
  bucket: string;
  uploadedAt: string;
}

export const BoqInquiryForm: React.FC<BoqInquiryFormProps> = ({
  initialPackage,
  initialCategory,
  onSuccess
}) => {
  const { submitLead, capturedUtm } = useApp();

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectName: '',
    projectLocation: 'Addis Ababa (Urban Corridors)',
    projectCategory: 'Road & Infrastructure',
    productCategories: initialCategory ? [initialCategory] : ['Road Construction & Asphalt Materials'],
    estimatedQuantities: '',
    deliveryDate: '',
    procurementPackage: initialPackage || 'PACKAGE_C',
    specifications: ''
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedBoqDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableCategories = [
    { id: 'cat-1', name: 'Road Construction & Asphalt Materials', desc: 'Bitumen 60/70, MC-30, RC-70, geosynthetics, guardrails' },
    { id: 'cat-2', name: 'Concrete, Ready-Mix & Precast Solutions', desc: 'OCHEMI PCE 50%, SNF, retarders, waterproofing, precast anchors' },
    { id: 'cat-3', name: 'Building Construction & Finishing', desc: 'Rebar Gr 60, white cement, porcelain tiles, facades, MEP piping' },
    { id: 'cat-4', name: 'Construction Equipment, Tools & Site Supplies', desc: 'Excavators, batch plants, generators, survey total stations, PPE' },
    { id: 'cat-5', name: 'Construction Material Manufacturing Support', desc: 'Dry-mix mortar plants, asphalt plants, extrusion lines, raw polymers' }
  ];

  const procurementPackages = [
    {
      id: 'PACKAGE_A',
      code: 'Package A',
      title: 'Product Category',
      desc: 'Single category supply (e.g. Bitumen, PCE Admixtures, Tiles, Plumbing)'
    },
    {
      id: 'PACKAGE_B',
      code: 'Package B',
      title: 'Work Package',
      desc: 'Defined work section (e.g. Road surfacing, Waterproofing, Façade envelope)'
    },
    {
      id: 'PACKAGE_C',
      code: 'Package C',
      title: 'Multi-Category Procurement',
      desc: 'Several material categories coordinated under one consolidated shipping schedule'
    },
    {
      id: 'PACKAGE_D',
      code: 'Package D',
      title: 'Project-Wide Materials Supply',
      desc: 'Full BOQ-led turnkey materials supply from structural works through finishes'
    }
  ];

  const handleCategoryToggle = (catName: string) => {
    setFormData((prev) => {
      const exists = prev.productCategories.includes(catName);
      if (exists) {
        if (prev.productCategories.length === 1) return prev; // keep at least 1
        return { ...prev, productCategories: prev.productCategories.filter((c) => c !== catName) };
      } else {
        return { ...prev, productCategories: [...prev.productCategories, catName] };
      }
    });
  };

  const ALLOWED_EXTS = ['.pdf', '.xlsx', '.xls', '.docx', '.doc', '.jpg', '.jpeg', '.png'];
  const MAX_BYTES = 52428800; // 50MB limit

  const uploadFiles = async (fileList: FileList | File[]) => {
    const filesArray = Array.from(fileList);
    if (filesArray.length === 0) return;

    setIsUploading(true);
    setFormError(null);

    const newDocs: UploadedBoqDocument[] = [];

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!ALLOWED_EXTS.includes(ext)) {
        setFormError(`File "${file.name}" has an unsupported format (${ext}). Supported formats: PDF, Excel (.xlsx, .xls), Word (.docx, .doc), JPG, PNG.`);
        setIsUploading(false);
        setUploadStatusText(null);
        return;
      }

      if (file.size > MAX_BYTES) {
        setFormError(`File "${file.name}" exceeds the 50MB maximum upload limit.`);
        setIsUploading(false);
        setUploadStatusText(null);
        return;
      }

      setUploadStatusText(`Securing & uploading "${file.name}" (${i + 1}/${filesArray.length}) to private Supabase storage...`);

      try {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64);
          };
          reader.onerror = () => reject(new Error('Failed reading file bytes'));
          reader.readAsDataURL(file);
        });

        const res = await fetch('/api/upload-boq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'upload',
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            fileSize: file.size,
            fileBase64: base64Data,
            leadId: formData.companyName
              ? formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')
              : 'boq-inquiry'
          })
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || `Upload failed for ${file.name}`);
        }

        newDocs.push(data.document);
      } catch (uploadErr: any) {
        console.error('[UPLOAD ERROR]', uploadErr);
        setFormError(`Upload error for "${file.name}": ${uploadErr.message}`);
        setIsUploading(false);
        setUploadStatusText(null);
        return;
      }
    }

    setUploadedDocuments((prev) => [...prev, ...newDocs]);
    setIsUploading(false);
    setUploadStatusText(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const removeDocument = (storagePath: string) => {
    setUploadedDocuments((prev) => prev.filter((d) => d.storagePath !== storagePath));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (isUploading) {
      setFormError('Please wait for document uploads to finish before submitting.');
      return;
    }

    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      setFormError('Please fill in all required contact and company fields.');
      return;
    }

    const refNumber = `BOQ-${Date.now().toString().slice(-6)}`;
    setSubmissionRef(refNumber);

    const categoriesText = formData.productCategories.join(', ');
    const pkgObj = procurementPackages.find((p) => p.id === formData.procurementPackage);
    const pkgLabel = pkgObj ? `${pkgObj.code} (${pkgObj.title})` : formData.procurementPackage;

    const notesSummary = [
      `[Turnkey Sourcing BOQ Requirement]`,
      `Project: ${formData.projectName} (${formData.projectCategory})`,
      `Location: ${formData.projectLocation}`,
      `Target Delivery: ${formData.deliveryDate || 'As per project schedule'}`,
      `Procurement Package: ${pkgLabel}`,
      `Required Categories: ${categoriesText}`,
      `Estimated Quantities: ${formData.estimatedQuantities || 'Refer to uploaded BOQ'}`,
      `Attached BOQ Documents: ${uploadedDocuments.length > 0 ? uploadedDocuments.map((d) => `${d.name} (${d.size})`).join(', ') : 'None / Specifications entered manually'}`,
      `Technical Specifications: ${formData.specifications || 'N/A'}`
    ].join('\n');

    submitLead({
      name: formData.contactName,
      company: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      productOrCategory: `Turnkey Sourcing: ${formData.productCategories[0]}`,
      productOrScope: `Turnkey BOQ: ${formData.projectName} (${categoriesText})`,
      estimatedQuantity: formData.estimatedQuantities || 'Comprehensive BOQ schedule',
      deliveryLocation: formData.projectLocation,
      notes: notesSummary,
      sourceOrigin: 'Construction Materials & Turnkey Sourcing Portal',
      preferredLanguage: 'en',
      attachedFileNames: uploadedDocuments.map((d) => d.name),
      documents: uploadedDocuments
    });

    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setUploadedDocuments([]);
    setSubmissionRef('');
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-3xl mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
            BOQ Submission Confirmed
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Requirement Docket Received
          </h3>
          <p className="text-xs font-mono text-slate-500">
            Reference Tracking Number: <strong className="text-slate-900 font-bold">{submissionRef}</strong>
          </p>
        </div>

        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Thank you. Your project BOQ and material requirements have been routed directly to Eng. Petros Abebe Mengesha and our international procurement desk. Our technical engineers will begin supplier matching across verified manufacturers in China and global manufacturing hubs.
        </p>

        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 text-xs text-slate-700 max-w-lg mx-auto">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Next Steps in Turnkey Sourcing:</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-blue-600">1.</span>
            <span>Technical review of BOQ items, ASTM/EN/AASHTO specifications, and quantity tiers (within 24–48 hours).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-blue-600">2.</span>
            <span>Direct supplier pricing and factory capability comparison through Our Chinese partner.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-blue-600">3.</span>
            <span>Consolidated proforma quotation, logistics routing (Djibouti/Modjo), and staged delivery schedule delivery.</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={resetForm}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Submit Another Project Requirement
          </button>
          <a
            href="https://wa.me/251912233688"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
          >
            <span>Liaise with Eng. Petros via WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
      {/* Form Header */}
      <div className="border-b border-slate-100 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Integrated Project Sourcing Gateway</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Submit Your BOQ or Material Schedule
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Coordinate multiple construction material categories, equipment lines, and manufacturing supplies through one integrated procurement partner. Upload your Bill of Quantities or fill in your project specifications below.
        </p>
      </div>

      {formError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* 1. Company & Contact Details */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          1. Company & Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Midroc Construction, Blue Nile Infra, etc."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Contact Person's Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="e.g. Eng. Yohannes Bekele"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="procurement@yourcompany.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Mobile / WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+251 91 234 5678"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Project Details */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          2. Project Profile & Destination
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Project Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              placeholder="e.g. Modjo Expressway Package 2 / Mixed-Use Tower"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Project Location / Delivery Site <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                required
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                placeholder="e.g. Modjo Dry Port / Addis Ababa Ring Road Site"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Project Category
            </label>
            <select
              value={formData.projectCategory}
              onChange={(e) => setFormData({ ...formData, projectCategory: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              <option value="Road & Infrastructure">Road & Highway Infrastructure</option>
              <option value="Real Estate Development">Real Estate & Residential Development</option>
              <option value="Commercial High-Rise">Commercial High-Rise & Mixed-Use Towers</option>
              <option value="Government & Institutional">Government & Institutional Public Works</option>
              <option value="Ready-Mix / Precast Plant">Ready-Mix Concrete & Precast Facility</option>
              <option value="Industrial Facility & Manufacturing">Industrial Parks & Manufacturing Plants</option>
              <option value="EPC Turnkey Project">EPC Turnkey Infrastructure</option>
              <option value="Other Commercial Project">Other Commercial Project</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Product Categories Selection (Multi-Select) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            3. Required Supply Categories (Select all that apply)
          </h4>
          <span className="text-[11px] text-slate-500">
            {formData.productCategories.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableCategories.map((cat) => {
            const isChecked = formData.productCategories.includes(cat.name);
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryToggle(cat.name)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(cat.name)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 pointer-events-none"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{cat.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{cat.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Preferred Procurement Package */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          4. Preferred Procurement Package
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {procurementPackages.map((pkg) => {
            const isSelected = formData.procurementPackage === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setFormData({ ...formData, procurementPackage: pkg.id })}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-sm ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                    {pkg.code}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{pkg.title}</div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{pkg.desc}</p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span>{isSelected ? 'Selected' : 'Select'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Quantities, Delivery & Specifications */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          5. Quantities & Technical Specifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Estimated Quantities / Bill of Quantities Summary
            </label>
            <input
              type="text"
              value={formData.estimatedQuantities}
              onChange={(e) => setFormData({ ...formData, estimatedQuantities: e.target.value })}
              placeholder="e.g. 200 MT Bitumen 60/70, 40 MT PCE 50%, 5 FCL Tiles"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Target Site Delivery Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Technical Specifications, Standards & Incoterms Notes
            </label>
            <textarea
              rows={3}
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              placeholder="Mention required ASTM / EN standards, testing certifications (MTC), preferred packaging (IBC, steel drums, bulk), or target payment terms (LC, CAD, direct supplier agreement via Our Chinese partner)."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* 6. Document / BOQ Upload Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <span>6. Attach BOQ, Tender Schedules & Material Documents (Optional)</span>
          </h4>
          <span className="text-[11px] text-slate-500 font-medium">
            {uploadedDocuments.length} document{uploadedDocuments.length === 1 ? '' : 's'} attached
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Uploaded Documents List */}
        {uploadedDocuments.length > 0 && (
          <div className="space-y-2.5">
            {uploadedDocuments.map((doc, idx) => (
              <div
                key={doc.storagePath || idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 transition hover:border-slate-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <Lock className="w-3 h-3 text-emerald-600" />
                        <span>Private Storage ({doc.bucket || 'oranex-boq-documents'})</span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDocument(doc.storagePath)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0"
                  title="Remove document"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Uploading Status Banner */}
        {isUploading && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center gap-3 text-xs animate-pulse">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
            <div className="font-semibold">
              {uploadStatusText || 'Securing & uploading document to private Supabase Storage...'}
            </div>
          </div>
        )}

        {/* Dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? 'border-blue-600 bg-blue-50'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-blue-600">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              {uploadedDocuments.length > 0 ? '+ Click to attach another document or drag & drop files here' : 'Click to browse or drag & drop your BOQ / Material Schedule files here'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supported formats: PDF, Excel (.xlsx, .xls), Word (.docx, .doc), JPG, PNG (up to 50MB per file)
            </p>
            <p className="text-[10px] text-emerald-700 font-medium flex items-center justify-center gap-1 mt-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Direct private upload to Supabase Storage bucket: oranex-boq-documents</span>
            </p>
          </div>
        </div>
      </div>

      {/* Submit Action & Disclosures */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 max-w-md">
            By submitting, your requirements are coordinated with qualified international manufacturers (with focus on China) via Our Chinese partner. All supplies subject to commercial confirmation.
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Submit BOQ For Procurement Review</span>
          </button>
        </div>
      </div>
    </form>
  );
};
