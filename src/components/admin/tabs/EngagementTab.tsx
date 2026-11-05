import React, { useState, useEffect } from 'react';
import {
  marketingApi,
  InboundEngagement
} from '../../../services/marketingApi';
import { useApp } from '../../../context/AppContext';
import {
  MessageSquare,
  Send,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  RefreshCw,
  User,
  Filter,
  Sparkles,
  ShieldCheck,
  Building,
  Mail
} from 'lucide-react';

interface EngagementTabProps {
  onRefreshOverview: () => void;
}

export const EngagementTab: React.FC<EngagementTabProps> = ({ onRefreshOverview }) => {
  const { addToast } = useApp();
  const [engagements, setEngagements] = useState<InboundEngagement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIntentFilter, setSelectedIntentFilter] = useState('all');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadEngagements = async () => {
    setIsLoading(true);
    try {
      const data = await marketingApi.getEngagements();
      setEngagements(data);
    } catch (err: any) {
      console.warn('Error loading engagements:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEngagements();
  }, []);

  const handleOpenReply = (item: InboundEngagement) => {
    setActiveReplyId(item.id);
    setReplyText(item.suggestedReply || '');
  };

  const handleSendReply = async (id: string, action: 'SEND' | 'ESCALATE' | 'IGNORED') => {
    setIsSubmitting(true);
    try {
      await marketingApi.replyEngagement(id, replyText, action);
      addToast(
        action === 'ESCALATE' ? 'Escalated to Desk' : action === 'IGNORED' ? 'Marked Ignored' : 'Reply Dispatched',
        action === 'ESCALATE'
          ? 'Inquiry forwarded to ORANEX engineering & commercial team for formal review.'
          : 'Low-risk factual response logged and sent.',
        action === 'ESCALATE' ? 'warning' : 'success'
      );
      setActiveReplyId(null);
      setReplyText('');
      await loadEngagements();
      onRefreshOverview();
    } catch (err: any) {
      addToast('Action Failed', err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = engagements.filter((e) => {
    if (selectedIntentFilter === 'all') return true;
    return e.intent === selectedIntentFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Procurement Inquiry & Engagement Desk</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Inbound Comments, RFQ Inquiries & Response Controls
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Monitor inbound comments from published marketing posts. Routine technical inquiries are matched with pre-approved factual guidance, while pricing negotiations, contractual commitments, and sensitive inquiries are escalated for human commercial review.
          </p>
        </div>

        <button
          onClick={loadEngagements}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Engagement</span>
        </button>
      </div>

      {/* Safety Policy Notice */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs flex items-start gap-3 border border-slate-800">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <span className="font-bold text-white">Automated Response Guardrails:</span>
          <p className="text-slate-300">
            The AI engine never commits to binding prices, delivery dates, or terms in automated replies. Only general technical specifications, testing standards (ASTM/EN), and guidance on submitting formal RFQs via the portal are permitted in automated drafts.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 text-xs font-semibold">
        <span className="text-slate-500">Filter Intent:</span>
        {['all', 'PROCUREMENT_INQUIRY', 'PRICE_REQUEST', 'GENERAL_COMMENT', 'COMPLAINT', 'SPAM'].map((intent) => (
          <button
            key={intent}
            onClick={() => setSelectedIntentFilter(intent)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedIntentFilter === intent
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {intent.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Engagement Cards List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No Inbound Messages</h4>
            <p className="text-xs text-slate-500">
              No engagement events match this filter. As social campaigns run, inbound comments and procurement queries appear here automatically.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isEscalated = item.replyStatus === 'ESCALATED';
            const isReplied = item.replyStatus === 'REPLIED' || item.replyStatus === 'AUTO_REPLIED';
            const isReplying = activeReplyId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-sm space-y-3.5 ${
                  isEscalated
                    ? 'border-amber-300 bg-amber-50/20'
                    : isReplied
                    ? 'border-slate-200 bg-white'
                    : 'border-blue-200 bg-blue-50/10'
                }`}
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {item.authorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.authorName}</span>
                        {item.authorHandle && (
                          <span className="text-slate-400 font-normal">@{item.authorHandle}</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        via {item.platform} • {new Date(item.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Intent & Sentiment Badges */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        item.intent === 'PROCUREMENT_INQUIRY'
                          ? 'bg-purple-100 text-purple-800'
                          : item.intent === 'PRICE_REQUEST'
                          ? 'bg-blue-100 text-blue-800'
                          : item.intent === 'COMPLAINT'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.intent.replace('_', ' ')}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isReplied
                          ? 'bg-emerald-100 text-emerald-800'
                          : isEscalated
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {item.replyStatus}
                    </span>
                  </div>
                </div>

                {/* Inbound Comment Body */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-800 font-medium leading-relaxed">
                  "{item.messageText}"
                </div>

                {/* Suggested Reply / Reply Box */}
                {!isReplying ? (
                  <div className="space-y-2">
                    {item.suggestedReply && (
                      <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Grounded Suggested Response</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed italic">
                          "{item.suggestedReply}"
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[11px] text-slate-500">
                        {item.leadAttributed ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Procurement Lead Attributed</span>
                          </span>
                        ) : (
                          <span>General inquiry</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenReply(item)}
                          className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Review & Respond</span>
                        </button>

                        {!isEscalated && (
                          <button
                            onClick={() => handleSendReply(item.id, 'ESCALATE')}
                            className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                          >
                            <ShieldAlert className="w-3 h-3" />
                            <span>Escalate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Draft Official Response:
                      </label>
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setActiveReplyId(null)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                      >
                        Cancel
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSendReply(item.id, 'ESCALATE')}
                          disabled={isSubmitting}
                          className="px-3 py-1.5 bg-amber-100 text-amber-900 hover:bg-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Escalate for Commercial Review</span>
                        </button>

                        <button
                          onClick={() => handleSendReply(item.id, 'SEND')}
                          disabled={isSubmitting || !replyText.trim()}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                          <span>Dispatch Official Reply</span>
                        </button>
                      </div>
                    </div>
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
