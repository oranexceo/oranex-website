import {
  Product,
  Solution,
  Industry,
  Project,
  Partner,
  BusinessPlatform,
  OranexBusinessService,
  FeatureToggles,
  Lead,
  TenderRequirement,
  SupplyModelTag,
  ProductStatus
} from '../types';
import { CONSTRUCTION_PRODUCTS_DATA } from './constructionProducts';

export const BUSINESS_PLATFORMS: BusinessPlatform[] = [
  {
    id: 'turnkey-materials-sourcing',
    name: 'Construction Materials & Turnkey Sourcing',
    code: 'TURNKEY',
    tagline: 'ONE SOURCING PARTNER. EVERY CONSTRUCTION STAGE.',
    description: 'Turnkey procurement coordination across road construction, concrete solutions, structural building finishes, and manufacturing equipment serving Ethiopia with Our Chinese partner.',
    icon: 'Building2',
    color: 'from-blue-600 to-emerald-700',
    badge: 'Turnkey Division'
  },
  {
    id: 'oranex-trade',
    name: 'ORANEX Trading',
    code: 'OTRADE',
    tagline: 'Global Sourcing & Procurement Partner',
    description: 'International procurement representation connecting Ethiopian contractors, factories, and commercial enterprises to vetted global manufacturers across Asia, Europe, and the Middle East.',
    icon: 'Ship',
    color: 'from-blue-600 to-indigo-700',
    badge: 'Core Division'
  },
  {
    id: 'construction-industrial',
    name: 'Construction & Industrial Supply Chain',
    code: 'ORANEX × Our Chinese partner',
    tagline: 'Integrated Supply. Technical Expertise. Global Sourcing.',
    description: 'Strategic international supply collaboration with Our Chinese partner providing Ethiopian contractors with direct factory access to equipment, raw materials, batching plants, and chemicals.',
    icon: 'HardHat',
    color: 'from-blue-700 to-slate-900',
    badge: 'Strategic Alliance'
  },
  {
    id: 'ochemi',
    name: 'OCHEMI Chemical Solutions',
    code: 'OCHEMI',
    tagline: 'Specialist Construction Chemicals & Additives',
    description: 'Oranex specialist chemical product family supplying high-performance PCE superplasticizers, retarders, waterproofing, repair mortars, and structural adhesives.',
    icon: 'FlaskConical',
    color: 'from-amber-600 to-orange-700',
    badge: 'Chemical Specialist'
  },
  {
    id: 'tender-services',
    name: 'Tender & Procurement Services',
    code: 'TENDERS',
    tagline: 'Infrastructure Tenders & BoQ Procurement Co-Bidding',
    description: 'Consolidated tender support, Mill Test Certification compliance, direct Letter of Credit shipments, and milestone-based project supply execution for public and commercial tenders.',
    icon: 'FileCheck',
    color: 'from-slate-700 to-blue-900',
    badge: 'Tender Execution'
  },
  {
    id: 'oem-private-label',
    name: 'Global Sourcing, OEM & Private Label',
    code: 'OEM & PRIVATE LABEL',
    tagline: 'Custom Packaging, Contract Manufacturing & Bespoke Brands',
    description: 'Custom formulation packaging, private-label branding, and international manufacturing agreements tailored to Ethiopian distributor specifications and African commercial partnerships.',
    icon: 'Tag',
    color: 'from-indigo-600 to-purple-800',
    badge: 'Manufacturing & OEM'
  },
  {
    id: 'merkato-consolidation',
    name: 'Merkato Wholesale & Container Consolidation',
    code: 'MERKATO LCL',
    tagline: 'Shared Groupage, Direct Factory Sourcing & Bank Proformas',
    description: 'Empowering Addis Ababa Merkato wholesalers and retailers with direct China factory groupage, LCL shared containers starting from 2 CBM, verified pre-loading inspection in Yiwu & Guangzhou, and bank-compliant proforma invoices for CBE, Awash, and Dashen.',
    icon: 'PackageCheck',
    color: 'from-amber-600 to-blue-900',
    badge: 'Merkato LCL Groupage'
  }
];

