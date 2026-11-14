import { LanguageCode } from './languages';

export interface ExtendedTranslation {
  procurementEngine: {
    kicker: string;
    title: string;
    subtitle: string;
    sequenceKicker: string;
    sequenceFormula: string;
    stages: { code: string; name: string; desc: string }[];
    diagramKicker: string;
    diagramTitle: string;
    diagramSubtitle: string;
    selectPrompt: string;
    channels: {
      tenders: string;
      rfqs: string;
      requirements: string;
    };
    engines: {
      tender: string;
      rfq: string;
      requirement: string;
      sourcing: string;
      procurement: string;
      import: string;
      logistics: string;
      execution: string;
      support: string;
    };
    tabs: {
      architecture: string;
      tender: string;
      rfq: string;
      requirement: string;
      sourcing: string;
      import: string;
      execution: string;
    };
  };
  quickEntry: {
    executionPathwayLabel: string;
    card1Pathway: string;
    card1Deliverables: string[];
    card1Explore: string;
    card2Pathway: string;
    card2Deliverables: string[];
    card2Explore: string;
    card3Pathway: string;
    card3Deliverables: string[];
    card3Explore: string;
    secondaryLinks: { title: string; desc: string }[];
  };
  coreProcessSteps: {
    num: string;
    title: string;
    label: string;
    desc: string;
  }[];
  tenderView: {
    kicker: string;
    headline: string;
    subheadline: string;
    narrative: string;
    ctaSubmit: string;
    ctaReview: string;
    disclosureTitle: string;
    disclosureText: string;
    disclosureFooter: string;
    selectorTitle: string;
    selectorSubtitle: string;
    selectorKicker: string;
    fastTrackTitle: string;
    fastTrackKicker: string;
    fastTrackDesc: string;
    fastTrackNdaTitle: string;
    fastTrackNdaDesc: string;
    comparisonKicker: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    legendTitle: string;
    legendSupported: string;
    legendPostAward: string;
    legendReviewed: string;
    legendCustomer: string;
    legendNotIncluded: string;
    colActivity: string;
    colLevel0: string;
    colLevel1: string;
    colLevel2: string;
    colLevel3: string;
    colLevel4: string;
    rows: string[];
    footnoteTitle: string;
    footnoteText: string;
    categoriesKicker: string;
    categoriesTitle: string;
    categoriesSubtitle: string;
    categoriesCta: string;
    workflowKicker: string;
    workflowTitle: string;
    workflowSubtitle: string;
  };
  formLabels: {
    contactPerson: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    preferredLanguage: string;
    tenderLanguage: string;
    productOrScope: string;
    tenderTitle: string;
    procuringEntity: string;
    lotNumber: string;
    targetDate: string;
    deliveryLocation: string;
    specificationDetails: string;
    quantity: string;
    unit: string;
    notes: string;
    attachFiles: string;
    submitTenderBtn: string;
    submitQuoteBtn: string;
    submitRequirementBtn: string;
    doneBtn: string;
    confidentialityNotice: string;
  };
}

