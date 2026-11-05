// Frontend API client for Marketing Engine (Phase 1 & Phase 2 Production Automation)

export interface MarketingSettings {
  globalPause: boolean;
  contentPillars: string[];
  targetMarkets: string[];
  supportedLanguages: string[];
  platforms: string[];
  callsToAction: string[];
  dailyPostLimit: number;
  automationStatus: 'ACTIVE' | 'PAUSED' | 'REVIEW_ONLY';
  requireHumanApproval: boolean;
  updatedAt: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  pillar: string;
  targetAudience: string;
  objective: 'LEAD_GENERATION' | 'BRAND_AWARENESS' | 'TECHNICAL_AUTHORITY' | 'PRODUCT_LAUNCH';
  primaryCta: string;
  status: 'ACTIVE' | 'DRAFT' | 'PAUSED' | 'COMPLETED';
  startDate: string;
  endDate: string;
  postsCount: number;
  leadsGenerated: number;
  utmCampaign?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationIssue {
  code: string;
  message: string;
  severity: 'CRITICAL' | 'WARNING';
}

export interface MarketingPost {
  id: string;
  campaignId: string;
  campaignTitle: string;
  pillar: string;
  platform: 'LinkedIn' | 'Facebook' | 'Instagram';
  language: string;
  caption: string;
  headline?: string;
  hashtags: string[];
  callToAction: string;
  ctaUrl: string;
  mediaPrompt: string;
  mediaType: 'IMAGE' | 'CAROUSEL' | 'INFOGRAPHIC' | 'VIDEO';
  state: 'draft' | 'validated' | 'scheduled' | 'held_for_review' | 'rejected' | 'published' | 'failed';
  validationStatus: 'PASSED' | 'WARNING' | 'FAILED';
  validationIssues: ValidationIssue[];
  groundedClaims: string[];
  scheduledFor?: string;
  publishedAt?: string;
  platformPostId?: string;
  publishedUrl?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublishingJob {
  id: string;
  postId: string;
  campaignId: string;
  campaignTitle: string;
  platform: 'LinkedIn' | 'Facebook' | 'Instagram';
  scheduledTime: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  attemptCount: number;
  maxRetries: number;
  lastAttemptAt?: string;
  errorMessage?: string;
  idempotencyKey: string;
  providerPostId?: string;
  publishedUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectedAccount {
  platform: 'LinkedIn' | 'Facebook' | 'Instagram';
  accountName?: string;
  accountId?: string;
  connected: boolean;
  status: 'CONNECTED' | 'DISCONNECTED' | 'EXPIRED' | 'SETUP_REQUIRED';
  tokenExpiresAt?: string;
  permissions: string[];
  missingPermissions: string[];
  lastSyncAt?: string;
  setupInstructions: {
    requiredAppType: string;
    requiredScopes: string[];
    callbackUrl: string;
    portalUrl: string;
    notes: string;
  };
}

export interface InboundEngagement {
  id: string;
  platform: 'LinkedIn' | 'Facebook' | 'Instagram';
  postId?: string;
  authorName: string;
  authorHandle?: string;
  messageText: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'INQUIRY' | 'COMPLAINT' | 'RISK';
  intent: 'PROCUREMENT_INQUIRY' | 'PRICE_REQUEST' | 'GENERAL_COMMENT' | 'COMPLAINT' | 'SPAM';
  leadAttributed?: boolean;
  leadId?: string;
  suggestedReply?: string;
  replyStatus: 'PENDING_REVIEW' | 'AUTO_REPLIED' | 'REPLIED' | 'ESCALATED' | 'IGNORED';
  escalationReason?: string;
  createdAt: string;
}

export interface AttributedLeadSummary {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productOrCategory: string;
  estimatedQuantity?: string;
  deliveryLocation?: string;
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  campaignId?: string;
  postId?: string;
  qualificationScore: number;
  qualificationStatus: 'UNQUALIFIED' | 'MARKETING_QUALIFIED' | 'SALES_QUALIFIED' | 'DISQUALIFIED';
  qualificationNotes?: string;
  documents?: Array<{
    name: string;
    size: string;
    bytes?: number;
    type: string;
    storagePath?: string;
    bucket?: string;
    uploadedAt?: string;
    downloadUrl?: string;
  }>;
  createdAt: string;
}

export interface WorkerHealth {
  isRunning: boolean;
  lastHeartbeat: string;
  queueLength: number;
  activeJobsCount: number;
  failedJobsCount: number;
  processedToday: number;
  globalPause: boolean;
  uptimeSeconds: number;
}

export interface MarketingAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'BLOCKED';
}

export interface OverviewStats {
  globalPause: boolean;
  totalPosts: number;
  drafts: number;
  validated: number;
  scheduled: number;
  heldForReview: number;
  published: number;
  rejected: number;
  failed: number;
  activeCampaigns: number;
  totalCampaigns: number;
  recentAuditLogs: MarketingAuditLog[];
  policyViolationsBlocked: number;
  workerHealth: WorkerHealth;
  connectedAccountsCount: number;
  pendingJobsCount: number;
  attributedLeadsCount: number;
  inboundEngagementsCount: number;
}

const API_BASE = '/api/marketing';

export const marketingApi = {
  // 1. Overview & Health
  async getOverview(): Promise<OverviewStats> {
    const res = await fetch(`${API_BASE}/overview`);
    if (!res.ok) throw new Error('Failed to fetch marketing overview');
    return res.json();
  },

  async getWorkerHealth(): Promise<WorkerHealth> {
    const res = await fetch(`${API_BASE}/worker/health`);
    if (!res.ok) throw new Error('Failed to fetch worker health');
    return res.json();
  },

  // 2. Settings & Safety
  async getSettings(): Promise<MarketingSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings: Partial<MarketingSettings>): Promise<MarketingSettings> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  async setGlobalPause(paused: boolean): Promise<{ success: boolean; globalPause: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/pause`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paused })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to toggle pause');
    }
    return res.json();
  },

  // 3. Campaigns
  async getCampaigns(): Promise<MarketingCampaign[]> {
    const res = await fetch(`${API_BASE}/campaigns`);
    if (!res.ok) throw new Error('Failed to fetch campaigns');
    return res.json();
  },

  async createCampaign(data: Partial<MarketingCampaign>): Promise<MarketingCampaign> {
    const res = await fetch(`${API_BASE}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create campaign');
    }
    return res.json();
  },