export const SOLUTIONS_DATA: Solution[] = [
  {
    id: 'sol-01',
    title: 'International Sourcing & Factory Representation',
    slug: 'international-sourcing',
    category: 'Procurement',
    description: 'Direct representation with qualified international manufacturers, factory audits, and end-to-end contract coordination via Our Chinese partner.',
    iconName: 'Globe2',
    highlights: ['Direct manufacturer pricing', 'Pre-shipment quality inspection', 'Compliant international payment documentation']
  },
  {
    id: 'sol-02',
    title: 'Private-Label & OEM Branding Programs',
    slug: 'private-label-oem',
    category: 'Manufacturing',
    description: 'Custom packaging, customer-branded labeling, and tailored technical formulations for Ethiopian contractors and distributors.',
    iconName: 'Tag',
    highlights: ['Bespoke multilingual packaging', 'Strict brand IP protection', 'Certified factory quality compliance']
  },
  {
    id: 'sol-03',
    title: 'On-Site Technical Support & Mix Optimization',
    slug: 'technical-support',
    category: 'Engineering',
    description: 'Concrete laboratory trial support, admixture dosage calibration, slump retention monitoring, and batching plant troubleshooting.',
    iconName: 'Wrench',
    highlights: ['ASTM/EN laboratory test backing', 'Site trial supervision in Addis Ababa & regions', 'Custom chemical formulation adjustments']
  },
  {
    id: 'sol-04',
    title: 'Project Procurement & Tender Support',
    slug: 'tender-procurement',
    category: 'Infrastructure',
    description: 'Consolidated procurement schedules for major infrastructure, industrial park construction, and public sector tenders.',
    iconName: 'FileCheck',
    highlights: ['Milestone-based delivery scheduling', 'Bank-compliant LC documentation', 'Port of Djibouti & Modjo clearance coordination']
  }
];

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'part-01',
    name: 'Our Chinese partner',
    type: 'International Sourcing & Supply Partner',
    country: 'International (Global Sourcing Network)',
    description: 'Key international trade and supply chain partner coordinating global manufacturers, export logistics, and direct supply contracts.',
    partnershipScope: 'Global factory sourcing, consolidated container logistics, export documentation, and direct sales contracts.'
  },
  {
    id: 'part-02',
    name: 'Ethiopian Chamber of Commerce',
    type: 'Institutional Trade Partner',
    country: 'Ethiopia',
    description: 'Active member participating in trade policy forums and African Continental Free Trade Area (AfCFTA) working groups.',
    partnershipScope: 'Local market development and commercial compliance.'
  },
  {
    id: 'part-03',
    name: 'Djibouti Multimodal Corridor Operators',
    type: 'Logistics Partner',
    country: 'Djibouti / Ethiopia',
    description: 'Coordinated freight corridors connecting Doraleh Container Terminal directly with Modjo Dry Port via Ethio-Djibouti Railway.',
    partnershipScope: 'Transit clearance, bonded rail transit, and dry port staging.'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Tewodros Bekele',
    company: 'Blue Nile Construction Share Company',
    email: 'tewodros.b@bluenile-et.com',
    phone: '+251 91 123 4567',
    productOrCategory: 'OCHEMI PCE 50% High-Range Superplasticizer',
    estimatedQuantity: '40 Metric Tons (2 × 20ft FCL)',
    deliveryLocation: 'Modjo Dry Port / Addis Ababa Ring Road Site',
    brandingPreference: 'Oranex / OCHEMI brand',
    notes: 'Require ASTM C494 Type F certification for high-strength C50 bridge girder mix design.',
    sourceOrigin: 'Construction & Industrial Portal',
    preferredLanguage: 'en',
    status: 'IN_REVIEW',
    createdAt: '2026-10-15T09:30:00Z'
  },
  {
    id: 'lead-102',
    name: 'Sara Mengistu',
    company: 'Abyssinia Concrete & Batching PLC',
    email: 'sara.m@abyssiniaconcrete.com',
    phone: '+251 92 889 0123',
    productOrCategory: 'HZS90 Stationary Concrete Batching Plant',
    estimatedQuantity: '1 Complete Plant Set',
    deliveryLocation: 'Adama Industrial Zone Site',
    brandingPreference: 'Original manufacturer\'s brand',
    notes: 'Inquiry regarding Our Chinese partner direct purchasing terms and engineer deployment for on-site commissioning.',
    sourceOrigin: 'Equipment Sourcing Form',
    preferredLanguage: 'en',
    status: 'QUOTED',
    createdAt: '2026-10-14T14:15:00Z'
  }
];

