// Image Upload Service - Using Cloudinary (Free Cloud Storage)
// No backend server needed!

export interface UploadedImage {
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

// Cloudinary configuration
// Get these from: https://cloudinary.com (free account)
const CLOUDINARY_CLOUD_NAME = 'dm2hybs2u'; // Replace with your cloud name
const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_uploads'; // Replace with your upload preset

// Upload image to Cloudinary (FREE - no server needed!)
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    console.log('Uploading to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Cloudinary API error:', errorData);
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Cloudinary response:', data);
    return data.secure_url; // Returns HTTPS URL to your image
  } catch (error) {
    console.error('Upload error details:', error);
    throw new Error(`Cloudinary upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Alternative: Upload to ImgBB (FREE - unlimited storage!)
export const uploadToImgBB = async (file: File): Promise<string> => {
  const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY'; // Get from: https://api.imgbb.com/
  
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.data.url; // Returns URL to your image
  } catch (error) {
    throw new Error(`ImgBB upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Main upload function - tries Cloudinary first, then ImgBB, then localStorage
export const saveUploadedImage = async (file: File): Promise<string> => {
  // Validate file first
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid file');
  }

  // Check if Cloudinary is configured
  if (CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME' || CLOUDINARY_UPLOAD_PRESET === 'YOUR_UPLOAD_PRESET') {
    throw new Error('⚠️ Cloudinary not configured! Please set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in imageUploadService.ts');
  }

  try {
    console.log('📤 Uploading to Cloudinary...');
    console.log('Cloud Name:', CLOUDINARY_CLOUD_NAME);
    console.log('Upload Preset:', CLOUDINARY_UPLOAD_PRESET);
    
    const url = await uploadToCloudinary(file);
    console.log('✅ Upload successful!', url);
    return url;
    
  } catch (error) {
    console.error('❌ Cloudinary upload failed:', error);
    throw error; // Don't fall back to localStorage - show the error instead
  }
};

// Fallback: Save to localStorage as base64 (limited storage)
const saveToLocalStorage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      
      const uploadedImage = {
        name: file.name,
        data: base64Data,
        type: file.type,
        size: file.size,
        timestamp: Date.now()
      };
      
      try {
        const storageKey = 'folien_sam_uploaded_images';
        const existing = localStorage.getItem(storageKey);
        const images = existing ? JSON.parse(existing) : [];
        images.push(uploadedImage);
        localStorage.setItem(storageKey, JSON.stringify(images));
        resolve(base64Data);
      } catch (error) {
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          reject(new Error('Storage quota exceeded. Please configure Cloudinary or ImgBB for unlimited storage.'));
        } else {
          reject(error);
        }
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

// Get list of uploaded images (localStorage only)
export const getUploadedImages = (): UploadedImage[] => {
  try {
    const storageKey = 'folien_sam_uploaded_images';
    const data = localStorage.getItem(storageKey);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    return parsed.map((item: any) => ({
      name: item.name,
      url: item.data,
      size: item.size,
      uploadedAt: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Failed to get uploaded images:', error);
    return [];
  }
};

// Delete uploaded image (localStorage only)
export const deleteUploadedImage = (name: string): void => {
  try {
    const storageKey = 'folien_sam_uploaded_images';
    const images = getUploadedImages();
    const filteredImages = images.filter(img => img.name !== name);
    localStorage.setItem(storageKey, JSON.stringify(filteredImages));
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
};

// Get storage usage info
export const getStorageInfo = () => {
  const images = getUploadedImages();
  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const count = images.length;
  
  return {
    count,
    totalSize,
    totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
    images
  };
};

// Validate image file
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, GIF, or WebP images.'
    };
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 10MB.'
    };
  }
  
  return { valid: true };
};
