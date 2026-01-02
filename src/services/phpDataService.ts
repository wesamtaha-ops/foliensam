// PHP Backend Data Service - Single source of truth for all data
const PHP_BASE_URL = 'https://files.foliensam.de';
const PHP_UPLOAD_URL = `${PHP_BASE_URL}/upload.php`;
const PHP_DATA_URL = `${PHP_BASE_URL}/data.php`;

export interface GalleryItem {
  id: string;
  imageUrl: string;
  youtubeVideoId?: string;
  isVideo: boolean;
  publishedAt: string;
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
  icon: string;
}

export interface TranslationData {
  [language: string]: {
    [key: string]: string;
  };
}

export interface SettingsData {
  adminPassword: string;
  youtubeApiKey?: string;
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
    gallery: [] as GalleryItem[],
    hero: {
      mainImageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&h=1080&fit=crop',
      videoUrl: '',
      youtubeVideoId: '',
    } as HeroData,
    services: [
      {
        id: '1',
        titleKey: 'services.tinting.title',
        descriptionKey: 'services.tinting.description',
        icon: '🎨',
      },
      {
        id: '2',
        titleKey: 'services.protection.title',
        descriptionKey: 'services.protection.description',
        icon: '🛡️',
      },
      {
        id: '3',
        titleKey: 'services.wrapping.title',
        descriptionKey: 'services.wrapping.description',
        icon: '✨',
      },
    ] as Service[],
    translations: {
      de: {
        'nav.home': 'Startseite',
        'nav.services': 'Dienstleistungen',
        'nav.gallery': 'Galerie',
        'nav.contact': 'Kontakt',
        'hero.title': 'Professionelle Fahrzeugfolierung',
        'hero.subtitle': 'Wir verwandeln Ihr Fahrzeug',
      },
      en: {
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'hero.title': 'Professional Vehicle Wrapping',
        'hero.subtitle': 'We transform your vehicle',
      },
    } as TranslationData,
    settings: {
      adminPassword: 'admin123',
    } as SettingsData,
  };

  const results = [];

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