export const INITIAL_TENDERS: TenderRequirement[] = [
  {
    id: 'ten-201',
    title: 'Supply of Concrete Admixtures and Silica Fume for Expressway Bridge Infrastructure',
    agencyOrCompany: 'Ethiopian Roads Administration (ERA) Contractor Consortium',
    submissionDeadline: '2026-11-20',
    referenceNumber: 'ERA/INFRA/2026-C44',
    category: 'Construction Chemicals',
    scopeOfSupply: [
      '80 MT High-Range PCE Water Reducer (ASTM C494 Type F)',
      '30 MT Densified Microsilica (SiO2 ≥ 94%)',
      '15 MT Crystalline Waterproofing Admixture'
    ],
    eligibilityRequirements: [
      'Certified Factory Mill Test Reports',
      'Proof of direct supply partnership with international manufacturer',
      'Local technical mix trial support capability in Ethiopia'
    ],
    targetLocation: 'Modjo - Hawassa Expressway Extension',
    status: 'OPEN'
  },
  {
    id: 'ten-202',
    title: 'Procurement of Heavy-Duty Deformed Rebar Grade 60 (BS 4449)',
    agencyOrCompany: 'Commercial Building Developers Group Addis Ababa',
    submissionDeadline: '2026-11-05',
    referenceNumber: 'CBD-ET-2026-R09',
    category: 'Building Materials',
    scopeOfSupply: [
      '500 MT Grade 60 Rebar (16mm, 20mm, 25mm diameters in 12m lengths)'
    ],
    eligibilityRequirements: [
      'Original Mill Test Certificates',
      'Direct shipment under Letter of Credit to Djibouti port'
    ],
    targetLocation: 'Addis Ababa Financial District',
    status: 'BID_PREPARATION'
  }
];

export const INDUSTRIES_DATA: Industry[] = [
  {
    id: 'construction',
    name: 'Construction & Infrastructure',
    title: 'Construction & Infrastructure',
    description: 'Commercial batching plants, infrastructure highways, bridges, and commercial high-rise towers across Ethiopia.',
    summary: 'Commercial batching plants, infrastructure highways, bridges, and commercial high-rise towers across Ethiopia.',
    image: '/src/assets/images/construction_machinery_site_1792156911328.jpg',
    featuredProducts: ['OCHEMI PCE 50%', 'White Cement', 'Rebar Grade 60', 'HZS90 Batching Plant'],
    keyMaterials: ['OCHEMI PCE 50%', 'White Cement', 'Rebar Grade 60', 'HZS90 Batching Plant'],
    focusAreas: ['Highway Corridors', 'Ready-Mix Concrete', 'Bridge Structures', 'Precast Plants'],
    solutionsSupplied: ['Direct Factory Sourcing via Our Chinese partner', 'On-Site Technical Mix Trials in Addis Ababa'],
    ethiopianContext: 'Supporting national infrastructure expansion along the Djibouti-Addis corridor and regional transport axes.'
  },
  {
    id: 'manufacturing',
    name: 'Industrial Manufacturing & Assembly',
    title: 'Industrial Manufacturing & Assembly',
    description: 'Factory automation, chemical processing, machinery spares, and raw material inputs for industrial zones.',
    summary: 'Factory automation, chemical processing, machinery spares, and raw material inputs for industrial zones.',
    image: '/src/assets/images/hero_industrial_manufacturing_1790427794819.jpg',
    featuredProducts: ['Slurry Pumps', 'Pneumatic Butterfly Valves', 'Silicon Dioxide'],
    keyMaterials: ['Slurry Pumps', 'Pneumatic Butterfly Valves', 'Silicon Dioxide', 'Bearings'],
    focusAreas: ['Industrial Parks', 'Chemical Formulation', 'Factory Spares', 'Plant Maintenance'],
    solutionsSupplied: ['Containerized Direct Supply', 'Factory Technical Audits'],
    ethiopianContext: 'Supplying operational inputs to Bole Lemi, Kilinto, Hawassa, and Adama industrial zones.'
  },
  {
    id: 'energy-utilities',
    name: 'Energy, Utilities & Mining',
    title: 'Energy, Utilities & Mining',
    description: 'Slurry pumps, pneumatic valves, electrical substation supplies, and heavy wear components for Ethiopian industry.',
    summary: 'Slurry pumps, pneumatic valves, electrical substation supplies, and heavy wear components for Ethiopian industry.',
    image: '/src/assets/images/hero_global_logistics_1790427783630.jpg',
    featuredProducts: ['Slurry Pumps', 'Pneumatic Butterfly Valves', 'High-Alumina Bricks'],
    keyMaterials: ['Pneumatic Valves', 'Wear Plates', 'Substation Controls'],
    focusAreas: ['Mining & Cement Works', 'Hydropower Infrastructure', 'Industrial Utilities'],
    solutionsSupplied: ['Direct Factory Sourcing via Our Chinese partner', 'Heavy Industrial Spares Logistics'],
    ethiopianContext: 'Supporting energy infrastructure, cement plants, and heavy industrial facilities with direct global supply lines.'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'prj-01',
    title: 'Addis Ababa Highway Corridor & Interchange Admixtures',
    client: 'Consolidated Infrastructure Contractors',
    scope: 'Supply of 80 MT OCHEMI PCE 50% High-Range Superplasticizers and onsite mix trials',
    year: '2026',
    category: 'Construction Chemicals',
    outcome: 'Achieved C50 compressive strength at 28 days with 35% cement efficiency',
    summary: 'Supply of 80 MT OCHEMI PCE 50% High-Range Superplasticizers and onsite mix trials',
    sector: 'Manufacturing',
    status: 'Completed',
    location: 'Addis Ababa',
    productsEquipment: ['OCHEMI PCE 50%', 'Slump Retention Agents'],
    oranexRole: 'Technical Mix Formulation & Supply Coordination'
  },
  {
    id: 'prj-02',
    title: 'Adama Industrial Park Ready-Mix Batching Plant Deployment',
    client: 'Abyssinia Concrete PLC',
    scope: 'Procurement of HZS90 Stationary Concrete Batching Plant and twin 150T silos via Our Chinese partner',
    year: '2026',
    category: 'Heavy Machinery',
    outcome: 'Successful commissioning with 90 m3/hr continuous discharge capacity',
    summary: 'Procurement of HZS90 Stationary Concrete Batching Plant and twin 150T silos via Our Chinese partner',
    sector: 'Manufacturing',
    status: 'Ongoing',
    location: 'Adama',
    productsEquipment: ['HZS90 Plant', '150T Bolted Silos'],
    oranexRole: 'Procurement Liaison & Commissioning Support'
  }
];