export const EXTENDED_TRANSLATIONS: Record<LanguageCode, ExtendedTranslation> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    procurementEngine: {
      kicker: 'Unified Enterprise Architecture',
      title: 'ORANEX PROCUREMENT ENGINE',
      subtitle: 'Three distinct customer entry pathways connecting into one unified sourcing, procurement, import, delivery, and project execution ecosystem.',
      sequenceKicker: 'The 9-Stage Unified Operational Sequence',
      sequenceFormula: 'ASSESS → SOURCE → PREPARE → QUOTE → PROCURE → IMPORT → DELIVER → EXECUTE → SUPPORT',
      stages: [
        { code: '01', name: 'ASSESS', desc: 'Technical & compliance audit' },
        { code: '02', name: 'SOURCE', desc: 'OEM factory identification' },
        { code: '03', name: 'PREPARE', desc: 'Bid & dossier structuring' },
        { code: '04', name: 'QUOTE', desc: 'Direct ex-factory pricing' },
        { code: '05', name: 'PROCURE', desc: 'LC & purchase execution' },
        { code: '06', name: 'IMPORT', desc: 'Multimodal ocean & transit' },
        { code: '07', name: 'DELIVER', desc: 'Dry port & site haulage' },
        { code: '08', name: 'EXECUTE', desc: 'Assembly & commissioning' },
        { code: '09', name: 'SUPPORT', desc: 'Training, warranty & spares' }
      ],
      diagramKicker: 'Integrated Operational Pipeline',
      diagramTitle: 'Three Entry Channels · One Operational Ecosystem',
      diagramSubtitle: 'Select any component to inspect its role and technical protocols.',
      selectPrompt: 'Select any engine component to inspect its operational protocols.',
      channels: {
        tenders: 'FORMAL TENDERS',
        rfqs: 'RFQs / PROFORMAS',
        requirements: 'DIRECT REQUIREMENTS'
      },
      engines: {
        tender: 'TENDER ENGINE',
        rfq: 'RFQ ENGINE',
        requirement: 'REQUIREMENT ENGINE',
        sourcing: 'SOURCING ENGINE',
        procurement: 'PROCUREMENT ENGINE',
        import: 'IMPORT ENGINE',
        logistics: 'LOGISTICS / DELIVERY',
        execution: 'PROJECT EXECUTION',
        support: 'SUPPORT / AFTER-SALES'
      },
      tabs: {
        architecture: 'Conceptual Overview',
        tender: 'Tender Engine',
        rfq: 'RFQ Engine',
        requirement: 'Requirement Desk',
        sourcing: 'Sourcing Engine',
        import: 'Import & Logistics',
        execution: 'Project Execution'
      }
    },
    quickEntry: {
      executionPathwayLabel: 'Execution Pathway:',
      card1Pathway: 'Assessment → Preparation → Sourcing → Submission → Award → Supply → Delivery → Execution',
      card1Deliverables: [
        'BoQ specification audit & Go / No-Go review',
        'Direct OEM Authorization Letters (MAF / MAL)',
        '5 Flexible levels from review to turnkey supply'
      ],
      card1Explore: 'Explore 5 Tender Service Levels',
      card2Pathway: 'Review → Source → Quote → Procure → Deliver',
      card2Deliverables: [
        'Direct ex-factory pricing from global OEM factories',
        'Proformas compliant with Ethiopian & regional banks',
        'Incoterms: FOB, CIF, CFR, CIP & DDP Modjo/Addis'
      ],
      card2Explore: 'Consolidated Multi-Product Imports',
      card3Pathway: 'Requirement → Source → Quote → Procure → Deliver',
      card3Deliverables: [
        'No part numbers or OEM codes required to start',
        'Multi-origin sourcing: Asia, Europe, Middle East & Americas',
        'Direct freight, consolidation & delivery to your door'
      ],
      card3Explore: 'Tell Us Your Requirement Form',
      secondaryLinks: [
        {
          title: 'Browse Catalogue & Source',
          desc: 'Over 50+ verified chemicals, polymers, steel & inputs'
        },
        {
          title: 'Industrial Supply Pathway',
          desc: 'Raw materials, packaging, and recurring factory inputs'
        },
        {
          title: 'Machinery & Equipment',
          desc: 'Turnkey plant lines, testing devices & commissioning'
        },
        {
          title: 'Consolidated Import Program',
          desc: 'Combined container cargo & reduced port clearance costs'
        },
        {
          title: 'Spare Parts & Precision Wear',
          desc: 'OEM & compatible mechanical, electrical & plant spares'
        },
        {
          title: 'Tender & Africa Coverage',
          desc: 'Multi-level tender engineering across 20+ African markets'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: 'Source',
        label: 'SOURCE',
        desc: 'Identify verified international manufacturers, audit production compliance, and secure direct pricing.'
      },
      {
        num: '02',
        title: 'Consolidate',
        label: 'CONSOLIDATE',
        desc: 'Aggregate multi-supplier requirements into optimized containerized shipments at overseas hubs.'
      },
      {
        num: '03',
        title: 'Import',
        label: 'IMPORT',
        desc: 'Multimodal ocean/air freight to Djibouti, customs transit documentation, and dry port transit to Modjo.'
      },
      {
        num: '04',
        title: 'Deliver',
        label: 'DELIVER',
        desc: 'Final customs clearance, inland haulage, and insured offloading directly to your factory or project site.'
      },
      {
        num: '05',
        title: 'Execute',
        label: 'EXECUTE',
        desc: 'Turnkey machinery installation, trial batch verification, electrical wiring, and technical commissioning.'
      },
      {
        num: '06',
        title: 'Support',
        label: 'SUPPORT',
        desc: 'Ongoing wear-part supply frameworks, warranty liaison, operator training, and local technical assistance.'
      }
    ],
    tenderView: {
      kicker: 'Africa-Wide Tender & Procurement Support',
      headline: 'TENDER & PROCUREMENT SUPPORT ACROSS AFRICA',
      subheadline: 'Choose the level of support you need — from tender assessment and bid preparation to international sourcing, post-award supply and complete project execution.',
      narrative: 'ORANEX supports contractors, ministries, utilities, international development agencies, and private commercial enterprises with structured tender workflows, direct OEM manufacturer benchmarking, trade finance coordination, and end-to-end delivery across African corridors.',
      ctaSubmit: 'SUBMIT YOUR TENDER',
      ctaReview: 'NOT SURE? LET US REVIEW IT',
      disclosureTitle: 'Regulatory & Procurement Framework Parameters',
      disclosureText: 'ORANEX can support procurement opportunities and sourcing requirements across African markets, subject to applicable procurement rules, customer authorization, local regulations, eligibility requirements, contractual arrangements, and the availability of suitable supply partners.',
      disclosureFooter: 'Headquartered in Addis Ababa, Ethiopia, ORANEX coordinates with verified international OEMs, accredited testing laboratories, and regional delivery partners. Support is structured strictly according to destination legal and procurement parameters. ORANEX does not claim automatic eligibility, legal registration, or local physical offices in countries where none have been established, and does not guarantee tender awards.',
      selectorTitle: 'HOW MUCH SUPPORT DO YOU NEED?',
      selectorSubtitle: 'Choose the level of support that matches your requirement. These are operational support models tailored to your tender maturity—not generic subscription tiers.',
      selectorKicker: 'Customer-Selectable Procurement Pathways',
      fastTrackTitle: 'SUBMIT YOUR TENDER',
      fastTrackKicker: 'Fast-Track Africa Submission',
      fastTrackDesc: 'Have an active tender document, RfP, or Bill of Quantities? Upload your files to our Addis Ababa procurement desk for multi-level technical review and manufacturer pricing discovery.',
      fastTrackNdaTitle: 'Confidentiality Guarantee:',
      fastTrackNdaDesc: 'All submissions protected under corporate non-disclosure terms.',
      comparisonKicker: 'Detailed Scope Matrix',
      comparisonTitle: 'TENDER SERVICE COMPARISON',
      comparisonSubtitle: 'Side-by-side comparison of activities, responsibilities, and deliverables across all 5 customer-selectable pathways.',
      legendTitle: 'Legend:',
      legendSupported: 'Supported',
      legendPostAward: 'Post-Award',
      legendReviewed: 'Reviewed',
      legendCustomer: 'Handled by Customer',
      legendNotIncluded: 'Not Included',
      colActivity: 'Procurement Activity / Deliverable',
      colLevel0: 'Assessment',
      colLevel1: 'Tender Prep',
      colLevel2: 'Sourcing + Prep',
      colLevel3: 'Full Supply',
      colLevel4: 'End-to-End',
      rows: [
        'Tender Review',
        'Requirement Extraction',
        'Compliance Checklist',
        'Bid Preparation',
        'International Sourcing',
        'Manufacturer / OEM Search',
        'Technical Documents',
        'Supplier Quotations',
        'Commercial Coordination',
        'Submission Readiness',
        'Procurement',
        'Import Coordination',
        'Delivery',
        'Installation',
        'Commissioning',
        'Training',
        'Handover',
        'Warranty / After-Sales'
      ],
      footnoteTitle: '* Post-Award Contractual Notice & Operating Boundaries',
      footnoteText: '* Important Note: Post-award procurement, manufacturing, shipping, import, delivery, installation, commissioning, training, and after-sales support are provided only if the contract is awarded to the customer and subject to separate or agreed post-award contractual arrangements. ORANEX does not claim automatic supply rights upon bidding and does not guarantee tender awards.',
      categoriesKicker: 'Procurement Scopes We Support',
      categoriesTitle: 'Supported Tenders & Procurement Categories',
      categoriesSubtitle: 'Whether you are an international development agency executing a donor-funded project, a regional government entity procuring public utilities, or a private contractor bidding on a commercial tender, our procurement infrastructure provides verified manufacturer alignment.',
      categoriesCta: 'Inquire for Scope',
      workflowKicker: 'Structured 10-Stage Pipeline',
      workflowTitle: 'From Opportunity to Delivery & Handover',
      workflowSubtitle: 'Explore how ORANEX manages risk, international manufacturer validation, cross-border shipping corridors, and on-site engineering milestones across every phase of execution.'
    },
    formLabels: {
      contactPerson: 'Contact Person *',
      company: 'Company / Organization *',
      email: 'Email Address *',
      phone: 'Phone / Mobile *',
      country: 'Target African Market / Country',
      preferredLanguage: 'Preferred Communication Language',
      tenderLanguage: 'Preferred Tender / Proposal Language',
      productOrScope: 'Product or Project Scope *',
      tenderTitle: 'Tender Title or Project Name *',
      procuringEntity: 'Procuring Entity / Client (Optional)',
      lotNumber: 'Tender / Lot Number (Optional)',
      targetDate: 'Submission Deadline / Required Date',
      deliveryLocation: 'Delivery Location / Port',
      specificationDetails: 'Specification Details / Parameters',
      quantity: 'Quantity Needed',
      unit: 'Unit of Measure',
      notes: 'Additional Notes or BoQ Details',
      attachFiles: 'Attach Tender Dossier, Specs or BoQ (PDF, Excel, Word)',
      submitTenderBtn: 'SUBMIT TENDER DOSSIER',
      submitQuoteBtn: 'SUBMIT QUOTE REQUEST',
      submitRequirementBtn: 'SUBMIT REQUIREMENT',
      doneBtn: 'Done',
      confidentialityNotice: 'All bid documentation, tender specifications, and client pricing data are treated under rigorous non-disclosure agreements.'
    }
  },

  // ==========================================
  // CHINESE (中文)
  // ==========================================
  zh: {
    procurementEngine: {
      kicker: '一体化工业架构',
      title: 'ORANEX 供应链集采引擎',
      subtitle: '三大直达通道，打通全球寻源、大宗采购、国际海运、清关配送与工程现场落地的完整生态。',
      sequenceKicker: '九阶段全流程执行闭环',
      sequenceFormula: '评估 → 寻源 → 备标 → 报价 → 集采 → 进口 → 交付 → 执行 → 保障',
      stages: [
        { code: '01', name: '评估', desc: '技术参数与合规性审查' },
        { code: '02', name: '寻源', desc: '中国及全球源头工厂匹配' },
        { code: '03', name: '备标', desc: '投标资质与技术文件编制' },
        { code: '04', name: '报价', desc: '源头出厂底价与运费核算' },
        { code: '05', name: '集采', desc: '信用证(LC)与订单排产' },
        { code: '06', name: '进口', desc: '国际多式联运与海运订舱' },
        { code: '07', name: '交付', desc: '干港清关与工地陆运直达' },
        { code: '08', name: '执行', desc: '机械安装、配合比与试运行' },
        { code: '09', name: '保障', desc: '技术培训、备件保供与质保' }
      ],
      diagramKicker: '一体化运营管线',
      diagramTitle: '三大入口通道 · 一个协同生态',
      diagramSubtitle: '选择任意业务模块即可查看其操作规范与技术流程。',
      selectPrompt: '选择任意模块查看详细技术协议与执行流程。',
      channels: {
        tenders: '工程项目招标',
        rfqs: '询价单 / 形式发票',
        requirements: '定制采购需求'
      },
      engines: {
        tender: '招标支持引擎',
        rfq: '询价服务引擎',
        requirement: '需求快速响应',
        sourcing: '全球寻源引擎',
        procurement: '大宗集采引擎',
        import: '进出口物流引擎',
        logistics: '仓储与内陆配送',
        execution: '项目落地执行',
        support: '售后与技术支持'
      },
      tabs: {
        architecture: '整体架构概览',
        tender: '工程招标引擎',
        rfq: '询价报价引擎',
        requirement: '定制需求通道',
        sourcing: '全球寻源模块',
        import: '国际海运与清关',
        execution: '工地现场落地'
      }
    },
    quickEntry: {
      executionPathwayLabel: '执行路径：',
      card1Pathway: '评估 → 备标 → 寻源 → 投标 → 中标 → 生产 → 交付 → 验收',
      card1Deliverables: [
        'BOQ清单逐项技术规范审核与可行性备忘录',
        '源头制造商正式授权书 (MAF / OEM)',
        '涵盖5级灵活支持模式，从预审到交钥匙保供'
      ],
      card1Explore: '探索5大工程投标服务级别',
      card2Pathway: '审查 → 寻源 → 报价 → 集采 → 交付',
      card2Deliverables: [
        '直达国际优质工厂透明出厂价',
        '符合埃塞俄比亚商业银行要求的形式发票(Proforma)',
        '灵活国际贸易条款：FOB, CIF, CFR, CIP & DDP Modjo/Addis'
      ],
      card2Explore: '大宗工程材料集采方案',
      card3Pathway: '需求 → 寻源 → 报价 → 集采 → 交付',
      card3Deliverables: [
        '无需具体型号或原厂代码即可发起询价',
        '多源头供应保障：中国、中东、欧洲及美洲',
        '国际海运、清关转运与门到门直达'
      ],
      card3Explore: '填写工程采购需求表单',
      secondaryLinks: [
        {
          title: '浏览2026产品目录',
          desc: '精选沥青、混凝土添加剂、型钢与工程装备'
        },
        {
          title: '工业原料直供通道',
          desc: '化工厂、涂料厂及干混砂浆生产原料长期供应'
        },
        {
          title: '工程机械与整套生产线',
          desc: '商砼搅拌站、重型工程车与现场安装调试'
        },
        {
          title: '大宗拼箱集采集运',
          desc: '优化集装箱配载，显著降低清关与海运综合成本'
        },
        {
          title: '备品备件与易损件',
          desc: '原厂及高适配机电部件、耐磨衬板与泵阀'
        },
        {
          title: '泛非工程项目覆盖',
          desc: '服务埃塞俄比亚及东非多国重点工程'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: '全球寻源',
        label: '寻源 (SOURCE)',
        desc: '精准匹配合格国际制造商，审核产能资质并锁定最具竞争力的工厂底价。'
      },
      {
        num: '02',
        title: '集拼优化',
        label: '集运 (CONSOLIDATE)',
        desc: '在海外港口枢纽统筹多品类订单集拼装箱，降低单方海运与装卸成本。'
      },
      {
        num: '03',
        title: '国际发运',
        label: '发运 (IMPORT)',
        desc: '海运直达吉布提港，快速办理多式联运转关单据，铁路直通莫乔干港(Modjo)。'
      },
      {
        num: '04',
        title: '内陆交付',
        label: '交付 (DELIVER)',
        desc: '协同办理清关验关，组织专业车队内陆长途直运至项目工地或工厂车间。'
      },
      {
        num: '05',
        title: '工程落地',
        label: '执行 (EXECUTE)',
        desc: '搅拌站与生产线现场机械电气安装指导、配合比试机检测与技术交底。'
      },
      {
        num: '06',
        title: '持续保障',
        label: '售后 (SUPPORT)',
        desc: '长效易损备件储备、厂家质保对接、现场操作人员培训与常态化技术支持。'
      }
    ],
    tenderView: {
      kicker: '服务泛非工程建设：国际招标与项目采购全流程协调',
      headline: '一体化工程建材采购与交钥匙供应链服务',
      subheadline: '根据您的工程进度与采购模式，选择最适合的对接方案——从前期标书审核、厂家资质对接到中标后国际海运与分期工地交付。',
      narrative: 'ORANEX Trading 为埃塞俄比亚承包商、房地产开发商、公路局及大型工业客户提供一站式集采协同，提供原厂测试报告、透明价格与阶段性供货。',
      ctaSubmit: '提交工程量清单 (BOQ)',
      ctaReview: '申请免费技术评估',
      disclosureTitle: '商业与法规合规准则',
      disclosureText: '采购协同严格遵守相关法律法规及客户授权协议。ORANEX 不对第三方评标结果作不当承诺。',
      disclosureFooter: '总部位于埃塞俄比亚亚的斯亚贝巴，ORANEX 协同国际认证厂家及专业检测机构提供真实出厂资料。',
      selectorTitle: '您需要哪种层级的采购支持？',
      selectorSubtitle: '选择契合您项目阶段与预算的专业支持级别。',
      selectorKicker: '灵活的工程集采合作层级',
      fastTrackTitle: '提交工程招标文件',
      fastTrackKicker: '快速直通通道',
      fastTrackDesc: '手头有活跃的招标清单、图纸或工程量清单 (BOQ)？上传至亚的斯亚贝巴采购部进行技术核算与价格发现。',
      fastTrackNdaTitle: '保密承诺：',
      fastTrackNdaDesc: '所有上传文件均受严格的商业保密协议保护。',
      comparisonKicker: '服务范围对照',
      comparisonTitle: '工程采购服务能力对比矩阵',
      comparisonSubtitle: '5大层级在职责范围、交付成果与协同深度的全景对比。',
      legendTitle: '图例：',
      legendSupported: '全力支持',
      legendPostAward: '中标后提供',
      legendReviewed: '协助审核',
      legendCustomer: '客户自行负责',
      legendNotIncluded: '不包含',
      colActivity: '采购协同服务内容 / 交付成果',
      colLevel0: '0级：评估',
      colLevel1: '1级：备标',
      colLevel2: '2级：寻源备标',
      colLevel3: '3级：全套供货',
      colLevel4: '4级：交钥匙落地',
      rows: [
        '招标文件技术审查',
        '工程量清单提取与核算',
        '合规性检查清单',
        '技术标书文件编制',
        '国际源头寻源比价',
        '中国合格厂家匹配',
        '技术资质与检验报告',
        '形式发票与工厂报价',
        '商务谈判与条款协调',
        '备标包装与提交准备',
        '大宗采购与LC开证',
        '国际海运与清关协调',
        '内陆运输与工地送达',
        '设备机械现场安装',
        '试运行与配合比调试',
        '操作人员技能培训',
        '工程验收交付',
        '质保期维护与备件支持'
      ],
      footnoteTitle: '* 中标后履约与供货说明',
      footnoteText: '* 重要提示：中标后的生产排期、国际海运、清关配送与现场安装以正式签署的采购供货合同为准。ORANEX 严格遵守公平商业准则。',
      categoriesKicker: '支持的工程采购范围',
      categoriesTitle: '支持的工程与建材集采品类',
      categoriesSubtitle: '涵盖道路沥青、混凝土添加剂、结构钢材、幕墙门窗、卫浴机电及重型工程机械。',
      categoriesCta: '咨询采购品类',
      workflowKicker: '十阶段结构化执行流程',
      workflowTitle: '从商机识别到最终交付验收',
      workflowSubtitle: '深入了解 ORANEX 如何在风险控制、国际厂家验证、跨境物流与现场技术支持等环节保驾护航。'
    },
    formLabels: {
      contactPerson: '联系人姓名 *',
      company: '公司 / 机构全称 *',
      email: '商务邮箱 *',
      phone: '联系电话 / WhatsApp *',
      country: '项目所在国家 / 地区',
      preferredLanguage: '首选沟通语言',
      tenderLanguage: '标书与文件语言',
      productOrScope: '产品或工程范围 *',
      tenderTitle: '工程名称或标段 *',
      procuringEntity: '业主单位 / 招标方 (选填)',
      lotNumber: '标段号 / 编号 (选填)',
      targetDate: '截标日期 / 所需到货时间',
      deliveryLocation: '交货地点 / 到达港口',
      specificationDetails: '技术指标 / 规格要求',
      quantity: '所需数量',
      unit: '计量单位',
      notes: '补充说明或 BOQ 清单概要',
      attachFiles: '上传 BOQ、图纸或技术规范 (PDF, Excel, Word, DWG)',
      submitTenderBtn: '提交标书文件',
      submitQuoteBtn: '提交报价申请 (RFQ)',
      submitRequirementBtn: '提交采购需求',
      doneBtn: '完成',
      confidentialityNotice: '所有招标文件与技术数据均在保密协议下受到法律保护。'
    }
  },

  // ==========================================
  // FRENCH (FRANÇAIS)
  // ==========================================
  fr: {
    procurementEngine: {
      kicker: 'Architecture d’Entreprise Unifiée',
      title: 'MOTEUR D’ACHATS ORANEX',
      subtitle: 'Trois voies d’entrée client distinctes connectées à un écosystème unifié de sourcing, d’achats, d’importation, de livraison et d’exécution de projets.',
      sequenceKicker: 'La Séquence Opérationnelle Unifiée en 9 Étapes',
      sequenceFormula: 'ÉVALUER → SOURCER → PRÉPARER → COTER → ACHETER → IMPORTER → LIVRER → EXÉCUTER → ASSISTER',
      stages: [
        { code: '01', name: 'ÉVALUER', desc: 'Audit technique et de conformité' },
        { code: '02', name: 'SOURCER', desc: 'Identification des fabricants OEM' },
        { code: '03', name: 'PRÉPARER', desc: 'Structuration de l’offre et du dossier' },
        { code: '04', name: 'COTER', desc: 'Prix direct d’usine compétitif' },
        { code: '05', name: 'ACHETER', desc: 'Exécution LC et bons de commande' },
        { code: '06', name: 'IMPORTER', desc: 'Fret maritime et transit multimodal' },
        { code: '07', name: 'LIVRER', desc: 'Port sec et transport sur site' },
        { code: '08', name: 'EXÉCUTER', desc: 'Montage et mise en service' },
        { code: '09', name: 'ASSISTER', desc: 'Formation, garantie et pièces' }
      ],
      diagramKicker: 'Pipeline Opérationnel Intégré',
      diagramTitle: 'Trois Voies d’Entrée · Un Écosystème Opérationnel Unique',
      diagramSubtitle: 'Sélectionnez un composant pour consulter son rôle et ses protocoles.',
      selectPrompt: 'Sélectionnez un module pour afficher ses spécifications techniques.',
      channels: {
        tenders: 'APPELS D’OFFRES FORMELS',
        rfqs: 'DEMANDES DE DEVIS / PROFORMA',
        requirements: 'BESOINS DIRECTS'
      },
      engines: {
        tender: 'MOTEUR APPEL D’OFFRES',
        rfq: 'MOTEUR DEVIS / RFQ',
        requirement: 'BUREAU DES BESOINS',
        sourcing: 'MOTEUR DE SOURCING',
        procurement: 'MOTEUR D’ACHATS',
        import: 'MOTEUR D’IMPORTATION',
        logistics: 'LOGISTIQUE & LIVRAISON',
        execution: 'EXÉCUTION DE PROJETS',
        support: 'SUPPORT & APRÈS-VENTE'
      },
      tabs: {
        architecture: 'Vue d’Ensemble Conceptuelle',
        tender: 'Moteur d’Appel d’Offres',
        rfq: 'Moteur RFQ / Devis',
        requirement: 'Bureau des Besoins',
        sourcing: 'Moteur de Sourcing',
        import: 'Importation & Logistique',
        execution: 'Exécution de Projets'
      }
    },
    quickEntry: {
      executionPathwayLabel: 'Parcours d’Exécution :',
      card1Pathway: 'Évaluation → Préparation → Sourcing → Soumission → Adjudication → Fourniture → Livraison → Exécution',
      card1Deliverables: [
        'Audit de conformité du BoQ & avis Go / No-Go',
        'Attestations d’autorisation constructeur (MAF / OEM)',
        '5 niveaux flexibles de l’évaluation à la livraison clé en main'
      ],
      card1Explore: 'Découvrir les 5 Niveaux de Service d’Appels d’Offres',
      card2Pathway: 'Examen → Sourcing → Devis → Achats → Livraison',
      card2Deliverables: [
        'Prix usine direct auprès de fabricants mondiaux certifiés',
        'Factures proforma conformes aux banques éthiopiennes et régionales',
        'Incoterms : FOB, CIF, CFR, CIP & DDP Modjo/Addis-Abeba'
      ],
      card2Explore: 'Importations Consolidées Multi-Produits',
      card3Pathway: 'Besoin → Sourcing → Devis → Achats → Livraison',
      card3Deliverables: [
        'Aucun code fabricant ni référence technique requis au départ',
        'Sourcing multi-origines : Asie, Europe, Moyen-Orient & Amériques',
        'Fret direct, groupage et livraison jusqu’à votre porte'
      ],
      card3Explore: 'Formulaire de Besoin Industriel Direct',
      secondaryLinks: [
        {
          title: 'Consulter le Catalogue & Sourcer',
          desc: 'Plus de 50 intrants chimiques, polymères et acier certifiés'
        },
        {
          title: 'Approvisionnement Industriel',
          desc: 'Matières premières, emballages et intrants réguliers'
        },
        {
          title: 'Machines & Équipements',
          desc: 'Lignes complètes d’usines, appareils d’essais et mise en service'
        },
        {
          title: 'Programme d’Importation Groupée',
          desc: 'Groupage de conteneurs et réduction des coûts portuaires'
        },
        {
          title: 'Pièces de Rechange & Usure',
          desc: 'Pièces d’origine et compatibles mécaniques et électriques'
        },
        {
          title: 'Couverture Appels d’Offres Afrique',
          desc: 'Ingénierie de marchés sur plus de 20 pays africains'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: 'Sourcer',
        label: 'SOURCER',
        desc: 'Identifier les fabricants mondiaux qualifiés, auditer la conformité et négocier les prix usine.'
      },
      {
        num: '02',
        title: 'Consolider',
        label: 'CONSOLIDER',
        desc: 'Regrouper les besoins de multiples fournisseurs en conteneurs optimisés dans nos hubs.'
      },
      {
        num: '03',
        title: 'Importer',
        label: 'IMPORTER',
        desc: 'Fret multimodal maritime/aérien vers Djibouti, transit douanier et corridor vers Modjo.'
      },
      {
        num: '04',
        title: 'Livrer',
        label: 'LIVRER',
        desc: 'Dédouanement final, transport terrestre et déchargement sécurisé sur votre site.'
      },
      {
        num: '05',
        title: 'Exécuter',
        label: 'EXÉCUTER',
        desc: 'Montage clé en main des machines, essais de production, câblage et recette technique.'
      },
      {
        num: '06',
        title: 'Assister',
        label: 'ASSISTER',
        desc: 'Accords-cadres pour pièces d’usure, garantie constructeur, formation et support local.'
      }
    ],
    tenderView: {
      kicker: 'Appui aux Marchés Publics & Privés en Afrique',
      headline: 'APPUI AUX APPELS D’OFFRES & ACHATS EN AFRIQUE',
      subheadline: 'Choisissez le niveau d’accompagnement adapté — de l’évaluation du dossier et la préparation de l’offre jusqu’au sourcing international, à la fourniture post-adjudication et à l’exécution complète de projets.',
      narrative: 'ORANEX accompagne les entreprises, ministères, régies publiques, bailleurs de fonds et contractants privés avec des processus rigoureux, l’accès direct aux fabricants OEM, la gestion du financement commercial et la livraison sur site.',
      ctaSubmit: 'SOUMETTRE VOTRE APPEL D’OFFRES',
      ctaReview: 'PAS SÛR ? LAISSEZ-NOUS L’ÉVALUER',
      disclosureTitle: 'Cadre Réglementaire & Paramètres Opérationnels',
      disclosureText: 'ORANEX accompagne les opportunités d’achats et besoins de sourcing à travers les marchés africains, sous réserve des règles applicables, de l’autorisation du client, des réglementations locales, des conditions d’éligibilité et des accords contractuels.',
      disclosureFooter: 'Basée à Addis-Abeba, Éthiopie, ORANEX collabore avec des usines OEM certifiées et des laboratoires accrédités. Les services s’inscrivent strictement dans les cadres juridiques locaux. ORANEX ne revendique pas d’éligibilité automatique ni de bureaux physiques dans les pays où elle n’est pas établie, et ne garantit pas l’attribution des marchés.',
      selectorTitle: 'DE QUEL NIVEAU D’APPUI AVEZ-VOUS BESOIN ?',
      selectorSubtitle: 'Sélectionnez le niveau de service adapté à votre organisation. Il s’agit de modèles d’appui opérationnel sur mesure—pas de forfaits génériques.',
      selectorKicker: 'Parcours d’Achats Sélectionnables par le Client',
      fastTrackTitle: 'SOUMETTRE VOTRE DOSSIER',
      fastTrackKicker: 'Dépôt Rapide pour l’Afrique',
      fastTrackDesc: 'Vous avez un dossier d’appel d’offres, un cahier des charges ou un BoQ ? Déposez vos fichiers auprès de notre bureau d’achats à Addis-Abeba pour une analyse technique approfondie et la recherche de prix usine.',
      fastTrackNdaTitle: 'Garantie de Confidentialité :',
      fastTrackNdaDesc: 'Toutes les soumissions sont strictement protégées par accord de non-divulgation (NDA).',
      comparisonKicker: 'Matrice Détaillée du Périmètre',
      comparisonTitle: 'COMPARAISON DES NIVEAUX DE SERVICE',
      comparisonSubtitle: 'Comparatif détaillé des activités, responsabilités et livrables sur l’ensemble des 5 parcours disponibles.',
      legendTitle: 'Légende :',
      legendSupported: 'Inclus',
      legendPostAward: 'Post-Adjudication',
      legendReviewed: 'Examiné',
      legendCustomer: 'À la charge du client',
      legendNotIncluded: 'Non inclus',
      colActivity: 'Activité d’Achat / Livrable',
      colLevel0: 'Évaluation',
      colLevel1: 'Préparation',
      colLevel2: 'Sourcing + Prép.',
      colLevel3: 'Fourniture Complète',
      colLevel4: 'Clé en Main',
      rows: [
        'Examen du Cahier des Charges',
        'Extraction des Spécifications BoQ',
        'Liste de Contrôle de Conformité',
        'Préparation du Dossier d’Offre',
        'Sourcing International',
        'Recherche de Fabricants / OEM',
        'Documentation Technique',
        'Cotations des Fournisseurs',
        'Coordination Commerciale',
        'Préparation Finale au Dépôt',
        'Achats & Commande Usine (Post-Adjudication)',
        'Transit & Dédouanement (Post-Adjudication)',
        'Livraison Port / Chantier (Post-Adjudication)',
        'Montage sur Chantier & Installation',
        'Essais & Mise en Service',
        'Formation Technique des Équipes',
        'Protocole de Recette & Transfert',
        'Garantie & Pièces de Rechange'
      ],
      footnoteTitle: '* Avis Contractuel Post-Adjudication & Limites Opérationnelles',
      footnoteText: '* Note importante : Les prestations post-adjudication (commandes, expédition, livraison, montage, formation et garantie) ne sont exécutées que si le marché est attribué au client et sous réserve d’un accord contractuel séparé ou convenu. ORANEX ne revendique aucun droit automatique de fourniture et ne garantit pas l’attribution des marchés.',
      categoriesKicker: 'Périmètres d’Achats Pris en Charge',
      categoriesTitle: 'Catégories d’Appels d’Offres & d’Achats Supportées',
      categoriesSubtitle: 'Que vous soyez une agence internationale de développement, une entité publique ou un entrepreneur privé soumissionnant à un marché, notre infrastructure d’achats assure un alignement fabricant rigoureux.',
      categoriesCta: 'Demander pour ce Périmètre',
      workflowKicker: 'Processus Structuré en 10 Étapes',
      workflowTitle: 'De l’Opportunité à la Livraison & la Recette',
      workflowSubtitle: 'Découvrez comment ORANEX gère les risques, la validation des fabricants internationaux, les corridors de fret et le génie de chantier à chaque étape.'
    },
    formLabels: {
      contactPerson: 'Personne de Contact *',
      company: 'Entreprise / Organisation *',
      email: 'Adresse E-mail Professionnelle *',
      phone: 'Téléphone / WhatsApp *',
      country: 'Marché Africain / Pays de Destination',
      preferredLanguage: 'Langue de Communication Préférée',
      tenderLanguage: 'Langue du Dossier / de la Soumission',
      productOrScope: 'Produit ou Périmètre du Projet *',
      tenderTitle: 'Titre de l’Appel d’Offres ou du Projet *',
      procuringEntity: 'Autorité Contractante / Client (Optionnel)',
      lotNumber: 'Numéro de Lot ou Référence (Optionnel)',
      targetDate: 'Date Limite de Dépôt / Date Souhaitée',
      deliveryLocation: 'Lieu de Livraison / Port',
      specificationDetails: 'Spécifications Techniques / Paramètres',
      quantity: 'Quantité Demandée',
      unit: 'Unité de Mesure',
      notes: 'Notes Complémentaires ou Détails du BoQ',
      attachFiles: 'Joindre le Cahier des Charges, BoQ ou Spécifications (PDF, Excel)',
      submitTenderBtn: 'SOUMETTRE LE DOSSIER D’APPEL D’OFFRES',
      submitQuoteBtn: 'ENVOYER LA DEMANDE DE DEVIS',
      submitRequirementBtn: 'TRANSMETTRE LE BESOIN INDUSTRIEL',
      doneBtn: 'Terminé',
      confidentialityNotice: 'Tous les documents d’offres, spécifications et données tarifaires sont traités sous clause stricte de confidentialité.'
    }
  },

  // ==========================================
  // ARABIC (العربية - RTL)
  // ==========================================
  ar: {
    procurementEngine: {
      kicker: 'البنية الهيكلية الموحدة للمشتريات',
      title: 'محرك المشتريات والتوريد أورانكس',
      subtitle: 'ثلاثة مسارات دخول مميزة للعملاء تلتقي في منظومة تشغيلية موحدة للبحث والتوريد والشراء والاستيراد والتسليم وتنفيذ المشاريع.',
      sequenceKicker: 'المسار التشغيلي الموحد في 9 مراحل متكاملة',
      sequenceFormula: 'تقييم ← توريد ← إعداد ← تسعير ← شراء ← استيراد ← تسليم ← تنفيذ ← دعم فني',
      stages: [
        { code: '01', name: 'تقييم', desc: 'تدقيق فني ومراجعة المطابقة' },
        { code: '02', name: 'توريد', desc: 'تحديد المصانع والشركات الأصلية' },
        { code: '03', name: 'إعداد', desc: 'هيكلة ملف العطاء والعرض' },
        { code: '04', name: 'تسعير', desc: 'أسعار مصانع مباشرة وتنافسية' },
        { code: '05', name: 'شراء', desc: 'إدارة الاعتمادات المستندية وأوامر الشراء' },
        { code: '06', name: 'استيراد', desc: 'شحن بحري وجوي متعدد الوسائط' },
        { code: '07', name: 'تسليم', desc: 'تخليص الموانئ الجافة ونقل للموقع' },
        { code: '08', name: 'تنفيذ', desc: 'تركيب ميكانيكي وتشغيل تجريبي' },
        { code: '09', name: 'دعم فني', desc: 'تدريب، ضمان وقطع غيار مستمرة' }
      ],
      diagramKicker: 'خط العمليات التشغيلي المدمج',
      diagramTitle: 'ثلاث قنوات دخول · نظام تشغيلي واحد',
      diagramSubtitle: 'اختر أي عنصر لمعرفة دوره والبروتوكولات الفنية المرتبطة به.',
      selectPrompt: 'حدد مكوناً لاستعراض بروتوكولاته التشغيلية.',
      channels: {
        tenders: 'المناقصات الرسمية',
        rfqs: 'طلبات عروض الأسعار / الفواتير المبدئية',
        requirements: 'الطلبات والاحتياجات المباشرة'
      },
      engines: {
        tender: 'محرك المناقصات',
        rfq: 'محرك عروض الأسعار',
        requirement: 'مكتب تلبية الاحتياجات',
        sourcing: 'محرك التوريد والبحث',
        procurement: 'محرك الشراء والتعاقد',
        import: 'محرك الاستيراد والتخليص',
        logistics: 'اللوجستيات والشحن',
        execution: 'تنفيذ المشاريع',
        support: 'الدعم الفني وخدمات ما بعد البيع'
      },
      tabs: {
        architecture: 'نظرة هيكلية عامة',
        tender: 'محرك المناقصات',
        rfq: 'محرك عروض الأسعار',
        requirement: 'مكتب الاحتياجات',
        sourcing: 'محرك التوريد العالمي',
        import: 'الاستيراد والشحن',
        execution: 'تنفيذ المشاريع الميدانية'
      }
    },
    quickEntry: {
      executionPathwayLabel: 'مسار التنفيذ:',
      card1Pathway: 'تقييم ← إعداد ← توريد ← تقديم ← ترسية ← تجهيز ← شحن ← تنفيذ ميداني',
      card1Deliverables: [
        'تدقيق كراسة الشروط وجداول الكميات وتقرير Go / No-Go',
        'خطابات تفويض المصانع الأصلية المعتمدة (MAF / MAL)',
        '5 مستويات مرنة من التقييم الأولي وحتى التوريد والتركيب'
      ],
      card1Explore: 'استكشاف مستويات خدمة المناقصات الخمسة',
      card2Pathway: 'مراجعة ← توريد ← تسعير ← شراء ← تسليم',
      card2Deliverables: [
        'أسعار مباشرة من المصانع العالمية المعتمدة بدون وسطاء',
        'فواتير مبدئية معتمدة لفتح الاعتمادات المستندية البنكية',
        'شروط التجارة الدولية: FOB, CIF, CFR, CIP & DDP مودجو/أديس أبابا'
      ],
      card2Explore: 'الاستيراد الموحد للحاويات متعددة المنتجات',
      card3Pathway: 'تحديد الطلب ← توريد ← تسعير ← شراء ← تسليم',
      card3Deliverables: [
        'لا يُشترط معرفة كود المصنع أو الرمز الفني المسبق للبدء',
        'توريد متعدد المصادر: آسيا وأوروبا والشرق الأوسط والأمريكتين',
        'شحن وتخليص مباشر وتوصيل حتى مقر شركتك أو موقع العمل'
      ],
      card3Explore: 'نموذج تقديم الاحتياجات المباشرة',
      secondaryLinks: [
        {
          title: 'تصفح الكتالوج والتوريد',
          desc: 'أكثر من 50 مادة كيميائية وبوليمرات وحديد صناعي معتمد'
        },
        {
          title: 'مسار التوريد الصناعي',
          desc: 'المواد الخام والتعبئة والتغليف ومستلزمات المصانع الدورية'
        },
        {
          title: 'الآلات وخطوط الإنتاج',
          desc: 'خطوط مصانع متكاملة، أجهزة قياس واختبار وتشغيل ميداني'
        },
        {
          title: 'برنامج الاستيراد الموحد',
          desc: 'شحن حاويات مجمعة لتقليص تكاليف التخليص والموانئ'
        },
        {
          title: 'قطع الغيار والأجزاء الدقيقة',
          desc: 'قطع غيار ميكانيكية وكهربائية أصلية ومطابقة للمواصفات'
        },
        {
          title: 'تغطية المناقصات في إفريقيا',
          desc: 'هندسة ودعم العطاءات في أكثر من 20 دولة إفريقية'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: 'البحث والتوريد',
        label: 'توريد',
        desc: 'تحديد المصانع العالمية المعتمدة، وتدقيق الجودة، وتأمين الأسعار المباشرة.'
      },
      {
        num: '02',
        title: 'التجميع والتجميع',
        label: 'تجميع',
        desc: 'دمج متطلبات الموردين المتعددين في حاويات شحن موحدة في المراكز الخارجية.'
      },
      {
        num: '03',
        title: 'الاستيراد والترانزيت',
        label: 'استيراد',
        desc: 'شحن بحري وجوي متعدد الوسائط إلى جيبوتي، وتوثيق الترانزيت إلى ميناء مودجو الجاف.'
      },
      {
        num: '04',
        title: 'التسليم الميداني',
        label: 'تسليم',
        desc: 'التخليص الجمركي النهائي، والنقل البري الداخلي، والتفريغ الآمن في موقع مشروعك.'
      },
      {
        num: '05',
        title: 'التنفيذ والتركيب',
        label: 'تنفيذ',
        desc: 'تركيب الآلات تسليم مفتاح، والتوصيلات الكهربائية، واختبارات التشغيل الأولى.'
      },
      {
        num: '06',
        title: 'الدعم والضمان',
        label: 'دعم فني',
        desc: 'أطر توريد قطع الغيار المستمرة، ومتابعة الضمان، وتدريب المشغلين محلياً.'
      }
    ],
    tenderView: {
      kicker: 'دعم المناقصات والمشتريات عبر عموم القارة الإفريقية',
      headline: 'دعم المناقصات والمشتريات عبر الأسواق الإفريقية',
      subheadline: 'اختر مستوى الدعم الذي تحتاجه — من تقييم كراسة الشروط وإعداد العطاء إلى التوريد العالمي، والتوريد بعد الترسية وتنفيذ المشاريع بالكامل.',
      narrative: 'تدعم أورانكس المقاولين، والوزارات، والهيئات الحكومية، ومنظمات التنمية الدولية، والشركات الخاصة عبر آليات عطاءات دقيقة، وربط مباشر بالمصانع، وتنسيق التمويل التجاري والتسليم الميداني.',
      ctaSubmit: 'تقديم وثائق المناقصة',
      ctaReview: 'غير متأكد؟ دعنا نقيمها لك',
      disclosureTitle: 'المحددات التنظيمية والقانونية لخدمات المشتريات',
      disclosureText: 'تدعم أورانكس متطلبات التوريد والمشتريات في الأسواق الإفريقية، وفقاً لقواعد الشراء المطبقة، وتفويض العميل، والقوانين المحلية، وشروط التأهيل، والاتفاقيات التعاقدية المناسبة.',
      disclosureFooter: 'يقع المقر الرئيسي لأورانكس في أديس أبابا، إثيوبيا، وتنسق الشركة مع مصانع عالمية ومختبرات فحص وشركاء لوجستيين. تقدم الخدمات حصراً وفق المحددات القانونية المعمول بها في وجهة المشروع. لا تدعي أورانكس الأهلية التلقائية أو وجود مقار مسجلة في دول لم تؤسس فيها، ولا تضمن الفوز بالعطاءات.',
      selectorTitle: 'ما هو مستوى الدعم الذي تحتاجه؟',
      selectorSubtitle: 'حدد مستوى الدعم الذي يطابق متطلباتك ومرحلة العطاء. هذه نماذج دعم تشغيلي مصممة لاحتياجك الفعلي وليست باقات اشتراك شكلية.',
      selectorKicker: 'مسارات المشتريات القابلة للاختيار من العميل',
      fastTrackTitle: 'تقديم العطاء السريع',
      fastTrackKicker: 'إيداع الوثائق السريع لإفريقيا',
      fastTrackDesc: 'هل لديك كراسة شروط أو جدول كميات (BoQ) قائم؟ حمّل ملفاتك لمكتب مشترياتنا في أديس أبابا للحصول على مراجعة فنية شاملة واستكشاف أسعار المصانع.',
      fastTrackNdaTitle: 'ضمان السرية المطلقة:',
      fastTrackNdaDesc: 'جميع المستندات المقدمة محمية باتفاقيات عدم إفشاء ومعايير سرية مهنية مشددة.',
      comparisonKicker: 'مصفوفة نطاق العمل التفصيلية',
      comparisonTitle: 'مقارنة مستويات خدمات المناقصات',
      comparisonSubtitle: 'مقارنة شاملة جنباً إلى جنب للأنشطة والمسؤوليات والمخرجات عبر جميع المسارات الخمسة.',
      legendTitle: 'دليل الرموز:',
      legendSupported: 'مشمول',
      legendPostAward: 'بعد الترسية',
      legendReviewed: 'مراجعة وتدقيق',
      legendCustomer: 'بمعرفة العميل',
      legendNotIncluded: 'غير مشمول',
      colActivity: 'نشاط المشتريات / المخرجات',
      colLevel0: 'تقييم',
      colLevel1: 'إعداد العطاء',
      colLevel2: 'توريد + إعداد',
      colLevel3: 'توريد كامل',
      colLevel4: 'تنفيذ تسليم مفتاح',
      rows: [
        'مراجعة كراسة الشروط',
        'استخراج متطلبات جداول الكميات',
        'قائمة التحقق من الامتثال والأهلية',
        'إعداد وثائق العطاء والعرض',
        'البحث والتوريد الدولي',
        'البحث عن المصانع الأصلية (OEM)',
        'الوثائق الفنية وشهادات الجودة',
        'عروض أسعار الموردين ودمج التكاليف',
        'التنسيق التجاري وشروط التجارة',
        'مراجعة الجاهزية النهائية للتقديم',
        'الشراء والتعاقد مع المصانع (بعد الترسية)',
        'تنسيق الاستيراد والتخليص (بعد الترسية)',
        'التسليم في الميناء أو الموقع (بعد الترسية)',
        'التركيب الميكانيكي في الموقع',
        'التشغيل التجريبي والاختبارات الفنية',
        'التدريب الفني للكوادر والمشغلين',
        'محضر التسليم والقبول الرسمي',
        'الضمان وقطع الغيار وخدمات ما بعد البيع'
      ],
      footnoteTitle: '* تنويه تعاقدي بشأن مرحلة ما بعد الترسية والحدود التشغيلية',
      footnoteText: '* ملاحظة هامة: خدمات الشراء والتصنيع والشحن والتخليص والتسليم والتركيب والتدريب بعد الترسية تُقدم فقط في حال فوز العميل بالعطاء وتخضع لاتفاقيات تعاقدية مستقلة ومبرمة حسب الأصول. لا تدعي أورانكس حقوق التوريد التلقائي بمجرد التقديم ولا تضمن الفوز بالعطاءات.',
      categoriesKicker: 'نطاقات المشتريات المدعومة',
      categoriesTitle: 'تصنيفات المناقصات والمشتريات المدعومة',
      categoriesSubtitle: 'سواء كنت جهة تنموية تنفذ مشروعاً ممولاً، أو مؤسسة حكومية تطرح مناقصات مرافق عامة، أو مقاولاً خاصاً يشارك في عطاء تجاري، فإن شبكتنا توفر التوافق الفني المباشر مع المصانع.',
      categoriesCta: 'طلب استفسار لهذا النطاق',
      workflowKicker: 'مسار عمل منظم في 10 مراحل',
      workflowTitle: 'من فرصة المناقصة وحتى التسليم والتشغيل',
      workflowSubtitle: 'استكشف كيف تدير أورانكس المخاطر، واعتماد المصانع العالمية، ومسارات الشحن العابرة للحدود، ومحطات الهندسة الموقعية في كل مرحلة.'
    },
    formLabels: {
      contactPerson: 'اسم المسؤول / الشخص المعني *',
      company: 'اسم الشركة / المؤسسة *',
      email: 'البريد الإلكتروني الرسمي *',
      phone: 'رقم الهاتف / واتساب *',
      country: 'السوق الإفريقي المستهدف / الدولة',
      preferredLanguage: 'لغة التواصل المفضلة',
      tenderLanguage: 'لغة وثائق المناقصة / العرض',
      productOrScope: 'المنتج أو نطاق المشروع المطلوب *',
      tenderTitle: 'عنوان المناقصة أو اسم المشروع *',
      procuringEntity: 'الجهة الطارحة / العميل (اختياري)',
      lotNumber: 'رقم المناقصة أو رقم القطعة (اختياري)',
      targetDate: 'الموعد النهائي للتقديم / التاريخ المطلوب',
      deliveryLocation: 'مكان التسليم / الميناء المستهدف',
      specificationDetails: 'المواصفات الفنية والمعايير المطلوبة',
      quantity: 'الكمية المطلوبة',
      unit: 'وحدة القياس',
      notes: 'ملاحظات إضافية أو تفاصيل جدول الكميات',
      attachFiles: 'إرفاق كراسة الشروط أو جدول الكميات (PDF, Excel, Word)',
      submitTenderBtn: 'إرسال ملف المناقصة للدراسة',
      submitQuoteBtn: 'إرسال طلب عرض الأسعار',
      submitRequirementBtn: 'إرسال الاحتياج المباشر',
      doneBtn: 'تم بنجاح',
      confidentialityNotice: 'جميع وثائق المناقصات والمواصفات الفنية وبيانات الأسعار تخضع لمعايير سرية مشددة واتفاقيات عدم إفشاء.'
    }
  },

  // ==========================================
  // PORTUGUESE (PORTUGUÊS)
  // ==========================================
  pt: {
    procurementEngine: {
      kicker: 'Arquitetura Empresarial Unificada',
      title: 'MOTOR DE AQUISIÇÕES ORANEX',
      subtitle: 'Três canais de entrada de clientes conectados num ecossistema unificado de sourcing, compras, importação, entrega e execução de projetos.',
      sequenceKicker: 'A Sequência Operacional Unificada de 9 Etapas',
      sequenceFormula: 'AVALIAR → SOURCING → PREPARAR → COTAR → COMPRAR → IMPORTAR → ENTREGAR → EXECUTAR → SUPORTE',
      stages: [
        { code: '01', name: 'AVALIAR', desc: 'Auditoria técnica e de conformidade' },
        { code: '02', name: 'SOURCING', desc: 'Identificação de fábricas OEM' },
        { code: '03', name: 'PREPARAR', desc: 'Estruturação da proposta e dossiê' },
        { code: '04', name: 'COTAR', desc: 'Preço de fábrica direto e competitivo' },
        { code: '05', name: 'COMPRAR', desc: 'Execução de LC e ordens de compra' },
        { code: '06', name: 'IMPORTAR', desc: 'Frete marítimo e trânsito multimodal' },
        { code: '07', name: 'ENTREGAR', desc: 'Porto seco e transporte para a obra' },
        { code: '08', name: 'EXECUTAR', desc: 'Montagem mecânica e comissionamento' },
        { code: '09', name: 'SUPORTE', desc: 'Formação, garantia e sobresselentes' }
      ],
      diagramKicker: 'Fluxo Operacional Integrado',
      diagramTitle: 'Três Canais de Entrada · Um Ecossistema Operacional Único',
      diagramSubtitle: 'Selecione qualquer componente para verificar a sua função e protocolos técnicos.',
      selectPrompt: 'Selecione um componente para inspecionar os seus protocolos.',
      channels: {
        tenders: 'CONCURSOS PÚBLICOS',
        rfqs: 'COTAÇÕES / PRÓ-FORMAS',
        requirements: 'REQUISITOS DIRETOS'
      },
      engines: {
        tender: 'MOTOR DE CONCURSOS',
        rfq: 'MOTOR DE COTAÇÕES',
        requirement: 'BALCÃO DE REQUISITOS',
        sourcing: 'MOTOR DE SOURCING',
        procurement: 'MOTOR DE COMPRAS',
        import: 'MOTOR DE IMPORTAÇÃO',
        logistics: 'LOGÍSTICA & TRANSPORTE',
        execution: 'EXECUÇÃO DE PROJETOS',
        support: 'SUPORTE & PÓS-VENDA'
      },
      tabs: {
        architecture: 'Visão Geral Conceitual',
        tender: 'Motor de Concursos',
        rfq: 'Motor de Cotações',
        requirement: 'Balcão de Requisitos',
        sourcing: 'Motor de Sourcing',
        import: 'Importação & Logística',
        execution: 'Execução de Projetos'
      }
    },
    quickEntry: {
      executionPathwayLabel: 'Fluxo de Execução:',
      card1Pathway: 'Avaliação → Preparação → Sourcing → Submissão → Adjudicação → Fornecimento → Entrega → Execução',
      card1Deliverables: [
        'Auditoria ao mapa de quantidades (BoQ) & parecer Go / No-Go',
        'Cartas de autorização direta do fabricante (MAF / MAL)',
        '5 níveis flexíveis desde a análise até ao fornecimento chave na mão'
      ],
      card1Explore: 'Explorar os 5 Níveis de Serviço de Concursos',
      card2Pathway: 'Análise → Sourcing → Cotação → Compra → Entrega',
      card2Deliverables: [
        'Preços diretos de fábrica junto de fabricantes mundiais',
        'Faturas pró-forma válidas para cartas de crédito bancárias (LC)',
        'Incoterms: FOB, CIF, CFR, CIP & DDP Modjo/Adis Abeba'
      ],
      card2Explore: 'Importações Consolidadas Multi-Produtos',
      card3Pathway: 'Requisito → Sourcing → Cotação → Compra → Entrega',
      card3Deliverables: [
        'Não requer códigos de peça ou referências OEM para iniciar',
        'Sourcing multi-origem: Ásia, Europa, Médio Oriente e Américas',
        'Frete direto, consolidação e entrega até às suas instalações'
      ],
      card3Explore: 'Formulário de Necessidade Direta de Produto',
      secondaryLinks: [
        {
          title: 'Consultar Catálogo & Sourcing',
          desc: 'Mais de 50 produtos químicos, polímeros e aço certificados'
        },
        {
          title: 'Fornecimento Industrial',
          desc: 'Matérias-primas, embalagens e consumíveis regulares'
        },
        {
          title: 'Máquinas & Equipamentos',
          desc: 'Linhas fabris chave na mão, aparelhos de teste e ensaios'
        },
        {
          title: 'Programa de Importação Consolidada',
          desc: 'Cargas agrupadas em contentores para redução de custos'
        },
        {
          title: 'Peças Sobresselentes de Precisão',
          desc: 'Peças originais e compatíveis mecânicas e elétricas'
        },
        {
          title: 'Cobertura de Concursos em África',
          desc: 'Engenharia de concursos em mais de 20 mercados africanos'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: 'Sourcing',
        label: 'SOURCING',
        desc: 'Identificar fabricantes globais qualificados, auditar conformidade e negociar preços diretos.'
      },
      {
        num: '02',
        title: 'Consolidar',
        label: 'CONSOLIDAR',
        desc: 'Agrupar encomendas de múltiplos fornecedores em contentores marítimos otimizados.'
      },
      {
        num: '03',
        title: 'Importar',
        label: 'IMPORTAR',
        desc: 'Frete multimodal para o Djibuti, trânsito alfandegário e transporte para Modjo.'
      },
      {
        num: '04',
        title: 'Entregar',
        label: 'ENTREGAR',
        desc: 'Desembaraço aduaneiro final, transporte interior seguro e descarregamento na obra.'
      },
      {
        num: '05',
        title: 'Executar',
        label: 'EXECUTAR',
        desc: 'Montagem mecânica de maquinaria chave na mão, cablagem e testes operacionais.'
      },
      {
        num: '06',
        title: 'Apoiar',
        label: 'SUPORTE',
        desc: 'Fornecimento contínuo de peças de desgaste, apoio de garantia e formação de equipas.'
      }
    ],
    tenderView: {
      kicker: 'Apoio a Concursos Públicos e Privados em Toda a África',
      headline: 'APOIO A CONCURSOS E AQUISIÇÕES EM ÁFRICA',
      subheadline: 'Escolha o nível de apoio de que necessita — desde a avaliação do caderno de encargos e preparação da proposta até ao sourcing internacional, fornecimento pós-adjudicação e execução completa do projeto.',
      narrative: 'A ORANEX apoia empreiteiros, ministérios, serviços públicos, agências internacionais de desenvolvimento e empresas privadas com fluxos rigorosos de concursos, cotações diretas OEM, financiamento comercial e entrega final em obra.',
      ctaSubmit: 'SUBMETER A SUA LICITAÇÃO',
      ctaReview: 'NÃO TEM CERTEZA? DEIXE-NOS AVALIAR',
      disclosureTitle: 'Enquadramento Regulamentar & Parâmetros de Aquisições',
      disclosureText: 'A ORANEX apoia oportunidades de compras e necessidades de sourcing nos mercados africanos, sujeito às normas de contratação pública aplicáveis, autorização do cliente, regulamentação local, requisitos de elegibilidade e acordos contratuais.',
      disclosureFooter: 'Com sede em Adis Abeba, Etiópia, a ORANEX colabora com fabricantes OEM verificados e laboratórios de ensaio acreditados. A atuação rege-se estritamente pela legislação do país de destino. A ORANEX não reivindica elegibilidade automática nem escritórios locais onde não tenham sido estabelecidos, e não garante a vitória em concursos.',
      selectorTitle: 'DE QUANTO SUPORTE NECESSITA?',
      selectorSubtitle: 'Escolha o nível de apoio adequado às suas necessidades. Trata-se de modelos operacionais adaptados à maturidade da sua proposta—não de pacotes genéricos.',
      selectorKicker: 'Vias de Aquisição Selecionáveis pelo Cliente',
      fastTrackTitle: 'SUBMETER LICITAÇÃO',
      fastTrackKicker: 'Submissão Rápida para África',
      fastTrackDesc: 'Tem um caderno de encargos, concurso ou mapa de quantidades? Carregue os seus ficheiros para o nosso gabinete de compras em Adis Abeba para revisão técnica e cotação de fabricantes.',
      fastTrackNdaTitle: 'Garantia de Confidencialidade:',
      fastTrackNdaDesc: 'Todos os documentos estão protegidos por rigorosos termos corporativos de não-divulgação (NDA).',
      comparisonKicker: 'Matriz de Âmbito Detalhada',
      comparisonTitle: 'COMPARAÇÃO DE SERVIÇOS DE CONCURSO',
      comparisonSubtitle: 'Comparação detalhada de atividades, responsabilidades e entregas nos 5 caminhos disponíveis.',
      legendTitle: 'Legenda:',
      legendSupported: 'Incluído',
      legendPostAward: 'Pós-Adjudicação',
      legendReviewed: 'Revisto',
      legendCustomer: 'A cargo do Cliente',
      legendNotIncluded: 'Não Incluído',
      colActivity: 'Atividade de Compras / Entrega',
      colLevel0: 'Avaliação',
      colLevel1: 'Preparação',
      colLevel2: 'Sourcing + Prep.',
      colLevel3: 'Fornecimento Total',
      colLevel4: 'Chave na Mão',
      rows: [
        'Análise do Caderno de Encargos',
        'Extração de Requisitos do BoQ',
        'Lista de Verificação de Conformidade',
        'Preparação da Proposta / Dossiê',
        'Sourcing Internacional',
        'Pesquisa de Fabricantes / OEM',
        'Documentação Técnica & Certificados',
        'Cotações de Fornecedores',
        'Coordenação Comercial & Incoterms',
        'Revisão Final para Submissão',
        'Compras & Encomenda de Fábrica (Pós-Adjudicação)',
        'Importação & Desembaraço (Pós-Adjudicação)',
        'Entrega no Porto / Obra (Pós-Adjudicação)',
        'Instalação & Montagem na Obra',
        'Testes & Comissionamento Técnico',
        'Formação Técnica de Operadores',
        'Protocolo Formal de Entrega e Aceitação',
        'Garantia & Sobresselentes Pós-Venda'
      ],
      footnoteTitle: '* Aviso Contratual Pós-Adjudicação & Limites de Atuação',
      footnoteText: '* Nota Importante: As fases de compras fabris, transporte, entrega, montagem e garantia só são prestadas após a efetiva adjudicação do contrato ao cliente e mediante celebração de acordo contratual específico. A ORANEX não reivindica direitos automáticos de fornecimento e não garante a vitória em licitações.',
      categoriesKicker: 'Âmbitos de Aquisição Suportados',
      categoriesTitle: 'Categorias de Concursos & Compras Apoiadas',
      categoriesSubtitle: 'Quer seja uma agência multilateral de desenvolvimento, uma entidade pública governamental ou um empreiteiro privado, a nossa estrutura garante ligação técnica direta a fabricantes globais.',
      categoriesCta: 'Consultar este Âmbito',
      workflowKicker: 'Fluxo Estruturado em 10 Etapas',
      workflowTitle: 'Da Oportunidade à Entrega e Receção Final',
      workflowSubtitle: 'Conheça como a ORANEX gere o risco, a homologação de fabricantes, os corredores aduaneiros e a engenharia de montagem em cada fase.'
    },
    formLabels: {
      contactPerson: 'Pessoa de Contacto *',
      company: 'Empresa / Organização *',
      email: 'E-mail Profissional *',
      phone: 'Telefone / WhatsApp *',
      country: 'Mercado Africano / País de Destino',
      preferredLanguage: 'Idioma Preferido para Contacto',
      tenderLanguage: 'Idioma da Proposta / Concurso',
      productOrScope: 'Produto ou Âmbito do Projeto *',
      tenderTitle: 'Título do Concurso ou Nome do Projeto *',
      procuringEntity: 'Entidade Adjudicante / Cliente (Opcional)',
      lotNumber: 'Número do Lote ou Concurso (Opcional)',
      targetDate: 'Data Limite de Submissão / Prazo Desejado',
      deliveryLocation: 'Local de Entrega / Porto',
      specificationDetails: 'Detalhes das Especificações Técnicas',
      quantity: 'Quantidade Necessária',
      unit: 'Unidade de Medida',
      notes: 'Notas Adicionais ou Detalhes do BoQ',
      attachFiles: 'Anexar Caderno de Encargos, BoQ ou Especificações (PDF, Excel)',
      submitTenderBtn: 'SUBMETER DOSSIÊ DE CONCURSO',
      submitQuoteBtn: 'ENVIAR PEDIDO DE COTAÇÃO',
      submitRequirementBtn: 'SUBMETER NECESSIDADE DIRETA',
      doneBtn: 'Concluído',
      confidentialityNotice: 'Todos os documentos, especificações e propostas estão protegidos por estritos acordos de confidencialidade.'
    }
  },

  // ==========================================
  // SWAHILI (KISWAHILI)
  // ==========================================
  sw: {
    procurementEngine: {
      kicker: 'Muundo Uliounganishwa wa Biashara',
      title: 'MTAMBO WA UNUNUZI WA ORANEX',
      subtitle: 'Njia tatu mahususi za kuingilia zinazoungana katika mfumo mmoja wa utafutaji, ununuzi, uingizaji, uwasilishaji na utekelezaji wa miradi.',
      sequenceKicker: 'Mfuatano wa Hatua 9 za Utendaji Zilizounganishwa',
      sequenceFormula: 'TATHMINI → TAFUTA → ANDAA → BEI → NUNUA → INGIZA → WASILISHA → TEKELEZA → MSAADA',
      stages: [
        { code: '01', name: 'TATHMINI', desc: 'Ukaguzi wa kiufundi na kanuni' },
        { code: '02', name: 'TAFUTA', desc: 'Kutambua viwanda vya OEM' },
        { code: '03', name: 'ANDAA', desc: 'Kuandaa hati na dau la zabuni' },
        { code: '04', name: 'BEI', desc: 'Bei ya moja kwa moja ya kiwandani' },
        { code: '05', name: 'NUNUA', desc: 'Utekelezaji wa mikopo ya LC' },
        { code: '06', name: 'INGIZA', desc: 'Usafirishaji wa meli na nchi kavu' },
        { code: '07', name: 'WASILISHA', desc: 'Bandari kavu na kusafirisha site' },
        { code: '08', name: 'TEKELEZA', desc: 'Ufungaji na kuwasha mitambo' },
        { code: '09', name: 'MSAADA', desc: 'Mafunzo, udhamini na vipuri' }
      ],
      diagramKicker: 'Mtiririko Kamili wa Uendeshaji',
      diagramTitle: 'Njia Tatu za Kuingilia · Mfumo Mmoja wa Utendaji',
      diagramSubtitle: 'Chagua kipengele chochote ili kukagua wajibu na miongozo yake ya kiufundi.',
      selectPrompt: 'Chagua kipengele ili kutazama taratibu zake za kiufundi.',
      channels: {
        tenders: 'ZABUNI RASMI',
        rfqs: 'MAOMBI YA BEI (RFQ)',
        requirements: 'MAHITAJI YA MOJA KWA MOJA'
      },
      engines: {
        tender: 'MTAMBO WA ZABUNI',
        rfq: 'MTAMBO WA BEI / RFQ',
        requirement: 'DAWATI LA MAHITAJI',
        sourcing: 'MTAMBO WA KUTAFUTA VIWANDA',
        procurement: 'MTAMBO WA UNUNUZI',
        import: 'MTAMBO WA UINGIZAJI',
        logistics: 'USAFIRISHAJI NA HIFADHI',
        execution: 'UTEKELEZAJI WA MIRADI',
        support: 'HUDUMA NA VIPURI'
      },
      tabs: {
        architecture: 'Muhtasari wa Mfumo',
        tender: 'Mtambo wa Zabuni',
        rfq: 'Mtambo wa Bei (RFQ)',
        requirement: 'Dawati la Mahitaji',
        sourcing: 'Mtambo wa Sourcing',
        import: 'Uingizaji & Usafirishaji',
        execution: 'Utekelezaji wa Miradi'
      }
    },
    quickEntry: {
      executionPathwayLabel: 'Mtiririko wa Utekelezaji:',
      card1Pathway: 'Tathmini → Maandalizi → Utafutaji → Uwasilishaji → Ushindi → Ugavi → Usafirishaji → Utekelezaji',
      card1Deliverables: [
        'Ukaguzi wa kina wa orodha ya vifaa (BoQ) na ripoti ya Go / No-Go',
        'Barua rasmi za idhini ya kiwanda cha OEM (MAF / MAL)',
        'Viwango 5 vya huduma kuanzia ukaguzi hadi utekelezaji kamili'
      ],
      card1Explore: 'Gundua Viwango 5 vya Huduma za Zabuni',
      card2Pathway: 'Ukaguzi → Utafutaji → Nukuu ya Bei → Ununuzi → Uwasilishaji',
      card2Deliverables: [
        'Bei ya moja kwa moja ya kiwandani kutoka kwa wazalishaji duniani',
        'Ankara za proforma zinazokubalika na benki za ndani na kikanda',
        'Masharti ya Incoterms: FOB, CIF, CFR, CIP & DDP Modjo/Addis'
      ],
      card2Explore: 'Uingizaji Mizigo Uliounganishwa (Multi-Product)',
      card3Pathway: 'Hitaji → Utafutaji → Nukuu ya Bei → Ununuzi → Uwasilishaji',
      card3Deliverables: [
        'Hakuna haja ya kujua nambari ya kiufundi au nambari ya sehemu',
        'Utafutaji kutoka mabara mbalimbali: Asia, Ulaya, Mashariki ya Kati',
        'Usafirishaji wa moja kwa moja hadi eneo lako la kazi'
      ],
      card3Explore: 'Fomu ya Mahitaji ya Moja kwa Moja',
      secondaryLinks: [
        {
          title: 'Kagua Bidhaa & Tafuta',
          desc: 'Zaidi ya kemikali 50, polima na chuma kilichothibitishwa'
        },
        {
          title: 'Ugavi wa Viwandani',
          desc: 'Malighafi, vifaa vya kufungashia na mahitaji ya kawaida'
        },
        {
          title: 'Mitambo na Vifaa vya Ujenzi',
          desc: 'Mitambo kamili ya viwanda, vifaa vya majaribio na ufungaji'
        },
        {
          title: 'Mpango wa Uingizaji Uliounganishwa',
          desc: 'Kuunganisha makontena ili kupunguza gharama za bandari'
        },
        {
          title: 'Vipuri na Vifaa vya Mashine',
          desc: 'Vipuri asilia na mbadala vya mitambo na mifumo ya umeme'
        },
        {
          title: 'Ushiriki wa Zabuni Afrika',
          desc: 'Uhandisi wa zabuni katika masoko zaidi ya 20 ya Afrika'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: 'Tafuta',
        label: 'TAFUTA',
        desc: 'Kutambua wazalishaji wa kimataifa, kukagua uzingatiaji na kupata bei bora.'
      },
      {
        num: '02',
        title: 'Unganisha',
        label: 'UNGANISHA',
        desc: 'Kukusanya mahitaji kutoka viwanda mbalimbali kwenye makontena ya pamoja.'
      },
      {
        num: '03',
        title: 'Ingiza',
        label: 'INGIZA',
        desc: 'Usafirishaji wa meli/ndege hadi Djibouti na tranzit ya forodha kwenda Modjo.'
      },
      {
        num: '04',
        title: 'Fikisha',
        label: 'FIKISHA',
        desc: 'Uondoshaji wa mwisho forodhani, usafiri wa barabarani na kushusha site.'
      },
      {
        num: '05',
        title: 'Tekeleza',
        label: 'TEKELEZA',
        desc: 'Ufungaji wa mitambo, majaribio ya kwanza ya uzalishaji na kuwasha mtambo.'
      },
      {
        num: '06',
        title: 'Msaada',
        label: 'MSAADA',
        desc: 'Ugavi wa vipuri unaoendelea, uangalizi wa udhamini na mafunzo nchini.'
      }
    ],
    tenderView: {
      kicker: 'Usaidizi wa Zabuni na Ununuzi Afrika Nzima',
      headline: 'USAIDIZI WA ZABUNI NA UNUNUZI AFRIKA NZIMA',
      subheadline: 'Chagua kiwango cha usaidizi unachohitaji — kuanzia tathmini ya hati na maandalizi ya zabuni hadi utafutaji wa kimataifa, ugavi baada ya kushinda na utekelezaji kamili wa mradi.',
      narrative: 'ORANEX inasaidia wakandarasi, wizara za serikali, mashirika ya umma, taasisi za kimataifa na sekta binafsi kwa taratibu madhubuti za zabuni, ushirikiano wa kiwanda, ufadhili wa biashara na uwasilishaji.',
      ctaSubmit: 'WASILISHA ZABUNI YAKO',
      ctaReview: 'HUNA UHAKIKA? TUACHIE TUKAGUE',
      disclosureTitle: 'Vigezo vya Udhibiti na Kanuni za Ununuzi',
      disclosureText: 'ORANEX inaweza kusaidia mahitaji ya ununuzi na utafutaji wa bidhaa katika masoko ya Afrika kulingana na sheria husika za ununuzi, idhini ya mteja, kanuni za nchi husika na makubaliano ya mikataba.',
      disclosureFooter: 'Makao makuu yakiwa Addis Ababa, Ethiopia, ORANEX hushirikiana na watengenezaji wa OEM na maabara zilizoidhinishwa. Huduma zote hufuata sheria za eneo husika. ORANEX haidai usajili wa kiotomatiki katika nchi ambazo haina ofisi, na haitoi uhakika wa kushinda zabuni.',
      selectorTitle: 'UNAHITAJI MSAADA KIASI GANI?',
      selectorSubtitle: 'Chagua kiwango cha usaidizi kinacholingana na mahitaji yako. Huu ni mfumo wa huduma kulingana na hatua ya zabuni yako—si vifurushi vya jumla.',
      selectorKicker: 'Njia za Ununuzi Zinazochaguliwa na Mteja',
      fastTrackTitle: 'WASILISHA ZABUNI YAKO',
      fastTrackKicker: 'Uwasilishaji wa Haraka Afrika',
      fastTrackDesc: 'Je, una hati ya zabuni au orodha ya vifaa (BoQ)? Pakia faili zako kwa kitengo chetu cha ununuzi jijini Addis Ababa kwa ukaguzi wa kina wa kiufundi na bei za viwanda.',
      fastTrackNdaTitle: 'Uhakika wa Usiri:',
      fastTrackNdaDesc: 'Hati zote zinalindwa chini ya makubaliano rasmi ya kutofichua siri za kibiashara (NDA).',
      comparisonKicker: 'Jedwali la Kina la Upeo wa Huduma',
      comparisonTitle: 'ULINGANISHO WA HUDUMA ZA ZABUNI',
      comparisonSubtitle: 'Ulinganisho wa kina wa majukumu, hatua na matokeo katika njia zote 5 za huduma.',
      legendTitle: 'Maelezo ya Alama:',
      legendSupported: 'Inajumuishwa',
      legendPostAward: 'Baada ya Ushindi',
      legendReviewed: 'Inakaguliwa',
      legendCustomer: 'Inafanywa na Mteja',
      legendNotIncluded: 'Haijumuishwi',
      colActivity: 'Kazi ya Ununuzi / Matokeo',
      colLevel0: 'Tathmini',
      colLevel1: 'Maandalizi',
      colLevel2: 'Utafutaji + Maandalizi',
      colLevel3: 'Ugavi Kamili',
      colLevel4: 'Turnkey Kamili',
      rows: [
        'Ukaguzi wa Hati za Zabuni',
        'Uchambuzi wa Mahitaji ya BoQ',
        'Orodha ya Kuzingatia Kanuni',
        'Uandaaji wa Hati za Zabuni',
        'Utafutaji wa Kimataifa',
        'Kutafuta Watengenezaji / OEM',
        'Nyaraka za Kiufundi na Vyeti',
        'Ukusanyaji wa Nukuu za Bei',
        'Uratibu wa Masharti ya Biashara',
        'Ukaguzi wa Mwisho wa Kuwasilisha',
        'Ununuzi na Maagizo ya Kiwanda (Baada ya Ushindi)',
        'Uingizaji & Forodha (Baada ya Ushindi)',
        'Uwasilishaji Bandarini au Mradini',
        'Ufungaji na Ujenzi wa Mitambo',
        'Majaribio ya Kuwasha Mitambo',
        'Mafunzo ya Kiufundi kwa Wafanyakazi',
        'Mkataba Rasmi wa Makabidhiano',
        'Udhamini & Vipuri vya Baadaye'
      ],
      footnoteTitle: '* Notisi ya Kimkataba Baada ya Ushindi na Mipaka ya Utendaji',
      footnoteText: '* Kumbuka Muhimu: Hatua za ununuzi viwandani, usafirishaji, ufungaji na mafunzo hufanyika tu pale ambapo mteja ameshinda zabuni na kwa makubaliano maalum ya kimkataba. ORANEX haidai haki ya moja kwa moja ya ugavi na haitoi uhakika wa kushinda zabuni.',
      categoriesKicker: 'Nyanja za Ununuzi Tunazosaidia',
      categoriesTitle: 'Aina za Zabuni na Ununuzi Zinazoungwa Mkono',
      categoriesSubtitle: 'Iwe wewe ni shirika la kimataifa la maendeleo, taasisi ya umma ya serikali, au mkandarasi binafsi anayeshiriki zabuni, miundombinu yetu inakuhakikishia mawasiliano ya moja kwa moja na viwanda.',
      categoriesCta: 'Ulizia Kuhusu Nyanja Hii',
      workflowKicker: 'Mfumo wa Hatua 10 Zilizopangwa',
      workflowTitle: 'Kuanzia Fursa Hadi Uwasilishaji na Makabidhiano',
      workflowSubtitle: 'Gundua jinsi ORANEX inavyosimamia hatari, uthibitisho wa viwanda duniani, usafirishaji wa forodha na uhandisi wa ujenzi katika kila hatua.'
    },
    formLabels: {
      contactPerson: 'Jina la Mwasiliani *',
      company: 'Kampuni / Shirika *',
      email: 'Barua Pepe Rasmi *',
      phone: 'Nambari ya Simu / WhatsApp *',
      country: 'Soko la Afrika / Nchi Inayolengwa',
      preferredLanguage: 'Lugha Unayopendelea Kuwasiliana Nasi',
      tenderLanguage: 'Lugha ya Hati za Zabuni',
      productOrScope: 'Bidhaa au Upeo wa Mradi *',
      tenderTitle: 'Jina la Zabuni au Mradi *',
      procuringEntity: 'Mteja / Taasisi Inayotangaza (Hiari)',
      lotNumber: 'Nambari ya Zabuni au Sehemu (Hiari)',
      targetDate: 'Tarehe ya Mwisho ya Kuwasilisha / Tarehe Inayotakiwa',
      deliveryLocation: 'Eneo la Uwasilishaji / Bandari',
      specificationDetails: 'Vipimo vya Kiufundi na Maelezo',
      quantity: 'Kiasi Kinachohitajika',
      unit: 'Kipimo (Tani, Vipande, n.k.)',
      notes: 'Maelezo ya Ziada au Taarifa za BoQ',
      attachFiles: 'Ambatisha Hati za Zabuni au BoQ (PDF, Excel, Word)',
      submitTenderBtn: 'WASILISHA HATI ZA ZABUNI',
      submitQuoteBtn: 'TUMA OMBI LA NUKUU YA BEI',
      submitRequirementBtn: 'WASILISHA HITAJI LA BIDHAA',
      doneBtn: 'Imekamilika',
      confidentialityNotice: 'Nyaraka zote za zabuni, vipimo na taarifa za bei zinalindwa kwa usiri mkubwa wa kibiashara.'
    }
  },

  // ==========================================
  // AMHARIC (አማርኛ)
  // ==========================================
  am: {
    procurementEngine: {
      kicker: 'የተቀናጀ የኢንተርፕራይዝ አሰራር',
      title: 'የኦራኔክስ የግዥ እና አቅርቦት ሞተር',
      subtitle: 'ሦስት የተለያዩ የደንበኞች መግቢያ መንገዶች ወደ አንድ የተዋሃደ ምንጭ ፍለጋ፣ ግዥ፣ ማስመጣት፣ ማድረስ እና የፕሮጀክት ማስኬጃ ስነ-ምህዳር ይገናኛሉ።',
      sequenceKicker: 'የተዋሃደው ባለ 9-ደረጃ የሥራ ሂደት ቅደም ተከተል',
      sequenceFormula: 'መገምገም → አምራች መፈለግ → ማዘጋጀት → ዋጋ ማውጣት → መግዛት → ማስመጣት → ማድረስ → ፕሮጀክት መትከል → ድጋፍ',
      stages: [
        { code: '01', name: 'መገምገም', desc: 'የቴክኒክ እና የተስማሚነት ኦዲት' },
        { code: '02', name: 'መፈለግ', desc: 'ትክክለኛ አምራች ፋብሪካዎችን መለየት' },
        { code: '03', name: 'ማዘጋጀት', desc: 'የጨረታ እና የውድድር ሰነዶችን ማዋቀር' },
        { code: '04', name: 'ዋጋ ማውጣት', desc: 'ቀጥተኛ የፋብሪካ ዋጋ ማቅረብ' },
        { code: '05', name: 'መግዛት', desc: 'የኤልሲ (LC) እና የግዥ ውል አፈጻጸም' },
        { code: '06', name: 'ማስመጣት', desc: 'የባህር እና አየር ዓለም አቀፍ ትራንዚት' },
        { code: '07', name: 'ማድረስ', desc: 'የደረቅ ወደብ ጉምሩክ እና የሀገር ውስጥ ትራንስፖርት' },
        { code: '08', name: 'መትከል', desc: 'የማሽነሪ ተከላ እና ስራ ማስጀመር' },
        { code: '09', name: 'ድጋፍ', desc: 'ስልጠና፣ ዋስትና እና መለዋወጫ አቅርቦት' }
      ],
      diagramKicker: 'የተቀናጀ የሥራ ሂደት መስመር',
      diagramTitle: 'ሦስት መግቢያ በሮች · አንድ የተዋሃደ የሥራ ስነ-ምህዳር',
      diagramSubtitle: 'ሚናውን እና የቴክኒክ መመሪያውን ለመመልከት ማንኛውንም ክፍል ይምረጡ።',
      selectPrompt: 'ቴክኒካል ዝርዝሩን ለመመልከት አንዱን ሞተር ይምረጡ።',
      channels: {
        tenders: 'መደበኛ ጨረታዎች',
        rfqs: 'የዋጋ ማወዳደሪያ / ፕሮፎርማ (RFQ)',
        requirements: 'ቀጥታ ፍላጎቶች'
      },
      engines: {
        tender: 'የጨረታ ሞተር',
        rfq: 'የዋጋ ማወዳደሪያ (RFQ) ሞተር',
        requirement: 'የቀጥታ ፍላጎት ዴስክ',
        sourcing: 'የምንጭ ፍለጋ ሞተር',
        procurement: 'የግዥ እና ውል ሞተር',
        import: 'የማስመጣት እና ትራንዚት ሞተር',
        logistics: 'ሎጅስቲክስ እና ማድረስ',
        execution: 'የፕሮጀክት ተከላ እና አፈጻጸም',
        support: 'ድጋፍ እና ከሽያጭ በኋላ አገልግሎት'
      },
      tabs: {
        architecture: 'አጠቃላይ እይታ',
        tender: 'የጨረታ ሞተር',
        rfq: 'የዋጋ ማወዳደሪያ ሞተር',
        requirement: 'የፍላጎት ዴስክ',
        sourcing: 'የምንጭ ፍለጋ ሞተር',
        import: 'ማስመጣት እና ሎጅስቲክስ',
        execution: 'የፕሮጀክት ተከላ'
      }
    },
    quickEntry: {
      executionPathwayLabel: 'የአፈጻጸም ሂደት:',
      card1Pathway: 'ግምገማ → ዝግጅት → አምራች መፈለግ → ማስገባት → ማሸነፍ → ማቅረብ → ማድረስ → ተከላ እና ማስረከብ',
      card1Deliverables: [
        'የBoQ ሰነድ ጥልቅ ኦዲት እና የGo / No-Go ውሳኔ ድጋፍ',
        'የቀጥታ አምራች ህጋዊ ፈቃድ ደብዳቤ (MAF / MAL)',
        'ከግምገማ ጀምሮ እስከ ሙሉ ተከላ 5 ተለዋዋጭ የአገልግሎት ደረጃዎች'
      ],
      card1Explore: '5ቱን የጨረታ አገልግሎት ደረጃዎች ይመልከቱ',
      card2Pathway: 'መመርመር → አምራች መፈለግ → ዋጋ ማውጣት → መግዛት → ማድረስ',
      card2Deliverables: [
        'ቀጥታ ከዓለም አቀፍ አምራች ፋብሪካዎች ትክክለኛ ዋጋ',
        'ለኢትዮጵያ እና ለቀጣናው ባንኮች ተስማሚ የሆኑ ፕሮፎርማዎች',
        'የኢንኮተርምስ አማራጮች: FOB, CIF, CFR, CIP እና DDP ሞጆ/አዲስ አበባ'
      ],
      card2Explore: 'የተጠቃለሉ የበርካታ ምርቶች ጭነት አገልግሎት',
      card3Pathway: 'ፍላጎት → አምራች መፈለግ → ዋጋ ማውጣት → መግዛት → ማድረስ',
      card3Deliverables: [
        'ለመጀመር የአምራች ስም ወይም የቴክኒክ ኮድ ማወቅ አይጠበቅብዎትም',
        'ከበርካታ ምንጮች: እስያ፣ አውሮፓ፣ መካከለኛው ምስራቅ እና አሜሪካ',
        'ቀጥተኛ ዓለም አቀፍ ጭነት፣ ዕቃዎችን ማጠቃለል እና በርዎ ድረስ ማድረስ'
      ],
      card3Explore: 'የቀጥታ ፍላጎት ማሳወቂያ ፎርም',
      secondaryLinks: [
        {
          title: 'ምርቶችን ይመልከቱ እና ይዘዙ',
          desc: 'ከ50 በላይ የተረጋገጡ ኬሚካሎች፣ ፖሊመሮች እና ብረታ ብረት'
        },
        {
          title: 'የኢንዱስትሪ ግብዓቶች አቅርቦት',
          desc: 'ጥሬ ዕቃዎች፣ ማሸጊያዎች እና ቀጣይነት ያለው የፋብሪካ አቅርቦት'
        },
        {
          title: 'ማሽነሪዎች እና መገልገያዎች',
          desc: 'የተሟሉ የፋብሪካ ማምረቻ መስመሮች፣ የፍተሻ መሳሪያዎች እና ተከላ'
        },
        {
          title: 'የተጠቃለለ ዕቃ የማስመጣት ፕሮግራም',
          desc: 'ኮንቴነሮችን በማጠቃለል የወደብ እና የጉምሩክ ወጪን መቀነስ'
        },
        {
          title: 'መለዋወጫዎች እና ተለዋጭ ዕቃዎች',
          desc: 'ኦሪጅናል እና ተስማሚ ሜካኒካል እና ኤሌክትሪካል መለዋወጫዎች'
        },
        {
          title: 'የጨረታ አቅርቦት በመላው አፍሪካ',
          desc: 'በ20+ የአፍሪካ ሀገራት የተዘረጋ የጨረታ ኢንጂነሪንግ አገልግሎት'
        }
      ]
    },
    coreProcessSteps: [
      {
        num: '01',
        title: 'ምንጭ መፈለግ',
        label: 'ምንጭ ፍለጋ',
        desc: 'ዓለም አቀፍ አምራች ፋብሪካዎችን መለየት፣ ጥራትን ማረጋገጥ እና ቀጥታ የፋብሪካ ዋጋ ማግኘት።'
      },
      {
        num: '02',
        title: 'ማጠቃለል',
        label: 'ማጠቃለል',
        desc: 'ከተለያዩ አቅራቢዎች የሚመጡ ዕቃዎችን በውጭ ሀገር ወደቦች ወደ አንድ ኮንቴነር ማሰባሰብ።'
      },
      {
        num: '03',
        title: 'ማስመጣት',
        label: 'ማስመጣት',
        desc: 'የባህር/አየር ጭነት ወደ ጅቡቲ፣ የጉምሩክ ትራንዚት ሰነዶች እና እስከ ሞጆ የደረቅ ወደብ ትራንስፖርት።'
      },
      {
        num: '04',
        title: 'ማድረስ',
        label: 'ማድረስ',
        desc: 'የመጨረሻ የጉምሩክ ክሊራንስ፣ የሀገር ውስጥ ትራንስፖርት እና ፋብሪካዎ ድረስ በደህና ማድረስ።'
      },
      {
        num: '05',
        title: 'መትከል',
        label: 'ተከላ እና ማስኬድ',
        desc: 'የማሽነሪዎች ተከላ፣ የሙከራ ምርት ማካሄድ፣ የኤሌክትሪክ ዝርጋታ እና ቴክኒካል ስራ ማስጀመር።'
      },
      {
        num: '06',
        title: 'ድጋፍ',
        label: 'ቀጣይ ድጋፍ',
        desc: 'ቀጣይነት ያለው የመለዋወጫ አቅርቦት፣ የአምራች ዋስትና ክትትል እና የኦፕሬተሮች ስልጠና።'
      }
    ],
    tenderView: {
      kicker: 'አፍሪካ አቀፍ የጨረታ እና የግዥ ድጋፍ አገልግሎት',
      headline: 'የጨረታ እና የግዥ ድጋፍ በመላው አፍሪካ',
      subheadline: 'የሚፈልጉትን የድጋፍ ደረጃ ይምረጡ — ከሰነድ ግምገማ እና የጨረታ ዝግጅት ጀምሮ እስከ ዓለም አቀፍ አምራች ፍለጋ፣ ከውድድር በኋላ አቅርቦት እና የተሟላ የፕሮጀክት ተከላ።',
      narrative: 'ኦራኔክስ በመላው አፍሪካ ለሚገኙ ተቋራጮች፣ ሚኒስቴሮች፣ የመንግስት ተቋማት፣ የረድኤት ድርጅቶች እና የግል ኩባንያዎች ጥራት ያለው የጨረታ ድጋፍ፣ የቀጥታ ፋብሪካ ዋጋ ማግኘት፣ የፋይናንስ ማስተባበር እና በርዎ ድረስ ማድረስን ያከናውናል።',
      ctaSubmit: 'ጨረታዎን ያስገቡ',
      ctaReview: 'እርግጠኛ አይደሉም? እንመርምረው',
      disclosureTitle: 'የግዥ እና የህግ አሰራር ማዕቀፍ መመሪያዎች',
      disclosureText: 'ኦራኔክስ በመላው አፍሪካ ገበያዎች ውስጥ የጨረታ እና የግዥ ድጋፍ የሚሰጠው በሚመለከታቸው የግዥ ህጎች፣ የደንበኛው ይፋዊ ውክልና፣ የሀገር ውስጥ ደንቦች፣ የብቃት መስፈርቶች እና የውል ስምምነቶች መሰረት ነው።',
      disclosureFooter: 'ዋና መስሪያ ቤቱን በአዲስ አበባ ኢትዮጵያ ያደረገው ኦራኔክስ ከታወቁ ዓለም አቀፍ አምራቾች እና የፍተሻ ላቦራቶሪዎች ጋር ይሰራል። ድጋፉ የሚሰጠው የቦታውን ህጋዊ የግዥ አሰራር በጥብቅ በመከተል ነው። ኦራኔክስ ቢሮ በሌለው ሀገር ውስጥ አውቶማቲክ ብቃት አለኝ አይልም፣ እንዲሁም የጨረታ አሸናፊነት ዋስትና አይሰጥም።',
      selectorTitle: 'ምን ያህል ድጋፍ ይፈልጋሉ?',
      selectorSubtitle: 'ከፍላጎትዎ ጋር የሚጣጣመውን የድጋፍ ደረጃ ይምረጡ። እነዚህ ለእርስዎ ተጨባጭ ፍላጎት የተበጁ የሥራ ሞዴሎች እንጂ የተለመዱ የደንበኝነት ጥቅሎች አይደሉም።',
      selectorKicker: 'በደንበኛው የሚመረጡ የግዥ መንገዶች',
      fastTrackTitle: 'ጨረታዎን ያስገቡ',
      fastTrackKicker: 'ፈጣን የአፍሪካ ጨረታ ማስገቢያ',
      fastTrackDesc: 'የተዘጋጀ የጨረታ ሰነድ ወይም የቢል ኦፍ ኳንቲቲ (BoQ) አለዎት? ሰነዶችዎን አዲስ አበባ ለሚገኘው የግዥ ቡድናችን ይላኩ፤ ጥልቅ የቴክኒክ ግምገማ እና የአምራች ፋብሪካ ዋጋ አፈላላጊ ድጋፍ ያገኛሉ።',
      fastTrackNdaTitle: 'የሚስጥራዊነት ዋስትና:',
      fastTrackNdaDesc: 'የሚልኩልን ሰነዶች በሙሉ በከፍተኛ የድርጅት ሚስጥራዊነት እና ህጋዊ ጥበቃ የተጠበቁ ናቸው።',
      comparisonKicker: 'ዝርዝር የአገልግሎት ማዕቀፍ',
      comparisonTitle: 'የጨረታ አገልግሎት ደረጃዎች ንጽጽር',
      comparisonSubtitle: 'በ5ቱም የአገልግሎት ደረጃዎች የሚሰጡ ተግባራት፣ ኃላፊነቶች እና ውጤቶች ዝርዝር ንጽጽር።',
      legendTitle: 'የምልክቶች ትርጉም:',
      legendSupported: 'የተካተተ',
      legendPostAward: 'ካሸነፉ በኋላ',
      legendReviewed: 'ግምገማ ይደረጋል',
      legendCustomer: 'በደንበኛው የሚሸፈን',
      legendNotIncluded: 'አይካተትም',
      colActivity: 'የግዥ ተግባር / የሚቀርብ አገልግሎት',
      colLevel0: 'ግምገማ',
      colLevel1: 'ሰነድ ዝግጅት',
      colLevel2: 'አምራች + ዝግጅት',
      colLevel3: 'ሙሉ አቅርቦት',
      colLevel4: 'ሙሉ ተከላ (Turnkey)',
      rows: [
        'የጨረታ ሰነድ ግምገማ',
        'የBoQ ፍላጎቶችን መለየት',
        'የተስማሚነት እና ብቃት ዝርዝር',
        'የጨረታ ሰነድ ዝግጅት',
        'ዓለም አቀፍ ምንጭ ፍለጋ',
        'አምራች ፋብሪካዎችን (OEM) መፈለግ',
        'ቴክኒካል ሰነዶች እና ማረጋገጫዎች',
        'የአቅራቢዎች ዋጋ ማሰባሰብ',
        'የንግድ ሁኔታዎች ማስተባበር',
        'ለማስገባት የመጨረሻ ዝግጁነት ፍተሻ',
        'ግዥ እና የፋብሪካ ትዕዛዝ (ካሸነፉ በኋላ)',
        'ትራንዚት እና ጉምሩክ (ካሸነፉ በኋላ)',
        'ወደብ ወይም ሳይት ድረስ ማድረስ',
        'በሳይት ላይ የቴክኒክ ተከላ ማከናወን',
        'የማሽነሪ ፍተሻ እና ስራ ማስጀመር',
        'የሰራተኞች የቴክኒክ ስልጠና',
        'ይፋዊ የርክክብ እና የፈተና ፕሮቶኮል',
        'የዋስትና ክትትል እና የመለዋወጫ አቅርቦት'
      ],
      footnoteTitle: '* የድህረ-ጨረታ የውል ማስታወሻ እና የሥራ ወሰን',
      footnoteText: '* ጠቃሚ ማስታወሻ፡ ከውድድር በኋላ የሚሰጡ የግዥ፣ የማምረት፣ የመላክ፣ የማስመጣት፣ የማድረስ፣ የተከላ እና የስልጠና አገልግሎቶች የሚፈጸሙት ደንበኛው በጨረታው አሸናፊ ሲሆን እና በተናጠል በሚደረግ የውል ስምምነት መሰረት ብቻ ነው። ኦራኔክስ በጨረታው ስለተሳተፈ ብቻ አውቶማቲክ የአቅርቦት መብት አለኝ አይልም፣ እንዲሁም የጨረታ አሸናፊነት ዋስትና አይሰጥም።',
      categoriesKicker: 'የምንደግፋቸው የግዥ ዘርፎች',
      categoriesTitle: 'የምንደግፋቸው የጨረታ እና የግዥ ዘርፎች',
      categoriesSubtitle: 'የልማት ድርጅት፣ የመንግስት ተቋም ወይም በንግድ ጨረታ ላይ የሚወዳደሩ ተቋራጭ ይሁኑ—የእኛ የግዥ መዋቅር ትክክለኛ የፋብሪካ አቅርቦትን ያረጋግጥልዎታል።',
      categoriesCta: 'ለዚህ ዘርፍ ጥያቄ ያቅርቡ',
      workflowKicker: 'የተዋቀረ ባለ 10-ደረጃ ሂደት',
      workflowTitle: 'ከጨረታ እድል ጀምሮ እስከ ማድረስ እና ርክክብ',
      workflowSubtitle: 'ኦራኔክስ ስጋቶችን እንዴት እንደሚቆጣጠር፣ ዓለም አቀፍ አምራቾችን እንደሚያረጋግጥ፣ የወደብ ትራንዚት እና በሳይት ላይ ተከላ እንደሚያከናውን ይመልከቱ።'
    },
    formLabels: {
      contactPerson: 'የእውቂያ ሰው ስም *',
      company: 'ድርጅት / ኩባንያ *',
      email: 'ይፋዊ የስራ ኢሜይል *',
      phone: 'ስልክ ቁጥር / ዋትስአፕ *',
      country: 'የታለመው የአፍሪካ ሀገር / ገበያ',
      preferredLanguage: 'ተመራጭ የመገናኛ ቋንቋ',
      tenderLanguage: 'የጨረታው / የሰነዱ ቋንቋ',
      productOrScope: 'የምርት ወይም የፕሮጀክት ዝርዝር *',
      tenderTitle: 'የጨረታው ርዕስ ወይም የፕሮጀክት ስም *',
      procuringEntity: 'ጨረታውን ያወጣው አካል (አማራጭ)',
      lotNumber: 'የሎት ቁጥር ወይም የጨረታ መለያ (አማራጭ)',
      targetDate: 'የማስረከቢያ የመጨረሻ ቀን / የሚፈለግበት ቀን',
      deliveryLocation: 'የማድረሻ ቦታ / ወደብ',
      specificationDetails: 'የቴክኒካል ዝርዝር መረጃዎች',
      quantity: 'የሚፈለገው ብዛት',
      unit: 'መለኪያ (ቶን፣ ቁጥር፣ ወዘተ)',
      notes: 'ተጨማሪ ማስታወሻ ወይም የBoQ መረጃ',
      attachFiles: 'የጨረታ ሰነድ ወይም BoQ ይጫኑ (PDF, Excel, Word)',
      submitTenderBtn: 'የጨረታ ሰነዱን አስገባ',
      submitQuoteBtn: 'የዋጋ ጥያቄውን ላክ',
      submitRequirementBtn: 'የምርት ፍላጎቱን ላክ',
      doneBtn: 'ተጠናቋል',
      confidentialityNotice: 'ሁሉም የጨረታ ሰነዶች እና መረጃዎች በከፍተኛ የድርጅት ሚስጥራዊነት የተጠበቁ ናቸው።'
    }
  }
};

export const getExtendedTranslations = (lang: LanguageCode): ExtendedTranslation => {
  return EXTENDED_TRANSLATIONS[lang] || EXTENDED_TRANSLATIONS.en;
};
