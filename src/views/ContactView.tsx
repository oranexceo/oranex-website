import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { submitLead } = useApp();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    division: 'Construction & Industrial Supply Chain',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      productOrCategory: form.division,
      estimatedQuantity: 'General Inquiry',
      deliveryLocation: 'Addis Ababa',
      notes: form.message,
      sourceOrigin: 'Contact Page Inquiry Form',
      preferredLanguage: 'en'
    });
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-2xl space-y-2">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
          Direct Liaison
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Oranex Trading & Our Chinese partner
        </h1>
        <p className="text-sm text-slate-600">
          Reach our commercial procurement desk and technical advisory office in Addis Ababa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Corporate Office</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Addis Ababa Headquarters:</strong>
                  NSL Sub-City, Addis Ababa, Federal Democratic Republic of Ethiopia.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Executive Contact & WhatsApp:</strong>
                  <span>+251 912 233 688 (Eng. Petros Abebe Mengesha)</span>
                  <div className="mt-1">
                    <a
                      href="https://wa.me/251912233688?text=Hello%20Eng.%20Petros,%20I%20am%20contacting%20you%20via%20the%20ORANEX%20website"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg transition"
                    >
                      <span>Direct WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Email:</strong>
                  <span>Oranexceo@gmail.com / www.oranex.com.et</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Working Hours:</strong>
                  Monday – Friday: 8:30 AM – 5:30 PM (EAT / UTC+3)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-200 text-xs text-blue-900 space-y-2">
            <span className="font-bold text-blue-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              International Sourcing Desk (Our Chinese partner):
            </span>
            <p>
              For direct international supplier inquiries, export proformas, and factory audit certificates, our desk coordinates directly with Our Chinese partner global fulfillment centers in Yiwu, Guangzhou, Foshan, Ningbo, and Shandong.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="text-xl font-bold text-slate-900 mb-1">Send a Commercial Inquiry</h3>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the form below and our procurement officer will respond within 24 hours.
          </p>

          {sent ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-slate-900">Message Received</h4>
              <p className="text-xs text-slate-600 mt-1">Thank you. We will contact you promptly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Company PLC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="+251 912 233 688"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Relevant Division</label>
                <select
                  value={form.division}
                  onChange={(e) => setForm({ ...form, division: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="Construction Materials & Turnkey Sourcing">Construction Materials & Turnkey Sourcing (BOQ)</option>
                  <option value="Merkato Wholesale & Container Consolidation">Merkato Wholesale & Container Consolidation (LCL)</option>
                  <option value="Construction & Industrial Supply Chain">Construction & Industrial Supply Chain</option>
                  <option value="OCHEMI Chemical Solutions">OCHEMI Chemical Solutions</option>
                  <option value="ORANEX Trading (Global Sourcing)">ORANEX Trading (Global Sourcing)</option>
                  <option value="Tender & Procurement Services">Tender & Procurement Services</option>
                  <option value="Global Sourcing, OEM & Private Label">Global Sourcing, OEM & Private Label</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                  placeholder="Detail your inquiry or project requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
