// Cloudinary Data Storage Service
// Stores JSON configuration files in Cloudinary as raw files

const CLOUDINARY_CLOUD_NAME = 'dm2hybs2u';
const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_uploads';

// Use localStorage to track latest version URLs
const LATEST_URLS_KEY = 'folien_sam_cloudinary_urls';

// Get stored URLs
const getStoredUrls = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem(LATEST_URLS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save URL for a data type
const saveUrl = (dataType: string, url: string): void => {
  const urls = getStoredUrls();
  urls[dataType] = url;
  localStorage.setItem(LATEST_URLS_KEY, JSON.stringify(urls));
};

// Get URL for a data type
const getUrl = (dataType: string): string | null => {
  const urls = getStoredUrls();
  return urls[dataType] || null;
};

/**
 * Upload JSON data to Cloudinary as a raw file
 */
export const uploadJSONToCloudinary = async (
  dataType: string,
  data: any
): Promise<string> => {
  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const uniqueId = `folien_sam_${dataType}_${timestamp}`;
    
    console.log(`📤 Uploading JSON to Cloudinary: ${uniqueId}`);
    console.log(`📦 Data to upload:`, data);
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    const formData = new FormData();
    formData.append('file', blob, `${uniqueId}.json`);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
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
    const url = result.secure_url;
    
    console.log('✅ JSON uploaded to Cloudinary:', url);
    console.log('   Public ID:', result.public_id);
    
    // Store the URL for this data type
    saveUrl(dataType, url);
    console.log(`💾 Saved URL for ${dataType}:`, url);
    
    return url;
  } catch (error) {
    console.error('❌ Cloudinary JSON upload error:', error);
    throw error;
  }
};

/**
 * Download JSON data from Cloudinary using stored URL
 */
export const downloadJSONFromCloudinary = async (
  dataType: string
): Promise<any> => {
  try {
    // Get the stored URL for this data type
    const storedUrl = getUrl(dataType);
    
    if (!storedUrl) {
      console.warn(`⚠️ No stored URL for ${dataType}, data not initialized`);
      return null;
    }
    
    // Add cache busting
    const timestamp = new Date().getTime();
    const url = `${storedUrl}?_=${timestamp}`;
    
    console.log(`📥 Downloading ${dataType} from:`, url);
    
    const response = await fetch(url, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️ JSON file not found: ${dataType}`);
        return null;
      }
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ JSON downloaded for ${dataType}:`, data);
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
  const data = await downloadJSONFromCloudinary('gallery');
  
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
  await uploadJSONToCloudinary('gallery', data);
};

/**
 * Get hero data from Cloudinary
 */
export const getHeroData = async (): Promise<any> => {
  const data = await downloadJSONFromCloudinary('hero');
  
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
  await uploadJSONToCloudinary('hero', data);
};

/**
 * Get services data from Cloudinary
 */
export const getServicesData = async (): Promise<any[]> => {
  const data = await downloadJSONFromCloudinary('services');
  
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
  await uploadJSONToCloudinary('services', data);
};

/**
 * Get translations data from Cloudinary
 */
export const getTranslationsData = async (): Promise<any> => {
  const data = await downloadJSONFromCloudinary('translations');
  
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
  await uploadJSONToCloudinary('translations', data);
};

/**
 * Get settings data from Cloudinary
 */
export const getSettingsData = async (): Promise<any> => {
  const data = await downloadJSONFromCloudinary('settings');
  
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
  await uploadJSONToCloudinary('settings', data);
};

/**
 * Initialize data files in Cloudinary (run once)
 */
export const initializeCloudinaryData = async (): Promise<void> => {
  try {
    console.log('🚀 Initializing Cloudinary data storage...');
    
    // Check if we already have stored URLs (already initialized)
    const urls = getStoredUrls();
    const galleryExists = urls['gallery'];
    const heroExists = urls['hero'];
    const servicesExists = urls['services'];
    const translationsExists = urls['translations'];
    const settingsExists = urls['settings'];
    
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

