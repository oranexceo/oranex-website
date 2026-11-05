export type SupplyModelTag =
  | 'Direct Manufacturer'
  | 'OEM Available'
  | 'Oranex OEM'
  | 'Private Label'
  | 'Consolidated Import'
  | 'Project Supply'
  | 'Source on Request';

export type ProductStatus = 'Active' | 'In Stock' | 'Pre-order' | 'On Request';

export interface ProductDocument {
  id: string;
  type: string;
  size: string;
  name?: string;
  url?: string;
}

export interface Product {
  id: string;
  sku?: string;
  name: string;
  category: string;
  subCategory?: string;
  productFamily: string;
  brand?: string;
  shortDescription: string;
  applications: string[];
  specifications: Record<string, string>;
  packaging: string;
  origin: string;
  manufacturer?: string;
  moq: string;
  leadTime: string;
  imageUrl?: string;
  datasheetUrl?: string;
  complianceDocs?: string[];
  brandingOptions?: ('Oranex/OCHEMI' | 'Private Label / Customer Brand' | 'OEM Original Manufacturer')[];
  featured?: boolean;
  documents?: ProductDocument[];
  supplyTags?: SupplyModelTag[];
  supplyModelTags?: SupplyModelTag[];
  status?: ProductStatus;
  productOrScope?: string;
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  shortDescription?: string;
  iconName: string;
  highlights: string[];
  imageUrl?: string;
}

export interface Industry {
  id: string;
  name: string;
  title?: string;
  description: string;
  summary?: string;
  image: string;
  featuredProducts?: string[];
  subIndustries?: string[];
  keyMaterials?: string[];
  ethiopianContext?: string;
  focusAreas?: string[];
  solutionsSupplied?: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  scope: string;
  year: string;
  category: string;
  outcome: string;
  summary?: string;
  sector?: string;
  status?: string;
  deliverables?: string[];
  productsEquipment?: string[];
  oranexRole?: string;
  location?: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  country: string;
  description: string;
  partnershipScope: string;
}

export interface BusinessPlatform {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
}

export interface OranexBusinessService {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  summary?: string;
  bullets: string[];
  deliverables?: string[];
  icon?: string;
  iconName?: string;
}

export interface FeatureToggles {
  enableAiMarketing: boolean;
  enableAclDirectProcurement: boolean;
  enableOnlineRfq: boolean;
  enablePrivateLabelProgram: boolean;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country?: string;
  productOrCategory?: string;
  productOrScope?: string;
  estimatedQuantity?: string;
  quantity?: string;
  unit?: string;
  deliveryLocation?: string;
  targetDate?: string;
  serviceLevel?: string;
  brandingPreference?: 'Oranex / OCHEMI brand' | 'My company\'s brand / private label' | 'Original manufacturer\'s brand' | 'Recommend the best option';
  requestedBrandName?: string;
  packagingRequirements?: string;
  notes?: string;
  attachedFileNames?: string[];
  documents?: Array<{
    id?: string;
    name: string;
    size: string;
    bytes?: number;
    type: string;
    storagePath?: string;
    bucket?: string;
    uploadedAt?: string;
    downloadUrl?: string;
  }>;
  sourceOrigin: string;
  preferredLanguage?: string;
  preferredTenderLanguage?: string;
  specificationDetails?: string;
  status: 'NEW' | 'IN_REVIEW' | 'QUOTED' | 'CONVERTED' | 'ARCHIVED';
  createdAt: string;
  type?: string;
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  postId?: string;
  qualificationScore?: number;
  qualificationNotes?: string;
}

export interface TenderRequirement {
  id: string;
  title: string;
  agencyOrCompany: string;
  submissionDeadline: string;
  referenceNumber: string;
  category: string;
  scopeOfSupply: string[];
  eligibilityRequirements: string[];
  targetLocation: string;
  status: 'OPEN' | 'BID_PREPARATION' | 'SUBMITTED' | 'CLOSED';
}
