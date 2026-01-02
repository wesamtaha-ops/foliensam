// PHP Backend Data Service - Single source of truth for all data
const PHP_BASE_URL = 'https://files.foliensam.de';
const PHP_UPLOAD_URL = `${PHP_BASE_URL}/upload.php`;
const PHP_DATA_URL = `${PHP_BASE_URL}/data.php`;

export interface GalleryItem {
  id: string;
  type: 'image' | 'youtube';
  url?: string;
  videoId?: string;
  thumbnail?: string;
  title?: string; // Optional - auto-generated if not provided
  category: string;
  publishedAt?: string;
}

export interface HeroData {
  mainImageUrl: string;
  videoUrl: string;
  youtubeVideoId: string;
}

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  icon: string;
  categoryKey: string;
  durationKey: string;
  warrantyKey: string;
  fullDescriptionKey: string;
  featuresKey: string;
  processKey: string;
}

export interface TranslationData {
  [language: string]: {
    [key: string]: string;
  };
}

export interface SettingsData {
  adminPassword: string;
  youtubeApiKey?: string;
  youtubeChannelId?: string;
  siteName?: string;
  contactEmail?: string;
  whatsappNumber?: string;
}

// ==================== IMAGE UPLOAD ====================

export async function uploadImage(file: File): Promise<string> {
  console.log('📤 Uploading image to PHP server...');
  
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(PHP_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    console.log('✅ Image uploaded:', result.data.url);
    return result.data.url;
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload image');
  }
}

// ==================== DATA MANAGEMENT ====================

async function fetchData<T>(dataType: string): Promise<T | null> {
  console.log(`📥 Fetching ${dataType} data from PHP server...`);
  
  try {
    const response = await fetch(`${PHP_DATA_URL}?type=${dataType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${dataType}`);
    }

    const result = await response.json();
    console.log(`✅ ${dataType} data loaded`);
    return result.data;
  } catch (error) {
    console.error(`❌ Error fetching ${dataType}:`, error);
    return null;
  }
}

