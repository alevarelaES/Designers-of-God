import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Language, translations, Translations } from "../i18n";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "FR",
  setLang: () => {},
  t: translations["FR"],
});

// Helper pour détecter la langue par défaut (LocalStorage ou Navigateur)
const getDefaultLanguage = (): Language => {
  const savedLang = localStorage.getItem("app_lang") as Language;
  if (savedLang && translations[savedLang]) {
    return savedLang;
  }
  
  const browserLang = navigator.language.substring(0, 2).toUpperCase();
  if (browserLang === "EN" || browserLang === "FR" || browserLang === "DE") {
    return browserLang as Language;
  }
  
  return "FR"; // Langue par défaut
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getDefaultLanguage);
  
  // Met à jour le localStorage et le DOM (lang attribute pour le SEO) quand la langue change
  useEffect(() => {
    localStorage.setItem("app_lang", lang);
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}