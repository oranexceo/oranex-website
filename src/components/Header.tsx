import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  ChevronDown,
  Globe,
  Menu,
  X,
  HardHat,
  FlaskConical,
  Factory,
  Truck,
  Wrench,
  ShieldCheck,
  PhoneCall,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  PackageCheck,
  Calculator
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentView, navigate, language, setLanguage, openQuoteModal, openSearchModal, t } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConstructDropdownOpen, setIsConstructDropdownOpen] = useState(false);
  const [isDivisionsDropdownOpen, setIsDivisionsDropdownOpen] = useState(false);

  const constructionLinks = [
    {
      label: language === 'zh' ? '一站式工程建材集采' : language === 'am' ? 'ተርንኪ የግንባታ ዕቃዎች አቅርቦት' : language === 'ar' ? 'توريد مواد البناء المتكامل' : 'Construction Materials & Turnkey Sourcing',
      view: 'construction-materials-sourcing',
      sub: undefined,
      icon: Building2,
      desc: language === 'zh' ? '一个集采伙伴。覆盖工程全阶段。' : language === 'am' ? 'አንድ የግዥ አጋር። ለእያንዳንዱ የግንባታ ምዕራፍ።' : language === 'ar' ? 'شريك توريد واحد. لكل مراحل البناء.' : 'ONE SOURCING PARTNER. EVERY STAGE.',
      badge: language === 'zh' ? '交钥匙' : language === 'am' ? 'ተርንኪ' : language === 'ar' ? 'متكامل' : 'Turnkey'
    },
    {
      label: language === 'zh' ? '麦卡托批发与拼箱集采 (LCL)' : language === 'am' ? 'የመርካቶ ጅምላ እና ኮንቴነር ማጠቃለያ (LCL)' : language === 'ar' ? 'تجميع وتوريد بضائع تجار ميركاتو' : 'Merkato Wholesale & LCL Consolidation',
      view: 'merkato-consolidation',
      sub: undefined,
      icon: PackageCheck,
      desc: language === 'zh' ? '义乌/广州集运，小批量2 CBM起拼，银行外汇形式发票' : language === 'am' ? 'የጋራ ኮንቴነር ከ2 CBM ጀምሮ፣ ይዉ እና ጓንግዙ መጋዘኖች፣ የባንክ ፕሮፎርማ' : language === 'ar' ? 'تجميع حاويات مشتركة من 2 CBM، مستودعات إيوو وقوانغتشو، وفواتير بنكية معتمدة' : 'LCL shared containers from 2 CBM, Yiwu & Guangzhou hubs, bank proformas for CBE/Awash',
      badge: language === 'zh' ? '拼箱' : language === 'am' ? 'የተጠቃለለ' : language === 'ar' ? 'تجميع LCL' : 'From 2 CBM'
    },
    {
      label: language === 'zh' ? '到岸总成本与关税计算器' : language === 'am' ? 'የመጨረሻ ዋጋ እና የጉምሩክ ቀረጥ ማስያ' : language === 'ar' ? 'حاسبة التكلفة الإجمالية والجمارك' : 'Landed Cost & Customs Calculator',
      view: 'landed-cost-calculator',
      sub: undefined,
      icon: Calculator,
      desc: language === 'zh' ? '测算CIF、关税、增值税、附加税与莫乔干港陆运总价' : language === 'am' ? 'የCIF፣ የጉምሩክ ቀረጥ፣ ቴምብር እና የሞጆ ወደብ ወጪዎች' : language === 'ar' ? 'حساب الرسوم الجمركية والضرائب وتكلفة ميناء مودجو' : 'Calculate CIF, Customs duty, VAT, Sur-tax & Modjo inland costs',
      badge: language === 'zh' ? '计算器' : language === 'am' ? 'ማስያ' : language === 'ar' ? 'حاسبة' : 'Calculator'
    },
    {
      label: language === 'zh' ? '概览与中国战略供应链' : language === 'am' ? 'አጠቃላይ እይታ እና የአቅርቦት ሞዴል' : language === 'ar' ? 'نظرة عامة وشراكة التوريد' : 'Overview & Sourcing Partnership',
      view: 'construction-industrial',
      sub: 'overview',
      icon: Building2,
      desc: language === 'zh' ? '国际直采供应链与落地保障' : 'International supply chain model'
    },
    {
      label: language === 'zh' ? 'OCHEMI 建筑化学特种材料' : language === 'am' ? 'የኮንስትራክሽን ኬሚካሎች (OCHEMI)' : language === 'ar' ? 'كيماويات البناء (OCHEMI)' : 'Construction Chemicals (OCHEMI)',
      view: 'construction-industrial',
      sub: 'construction-chemicals',
      icon: FlaskConical,
      desc: language === 'zh' ? '聚羧酸减水剂母液与混凝土改性外加剂' : 'PCE superplasticizers & admixtures'
    },
    {
      label: language === 'zh' ? '商砼搅拌站与生产装备' : language === 'am' ? 'የኮንክሪት ማምረቻ እና ማደባለቂያ መሣሪያዎች' : language === 'ar' ? 'محطات ومعدات خلط الخرسانة' : 'Concrete & Batching Solutions',
      view: 'construction-industrial',
      sub: 'concrete-production-equipment',
      icon: Factory,
      desc: language === 'zh' ? '商业搅拌站、搅拌运输车与泵车' : 'Commercial plants & transit mixers'
    },
    {
      label: language === 'zh' ? '建筑主材与结构精装' : language === 'am' ? 'የግንባታ እና የማጠናቀቂያ ዕቃዎች' : language === 'ar' ? 'مواد البناء والتشطيب' : 'Building & Finishing Materials',
      view: 'construction-industrial',
      sub: 'building-materials',
      icon: Layers,
      desc: language === 'zh' ? '结构钢材、防水系统与幕墙门窗' : 'Structural steel, rebar & piping'
    },
    {
      label: language === 'zh' ? '重型工程机械与车辆' : language === 'am' ? 'የከባድ ኮንስትራክሽን ማሽነሪዎች' : language === 'ar' ? 'معدات وآليات البناء الثقيلة' : 'Construction Machinery & Fleet',
      view: 'construction-industrial',
      sub: 'construction-machinery',
      icon: Truck,
      desc: language === 'zh' ? '挖掘机、装载机与工程吊车' : 'Excavators, loaders & mobile cranes'
    },
    {
      label: language === 'zh' ? '工业备件与易损耗材' : language === 'am' ? 'የኢንዱስትሪ መለዋወጫዎች' : language === 'ar' ? 'المستلزمات الصناعية وقطع الغيار' : 'Industrial Supplies & Spares',
      view: 'construction-industrial',
      sub: 'industrial-supplies',
      icon: Wrench,
      desc: language === 'zh' ? '工业渣浆泵、阀门与耐磨衬板' : 'Slurry pumps, valves & wear plates'
    },
    {
      label: language === 'zh' ? '全球直采与代工定制 (OEM)' : language === 'am' ? 'ቀጥታ ዓለም አቀፍ ግዥ እና OEM' : language === 'ar' ? 'التوريد العالمي والعلامات الخاصة' : 'Global Sourcing & OEM Branding',
      view: 'construction-industrial',
      sub: 'global-sourcing-oem',
      icon: Globe,
      desc: language === 'zh' ? '厂家直销协议与私标定制' : 'Direct purchasing & private-label'
    },
    {
      label: language === 'zh' ? '现场技术支持与实验室配合比' : language === 'am' ? 'የቴክኒክ ድጋፍ እና የላብራቶሪ አገልግሎት' : language === 'ar' ? 'الخدمات التقنية ودعم المختبر' : 'Technical Services & Laboratory',
      view: 'construction-industrial',
      sub: 'technical-services',
      icon: ShieldCheck,
      desc: language === 'zh' ? '混凝土配合比优化与现场试件检测' : 'Mix designs & field trials'
    }
  ];

  const divisionsLinks = [
    {
      name: language === 'zh' ? '交钥匙工程材料集采' : language === 'am' ? 'ተርንኪ የግንባታ ዕቃዎች አቅርቦት' : language === 'ar' ? 'توريد مواد البناء المتكامل' : 'Turnkey Materials Sourcing',
      desc: language === 'zh' ? '沥青路面、混凝土、建筑主材及装备全阶段一站式协调' : 'One sourcing partner for every stage: road, concrete, building, equipment',
      code: 'TURNKEY',
      view: 'construction-materials-sourcing'
    },
    {
      name: language === 'zh' ? 'ORANEX 国际贸易' : language === 'am' ? 'ኦራኔክስ ንግድ' : language === 'ar' ? 'أورانكس للتجارة' : 'ORANEX Trading',
      desc: language === 'zh' ? '全球寻源、国际结算及大宗采购代理' : 'Global sourcing, trade facilitation & international procurement partner',
      code: 'OTRADE',
      view: 'solutions',
      sub: 'otrade'
    },
    {
      name: language === 'zh' ? '工程与工业供应链' : language === 'am' ? 'የኮንስትራክሽን እና ኢንዱስትሪ አቅርቦት' : language === 'ar' ? 'سلسلة التوريد الإنشائي والصناعي' : 'Construction & Industrial Supply',
      desc: language === 'zh' ? '携手中国制造战略伙伴提供建材、机械与搅拌站' : 'Materials, equipment, batching plants & machinery via Our Chinese partner',
      code: 'ORANEX × PARTNER',
      view: 'construction-industrial'
    },
    {
      name: language === 'zh' ? 'OCHEMI 特种化学建材' : language === 'am' ? 'OCHEMI የኬሚካል መፍትሄዎች' : language === 'ar' ? 'حلول أوكيمي الكيميائية' : 'OCHEMI Chemical Solutions',
      desc: language === 'zh' ? '专业混凝土改性剂、聚羧酸高性能减水剂与特种砂浆' : 'Specialist construction chemicals, PCE superplasticizers & mortars',
      code: 'OCHEMI',
      view: 'construction-industrial',
      sub: 'construction-chemicals'
    },
    {
      name: language === 'zh' ? '工程招标与大宗集采服务' : language === 'am' ? 'የጨረታ እና የግዥ ድጋፍ' : language === 'ar' ? 'خدمات المناقصات والمشتريات' : 'Tender & Procurement Services',
      desc: language === 'zh' ? '全非基础设施招标支持、工程量清单核算与项目供货' : 'Infrastructure tender support, BoQ co-bidding & project supply',
      code: 'TENDERS',
      view: 'tenders'
    },
    {
      name: language === 'zh' ? '全球寻源与私标代工 (OEM)' : language === 'am' ? 'ዓለም አቀፍ ግዥ እና OEM' : language === 'ar' ? 'التوريد العالمي وبرامج التصنيع OEM' : 'Global Sourcing & OEM Programs',
      desc: language === 'zh' ? '定制配方、客制化工业包装与国际品牌私标' : 'Bespoke manufacturing, private labeling & custom formulations',
      code: 'OEM & PRIVATE LABEL',
      view: 'construction-industrial',
      sub: 'global-sourcing-oem'
    },
    {
      name: language === 'zh' ? '麦卡托批发与拼箱集运' : language === 'am' ? 'የመርካቶ ጅምላ እና የጋራ ኮንቴነር' : language === 'ar' ? 'تجميع وتوريد بضائع تجار ميركاتو' : 'Merkato Wholesale & Container Consolidation',
      desc: language === 'zh' ? '义乌/广州集散仓直发，2 CBM起拼，银行合规形式发票' : 'Direct China factory groupage, LCL shared containers & bank-compliant proformas',
      code: 'MERKATO LCL',
      view: 'merkato-consolidation'
    },
    {
      name: language === 'zh' ? '埃塞进口清关到岸价计算器' : language === 'am' ? 'የኢትዮጵያ ጉምሩክ የመጨረሻ ዋጋ ማስያ' : language === 'ar' ? 'حاسبة التكلفة الإجمالية والجمارك' : 'Ethiopian Landed Cost Calculator',
      desc: language === 'zh' ? '实时测算CIF、海关关税、增值税、附加税与陆运交付总成本' : 'Live CIF, Ethiopian Customs duty, VAT, Sur-tax, and inland Modjo transit valuation',
      code: 'LANDED COST',
      view: 'landed-cost-calculator'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              ORANEX TRADING ONE MEMBER PLC
            </span>
            <span className="hidden md:inline text-slate-400">
              {language === 'zh' ? (
                <>国际伙伴: <strong className="text-white">中国战略制造伙伴</strong></>
              ) : language === 'am' ? (
                <>ዓለም አቀፍ አጋር: <strong className="text-white">የቻይና አጋራችን</strong></>
              ) : language === 'ar' ? (
                <>الشريك الدولي: <strong className="text-white">شريكنا الصيني</strong></>
              ) : (
                <>International Partner: <strong className="text-white">Our Chinese partner</strong></>
              )}
            </span>
            <span className="hidden lg:inline text-slate-400">
              Addis Ababa, Ethiopia • Regional Hub East Africa
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector: English, Chinese, Amharic, Arabic */}
            <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-0.5 rounded-lg border border-slate-700 text-slate-300">
              <Globe className="w-3 h-3 text-blue-400 shrink-0" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === 'en'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="English"
              >
                EN
              </button>
              <span className="text-slate-600 text-[10px]">|</span>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === 'zh'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Chinese (中文)"
              >
                中文
              </button>
              <span className="text-slate-600 text-[10px]">|</span>
              <button
                onClick={() => setLanguage('am')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === 'am'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Amharic (አማርኛ)"
              >
                አማርኛ
              </button>
              <span className="text-slate-600 text-[10px]">|</span>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === 'ar'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Arabic (العربية)"
              >
                العربية
              </button>
            </div>

            <button
              onClick={() => navigate('admin')}
              className="flex items-center gap-1 hover:text-white transition text-slate-300 hover:underline pl-2 border-l border-slate-700"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>
                {language === 'zh' ? '管理后台' : language === 'am' ? 'አድሚን' : language === 'ar' ? 'الإدارة' : 'Admin & Marketing'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-900 flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-md group-hover:scale-105 transition">
              OX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">ORANEX</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {language === 'zh' ? '× 中国制造战略伙伴' : language === 'am' ? '× የቻይና አጋራችን' : language === 'ar' ? '× شريكنا الصيني' : '× Our Chinese partner'}
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                {language === 'zh'
                  ? '全球直采与采购伙伴 • 埃塞俄比亚'
                  : language === 'am'
                  ? 'ዓለም አቀፍ ግዥ እና አቅርቦት አጋር'
                  : language === 'ar'
                  ? 'شريك التوريد والمشتريات العالمي'
                  : 'Global Sourcing & Procurement Partner'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'home' ? 'text-blue-700 bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.nav.home}
            </button>

            <button
              onClick={() => navigate('industries')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'industries' ? 'text-blue-700 bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {language === 'zh' ? '目标行业' : language === 'am' ? 'ዘርፎች' : language === 'ar' ? 'القطاعات' : 'Industries'}
            </button>

            <button
              onClick={() => navigate('merkato-consolidation')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'merkato-consolidation' ? 'text-amber-700 bg-amber-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {language === 'zh' ? '拼箱集运 (LCL)' : language === 'am' ? 'የተጠቃለለ ጭነት' : language === 'ar' ? 'تجميع LCL' : 'Consolidated LCL'}
            </button>

            {/* Construction & Industrial Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsConstructDropdownOpen(true)}
              onMouseLeave={() => setIsConstructDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('construction-industrial')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-lg transition ${
                  currentView === 'construction-industrial' || currentView === 'construction-materials-sourcing'
                    ? 'text-blue-700 bg-blue-50/80 shadow-sm'
                    : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
                }`}
              >
                <HardHat className="w-4 h-4 text-blue-600" />
                <span>
                  {language === 'zh'
                    ? '工程与工业供应链'
                    : language === 'am'
                    ? 'ኮንስትራክሽን እና ኢንዱስትሪ'
                    : language === 'ar'
                    ? 'البناء والتوريد الصناعي'
                    : 'Construction & Industrial'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isConstructDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 animate-in fade-in duration-150 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">
                      {language === 'zh'
                        ? 'ORANEX × 中国战略制造伙伴'
                        : language === 'am'
                        ? 'ኦራኔክስ × የቻይና አጋራችን'
                        : language === 'ar'
                        ? 'أورانكس × شريكنا الصيني'
                        : 'Oranex × Our Chinese partner Supply'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {language === 'zh'
                        ? '直通中国优质工程制造与技术支持'
                        : language === 'am'
                        ? 'የኢትዮጵያ ገዢዎችን ከዓለም አቀፍ አምራቾች ጋር ማገናኘት'
                        : language === 'ar'
                        ? 'ربط المشتري الإثيوبي مع المصانع العالمية'
                        : 'Connecting Ethiopian buyers with international manufacturing'}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    {constructionLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          navigate(item.view || 'construction-industrial', item.sub);
                          setIsConstructDropdownOpen(false);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition group ${
                          item.badge ? 'bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60' : 'hover:bg-blue-50/80'
                        }`}
                      >
                        <item.icon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        openQuoteModal();
                        setIsConstructDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                    >
                      <span>{t.cta.requestQuote}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Business Divisions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDivisionsDropdownOpen(true)}
              onMouseLeave={() => setIsDivisionsDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('solutions')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                  currentView === 'solutions' ? 'text-blue-700 bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>
                  {language === 'zh'
                    ? '业务板块'
                    : language === 'am'
                    ? 'ዘርፎች'
                    : language === 'ar'
                    ? 'القطاعات'
                    : 'Divisions'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isDivisionsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 animate-in fade-in duration-150 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">
                      {language === 'zh' ? 'ORANEX 核心商业板块' : language === 'am' ? 'የኦራኔክስ የንግድ መድረኮች' : language === 'ar' ? 'منظومة قطاعات أورانكس' : 'Oranex Enterprise Ecosystem'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {language === 'zh' ? '成熟稳定的国际商贸与工程集采平台' : 'Established commercial platforms'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {divisionsLinks.map((div) => (
                      <button
                        key={div.code}
                        onClick={() => {
                          navigate(div.view, div.sub);
                          setIsDivisionsDropdownOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{div.name}</span>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {div.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{div.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('catalog')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'catalog' ? 'text-blue-700 bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {language === 'zh' ? '产品目录' : language === 'am' ? 'የምርት ካታሎግ' : language === 'ar' ? 'كتالوج المنتجات' : 'Product Catalogue'}
            </button>

            <button
              onClick={() => navigate('about')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'about' ? 'text-blue-700 bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.nav.about}
            </button>

            <button
              onClick={() => navigate('contact')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'contact' ? 'text-blue-700 bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => openSearchModal()}
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">{language === 'zh' ? '搜索' : language === 'am' ? 'ፈልግ' : language === 'ar' ? 'بحث' : 'Search'}</span>
              <kbd className="hidden xl:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-300">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition transform active:scale-95"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.cta.requestQuote}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => openSearchModal()}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
              title="Search"
            >
              <Search className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={() => openQuoteModal()}
              className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              RFQ
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Mobile Language Switcher */}
          <div className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'zh' ? '选择语言' : language === 'am' ? 'ቋንቋ ይምረጡ' : language === 'ar' ? 'اختر اللغة' : 'Select Language'}</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                  language === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                  language === 'zh' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                  language === 'am' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                አማርኛ
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                  language === 'ar' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              navigate('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100"
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => {
              navigate('industries');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-blue-700 py-2 border-b border-slate-100 flex items-center justify-between"
          >
            <span>{language === 'zh' ? '目标行业与商机' : language === 'am' ? 'ዘርፎች እና እድሎች' : language === 'ar' ? 'القطاعات والفرص' : 'Industries & Sourcing'}</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">New</span>
          </button>

          <button
            onClick={() => {
              navigate('merkato-consolidation');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-amber-700 py-2 border-b border-slate-100 flex items-center justify-between"
          >
            <span>{language === 'zh' ? '拼箱集运 (LCL)' : language === 'am' ? 'የተጠቃለለ ጭነት (LCL)' : language === 'ar' ? 'تجميع وشحن الحاويات LCL' : 'Consolidated Sourcing (LCL)'}</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">From 2 CBM</span>
          </button>

          <div className="py-2 border-b border-slate-100">
            <div className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <HardHat className="w-4 h-4" />
              <span>
                {language === 'zh'
                  ? '工程与工业供应链'
                  : language === 'am'
                  ? 'ኮንስትራክሽን እና ኢንዱስትሪ'
                  : language === 'ar'
                  ? 'البناء والتوريد الصناعي'
                  : 'Construction & Industrial Supply Chain'}
              </span>
            </div>
            <div className="space-y-1.5 pl-6">
              {constructionLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.view || 'construction-industrial', item.sub);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left text-xs py-1 flex items-center justify-between ${
                    item.badge ? 'font-bold text-blue-700' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <span>• {item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-2 border-b border-slate-100">
            <div className="font-bold text-slate-900 mb-2">
              {language === 'zh' ? '业务板块' : language === 'am' ? 'ዘርፎች' : language === 'ar' ? 'القطاعات' : 'Business Divisions'}
            </div>
            <div className="space-y-1 pl-4 text-xs text-slate-700">
              <button onClick={() => { navigate('construction-materials-sourcing'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1 font-bold text-blue-700">
                • {language === 'zh' ? '一站式工程建材集采' : language === 'am' ? 'ተርንኪ የግንባታ ዕቃዎች አቅርቦት' : language === 'ar' ? 'توريد مواد البناء المتكامل' : 'Turnkey Construction Materials Sourcing'}
              </button>
              <button onClick={() => { navigate('solutions', 'otrade'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1">
                • {language === 'zh' ? 'ORANEX 国际贸易' : language === 'am' ? 'ኦራኔክስ ንግድ' : language === 'ar' ? 'أورانكس للتجارة' : 'ORANEX Trading'}
              </button>
              <button onClick={() => { navigate('construction-industrial'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1">
                • {language === 'zh' ? '工程与工业供应链' : language === 'am' ? 'የኮንስትራክሽን እና ኢንዱስትሪ አቅርቦት' : language === 'ar' ? 'سلسلة التوريد الإنشائي والصناعي' : 'Construction & Industrial Supply'}
              </button>
              <button onClick={() => { navigate('construction-industrial', 'construction-chemicals'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1">
                • {language === 'zh' ? 'OCHEMI 特种化学建材' : language === 'am' ? 'OCHEMI የኬሚካል መፍትሄዎች' : language === 'ar' ? 'حلول أوكيمي الكيميائية' : 'OCHEMI Chemical Solutions'}
              </button>
              <button onClick={() => { navigate('tenders'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1">
                • {language === 'zh' ? '工程招标与大宗集采服务' : language === 'am' ? 'የጨረታ እና የግዥ ድጋፍ' : language === 'ar' ? 'خدمات المناقصات والمشتريات' : 'Tender & Procurement Services'}
              </button>
              <button onClick={() => { navigate('construction-industrial', 'global-sourcing-oem'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1">
                • {language === 'zh' ? '全球寻源与私标代工 (OEM)' : language === 'am' ? 'ዓለም አቀፍ ግዥ እና OEM' : language === 'ar' ? 'التوريد العالمي وبرامج التصنيع OEM' : 'Global Sourcing & OEM Programs'}
              </button>
              <button onClick={() => { navigate('merkato-consolidation'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1 font-semibold text-amber-600">
                • {language === 'zh' ? '麦卡托批发与拼箱集运 (LCL)' : language === 'am' ? 'የመርካቶ ጅምላ እና የጋራ ኮንቴነር' : language === 'ar' ? 'تجميع وتوريد بضائع تجار ميركاتو' : 'Merkato Wholesale & Container Consolidation'}
              </button>
              <button onClick={() => { navigate('landed-cost-calculator'); setIsMobileMenuOpen(false); }} className="w-full text-left py-1 font-bold text-emerald-700">
                • {language === 'zh' ? '埃塞到岸价与关税计算器' : language === 'am' ? 'የመጨረሻ ዋጋ እና የጉምሩክ ቀረጥ ማስያ' : language === 'ar' ? 'حاسبة التكلفة الإجمالية والجمارك' : 'Landed Cost & Customs Calculator'}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              navigate('catalog');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100"
          >
            {language === 'zh' ? '产品目录' : language === 'am' ? 'የምርት ካታሎግ' : language === 'ar' ? 'كتالوج المنتجات' : 'Product Catalogue'}
          </button>

          <button
            onClick={() => {
              navigate('about');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100"
          >
            {t.nav.about}
          </button>

          <button
            onClick={() => {
              navigate('contact');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100"
          >
            {t.nav.contact}
          </button>

          <button
            onClick={() => {
              navigate('admin');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left font-bold text-amber-700 py-2 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'zh' ? '管理后台与营销引擎' : language === 'am' ? 'አድሚን እና ማርኬቲንግ' : language === 'ar' ? 'الإدارة ومحرك التسويق' : 'Admin & Marketing Engine'}</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                openQuoteModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md"
            >
              {t.cta.requestQuote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
