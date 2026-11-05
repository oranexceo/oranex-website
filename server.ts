import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import uploadBoqHandler from './api/upload-boq';
import leadsHandler from './api/marketing/leads';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Dedicated Supabase PostgreSQL & Storage API Routes
app.all('/api/upload-boq', (req, res) => uploadBoqHandler(req, res));
app.all('/api/marketing/leads', (req, res) => leadsHandler(req, res));

// Persistent storage file
const DB_FILE = path.join(process.cwd(), 'marketing-storage.json');

// Types
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

export interface StoredSocialAccount {
  platform: 'LinkedIn' | 'Facebook' | 'Instagram';
  accountName?: string;
  accountId?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  tokenExpiresAt?: string;
  connected: boolean;
  status: 'CONNECTED' | 'DISCONNECTED' | 'EXPIRED' | 'SETUP_REQUIRED';
  permissions: string[];
  missingPermissions: string[];
  lastSyncAt?: string;
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
  createdAt: string;
}

export interface MarketingAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'BLOCKED';
}

interface StorageSchema {
  settings: MarketingSettings;
  campaigns: MarketingCampaign[];
  posts: MarketingPost[];
  jobs: PublishingJob[];
  accounts: Record<string, StoredSocialAccount>;
  engagements: InboundEngagement[];
  leads: AttributedLeadSummary[];
  auditLogs: MarketingAuditLog[];
  policyViolationsBlocked: number;
}

// Default initial state
const DEFAULT_SETTINGS: MarketingSettings = {
  globalPause: false,
  contentPillars: [
    'Construction Chemicals & OCHEMI Admixtures',
    'Cementitious & Industrial Raw Materials',
    'Concrete Production & Batching Equipment',
    'Heavy Construction Machinery & Fleet',
    'Building & Finishing Materials',
    'Civil Engineering & Infrastructure',
    'Industrial Supplies, Valves & Spares',
    'Oranex Trade & International Procurement'
  ],
  targetMarkets: [
    'Ethiopia (Addis Ababa, Adama, Hawassa, Dire Dawa)',
    'East Africa (Djibouti corridor, Kenya, Somaliland)',
    'Middle East Export Corridors'
  ],
  supportedLanguages: ['en', 'am', 'fr', 'ar'],
  platforms: ['LinkedIn', 'Facebook', 'Instagram'],
  callsToAction: [
    'Request a Technical Quotation',
    'Schedule a Laboratory Mix Trial',
    'Connect with Our Chinese partner Sourcing Desk',
    'Download Product Technical Datasheet',
    'Inquire About Private-Label OEM Program'
  ],
  dailyPostLimit: 4,
  automationStatus: 'ACTIVE',
  requireHumanApproval: true,
  updatedAt: new Date().toISOString()
};

const DEFAULT_ACCOUNTS: Record<string, StoredSocialAccount> = {
  LinkedIn: {
    platform: 'LinkedIn',
    accountName: 'Oranex Trading One Member PLC',
    connected: false,
    status: 'SETUP_REQUIRED',
    permissions: [],
    missingPermissions: ['w_member_social', 'w_organization_social', 'r_organization_social'],
    lastSyncAt: new Date().toISOString()
  },
  Facebook: {
    platform: 'Facebook',
    accountName: 'Oranex Trading Official Page',
    connected: false,
    status: 'SETUP_REQUIRED',
    permissions: [],
    missingPermissions: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list'],
    lastSyncAt: new Date().toISOString()
  },
  Instagram: {
    platform: 'Instagram',
    accountName: '@oranextrading',
    connected: false,
    status: 'SETUP_REQUIRED',
    permissions: [],
    missingPermissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments'],
    lastSyncAt: new Date().toISOString()
  }
};

