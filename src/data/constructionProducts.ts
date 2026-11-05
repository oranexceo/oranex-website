import { Product } from '../types';

export interface ProductCategoryInfo {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  badge: string;
  iconName: string;
  featuredProductsCount: number;
}

export const CONSTRUCTION_CATEGORIES: ProductCategoryInfo[] = [
  {
    id: 'construction-chemicals',
    code: 'CAT-A',
    name: 'Construction Chemicals & OCHEMI Admixtures',
    shortName: 'Construction Chemicals',
    description: 'High-performance PCE superplasticizers, setting retarders, silica fumes, waterproofing compounds, and structural mortars formulated for high-strength durability.',
    badge: 'OCHEMI Specialist Series',
    iconName: 'FlaskConical',
    featuredProductsCount: 12
  },
  {
    id: 'cementitious-raw-materials',
    code: 'CAT-B',
    name: 'Cementitious & Industrial Raw Materials',
    shortName: 'Raw Materials',
    description: 'High-grade white cement, GGBS, fly ash, microsilica, calcium aluminate cement, and mineral additives directly sourced from certified international kilns.',
    badge: 'Bulk Sourcing',
    iconName: 'Layers',
    featuredProductsCount: 8
  },
  {
    id: 'concrete-production-equipment',
    code: 'CAT-C',
    name: 'Concrete Production & Batching Equipment',
    shortName: 'Batching Equipment',
    description: 'Commercial stationary and mobile concrete batching plants, transit mixer drums, automated admixture dosing units, and cement storage silos.',
    badge: 'Plant Engineering',
    iconName: 'Factory',
    featuredProductsCount: 6
  },
  {
    id: 'construction-machinery',
    code: 'CAT-D',
    name: 'Heavy Construction Machinery & Fleet',
    shortName: 'Construction Machinery',
    description: 'Hydraulic excavators, wheel loaders, motor graders, crawler cranes, and compaction rollers backed by Our Chinese partner global procurement channels.',
    badge: 'Heavy Fleet',
    iconName: 'Truck',
    featuredProductsCount: 8
  },
  {
    id: 'building-materials',
    code: 'CAT-E',
    name: 'Building & Finishing Materials',
    shortName: 'Building Materials',
    description: 'High-tensile structural steel, rebar, epoxy flooring compounds, porcelain floorings, acoustic ceiling assemblies, and aluminum facade profiles.',
    badge: 'Architectural & Structural',
    iconName: 'Building2',
    featuredProductsCount: 7
  },
  {
    id: 'civil-engineering',
    code: 'CAT-F',
    name: 'Civil Engineering & Infrastructure Solutions',
    shortName: 'Civil Engineering',
    description: 'High-density woven geotextiles, HDPE geomembrane pond liners, bridge expansion joints, geogrids, and polymer-modified asphalt additives.',
    badge: 'Infrastructure',
    iconName: 'HardHat',
    featuredProductsCount: 6
  },
  {
    id: 'industrial-supplies',
    code: 'CAT-G',
    name: 'Industrial Supplies, Valves & Plant Spares',
    shortName: 'Industrial Supplies',
    description: 'Submersible slurry pumps, heavy-duty butterfly valves, industrial spherical roller bearings, conveyor belts, and wear plates.',
    badge: 'MRO & Consumables',
    iconName: 'Wrench',
    featuredProductsCount: 6
  }
];

