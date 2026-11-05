export interface ApprovedBrandEntity {
  name: string;
  legalName: string;
  location: string;
  slogan: string;
  role: string;
}

export const APPROVED_ORANEX_KNOWLEDGE = {
  company: {
    name: 'ORANEX',
    legalName: 'Oranex Trading One Member PLC',
    headquarters: 'Addis Ababa, Ethiopia',
    commercialCorridor: 'Bole Sub-City, Commercial & Procurement Corridor',
    email: 'oranexceo@gmail.com',
    markets: ['Ethiopia', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Djibouti', 'Regional Africa'],
    positioning: 'Integrated Supply. Technical Expertise. Global Sourcing.'
  },
  sourcingPartner: {
    name: 'Our Chinese partner',
    role: 'International sourcing, manufacturer coordination, proforma invoicing, QC inspection, and direct export supply to customers.',
    purchasingModel: 'Under the Oranex–Our Chinese partner model, Ethiopian and African customers generally purchase directly from Our Chinese partner and handle their own import obligations with local Oranex technical coordination.'
  },
  specialistBrands: [
    {
      brand: 'OCHEMI',
      domain: 'Specialist construction chemicals & concrete admixtures (PCE superplasticizers, SNF powder, crystalline waterproofing, repair mortars, tile adhesives).'
    },
    {
      brand: 'Oranex Trade',
      domain: 'Cross-border B2B commerce, commodity procurement, and wholesale supply.'
    }
  ],
  verifiedStandards: [
    'ASTM C494',
    'EN 934-2',
    'ISO 9001',
    'ISO 14001',
    'EN 12004',
    'DIN 1048',
    'ASTM C1240',
    'BS EN 15167',
    'EN 197-1',
    'API 600',
    'GRI-GM13'
  ],
  logisticsCorridor: {
    seaport: 'Djibouti Port',
    dryPorts: ['Modjo Dry Port', 'Kality Dry Port', 'Dire Dawa Dry Port'],
    transitTimes: '18-28 days ocean transit + 7-14 days dry port inland customs haulage (approx. 30-45 days total)'
  },
  coreCategories: [
    'Construction Chemicals & Admixtures (OCHEMI)',
    'Cementitious & Industrial Raw Materials',
    'Concrete & Batching Solutions',
    'Construction Machinery & Equipment',
    'Building & Finishing Materials',
    'Civil Engineering & Infrastructure',
    'Industrial Supplies & Spare Parts'
  ]
};

export const FORBIDDEN_CLAIM_PATTERNS = [
  {
    code: 'FABRICATED_IMPORTER_ROLE',
    pattern: /oranex\s+(is\s+the\s+sole\s+importer|imports\s+every\s+product|acts\s+as\s+the\s+importer\s+for\s+all)/i,
    message: 'Oranex cannot be described as the importer of every product; customers generally purchase directly from Our Chinese partner under direct contracts.',
    severity: 'CRITICAL' as const
  },
  {
    code: 'INVENTED_PRICING',
    pattern: /\$\s*\d+([,\.]\d+)?\s*(per|only|flat|\/kg|\/ton)|\b(birr|etb)\s*\d+([,\.]\d+)?\s*(per|\/kg|\/ton)/i,
    message: 'Fixed pricing must not be invented in marketing copy. Use "Request a Quotation" or "Pricing available on request".',
    severity: 'CRITICAL' as const
  },
  {
    code: 'UNREALISTIC_DELIVERY',
    pattern: /(guaranteed\s+(next[\s-]day|24[\s-]hour|48[\s-]hour)\s+delivery|immediate\s+same[\s-]day\s+port\s+arrival)/i,
    message: 'Unverified delivery promises are prohibited. International transit via Djibouti to Modjo requires realistic timelines (30-45 days).',
    severity: 'CRITICAL' as const
  },
  {
    code: 'INVENTED_STOCK_QUANTITY',
    pattern: /(in[\s-]stock\s+now\s+in\s+addis\s+ababa|over\s+100,000\s+tons\s+stored\s+in\s+warehouse)/i,
    message: 'Fabricated local stock quantities are prohibited without verified inventory records.',
    severity: 'CRITICAL' as const
  },
  {
    code: 'FABRICATED_TESTIMONIAL',
    pattern: /("([^"]+)"\s*(?:[-–—]|,|\.)?\s*(said|according to|stated by|testifies)\s*(an? |the |client|customer|engineer|contractor|official|resident))/i,
    message: 'Fabricated customer testimonials or invented client endorsements are prohibited.',
    severity: 'CRITICAL' as const
  },
  {
    code: 'UNAUTHORIZED_EXCLUSIVE_CLAIM',
    pattern: /(exclusive\s+sole\s+distributor\s+of\s+(caterpillar|komatsu|sany|basf|sika|doka))/i,
    message: 'Unauthorized claims of exclusive dealership for global brands are prohibited.',
    severity: 'CRITICAL' as const
  },
  {
    code: 'DISCONTINUED_BUSINESS_UNIT',
    pattern: /\b(agrilink|odata|osemi)\b/i,
    message: 'Promotion of discontinued business units (Oranex AgriLink, ODATA, OSEMI) is prohibited. Portfolio focus must remain exclusively on ORANEX Trading, OCHEMI, and Construction & Industrial Supply Chain.',
    severity: 'CRITICAL' as const
  }
];