async function saveData<T>(dataType: string, data: T): Promise<void> {
  console.log(`💾 Saving ${dataType} data to PHP server...`);
  
  try {
    const response = await fetch(`${PHP_DATA_URL}?type=${dataType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Save failed');
    }

    console.log(`✅ ${dataType} data saved`);
  } catch (error) {
    console.error(`❌ Error saving ${dataType}:`, error);
    throw new Error(error instanceof Error ? error.message : `Failed to save ${dataType}`);
  }
}

// ==================== GALLERY ====================

export async function getGalleryData(): Promise<GalleryItem[]> {
  const data = await fetchData<GalleryItem[]>('gallery');
  return data || [];
}

export async function saveGalleryData(items: GalleryItem[]): Promise<void> {
  await saveData('gallery', items);
}

// ==================== HERO ====================

export async function getHeroData(): Promise<HeroData | null> {
  return await fetchData<HeroData>('hero');
}

export async function saveHeroData(data: HeroData): Promise<void> {
  await saveData('hero', data);
}

// ==================== SERVICES ====================

export async function getServicesData(): Promise<Service[]> {
  const data = await fetchData<Service[]>('services');
  return data || [];
}

export async function saveServicesData(services: Service[]): Promise<void> {
  await saveData('services', services);
}

// ==================== TRANSLATIONS ====================

export async function getTranslationsData(): Promise<TranslationData | null> {
  return await fetchData<TranslationData>('translations');
}

export async function saveTranslationsData(translations: TranslationData): Promise<void> {
  await saveData('translations', translations);
}

// ==================== SETTINGS ====================

export async function getSettingsData(): Promise<SettingsData | null> {
  const data = await fetchData<SettingsData>('settings');
  return data || { adminPassword: 'admin123' };
}

export async function saveSettingsData(settings: SettingsData): Promise<void> {
  await saveData('settings', settings);
}

// ==================== INITIALIZATION ====================

export async function initializeAllData(): Promise<void> {
  console.log('🚀 Initializing all data on PHP server...');

  const defaultData = {
    // Start with empty gallery - YouTube API will fetch videos automatically
    // This prevents duplication with API results
    gallery: [] as GalleryItem[],
    hero: {
      mainImageUrl: 'https://images.cood.ai/cards.gif',
      videoUrl: 'https://images.cood.ai/cards.gif',
      youtubeVideoId: 'udbvm6bulGU',
    } as HeroData,
    services: [
      {
        id: '1',
        titleKey: 'services.carWrapping.title',
        descriptionKey: 'services.carWrapping.description',
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80',
        icon: 'Car',
        categoryKey: 'services.carWrapping.category',
        durationKey: 'services.carWrapping.duration',
        warrantyKey: 'services.carWrapping.warranty',
        fullDescriptionKey: 'services.carWrapping.fullDescription',
        featuresKey: 'services.carWrapping.features',
        processKey: 'services.carWrapping.process'
      },
      {
        id: '2',
        titleKey: 'services.windowTinting.title',
        descriptionKey: 'services.windowTinting.description',
        image: 'https://images.cood.ai/samgo/car1.png',
        icon: 'Sun',
        categoryKey: 'services.windowTinting.category',
        durationKey: 'services.windowTinting.duration',
        warrantyKey: 'services.windowTinting.warranty',
        fullDescriptionKey: 'services.windowTinting.fullDescription',
        featuresKey: 'services.windowTinting.features',
        processKey: 'services.windowTinting.process'
      },
      {
        id: '3',
        titleKey: 'services.paintProtection.title',
        descriptionKey: 'services.paintProtection.description',
        image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&q=80',
        icon: 'Shield',
        categoryKey: 'services.paintProtection.category',
        durationKey: 'services.paintProtection.duration',
        warrantyKey: 'services.paintProtection.warranty',
        fullDescriptionKey: 'services.paintProtection.fullDescription',
        featuresKey: 'services.paintProtection.features',
        processKey: 'services.paintProtection.process'
      },
      {
        id: '4',
        titleKey: 'services.designWrapping.title',
        descriptionKey: 'services.designWrapping.description',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80',
        icon: 'Palette',
        categoryKey: 'services.designWrapping.category',
        durationKey: 'services.designWrapping.duration',
        warrantyKey: 'services.designWrapping.warranty',
        fullDescriptionKey: 'services.designWrapping.fullDescription',
        featuresKey: 'services.designWrapping.features',
        processKey: 'services.designWrapping.process'
      },
      {
        id: '5',
        titleKey: 'services.chromeWrapping.title',
        descriptionKey: 'services.chromeWrapping.description',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
        icon: 'Sparkles',
        categoryKey: 'services.chromeWrapping.category',
        durationKey: 'services.chromeWrapping.duration',
        warrantyKey: 'services.chromeWrapping.warranty',
        fullDescriptionKey: 'services.chromeWrapping.fullDescription',
        featuresKey: 'services.chromeWrapping.features',
        processKey: 'services.chromeWrapping.process'
      },
      {
        id: '6',
        titleKey: 'services.commercialWrapping.title',
        descriptionKey: 'services.commercialWrapping.description',
        image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80',
        icon: 'Building',
        categoryKey: 'services.commercialWrapping.category',
        durationKey: 'services.commercialWrapping.duration',
        warrantyKey: 'services.commercialWrapping.warranty',
        fullDescriptionKey: 'services.commercialWrapping.fullDescription',
        featuresKey: 'services.commercialWrapping.features',
        processKey: 'services.commercialWrapping.process'
      }
    ] as Service[],
    translations: {} as TranslationData,
    settings: {
      adminPassword: 'admin123',
      youtubeApiKey: 'AIzaSyD_CSCL18alWYzaYgiL9IJn-TAQ1UaVK9I', // Your YouTube API key
      youtubeChannelId: 'UCSe_xvuLLefPse0WqiBuOAw', // Your YouTube channel ID
      siteName: 'FolienSam',
      contactEmail: 'info@foliensam.de',
      whatsappNumber: '+49 157 50000505'
    } as SettingsData,
  };

  const results = [];

  // Initialize translations separately from translation files
  console.log('📦 Loading translations from locale files...');
  try {
    const deModule = await import('../i18n/locales/de.json');
    const enModule = await import('../i18n/locales/en.json');
    const arModule = await import('../i18n/locales/ar.json');
    const trModule = await import('../i18n/locales/tr.json');
    const ruModule = await import('../i18n/locales/ru.json');

    defaultData.translations = {
      de: deModule.default,
      en: enModule.default,
      ar: arModule.default,
      tr: trModule.default,
      ru: ruModule.default
    };
    console.log('✅ Translations loaded from locale files');
  } catch (error) {
    console.error('⚠️ Failed to load translation files:', error);
  }

  for (const [type, data] of Object.entries(defaultData)) {
    try {
      await saveData(type, data);
      results.push(`✅ ${type}`);
    } catch (error) {
      results.push(`❌ ${type}: ${error}`);
    }
  }

  console.log('Initialization results:', results);
}

