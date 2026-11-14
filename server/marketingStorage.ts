import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  MarketingDatabase,
  MarketingSettings,
  MarketingCampaign,
  MarketingPost,
  MarketingAuditLog
} from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'marketing-db.json');

const DEFAULT_SETTINGS: MarketingSettings = {
  globalPause: false,
  contentPillars: [
    'Construction Chemicals & OCHEMI Admixtures',
    'Concrete & Batching Solutions (HZS Plants)',
    'Construction Machinery & Heavy Fleet',
    'Global Sourcing via Our Chinese partner',
    'Building & Finishing Materials',
    'Industrial Supplies & Slurry Pumps'
  ],
  targetMarkets: [
    'Ethiopia (Addis Ababa, Adama, Hawassa, Dire Dawa)',
    'East Africa (Kenya, Uganda, Tanzania, Rwanda)',
    'Djibouti Logistics & Maritime Corridor',
    'Regional African Industrial Parks'
  ],
  supportedLanguages: ['en', 'am', 'fr', 'ar', 'pt', 'sw'],
  platforms: ['LinkedIn', 'Facebook', 'Instagram'],
  callsToAction: [
    'Request a Technical Quotation',
    'Submit a Project Requirement',
    'Schedule Cement Compatibility Mix Trial',
    'Inquire for Private Label / OEM Packaging',
    'Contact International Procurement Desk'
  ],
  dailyPostLimit: 4,
  automationStatus: 'ACTIVE',
  requireHumanApproval: true,
  updatedAt: new Date().toISOString()
};

const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'camp-01',
    title: 'OCHEMI PCE 50% Launch — Ethiopian Infrastructure Corridor',
    pillar: 'Construction Chemicals & OCHEMI Admixtures',
    targetAudience: 'Ready-mix batching plant managers, precast concrete fabricators, EPC contractors',
    objective: 'LEAD_GENERATION',
    primaryCta: 'Request a Technical Quotation',
    status: 'ACTIVE',
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    postsCount: 3,
    leadsGenerated: 14,
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-15T12:00:00Z'
  },
  {
    id: 'camp-02',
    title: 'Our Chinese partner Direct Sourcing — Commercial Batching Plants',
    pillar: 'Concrete & Batching Solutions (HZS Plants)',
    targetAudience: 'Infrastructure developers, quarry operators, municipal water contractors',
    objective: 'PRODUCT_LAUNCH',
    primaryCta: 'Explore Batching Solutions',
    status: 'ACTIVE',
    startDate: '2026-10-10',
    endDate: '2026-11-30',
    postsCount: 2,
    leadsGenerated: 8,
    createdAt: '2026-10-10T09:30:00Z',
    updatedAt: '2026-10-14T15:00:00Z'
  }
];