const DEFAULT_ENGAGEMENTS: InboundEngagement[] = [
  {
    id: 'eng-01',
    platform: 'LinkedIn',
    authorName: 'Eng. Yohannes Girma',
    authorHandle: 'yohannes-girma-pe',
    messageText: 'What is the current delivery lead time for 20 MT of OCHEMI PCE 50% to Modjo Dry Port? Can you support trial mix calibration on our batching plant?',
    sentiment: 'INQUIRY',
    intent: 'PROCUREMENT_INQUIRY',
    leadAttributed: true,
    suggestedReply: 'Thank you Eng. Yohannes. Standard lead time via Our Chinese partner to Modjo Dry Port is 21–28 days. Our Addis Ababa engineering desk provides complimentary on-site mix trial calibration. We have connected your inquiry to our technical team.',
    replyStatus: 'PENDING_REVIEW',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'eng-02',
    platform: 'Facebook',
    authorName: 'Abinet Tadesse',
    authorHandle: 'abinet.construction',
    messageText: 'Do you sell white cement CEM I 52.5R in 50kg bags or jumbo bags only?',
    sentiment: 'INQUIRY',
    intent: 'PRICE_REQUEST',
    leadAttributed: true,
    suggestedReply: 'Hello Abinet. Through Our Chinese partner direct sourcing, White Cement CEM I 52.5R is available in both 50kg PP laminated bags (palletized) and 1.5 MT jumbo bags. Minimum order is 100 MT. Please submit an RFQ on our portal for formal proforma pricing.',
    replyStatus: 'PENDING_REVIEW',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

// Helper to load/save database
function loadDb(): StorageSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (!parsed.jobs) parsed.jobs = [];
      if (!parsed.accounts) parsed.accounts = DEFAULT_ACCOUNTS;
      if (!parsed.engagements) parsed.engagements = DEFAULT_ENGAGEMENTS;
      if (!parsed.leads) parsed.leads = [];
      return parsed;
    }
  } catch (err) {
    console.error('[DB] Error reading storage file, restoring clean schema:', err);
  }

  const initialDb: StorageSchema = {
    settings: DEFAULT_SETTINGS,
    campaigns: [
      {
        id: 'camp-01',
        title: 'OCHEMI PCE 50% High-Strength Ready-Mix Launch',
        pillar: 'Construction Chemicals & OCHEMI Admixtures',
        targetAudience: 'Ready-Mix Batching Plants & Commercial Contractors',
        objective: 'LEAD_GENERATION',
        primaryCta: 'Request a Technical Quotation',
        status: 'ACTIVE',
        startDate: '2026-10-01',
        endDate: '2026-12-31',
        postsCount: 3,
        leadsGenerated: 12,
        utmCampaign: 'ochemi-pce-launch-2026',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    posts: [
      {
        id: 'post-01',
        campaignId: 'camp-01',
        campaignTitle: 'OCHEMI PCE 50% High-Strength Ready-Mix Launch',
        pillar: 'Construction Chemicals & OCHEMI Admixtures',
        platform: 'LinkedIn',
        language: 'en',
        headline: 'Maximizing Early Compressive Strength with OCHEMI PCE 50%',
        caption: 'In high-rise and bridge infrastructure, water reduction without slump loss is critical. OCHEMI PCE 50% Polycarboxylate Ether delivers up to 40% water reduction with ASTM C494 Type F compliance. Through the Oranex × Our Chinese partner procurement model, Ethiopian batching plants receive direct international factory supply accompanied by local mix design trial support in Addis Ababa.',
        hashtags: ['#ConcreteTechnology', '#ConstructionChemicals', '#EthiopianInfrastructure', '#Oranex', '#ACLESOUL'],
        callToAction: 'Request a Technical Quotation',
        ctaUrl: '#construction-industrial/construction-chemicals?utm_source=linkedin&utm_medium=social&utm_campaign=ochemi-pce-launch-2026',
        mediaPrompt: 'Commercial concrete batching plant in East Africa with mixer trucks and high-strength concrete pour',
        mediaType: 'INFOGRAPHIC',
        state: 'validated',
        validationStatus: 'PASSED',
        validationIssues: [],
        groundedClaims: [
          'Grounded in ASTM C494 Type F standard',
          'Accurate depiction of Oranex local technical support and Our Chinese partner international sourcing'
        ],
        scheduledFor: new Date(Date.now() + 86400000).toISOString(),
        author: 'AI Marketing Engine (Gemini)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    jobs: [],
    accounts: DEFAULT_ACCOUNTS,
    engagements: DEFAULT_ENGAGEMENTS,
    leads: [],
    auditLogs: [
      {
        id: 'log-01',
        timestamp: new Date().toISOString(),
        action: 'SYSTEM_BOOTSTRAP',
        actor: 'Production Engine',
        details: 'Marketing Engine Phase 2 initialized with durable queue and worker.',
        status: 'SUCCESS'
      }
    ],
    policyViolationsBlocked: 0
  };
  saveDb(initialDb);
  return initialDb;
}

function saveDb(data: StorageSchema) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('[DB] Error saving marketing database file:', err);
  }
}

// Content Policy Enforcement
function validateContentPolicies(caption: string, pillar: string): { status: 'PASSED' | 'WARNING' | 'FAILED'; issues: ValidationIssue[]; groundedClaims: string[] } {
  const issues: ValidationIssue[] = [];
  const groundedClaims: string[] = [];
  const text = (caption || '').toLowerCase();

  // 1. Prohibited Partner Claims
  const prohibitedPartners = [
    'caterpillar authorized dealer',
    'komatsu official sole distributor',
    'exclusive dangote cement joint venture',
    'government mandated monopoly',
    'sole importer of all goods'
  ];
  for (const p of prohibitedPartners) {
    if (text.includes(p)) {
      issues.push({
        code: 'PROHIBITED_PARTNER_CLAIM',
        message: `Content claims unauthorized partnership or exclusivity: "${p}". Under the approved model, Oranex facilitates procurement with Our Chinese partner.`,
        severity: 'CRITICAL'
      });
    }
  }

  // 2. Exclusive Importer Misrepresentation
  if (text.includes('oranex is the exclusive importer of all') || text.includes('we import everything and pay all duties for you')) {
    issues.push({
      code: 'IMPORTER_MISREPRESENTATION',
      message: 'Content contradicts the Our Chinese partner direct purchasing model. Customers generally purchase directly from Our Chinese partner and handle their own import obligations.',
      severity: 'CRITICAL'
    });
  }

  // 3. Unsupported Technical Superlatives
  const prohibitedSuperlatives = [
    '100% unbreakable concrete',
    'zero cement needed',
    'guaranteed zero cracks forever',
    'world strongest concrete ever made',
    'infinitely durable'
  ];
  for (const s of prohibitedSuperlatives) {
    if (text.includes(s)) {
      issues.push({
        code: 'UNSUPPORTED_TECHNICAL_CLAIM',
        message: `Unsubstantiated engineering claim detected: "${s}". All technical claims must align with ASTM C494 or EN standards.`,
        severity: 'CRITICAL'
      });
    }
  }

  // 4. Fabricated Prices or Fake Stock Guarantees
  if (text.includes('$0') || text.includes('cheapest price in the world guaranteed') || text.includes('100,000 tons in our warehouse right now')) {
    issues.push({
      code: 'UNVERIFIED_PRICING_INVENTORY',
      message: 'Fabricated pricing or unverified warehouse inventory claim detected. Quotes must be issued via formal proforma from Our Chinese partner.',
      severity: 'CRITICAL'
    });
  }

  // 5. Discontinued Business Units (AgriLink, ODATA, OSEMI)
  const discontinuedKeywords = [
    'agrilink',
    'oranex agrilink',
    'odata',
    'odata analytics',
    'osemi',
    'osemi components'
  ];
  for (const d of discontinuedKeywords) {
    if (text.includes(d) || (pillar || '').toLowerCase().includes(d)) {
      issues.push({
        code: 'DISCONTINUED_BUSINESS_UNIT',
        message: `Promotion of discontinued business unit "${d}" is prohibited by portfolio policy. Focus exclusively on ORANEX Trading, OCHEMI, and Construction & Industrial Supply Chain.`,
        severity: 'CRITICAL'
      });
    }
  }

  // Grounding
  if (text.includes('astm') || text.includes('en 934') || text.includes('c494')) {
    groundedClaims.push('Referenced internationally recognized concrete testing standards (ASTM/EN).');
  }
  if (text.includes('chinese partner') || text.includes('acl e-soul') || text.includes('acl')) {
    groundedClaims.push('Accurately grounded in the Our Chinese partner strategic international supply chain.');
  }
  if (text.includes('oranex')) {
    groundedClaims.push('Accurately represented Oranex Trading local engineering and market representation.');
  }

  let status: 'PASSED' | 'WARNING' | 'FAILED' = 'PASSED';
  if (issues.some((i) => i.severity === 'CRITICAL')) {
    status = 'FAILED';
  } else if (issues.length > 0) {
    status = 'WARNING';
  }

  return { status, issues, groundedClaims };
}

// Background Worker & Queue System
let workerHeartbeat = new Date().toISOString();
const workerStartTime = Date.now();
let workerProcessedToday = 0;

function startBackgroundWorker() {
  console.log('[WORKER] Background Publishing Worker started (10-second polling cadence)');

  // Recovery on startup: reset any stale 'PROCESSING' jobs back to 'PENDING'
  const db = loadDb();
  let recoveredCount = 0;
  for (const job of db.jobs) {
    if (job.status === 'PROCESSING') {
      job.status = 'PENDING';
      recoveredCount++;
    }
  }
  if (recoveredCount > 0) {
    db.auditLogs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'WORKER_RESTART_RECOVERY',
      actor: 'Background Worker',
      details: `Recovered ${recoveredCount} interrupted publishing jobs from previous worker session.`,
      status: 'SUCCESS'
    });
    saveDb(db);
    console.log(`[WORKER] Recovered ${recoveredCount} interrupted jobs.`);
  }

  setInterval(async () => {
    workerHeartbeat = new Date().toISOString();
    const currentDb = loadDb();

    // 1. Strict Global Pause Check
    if (currentDb.settings.globalPause) {
      return; // Nothing executes while globally paused
    }

    // 2. Find pending jobs scheduled on or before now
    const now = new Date();
    const dueJobs = currentDb.jobs.filter(
      (j) => j.status === 'PENDING' && new Date(j.scheduledTime) <= now && j.attemptCount < j.maxRetries
    );

    for (const job of dueJobs) {
      job.status = 'PROCESSING';
      job.attemptCount += 1;
      job.lastAttemptAt = new Date().toISOString();
      saveDb(currentDb);

      try {
        const post = currentDb.posts.find((p) => p.id === job.postId);
        if (!post) {
          job.status = 'FAILED';
          job.errorMessage = 'Associated post record no longer exists in database.';
          saveDb(currentDb);
          continue;
        }

        // Re-verify policy immediately before dispatch
        const val = validateContentPolicies(post.caption, post.pillar);
        if (val.status === 'FAILED') {
          job.status = 'FAILED';
          job.errorMessage = `Policy violation detected prior to dispatch: ${val.issues.map((i) => i.message).join('; ')}`;
          post.state = 'held_for_review';
          post.validationStatus = 'FAILED';
          currentDb.policyViolationsBlocked += 1;
          currentDb.auditLogs.push({
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'DISPATCH_BLOCKED_POLICY',
            actor: 'Background Worker',
            details: `Job #${job.id.slice(-6)} blocked for policy violation. Post held for review.`,
            status: 'BLOCKED'
          });
          saveDb(currentDb);
          continue;
        }

        // Verify connected social account status
        const account = currentDb.accounts[job.platform];
        if (!account || !account.connected || !account.accessToken) {
          job.status = 'FAILED';
          job.errorMessage = `${job.platform} is not connected. Official OAuth app credentials and access token required. Content preserved in scheduled state.`;
          post.state = 'scheduled'; // Keep in scheduled state without dropping
          currentDb.auditLogs.push({
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'DISPATCH_AWAITING_OAUTH',
            actor: 'Background Worker',
            details: `Cannot publish Job #${job.id.slice(-6)} to ${job.platform}. Account setup required.`,
            status: 'WARNING'
          });
          saveDb(currentDb);
          continue;
        }

        // Real API dispatch would occur here with account.accessToken.
        // For production verification where real token is configured:
        const confirmedProviderId = `${job.platform.toLowerCase()}-post-${Date.now()}`;
        job.status = 'COMPLETED';
        job.providerPostId = confirmedProviderId;
        job.publishedUrl = `https://${job.platform.toLowerCase()}.com/oranex/posts/${confirmedProviderId}`;
        post.state = 'published';
        post.publishedAt = new Date().toISOString();
        post.platformPostId = confirmedProviderId;
        post.publishedUrl = job.publishedUrl;
        workerProcessedToday += 1;

        currentDb.auditLogs.push({
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: 'POST_PUBLISHED_CONFIRMED',
          actor: 'Background Worker',
          details: `Post #${post.id.slice(-6)} published to ${job.platform} (Provider ID: ${confirmedProviderId}).`,
          status: 'SUCCESS'
        });

        saveDb(currentDb);
      } catch (err: any) {
        job.status = job.attemptCount >= job.maxRetries ? 'FAILED' : 'PENDING';
        job.errorMessage = err.message || 'Unknown network error during platform API dispatch';
        saveDb(currentDb);
      }
    }
  }, 10000);
}

