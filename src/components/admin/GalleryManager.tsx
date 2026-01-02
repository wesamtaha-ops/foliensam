import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Video } from 'lucide-react';
import {
  getGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  GalleryImage
} from '../../services/dataService';
import ImageUpload from './ImageUpload';

const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    type: 'image' as 'image' | 'youtube',
    url: '',
    videoId: '',
    thumbnail: '',
    title: '',
    category: 'Folierung'
  });
  const [autoFetchThumbnail, setAutoFetchThumbnail] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await getGalleryImages();
      setImages(data);
    } catch (err) {
      console.error('Failed to load gallery images:', err);
      setImages([]);
    }
  };

  // Auto-fetch YouTube thumbnail when video ID changes
  useEffect(() => {
    if (formData.type === 'youtube' && formData.videoId && autoFetchThumbnail) {
      const thumbnail = `https://i3.ytimg.com/vi/${formData.videoId}/maxresdefault.jpg`;
      setFormData(prev => ({ ...prev, thumbnail }));
    }
  }, [formData.videoId, formData.type, autoFetchThumbnail]);

  const handleAdd = () => {
    setEditingImage(null);
    setFormData({
      type: 'image',
      url: '',
      videoId: '',
      thumbnail: '',
      title: '',
      category: 'Folierung'
    });
    setAutoFetchThumbnail(true);
    setShowModal(true);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      type: image.type,
      url: image.url || '',
      videoId: image.videoId || '',
      thumbnail: image.thumbnail || '',
      title: image.title || '',
      category: image.category
    });
    setAutoFetchThumbnail(false); // Don't auto-fetch when editing
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteGalleryImage(id);
      await loadImages();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.type === 'image' && !formData.url) {
      alert('Please provide an image URL');
      return;
    }
    
    if (formData.type === 'youtube' && !formData.videoId) {
      alert('Please provide a YouTube video ID');
      return;
    }
    
    try {
      // Generate default title if not provided
      const title = formData.title.trim() || 
        (formData.type === 'youtube' 
          ? `YouTube Video ${formData.videoId}` 
          : `Gallery Image ${Date.now()}`);

      const dataToSave = {
        ...formData,
        title,
        publishedAt: new Date().toISOString()
      };

      if (editingImage) {
        await updateGalleryImage(editingImage.id, dataToSave);
      } else {
        await addGalleryImage(dataToSave);
      }
      
      setShowModal(false);
      await loadImages();
    } catch (err) {
      console.error('Failed to save gallery item:', err);
      alert('Failed to save. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-dark">Gallery Management</h2>
          <p className="text-sm sm:text-base text-gray-600">Add, edit, or remove gallery items</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-square">
              <img
                src={image.type === 'youtube' ? image.thumbnail : image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {image.type === 'youtube' && (
                <div className="absolute top-2 left-2">
                  <Video className="h-5 w-5 text-white drop-shadow-lg" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => handleEdit(image)}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Edit2 className="h-4 w-4 text-blue-600" />
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
            <div className="p-2 sm:p-3 bg-white">
              <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{image.title || 'Untitled'}</p>
              <p className="text-xs text-gray-500">{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-primary-dark">
                {editingImage ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'youtube' })}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                >
                  <option value="image">Image</option>
                  <option value="youtube">YouTube Video</option>
                </select>
              </div>

              {formData.type === 'image' ? (
                <ImageUpload
                  label="Gallery Image"
                  value={formData.url}
                  onChange={(value) => setFormData({ ...formData, url: value })}
                  placeholder="https://example.com/image.jpg"
                  description="Upload an image or enter a URL"
                />
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube Video ID or URL
                    </label>
                    <input
                      type="text"
                      value={formData.videoId}
                      onChange={(e) => {
                        let videoId = e.target.value;
                        // Extract video ID from full URL if pasted
                        if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
                          const match = videoId.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
                          if (match) videoId = match[1];
                        }
                        setFormData({ ...formData, videoId });
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                      placeholder="udbvm6bulGU or paste full YouTube URL"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      💡 Paste full YouTube URL or just the video ID
                    </p>
                  </div>
                  
                  {formData.videoId && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Video ID:</strong> {formData.videoId}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Preview: https://youtube.com/watch?v={formData.videoId}
                      </p>
                    </div>
                  )}

                  <ImageUpload
                    label="Thumbnail Image (Optional)"
                    value={formData.thumbnail}
                    onChange={(value) => {
                      setFormData({ ...formData, thumbnail: value });
                      setAutoFetchThumbnail(false);
                    }}
                    placeholder="Auto-generated from YouTube"
                    description="Leave empty to use YouTube's thumbnail"
                  />
                  
                  {formData.thumbnail && (
                    <div className="text-center">
                      <img 
                        src={formData.thumbnail} 
                        alt="Thumbnail preview" 
                        className="max-h-32 mx-auto rounded-lg border-2 border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  placeholder="Auto-generated if left empty"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty to auto-generate (e.g., "YouTube Video xyz" or "Gallery Image")
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  placeholder="Folierung"
                  required
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-accent-purple text-white py-2 text-sm sm:text-base rounded-lg hover:bg-accent-purple/90 transition-colors"
                >
                  {editingImage ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 text-sm sm:text-base rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;

