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

export interface HeroData {
  mainImageUrl: string;
  videoUrl: string;
  youtubeVideoId: string;
}

export interface GalleryImage {
  id: string;
  type: 'image' | 'youtube';
  url?: string;
  videoId?: string;
  thumbnail?: string;
  title: string;
  category: string;
  publishedAt?: string;
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
    youtubeVideoId: ''
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
  
  // Sort by publishedAt (newest first)
  const sorted = data.sort((a, b) => {
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

// ========================================
// SERVICES MANAGEMENT  
// ========================================

export const getServices = async (): Promise<Service[]> => {
  console.log('📡 Fetching services from PHP server...');
  const data = await getServicesFromPHP();
  console.log('✅ Got services:', data.length);
  return data;
};

const saveServices = async (services: Service[]): Promise<void> => {
  console.log('💾 Saving services to PHP server...');
  await saveServicesToPHP(services);
  console.log('✅ Services saved');
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

interface Settings {
  adminPassword: string;
  siteName: string;
  contactEmail: string;
  whatsappNumber: string;
}

export const getSettings = async (): Promise<Settings> => {
  console.log('📡 Fetching settings from PHP server...');
  const data = await getSettingsFromPHP();
  console.log('✅ Got settings');
  return data || {
    adminPassword: 'admin123',
    siteName: 'FolienSam',
    contactEmail: 'info@foliensam.de',
    whatsappNumber: ''
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
