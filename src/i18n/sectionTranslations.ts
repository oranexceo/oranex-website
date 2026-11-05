import { LanguageCode } from './languages';

export interface SectionTranslations {
  heroExtra: {
    microBar: {
      regions: string;
      portTransit: string;
      verifiedDocs: string;
    };
    corridor: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      exploreBtn: string;
    };
  };
  quickEntryExtra: {
    pathway01Badge: string;
    pathway02Badge: string;
    pathway03Badge: string;
    routingKicker: string;
    customSpecPrompt: string;
  };
  solutionsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    viewAllBtn: string;
    solutions: {
      id: string;
      title: string;
      desc: string;
      features: string[];
    }[];
  };
  tenderSectionExtra: {
    pipelineTitle: string;
    stageCount: string;
    inboundTitle: string;
    inboundPoints: string[];
    deliveredTitle: string;
    deliveredPoints: string[];
  };
  oranexOem: {
    kicker: string;
    title: string;
    quote: string;
    desc: string;
    exploreBtn: string;
    requestBtn: string;
    categoriesTitle: string;
    categories: string[];
    processTitle: string;
    processFlow: string[];
  };
  privateLabelAndFMCG: {
    privateLabel: {
      kicker: string;
      title: string;
      desc: string;
      pathwayTitle: string;
      process: string[];
      requestBtn: string;
    };
    fmcg: {
      kicker: string;
      title: string;
      desc: string;
      pathwayTitle: string;
      process: string[];
      requestBtn: string;
    };
  };
  tellUsRequirement: {
    kicker: string;
    title: string;
    subtitle: string;
    directHelpPrompt: string;
    directHelpLink: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      productOrScope: string;
      specificationDetails: string;
      quantity: string;
      unit: string;
      application: string;
      brandPreference: string;
      manufacturerPreference: string;
      deliveryLocation: string;
      targetDate: string;
      notes: string;
      uploadTitle: string;
      uploadHint: string;
      submitBtn: string;
      submitting: string;
      successTitle: string;
      successDesc: string;
      submitAnother: string;
    };
  };
  businessServicesSection: {
    kicker: string;
    title: string;
    subtitle: string;
    exploreServicesBtn: string;
  };
  headerNavExtra: {
    solutionsItems: { id: string; title: string; desc: string }[];
    industryItems: { id: string; title: string }[];
    aboutItems: { id: string; title: string }[];
  };
  footerExtra: {
    partnerText: string;
    positioning: string;
    aboutDesc: string;
    colSolutions: string;
    colIndustries: string;
    colQuickAccess: string;
    colInstitutional: string;
    legalDisclaimer: string;
    allRightsReserved: string;
  };
  modals: {
    quoteTitle: string;
    quoteSubtitle: string;
    requirementTitle: string;
    requirementSubtitle: string;
    tenderTitle: string;
    tenderSubtitle: string;
    searchTitle: string;
    searchPlaceholder: string;
    whatsappTitle: string;
    whatsappSubtitle: string;
    close: string;
    submit: string;
    submitting: string;
    success: string;
    countryPlaceholder: string;
    preferredLanguage: string;
  };
}

