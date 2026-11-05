import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { BoqInquiryForm } from '../components/sourcing/BoqInquiryForm';
import { CataloguePreviewModal } from '../components/sourcing/CataloguePreviewModal';
import {
  ShieldCheck,
  Building2,
  HardHat,
  ArrowRight,
  Download,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Globe2,
  Truck,
  Factory,
  Layers,
  Wrench,
  FlaskConical,
  Package,
  Clock,
  Compass,
  Ship,
  Eye,
  Award,
  ChevronRight,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Calculator
} from 'lucide-react';

export const ConstructionMaterialsSourcingView: React.FC = () => {
  const { openQuoteModal, navigate, language } = useApp();

  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);
  const [selectedPackageForForm, setSelectedPackageForForm] = useState<string>('PACKAGE_C');
  const [selectedCategoryForForm, setSelectedCategoryForForm] = useState<string>('');

  const boqFormRef = useRef<HTMLDivElement>(null);

  const scrollToBoqForm = (pkg?: string, cat?: string) => {
    if (pkg) setSelectedPackageForForm(pkg);
    if (cat) setSelectedCategoryForForm(cat);
    boqFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Supply Categories Data
  const categoriesData = [
    {
      id: 'road-construction',
      code: 'CATEGORY 01',
      title: 'Road Construction & Asphalt Materials',
      subtitle: 'Heavy Highway Paving, Prime/Tack Coats & Subgrade Stabilization',
      image: '/src/assets/images/road_asphalt_infrastructure_1793446355305.jpg',
      badge: 'Highway & Civils',
      description: 'Turnkey procurement of penetration-grade bitumen, cutbacks, subgrade geosynthetics, and safety infrastructure sourced directly from vetted international refineries and certified manufacturers in China and globally.',
      products: [
        { name: 'Paving Bitumen 60/70', spec: 'Penetration grade asphalt cement for heavy-traffic highways, AASHTO M20 / ASTM D946 compliant, supplied in 200kg steel drums and bulk bitutainers.' },
        { name: 'MC-30 Cutback Bitumen', spec: 'Medium-curing cutback asphalt for prime coat penetration on aggregate road bases prior to asphalt surfacing.' },
        { name: 'RC-70 Cutback Bitumen', spec: 'Rapid-curing cutback bitumen for high-adhesion tack coats and bituminous surface treatment dressings.' },
        { name: 'Road Construction & Pavement Materials', spec: 'Hydrated lime, asphalt anti-stripping additives, thermoplastic highway marking paints, and reflective drop-on glass beads.' },
        { name: 'Geosynthetics & Drainage Products', spec: 'Non-woven continuous filament geotextiles (200–500 g/m²), biaxial polypropylene geogrids, and HDPE slotted drainage culverts.' },
        { name: 'Road Safety & Traffic Management', spec: 'Galvanized W-beam highway guardrails with posts, retroreflective road signage panels, and solar LED road delineators.' }
      ]
    },
    {
      id: 'concrete-readymix',
      code: 'CATEGORY 02',
      title: 'Concrete, Ready-Mix & Precast Solutions',
      subtitle: 'Advanced Polycarboxylate Admixtures, Waterproofing & Precast Shuttering',
      image: '/src/assets/images/concrete_batching_plant_1792156881168.jpg',
      badge: 'Structural Concrete',
      description: 'Specialist concrete chemistry and precast components formulated to overcome regional Ethiopian cement variations, high ambient temperatures, and long transit times in urban corridors.',
      products: [
        { name: 'Concrete Admixtures & Raw Materials', spec: 'High-performance polycarboxylate ether (PCE) mother liquid (50% solid content) conforming to ASTM C494 Type F & G.' },
        { name: 'PCE & SNF Superplasticizers', spec: 'Liquid and powdered superplasticizers delivering up to 40% water reduction with extended slump retention for bridge and high-rise pours.' },
        { name: 'Sodium Lignosulphonate', spec: 'Purified bio-based water-reducing plasticizer and retarder for commercial batching plants and grinding aids.' },
        { name: 'Retarders & Set Accelerators', spec: 'Sodium gluconate extended-setting retarders and non-chloride calcium formate accelerators for cold-weather and precast curing.' },
        { name: 'Other Admixture Components', spec: 'Defoamers, air-entraining agents, anti-shrinkage additives, and viscosity-modifying agents (VMA) for self-consolidating concrete (SCC).' },
        { name: 'Waterproofing & Concrete Protection', spec: 'Crystalline capillary waterproofing powder, integral hydrophobic admixture, and silane-siloxane deep penetrating sealers.' },
        { name: 'Precast Accessories & Formwork Systems', spec: 'Precast lifting anchors (1.3T–32T), magnetic formwork box chamfers, modular steel shuttering panels, and chemical mold release oils.' }
      ]
    },
    {
      id: 'building-finishing',
      code: 'CATEGORY 03',
      title: 'Building Construction & Finishing',
      subtitle: 'Structural Steel, Envelopes, Architectural Finishes & Turnkey MEP',
      image: '/src/assets/images/building_materials_finishing_1793446404459.jpg',
      badge: 'Commercial & Residential',
      description: 'From foundation structural steel and white cement to exterior curtain wall glass, full-body porcelain tiles, and certified MEP electrical and plumbing lines.',
      products: [
        { name: 'Structural & Civil Construction Materials', spec: 'High-tensile deformed rebar BS 4449 / ASTM A615 Grade 60, structural steel H-beams, hollow sections (SHS/RHS), and wire rod.' },
        { name: 'Cement-Based Products & Dry-Mix Materials', spec: 'White Portland Cement CEM I 52.5 R (Hunter Whiteness ≥ 88.5%), silica fume microsilica (SiO2 ≥ 94%), and GGBS blast-furnace slag.' },
        { name: 'Waterproofing Systems & Construction Chemicals', spec: 'Torch-on APP/SBS modified bituminous membranes (3mm/4mm), 2K polyurethane coatings, and high-performance joint sealants.' },
        { name: 'Roofing, Façade, Doors & Windows', spec: 'Aluminum composite panels (ACP), double-glazed low-E curtain wall glass, insulated polyurethane (PU) sandwich panels, and fire doors.' },
        { name: 'Tiles, Flooring & Ceiling Systems', spec: 'Full-body porcelain floor tiles (60x60, 60x120), commercial vitrified tiles, industrial anti-static epoxy flooring, and mineral acoustic ceilings.' },
        { name: 'Paints, Coatings & Decorative Finishes', spec: 'Weather-resistant acrylic exterior wall paints, elastomeric coatings, anti-carbonation coatings, and interior washable paints.' },
        { name: 'Plumbing, Sanitary & Electrical Materials', spec: 'PPR hot/cold water supply pipes, PVC-U drainage pipes, vitreous china sanitary ware, brass ball valves, and certified copper building wire.' },
        { name: 'Lighting, HVAC & Ventilation Systems', spec: 'Commercial LED panel and high-bay fixtures, VRF modular central air conditioning systems, galvanized spiral ducting, and exhaust fans.' },
        { name: 'Fire Safety & Building Protection', spec: 'UL/FM certified automatic sprinkler valves, fire hydrant cabinets, fire pumps, seamless fire-fighting piping, and alarm networks.' }
      ]
    },
    {
      id: 'equipment-tools',
      code: 'CATEGORY 04',
      title: 'Construction Equipment, Tools & Site Supplies',
      subtitle: 'Heavy Machinery Fleet, Power Systems, Surveying Instruments & PPE',
      image: '/src/assets/images/construction_machinery_site_1792156911328.jpg',
      badge: 'Fleet & Tools',
      description: 'Direct factory sourcing of heavy earthmoving machinery, site power generation, engineering laboratory test apparatus, and safety supplies through Our Chinese partner global manufacturer network.',
      products: [
        { name: 'Construction Machinery & Heavy Fleet', spec: 'Hydraulic crawler excavators (20T–35T), 5-ton wheel loaders, motor graders, tandem vibratory rollers, and heavy transit concrete mixers.' },
        { name: 'Generators, Pumps & Compressors', spec: 'Containerized diesel generator sets (50 kVA–1000 kVA), high-head diesel dewatering slurry pumps, and portable rotary screw air compressors.' },
        { name: 'Welding Machines & Power Tools', spec: 'Industrial digital MIG/MMA/TIG inverter welding stations, heavy demolition rotary hammers, rebar cutting/bending machinery, and core drills.' },
        { name: 'Surveying & Laboratory Equipment', spec: 'Electronic total stations, dual-frequency GNSS RTK GPS receivers, automatic optical levels, and 2000 kN concrete compression test machines.' },
        { name: 'Personal Protective Equipment (PPE)', spec: 'CE/EN certified industrial safety hard hats, high-visibility reflective vests, steel-toe puncture-resistant boots, and fall-arrest harnesses.' },
        { name: 'Fasteners, Abrasives & Consumables', spec: 'High-strength structural bolt assemblies Grade 8.8 and 10.9, reinforced cutting and grinding discs, diamond concrete blades, and tie wire.' }
      ]
    },
    {
      id: 'manufacturing-support',
      code: 'CATEGORY 05',
      title: 'Construction Material Manufacturing Support',
      subtitle: 'Complete Turnkey Production Lines, Machinery & Bulk Raw Materials',
      image: '/src/assets/images/material_manufacturing_plant_1793446419783.jpg',
      badge: 'Industrial Manufacturing',
      description: 'ORANEX coordinates sourcing of industrial machinery, blending plants, raw chemical polymers, and production equipment for manufacturers setting up or expanding in Ethiopia.',
      products: [
        { name: 'Ready-Mix Concrete & Precast Production', spec: 'Stationary commercial concrete batching plants (HZS60, HZS90, HZS120, HZS180) with twin-shaft compulsory mixers, automated PLC consoles, and bolted cement silos.' },
        { name: 'Dry-Mix Mortar & Tile Adhesive Lines', spec: 'Automated dry-mix mortar mixing plants, ribbon blenders, pneumatic valve-bag packing machines, and dust filtration collector systems.' },
        { name: 'Waterproofing & Coating Production', spec: 'High-speed paint and chemical dispersers, liquid mixing reactors, sand grinding mills, and stainless steel blending tanks.' },
        { name: 'Asphalt & Road-Material Production', spec: 'Asphalt concrete batch mixing plants (80 to 240 TPH), bitumen drum decanting/melting units, and modified asphalt emulsion plants.' },
        { name: 'Building Products & Metal Fabrication', spec: 'Corrugated steel roofing sheet roll forming lines, automatic wire mesh welding lines, CNC fiber laser cutting tables, and pipe bending mills.' }
      ]
    }
  ];

  // 7-Step Turnkey Process
  const turnkeySteps = [
    {
      step: '01',
      title: 'Project Assessment',
      desc: 'Review BOQs, architectural specifications, engineering drawings, and required delivery milestones.'
    },
    {
      step: '02',
      title: 'Supplier Identification',
      desc: 'Identify and evaluate qualified manufacturers in China and global manufacturing hubs with verified certifications.'
    },
    {
      step: '03',
      title: 'Technical & Commercial Comparison',
      desc: 'Coordinate quotations, Mill Test Certificates (MTC), lab sample verification, and technical conformity docs.'
    },
    {
      step: '04',
      title: 'Procurement Coordination',
      desc: 'Consolidate multiple orders across product categories to optimize containerization and purchasing efficiency.'
    },
    {
      step: '05',
      title: 'Export & Shipping Coordination',
      desc: 'Coordinate pre-shipment inspection, packaging integrity, customs export documentation, and ocean freight to Djibouti Port.'
    },
    {
      step: '06',
      title: 'Import & Inland Delivery Coordination',
      desc: 'Support logistics planning, multimodal bonded rail transit from Djibouti to Modjo Dry Port, and final project site staging.'
    },
    {
      step: '07',
      title: 'Staged Project Supply',
      desc: 'Schedule and phase material arrivals in strict alignment with contractor construction stages and critical path priorities.'
    }
  ];

  // 6 Advantages
  const advantages = [
    {
      icon: Layers,
      title: 'One Procurement Partner for Multiple Categories',
      desc: 'Eliminate fragmented purchasing across dozens of suppliers. ORANEX unifies road, concrete, building finishes, and equipment sourcing under one managed framework.'
    },
    {
      icon: Globe2,
      title: 'Access to International Manufacturers',
      desc: 'Direct access to vetted tier-1 factories and specialized industrial suppliers in China and globally, coordinated through Our Chinese partner with transparent factory pricing.'
    },
    {
      icon: FileText,
      title: 'BOQ-Based Sourcing & Quotations',
      desc: 'Submit your complete Bill of Quantities or project material schedules. Our technical engineering team breaks down specifications and prepares consolidated proformas.'
    },
    {
      icon: Ship,
      title: 'Consolidated Procurement & Shipment Planning',
      desc: 'Optimize container utilization, reduce multimodal freight overhead, and coordinate consolidated shipments through the Djibouti–Modjo trade corridor.'
    },
    {
      icon: ShieldCheck,
      title: 'Technical Documentation & Sample Coordination',
      desc: 'Mill Test Certificates (MTC), ASTM/EN compliance documents, factory quality reports, and physical sample coordination for engineer approvals prior to shipment.'
    },
    {
      icon: Clock,
      title: 'Support for Phased & Project-Wide Procurement',
      desc: 'Flexible purchasing schedules aligned with your construction timeline—from site prep and earthworks to structural framing, MEP, and interior fit-out.'
    }
  ];

  // Who We Serve
  const targetCustomers = [
    {
      title: 'Construction Contractors',
      desc: 'General building contractors executing commercial, residential, and industrial construction projects across Ethiopia.',
      icon: HardHat
    },
    {
      title: 'Real Estate Developers',
      desc: 'Large-scale residential, mixed-use, and commercial tower developers requiring cost-efficient, high-volume finishing and structural materials.',
      icon: Building2
    },
    {
      title: 'Road & Infrastructure Contractors',
      desc: 'Highway, bridge, railway, and municipal infrastructure builders requiring penetration bitumen, cutbacks, geotextiles, and heavy compaction machinery.',
      icon: Compass
    },
    {
      title: 'Government & Institutional Projects',
      desc: 'Public works ministries, regional infrastructure bureaus, universities, and hospital projects requiring compliant international tender procurement.',
      icon: Award
    },
    {
      title: 'Ready-Mix & Precast Manufacturers',
      desc: 'Commercial concrete batching plants, precast beam manufacturers, and hollow-block producers sourcing PCE admixtures and plant equipment.',
      icon: Factory
    },
    {
      title: 'Industrial & Building-Material Manufacturers',
      desc: 'Factories producing paint, dry-mix mortars, tile adhesives, roofing sheets, and concrete blocks requiring production lines and chemical polymers.',
      icon: Wrench
    },
    {
      title: 'EPC Companies',
      desc: 'Engineering, Procurement, and Construction contractors executing turnkey industrial, energy, and water infrastructure works requiring consolidated international supply chains.',
      icon: Ship
    }
  ];

  // Procurement Packages
  const packages = [
    {
      id: 'PACKAGE_A',
      code: 'Package A',
      name: 'Product Category Supply',
      badge: 'Category Focused',
      summary: 'Focused sourcing of a single core construction material category.',
      examples: 'Bitumen 60/70, PCE Superplasticizer, Rebar, Porcelain Tiles, Plumbing or Electrical Supplies.',
      features: [
        'Direct factory pricing with Our Chinese partner',
        'Standardized ASTM/EN compliance certificates',
        'Minimum order quantity (MOQ) optimization',
        'Single consignment shipping to Djibouti Port'
      ]
    },
    {
      id: 'PACKAGE_B',
      code: 'Package B',
      name: 'Work Package Sourcing',
      badge: 'Milestone Specific',
      summary: 'Procurement coordination for a specific project work section or subcontractor package.',
      examples: 'Road surfacing package, structural foundation waterproofing, external curtain wall façade, or MEP sanitary installation.',
      features: [
        'Coordinated bill of materials for defined trade',
        'Compatible system components and accessories',
        'Consolidated technical submittal for project consultant',
        'Scheduled delivery ahead of trade commencement'
      ]
    },
    {
      id: 'PACKAGE_C',
      code: 'Package C',
      name: 'Multi-Category Procurement',
      badge: 'Consolidated Logistics',
      summary: 'Multiple construction material categories coordinated under one sourcing and shipment schedule.',
      examples: 'Combining cementitious raw materials, chemical admixtures, structural rebar, and surveying equipment in synchronized consignments.',
      features: [
        'Consolidated purchase order management',
        'Container load optimization & reduced freight costs',
        'Synchronized transit to Modjo Dry Port',
        'Single procurement liaison for multiple factory lines'
      ]
    },
    {
      id: 'PACKAGE_D',
      code: 'Package D',
      name: 'Project-Wide Materials Supply',
      badge: 'Turnkey BOQ Supply',
      summary: 'Complete BOQ-led procurement coordination covering eligible materials across every construction phase.',
      examples: 'Turnkey coordination from early earthworks and foundation casting through structural frame, MEP, interior finishing, and external road works.',
      features: [
        'Full BOQ line-item analysis and factory matching',
        'Phased delivery schedule mapped to construction master program',
        'Dedicated senior technical sourcing officer',
        'Direct commercial contracting through Our Chinese partner'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* SECTION A: HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-20 lg:py-28 px-4 sm:px-8 overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>ORANEX TRADING ONE MEMBER PLC • TURNKEY SOURCING DIVISION</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {language === 'zh' ? (
                  <>
                    一个集采伙伴。 <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                      覆盖工程全阶段。
                    </span>
                  </>
                ) : language === 'am' ? (
                  <>
                    አንድ የግዥ አጋር። <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                      ለእያንዳንዱ የግንባታ ምዕራፍ።
                    </span>
                  </>
                ) : language === 'ar' ? (
                  <>
                    شريك توريد واحد. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                      لكل مراحل البناء.
                    </span>
                  </>
                ) : (
                  <>
                    ONE SOURCING PARTNER. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                      EVERY CONSTRUCTION STAGE.
                    </span>
                  </>
                )}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
                {language === 'zh'
                  ? '从道路工程沥青与混凝土解决方案，到建筑结构、精装材料及工业生产线设备，ORANEX 携手中国制造战略伙伴，为埃塞俄比亚承包商与开发商提供跨品类一站式集采协同与落地保障。'
                  : language === 'am'
                  ? 'ከመንገድ ግንባታና አስፋልት ማቴሪያሎች ጀምሮ እስከ ኮንክሪት መፍትሄዎች፣ መዋቅራዊ ዕቃዎች፣ የማጠናቀቂያ ዕቃዎችና የማምረቻ ማሽነሪዎች—ኦራኔክስ በበርካታ ምድቦች ውስጥ በአንድ የግዥ አጋርነት ያስተባብራል።'
                  : language === 'ar'
                  ? 'من رصف الطرق ومواد الأسفلت إلى حلول الخرسانة ومواد الهياكل والتشطيبات ومعدات التصنيع، تنسق أورانكس التوريد عبر فئات متعددة من خلال شريك مشتريات واحد يربطكم بالمصانع المعتمدة في الصين.'
                  : 'From road construction and asphalt materials to concrete solutions, structural materials, building finishes and manufacturing equipment, ORANEX coordinates sourcing across multiple construction categories through one procurement partner. We bridge Ethiopian contractors and developers with qualified manufacturers in China and global production hubs.'}
              </p>

              {/* Target Customer Callout */}
              <div className="text-xs text-slate-400 pt-1 flex flex-wrap gap-x-3 gap-y-1 items-center">
                <span className="text-slate-300 font-semibold">
                  {language === 'zh' ? '服务对象：' : language === 'am' ? 'የምናገለግላቸው:' : language === 'ar' ? 'نخدم:' : 'Serving:'}
                </span>
                <span>{language === 'zh' ? '工程承包商' : language === 'am' ? 'ተቋራጮች' : 'Contractors'}</span>
                <span>•</span>
                <span>{language === 'zh' ? '房地产开发商' : language === 'am' ? 'ሪል እስቴት አልሚዎች' : 'Real Estate Developers'}</span>
                <span>•</span>
                <span>{language === 'zh' ? '道路基础设施局' : language === 'am' ? 'የመንገድ ተቋራጮች' : 'Road Builders'}</span>
                <span>•</span>
                <span>{language === 'zh' ? '商砼搅拌站' : language === 'am' ? 'የኮንክሪት ማደባለቂያዎች' : 'Ready-Mix Plants'}</span>
                <span>•</span>
                <span>{language === 'zh' ? '政府与公建工程' : language === 'am' ? 'የመንግስት ፕሮጀክቶች' : 'Government Works'}</span>
                <span>•</span>
                <span>{language === 'zh' ? 'EPC工程总承包' : 'EPC Firms'}</span>
              </div>

              {/* Action Buttons (Three CTAs) */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollToBoqForm()}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition transform active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {language === 'zh' ? '提交您的 BOQ 清单' : language === 'am' ? 'የBoQ ሰነድ ያስገቡ' : language === 'ar' ? 'تقديم جدول الكميات (BOQ)' : 'Submit Your BOQ'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openQuoteModal({ productOrScope: 'Turnkey Construction Materials Sourcing' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>
                    {language === 'zh' ? '索取项目报价 (RFQ)' : language === 'am' ? 'የዋጋ ጥያቄ (RFQ) ያስገቡ' : language === 'ar' ? 'طلب عرض أسعار' : 'Request a Quotation'}
                  </span>
                </button>

                <button
                  onClick={() => setIsCatalogueModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {language === 'zh' ? '下载2026采购目录' : language === 'am' ? 'የ2026 ካታሎግ ያውርዱ' : language === 'ar' ? 'تحميل كتالوج 2026' : 'Download 2026 Catalogue'}
                  </span>
                </button>

                <button
                  onClick={() => navigate('landed-cost-calculator')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition"
                >
                  <Calculator className="w-4 h-4 text-slate-950" />
                  <span>
                    {language === 'zh' ? '测算埃塞到岸总价' : language === 'am' ? 'የመጨረሻ ዋጋ አስላ' : language === 'ar' ? 'حاسبة التكلفة الإجمالية' : 'Landed Cost Calculator'}
                  </span>
                </button>
              </div>

              {/* Sourcing Model Disclosure Note */}
              <p className="text-[11px] text-slate-400 max-w-2xl pt-2 border-t border-slate-800">
                Direct international manufacturing coordination via <strong>Our Chinese partner</strong> with on-site technical alignment, sample testing, and logistics coordination managed by Oranex Trading in Addis Ababa.
              </p>
            </div>

            {/* Hero Side Graphic / Quick Stat Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-2xl backdrop-blur-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                    Procurement Gateway
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Active Ethiopia Hub
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                    <Factory className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Qualified Chinese Manufacturers</div>
                      <div className="text-[11px] text-slate-400">Direct factory supply lines for bitumen, PCE chemicals, steel, tiles, and machinery.</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                    <Ship className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Djibouti–Modjo Corridors</div>
                      <div className="text-[11px] text-slate-400">Ocean container shipping with multimodal bonded rail transit to Ethiopian dry ports.</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Addis Ababa Technical Support</div>
                      <div className="text-[11px] text-slate-400">Engineer review of BOQs, lab mix trials, and staged delivery scheduling.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="tel:+251912233688"
                    className="text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>Direct Desk: <strong>+251 912 233 688</strong> (Eng. Petros)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-15 bg-[radial-gradient(circle_at_center,#3b82f6,transparent_70%)] pointer-events-none" />
      </section>

      {/* SECTION B: FIVE SUPPLY CATEGORIES */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-blue-700 text-xs font-bold uppercase tracking-wider font-mono">
            Comprehensive Material Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Five Core Construction Supply Categories
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every category is supported by certified manufacturing partners, rigorous laboratory standards (ASTM, EN, AASHTO), and consolidated logistics directly to Ethiopian project sites.
          </p>
        </div>

        <div className="space-y-16">
          {categoriesData.map((cat, idx) => (
            <div
              key={cat.id}
              id={cat.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Category Header Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60 inline-block">
                      {cat.code} • {cat.badge}
                    </span>
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                          {cat.code}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900">{cat.title}</h3>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700">
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Individual Product Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {cat.products.map((prod, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-blue-50/50 hover:border-blue-200 transition"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            {prod.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                          {prod.spec}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Category Inquiry Action CTA */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 font-medium">
                      Need specifications or custom formulation for this category?
                    </span>
                    <button
                      onClick={() => scrollToBoqForm(undefined, cat.title)}
                      className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Inquire About {cat.title.split('&')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: TURNKEY SOURCING PROCESS (7-Step Timeline) */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
              Systematic Procurement Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              The Seven-Step Turnkey Sourcing Process
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              From your initial Bill of Quantities to final delivery at your project site in Ethiopia, we manage the technical verification, overseas factory matching, and logistics pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {turnkeySteps.map((step, idx) => (
              <div
                key={step.step}
                className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700/80 hover:border-blue-500/60 transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-blue-400 group-hover:text-blue-300 transition">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded">
                      Stage {idx + 1} of 7
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/40 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <span>Standard Protocol</span>
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                </div>
              </div>
            ))}

            {/* Quick Sourcing Overview Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-6 border border-blue-700/50 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300">
                  Ready to Start?
                </span>
                <h3 className="text-lg font-bold text-white">Have a Project BOQ Ready?</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Upload your bill of quantities or project drawings now. Our engineering team reviews specifications within 24–48 hours.
                </p>
              </div>

              <button
                onClick={() => scrollToBoqForm()}
                className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold uppercase tracking-wider transition text-center shadow"
              >
                Submit Project BOQ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: WHY WORK WITH ORANEX? (6 Advantages) */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-blue-700 text-xs font-bold uppercase tracking-wider font-mono">
            Value Proposition
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Partner with ORANEX for Turnkey Sourcing?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We solve the core challenges of international procurement in Ethiopia: supplier fragmentation, opaque pricing, non-conforming materials, and complex multimodal shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <adv.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION E: WHO WE SERVE */}
      <section className="bg-slate-100/70 py-20 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-blue-700 text-xs font-bold uppercase tracking-wider font-mono">
              Target Clients
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tailored Sourcing for Key Ethiopian Construction Sectors
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We structure procurement frameworks to meet the specific commercial, logistical, and technical requirements of contractors, manufacturers, and project owners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {targetCustomers.map((cust, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-blue-400 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center">
                    <cust.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{cust.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cust.desc}
                  </p>
                </div>
                <button
                  onClick={() => scrollToBoqForm()}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
                >
                  <span>Request Sector Proposal</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: PROCUREMENT PACKAGES */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-blue-700 text-xs font-bold uppercase tracking-wider font-mono">
            Flexible Engagement Models
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Four Flexible Procurement Packages
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Choose the sourcing model that fits your operational scope—from single material categories to project-wide turnkey procurement coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700 uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                    {pkg.code}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {pkg.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {pkg.summary}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                  <strong className="block text-slate-900 font-semibold mb-1">Typical Scope:</strong>
                  {pkg.examples}
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Package Benefits:
                  </div>
                  <ul className="space-y-1.5">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => scrollToBoqForm(pkg.id)}
                className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition text-center shadow"
              >
                Select {pkg.code} & Inquire
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: BOQ AND PROJECT REQUIREMENT FORM CONTAINER */}
      <section ref={boqFormRef} className="py-12 px-4 sm:px-8 max-w-5xl mx-auto scroll-mt-20">
        <BoqInquiryForm
          initialPackage={selectedPackageForForm}
          initialCategory={selectedCategoryForForm}
        />
      </section>

      {/* SECTION G: FINAL CTA & CONTACT LIAISON */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-20 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
              Take Action
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              LET'S SOURCE YOUR NEXT PROJECT.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Whether you require a single construction product, a complete procurement package or coordinated sourcing across multiple project stages, ORANEX is ready to review your requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToBoqForm()}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xl transition transform active:scale-95 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Your BOQ</span>
            </button>

            <button
              onClick={() => openQuoteModal({ productOrScope: 'Turnkey Construction Materials Sourcing' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Request a Quotation</span>
            </button>

            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
            >
              <span>Contact ORANEX</span>
            </button>
          </div>

          {/* Contact Details Card */}
          <div className="max-w-3xl mx-auto bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Lead Sourcing Officer</div>
              <div className="text-sm font-bold text-white mt-1">Eng. Petros Abebe Mengesha</div>
              <div className="text-xs text-blue-400">Chief Executive Officer</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Mobile & WhatsApp</div>
              <a
                href="https://wa.me/251912233688"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-emerald-400 hover:underline mt-1 block"
              >
                +251 912 233 688
              </a>
              <div className="text-xs text-slate-400">Addis Ababa Time (EAT, UTC+3)</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Email & Online Portal</div>
              <a
                href="mailto:Oranexceo@gmail.com"
                className="text-sm font-bold text-white hover:underline mt-1 block"
              >
                Oranexceo@gmail.com
              </a>
              <div className="text-xs text-slate-400">www.oranex.com.et</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: COMMERCIAL ACCURACY & REGULATORY DISCLOSURES */}
      <section className="bg-slate-900 py-10 px-4 sm:px-8 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Commercial Accuracy & Turnkey Sourcing Disclosures</span>
          </div>
          <div className="space-y-1.5 leading-relaxed text-slate-400">
            <p>
              • All supplies are subject to technical specification review, supplier confirmation, import eligibility, availability and mutually agreed commercial terms.
            </p>
            <p>
              • Turnkey sourcing refers to procurement and supply-chain coordination. Engineering design, construction works, installation, certification and customs representation are included only when separately agreed.
            </p>
            <p>
              • Product suitability, certificates, standards, lead times, landed costs and import eligibility must be confirmed for each project.
            </p>
            <p>
              • International manufacturing contracts, export documentation, and supplier coordination are facilitated in strategic collaboration with Our Chinese partner.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue Preview Modal */}
      <CataloguePreviewModal
        isOpen={isCatalogueModalOpen}
        onClose={() => setIsCatalogueModalOpen(false)}
        onOpenBoqForm={() => scrollToBoqForm()}
      />
    </div>
  );
};
