import React, { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchAllChannelShorts, YouTubeVideo } from '../services/youtubeApi';
import { getGalleryImages } from '../services/dataService';

interface GalleryItem {
  type: 'youtube' | 'image';
  videoId?: string;
  thumbnail?: string;
  url?: string;
  title?: string; // Optional - auto-generated if not provided
  category: string;
  publishedAt?: string; // Added for sorting
}

type TabType = 'all' | 'images' | 'videos';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabType>('videos');

  // Helper function to check if a video is new (published within last 7 days)
  const isNewVideo = (publishedAt: string) => {
    const videoDate = new Date(publishedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return videoDate > weekAgo;
  };

  // Fetch YouTube videos on component mount
  useEffect(() => {
    const loadYouTubeVideos = async () => {
      // Check if we should fetch (cache for 1 hour to save quota)
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      
      if (youtubeVideos.length > 0 && (now - lastFetchTime) < oneHour) {
        console.log('💾 Using cached videos, skipping API call to save quota');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log('🔄 Starting YouTube API fetch...');
        console.log('📱 Gallery component mounted, attempting to load videos...');
        
        const videos = await fetchAllChannelShorts(); // Fetch all available shorts
        console.log(`✅ Successfully loaded ${videos.length} videos from YouTube API:`, videos);
        setYoutubeVideos(videos);
        setLastFetchTime(now);
        
        if (videos.length === 0) {
          console.warn('⚠️ No videos returned from API, will show fallback content');
        }
      } catch (err) {
        console.error('❌ Failed to load YouTube videos:', err);
        console.error('🔍 Error details:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : 'No stack trace',
          error: err
        });
        // Don't show error to user, just fallback to static content
        setYoutubeVideos([]); // Empty array will show only static images
      } finally {
        setIsLoading(false);
        console.log('🏁 Finished loading attempt');
      }
    };

    loadYouTubeVideos();
  }, [youtubeVideos.length, lastFetchTime]);

  // Load gallery images from Cloudinary/localStorage
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        console.log('🖼️ Loading gallery images from dataService...');
        const images = await getGalleryImages();
        console.log(`✅ Loaded ${images.length} gallery images:`, images);
        
        // Convert to GalleryItem format
        const galleryItems: GalleryItem[] = images.map(img => ({
          type: img.type as 'youtube' | 'image',
          videoId: img.videoId,
          thumbnail: img.thumbnail,
          url: img.url,
          title: img.title,
          category: img.category,
          publishedAt: img.publishedAt
        }));
        
        setGalleryImages(galleryItems);
      } catch (err) {
        console.error('❌ Failed to load gallery images:', err);
        setGalleryImages([]); // Empty array as fallback
      }
    };

    loadGalleryImages();
  }, []); // Run once on mount

  // Cleanup effect to stop videos when navigating or closing
  useEffect(() => {
    if (!selectedItem) {
      // Stop any playing videos when modal closes
      const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
      iframes.forEach(iframe => {
        const iframeElement = iframe as HTMLIFrameElement;
        if (iframeElement.contentWindow) {
          iframeElement.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        }
      });
    }
  }, [selectedItem]);

  // Combined array of YouTube videos and static images with deduplication
  const previews = React.useMemo((): GalleryItem[] => {
    const youtubeItems: GalleryItem[] = youtubeVideos
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) // Sort by newest first (DESC)
      .map(video => ({
        type: 'youtube' as const,
        videoId: video.id,
        thumbnail: video.thumbnail,
        title: video.title,
        category: "Folierung",
        publishedAt: video.publishedAt // Keep the date for reference
      }));

    // Fallback static YouTube videos if API fails
    const fallbackYoutubeItems: GalleryItem[] = youtubeVideos.length === 0 ? [
      {
        type: 'youtube' as const,
        videoId: 'XbYFMSOzbGY',
        thumbnail: `https://i3.ytimg.com/vi/XbYFMSOzbGY/maxresdefault.jpg`,
        title: "Car Wrapping Short",
        category: "Folierung",
        publishedAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        type: 'youtube' as const,
        videoId: 'FFKCDfctTYk',
        thumbnail: `https://i3.ytimg.com/vi/FFKCDfctTYk/maxresdefault.jpg`,
        title: "Vehicle Wrap Process",
        category: "Folierung",
        publishedAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
      },
      {
        type: 'youtube' as const,
        videoId: 'DROwDW-014U',
        thumbnail: `https://i3.ytimg.com/vi/DROwDW-014U/maxresdefault.jpg`,
        title: "Premium Wrap Showcase",
        category: "Folierung",
        publishedAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
      },
      {
        type: 'youtube' as const,
        videoId: 'cRR7qhs80xU',
        thumbnail: `https://i3.ytimg.com/vi/cRR7qhs80xU/maxresdefault.jpg`,
        title: "Car Wrapping Art",
        category: "Folierung",
        publishedAt: new Date(Date.now() - 518400000).toISOString() // 6 days ago
      },
      {
        type: 'youtube' as const,
        videoId: 'udbvm6bulGU',
        thumbnail: `https://i3.ytimg.com/vi/udbvm6bulGU/maxresdefault.jpg`,
        title: "BMW Car Wrapping",
        category: "Folierung",
        publishedAt: new Date().toISOString()
      },
      {
        type: 'youtube' as const,
        videoId: '-fNTp5sPt7Q',
        thumbnail: `https://i3.ytimg.com/vi/-fNTp5sPt7Q/maxresdefault.jpg`,
        title: "Dodge Charger Wrap",
        category: "Folierung",
        publishedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        type: 'youtube' as const,
        videoId: 'as5lyJ-4jPk',
        thumbnail: `https://i3.ytimg.com/vi/as5lyJ-4jPk/maxresdefault.jpg`,
        title: "Range Rover Wrap",
        category: "Folierung",
        publishedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      
    ] : [];

    // Combine all sources
    const allVideos = youtubeVideos.length > 0 ? youtubeItems : fallbackYoutubeItems;
    const allItems = [...allVideos, ...galleryImages];
    
    // DEDUPLICATION: Remove duplicate YouTube videos by videoId
    const seenVideoIds = new Set<string>();
    const seenImageUrls = new Set<string>();
    const uniqueItems = allItems.filter(item => {
      if (item.type === 'youtube' && item.videoId) {
        if (seenVideoIds.has(item.videoId)) {
          console.log(`🔄 Skipping duplicate video: ${item.videoId} - ${item.title}`);
          return false; // Skip duplicate
        }
        seenVideoIds.add(item.videoId);
        return true;
      } else if (item.type === 'image' && item.url) {
        if (seenImageUrls.has(item.url)) {
          console.log(`🔄 Skipping duplicate image: ${item.url}`);
          return false; // Skip duplicate
        }
        seenImageUrls.add(item.url);
        return true;
      }
      return true;
    });

    console.log(`📊 Gallery stats: ${allItems.length} total items → ${uniqueItems.length} unique items (${allItems.length - uniqueItems.length} duplicates removed)`);
    
    // Sort ALL unique items by date (newest first) - images uploaded from admin will appear first!
    return uniqueItems.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA; // Descending order (newest first)
    });
  }, [youtubeVideos, galleryImages]);

  const handlePrevious = useCallback(() => {
    // Stop current video before navigating
    const currentIframe = document.querySelector('iframe[src*="youtube.com"]') as HTMLIFrameElement;
    if (currentIframe?.contentWindow) {
      currentIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
    
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : previews.length - 1));
  }, [previews.length]);

  const handleNext = useCallback(() => {
    // Stop current video before navigating
    const currentIframe = document.querySelector('iframe[src*="youtube.com"]') as HTMLIFrameElement;
    if (currentIframe?.contentWindow) {
      currentIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
    
    setCurrentIndex((prev) => (prev < previews.length - 1 ? prev + 1 : 0));
  }, [previews.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedItem) {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          setSelectedItem(null);
          break;
      }
    }
  }, [selectedItem, handlePrevious, handleNext]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderMedia = (item: GalleryItem) => {
    if (item.type === 'youtube') {
      return (
        <div className="relative w-full flex justify-center">
          {/* Mobile: Vertical video, Desktop: Vertical container */}
          <div className="relative w-full max-w-sm h-[70vh] md:h-[60vh] bg-black rounded-2xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&loop=1&playlist=${item.videoId}`}
              className="w-full h-full rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4">
              <h3 className="text-white font-semibold text-lg mb-2">{item.title || 'YouTube Video'}</h3>
              {item.publishedAt && (
                <p className="text-white/80 text-sm">
                  {new Date(item.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full max-w-4xl">
        <img
          src={item.url}
          alt={item.title || 'Gallery Image'}
          className="w-full h-auto rounded-lg"
        />
      </div>
    );
  };

  // Filter items based on active tab
  const filteredPreviews = React.useMemo(() => {
    if (activeTab === 'images') {
      return previews.filter(item => item.type === 'image');
    } else if (activeTab === 'videos') {
      return previews.filter(item => item.type === 'youtube');
    }
    return previews; // 'all' tab
  }, [previews, activeTab]);

  return (
    <section className="py-16 md:py-24 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('gallery.title')}</h2>
          <div className="w-24 h-1 bg-accent-purple mx-auto rounded-full" />
          <p className="mt-6 text-lg text-primary-silver max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
          
          <a 
            href="https://vm.tiktok.com/ZNew77xKv/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#00f2ea] hover:bg-[#00d1ca] text-black font-semibold rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            <Play className="h-5 w-5" />
            {t('gallery.followTiktok')}
          </a>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-primary-light rounded-full p-1 gap-2">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/50 scale-105'
                  : 'text-primary-silver hover:text-white hover:bg-primary-dark/50'
              }`}
            >
              <Video className="w-5 h-5" />
              {t('gallery.tabs.videos')}
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'images'
                  ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/50 scale-105'
                  : 'text-primary-silver hover:text-white hover:bg-primary-dark/50'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              {t('gallery.tabs.images')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="h-12 w-12 text-accent-purple animate-spin mx-auto" />
              <p className="mt-4 text-primary-silver">{t('gallery.loading')}</p>
              <p className="mt-2 text-primary-silver/60 text-sm">Loading videos from YouTube...</p>
            </div>
          ) : filteredPreviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-primary-silver text-lg">{t('gallery.noItems')}</p>
            </div>
          ) : (
            filteredPreviews.map((item, index) => {
              const actualIndex = previews.findIndex(p => p === item);
              return (
                <div 
                  key={index}
                  className="group relative cursor-pointer aspect-square animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => {
                    setSelectedItem(item);
                    setCurrentIndex(actualIndex);
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-accent-purple/30 group-hover:border-accent-purple group-hover:shadow-2xl group-hover:shadow-accent-purple/30 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105">
                    <img
                      src={item.type === 'youtube' ? item.thumbnail : item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {item.type === 'youtube' && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-accent-purple/60 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-accent-purple/80 transition-all duration-300 shadow-lg">
                            <Play className="w-6 h-6 text-white opacity-90 ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        {/* NEW badge for recent videos */}
                        {item.publishedAt && isNewVideo(item.publishedAt) && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                              ✨ NEW
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Info overlay - always visible at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-col items-center gap-1">
                        <span className="inline-block px-3 py-1 bg-accent-purple text-white text-xs font-semibold rounded-full">
                          {item.category}
                        </span>
                        <p className="text-xs text-white/90 font-medium text-center line-clamp-1">
                          {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric'
                          }) : item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>



        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-accent-purple transition-colors z-10"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Video counter indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full z-10">
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {previews.length}
              </span>
            </div>
            
            <div className="w-full max-w-sm md:max-w-md flex flex-col items-center">
              {/* Video container */}
              <div className="w-full">
                {renderMedia(previews[currentIndex])}
              </div>
              
              {/* Navigation buttons below video */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  className="text-white hover:text-accent-purple transition-colors bg-black/30 hover:bg-black/50 rounded-full p-3"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                
                <button
                  className="text-white hover:text-accent-purple transition-colors bg-black/30 hover:bg-black/50 rounded-full p-3"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
              
              {/* Video info below navigation */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">{previews[currentIndex].title || 'Gallery Item'}</h3>
                <p className="text-primary-silver">{previews[currentIndex].category}</p>
                {previews[currentIndex].publishedAt && (
                  <p className="text-sm text-primary-silver mt-2">
                    Published: {new Date(previews[currentIndex].publishedAt!).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;