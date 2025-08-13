import React, { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchAllChannelShorts, YouTubeVideo } from '../services/youtubeApi';

interface GalleryItem {
  type: 'youtube' | 'image';
  videoId?: string;
  thumbnail?: string;
  url?: string;
  title: string;
  category: string;
  publishedAt?: string; // Added for sorting
}

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      try {
        setIsLoading(true);
        console.log('Fetching YouTube shorts...');
        const videos = await fetchAllChannelShorts(); // Fetch all available shorts
        console.log(`Loaded ${videos.length} videos:`, videos);
        setYoutubeVideos(videos);
      } catch (err) {
        console.error('Failed to load YouTube videos:', err);
        // Don't show error to user, just fallback to static content
        setYoutubeVideos([]); // Empty array will show only static images
      } finally {
        setIsLoading(false);
      }
    };

    loadYouTubeVideos();
  }, []);

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

  // Combined array of YouTube videos and static images
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
      }
    ] : [];

    const staticItems: GalleryItem[] = [
      {
        type: 'image' as const,
        url: "https://images.cood.ai/samgo/001.png",
        title: "Premium Folierung",
        category: "Folierung"
      },
      {
        type: 'image' as const,
        url: "https://images.cood.ai/samgo/002.png",
        title: "Mattfolierung",
        category: "Folierung"
      },
      {
        type: 'image' as const,
        url: "https://images.cood.ai/samgo/003.png",
        title: "Chromfolierung",
        category: "Folierung"
      },
      {
        type: 'image' as const,
        url: "https://images.cood.ai/samgo/004.png",
        title: "Designfolierung",
        category: "Folierung"
      },
      {
        type: 'image' as const,
        url: "https://images.cood.ai/samgo/005.png",
        title: "Vollfolierung",
        category: "Folierung"
      }
    ];

    // Return fallback videos + static images if no API videos, otherwise API videos + static images
    const allVideos = youtubeVideos.length > 0 ? youtubeItems : fallbackYoutubeItems;
    return [...allVideos, ...staticItems];
  }, [youtubeVideos]);

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
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
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
          alt={item.title}
          className="w-full h-auto rounded-lg"
        />
      </div>
    );
  };

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="h-12 w-12 text-accent-purple animate-spin" />
              <p className="mt-4 text-primary-silver">{t('gallery.loading')}</p>
              <p className="mt-2 text-primary-silver/60 text-sm">Loading videos from YouTube...</p>
            </div>
          ) : (
                         previews.map((item, index) => (
               <div 
                 key={index}
                 className="group relative cursor-pointer aspect-square"
                 onClick={() => {
                   setSelectedItem(item);
                   setCurrentIndex(index);
                 }}
               >
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-accent-purple/20 group-hover:border-accent-gold/30 transition-colors duration-300">
                  <img
                    src={item.type === 'youtube' ? item.thumbnail : item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                                   {item.type === 'youtube' && (
                   <>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                         <Play className="w-6 h-6 text-white" />
                       </div>
                     </div>
                     {/* NEW badge for recent videos */}
                     {item.publishedAt && isNewVideo(item.publishedAt) && (
                       <div className="absolute top-2 right-2">
                         <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                           NEW
                         </span>
                       </div>
                     )}
                   </>
                 )}
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                     <span className="inline-block px-2 py-1 bg-accent-purple/80 text-white text-xs rounded-full mb-1">
                       {item.category}
                     </span>
                     <h3 className="text-sm font-bold text-white">
                       {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { 
                         year: 'numeric', 
                         month: 'short', 
                         day: 'numeric'
                       }) : item.title}
                     </h3>
                   </div>
                 </div>
                </div>
              </div>
            ))
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
                <h3 className="text-xl font-bold text-white">{previews[currentIndex].title}</h3>
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