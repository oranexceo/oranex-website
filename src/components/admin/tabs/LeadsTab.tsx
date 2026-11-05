import React, { useState, useEffect } from 'react';
import {
  marketingApi,
  AttributedLeadSummary
} from '../../../services/marketingApi';
import { useApp } from '../../../context/AppContext';
import {
  Users,
  Target,
  CheckCircle2,
  Clock,
  Filter,
  RefreshCw,
  Award,
  Building,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Edit2,
  Save,
  Tag,
  FileText,
  Download,
  Lock
} from 'lucide-react';

interface LeadsTabProps {
  onRefreshOverview: () => void;
}

export const LeadsTab: React.FC<LeadsTabProps> = ({ onRefreshOverview }) => {
  const { addToast } = useApp();
  const [leads, setLeads] = useState<AttributedLeadSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('MARKETING_QUALIFIED');
  const [editScore, setEditScore] = useState<number>(75);
  const [editNotes, setEditNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await marketingApi.getAttributedLeads();
      setLeads(data);
    } catch (err: any) {
      console.warn('Error fetching leads:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStartEdit = (lead: AttributedLeadSummary) => {
    setEditingLeadId(lead.id);
    setEditStatus(lead.qualificationStatus);
    setEditScore(lead.qualificationScore);
    setEditNotes(lead.qualificationNotes || '');
  };

  const handleSaveQualification = async (id: string) => {
    setIsSaving(true);
    try {
      await marketingApi.qualifyLead(id, editStatus, editScore, editNotes);
      addToast('Lead Qualified', 'Lead status and qualification score updated.', 'success');
      setEditingLeadId(null);
      await loadLeads();
      onRefreshOverview();
    } catch (err: any) {
      addToast('Update Failed', err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = leads.filter((l) => {
    if (statusFilter === 'all') return true;
    return l.qualificationStatus === statusFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Campaign Attribution & Conversion Tracking</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Attributed Procurement Leads & Inquiries
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Every RFQ, sample request, and mix calibration inquiry received through social post links is captured here with UTM source, medium, campaign parameters, and automated B2B procurement qualification scoring.
          </p>
        </div>

        <button
          onClick={loadLeads}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Attributed Leads', count: leads.length, color: 'text-slate-900', bg: 'bg-slate-50' },
          {
            label: 'Sales Qualified (SQL)',
            count: leads.filter((l) => l.qualificationStatus === 'SALES_QUALIFIED').length,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50'
          },
          {
            label: 'Marketing Qualified (MQL)',
            count: leads.filter((l) => l.qualificationStatus === 'MARKETING_QUALIFIED').length,
            color: 'text-blue-700',
            bg: 'bg-blue-50'
          },
          {
            label: 'Avg Qualification Score',
            count: leads.length > 0 ? `${Math.round(leads.reduce((a, b) => a + b.qualificationScore, 0) / leads.length)}/100` : '0/100',
            color: 'text-purple-700',
            bg: 'bg-purple-50'
          }
        ].map((kpi, i) => (
          <div key={i} className={`p-4 rounded-xl border border-slate-200 ${kpi.bg}`}>
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500">{kpi.label}</div>
            <div className={`text-xl font-bold mt-1 ${kpi.color}`}>{kpi.count}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 text-xs font-semibold">
        <span className="text-slate-500">Filter Status:</span>
        {['all', 'SALES_QUALIFIED', 'MARKETING_QUALIFIED', 'UNQUALIFIED', 'DISQUALIFIED'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              statusFilter === status
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No Attributed Leads Found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              When buyers click marketing links containing UTM parameters and submit RFQ or quote requests, their details are tied back to the originating campaign here.
            </p>
          </div>
        ) : (
          filtered.map((lead) => {
            const isEditing = editingLeadId === lead.id;
            const isSQL = lead.qualificationStatus === 'SALES_QUALIFIED';
            const isMQL = lead.qualificationStatus === 'MARKETING_QUALIFIED';

            return (
              <div
                key={lead.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{lead.name}</h3>
                      <span className="text-xs text-slate-500 font-semibold">• {lead.company}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3">
                      {lead.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{lead.email}</span>
                        </span>
                      )}
                      {lead.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </span>
                      )}
                      {lead.deliveryLocation && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{lead.deliveryLocation}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Qualification Score & Badge */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                        Qualification Score
                      </div>
                      <div className="text-sm font-bold font-mono text-indigo-700">
                        {lead.qualificationScore}/100
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono tracking-wider ${
                        isSQL
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : isMQL
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lead.qualificationStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Scope & Attribution Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-500 font-semibold">Procurement Scope / Item:</span>
                    <div className="font-bold text-slate-800 mt-0.5">{lead.productOrCategory}</div>
                    {lead.estimatedQuantity && (
                      <div className="text-slate-600 mt-0.5">Quantity: {lead.estimatedQuantity}</div>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-500 font-semibold">Campaign Attribution:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {lead.utmCampaign && (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px]">
                          campaign: {lead.utmCampaign}
                        </span>
                      )}
                      {lead.utmSource && (
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-[10px]">
                          source: {lead.utmSource}
                        </span>
                      )}
                      {lead.utmMedium && (
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">
                          medium: {lead.utmMedium}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Attached Documents in Private Supabase Storage */}
                {Array.isArray(lead.documents) && lead.documents.length > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Attached BOQ Documents ({lead.documents.length})</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-600" />
                        <span>Private Bucket: {lead.documents[0]?.bucket || 'oranex-boq-documents'}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {lead.documents.map((doc: any, dIdx: number) => (
                        <a
                          key={doc.storagePath || dIdx}
                          href={doc.downloadUrl || `/api/upload-boq?action=download&path=${encodeURIComponent(doc.storagePath || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 hover:text-blue-700 hover:border-blue-300 shadow-xs transition"
                          title={`Download ${doc.name}`}
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate max-w-[200px]">{doc.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({doc.size || 'Doc'})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qualification Editor */}
                {isEditing ? (
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Qualification Status
                        </label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-300 rounded bg-white"
                        >
                          <option value="SALES_QUALIFIED">SALES QUALIFIED (Ready for Proforma)</option>
                          <option value="MARKETING_QUALIFIED">MARKETING QUALIFIED (Evaluating)</option>
                          <option value="UNQUALIFIED">UNQUALIFIED (Needs Follow-up)</option>
                          <option value="DISQUALIFIED">DISQUALIFIED (Spam / Invalid)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Score (0-100)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={editScore}
                          onChange={(e) => setEditScore(parseInt(e.target.value, 10) || 0)}
                          className="w-full p-2 text-xs border border-slate-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Commercial / Technical Notes
                      </label>
                      <input
                        type="text"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="e.g. Verified batching plant with 2 dry ports. Requested mix design trial."
                        className="w-full p-2 text-xs border border-slate-300 rounded bg-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingLeadId(null)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveQualification(lead.id)}
                        disabled={isSaving}
                        className="px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Status</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-slate-600 italic">
                      {lead.qualificationNotes ? `Note: "${lead.qualificationNotes}"` : 'No qualification notes recorded yet.'}
                    </div>

                    <button
                      onClick={() => handleStartEdit(lead)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Update Qualification</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
