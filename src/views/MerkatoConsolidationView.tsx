import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  Package,
  Truck,
  ArrowRight,
  Calculator,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  FileText,
  Boxes,
  Layers,
  Wrench,
  Zap,
  Droplets,
  HardHat,
  ChevronRight,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Copy,
  Printer,
  Check,
  Search,
  RotateCcw,
  Compass,
  Anchor,
  Ship,
  Clock,
  Sliders,
  FileCheck2,
  BadgePercent,
  Plus,
  DollarSign
} from 'lucide-react';
import { LandedCostCalculator } from '../components/LandedCostCalculator';

interface TradeCluster {
  id: string;
  name: string;
  amharicName: string;
  chineseName: string;
  arabicName: string;
  tagline: string;
  icon: any;
  originHubs: string[];
  keyProducts: string[];
  typicalMoq: string;
}

interface FastMovingSku {
  id: string;
  name: string;
  amharicName: string;
  tera: string;
  category: string;
  hsCode: string;
  specs: string;
  pcsPerCtn: number;
  cbmPerCtn: number;
  weightKgPerCtn: number;
  unitPriceRange: string;
  moqCtns: number;
}

interface TrackingMilestone {
  step: number;
  title: string;
  location: string;
  date: string;
  completed: boolean;
  current: boolean;
  details: string;
}

interface ContainerTrackerData {
  containerNo: string;
  blNumber: string;
  destination: string;
  departureHub: string;
  departureDate: string;
  estimatedArrival: string;
  currentStatus: string;
  progressPercent: number;
  milestones: TrackingMilestone[];
}

