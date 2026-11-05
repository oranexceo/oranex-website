import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Hotel,
  Building2,
  ShoppingCart,
  Boxes,
  Factory,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FileText,
  Package,
  Layers,
  Sparkles,
  Users
} from 'lucide-react';

import hotelImg from '../../assets/images/hotel_hospitality_sourcing_1793866043756.jpg';
import constructionImg from '../../assets/images/building_materials_finishing_1793446404459.jpg';
import supermarketImg from '../../assets/images/supermarket_retail_equipment_1793866056830.jpg';
import wholesaleImg from '../../assets/images/industrial_materials_warehouse_1792156925321.jpg';
import factoryImg from '../../assets/images/hero_industrial_manufacturing_1790427794819.jpg';

export interface IndustrySector {
  id: string;
  number: string;
  name: string;
  amharicName: string;
  chineseName: string;
  arabicName: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  targetCustomers: string[];
  sourcingCategories: string[];
  procurementValue: string[];
  inquiryPrefill: string;
}

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: 'hospitality',
    number: '01',
    name: 'Hotels & Hospitality Groups',
    amharicName: 'ሆቴሎች እና የእንግዳ ተቀባይነት ዘርፍ',
    chineseName: '酒店与高端文旅产业',
    arabicName: 'مجموعات الفنادق والضيافة',
    tagline: 'End-to-End FF&E, Commercial Kitchens & Guest Experience Fit-Outs',
    icon: Hotel,
    image: hotelImg,
    targetCustomers: [
      'Hotels, boutique lodges & resort developments',
      'Serviced apartment operators & residential hospitality',
      'Commercial restaurants, banquet halls & catering facilities',
      'Conference centers & international event venues'
    ],
    sourcingCategories: [
      'FF&E (furniture, fixtures & custom guestroom equipment)',
      'Commercial kitchen & heavy catering preparation equipment',
      'Industrial laundry washers, dry cleaning & ironing systems',
      'Architectural lighting fixtures, chandeliers & dimming systems',
      'Sanitaryware, walk-in showers & luxury bath fittings',
      'Guestroom amenities, luxury linen sets & flame-retardant textiles',
      'Hotel Operating Equipment (OS&E) & banquet service ware'
    ],
    procurementValue: [
      'Consolidated FF&E packages covering entire floor-plan schedules',
      'Direct manufacturer quotation pricing without intermediary trading markups',
      'Pre-production sample verification and material finish approvals',
      'Coordinated phased container deliveries matched to project construction milestones'
    ],
    inquiryPrefill: 'Hotels & Hospitality FF&E Sourcing Requirement'
  },
  {
    id: 'construction',
    number: '02',
    name: 'Construction & Real Estate Developers',
    amharicName: 'ኮንስትራክሽን እና ሪል እስቴት አልሚዎች',
    chineseName: '建筑工程承包商与地产开发商',
    arabicName: 'المقاولات وشركات التطوير العقاري',
    tagline: 'Certified Structural Materials, Finishes & Complete BOQ Procurement',
    icon: Building2,
    image: constructionImg,
    targetCustomers: [
      'Real estate developers & residential tower developers',
      'General building contractors (Grade 1–4 building & civil)',
      'Infrastructure & transport corridor contractors',
      'Architectural & MEP engineering consulting firms'
    ],
    sourcingCategories: [
      'Deformed rebar (BS 4449 Grade 60 / ASTM A615) & structural steel profiles',
      'Architectural finishing: porcelain tiles, polished granite & curtain walls',
      'Commercial architectural glazing, thermal-break aluminium systems & louvers',
      'MEP fixtures (mechanical, electrical, plumbing piping PN20/PN25)',
      'Electrical distribution switchgear, transformer units & power cabling',
      'HVAC chiller plants, ducting systems & ventilation equipment',
      'Bulk BOQ schedule line-item supply and contract procurement'
    ],
    procurementValue: [
      'Itemized BOQ quotations sourced directly from qualified manufacturing mills',
      'Original Mill Test Certificates (MTC) and ASTM/EN standard test conformity',
      'Independent pre-shipment quality and dimension inspections coordinated per order in China',
      'Optimized container stuffing to minimize sea freight expense per square meter'
    ],
    inquiryPrefill: 'Construction Materials & Real Estate BOQ Sourcing'
  },
  {
    id: 'retail',
    number: '03',
    name: 'Supermarkets & Retail Chains',
    amharicName: 'ሱፐርማርኬቶች እና የችርቻሮ ሰንሰለቶች',
    chineseName: '大型商超与连锁零售企业',
    arabicName: 'السوبرماركت وسلاسل المتاجر التجزئة',
    tagline: 'Commercial Store Fit-Out, Refrigeration & Display Systems',
    icon: ShoppingCart,
    image: supermarketImg,
    targetCustomers: [
      'Supermarket chains & multi-branch grocery retailers',
      'Hypermarket operators & wholesale cash-and-carry clubs',
      'Department stores, home furnishing & electronics outlets',
      'Retail pharmacy chains & convenience retail networks'
    ],
    sourcingCategories: [
      'Commercial display refrigeration (multi-deck open chillers, island freezers)',
      'Heavy-duty supermarket gondola shelving, end-caps & wall shelving units',
      'Ergonomic checkout counters, conveyor belts & POS station enclosures',
      'Electronic shelf labels (ESL), barcode scanning systems & retail scales',
      'Heavy-gauge shopping trolleys, hand baskets & trolley corrals',
      'High-efficiency retail track lighting, LED downlights & signage fixtures',
      'Backroom warehouse pallet racking, stockroom shelving & scissor lifts'
    ],
    procurementValue: [
      'Coordinated multi-category store fit-out equipment packages from single sourcing partner',
      'Custom store branding, powder-coat color matching & modular dimensioning',
      'Durable commercial-grade specifications engineered for high customer footfall',
      'Consolidated multi-factory container shipping reducing freight cost per unit'
    ],
    inquiryPrefill: 'Supermarket & Retail Chain Equipment Fit-Out'
  },
  {
    id: 'wholesale',
    number: '04',
    name: 'Wholesale Businesses & Large Market Centers',
    amharicName: 'የጅምላ ንግዶች እና የገበያ ማዕከላት (መርካቶ)',
    chineseName: '大宗批发商与大型商品集散中心',
    arabicName: 'شركات وتجار الجملة والأسواق الكبرى',
    tagline: 'Multi-Supplier Purchasing, China Partner Staging & LCL Consolidation',
    icon: Boxes,
    image: wholesaleImg,
    targetCustomers: [
      'Addis Ababa Merkato wholesalers across key commercial teras',
      'Regional distribution center operators (Dire Dawa, Hawassa, Mekelle)',
      'Hardware, power tool & sanitary ware merchant associations',
      'Licensed commercial import houses & bulk trading enterprises'
    ],
    sourcingCategories: [
      'Mixed-merchandise container consolidation across complementary SKUs',
      'Fast-moving consumer goods, household hardware & kitchenware',
      'Professional hand tools, power tools, cutting blades & welding consumables',
      'Electrical switches, brass gate valves, PPR fittings & plumbing fixtures',
      'Industrial packaging materials, stretch film, strap coils & woven bags',
      'Commercial hardware accessories, locks, hinges & fastener assortments',
      'Safety workwear, PPE equipment, reflective gear & protective footwear'
    ],
    procurementValue: [
      'Coordinated LCL consolidation combining multiple Chinese vendor orders into single containers',
      'Direct factory and wholesale market sourcing without intermediary trading markups',
      'Bank-compliant proforma invoices matching Ethiopian foreign exchange criteria (CBE / Awash / Dashen)',
      'Comprehensive export documentation: bill of lading, CCPIT certificate & commercial invoices'
    ],
    inquiryPrefill: 'Wholesale Sourcing & Multi-Supplier LCL Consolidation'
  },
  {
    id: 'factories',
    number: '05',
    name: 'Factories & Industrial Enterprises',
    amharicName: 'ፋብሪካዎች እና የኢንዱስትሪ ድርጅቶች',
    chineseName: '工业制造企业与特种工厂',
    arabicName: 'المصانع والمنشآت الصناعية',
    tagline: 'Machinery Spares, Critical Wear Parts & Industrial Consumables',
    icon: Factory,
    image: factoryImg,
    targetCustomers: [
      'Manufacturing & assembly plants in industrial zones (Bole Lemi, Kilinto, Adama)',
      'Agro-processing factories, edible oil plants & flour milling facilities',
      'Textile, garment & leather processing factories',
      'Cement plants, mineral processors, quarry & batching installations'
    ],
    sourcingCategories: [
      'Production line machinery, packaging lines & automated assembly stations',
      'Heavy-duty industrial slurry pumps, high-pressure centrifugal pumps & impellers',
      'Industrial valves: pneumatic butterfly, knife gate, wafer check & ball valves',
      'Electric motors (IP55/IP66), variable frequency drives (VFD) & inverter units',
      'Mechanical power transmission: premium bearings, gearboxes, belts & couplings',
      'Factory automation components, PLC modules, sensors & pneumatic cylinders',
      'Industrial chemical raw materials, solvents, polymer resins & water treatment chemicals'
    ],
    procurementValue: [
      'OEM-grade replacement parts matched precisely to equipment nameplates and drawings',
      'Technical engineering verification against plant operating specifications',
      'Critical spares procurement schedules planned to minimize factory downtime',
      'Factory audit reports, chemical COA certificates & batch test validations coordinated per order'
    ],
    inquiryPrefill: 'Factory Machinery, Spares & Industrial Consumables Sourcing'
  }
];

