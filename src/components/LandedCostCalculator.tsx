import React, { useState, useId } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  FileText,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Ship,
  Truck,
  Building2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Sliders,
  ChevronDown,
  Info
} from 'lucide-react';

interface TariffPreset {
  id: string;
  name: string;
  hsCodeExample: string;
  dutyRate: number; // percentage
  exciseRate: number; // percentage
  vatRate: number; // 15% standard
  surTaxRate: number; // 0% or 10%
  withholdingRate: number; // 3%
  description: string;
}

const TARIFF_PRESETS: TariffPreset[] = [
  {
    id: 'capital-machinery',
    name: 'Capital Machinery & Batching Plants',
    hsCodeExample: 'HS 8474 / 8429',
    dutyRate: 0,
    exciseRate: 0,
    vatRate: 15,
    surTaxRate: 0,
    withholdingRate: 3,
    description: 'Machinery, stationary concrete batching plants, excavators, and industrial production equipment. Eligible for duty exemption or minimal 0–5% tariff.'
  },
  {
    id: 'raw-materials-chemicals',
    name: 'Construction Chemicals & Raw Materials',
    hsCodeExample: 'HS 3824 (PCE) / 2523 (Cementitious)',
    dutyRate: 5,
    exciseRate: 0,
    vatRate: 15,
    surTaxRate: 0,
    withholdingRate: 3,
    description: 'Raw materials, polycarboxylate ether (PCE 50%), microsilica, and industrial additives for manufacturing.'
  },
  {
    id: 'semi-finished',
    name: 'Semi-Finished Steel, Pipes & Valves',
    hsCodeExample: 'HS 7214 (Rebar) / 8481 (Valves) / 3917 (PPR)',
    dutyRate: 10,
    exciseRate: 0,
    vatRate: 15,
    surTaxRate: 0,
    withholdingRate: 3,
    description: 'Deformed rebar, brass gate valves, and PPR pipes for infrastructure and plumbing supply.'
  },
  {
    id: 'hardware-tools',
    name: 'Power Tools, Hardware & Fasteners',
    hsCodeExample: 'HS 8467 (Grinders/Drills) / 7318 (Fasteners)',
    dutyRate: 20,
    exciseRate: 0,
    vatRate: 15,
    surTaxRate: 10,
    withholdingRate: 3,
    description: 'Angle grinders, welding machines, rotary hammers, cutting discs, and standard fasteners imported for commercial resale.'
  },
  {
    id: 'finished-consumer',
    name: 'Finished Tiles, Ceramics & Sanitary Ware',
    hsCodeExample: 'HS 6907 (Porcelain Tiles) / 6910 (Sanitary)',
    dutyRate: 30,
    exciseRate: 0,
    vatRate: 15,
    surTaxRate: 10,
    withholdingRate: 3,
    description: 'Finished glazed porcelain tiles, kitchen sinks, shower mixers, and architectural decorative materials.'
  },
  {
    id: 'high-tariff-consumer',
    name: 'High-Tariff Finished Consumer Items',
    hsCodeExample: 'HS 9405 / Luxury Fixtures',
    dutyRate: 35,
    exciseRate: 10,
    vatRate: 15,
    surTaxRate: 10,
    withholdingRate: 3,
    description: 'Finished lighting fixtures, luxury chandeliers, and non-essential consumer finishing products.'
  }
];

interface LandedCostCalculatorProps {
  initialFobUsd?: number;
  initialCbm?: number;
  initialUnits?: number;
  initialCategory?: string;
  onTransmitToInquiry?: (summaryText: string) => void;
}