export const BUSINESS_SERVICES_DATA: OranexBusinessService[] = [
  {
    id: 'srv-01',
    title: 'International Manufacturer Sourcing',
    tagline: 'Direct Sourcing Gateway via Our Chinese partner',
    description: 'Direct representation with vetted global factories through Our Chinese partner, eliminating intermediaries.',
    summary: 'Direct representation with vetted global factories through Our Chinese partner, eliminating intermediaries.',
    bullets: ['Factory audits & QA certification', 'Direct manufacturer proforma invoicing', 'Custom packaging & private labeling'],
    deliverables: ['Factory audits & QA certification', 'Direct manufacturer proforma invoicing', 'Custom packaging & private labeling'],
    iconName: 'Globe'
  },
  {
    id: 'srv-02',
    title: 'Tender Procurement & BoQ Co-Bidding',
    tagline: 'African Infrastructure Tender Support',
    description: 'Complete procurement schedules, mill test certificates, and compliance documentation for African tenders.',
    summary: 'Complete procurement schedules, mill test certificates, and compliance documentation for African tenders.',
    bullets: ['Bank LC-compliant documentation', 'Direct shipment to Djibouti / Modjo Dry Port', 'Local technical trial backup'],
    deliverables: ['Bank LC-compliant documentation', 'Direct shipment to Djibouti / Modjo Dry Port', 'Local technical trial backup'],
    iconName: 'FileCheck2'
  },
  {
    id: 'srv-03',
    title: 'On-Site Engineering & Laboratory Trials',
    tagline: 'Certified Concrete & Materials Testing',
    description: 'In-country concrete mix design, admixture dosage calibration, and dispenser installation support in Ethiopia.',
    summary: 'In-country concrete mix design, admixture dosage calibration, and dispenser installation support in Ethiopia.',
    bullets: ['ASTM C494 / EN 934 testing', 'Addis Ababa laboratory & field supervision', 'Slump retention optimization for traffic'],
    deliverables: ['ASTM C494 / EN 934 testing', 'Addis Ababa laboratory & field supervision', 'Slump retention optimization for traffic'],
    iconName: 'Wrench'
  }
];

export const PRODUCTS_DATA: Product[] = [
  ...CONSTRUCTION_PRODUCTS_DATA.map((p) => ({
    ...p,
    documents: p.complianceDocs?.map((d, idx) => ({
      id: `doc-${idx}`,
      type: d,
      size: '1.2 MB',
      name: d
    })) || [
      { id: 'doc-tds', type: 'Technical Data Sheet (TDS)', size: '850 KB', name: 'TDS' },
      { id: 'doc-coa', type: 'Certificate of Analysis (COA)', size: '620 KB', name: 'COA' }
    ],
    supplyTags: ['Direct Manufacturer', 'OEM Available'] as SupplyModelTag[],
    status: 'In Stock' as ProductStatus
  }))
];
