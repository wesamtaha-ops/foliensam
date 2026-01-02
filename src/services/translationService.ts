// Translation Management Service
// This service manages i18n translation files

import deTranslations from '../i18n/locales/de.json';
import enTranslations from '../i18n/locales/en.json';
import arTranslations from '../i18n/locales/ar.json';
import ruTranslations from '../i18n/locales/ru.json';
import trTranslations from '../i18n/locales/tr.json';
import { getTranslationsData, saveTranslationsData } from './cloudinaryDataService';

export type SupportedLanguage = 'de' | 'en' | 'ar' | 'ru' | 'tr';

export interface TranslationData {
  [key: string]: any;
}

const STORAGE_KEY_PREFIX = 'folien_sam_translations_';

// Language display names
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  de: 'Deutsch (German)',
  en: 'English',
  ar: 'العربية (Arabic)',
  ru: 'Русский (Russian)',
  tr: 'Türkçe (Turkish)'
};

// Get default translations for a language
const getDefaultTranslations = (lang: SupportedLanguage): TranslationData => {
  switch (lang) {
    case 'de': return deTranslations;
    case 'en': return enTranslations;
    case 'ar': return arTranslations;
    case 'ru': return ruTranslations;
    case 'tr': return trTranslations;
    default: return deTranslations;
  }
};

// Get translations for a specific language (from Cloudinary, localStorage or defaults)
export const getTranslations = async (lang: SupportedLanguage): Promise<TranslationData> => {
  try {
    // Try Cloudinary first
    const cloudinaryData = await getTranslationsData();
    if (cloudinaryData && cloudinaryData[lang]) {
      return cloudinaryData[lang];
    }
  } catch (error) {
    console.warn(`Failed to load translations from Cloudinary for ${lang}:`, error);
  }
  
  // Fallback to localStorage
  const storageKey = `${STORAGE_KEY_PREFIX}${lang}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error(`Error parsing translations for ${lang}:`, error);
      return getDefaultTranslations(lang);
    }
  }
  
  return getDefaultTranslations(lang);
};

// Save translations for a specific language
export const saveTranslations = async (lang: SupportedLanguage, translations: TranslationData): Promise<void> => {
  try {
    // Get all translations from Cloudinary
    const allTranslations = await getTranslationsData() || {};
    
    // Update the specific language
    allTranslations[lang] = translations;
    
    // Save back to Cloudinary
    await saveTranslationsData(allTranslations);
    console.log(`✅ Translations for ${lang} saved to Cloudinary`);
  } catch (error) {
    console.error(`❌ Failed to save translations to Cloudinary for ${lang}:`, error);
    
    // Fallback to localStorage
    const storageKey = `${STORAGE_KEY_PREFIX}${lang}`;
    localStorage.setItem(storageKey, JSON.stringify(translations));
    console.log(`⚠️ Translations for ${lang} saved to localStorage (fallback)`);
  }
  
  // Trigger a custom event to notify components to reload translations
  window.dispatchEvent(new CustomEvent('translationsUpdated', { detail: { lang } }));
};

// Reset translations to defaults for a specific language
export const resetTranslations = async (lang: SupportedLanguage): Promise<void> => {
  try {
    // Get all translations from Cloudinary
    const allTranslations = await getTranslationsData() || {};
    
    // Remove the specific language (will fallback to defaults)
    delete allTranslations[lang];
    
    // Save back to Cloudinary
    await saveTranslationsData(allTranslations);
    console.log(`✅ Translations for ${lang} reset in Cloudinary`);
  } catch (error) {
    console.error(`❌ Failed to reset translations in Cloudinary for ${lang}:`, error);
  }
  
  // Also remove from localStorage
  const storageKey = `${STORAGE_KEY_PREFIX}${lang}`;
  localStorage.removeItem(storageKey);
  
  // Trigger a custom event to notify components to reload translations
  window.dispatchEvent(new CustomEvent('translationsUpdated', { detail: { lang } }));
};

// Get all supported languages
export const getSupportedLanguages = (): SupportedLanguage[] => {
  return ['de', 'en', 'ar', 'ru', 'tr'];
};

// Flatten nested object into dot notation paths
export const flattenTranslations = (obj: any, prefix = ''): Record<string, string> => {
  const flattened: Record<string, string> = {};
  
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenTranslations(value, newKey));
    } else if (Array.isArray(value)) {
      // Store arrays as JSON strings for editing
      flattened[newKey] = JSON.stringify(value);
    } else {
      flattened[newKey] = String(value);
    }
  });
  
  return flattened;
};

// Unflatten dot notation paths back to nested object
export const unflattenTranslations = (flattened: Record<string, string>): TranslationData => {
  const result: any = {};
  
  Object.keys(flattened).forEach(key => {
    const keys = key.split('.');
    let current = result;
    
    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        // Last key - set the value
        const value = flattened[key];
        try {
          // Try to parse as JSON (for arrays)
          current[k] = JSON.parse(value);
        } catch {
          // If not JSON, keep as string
          current[k] = value;
        }
      } else {
        // Intermediate key - create object if doesn't exist
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  });
  
  return result;
};

// Search translations by key or value
export const searchTranslations = (
  translations: Record<string, string>,
  query: string
): Record<string, string> => {
  const lowerQuery = query.toLowerCase();
  const results: Record<string, string> = {};
  
  Object.keys(translations).forEach(key => {
    const value = translations[key].toLowerCase();
    if (key.toLowerCase().includes(lowerQuery) || value.includes(lowerQuery)) {
      results[key] = translations[key];
    }
  });
  
  return results;
};

// Export translations as JSON file
export const exportTranslations = async (lang: SupportedLanguage): Promise<void> => {
  const translations = await getTranslations(lang);
  const dataStr = JSON.stringify(translations, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${lang}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Import translations from JSON file
export const importTranslations = (lang: SupportedLanguage, file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const translations = JSON.parse(content);
        await saveTranslations(lang, translations);
        resolve();
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