  // 4. Posts & Validation
  async getPosts(filter?: { campaignId?: string; platform?: string; state?: string; language?: string }): Promise<MarketingPost[]> {
    const params = new URLSearchParams();
    if (filter?.campaignId && filter.campaignId !== 'all') params.set('campaignId', filter.campaignId);
    if (filter?.platform && filter.platform !== 'all') params.set('platform', filter.platform);
    if (filter?.state && filter.state !== 'all') params.set('state', filter.state);
    if (filter?.language && filter.language !== 'all') params.set('language', filter.language);

    const res = await fetch(`${API_BASE}/posts?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  },

  async updatePost(id: string, updates: Partial<MarketingPost>): Promise<MarketingPost> {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update post');
    }
    return res.json();
  },

  async validatePost(id: string, caption?: string): Promise<{ validation: any; post: MarketingPost }> {
    const res = await fetch(`${API_BASE}/posts/${id}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caption })
    });
    if (!res.ok) throw new Error('Validation request failed');
    return res.json();
  },

  async setPostState(id: string, state: string, scheduledFor?: string): Promise<MarketingPost> {
    const res = await fetch(`${API_BASE}/posts/${id}/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, scheduledFor })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update post state');
    }
    return res.json();
  },

  async deletePost(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete post');
  },

  async generateAiVariants(payload: {
    topic: string;
    pillar: string;
    campaignId: string;
    targetMarket?: string;
    language?: string;
    customCta?: string;
    specificProduct?: string;
  }): Promise<{ success: boolean; postsCount: number; posts: MarketingPost[] }> {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'AI generation failed');
    }
    return res.json();
  },

  // 5. Background Jobs & Publishing Queue
  async getJobs(filter?: { status?: string }): Promise<PublishingJob[]> {
    const params = new URLSearchParams();
    if (filter?.status && filter.status !== 'all') params.set('status', filter.status);
    const res = await fetch(`${API_BASE}/jobs?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch publishing jobs');
    return res.json();
  },

  async scheduleJob(postId: string, scheduledTime: string): Promise<PublishingJob> {
    const res = await fetch(`${API_BASE}/jobs/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, scheduledTime })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to schedule job');
    }
    return res.json();
  },

  async retryJob(id: string): Promise<PublishingJob> {
    const res = await fetch(`${API_BASE}/jobs/${id}/retry`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to retry job');
    }
    return res.json();
  },

  async cancelJob(id: string): Promise<PublishingJob> {
    const res = await fetch(`${API_BASE}/jobs/${id}/cancel`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to cancel job');
    }
    return res.json();
  },

  // 6. Connected Social Accounts
  async getAccounts(): Promise<ConnectedAccount[]> {
    const res = await fetch(`${API_BASE}/accounts`);
    if (!res.ok) throw new Error('Failed to fetch connected accounts');
    return res.json();
  },

  async saveAccountCredentials(
    platform: string,
    credentials: { clientId?: string; clientSecret?: string; accessToken?: string; accountId?: string; accountName?: string }
  ): Promise<ConnectedAccount> {
    const res = await fetch(`${API_BASE}/accounts/${platform}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update account credentials');
    }
    return res.json();
  },

  async disconnectAccount(platform: string): Promise<ConnectedAccount> {
    const res = await fetch(`${API_BASE}/accounts/${platform}/disconnect`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to disconnect account');
    return res.json();
  },

  // 7. Inbound Engagement & Lead Qualification
  async getEngagements(): Promise<InboundEngagement[]> {
    const res = await fetch(`${API_BASE}/engagement`);
    if (!res.ok) throw new Error('Failed to fetch engagements');
    return res.json();
  },

  async replyEngagement(id: string, replyText: string, action: 'SEND' | 'ESCALATE' | 'IGNORED'): Promise<InboundEngagement> {
    const res = await fetch(`${API_BASE}/engagement/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ replyText, action })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to respond to engagement');
    }
    return res.json();
  },

  // 8. Attributed Leads
  async getAttributedLeads(): Promise<AttributedLeadSummary[]> {
    const res = await fetch(`${API_BASE}/leads`);
    if (!res.ok) throw new Error('Failed to fetch attributed leads');
    return res.json();
  },

  async qualifyLead(id: string, qualificationStatus: string, qualificationScore: number, qualificationNotes: string): Promise<AttributedLeadSummary> {
    const res = await fetch(`${API_BASE}/leads/${id}/qualify`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qualificationStatus, qualificationScore, qualificationNotes })
    });
    if (!res.ok) throw new Error('Failed to qualify lead');
    return res.json();
  },

  // 9. Calendar & Audit Logs
  async getCalendar(): Promise<MarketingPost[]> {
    const res = await fetch(`${API_BASE}/calendar`);
    if (!res.ok) throw new Error('Failed to fetch calendar');
    return res.json();
  },

  async getAuditLogs(): Promise<MarketingAuditLog[]> {
    const res = await fetch(`${API_BASE}/audit-logs`);
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  }
};
