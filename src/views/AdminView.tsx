import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MarketingEngine } from '../components/admin/MarketingEngine';
import {
  Sparkles,
  Inbox,
  FileCheck,
  Package,
  Layers,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { leads, tenders, allProducts, addToast } = useApp();
  const [adminTab, setAdminTab] = useState<'marketing' | 'leads' | 'tenders' | 'products'>('marketing');
  const [leadStatusFilter, setLeadStatusFilter] = useState('ALL');

  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter === 'ALL') return true;
    return l.status === leadStatusFilter;
  });

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>ORANEX Operations & Intelligence Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Enterprise Administration & Marketing Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Manage incoming procurement RFQs, partner coordination, active tender schedules, and automated AI content campaigns.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setAdminTab('marketing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              adminTab === 'marketing'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Marketing Engine</span>
          </button>

          <button
            onClick={() => setAdminTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              adminTab === 'leads'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiries & RFQs ({leads.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('tenders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              adminTab === 'tenders'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Tenders ({tenders.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              adminTab === 'products'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Catalog Items ({allProducts.length})</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {adminTab === 'marketing' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 animate-in fade-in duration-200">
          <MarketingEngine />
        </div>
      )}

      {adminTab === 'leads' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Procurement Inquiries & Quotation Requests</h2>
              <p className="text-xs text-slate-500">Incoming B2B leads from Ethiopia and regional buyers</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Filter:</span>
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="QUOTED">Quoted</option>
                <option value="CONVERTED">Converted</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-blue-400 transition bg-slate-50/50 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      #{lead.id.slice(-6).toUpperCase()}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{lead.name}</h3>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-600 font-medium">{lead.company}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      lead.status === 'NEW'
                        ? 'bg-amber-100 text-amber-800'
                        : lead.status === 'QUOTED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Requested Product / Requirement:</span>
                    <span className="font-semibold text-slate-800">{lead.productOrCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Quantity & Volume:</span>
                    <span className="font-semibold text-slate-800">{lead.estimatedQuantity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Branding Preference:</span>
                    <span className="font-semibold text-indigo-700">
                      {lead.brandingPreference || 'Standard Brand'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {lead.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {lead.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {lead.deliveryLocation}
                  </span>
                </div>

                {lead.notes && (
                  <div className="p-3 bg-white rounded-xl text-xs text-slate-600 border border-slate-200">
                    <strong>Technical Notes:</strong> {lead.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'tenders' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Active Public & Commercial Tenders</h2>
              <p className="text-xs text-slate-500">Track Ethiopian infrastructure bids and supply qualifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {tenders.map((tender) => (
              <div key={tender.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-blue-600">{tender.referenceNumber}</span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {tender.status}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900">{tender.title}</h4>
                <p className="text-xs text-slate-600"><strong>Agency / Consortium:</strong> {tender.agencyOrCompany}</p>
                <div className="text-xs text-slate-600">
                  <strong>Scope:</strong> {tender.scopeOfSupply.join('; ')}
                </div>
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
                  <span>Target: {tender.targetLocation}</span>
                  <span>Deadline: {tender.submissionDeadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Master Product Catalog Repository</h2>
              <p className="text-xs text-slate-500">{allProducts.length} items configured across all business divisions</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Brand Format</th>
                  <th className="py-2.5 px-3">MOQ</th>
                  <th className="py-2.5 px-3">Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {allProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{p.sku || 'N/A'}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3">{p.category}</td>
                    <td className="py-2.5 px-3">{p.brand || 'Our Chinese partner'}</td>
                    <td className="py-2.5 px-3">{p.moq}</td>
                    <td className="py-2.5 px-3">{p.origin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
