import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  HardHat,
  ChevronRight,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, openQuoteModal, language, t } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top CTA banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 py-12 px-4 sm:px-8 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-4 h-4" />
              {language === 'zh'
                ? '直通中国优质工程制造与国际集采合作'
                : language === 'am'
                ? 'ቀጥታ ዓለም አቀፍ የአቅርቦት አጋርነት'
                : language === 'ar'
                ? 'شراكة التوريد الدولي المباشر'
                : 'Direct International Supply Partnership'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'zh'
                ? '准备好采购高品质工程建材与重型机械了吗？'
                : language === 'am'
                ? 'ጥራት ያላቸውን የግንባታ ማቴሪያሎችና ማሽነሪዎች ለመግዛት ዝግጁ ነዎት?'
                : language === 'ar'
                ? 'هل أنت مستعد لتوريد مواد البناء والآليات عالية الأداء؟'
                : 'Ready to Source High-Performance Materials & Machinery?'}
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl">
              {language === 'zh'
                ? '直连中国合格源头工厂享受出厂底价，ORANEX Trading 埃塞俄比亚本地团队提供全方位现场技术支持与清关分期保供。'
                : language === 'am'
                ? 'ቀጥታ ከቻይና አጋር ፋብሪካዎች በምርጥ ዋጋ ይሸምቱ፤ ኦራኔክስ ትሬዲንግ በኢትዮጵያ ሙሉ የሳይት ቴክኒካል ድጋፍ ይሰጣል።'
                : language === 'ar'
                ? 'تواصل مباشرة مع شركائنا في الصين للحصول على أسعار المصنع مع إشراف ودعم تقني محلي شامل من أورانكس في إثيوبيا.'
                : 'Connect directly with Our Chinese partner for international factory pricing with comprehensive on-site technical guidance from Oranex Trading in Ethiopia.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openQuoteModal()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
            >
              {t.cta.requestQuote}
            </button>
            <button
              onClick={() => navigate('construction-materials-sourcing')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              {language === 'zh' ? '一站式工程集采' : language === 'am' ? 'ተርንኪ የግንባታ አቅርቦት' : language === 'ar' ? 'توريد مواد البناء' : 'Turnkey Sourcing'}
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-800 flex items-center justify-center text-white font-black text-lg">
              OX
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">ORANEX</span>
              <span className="text-xs ml-2 px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                × Our Chinese partner
              </span>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase">
                Oranex Trading One Member PLC
              </p>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            Oranex connects Ethiopian construction companies, batching plants, contractors, and industrial buyers with vetted international manufacturers through strategic partner Our Chinese partner, combining global procurement scale with local technical support.
          </p>

          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>NSL Sub-City, Addis Ababa, Federal Democratic Republic of Ethiopia</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span>+251 91 223 3688 / +251 96 863 6371</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span>www.oranex.com.et</span>
            </div>
          </div>
        </div>

        {/* Col 2: Construction Categories */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Construction & Industry
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => navigate('construction-materials-sourcing')}
                className="hover:text-white transition flex items-center gap-1.5 text-blue-400 font-bold"
              >
                <ChevronRight className="w-3 h-3 text-blue-400" />
                <span>Turnkey Materials Sourcing (New)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'construction-chemicals')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>OCHEMI Chemicals & PCE</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'cementitious-raw-materials')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>Raw Materials & Cements</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'concrete-production-equipment')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>Batching Plants & Mixers</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'construction-machinery')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>Excavators & Heavy Fleet</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'building-materials')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>Rebar & Structural Steel</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'civil-engineering')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>Geotextiles & Geosynthetics</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('construction-industrial', 'industrial-supplies')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-blue-500" />
                <span>Slurry Pumps & Valves</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('merkato-consolidation')}
                className="hover:text-white transition flex items-center gap-1.5 text-amber-400 font-semibold"
              >
                <ChevronRight className="w-3 h-3 text-amber-400" />
                <span>Merkato Wholesale & LCL Hub</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Business Divisions */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Key Portfolios & Divisions
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigate('industries')} className="hover:text-white transition font-bold text-blue-400">
                Target Industries &amp; Opportunities (New)
              </button>
            </li>
            <li>
              <button onClick={() => navigate('merkato-consolidation')} className="hover:text-white transition font-semibold text-amber-400">
                Consolidated Sourcing &amp; LCL Solutions
              </button>
            </li>
            <li>
              <button onClick={() => navigate('construction-materials-sourcing')} className="hover:text-white transition">
                Turnkey Construction Materials Sourcing
              </button>
            </li>
            <li>
              <button onClick={() => navigate('solutions', 'otrade')} className="hover:text-white transition">
                ORANEX Trading (Global Sourcing)
              </button>
            </li>
            <li>
              <button onClick={() => navigate('construction-industrial')} className="hover:text-white transition">
                Construction & Industrial Supply
              </button>
            </li>
            <li>
              <button onClick={() => navigate('construction-industrial', 'construction-chemicals')} className="hover:text-white transition">
                OCHEMI Chemical Solutions
              </button>
            </li>
            <li>
              <button onClick={() => navigate('tenders')} className="hover:text-white transition">
                Tender & Procurement Services
              </button>
            </li>
            <li>
              <button onClick={() => navigate('construction-industrial', 'global-sourcing-oem')} className="hover:text-white transition">
                Global Sourcing, OEM & Private Label
              </button>
            </li>
            <li>
              <button onClick={() => navigate('landed-cost-calculator')} className="hover:text-white transition font-semibold text-emerald-400">
                Ethiopian Landed Cost Calculator
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Corporate Governance & Legal */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Commercial Governance
          </h4>
          <div className="space-y-2 text-[11px] text-slate-400">
            <p>
              <strong>Direct Purchasing Model:</strong> International procurement contracts are executed directly with <strong>Our Chinese partner</strong>. Customers handle customs clearance, import permits, and local duties according to Ethiopian commercial legislation.
            </p>
            <p>
              <strong>Quality Assurance:</strong> Factory quality documentation (Mill Test Certificates, ASTM/EN conformity) issued per consignment.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('admin')}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-semibold"
              >
                <span>Enterprise Admin & Marketing Engine</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} Oranex Trading One Member PLC. All rights reserved. Registered under Ethiopian Commercial Code. Strategic International Sourcing Partner: Our Chinese partner.
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('about')} className="hover:underline">Corporate Profile</button>
          <span>•</span>
          <button onClick={() => navigate('construction-industrial', 'overview')} className="hover:underline">Procurement Framework</button>
          <span>•</span>
          <button onClick={() => navigate('contact')} className="hover:underline">Contact Liaison</button>
        </div>
      </div>
    </footer>
  );
};
