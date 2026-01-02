// Cloudinary Data Storage Service
// Stores JSON configuration files in Cloudinary as raw files

const CLOUDINARY_CLOUD_NAME = 'dm2hybs2u';
const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_uploads';

// Public IDs for our JSON files in Cloudinary
const DATA_FILES = {
  gallery: 'folien_sam_data/gallery',
  hero: 'folien_sam_data/hero',
  services: 'folien_sam_data/services',
  translations: 'folien_sam_data/translations',
  settings: 'folien_sam_data/settings',
};

/**
 * Upload JSON data to Cloudinary as a raw file
 */
export const uploadJSONToCloudinary = async (
  publicId: string,
  data: any
): Promise<string> => {
  try {
    console.log(`📤 Uploading JSON to Cloudinary: ${publicId}`);
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    const formData = new FormData();
    formData.append('file', blob, `${publicId.split('/').pop()}.json`);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('public_id', publicId);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Cloudinary upload failed:', errorData);
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }

    const result = await response.json();
    console.log('✅ JSON uploaded to Cloudinary:', result.secure_url);
    console.log('   Public ID:', result.public_id);
    return result.secure_url;
  } catch (error) {
    console.error('❌ Cloudinary JSON upload error:', error);
    throw error;
  }
};

/**
 * Download JSON data from Cloudinary
 */
export const downloadJSONFromCloudinary = async (
  publicId: string
): Promise<any> => {
  try {
    // Construct the raw file URL
    const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}.json`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn('⚠️ JSON file not found in Cloudinary:', publicId);
        return null;
      }
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ JSON downloaded from Cloudinary:', publicId);
    return data;
  } catch (error) {
    console.error('❌ Cloudinary JSON download error:', error);
    return null;
  }
};

/**
 * Get gallery data from Cloudinary
 */
export const getGalleryData = async (): Promise<any[]> => {
  const data = await downloadJSONFromCloudinary(DATA_FILES.gallery);
  
  if (!data) {
    // Return default gallery data
    return [
      {
        id: '1',
        type: 'image',
        url: 'https://images.cood.ai/samgo/001.png',
        title: 'Premium Folierung',
        category: 'Folierung',
        publishedAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'image',
        url: 'https://images.cood.ai/samgo/002.png',
        title: 'Mattfolierung',
        category: 'Folierung',
        publishedAt: new Date().toISOString()
      },
      {
        id: '3',
        type: 'image',
        url: 'https://images.cood.ai/samgo/003.png',
        title: 'Chromfolierung',
        category: 'Folierung',
        publishedAt: new Date().toISOString()
      }
    ];
  }
  
  return data;
};

/**
 * Save gallery data to Cloudinary
 */
export const saveGalleryData = async (data: any[]): Promise<void> => {
  await uploadJSONToCloudinary(DATA_FILES.gallery, data);
};

/**
 * Get hero data from Cloudinary
 */
export const getHeroData = async (): Promise<any> => {
  const data = await downloadJSONFromCloudinary(DATA_FILES.hero);
  
  if (!data) {
    // Return default hero data
    return {
      mainImageUrl: 'https://images.cood.ai/cards.gif',
      videoUrl: 'https://images.cood.ai/cards.gif',
      youtubeVideoId: 'udbvm6bulGU'
    };
  }
  
  return data;
};

/**
 * Save hero data to Cloudinary
 */
export const saveHeroData = async (data: any): Promise<void> => {
  await uploadJSONToCloudinary(DATA_FILES.hero, data);
};

/**
 * Get services data from Cloudinary
 */
export const getServicesData = async (): Promise<any[]> => {
  const data = await downloadJSONFromCloudinary(DATA_FILES.services);
  
  if (!data) {
    // Return default services data
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
  }
  
  return data;
};

/**
 * Save services data to Cloudinary
 */
export const saveServicesData = async (data: any[]): Promise<void> => {
  await uploadJSONToCloudinary(DATA_FILES.services, data);
};

/**
 * Get translations data from Cloudinary
 */
export const getTranslationsData = async (): Promise<any> => {
  const data = await downloadJSONFromCloudinary(DATA_FILES.translations);
  
  if (!data) {
    // Return empty object - will use default translations from locale files
    return {};
  }
  
  return data;
};

/**
 * Save translations data to Cloudinary
 */
export const saveTranslationsData = async (data: any): Promise<void> => {
  await uploadJSONToCloudinary(DATA_FILES.translations, data);
};

/**
 * Get settings data from Cloudinary
 */
export const getSettingsData = async (): Promise<any> => {
  const data = await downloadJSONFromCloudinary(DATA_FILES.settings);
  
  if (!data) {
    // Return default settings
    return {
      adminPassword: 'admin123',
      siteName: 'FolienSam',
      contactEmail: 'info@foliensam.de',
      whatsappNumber: '+491234567890'
    };
  }
  
  return data;
};

/**
 * Save settings data to Cloudinary
 */
export const saveSettingsData = async (data: any): Promise<void> => {
  await uploadJSONToCloudinary(DATA_FILES.settings, data);
};

/**
 * Initialize data files in Cloudinary (run once)
 */
export const initializeCloudinaryData = async (): Promise<void> => {
  try {
    console.log('🚀 Initializing Cloudinary data storage...');
    
    // Check if files exist
    const galleryExists = await downloadJSONFromCloudinary(DATA_FILES.gallery);
    const heroExists = await downloadJSONFromCloudinary(DATA_FILES.hero);
    const servicesExists = await downloadJSONFromCloudinary(DATA_FILES.services);
    const translationsExists = await downloadJSONFromCloudinary(DATA_FILES.translations);
    const settingsExists = await downloadJSONFromCloudinary(DATA_FILES.settings);
    
    // Create default files if they don't exist
    if (!galleryExists) {
      console.log('📝 Creating default gallery.json...');
      await saveGalleryData(await getGalleryData());
    }
    
    if (!heroExists) {
      console.log('📝 Creating default hero.json...');
      await saveHeroData(await getHeroData());
    }
    
    if (!servicesExists) {
      console.log('📝 Creating default services.json...');
      await saveServicesData(await getServicesData());
    }
    
    if (!translationsExists) {
      console.log('📝 Creating default translations.json...');
      await saveTranslationsData({});
    }
    
    if (!settingsExists) {
      console.log('📝 Creating default settings.json...');
      await saveSettingsData(await getSettingsData());
    }
    
    console.log('✅ Cloudinary data storage initialized!');
  } catch (error) {
    console.error('❌ Failed to initialize Cloudinary data:', error);
    throw error;
  }
};