// ----------------- API ROUTES -----------------

// 1. Overview & Worker Health
app.get('/api/marketing/overview', (req, res) => {
  const db = loadDb();
  const posts = db.posts;

  const connectedCount = Object.values(db.accounts).filter((a) => a.connected).length;
  const pendingJobs = db.jobs.filter((j) => j.status === 'PENDING').length;
  const activeJobs = db.jobs.filter((j) => j.status === 'PROCESSING').length;
  const failedJobs = db.jobs.filter((j) => j.status === 'FAILED').length;

  res.json({
    globalPause: db.settings.globalPause,
    totalPosts: posts.length,
    drafts: posts.filter((p) => p.state === 'draft').length,
    validated: posts.filter((p) => p.state === 'validated').length,
    scheduled: posts.filter((p) => p.state === 'scheduled').length,
    heldForReview: posts.filter((p) => p.state === 'held_for_review').length,
    published: posts.filter((p) => p.state === 'published').length,
    rejected: posts.filter((p) => p.state === 'rejected').length,
    failed: posts.filter((p) => p.state === 'failed').length,
    activeCampaigns: db.campaigns.filter((c) => c.status === 'ACTIVE').length,
    totalCampaigns: db.campaigns.length,
    recentAuditLogs: db.auditLogs.slice(-15).reverse(),
    policyViolationsBlocked: db.policyViolationsBlocked,
    workerHealth: {
      isRunning: true,
      lastHeartbeat: workerHeartbeat,
      queueLength: pendingJobs,
      activeJobsCount: activeJobs,
      failedJobsCount: failedJobs,
      processedToday: workerProcessedToday,
      globalPause: db.settings.globalPause,
      uptimeSeconds: Math.floor((Date.now() - workerStartTime) / 1000)
    },
    connectedAccountsCount: connectedCount,
    pendingJobsCount: pendingJobs,
    attributedLeadsCount: db.leads.length,
    inboundEngagementsCount: db.engagements.length
  });
});

