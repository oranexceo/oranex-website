import React, { useState, useEffect } from 'react';
import {
  marketingApi,
  OverviewStats,
  MarketingSettings,
  MarketingCampaign,
  MarketingPost,
  MarketingAuditLog
} from '../../services/marketingApi';
import { useApp } from '../../context/AppContext';
import { QueueTab } from './tabs/QueueTab';
import { AccountsTab } from './tabs/AccountsTab';
import { EngagementTab } from './tabs/EngagementTab';
import { LeadsTab } from './tabs/LeadsTab';
import {
  Sparkles,
  PauseCircle,
  PlayCircle,
  Calendar,
  Layers,
  Settings as SettingsIcon,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Send,
  Plus,
  RefreshCw,
  Clock,
  Globe,
  Share2,
  Trash2,
  Edit3,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  FileText,
  BarChart3,
  Sliders,
  AlertCircle,
  Cpu,
  MessageSquare,
  Target,
  Lock,
  Activity
} from 'lucide-react';

export const MarketingEngine: React.FC = () => {
  const { addToast } = useApp();

  type TabType =
    | 'overview'
    | 'queue'
    | 'accounts'
    | 'studio'
    | 'calendar'
    | 'campaigns'
    | 'engagement'
    | 'leads'
    | 'settings';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Core Data States
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [settings, setSettings] = useState<MarketingSettings | null>(null);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [posts, setPosts] = useState<MarketingPost[]>([]);
  const [auditLogs, setAuditLogs] = useState<MarketingAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters for Posts
  const [postPlatformFilter, setPostPlatformFilter] = useState('all');
  const [postStateFilter, setPostStateFilter] = useState('all');
  const [postCampaignFilter, setPostCampaignFilter] = useState('all');
  const [postLangFilter, setPostLangFilter] = useState('all');

  // AI Content Studio Generation State
  const [genTopic, setGenTopic] = useState('OCHEMI Polycarboxylate Ether (PCE 50%) for Ready-Mix Concrete');
  const [genPillar, setGenPillar] = useState('Construction Chemicals & OCHEMI Admixtures');
  const [genCampaignId, setGenCampaignId] = useState('');
  const [genMarket, setGenMarket] = useState('Ethiopia (Addis Ababa, Adama, Hawassa)');
  const [genLanguage, setGenLanguage] = useState('en');
  const [genCta, setGenCta] = useState('Request a Technical Quotation');
  const [genProduct, setGenProduct] = useState('OCHEMI PCE 50% High-Range Superplasticizer');
  const [isGenerating, setIsGenerating] = useState(false);

  // Edit Post Modal State
  const [editingPost, setEditingPost] = useState<MarketingPost | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editHeadline, setEditHeadline] = useState('');
  const [isSavingPost, setIsSavingPost] = useState(false);

  // Schedule Post Dialog State
  const [schedulingPost, setSchedulingPost] = useState<MarketingPost | null>(null);
  const [scheduleDateTime, setScheduleDateTime] = useState('');

  // Create Campaign Modal State
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignPillar, setNewCampaignPillar] = useState('Construction Chemicals & OCHEMI Admixtures');
  const [newCampaignAudience, setNewCampaignAudience] = useState('Contractors & Batching Plants');
  const [newCampaignObjective, setNewCampaignObjective] = useState<'LEAD_GENERATION' | 'BRAND_AWARENESS' | 'TECHNICAL_AUTHORITY' | 'PRODUCT_LAUNCH'>('LEAD_GENERATION');
  const [newCampaignCta, setNewCampaignCta] = useState('Request a Technical Quotation');
  const [newCampaignStart, setNewCampaignStart] = useState(new Date().toISOString().split('T')[0]);
  const [newCampaignEnd, setNewCampaignEnd] = useState('');

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [ov, st, camps, ps, logs] = await Promise.all([
        marketingApi.getOverview(),
        marketingApi.getSettings(),
        marketingApi.getCampaigns(),
        marketingApi.getPosts(),
        marketingApi.getAuditLogs()
      ]);
      setStats(ov);
      setSettings(st);
      setCampaigns(camps);
      if (camps.length > 0 && !genCampaignId) {
        setGenCampaignId(camps[0].id);
      }
      setPosts(ps);
      setAuditLogs(logs);
    } catch (err: any) {
      console.warn('Backend API note:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleToggleGlobalPause = async () => {
    if (!settings) return;
    const newState = !settings.globalPause;
    try {
      const res = await marketingApi.setGlobalPause(newState);
      setSettings((prev) => (prev ? { ...prev, globalPause: res.globalPause } : prev));
      if (stats) setStats({ ...stats, globalPause: res.globalPause });
      addToast(
        res.globalPause ? 'Global Pause Activated' : 'Automation Resumed',
        res.message,
        res.globalPause ? 'warning' : 'success'
      );
      loadAllData();
    } catch (err: any) {
      addToast('Pause Action Failed', err.message, 'error');
    }
  };

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genTopic.trim()) {
      addToast('Missing Topic', 'Please enter a topic or product scope.', 'error');
      return;
    }
    if (!genCampaignId) {
      addToast('Campaign Required', 'Please select a campaign for content attribution.', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await marketingApi.generateAiVariants({
        topic: genTopic,
        pillar: genPillar,
        campaignId: genCampaignId,
        targetMarket: genMarket,
        language: genLanguage,
        customCta: genCta,
        specificProduct: genProduct
      });
      addToast(
        'Variants Generated',
        `Created 3 distinct platform drafts (LinkedIn, Facebook, Instagram) verified against ORANEX knowledge base.`,
        'success'
      );
      await loadAllData();
      setActiveTab('studio');
    } catch (err: any) {
      addToast('Generation Failed', err.message, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStateChange = async (postId: string, newState: string) => {
    try {
      await marketingApi.setPostState(postId, newState);
      addToast('Status Updated', `Post transitioned to "${newState}".`, 'info');
      await loadAllData();
    } catch (err: any) {
      addToast('State Change Blocked', err.message, 'error');
    }
  };

  const handleOpenSchedule = (post: MarketingPost) => {
    if (settings?.globalPause) {
      addToast('Action Blocked', 'Global Pause is active. Scheduling is suspended until automation is resumed in Settings.', 'error');
      return;
    }
    setSchedulingPost(post);
    // default to tomorrow 10am
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    setScheduleDateTime(tomorrow.toISOString().slice(0, 16));
  };

  const handleConfirmSchedule = async () => {
    if (!schedulingPost) return;
    try {
      await marketingApi.setPostState(schedulingPost.id, 'scheduled', scheduleDateTime);
      addToast('Post Scheduled', `Scheduled for ${new Date(scheduleDateTime).toLocaleString()}`, 'success');
      setSchedulingPost(null);
      await loadAllData();
    } catch (err: any) {
      addToast('Scheduling Failed', err.message, 'error');
    }
  };

  const handleOpenEdit = (post: MarketingPost) => {
    setEditingPost(post);
    setEditCaption(post.caption);
    setEditHeadline(post.headline || '');
  };

  const handleSaveEdit = async () => {
    if (!editingPost) return;
    setIsSavingPost(true);
    try {
      const updated = await marketingApi.updatePost(editingPost.id, {
        caption: editCaption,
        headline: editHeadline
      });
      addToast('Post Updated', `Saved with server claim re-validation (${updated.validationStatus}).`, 'success');
      setEditingPost(null);
      await loadAllData();
    } catch (err: any) {
      addToast('Update Failed', err.message, 'error');
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this marketing post?')) return;
    try {
      await marketingApi.deletePost(id);
      addToast('Post Deleted', 'Post removed from database.', 'info');
      await loadAllData();
    } catch (err: any) {
      addToast('Delete Failed', err.message, 'error');
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignTitle.trim()) return;
    try {
      const camp = await marketingApi.createCampaign({
        title: newCampaignTitle,
        pillar: newCampaignPillar,
        targetAudience: newCampaignAudience,
        objective: newCampaignObjective,
        primaryCta: newCampaignCta,
        startDate: newCampaignStart,
        endDate: newCampaignEnd
      });
      addToast('Campaign Created', `Created campaign "${camp.title}".`, 'success');
      setIsCreateCampaignOpen(false);
      setNewCampaignTitle('');
      await loadAllData();
    } catch (err: any) {
      addToast('Campaign Creation Failed', err.message, 'error');
    }
  };

  const filteredPosts = posts.filter((p) => {
    if (postPlatformFilter !== 'all' && p.platform !== postPlatformFilter) return false;
    if (postStateFilter !== 'all' && p.state !== postStateFilter) return false;
    if (postCampaignFilter !== 'all' && p.campaignId !== postCampaignFilter) return false;
    if (postLangFilter !== 'all' && p.language !== postLangFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Global Pause Master Alert Bar */}
      <div
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          settings?.globalPause
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-950'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              settings?.globalPause
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {settings?.globalPause ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {settings?.globalPause ? 'GLOBAL PUBLISHING PAUSED' : 'AUTOMATION ENGINE ACTIVE'}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  settings?.globalPause
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}
              >
                {settings?.globalPause ? 'FROZEN' : 'ARMED'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {settings?.globalPause
                ? 'All automated posting and scheduled executions are strictly suspended. AI generation and manual edits are permitted.'
                : 'Server-side knowledge policy validator active. Grounded in ORANEX & Our Chinese partner authentic trade parameters.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleGlobalPause}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ${
              settings?.globalPause
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {settings?.globalPause ? (
              <>
                <PlayCircle className="w-4 h-4" />
                <span>Resume Publishing</span>
              </>
            ) : (
              <>
                <PauseCircle className="w-4 h-4" />
                <span>Activate Global Pause</span>
              </>
            )}
          </button>

          <button
            onClick={loadAllData}
            disabled={isLoading}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh database state"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview & Telemetry', icon: BarChart3 },
          { id: 'queue', label: 'Publishing Queue', icon: Cpu, badge: stats?.pendingJobsCount ? `${stats.pendingJobsCount}` : undefined },
          { id: 'accounts', label: 'Social Accounts', icon: Share2, badge: stats?.connectedAccountsCount ? `${stats.connectedAccountsCount}/3` : '0/3' },
          { id: 'studio', label: 'AI Content Studio', icon: Sparkles },
          { id: 'calendar', label: 'Content Calendar', icon: Calendar },
          { id: 'campaigns', label: 'Campaigns', icon: Layers },
          { id: 'engagement', label: 'Inbound Desk', icon: MessageSquare, badge: stats?.inboundEngagementsCount ? `${stats.inboundEngagementsCount}` : undefined },
          { id: 'leads', label: 'Attributed Leads', icon: Target, badge: stats?.attributedLeadsCount ? `${stats.attributedLeadsCount}` : undefined },
          { id: 'settings', label: 'Policy Rules', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* SUB-VIEW 1: OVERVIEW DASHBOARD */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in-50 duration-150">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'Active Campaigns', val: stats?.activeCampaigns || 0, color: 'text-blue-700', bg: 'bg-blue-50' },
              { label: 'Total Content', val: stats?.totalPosts || 0, color: 'text-slate-900', bg: 'bg-slate-100' },
              { label: 'Drafts', val: stats?.drafts || 0, color: 'text-slate-600', bg: 'bg-slate-50' },
              { label: 'Validated', val: stats?.validated || 0, color: 'text-emerald-700', bg: 'bg-emerald-50' },
              { label: 'Scheduled', val: stats?.scheduled || 0, color: 'text-purple-700', bg: 'bg-purple-50' },
              { label: 'Held for Review', val: stats?.heldForReview || 0, color: 'text-amber-700', bg: 'bg-amber-50' },
              { label: 'Policy Blocks', val: stats?.policyViolationsBlocked || 0, color: 'text-red-700', bg: 'bg-red-50' }
            ].map((kpi, i) => (
              <div key={i} className={`p-3.5 rounded-xl border border-slate-200 ${kpi.bg}`}>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold truncate">
                  {kpi.label}
                </div>
                <div className={`text-xl font-bold mt-1 ${kpi.color}`}>{kpi.val}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions & Policy Health Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Quick Content Generator Trigger */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Quick Content Generator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Generate compliant multi-platform variants (LinkedIn, Facebook, Instagram) using Gemini 3.8 Flash.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  Full Studio <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic or Product Highlight</label>
                  <input
                    type="text"
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    placeholder="e.g. OCHEMI C-Waterproof Integral Crystalline Waterproofing"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Campaign</label>
                    <select
                      value={genCampaignId}
                      onChange={(e) => setGenCampaignId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white"
                    >
                      {campaigns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Content Language</label>
                    <select
                      value={genLanguage}
                      onChange={(e) => setGenLanguage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white font-medium"
                    >
                      <option value="en">English (B2B Engineering)</option>
                      <option value="am">Amharic (አማርኛ - Local Contractors)</option>
                      <option value="fr">French (Français - Regional)</option>
                      <option value="ar">Arabic (العربية)</option>
                      <option value="pt">Portuguese (Português)</option>
                      <option value="sw">Swahili (Kiswahili)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating || settings?.globalPause}
                    className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>{isGenerating ? 'Synthesizing with Gemini...' : 'Generate 3 Platform Variants'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Truth & Policy Guard Status */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Server Policy Guard</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sole Importer Guard:</strong> Blocks claims that Oranex is the importer of every product; protects Our Chinese partner direct purchase model.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pricing Fabrications:</strong> Blocks invented dollar/birr unit rates. Enforces "Quotation on Request".</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Transit Truthfulness:</strong> Blocks fake same-day/24h international arrival claims. Enforces realistic 30-45 day Djibouti-Modjo lead times.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Social Publication Integrity:</strong> Prohibits claiming content is "Published" without verified platform API tokens.</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Total Checks Run: <strong>{auditLogs.length}</strong></span>
                <span className="text-emerald-700 font-semibold">Zero Unverified Claims</span>
              </div>
            </div>
          </div>

          {/* Recent Posts Stream */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Content Pipeline</h3>
                <p className="text-xs text-slate-500">Live view of persistent posts and their validation state.</p>
              </div>
              <button
                onClick={() => setActiveTab('studio')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                View all in Studio &rarr;
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {posts.slice(0, 5).map((p) => (
                <div key={p.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900">{p.platform}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                        {p.language.toUpperCase()}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.2 rounded font-semibold ${
                          p.state === 'validated'
                            ? 'bg-emerald-100 text-emerald-900'
                            : p.state === 'scheduled'
                            ? 'bg-purple-100 text-purple-900'
                            : p.state === 'held_for_review'
                            ? 'bg-amber-100 text-amber-900'
                            : p.state === 'rejected'
                            ? 'bg-red-100 text-red-900'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.state.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 max-w-2xl">{p.caption}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded border border-slate-200"
                    >
                      Review / Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW 2: CONTENT STUDIO (AI VARIANT GENERATOR) */}
      {/* ======================================================== */}
      {activeTab === 'studio' && (
        <div className="space-y-6 animate-in fade-in-50 duration-150">
          {/* AI Generator Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>AI Content Studio &bull; Multi-Variant Generator</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Powered by Gemini 3.8 Flash. Generates tailored, policy-compliant LinkedIn, Facebook, and Instagram variants.
                </p>
              </div>

              {settings?.globalPause && (
                <div className="px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                  Global Pause Active
                </div>
              )}
            </div>

            <form onSubmit={handleGenerateAI} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic / Sourcing Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    placeholder="e.g. 22-Ton Hydraulic Crawler Excavator Fleet for Infrastructure Contractors"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Product or Model
                  </label>
                  <input
                    type="text"
                    value={genProduct}
                    onChange={(e) => setGenProduct(e.target.value)}
                    placeholder="e.g. 22T Crawler Excavator / HZS90"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Campaign Attribution *</label>
                  <select
                    value={genCampaignId}
                    onChange={(e) => setGenCampaignId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white"
                  >
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Content Pillar</label>
                  <select
                    value={genPillar}
                    onChange={(e) => setGenPillar(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white"
                  >
                    {(settings?.contentPillars || []).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Market</label>
                  <select
                    value={genMarket}
                    onChange={(e) => setGenMarket(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white"
                  >
                    {(settings?.targetMarkets || []).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Language</label>
                  <select
                    value={genLanguage}
                    onChange={(e) => setGenLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white font-medium"
                  >
                    <option value="en">English (Professional B2B)</option>
                    <option value="am">Amharic (አማርኛ)</option>
                    <option value="fr">French (Français)</option>
                    <option value="ar">Arabic (العربية)</option>
                    <option value="pt">Portuguese (Português)</option>
                    <option value="sw">Swahili (Kiswahili)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Call to Action (CTA)</label>
                <select
                  value={genCta}
                  onChange={(e) => setGenCta(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 bg-white"
                >
                  {(settings?.callsToAction || []).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isGenerating || settings?.globalPause}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Generating 3 Variants with Gemini...' : 'Generate 3 Platform Variants'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Posts Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Filters:
              </span>

              <select
                value={postPlatformFilter}
                onChange={(e) => setPostPlatformFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-medium"
              >
                <option value="all">All Platforms</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
              </select>

              <select
                value={postStateFilter}
                onChange={(e) => setPostStateFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-medium"
              >
                <option value="all">All States</option>
                <option value="draft">Draft</option>
                <option value="validated">Validated</option>
                <option value="scheduled">Scheduled</option>
                <option value="held_for_review">Held for Review</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={postLangFilter}
                onChange={(e) => setPostLangFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-medium"
              >
                <option value="all">All Languages</option>
                <option value="en">English (en)</option>
                <option value="am">Amharic (am)</option>
                <option value="fr">French (fr)</option>
                <option value="ar">Arabic (ar)</option>
                <option value="pt">Portuguese (pt)</option>
                <option value="sw">Swahili (sw)</option>
              </select>
            </div>

            <div className="text-slate-500 font-mono text-xs">
              Showing <strong>{filteredPosts.length}</strong> of {posts.length} posts
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{post.platform}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {post.language.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* State Badge */}
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          post.state === 'validated'
                            ? 'bg-emerald-100 text-emerald-900'
                            : post.state === 'scheduled'
                            ? 'bg-purple-100 text-purple-900'
                            : post.state === 'held_for_review'
                            ? 'bg-amber-100 text-amber-900'
                            : post.state === 'rejected'
                            ? 'bg-red-100 text-red-900'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {post.state.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Policy Validation Banner */}
                  <div
                    className={`px-4 py-1.5 text-[11px] font-medium flex items-center justify-between border-b ${
                      post.validationStatus === 'PASSED'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-100'
                        : post.validationStatus === 'WARNING'
                        ? 'bg-amber-50 text-amber-900 border-amber-100'
                        : 'bg-red-50 text-red-900 border-red-100'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {post.validationStatus === 'PASSED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {post.validationStatus === 'WARNING' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                      {post.validationStatus === 'FAILED' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                      <span>Policy: {post.validationStatus}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {post.groundedClaims.length} grounded claims
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    {post.headline && (
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {post.headline}
                      </h4>
                    )}

                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap line-clamp-6">
                      {post.caption}
                    </p>

                    {/* Hashtags */}
                    {post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[11px] text-blue-700 font-mono">
                        {post.hashtags.map((h, i) => (
                          <span key={i}>{h}</span>
                        ))}
                      </div>
                    )}

                    {/* Visual Media Prompt */}
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700 block mb-0.5">Media Direction:</span>
                      <p className="line-clamp-2 italic">{post.mediaPrompt}</p>
                    </div>

                    {/* Scheduled Time info */}
                    {post.scheduledFor && (
                      <div className="flex items-center gap-1.5 text-xs text-purple-800 font-mono bg-purple-50 p-2 rounded border border-purple-100">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        <span>Scheduled: {new Date(post.scheduledFor).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded"
                      title="Edit Post"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {post.state === 'draft' && (
                      <button
                        onClick={() => handleStateChange(post.id, 'validated')}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-semibold text-[11px]"
                      >
                        Approve
                      </button>
                    )}

                    {post.state === 'validated' && (
                      <button
                        onClick={() => handleOpenSchedule(post)}
                        className="px-2.5 py-1 bg-purple-800 hover:bg-purple-700 text-white rounded font-semibold text-[11px]"
                      >
                        Schedule
                      </button>
                    )}

                    {post.state === 'scheduled' && (
                      <button
                        onClick={() => handleStateChange(post.id, 'validated')}
                        className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold text-[11px]"
                      >
                        Unschedule
                      </button>
                    )}

                    {post.state === 'held_for_review' && (
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="px-2.5 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded font-semibold text-[11px]"
                      >
                        Fix Violations
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW 3: CONTENT CALENDAR */}
      {/* ======================================================== */}
      {activeTab === 'calendar' && (
        <div className="space-y-6 animate-in fade-in-50 duration-150">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-700" />
                  <span>Scheduled Content Queue &amp; Calendar</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Agenda view of verified and scheduled posts across LinkedIn, Facebook, and Instagram.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  {posts.filter((p) => p.state === 'scheduled').length} Scheduled
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {posts.filter((p) => p.scheduledFor || p.state === 'scheduled').length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  No posts currently scheduled. Generate content in the Content Studio and click "Schedule".
                </div>
              ) : (
                posts
                  .filter((p) => p.scheduledFor || p.state === 'scheduled')
                  .sort((a, b) => (a.scheduledFor || '').localeCompare(b.scheduledFor || ''))
                  .map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-slate-900">{post.platform}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {post.language.toUpperCase()}
                          </span>
                          <span className="font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                            {post.scheduledFor ? new Date(post.scheduledFor).toLocaleString() : 'Date Pending'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">{post.headline || post.campaignTitle}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{post.caption}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenSchedule(post)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleStateChange(post.id, 'validated')}
                          className="px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50 border border-amber-200 rounded"
                        >
                          Hold
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW 4: CAMPAIGN MANAGER */}
      {/* ======================================================== */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6 animate-in fade-in-50 duration-150">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-700" />
                  <span>Strategic Campaign Portfolio</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Manage multi-channel campaigns linked directly to customer acquisition and RFQ inquiries.
                </p>
              </div>

              <button
                onClick={() => setIsCreateCampaignOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((c) => (
                <div key={c.id} className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                      {c.pillar}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                      {c.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Target:</strong> {c.targetAudience}</div>
                    <div><strong>Objective:</strong> {c.objective.replace('_', ' ')}</div>
                    <div><strong>Primary CTA:</strong> {c.primaryCta}</div>
                    <div><strong>Window:</strong> {c.startDate} {c.endDate ? `to ${c.endDate}` : '(Ongoing)'}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Generated Posts: <strong>{c.postsCount || 0}</strong></span>
                    <span>Inquiries Generated: <strong className="text-emerald-700">{c.leadsGenerated || 0}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW 5: SETTINGS & COMPLIANCE RULES */}
      {/* ======================================================== */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Settings Controls */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-700" />
                <span>Marketing Engine Automation Settings</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Daily Post Limit</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={settings?.dailyPostLimit || 4}
                    onChange={(e) => setSettings(settings ? { ...settings, dailyPostLimit: parseInt(e.target.value) || 4 } : null)}
                    className="w-32 px-3 py-1.5 border border-slate-300 rounded"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">Limits maximum automated content broadcasts per 24-hour cycle.</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Configured Content Pillars</label>
                  <ul className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
                    {(settings?.contentPillars || []).map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supported Languages</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['en', 'am', 'fr', 'ar', 'pt', 'sw'].map((lang) => (
                      <span key={lang} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                        {lang.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (settings) {
                        marketingApi.updateSettings(settings);
                        addToast('Settings Saved', 'Marketing engine settings updated.', 'success');
                      }
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold"
                  >
                    Save Settings Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Active Policy Rules */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Enforced Truth &amp; Policy Rules</span>
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  { rule: 'RULE 1: Sole Importer Guard', desc: 'Prevents stating Oranex is the importer of every product; protects Our Chinese partner direct purchase model.' },
                  { rule: 'RULE 2: Zero Fabricated Pricing', desc: 'Rejects invented unit prices or rates per ton. Requires "Quotation on Request".' },
                  { rule: 'RULE 3: Verified Standards Only', desc: 'Allows only validated standards (ASTM C494, EN 934-2, ISO 9001, DIN 1048, etc.).' },
                  { rule: 'RULE 4: Transit Timeline Truth', desc: 'Prohibits promising 24-hour delivery on international cargo; preserves 30-45 day Djibouti corridor reality.' },
                  { rule: 'RULE 5: Zero Fake Testimonials', desc: 'Blocks invented customer endorsements without approved marketing consent.' },
                  { rule: 'RULE 6: Verified Publication Status', desc: 'No post is marked "Published" without confirmed live social account API response.' }
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="font-bold text-slate-900 text-[11px]">{item.rule}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Audit Trail &amp; Policy Log</h3>
              <span className="text-xs font-mono text-slate-400">{auditLogs.length} Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Action</th>
                    <th className="p-2.5">Actor</th>
                    <th className="p-2.5">Details</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {auditLogs.slice(0, 15).map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="p-2.5 text-slate-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-2.5 font-bold text-slate-800">{log.action}</td>
                      <td className="p-2.5 text-slate-600">{log.actor}</td>
                      <td className="p-2.5 text-slate-700 font-sans">{log.details}</td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.status === 'SUCCESS'
                              ? 'bg-emerald-100 text-emerald-900'
                              : log.status === 'WARNING'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-red-100 text-red-900'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW: PUBLISHING QUEUE */}
      {/* ======================================================== */}
      {activeTab === 'queue' && (
        <QueueTab
          globalPause={Boolean(settings?.globalPause)}
          onRefreshOverview={loadAllData}
        />
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW: SOCIAL ACCOUNTS */}
      {/* ======================================================== */}
      {activeTab === 'accounts' && (
        <AccountsTab onRefreshOverview={loadAllData} />
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW: INBOUND ENGAGEMENT DESK */}
      {/* ======================================================== */}
      {activeTab === 'engagement' && (
        <EngagementTab onRefreshOverview={loadAllData} />
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW: ATTRIBUTED LEADS */}
      {/* ======================================================== */}
      {activeTab === 'leads' && (
        <LeadsTab onRefreshOverview={loadAllData} />
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Review / Edit Post ({editingPost.platform} &bull; {editingPost.language.toUpperCase()})
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Caption Body</label>
                <textarea
                  rows={8}
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600 focus:outline-none font-mono"
                />
              </div>

              {editingPost.validationIssues.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>Policy Issues Identified:</span>
                  </div>
                  {editingPost.validationIssues.map((issue, idx) => (
                    <div key={idx} className="text-[11px] pl-5">• {issue.message}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setEditingPost(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                disabled={isSavingPost}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-semibold shadow-sm"
              >
                {isSavingPost ? 'Validating & Saving...' : 'Save & Re-Validate Policy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Dialog */}
      {schedulingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Schedule Post for {schedulingPost.platform}
            </h3>
            <p className="text-xs text-slate-500">
              Select target publication date and time. Global pause state will be checked prior to queue registration.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Date &amp; Time</label>
              <input
                type="datetime-local"
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-purple-600"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSchedulingPost(null)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
                className="px-4 py-1.5 bg-purple-900 hover:bg-purple-800 text-white rounded text-xs font-semibold"
              >
                Confirm Scheduling
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {isCreateCampaignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create New Marketing Campaign</h3>
              <button
                onClick={() => setIsCreateCampaignOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={newCampaignTitle}
                  onChange={(e) => setNewCampaignTitle(e.target.value)}
                  placeholder="e.g. Q4 Concrete Admixtures Expansion"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Content Pillar</label>
                <select
                  value={newCampaignPillar}
                  onChange={(e) => setNewCampaignPillar(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white"
                >
                  {(settings?.contentPillars || []).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={newCampaignAudience}
                  onChange={(e) => setNewCampaignAudience(e.target.value)}
                  placeholder="e.g. Precast Fabricators & Ready-Mix Plants"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Objective</label>
                  <select
                    value={newCampaignObjective}
                    onChange={(e) => setNewCampaignObjective(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white"
                  >
                    <option value="LEAD_GENERATION">Lead Generation</option>
                    <option value="BRAND_AWARENESS">Brand Awareness</option>
                    <option value="TECHNICAL_AUTHORITY">Technical Authority</option>
                    <option value="PRODUCT_LAUNCH">Product Launch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA</label>
                  <input
                    type="text"
                    value={newCampaignCta}
                    onChange={(e) => setNewCampaignCta(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newCampaignStart}
                    onChange={(e) => setNewCampaignStart(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newCampaignEnd}
                    onChange={(e) => setNewCampaignEnd(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateCampaignOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 text-white rounded text-xs font-semibold"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