const INITIAL_POSTS: MarketingPost[] = [
  {
    id: 'post-01',
    campaignId: 'camp-01',
    campaignTitle: 'OCHEMI PCE 50% Launch — Ethiopian Infrastructure Corridor',
    pillar: 'Construction Chemicals & OCHEMI Admixtures',
    platform: 'LinkedIn',
    language: 'en',
    caption: 'High-strength concrete requires uncompromising chemical stability. OCHEMI Polycarboxylate Ether (PCE 50%) is engineered specifically for Ethiopian ready-mix and precast projects using local cement types. Sourced directly through Our Chinese partner with ASTM C494 Type F & G compliance, OCHEMI provides over 30% water reduction with optimal slump retention.\n\nConnect with our Addis Ababa engineering desk for cement compatibility mix trials and containerized delivery to Modjo Dry Port.',
    headline: 'High-Performance Concrete Admixtures Tailored for Ethiopian Mega Projects',
    hashtags: ['#ConstructionEthiopia', '#ConcreteTechnology', '#OCHEMI', '#CivilEngineering', '#AddisAbabaInfrastructure'],
    callToAction: 'Request a Technical Quotation',
    ctaUrl: 'https://oranex.com.et/construction-industrial',
    mediaPrompt: 'Professional laboratory technician performing slump-flow test on high-performance concrete cylinder with OCHEMI PCE admixture in industrial testing facility.',
    mediaType: 'IMAGE',
    state: 'validated',
    validationStatus: 'PASSED',
    validationIssues: [],
    groundedClaims: [
      'Identifies Oranex Trading One Member PLC',
      'Grounded in Our Chinese partner international sourcing partnership',
      'Positions OCHEMI specialist chemical program',
      'References verified engineering standards (ASTM / EN / ISO)',
      'Grounded in authentic Djibouti–Modjo dry port transit corridor'
    ],
    scheduledFor: '2026-10-18T10:00:00Z',
    author: 'AI Content Studio (Gemini 3.8 Flash)',
    createdAt: '2026-10-15T09:00:00Z',
    updatedAt: '2026-10-15T09:05:00Z'
  },
  {
    id: 'post-02',
    campaignId: 'camp-01',
    campaignTitle: 'OCHEMI PCE 50% Launch — Ethiopian Infrastructure Corridor',
    pillar: 'Construction Chemicals & OCHEMI Admixtures',
    platform: 'Facebook',
    language: 'am',
    caption: 'ለኮንክሪት ስራዎችዎ ከፍተኛ ጥንካሬና ቅልጥፍና የሚሰጡ የኦቼሚ (OCHEMI) ፖሊካርቦክሲሌት ኤተር (PCE 50%) አድሚክስቸሮች። በኢትዮጵያ የሚገኙ የሲሚንቶ አይነቶች ጋር የተጣጣሙና በ ASTM C494 ደረጃዎች የተረጋገጡ። ከዓለም አቀፍ አጋራችን Our Chinese partner ጋር በመተባበር ቀጥታ ወደ ሞጆ ደረቅ ወደብ እና አዲስ አበባ ይቀርባሉ።\n\nለሙከራና ዋጋ ማቅረቢያ ጥያቄ አሁኑኑ ያነጋግሩን።',
    headline: 'የኮንክሪት ጥንካሬ ማሻሻያ አድሚክስቸሮች',
    hashtags: ['#ኢትዮጵያ', '#ኮንስትራክሽን', '#ኦራኔክስ', '#ኮንክሪት'],
    callToAction: 'የዋጋ ማቅረቢያ ይጠይቁ',
    ctaUrl: 'https://oranex.com.et/construction-industrial',
    mediaPrompt: 'Transit mixer fleet loading at concrete batching plant in Ethiopia under bright daylight.',
    mediaType: 'IMAGE',
    state: 'scheduled',
    validationStatus: 'PASSED',
    validationIssues: [],
    groundedClaims: [
      'Grounded in Our Chinese partner international sourcing partnership',
      'Positions OCHEMI specialist chemical program',
      'References verified engineering standards (ASTM / EN / ISO)',
      'Grounded in authentic Djibouti–Modjo dry port transit corridor'
    ],
    scheduledFor: '2026-10-19T08:30:00Z',
    author: 'AI Content Studio (Gemini 3.8 Flash)',
    createdAt: '2026-10-15T11:00:00Z',
    updatedAt: '2026-10-15T11:10:00Z'
  },
  {
    id: 'post-03',
    campaignId: 'camp-02',
    campaignTitle: 'Our Chinese partner Direct Sourcing — Commercial Batching Plants',
    pillar: 'Concrete & Batching Solutions (HZS Plants)',
    platform: 'Instagram',
    language: 'en',
    caption: 'Powering heavy industrial production: HZS90 Stationary Batching Plant delivering 90 m³/h output with twin-shaft JS1500 mixer and automated Siemens PLC batching accuracy.\n\nSourced directly from ISO-certified overseas manufacturing lines through Our Chinese partner. Coordinated civil foundation layouts, sea freight to Djibouti, and inland engineering support in Ethiopia.\n\nTap link in bio to explore plant specifications or discuss turnkey project procurement.',
    headline: 'HZS90 Heavy Ready-Mix Concrete Batching Plants',
    hashtags: ['#ConcretePlant', '#BatchingPlant', '#CivilEngineering', '#EquipmentProcurement', '#OranexSupply'],
    callToAction: 'Explore Batching Solutions',
    ctaUrl: 'https://oranex.com.et/construction-industrial',
    mediaPrompt: 'Towering modern concrete batching plant with cement silos and aggregate conveyors operating in East Africa.',
    mediaType: 'CAROUSEL',
    state: 'draft',
    validationStatus: 'PASSED',
    validationIssues: [],
    groundedClaims: [
      'Identifies Oranex Trading One Member PLC',
      'Grounded in Our Chinese partner international sourcing partnership',
      'Grounded in authentic Djibouti–Modjo dry port transit corridor'
    ],
    author: 'AI Content Studio (Gemini 3.8 Flash)',
    createdAt: '2026-10-15T14:20:00Z',
    updatedAt: '2026-10-15T14:20:00Z'
  }
];

