// Image Upload Service - Using PHP Backend (files.foliensam.de)
// Your own server handles everything!

export interface UploadedImage {
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

// PHP Backend configuration
const PHP_UPLOAD_URL = 'https://files.foliensam.de/upload.php';

// Upload image to your PHP server
export const uploadToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('📤 Uploading to PHP server:', PHP_UPLOAD_URL);
    
    const response = await fetch(PHP_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('PHP server error:', errorData);
      throw new Error(errorData.error || `Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Upload successful:', result.data.url);
    return result.data.url;
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw new Error(`Server upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Main upload function - uses your PHP server
export const saveUploadedImage = async (file: File): Promise<string> => {
  // Validate file first
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid file');
  }

  try {
    const url = await uploadToServer(file);
    console.log('✅ Image uploaded successfully!', url);
    return url;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
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
