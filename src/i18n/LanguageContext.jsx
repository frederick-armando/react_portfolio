import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

const LanguageContext = createContext(null);

function detectBrowserLanguage() {
  if (typeof window === 'undefined') {
    return 'fr';
  }

  const preferredLanguages = [
    ...(window.navigator.languages ?? []),
    window.navigator.language,
  ]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  return preferredLanguages.some((value) => value === 'fr' || value.startsWith('fr-'))
    ? 'fr'
    : 'en';
}

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'fr';
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage === 'fr' || storedLanguage === 'en') {
    return storedLanguage;
  }

  return detectBrowserLanguage();
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => {
        setLanguage((current) => (current === 'fr' ? 'en' : 'fr'));
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider.');
  }

  return context;
}
