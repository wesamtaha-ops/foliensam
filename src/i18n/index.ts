import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './locales/de.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';
import ru from './locales/ru.json';

// Helper function to get custom translations from localStorage
const getCustomTranslations = (lang: string, defaultTranslations: any) => {
  const storageKey = `folien_sam_translations_${lang}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error(`Error parsing custom translations for ${lang}:`, error);
      return defaultTranslations;
    }
  }
  
  return defaultTranslations;
};

// Load translations (check for custom ones first)
const loadedTranslations = {
  de: getCustomTranslations('de', de),
  en: getCustomTranslations('en', en),
  ar: getCustomTranslations('ar', ar),
  tr: getCustomTranslations('tr', tr),
  ru: getCustomTranslations('ru', ru)
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: loadedTranslations.de },
      en: { translation: loadedTranslations.en },
      ar: { translation: loadedTranslations.ar },
      tr: { translation: loadedTranslations.tr },
      ru: { translation: loadedTranslations.ru }
    },
    lng: 'de', // Set German as default
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false
    }
  });

// Listen for translation updates and reload
window.addEventListener('translationsUpdated', (event: any) => {
  const { lang } = event.detail;
  const customTranslations = getCustomTranslations(lang, { de, en, ar, tr, ru }[lang]);
  i18n.addResourceBundle(lang, 'translation', customTranslations, true, true);
});

export default i18n;