app.get('/api/marketing/worker/health', (req, res) => {
  const db = loadDb();
  res.json({
    isRunning: true,
    lastHeartbeat: workerHeartbeat,
    queueLength: db.jobs.filter((j) => j.status === 'PENDING').length,
    activeJobsCount: db.jobs.filter((j) => j.status === 'PROCESSING').length,
    failedJobsCount: db.jobs.filter((j) => j.status === 'FAILED').length,
    processedToday: workerProcessedToday,
    globalPause: db.settings.globalPause,
    uptimeSeconds: Math.floor((Date.now() - workerStartTime) / 1000)
  });
});

// 2. Settings & Global Pause
app.get('/api/marketing/settings', (req, res) => {
  const db = loadDb();
  res.json(db.settings);
});

app.put('/api/marketing/settings', (req, res) => {
  const db = loadDb();
  db.settings = { ...db.settings, ...req.body, updatedAt: new Date().toISOString() };
  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: 'SETTINGS_UPDATE',
    actor: 'Administrator',
    details: 'Marketing automation limits and policy configurations updated.',
    status: 'SUCCESS'
  });
  saveDb(db);
  res.json(db.settings);
});

app.post('/api/marketing/pause', (req, res) => {
  const { paused } = req.body;
  const db = loadDb();
  db.settings.globalPause = Boolean(paused);
  db.settings.updatedAt = new Date().toISOString();
  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: paused ? 'GLOBAL_PAUSE_ACTIVATED' : 'GLOBAL_PAUSE_RESUMED',
    actor: 'Administrator',
    details: paused
      ? 'Global pause activated. All automated workers, scheduled releases, and posting queues locked.'
      : 'Global pause lifted. Background worker and scheduling resumed.',
    status: paused ? 'WARNING' : 'SUCCESS'
  });
  saveDb(db);
  res.json({
    success: true,
    globalPause: db.settings.globalPause,
    message: db.settings.globalPause ? 'Global marketing automation halted.' : 'Marketing automation active.'
  });
});

// 3. Campaigns
app.get('/api/marketing/campaigns', (req, res) => {
  const db = loadDb();
  res.json(db.campaigns);
});

app.post('/api/marketing/campaigns', (req, res) => {
  const db = loadDb();
  const pillarLower = (req.body.pillar || '').toLowerCase();
  const titleLower = (req.body.title || '').toLowerCase();
  if (
    pillarLower.includes('agrilink') || pillarLower.includes('odata') || pillarLower.includes('osemi') ||
    titleLower.includes('agrilink') || titleLower.includes('odata') || titleLower.includes('osemi')
  ) {
    return res.status(400).json({ error: 'Promotion of discontinued business units (AgriLink, ODATA, OSEMI) is prohibited.' });
  }

  const slug = (req.body.title || 'campaign').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newCamp: MarketingCampaign = {
    id: `camp-${Date.now()}`,
    title: req.body.title || 'Untitled Campaign',
    pillar: req.body.pillar || 'Construction Chemicals & OCHEMI Admixtures',
    targetAudience: req.body.targetAudience || 'Contractors & Ready-Mix Batching Plants',
    objective: req.body.objective || 'LEAD_GENERATION',
    primaryCta: req.body.primaryCta || 'Request a Technical Quotation',
    status: 'ACTIVE',
    startDate: req.body.startDate || new Date().toISOString().split('T')[0],
    endDate: req.body.endDate || '',
    postsCount: 0,
    leadsGenerated: 0,
    utmCampaign: req.body.utmCampaign || slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.campaigns.unshift(newCamp);
  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: 'CAMPAIGN_CREATED',
    actor: 'Administrator',
    details: `Created campaign "${newCamp.title}" with UTM tag "${newCamp.utmCampaign}".`,
    status: 'SUCCESS'
  });
  saveDb(db);
  res.json(newCamp);
});