export const SECTION_TRANSLATIONS: Record<LanguageCode, SectionTranslations> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    heroExtra: {
      microBar: {
        regions: 'Europe · Asia · Middle East · Americas',
        portTransit: 'Djibouti & Modjo Dry Port Transit',
        verifiedDocs: 'Verified Technical TDS & COA'
      },
      corridor: {
        step1Title: 'Input Specification:',
        step1Desc: 'You provide parameters, drawings, or sample requirement.',
        step2Title: 'International Vetting:',
        step2Desc: 'Oranex matches with certified factories and OEMs.',
        step3Title: 'Direct Delivery:',
        step3Desc: 'Consolidation, freight, customs clearance, and yard handover.',
        exploreBtn: 'Explore Procurement Solutions →'
      }
    },
    quickEntryExtra: {
      pathway01Badge: 'Pathway 01 · Formal Tender',
      pathway02Badge: 'Pathway 02 · RFQ / Proforma',
      pathway03Badge: 'Pathway 03 · Direct Requirement',
      routingKicker: 'Direct Solution Routing',
      customSpecPrompt: 'Have a specialized custom spec?'
    },
    solutionsSection: {
      kicker: 'Tailored Commercial Models',
      title: 'Procurement Built Around Your Requirement',
      subtitle: 'From one-off machinery acquisitions to continuous raw material pipelines, explore our core procurement capabilities.',
      viewAllBtn: 'View All Detailed Solution Pathways',
      solutions: [
        {
          id: 'international-sourcing',
          title: 'International Sourcing',
          desc: 'Manufacturer and supplier sourcing, technical coordination, quotation and sample/trial support.',
          features: ['Direct factory verification', 'Independent pre-shipment inspection', 'TDS & COA technical matching']
        },
        {
          id: 'industrial-supply',
          title: 'Industrial Supply',
          desc: 'Raw materials, chemicals, additives, machinery, packaging, spare parts and recurring supply.',
          features: ['Scheduled quarterly container allocations', 'Buffer stock management', 'Continuous production reliability']
        },
        {
          id: 'consolidated-import',
          title: 'Consolidated Import',
          desc: 'Aggregate multiple requirements and coordinate international procurement and shipment.',
          features: ['Multi-supplier cargo staging', 'Single unified customs entry', 'Djibouti/Modjo demurrage mitigation']
        },
        {
          id: 'tenders',
          title: 'Tender & Procurement',
          desc: 'Support from opportunity assessment and sourcing through procurement and delivery.',
          features: ['BoQ and technical compliance matrices', 'Manufacturer Authorization Letters', 'Institutional contract delivery']
        },
        {
          id: 'oranex-oem',
          title: 'Oranex OEM',
          desc: 'Consolidated industrial supply for growing factories and businesses.',
          features: ['Custom tooling & CAD tolerance checks', 'High-wear component metallurgy', 'Factory acceptance testing (FAT)']
        },
        {
          id: 'project-solutions',
          title: 'Project Solutions',
          desc: 'Equipment sourcing, delivery, installation, commissioning, training and support.',
          features: ['In-country technical engineer supervision', 'Trial run batch testing', 'Operator training & manuals handover']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: 'Tender Execution Pipeline',
      stageCount: 'Stage 1 → 10',
      inboundTitle: 'Inbound Tender Dossier',
      inboundPoints: [
        'BoQ / Bill of Quantities breakdown',
        'Minimum technical specification audit',
        'Manufacturer Authorization Letter (MAL)',
        'Milestone & penalty risk assessment'
      ],
      deliveredTitle: 'Delivered Project & Handover',
      deliveredPoints: [
        'Consolidated ocean/air freight & transit',
        'On-site installation & cold/hot testing',
        'Operator training & manuals in English/Amharic',
        'Commercial warranty & after-sales parts'
      ]
    },
    oranexOem: {
      kicker: 'Oranex OEM Framework',
      title: 'Industrial Supply for Growing Businesses',
      quote: '«Consolidated international sourcing for factories and businesses that need reliable access to industrial materials and products.»',
      desc: 'Growing production plants in Ethiopia often struggle with high MOQ requirements, complex foreign exchange allocations, and inconsistent delivery timelines. Oranex OEM bridges this divide by aggregating demand, establishing direct contract manufacturing pipelines, and delivering continuous factory inputs directly to your warehouse.',
      exploreBtn: 'Explore Oranex OEM',
      requestBtn: 'Request Supply Framework',
      categoriesTitle: 'Core Industrial Supply Categories',
      categories: [
        'Raw materials',
        'Industrial chemicals',
        'Construction chemicals',
        'Additives & Modifiers',
        'Polymers & Masterbatches',
        'Industrial packaging',
        'Industrial consumables',
        'Precision spare parts',
        'Selected manufacturing equipment'
      ],
      processTitle: 'OEM Supply Sequence',
      processFlow: [
        'CUSTOMER REQUIREMENT',
        'ORANEX REVIEW',
        'INTERNATIONAL SOURCING',
        'MANUFACTURER/OEM',
        'CONSOLIDATION',
        'ETHIOPIA DELIVERY'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: 'Contract Manufacturing',
        title: 'Your Brand. Your Specifications. Our Supply Network.',
        desc: '«For selected products and recurring requirements, Oranex can coordinate manufacturer sourcing and customer-brand/private-label supply arrangements where commercially and technically appropriate.»',
        pathwayTitle: 'Private Label Production Pathway',
        process: [
          'CUSTOMER SPECIFICATION',
          'MANUFACTURER VETTING',
          'TECHNICAL APPROVAL',
          'PRODUCTION',
          'BRANDING',
          'SHIPMENT',
          'RECURRING SUPPLY'
        ],
        requestBtn: 'Inquire About Private Label'
      },
      fmcg: {
        kicker: 'Demand Aggregation & FMCG',
        title: 'Consolidated Distribution & Multi-Product Supply',
        desc: '«For consumer goods, institutional supply, and multi-category import pipelines, Oranex structures consolidated sourcing programs that lower landed unit costs and streamline cross-border documentation.»',
        pathwayTitle: 'FMCG & Consolidated Import Pathway',
        process: [
          'CUSTOMER REQUIREMENTS',
          'DEMAND AGGREGATION',
          'INTERNATIONAL SOURCING',
          'CONSOLIDATION',
          'SHIPMENT',
          'IMPORT',
          'LOCAL DISTRIBUTION'
        ],
        requestBtn: 'Inquire About Multi-Category Import'
      }
    },
    tellUsRequirement: {
      kicker: 'Direct Sourcing Desk',
      title: 'Tell Us What You Need',
      subtitle: 'Whether you need recurring industrial raw materials, turnkey factory machinery, customized chemical additives, or spare parts — submit your technical specifications and our international procurement desk will structure a proposal.',
      directHelpPrompt: 'Need immediate commercial coordination?',
      directHelpLink: 'Chat directly on WhatsApp',
      fields: {
        name: 'Contact Person *',
        company: 'Company / Organization Name *',
        email: 'Official Work Email *',
        phone: 'Phone / WhatsApp Number *',
        productOrScope: 'Product Name or Required Scope *',
        specificationDetails: 'Technical Specifications & Parameters',
        quantity: 'Estimated Quantity',
        unit: 'Unit of Measure',
        application: 'Industrial Application / Intended Use',
        brandPreference: 'Preferred Brand or Origin',
        manufacturerPreference: 'Target Manufacturer / OEM (if any)',
        deliveryLocation: 'Target Delivery Destination',
        targetDate: 'Required Delivery Date',
        notes: 'Additional Notes or Target Pricing',
        uploadTitle: 'Attach Technical Data Sheet (TDS), Drawings or Bill of Quantities (BoQ)',
        uploadHint: 'PDF, DOC, DOCX, XLS, XLSX, JPG, PNG up to 25MB total.',
        submitBtn: 'Submit Requirement to Procurement Desk',
        submitting: 'Submitting Requirement...',
        successTitle: 'Requirement Successfully Received',
        successDesc: 'Your sourcing requirement has been logged in our procurement engine. An Oranex technical procurement specialist will review your parameters and follow up.',
        submitAnother: 'Submit Another Requirement'
      }
    },
    businessServicesSection: {
      kicker: 'Complementary Corporate Capability',
      title: 'ORANEX Business Services',
      subtitle: 'Alongside physical sourcing and import, Oranex provides strategic advisory, cross-border commercial structuring, market entry, and procurement engineering across African markets.',
      exploreServicesBtn: 'View All Business Services →'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: 'International Sourcing', desc: 'Manufacturer vetting, price negotiation & inspection' },
        { id: 'consolidated-import', title: 'Consolidated Import', desc: 'Aggregate multi-supplier cargo shipments' },
        { id: 'industrial-supply', title: 'Industrial Supply', desc: 'Raw materials, chemicals, recurring contracts' },
        { id: 'oranex-oem', title: 'Oranex OEM', desc: 'Custom tooling & industrial fabrications' },
        { id: 'private-label', title: 'Private Label & Framework Supply', desc: 'Contract packaging under your company brand' },
        { id: 'project-solutions', title: 'Project Solutions', desc: 'Installation, commissioning & site engineering' }
      ],
      industryItems: [
        { id: 'manufacturing', title: 'Manufacturing & Plants' },
        { id: 'construction', title: 'Construction & Infra' },
        { id: 'agriculture', title: 'Agriculture & Agro-Processing' },
        { id: 'fmcg', title: 'FMCG & Packaging' },
        { id: 'chemicals-materials', title: 'Chemicals & Materials' },
        { id: 'laboratories', title: 'Laboratories & Scientific' },
        { id: 'energy', title: 'Energy & Electrical' },
        { id: 'water-environmental', title: 'Water & Environmental' },
        { id: 'government-ngo', title: 'Government / NGO / Development' }
      ],
      aboutItems: [
        { id: 'about', title: 'Company Profile & Story' },
        { id: 'network', title: 'Our Global Sourcing Network' },
        { id: 'quality', title: 'Quality & Compliance Protocols' },
        { id: 'business-services', title: 'ORANEX Business Services' }
      ]
    },
    footerExtra: {
      partnerText: 'Global Sourcing & Procurement Partner',
      positioning: 'Ethiopia-rooted · Africa-facing · Globally connected',
      aboutDesc: 'Connecting enterprises, public institutions, and project organizations in Ethiopia and across African markets with verified international manufacturers, OEMs, industrial materials, and turnkey engineering solutions.',
      colSolutions: 'Solutions',
      colIndustries: 'Industries',
      colQuickAccess: 'Quick Access',
      colInstitutional: 'Institutional & Legal',
      legalDisclaimer: 'Tender participation, quotation, and delivery services are subject to client authorization, supplier availability, applicable international procurement rules, and local regulatory requirements in each respective African jurisdiction.',
      allRightsReserved: 'All rights reserved. Oranex Trading One Member PLC.'
    },
    modals: {
      quoteTitle: 'Request Commercial Proforma / RFQ',
      quoteSubtitle: 'Submit your commercial product requirement for direct factory pricing, freight estimates, and delivery timeline coordination.',
      requirementTitle: 'Tell Us What You Need',
      requirementSubtitle: 'Describe any raw material, machinery, chemical, or industrial equipment requirement. Our international desk will review and respond.',
      tenderTitle: 'Submit Tender for Support & Sourcing',
      tenderSubtitle: 'Upload your tender documents for technical evaluation, BoQ extraction, OEM identification, and post-award delivery planning.',
      searchTitle: 'Search Sourcing & Procurement Platform',
      searchPlaceholder: 'Search products, chemicals, polymers, machinery, tender services...',
      whatsappTitle: 'Connect on WhatsApp',
      whatsappSubtitle: 'Initiate a direct chat with our international sourcing coordinators.',
      close: 'Close',
      submit: 'Submit Request',
      submitting: 'Processing Submission...',
      success: 'Request Received Successfully',
      countryPlaceholder: 'Select your country',
      preferredLanguage: 'Preferred Communication Language'
    }
  },

  // ==========================================
  // CHINESE (中文)
  // ==========================================
  zh: {
    heroExtra: {
      microBar: {
        regions: '中国 · 欧洲 · 中东 · 美洲',
        portTransit: '吉布提港与莫乔干港直通',
        verifiedDocs: '权威出厂测试报告 TDS 与检测报告 COA'
      },
      corridor: {
        step1Title: '提交工程参数：',
        step1Desc: '提供您的技术指标、施工图纸或工程量清单 (BOQ)。',
        step2Title: '国际厂家匹配：',
        step2Desc: 'ORANEX 精准匹配中国及国际具备出口资质的合规源头工厂。',
        step3Title: '工地直达交付：',
        step3Desc: '海运集运、报关清关、铁路联运与现场验收交付。',
        exploreBtn: '了解工程集采方案 →'
      }
    },
    quickEntryExtra: {
      pathway01Badge: '通道 01 · 重点工程招标',
      pathway02Badge: '通道 02 · 询价单 / 形式发票',
      pathway03Badge: '通道 03 · 专项定制采购',
      routingKicker: '专业业务直达通道',
      customSpecPrompt: '手头有特殊配方或非标设备需求？'
    },
    solutionsSection: {
      kicker: '量身定制的商业模式',
      title: '围绕您的工程需求构建集采体系',
      subtitle: '从单台设备采购到持续的工业与建材供应链管道，探索我们的一站式集采能力。',
      viewAllBtn: '查看全部解决方案路径',
      solutions: [
        {
          id: 'international-sourcing',
          title: '全球直采与厂家寻源',
          desc: '中国源头工厂对接、价格谈判、技术规格比对及样品检测支持。',
          features: ['源头制造资质审查', '权威第三方装船前检验', 'TDS & COA 技术参数逐项比对']
        },
        {
          id: 'industrial-supply',
          title: '工业原料与工程建材',
          desc: '大宗沥青、混凝土特种化学品、型钢、工程机械及长期供货保障。',
          features: ['按季度锁定集装箱海运配额', '建立安全缓冲库存', '保障工程连续施工不中断']
        },
        {
          id: 'consolidated-import',
          title: '拼箱集采与集运优化',
          desc: '多品类集中下单，合并报关海运，显著降低港口清关及物流费用。',
          features: ['多厂家货物集拼装箱', '统一清关单证支持', '有效避免吉布提港滞期费']
        },
        {
          id: 'tenders',
          title: '工程招标与采购支持',
          desc: '提供全流程标书技术审查、出具原厂授权(MAF)及中标后保供落地。',
          features: ['BOQ工程量清单合规矩阵', '中国源头制造原厂授权书', '重大基础设施履约保障']
        },
        {
          id: 'oranex-oem',
          title: '代工定制与私标生产 (OEM)',
          desc: '为成长型企业与工厂提供客制化包装、特定配合比及定制生产。',
          features: ['CAD公差检测与模具核对', '高耐磨合金冶金工艺', '出厂验收测试 (FAT)']
        },
        {
          id: 'project-solutions',
          title: '交钥匙工程落地解决方案',
          desc: '设备选型、海运配送、现场安装调试、技术交底与长期售后。',
          features: ['资深工程技术人员现场指导', '试运行配合比批量测试', '操作人员系统培训与手册交接']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: '工程招标全流程执行闭环',
      stageCount: '阶段 1 → 10',
      inboundTitle: '项目文件接收与技术审核',
      inboundPoints: [
        'BOQ工程量清单深度拆解',
        '最低技术规范合规审查',
        '源头厂家正式授权书 (MAF)',
        '工期里程碑与交期风险预判'
      ],
      deliveredTitle: '现场交付与工程落地',
      deliveredPoints: [
        '集拼海运与铁路快速转运',
        '工地现场安装与冷热态试运行',
        '操作人员中英双语技术培训',
        '商业质保与常年易损备件保供'
      ]
    },
    oranexOem: {
      kicker: 'ORANEX 代工制造与供应链框架',
      title: '赋能埃塞俄比亚制造业与工程建设',
      quote: '“为需要稳定获取工业原材料与工程建材的企业提供集约化采购。”',
      desc: '埃塞俄比亚本地工厂常面临起订量高、外汇配额紧张与交货期不稳定等挑战。ORANEX 携手中国制造战略伙伴，整合需求、直连合同工厂，将稳定的工业原料直接送达您的仓库。',
      exploreBtn: '了解代工与定制服务',
      requestBtn: '申请供应链合作方案',
      categoriesTitle: '核心工业建材供应品类',
      categories: [
        '大宗工程原料',
        '工业特种化学品',
        'OCHEMI 建筑化学建材',
        '混凝土改性剂与母液',
        '特种聚合物与色母粒',
        '工业防潮包装',
        '工程工地易损耗材',
        '高精密机电备件',
        '整套工业生产线与装备'
      ],
      processTitle: 'OEM 代工与供应链执行流程',
      processFlow: [
        '客户技术需求',
        'ORANEX 评审',
        '中国源头寻源',
        '工厂排产制造',
        '集运装船发运',
        '埃塞现场交付'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: '合同制造与品牌定制',
        title: '您的品牌。您的规格。我们的制造网络。',
        desc: '“针对特定建材与化学品，ORANEX 在中国合格合规工厂中协助您进行贴牌定制生产与包装印制。”',
        pathwayTitle: '定制品牌代工流程',
        process: [
          '客户规格参数',
          '工厂生产审查',
          '样品技术确认',
          '正式排产制造',
          '私标印刷包装',
          '国际海运发运',
          '长期循环保供'
        ],
        requestBtn: '咨询私标代工合作'
      },
      fmcg: {
        kicker: '需求集聚与综合集采',
        title: '多品类整合配送与供应链协同',
        desc: '“针对跨品类建材与设备采购，ORANEX 统一组织集采规划，降低到岸综合单价，精简跨境清关单证。”',
        pathwayTitle: '多品类集采集运流程',
        process: [
          '汇总工程需求',
          '大宗集聚议价',
          '直连源头工厂',
          '海外港口拼箱',
          '海运订舱发运',
          '吉布提清关进口',
          '内陆分期配送'
        ],
        requestBtn: '咨询大宗集采合作'
      }
    },
    tellUsRequirement: {
      kicker: '采购直通响应中心',
      title: '提交您的工程采购需求',
      subtitle: '无论您需要道路沥青、商砼添加剂、整套生产线还是重型机械——只需提交您的技术要求，我们的采购工程团队将在24小时内为您制定方案。',
      directHelpPrompt: '需要立即沟通紧急项目？',
      directHelpLink: 'WhatsApp 在线直联',
      fields: {
        name: '联系人姓名 *',
        company: '公司 / 机构全称 *',
        email: '商务工作邮箱 *',
        phone: '联系电话 / WhatsApp *',
        productOrScope: '产品名称或工程范围 *',
        specificationDetails: '技术规格与性能指标',
        quantity: '预计采购数量',
        unit: '计量单位',
        application: '工程应用场景 / 用途',
        brandPreference: '品牌或产地偏好',
        manufacturerPreference: '指定目标工厂 (如有)',
        deliveryLocation: '交货目标地点 / 港口',
        targetDate: '期望到货日期',
        notes: '补充说明或目标价格',
        uploadTitle: '上传技术规范 (TDS)、图纸或工程量清单 (BOQ)',
        uploadHint: '支持 PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, DWG，总大小不超过 25MB。',
        submitBtn: '提交采购需求至项目部',
        submitting: '正在提交采购需求...',
        successTitle: '采购需求已成功接收',
        successDesc: '您的采购需求已记录于我们的集采系统。ORANEX 采购工程师将对参数进行技术比对后与您取得联系。',
        submitAnother: '提交另一条需求'
      }
    },
    businessServicesSection: {
      kicker: '全方位企业增值能力',
      title: 'ORANEX 商业与贸易协同服务',
      subtitle: '除建材与设备采购外，ORANEX 还提供战略咨询、跨境贸易结算架构、市场准入及泛非工程招标工程支持。',
      exploreServicesBtn: '查看全部商业服务 →'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: '全球直采寻源', desc: '工厂资质审查、价格谈判与装船检验' },
        { id: 'consolidated-import', title: '多品类拼箱集采', desc: '集聚多厂家订单，统一海运装箱' },
        { id: 'industrial-supply', title: '工业原料直供', desc: '大宗建材、化学品及长期采购合约' },
        { id: 'oranex-oem', title: '定制代工生产', desc: '客制化模具与特种机械零部件' },
        { id: 'private-label', title: '私标品牌定制', desc: '客户专属品牌包装与定制配方' },
        { id: 'project-solutions', title: '工程项目交钥匙方案', desc: '设备安装、配合比调试与现场工程交底' }
      ],
      industryItems: [
        { id: 'manufacturing', title: '制造业与工厂' },
        { id: 'construction', title: '建筑与基础设施' },
        { id: 'agriculture', title: '农业与农产品加工' },
        { id: 'fmcg', title: '快消品与工业包装' },
        { id: 'chemicals-materials', title: '化学品与特种材料' },
        { id: 'laboratories', title: '科研实验室与检测机构' },
        { id: 'energy', title: '能源与电力工程' },
        { id: 'water-environmental', title: '水利与环保工程' },
        { id: 'government-ngo', title: '政府公建与国际援助' }
      ],
      aboutItems: [
        { id: 'about', title: '企业概况与使命' },
        { id: 'network', title: '全球采购合作网络' },
        { id: 'quality', title: '质量保障与合规准则' },
        { id: 'business-services', title: 'ORANEX 商业协同服务' }
      ]
    },
    footerExtra: {
      partnerText: '全球工程材料与工业直采战略伙伴',
      positioning: '扎根埃塞俄比亚 · 服务非洲 · 链接全球工业制造',
      aboutDesc: '为埃塞俄比亚及东非基础设施建设、商业搅拌站与工业制造企业连接中国认证合规源头工厂，提供一站式集采、国际海运与现场交付落地保障。',
      colSolutions: '解决方案',
      colIndustries: '服务行业',
      colQuickAccess: '快捷通道',
      colInstitutional: '合规与法律声明',
      legalDisclaimer: '工程集采与供应协同严格遵守客户授权协议、相关进出口法律及所在国法规。ORANEX 坚守诚信合规准则。',
      allRightsReserved: '版权所有 © ORANEX Trading One Member PLC 保留所有权利。'
    },
    modals: {
      quoteTitle: '索取商业形式发票 / 报价 (RFQ)',
      quoteSubtitle: '提交您的工程采购需求，获取中国原厂透明出厂底价、国际海运费测算与交期规划。',
      requirementTitle: '告诉我们您的工程材料需求',
      requirementSubtitle: '描述您所需的任何建材、工程机械、化学品或工业装备，采购项目部将迅速响应。',
      tenderTitle: '提交招标项目文件',
      tenderSubtitle: '上传招标文件或工程量清单 (BOQ)，获取技术合规审查、厂家授权书 (MAF) 与分期交付方案。',
      searchTitle: '工程建材与装备检索平台',
      searchPlaceholder: '搜索沥青、混凝土外加剂、型钢、工程机械、搅拌站...',
      whatsappTitle: 'WhatsApp 在线直通咨询',
      whatsappSubtitle: '与我们亚的斯亚贝巴国际采购项目经理建立即时沟通。',
      close: '关闭',
      submit: '提交需求',
      submitting: '正在处理提交...',
      success: '需求已成功提交',
      countryPlaceholder: '选择项目所在国家',
      preferredLanguage: '首选沟通语言'
    }
  },

  // ==========================================
  // FRENCH (Français)
  // ==========================================
  fr: {
    heroExtra: {
      microBar: {
        regions: 'Europe · Asie · Moyen-Orient · Amériques',
        portTransit: 'Transit ports de Djibouti et Modjo',
        verifiedDocs: 'Fiches techniques TDS & COA vérifiées'
      },
      corridor: {
        step1Title: 'Spécification:',
        step1Desc: 'Vous fournissez vos paramètres, plans ou échantillons.',
        step2Title: 'Sélection internationale:',
        step2Desc: 'Oranex sélectionne des usines et équipementiers certifiés.',
        step3Title: 'Livraison directe:',
        step3Desc: 'Groupage, fret, dédouanement et remise sur votre site.',
        exploreBtn: 'Explorer les solutions d\'approvisionnement →'
      }
    },
    quickEntryExtra: {
      pathway01Badge: 'Voie 01 · Appel d\'Offres Formel',
      pathway02Badge: 'Voie 02 · RFQ / Facture Proforma',
      pathway03Badge: 'Voie 03 · Besoin Direct',
      routingKicker: 'Orientation Directe des Solutions',
      customSpecPrompt: 'Un besoin technique spécialisé ?'
    },
    solutionsSection: {
      kicker: 'Modèles Commerciaux Sur Mesure',
      title: 'Un approvisionnement adapté à vos exigences',
      subtitle: 'De l\'acquisition ponctuelle de machines à l\'approvisionnement régulier en matières premières, découvrez nos capacités clés.',
      viewAllBtn: 'Voir toutes les voies de solutions détaillées',
      solutions: [
        {
          id: 'international-sourcing',
          title: 'Sourcing International',
          desc: 'Recherche de fabricants et fournisseurs mondiaux, coordination technique, cotation et gestion d\'échantillons.',
          features: ['Audit direct des usines partenaires', 'Contrôle avant expédition indépendant', 'Conformité stricte TDS & COA']
        },
        {
          id: 'industrial-supply',
          title: 'Fourniture Industrielle',
          desc: 'Matières premières, réactifs chimiques, polymères, pièces de rechange et livraisons récurrentes.',
          features: ['Allocations régulières de conteneurs', 'Gestion des stocks de sécurité', 'Continuité opérationnelle des usines']
        },
        {
          id: 'consolidated-import',
          title: 'Importation Groupée',
          desc: 'Regroupement de cargaisons multi-fournisseurs et optimisation logistique du fret international.',
          features: ['Stockage intermédiaire overseas', 'Déclaration en douane unique', 'Minimisation des surestaries à Djibouti/Modjo']
        },
        {
          id: 'tenders',
          title: 'Appels d\'Offres & Marchés',
          desc: 'Accompagnement de l\'évaluation et du sourcing jusqu\'à l\'attribution, la livraison et l\'exécution.',
          features: ['Analyse BoQ et matrice de conformité', 'Lettres d\'autorisation fabricant (MAL)', 'Exécution rigoureuse des contrats']
        },
        {
          id: 'oranex-oem',
          title: 'Oranex OEM',
          desc: 'Approvisionnement industriel consolidé pour les usines et entreprises africaines en croissance.',
          features: ['Outillage sur mesure et tolérances CAO', 'Métallurgie de précision anti-usure', 'Tests de recette usine (FAT)']
        },
        {
          id: 'project-solutions',
          title: 'Solutions Projets & Équipements',
          desc: 'Fourniture de lignes d\'usine, transport, installation sur site, mise en service et formation.',
          features: ['Supervision par ingénieurs qualifiés', 'Essais industriels de production', 'Formation complète des opérateurs']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: 'Pipeline d\'Exécution des Appels d\'Offres',
      stageCount: 'Étapes 1 → 10',
      inboundTitle: 'Dossier d\'Appel d\'Offres Entrant',
      inboundPoints: [
        'Analyse détaillée du bordereau des prix (BoQ)',
        'Audit des spécifications techniques minimales',
        'Lettres d\'Autorisation Fabricant (MAL / OEM)',
        'Évaluation des délais et risques de pénalité'
      ],
      deliveredTitle: 'Projet Livré & Réception Définitive',
      deliveredPoints: [
        'Groupage, fret maritime/aérien et transit',
        'Installation sur site et essais à chaud/froid',
        'Formation du personnel et manuels techniques',
        'Garantie constructeur et pièces de rechange'
      ]
    },
    oranexOem: {
      kicker: 'Cadre Oranex OEM',
      title: 'Approvisionnement Industriel pour Entreprises en Croissance',
      quote: '«Un approvisionnement international consolidé pour les usines ayant besoin d\'un accès direct et fiable aux matières premières et équipements industriels.»',
      desc: 'Les usines en développement en Éthiopie et en Afrique font souvent face à des MOQ élevés, des devises restreintes et des délais incertains. Oranex OEM résout ce défi en agrégeant les volumes, en établissant des partenariats industriels directs et en assurant des flux continus jusqu\'à vos entrepôts.',
      exploreBtn: 'Découvrir Oranex OEM',
      requestBtn: 'Demander un Cadre d\'Approvisionnement',
      categoriesTitle: 'Catégories Principales d\'Approvisionnement',
      categories: [
        'Matières premières',
        'Produits chimiques industriels',
        'Chimie du bâtiment',
        'Additifs & Modificateurs',
        'Polymères & Masterbatches',
        'Emballages industriels',
        'Consommables d\'usine',
        'Pièces d\'usure de précision',
        'Équipements de production sélectionnés'
      ],
      processTitle: 'Séquence d\'Approvisionnement OEM',
      processFlow: [
        'EXIGENCE CLIENT',
        'REVUE ORANEX',
        'SOURCING MONDIAL',
        'FABRICANT / OEM',
        'CONSOLIDATION',
        'LIVRAISON SITE'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: 'Fabrication sous Contrat',
        title: 'Votre Marque. Vos Spécifications. Notre Réseau d\'Usines.',
        desc: '«Pour des produits sélectionnés et des approvisionnements récurrents, Oranex structure des accords de fabrication sous marque de distributeur (Private Label) techniquement et commercialement certifiés.»',
        pathwayTitle: 'Processus de Production Private Label',
        process: [
          'SPÉCIFICATION CLIENT',
          'SÉLECTION USINE',
          'VALIDATION TECHNIQUE',
          'PRODUCTION',
          'MARQUAGE & BRANDING',
          'EXPÉDITION',
          'LIVRAISONS SUIVIES'
        ],
        requestBtn: 'Se renseigner sur le Private Label'
      },
      fmcg: {
        kicker: 'Agrégation de Demande & FMCG',
        title: 'Distribution Groupée & Approvisionnement Multi-Produits',
        desc: '«Pour les biens de grande consommation, fournitures institutionnelles et imports réguliers, Oranex structure des programmes groupés réduisant les coûts unitaires et simplifiant le passage en douane.»',
        pathwayTitle: 'Processus Import Groupé & FMCG',
        process: [
          'BESOIN CLIENT',
          'AGRÉGATION DE DEMANDE',
          'SOURCING MONDIAL',
          'GROUPAGE',
          'EXPÉDITION',
          'IMPORTATION',
          'DISTRIBUTION LOCALE'
        ],
        requestBtn: 'Demander un Programme Multi-Catégories'
      }
    },
    tellUsRequirement: {
      kicker: 'Bureau d\'Approvisionnement Direct',
      title: 'Exprimez votre Besoin',
      subtitle: 'Matières premières chimiques, polymères, machines industrielles, outillage ou pièces de rechange — déposez votre cahier des charges technique et notre bureau d\'achat international formulera une offre sur mesure.',
      directHelpPrompt: 'Besoin d\'un échange commercial immédiat ?',
      directHelpLink: 'Discutez en direct sur WhatsApp',
      fields: {
        name: 'Nom & Prénom *',
        company: 'Nom de l\'Entreprise / Organisation *',
        email: 'Email Professionnel *',
        phone: 'Numéro de Téléphone / WhatsApp *',
        productOrScope: 'Produit ou Domaine Requis *',
        specificationDetails: 'Spécifications Techniques & Paramètres',
        quantity: 'Quantité Estimée',
        unit: 'Unité de Mesure',
        application: 'Application Industrielle / Usage Prévu',
        brandPreference: 'Marque ou Origine Préférée',
        manufacturerPreference: 'Fabricant / Équipementier Ciblé (si connu)',
        deliveryLocation: 'Lieu de Livraison Souhaité',
        targetDate: 'Date Limite de Livraison',
        notes: 'Remarques Additionnelles ou Prix Cible',
        uploadTitle: 'Joindre Fiche Technique (TDS), Plans ou Bordereau (BoQ)',
        uploadHint: 'Fichiers PDF, DOC, DOCX, XLS, XLSX, JPG, PNG jusqu\'à 25 Mo au total.',
        submitBtn: 'Transmettre la Demande au Bureau des Achats',
        submitting: 'Envoi en cours...',
        successTitle: 'Demande Reçue avec Succès',
        successDesc: 'Votre besoin a été enregistré dans notre moteur d\'approvisionnement. Un spécialiste technique Oranex étudiera vos paramètres et prendra contact avec vous.',
        submitAnother: 'Soumettre une Autre Demande'
      }
    },
    businessServicesSection: {
      kicker: 'Expertise Institutionnelle & Commerciale',
      title: 'Services d\'Affaires ORANEX',
      subtitle: 'En complément du sourcing matériel et de l\'import, Oranex fournit un conseil stratégique, l\'ingénierie d\'achat, la structuration commerciale et le support au déploiement en Afrique.',
      exploreServicesBtn: 'Voir Tous les Services d\'Affaires →'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: 'Sourcing International', desc: 'Audit usine, négociation de prix et inspection qualité' },
        { id: 'consolidated-import', title: 'Importation Groupée', desc: 'Regroupement de cargaisons multi-fournisseurs' },
        { id: 'industrial-supply', title: 'Fourniture Industrielle', desc: 'Matières premières, réactifs, contrats annuels' },
        { id: 'oranex-oem', title: 'Oranex OEM', desc: 'Fabrication d\'outillages et pièces sur mesure' },
        { id: 'private-label', title: 'Marque Privée & Contrat Cadre', desc: 'Production sous la marque de votre société' },
        { id: 'project-solutions', title: 'Solutions Projets', desc: 'Installation, mise en service et maintenance site' }
      ],
      industryItems: [
        { id: 'manufacturing', title: 'Industrie & Usines' },
        { id: 'construction', title: 'BTP & Infrastructures' },
        { id: 'agriculture', title: 'Agriculture & Agro-industrie' },
        { id: 'fmcg', title: 'FMCG & Emballage' },
        { id: 'chemicals-materials', title: 'Chimie & Matériaux' },
        { id: 'laboratories', title: 'Laboratoires & Recherche' },
        { id: 'energy', title: 'Énergie & Électricité' },
        { id: 'water-environmental', title: 'Eau & Environnement' },
        { id: 'government-ngo', title: 'Gouvernement / ONG / Projets' }
      ],
      aboutItems: [
        { id: 'about', title: 'Profil de l\'Entreprise & Histoire' },
        { id: 'network', title: 'Notre Réseau Mondial d\'Usines' },
        { id: 'quality', title: 'Protocoles Qualité & Conformité' },
        { id: 'business-services', title: 'Services d\'Affaires ORANEX' }
      ]
    },
    footerExtra: {
      partnerText: 'Partenaire Mondial en Sourcing & Achats',
      positioning: 'Enraciné en Éthiopie · Tourné vers l\'Afrique · Connecté au monde',
      aboutDesc: 'Connecter les entreprises, institutions publiques et porteurs de projets en Éthiopie et sur les marchés africains aux usines, équipementiers et solutions d\'ingénierie clés en main.',
      colSolutions: 'Solutions',
      colIndustries: 'Industries',
      colQuickAccess: 'Accès Rapide',
      colInstitutional: 'Institutionnel & Légal',
      legalDisclaimer: 'Les prestations de soumission aux appels d\'offres, de cotation et de livraison restent soumises aux accords contractuels, à la disponibilité des fabricants, et aux réglementations locales applicables.',
      allRightsReserved: 'Tous droits réservés. Oranex Trading One Member PLC.'
    },
    modals: {
      quoteTitle: 'Demande de Facture Proforma / RFQ',
      quoteSubtitle: 'Renseignez votre besoin pour obtenir les prix d\'usine, les estimations de fret et le calendrier de livraison.',
      requirementTitle: 'Exprimez votre Besoin',
      requirementSubtitle: 'Matières premières, équipements, produits chimiques ou pièces : notre bureau étudiera votre demande sans délai.',
      tenderTitle: 'Soumettre un Appel d\'Offres pour Sourcing',
      tenderSubtitle: 'Téléchargez vos dossiers d\'appel d\'offres pour audit technique, chiffrage BoQ, sélection usine et plan de livraison.',
      searchTitle: 'Rechercher sur la Plateforme Oranex',
      searchPlaceholder: 'Rechercher produits, chimie, polymères, machines, services d\'appels d\'offres...',
      whatsappTitle: 'Échanger sur WhatsApp',
      whatsappSubtitle: 'Entrez en contact direct avec notre équipe de coordination des approvisionnements.',
      close: 'Fermer',
      submit: 'Envoyer la Demande',
      submitting: 'Traitement en cours...',
      success: 'Demande Transmise avec Succès',
      countryPlaceholder: 'Sélectionnez votre pays',
      preferredLanguage: 'Langue de Communication Préférée'
    }
  },

  // ==========================================
  // ARABIC (العربية)
  // ==========================================
  ar: {
    heroExtra: {
      microBar: {
        regions: 'أوروبا · آسيا · الشرق الأوسط · الأمريكتين',
        portTransit: 'عبور موانئ جيبوتي ومودجو الجافة',
        verifiedDocs: 'شهادات فنية معتمدة TDS و COA'
      },
      corridor: {
        step1Title: 'مواصفات الطلب:',
        step1Desc: 'تقدمون المعايير أو المخططات أو العينات المطلوبة.',
        step2Title: 'الفحص الدولي:',
        step2Desc: 'تطابق أورانيكس مع المصانع والشركات المصنعة الأصلية المعتمدة.',
        step3Title: 'التسليم المباشر:',
        step3Desc: 'التجميع، الشحن، التخليص الجمركي والتسليم في الموقع.',
        exploreBtn: 'استكشف حلول التوريد والمشتريات ←'
      }
    },
    quickEntryExtra: {
      pathway01Badge: 'المسار 01 · مناقصة رسمية',
      pathway02Badge: 'المسار 02 · طلب تسعير / بروفورما',
      pathway03Badge: 'المسار 03 · متطلب مباشر',
      routingKicker: 'توجيه الحلول المباشر',
      customSpecPrompt: 'هل لديك مواصفات فنية متخصصة؟'
    },
    solutionsSection: {
      kicker: 'نماذج تجارية مخصصة',
      title: 'توريد ومشتريات مصممة خصيصاً لاحتياجاتك',
      subtitle: 'من شراء الآلات المتخصصة إلى خطوط إمداد المواد الخام المستمرة، استكشف قدراتنا التوريدية الموثوقة.',
      viewAllBtn: 'عرض جميع مسارات الحلول التفصيلية',
      solutions: [
        {
          id: 'international-sourcing',
          title: 'التوريد الدولي',
          desc: 'البحث عن المصانع والموردين، التنسيق الفني، تقديم عروض الأسعار وفحص العينات.',
          features: ['التحقق المباشر من المصانع الشريكة', 'فحص مستقل قبل الشحن', 'مطابقة دقيقة لمواصفات TDS و COA']
        },
        {
          id: 'industrial-supply',
          title: 'الإمداد الصناعي',
          desc: 'المواد الخام، المواد الكيميائية، الإضافات، الآلات، التغليف، وقطع الغيار بعقود دورية.',
          features: ['حصص حاويات ربع سنوية منتظمة', 'إدارة المخزون الاحتياطي', 'استمرارية تشغيل خطوط الإنتاج']
        },
        {
          id: 'consolidated-import',
          title: 'الاستيراد المجمع',
          desc: 'تجميع شحنات متعددة المصادر وتنسيق الشحن البحري والجوي الدولي بكفاءة.',
          features: ['تجميع البضائع في مراكز خارجية', 'بيان جمركي موحد لتوفير التكاليف', 'تقليل غرامات التأخير في جيبوتي ومودجو']
        },
        {
          id: 'tenders',
          title: 'المناقصات والمشتريات',
          desc: 'دعم متكامل من تقييم الفرص وتوريد المصانع حتى الترسية والتسليم والتركيب.',
          features: ['تدقيق جداول الكميات BoQ والمطابقة الفنية', 'خطابات تفويض المصنع الرسمية MAL', 'تنفيذ العقود المؤسسية بدقة']
        },
        {
          id: 'oranex-oem',
          title: 'أورانيكس للمصنعين الأصليين OEM',
          desc: 'إمداد صناعي مجمع للمصانع والشركات النامية لتأمين مستلزمات الإنتاج.',
          features: ['قوالب وتصنيع مخصص وفق CAD', 'معادن مقاومة للتآكل الشديد', 'اختبارات قبول المصنع FAT']
        },
        {
          id: 'project-solutions',
          title: 'حلول المشاريع والمعدات',
          desc: 'توريد خطوط الإنتاج، الشحن، التركيب الموقعي، التشغيل التجريبي والتدريب.',
          features: ['إشراف هندسي متخصص في الموقع', 'تشغيل دفعات اختبارية للمطابقة', 'تسليم أدلة التشغيل وتدريب الكوادر']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: 'مسار تنفيذ المناقصات المتكامل',
      stageCount: 'المراحل 1 ← 10',
      inboundTitle: 'ملف المناقصة المستلم',
      inboundPoints: [
        'تحليل تفصيلي لجداول الكميات والأسعار (BoQ)',
        'تدقيق الشروط والمواصفات الفنية الإلزامية',
        'خطابات تفويض المصنع الأصلية (MAL / OEM)',
        'تقييم شروط التسليم وغرامات التأخير'
      ],
      deliveredTitle: 'تسليم المشروع والتشغيل النهائي',
      deliveredPoints: [
        'الشحن المجمع بحراً وجواً والتخليص الداخلي',
        'التركيب الميداني واختبارات التشغيل البارد والساخن',
        'تدريب المشغلين وتسليم الأدلة الفنية',
        'الضمان التجاري وقطع الغيار الأصلية'
      ]
    },
    oranexOem: {
      kicker: 'إطار أورانيكس OEM',
      title: 'التوريد الصناعي للشركات والمصانع المتنامية',
      quote: '«توريد دولي موحد للمصانع والشركات التي تحتاج إلى وصول موثوق ومستمر للمواد الخام والمدخلات الصناعية.»',
      desc: 'تواجه المصانع في إثيوبيا وإفريقيا تحديات تتعلق بمتطلبات الحد الأدنى للطلب (MOQ) وتوافر العملات الأجنبية. يحل إطار أورانيكس OEM هذه العقبة عبر تجميع الطلبات، وإنشاء خطوط تصنيع تعاقدية مباشرة، وتوريد المدخلات إلى مستودعاتكم.',
      exploreBtn: 'استكشف أورانيكس OEM',
      requestBtn: 'طلب إطار توريد صناعي',
      categoriesTitle: 'الفئات الصناعية الرئيسية للتوريد',
      categories: [
        'المواد الخام الصناعية',
        'الكيماويات الصناعية',
        'كيماويات البناء والتشييد',
        'الإضافات ومحسنات الإنتاج',
        'البوليمرات وماسترباتش',
        'مواد التعبئة والتغليف الصناعية',
        'المستهلكات الصناعية',
        'قطع الغيار الدقيقة',
        'معدات التصنيع المتخصصة'
      ],
      processTitle: 'تسلسل التوريد الصناعي OEM',
      processFlow: [
        'طلب العميل',
        'مراجعة أورانيكس',
        'البحث الدولي',
        'المصنع المعتمد',
        'التجميع والشحن',
        'التسليم الميداني'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: 'التصنيع التعاقدي',
        title: 'علامتك التجارية. مواصفاتك. شبكة مصانعنا العالمية.',
        desc: '«للمنتجات المختارة والمتطلبات المتكررة، تقوم أورانيكس بتنسيق عقود تصنيع تحت العلامة التجارية الخاصة بالعميل مع الالتزام التام بالمواصفات الفنية والجودة.»',
        pathwayTitle: 'مسار إنتاج العلامة الخاصة',
        process: [
          'مواصفات العميل',
          'فحص المصنع',
          'الاعتماد الفني',
          'الإنتاج',
          'التغليف والعلامة',
          'الشحن',
          'التوريد الدوري'
        ],
        requestBtn: 'استفسر عن العلامة التجارية الخاصة'
      },
      fmcg: {
        kicker: 'تجميع الطلب والسلع الاستهلاكية',
        title: 'التوزيع المجمع والتوريد متعدد الفئات',
        desc: '«للسلع سريعة الدوران والتوريدات المؤسسية، تبني أورانيكس برامج توريد مجمعة تخفض تكلفة الوحدة وتبسط إجراءات التخليص الجمركي.»',
        pathwayTitle: 'مسار الاستيراد المجمع والسلع الاستهلاكية',
        process: [
          'متطلبات العملاء',
          'تجميع الطلب',
          'التوريد الدولي',
          'التجميع',
          'الشحن',
          'الاستيراد',
          'التوزيع المحلي'
        ],
        requestBtn: 'استفسر عن برامج الاستيراد المجمع'
      }
    },
    tellUsRequirement: {
      kicker: 'مكتب التوريد والمشتريات المباشر',
      title: 'أخبرنا بما تحتاجه',
      subtitle: 'سواء كنت بحاجة إلى مواد خام كيميائية دورية، أو آلات مصانع متكاملة، أو إضافات تصنيعية مخصصة، أو قطع غيار — قدم مواصفاتك الفنية وسيقوم مكتب التوريد بإعداد عرض متكامل.',
      directHelpPrompt: 'هل تحتاج إلى تنسيق تجاري فوري؟',
      directHelpLink: 'تحدث معنا مباشرة عبر واتساب',
      fields: {
        name: 'اسم المسؤول *',
        company: 'اسم الشركة أو المؤسسة *',
        email: 'البريد الإلكتروني المهني *',
        phone: 'رقم الهاتف / واتساب *',
        productOrScope: 'اسم المنتج أو نطاق التوريد *',
        specificationDetails: 'المواصفات الفنية والمعايير المطلوبة',
        quantity: 'الكمية التقديرية',
        unit: 'وحدة القياس',
        application: 'الاستخدام الصناعي / التطبيق المقصود',
        brandPreference: 'العلامة التجارية أو بلد المنشأ المفضل',
        manufacturerPreference: 'المصنع المستهدف (إن وجد)',
        deliveryLocation: 'مكان التسليم المطلوب',
        targetDate: 'تاريخ التسليم المطلوب',
        notes: 'ملاحظات إضافية أو السعر المستهدف',
        uploadTitle: 'إرفاق المواصفات الفنية (TDS) أو المخططات أو جدول الكميات (BoQ)',
        uploadHint: 'ملفات PDF أو DOC أو XLS أو صور حتى 25 ميجابايت إجمالاً.',
        submitBtn: 'إرسال الطلب إلى مكتب التوريد والمشتريات',
        submitting: 'جاري إرسال الطلب...',
        successTitle: 'تم استلام طلبكم بنجاح',
        successDesc: 'تم تسجيل متطلباتكم في محرك التوريد. سيقوم أخصائي المشتريات الفنية في أورانيكس بمراجعة المعايير والتواصل معكم سريعاً.',
        submitAnother: 'تقديم طلب توريد آخر'
      }
    },
    businessServicesSection: {
      kicker: 'قدرات استشارية ومؤسسية متكاملة',
      title: 'خدمات أورانيكس للأعمال',
      subtitle: 'إلى جانب التوريد الفعلي والاستيراد، تقدم أورانيكس استشارات استراتيجية، وهيكلة تجارية عابرة للحدود، وهندسة مشتريات عبر الأسواق الإفريقية.',
      exploreServicesBtn: 'عرض جميع خدمات الأعمال ←'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: 'التوريد الدولي', desc: 'تدقيق المصانع والتفاوض وفحص الجودة' },
        { id: 'consolidated-import', title: 'الاستيراد المجمع', desc: 'تجميع الشحنات من عدة موردين' },
        { id: 'industrial-supply', title: 'الإمداد الصناعي', desc: 'المواد الخام والكيماويات والعقود الدورية' },
        { id: 'oranex-oem', title: 'أورانيكس للمصنعين OEM', desc: 'تصنيع القوالب والقطع المعدنية المخصصة' },
        { id: 'private-label', title: 'العلامة الخاصة وعقود التوريد', desc: 'إنتاج وتعبئة تحت اسم شركتكم' },
        { id: 'project-solutions', title: 'حلول المشاريع المتكاملة', desc: 'التركيب الميداني والتشغيل والصيانة' }
      ],
      industryItems: [
        { id: 'manufacturing', title: 'الصناعة والمصانع' },
        { id: 'construction', title: 'البناء والبنية التحتية' },
        { id: 'agriculture', title: 'الزراعة والتصنيع الزراعي' },
        { id: 'fmcg', title: 'السلع الاستهلاكية والتغليف' },
        { id: 'chemicals-materials', title: 'الكيماويات والمواد' },
        { id: 'laboratories', title: 'المختبرات والبحث العلمي' },
        { id: 'energy', title: 'الطاقة والكهرباء' },
        { id: 'water-environmental', title: 'المياه والبيئة' },
        { id: 'government-ngo', title: 'المشاريع الحكومية والتنموية' }
      ],
      aboutItems: [
        { id: 'about', title: 'ملف الشركة وتاريخها' },
        { id: 'network', title: 'شبكة التوريد العالمية' },
        { id: 'quality', title: 'بروتوكولات الجودة والامتثال' },
        { id: 'business-services', title: 'خدمات أورانيكس للأعمال' }
      ]
    },
    footerExtra: {
      partnerText: 'شريك التوريد والمشتريات الدولي',
      positioning: 'جذور إثيوبية · رؤية إفريقية · اتصال عالمي',
      aboutDesc: 'ربط الشركات والمؤسسات الحكومية ومشاريع التنمية في إثيوبيا وإفريقيا بالمصانع العالمية وموردي التكنولوجيا والحلول الهندسية المتكاملة.',
      colSolutions: 'الحلول التوريدية',
      colIndustries: 'القطاعات الصناعية',
      colQuickAccess: 'وصول سريع',
      colInstitutional: 'الشؤون القانونية والمؤسسية',
      legalDisclaimer: 'تخضع خدمات المناقصات والتسعير والتسليم لتفويض العملاء وتوافر المصانع واللوائح المعمول بها في كل دولة إفريقية.',
      allRightsReserved: 'جميع الحقوق محفوظة. شركة أورانيكس التجارية ذات العضو الواحد.'
    },
    modals: {
      quoteTitle: 'طلب فاتورة بروفورما / عرض أسعار',
      quoteSubtitle: 'أدخل تفاصيل منتجك للحصول على أسعار المصنع المباشرة وتقديرات الشحن ومواعيد التسليم.',
      requirementTitle: 'أخبرنا بما تحتاجه',
      requirementSubtitle: 'حدد أي مواد خام أو آلات أو كيماويات أو معدات صناعية وسيقوم فريقنا بالرد الفوري.',
      tenderTitle: 'تقديم مناقصة للدعم والتوريد',
      tenderSubtitle: 'ارفع وثائق المناقصة للتقييم الفني، تفريغ جداول الكميات، مطابقة المصانع، والتخطيط للتسليم.',
      searchTitle: 'البحث في منصة التوريد والمشتريات',
      searchPlaceholder: 'ابحث عن المنتجات، الكيماويات، البوليمرات، الآلات، خدمات المناقصات...',
      whatsappTitle: 'تواصل عبر واتساب',
      whatsappSubtitle: 'تحدث مباشرة مع منسقي التوريد الدولي لدينا.',
      close: 'إغلاق',
      submit: 'إرسال الطلب',
      submitting: 'جاري المعالجة...',
      success: 'تم استلام الطلب بنجاح',
      countryPlaceholder: 'اختر بلدك',
      preferredLanguage: 'لغة التواصل المفضلة'
    }
  },

  // ==========================================
  // PORTUGUESE (Português)
  // ==========================================
  pt: {
    heroExtra: {
      microBar: {
        regions: 'Europa · Ásia · Médio Oriente · Américas',
        portTransit: 'Trânsito portos de Djibuti e Modjo',
        verifiedDocs: 'Fichas técnicas TDS e COA verificadas'
      },
      corridor: {
        step1Title: 'Especificação:',
        step1Desc: 'Você fornece parâmetros, projetos ou amostras.',
        step2Title: 'Verificação internacional:',
        step2Desc: 'A Oranex seleciona fábricas e OEMs certificados.',
        step3Title: 'Entrega direta:',
        step3Desc: 'Consolidação, frete, desembaraço aduaneiro e entrega no local.',
        exploreBtn: 'Explorar Soluções de Compras →'
      }
    },
    quickEntryExtra: {
      pathway01Badge: 'Via 01 · Concurso Formal',
      pathway02Badge: 'Via 02 · RFQ / Pró-forma',
      pathway03Badge: 'Via 03 · Requisito Direto',
      routingKicker: 'Roteamento Direto de Soluções',
      customSpecPrompt: 'Tem uma especificação técnica personalizada?'
    },
    solutionsSection: {
      kicker: 'Modelos Comerciais Sob Medida',
      title: 'Compras estruturadas para a sua necessidade',
      subtitle: 'Da aquisição pontual de máquinas ao fornecimento contínuo de matérias-primas, conheça nossas capacidades.',
      viewAllBtn: 'Ver Todos os Caminhos de Soluções',
      solutions: [
        {
          id: 'international-sourcing',
          title: 'Sourcing Internacional',
          desc: 'Identificação de fabricantes, coordenação técnica, cotações e suporte com amostras industriais.',
          features: ['Auditoria direta de fabricantes', 'Inspeção pré-embarque independente', 'Conformidade rigorosa TDS e COA']
        },
        {
          id: 'industrial-supply',
          title: 'Fornecimento Industrial',
          desc: 'Matérias-primas, produtos químicos, polímeros, embalagens e peças sobressalentes com contratos regulares.',
          features: ['Alocações programadas de contêineres', 'Gestão de estoques de segurança', 'Confiabilidade contínua da produção']
        },
        {
          id: 'consolidated-import',
          title: 'Importação Consolidada',
          desc: 'Agrupamento de múltiplos fornecedores com logística integrada e redução de custos aduaneiros.',
          features: ['Consolidação em centros internacionais', 'Desembaraço com documento único', 'Mitigação de sobrestadias em portos']
        },
        {
          id: 'tenders',
          title: 'Concursos & Licitações',
          desc: 'Apoio completo desde a avaliação e sourcing até a adjudicação, entrega e execução.',
          features: ['Análise de BoQ e matrizes de conformidade', 'Cartas de autorização de fabricantes (MAL)', 'Execução contratual institucional']
        },
        {
          id: 'oranex-oem',
          title: 'Oranex OEM',
          desc: 'Fornecimento industrial consolidado para fábricas e empresas em expansão.',
          features: ['Ferramentas sob medida e tolerâncias CAD', 'Metalurgia de alta resistência', 'Testes de aceitação em fábrica (FAT)']
        },
        {
          id: 'project-solutions',
          title: 'Soluções de Projetos & Equipamentos',
          desc: 'Fornecimento de linhas completas, transporte, montagem, comissionamento e treinamento.',
          features: ['Supervisão por engenheiros especializados', 'Testes práticos de produção', 'Treinamento de operadores e manuais']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: 'Fluxo de Execução de Concursos',
      stageCount: 'Etapas 1 → 10',
      inboundTitle: 'Dossiê de Concurso Recebido',
      inboundPoints: [
        'Detalhamento do mapa de quantidades (BoQ)',
        'Auditoria das especificações técnicas mínimas',
        'Cartas de Autorização de Fabricante (MAL / OEM)',
        'Avaliação de prazos e riscos de penalidades'
      ],
      deliveredTitle: 'Projeto Entregue & Comissionamento',
      deliveredPoints: [
        'Frete marítimo/aéreo consolidado e trânsito',
        'Instalação no local e testes a frio e a quente',
        'Treinamento da equipe e manuais técnicos',
        'Garantia comercial e peças de reposição'
      ]
    },
    oranexOem: {
      kicker: 'Estrutura Oranex OEM',
      title: 'Fornecimento Industrial para Empresas em Crescimento',
      quote: '«Sourcing internacional consolidado para fábricas que necessitam de acesso confiável a insumos e máquinas industriais.»',
      desc: 'As fábricas em crescimento na Etiópia e na África enfrentam exigências de altos MOQs e dificuldades com divisas. A Oranex OEM resolve essas barreiras agregando a demanda e garantindo fornecimento contínuo aos seus armazéns.',
      exploreBtn: 'Explorar Oranex OEM',
      requestBtn: 'Solicitar Quadro de Fornecimento',
      categoriesTitle: 'Principais Categorias Industriais',
      categories: [
        'Matérias-primas industriais',
        'Produtos químicos industriais',
        'Química para construção civil',
        'Aditivos e modificadores',
        'Polímeros e masterbatches',
        'Embalagens industriais',
        'Consumíveis de fábrica',
        'Peças de precisão e desgaste',
        'Equipamentos industriais selecionados'
      ],
      processTitle: 'Sequência de Fornecimento OEM',
      processFlow: [
        'REQUISITO DO CLIENTE',
        'REVISÃO ORANEX',
        'SOURCING GLOBAL',
        'FABRICANTE OEM',
        'CONSOLIDAÇÃO',
        'ENTREGA NO LOCAL'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: 'Fabricação sob Contrato',
        title: 'Sua Marca. Suas Especificações. Nossa Rede de Fábricas.',
        desc: '«Para produtos selecionados e demandas contínuas, a Oranex coordena contratos de fabricação sob marca própria com total conformidade técnica.»',
        pathwayTitle: 'Fluxo de Produção Private Label',
        process: [
          'ESPECIFICAÇÃO CLIENTE',
          'AUDITORIA FABRICANTE',
          'APROVAÇÃO TÉCNICA',
          'PRODUÇÃO',
          'APLICAÇÃO DA MARCA',
          'EMBARQUE',
          'FORNECIMENTO CONTÍNUO'
        ],
        requestBtn: 'Consultar sobre Marca Própria'
      },
      fmcg: {
        kicker: 'Agregação de Demanda & FMCG',
        title: 'Distribuição Consolidada & Fornecimento Multicategoria',
        desc: '«Para bens de consumo e fornecimento institucional, a Oranex estrutura compras agrupadas que reduzem custos unitários e agilizam trâmites aduaneiros.»',
        pathwayTitle: 'Fluxo de Importação Consolidada FMCG',
        process: [
          'DEMANDAS DOS CLIENTES',
          'AGREGAÇÃO DE DEMANDA',
          'SOURCING GLOBAL',
          'CONSOLIDAÇÃO',
          'EMBARQUE',
          'IMPORTAÇÃO',
          'DISTRIBUIÇÃO LOCAL'
        ],
        requestBtn: 'Consultar Programas Multicategoria'
      }
    },
    tellUsRequirement: {
      kicker: 'Mesa de Compras Diretas',
      title: 'Diga-nos o que Precisa',
      subtitle: 'Seja para matérias-primas químicas, polímeros, maquinário industrial ou peças de reposição — envie suas especificações e nossa mesa internacional estruturará uma proposta completa.',
      directHelpPrompt: 'Precisa de alinhamento comercial imediato?',
      directHelpLink: 'Converse diretamente pelo WhatsApp',
      fields: {
        name: 'Nome do Responsável *',
        company: 'Empresa / Organização *',
        email: 'E-mail Corporativo *',
        phone: 'Telefone / WhatsApp *',
        productOrScope: 'Produto ou Escopo Necessário *',
        specificationDetails: 'Especificações Técnicas e Parâmetros',
        quantity: 'Quantidade Estimada',
        unit: 'Unidade de Medida',
        application: 'Aplicação Industrial / Uso Previsto',
        brandPreference: 'Marca ou Origem de Preferência',
        manufacturerPreference: 'Fabricante / OEM Alvo (se houver)',
        deliveryLocation: 'Destino Final de Entrega',
        targetDate: 'Data Limite Desejada',
        notes: 'Notas Adicionais ou Preço Alvo',
        uploadTitle: 'Anexar Ficha Técnica (TDS), Desenhos ou Mapa de Quantidades (BoQ)',
        uploadHint: 'Formatos PDF, DOC, XLS ou imagens até 25MB no total.',
        submitBtn: 'Enviar Requisito para a Mesa de Compras',
        submitting: 'Enviando Requisito...',
        successTitle: 'Requisito Recebido com Sucesso',
        successDesc: 'Sua solicitação foi registrada em nosso motor de compras. Um especialista técnico da Oranex revisará os dados e entrará em contato.',
        submitAnother: 'Enviar Outro Requisito'
      }
    },
    businessServicesSection: {
      kicker: 'Capacidade Corporativa Complementar',
      title: 'Serviços Empresariais ORANEX',
      subtitle: 'Além do fornecimento físico e importação, a Oranex oferece consultoria estratégica, estruturação comercial e engenharia de compras em mercados africanos.',
      exploreServicesBtn: 'Ver Todos os Serviços Empresariais →'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: 'Sourcing Internacional', desc: 'Auditoria de fábricas, cotações e inspeção técnica' },
        { id: 'consolidated-import', title: 'Importação Consolidada', desc: 'Consolidação de carga de múltiplos fornecedores' },
        { id: 'industrial-supply', title: 'Fornecimento Industrial', desc: 'Matérias-primas, químicos e contratos regulares' },
        { id: 'oranex-oem', title: 'Oranex OEM', desc: 'Ferramental sob medida e fabricações industriais' },
        { id: 'private-label', title: 'Marca Própria & Contrato-Quadro', desc: 'Embalagem e produção com a sua marca' },
        { id: 'project-solutions', title: 'Soluções de Projetos', desc: 'Montagem, comissionamento e suporte de campo' }
      ],
      industryItems: [
        { id: 'manufacturing', title: 'Indústria e Fábricas' },
        { id: 'construction', title: 'Construção & Infraestrutura' },
        { id: 'agriculture', title: 'Agricultura & Agroindústria' },
        { id: 'fmcg', title: 'FMCG & Embalagens' },
        { id: 'chemicals-materials', title: 'Química & Materiais' },
        { id: 'laboratories', title: 'Laboratórios & Ciência' },
        { id: 'energy', title: 'Energia & Eletricidade' },
        { id: 'water-environmental', title: 'Água & Meio Ambiente' },
        { id: 'government-ngo', title: 'Governo / ONG / Projetos' }
      ],
      aboutItems: [
        { id: 'about', title: 'Perfil da Empresa & História' },
        { id: 'network', title: 'Rede Global de Fabricantes' },
        { id: 'quality', title: 'Protocolos de Qualidade e Conformidade' },
        { id: 'business-services', title: 'Serviços Empresariais ORANEX' }
      ]
    },
    footerExtra: {
      partnerText: 'Parceiro Global de Sourcing & Compras',
      positioning: 'Raízes na Etiópia · Foco na África · Conexão Global',
      aboutDesc: 'Conectando empresas, instituições públicas e organizações de projetos na Etiópia e nos mercados africanos com fabricantes e soluções completas de engenharia.',
      colSolutions: 'Soluções',
      colIndustries: 'Indústrias',
      colQuickAccess: 'Acesso Rápido',
      colInstitutional: 'Institucional & Legal',
      legalDisclaimer: 'Os serviços de apoio a licitações, cotação e entrega dependem da autorização do cliente, disponibilidade do fabricante e das leis vigentes.',
      allRightsReserved: 'Todos os direitos reservados. Oranex Trading One Member PLC.'
    },
    modals: {
      quoteTitle: 'Solicitar Fatura Pró-forma / RFQ',
      quoteSubtitle: 'Informe seu requisito para receber cotações de fábrica, cálculos de frete e prazos de entrega.',
      requirementTitle: 'Diga-nos o que Precisa',
      requirementSubtitle: 'Descreva qualquer matéria-prima, máquina ou componente. Nossa mesa internacional responderá prontamente.',
      tenderTitle: 'Submeter Concurso para Suporte e Sourcing',
      tenderSubtitle: 'Envie seus cadernos de encargos para análise técnica, extração de BoQ e mapeamento de fornecedores.',
      searchTitle: 'Pesquisar na Plataforma Oranex',
      searchPlaceholder: 'Pesquisar produtos, químicos, polímeros, máquinas, serviços de concursos...',
      whatsappTitle: 'Falar pelo WhatsApp',
      whatsappSubtitle: 'Inicie uma conversa direta com nossos coordenadores internacionais.',
      close: 'Fechar',
      submit: 'Enviar Solicitação',
      submitting: 'Processando Envio...',
      success: 'Solicitação Recebida com Sucesso',
      countryPlaceholder: 'Selecione seu país',
      preferredLanguage: 'Idioma Preferido de Contato'
    }
  },

  // ==========================================
  // SWAHILI (Kiswahili)
  // ==========================================
  sw: {
    heroExtra: {
      microBar: {
        regions: 'Ulaya · Asia · Mashariki ya Kati · Amerika',
        portTransit: 'Usafirishaji bandari za Djibouti na Modjo',
        verifiedDocs: 'Nyaraka zilizothibitishwa za TDS & COA'
      },
      corridor: {
        step1Title: 'Vielelezo vya Mahitaji:',
        step1Desc: 'Unatoa vipimo, michoro au mahitaji ya sampuli.',
        step2Title: 'Uhakiki wa Kimataifa:',
        step2Desc: 'Oranex inalinganisha na viwanda vilivyoidhinishwa vya OEM.',
        step3Title: 'Utoaji wa Moja kwa Moja:',
        step3Desc: 'Ujumuishaji, mizigo, forodha na ukabidhi kiwandani.',
        exploreBtn: 'Chunguza Suluhu za Ununuzi →'
      }
    },
    quickEntryExtra: {
      pathway01Badge: 'Njia 01 · Zabuni Rasmi',
      pathway02Badge: 'Njia 02 · RFQ / Ankara ya Proforma',
      pathway03Badge: 'Njia 03 · Mahitaji ya Moja kwa Moja',
      routingKicker: 'Uelekezaji wa Suluhu za Moja kwa Moja',
      customSpecPrompt: 'Una mahitaji maalum ya kiufundi?'
    },
    solutionsSection: {
      kicker: 'Mifumo ya Kibiashara Iliyobinafsishwa',
      title: 'Ununuzi Ulioundwa Kulingana na Mahitaji Yako',
      subtitle: 'Kuanzia ununuzi wa mashine za pekee hadi ugavi endelevu wa malighafi, chunguza uwezo wetu wa ununuzi.',
      viewAllBtn: 'Tazama Njia Zote za Suluhu za Kina',
      solutions: [
        {
          id: 'international-sourcing',
          title: 'Kutafuta Vyanzo vya Kimataifa',
          desc: 'Kupata wazalishaji na wasambazaji, uratibu wa kiufundi, nukuu za bei na usaidizi wa sampuli.',
          features: ['Ukaguzi wa moja kwa moja wa viwanda', 'Ukaguzi huru kabla ya usafirishaji', 'Ulinganifu thabiti wa TDS na COA']
        },
        {
          id: 'industrial-supply',
          title: 'Ugavi wa Viwanda',
          desc: 'Malighafi, kemikali, polima, vifungashio na vipuri kupitia mikataba ya mara kwa mara.',
          features: ['Ugawaji uliopangwa wa makontena kila robo mwaka', 'Usimamizi wa akiba ya dharura', 'Uhakika wa uzalishaji kiwandani']
        },
        {
          id: 'consolidated-import',
          title: 'Uagizaji Uliounganishwa',
          desc: 'Kukusanya mizigo ya wasambazaji mbalimbali na kuratibu usafirishaji wa kimataifa.',
          features: ['Kukusanya mizigo katika vituo vya ng\'ambo', 'Tamko moja la pamoja la forodha', 'Kupunguza gharama za ucheleweshaji bandarini']
        },
        {
          id: 'tenders',
          title: 'Zabuni na Ununuzi',
          desc: 'Usaidizi kuanzia tathmini ya fursa hadi usambazaji, uwasilishaji na utekelezaji.',
          features: ['Uchambuzi wa BoQ na majedwali ya kiufundi', 'Barua za idhini ya wazalishaji (MAL)', 'Utekelezaji makini wa mikataba']
        },
        {
          id: 'oranex-oem',
          title: 'Oranex OEM',
          desc: 'Ugavi wa viwanda uliounganishwa kwa viwanda na biashara zinazokua Afrika.',
          features: ['Zana maalum na vipimo vya CAD', 'Vyuma imara vinavyostahimili msuguano', 'Majaribio ya kupokea kiwandani (FAT)']
        },
        {
          id: 'project-solutions',
          title: 'Suluhu za Miradi & Mitambo',
          desc: 'Kutafuta mitambo, kusafirisha, kufunga, kuanzisha majaribio, mafunzo na usaidizi.',
          features: ['Usimamizi wa wahandisi wenye uzoefu', 'Majaribio halisi ya uzalishaji', 'Mafunzo ya waendeshaji na miongozo']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: 'Mfuatano wa Utekelezaji wa Zabuni',
      stageCount: 'Hatua 1 → 10',
      inboundTitle: 'Nyaraka za Zabuni Zilizopokelewa',
      inboundPoints: [
        'Uchambuzi wa kina wa jedwali la idadi (BoQ)',
        'Ukaguzi wa vigezo vya chini vya kiufundi',
        'Barua rasmi za idhini ya wazalishaji (MAL / OEM)',
        'Tathmini ya hatari za muda na adhabu'
      ],
      deliveredTitle: 'Mradi Uliokabidhiwa Kiwandani',
      deliveredPoints: [
        'Mizigo ya baharini na angani na usafirishaji',
        'Ufungaji kazini na majaribio ya joto na baridi',
        'Mafunzo ya waendeshaji na miongozo ya kiufundi',
        'Dhamana ya kibiashara na vipuri halisi'
      ]
    },
    oranexOem: {
      kicker: 'Mfumo wa Oranex OEM',
      title: 'Ugavi wa Viwanda kwa Biashara Zinazokua',
      quote: '«Ununuzi wa kimataifa uliounganishwa kwa viwanda vinavyohitaji upatikanaji wa kuaminika wa malighafi na mitambo.»',
      desc: 'Viwanda vinavyokua nchini Ethiopia na kote Afrika mara nyingi vinakabiliwa na vigezo vikubwa vya oda na changamoto za fedha za kigeni. Oranex OEM inatatua changamoto hii kwa kuunganisha maombi na kuhakikisha usambazaji thabiti.',
      exploreBtn: 'Chunguza Oranex OEM',
      requestBtn: 'Omba Mfumo wa Ugavi',
      categoriesTitle: 'Makundi Muhimu ya Ugavi wa Viwanda',
      categories: [
        'Malighafi za viwandani',
        'Kemikali za viwanda',
        'Kemikali za ujenzi',
        'Viongezi vya uzalishaji',
        'Polima na masterbatch',
        'Vifungashio vya viwanda',
        'Vifaa vya matumizi kiwandani',
        'Vipuri maalum vya mashine',
        'Mitambo iliyochaguliwa ya uzalishaji'
      ],
      processTitle: 'Mfuatano wa Ugavi wa OEM',
      processFlow: [
        'MAHITAJI YA MTEJA',
        'MAPITIO YA ORANEX',
        'UTAFUTAJI DUNIANI',
        'MZALISHAJI WA OEM',
        'UJUMUISHAJI MIZIGO',
        'UKABIDHI SITE'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: 'Uzalishaji wa Kimkataba',
        title: 'Chapa Yako. Vipimo Vyako. Mtandao Wetu wa Ugavi.',
        desc: '«Kwa bidhaa zilizochaguliwa na mahitaji ya mara kwa mara, Oranex huratibu mikataba ya uzalishaji chini ya chapa ya mteja kulingana na viwango vya ubora.»',
        pathwayTitle: 'Mchakato wa Chapa ya Mteja (Private Label)',
        process: [
          'VIPIMO VYA MTEJA',
          'UKAGUZI WA KIWANDA',
          'IDHINI YA KIUFUNDI',
          'UZALISHAJI',
          'UWEKAJI WA CHAPA',
          'USAFIRISHAJI',
          'UGAVI ENDELEVU'
        ],
        requestBtn: 'Ulizia Kuhusu Chapa ya Kibinafsi'
      },
      fmcg: {
        kicker: 'Ukusanyaji wa Mahitaji & FMCG',
        title: 'Usambazaji Uliounganishwa & Ugavi wa Bidhaa Mbalimbali',
        desc: '«Kwa bidhaa za matumizi ya haraka na mahitaji ya kitaasisi, Oranex huunda mifumo ya ununuzi inayopunguza gharama za kitengo na kurahisisha taratibu za forodha.»',
        pathwayTitle: 'Mchakato wa Uagizaji wa Pamoja wa FMCG',
        process: [
          'MAHITAJI YA WATEJA',
          'UKUSANYAJI WA MAHITAJI',
          'UTAFUTAJI DUNIANI',
          'UJUMUISHAJI',
          'USAFIRISHAJI',
          'UAGIZAJI',
          'USAMBAZAJI WA NDANI'
        ],
        requestBtn: 'Ulizia Programu za Uagizaji wa Pamoja'
      }
    },
    tellUsRequirement: {
      kicker: 'Dawati la Ununuzi wa Moja kwa Moja',
      title: 'Tuambie Unachohitaji',
      subtitle: 'Iwe unahitaji malighafi za kemikali, mitambo ya viwanda, viongezi maalum au vipuri — wasilisha maelezo yako ya kiufundi na dawati letu la kimataifa litaandaa pendekezo kamili.',
      directHelpPrompt: 'Unahitaji ushauri wa haraka wa kibiashara?',
      directHelpLink: 'Zungumza nasi moja kwa moja kupitia WhatsApp',
      fields: {
        name: 'Jina la Muhusika *',
        company: 'Jina la Kampuni au Taasisi *',
        email: 'Barua Pepe Rasmi ya Kazi *',
        phone: 'Nambari ya Simu / WhatsApp *',
        productOrScope: 'Jina la Bidhaa au Upeo Unaohitajika *',
        specificationDetails: 'Vigezo vya Kiufundi na Maelezo',
        quantity: 'Kiwango Kinachokadiriwa',
        unit: 'Kipimo (Metric Tons, n.k.)',
        application: 'Matumizi ya Viwandani / Kusudi Linalokusudiwa',
        brandPreference: 'Chapa au Nchi Inayopendelewa',
        manufacturerPreference: 'Mzalishaji / OEM Anayelengwa (kama yupo)',
        deliveryLocation: 'Eneo Linalolengwa la Utoaji',
        targetDate: 'Tarehe Inayohitajika ya Uwasilishaji',
        notes: 'Maelezo ya Ziada au Bei Inayolengwa',
        uploadTitle: 'Ambatisha Karatasi ya Data ya Kiufundi (TDS), Michoro au BoQ',
        uploadHint: 'Faili za PDF, DOC, XLS, picha hadi 25MB kwa jumla.',
        submitBtn: 'Wasilisha Mahitaji kwa Dawati la Ununuzi',
        submitting: 'Inatuma Mahitaji...',
        successTitle: 'Mahitaji Yamepokelewa Kikamilifu',
        successDesc: 'Mahitaji yako yamesajiliwa katika injini yetu ya ununuzi. Mtaalamu wetu wa kiufundi atapitia vigezo na kuwasiliana nawe.',
        submitAnother: 'Wasilisha Mahitaji Mengine'
      }
    },
    businessServicesSection: {
      kicker: 'Uwezo wa Ziada wa Kibiashara',
      title: 'Huduma za Biashara za ORANEX',
      subtitle: 'Pamoja na ununuzi na uagizaji, Oranex hutoa ushauri wa kimkakati, uundaji wa mifumo ya biashara ya kimataifa na uhandisi wa ununuzi kote Afrika.',
      exploreServicesBtn: 'Tazama Huduma Zote za Biashara →'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: 'Kutafuta Vyanzo vya Kimataifa', desc: 'Ukaguzi wa viwanda, mazungumzo na ubora' },
        { id: 'consolidated-import', title: 'Uagizaji Uliounganishwa', desc: 'Kukusanya mizigo ya wasambazaji kadhaa' },
        { id: 'industrial-supply', title: 'Ugavi wa Viwanda', desc: 'Malighafi, kemikali na mikataba ya mara kwa mara' },
        { id: 'oranex-oem', title: 'Oranex OEM', desc: 'Zana maalum na utengenezaji wa chuma' },
        { id: 'private-label', title: 'Chapa ya Mteja & Mikataba ya Ugavi', desc: 'Uzalishaji chini ya chapa ya kampuni yako' },
        { id: 'project-solutions', title: 'Suluhu za Miradi', desc: 'Ufungaji, majaribio na huduma za eneo la mradi' }
      ],
      industryItems: [
        { id: 'manufacturing', title: 'Viwanda na Uzalishaji' },
        { id: 'construction', title: 'Ujenzi na Miundombinu' },
        { id: 'agriculture', title: 'Kilimo na Usindikaji' },
        { id: 'fmcg', title: 'FMCG na Ufungashaji' },
        { id: 'chemicals-materials', title: 'Kemikali na Malighafi' },
        { id: 'laboratories', title: 'Maabara na Sayansi' },
        { id: 'energy', title: 'Nishati na Umeme' },
        { id: 'water-environmental', title: 'Maji na Mazingira' },
        { id: 'government-ngo', title: 'Serikali / NGO / Miradi' }
      ],
      aboutItems: [
        { id: 'about', title: 'Wasifu wa Kampuni & Historia' },
        { id: 'network', title: 'Mtandao Wetu wa Viwanda Duniani' },
        { id: 'quality', title: 'Mifumo ya Ubora na Uzingatiaji Sheria' },
        { id: 'business-services', title: 'Huduma za Biashara za ORANEX' }
      ]
    },
    footerExtra: {
      partnerText: 'Mshirika wa Kimataifa wa Ununuzi na Ugavi',
      positioning: 'Mizizi nchini Ethiopia · Mtazamo wa Afrika · Uhusiano wa Kimataifa',
      aboutDesc: 'Kuunganisha wafanyabiashara, taasisi za umma na miradi nchini Ethiopia na kote barani Afrika na wazalishaji wa kimataifa na suluhu za uhandisi.',
      colSolutions: 'Suluhu',
      colIndustries: 'Viwanda',
      colQuickAccess: 'Ufikiaji wa Haraka',
      colInstitutional: 'Kisheria na Kitaasisi',
      legalDisclaimer: 'Huduma za zabuni, makadirio ya bei na utoaji ziko chini ya idhini ya mteja, upatikanaji wa viwanda na sheria zinazotumika za kila nchi.',
      allRightsReserved: 'Haki zote zimehifadhiwa. Oranex Trading One Member PLC.'
    },
    modals: {
      quoteTitle: 'Omba Ankara ya Proforma / RFQ',
      quoteSubtitle: 'Wasilisha mahitaji ya bidhaa ili kupokea bei za moja kwa moja za kiwanda, makadirio ya usafirishaji na muda wa utoaji.',
      requirementTitle: 'Tuambie Unachohitaji',
      requirementSubtitle: 'Eleza malighafi yoyote, mashine, kemikali au kifaa cha viwandani. Dawati letu litajibu mara moja.',
      tenderTitle: 'Wasilisha Zabuni kwa Usaidizi na Sourcing',
      tenderSubtitle: 'Pakia nyaraka za zabuni kwa tathmini ya kiufundi, uchambuzi wa BoQ na upangaji wa utoaji baada ya kushinda.',
      searchTitle: 'Tafuta Kwenye Jukwaa la Oranex',
      searchPlaceholder: 'Tafuta bidhaa, kemikali, polima, mitambo, huduma za zabuni...',
      whatsappTitle: 'Wasiliana Kupitia WhatsApp',
      whatsappSubtitle: 'Anza mazungumzo ya moja kwa moja na waratibu wetu wa ununuzi wa kimataifa.',
      close: 'Funga',
      submit: 'Tuma Ombi',
      submitting: 'Inachakata...',
      success: 'Ombi Limepokelewa Kikamilifu',
      countryPlaceholder: 'Chagua nchi yako',
      preferredLanguage: 'Lugha Inayopendelewa ya Mawasiliano'
    }
  },

  // ==========================================
  // AMHARIC (አማርኛ)
  // ==========================================
  am: {
    heroExtra: {
      microBar: {
        regions: 'አውሮፓ · እስያ · መካከለኛው ምስራቅ · አሜሪካ',
        portTransit: 'የጅቡቲ እና ሞጆ ደረቅ ወደብ ትራንዚት',
        verifiedDocs: 'የተረጋገጠ ቴክኒካል TDS እና COA ሰነድ'
      },
      corridor: {
        step1Title: 'የፍላጎት ዝርዝር መስፈርት:',
        step1Desc: 'እርስዎ መስፈርቶችን፣ ንድፎችን ወይም የናሙና ፍላጎት ያቀርባሉ።',
        step2Title: 'ዓለም አቀፍ ማረጋገጫ:',
        step2Desc: 'ኦራኔክስ ከተመሰከረላቸው ፋብሪካዎችና OEM ጋር ያገናኛል።',
        step3Title: 'ቀጥታ ርክክብ:',
        step3Desc: 'ማጠቃለል፣ ጭነት፣ የጉምሩክ ክሊራንስ እና ወደ ድርጅትዎ ርክክብ።',
        exploreBtn: 'የግዢ አማራጮችን ያስሱ →'
      }
    },
    quickEntryExtra: {
      pathway01Badge: 'አቅጣጫ 01 · ይፋዊ ጨረታ',
      pathway02Badge: 'አቅጣጫ 02 · RFQ / ፕሮፎርማ',
      pathway03Badge: 'አቅጣጫ 03 · ቀጥተኛ ፍላጎት',
      routingKicker: 'የቀጥታ አማራጮች መመሪያ',
      customSpecPrompt: 'ልዩ የቴክኒክ መስፈርት አለዎት?'
    },
    solutionsSection: {
      kicker: 'የተስተካከሉ የንግድ ሞዴሎች',
      title: 'እንደ ፍላጎትዎ የተዘጋጀ የግዥና አቅርቦት አገልግሎት',
      subtitle: 'ከአንድ ጊዜ የማሽነሪ ግዥ እስከ ቀጣይነት ያለው የጥሬ ዕቃ አቅርቦት ድረስ የእኛን አስተማማኝ አቅም ይመልከቱ።',
      viewAllBtn: 'ሁሉንም ዝርዝር የአገልግሎት አማራጮች ይመልከቱ',
      solutions: [
        {
          id: 'international-sourcing',
          title: 'ዓለም አቀፍ የፋብሪካ ፍለጋ (Sourcing)',
          desc: 'አምራቾችንና አቅራቢዎችን መለየት፣ የቴክኒክ ማስተባበር፣ የዋጋ ማወዳደር እና የናሙና ፍተሻ።',
          features: ['ቀጥታ የፋብሪካ ምርመራ እና ማረጋገጫ', 'ገለልተኛ የቅድመ ጭነት ፍተሻ', 'ትክክለኛ የTDS እና COA ሰነድ ቁጥጥር']
        },
        {
          id: 'industrial-supply',
          title: 'የኢንዱስትሪ ግብዓቶች አቅርቦት',
          desc: 'ጥሬ ዕቃዎች፣ ኬሚካሎች፣ ፖሊመሮች፣ ማሸጊያዎችና መለዋወጫዎች በቋሚ ውል አቅርቦት።',
          features: ['የታቀደ የሩብ ዓመት የኮንቴይነር ድልድል', 'አስተማማኝ የደህንነት ክምችት አስተዳደር', 'ያልተቋረጠ የማምረቻ መስመር አስተማማኝነት']
        },
        {
          id: 'consolidated-import',
          title: 'የተጠቃለለ ዓለም አቀፍ ገቢ ዕቃ (Consolidated)',
          desc: 'የተለያዩ አቅራቢዎችን ዕቃዎች በማሰባሰብ የትራንስፖርትና የወደብ ወጪን መቀነስ።',
          features: ['በባህር ማዶ መጋዘኖች ዕቃዎችን ማሰባሰብ', 'አንድ ወጥ የጉምሩክ ክሊራንስ ሰነድ', 'የጅቡቲና የሞጆ የወደብ ዴመሬጅ ወጪን መቀነስ']
        },
        {
          id: 'tenders',
          title: 'የጨረታና ፕሮኪውርመንት ድጋፍ',
          desc: 'ጨረታን ከመገምገም እና አምራች ከመፈለግ ጀምሮ እስከ ግዥ፣ ማስመጣትና ማስረከብ ድጋፍ።',
          features: ['የBoQ እና የቴክኒክ መመዘኛዎች ጥናት', 'የአምራች ፍቃድ ደብዳቤ (MAL) ማቅረብ', 'ተቋማዊ የውል ግዴታዎችን በጥራት መወጣት']
        },
        {
          id: 'oranex-oem',
          title: 'ኦራኔክስ OEM',
          desc: 'ለሚያድጉ የኢንዱስትሪ ፋብሪካዎችና ድርጅቶች የተዘጋጀ የተጠቃለለ አቅርቦት።',
          features: ['ልዩ ሻጋታዎችና የCAD ዲዛይን ቁጥጥር', 'ከፍተኛ የመቋቋም አቅም ያላቸው ብረታ ብረቶች', 'የፋብሪካ ተቀባይነት ማረጋገጫ ሙከራዎች (FAT)']
        },
        {
          id: 'project-solutions',
          title: 'የፕሮጀክት ማሽነሪዎችና መፍትሄዎች',
          desc: 'የፋብሪካ ማሽኖች ግዥ፣ ማጓጓዝ፣ መግጠም፣ ማስጀመር፣ ስልጠና እና ቀጣይ ድጋፍ።',
          features: ['በቦታው ላይ የባለሙያ መሐንዲሶች ቁጥጥር', 'የምርት ሙከራዎችን በተግባር ማስኬድ', 'የኦፕሬተሮች ስልጠና እና መመሪያዎች ርክክብ']
        }
      ]
    },
    tenderSectionExtra: {
      pipelineTitle: 'የጨረታ አፈፃፀም ቅደም ተከተል',
      stageCount: 'ደረጃ 1 → 10',
      inboundTitle: 'የቀረበው የጨረታ ሰነድ ትንተና',
      inboundPoints: [
        'የዋጋና መጠን ዝርዝር (BoQ) ትንተና',
        'ዝቅተኛ የቴክኒክ መስፈርቶች ኦዲት',
        'የአምራች ህጋዊ ፈቃድ ደብዳቤ (MAL / OEM)',
        'የጊዜ ገደብና የቅጣት ስጋት ግምገማ'
      ],
      deliveredTitle: 'የተረከበው ፕሮጀክት እና የመጨረሻ ርክክብ',
      deliveredPoints: [
        'የተጠቃለለ የባህር/አየር ጭነትና ትራንዚት',
        'በቦታው ላይ ገጥሞ ሙከራ ማካሄድ',
        'የሰራተኞች ስልጠናና ቴክኒካል ማኑዋሎች ርክክብ',
        'የንግድ ዋስትና እና ኦሪጅናል መለዋወጫዎች'
      ]
    },
    oranexOem: {
      kicker: 'የኦራኔክስ OEM ማዕቀፍ',
      title: 'ለሚያድጉ የኢንዱስትሪ ድርጅቶች አስተማማኝ አቅርቦት',
      quote: '«ጥሬ ዕቃዎችን እና ማሽነሪዎችን በተመጣጣኝ ዋጋና ጥራት ለሚፈልጉ አምራች ፋብሪካዎች የተዘጋጀ የተቀናጀ ዓለም አቀፍ ግዥ።»',
      desc: 'በኢትዮጵያና በአፍሪካ ያሉ በማደግ ላይ ያሉ ፋብሪካዎች በከፍተኛ አነስተኛ የትዕዛዝ መጠን (MOQ) እና በውጭ ምንዛሪ እጥረት ይፈተናሉ። ኦራኔክስ OEM ፍላጎቶችን በማሰባሰብና ቀጥታ የፋብሪካ አቅርቦት በማዘጋጀት ይህንን ክፍተት ይሞላል።',
      exploreBtn: 'ኦራኔክስ OEMን ያስሱ',
      requestBtn: 'የአቅርቦት ማዕቀፍ ይጠይቁ',
      categoriesTitle: 'ዋና ዋና የኢንዱስትሪ አቅርቦት ዘርፎች',
      categories: [
        'የኢንዱስትሪ ጥሬ ዕቃዎች',
        'የፋብሪካ ኬሚካሎች',
        'የኮንስትራክሽን ኬሚካሎች',
        'የማምረቻ አጋዥ ግብዓቶች (Additives)',
        'ፖሊመሮች እና ማስተርባች',
        'የኢንዱስትሪ ማሸጊያዎች',
        'ተፈላጊ የፋብሪካ ዕቃዎች',
        'ትክክለኛ የማሽነሪ መለዋወጫዎች',
        'የተመረጡ የማምረቻ ማሽኖች'
      ],
      processTitle: 'የOEM አቅርቦት ቅደም ተከተል',
      processFlow: [
        'የደንበኛ ፍላጎት',
        'የኦራኔክስ ግምገማ',
        'ዓለም አቀፍ ፍለጋ',
        'አምራች ፋብሪካ',
        'ማጠቃለልና መላክ',
        'ጣቢያ ላይ ርክክብ'
      ]
    },
    privateLabelAndFMCG: {
      privateLabel: {
        kicker: 'የኮንትራት ማምረት (Contract Manufacturing)',
        title: 'የእርስዎ ብራንድ። የእርስዎ ስፔስፊኬሽን። የእኛ የአቅርቦት አውታረ መረብ።',
        desc: '«ለተመረጡ ምርቶች እና ተከታታይ ፍላጎቶች፣ ኦራኔክስ በደንበኛው ብራንድ ስም የሚመረቱ ጥራት ያላቸው ዓለም አቀፍ የፋብሪካ ስምምነቶችን ያመቻቻል።»',
        pathwayTitle: 'የፕራይቬት ሌብል የማምረት ቅደም ተከተል',
        process: [
          'የደንበኛ መስፈርት',
          'የፋብሪካ ምርመራ',
          'የቴክኒክ ማረጋገጫ',
          'ምርት ማካሄድ',
          'የብራንድ ማተም',
          'ጭነት ማጓጓዝ',
          'ተከታታይ አቅርቦት'
        ],
        requestBtn: 'ስለ ፕራይቬት ሌብል ይጠይቁ'
      },
      fmcg: {
        kicker: 'የፍላጎት ማጠቃለያ እና የፍጆታ ዕቃዎች',
        title: 'የተጠቃለለ ስርጭት እና የባለብዙ ምርት አቅርቦት',
        desc: '«ለፈጣን የፍጆታ ዕቃዎች፣ ለተቋማት አቅርቦት እና ለተጠቃለሉ ገቢ ዕቃዎች፣ ኦራኔክስ ወጪን የሚቀንሱ የተቀናጁ ፕሮግራሞችን ያዘጋጃል።»',
        pathwayTitle: 'የተጠቃለለ አስመጪ እና FMCG ሂደት',
        process: [
          'የደንበኞች ፍላጎት',
          'ፍላጎትን ማጠቃለል',
          'ዓለም አቀፍ ፍለጋ',
          'ማሰባሰብ',
          'ጭነት ማጓጓዝ',
          'ማስመጣት',
          'የአገር ውስጥ ስርጭት'
        ],
        requestBtn: 'ስለ ተጠቃለለ ግዥ ይጠይቁ'
      }
    },
    tellUsRequirement: {
      kicker: 'የቀጥታ ግዢ እና ፕሮኪውርመንት ዴስክ',
      title: 'የሚፈልጉትን ይንገሩን',
      subtitle: 'የኢንዱስትሪ ጥሬ ዕቃ፣ የፋብሪካ ማሽነሪ፣ ኬሚካል ወይም መለዋወጫ ቢፈልጉ — የቴክኒክ ዝርዝርዎን ያስገቡ፤ የዓለም አቀፍ ግዥ ቢሮአችን የተሟላ ፕሮፖዛል ያዘጋጃል።',
      directHelpPrompt: 'ፈጣን የንግድ ግንኙነት ይፈልጋሉ?',
      directHelpLink: 'በቀጥታ በዋትስአፕ (WhatsApp) ያነጋግሩን',
      fields: {
        name: 'የሙሉ ስም *',
        company: 'የድርጅት / ተቋም ስም *',
        email: 'የስራ ኢሜይል *',
        phone: 'ስልክ / ዋትስአፕ ቁጥር *',
        productOrScope: 'የሚፈለገው ዕቃ ስም ወይም አይነት *',
        specificationDetails: 'የቴክኒክ መስፈርቶች እና ዝርዝሮች',
        quantity: 'የሚገመተው መጠን',
        unit: 'መለኪያ (ሜትሪክ ቶን፣ ቁጥር ወዘተ)',
        application: 'የኢንዱስትሪው የስራ መስክ / አገልግሎት',
        brandPreference: 'ተመራጭ ብራንድ ወይም መነሻ አገር',
        manufacturerPreference: 'ተመራጭ አምራች ፋብሪካ (ካለ)',
        deliveryLocation: 'የሚፈለግበት የመጨረሻ ቦታ',
        targetDate: 'የሚፈለግበት ቀን',
        notes: 'ተጨማሪ ማስታወሻ ወይም የታሰበ ዋጋ',
        uploadTitle: 'የቴክኒክ ሰነድ (TDS)፣ ንድፎች ወይም የዕቃ ዝርዝር (BoQ) ያያይዙ',
        uploadHint: 'PDF፣ DOC፣ XLS ወይም የምስል ፋይሎች እስከ 25MB ድረስ።',
        submitBtn: 'ፍላጎትን ለግዢ ዴስክ አስገባ',
        submitting: 'በመላክ ላይ...',
        successTitle: 'ፍላጎትዎ በተሳካ ሁኔታ ደርሶናል',
        successDesc: 'የቀረበው ፍላጎት በግዥ ሥርዓታችን ተመዝግቧል። የኦራኔክስ ቴክኒካል ባለሙያ መስፈርቶቹን መርምሮ ያነጋግርዎታል።',
        submitAnother: 'ሌላ ፍላጎት ያስገቡ'
      }
    },
    businessServicesSection: {
      kicker: 'ተጓዳኝ የኮርፖሬት አቅም',
      title: 'የኦራኔክስ የንግድ አገልግሎቶች',
      subtitle: 'ከቀጥታ ግዥና ማስመጣት በተጨማሪ ኦራኔክስ ስትራቴጂካዊ አማካሪነትን፣ ድንበር ተሻጋሪ የንግድ መዋቅርንና የግዥ ኢንጂነሪንግ አገልግሎትን ይሰጣል።',
      exploreServicesBtn: 'ሁሉንም የንግድ አገልግሎቶች ይመልከቱ →'
    },
    headerNavExtra: {
      solutionsItems: [
        { id: 'international-sourcing', title: 'ዓለም አቀፍ የፋብሪካ ፍለጋ', desc: 'የፋብሪካ ምርመራ፣ ድርድርና የጥራት ፍተሻ' },
        { id: 'consolidated-import', title: 'የተጠቃለለ ገቢ ዕቃ', desc: 'የተለያዩ አቅራቢዎች ዕቃዎችን ማሰባሰብ' },
        { id: 'industrial-supply', title: 'የኢንዱስትሪ አቅርቦት', desc: 'ጥሬ ዕቃዎች፣ ኬሚካሎችና ዓመታዊ ውሎች' },
        { id: 'oranex-oem', title: 'ኦራኔክስ OEM', desc: 'ልዩ ሻጋታዎችና የብረት ዕቃዎች ማምረት' },
        { id: 'private-label', title: 'የደንበኛ ብራንድ ማምረት', desc: 'በድርጅትዎ ስም ታሽገው የሚዘጋጁ ምርቶች' },
        { id: 'project-solutions', title: 'የፕሮጀክት መፍትሄዎች', desc: 'መግጠም፣ ማስጀመር እና የሳይት ድጋፍ' }
      ],
      industryItems: [
        { id: 'manufacturing', title: 'ማኑፋክቸሪንግ እና ፋብሪካዎች' },
        { id: 'construction', title: 'ኮንስትራክሽን እና መሰረተ ልማት' },
        { id: 'agriculture', title: 'ግብርና እና አግሮ-ኢንዱስትሪ' },
        { id: 'fmcg', title: 'የፍጆታ ዕቃዎች እና ማሸጊያ' },
        { id: 'chemicals-materials', title: 'ኬሚካሎች እና ጥሬ ዕቃዎች' },
        { id: 'laboratories', title: 'ላቦራቶሪዎች እና ሳይንሳዊ ምርምር' },
        { id: 'energy', title: 'ኢነርጂ እና ኤሌክትሪካል' },
        { id: 'water-environmental', title: 'ውሃ እና አካባቢ ጥበቃ' },
        { id: 'government-ngo', title: 'መንግስታዊ / NGO / የልማት ፕሮጀክቶች' }
      ],
      aboutItems: [
        { id: 'about', title: 'የድርጅቱ መገለጫ እና ታሪክ' },
        { id: 'network', title: 'የዓለም አቀፍ ፋብሪካዎች አውታረ መረብ' },
        { id: 'quality', title: 'የጥራትና የህግ ተገዢነት ደንቦች' },
        { id: 'business-services', title: 'የኦራኔክስ የንግድ አገልግሎቶች' }
      ]
    },
    footerExtra: {
      partnerText: 'ዓለም አቀፍ የግዥና የአቅርቦት አጋር',
      positioning: 'ኢትዮጵያዊ መነሻ · አፍሪካዊ እይታ · ዓለም አቀፍ ግንኙነት',
      aboutDesc: 'በኢትዮጵያና በአፍሪካ ያሉ ኢንተርፕራይዞችን፣ ተቋማትንና ፕሮጀክቶችን ከተመሰከረላቸው ዓለም አቀፍ ፋብሪካዎች እና የምህንድስና መፍትሄዎች ጋር እናገናኛለን።',
      colSolutions: 'የግዥ አማራጮች',
      colIndustries: 'የኢንዱስትሪ ዘርፎች',
      colQuickAccess: 'ፈጣን መዳረሻዎች',
      colInstitutional: 'ህጋዊና ተቋማዊ',
      legalDisclaimer: 'የጨረታ ድጋፍ፣ የዋጋ ማቅረቢያና የማድረስ አገልግሎቶች እንደ ደንበኛው ውክልና፣ እንደ አምራች ፋብሪካዎች ዝግጁነትና እንደየአገሩ ህጎች የሚተገበሩ ናቸው።',
      allRightsReserved: 'መብቱ በህግ የተጠበቀ ነው። ኦራኔክስ ትሬዲንግ የአንድ አባል ኃ/የተ/የግ/ማህበር።'
    },
    modals: {
      quoteTitle: 'የፕሮፎርማ / RFQ መጠየቂያ',
      quoteSubtitle: 'ቀጥታ የፋብሪካ ዋጋ፣ የጭነት ግምትና የመድረሻ ጊዜ ለማግኘት የምርት ፍላጎትዎን ያስገቡ።',
      requirementTitle: 'የሚፈልጉትን ይንገሩን',
      requirementSubtitle: 'ማንኛውንም ጥሬ ዕቃ፣ ማሽነሪ፣ ኬሚካል ወይም የኢንዱስትሪ መሣሪያ ፍላጎት ይግለጹ። ቡድናችን አፋጣኝ ምላሽ ይሰጣል።',
      tenderTitle: 'የጨረታ ሰነድ ማቅረቢያ',
      tenderSubtitle: 'ለቴክኒካል ግምገማ፣ ለBoQ ዝግጅት፣ ለአምራች ፍለጋ እና ለድህረ-ውድድር አቅርቦት እቅድ የጨረታ ሰነድዎን ይጫኑ።',
      searchTitle: 'በኦራኔክስ ፕላትፎርም ላይ ይፈልጉ',
      searchPlaceholder: 'ምርቶችን፣ ኬሚካሎችን፣ ፖሊመሮችን፣ ማሽኖችን፣ የጨረታ አገልግሎቶችን ይፈልጉ...',
      whatsappTitle: 'በዋትስአፕ ያነጋግሩን',
      whatsappSubtitle: 'ከዓለም አቀፍ የግዥ አስተባባሪዎቻችን ጋር ቀጥታ ውይይት ይጀምሩ።',
      close: 'ዝጋ',
      submit: 'ጥያቄውን ላክ',
      submitting: 'በማስኬድ ላይ...',
      success: 'ጥያቄዎ በተሳካ ሁኔታ ደርሶናል',
      countryPlaceholder: 'አገርዎን ይምረጡ',
      preferredLanguage: 'የመገናኛ ቋንቋ ይምረጡ'
    }
  }
};

export const getSectionTranslations = (lang: LanguageCode): SectionTranslations => {
  return SECTION_TRANSLATIONS[lang] || SECTION_TRANSLATIONS.en;
};
