import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { saveUploadedImage, validateImageFile } from '../../services/imageUploadService';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  description?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Enter image URL',
  description
}) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setUploading(true);
    
    try {
      const uploadedUrl = await saveUploadedImage(file);
      console.log('🖼️ Image uploaded, calling onChange with URL:', uploadedUrl);
      onChange(uploadedUrl);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleClearImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUploadMode('url')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
              uploadMode === 'url'
                ? 'bg-accent-purple text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <LinkIcon className="h-3 w-3" />
            URL
          </button>
          <button
            type="button"
            onClick={() => setUploadMode('file')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
              uploadMode === 'file'
                ? 'bg-accent-purple text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <Upload className="h-3 w-3" />
            Upload
          </button>
        </div>
      </div>

      {uploadMode === 'url' ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
          placeholder={placeholder}
        />
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id={`file-upload-${label}`}
          />
          <label
            htmlFor={`file-upload-${label}`}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {uploading ? (
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-accent-purple border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP (Max 5MB)</p>
              </div>
            )}
          </label>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <X className="h-4 w-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {/* Image Preview */}
      {value && (
        <div className="border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Preview</p>
            <button
              type="button"
              onClick={handleClearImage}
              className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          </div>
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '';
                target.style.display = 'none';
                setError('Failed to load image. Please check the URL.');
              }}
            />
          </div>
          {value.startsWith('data:') && (
            <p className="text-xs text-gray-500 mt-2">
              📁 Uploaded image stored in browser
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