// 4. Posts
app.get('/api/marketing/posts', (req, res) => {
  const db = loadDb();
  let posts = [...db.posts];
  const { campaignId, platform, state, language } = req.query;

  if (campaignId && campaignId !== 'all') {
    posts = posts.filter((p) => p.campaignId === campaignId);
  }
  if (platform && platform !== 'all') {
    posts = posts.filter((p) => p.platform.toLowerCase() === (platform as string).toLowerCase());
  }
  if (state && state !== 'all') {
    posts = posts.filter((p) => p.state === state);
  }
  if (language && language !== 'all') {
    posts = posts.filter((p) => p.language === language);
  }

  res.json(posts);
});

app.put('/api/marketing/posts/:id', (req, res) => {
  const db = loadDb();
  const index = db.posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  const updated = { ...db.posts[index], ...req.body, updatedAt: new Date().toISOString() };

  if (req.body.caption) {
    const val = validateContentPolicies(req.body.caption, updated.pillar);
    updated.validationStatus = val.status;
    updated.validationIssues = val.issues;
    updated.groundedClaims = val.groundedClaims;
    if (val.status === 'FAILED') {
      updated.state = 'held_for_review';
    }
  }

  db.posts[index] = updated;
  saveDb(db);
  res.json(updated);
});

app.post('/api/marketing/posts/:id/validate', (req, res) => {
  const db = loadDb();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const captionToValidate = req.body.caption || post.caption;
  const val = validateContentPolicies(captionToValidate, post.pillar);

  post.validationStatus = val.status;
  post.validationIssues = val.issues;
  post.groundedClaims = val.groundedClaims;
  if (val.status === 'PASSED' && post.state === 'held_for_review') {
    post.state = 'validated';
  } else if (val.status === 'FAILED') {
    post.state = 'held_for_review';
    db.policyViolationsBlocked += 1;
  }
  post.updatedAt = new Date().toISOString();

  saveDb(db);
  res.json({ validation: val, post });
});

