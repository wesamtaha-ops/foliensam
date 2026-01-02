import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './locales/de.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';
import ru from './locales/ru.json';
import { getTranslationsData } from '../services/phpDataService';

// Helper function to get custom translations from PHP server or localStorage
const getCustomTranslations = async (lang: string, defaultTranslations: any) => {
  try {
    // Try PHP server first
    const serverData = await getTranslationsData();
    if (serverData && serverData[lang]) {
      console.log(`✅ Loaded ${lang} translations from PHP server`);
      return serverData[lang];
    }
  } catch (error) {
    console.warn(`⚠️ Failed to load ${lang} from PHP server, trying localStorage:`, error);
  }
  
  // Fallback to localStorage
  const storageKey = `folien_sam_translations_${lang}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log(`✅ Loaded ${lang} translations from localStorage`);
      return parsed;
    } catch (error) {
      console.error(`❌ Error parsing custom translations for ${lang}:`, error);
      return defaultTranslations;
    }
  }
  
  console.log(`ℹ️ Using default translations for ${lang}`);
  return defaultTranslations;
};

// Initialize i18n with default translations first
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
      ar: { translation: ar },
      tr: { translation: tr },
      ru: { translation: ru }
    },
    lng: 'de', // Set German as default
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false
    }
  })
  .then(() => {
    // Load custom translations from PHP server and update i18n after initialization
    const loadCustomTranslations = async () => {
      const languages = ['de', 'en', 'ar', 'tr', 'ru'];
      const defaultTranslations: Record<string, any> = { de, en, ar, tr, ru };
      
      for (const lang of languages) {
        try {
          const customTranslations = await getCustomTranslations(lang, defaultTranslations[lang]);
          i18n.addResourceBundle(lang, 'translation', customTranslations, true, true);
        } catch (error) {
          console.error(`Failed to load custom translations for ${lang}:`, error);
        }
      }
    };
    
    loadCustomTranslations();
  });

// Listen for translation updates and reload
window.addEventListener('translationsUpdated', async (event: any) => {
  const { lang, translations } = event.detail;
  
  if (translations) {
    // Use translations from event if provided
    console.log(`🔄 Updating i18n with new translations for ${lang}`);
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
  } else {
    // Otherwise reload from PHP server
    const defaultTranslations: Record<string, any> = { de, en, ar, tr, ru };
    const customTranslations = await getCustomTranslations(lang, defaultTranslations[lang]);
    i18n.addResourceBundle(lang, 'translation', customTranslations, true, true);
  }
  
  // Force a re-render by changing language temporarily
  const currentLang = i18n.language;
  if (currentLang === lang) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;