import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Solution,
  Industry,
  Project,
  OranexBusinessService,
  Lead,
  TenderRequirement
} from '../types';
import {
  INITIAL_LEADS,
  INITIAL_TENDERS,
  PRODUCTS_DATA,
  SOLUTIONS_DATA,
  INDUSTRIES_DATA,
  PROJECTS_DATA,
  BUSINESS_SERVICES_DATA
} from '../data/mockData';
import { LanguageCode, LanguageConfig, LANGUAGES, LANGUAGE_MAP } from '../i18n/languages';
import { TRANSLATIONS, TranslationSchema } from '../i18n/translations';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  whatsappNumber: string;
}

interface AppContextType {
  currentView: string;
  subTab?: string;
  selectedSubId?: string;
  setSelectedSubId: (id?: string) => void;
  navigate: (view: string, subTab?: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageConfig: LanguageConfig;
  availableLanguages: LanguageConfig[];
  direction: 'ltr' | 'rtl';
  t: TranslationSchema;

  // Modals
  isQuoteModalOpen: boolean;
  openQuoteModal: (product?: Product | { productOrScope?: string; name?: string } | any) => void;
  closeQuoteModal: () => void;
  quotePrefillProduct: Product | null;

  isRequirementModalOpen: boolean;
  openRequirementModal: (data?: any) => void;
  closeRequirementModal: () => void;

  isTenderModalOpen: boolean;
  openTenderModal: (data?: any) => void;
  closeTenderModal: () => void;

  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  isWhatsAppModalOpen: boolean;
  openWhatsAppModal: (text?: string) => void;
  closeWhatsAppModal: () => void;
  whatsAppCustomText: string;
  companyInfo: CompanyInfo;

  // Data
  leads: Lead[];
  submitLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'> & { type?: string }) => void;
  tenders: TenderRequirement[];
  toasts: Toast[];
  addToast: (titleOrMessage: string, messageOrType?: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  products: Product[];
  allProducts: Product[];
  solutions: Solution[];
  industries: Industry[];
  projects: Project[];
  businessServices: OranexBusinessService[];

  // Campaign Attribution
  capturedUtm: {
    source?: string;
    medium?: string;
    campaign?: string;
    campaignId?: string;
    postId?: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const COMPANY_INFO: CompanyInfo = {
  phone: '+251 912 233 688',
  email: 'Oranexceo@gmail.com',
  address: 'NSL Sub-City, Addis Ababa, Federal Democratic Republic of Ethiopia',
  whatsapp: '+251912233688',
  whatsappNumber: '+251912233688'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [subTab, setSubTab] = useState<string | undefined>(undefined);
  const [selectedSubId, setSelectedSubId] = useState<string | undefined>(undefined);
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('oranex_lang') as LanguageCode;
      if (saved && (saved in TRANSLATIONS)) {
        return saved;
      }
    } catch {}
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    if (lang === language) return;
    setLanguageState(lang);
    try {
      localStorage.setItem('oranex_lang', lang);
    } catch {}

    const langNames: Record<LanguageCode, string> = {
      en: 'English',
      zh: '中文 (Chinese)',
      am: 'አማርኛ (Amharic)',
      ar: 'العربية (Arabic)',
      fr: 'Français (French)',
      pt: 'Português',
      sw: 'Kiswahili'
    };

    addToast(
      lang === 'zh'
        ? '语言已切换'
        : lang === 'am'
        ? 'ቋንቋ ተቀይሯል'
        : lang === 'ar'
        ? 'تم تغيير اللغة'
        : 'Language Updated',
      langNames[lang] || lang,
      'info'
    );
  };

  useEffect(() => {
    const dir = LANGUAGE_MAP[language]?.direction || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefillProduct, setQuotePrefillProduct] = useState<Product | null>(null);
  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [isTenderModalOpen, setIsTenderModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppCustomText, setWhatsAppCustomText] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Capture UTM parameters from URL for campaign attribution
  const [capturedUtm, setCapturedUtm] = useState<{
    source?: string;
    medium?: string;
    campaign?: string;
    campaignId?: string;
    postId?: string;
  }>({});

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let hashParams = new URLSearchParams();
      if (window.location.hash.includes('?')) {
        const hashQuery = window.location.hash.split('?')[1];
        hashParams = new URLSearchParams(hashQuery);
      }

      const source = urlParams.get('utm_source') || hashParams.get('utm_source');
      const medium = urlParams.get('utm_medium') || hashParams.get('utm_medium');
      const campaign = urlParams.get('utm_campaign') || hashParams.get('utm_campaign');
      const campaignId = urlParams.get('campaign_id') || hashParams.get('campaign_id');
      const postId = urlParams.get('post_id') || hashParams.get('post_id');

      if (source || campaign || campaignId || postId) {
        const utmData = {
          source: source || undefined,
          medium: medium || undefined,
          campaign: campaign || undefined,
          campaignId: campaignId || undefined,
          postId: postId || undefined
        };
        setCapturedUtm(utmData);
        sessionStorage.setItem('oranex_utm', JSON.stringify(utmData));
      } else {
        const saved = sessionStorage.getItem('oranex_utm');
        if (saved) setCapturedUtm(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Error reading UTM parameters:', e);
    }
  }, []);

  // Persistent Leads
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('oranex_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Tenders
  const [tenders, setTenders] = useState<TenderRequirement[]>(() => {
    try {
      const saved = localStorage.getItem('oranex_tenders');
      return saved ? JSON.parse(saved) : INITIAL_TENDERS;
    } catch {
      return INITIAL_TENDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('oranex_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Could not persist leads to localStorage', e);
    }
  }, [leads]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '') || 'home';
      const cleanHash = rawHash.split('?')[0];
      const parts = cleanHash.split('/');
      const view = parts[0] || 'home';
      const sub = parts[1];
      setCurrentView(view);
      setSubTab(sub);
      setSelectedSubId(sub);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: string, sub?: string) => {
    setCurrentView(view);
    setSubTab(sub);
    setSelectedSubId(sub);
    const hash = sub ? `#${view}/${sub}` : `#${view}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (
    titleOrMessage: string,
    messageOrType?: string,
    typeParam?: 'success' | 'error' | 'warning' | 'info'
  ) => {
    let finalTitle = 'Notification';
    let finalMessage = titleOrMessage;
    let finalType: 'success' | 'error' | 'warning' | 'info' = 'success';

    if (typeParam) {
      finalTitle = titleOrMessage;
      finalMessage = messageOrType || '';
      finalType = typeParam;
    } else if (messageOrType) {
      if (['success', 'error', 'info', 'warning'].includes(messageOrType)) {
        finalTitle = titleOrMessage;
        finalMessage = '';
        finalType = messageOrType as any;
      } else {
        finalTitle = titleOrMessage;
        finalMessage = messageOrType;
      }
    }

    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title: finalTitle, message: finalMessage, type: finalType }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openQuoteModal = (product?: Product | { productOrScope?: string; name?: string } | any) => {
    if (product) {
      if ('shortDescription' in product && typeof product.shortDescription === 'string') {
        setQuotePrefillProduct(product as Product);
      } else {
        const prodName = product.name || product.productOrScope || 'Custom Procurement Inquiry';
        setQuotePrefillProduct({
          id: `custom-${Date.now()}`,
          name: prodName,
          category: 'construction-industrial',
          productFamily: 'Procurement Requirement',
          shortDescription: product.productOrScope || product.name || 'Custom requirement specification',
          applications: [],
          specifications: {},
          packaging: 'Standard export packaging',
          origin: 'Our Chinese partner Managed Sourcing',
          moq: 'As required',
          leadTime: '21-30 Days'
        });
      }
    } else {
      setQuotePrefillProduct(null);
    }
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuotePrefillProduct(null);
  };

  const openRequirementModal = (data?: any) => {
    if (data?.productOrScope) {
      openQuoteModal(data);
    } else {
      setIsRequirementModalOpen(true);
    }
  };
  const closeRequirementModal = () => setIsRequirementModalOpen(false);

  const openTenderModal = () => setIsTenderModalOpen(true);
  const closeTenderModal = () => setIsTenderModalOpen(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const openWhatsAppModal = (text?: string) => {
    setWhatsAppCustomText(text || '');
    setIsWhatsAppModalOpen(true);
  };
  const closeWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
    setWhatsAppCustomText('');
  };

  // Lead submission with deduplication and campaign attribution
  const submitLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { type?: string; country?: string; productOrScope?: string }) => {
    const resolvedProduct = newLeadData.productOrCategory || newLeadData.productOrScope || 'General Sourcing Inquiry';
    const isDuplicate = leads.some(
      (l) =>
        l.email.toLowerCase() === newLeadData.email.toLowerCase() &&
        (l.productOrCategory.toLowerCase() === resolvedProduct.toLowerCase() ||
          (l.productOrScope && l.productOrScope.toLowerCase() === resolvedProduct.toLowerCase())) &&
        Date.now() - new Date(l.createdAt).getTime() < 60000
    );

    if (isDuplicate) {
      addToast('Inquiry Already Logged', 'We have already received this request. Our desk is reviewing it.', 'info');
      return;
    }

    const created: Lead = {
      ...newLeadData,
      productOrCategory: resolvedProduct,
      productOrScope: resolvedProduct,
      id: `lead-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      utmSource: capturedUtm.source,
      utmMedium: capturedUtm.medium,
      utmCampaign: capturedUtm.campaign,
      campaignId: capturedUtm.campaignId,
      postId: capturedUtm.postId
    };

    // Send to backend lead attribution & persistence API
    fetch('/api/marketing/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(created)
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          setLeads((prev) => [created, ...prev]);
          addToast(
            data.databaseSaved ? 'Inquiry Archived in Database' : 'RFQ Transmitted to Commercial Desk',
            `Reference ID: #${created.id.slice(-8).toUpperCase()}${created.utmCampaign ? ` (Campaign: ${created.utmCampaign})` : ''}`,
            'success'
          );
        } else {
          const err = await res.json().catch(() => ({}));
          setLeads((prev) => [created, ...prev]);
          addToast(
            'Inquiry Cached on Device',
            err.error || 'Server transmission incomplete. Please follow up directly on WhatsApp: +251 912 233 688',
            'warning'
          );
        }
      })
      .catch((err) => {
        console.warn('[LEAD SUBMISSION] Network error:', err);
        setLeads((prev) => [created, ...prev]);
        addToast(
          'Inquiry Cached Locally (Offline)',
          'Network connection interrupted. For urgent requirements, please contact Eng. Petros on WhatsApp: +251 912 233 688',
          'warning'
        );
      });
  };

  const currentLanguageConfig = LANGUAGE_MAP[language] || LANGUAGES[0];
  const direction = currentLanguageConfig.direction || 'ltr';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        currentView,
        subTab,
        selectedSubId,
        setSelectedSubId,
        navigate,
        language,
        setLanguage,
        currentLanguageConfig,
        availableLanguages: LANGUAGES,
        direction,
        t,

        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        quotePrefillProduct,

        isRequirementModalOpen,
        openRequirementModal,
        closeRequirementModal,

        isTenderModalOpen,
        openTenderModal,
        closeTenderModal,

        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,

        isWhatsAppModalOpen,
        openWhatsAppModal,
        closeWhatsAppModal,
        whatsAppCustomText,
        companyInfo: COMPANY_INFO,

        leads,
        submitLead,
        tenders,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,

        products: PRODUCTS_DATA,
        allProducts: PRODUCTS_DATA,
        solutions: SOLUTIONS_DATA,
        industries: INDUSTRIES_DATA,
        projects: PROJECTS_DATA,
        businessServices: BUSINESS_SERVICES_DATA,

        capturedUtm
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
