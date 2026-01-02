import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getHeroData, updateHeroData, HeroData } from '../../services/dataService';
import ImageUpload from './ImageUpload';

const HeroManager: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    mainImageUrl: 'https://images.cood.ai/cards.gif',
    videoUrl: 'https://images.cood.ai/cards.gif',
    youtubeVideoId: 'udbvm6bulGU'
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (err) {
        console.error('Failed to load hero data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await updateHeroData(heroData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save hero data:', err);
      alert('Failed to save. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark">Hero Section</h2>
          <p className="text-gray-600">Manage the main hero image and video</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Changes saved successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Main Image URL */}
        <ImageUpload
          label="Main Background Image"
          value={heroData.mainImageUrl}
          onChange={(value) => setHeroData({ ...heroData, mainImageUrl: value })}
          placeholder="https://example.com/image.jpg"
          description="This image appears as the main background in the hero section"
        />

        {/* Video URL */}
        <ImageUpload
          label="Hero Circle Video/GIF"
          value={heroData.videoUrl}
          onChange={(value) => setHeroData({ ...heroData, videoUrl: value })}
          placeholder="https://example.com/video.gif"
          description="This appears in the circular video preview on the right side"
        />

        {/* YouTube Video ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            YouTube Video ID (for modal)
          </label>
          <input
            type="text"
            value={heroData.youtubeVideoId}
            onChange={(e) => setHeroData({ ...heroData, youtubeVideoId: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
            placeholder="udbvm6bulGU"
          />
          <p className="mt-1 text-sm text-gray-500">
            The YouTube video ID from the URL (e.g., youtube.com/watch?v=<strong>udbvm6bulGU</strong>)
          </p>
        </div>

      </div>
    </div>
  );
};

export default HeroManager;