export const MerkatoConsolidationView: React.FC = () => {
  const { openQuoteModal, submitLead, language } = useApp();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'calculator' | 'proforma-preview' | 'tracker' | 'skus' | 'oem-studio' | 'landed-cost'>('calculator');

  // Landed Cost prefill state (when clicking from a SKU card)
  const [landedCostPrefill, setLandedCostPrefill] = useState<{
    fobUsd: number;
    cbm: number;
    units: number;
    category: string;
    title: string;
  }>({
    fobUsd: 12000,
    cbm: 12,
    units: 1000,
    category: 'hardware-tools',
    title: 'Consolidated Hardware & Power Tools'
  });

  // Calculator State
  const [selectedHub, setSelectedHub] = useState<string>('Yiwu / Guangzhou');
  const [merchantName, setMerchantName] = useState<string>('');
  const [merchantShop, setMerchantShop] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('hardware_tools');
  const [estimatedCbm, setEstimatedCbm] = useState<number>(6);
  const [cargoWeightKg, setCargoWeightKg] = useState<number>(3500);
  const [bankPreference, setBankPreference] = useState<string>('Commercial Bank of Ethiopia (CBE)');
  const [incoterm, setIncoterm] = useState<string>('CIP Modjo Dry Port (Ethiopia)');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedProforma, setCopiedProforma] = useState<boolean>(false);
  const [skuSearch, setSkuSearch] = useState<string>('');
  const [selectedTeraFilter, setSelectedTeraFilter] = useState<string>('all');
  const [addedSkusCount, setAddedSkusCount] = useState<number>(0);

  // Tracking State
  const [searchedTrackingNo, setSearchedTrackingNo] = useState<string>('ET-YIW-2026-084');
  const [currentTrackingData, setCurrentTrackingData] = useState<ContainerTrackerData>({
    containerNo: 'TGHU924185-3 (40HQ)',
    blNumber: 'BL-ORX-YIW-2026-084',
    destination: 'Modjo Dry Port → Merkato Autobis Tera',
    departureHub: 'Yiwu Consolidation Center (Zhejiang)',
    departureDate: '18 Oct 2026',
    estimatedArrival: '12 Nov 2026',
    currentStatus: 'Vessel in Transit (Red Sea / Gulf of Aden Approach)',
    progressPercent: 65,
    milestones: [
      {
        step: 1,
        title: 'Cargo Received & CQI Quality Inspection',
        location: 'Yiwu Warehouse, China',
        date: '10 Oct 2026',
        completed: true,
        current: false,
        details: 'Cartons barcoded, palletized, drop-tested. 220V motor electrical test passed.'
      },
      {
        step: 2,
        title: 'Groupage Container Stuffing & Customs Seal',
        location: 'Yiwu Consolidation Terminal',
        date: '14 Oct 2026',
        completed: true,
        current: false,
        details: 'Loaded with mixed hardware, valves, and power tools. Seal #CN-SHA-89211.'
      },
      {
        step: 3,
        title: 'Ocean Vessel Departure',
        location: 'Ningbo-Zhoushan Port',
        date: '18 Oct 2026',
        completed: true,
        current: false,
        details: 'Laden on board ocean vessel M/V Red Sea Trader Voy 2610W.'
      },
      {
        step: 4,
        title: 'Maritime Transit (Red Sea / Bab el-Mandeb)',
        location: 'Red Sea International Waterway',
        date: 'Current Position',
        completed: false,
        current: true,
        details: 'Approaching Gulf of Aden. ETA Djibouti Seaport in 5 days.'
      },
      {
        step: 5,
        title: 'Discharge at Port of Djibouti',
        location: 'Doraleh Container Terminal (Djibouti)',
        date: 'Estimated 07 Nov 2026',
        completed: false,
        current: false,
        details: 'Customs transit manifest transfer to Ethiopian Shipping Lines (ESLSE).'
      },
      {
        step: 6,
        title: 'Bonded Rail Transit to Modjo Dry Port',
        location: 'Ethio-Djibouti Railway / Modjo Terminal',
        date: 'Estimated 10 Nov 2026',
        completed: false,
        current: false,
        details: 'Final bonded customs clearance & duty assessment.'
      },
      {
        step: 7,
        title: 'Consignment Handover at Merkato Shop',
        location: 'Addis Ababa (Autobis / Bomb Tera)',
        date: 'Estimated 12 Nov 2026',
        completed: false,
        current: false,
        details: 'Direct delivery and pallet unloading at buyer store.'
      }
    ]
  });

  // Fast-Moving SKUs Database
  const fastMovingSkus: FastMovingSku[] = [
    {
      id: 'sku-01',
      name: 'Heavy-Duty Angle Grinder 115mm (850W)',
      amharicName: 'አንግል ግራይንደር 115ሚሜ (850 ዋት)',
      tera: 'Autobis Tera',
      category: 'Power Tools',
      hsCode: '8467.29',
      specs: '220V/50Hz, 11,000 RPM, copper motor, spare carbon brushes included',
      pcsPerCtn: 10,
      cbmPerCtn: 0.052,
      weightKgPerCtn: 24,
      unitPriceRange: '$12.50 – $14.20 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-02',
      name: 'Inverter MMA Arc Welder 200A (IGBT Digital)',
      amharicName: 'የኤሌክትሪክ ብየዳ ማሽን 200A (ዲጂታል)',
      tera: 'Autobis Tera',
      category: 'Power Tools',
      hsCode: '8515.39',
      specs: 'IGBT technology, 220V single phase, with welding clamp & mask',
      pcsPerCtn: 2,
      cbmPerCtn: 0.042,
      weightKgPerCtn: 16,
      unitPriceRange: '$28.00 – $34.00 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-03',
      name: 'E6013 Mild Steel Welding Electrodes (2.5mm / 3.2mm)',
      amharicName: 'የብየዳ ኤሌክትሮድ 2.5ሚሜ እና 3.2ሚሜ',
      tera: 'Autobis Tera',
      category: 'Consumables',
      hsCode: '8311.10',
      specs: 'Grade AWS A5.1 E6013, 5kg inner box, 20kg master carton',
      pcsPerCtn: 4,
      cbmPerCtn: 0.014,
      weightKgPerCtn: 20,
      unitPriceRange: '$1.05 – $1.18 / kg',
      moqCtns: 25
    },
    {
      id: 'sku-04',
      name: 'Abrasive Cutting Discs for Metal (115×1.0×22.2mm)',
      amharicName: 'የብረት መቁረጫ ዲክስ 115ሚሜ',
      tera: 'Autobis Tera',
      category: 'Consumables',
      hsCode: '6804.22',
      specs: 'Double fiberglass reinforced mesh, MPA / EN12413 certified',
      pcsPerCtn: 400,
      cbmPerCtn: 0.021,
      weightKgPerCtn: 18,
      unitPriceRange: '$0.14 – $0.17 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-05',
      name: 'Heavy Brass Gate Valve DN25 (1 Inch) PN16',
      amharicName: 'የናስ ጌት ቫልቭ 1 ኢንች (DN25)',
      tera: 'Sebategna / Bomb Tera',
      category: 'Plumbing',
      hsCode: '8481.80',
      specs: 'Forged brass body CW617N, solid brass wedge, cast iron handwheel',
      pcsPerCtn: 48,
      cbmPerCtn: 0.028,
      weightKgPerCtn: 26,
      unitPriceRange: '$2.40 – $2.85 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-06',
      name: 'PPR Socket Fusion Gate Valve & Brass Insert Fittings',
      amharicName: 'ፒፒአር የውሃ ማስተላለፊያ እቃዎች እና ማገናኛዎች',
      tera: 'Sebategna / Bomb Tera',
      category: 'Plumbing',
      hsCode: '3917.40',
      specs: 'Virgin Sinopec PP-R material, D20 to D63mm, PN25 hot water rating',
      pcsPerCtn: 120,
      cbmPerCtn: 0.045,
      weightKgPerCtn: 19,
      unitPriceRange: '$0.35 – $1.80 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-07',
      name: 'MCB Miniature Circuit Breaker 1P/2P/3P (10A–63A)',
      amharicName: 'ሰርኪዩት ብሬከር (ዲጂታል ፍዩዝ)',
      tera: 'Somale Tera',
      category: 'Electrical',
      hsCode: '8536.20',
      specs: '6kA breaking capacity, IEC 60898-1 standard, silver contacts',
      pcsPerCtn: 120,
      cbmPerCtn: 0.026,
      weightKgPerCtn: 14,
      unitPriceRange: '$0.65 – $2.10 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-08',
      name: 'Commercial LED Panel Light 600×600mm (48W)',
      amharicName: 'የጣሪያ ኤልኢዲ ፓነል መብራት 60×60',
      tera: 'Somale Tera',
      category: 'Electrical',
      hsCode: '9405.10',
      specs: 'Isolated IC constant-current driver, 100 lm/W, 6500K daylight',
      pcsPerCtn: 10,
      cbmPerCtn: 0.088,
      weightKgPerCtn: 17,
      unitPriceRange: '$6.50 – $7.80 / pc',
      moqCtns: 5
    },
    {
      id: 'sku-09',
      name: 'Polished Glazed Porcelain Floor Tile (600×600mm)',
      amharicName: 'የወለል ፖርሲሊን ሴራሚክ 60×60',
      tera: 'Somale Tera',
      category: 'Finishing',
      hsCode: '6907.21',
      specs: 'Nano anti-fouling surface, water absorption <0.5%, Grade AAA',
      pcsPerCtn: 4,
      cbmPerCtn: 0.034,
      weightKgPerCtn: 32,
      unitPriceRange: '$3.80 – $4.60 / m²',
      moqCtns: 30
    },
    {
      id: 'sku-10',
      name: 'Neutral Silicone Weatherproofing Sealant (300ml)',
      amharicName: 'የመስታወት እና የበር ማሸጊያ ሲሊኮን 300ml',
      tera: 'Bomb Tera',
      category: 'Chemicals',
      hsCode: '3214.10',
      specs: 'Fast curing, odorless, high elasticity, UV & water resistant',
      pcsPerCtn: 24,
      cbmPerCtn: 0.019,
      weightKgPerCtn: 12,
      unitPriceRange: '$0.95 – $1.15 / cartridge',
      moqCtns: 10
    },
    {
      id: 'sku-11',
      name: 'CE S1P Steel-Toe Cap Safety Boots with Kevlar Midsole',
      amharicName: 'የብረት ጫማ የደህንነት ጫማ (ሴፍቲ ሹዝ)',
      tera: 'Senga Tera',
      category: 'Safety PPE',
      hsCode: '6403.40',
      specs: '200J steel toe impact, puncture resistant Kevlar sole, breathable mesh',
      pcsPerCtn: 10,
      cbmPerCtn: 0.072,
      weightKgPerCtn: 15,
      unitPriceRange: '$8.50 – $10.50 / pair',
      moqCtns: 5
    },
    {
      id: 'sku-12',
      name: 'Drop-Forged Scaffolding Couplers (Swivel & Right Angle)',
      amharicName: 'የስካፎልዲንግ ማያያዣ ክላምፕ',
      tera: 'Autobis Tera',
      category: 'Hardware',
      hsCode: '7308.40',
      specs: 'Drop-forged carbon steel, electro-galvanized BS1139/EN74 class A',
      pcsPerCtn: 25,
      cbmPerCtn: 0.025,
      weightKgPerCtn: 28,
      unitPriceRange: '$1.45 – $1.75 / pc',
      moqCtns: 10
    }
  ];

  // Clusters Data
  const tradeClusters: TradeCluster[] = [
    {
      id: 'hardware-tools',
      name: 'Hardware, Power Tools & Fasteners Tera',
      amharicName: 'የብረታ ብረት፣ የእጅ መሣሪያዎች እና ፈጣን ማያያዣዎች ተራ',
      chineseName: '五金、电动工具与标准紧固件专区',
      arabicName: 'أدوات ومعدات البناء والمثبتات',
      tagline: 'Autobis Tera & Bomb Tera Merchant Supply',
      icon: Wrench,
      originHubs: ['Yiwu Hub (Zhejiang)', 'Guangzhou Hub', 'Shandong Hub'],
      keyProducts: [
        'Angle grinders, rotary hammers & cordless drill sets',
        'Cut-off blades, grinding discs & diamond masonry blades',
        'Grade 8.8 & 10.9 structural bolts, self-tapping screws & drywall anchors',
        'Manual tile cutters, heavy spirit levels, spanners & socket sets',
        'Inverter welding machines (ARC/MIG/TIG) & E6013 welding electrodes'
      ],
      typicalMoq: 'From 1–2 Pallets (Mixed SKUs per crate)'
    },
    {
      id: 'electrical-lighting',
      name: 'Electrical, Lighting & Cable Merchants',
      amharicName: 'የኤሌክትሪክ ዕቃዎች፣ ኬብሎች እና የመብራት መሣሪያዎች',
      chineseName: '建筑电气、LED照明与电线电缆专区',
      arabicName: 'المعدات الكهربائية والإضاءة والكابلات',
      tagline: 'Somale Tera & Commercial Center Distributors',
      icon: Zap,
      originHubs: ['Zhongshan Lighting Hub', 'Wenzhou Electric Hub', 'Ningbo Hub'],
      keyProducts: [
        'Commercial LED panel lights, high-bay floodlights & street lanterns',
        'Miniature Circuit Breakers (MCB 1P/2P/3P), MCCB breakers & distribution DB boxes',
        'Modular light switches, international sockets & multi-gang boxes',
        'Rigid & corrugated PVC electrical conduits, bend fittings & junction boxes',
        'Single-core copper wiring (1.5mm²–16mm²) & armored underground cables'
      ],
      typicalMoq: 'From 2–3 CBM consolidated batch'
    },
    {
      id: 'plumbing-sanitary',
      name: 'Plumbing, Brass Valves & Sanitary Ware',
      amharicName: 'የውሃ ቧንቧዎች፣ የናስ ቫልቮች እና ሳኒተሪ ዕቃዎች',
      chineseName: '给排水PPR管件、黄铜阀门与卫浴五金专区',
      arabicName: 'السباكة والصمامات النحاسية والأدوات الصحية',
      tagline: 'Sebategna & Senga Tera Commercial Supply',
      icon: Droplets,
      originHubs: ['Foshan Sanitary Hub', 'Taizhou Valve Hub', 'Yuyao Plumbing Hub'],
      keyProducts: [
        'PPR hot/cold water pipes (PN20/PN25) and socket-fusion brass insert fittings',
        'Heavy brass gate valves, ball valves, check valves & water flow meters',
        'UPVC sanitary drainage pipes, waste traps & roof drainage outlets',
        'Stainless steel kitchen sinks, basin faucets & brass shower mixers',
        'Submersible deep-well pumps, peripheral booster pumps & float switches'
      ],
      typicalMoq: 'From 3 CBM mixed carton consignments'
    },
    {
      id: 'tiles-ceramics',
      name: 'Tiles, Granite, Trims & Chemical Sealants',
      amharicName: 'የሴራሚክ እና ፖርሲሊን ንጣፎች፣ ማስዋቢያዎች እና ማጣበቂያዎች',
      chineseName: '地砖墙砖、不锈钢收边条与硅酮结构胶专区',
      arabicName: 'السيراميك والبورسلين وإكسسوارات التشطيب',
      tagline: 'Direct Factory Sourcing for Tile Importers',
      icon: Layers,
      originHubs: ['Foshan Ceramic Capital', 'Shandong Hub', 'Fujian Hub'],
      keyProducts: [
        'Polished porcelain floor tiles (60×60cm, 80×80cm) Grade AAA',
        'Ceramic wall tiles for bathrooms & kitchens (30×60cm)',
        'Stainless steel 304 & aluminum tile edge trims and movement joints',
        'Neutral silicone weatherproofing sealants, acrylic sealants & PU expanding foam',
        'Tile leveling spacers, reusable clips & professional tile adhesive trowels'
      ],
      typicalMoq: 'From 5 CBM or combined half-container'
    },
    {
      id: 'worksite-ppe',
      name: 'Worksite Safety Gear (PPE) & Consumables',
      amharicName: 'የሰራተኞች የደህንነት መጠበቂያ አልባሳት እና አላቂ ዕቃዎች',
      chineseName: '工地劳保防护用品(PPE)与工程易损耗材专区',
      arabicName: 'معدات السلامة المهنية ومستهلكات المواقع',
      tagline: 'Wholesale Safety & Scaffolding Accessories',
      icon: HardHat,
      originHubs: ['Yiwu Commodity Market', 'Gaomi Safety Footwear Hub'],
      keyProducts: [
        'CE-certified steel-toe cap safety boots (S1P / S3 standard)',
        'Heavy-duty industrial hard hats with ratchet suspension & high-vis vests',
        'Split-leather welding gloves, cut-resistant nitrile gloves & rubber gloves',
        'Anti-dust respirators, safety goggles & face protection shields',
        'Drop-forged scaffolding right-angle & swivel couplers, safety harnesses'
      ],
      typicalMoq: 'From 1–2 CBM mixed crates'
    }
  ];

  const handleAddSkuToCargo = (sku: FastMovingSku) => {
    setEstimatedCbm((prev) => Math.min(68, +(prev + sku.cbmPerCtn * sku.moqCtns).toFixed(2)));
    setCargoWeightKg((prev) => Math.min(26000, +(prev + sku.weightKgPerCtn * sku.moqCtns).toFixed(0)));
    setAdditionalNotes((prev) => {
      const addition = `[${sku.name} (${sku.hsCode}): ${sku.moqCtns} cartons]`;
      return prev ? `${prev}, ${addition}` : addition;
    });
    setAddedSkusCount((c) => c + 1);
  };

  const handleCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      name: merchantName || 'Merkato Merchant',
      company: merchantShop ? `${merchantShop} (Merkato Addis Ababa)` : 'Merkato Wholesale Trader',
      email: 'oranexceo@gmail.com', // fallback
      phone: phone,
      productOrCategory: `Merkato Consolidation: ${selectedCategory} (${estimatedCbm} CBM / ${cargoWeightKg} kg)`,
      estimatedQuantity: `${estimatedCbm} CBM / approx ${cargoWeightKg} kg via ${selectedHub}`,
      deliveryLocation: 'Merkato Addis Ababa / Modjo Dry Port',
      brandingPreference: 'Recommend the best option' as const,
      notes: `Bank Preference: ${bankPreference}. Incoterm: ${incoterm}. Departure Hub: ${selectedHub}. Merchant notes: ${additionalNotes}`,
      sourceOrigin: 'Merkato Wholesale Consolidation Hub 2026',
      preferredLanguage: language
    };

    submitLead(leadData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const copyProformaToClipboard = () => {
    const text = `============================================================
ORANEX TRADING ONE MEMBER PLC & OUR CHINESE PARTNER
PROFORMA INVOICE SPECIFICATION FOR ETHIOPIAN COMMERCIAL BANKS
============================================================
Proforma Ref: PR-ORX-2026-${Math.floor(1000 + Math.random() * 9000)}
Date: ${new Date().toLocaleDateString('en-GB')}
Valid Until: 60 Days from Date of Issue

APPLICANT / CONSIGNEE (IMPORTER):
Company: ${merchantShop || 'Merkato Commercial Wholesaler'}
Contact Person: ${merchantName || 'Authorized Merchant Representative'}
Location: Merkato Trade District, Addis Ababa, Ethiopia
Tel/WhatsApp: ${phone || '+251 912 233 688'}

BENEFICIARY & EXPORTER:
ORANEX TRADING ONE MEMBER PLC (Addis Ababa, Ethiopia)
In strategic alliance with: Our Chinese partner (Yiwu/Guangzhou/Ningbo, P.R. China)

APPLICANT BANK (FOR DOCUMENTARY L/C):
Bank: ${bankPreference}
Branch: Commercial Division, Addis Ababa, Ethiopia

CARGO SPECIFICATION & TERMS:
Product Cluster: ${selectedCategory}
Consolidated Volume: ${estimatedCbm} CBM
Gross Weight Approx: ${cargoWeightKg.toLocaleString()} KG
Port of Loading: Ningbo / Guangzhou / Qingdao Port, China
Port of Discharge: Port of Djibouti (In-Transit to Ethiopia)
Final Destination: ${incoterm}
Incoterms: 2020 Rules

SPECIAL BANK & REGULATORY CLAUSES:
1. All goods conform strictly to the standard requirements of the Ethiopian Conformity Assessment Enterprise (ECAE) and Ministry of Trade and Regional Integration (MOTRI).
2. Clean on-board Ocean Bills of Lading consigned to the Order of ${bankPreference}, notify applicant.
3. Pre-shipment Quality & Count Inspection Certificate issued by Our Chinese partner Pre-loading Inspection Center.
4. Certificate of Origin issued by CCPIT (China Council for the Promotion of International Trade).

INQUIRY NOTES & ITEMS:
${additionalNotes || 'Consolidated mixed container items as per approved merchant packing list.'}
============================================================`;

    navigator.clipboard.writeText(text);
    setCopiedProforma(true);
    setTimeout(() => setCopiedProforma(false), 3000);
  };

  const filteredSkus = fastMovingSkus.filter((sku) => {
    const matchesSearch =
      sku.name.toLowerCase().includes(skuSearch.toLowerCase()) ||
      sku.hsCode.includes(skuSearch) ||
      sku.amharicName.includes(skuSearch);
    const matchesTera =
      selectedTeraFilter === 'all' ||
      (selectedTeraFilter === 'autobis' && sku.tera.includes('Autobis')) ||
      (selectedTeraFilter === 'bomb' && sku.tera.includes('Bomb')) ||
      (selectedTeraFilter === 'somale' && sku.tera.includes('Somale')) ||
      (selectedTeraFilter === 'sebategna' && sku.tera.includes('Sebategna')) ||
      (selectedTeraFilter === 'senga' && sku.tera.includes('Senga'));
    return matchesSearch && matchesTera;
  });

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-16 lg:py-24 px-4 sm:px-8 overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'zh'
                ? '埃塞俄比亚亚的斯亚贝巴 · 麦卡托 (MERKATO) 批发商直采拼箱中心'
                : language === 'am'
                ? 'የመርካቶ ጅምላ ሻጮች እና ችርቻሮ ነጋዴዎች የተጠቃለለ ጭነት (LCL GROUPAGE) ማዕከል'
                : language === 'ar'
                ? 'مركز تجميع وشحن الحاويات المشتركة لتجار سوق ميركاتو في أديس أبابا'
                : 'ADDIS ABABA MERKATO WHOLESALERS & RETAILERS CONSOLIDATION HUB'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
            {language === 'zh' ? (
              <>
                中国源头直采 · 拼箱集运 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
                  助力麦卡托商户告别中间商
                </span>
              </>
            ) : language === 'am' ? (
              <>
                ቀጥታ ከቻይና ፋብሪካዎች ወደ መርካቶ! <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
                  የተጠቃለለ ኮንቴነር ጭነት (LCL GROUPAGE)
                </span>
              </>
            ) : language === 'ar' ? (
              <>
                توريد مباشر من مصانع الصين <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
                  تجميع وشحن الحاويات المشتركة لسوق ميركاتو
                </span>
              </>
            ) : (
              <>
                DIRECT CHINA FACTORY SOURCING & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
                  SHARED CONTAINER (LCL) CONSOLIDATION
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {language === 'zh'
              ? '为亚的斯亚贝巴麦卡托五金工具、电气照明、卫浴水暖、瓷砖胶黏剂及劳保耗材批发商提供一站式集采。在义乌与广州设立拼箱集运仓，支持单批2立方米起拼，提供正规银行形式发票(Proforma)及吉布提直通莫乔干港(Modjo)一站式交付。'
              : language === 'am'
              ? 'በመርካቶ አውቶቢስ ተራ፣ ቦምብ ተራ፣ ሶማሌ ተራ፣ ሰባተኛ እና ሰንጋ ተራ ለሚገኙ የብረታ ብረት፣ የኤሌክትሪክ፣ የሳኒተሪ እና የማጠናቀቂያ ዕቃዎች ጅምላ ሻጮችና ቸርቻሪዎች። ከይዉ (Yiwu) እና ጓንግዡ (Guangzhou) መጋዘኖች ጀምሮ እስከ ሞጆ ደረቅ ወደብ እና መርካቶ ድረስ የተጠቃለለ አቅርቦት።'
              : language === 'ar'
              ? 'خدمة مخصصة لتجار الجملة والتجزئة في سوق ميركاتو الشهير في أديس أبابا. تجميع البضائع من إيوو وقوانغتشو وفوشان ونينغبو في حاويات مشتركة (LCL)، مع توفير فواتير شكلية معتمدة للبنوك الإثيوبية وشحن مباشر إلى ميناء مودجو الجاف.'
              : 'Empowering Addis Ababa Merkato traders across Autobis Tera, Bomb Tera, Somale Tera, Sebategna, and Senga Tera. Overcome high factory MOQs with our managed LCL shared container program, warehouse staging in Yiwu & Guangzhou, bank-approved proformas, and secure delivery to Modjo Dry Port.'}
          </p>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-4xl">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 flex items-center gap-2.5">
              <Boxes className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">From 2 CBM</p>
                <p className="text-[10px] text-slate-400">LCL Shared Groupage</p>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Bank Proformas</p>
                <p className="text-[10px] text-slate-400">CBE, Awash, Dashen</p>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Yiwu & Guangzhou</p>
                <p className="text-[10px] text-slate-400">China Staging Hubs</p>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">To Modjo Dry Port</p>
                <p className="text-[10px] text-slate-400">Addis Direct Handover</p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="pt-4 flex flex-wrap gap-2 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>1. CBM Cargo Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('skus')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'skus'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>2. Fast-Moving Tera SKUs</span>
              {addedSkusCount > 0 && (
                <span className="bg-slate-950 text-amber-400 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  +{addedSkusCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('proforma-preview')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'proforma-preview'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>3. Bank Proforma Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'tracker'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>4. Live Container Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('oem-studio')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'oem-studio'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>5. Merchant OEM Branding</span>
            </button>

            <button
              onClick={() => setActiveTab('landed-cost')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'landed-cost'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg font-black'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/80'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>6. Landed Cost Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: CBM CALCULATOR & INQUIRY */}
      {activeTab === 'calculator' && (
        <section id="cbm-calculator" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
          {/* 3 Core Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Mixed-SKU & Shared Containers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>The Problem:</strong> A single 40ft container of one SKU (e.g. angle grinders or brass valves) can tie up $60,000–$90,000 in capital.
                <br /><br />
                <strong>ORANEX Solution:</strong> Mix 5 to 25 fast-moving product lines into one shared container, or book from just 2 CBM in our scheduled groupage boxes.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Bank-Compliant Proformas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>The Problem:</strong> Ethiopian private & state banks frequently reject incomplete, vague, or non-conforming foreign proforma invoices.
                <br /><br />
                <strong>ORANEX Solution:</strong> We issue structured proformas with valid HS codes, clear Incoterms, and factory test backup ready for CBE, Awash, Dashen, and Abyssinia bank queues.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Direct Factory Pricing & Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>The Problem:</strong> Middlemen in Yiwu & Guangzhou add 15%–30% hidden commissions and swap goods with substandard counterfeits.
                <br /><br />
                <strong>ORANEX Solution:</strong> Direct contracting via Our Chinese partner with in-warehouse physical inspection, counting, and pallet strapping before container seal.
              </p>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800">
            <div className="max-w-3xl mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Consolidated LCL Volume & Quote Estimator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Calculate & Log Your Merkato Cargo
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Adjust the volume and weight sliders below. You can also add specific SKUs from Tab 2. Once submitted, our team prepares your bank-compliant proforma invoice.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Consolidation Inquiry Logged Successfully!</h3>
                <p className="text-sm text-slate-300 max-w-xl mx-auto">
                  Thank you, <strong>{merchantName || 'Valued Merchant'}</strong>. Your mixed cargo requirement for{' '}
                  <strong>{merchantShop || 'your Merkato business'}</strong> ({estimatedCbm} CBM / {cargoWeightKg.toLocaleString()} KG) has been transmitted to Eng. Petros Abebe Mengesha and our sourcing team.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://wa.me/251912233688?text=Hello%20Eng.%20Petros,%20I%20just%20submitted%20a%20Merkato%20consolidation%20request%20for%20${estimatedCbm}%20CBM%20for%20${encodeURIComponent(merchantShop || 'my shop')}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Eng. Petros Directly</span>
                  </a>
                  <button
                    onClick={() => setActiveTab('proforma-preview')}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition inline-flex items-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>View Generated Proforma</span>
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                  >
                    Calculate Another Order
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCalculatorSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Merchant / Importer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ato Getachew Tadesse"
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Shop / Store Name & Location in Merkato *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Getachew Tools, Autobis Tera Building #4"
                      value={merchantShop}
                      onChange={(e) => setMerchantShop(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Phone / WhatsApp Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+251 91 ... / +251 92 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Primary Product Category *</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="hardware_tools">Hardware, Power Tools & Fasteners Tera</option>
                      <option value="electrical_lighting">Electrical, Lighting & Cables</option>
                      <option value="plumbing_sanitary">PPR Pipes, Brass Valves & Sanitary</option>
                      <option value="tiles_ceramics">Tiles, Granite, Trims & Sealants</option>
                      <option value="worksite_ppe">Worksite Safety Gear (PPE) & Consumables</option>
                      <option value="mixed_general">Multi-Category Mixed Container</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">China Departure Hub Preference</label>
                    <select
                      value={selectedHub}
                      onChange={(e) => setSelectedHub(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Yiwu / Guangzhou">Yiwu or Guangzhou Hub (Recommended for Mixed Cargo)</option>
                      <option value="Foshan">Foshan Hub (Recommended for Tiles & Sanitary)</option>
                      <option value="Ningbo / Wenzhou">Ningbo / Wenzhou Hub (Valves & Electrical)</option>
                      <option value="Shandong">Shandong Hub (Abrasives, Welding & Hardware)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Bank for LC / Proforma Invoice</label>
                    <select
                      value={bankPreference}
                      onChange={(e) => setBankPreference(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                      <option value="Awash Bank">Awash Bank</option>
                      <option value="Dashen Bank">Dashen Bank</option>
                      <option value="Bank of Abyssinia">Bank of Abyssinia</option>
                      <option value="Hibret Bank">Hibret Bank</option>
                      <option value="Nib International Bank">Nib International Bank</option>
                      <option value="Other Bank / Own FX Source">Other Bank / Franco Valuta (Own FX)</option>
                    </select>
                  </div>
                </div>

                {/* Volume & Weight Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">Estimated Cargo Volume:</span>
                      <span className="font-mono font-bold text-amber-400 text-base">{estimatedCbm} CBM</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="68"
                      step="1"
                      value={estimatedCbm}
                      onChange={(e) => setEstimatedCbm(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>2 CBM (Small LCL)</span>
                      <span>15 CBM (Medium Groupage)</span>
                      <span>28 CBM (20ft FCL)</span>
                      <span>68 CBM (40ft HQ FCL)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">Approx Cargo Weight:</span>
                      <span className="font-mono font-bold text-amber-400 text-base">{cargoWeightKg.toLocaleString()} KG</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="26000"
                      step="500"
                      value={cargoWeightKg}
                      onChange={(e) => setCargoWeightKg(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>500 KG</span>
                      <span>5,000 KG</span>
                      <span>14,000 KG</span>
                      <span>26,000 KG (Max Payload)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300">Specific Product List or Special Requirements</label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('skus')}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                    >
                      <span>+ Browse & Add Fast-Moving SKUs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="List specific brands, item descriptions, quantities, or model numbers you are looking to purchase..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] text-slate-400">
                    Proformas are formatted to National Bank of Ethiopia (NBE) & ECAE compliance standards.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('proforma-preview')}
                      className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                    >
                      Preview Proforma →
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl transition transform active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Consolidation Request →'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: FAST-MOVING TERA SKUS CATALOGUE */}
      {activeTab === 'skus' && (
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                Pre-Approved Factory Catalog
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Fast-Moving Merkato Wholesaler SKUs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Select items to quickly add to your container CBM calculation. All products come with valid Ethiopian HS Codes, CE / ISO conformity certifications, and factory-direct wholesale pricing via Our Chinese partner.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search SKU, HS Code, or Tera..."
                  value={skuSearch}
                  onChange={(e) => setSkuSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 w-56 sm:w-72"
                />
              </div>
            </div>
          </div>

          {/* Tera Filter Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedTeraFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedTeraFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Teras ({fastMovingSkus.length})
            </button>
            <button
              onClick={() => setSelectedTeraFilter('autobis')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedTeraFilter === 'autobis'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Autobis Tera (Tools & Welding)
            </button>
            <button
              onClick={() => setSelectedTeraFilter('bomb')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedTeraFilter === 'bomb'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Bomb Tera & Sebategna (Plumbing & Valves)
            </button>
            <button
              onClick={() => setSelectedTeraFilter('somale')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedTeraFilter === 'somale'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Somale Tera (Electrical & Tiles)
            </button>
            <button
              onClick={() => setSelectedTeraFilter('senga')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedTeraFilter === 'senga'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Senga Tera (Safety PPE)
            </button>
          </div>

          {/* SKU Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkus.map((sku) => (
              <div
                key={sku.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      HS {sku.hsCode}
                    </span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {sku.tera}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                      {sku.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{sku.amharicName}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{sku.specs}</p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Packaging:</span>
                      <strong>{sku.pcsPerCtn} pcs/carton</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Carton Volume:</span>
                      <strong>{sku.cbmPerCtn} CBM ({sku.weightKgPerCtn} kg)</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Direct Factory Price:</span>
                      <strong>{sku.unitPriceRange}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    MOQ: {sku.moqCtns} ctns
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const avgPrice = parseFloat(sku.unitPriceRange.replace(/[^0-9.]/g, '')) || 12;
                        const estimatedTotalFob = Math.round(avgPrice * sku.pcsPerCtn * sku.moqCtns);
                        const estimatedCbmVal = +(sku.cbmPerCtn * sku.moqCtns).toFixed(2);
                        setLandedCostPrefill({
                          fobUsd: Math.max(500, estimatedTotalFob),
                          cbm: Math.max(2, estimatedCbmVal),
                          units: sku.pcsPerCtn * sku.moqCtns,
                          category:
                            sku.category === 'Power Tools' || sku.category === 'Hardware'
                              ? 'hardware-tools'
                              : sku.category === 'Plumbing'
                              ? 'semi-finished'
                              : sku.category === 'Finishing'
                              ? 'finished-consumer'
                              : 'hardware-tools',
                          title: sku.name
                        });
                        setActiveTab('landed-cost');
                      }}
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-lg transition inline-flex items-center gap-1"
                      title="Calculate Ethiopian import taxes and landed cost for this SKU"
                    >
                      <DollarSign className="w-3 h-3 text-emerald-600" />
                      <span>Landed Cost</span>
                    </button>
                    <button
                      onClick={() => handleAddSkuToCargo(sku)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-blue-900 font-medium">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Added SKUs automatically accumulate into your CBM Calculator in Tab 1.</span>
            </div>
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shrink-0"
            >
              Return to Cargo Calculator ({estimatedCbm} CBM) →
            </button>
          </div>
        </section>
      )}

      {/* TAB 3: BANK-COMPLIANT PROFORMA GENERATOR & PREVIEW */}
      {activeTab === 'proforma-preview' && (
        <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                Official Trade Finance Format
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ethiopian Bank Proforma Invoice Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Formatted specifically for Letter of Credit (L/C) submission to Commercial Bank of Ethiopia (CBE), Awash, Dashen, or Abyssinia.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyProformaToClipboard}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm transition inline-flex items-center gap-2"
              >
                {copiedProforma ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedProforma ? 'Copied to Clipboard!' : 'Copy Proforma Text'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Proforma Paper View */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-300 shadow-xl space-y-8 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  OFFICIAL PROFORMA INVOICE
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">ORANEX TRADING ONE MEMBER PLC</h3>
                <p className="text-xs text-slate-500">Commercial Registration No: AA/BOL/0019844/2016 • TIN: 0072948192</p>
                <p className="text-xs text-slate-500">NSL Sub-City, Addis Ababa, Federal Democratic Republic of Ethiopia</p>
                <p className="text-xs text-slate-500">International Sourcing Alliance: <strong>Our Chinese partner</strong> (P.R. China)</p>
              </div>

              <div className="text-left sm:text-right space-y-1 text-xs">
                <p><strong>Proforma No:</strong> <span className="font-mono text-blue-700">PR-ORX-2026-{Math.floor(1000 + Math.random() * 9000)}</span></p>
                <p><strong>Date of Issue:</strong> {new Date().toLocaleDateString('en-GB')}</p>
                <p><strong>Validity:</strong> 60 Days from Date of Issue</p>
                <p><strong>Currency:</strong> USD (United States Dollars)</p>
              </div>
            </div>

            {/* Importer & Bank Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Applicant / Importer:</span>
                <p className="font-bold text-slate-900 text-sm">{merchantShop || 'Merkato Commercial Wholesaler'}</p>
                <p className="text-slate-600">Attn: {merchantName || 'Authorized Store Owner'}</p>
                <p className="text-slate-600">Location: Merkato Trade District, Addis Ababa, Ethiopia</p>
                <p className="text-slate-600">Phone: {phone || '+251 912 233 688'}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Appointed Bank (L/C Issuing):</span>
                <p className="font-bold text-blue-800 text-sm">{bankPreference}</p>
                <p className="text-slate-600">Incoterms: <strong>{incoterm}</strong> (Incoterms 2020)</p>
                <p className="text-slate-600">Departure Hub: <strong>{selectedHub}</strong></p>
                <p className="text-slate-600">Payment: <strong>Irrevocable Documentary L/C at Sight</strong></p>
              </div>
            </div>

            {/* Cargo Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-700 uppercase font-bold text-[10px]">
                    <th className="py-2.5">Item & Description</th>
                    <th className="py-2.5">HS Code</th>
                    <th className="py-2.5">Est. Volume</th>
                    <th className="py-2.5">Gross Weight</th>
                    <th className="py-2.5 text-right">Incoterm Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-3 font-medium">
                      <strong>Consolidated Merkato Commercial Cargo</strong>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {additionalNotes || 'Mixed assortment of hardware, power tools, valves, and electrical consumables.'}
                      </div>
                    </td>
                    <td className="py-3 font-mono font-bold text-blue-700">Various / Approved</td>
                    <td className="py-3 font-mono font-bold">{estimatedCbm} CBM</td>
                    <td className="py-3 font-mono font-bold">{cargoWeightKg.toLocaleString()} KG</td>
                    <td className="py-3 text-right font-medium text-slate-900">{incoterm}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Standard Bank & ECAE Compliance Clauses */}
            <div className="space-y-3 pt-4 border-t border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                Mandatory Ethiopian Trade Regulatory Declarations:
              </h4>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>
                  <strong>ECAE Conformity:</strong> All items listed conform strictly to the mandatory quality directives of the <em>Ethiopian Conformity Assessment Enterprise (ECAE)</em> and Ethiopian Standards Agency (ESA).
                </li>
                <li>
                  <strong>Bills of Lading:</strong> Clean On-Board Ocean Bills of Lading consigned to the Order of <em>{bankPreference}</em>, notify applicant.
                </li>
                <li>
                  <strong>Country of Origin:</strong> People's Republic of China. Official Certificate of Origin issued by CCPIT.
                </li>
                <li>
                  <strong>Pre-Shipment Quality Protocol:</strong> Physical inspection, count certification, and packaging reinforcement conducted by <em>Our Chinese partner Inspection Center</em> prior to container sealing.
                </li>
              </ul>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Authorized Signatory (Ethiopia):</p>
                <p className="font-bold text-slate-900 mt-1">Eng. Petros Abebe Mengesha</p>
                <p className="text-slate-500">CEO / Managing Director • ORANEX Trading One Member PLC</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                  Ready for CBE / Private Bank Submission
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: LIVE CONTAINER TRACKER & MILESTONE SIMULATOR */}
      {activeTab === 'tracker' && (
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
              China to Modjo Dry Port Logistics
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Live Container & LCL Consignment Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Track the exact voyage milestones of your consolidated shipment from warehouse stuffing in Yiwu/Guangzhou, through ocean transit, Djibouti port discharge, and final clearance at Modjo Dry Port.
            </p>
          </div>

          {/* Quick Demo Container References */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Select Active Voyage to Inspect:</span>
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => {
                  setSearchedTrackingNo('ET-YIW-2026-084');
                  setCurrentTrackingData({
                    containerNo: 'TGHU924185-3 (40HQ)',
                    blNumber: 'BL-ORX-YIW-2026-084',
                    destination: 'Modjo Dry Port → Merkato Autobis Tera',
                    departureHub: 'Yiwu Consolidation Center',
                    departureDate: '18 Oct 2026',
                    estimatedArrival: '12 Nov 2026',
                    currentStatus: 'Vessel in Transit (Red Sea / Gulf of Aden)',
                    progressPercent: 65,
                    milestones: currentTrackingData.milestones
                  });
                }}
                className={`px-3 py-1.5 rounded-lg font-bold font-mono transition ${
                  searchedTrackingNo === 'ET-YIW-2026-084'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ET-YIW-2026-084 (Yiwu Mixed Tools)
              </button>
              <button
                onClick={() => {
                  setSearchedTrackingNo('ET-CAN-2026-112');
                  setCurrentTrackingData({
                    containerNo: 'MSKU482019-1 (40HQ)',
                    blNumber: 'BL-ORX-CAN-2026-112',
                    destination: 'Modjo Dry Port → Somale Tera',
                    departureHub: 'Guangzhou / Foshan Hub',
                    departureDate: '02 Oct 2026',
                    estimatedArrival: '04 Nov 2026',
                    currentStatus: 'Arrived at Modjo Dry Port (Customs Clearance)',
                    progressPercent: 90,
                    milestones: currentTrackingData.milestones.map((m, idx) => ({
                      ...m,
                      completed: idx <= 5,
                      current: idx === 5
                    }))
                  });
                }}
                className={`px-3 py-1.5 rounded-lg font-bold font-mono transition ${
                  searchedTrackingNo === 'ET-CAN-2026-112'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ET-CAN-2026-112 (Foshan Tiles & Sanitary)
              </button>
            </div>
          </div>

          {/* Active Container Status Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
                  CONTAINER VOYAGE STATUS
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{currentTrackingData.containerNo}</h3>
                <p className="text-xs text-slate-400 font-mono">B/L: {currentTrackingData.blNumber}</p>
              </div>

              <div className="text-left sm:text-right space-y-1 text-xs">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-full border border-amber-500/40 inline-block">
                  {currentTrackingData.currentStatus}
                </span>
                <p className="text-slate-400 text-[11px] mt-1">Est. Modjo Handover: <strong>{currentTrackingData.estimatedArrival}</strong></p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Origin: {currentTrackingData.departureHub}</span>
                <span className="font-bold text-amber-400">{currentTrackingData.progressPercent}% Completed</span>
                <span>Destination: {currentTrackingData.destination}</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentTrackingData.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Milestones Vertical / Horizontal Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-4">
              {currentTrackingData.milestones.map((m) => (
                <div
                  key={m.step}
                  className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                    m.current
                      ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg'
                      : m.completed
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">Step 0{m.step}</span>
                      {m.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : m.current ? (
                        <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                      )}
                    </div>
                    <h4 className="font-bold text-xs leading-snug">{m.title}</h4>
                    <p className="text-[10px] text-slate-400">{m.location}</p>
                  </div>
                  <p className="text-[10px] font-mono text-amber-300/80 pt-3 border-t border-slate-800/80 mt-3">
                    {m.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: MERCHANT PRIVATE-LABEL & OEM BRANDING STUDIO */}
      {activeTab === 'oem-studio' && (
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
              Build Your Own Store Brand Equity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Merchant OEM & Private-Label Branding Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Why build someone else’s brand? ORANEX and Our Chinese partner enable Merkato wholesalers to establish their own proprietary trademark across tools, valves, welding machines, and tiles with minimum order quantities as low as 300 units.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">Laser Engraving & Tool Castings</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permanent laser engraving of your business trademark, logo, and model codes directly on aluminum gearbox housings, brass valve bodies, and steel pliers.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">Amharic & English Retail Packaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Custom full-color retail boxes with your shop branding, barcode stickers, user manuals, and warranty cards in both Amharic and English complying with MOTRI directives.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">Proprietary Color Matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose distinct brand casing colors (e.g. customized industrial orange, deep cyan, or emerald green) to give your tools and equipment unmistakable shelf presence in Merkato.
              </p>
            </div>
          </div>

          {/* OEM Inquiry Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-black">Want to create your own brand in Merkato?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Bring your logo or concept to our commercial desk. We will arrange factory sample molds, packaging proofs, and pilot batch consolidation from China.
              </p>
            </div>
            <button
              onClick={() => openQuoteModal({ productOrScope: 'Merkato Merchant OEM & Private Label Sourcing' })}
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-xl shrink-0"
            >
              Start OEM Consultation →
            </button>
          </div>
        </section>
      )}

      {/* TAB 6: ETHIOPIAN IMPORT LANDED COST CALCULATOR */}
      {activeTab === 'landed-cost' && (
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
          <LandedCostCalculator
            initialFobUsd={landedCostPrefill.fobUsd}
            initialCbm={landedCostPrefill.cbm}
            initialUnits={landedCostPrefill.units}
            initialCategory={landedCostPrefill.category}
          />
        </section>
      )}

      {/* SECTION: PRE-SHIPMENT QUALITY ASSURANCE PROTOCOL */}
      <section className="py-16 px-4 sm:px-8 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
              Zero Risk Sourcing
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pre-Shipment Quality Protocol by Our Chinese partner
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Never worry about opening a container at Modjo Dry Port only to discover wrong specifications or damaged goods. Every consolidated consignment undergoes our 4-point verification before container sealing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                CQI 1
              </div>
              <h4 className="font-bold text-sm text-slate-900">220V/50Hz Burn-In</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sample testing of all electric power tools and pumps for Ethiopian voltage spikes and thermal stability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                CQI 2
              </div>
              <h4 className="font-bold text-sm text-slate-900">Hydrostatic Valve Pressure</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Batch pressure verification on brass gate valves and PPR fittings to verify PN16/PN25 pressure ratings prior to container dispatch.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                CQI 3
              </div>
              <h4 className="font-bold text-sm text-slate-900">Carton Drop & Moisture Pack</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reinforced corrugated 5-ply cartons with moisture desiccant packs to withstand maritime humidity and road haulage.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                CQI 4
              </div>
              <h4 className="font-bold text-sm text-slate-900">Photo / Video Proof</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                High-resolution video of packed cartons, container stuffing, and customs seal dispatch directly to your WhatsApp before departure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EXECUTIVE LIAISON & ADDIS ABABA DESK */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Direct Commercial Liaison for Merkato Traders
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Addis Ababa Trade Desk
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We invite Merkato store owners, importer associations, and wholesalers to consult with our leadership in Addis Ababa. Bring your product samples or bills of quantities to review factory direct pricing, proforma structuring, and upcoming container staging dates.
            </p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Executive: <strong>Eng. Petros Abebe Mengesha</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mobile/WhatsApp: <strong>+251 912 233 688</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Email: <strong>Oranexceo@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Office: <strong>Addis Ababa, Commercial Corridor</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/251912233688?text=Hello%20Eng.%20Petros,%20I%20would%20like%20to%20schedule%20a%20Merkato%20sourcing%20meeting"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition text-center"
            >
              Direct WhatsApp Chat
            </a>
            <button
              onClick={() => openQuoteModal({ productOrScope: 'Merkato Wholesale Container Consolidation (LCL)' })}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center"
            >
              Request Sourcing Meeting
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
