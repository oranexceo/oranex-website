export type LanguageCode = 'en' | 'zh' | 'am' | 'ar' | 'fr' | 'pt' | 'sw';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  regionHint: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    regionHint: 'Pan-African & International Business'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    regionHint: 'China & East Asia Partner Sourcing (中国与东亚战略采购)'
  },
  {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    direction: 'ltr',
    regionHint: 'Ethiopia (ኢትዮጵያ)'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    regionHint: 'North Africa & Horn of Africa (شمال وشرق أفريقيا)'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    regionHint: 'West & Central Africa, Maghreb'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    direction: 'ltr',
    regionHint: 'Angola, Mozambique, Lusophone Africa'
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    direction: 'ltr',
    regionHint: 'East Africa (Kenya, Tanzania, Uganda, DRC, Rwanda)'
  }
];

export const LANGUAGE_MAP = LANGUAGES.reduce<Record<LanguageCode, LanguageConfig>>(
  (acc, lang) => {
    acc[lang.code] = lang;
    return acc;
  },
  {} as Record<LanguageCode, LanguageConfig>
);

// Configurable country-aware language suggestions
export const COUNTRY_LANGUAGE_SUGGESTIONS: Record<string, LanguageCode[]> = {
  China: ['zh', 'en'],
  Ethiopia: ['am', 'en'],
  Kenya: ['en', 'sw'],
  Tanzania: ['sw', 'en'],
  Uganda: ['en', 'sw'],
  Rwanda: ['en', 'fr', 'sw'],
  Burundi: ['fr', 'sw', 'en'],
  DRC: ['fr', 'sw'],
  Congo: ['fr'],
  Senegal: ['fr', 'en'],
  'Ivory Coast': ['fr', 'en'],
  "Cote d'Ivoire": ['fr', 'en'],
  Cameroon: ['fr', 'en'],
  Gabon: ['fr'],
  Angola: ['pt', 'en'],
  Mozambique: ['pt', 'en'],
  Egypt: ['ar', 'en'],
  Morocco: ['ar', 'fr', 'en'],
  Algeria: ['ar', 'fr'],
  Tunisia: ['ar', 'fr'],
  Sudan: ['ar', 'en'],
  Djibouti: ['fr', 'ar'],
  Somalia: ['ar', 'en'],
  Nigeria: ['en'],
  Ghana: ['en'],
  Zambia: ['en'],
  Zimbabwe: ['en'],
  SouthAfrica: ['en']
};

export const getSuggestedLanguagesForCountry = (country: string): LanguageConfig[] => {
  if (!country) return [LANGUAGE_MAP.en];
  
  // Direct lookup or partial match
  const matchedKey = Object.keys(COUNTRY_LANGUAGE_SUGGESTIONS).find(k => 
    country.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(country.toLowerCase())
  );

  const codes: LanguageCode[] = matchedKey ? COUNTRY_LANGUAGE_SUGGESTIONS[matchedKey] : ['en'];
  return codes.map((c) => LANGUAGE_MAP[c]).filter(Boolean);
};