export const CONSTRUCTION_PRODUCTS_DATA: Product[] = [
  // CATEGORY A: Construction Chemicals (OCHEMI Specialist Series)
  {
    id: 'prod-chem-01',
    sku: 'OCH-PCE-50S',
    name: 'OCHEMI PCE 50% High-Range Polycarboxylate Superplasticizer',
    category: 'construction-chemicals',
    subCategory: 'PCE Superplasticizers',
    productFamily: 'OCHEMI Chemical Admixtures',
    brand: 'OCHEMI (Oranex Approved)',
    shortDescription: 'Third-generation polycarboxylate ether copolymer liquid with 50% solid content, engineered for extreme water reduction (up to 40%) and high early compressive strength.',
    applications: ['High-Strength Concrete (C40-C80)', 'Precast Concrete Elements', 'Self-Compacting Concrete (SCC)', 'Ready-Mix Concrete in Hot Weather'],
    specifications: {
      'Solid Content': '50% ± 1.0%',
      'Appearance': 'Light amber to clear viscous liquid',
      'pH Value': '5.0 - 7.0',
      'Density (20°C)': '1.10 ± 0.02 g/cm³',
      'Chloride Content': '< 0.05% (EN 480-10)',
      'Standard Compliance': 'ASTM C494 Type F & G, EN 934-2 T3.1/3.2'
    },
    packaging: '1,000L IBC Tank (1,100 kg) / 200L Drum / 20MT Flexitank in 20ft Container',
    origin: 'International Tier-1 Synthesis Facility (Our Chinese partner Managed)',
    manufacturer: 'Our Chinese partner Certified Chemical Plant',
    moq: '20 Metric Tons (1 × 20ft FCL)',
    leadTime: '21 - 28 Days to Djibouti / Modjo Dry Port',
    datasheetUrl: '#',
    complianceDocs: ['Certificate of Analysis (COA)', 'Material Safety Data Sheet (MSDS)', 'ASTM C494 Compliance Report'],
    brandingOptions: ['Oranex/OCHEMI', 'Private Label / Customer Brand', 'OEM Original Manufacturer'],
    featured: true
  },
  {
    id: 'prod-chem-02',
    sku: 'OCH-SLUMP-30R',
    name: 'OCHEMI Slump-Retaining PCE Admixture (OCH-30R)',
    category: 'construction-chemicals',
    subCategory: 'Slump Retention Admixtures',
    productFamily: 'OCHEMI Chemical Admixtures',
    brand: 'OCHEMI',
    shortDescription: 'Extended-retention polycarboxylate polymer designed specifically for long transit times in hot climatic conditions without delaying final set times.',
    applications: ['Long Transit Ready-Mix in Addis Ababa traffic', 'Pumping to High-Rise Elevations', 'Mass Concrete Rafts'],
    specifications: {
      'Solid Content': '40% ± 1.0%',
      'Appearance': 'Clear to pale straw liquid',
      'Slump Retention Window': '90 - 150 Minutes',
      'Standard Compliance': 'ASTM C494 Type G'
    },
    packaging: '1,000L IBC Tank / 200L HDPE Drum',
    origin: 'International Manufacturer via Our Chinese partner',
    moq: '15 Metric Tons',
    leadTime: '25 Days',
    brandingOptions: ['Oranex/OCHEMI', 'Private Label / Customer Brand'],
    featured: true
  },
  {
    id: 'prod-chem-03',
    sku: 'OCH-SNF-92P',
    name: 'Sodium Naphthalene Sulfonate Formaldehyde (SNF/PNS Powder)',
    category: 'construction-chemicals',
    subCategory: 'SNF Admixtures',
    productFamily: 'Industrial Chemical Raw Materials',
    brand: 'OCHEMI / OEM',
    shortDescription: 'High-purity dry powder superplasticizer with low sodium sulfate content for on-site dissolution or blending in dry mortar and concrete production.',
    applications: ['Precast Yards', 'Ready-Mix Admixture Blending', 'Structural Grouting Compounds'],
    specifications: {
      'Solid Content (Dry)': '≥ 92%',
      'Sodium Sulfate (Na2SO4)': '≤ 5.0% (Low Sulfate Grade)',
      'Water Reduction Rate': '18% - 25%',
      'Standard': 'ASTM C494 Type F'
    },
    packaging: '25 kg Kraft paper bags with inner PE liner, 650 kg jumbo bags',
    origin: 'Global Chemical Synthesis via Our Chinese partner',
    moq: '25 Metric Tons (1 × 40ft FCL)',
    leadTime: '24 - 30 Days',
    brandingOptions: ['Oranex/OCHEMI', 'Private Label / Customer Brand', 'OEM Original Manufacturer']
  },
  {
    id: 'prod-chem-04',
    sku: 'OCH-HPMC-100K',
    name: 'Hydroxypropyl Methyl Cellulose (HPMC 100,000 mPa.s)',
    category: 'construction-chemicals',
    subCategory: 'Cellulose Ethers',
    productFamily: 'Dry Mortar Additives',
    brand: 'OCHEMI Specialized',
    shortDescription: 'Premium construction-grade cellulose ether for excellent water retention, sag resistance, and open time in tile adhesives and wall putties.',
    applications: ['Cementitious Tile Adhesives (C1/C2)', 'Wall Putty & Skim Coat', 'Self-Leveling Floor Underlayment'],
    specifications: {
      'Viscosity (2% Sol, 20°C)': '90,000 - 110,000 mPa.s (Brookfield)',
      'Water Retention': '≥ 98%',
      'Ash Content': '≤ 5.0%'
    },
    packaging: '25 kg Valve Paper Bags (500 kg per pallet)',
    origin: 'International Certified Plant via Our Chinese partner',
    moq: '5 Metric Tons',
    leadTime: '20 - 25 Days',
    brandingOptions: ['Oranex/OCHEMI', 'Private Label / Customer Brand']
  },
  {
    id: 'prod-chem-05',
    sku: 'OCH-RDP-501',
    name: 'Redispersible Polymer Powder (RDP / VAE Copolymer)',
    category: 'construction-chemicals',
    subCategory: 'Polymer Powders',
    productFamily: 'Dry Mortar Additives',
    brand: 'OCHEMI Specialized',
    shortDescription: 'Free-flowing vinyl acetate-ethylene copolymer powder enhancing adhesive tensile strength, flexural flexibility, and impact resistance in thin-bed mortars.',
    applications: ['Flexible Tile Adhesives', 'External Thermal Insulation (ETICS)', 'Repair Mortars'],
    specifications: {
      'Base Polymer': 'Vinyl Acetate-Ethylene (VAE)',
      'Solid Content': '≥ 99%',
      'Minimum Film Forming Temp (MFFT)': '0°C ± 1°C'
    },
    packaging: '25 kg Multi-wall Paper Bags',
    origin: 'Our Chinese partner Sourced Tier-1 Manufacturer',
    moq: '10 Metric Tons',
    leadTime: '25 Days',
    brandingOptions: ['Oranex/OCHEMI', 'Private Label / Customer Brand']
  },
  {
    id: 'prod-chem-06',
    sku: 'OCH-WP-CRYST',
    name: 'OCHEMI Crystalline Capillary Waterproofing Admixture',
    category: 'construction-chemicals',
    subCategory: 'Waterproofing Chemicals',
    productFamily: 'OCHEMI Chemical Admixtures',
    brand: 'OCHEMI',
    shortDescription: 'Permeability-reducing admixture that reacts with unhydrated cement to form insoluble needle-like crystals in pores and micro-cracks up to 0.4mm.',
    applications: ['Basement Retaining Walls', 'Water Reservoirs & Treatment Plants', 'Tunnel Linings & Foundations'],
    specifications: {
      'Chloride Content': 'Nil',
      'Water Permeability Reduction': '> 80% (DIN 1048)',
      'Self-Healing Crack Capacity': 'Up to 0.40 mm'
    },
    packaging: '20 kg Moisture-resistant Pails / 25 kg Bags',
    origin: 'International Manufacturer via Our Chinese partner',
    moq: '3 Metric Tons',
    leadTime: '21 Days',
    brandingOptions: ['Oranex/OCHEMI', 'Private Label / Customer Brand'],
    featured: true
  },

  // CATEGORY B: Cementitious & Industrial Raw Materials
  {
    id: 'prod-raw-01',
    sku: 'RAW-WHT-CEM525',
    name: 'White Portland Cement CEM I 52.5 R / 52.5 N',
    category: 'cementitious-raw-materials',
    subCategory: 'Specialty Cements',
    productFamily: 'Cementitious Materials',
    brand: 'Tier-1 International Mill (Our Chinese partner)',
    shortDescription: 'Ultra-high whiteness (>88% Hunter) white Portland cement offering rapid early strength development and high architectural aesthetics.',
    applications: ['Architectural Precast Concrete', 'Terrazzo Flooring & Pavers', 'Decorative Tile Grouts', 'White Masonry Mortars'],
    specifications: {
      'Whiteness (Hunter scale)': '≥ 88.5%',
      '2-Day Compressive Strength': '≥ 32.0 MPa',
      '28-Day Compressive Strength': '≥ 55.0 MPa',
      'Standard Compliance': 'EN 197-1 CEM I 52.5R, ASTM C150 Type I'
    },
    packaging: '50 kg Polypropylene Laminated Bags / 1.5 MT Big Bags',
    origin: 'Direct Import via Our Chinese partner (Middle East / Turkey Mills)',
    moq: '100 Metric Tons (Breakbulk or 4 × 20ft FCL)',
    leadTime: '25 - 35 Days to Modjo / Djibouti',
    datasheetUrl: '#',
    complianceDocs: ['Mill Test Certificate', 'EN 197-1 Conformity Certificate'],
    brandingOptions: ['OEM Original Manufacturer', 'Private Label / Customer Brand'],
    featured: true
  },
  {
    id: 'prod-raw-02',
    sku: 'RAW-SILICA-94',
    name: 'Densified Microsilica / Silica Fume (SiO2 ≥ 94%)',
    category: 'cementitious-raw-materials',
    subCategory: 'Pozzolanic Admixtures',
    productFamily: 'Supplementary Cementitious Materials',
    brand: 'Our Chinese partner Direct Supply',
    shortDescription: 'Ultra-fine amorphous silicon dioxide pozzolan that dramatically reduces porosity and maximizes density in High-Performance Concrete (HPC) and UHPC.',
    applications: ['Bridge Decks & Marine Structures', 'Ultra-High Performance Concrete (UHPC)', 'Abrasion-Resistant Industrial Slabs'],
    specifications: {
      'SiO2 Content': '≥ 94.0%',
      'Bulk Density (Densified)': '550 - 680 kg/m³',
      'Specific Surface (BET)': '≥ 18.5 m²/g',
      'Loss on Ignition (LOI)': '≤ 2.5%'
    },
    packaging: '900 kg / 1000 kg Jumbo Bags on Pallets',
    origin: 'Certified Ferro-Silicon Smelters via Our Chinese partner',
    moq: '20 Metric Tons',
    leadTime: '28 Days',
    brandingOptions: ['OEM Original Manufacturer', 'Oranex/OCHEMI'],
    featured: true
  },
  {
    id: 'prod-raw-03',
    sku: 'RAW-GGBS-100',
    name: 'Ground Granulated Blast-Furnace Slag (GGBS Grade 100/120)',
    category: 'cementitious-raw-materials',
    subCategory: 'Slag & Supplementary Binders',
    productFamily: 'Supplementary Cementitious Materials',
    brand: 'Our Chinese partner Direct Supply',
    shortDescription: 'Refined byproduct of iron smelting with high glass content for mass pour thermal heat reduction and resistance against sulfate attack.',
    applications: ['Dam & Hydropower Concrete', 'Sulfate-Resistant Foundations', 'Low-Carbon Eco-Cement Blends'],
    specifications: {
      'Blaine Fineness': '≥ 430 m²/kg',
      'Activity Index 28-day': '≥ 95%',
      'Sulfate Content (SO3)': '≤ 2.0%'
    },
    packaging: '1.5 MT Big Bags or Bulk Containerized Liners',
    origin: 'International Port Mills via Our Chinese partner',
    moq: '100 Metric Tons',
    leadTime: '30 Days',
    brandingOptions: ['OEM Original Manufacturer']
  },

  // CATEGORY C: Concrete Production & Batching Equipment
  {
    id: 'prod-eq-01',
    sku: 'EQ-HZS-90B',
    name: 'HZS90 Stationary Commercial Concrete Batching Plant (90 m³/h)',
    category: 'concrete-production-equipment',
    subCategory: 'Batching Plants',
    productFamily: 'Heavy Concrete Plant Systems',
    brand: 'Our Chinese partner Plant Engineering Partner',
    shortDescription: 'Heavy-duty modular concrete batching plant equipped with twin-shaft JS1500 compulsory mixer, automated aggregate batcher with load cell precision, and SCADA control system.',
    applications: ['Commercial Ready-Mix Supply', 'Highway & Expressway Infrastructure', 'Dam & Power Plant Works'],
    specifications: {
      'Theoretical Productivity': '90 m³/hour',
      'Mixer Type': 'Twin-shaft JS1500 (1.5 m³ discharge per cycle)',
      'Aggregate Storage Hoppers': '4 Bins × 20 m³ with pneumatic gates',
      'Weighing Accuracy': 'Aggregate ±2%, Cement/Water/Admixture ±1%',
      'Control System': 'Full PLC with dual industrial PC workstations and remote diagnostic telemetry'
    },
    packaging: 'Knocked-down modular shipment in 4 × 40ft HQ Containers',
    origin: 'Our Chinese partner Certified Machinery Works',
    manufacturer: 'Tier-1 Concrete Equipment Manufacturer',
    moq: '1 Complete Plant Set',
    leadTime: '40 - 50 Days to Site (Addis Ababa / Regional Hub)',
    datasheetUrl: '#',
    complianceDocs: ['ISO 9001 Factory Quality Certificate', 'CE Electrical Standard Certificate', 'Foundation Engineering Drawings'],
    brandingOptions: ['OEM Original Manufacturer', 'Private Label / Customer Brand'],
    featured: true
  },
  {
    id: 'prod-eq-02',
    sku: 'EQ-TM-10M3',
    name: 'Heavy-Duty Concrete Transit Mixer Drum (10 m³ / 12 m³ Capacity)',
    category: 'concrete-production-equipment',
    subCategory: 'Mixer Fleets',
    productFamily: 'Mobile Concrete Systems',
    brand: 'Our Chinese partner Fleet Solutions',
    shortDescription: 'High-wear manganese steel mixer drum assembly equipped with imported Rexroth/Eaton hydraulic pump, motor, and PMP/ZF planetary speed reducer.',
    applications: ['Ready-Mix Truck Mounting on Sinotruk/Mercedes/Isuzu chassis', 'Fleet Modernization'],
    specifications: {
      'Geometric Drum Volume': '16.5 m³ (10 m³ nominal ready-mix payload)',
      'Drum Material': 'Q345 high-strength wear-resistant alloy plate',
      'Hydraulic Pump & Motor': 'Rexroth A4VTG90 / Eaton 5423 series',
      'Mixing Blade': 'Double logarithmic spiral with wear-protection strips'
    },
    packaging: 'Flat-rack container or Ro-Ro direct shipment',
    origin: 'Our Chinese partner Global Machinery Hub',
    moq: '2 Units',
    leadTime: '35 Days',
    brandingOptions: ['OEM Original Manufacturer', 'Private Label / Customer Brand'],
    featured: true
  },
  {
    id: 'prod-eq-03',
    sku: 'EQ-SILO-100T',
    name: 'Bolted Cement Storage Silo (100 MT / 150 MT / 200 MT)',
    category: 'concrete-production-equipment',
    subCategory: 'Storage Silos',
    productFamily: 'Batching Plant Accessories',
    brand: 'Our Chinese partner Plant Engineering',
    shortDescription: 'Precision CNC-machined bolted steel cement silo engineered for easy containerized container transport and rapid on-site assembly with top dust collector and pressure relief valve.',
    applications: ['Ready-Mix Plants', 'Dry Mortar Blending Units', 'Mining Ground Support'],
    specifications: {
      'Storage Capacity': '100 Metric Tons (Bulk Density 1.4 t/m³)',
      'Assembly Method': 'Segmented bolted plates with embedded silicone gasket sealant',
      'Accessories Included': 'Top reverse-jet air dust collector, level sensors, fluidization pads, butterfly discharge valve'
    },
    packaging: 'Standard 40ft Container (up to two 100T silos per container)',
    origin: 'Our Chinese partner Procurement',
    moq: '1 Unit',
    leadTime: '25 Days',
    brandingOptions: ['OEM Original Manufacturer']
  },

  // CATEGORY D: Heavy Construction Machinery & Fleet
  {
    id: 'prod-mac-01',
    sku: 'MAC-EXC-22T',
    name: '22-Ton Hydraulic Crawler Excavator (Tier 3 Diesel)',
    category: 'construction-machinery',
    subCategory: 'Earthmoving Fleet',
    productFamily: 'Heavy Earthmoving Equipment',
    brand: 'Tier-1 Global Partner (Our Chinese partner)',
    shortDescription: 'Fuel-efficient 22-ton infrastructure excavator powered by turbocharged Isuzu/Cummins engine with heavy-duty rock boom, arm, and 1.1 m³ bucket.',
    applications: ['Deep Foundation Trenching', 'Quarry & Aggregate Extraction', 'Civil Road Grading'],
    specifications: {
      'Operating Weight': '22,200 kg',
      'Engine Power': '128 kW (172 hp) @ 2,000 rpm (Mechanical Injection, High Sulfur Diesel Tolerant)',
      'Standard Bucket Capacity': '1.1 m³ Heavy Rock Bucket with wear plates',
      'Max Digging Reach / Depth': '9,860 mm / 6,650 mm',
      'Hydraulic Pump': 'Kawasaki Variable Displacement Axial Piston'
    },
    packaging: 'Ro-Ro or Partially disassembled in 40ft Flat Rack Container',
    origin: 'Our Chinese partner Heavy Machinery Channel',
    moq: '1 Unit',
    leadTime: '35 - 45 Days to Djibouti / Addis Ababa',
    datasheetUrl: '#',
    complianceDocs: ['Factory Conformity Certificate', 'Engine Emission Data Sheet', 'Operation & Spare Parts Catalog'],
    brandingOptions: ['OEM Original Manufacturer'],
    featured: true
  },
  {
    id: 'prod-mac-02',
    sku: 'MAC-LOAD-5T',
    name: '5-Ton Heavy-Duty Wheel Loader (3.0 m³ Bucket)',
    category: 'construction-machinery',
    subCategory: 'Earthmoving Fleet',
    productFamily: 'Heavy Earthmoving Equipment',
    brand: 'Tier-1 Global Partner (Our Chinese partner)',
    shortDescription: 'Proven articulated front loader equipped with Weichai engine, planetary powershift transmission, and heavy dry-axles designed for quarry batching.',
    applications: ['Aggregate Handling at Batching Plants', 'Mining & Quarry Loading', 'Bulk Earthmoving'],
    specifications: {
      'Rated Load Capacity': '5,000 kg',
      'Bucket Volume': '3.0 m³ (Rock / Material Handling)',
      'Engine Model': 'Weichai Steyr WD10G220E23 (162 kW)',
      'Breakout Force': '170 kN'
    },
    packaging: 'Direct Ro-Ro Vessel to Port of Djibouti',
    origin: 'Our Chinese partner Heavy Machinery Channel',
    moq: '1 Unit',
    leadTime: '30 Days',
    brandingOptions: ['OEM Original Manufacturer'],
    featured: true
  },

  // CATEGORY E: Building & Finishing Materials
  {
    id: 'prod-bld-01',
    sku: 'BLD-REBAR-GR60',
    name: 'High-Tensile Deformed Steel Rebar (BS 4449 / ASTM A615 Grade 60)',
    category: 'building-materials',
    subCategory: 'Structural Steel',
    productFamily: 'Reinforcement Steel',
    brand: 'Certified Global Mills (Our Chinese partner)',
    shortDescription: 'Hot-rolled deformed rebar manufactured to international structural specifications with uniform ribbed deformations for superior concrete bonding.',
    applications: ['Multi-Story High-Rise Structural Columns', 'Bridge Piers & Box Girders', 'Foundation Rafts'],
    specifications: {
      'Diameter Range': '8 mm, 10 mm, 12 mm, 14 mm, 16 mm, 20 mm, 25 mm, 32 mm',
      'Standard Length': '12.0 Meters (Bundled & Tagged)',
      'Yield Strength (ReH)': '≥ 500 MPa / Grade 60 (≥ 420 MPa)',
      'Tensile Strength (Rm)': '≥ 620 MPa',
      'Elongation at Fracture': '≥ 14%'
    },
    packaging: '2.0 Metric Ton Bundles secured with heavy steel straps',
    origin: 'Direct Import via Our Chinese partner (Turkey / Gulf / Asia Mills)',
    moq: '250 Metric Tons (Multiple container or Breakbulk shipment)',
    leadTime: '30 - 40 Days to Modjo Dry Port',
    datasheetUrl: '#',
    complianceDocs: ['Mill Test Certificate (MTC) with heat numbers', 'Mechanical Tensile & Bend Test Reports'],
    brandingOptions: ['OEM Original Manufacturer'],
    featured: true
  },
  {
    id: 'prod-bld-02',
    sku: 'BLD-PIPE-HDPE',
    name: 'HDPE Corrugated Double-Wall Stormwater Drainage Pipes (SN8)',
    category: 'building-materials',
    subCategory: 'Drainage & Piping',
    productFamily: 'Infrastructure Piping',
    brand: 'Our Chinese partner Managed Sourcing',
    shortDescription: 'Corrugated high-density polyethylene drainage pipe offering exceptional ring stiffness (SN8), chemical resistance, and lightweight installation.',
    applications: ['Municipal Stormwater Drainage', 'Highway Culverts', 'Industrial Wastewater Lines'],
    specifications: {
      'Diameter Sizes': 'DN 300 mm to DN 1200 mm',
      'Ring Stiffness': 'SN8 (≥ 8 kN/m²)',
      'Joint Type': 'Integrated bell-and-spigot with EPDM elastomer sealing ring'
    },
    packaging: 'Telescoped nesting in 40ft HQ containers to optimize freight',
    origin: 'Our Chinese partner Direct Supply',
    moq: '1 × 40ft HQ Container',
    leadTime: '25 Days',
    brandingOptions: ['OEM Original Manufacturer', 'Private Label / Customer Brand']
  },

  // CATEGORY F: Civil Engineering & Infrastructure Materials
  {
    id: 'prod-civ-01',
    sku: 'CIV-GEO-TEX200',
    name: 'Non-Woven Needle-Punched Polypropylene Geotextile (200 - 500 g/m²)',
    category: 'civil-engineering',
    subCategory: 'Geosynthetics',
    productFamily: 'Infrastructure Geotextiles',
    brand: 'Our Chinese partner Geosynthetics',
    shortDescription: 'Continuous virgin polypropylene filament geotextile providing dependable filtration, separation, and subgrade stabilization under heavy road traffic.',
    applications: ['Subgrade Stabilization for Highway Corridors', 'French Drainage Systems', 'Riprap Shoreline Scour Protection'],
    specifications: {
      'Mass Per Unit Area': '200 g/m² to 500 g/m² available',
      'Tensile Strength (MD/CD)': '≥ 15 kN/m (200g) / ≥ 30 kN/m (400g)',
      'CBR Puncture Resistance': '≥ 2,500 N',
      'Water Permeability': '1.2 × 10⁻¹ cm/s'
    },
    packaging: 'Rolls: 4.0 m or 5.9 m width × 100 m length, wrapped in UV-resistant film',
    origin: 'International Geosynthetics Plant via Our Chinese partner',
    moq: '5,000 m²',
    leadTime: '20 - 25 Days',
    brandingOptions: ['OEM Original Manufacturer', 'Oranex/OCHEMI'],
    featured: true
  },
  {
    id: 'prod-civ-02',
    sku: 'CIV-MEM-HDPE2',
    name: 'HDPE Smooth Geomembrane Pond Liner (1.5 mm / 2.0 mm)',
    category: 'civil-engineering',
    subCategory: 'Geomembranes',
    productFamily: 'Containment Barriers',
    brand: 'Our Chinese partner Geosynthetics',
    shortDescription: 'High-density polyethylene impermeable barrier with carbon black UV stabilization for water retention dams, tailings, and waste containment ponds.',
    applications: ['Irrigation Retention Reservoirs', 'Mining Leach Pads', 'Landfill Bottom Liners'],
    specifications: {
      'Thickness': '1.50 mm / 2.00 mm (ASTM D5199)',
      'Density': '≥ 0.940 g/cm³',
      'Tensile Strength at Break': '≥ 27 N/mm (ASTM D6693)'
    },
    packaging: 'Rolls: 7.0 m width × 140 m length (approx. 1,400 kg per roll)',
    origin: 'Our Chinese partner Procurement',
    moq: '1 × 40ft Container (approx. 15,000 m²)',
    leadTime: '25 Days',
    brandingOptions: ['OEM Original Manufacturer']
  },

  // CATEGORY G: Industrial Supplies, Valves & Plant Spares
  {
    id: 'prod-ind-01',
    sku: 'IND-PUMP-SLURRY',
    name: 'Heavy-Duty Submersible Slurry Pump with Agitator (15 kW - 45 kW)',
    category: 'industrial-supplies',
    subCategory: 'Industrial Pumps',
    productFamily: 'Dewatering & Pumping Equipment',
    brand: 'Our Chinese partner Industrial Supplies',
    shortDescription: 'Cast chromium alloy wet-end slurry pump with integral high-torque bottom agitator for handling heavy sediment, bentonite, and sand washing slurry.',
    applications: ['Bentonite Slurry Pumping in Piling & Diaphragm Walls', 'Sand Washing Plants', 'Mine Dewatering'],
    specifications: {
      'Discharge Diameter': '100 mm / 150 mm / 200 mm',
      'Impeller & Agitator Material': 'High Chrome White Iron (27% Cr, 60-65 HRC)',
      'Motor Insulation / Protection': 'Class H / IP68 Submersible with moisture probes',
      'Max Solid Handling Capacity': 'Up to 60% solids by weight'
    },
    packaging: 'Reinforced Plywood Export Crate',
    origin: 'Our Chinese partner Industrial Machinery Hub',
    moq: '2 Units',
    leadTime: '25 Days',
    brandingOptions: ['OEM Original Manufacturer', 'Private Label / Customer Brand'],
    featured: true
  },
  {
    id: 'prod-ind-02',
    sku: 'IND-VALV-PNEUM',
    name: 'Pneumatic Actuated Butterfly Valves for Cementitious Powders',
    category: 'industrial-supplies',
    subCategory: 'Industrial Valves',
    productFamily: 'Process Flow Controls',
    brand: 'Our Chinese partner Industrial Supplies',
    shortDescription: 'Abrasion-resistant butterfly valve featuring cast aluminum alloy body, high-integrity polymer disc, and fast-acting double-acting pneumatic rotary actuator.',
    applications: ['Batching Plant Cement Hopper Discharges', 'Silo Outlets', 'Pneumatic Conveying Systems'],
    specifications: {
      'Sizes': 'DN 150, DN 200, DN 250, DN 300 mm',
      'Body Material': 'Gravity die-cast aluminum alloy',
      'Seal Sleeve': 'NBR / Wear-resistant polyurethane',
      'Actuator Operating Pressure': '2 to 8 bar'
    },
    packaging: 'Wooden export carton',
    origin: 'Our Chinese partner Procurement Channel',
    moq: '4 Units',
    leadTime: '18 Days',
    brandingOptions: ['OEM Original Manufacturer']
  }
];