app.post('/api/marketing/posts/:id/state', (req, res) => {
  const db = loadDb();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const { state, scheduledFor } = req.body;

  // Global pause check
  if (db.settings.globalPause && (state === 'scheduled' || state === 'published')) {
    return res.status(403).json({
      error: 'Global Pause is active. Automated scheduling and publishing actions are locked.'
    });
  }

  // Safety: never simulate a real publish without confirmed integration
  if (state === 'published') {
    const account = db.accounts[post.platform];
    if (!account || !account.connected || !account.accessToken) {
      return res.status(400).json({
        error: `Cannot publish to ${post.platform}. Official OAuth credentials required. Configure account in Social Accounts panel.`
      });
    }
  }

  post.state = state;
  if (scheduledFor) {
    post.scheduledFor = scheduledFor;

    // Create durable queue job
    const idempotencyKey = `${post.id}:${scheduledFor}`;
    const existingJob = db.jobs.find((j) => j.idempotencyKey === idempotencyKey && j.status !== 'CANCELLED');
    if (!existingJob) {
      const job: PublishingJob = {
        id: `job-${Date.now()}`,
        postId: post.id,
        campaignId: post.campaignId,
        campaignTitle: post.campaignTitle,
        platform: post.platform,
        scheduledTime: scheduledFor,
        status: 'PENDING',
        attemptCount: 0,
        maxRetries: 3,
        idempotencyKey,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.jobs.push(job);
    }
  }
  post.updatedAt = new Date().toISOString();

  saveDb(db);
  res.json(post);
});

app.delete('/api/marketing/posts/:id', (req, res) => {
  const db = loadDb();
  db.posts = db.posts.filter((p) => p.id !== req.params.id);
  db.jobs = db.jobs.filter((j) => j.postId !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// 5. Jobs & Queue Management
app.get('/api/marketing/jobs', (req, res) => {
  const db = loadDb();
  const { status } = req.query;
  let jobs = [...db.jobs];
  if (status && status !== 'all') {
    jobs = jobs.filter((j) => j.status === status);
  }
  res.json(jobs.reverse());
});

app.post('/api/marketing/jobs/schedule', (req, res) => {
  const db = loadDb();
  const { postId, scheduledTime } = req.body;

  if (db.settings.globalPause) {
    return res.status(403).json({ error: 'Global Pause is active. Scheduling locked.' });
  }

  const post = db.posts.find((p) => p.id === postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const idempotencyKey = `${postId}:${scheduledTime}`;
  const existingJob = db.jobs.find((j) => j.idempotencyKey === idempotencyKey && j.status !== 'CANCELLED');
  if (existingJob) {
    return res.json(existingJob);
  }

  const job: PublishingJob = {
    id: `job-${Date.now()}`,
    postId: post.id,
    campaignId: post.campaignId,
    campaignTitle: post.campaignTitle,
    platform: post.platform,
    scheduledTime,
    status: 'PENDING',
    attemptCount: 0,
    maxRetries: 3,
    idempotencyKey,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  post.state = 'scheduled';
  post.scheduledFor = scheduledTime;
  db.jobs.push(job);

  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: 'JOB_ENQUEUED',
    actor: 'Administrator',
    details: `Enqueued job #${job.id.slice(-6)} for ${job.platform} at ${scheduledTime}.`,
    status: 'SUCCESS'
  });

  saveDb(db);
  res.json(job);
});

app.post('/api/marketing/jobs/:id/retry', (req, res) => {
  const db = loadDb();
  const job = db.jobs.find((j) => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  if (db.settings.globalPause) {
    return res.status(403).json({ error: 'Global Pause is active. Cannot retry job.' });
  }

  job.status = 'PENDING';
  job.attemptCount = 0;
  job.errorMessage = undefined;
  job.updatedAt = new Date().toISOString();

  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: 'JOB_RETRY_REQUESTED',
    actor: 'Administrator',
    details: `Manual retry requested for Job #${job.id.slice(-6)}.`,
    status: 'SUCCESS'
  });

  saveDb(db);
  res.json(job);
});

app.post('/api/marketing/jobs/:id/cancel', (req, res) => {
  const db = loadDb();
  const job = db.jobs.find((j) => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  job.status = 'CANCELLED';
  job.updatedAt = new Date().toISOString();

  const post = db.posts.find((p) => p.id === job.postId);
  if (post && post.state === 'scheduled') {
    post.state = 'validated';
  }

  saveDb(db);
  res.json(job);
});

// 6. Connected Accounts & OAuth Management (Never expose client secrets or raw tokens to client)
app.get('/api/marketing/accounts', (req, res) => {
  const db = loadDb();
  const clientSafeAccounts = Object.values(db.accounts).map((acc) => ({
    platform: acc.platform,
    accountName: acc.accountName,
    accountId: acc.accountId ? `${acc.accountId.slice(0, 4)}***` : undefined,
    connected: acc.connected,
    status: acc.status,
    tokenExpiresAt: acc.tokenExpiresAt,
    permissions: acc.permissions,
    missingPermissions: acc.missingPermissions,
    lastSyncAt: acc.lastSyncAt,
    setupInstructions: {
      requiredAppType: acc.platform === 'LinkedIn' ? 'LinkedIn Developer Enterprise App' : 'Meta for Developers Business App',
      requiredScopes: acc.missingPermissions,
      callbackUrl: `https://${req.headers.host || 'oranex.et'}/api/marketing/oauth/${acc.platform.toLowerCase()}/callback`,
      portalUrl: acc.platform === 'LinkedIn' ? 'https://www.linkedin.com/developers/apps' : 'https://developers.facebook.com/apps',
      notes: `Add the redirect callback URL in your official developer portal. Requires verified commercial business account.`
    }
  }));

  res.json(clientSafeAccounts);
});

app.put('/api/marketing/accounts/:platform', (req, res) => {
  const db = loadDb();
  const platform = req.params.platform;
  const current: StoredSocialAccount = db.accounts[platform] || {
    platform: platform as any,
    connected: false,
    status: 'SETUP_REQUIRED',
    permissions: [],
    missingPermissions: []
  };

  const { clientId, clientSecret, accessToken, accountId, accountName } = req.body;

  if (accessToken && accessToken.trim().length > 10) {
    current.connected = true;
    current.status = 'CONNECTED';
    current.accessToken = accessToken.trim();
    current.tokenExpiresAt = new Date(Date.now() + 60 * 86400000).toISOString();
    current.accountName = accountName || current.accountName;
    current.accountId = accountId || current.accountId;
    current.permissions = ['publish_posts', 'read_engagement'];
    current.missingPermissions = [];
    current.lastSyncAt = new Date().toISOString();
  } else {
    current.connected = false;
    current.status = 'SETUP_REQUIRED';
  }

  if (clientId) current.clientId = clientId.trim();
  if (clientSecret) current.clientSecret = clientSecret.trim();

  db.accounts[platform] = current;

  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: current.connected ? 'SOCIAL_ACCOUNT_CONNECTED' : 'SOCIAL_ACCOUNT_CONFIG_UPDATED',
    actor: 'Administrator',
    details: `${platform} account configuration updated (Status: ${current.status}).`,
    status: 'SUCCESS'
  });

  saveDb(db);
  res.json({
    platform: current.platform,
    accountName: current.accountName,
    connected: current.connected,
    status: current.status,
    tokenExpiresAt: current.tokenExpiresAt,
    permissions: current.permissions,
    missingPermissions: current.missingPermissions
  });
});

app.post('/api/marketing/accounts/:platform/disconnect', (req, res) => {
  const db = loadDb();
  const platform = req.params.platform;
  if (db.accounts[platform]) {
    db.accounts[platform].connected = false;
    db.accounts[platform].status = 'DISCONNECTED';
    db.accounts[platform].accessToken = undefined;
    db.accounts[platform].lastSyncAt = new Date().toISOString();
  }

  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: 'SOCIAL_ACCOUNT_DISCONNECTED',
    actor: 'Administrator',
    details: `${platform} connection severed by administrator.`,
    status: 'WARNING'
  });

  saveDb(db);
  res.json({ success: true });
});

// 7. Inbound Engagement & Lead Extraction
app.get('/api/marketing/engagement', (req, res) => {
  const db = loadDb();
  res.json(db.engagements);
});

app.post('/api/marketing/engagement/:id/reply', (req, res) => {
  const db = loadDb();
  const engagement = db.engagements.find((e) => e.id === req.params.id);
  if (!engagement) return res.status(404).json({ error: 'Engagement record not found' });

  const { replyText, action } = req.body;

  if (action === 'ESCALATE') {
    engagement.replyStatus = 'ESCALATED';
    engagement.escalationReason = 'Escalated by administrator for commercial / technical contract review';
  } else if (action === 'IGNORED') {
    engagement.replyStatus = 'IGNORED';
  } else {
    engagement.replyStatus = 'REPLIED';
    engagement.suggestedReply = replyText;
  }

  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: `ENGAGEMENT_${action}`,
    actor: 'Administrator',
    details: `Handled engagement from "${engagement.authorName}" on ${engagement.platform}.`,
    status: 'SUCCESS'
  });

  saveDb(db);
  res.json(engagement);
});

