import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './locales/de.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';
import ru from './locales/ru.json';

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
  });

export default i18n;