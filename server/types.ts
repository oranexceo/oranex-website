export type MarketingPlatform = 'LinkedIn' | 'Facebook' | 'Instagram';

export type MarketingLanguage = 'en' | 'am' | 'fr' | 'ar' | 'pt' | 'sw';

export type ContentState =
  | 'draft'
  | 'validated'
  | 'scheduled'
  | 'held_for_review'
  | 'rejected'
  | 'published'
  | 'failed';

export type ValidationStatus = 'PASSED' | 'WARNING' | 'FAILED';

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
  platform: MarketingPlatform;
  language: MarketingLanguage;
  caption: string;
  headline?: string;
  hashtags: string[];
  callToAction: string;
  ctaUrl: string;
  mediaPrompt: string;
  mediaType: 'IMAGE' | 'CAROUSEL' | 'INFOGRAPHIC' | 'VIDEO';
  state: ContentState;
  validationStatus: ValidationStatus;
  validationIssues: ValidationIssue[];
  groundedClaims: string[];
  scheduledFor?: string;
  publishedAt?: string;
  platformPostId?: string;
  author: string;
  createdAt: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface MarketingSettings {
  globalPause: boolean;
  contentPillars: string[];
  targetMarkets: string[];
  supportedLanguages: MarketingLanguage[];
  platforms: MarketingPlatform[];
  callsToAction: string[];
  dailyPostLimit: number;
  automationStatus: 'ACTIVE' | 'PAUSED' | 'REVIEW_ONLY';
  requireHumanApproval: boolean;
  updatedAt: string;
}

export interface MarketingAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'BLOCKED';
}

export interface MarketingDatabase {
  settings: MarketingSettings;
  campaigns: MarketingCampaign[];
  posts: MarketingPost[];
  auditLogs: MarketingAuditLog[];
}