const INITIAL_AUDIT_LOGS: MarketingAuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-15T09:00:00Z',
    action: 'CONTENT_GENERATED',
    actor: 'admin@oranex.com.et',
    details: 'Generated LinkedIn post variant for campaign OCHEMI PCE 50% Launch (en)',
    status: 'SUCCESS'
  },
  {
    id: 'log-02',
    timestamp: '2026-10-15T09:05:00Z',
    action: 'POLICY_VALIDATION_PASSED',
    actor: 'Server Policy Engine',
    details: 'Post post-01 passed all 6 ground-truth verification checks with 0 critical issues.',
    status: 'SUCCESS'
  },
  {
    id: 'log-03',
    timestamp: '2026-10-15T11:00:00Z',
    action: 'CONTENT_SCHEDULED',
    actor: 'admin@oranex.com.et',
    details: 'Scheduled post-02 for publishing on 2026-10-19T08:30:00Z (Facebook, am)',
    status: 'SUCCESS'
  }
];

class MarketingStorageManager {
  private db: MarketingDatabase;

  constructor() {
    this.ensureDataDir();
    this.db = this.loadDatabase();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): MarketingDatabase {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read marketing database, initializing defaults:', e);
    }

    const initialDb: MarketingDatabase = {
      settings: DEFAULT_SETTINGS,
      campaigns: INITIAL_CAMPAIGNS,
      posts: INITIAL_POSTS,
      auditLogs: INITIAL_AUDIT_LOGS
    };