export const LandedCostCalculator: React.FC<LandedCostCalculatorProps> = ({
  initialFobUsd = 12000,
  initialCbm = 12,
  initialUnits = 1000,
  initialCategory = 'hardware-tools',
  onTransmitToInquiry
}) => {
  const { language, openQuoteModal } = useApp();

  // Primary Inputs
  const [cargoMode, setCargoMode] = useState<'lcl' | 'fcl20' | 'fcl40' | 'custom'>('lcl');
  const [fobUsd, setFobUsd] = useState<number>(initialFobUsd);
  const [cbm, setCbm] = useState<number>(initialCbm);
  const [totalUnits, setTotalUnits] = useState<number>(initialUnits);
  const [unitName, setUnitName] = useState<string>('Pieces / Units');
  const [productTitle, setProductTitle] = useState<string>('Mixed Hardware & Power Tools');

  // Exchange rate & freight
  const [exchangeRateEtb, setExchangeRateEtb] = useState<number>(128.5); // Current NBE / Market floating rate
  const [oceanFreightUsd, setOceanFreightUsd] = useState<number>(() => initialCbm * 95);
  const [insuranceUsd, setInsuranceUsd] = useState<number>(() => Math.round((initialFobUsd + initialCbm * 95) * 0.0035));

  // Tariff preset selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialCategory);
  const [customDutyRate, setCustomDutyRate] = useState<number>(20);
  const [customExciseRate, setCustomExciseRate] = useState<number>(0);
  const [customVatRate, setCustomVatRate] = useState<number>(15);
  const [customSurTaxRate, setCustomSurTaxRate] = useState<number>(10);
  const [customWithholdingRate, setCustomWithholdingRate] = useState<number>(3);
  const [isAdvancedCustoms, setIsAdvancedCustoms] = useState<boolean>(false);

  // Local Clearance & Port Logistics (in ETB)
  const [djiboutiPortFeeEtb, setDjiboutiPortFeeEtb] = useState<number>(35000);
  const [eslseTransitEtb, setEslseTransitEtb] = useState<number>(45000);
  const [modjoDryPortFeeEtb, setModjoDryPortFeeEtb] = useState<number>(28000);
  const [customsClearanceAgencyEtb, setCustomsClearanceAgencyEtb] = useState<number>(22000);
  const [inlandTruckingToAddisEtb, setInlandTruckingToAddisEtb] = useState<number>(30000);

  // Commercial Pricing & Margin
  const [targetMarginWholesale, setTargetMarginWholesale] = useState<number>(18); // %
  const [targetMarginRetail, setTargetMarginRetail] = useState<number>(35); // %

  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Handle cargo mode change
  const handleCargoModeChange = (mode: 'lcl' | 'fcl20' | 'fcl40' | 'custom') => {
    setCargoMode(mode);
    if (mode === 'lcl') {
      const newCbm = Math.min(20, Math.max(2, cbm));
      setCbm(newCbm);
      const freight = Math.round(newCbm * 95);
      setOceanFreightUsd(freight);
      setInsuranceUsd(Math.round((fobUsd + freight) * 0.0035));
      setDjiboutiPortFeeEtb(25000);
      setEslseTransitEtb(35000);
      setModjoDryPortFeeEtb(20000);
      setInlandTruckingToAddisEtb(20000);
    } else if (mode === 'fcl20') {
      setCbm(28);
      setOceanFreightUsd(3200);
      setInsuranceUsd(Math.round((fobUsd + 3200) * 0.0035));
      setDjiboutiPortFeeEtb(48000);
      setEslseTransitEtb(75000);
      setModjoDryPortFeeEtb(38000);
      setInlandTruckingToAddisEtb(45000);
    } else if (mode === 'fcl40') {
      setCbm(68);
      setOceanFreightUsd(5200);
      setInsuranceUsd(Math.round((fobUsd + 5200) * 0.0035));
      setDjiboutiPortFeeEtb(72000);
      setEslseTransitEtb(115000);
      setModjoDryPortFeeEtb(55000);
      setInlandTruckingToAddisEtb(65000);
    }
  };

  // Handle preset change
  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = TARIFF_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCustomDutyRate(preset.dutyRate);
      setCustomExciseRate(preset.exciseRate);
      setCustomVatRate(preset.vatRate);
      setCustomSurTaxRate(preset.surTaxRate);
      setCustomWithholdingRate(preset.withholdingRate);
    }
  };

  // --- MATHEMATICAL CALCULATIONS FOLLOWING ETHIOPIAN CUSTOMS COMMISSION (ECC) RULES ---
  // 1. CIF Valuation
  const cfrUsd = fobUsd + oceanFreightUsd;
  const cifUsd = cfrUsd + insuranceUsd;
  const cifEtb = cifUsd * exchangeRateEtb; // Duty Paying Value (DPV)

  // 2. Customs Duties & Taxes
  const dutyEtb = cifEtb * (customDutyRate / 100);
  const exciseBaseEtb = cifEtb + dutyEtb;
  const exciseEtb = exciseBaseEtb * (customExciseRate / 100);
  const vatBaseEtb = cifEtb + dutyEtb + exciseEtb;
  const vatEtb = vatBaseEtb * (customVatRate / 100);
  const surTaxBaseEtb = cifEtb + dutyEtb + exciseEtb;
  const surTaxEtb = surTaxBaseEtb * (customSurTaxRate / 100);
  const withholdingEtb = cifEtb * (customWithholdingRate / 100);

  const totalGovernmentTaxesEtb = dutyEtb + exciseEtb + vatEtb + surTaxEtb + withholdingEtb;

  // 3. Inland Logistics & Clearance
  const totalInlandLogisticsEtb =
    djiboutiPortFeeEtb +
    eslseTransitEtb +
    modjoDryPortFeeEtb +
    customsClearanceAgencyEtb +
    inlandTruckingToAddisEtb;

  // 4. Grand Total Landed Cost
  const totalLandedCostEtb = cifEtb + totalGovernmentTaxesEtb + totalInlandLogisticsEtb;
  const totalLandedCostUsd = exchangeRateEtb > 0 ? totalLandedCostEtb / exchangeRateEtb : 0;

  // 5. Multipliers & Unit Metrics
  const baseFobEtb = fobUsd * exchangeRateEtb;
  const landedCostMultiplier = baseFobEtb > 0 ? totalLandedCostEtb / baseFobEtb : 0;

  const validUnits = totalUnits > 0 ? totalUnits : 1;
  const unitFobUsd = fobUsd / validUnits;
  const unitFobEtb = unitFobUsd * exchangeRateEtb;
  const unitLandedCostEtb = totalLandedCostEtb / validUnits;
  const unitLandedCostUsd = totalLandedCostUsd / validUnits;

  // 6. Commercial Wholesale & Retail Recommendations
  const unitWholesalePriceEtb = unitLandedCostEtb * (1 + targetMarginWholesale / 100);
  const totalWholesaleRevenueEtb = unitWholesalePriceEtb * validUnits;
  const totalWholesaleGrossProfitEtb = totalWholesaleRevenueEtb - totalLandedCostEtb;

  const unitRetailPriceEtb = unitLandedCostEtb * (1 + targetMarginRetail / 100);
  const totalRetailRevenueEtb = unitRetailPriceEtb * validUnits;
  const totalRetailGrossProfitEtb = totalRetailRevenueEtb - totalLandedCostEtb;

  const copyAssessmentToClipboard = () => {
    const text = `============================================================
ORANEX TRADING — ETHIOPIAN IMPORT LANDED COST ASSESSMENT
Prepared for: ${productTitle} (${unitName})
============================================================
1. CARGO SPECIFICATIONS:
- Cargo Mode: ${cargoMode.toUpperCase()}
- Total Volume: ${cbm} CBM
- Total Quantity: ${totalUnits.toLocaleString()} ${unitName}
- Exchange Rate Applied: ${exchangeRateEtb.toFixed(2)} ETB / USD

2. CHINA EXPORT & CIF BREAKDOWN:
- Factory FOB Price: $${fobUsd.toLocaleString()} USD (${(fobUsd * exchangeRateEtb).toLocaleString()} ETB)
- Ocean Freight (China to Djibouti): $${oceanFreightUsd.toLocaleString()} USD
- Marine Cargo Insurance: $${insuranceUsd.toLocaleString()} USD
- CIF Value (Duty Paying Value - DPV): $${cifUsd.toLocaleString()} USD (${cifEtb.toLocaleString()} ETB)

3. ETHIOPIAN CUSTOMS DUTIES & TAXES (ECC):
- Customs Duty (${customDutyRate}%): ${Math.round(dutyEtb).toLocaleString()} ETB
- Excise Tax (${customExciseRate}%): ${Math.round(exciseEtb).toLocaleString()} ETB
- VAT (${customVatRate}%): ${Math.round(vatEtb).toLocaleString()} ETB
- Sur-Tax (${customSurTaxRate}%): ${Math.round(surTaxEtb).toLocaleString()} ETB
- Withholding Tax (${customWithholdingRate}%): ${Math.round(withholdingEtb).toLocaleString()} ETB
- Total Government Duties & Taxes: ${Math.round(totalGovernmentTaxesEtb).toLocaleString()} ETB

4. PORT & INLAND MULTIMODAL LOGISTICS:
- Djibouti Port Handling: ${djiboutiPortFeeEtb.toLocaleString()} ETB
- ESLSE Rail/Truck Transit to Modjo: ${eslseTransitEtb.toLocaleString()} ETB
- Modjo Dry Port Terminal Fees: ${modjoDryPortFeeEtb.toLocaleString()} ETB
- Customs Clearance Agency: ${customsClearanceAgencyEtb.toLocaleString()} ETB
- Inland Haulage (Modjo to Addis/Merkato): ${inlandTruckingToAddisEtb.toLocaleString()} ETB
- Total Inland Logistics: ${totalInlandLogisticsEtb.toLocaleString()} ETB

============================================================
FINAL COMMERCIAL RESULTS:
- TOTAL LANDED COST (ADDIS ABABA): ${Math.round(totalLandedCostEtb).toLocaleString()} ETB ($${Math.round(totalLandedCostUsd).toLocaleString()} USD)
- EFFECTIVE LANDED MULTIPLIER: ${landedCostMultiplier.toFixed(2)}x of FOB Value
- UNIT FOB COST: $${unitFobUsd.toFixed(2)} USD (${unitFobEtb.toFixed(2)} ETB)
- UNIT LANDED COST AT STORE: ${unitLandedCostEtb.toFixed(2)} ETB ($${unitLandedCostUsd.toFixed(2)} USD)
- SUGGESTED WHOLESALE PRICE (${targetMarginWholesale}% Margin): ${unitWholesalePriceEtb.toFixed(2)} ETB (Gross Profit: ${Math.round(totalWholesaleGrossProfitEtb).toLocaleString()} ETB)
- SUGGESTED RETAIL PRICE (${targetMarginRetail}% Margin): ${unitRetailPriceEtb.toFixed(2)} ETB (Gross Profit: ${Math.round(totalRetailGrossProfitEtb).toLocaleString()} ETB)
============================================================
Coordinated by: ORANEX Trading One Member PLC & Our Chinese partner
Direct Executive Inquiry: Eng. Petros Abebe Mengesha (+251 912 233 688)`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Ethiopian Customs (ECC) & Trade Finance Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Import Landed Cost & Profit Margin Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Calculate the complete landed cost of importing from China to your warehouse in Addis Ababa or Merkato, including CIF Djibouti, Ethiopian Customs duties, VAT, ESLSE multimodal rail transit, and Modjo Dry Port terminal charges.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyAssessmentToClipboard}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition inline-flex items-center gap-2"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSummary ? 'Copied Assessment!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Cargo Mode Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6">
          <button
            type="button"
            onClick={() => handleCargoModeChange('lcl')}
            className={`p-3 rounded-2xl text-left border transition ${
              cargoMode === 'lcl'
                ? 'bg-amber-500/20 border-amber-400 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block text-amber-300">Option 1</span>
            <span className="font-bold text-sm block text-white">LCL Groupage</span>
            <span className="text-[11px] text-slate-300">2–20 CBM Shared Container</span>
          </button>

          <button
            type="button"
            onClick={() => handleCargoModeChange('fcl20')}
            className={`p-3 rounded-2xl text-left border transition ${
              cargoMode === 'fcl20'
                ? 'bg-amber-500/20 border-amber-400 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block text-sky-300">Option 2</span>
            <span className="font-bold text-sm block text-white">20ft Full Container</span>
            <span className="text-[11px] text-slate-300">~28 CBM / Max 24 MT</span>
          </button>

          <button
            type="button"
            onClick={() => handleCargoModeChange('fcl40')}
            className={`p-3 rounded-2xl text-left border transition ${
              cargoMode === 'fcl40'
                ? 'bg-amber-500/20 border-amber-400 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block text-emerald-300">Option 3</span>
            <span className="font-bold text-sm block text-white">40ft HQ Container</span>
            <span className="text-[11px] text-slate-300">~68 CBM / Max 26 MT</span>
          </button>

          <button
            type="button"
            onClick={() => handleCargoModeChange('custom')}
            className={`p-3 rounded-2xl text-left border transition ${
              cargoMode === 'custom'
                ? 'bg-amber-500/20 border-amber-400 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block text-purple-300">Option 4</span>
            <span className="font-bold text-sm block text-white">Custom / Project</span>
            <span className="text-[11px] text-slate-300">Custom volume & freight</span>
          </button>
        </div>
      </div>

      {/* Main Body: 2 Columns */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Product & China FOB Pricing */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Product & Factory FOB Details (China)</span>
              </h3>
              <span className="text-xs text-slate-500">Incoterms: FOB China Port</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Product / Consignment Name</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="e.g. Angle Grinders 115mm / Brass Valves"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Total Factory FOB Price (USD) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={fobUsd}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setFobUsd(val);
                      setInsuranceUsd(Math.round((val + oceanFreightUsd) * 0.0035));
                    }}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-blue-700 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Total Quantity of Units</label>
                <input
                  type="number"
                  min="1"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Unit Label</label>
                <input
                  type="text"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  placeholder="e.g. Pieces, Cartons, Pairs, Bags"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Freight, Volume & Exchange Rate */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Ocean Freight, CBM & Exchange Rate</span>
              </h3>
              <span className="text-xs text-slate-500">Destination: Djibouti / Modjo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">Cargo Volume (CBM)</label>
                  <span className="font-mono text-blue-600 font-bold">{cbm} CBM</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.5"
                  value={cbm}
                  onChange={(e) => {
                    const newCbm = Number(e.target.value);
                    setCbm(newCbm);
                    if (cargoMode === 'lcl') {
                      const newFreight = Math.round(newCbm * 95);
                      setOceanFreightUsd(newFreight);
                      setInsuranceUsd(Math.round((fobUsd + newFreight) * 0.0035));
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ocean Freight (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={oceanFreightUsd}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setOceanFreightUsd(val);
                      setInsuranceUsd(Math.round((fobUsd + val) * 0.0035));
                    }}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bank FX Rate (USD to ETB)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">ETB</span>
                  <input
                    type="number"
                    min="50"
                    max="250"
                    step="0.5"
                    value={exchangeRateEtb}
                    onChange={(e) => setExchangeRateEtb(Number(e.target.value))}
                    className="w-full pl-11 pr-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-mono font-bold text-amber-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 border-t border-slate-200">
              <span>
                Marine Cargo Insurance: <strong>${insuranceUsd} USD</strong> (calculated ~0.35% of 110% CFR)
              </span>
              <span>
                Total CIF Value: <strong className="text-blue-700">${cifUsd.toLocaleString()} USD</strong> ({cifEtb.toLocaleString()} ETB)
              </span>
            </div>
          </div>

          {/* Step 3: Customs Tariff & Tax Presets */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Ethiopian Customs Commission (ECC) Tariff Band</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAdvancedCustoms(!isAdvancedCustoms)}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold"
              >
                {isAdvancedCustoms ? 'Hide Custom Rates' : 'Adjust Rates Manually'}
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Category Tariff Preset:</label>
              <select
                value={selectedPresetId}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
              >
                {TARIFF_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name} ({preset.hsCodeExample}) — Duty: {preset.dutyRate}%, Sur-Tax: {preset.surTaxRate}%, VAT: {preset.vatRate}%
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Tariff Inputs (if toggled) */}
            {isAdvancedCustoms && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label className="font-bold text-slate-600 block text-[10px]">Duty %</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={customDutyRate}
                    onChange={(e) => setCustomDutyRate(Number(e.target.value))}
                    className="w-full p-1.5 border rounded font-mono font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block text-[10px]">Excise %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={customExciseRate}
                    onChange={(e) => setCustomExciseRate(Number(e.target.value))}
                    className="w-full p-1.5 border rounded font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block text-[10px]">VAT %</label>
                  <input
                    type="number"
                    value={customVatRate}
                    onChange={(e) => setCustomVatRate(Number(e.target.value))}
                    className="w-full p-1.5 border rounded font-mono font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block text-[10px]">Sur-Tax %</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={customSurTaxRate}
                    onChange={(e) => setCustomSurTaxRate(Number(e.target.value))}
                    className="w-full p-1.5 border rounded font-mono font-bold text-purple-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block text-[10px]">Withholding %</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={customWithholdingRate}
                    onChange={(e) => setCustomWithholdingRate(Number(e.target.value))}
                    className="w-full p-1.5 border rounded font-mono font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Local Port & Inland Haulage */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Inland Logistics & Port Clearance Charges (ETB)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-600">Djibouti Port Stevedoring</label>
                <input
                  type="number"
                  value={djiboutiPortFeeEtb}
                  onChange={(e) => setDjiboutiPortFeeEtb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-600">ESLSE Rail/Truck Transit</label>
                <input
                  type="number"
                  value={eslseTransitEtb}
                  onChange={(e) => setEslseTransitEtb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-600">Modjo Dry Port Handling</label>
                <input
                  type="number"
                  value={modjoDryPortFeeEtb}
                  onChange={(e) => setModjoDryPortFeeEtb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-600">Customs Clearance Agency</label>
                <input
                  type="number"
                  value={customsClearanceAgencyEtb}
                  onChange={(e) => setCustomsClearanceAgencyEtb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] text-slate-600">Inland Haulage Modjo → Addis Ababa / Merkato</label>
                <input
                  type="number"
                  value={inlandTruckingToAddisEtb}
                  onChange={(e) => setInlandTruckingToAddisEtb(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Live Results Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Result Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                TOTAL ESTIMATED LANDED COST
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {Math.round(totalLandedCostEtb).toLocaleString()}
                </span>
                <span className="text-sm font-bold text-amber-400">ETB</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Approx <strong>${Math.round(totalLandedCostUsd).toLocaleString()} USD</strong> delivered to Addis Ababa / Merkato
              </p>
            </div>

            {/* Quick Multiplier Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Landed Multiplier:</span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  {landedCostMultiplier.toFixed(2)}x
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">of China FOB Price</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Unit Landed Cost:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  {unitLandedCostEtb.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">ETB / {unitName}</span>
              </div>
            </div>

            {/* Comprehensive Cost Breakdown */}
            <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Cost Composition:</h4>

              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Factory FOB Base ({fobUsd.toLocaleString()} USD):</span>
                  <span className="font-mono font-medium">{Math.round(baseFobEtb).toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Ocean Freight & Insurance:</span>
                  <span className="font-mono font-medium">
                    {Math.round((oceanFreightUsd + insuranceUsd) * exchangeRateEtb).toLocaleString()} ETB
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 text-blue-300">
                  <span>Customs Duty ({customDutyRate}%):</span>
                  <span className="font-mono font-medium">{Math.round(dutyEtb).toLocaleString()} ETB</span>
                </div>
                {customExciseRate > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-800/60 text-orange-300">
                    <span>Excise Tax ({customExciseRate}%):</span>
                    <span className="font-mono font-medium">{Math.round(exciseEtb).toLocaleString()} ETB</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-800/60 text-emerald-300">
                  <span>VAT ({customVatRate}%):</span>
                  <span className="font-mono font-medium">{Math.round(vatEtb).toLocaleString()} ETB</span>
                </div>
                {customSurTaxRate > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-800/60 text-purple-300">
                    <span>Sur-Tax ({customSurTaxRate}%):</span>
                    <span className="font-mono font-medium">{Math.round(surTaxEtb).toLocaleString()} ETB</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
                  <span>Withholding Tax ({customWithholdingRate}%):</span>
                  <span className="font-mono font-medium">{Math.round(withholdingEtb).toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 text-amber-300">
                  <span>Total Djibouti & Modjo Inland Logistics:</span>
                  <span className="font-mono font-medium">{totalInlandLogisticsEtb.toLocaleString()} ETB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Strategy & Profit Margins */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>Suggested Wholesale & Retail Selling Prices</span>
            </div>

            {/* Wholesale Slider & Price */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Wholesale Margin (Autobis / Somale Tera):</span>
                <span className="font-mono font-bold text-blue-700 text-sm">{targetMarginWholesale}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={targetMarginWholesale}
                onChange={(e) => setTargetMarginWholesale(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded"
              />
              <div className="pt-2 flex justify-between items-baseline border-t border-slate-100">
                <span className="text-xs text-slate-500">Sell at:</span>
                <div>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {unitWholesalePriceEtb.toFixed(1)} ETB
                  </span>
                  <span className="text-[11px] text-slate-500 block text-right">
                    Gross Profit: {Math.round(totalWholesaleGrossProfitEtb).toLocaleString()} ETB
                  </span>
                </div>
              </div>
            </div>

            {/* Retail Slider & Price */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Retail Margin:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">{targetMarginRetail}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="1"
                value={targetMarginRetail}
                onChange={(e) => setTargetMarginRetail(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded"
              />
              <div className="pt-2 flex justify-between items-baseline border-t border-slate-100">
                <span className="text-xs text-slate-500">Sell at:</span>
                <div>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {unitRetailPriceEtb.toFixed(1)} ETB
                  </span>
                  <span className="text-[11px] text-slate-500 block text-right">
                    Gross Profit: {Math.round(totalRetailGrossProfitEtb).toLocaleString()} ETB
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => openQuoteModal({ productOrScope: `Landed Cost Assessment: ${productTitle} (${fobUsd} USD FOB / ${cbm} CBM)` })}
              className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Request Official Proforma for This Sizing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
