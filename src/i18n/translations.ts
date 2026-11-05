import { LanguageCode } from './languages';

export interface TranslationSchema {
  // Navigation
  nav: {
    home: string;
    solutions: string;
    products: string;
    industries: string;
    tenders: string;
    projects: string;
    about: string;
    contact: string;
    businessServices: string;
    operationsPortal: string;
    supplierPartner: string;
  };
  // Actions & CTAs
  cta: {
    requestQuote: string;
    tellUsWhatYouNeed: string;
    submitTender: string;
    iHaveATender: string;
    iHaveAnRfq: string;
    notSureReviewIt: string;
    requestProposal: string;
    uploadTender: string;
    requestProcurementSupport: string;
    discussProjectExecution: string;
    search: string;
    searchPlaceholder: string;
    chatWhatsApp: string;
    viewDetails: string;
    contactUs: string;
    exploreSolutions: string;
    browseCatalog: string;
    downloadCatalog: string;
    close: string;
    submit: string;
    submitting: string;
    submitted: string;
    filter: string;
    clearFilter: string;
  };
  // Taglines & Header utility
  header: {
    topBarSlogan: string;
    ethiopiaRooted: string;
    africaFacing: string;
    directLine: string;
    selectLanguage: string;
    switchLanguage: string;
  };
  // Tenders & Procurement Service Levels
  tenders: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    levelsHeading: string;
    levelsSubheading: string;
    comparisonTitle: string;
    level0: {
      name: string;
      tagline: string;
      description: string;
      cta: string;
      deliverables: string[];
    };
    level1: {
      name: string;
      tagline: string;
      description: string;
      cta: string;
      deliverables: string[];
    };
    level2: {
      name: string;
      tagline: string;
      description: string;
      cta: string;
      deliverables: string[];
    };
    level3: {
      name: string;
      tagline: string;
      description: string;
      cta: string;
      deliverables: string[];
    };
    level4: {
      name: string;
      tagline: string;
      description: string;
      cta: string;
      deliverables: string[];
    };
  };
  // Forms & Customer language preference
  forms: {
    preferredLanguage: string;
    preferredLanguageDesc: string;
    tenderLanguage: string;
    tenderLanguageDesc: string;
    sameAsTenderDoc: string;
    otherSpecify: string;
    targetMarket: string;
    suggestedLanguages: string;
    fullName: string;
    companyName: string;
    emailAddress: string;
    phoneNumber: string;
    serviceLevelNeeded: string;
    notesOrBoQ: string;
    uploadFiles: string;
    privacyNotice: string;
  };
  // Footer
  footer: {
    preFooterTag: string;
    preFooterTitle: string;
    preFooterDesc: string;
    tagline: string;
    corporateSubtitle: string;
    allRightsReserved: string;
  };
  // Hero section
  hero: {
    kicker: string;
    title: string;
    description: string;
    requestQuote: string;
    tellUsNeed: string;
    haveTender: string;
    pathwayTitle: string;
    pathwaySubtitle: string;
    pathwayDesc: string;
  };
  // What Do You Need (Section 3)
  whatDoYouNeed: {
    kicker: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Subtitle: string;
    card1Desc: string;
    card1Cta: string;
    card2Title: string;
    card2Subtitle: string;
    card2Desc: string;
    card2Cta: string;
    card3Title: string;
    card3Subtitle: string;
    card3Desc: string;
    card3Cta: string;
    secondaryTitle: string;
  };
  // Tender Section on Homepage
  tenderSection: {
    badge: string;
    title: string;
    subtitle: string;
    desc: string;
    subDesc: string;
    ctaUpload: string;
    ctaExplore: string;
    disclaimer: string;
  };
  // Core Process
  coreProcess: {
    kicker: string;
    title: string;
    subtitle: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  // English (Default)
  en: {
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      products: 'Products',
      industries: 'Industries',
      tenders: 'Tenders & Procurement',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      businessServices: 'Business Services',
      operationsPortal: 'Operations Portal',
      supplierPartner: 'Manufacturer / Supplier Partnership'
    },
    cta: {
      requestQuote: 'Request a Quote',
      tellUsWhatYouNeed: 'Tell Us What You Need',
      submitTender: 'SUBMIT YOUR TENDER',
      iHaveATender: 'I Have a Tender',
      iHaveAnRfq: 'I HAVE AN RFQ',
      notSureReviewIt: 'NOT SURE? LET US REVIEW IT',
      requestProposal: 'Request a Proposal',
      uploadTender: 'Upload Tender Dossier',
      requestProcurementSupport: 'Request Procurement Support',
      discussProjectExecution: 'Discuss Project Execution',
      search: 'Search',
      searchPlaceholder: 'Search products, materials, tenders (or press /)...',
      chatWhatsApp: 'Chat on WhatsApp',
      viewDetails: 'View Details',
      contactUs: 'Contact Procurement Team',
      exploreSolutions: 'Explore Solutions',
      browseCatalog: 'Browse Product Catalog',
      downloadCatalog: 'Download Spec Sheet',
      close: 'Close',
      submit: 'Submit Request',
      submitting: 'Processing Submission...',
      submitted: 'Request Submitted Successfully',
      filter: 'Filter',
      clearFilter: 'Clear'
    },
    header: {
      topBarSlogan: 'SOURCE • SUPPLY • IMPORT • DELIVER • EXECUTE • SUPPORT',
      ethiopiaRooted: 'Ethiopia-rooted',
      africaFacing: 'Africa-facing',
      directLine: 'Addis Ababa HQ Desk',
      selectLanguage: 'Language',
      switchLanguage: 'Change Language'
    },
    tenders: {
      badge: 'Africa-Wide Tender & Procurement Support',
      heroTitle: 'TENDER & PROCUREMENT SUPPORT ACROSS AFRICA',
      heroSubtitle: 'Choose the level of support you need — from tender assessment and bid preparation to international sourcing, post-award supply and complete project execution.',
      heroDescription: 'Oranex provides institutional buyers, contractors, utilities, and ministries across Ethiopia and African corridors with flexible procurement support levels—ranging from independent spec compliance checks to complete end-to-end supply and site commissioning.',
      levelsHeading: 'HOW MUCH SUPPORT DO YOU NEED?',
      levelsSubheading: 'Choose the level of support that matches your requirement.',
      comparisonTitle: 'Service Level Capability Matrix',
      level0: {
        name: 'Level 0: Tender Assessment',
        tagline: 'Feasibility, Compliance & Sourcing Viability Review',
        description: 'Independent technical and commercial review of tender documents, BoQ feasibility, and global supply pricing viability before committing bid resources.',
        cta: 'REQUEST TENDER ASSESSMENT',
        deliverables: [
          'BoQ technical compliance and specification audit',
          'Preliminary manufacturer cost estimating & freight feasibility',
          'Risk & trade restriction screening (sanctions, dual-use, FX)',
          'Clear Go / No-Go bid advisory memorandum'
        ]
      },
      level1: {
        name: 'Level 1: Tender Preparation',
        tagline: 'Technical Dossier, Compliance Sheets & Manufacturer Documents',
        description: 'Preparation of manufacturer documentation, technical compliance sheets, OEM authorization coordination, and complete bid dossier packaging.',
        cta: 'REQUEST TENDER PREPARATION',
        deliverables: [
          'Line-by-line technical specification compliance matrices',
          'Manufacturer Authorization Form (MAF) coordination',
          'TDS, ISO, CE, and factory test certificate compilation',
          'Incoterms, packaging & shipping plan formulation'
        ]
      },
      level2: {
        name: 'Level 2: Sourcing + Tender Preparation',
        tagline: 'Manufacturer Identification, Quoting & Bid Packaging',
        description: 'Full OEM identification across Asia, Europe, and Americas, competitive price negotiation, and full bid pack preparation for your submitting entity.',
        cta: 'REQUEST SOURCING + TENDER SUPPORT',
        deliverables: [
          'Comprehensive global supplier price discovery & vetting',
          'Manufacturer quote consolidation and margin optimization',
          'Bid bond schedule and payment terms negotiation',
          'Full submission-ready tender package'
        ]
      },
      level3: {
        name: 'Level 3: Full Tender Supply Support',
        tagline: 'Factory Order, Inspection, Freight & Port Delivery',
        description: 'Complete procurement execution upon award: factory quality control, letters of credit coordination, sea/air cargo consolidation, and port delivery.',
        cta: 'REQUEST FULL TENDER SUPPLY',
        deliverables: [
          'Factory production management and pre-shipment inspection (SGS/Bureau Veritas)',
          'LC and trade finance execution via Ethiopian & international banks',
          'Multimodal shipping (FOB / CIF / CIP) to Djibouti or regional African ports',
          'Customs transit documentation and shipping guarantees'
        ]
      },
      level4: {
        name: 'Level 4: End-to-End Tender & Project Execution',
        tagline: 'Turnkey Supply, Inland Logistics, Installation & Commissioning',
        description: 'Total turnkey delivery from factory floor to job site installation, testing, commissioning, operator training, and local warranty coverage.',
        cta: 'DISCUSS END-TO-END PROJECT',
        deliverables: [
          'Complete door-to-door corridor logistics to project site',
          'On-site engineering, mechanical/electrical installation',
          'Commissioning, SAT testing, and OEM certified training',
          'Local parts inventory and SLA maintenance agreements'
        ]
      }
    },
    forms: {
      preferredLanguage: 'Preferred Communication Language',
      preferredLanguageDesc: 'Language our sourcing team will use when contacting you',
      tenderLanguage: 'Preferred Tender / Proposal Language',
      tenderLanguageDesc: 'Language required for the formal tender documents and technical response',
      sameAsTenderDoc: 'Same as tender document',
      otherSpecify: 'Other / Specify in notes',
      targetMarket: 'Target African Market / Country',
      suggestedLanguages: 'Suggested for this market',
      fullName: 'Full Name',
      companyName: 'Company / Organization',
      emailAddress: 'Official Work Email',
      phoneNumber: 'Phone / WhatsApp Number',
      serviceLevelNeeded: 'Target Service Level',
      notesOrBoQ: 'Tender Title, Scope or BoQ Details',
      uploadFiles: 'Upload Tender Dossier, Specs or BoQ (PDF, Excel, Word)',
      privacyNotice: 'Your procurement documents are protected by strict corporate confidentiality and non-disclosure standards.'
    },
    footer: {
      preFooterTag: 'START YOUR PROCUREMENT PATHWAY',
      preFooterTitle: 'Have a Requirement? Let’s Source It.',
      preFooterDesc: 'Tell us what you need and let our sourcing and procurement team determine the appropriate pathway—from international factory search to door-to-door delivery in Ethiopia and across African markets.',
      tagline: 'Global Sourcing & Procurement Partner',
      corporateSubtitle: 'Ethiopia-rooted · Africa-facing · Globally connected',
      allRightsReserved: 'All rights reserved. Oranex Trading One Member PLC.'
    },
    hero: {
      kicker: 'B2B Sourcing · Consolidated Import · Project Execution',
      title: 'Your Global Sourcing & Procurement Partner',
      description: 'Oranex connects businesses and institutions in Ethiopia and across African markets with international manufacturers, suppliers and procurement solutions — from sourcing and consolidated import to tender execution, delivery, installation and ongoing supply.',
      requestQuote: 'Request a Quote',
      tellUsNeed: 'Tell Us What You Need',
      haveTender: 'I Have a Tender',
      pathwayTitle: 'Structured Pathway',
      pathwaySubtitle: 'Requirement-Centric Model',
      pathwayDesc: 'We position our capabilities around your exact specification — whether a single container of chemicals, an entire turnkey plant line, or an institutional tender.'
    },
    whatDoYouNeed: {
      kicker: 'Three Primary Sourcing & Procurement Pathways',
      title: 'WHAT DO YOU NEED?',
      subtitle: 'Whether you have a formal tender, an RFQ, a proforma request or simply a product requirement, ORANEX can help you source, procure and deliver.',
      card1Title: 'FORMAL TENDER',
      card1Subtitle: 'Institutional, Ministry, Utility & NGO Tenders',
      card1Desc: 'For organizations bidding on or issuing public and commercial tenders requiring rigorous technical BoQ assessment, OEM manufacturer sourcing, bid dossier compilation, and turnkey delivery.',
      card1Cta: 'I HAVE A TENDER',
      card2Title: 'RFQ / PROFORMA',
      card2Subtitle: 'Bank Proformas, Commercial Invoicing & Quotations',
      card2Desc: 'For commercial buyers, factory operators, and project contractors needing verified manufacturer pricing, official proforma invoices for bank LC or FX processing, and direct procurement.',
      card2Cta: 'I HAVE AN RFQ',
      card3Title: 'DIRECT REQUIREMENT',
      card3Subtitle: 'Tell us what you need.',
      card3Desc: 'You don\'t need to know the manufacturer or technical product code. Tell us what you need and provide whatever information you have—our sourcing desk identifies vetted suppliers worldwide.',
      card3Cta: 'TELL US WHAT YOU NEED',
      secondaryTitle: 'Or Jump Directly to a Specific Category or Solution'
    },
    tenderSection: {
      badge: 'Africa-Wide Tender & Procurement Support',
      title: 'Have a Tender?',
      subtitle: 'Procurement Support Across Africa',
      desc: 'From tender assessment and international sourcing to procurement, import, delivery and project execution.',
      subDesc: 'Supporting organizations with structured tender assessment, international manufacturer sourcing, commercial coordination, and project delivery across African markets — from public authority tenders and UN development programs to private infrastructure contracts.',
      ctaUpload: 'I Have a Tender — Upload BoQ',
      ctaExplore: 'Explore Tender Workflow',
      disclaimer: 'Tender and procurement support is subject to applicable procurement rules, eligibility requirements, customer authorization, local regulations and contractual arrangements in the relevant market. Oranex does not guarantee tender awards.'
    },
    coreProcess: {
      kicker: 'End-to-End Operational Lifecycle',
      title: 'From Global Supply to Local Delivery',
      subtitle: 'A structured six-stage execution pathway ensuring compliance, quality assurance, and direct delivery.'
    }
  },

  // Chinese (中文 - Simplified)
  zh: {
    nav: {
      home: '首页',
      solutions: '解决方案与业务板块',
      products: '产品与材料中心',
      industries: '服务领域',
      tenders: '工程招标与采购',
      projects: '重点工程案例',
      about: '关于 ORANEX',
      contact: '联系我们',
      businessServices: '采购协同服务',
      operationsPortal: '运营门户',
      supplierPartner: '中国及全球优质制造商合作'
    },
    cta: {
      requestQuote: '索取报价 (RFQ)',
      tellUsWhatYouNeed: '提交采购需求清单',
      submitTender: '提交工程量清单 (BOQ)',
      iHaveATender: '我有工程招标项目',
      iHaveAnRfq: '我有询价单 / 形式发票需求',
      notSureReviewIt: '需要协助？让我们为您免费技术评估',
      requestProposal: '获取定制采购方案',
      uploadTender: '上传招标文件或图纸',
      requestProcurementSupport: '申请供应链集采支持',
      discussProjectExecution: '洽谈项目落地与分期供应',
      search: '搜索',
      searchPlaceholder: '搜索产品、沥青、工程机械、混凝土材料 (按 /)...',
      chatWhatsApp: 'WhatsApp 在线直联',
      viewDetails: '查看详细规格',
      contactUs: '联系采购项目部',
      exploreSolutions: '探索核心业务板块',
      browseCatalog: '浏览2026产品目录',
      downloadCatalog: '下载2026产品目录 (PDF)',
      close: '关闭',
      submit: '立即提交',
      submitting: '正在提交采购需求...',
      submitted: '采购需求提交成功，我们将尽快联络',
      filter: '条件筛选',
      clearFilter: '重置'
    },
    header: {
      topBarSlogan: '全球寻源 • 工业集采 • 国际海运 • 港口清关 • 现场交付 • 技术支持',
      ethiopiaRooted: '扎根埃塞俄比亚',
      africaFacing: '面向非洲大市场',
      directLine: '亚的斯亚贝巴总部总监直通',
      selectLanguage: '选择语言',
      switchLanguage: '切换语言'
    },
    tenders: {
      badge: '埃塞俄比亚及东非工程集采服务伙伴',
      heroTitle: '一体化工程建材采购与交钥匙供应链服务',
      heroSubtitle: '全流程覆盖：从BOQ工程量清单技术审核、中国源头厂家对接到国际海运与分期工地交付',
      heroDescription: 'ORANEX Trading 协同中国战略制造伙伴，为埃塞俄比亚承包商、房地产开发商、公路局及大型工业客户提供一站式集采协同，提供原厂测试报告、透明价格与阶段性供货。',
      levelsHeading: '灵活的工程集采合作层级',
      levelsSubheading: '根据您的工程进度与采购模式，选择最适合的对接方案',
      comparisonTitle: '服务能力与交付保障矩阵',
      level0: {
        name: '0级：工程量清单技术与合规审核',
        tagline: '可行性审查、规格合规性与国际出厂成本测算',
        description: '在正式投标或采购前，对BOQ工程量清单、图纸及技术规范进行独立比对，测算中国源头厂家出厂价及国际海运预算。',
        cta: '申请清单审核',
        deliverables: [
          'BOQ工程量清单逐项技术规范合规审查',
          '中国源头厂家出厂指导价及海运费测算',
          '外汇政策、信用证(LC)及进出口关税合规指引',
          '投标决策与可行性分析建议备忘录'
        ]
      },
      level1: {
        name: '1级：技术标书与资质文件编制',
        tagline: '原厂授权书 (MAF)、技术参数表与国际检测报告',
        description: '协同中国合规生产厂家，准备符合埃塞俄比亚国家标准(ES)及国际标准(ASTM/BS/EN)的完整技术资质文件。',
        cta: '索取技术文件支持',
        deliverables: [
          '逐条对应的技术规格符合性偏离表',
          '中国源头制造商正式授权书 (MAF/OEM)',
          '第三方实验室出厂报告 (ISO 9001/CE/SGS)',
          '专业集装箱配载、防潮包装与Incoterms方案'
        ]
      },
      level2: {
        name: '2级：厂家比选与集中采购方案',
        tagline: '锁定中国源头直采出厂价与定制配方',
        description: '在中国具备合格出口资质的厂家中比选最优产能与性价比，为客户提供定制包装、代工生产(OEM)或直采形式发票。',
        cta: '获取厂家直采方案',
        deliverables: [
          '直连中国源头合规工厂，透明透明出厂底价',
          '支持银行信用证(LC)与外汇结算形式发票',
          'OCHEMI 特种化学品配方技术支持及样品寄送',
          '完整的采购商务与技术备标文件包'
        ]
      },
      level3: {
        name: '3级：生产监造与国际门到港运输',
        tagline: '排产跟进、装船前检验(SGS/BV)与国际海运订舱',
        description: '从中国工厂排产监造、出厂质检、国内集港到国际海运租船订舱，直达吉布提港(Djibouti)或蒙巴萨港。',
        cta: '委托国际物流及发运',
        deliverables: [
          '中国工厂生产排期监造与装箱进度报告',
          '权威装船前第三方检验(SGS/Bureau Veritas)',
          '海运订舱提单、商业发票、原产地证(CO)全套单据',
          '全程物流追踪与到达吉布提港清关衔接'
        ]
      },
      level4: {
        name: '4级：交钥匙交货与工地分期保供 (Turnkey)',
        tagline: '清关协作、内陆直运项目现场、设备安装调试与售后',
        description: '从中国出厂至埃塞俄比亚项目工地的全流程保供：协助清关转运、内陆长途物流、重型机械及生产线现场安装指导与质保。',
        cta: '洽谈交钥匙全包保供',
        deliverables: [
          '吉布提至埃塞各州工地的安全陆路运输调度',
          '工程机械、搅拌站及生产设备的现场安装指导',
          '工程技术人员现场试运行与操作技能培训',
          '备品备件库存储备与长期售后保障服务'
        ]
      }
    },
    forms: {
      preferredLanguage: '首选沟通商务语言',
      preferredLanguageDesc: '我们的项目经理与您商务沟通时使用的语言',
      tenderLanguage: '工程文件与图纸语言',
      tenderLanguageDesc: 'BOQ、技术规格与商务合同使用的语言',
      sameAsTenderDoc: '与招标文件一致',
      otherSpecify: '其他（请在备注中说明）',
      targetMarket: '工程所在国家 / 地区',
      suggestedLanguages: '推荐沟通语言',
      fullName: '联系人姓名',
      companyName: '公司 / 机构全称',
      emailAddress: '商务电子邮箱',
      phoneNumber: '联系电话 / WhatsApp',
      serviceLevelNeeded: '所需采购协同级别',
      notesOrBoQ: '工程名称、工程量清单概况或技术指标要求',
      uploadFiles: '上传BOQ清单、图纸或技术要求 (PDF, Excel, Word, DWG, ZIP)',
      privacyNotice: '您上传的项目资料受到商业保密协议严格保护，仅用于采购核算。'
    },
    footer: {
      preFooterTag: '一站式工程建材采购伙伴',
      preFooterTitle: '寻找道路沥青、混凝土外加剂、工程机械或建筑辅材？',
      preFooterDesc: '告诉我们您的工程规格与交期要求，ORANEX 携手中国制造战略伙伴为您提供极具竞争力的出厂直供方案。',
      tagline: '埃塞俄比亚一体化工程建材采购与工业供应链伙伴',
      corporateSubtitle: '立足埃塞俄比亚 · 服务非洲工程建设 · 直通中国制造',
      allRightsReserved: '版权所有 © ORANEX Trading One Member PLC 保留所有权利。'
    },
    hero: {
      kicker: '工程材料集采 • 国际海运协调 • 现场分期交付',
      title: '一个集采伙伴。覆盖工程全阶段。',
      description: '从道路工程沥青与混凝土解决方案，到建筑结构、装饰主材及工业生产装备，ORANEX 携手中国制造战略伙伴，为埃塞俄比亚基础设施与建筑企业提供跨品类一站式集采协同。',
      requestQuote: '索取报价 (RFQ)',
      tellUsNeed: '提交您的 BOQ 清单',
      haveTender: '我有工程招标项目',
      pathwayTitle: '多品类集中采购',
      pathwaySubtitle: '契合工程进度的灵活供货',
      pathwayDesc: '无论是一个标准集装箱的高性能混凝土外加剂，还是整套沥青路面施工材料与商砼搅拌站生产线，我们均按严格的技术标准保质交付。'
    },
    whatDoYouNeed: {
      kicker: '三大专业采购通道',
      title: '您当前的工程采购需求是什么？',
      subtitle: '不论您是需要大型工程投标支持、外汇信用证(LC)银行形式发票，还是批量直采特种建材，ORANEX 团队均能协助您对接中国合格源头工厂。',
      card1Title: '工程投标与竞标支持',
      card1Subtitle: '政府项目、公路基础设施、工业园区及大型公建',
      card1Desc: '深入审查BOQ工程量清单、出具中国厂家授权书(MAF)、编制全套合规标书并提供中标后的供货担保。',
      card1Cta: '我有投标项目',
      card2Title: '询价与银行形式发票 (RFQ)',
      card2Subtitle: '信用证(LC)形式发票与极具竞争力的工厂直采价',
      card2Desc: '为承包商与贸易商提供真实可信的中国厂家直供底价，出具符合银行信用证(LC)要求的外贸单据。',
      card2Cta: '我有询价单 (RFQ)',
      card3Title: '定制工程材料与设备需求',
      card3Subtitle: '告诉我们您需要什么规格',
      card3Desc: '无需事先掌握具体厂家或国际型号。只需提供工程技术指标或样品需求，我们的采购工程师将在中国源头工厂中精准匹配。',
      card3Cta: '提交采购需求',
      secondaryTitle: '或直接浏览重点工程建材品类'
    },
    tenderSection: {
      badge: '泛非工程招标与采购支持',
      title: '手头有正在筹备的工程招标？',
      subtitle: '全流程采购与国际供应链协同',
      desc: '从前期技术规范比对到国际生产排期、港口海运与工地现场验收。',
      subDesc: '协助承包商获取权威的原厂出厂测试报告、SGS装船前检验以及准时的分期供货计划。',
      ctaUpload: '我有投标项目 — 上传 BOQ',
      ctaExplore: '了解招标协同流程',
      disclaimer: '采购与投标协同严格遵守相关法律法规及客户授权协议。ORANEX 不对第三方评标结果作不当承诺。'
    },
    coreProcess: {
      kicker: '全流程工程采购闭环',
      title: '从中国制造源头到埃塞俄比亚项目现场',
      subtitle: '七大执行步骤，确保技术合规、品质受控、准时到货。'
    }
  },

  // French (Français)
  fr: {
    nav: {
      home: 'Accueil',
      solutions: 'Solutions',
      products: 'Produits',
      industries: 'Industries',
      tenders: 'Appels d’Offres & Achats',
      projects: 'Projets',
      about: 'À Propos',
      contact: 'Contact',
      businessServices: 'Services Entreprises',
      operationsPortal: 'Portail des Opérations',
      supplierPartner: 'Partenariat Fabricants & Fournisseurs'
    },
    cta: {
      requestQuote: 'Demander un Devis',
      tellUsWhatYouNeed: 'Dites-nous Vos Besoins',
      submitTender: 'SOUMETTRE VOTRE APPEL D’OFFRES',
      iHaveATender: 'J’ai un Appel d’Offres',
      iHaveAnRfq: 'J’AI UNE DEMANDE DE DEVIS / PROFORMA',
      notSureReviewIt: 'PAS SÛR ? LAISSEZ-NOUS L’ÉVALUER',
      requestProposal: 'Demander une Proposition',
      uploadTender: 'Télécharger le Dossier d’Appel d’Offres',
      requestProcurementSupport: 'Demander un Appui aux Achats',
      discussProjectExecution: 'Discuter de l’Exécution du Projet',
      search: 'Recherche',
      searchPlaceholder: 'Rechercher produits, matériaux, appels d’offres (ou tapez /)...',
      chatWhatsApp: 'Discuter sur WhatsApp',
      viewDetails: 'Voir les Détails',
      contactUs: 'Contacter l’Équipe Achats',
      exploreSolutions: 'Découvrir nos Solutions',
      browseCatalog: 'Consulter le Catalogue Produits',
      downloadCatalog: 'Télécharger la Fiche Technique',
      close: 'Fermer',
      submit: 'Envoyer la Demande',
      submitting: 'Traitement en cours...',
      submitted: 'Demande envoyée avec succès',
      filter: 'Filtrer',
      clearFilter: 'Effacer'
    },
    header: {
      topBarSlogan: 'SOURCING • APPROVISIONNEMENT • IMPORTATION • LIVRAISON • EXÉCUTION',
      ethiopiaRooted: 'Ancré en Éthiopie',
      africaFacing: 'Tourné vers l’Afrique',
      directLine: 'Bureau Central Addis-Abeba',
      selectLanguage: 'Langue',
      switchLanguage: 'Changer de Langue'
    },
    tenders: {
      badge: 'Appui aux Marchés Publics & Privés en Afrique',
      heroTitle: 'Ingénierie d’Appels d’Offres & Achats de Projets à l’Échelle Africaine',
      heroSubtitle: 'De l’Évaluation du Dossier à la Mise en Service Clé en Main',
      heroDescription: 'Oranex accompagne les institutions, entreprises générales, services publics et ministères en Éthiopie et sur les corridors africains avec des niveaux d’appui adaptés : vérification de conformité, constitution de dossiers, approvisionnement complet et installation sur site.',
      levelsHeading: 'Les 5 Niveaux de Service d’Appels d’Offres',
      levelsSubheading: 'Sélectionnez le niveau exact de support technique, commercial et logistique requis par votre organisation',
      comparisonTitle: 'Matrice des Capacités par Niveau de Service',
      level0: {
        name: 'Niveau 0 : Évaluation d’Appel d’Offres',
        tagline: 'Faisabilité, Conformité & Viabilité du Sourcing',
        description: 'Examen technique et commercial indépendant des cahiers des charges, faisabilité du bordereau des prix (BoQ) et viabilité tarifaire mondiale avant engagement de ressources.',
        cta: 'Demander une Évaluation',
        deliverables: [
          'Audit de conformité technique et analyse des spécifications du BoQ',
          'Estimation des coûts usine et faisabilité logistique/fret',
          'Vérification des risques commerciaux, douaniers et devises',
          'Note d’orientation stratégique Go / No-Go pour soumission'
        ]
      },
      level1: {
        name: 'Niveau 1 : Préparation de l’Offre',
        tagline: 'Dossier Technique, Fiches de Conformité & Documents OEM',
        description: 'Constitution des fiches techniques comparatives, attestations du fabricant (MAF), certifications d’usine et montage du dossier de soumission.',
        cta: 'Demander la Préparation d’Offre',
        deliverables: [
          'Matrices de conformité technique ligne par ligne',
          'Coordination des autorisations constructeur (MAF/OEM)',
          'Compilation des fiches techniques, certifications ISO, CE et essais',
          'Établissement du plan de transport, conditionnement et Incoterms'
        ]
      },
      level2: {
        name: 'Niveau 2 : Sourcing + Préparation de l’Offre',
        tagline: 'Identification des Fabricants, Cotation & Montage de Dossier',
        description: 'Identification des fabricants certifiés en Asie, Europe et Amériques, négociation des prix usine et préparation complète du dossier d’offre.',
        cta: 'Demander Sourcing + Préparation',
        deliverables: [
          'Découverte des prix mondiaux et qualification des usines',
          'Consolidation des devis fabricants et optimisation des marges',
          'Coordination des garanties bancaires et conditions de paiement',
          'Dossier de soumission complet prêt au dépôt'
        ]
      },
      level3: {
        name: 'Niveau 3 : Approvisionnement Complet d’Appel d’Offres',
        tagline: 'Commande Usine, Contrôle Qualité, Fret & Livraison Portuaire',
        description: 'Exécution complète post-adjudication : fabrication sous contrôle, ouverture de lettres de crédit, consolidation maritime/aérienne et livraison au port convenu.',
        cta: 'Demander Approvisionnement Complet',
        deliverables: [
          'Suivi de fabrication et inspection avant expédition (SGS/Bureau Veritas)',
          'Gestion des accréditifs documentaires (LC) et instruments de commerce',
          'Fret multimodal (FOB / CIF / CIP) vers Djibouti ou ports africains',
          'Dédouanement de transit et garanties de livraison'
        ]
      },
      level4: {
        name: 'Niveau 4 : Exécution Clé en Main & Gestion de Projet',
        tagline: 'Livraison sur Chantier, Montage, Mise en Service & Garantie',
        description: 'Prise en charge intégrale de la sortie d’usine jusqu’au montage sur site, essais de performance, formation des équipes et service après-vente local.',
        cta: 'Discuter de l’Exécution du Projet',
        deliverables: [
          'Logistique de corridor de porte à porte jusqu’au chantier final',
          'Ingénierie de chantier, installation mécanique et électrique',
          'Mise en service, tests de recette et formation certifiée constructeur',
          'Stock de pièces de rechange et contrats de maintenance (SLA)'
        ]
      }
    },
    forms: {
      preferredLanguage: 'Langue de Communication Préférée',
      preferredLanguageDesc: 'Langue utilisée par nos équipes pour vos échanges',
      tenderLanguage: 'Langue de l’Appel d’Offres / de la Proposition',
      tenderLanguageDesc: 'Langue requise pour le dossier formel et les spécifications',
      sameAsTenderDoc: 'Identique au document d’appel d’offres',
      otherSpecify: 'Autre / Préciser dans les notes',
      targetMarket: 'Marché Africain / Pays de Destination',
      suggestedLanguages: 'Suggéré pour ce marché',
      fullName: 'Nom Complet',
      companyName: 'Entreprise / Organisation',
      emailAddress: 'E-mail Professionnel',
      phoneNumber: 'Téléphone / WhatsApp',
      serviceLevelNeeded: 'Niveau de Service Souhaité',
      notesOrBoQ: 'Titre de l’Appel d’Offres, Périmètre ou Détails du BoQ',
      uploadFiles: 'Déposer les Documents (Cahier des charges, BoQ en PDF, Excel)',
      privacyNotice: 'Vos documents sont traités selon des normes strictes de confidentialité et de secret des affaires.'
    },
    footer: {
      preFooterTag: 'DÉMARREZ VOTRE PARCOURS D’APPROVISIONNEMENT',
      preFooterTitle: 'Un Besoin Industriel ? Sourçons-le Ensemble.',
      preFooterDesc: 'Transmettez-nous vos besoins pour que notre bureau d’achats définisse la voie optimale—de l’usine internationale jusqu’au site de livraison en Éthiopie et en Afrique.',
      tagline: 'Partenaire Mondial de Sourcing & Achats Industriels',
      corporateSubtitle: 'Ancré en Éthiopie · Tourné vers l’Afrique · Connecté au Monde',
      allRightsReserved: 'Tous droits réservés. Oranex Trading One Member PLC.'
    },
    hero: {
      kicker: 'Sourcing B2B · Importation Groupée · Exécution de Projets',
      title: 'Votre Partenaire Mondial d’Approvisionnement et d’Achats',
      description: 'Oranex connecte les entreprises et institutions en Éthiopie et sur les marchés africains avec des fabricants et fournisseurs internationaux — du sourcing à l’importation groupée, en passant par les appels d’offres, la livraison et le support technique.',
      requestQuote: 'Demander un Devis',
      tellUsNeed: 'Dites-nous Vos Besoins',
      haveTender: 'J’ai un Appel d’Offres',
      pathwayTitle: 'Parcours Structuré',
      pathwaySubtitle: 'Modèle Centré sur le Besoin',
      pathwayDesc: 'Nous adaptons nos capacités à vos spécifications exactes — qu’il s’agisse d’un conteneur de produits chimiques, d’une ligne d’usine complète ou d’un appel d’offres institutionnel.'
    },
    whatDoYouNeed: {
      kicker: 'Trois Voies Principales d’Approvisionnement',
      title: 'DE QUOI AVEZ-VOUS BESOIN ?',
      subtitle: 'Que vous ayez un appel d’offres formel, une demande de devis, une demande de proforma ou simplement un besoin de produit, ORANEX peut vous aider à sourcer, approvisionner et livrer.',
      card1Title: 'APPEL D’OFFRES FORMEL',
      card1Subtitle: 'Marchés Publics, Ministères, Services Publics & ONG',
      card1Desc: 'Pour les organisations soumissionnaires nécessitant un audit technique de BoQ, le sourcing d’usines OEM, la constitution du dossier de candidature et la livraison clé en main.',
      card1Cta: 'J’AI UN APPEL D’OFFRES',
      card2Title: 'DEMANDE DE DEVIS / PROFORMA',
      card2Subtitle: 'Factures Proforma Bancaires & Devis Commerciaux',
      card2Desc: 'Pour les acheteurs commerciaux, usines et entrepreneurs ayant besoin de prix usine vérifiés, de factures proforma pour crédit documentaire (LC) et d’importation directe.',
      card2Cta: 'J’AI UNE DEMANDE DE DEVIS',
      card3Title: 'BESOIN DIRECT',
      card3Subtitle: 'Dites-nous ce dont vous avez besoin.',
      card3Desc: 'Pas besoin de connaître le fabricant ou la référence technique. Décrivez votre besoin avec vos informations disponibles—notre bureau d’achats sélectionne des fournisseurs qualifiés dans le monde entier.',
      card3Cta: 'DITES-NOUS CE DONT VOUS AVEZ BESOIN',
      secondaryTitle: 'Ou accédez directement à une catégorie ou solution'
    },
    tenderSection: {
      badge: 'Appui aux Appels d’Offres & Achats en Afrique',
      title: 'Vous avez un Appel d’Offres ?',
      subtitle: 'Accompagnement aux Achats à Travers l’Afrique',
      desc: 'De l’évaluation du cahier des charges et du sourcing international jusqu’aux achats, à l’importation et à la réalisation.',
      subDesc: 'Accompagnement des organisations avec une analyse structurée des dossiers, le sourcing direct auprès des fabricants OEM et la logistique de livraison sur les corridors africains.',
      ctaUpload: 'J’ai un Appel d’Offres — Déposer le BoQ',
      ctaExplore: 'Explorer le Processus Appel d’Offres',
      disclaimer: 'L’appui aux marchés est soumis aux règles de passation applicables, à l’éligibilité, aux autorisations du client et aux réglementations locales. Oranex ne garantit pas l’attribution des marchés.'
    },
    coreProcess: {
      kicker: 'Cycle Opérationnel de Bout en Bout',
      title: 'De l’Usine Internationale à la Livraison Locale',
      subtitle: 'Un parcours d’exécution rigoureux en six étapes assurant conformité, contrôle qualité et livraison directe.'
    }
  },

  // Arabic (العربية - RTL)
  ar: {
    nav: {
      home: 'الرئيسية',
      solutions: 'الحلول',
      products: 'المنتجات',
      industries: 'القطاعات',
      tenders: 'المناقصات والمشتريات',
      projects: 'المشاريع',
      about: 'عن أورانكس',
      contact: 'اتصل بنا',
      businessServices: 'خدمات الأعمال',
      operationsPortal: 'بوابة العمليات',
      supplierPartner: 'شراكة المصنعين والموردين'
    },
    cta: {
      requestQuote: 'طلب عرض أسعار',
      tellUsWhatYouNeed: 'أخبرنا بما تحتاج',
      submitTender: 'تقديم المناقصة',
      iHaveATender: 'لدي مناقصة للمشاركة',
      iHaveAnRfq: 'لدي طلب عرض أسعار / فاتورة مبدئية',
      notSureReviewIt: 'غير متأكد؟ دعنا نقيمها لك',
      requestProposal: 'طلب مقترح مشروع',
      uploadTender: 'تحميل وثائق المناقصة',
      requestProcurementSupport: 'طلب دعم المشتريات',
      discussProjectExecution: 'مناقشة تنفيذ المشروع',
      search: 'بحث',
      searchPlaceholder: 'ابحث عن المنتجات، المواد، المناقصات (أو اضغط /)...',
      chatWhatsApp: 'محادثة عبر واتساب',
      viewDetails: 'عرض التفاصيل',
      contactUs: 'تواصل مع فريق المشتريات',
      exploreSolutions: 'استكشاف الحلول',
      browseCatalog: 'تصفح كتالوج المنتجات',
      downloadCatalog: 'تحميل المواصفات الفنية',
      close: 'إغلاق',
      submit: 'إرسال الطلب',
      submitting: 'جاري المعالجة...',
      submitted: 'تم إرسال الطلب بنجاح',
      filter: 'تصفية',
      clearFilter: 'مسح'
    },
    header: {
      topBarSlogan: 'توريد • استيراد • شحن • تسليم • تنفيذ مشاريع • دعم فني متكامل',
      ethiopiaRooted: 'متجذر في إثيوبيا',
      africaFacing: 'موجه لعموم إفريقيا',
      directLine: 'مكتب أديس أبابا الرئيسي',
      selectLanguage: 'اللغة',
      switchLanguage: 'تغيير اللغة'
    },
    tenders: {
      badge: 'دعم المناقصات والمشتريات عبر عموم القارة الإفريقية',
      heroTitle: 'هندسة المناقصات وتوريدات المشاريع الكبرى في إفريقيا',
      heroSubtitle: 'من تقييم وثائق العطاءات إلى التسليم والتشغيل الميداني',
      heroDescription: 'تقدم أورانكس للمؤسسات والشركات والمقاولين والوزارات في إثيوبيا وعموم الأسواق الإفريقية 5 مستويات مرنة لدعم المشتريات والمناقصات، بدءاً من تدقيق المواصفات الفنية وحتى التوريد والتركيب والتشغيل.',
      levelsHeading: 'مستويات خدمة المناقصات الخمسة',
      levelsSubheading: 'اختر المستوى الدقيق للدعم الفني والتجاري واللوجستي الذي تتطلبه مؤسستك',
      comparisonTitle: 'مصفوفة قدرات مستويات الخدمة',
      level0: {
        name: 'المستوى 0: تقييم المناقصة',
        tagline: 'مراجعة الجدوى، المطابقة الفنية وإمكانية التوريد العالمي',
        description: 'مراجعة فنية وتجارية مستقلة لوثائق العطاء وجداول الكميات والتسعير العالمي المبدئي قبل استثمار الموارد في التقديم.',
        cta: 'طلب تقييم مناقصة',
        deliverables: [
          'تدقيق المطابقة الفنية لجدول الكميات والمواصفات القياسية',
          'تقدير تكاليف المصانع العالمية ودراسة مسارات الشحن البحري والجوي',
          'فحص المخاطر التجارية والقيود الجمركية وقيود العملات الأجنبية',
          'مذكرة توجيه استراتيجية تدعم قرار المشاركة أو الاعتذار (Go / No-Go)'
        ]
      },
      level1: {
        name: 'المستوى 1: إعداد ملف المناقصة',
        tagline: 'الملف الفني، جداول المطابقة وشهادات المصنعين الرسمية',
        description: 'إعداد جداول مطابقة المواصفات، وتنسيق خطابات تفويض المصانع المعتمدة (MAF)، وتجميع الشهادات الفنية ومستندات العرض المتكامل.',
        cta: 'طلب إعداد ملف العطاء',
        deliverables: [
          'مصفوفات الامتثال الفني الدقيقة بنداً ببند',
          'تأمين وتنسيق خطابات تفويض المصنعين الرسمية (MAF/OEM)',
          'تجميع شهادات الاختبار ومطابقة الجودة (ISO / CE / COA)',
          'إعداد خطة الشحن والتغليف وشروط التجارة الدولية (Incoterms)'
        ]
      },
      level2: {
        name: 'المستوى 2: التوريد + إعداد المناقصة',
        tagline: 'تحديد المصانع، التفاوض على الأسعار وتجهيز حزمة العرض الكاملة',
        description: 'البحث الشامل عن أفضل المصانع في آسيا وأوروبا والأمريكتين، والتفاوض التنافسي على الأسعار، وتجهيز العطاء بالكامل للجهة المقدمة.',
        cta: 'طلب التوريد والإعداد المتكامل',
        deliverables: [
          'استكشاف الأسعار العالمية المباشرة وتأهيل المصانع المعتمدة',
          'دمج عروض الأسعار الصناعية وتحسين هوامش الربحية التنافسية',
          'تنسيق خطابات الضمان البنكي وجداول الدفع المالي',
          'حزمة مناقصة متكاملة جاهزة للتسليم الفوري'
        ]
      },
      level3: {
        name: 'المستوى 3: دعم التوريد الشامل للمناقصات',
        tagline: 'أوامر التصنيع، فحص الجودة الميداني، الشحن الدولي والتسليم في الميناء',
        description: 'التنفيذ الكامل للمشتريات بعد الترسية: متابعة خطوط الإنتاج، إدارة الاعتمادات المستندية، الشحن التجميعي والتسليم في ميناء جيبوتي أو الموانئ الإفريقية.',
        cta: 'طلب دعم التوريد الشامل',
        deliverables: [
          'إدارة إنتاج المصانع وإجراء الفحص الفني المسبق للشحن (SGS / BV)',
          'تنفيذ خطابات الاعتماد المستندي (LC) وتمويل التجارة الدولية',
          'الشحن متعدد الوسائط (FOB / CIF / CIP) إلى الموانئ الإفريقية',
          'توثيق الترانزيت الجمركي والضمانات اللوجستية'
        ]
      },
      level4: {
        name: 'المستوى 4: تنفيذ المشاريع المتكاملة من البداية للنهاية',
        tagline: 'تسليم تسليم مفتاح، النقل البري الداخلي، التركيب الميداني والتشغيل',
        description: 'إدارة متكاملة من أرض المصنع حتى موقع العمل: النقل البري، التركيبات الميكانيكية والكهربائية، الاختبارات، تدريب المشغلين والضمان المحلي.',
        cta: 'مناقشة تنفيذ المشاريع',
        deliverables: [
          'شحن مباشر من الباب إلى الباب حتى موقع المشروع الميداني',
          'الإشراف الهندسي الموقعي والتركيبات الميكانيكية والكهربائية',
          'التشغيل التجريبي واختبارات الجاهزية والتدريب الفني المعتمد',
          'توفير قطع الغيار المحلية وعقود الصيانة الدورية (SLA)'
        ]
      }
    },
    forms: {
      preferredLanguage: 'لغة التواصل المفضلة',
      preferredLanguageDesc: 'اللغة التي يفضل أن يتواصل بها فريقنا معك',
      tenderLanguage: 'لغة المناقصة / العرض الفني والمالي',
      tenderLanguageDesc: 'اللغة الرسمية المطلوبة لوثائق المناقصة والعطاءات الفنية',
      sameAsTenderDoc: 'نفس لغة وثيقة المناقصة',
      otherSpecify: 'أخرى / تحديد في الملاحظات',
      targetMarket: 'السوق الإفريقي المستهدف / الدولة',
      suggestedLanguages: 'مقترح لهذا السوق',
      fullName: 'الاسم الكامل',
      companyName: 'الشركة / المؤسسة',
      emailAddress: 'البريد الإلكتروني المهني',
      phoneNumber: 'رقم الهاتف / واتساب',
      serviceLevelNeeded: 'مستوى الخدمة المطلوب',
      notesOrBoQ: 'عنوان المناقصة، نطاق العمل أو جدول الكميات',
      uploadFiles: 'تحميل وثائق المناقصة وجداول الكميات (PDF, Excel)',
      privacyNotice: 'جميع وثائقكم تخضع لأعلى معايير السرية المهنية وعدم الإفصاح.'
    },
    footer: {
      preFooterTag: 'ابدأ مسار التوريد والمشتريات الآن',
      preFooterTitle: 'هل لديك متطلبات صناعية أو مناقصة؟ دعنا نؤمنها لك.',
      preFooterDesc: 'أخبرنا باحتياجاتك ليقوم مهندسو المشتريات بتحديد المسار الأنسب—من البحث في المصانع العالمية وحتى التوريد والتركيب في إثيوبيا وعموم الدول الإفريقية.',
      tagline: 'شريكك العالمي في التوريد والمشتريات الصناعية',
      corporateSubtitle: 'متجذر في إثيوبيا · موجه لعموم إفريقيا · متصل بالعالم',
      allRightsReserved: 'جميع الحقوق محفوظة. شركة أورانكس التجارية ذات المسؤولية المحدودة.'
    },
    hero: {
      kicker: 'توريد للشركات · استيراد موحد · تنفيذ المشاريع',
      title: 'شريككم العالمي في التوريد والمشتريات',
      description: 'تربط أورانكس الشركات والمؤسسات في إثيوبيا وعبر الأسواق الأفريقية بالمصنعين والموردين العالميين — من البحث والتوريد والاستيراد الموحد إلى تنفيذ المناقصات والتسليم والتشغيل.',
      requestQuote: 'طلب عرض أسعار',
      tellUsNeed: 'أخبرنا بما تحتاج',
      haveTender: 'لدي مناقصة للمشاركة',
      pathwayTitle: 'مسار منظم',
      pathwaySubtitle: 'نموذج يركز على متطلباتك',
      pathwayDesc: 'نوجه قدراتنا وفقاً لمواصفاتك الدقيقة — سواء كانت حاوية مواد كيميائية أو خط إنتاج مصنع متكامل أو مناقصة مؤسسية كبرى.'
    },
    whatDoYouNeed: {
      kicker: 'ثلاثة مسارات رئيسية للمشتريات والتوريد',
      title: 'ماذا تحتاج؟',
      subtitle: 'سواء كانت لديك مناقصة رسمية، أو طلب عرض أسعار، أو فاتورة مبدئية، أو مجرد متطلب منتج، فإن أورانكس تساعدك في البحث والشراء والتسليم.',
      card1Title: 'مناقصة رسمية',
      card1Subtitle: 'مناقصات حكومية، وزارات، مرافق وهيئات إغاثية',
      card1Desc: 'للمؤسسات المشاركة في المناقصات العامة والتجارية التي تتطلب تدقيق جداول الكميات، والتوريد من مصانع OEM، وإعداد ملف العطاء، والتسليم المتكامل.',
      card1Cta: 'لدي مناقصة للمشاركة',
      card2Title: 'طلب عرض أسعار / فاتورة مبدئية',
      card2Subtitle: 'فواتير مبدئية للاعتمادات البنكية وعروض أسعار تجارية',
      card2Desc: 'للشركات والمصانع والمقاولين الباحثين عن أسعار المصانع المباشرة، وفواتير مبدئية لفتح الاعتمادات المستندية (LC) والاستيراد المباشر.',
      card2Cta: 'لدي طلب عرض أسعار',
      card3Title: 'طلب واحتياج مباشر',
      card3Subtitle: 'أخبرنا بما تحتاج.',
      card3Desc: 'لست بحاجة لمعرفة اسم المصنع أو الرمز الفني. صف ما تحتاج وسيقوم فريق المشتريات بالبحث والتحقق من أفضل الموردين حول العالم.',
      card3Cta: 'أخبرنا بما تحتاج',
      secondaryTitle: 'أو انتقل مباشرة إلى تصنيف أو حل محدد'
    },
    tenderSection: {
      badge: 'دعم المناقصات والمشتريات في عموم إفريقيا',
      title: 'هل لديك مناقصة؟',
      subtitle: 'دعم المشتريات عبر الأسواق الإفريقية',
      desc: 'من تقييم كراسة الشروط والتوريد الدولي إلى المشتريات والاستيراد والتسليم وتنفيذ المشروع.',
      subDesc: 'دعم المنظمات بتدقيق احترافي للشروط، والربط بالمصنعين الأصليين، والتنسيق التجاري، والتسليم اللوجستي في الدول الإفريقية.',
      ctaUpload: 'لدي مناقصة — تحميل جدول الكميات',
      ctaExplore: 'استكشاف مراحل المناقصات',
      disclaimer: 'تخضع خدمات المناقصات لقواعد المشتريات المعمول بها وتفويض العميل والقوانين المحلية. أورانكس لا تضمن الفوز بالمناقصات.'
    },
    coreProcess: {
      kicker: 'دورة تشغيلية متكاملة',
      title: 'من التوريد العالمي إلى التسليم الميداني',
      subtitle: 'مسار تنفيذي منظم من ست مراحل يضمن المطابقة وضمان الجودة والتسليم المباشر.'
    }
  },

  // Portuguese (Português)
  pt: {
    nav: {
      home: 'Início',
      solutions: 'Soluções',
      products: 'Produtos',
      industries: 'Setores',
      tenders: 'Concursos & Compras',
      projects: 'Projetos',
      about: 'Sobre',
      contact: 'Contacto',
      businessServices: 'Serviços Empresariais',
      operationsPortal: 'Portal de Operações',
      supplierPartner: 'Parceria de Fabricantes e Fornecedores'
    },
    cta: {
      requestQuote: 'Solicitar Cotação',
      tellUsWhatYouNeed: 'Diga-nos o que Precisa',
      submitTender: 'SUBMETER A SUA LICITAÇÃO',
      iHaveATender: 'Tenho um Concurso / Licitação',
      iHaveAnRfq: 'TENHO UMA COTAÇÃO / PROFORMA',
      notSureReviewIt: 'NÃO TEM CERTEZA? DEIXE-NOS AVALIAR',
      requestProposal: 'Solicitar Proposta',
      uploadTender: 'Carregar Caderno de Encargos',
      requestProcurementSupport: 'Solicitar Apoio de Aquisições',
      discussProjectExecution: 'Discutir Execução do Projeto',
      search: 'Pesquisa',
      searchPlaceholder: 'Pesquisar produtos, materiais, concursos (ou prima /)...',
      chatWhatsApp: 'Conversar no WhatsApp',
      viewDetails: 'Ver Detalhes',
      contactUs: 'Contactar Equipa de Compras',
      exploreSolutions: 'Explorar Soluções',
      browseCatalog: 'Consultar Catálogo de Produtos',
      downloadCatalog: 'Descarregar Ficha Técnica',
      close: 'Fechar',
      submit: 'Submeter Pedido',
      submitting: 'A processar envio...',
      submitted: 'Pedido submetido com sucesso',
      filter: 'Filtrar',
      clearFilter: 'Limpar'
    },
    header: {
      topBarSlogan: 'ORIGEM • FORNECIMENTO • IMPORTAÇÃO • ENTREGA • EXECUÇÃO • SUPORTE',
      ethiopiaRooted: 'Enraizado na Etiópia',
      africaFacing: 'Vocacionado para África',
      directLine: 'Gabinete Central de Adis Abeba',
      selectLanguage: 'Idioma',
      switchLanguage: 'Alterar Idioma'
    },
    tenders: {
      badge: 'Apoio a Concursos Públicos e Privados em Toda a África',
      heroTitle: 'Engenharia de Concursos e Aquisição de Projetos em África',
      heroSubtitle: 'Da Avaliação de Cadernos de Encargos à Execução Chave na Mão',
      heroDescription: 'A Oranex apoia instituições públicas, empreiteiros e indústrias na Etiópia e nos mercados africanos com 5 níveis flexíveis de apoio a concursos e aquisições.',
      levelsHeading: 'Os 5 Níveis de Serviço de Concursos',
      levelsSubheading: 'Selecione o nível exato de suporte comercial, técnico e logístico requerido pela sua organização',
      comparisonTitle: 'Matriz de Capacidades por Nível de Serviço',
      level0: {
        name: 'Nível 0: Avaliação de Concurso / Licitação',
        tagline: 'Viabilidade, Conformidade & Análise de Custos Globais',
        description: 'Exame técnico e comercial independente do caderno de encargos, mapa de quantidades (BoQ) e viabilidade de preços antes do compromisso de meios.',
        cta: 'Solicitar Avaliação',
        deliverables: [
          'Auditoria de conformidade técnica e análise de especificações do BoQ',
          'Estimativa de custos industriais e viabilidade de frete marítimo/aéreo',
          'Verificação de riscos cambiais, aduaneiros e de conformidade comercial',
          'Parecer orientador estratégico Go / No-Go para participação'
        ]
      },
      level1: {
        name: 'Nível 1: Preparação da Proposta',
        tagline: 'Dossiê Técnico, Matrizes de Conformidade & Documentação OEM',
        description: 'Elaboração das fichas técnicas comparativas, cartas de autorização do fabricante (MAF) e organização completa do dossiê concorrencial.',
        cta: 'Solicitar Preparação de Proposta',
        deliverables: [
          'Matrizes de conformidade técnica linha a linha',
          'Coordenação de autorizações oficiais de fabricantes (MAF/OEM)',
          'Compilação de fichas técnicas, normas ISO, certificações CE e ensaios',
          'Definição de plano de embalamento, transporte e Incoterms'
        ]
      },
      level2: {
        name: 'Nível 2: Sourcing + Preparação de Proposta',
        tagline: 'Identificação de Fabricantes, Negociação de Preços & Dossiê',
        description: 'Procura abrangente de fabricantes na Ásia, Europa e Américas, negociação competitiva e elaboração integral da proposta para a entidade concorrente.',
        cta: 'Solicitar Sourcing + Preparação',
        deliverables: [
          'Descoberta de preços globais diretos de fábrica e qualificação',
          'Consolidação de cotações de fabricantes e otimização de margens',
          'Garantias bancárias de concurso e condições de pagamento',
          'Pacote de submissão integral pronto a concorrer'
        ]
      },
      level3: {
        name: 'Nível 3: Fornecimento Integral de Concurso',
        tagline: 'Controlo de Produção, Inspeção de Qualidade, Frete & Entrega Portuária',
        description: 'Execução de compras após adjudicação: acompanhamento fabril, gestão de cartas de crédito, consolidação de carga e entrega no porto de destino.',
        cta: 'Solicitar Fornecimento Integral',
        deliverables: [
          'Gestão de fabrico e inspeção pré-embarque independente (SGS / BV)',
          'Gestão de cartas de crédito (LC) e financiamento comercial',
          'Frete multimodal (FOB / CIF / CIP) para portos africanos',
          'Desembaraço aduaneiro de trânsito e garantias de entrega'
        ]
      },
      level4: {
        name: 'Nível 4: Execução de Projeto Chave na Mão',
        tagline: 'Transporte Interior, Montagem no Terreno, Comissionamento & Garantia',
        description: 'Gestão completa desde a fábrica até à montagem na obra, testes operacionais, formação de equipas e assistência técnica local pós-entrega.',
        cta: 'Discuter Execução de Projeto',
        deliverables: [
          'Logística integrada porta-a-porta até ao local definitivo da obra',
          'Engenharia de campo, montagem mecânica e elétrica especializada',
          'Comissionamento, testes de receção e formação certificada pelo OEM',
          'Disponibilização local de peças sobresselentes e contratos de manutenção'
        ]
      }
    },
    forms: {
      preferredLanguage: 'Idioma de Comunicação Preferido',
      preferredLanguageDesc: 'Idioma utilizado pela nossa equipa nas comunicações consigo',
      tenderLanguage: 'Idioma do Concurso / Proposta Técnica',
      tenderLanguageDesc: 'Idioma oficial exigido para o caderno de encargos e proposta',
      sameAsTenderDoc: 'Igual ao documento de licitação',
      otherSpecify: 'Outro / Especificar nas notas',
      targetMarket: 'Mercado Africano / País de Destino',
      suggestedLanguages: 'Sugerido para este mercado',
      fullName: 'Nome Completo',
      companyName: 'Empresa / Organização',
      emailAddress: 'E-mail Profissional',
      phoneNumber: 'Telefone / WhatsApp',
      serviceLevelNeeded: 'Nível de Serviço Pretendido',
      notesOrBoQ: 'Título do Concurso, Âmbito ou Detalhes do BoQ',
      uploadFiles: 'Carregar Documentos do Concurso (PDF, Excel, Word)',
      privacyNotice: 'Os seus documentos de compras estão protegidos por rigorosos padrões corporativos de confidencialidade.'
    },
    footer: {
      preFooterTag: 'INICIE O SEU PROCESSO DE COMPRAS',
      preFooterTitle: 'Tem uma Necessidade de Equipamento ou Matéria-Prima? Nós Fornecemos.',
      preFooterDesc: 'Indique-nos os seus requisitos para que a nossa equipa de compras trace a rota ideal—da fábrica internacional à entrega porta a porta em África.',
      tagline: 'Parceiro Global de Sourcing & Compras Industriais',
      corporateSubtitle: 'Enraizado na Etiópia · Vocacionado para África · Conectado ao Mundo',
      allRightsReserved: 'Todos os direitos reservados. Oranex Trading One Member PLC.'
    },
    hero: {
      kicker: 'Sourcing B2B · Importação Consolidada · Execução de Projetos',
      title: 'O Seu Parceiro Global de Sourcing & Compras',
      description: 'A Oranex conecta empresas e instituições na Etiópia e nos mercados africanos com fabricantes e fornecedores internacionais — desde o aprovisionamento e importação consolidada até à execução de concursos, entrega, montagem e suporte contínuo.',
      requestQuote: 'Solicitar Cotação',
      tellUsNeed: 'Diga-nos o que Precisa',
      haveTender: 'Tenho um Concurso / Licitação',
      pathwayTitle: 'Percurso Estruturado',
      pathwaySubtitle: 'Modelo Centrado nos Requisitos',
      pathwayDesc: 'Adaptamos as nossas capacidades às suas especificações exatas — desde um único contentor de matérias-primas até uma linha fabril completa chave na mão.'
    },
    whatDoYouNeed: {
      kicker: 'Três Vias Principais de Compras e Sourcing',
      title: 'O QUE PRECISA?',
      subtitle: 'Quer tenha um concurso formal, uma cotação, um pedido de fatura pró-forma ou apenas uma necessidade de produto, a ORANEX apoia na identificação, aquisição e entrega.',
      card1Title: 'CONCURSO PÚBLICO / FORMAL',
      card1Subtitle: 'Ministérios, Concessionárias, Obras Públicas & ONGs',
      card1Desc: 'Para entidades concorrentes que necessitam de auditoria técnica ao mapa de quantidades (BoQ), autorização OEM (MAF), montagem de dossiê e fornecimento chave na mão.',
      card1Cta: 'TENHO UM CONCURSO',
      card2Title: 'COTAÇÃO / PRÓ-FORMA',
      card2Subtitle: 'Faturas Pró-Forma Bancárias & Cotações Diretas',
      card2Desc: 'Para indústrias, construtores e empresas que necessitam de preços diretos de fábrica, faturas pró-forma para cartas de crédito bancárias (LC) e importação.',
      card2Cta: 'TENHO UMA COTAÇÃO',
      card3Title: 'NECESSIDADE DIRETA',
      card3Subtitle: 'Diga-nos o que precisa.',
      card3Desc: 'Não necessita de conhecer o fabricante ou código técnico. Descreva a sua necessidade com as informações que tiver—a nossa equipa localiza fornecedores qualificados globalmente.',
      card3Cta: 'DIGA-NOS O QUE PRECISA',
      secondaryTitle: 'Ou avance diretamente para uma categoria ou solução específica'
    },
    tenderSection: {
      badge: 'Apoio a Concursos em Toda a África',
      title: 'Tem um Concurso ou Licitação?',
      subtitle: 'Apoio a Aquisições nos Mercados Africanos',
      desc: 'Desde a avaliação do caderno de encargos e sourcing internacional até compras, importação e execução de projetos.',
      subDesc: 'Apoio a entidades públicas e privadas com análise técnica de requisitos, seleção de fabricantes OEM e entrega no terreno.',
      ctaUpload: 'Tenho um Concurso — Carregar BoQ',
      ctaExplore: 'Explorar Fluxo de Concursos',
      disclaimer: 'Os serviços de apoio a concursos estão sujeitos às regras de compras aplicáveis, autorização do cliente e legislação local. A Oranex não garante a adjudicação de contratos.'
    },
    coreProcess: {
      kicker: 'Ciclo Operacional de Ponta a Ponta',
      title: 'Do Fornecimento Global à Entrega Local',
      subtitle: 'Um percurso de execução estruturado em seis fases garantindo conformidade, inspeção de qualidade e entrega direta.'
    }
  },

  // Swahili (Kiswahili)
  sw: {
    nav: {
      home: 'Mwanzo',
      solutions: 'Suluhu Zetu',
      products: 'Bidhaa',
      industries: 'Sekta',
      tenders: 'Zabuni & Ununuzi',
      projects: 'Miradi',
      about: 'Kuhusu Sisi',
      contact: 'Wasiliana Nasi',
      businessServices: 'Huduma za Biashara',
      operationsPortal: 'Lango la Uendeshaji',
      supplierPartner: 'Ushirika wa Watengenezaji na Wasambazaji'
    },
    cta: {
      requestQuote: 'Omba Nukuu ya Bei',
      tellUsWhatYouNeed: 'Tuambie Unachohitaji',
      submitTender: 'WASILISHA ZABUNI YAKO',
      iHaveATender: 'Nina Zabuni / Ombi la Ugavi',
      iHaveAnRfq: 'NINA OMBI LA BEI / PROFORMA',
      notSureReviewIt: 'HUNA UHAKIKA? TUACHIE TUKAGUE',
      requestProposal: 'Omba Pendekezo la Mradi',
      uploadTender: 'Pakia Hati za Zabuni',
      requestProcurementSupport: 'Omba Usaidizi wa Ununuzi',
      discussProjectExecution: 'Jadili Utekelezaji wa Mradi',
      search: 'Tafuta',
      searchPlaceholder: 'Tafuta bidhaa, vifaa, zabuni (au bonyeza /)...',
      chatWhatsApp: 'Zungumza kupitia WhatsApp',
      viewDetails: 'Tazama Maelezo',
      contactUs: 'Wasiliana na Idara ya Ununuzi',
      exploreSolutions: 'Gundua Suluhu Zetu',
      browseCatalog: 'Kagua Orodha ya Bidhaa',
      downloadCatalog: 'Pakua Karatasi ya Vipimo',
      close: 'Funga',
      submit: 'Wasilisha Ombi',
      submitting: 'Inachakata...',
      submitted: 'Ombi Limewasilishwa Kikamilifu',
      filter: 'Chuja',
      clearFilter: 'Futa'
    },
    header: {
      topBarSlogan: 'CHANZO • UGAVI • UINGIZAJI • UFUKISHAJI • UTEKELEZAJI • MSAADA',
      ethiopiaRooted: 'Mzizi Ethiopia',
      africaFacing: 'Inayohudumia Afrika Nzima',
      directLine: 'Ofisi Kuu Addis Ababa',
      selectLanguage: 'Lugha',
      switchLanguage: 'Badilisha Lugha'
    },
    tenders: {
      badge: 'Usaidizi wa Zabuni na Ununuzi Afrika Nzima',
      heroTitle: 'Uhandisi wa Zabuni & Ununuzi wa Miradi Mikubwa Barani Afrika',
      heroSubtitle: 'Kutoka Tathmini ya Hati Hadi Utekelezaji Kamili Kwenye Mradi',
      heroDescription: 'Oranex inatoa viwango 5 vya usaidizi wa ununuzi na zabuni kwa taasisi za umma, wakandarasi na viwanda nchini Ethiopia na kanda nzima ya Afrika.',
      levelsHeading: 'Viwango 5 vya Huduma za Zabuni',
      levelsSubheading: 'Chagua kiwango sahihi cha usaidizi wa kiufundi, kibiashara na usafirishaji unaohitajiwa na shirika lako',
      comparisonTitle: 'Jedwali la Uwezo kwa Kila Kiwango cha Huduma',
      level0: {
        name: 'Kiwango cha 0: Tathmini ya Zabuni',
        tagline: 'Uwezekano, Uzingatiaji wa Kiufundi & Gharama za Kimataifa',
        description: 'Ukaguzi huru wa kiufundi na kibiashara wa hati za zabuni, orodha ya vifaa (BoQ) na uwezekano wa bei kabla ya kutoa rasilimali kushiriki.',
        cta: 'Omba Tathmini ya Zabuni',
        deliverables: [
          'Ukaguzi wa kina wa kufuata vipimo vya kiufundi kwenye BoQ',
          'Makadirio ya gharama kutoka viwandani na usafirishaji wa mizigo',
          'Uchambuzi wa hatari za kibiashara, forodha na upatikanaji wa fedha za kigeni',
          'Ripoti ya ushauri wa kimkakati ya kushiriki au kutoshiriki (Go / No-Go)'
        ]
      },
      level1: {
        name: 'Kiwango cha 1: Maandalizi ya Zabuni',
        tagline: 'Nyaraka za Kiufundi, Majedwali ya Kufuata Kanuni & Barua za OEM',
        description: 'Uandaaji wa majedwali ya kiufundi, uratibu wa vibali vya watengenezaji (MAF), na ukusanyaji wa vyeti na nyaraka zote za zabuni.',
        cta: 'Omba Maandalizi ya Zabuni',
        deliverables: [
          'Majedwali ya kina ya uthibitisho wa vipimo mstari kwa mstari',
          'Uratibu wa barua rasmi za idhini ya watengenezaji (MAF/OEM)',
          'Ukusanyaji wa vyeti vya majaribio, ISO, CE na karatasi za ubora',
          'Mipango ya upakiaji, ufungashaji, usafirishaji na masharti ya Incoterms'
        ]
      },
      level2: {
        name: 'Kiwango cha 2: Utafutaji + Maandalizi ya Zabuni',
        tagline: 'Kutambua Watengenezaji, Majadiliano ya Bei & Kifurushi Kamili',
        description: 'Kutafuta watengenezaji bora kote Asia, Ulaya na Marekani, kujadili bei shindani na kuandaa kifurushi chote cha zabuni kwa niaba yako.',
        cta: 'Omba Utafutaji na Maandalizi',
        deliverables: [
          'Uchunguzi wa kina wa bei bora za viwandani duniani kote',
          'Kuunganisha nukuu za bei na kuboresha faida ya zabuni',
          'Uratibu wa dhamana za benki na mipangilio ya malipo',
          'Kifurushi kilichokamilika tayari kuwasilishwa kwenye zabuni'
        ]
      },
      level3: {
        name: 'Kiwango cha 3: Ugavi Kamili wa Zabuni',
        tagline: 'Maagizo ya Kiwanda, Ukaguzi wa Ubora, Usafirishaji & Bandarini',
        description: 'Utekelezaji kamili baada ya kushinda: usimamizi wa uzalishaji kiwandani, hati za mikopo (LC), usafirishaji wa mizigo na uwasilishaji bandarini.',
        cta: 'Omba Ugavi Kamili wa Zabuni',
        deliverables: [
          'Usimamizi wa uzalishaji na ukaguzi kabla ya kusafirisha (SGS / BV)',
          'Uendeshaji wa hati za mikopo (LC) na ufadhili wa biashara',
          'Usafirishaji wa kimataifa (FOB / CIF / CIP) hadi bandari za Afrika',
          'Uondoshaji wa forodha na dhamana za usafirishaji'
        ]
      },
      level4: {
        name: 'Kiwango cha 4: Utekelezaji Kamili wa Miradi (Turnkey)',
        tagline: 'Ugavi Kamili, Usafiri wa Ndani, Ufungaji & Kuwasha Mitambo',
        description: 'Utekelezaji kuanzia kiwandani hadi ufungaji site, majaribio ya uendeshaji, mafunzo ya watumiaji na udhamini wa kiufundi nchini.',
        cta: 'Jadili Utekelezaji wa Mradi',
        deliverables: [
          'Usafirishaji wa moja kwa moja kutoka kiwandani hadi eneo la mradi',
          'Uhandisi wa eneo husika, ufungaji wa mifumo ya mitambo na umeme',
          'Kuwasha mitambo, majaribio na mafunzo yaliyoidhinishwa na watengenezaji',
          'Hifadhi ya vipuri na mikataba ya matengenezo ya muda mrefu (SLA)'
        ]
      }
    },
    forms: {
      preferredLanguage: 'Lugha Inayopendekezwa ya Mawasiliano',
      preferredLanguageDesc: 'Lugha ambayo timu yetu itaitumia kuwasiliana nawe',
      tenderLanguage: 'Lugha Inayopendekezwa ya Zabuni / Pendekezo',
      tenderLanguageDesc: 'Lugha inayohitajika kisheria kwenye hati za zabuni',
      sameAsTenderDoc: 'Sawa na hati ya zabuni',
      otherSpecify: 'Nyingine / Eleza kwenye maelezo',
      targetMarket: 'Soko la Afrika / Nchi Inayolengwa',
      suggestedLanguages: 'Inayopendekezwa kwa soko hili',
      fullName: 'Jina Kamili',
      companyName: 'Kampuni / Shirika',
      emailAddress: 'Barua Pepe Rasmi ya Kazi',
      phoneNumber: 'Nambari ya Simu / WhatsApp',
      serviceLevelNeeded: 'Kiwango cha Huduma Kinachohitajika',
      notesOrBoQ: 'Jina la Zabuni, Upeo au Maelezo ya Orodha ya Vifaa (BoQ)',
      uploadFiles: 'Pakia Hati za Zabuni na BoQ (PDF, Excel, Word)',
      privacyNotice: 'Nyaraka zako zinalindwa kwa usiri mkubwa na viwango vya kisheria vya kibiashara.'
    },
    footer: {
      preFooterTag: 'ANZA SAFARI YAKO YA UNUNUZI NA UGAVI',
      preFooterTitle: 'Je, Una Mahitaji ya Vifaa au Malighafi? Tutakuunganisha na Viwanda.',
      preFooterDesc: 'Tuambie unachohitaji ili wataalamu wetu wa ununuzi wapange njia sahihi—kutoka viwanda vya kimataifa hadi eneo lako barani Afrika.',
      tagline: 'Mshirika Wako wa Kimataifa wa Ununuzi na Ugavi wa Viwandani',
      corporateSubtitle: 'Mzizi Ethiopia · Inayohudumia Afrika Nzima · Imeunganishwa Duniani',
      allRightsReserved: 'Haki zote zimehifadhiwa. Oranex Trading One Member PLC.'
    },
    hero: {
      kicker: 'Ugavi wa Biashara · Uingizaji Uliounganishwa · Utekelezaji wa Miradi',
      title: 'Mshirika Wako wa Kimataifa wa Ununuzi na Ugavi',
      description: 'Oranex inaunganisha biashara na taasisi nchini Ethiopia na masoko kote barani Afrika na watengenezaji na wasambazaji wa kimataifa — kuanzia ununuzi na uingizaji mizigo hadi utekelezaji wa zabuni, usafirishaji na usakinishaji.',
      requestQuote: 'Omba Nukuu ya Bei',
      tellUsNeed: 'Tuambie Unachohitaji',
      haveTender: 'Nina Zabuni / Ombi la Ugavi',
      pathwayTitle: 'Mchakato Uliopangwa',
      pathwaySubtitle: 'Mfumo Unaolenga Mahitaji Yako',
      pathwayDesc: 'Tunaweka uwezo wetu kulingana na vipimo vyako kamili — iwe kontena la kemikali, mtambo kamili wa kiwanda, au zabuni ya taasisi.'
    },
    whatDoYouNeed: {
      kicker: 'Njia Tatu Kuu za Ununuzi na Ugavi',
      title: 'UNAHITAJI NINI?',
      subtitle: 'Iwe una zabuni rasmi, ombi la bei (RFQ), ombi la ankara ya proforma au hitaji la bidhaa, ORANEX inakusaidia kutafuta, kununua na kufikisha.',
      card1Title: 'ZABUNI RASMI',
      card1Subtitle: 'Zabuni za Serikali, Wizara, Mashirika ya Umma na NGO',
      card1Desc: 'Kwa mashirika yanayoshiriki zabuni za umma na za kibiashara yanayohitaji ukaguzi wa orodha ya vifaa (BoQ), vibali vya kiwanda cha OEM na uwasilishaji kamili.',
      card1Cta: 'NINA ZABUNI',
      card2Title: 'OMBI LA BEI / PROFORMA',
      card2Subtitle: 'Ankara za Benki za Proforma na Nukuu za Biashara',
      card2Desc: 'Kwa wafanyabiashara, viwanda na wakandarasi wanaohitaji bei za moja kwa moja za kiwanda, ankara za proforma kwa hati za mkopo (LC) na uagizaji wa moja kwa moja.',
      card2Cta: 'NINA OMBI LA BEI',
      card3Title: 'HITAJI LA MOJA KWA MOJA',
      card3Subtitle: 'Tuambie unachohitaji.',
      card3Desc: 'Huna haja ya kujua mtengenezaji au nambari ya kiufundi. Eleza unachohitaji na maelezo yoyote uliyo nayo—idara yetu ya ununuzi itapata wasambazaji walioidhinishwa duniani kote.',
      card3Cta: 'TUAMBIE UNACHOHITAJI',
      secondaryTitle: 'Au nenda moja kwa moja kwenye kategoria au suluhu mahususi'
    },
    tenderSection: {
      badge: 'Usaidizi wa Zabuni Afrika Nzima',
      title: 'Je, Una Zabuni?',
      subtitle: 'Usaidizi wa Ununuzi Kote Afrika',
      desc: 'Kuanzia tathmini ya hati na ununuzi wa kimataifa hadi uagizaji, uwasilishaji na utekelezaji wa mradi.',
      subDesc: 'Kusaidia mashirika kwa ukaguzi wa kina wa zabuni, upatikanaji wa watengenezaji wa OEM, na uwasilishaji kwenye maeneo ya miradi barani Afrika.',
      ctaUpload: 'Nina Zabuni — Pakia BoQ',
      ctaExplore: 'Gundua Hatua za Zabuni',
      disclaimer: 'Usaidizi wa zabuni unafuata sheria za ununuzi, idhini ya mteja, na kanuni za eneo husika. Oranex haitoi hakikisho la kushinda zabuni.'
    },
    coreProcess: {
      kicker: 'Mzunguko Kamili wa Utendaji',
      title: 'Kutoka Kiwandani Hadi Eneo la Mradi',
      subtitle: 'Njia iliyopangwa katika hatua sita inayohakikisha kufuata kanuni, ukaguzi wa ubora na uwasilishaji wa uhakika.'
    }
  },

  // Amharic (አማርኛ)
  am: {
    nav: {
      home: 'ዋና ገጽ',
      solutions: 'አገልግሎቶች',
      products: 'ምርቶች',
      industries: 'የኢንዱስትሪ ዘርፎች',
      tenders: 'ጨረታዎች እና ግዥ',
      projects: 'ፕሮጀክቶች',
      about: 'ስለ ኦራኔክስ',
      contact: 'አግኙን',
      businessServices: 'የንግድ አገልግሎቶች',
      operationsPortal: 'የኦፕሬሽን ፖርታል',
      supplierPartner: 'የአምራቾች እና አቅራቢዎች አጋርነት'
    },
    cta: {
      requestQuote: 'ዋጋ ይጠይቁ',
      tellUsWhatYouNeed: 'የሚፈልጉትን ይንገሩን',
      submitTender: 'ጨረታዎን ያስገቡ',
      iHaveATender: 'ጨረታ አለኝ',
      iHaveAnRfq: 'የዋጋ ማወዳደሪያ / ፕሮፎርማ አለኝ',
      notSureReviewIt: 'እርግጠኛ አይደሉም? እንመርምረው',
      requestProposal: 'የፕሮፖዛል ጥያቄ',
      uploadTender: 'የጨረታ ሰነድ ይጫኑ',
      requestProcurementSupport: 'የግዥ ድጋፍ ይጠይቁ',
      discussProjectExecution: 'ስለ ፕሮጀክት አፈጻጸም ይወያዩ',
      search: 'ይፈልጉ',
      searchPlaceholder: 'ምርቶችን፣ ጥሬ ዕቃዎችን፣ ጨረታዎችን ይፈልጉ (ወይም / ይጫኑ)...',
      chatWhatsApp: 'በዋትስአፕ ያነጋግሩን',
      viewDetails: 'ዝርዝሩን ይመልከቱ',
      contactUs: 'የግዥ ቡድናችንን ያነጋግሩ',
      exploreSolutions: 'መፍትሄዎችን ያስሱ',
      browseCatalog: 'የምርት ካታሎግ ይመልከቱ',
      downloadCatalog: 'ቴክኒካል ዝርዝር ያውርዱ',
      close: 'ዝጋ',
      submit: 'ጥያቄውን ላክ',
      submitting: 'በመላክ ላይ...',
      submitted: 'ጥያቄዎ በተሳካ ሁኔታ ደርሷል',
      filter: 'አጣራ',
      clearFilter: 'አጽዳ'
    },
    header: {
      topBarSlogan: 'ምንጭ ፍለጋ • አቅርቦት • ማስመጣት • ማድረስ • ፕሮጀክት ማስኬድ • የቴክኒክ ድጋፍ',
      ethiopiaRooted: 'ኢትዮጵያ ውስጥ የተመሰረተ',
      africaFacing: 'መላው አፍሪካን የሚያገለግል',
      directLine: 'የአዲስ አበባ ዋና ቢሮ',
      selectLanguage: 'ቋንቋ',
      switchLanguage: 'ቋንቋ ቀይር'
    },
    tenders: {
      badge: 'አፍሪካ አቀፍ የጨረታ እና የግዥ ድጋፍ አገልግሎት',
      heroTitle: 'የጨረታ ኢንጂነሪንግ እና የፕሮጀክት ግዥ አገልግሎት በመላው አፍሪካ',
      heroSubtitle: 'ከሰነድ ግምገማ ጀምሮ እስከ ሙሉ ፕሮጀክት ተከላ እና ማስረከብ',
      heroDescription: 'ኦራኔክስ በመላው ኢትዮጵያ እና በአፍሪካ ሀገራት ለሚገኙ የመንግስት እና የግል ተቋማት፣ ተቋራጮች እና ኢንዱስትሪዎች 5 ተለዋዋጭ የጨረታ እና የግዥ ድጋፍ ደረጃዎችን ያቀርባል።',
      levelsHeading: '5ቱ የጨረታ አገልግሎት ደረጃዎች',
      levelsSubheading: 'ድርጅትዎ የሚፈልገውን ትክክለኛ የንግድ፣ ቴክኒካል እና የትራንስፖርት ድጋፍ ደረጃ ይምረጡ',
      comparisonTitle: 'የአገልግሎት ደረጃዎች ንጽጽር ሰንጠረዥ',
      level0: {
        name: 'ደረጃ 0: የጨረታ ሰነድ ግምገማ (Tender Assessment)',
        tagline: 'አዋጭነት፣ ቴክኒካል ተስማሚነት እና የዓለም አቀፍ ዋጋ ቅኝት',
        description: 'በጨረታው ላይ ለመሳተፍ ሀብት እና ጊዜ ከማፍሰስዎ በፊት የጨረታ ሰነዱን፣ የቢል ኦፍ ኳንቲቲ (BoQ) ተስማሚነት እና የአለም አቀፍ የፋብሪካ ዋጋዎችን ገለልተኛ ግምገማ ማካሄድ።',
        cta: 'የሰነድ ግምገማ ይጠይቁ',
        deliverables: [
          'የቴክኒካል ስፔስፊኬሽን እና የBoQ ጥልቅ ተስማሚነት ኦዲት',
          'የመጀመሪያ ደረጃ የአምራች ፋብሪካ ዋጋ እና የጭነት ትራንስፖርት አዋጭነት',
          'የንግድ፣ የጉምሩክ እና የውጭ ምንዛሪ አደጋዎች ፍተሻ',
          'በጨረታው ላይ ለመሳተፍ ወይም ላለመሳተፍ የሚረዳ ስልታዊ የምክር ሰነድ (Go / No-Go)'
        ]
      },
      level1: {
        name: 'ደረጃ 1: የጨረታ ሰነድ ዝግጅት (Tender Preparation)',
        tagline: 'ቴክኒካል ዶሴ፣ የተስማሚነት ሠንጠረዦች እና የአምራች ፈቃድ ማስተባበር',
        description: 'የቴክኒካል ተስማሚነት ሠንጠረዦችን ማዘጋጀት፣ ከአምራች ፋብሪካዎች ፈቃድ (MAF) ማስተባበር እና የተሟላ የጨረታ ሰነድ ማዘጋጀት።',
        cta: 'የሰነድ ዝግጅት ድጋፍ ይጠይቁ',
        deliverables: [
          'ዝርዝር የቴክኒካል ስፔስፊኬሽን ተስማሚነት ሠንጠረዦች',
          'የአምራች ህጋዊ የውክልና ደብዳቤዎችን (MAF/OEM) ማስተባበር',
          'የፋብሪካ የጥራት ሰርተፊኬቶች (ISO, CE) እና የፍተሻ ሰነዶች ማሰባሰብ',
          'የማሸጊያ፣ የጭነት እና የኢንኮተርምስ (Incoterms) እቅድ ዝግጅት'
        ]
      },
      level2: {
        name: 'ደረጃ 2: አምራች መፈለግ + የጨረታ ሰነድ ዝግጅት',
        tagline: 'ፋብሪካዎችን መለየት፣ ዋጋ መደራደር እና የተሟላ የጨረታ ጥቅል ማዘጋጀት',
        description: 'በእስያ፣ አውሮፓ እና አሜሪካ ጥራት ያላቸውን አምራቾች መፈለግ፣ ተወዳዳሪ ዋጋ መደራደር እና ለድርጅትዎ የተሟላ የጨረታ ሰነድ አዘጋጅቶ ማስረከብ።',
        cta: 'አምራች ፍለጋ እና ዝግጅት ይጠይቁ',
        deliverables: [
          'ቀጥታ ከዓለም አቀፍ ፋብሪካዎች ምርጥ ዋጋ ማግኘት እና አምራቾችን ማረጋገጥ',
          'የፋብሪካ የዋጋ ዝርዝሮችን ማጠናቀር እና አትራፊነትን ማመቻቸት',
          'የጨረታ ማስከበሪያ ዋስትናዎችን እና የክፍያ ሁኔታዎችን ማስተባበር',
          'ለማስገባት ዝግጁ የሆነ ሙሉ የጨረታ ሰነድ ጥቅል'
        ]
      },
      level3: {
        name: 'ደረጃ 3: ሙሉ የጨረታ አቅርቦት አገልግሎት',
        tagline: 'የፋብሪካ ትዕዛዝ፣ የጥራት ፍተሻ፣ የባህር/አየር ጭነት እና ወደብ ማድረስ',
        description: 'ጨረታው ካሸነፈ በኋላ ሙሉ አቅርቦት፡ የፋብሪካ ምርት ክትትል፣ የኤልሲ (LC) ሰነዶች ማስተባበር፣ ዓለም አቀፍ ጭነት እና ጅቡቲ ወይም ሌሎች ወደቦች ማድረስ።',
        cta: 'ሙሉ የጨረታ አቅርቦት ይጠይቁ',
        deliverables: [
          'የፋብሪካ ምርት ሂደት ክትትል እና የቅድመ-ጭነት ጥራት ፍተሻ (SGS / BV)',
          'የሌተር ኦፍ ክሬዲት (LC) እና ዓለም አቀፍ የንግድ ፋይናንስ ማስተባበር',
          'ዓለም አቀፍ የባህር እና አየር ትራንስፖርት (FOB / CIF / CIP) እስከ ወደብ',
          'የጉምሩክ ትራንዚት ሰነዶች እና የመላኪያ ዋስትናዎች'
        ]
      },
      level4: {
        name: 'ደረጃ 4: ሙሉ የፕሮጀክት እና የጨረታ አፈጻጸም (Turnkey)',
        tagline: 'የሀገር ውስጥ ትራንስፖርት፣ በሳይት ላይ ተከላ፣ ስራ ማስጀመር እና ዋስትና',
        description: 'ከፋብሪካ በር ጀምሮ እስከ ፕሮጀክት ሳይት ድረስ ሙሉ ኃላፊነት፡ የሀገር ውስጥ ትራንስፖርት፣ ሜካኒካል እና ኤሌክትሪካል ተከላ፣ ስራ ማስጀመር፣ ስልጠና እና ዋስትና።',
        cta: 'ስለ ፕሮጀክት አፈጻጸም ይወያዩ',
        deliverables: [
          'ከፋብሪካ በር እስከ ፕሮጀክቱ ሳይት ድረስ ሙሉ የበር-ለበር ትራንስፖርት',
          'በሳይት ላይ የቴክኒክ ተከላ (ሜካኒካል፣ ኤሌክትሪካል እና ሲቪል)',
          'ማሽነሪዎችን ስራ ማስጀመር፣ የሙከራ ፍተሻ እና የአምራች ሰርተፊኬት ስልጠና',
          'የመለዋወጫ ዕቃዎች አቅርቦት እና የረጅም ጊዜ የጥገና ስምምነቶች (SLA)'
        ]
      }
    },
    forms: {
      preferredLanguage: 'ተመራጭ የመገናኛ ቋንቋ',
      preferredLanguageDesc: 'የእኛ ቡድን ከእርስዎ ጋር በሚገናኝበት ጊዜ የሚጠቀመው ቋንቋ',
      tenderLanguage: 'ተመራጭ የጨረታ / የፕሮፖዛል ቋንቋ',
      tenderLanguageDesc: 'ለጨረታው ሰነድ እና ለቴክኒካል ዝርዝሮች የሚያስፈልገው ይፋዊ ቋንቋ',
      sameAsTenderDoc: 'እንደ ጨረታው ሰነድ ተመሳሳይ',
      otherSpecify: 'ሌላ / በማስታወሻው ላይ ይጥቀሱ',
      targetMarket: 'የታለመው የአፍሪካ ገበያ / ሀገር',
      suggestedLanguages: 'ለዚህ ገበያ የሚመከሩ ቋንቋዎች',
      fullName: 'ሙሉ ስም',
      companyName: 'ድርጅት / ኩባንያ',
      emailAddress: 'የስራ ኢሜይል',
      phoneNumber: 'ስልክ ቁጥር / ዋትስአፕ',
      serviceLevelNeeded: 'የሚፈለገው የአገልግሎት ደረጃ',
      notesOrBoQ: 'የጨረታው ርዕስ፣ ዝርዝር ወይም የBoQ መረጃ',
      uploadFiles: 'የጨረታ ሰነድ፣ ስፔስፊኬሽን ወይም BoQ ይጫኑ (PDF, Excel, Word)',
      privacyNotice: 'የሚልኩልን የጨረታ ሰነዶች በከፍተኛ የድርጅት ሚስጥራዊነት እና ህጋዊ ጥበቃ የተጠበቁ ናቸው።'
    },
    footer: {
      preFooterTag: 'የግዥ እና አቅርቦት ሂደትዎን አሁኑኑ ይጀምሩ',
      preFooterTitle: 'የማሽነሪ ወይም የጥሬ ዕቃ ፍላጎት አለዎት? ከዓለም አቀፍ ፋብሪካዎች እናቀርባለን።',
      preFooterDesc: 'የሚፈልጉትን ይንገሩን እና የግዥ ቡድናችን ከዓለም አቀፍ አምራች ፋብሪካዎች ጀምሮ እስከ በርዎ ድረስ ተስማሚውን መንገድ ያመቻቻል።',
      tagline: 'ዓለም አቀፍ የፋብሪካ ምርቶች ምንጭ ፍለጋ እና የኢንዱስትሪ ግዥ አጋርዎ',
      corporateSubtitle: 'ኢትዮጵያ ውስጥ የተመሰረተ · መላው አፍሪካን የሚያገለግል · ከዓለም ጋር የተገናኘ',
      allRightsReserved: 'መብቱ በህግ የተጠበቀ ነው። ኦራኔክስ ትሬዲንግ ዋን ሜምበር ኃ/የተ/የግ/ማህበር።'
    },
    hero: {
      kicker: 'የቢዝነስ ግዥና ምንጭ ፍለጋ • የተጠቃለለ ጭነት • የፕሮጀክት አፈጻጸም',
      title: 'የዓለም አቀፍ ግዥ እና አቅርቦት አጋርዎ',
      description: 'ኦራኔክስ በኢትዮጵያ እና በመላው አፍሪካ የሚገኙ የንግድ ተቋማትን እና ድርጅቶችን ከዓለም አቀፍ አምራቾች እና አቅራቢዎች ጋር ያገናኛል — ከምንጭ ፍለጋ እና ዕቃዎችን አጠቃሎ ከማስመጣት ጀምሮ እስከ ጨረታ አፈጻጸም፣ ማጓጓዝ፣ ተከላ እና የቴክኒክ ድጋፍ።',
      requestQuote: 'ዋጋ ይጠይቁ',
      tellUsNeed: 'የሚፈልጉትን ይንገሩን',
      haveTender: 'ጨረታ አለኝ',
      pathwayTitle: 'የተዋቀረ አሰራር',
      pathwaySubtitle: 'በፍላጎትዎ ላይ የተመሰረተ ሞዴል',
      pathwayDesc: 'አንድ ኮንቴነር የኢንዱስትሪ ኬሚካል፣ የተሟላ የፋብሪካ ማምረቻ መስመር ወይም የከፍተኛ ተቋም ጨረታ ይሁን—አቅማችንን ባስቀመጡት ትክክለኛ ቴክኒካል ስፔስፊኬሽን ዙሪያ እናሰማራለን።'
    },
    whatDoYouNeed: {
      kicker: 'ሦስቱ ዋና ዋና የግዥና የምንጭ ፍለጋ መንገዶች',
      title: 'ምን ማግኘት ይፈልጋሉ?',
      subtitle: 'መደበኛ ጨረታ፣ የዋጋ ማወዳደሪያ (RFQ)፣ የባንክ ፕሮፎርማ ወይም በቀላሉ የምርት ፍላጎት ካለዎት፣ ኦራኔክስ በቀጥታ ከፋብሪካ ፈልጎ በማስመጣትና በማድረስ ሊያግዝዎት ዝግጁ ነው።',
      card1Title: 'መደበኛ ጨረታ',
      card1Subtitle: 'የመንግስት፣ ሚኒስቴሮች፣ መሠረተ-ልማት እና የረድኤት ድርጅቶች ጨረታ',
      card1Desc: 'ጥልቅ የBoQ ሰነድ ግምገማ፣ የቀጥታ አምራች ፋብሪካ ፈቃድ ደብዳቤ (MAF)፣ የጨረታ ሰነድ ዝግጅት እና ከውድድር በኋላ የተሟላ የማስመጣትና የተከላ አቅርቦት ለሚፈልጉ ተቋማት።',
      card1Cta: 'ጨረታ አለኝ',
      card2Title: 'የዋጋ ማወዳደሪያ / ፕሮፎርማ (RFQ)',
      card2Subtitle: 'የባንክ ፕሮፎርማ ኢንቮይስ እና የንግድ ዋጋ ጥያቄ',
      card2Desc: 'ትክክለኛ የፋብሪካ ዋጋ፣ ለባንክ ሌተር ኦፍ ክሬዲት (LC) ወይም የውጭ ምንዛሬ ፈቃድ የሚያስፈልግ ፕሮፎርማ እና ቀጥታ ዕቃዎችን ለማስመጣት ለሚፈልጉ ፋብሪካዎችና ነጋዴዎች።',
      card2Cta: 'የዋጋ ጥያቄ / ፕሮፎርማ አለኝ',
      card3Title: 'ቀጥታ ፍላጎት',
      card3Subtitle: 'የሚፈልጉትን ይንገሩን።',
      card3Desc: 'አምራቹን ወይም የቴክኒክ ኮዱን ማወቅ አይጠበቅብዎትም። የሚፈልጉትን ዝርዝር መረጃ ይስጡን—የግዥ ቡድናችን ከአለም አቀፍ አስተማማኝ አምራቾች ያፈላልግልዎታል።',
      card3Cta: 'የሚፈልጉትን ይንገሩን',
      secondaryTitle: 'ወይም በቀጥታ ወደሚፈልጉት የምርት ዘርፍ ይሂዱ'
    },
    tenderSection: {
      badge: 'አፍሪካ አቀፍ የጨረታ እና የግዥ ድጋፍ አገልግሎት',
      title: 'ጨረታ አለዎት?',
      subtitle: 'የግዥ እና ጨረታ ድጋፍ በመላው አፍሪካ',
      desc: 'ከሰነድ እና ስፔስፊኬሽን ግምገማ ጀምሮ እስከ ዓለም አቀፍ አምራቾች ምንጭ ፍለጋ፣ ማስመጣት እና ፕሮጀክት ማስረከብ።',
      subDesc: 'የመንግስትና የግል ተቋማትን በጨረታ ሰነድ ዝግጅት፣ ዓለም አቀፍ የፋብሪካ አቅርቦት እና ወደ ሀገር ውስጥ በማስገባት የተሟላ ድጋፍ መስጠት።',
      ctaUpload: 'ጨረታ አለኝ — BoQ ይጫኑ',
      ctaExplore: 'የጨረታ አሰራር ሂደቱን ይመልከቱ',
      disclaimer: 'የጨረታ እና የግዥ ድጋፍ የሚከናወነው በሚመለከታቸው የግዥ ህጎች፣ የደንበኛው ፈቃድ እና የአካባቢው ደንቦች መሰረት ነው። ኦራኔክስ የጨረታ አሸናፊነት ዋስትና አይሰጥም።'
    },
    coreProcess: {
      kicker: 'የተሟላ የሥራ ሂደት',
      title: 'ከዓለም አቀፍ አቅርቦት እስከ በርዎ ድረስ',
      subtitle: 'ተስማሚነትን፣ ጥራትን እና አስተማማኝ ማድረስን የሚያረጋግጥ የስድስት ደረጃዎች አሰራር።'
    }
  }
};
