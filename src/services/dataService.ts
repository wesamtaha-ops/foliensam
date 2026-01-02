// Data Service for managing website content in localStorage

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

// Initialize default data
const DEFAULT_HERO_DATA: HeroData = {
  mainImageUrl: 'https://images.cood.ai/cards.gif',
  videoUrl: 'https://images.cood.ai/cards.gif',
  youtubeVideoId: 'udbvm6bulGU'
};

const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.cood.ai/samgo/001.png',
    title: 'Premium Folierung',
    category: 'Folierung'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.cood.ai/samgo/002.png',
    title: 'Mattfolierung',
    category: 'Folierung'
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.cood.ai/samgo/003.png',
    title: 'Chromfolierung',
    category: 'Folierung'
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.cood.ai/samgo/004.png',
    title: 'Designfolierung',
    category: 'Folierung'
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.cood.ai/samgo/005.png',
    title: 'Vollfolierung',
    category: 'Folierung'
  }
];

const DEFAULT_SERVICES: Service[] = [
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
    image: 'https://images.cood.ai/samgo/004.png',
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
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80',
    icon: 'Building',
    categoryKey: 'services.commercialWrapping.category',
    durationKey: 'services.commercialWrapping.duration',
    warrantyKey: 'services.commercialWrapping.warranty',
    fullDescriptionKey: 'services.commercialWrapping.fullDescription',
    featuresKey: 'services.commercialWrapping.features',
    processKey: 'services.commercialWrapping.process'
  }
];

// Storage keys
const STORAGE_KEYS = {
  HERO: 'folien_sam_hero_data',
  GALLERY: 'folien_sam_gallery_images',
  SERVICES: 'folien_sam_services',
  ADMIN_PASSWORD: 'folien_sam_admin_password'
};

// Initialize storage with default data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.HERO)) {
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(DEFAULT_HERO_DATA));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY_IMAGES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    // Default password: admin123
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123');
  }
};

// Hero Data Management
export const getHeroData = (): HeroData => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.HERO);
  return data ? JSON.parse(data) : DEFAULT_HERO_DATA;
};

export const updateHeroData = (data: HeroData): void => {
  localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(data));
};

// Gallery Management
export const getGalleryImages = (): GalleryImage[] => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
  return data ? JSON.parse(data) : DEFAULT_GALLERY_IMAGES;
};

export const addGalleryImage = (image: Omit<GalleryImage, 'id'>): GalleryImage => {
  const images = getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
    publishedAt: image.publishedAt || new Date().toISOString() // Add timestamp if not provided
  };
  images.push(newImage);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(images));
  return newImage;
};

export const updateGalleryImage = (id: string, updates: Partial<GalleryImage>): void => {
  const images = getGalleryImages();
  const index = images.findIndex(img => img.id === id);
  if (index !== -1) {
    images[index] = { ...images[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(images));
  }
};

export const deleteGalleryImage = (id: string): void => {
  const images = getGalleryImages();
  const filteredImages = images.filter(img => img.id !== id);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filteredImages));
};

// Services Management
export const getServices = (): Service[] => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return data ? JSON.parse(data) : DEFAULT_SERVICES;
};

export const addService = (service: Omit<Service, 'id'>): Service => {
  const services = getServices();
  const newService: Service = {
    ...service,
    id: Date.now().toString()
  };
  services.push(newService);
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  return newService;
};

export const updateService = (id: string, updates: Partial<Service>): void => {
  const services = getServices();
  const index = services.findIndex(svc => svc.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }
};

export const deleteService = (id: string): void => {
  const services = getServices();
  const filteredServices = services.filter(svc => svc.id !== id);
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(filteredServices));
};

// Admin Authentication
export const checkAdminPassword = (password: string): boolean => {
  initializeStorage();
  const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  return password === storedPassword;
};

export const updateAdminPassword = (newPassword: string): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
};

