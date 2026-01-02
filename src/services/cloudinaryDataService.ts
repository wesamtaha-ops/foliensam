// Cloudinary Data Storage Service
// ONE hardcoded manifest URL - works for ALL devices
// NO localStorage - Cloudinary is the ONLY source of truth

const CLOUDINARY_CLOUD_NAME = 'dm2hybs2u';
const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_uploads';

// HARDCODED MANIFEST URL - This is the SINGLE source of truth for ALL devices
const MANIFEST_PUBLIC_ID = 'folien_sam_manifest';
const MANIFEST_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/${MANIFEST_PUBLIC_ID}.json`;

// Type definitions
interface Manifest {
  gallery?: string;
  hero?: string;
  services?: string;
  translations?: string;
  settings?: string;
  updatedAt?: string;
}

interface GalleryItem {
  id: string;
  type: 'image' | 'youtube';
  url?: string;
  videoId?: string;
  thumbnail?: string;
  title: string;
  category: string;
  publishedAt?: string;
}

interface HeroData {
  mainImageUrl: string;
  videoUrl: string;
  youtubeVideoId: string;
}

interface ServiceData {
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

interface SettingsData {
  adminPassword: string;
  siteName: string;
  contactEmail: string;
  whatsappNumber: string;
}

/**
 * Upload JSON to Cloudinary with a unique timestamp filename
 * Returns the URL to the uploaded file
 */
const uploadJSON = async <T>(publicIdBase: string, data: T): Promise<string> => {
  const timestamp = Date.now();
  const publicId = `${publicIdBase}_${timestamp}`;
  
  console.log(`📤 Uploading ${publicIdBase} to Cloudinary...`);
  
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  const formData = new FormData();
  formData.append('file', blob, `${publicId}.json`);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('public_id', publicId);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Upload failed:', errorData);
    throw new Error(errorData.error?.message || 'Upload failed');
  }

  const result = await response.json();
  console.log(`✅ Uploaded:`, result.secure_url);
  return result.secure_url;
};

/**
 * Upload the manifest file using SIGNED upload (via serverless function)
 * This allows overwriting the file and invalidating CDN cache
 */
const uploadManifest = async (manifest: Manifest): Promise<void> => {
  manifest.updatedAt = new Date().toISOString();
  
  console.log(`📤 Uploading manifest (signed)...`);
  console.log('📦 Manifest data:', manifest);
  
  // Use the serverless function for signed upload
  const apiUrl = import.meta.env.DEV 
    ? '/api/cloudinary-upload'  // Local dev (needs proxy)
    : '/api/cloudinary-upload'; // Production (Vercel)
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: manifest,
        publicId: MANIFEST_PUBLIC_ID,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save manifest');
    }

    const result = await response.json();
    console.log('✅ Manifest saved (signed):', result.url);
    console.log('   Version:', result.version);
  } catch (error) {
    // Fallback to unsigned upload if serverless function not available
    console.warn('⚠️ Signed upload failed, trying unsigned...', error);
    await uploadManifestUnsigned(manifest);
  }
};

/**
 * Fallback: Upload manifest with unsigned upload (for local dev without API)
 */
const uploadManifestUnsigned = async (manifest: Manifest): Promise<void> => {
  const jsonString = JSON.stringify(manifest, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  const formData = new FormData();
  formData.append('file', blob, `${MANIFEST_PUBLIC_ID}.json`);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('public_id', MANIFEST_PUBLIC_ID);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to save manifest');
  }

  const result = await response.json();
  console.log('✅ Manifest saved (unsigned):', result.secure_url);
};

/**
 * Download JSON from URL with cache busting
 */
const downloadJSON = async <T>(url: string): Promise<T | null> => {
  try {
    const cacheBustUrl = `${url}?_=${Date.now()}`;
    
    const response = await fetch(cacheBustUrl, {
      cache: 'no-store',
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.warn('Download failed:', error);
    return null;
  }
};

/**
 * Get manifest from the HARDCODED URL
 * This is the SINGLE source of truth for ALL devices
 */
const getManifest = async (): Promise<Manifest> => {
  console.log('📥 Fetching manifest from:', MANIFEST_URL);
  
  const manifest = await downloadJSON<Manifest>(MANIFEST_URL);
  
  if (manifest) {
    console.log('✅ Manifest loaded from Cloudinary');
    return manifest;
  }
  
  console.log('⚠️ No manifest found - needs initialization');
  return {};
};

// ========================================
// PUBLIC API - All devices use these
// ========================================

/**
 * Get gallery data from Cloudinary
 */
export const getGalleryData = async (): Promise<GalleryItem[]> => {
  const manifest = await getManifest();
  
  if (manifest.gallery) {
    const data = await downloadJSON<GalleryItem[]>(manifest.gallery);
    if (data) {
      console.log('✅ Gallery loaded from Cloudinary');
      return data;
    }
  }
  
  return [
    { id: '1', type: 'image', url: 'https://images.cood.ai/samgo/001.png', title: 'Premium Folierung', category: 'Folierung', publishedAt: new Date().toISOString() },
    { id: '2', type: 'image', url: 'https://images.cood.ai/samgo/002.png', title: 'Mattfolierung', category: 'Folierung', publishedAt: new Date().toISOString() },
    { id: '3', type: 'image', url: 'https://images.cood.ai/samgo/003.png', title: 'Chromfolierung', category: 'Folierung', publishedAt: new Date().toISOString() }
  ];
};

/**
 * Save gallery data to Cloudinary
 */
export const saveGalleryData = async (data: GalleryItem[]): Promise<void> => {
  const url = await uploadJSON<GalleryItem[]>('folien_sam_gallery', data);
  const manifest = await getManifest();
  manifest.gallery = url;
  await uploadManifest(manifest);
};

/**
 * Get hero data from Cloudinary
 */
export const getHeroData = async (): Promise<HeroData> => {
  const manifest = await getManifest();
  
  if (manifest.hero) {
    const data = await downloadJSON<HeroData>(manifest.hero);
    if (data) {
      console.log('✅ Hero loaded from Cloudinary');
      return data;
    }
  }
  
  return {
    mainImageUrl: 'https://images.cood.ai/cards.gif',
    videoUrl: 'https://images.cood.ai/cards.gif',
    youtubeVideoId: 'udbvm6bulGU'
  };
};

/**
 * Save hero data to Cloudinary
 */
export const saveHeroData = async (data: HeroData): Promise<void> => {
  const url = await uploadJSON<HeroData>('folien_sam_hero', data);
  const manifest = await getManifest();
  manifest.hero = url;
  await uploadManifest(manifest);
};

/**
 * Get services data from Cloudinary
 */
export const getServicesData = async (): Promise<ServiceData[]> => {
  const manifest = await getManifest();
  
  if (manifest.services) {
    const data = await downloadJSON<ServiceData[]>(manifest.services);
    if (data) {
      console.log('✅ Services loaded from Cloudinary');
      return data;
    }
  }
  
  return [{
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
  }];
};

/**
 * Save services data to Cloudinary
 */
export const saveServicesData = async (data: ServiceData[]): Promise<void> => {
  const url = await uploadJSON<ServiceData[]>('folien_sam_services', data);
  const manifest = await getManifest();
  manifest.services = url;
  await uploadManifest(manifest);
};

/**
 * Get translations data from Cloudinary
 */
export const getTranslationsData = async (): Promise<Record<string, Record<string, string>>> => {
  const manifest = await getManifest();
  
  if (manifest.translations) {
    const data = await downloadJSON<Record<string, Record<string, string>>>(manifest.translations);
    if (data) {
      console.log('✅ Translations loaded from Cloudinary');
      return data;
    }
  }
  
  return {};
};

/**
 * Save translations data to Cloudinary
 */
export const saveTranslationsData = async (data: Record<string, Record<string, string>>): Promise<void> => {
  const url = await uploadJSON<Record<string, Record<string, string>>>('folien_sam_translations', data);
  const manifest = await getManifest();
  manifest.translations = url;
  await uploadManifest(manifest);
};

/**
 * Get settings data from Cloudinary
 */
export const getSettingsData = async (): Promise<SettingsData> => {
  const manifest = await getManifest();
  
  if (manifest.settings) {
    const data = await downloadJSON<SettingsData>(manifest.settings);
    if (data) {
      console.log('✅ Settings loaded from Cloudinary');
      return data;
    }
  }
  
  return {
    adminPassword: 'admin123',
    siteName: 'FolienSam',
    contactEmail: 'info@foliensam.de',
    whatsappNumber: '+491234567890'
  };
};

/**
 * Save settings data to Cloudinary
 */
export const saveSettingsData = async (data: SettingsData): Promise<void> => {
  const url = await uploadJSON<SettingsData>('folien_sam_settings', data);
  const manifest = await getManifest();
  manifest.settings = url;
  await uploadManifest(manifest);
};

/**
 * Initialize Cloudinary storage - creates all data files and manifest
 * Run this ONCE to set up the storage
 */
export const initializeCloudinaryData = async (): Promise<void> => {
  console.log('🚀 Initializing Cloudinary data storage...');
  console.log('📍 Manifest URL:', MANIFEST_URL);
  
  const manifest: Manifest = {};
  
  // Create all data files
  console.log('📝 Creating gallery...');
  const galleryData = [
    { id: '1', type: 'image' as const, url: 'https://images.cood.ai/samgo/001.png', title: 'Premium Folierung', category: 'Folierung', publishedAt: new Date().toISOString() },
    { id: '2', type: 'image' as const, url: 'https://images.cood.ai/samgo/002.png', title: 'Mattfolierung', category: 'Folierung', publishedAt: new Date().toISOString() },
    { id: '3', type: 'image' as const, url: 'https://images.cood.ai/samgo/003.png', title: 'Chromfolierung', category: 'Folierung', publishedAt: new Date().toISOString() }
  ];
  manifest.gallery = await uploadJSON<GalleryItem[]>('folien_sam_gallery', galleryData);
  
  console.log('📝 Creating hero...');
  const heroData = {
    mainImageUrl: 'https://images.cood.ai/cards.gif',
    videoUrl: 'https://images.cood.ai/cards.gif',
    youtubeVideoId: 'udbvm6bulGU'
  };
  manifest.hero = await uploadJSON<HeroData>('folien_sam_hero', heroData);
  
  console.log('📝 Creating services...');
  const servicesData = [{
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
  }];
  manifest.services = await uploadJSON<ServiceData[]>('folien_sam_services', servicesData);
  
  console.log('📝 Creating translations...');
  manifest.translations = await uploadJSON<Record<string, Record<string, string>>>('folien_sam_translations', {});
  
  console.log('📝 Creating settings...');
  const settingsData = {
    adminPassword: 'admin123',
    siteName: 'FolienSam',
    contactEmail: 'info@foliensam.de',
    whatsappNumber: '+491234567890'
  };
  manifest.settings = await uploadJSON<SettingsData>('folien_sam_settings', settingsData);
  
  // Save the manifest
  console.log('📝 Saving manifest...');
  await uploadManifest(manifest);
  
  console.log('✅ Initialization complete!');
  console.log('📋 Manifest URL (hardcoded):', MANIFEST_URL);
};

/**
 * Get the hardcoded manifest URL
 */
export const getManifestUrl = (): string => {
  return MANIFEST_URL;
};
