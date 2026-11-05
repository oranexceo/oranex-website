import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Building2, Globe2, Award, Users, CheckCircle2, MapPin } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { openQuoteModal } = useApp();

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
          Company Profile
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          ORANEX Trading One Member PLC
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Founded and headquartered in Addis Ababa, Ethiopia, ORANEX is a global sourcing and procurement partner connecting Ethiopian enterprises with international manufacturing strength through strategic international partner <strong>Our Chinese partner</strong>.
        </p>
      </div>

      {/* Grid of Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Local Ground Presence</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Direct customer liaison in Addis Ababa, on-site technical evaluations, laboratory batch trials, and milestone delivery monitoring along the Djibouti-Addis corridor.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Chinese partner Alliance</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            International sourcing partner Our Chinese partner manages tier-1 synthesis plants, equipment factories, containerized shipping logistics, and direct export invoicing.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Technical Qualification</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Full compliance with ASTM, EN, and Ethiopian standards. Every chemical batch and machinery unit is accompanied by certified laboratory testing reports.
          </p>
        </div>
      </div>

      {/* Commercial Model Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
            Clear Commercial Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ethical Sourcing & Transparent Procurement
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Oranex strictly upholds verifiable commercial standards. We do not make unsubstantiated claims, fabricate client endorsements, or misrepresent import roles. Customers contract directly with Our Chinese partner for international supply and maintain control of their customs clearance, assisted by our local technical advisory team.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
          <button
            onClick={() => openQuoteModal()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Become a Supply Partner
          </button>
        </div>
      </div>
    </div>
  );
};
