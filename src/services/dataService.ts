// Data Service for managing website content
// Now uses Cloudinary for JSON storage (no server needed!)

import {
  getGalleryData as getGalleryFromCloudinary,
  saveGalleryData as saveGalleryToCloudinary,
  getHeroData as getHeroFromCloudinary,
  saveHeroData as saveHeroToCloudinary,
  getServicesData as getServicesFromCloudinary,
  saveServicesData as saveServicesToCloudinary,
  getSettingsData as getSettingsFromCloudinary,
  saveSettingsData as saveSettingsToCloudinary,
} from './cloudinaryDataService';

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
  try {
    // Try Cloudinary first
    console.log('📡 Fetching hero data from Cloudinary...');
    const data = await getHeroFromCloudinary();
    if (data) {
      console.log('✅ Got hero data from Cloudinary:', data);
      return data;
    }
    console.log('⚠️ No data from Cloudinary, trying localStorage...');
  } catch (error) {
    console.warn('Failed to load hero data from Cloudinary:', error);
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('folien_sam_hero_data');
  if (stored) {
    console.log('📦 Using hero data from localStorage');
    return JSON.parse(stored);
  }
  
  // Default data
  console.log('🔄 Using default hero data');
  return {
    mainImageUrl: 'https://images.cood.ai/cards.gif',
    videoUrl: 'https://images.cood.ai/cards.gif',
    youtubeVideoId: 'udbvm6bulGU'
  };
};

export const updateHeroData = async (data: HeroData): Promise<void> => {
  try {
    // Save to Cloudinary
    await saveHeroToCloudinary(data);
    console.log('✅ Hero data saved to Cloudinary');
    
    // Clear localStorage to ensure we use Cloudinary data
    localStorage.removeItem('folien_sam_hero_data');
    console.log('🗑️ Cleared localStorage hero data');
  } catch (error) {
    console.error('❌ Failed to save hero data to Cloudinary:', error);
    // Fallback to localStorage
    localStorage.setItem('folien_sam_hero_data', JSON.stringify(data));
    console.log('⚠️ Hero data saved to localStorage (fallback)');
  }
};

// ========================================
// GALLERY MANAGEMENT
// ========================================

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    // Try Cloudinary first
    const data = await getGalleryFromCloudinary();
    if (data && data.length > 0) {
      // Sort by publishedAt (newest first)
      return data.sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0).getTime();
        const dateB = new Date(b.publishedAt || 0).getTime();
        return dateB - dateA;
      });
    }
  } catch (error) {
    console.warn('Failed to load gallery data from Cloudinary:', error);
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('folien_sam_gallery_images');
  if (stored) {
    const data = JSON.parse(stored);
    return data.sort((a: GalleryImage, b: GalleryImage) => {
      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateB - dateA;
    });
  }
  
  // Default data
  return [
    {
      id: '1',
      type: 'image',
      url: 'https://images.cood.ai/samgo/001.png',
      title: 'Premium Folierung',
      category: 'Folierung',
      publishedAt: new Date().toISOString()
    }
  ];
};

const saveGalleryImages = async (images: GalleryImage[]): Promise<void> => {
  try {
    // Save to Cloudinary
    await saveGalleryToCloudinary(images);
    console.log('✅ Gallery data saved to Cloudinary');
  } catch (error) {
    console.error('❌ Failed to save gallery data to Cloudinary:', error);
    // Fallback to localStorage
    localStorage.setItem('folien_sam_gallery_images', JSON.stringify(images));
    console.log('⚠️ Gallery data saved to localStorage (fallback)');
  }
};

export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const images = await getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
    publishedAt: image.publishedAt || new Date().toISOString()
  };
  images.unshift(newImage); // Add to beginning (newest first)
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
  try {
    // Try Cloudinary first
    const data = await getServicesFromCloudinary();
    if (data && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.warn('Failed to load services from Cloudinary:', error);
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('folien_sam_services');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default services
  return [
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
    }
  ];
};

const saveServices = async (services: Service[]): Promise<void> => {
  try {
    // Save to Cloudinary
    await saveServicesToCloudinary(services);
    console.log('✅ Services data saved to Cloudinary');
  } catch (error) {
    console.error('❌ Failed to save services to Cloudinary:', error);
    // Fallback to localStorage
    localStorage.setItem('folien_sam_services', JSON.stringify(services));
    console.log('⚠️ Services saved to localStorage (fallback)');
  }
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

export const getSettings = async (): Promise<any> => {
  try {
    // Try Cloudinary first
    const data = await getSettingsFromCloudinary();
    if (data) {
      return data;
    }
  } catch (error) {
    console.warn('Failed to load settings from Cloudinary:', error);
  }
  
  // Fallback to localStorage
  const storedPassword = localStorage.getItem('folien_sam_admin_password');
  return {
    adminPassword: storedPassword || 'admin123',
    siteName: 'FolienSam',
    contactEmail: 'info@foliensam.de',
    whatsappNumber: '+491234567890'
  };
};

export const saveSettings = async (settings: any): Promise<void> => {
  try {
    // Save to Cloudinary
    await saveSettingsToCloudinary(settings);
    console.log('✅ Settings saved to Cloudinary');
  } catch (error) {
    console.error('❌ Failed to save settings to Cloudinary:', error);
    // Fallback to localStorage
    if (settings.adminPassword) {
      localStorage.setItem('folien_sam_admin_password', settings.adminPassword);
    }
    console.log('⚠️ Settings saved to localStorage (fallback)');
  }
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
