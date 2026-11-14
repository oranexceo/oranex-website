export interface BrandKnowledgeBase {
  companyName: string;
  legalEntity: string;
  headquarters: string;
  internationalPartner: {
    name: string;
    role: string;
    contractingModel: string;
  };
  brandPositioning: string;
  pillars: {
    name: string;
    approvedClaims: string[];
    standardsReferenced: string[];
  }[];
  policyRules: {
    category: string;
    prohibitedPatterns: string[];
    explanation: string;
  }[];
  authorizedPartners: string[];
  approvedIncoterms: string[];
  brandVoiceGuidelines: string[];
}

export const APPROVED_ORANEX_KNOWLEDGE: BrandKnowledgeBase = {
  companyName: 'ORANEX',
  legalEntity: 'Oranex Trading One Member PLC',
  headquarters: 'NSL Sub-City, Addis Ababa, Federal Democratic Republic of Ethiopia',
  internationalPartner: {
    name: 'Our Chinese partner',
    role: 'International Sourcing, Manufacturing Coordination & Export Supply Partner',
    contractingModel: 'Under the collaborative business model, international procurement contracts and proforma invoices are generally executed directly with Our Chinese partner, with customers handling local Ethiopian customs/banking clearance. Oranex Trading provides local client acquisition, sampling, laboratory trial support, and account relationship management.'
  },
  brandPositioning: 'ORANEX — Integrated Supply. Technical Expertise. Global Sourcing.',
  pillars: [
    {
      name: 'Construction Chemicals & OCHEMI Admixtures',
      approvedClaims: [
        'OCHEMI PCE 50% provides high-range water reduction (up to 40%) for high-strength concrete.',
        'OCHEMI Slump Retaining PCE maintains workable slump for 90–150 minutes during Addis Ababa urban transit.',
        'Formulated to conform with ASTM C494 Type F & G and EN 934-2 T3.1/3.2 specifications.',
        'Available in 1,000L IBC tanks, 200L drums, and bulk flexitanks.',
        'Local laboratory mix trials and dosing system calibration supported in Addis Ababa by Oranex technical engineers.'
      ],
      standardsReferenced: ['ASTM C494 Type F', 'ASTM C494 Type G', 'EN 934-2', 'DIN 1048']
    },
    {
      name: 'Cementitious & Industrial Raw Materials',
      approvedClaims: [
        'Direct bulk sourcing of White Portland Cement CEM I 52.5 R with Hunter whiteness ≥ 88.5%.',
        'Densified Microsilica / Silica Fume (SiO2 ≥ 94%) for Ultra-High Performance Concrete (UHPC) and marine structures.',
        'Ground Granulated Blast-Furnace Slag (GGBS Grade 100/120) for mass-concrete heat-of-hydration reduction.',
        'All shipments backed by original Mill Test Certificates (MTC).'
      ],
      standardsReferenced: ['EN 197-1 CEM I 52.5R', 'ASTM C150 Type I', 'ASTM C1240']
    },
    {
      name: 'Concrete Production & Batching Equipment',
      approvedClaims: [
        'Commercial stationary batching plants (HZS60, HZS90, HZS120) with twin-shaft compulsory mixers.',
        'Bolted containerized cement silos (100 MT, 150 MT, 200 MT) for rapid on-site assembly.',
        'Heavy-duty transit mixer drums (10 m³ and 12 m³) with wear-resistant manganese steel alloy blades.'
      ],
      standardsReferenced: ['ISO 9001', 'CE Electrical Safety Standard']
    },
    {
      name: 'Heavy Construction Machinery & Fleet',
      approvedClaims: [
        'Hydraulic crawler excavators (20–35 ton class) configured for heavy aggregate and rock excavation.',
        'Front-end wheel loaders with heavy-duty rock buckets and high breakout force.',
        'Machinery sourced directly through Our Chinese partner global channels with original manufacturer warranty.'
      ],
      standardsReferenced: ['Tier 3 Mechanical Diesel Standards']
    },
    {
      name: 'Building & Finishing Materials',
      approvedClaims: [
        'High-tensile deformed steel rebar Grade 60 (BS 4449 / ASTM A615) in standard 12m lengths.',
        'Double-wall corrugated HDPE drainage pipes (SN8 stiffness) for stormwater culverts.'
      ],
      standardsReferenced: ['BS 4449 Grade 60', 'ASTM A615', 'EN 13476']
    },
    {
      name: 'Civil Engineering & Infrastructure',
      approvedClaims: [
        'Non-woven continuous filament polypropylene geotextiles (200–500 g/m²) for subgrade road stabilization.',
        'HDPE smooth geomembrane liners (1.5mm / 2.0mm) for retention dams and waste containment.'
      ],
      standardsReferenced: ['ASTM D5199', 'ASTM D6693']
    },
    {
      name: 'Merkato Wholesale & Container Consolidation (LCL Groupage)',
      approvedClaims: [
        'Direct China factory groupage and LCL shared containers starting from 2 CBM for Addis Ababa Merkato wholesalers.',
        'Staging warehouses in Yiwu, Guangzhou, Foshan, Ningbo, and Shandong with weekly container departures.',
        'Bank-compliant proforma invoices with verified HS codes for CBE, Awash, Dashen, and Abyssinia Letter of Credit queues.',
        'Full Pre-Shipment Quality Protocol (CQI) with 220V/50Hz burn-in testing and pre-sealing photographic reports.',
        'Private-label OEM branding: custom laser engraving and Amharic/English packaging from 300 units MOQ.'
      ],
      standardsReferenced: ['ECAE Ethiopian Standards', 'MOTRI Import Directives', 'ISO 9001', 'IEC 60898-1']
    }
  ],
  policyRules: [
    {
      category: 'EXCLUSIVE_IMPORTER_PROHIBITION',
      prohibitedPatterns: [
        'oranex is the exclusive importer of all',
        'we import everything and pay all duties for you',
        'sole importer of record'
      ],
      explanation: 'Under the approved model, international transactions are generally contracted directly with Our Chinese partner, with customers managing their own import clearances and foreign exchange.'
    },
    {
      category: 'PROHIBITED_UNVERIFIED_PARTNERS',
      prohibitedPatterns: [
        'caterpillar authorized dealer',
        'komatsu official sole distributor',
        'exclusive dangote cement joint venture',
        'government mandated monopoly'
      ],
      explanation: 'Never claim unauthorized dealerships or unverified brand partnerships beyond approved partners.'
    },
    {
      category: 'UNSUPPORTED_SUPERLATIVES',
      prohibitedPatterns: [
        '100% unbreakable concrete',
        'zero cement needed',
        'guaranteed zero cracks forever',
        'strongest concrete in world history'
      ],
      explanation: 'All structural and chemical claims must reflect sound civil engineering and recognized testing standards (ASTM/EN).'
    },
    {
      category: 'FABRICATED_PRICES_STOCK',
      prohibitedPatterns: [
        'cheapest price on earth guaranteed',
        '100,000 tons in our addis ababa stock right now',
        'guaranteed free delivery anywhere in 2 hours'
      ],
      explanation: 'Quotes are issued via formal proforma from Our Chinese partner based on international market commodity indexes.'
    },
    {
      category: 'DISCONTINUED_BUSINESS_UNITS_PROHIBITION',
      prohibitedPatterns: [
        'agrilink',
        'oranex agrilink',
        'odata',
        'odata analytics',
        'osemi',
        'osemi components'
      ],
      explanation: 'Discontinued business units (AgriLink, ODATA, OSEMI) must never be promoted or referenced in active marketing. Portfolio focus is strictly ORANEX Trading, OCHEMI, and Construction & Industrial Supply Chain.'
    }
  ],
  authorizedPartners: [
    'Our Chinese partner',
    'Ethiopian Chamber of Commerce and Sectoral Associations',
    'Djibouti Multimodal Transit Corridor Operators'
  ],
  approvedIncoterms: [
    'CIF Port of Djibouti (Free Zone transfer)',
    'DAP Modjo Dry Port (Bonded Rail Multimodal Transit)',
    'FOB International Port'
  ],
  brandVoiceGuidelines: [
    'Professional, authoritative B2B tone tailored to civil engineers, project directors, batching plant owners, and procurement managers.',
    'Technical rigor: always emphasize specifications (ASTM, EN, solid content, dosage percentage).',
    'Local commitment: highlight on-site trial support in Addis Ababa and Ethiopia regional industrial zones.',
    'Transparent international scale: emphasize direct manufacturing access through Our Chinese partner.'
  ]
};