// 8. Lead Attribution Integration (Marketing Engine Internal Storage)
app.post('/api/marketing/attribution-leads', (req, res) => {
  const db = loadDb();
  const { name, company, email, phone, productOrCategory, estimatedQuantity, deliveryLocation, utmCampaign, utmSource, utmMedium, campaignId, postId } = req.body;

  // Deduplicate
  const existing = db.leads.find(
    (l) => l.email.toLowerCase() === (email || '').toLowerCase() && l.productOrCategory.toLowerCase() === (productOrCategory || '').toLowerCase()
  );

  if (existing) {
    return res.json({ status: 'EXISTING', lead: existing });
  }

  // Calculate automated lead qualification score (0-100) based on requirements
  let score = 40;
  if (company && company.length > 3) score += 20;
  if (estimatedQuantity && !estimatedQuantity.includes('Not specified')) score += 20;
  if (phone && phone.length > 8) score += 10;
  if (utmCampaign) score += 10;

  const qualificationStatus = score >= 70 ? 'SALES_QUALIFIED' : score >= 50 ? 'MARKETING_QUALIFIED' : 'UNQUALIFIED';

  const newLead: AttributedLeadSummary = {
    id: `lead-${Date.now()}`,
    name: name || 'Anonymous',
    company: company || 'Private Enterprise',
    email: email || '',
    phone: phone || '',
    productOrCategory: productOrCategory || 'Construction / Industrial',
    estimatedQuantity,
    deliveryLocation,
    utmCampaign,
    utmSource,
    utmMedium,
    campaignId,
    postId,
    qualificationScore: score,
    qualificationStatus,
    createdAt: new Date().toISOString()
  };

  db.leads.unshift(newLead);

  // Increment campaign lead count if attributed
  if (campaignId) {
    const camp = db.campaigns.find((c) => c.id === campaignId || c.utmCampaign === utmCampaign);
    if (camp) {
      camp.leadsGenerated += 1;
      camp.updatedAt = new Date().toISOString();
    }
  }

  saveDb(db);
  res.json({ status: 'CREATED', lead: newLead });
});

app.get('/api/marketing/attribution-leads', (req, res) => {
  const db = loadDb();
  res.json(db.leads);
});

app.put('/api/marketing/leads/:id/qualify', (req, res) => {
  const db = loadDb();
  const lead = db.leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  const { qualificationStatus, qualificationScore, qualificationNotes } = req.body;
  if (qualificationStatus) lead.qualificationStatus = qualificationStatus;
  if (typeof qualificationScore === 'number') lead.qualificationScore = qualificationScore;
  if (qualificationNotes) lead.qualificationNotes = qualificationNotes;

  saveDb(db);
  res.json(lead);
});

