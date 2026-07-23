// Data Service for managing website content
// ALL data comes from PHP Backend - files.foliensam.de

import {
  getGalleryData as getGalleryFromPHP,
  saveGalleryData as saveGalleryToPHP,
  getHeroData as getHeroFromPHP,
  saveHeroData as saveHeroToPHP,
  getServicesData as getServicesFromPHP,
  saveServicesData as saveServicesToPHP,
  getSettingsData as getSettingsFromPHP,
  saveSettingsData as saveSettingsToPHP,
} from './phpDataService';
import { DEFAULT_HOMEPAGE_SERVICES } from '../data/homepageServices';

export interface HeroData {
  mainImageUrl: string;
  videoUrl: string;
  youtubeVideoId: string;
  premiumQualityGifUrl?: string;
}

export interface GalleryImage {
  id: string;
  type: 'image' | 'youtube';
  url?: string;
  videoId?: string;
  thumbnail?: string;
  title?: string; // Optional - auto-generated if not provided
  category: string;
  publishedAt?: string;
  sortOrder?: number; // For manual ordering
}

export interface Service {
  id: string;
  path: string;
  labelKey: string;
  descriptionKey: string;
  image: string;
  icon: string;
  categoryKey: string;
}

const LEGACY_SERVICE_PATHS: Record<string, string> = {
  carWrapping: '/vollfolierung-berlin',
  windowTinting: '/scheibentoenung-berlin',
  paintProtection: '/lackschutzfolie-berlin',
  designWrapping: '/autofolierung-berlin#teilfolierung',
  chromeWrapping: '/autofolierung-berlin#chromfolierung',
  commercialWrapping: '/fahrzeugbeschriftung-berlin',
  autofolierung: '/autofolierung-berlin',
  vollfolierung: '/vollfolierung-berlin',
  scheibentoenung: '/scheibentoenung-berlin',
  lackschutz: '/lackschutzfolie-berlin',
  beschriftung: '/fahrzeugbeschriftung-berlin',
  felgen: '/felgenfolierung-berlin',
};

function resolveServicePath(raw: Record<string, unknown>, index: number): string {
  const explicitPath = String(raw.path ?? '').trim();
  if (explicitPath) {
    return explicitPath;
  }

  const translationKey = String(raw.labelKey ?? raw.titleKey ?? raw.descriptionKey ?? '');
  for (const [slug, path] of Object.entries(LEGACY_SERVICE_PATHS)) {
    if (translationKey.includes(slug)) {
      return path;
    }
  }

  return DEFAULT_HOMEPAGE_SERVICES[index]?.path ?? '/autofolierung-berlin';
}

function normalizeService(raw: Record<string, unknown>, index: number): Service {
  return {
    id: String(raw.id ?? index + 1),
    path: resolveServicePath(raw, index),
    labelKey: String(raw.labelKey ?? raw.titleKey ?? ''),
    descriptionKey: String(raw.descriptionKey ?? ''),
    image: String(raw.image ?? ''),
    icon: String(raw.icon ?? 'Car'),
    categoryKey: String(raw.categoryKey ?? ''),
  };
}

function servicesNeedPathMigration(rawServices: unknown[]): boolean {
  return rawServices.some((item) => !String((item as Record<string, unknown>).path ?? '').trim());
}

// ========================================
// HERO DATA MANAGEMENT
// ========================================

export const getHeroData = async (): Promise<HeroData> => {
  console.log('📡 Fetching hero data from PHP server...');
  const data = await getHeroFromPHP();
  console.log('✅ Got hero data:', data);
  return data || {
    mainImageUrl: '',
    videoUrl: '',
    youtubeVideoId: '',
    premiumQualityGifUrl: ''
  };
};

export const updateHeroData = async (data: HeroData): Promise<void> => {
  console.log('💾 Saving hero data to PHP server...');
  await saveHeroToPHP(data);
  console.log('✅ Hero data saved');
};

// ========================================
// GALLERY MANAGEMENT
// ========================================

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  console.log('📡 Fetching gallery from PHP server...');
  const data = await getGalleryFromPHP();
  
  // Sort by sortOrder first (if exists), then by publishedAt (newest first)
  const sorted = data.sort((a, b) => {
    // If both have sortOrder, use that
    if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
      return a.sortOrder - b.sortOrder;
    }
    // If only one has sortOrder, prioritize it
    if (a.sortOrder !== undefined) return -1;
    if (b.sortOrder !== undefined) return 1;
    // Otherwise sort by date
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return dateB - dateA;
  });
  
  console.log('✅ Got gallery images:', sorted.length);
  return sorted;
};

const saveGalleryImages = async (images: GalleryImage[]): Promise<void> => {
  console.log('💾 Saving gallery to PHP server...');
  await saveGalleryToPHP(images);
  console.log('✅ Gallery saved');
};

export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const images = await getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
    publishedAt: image.publishedAt || new Date().toISOString()
  };
  images.unshift(newImage);
  await saveGalleryImages(images);
  return newImage;
};

export const updateGalleryImage = async (id: string, updates: Partial<GalleryImage>): Promise<void> => {
  const images = await getGalleryImages();
  const index = images.findIndex(img => img.id === id);
  if (index !== -1) {
    images[index] = { ...images[index], ...updates };
    await saveGalleryImages(images);
  }
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  const images = await getGalleryImages();
  const filteredImages = images.filter(img => img.id !== id);
  await saveGalleryImages(filteredImages);
};