export const IndustryPortfolioSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { openQuoteModal, language } = useApp();
  const [selectedSectorId, setSelectedSectorId] = useState<string>('hospitality');

  const selectedSector = INDUSTRY_SECTORS.find((s) => s.id === selectedSectorId) || INDUSTRY_SECTORS[0];

  return (
    <section id="industries-section" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider rounded">
            <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
            <span>Target Industries &amp; Market Opportunities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored International Sourcing for Ethiopia&apos;s Core Growth Sectors
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            ORANEX coordinates direct factory procurement, technical specification matching, quality verification, and consolidated shipping tailored to five critical commercial customer groups in Ethiopia.
          </p>

          {/* Official Market Development Statement */}
          <div className="p-4 bg-white border-l-4 border-blue-700 rounded-r-xl border-y border-r border-slate-200 shadow-xs">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                  Strategic Market Development Statement
                </p>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  &ldquo;ORANEX is actively developing sourcing and procurement opportunities across Ethiopia&apos;s hospitality, construction, real estate, retail, wholesale, and industrial sectors.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {INDUSTRY_SECTORS.map((sector) => {
            const isSelected = sector.id === selectedSectorId;
            const Icon = sector.icon;
            return (
              <button
                key={sector.id}
                onClick={() => setSelectedSectorId(sector.id)}
                className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-600/30'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sector.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm leading-snug">
                    {language === 'zh'
                      ? sector.chineseName
                      : language === 'am'
                      ? sector.amharicName
                      : language === 'ar'
                      ? sector.arabicName
                      : sector.name}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {sector.targetCustomers[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Deep-Dive Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Image & Quick Profile */}
            <div className="lg:col-span-5 relative bg-slate-950 min-h-[280px] lg:min-h-full flex flex-col justify-end p-6 sm:p-8 overflow-hidden text-white">
              <img
                src={selectedSector.image}
                alt={selectedSector.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <div className="relative z-10 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                  Sector {selectedSector.number} • Strategic Sourcing Category
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {selectedSector.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedSector.tagline}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal({ productOrScope: selectedSector.inquiryPrefill })}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
                  >
                    <span>Discuss Your Procurement Requirements</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Structured Specifications & Procurement Value */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Target Customers */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Target Customers in Ethiopia</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSector.targetCustomers.map((cust, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{cust}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sourcing Categories */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Relevant Sourcing Categories</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSector.sourcingCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procurement Value */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>ORANEX Procurement &amp; Logistics Value</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {selectedSector.procurementValue.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-blue-50/60 border border-blue-200/60 rounded-lg text-xs text-blue-950 flex items-start gap-2.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Full specification matching • Bank proformas (CBE, Awash, Dashen) • Pre-shipment audit
                </div>
                <button
                  onClick={() => openQuoteModal({ productOrScope: selectedSector.inquiryPrefill })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs"
                >
                  <span>Discuss Your Procurement Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
