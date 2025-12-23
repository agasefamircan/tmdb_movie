import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UI_TRANSLATIONS, FALLBACK_LANGUAGE } from '../../i18n/translations';

type Language = 'tr' | 'en' | 'ru';

const I18nContext = createContext<{
  language: Language;
  apiLanguage: string;
  changeLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
} | null>(null);

const resolveApiLanguage = (lang: Language) => {
  if (lang === 'ru') return 'ru-RU';
  if (lang === 'tr') return 'tr-TR';
  return 'en-US';
};
export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('preferredLanguage') as Language) || FALLBACK_LANGUAGE
  );

  const apiLanguage = resolveApiLanguage(language);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const t = useCallback(
    (key: string, fallback = '') => {
      const pack = UI_TRANSLATIONS[language] || UI_TRANSLATIONS[FALLBACK_LANGUAGE];

      return key.split('.').reduce<any>((acc, k) => acc?.[k], pack) || fallback;
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, apiLanguage, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