export const updateGallerySortOrder = async (orderedIds: string[]): Promise<void> => {
  const images = await getGalleryImages();
  // Update sortOrder for each image based on its position in orderedIds
  const updatedImages = images.map(img => {
    const index = orderedIds.indexOf(img.id);
    return {
      ...img,
      sortOrder: index !== -1 ? index : undefined
    };
  });
  await saveGalleryImages(updatedImages);
};

// ========================================
// SERVICES MANAGEMENT  
// ========================================

const saveServices = async (services: Service[]): Promise<void> => {
  console.log('💾 Saving services to PHP server...');
  await saveServicesToPHP(services);
  console.log('✅ Services saved');
};

export const getServices = async (): Promise<Service[]> => {
  console.log('📡 Fetching services from PHP server...');
  const data = await getServicesFromPHP();

  if (!data || data.length === 0) {
    console.log('⚠️ No services on server, using website defaults');
    return DEFAULT_HOMEPAGE_SERVICES;
  }

  const normalized = data.map((item, index) =>
    normalizeService(item as unknown as Record<string, unknown>, index)
  );

  if (servicesNeedPathMigration(data)) {
    console.log('🔧 Migrating services: adding missing page links');
    await saveServices(normalized);
  }

  console.log('✅ Got services:', normalized.length);
  return normalized;
};

export const resetServicesToDefaults = async (): Promise<Service[]> => {
  await saveServices(DEFAULT_HOMEPAGE_SERVICES);
  return DEFAULT_HOMEPAGE_SERVICES;
};

export const addService = async (service: Omit<Service, 'id'>): Promise<Service> => {
  const services = await getServices();
  const newService: Service = {
    ...service,
    id: Date.now().toString()
  };
  services.push(newService);
  await saveServices(services);
  return newService;
};

export const updateService = async (id: string, updates: Partial<Service>): Promise<void> => {
  const services = await getServices();
  const index = services.findIndex(svc => svc.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updates };
    await saveServices(services);
  }
};

export const deleteService = async (id: string): Promise<void> => {
  const services = await getServices();
  const filteredServices = services.filter(svc => svc.id !== id);
  await saveServices(filteredServices);
};

// ========================================
// SETTINGS & ADMIN AUTHENTICATION
// ========================================

export interface Settings {
  adminPassword: string;
  youtubeApiKey?: string;
  youtubeChannelId?: string;
  tiktokEmbedId?: string;
  tiktokEmbedIdMobile?: string;
  tiktokProfileUrl?: string;
  siteName?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    canonicalUrl?: string;
    author?: string;
    robots?: string;
  };
}

export const getSettings = async (): Promise<Settings> => {
  console.log('📡 Fetching settings from PHP server...');
  const data = await getSettingsFromPHP();
  console.log('✅ Got settings');
  return data || {
    adminPassword: 'admin123',
    youtubeApiKey: '',
    youtubeChannelId: '',
    siteName: 'FolienSam',
    contactEmail: 'info@foliensam.de',
    whatsappNumber: '+49 157 50000505',
    seo: {
      title: 'FolienSam Autofolierung Berlin | Premium Fahrzeugveredelung & Car Wrapping',
      description: 'Ihre Experten für professionelle Fahrzeugfolierung in Berlin ➤ Scheibentönung ➤ Lackschutzfolierung ➤ PPF ➤ 5 Jahre Garantie ✓ Premium 3M Materialien ✓ Zertifizierte Experten ✆ Jetzt Termin vereinbaren!',
      keywords: 'Autofolierung Berlin, Fahrzeugfolierung, Car Wrapping, Scheibentönung, Lackschutzfolierung PPF, Chromfolierung, Mattfolierung, Carbonfolierung, Steinschlagschutzfolie, Folie Auto, KFZ Folierung, Carwrapping Berlin, Auto umfolieren, Teilfolierung, Vollfolierung, Fahrzeugdesign, 3M Folierung, Avery Dennison, Premium Folierung, Folierung Preise',
      ogTitle: 'FolienSam Autofolierung Berlin | Premium Fahrzeugveredelung & Car Wrapping',
      ogDescription: 'Ihre Experten für professionelle Fahrzeugfolierung in Berlin ➤ Scheibentönung ➤ Lackschutzfolierung ➤ PPF ➤ 5 Jahre Garantie ✓ Premium 3M Materialien ✓ Zertifizierte Experten ✆ Jetzt Termin vereinbaren!',
      ogImage: 'https://images.cood.ai/samgo/car1.png',
      ogUrl: 'https://foliensam.de/',
      twitterTitle: 'FolienSam Autofolierung Berlin | Premium Fahrzeugveredelung & Car Wrapping',
      twitterDescription: 'Ihre Experten für professionelle Fahrzeugfolierung in Berlin ➤ Scheibentönung ➤ Lackschutzfolierung ➤ PPF ➤ 5 Jahre Garantie ✓ Premium 3M Materialien ✓ Zertifizierte Experten ✆ Jetzt Termin vereinbaren!',
      twitterImage: 'https://images.cood.ai/samgo/car1.png',
      canonicalUrl: 'https://foliensam.de/',
      author: 'FolienSam Autofolierung',
      robots: 'index, follow'
    }
  };
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  console.log('💾 Saving settings to PHP server...');
  await saveSettingsToPHP(settings);
  console.log('✅ Settings saved');
};

export const checkAdminPassword = async (password: string): Promise<boolean> => {
  const settings = await getSettings();
  return password === settings.adminPassword;
};

export const updateAdminPassword = async (newPassword: string): Promise<void> => {
  const settings = await getSettings();
  settings.adminPassword = newPassword;
  await saveSettings(settings);
};