    this.saveDatabase(initialDb);
    return initialDb;
  }

  private saveDatabase(db: MarketingDatabase) {
    try {
      this.ensureDataDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write marketing database to disk:', e);
    }
  }

  public getDatabase(): MarketingDatabase {
    return this.db;
  }

  public getSettings(): MarketingSettings {
    return this.db.settings;
  }

  public updateSettings(partial: Partial<MarketingSettings>, actor: string = 'admin'): MarketingSettings {
    this.db.settings = {
      ...this.db.settings,
      ...partial,
      updatedAt: new Date().toISOString()
    };
    this.addAuditLog('SETTINGS_UPDATED', actor, `Marketing settings updated: ${Object.keys(partial).join(', ')}`, 'SUCCESS');
    this.saveDatabase(this.db);
    return this.db.settings;
  }

  public toggleGlobalPause(pauseState: boolean, actor: string = 'admin'): MarketingSettings {
    this.db.settings.globalPause = pauseState;
    this.db.settings.updatedAt = new Date().toISOString();
    const action = pauseState ? 'GLOBAL_PAUSE_ACTIVATED' : 'GLOBAL_PAUSE_DEACTIVATED';
    const status = pauseState ? 'WARNING' : 'SUCCESS';
    this.addAuditLog(action, actor, `Global publishing automation ${pauseState ? 'FROZEN' : 'RESUMED'} by administrator`, status);
    this.saveDatabase(this.db);
    return this.db.settings;
  }

  public getCampaigns(): MarketingCampaign[] {
    return this.db.campaigns;
  }

  public createCampaign(data: Omit<MarketingCampaign, 'id' | 'createdAt' | 'updatedAt' | 'postsCount' | 'leadsGenerated'>, actor: string = 'admin'): MarketingCampaign {
    const newCamp: MarketingCampaign = {
      ...data,
      id: `camp-${Date.now()}`,
      postsCount: 0,
      leadsGenerated: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.campaigns.unshift(newCamp);
    this.addAuditLog('CAMPAIGN_CREATED', actor, `Created campaign "${newCamp.title}" under pillar "${newCamp.pillar}"`, 'SUCCESS');
    this.saveDatabase(this.db);
    return newCamp;
  }

  public updateCampaign(id: string, partial: Partial<MarketingCampaign>, actor: string = 'admin'): MarketingCampaign | null {
    const idx = this.db.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.db.campaigns[idx] = {
      ...this.db.campaigns[idx],
      ...partial,
      updatedAt: new Date().toISOString()
    };
    this.addAuditLog('CAMPAIGN_UPDATED', actor, `Updated campaign ${id}`, 'SUCCESS');
    this.saveDatabase(this.db);
    return this.db.campaigns[idx];
  }

  public getPosts(filter?: { campaignId?: string; platform?: string; state?: string; language?: string }): MarketingPost[] {
    let list = this.db.posts;
    if (filter) {
      if (filter.campaignId && filter.campaignId !== 'all') {
        list = list.filter((p) => p.campaignId === filter.campaignId);
      }
      if (filter.platform && filter.platform !== 'all') {
        list = list.filter((p) => p.platform === filter.platform);
      }
      if (filter.state && filter.state !== 'all') {
        list = list.filter((p) => p.state === filter.state);
      }
      if (filter.language && filter.language !== 'all') {
        list = list.filter((p) => p.language === filter.language);
      }
    }
    return list;
  }

  public getPostById(id: string): MarketingPost | null {
    return this.db.posts.find((p) => p.id === id) || null;
  }

  public createPost(data: Omit<MarketingPost, 'id' | 'createdAt' | 'updatedAt'>, actor: string = 'admin'): MarketingPost {
    const newPost: MarketingPost = {
      ...data,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.posts.unshift(newPost);

    // Update campaign post count
    const camp = this.db.campaigns.find((c) => c.id === newPost.campaignId);
    if (camp) {
      camp.postsCount = (camp.postsCount || 0) + 1;
      camp.updatedAt = new Date().toISOString();
    }

    this.addAuditLog('POST_CREATED', actor, `Created draft post ${newPost.id} (${newPost.platform}, ${newPost.language})`, 'SUCCESS');
    this.saveDatabase(this.db);
    return newPost;
  }

  public updatePost(id: string, partial: Partial<MarketingPost>, actor: string = 'admin'): MarketingPost | null {
    const idx = this.db.posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    // Check global pause if trying to publish or schedule
    if (this.db.settings.globalPause && (partial.state === 'scheduled' || partial.state === 'published')) {
      this.addAuditLog('PUBLISH_BLOCKED', actor, `Action blocked: Global pause active. Cannot schedule or publish post ${id}`, 'BLOCKED');
      throw new Error('Action blocked: Global pause is currently active. Resume automation in Settings first.');
    }

    this.db.posts[idx] = {
      ...this.db.posts[idx],
      ...partial,
      updatedAt: new Date().toISOString()
    };
    this.addAuditLog('POST_UPDATED', actor, `Updated post ${id} status: ${this.db.posts[idx].state}`, 'SUCCESS');
    this.saveDatabase(this.db);
    return this.db.posts[idx];
  }

  public deletePost(id: string, actor: string = 'admin'): boolean {
    const post = this.db.posts.find((p) => p.id === id);
    if (!post) return false;
    this.db.posts = this.db.posts.filter((p) => p.id !== id);

    const camp = this.db.campaigns.find((c) => c.id === post.campaignId);
    if (camp && camp.postsCount > 0) {
      camp.postsCount -= 1;
    }

    this.addAuditLog('POST_DELETED', actor, `Deleted post ${id}`, 'SUCCESS');
    this.saveDatabase(this.db);
    return true;
  }

  public getAuditLogs(): MarketingAuditLog[] {
    return this.db.auditLogs;
  }

  public addAuditLog(action: string, actor: string, details: string, status: 'SUCCESS' | 'WARNING' | 'BLOCKED' = 'SUCCESS') {
    const log: MarketingAuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action,
      actor,
      details,
      status
    };
    this.db.auditLogs.unshift(log);
    // Keep max 500 logs
    if (this.db.auditLogs.length > 500) {
      this.db.auditLogs = this.db.auditLogs.slice(0, 500);
    }
  }

  public getOverviewStats() {
    const posts = this.db.posts;
    return {
      globalPause: this.db.settings.globalPause,
      totalPosts: posts.length,
      drafts: posts.filter((p) => p.state === 'draft').length,
      validated: posts.filter((p) => p.state === 'validated').length,
      scheduled: posts.filter((p) => p.state === 'scheduled').length,
      heldForReview: posts.filter((p) => p.state === 'held_for_review').length,
      published: posts.filter((p) => p.state === 'published').length,
      rejected: posts.filter((p) => p.state === 'rejected').length,
      failed: posts.filter((p) => p.state === 'failed').length,
      activeCampaigns: this.db.campaigns.filter((c) => c.status === 'ACTIVE').length,
      totalCampaigns: this.db.campaigns.length,
      recentAuditLogs: this.db.auditLogs.slice(0, 8),
      policyViolationsBlocked: this.db.auditLogs.filter((l) => l.status === 'BLOCKED' || l.action.includes('POLICY')).length
    };
  }
}

export const marketingStorage = new MarketingStorageManager();