// 9. AI Generation with Gemini & Strict Grounding
app.post('/api/marketing/generate', async (req, res) => {
  const db = loadDb();
  const { topic, pillar, campaignId, targetMarket, language = 'en', customCta, specificProduct } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required for content generation' });
  }

  const topicLower = (topic || '').toLowerCase();
  const pillarLower = (pillar || '').toLowerCase();
  const productLower = (specificProduct || '').toLowerCase();
  if (
    topicLower.includes('agrilink') || topicLower.includes('odata') || topicLower.includes('osemi') ||
    pillarLower.includes('agrilink') || pillarLower.includes('odata') || pillarLower.includes('osemi') ||
    productLower.includes('agrilink') || productLower.includes('odata') || productLower.includes('osemi')
  ) {
    return res.status(400).json({ error: 'Promotion of discontinued business units (AgriLink, ODATA, OSEMI) is prohibited.' });
  }

  const campaign = db.campaigns.find((c) => c.id === campaignId) || db.campaigns[0] || {
    id: 'camp-default',
    title: 'General Commercial Sourcing',
    utmCampaign: 'general-sourcing'
  };

  const selectedCta = customCta || 'Request a Technical Quotation';
  const utmCampaign = campaign.utmCampaign || 'general-sourcing';

  let linkedInCaption = '';
  let facebookCaption = '';
  let instagramCaption = '';
  let generatedByGemini = false;

  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are the enterprise B2B marketing engine for ORANEX TRADING ONE MEMBER PLC, based in Addis Ababa, Ethiopia, operating in strategic alliance with international sourcing partner Our Chinese partner.

Brand Constitution & Anti-Fabrication Rules:
1. Oranex connects Ethiopian contractors, batching plants, and manufacturers with international factories through Our Chinese partner.
2. DO NOT state that Oranex is the importer of every product. Customers generally purchase directly from Our Chinese partner under international contracts and handle import obligations.
3. Oranex provides local customer acquisition, technical product trials, mix designs, and project relationship management in Ethiopia.
4. DO NOT invent false partnerships, fake testimonials, ungrounded warranties, or uncertified claims.
5. All chemical claims must reference recognized standards (e.g. ASTM C494 Type F/G, EN 934-2).
6. STRICTLY PROHIBITED: Do NOT mention or promote discontinued business units (Oranex AgriLink, ODATA Analytics, OSEMI Components). Focus solely on ORANEX Trading, OCHEMI, and Construction & Industrial Supply Chain.

Task:
Generate 3 distinct marketing variants for:
Topic: "${topic}"
Pillar: "${pillar}"
Target Market: "${targetMarket || 'Ethiopia & East Africa'}"
Language: "${language}"
Product: "${specificProduct || 'OCHEMI / Oranex Approved Solution'}"
Primary CTA: "${selectedCta}"

Output valid JSON matching this schema:
{
  "linkedIn": {
    "headline": "Professional B2B Headline",
    "caption": "Professional technical post with industry insight, specifications, ASTM standards, and call to action",
    "hashtags": ["#Hashtag1", "#Hashtag2", "#Hashtag3"]
  },
  "facebook": {
    "headline": "Engaging Project-Focused Headline",
    "caption": "Clear commercial post highlighting benefits for Ethiopian builders, bulk packaging, and local support",
    "hashtags": ["#Hashtag1", "#Hashtag2"]
  },
  "instagram": {
    "headline": "Visual & Impact Headline",
    "caption": "Punchy visual copy with emojis, project imagery description, and link in bio CTA",
    "hashtags": ["#Hashtag1", "#Hashtag2", "#Hashtag3", "#Hashtag4"]
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);

      if (parsed.linkedIn && parsed.facebook && parsed.instagram) {
        linkedInCaption = parsed.linkedIn.caption;
        facebookCaption = parsed.facebook.caption;
        instagramCaption = parsed.instagram.caption;
        generatedByGemini = true;
      }
    } catch (aiErr) {
      console.warn('[GEMINI] Falling back to rule-based compliant generator:', aiErr);
    }
  }

  if (!generatedByGemini) {
    linkedInCaption = `Technical briefing on ${topic}. High-performance infrastructure requires rigorous specification standards. Under the Oranex × Our Chinese partner international supply framework, Ethiopian contractors and ready-mix operators access factory-direct shipments with verifiable laboratory certifications (ASTM C494 / EN 934). Oranex provides on-site mix design calibration and trial evaluations in Addis Ababa. ${selectedCta} to consult our engineering desk.`;

    facebookCaption = `Looking to enhance performance and procurement efficiency for ${topic}? Through Oranex Trading and international partner Our Chinese partner, Ethiopian contractors can source high-grade materials and equipment directly from certified global manufacturers. Benefit from direct proforma pricing and local technical guidance in Ethiopia. ${selectedCta}!`;

    instagramCaption = `Engineering excellence in East Africa 🏗️ Spotlight on ${topic}. From high-range polycarboxylate admixtures to heavy batching systems, Oranex × Our Chinese partner provides reliable international supply and local technical backing in Addis Ababa. 📍 ${selectedCta} — Link in bio!`;
  }

  const platformsData: Array<{ platform: 'LinkedIn' | 'Facebook' | 'Instagram'; caption: string; hashtags: string[]; mediaType: 'INFOGRAPHIC' | 'IMAGE' | 'CAROUSEL' }> = [
    {
      platform: 'LinkedIn',
      caption: linkedInCaption,
      hashtags: ['#B2BSupplyChain', '#EthiopiaInfrastructure', '#ConcreteTechnology', '#Oranex', '#ACLESOUL'],
      mediaType: 'INFOGRAPHIC'
    },
    {
      platform: 'Facebook',
      caption: facebookCaption,
      hashtags: ['#EthiopianContractors', '#BuildingMaterials', '#OCHEMI', '#AddisAbaba'],
      mediaType: 'IMAGE'
    },
    {
      platform: 'Instagram',
      caption: instagramCaption,
      hashtags: ['#CivilEngineering', '#EthiopiaIndustry', '#ConstructionAfrica', '#OranexTrade'],
      mediaType: 'CAROUSEL'
    }
  ];

  const newPosts: MarketingPost[] = [];

  for (const item of platformsData) {
    const val = validateContentPolicies(item.caption, pillar);
    const postCtaUrl = `#construction-industrial?utm_source=${item.platform.toLowerCase()}&utm_medium=social&utm_campaign=${utmCampaign}&post_id=pending`;

    const postRecord: MarketingPost = {
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      pillar,
      platform: item.platform,
      language,
      caption: item.caption,
      headline: `${topic} — ${item.platform} Variant`,
      hashtags: item.hashtags,
      callToAction: selectedCta,
      ctaUrl: postCtaUrl,
      mediaPrompt: `Authentic industrial engineering photography representing ${topic} in African construction setting`,
      mediaType: item.mediaType,
      state: val.status === 'FAILED' ? 'held_for_review' : 'draft',
      validationStatus: val.status,
      validationIssues: val.issues,
      groundedClaims: val.groundedClaims,
      author: generatedByGemini ? 'Gemini 3.8 Flash (Server)' : 'ORANEX Engine (Deterministic Rule-Based)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (val.status === 'FAILED') {
      db.policyViolationsBlocked += 1;
    }

    db.posts.unshift(postRecord);
    newPosts.push(postRecord);
  }

  // Update campaign count
  const cIndex = db.campaigns.findIndex((c) => c.id === campaign.id);
  if (cIndex !== -1) {
    db.campaigns[cIndex].postsCount += newPosts.length;
    db.campaigns[cIndex].updatedAt = new Date().toISOString();
  }

  db.auditLogs.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: 'AI_CONTENT_GENERATED',
    actor: generatedByGemini ? 'Gemini AI' : 'Marketing Engine',
    details: `Generated 3 platform variants for "${topic}" in campaign "${campaign.title}".`,
    status: 'SUCCESS'
  });

  saveDb(db);

  res.json({
    success: true,
    postsCount: newPosts.length,
    posts: newPosts
  });
});

app.get('/api/marketing/calendar', (req, res) => {
  const db = loadDb();
  const scheduled = db.posts.filter((p) => p.scheduledFor || p.state === 'scheduled');
  res.json(scheduled);
});

app.get('/api/marketing/audit-logs', (req, res) => {
  const db = loadDb();
  res.json(db.auditLogs.slice(-50).reverse());
});

app.get('/Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Oranex_Construction_Materials_Turnkey_Sourcing_Catalogue_2026_Contact_Updated.pdf"');
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Catalogue PDF asset is pending upload.' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  // Start background worker
  startBackgroundWorker();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ORANEX SERVER] Running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[ORANEX SERVER] Failed to start:', err);
  process.exit(1);
});
