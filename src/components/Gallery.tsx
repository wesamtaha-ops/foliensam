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
  const [error, setError] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | null>(null);

  // Helper function to check if a video is new (published within last 7 days)
  const isNewVideo = (publishedAt: string) => {
    const videoDate = new Date(publishedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return videoDate > weekAgo;
  };

  // Touch event handlers for mobile swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    setIsSwiping(false);
    setSwipeDirection(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
    
    if (touchStart) {
      const distance = touchStart - e.targetTouches[0].clientY;
      if (Math.abs(distance) > 20) {
        setIsSwiping(true);
        setSwipeDirection(distance > 0 ? 'up' : 'down');
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50; // Minimum swipe distance
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      handleNext(); // Swipe up = next video
    } else if (isDownSwipe) {
      handlePrevious(); // Swipe down = previous video
    }
    
    // Reset states
    setIsSwiping(false);
    setSwipeDirection(null);
  };

  // Fetch YouTube videos on component mount
  useEffect(() => {
    const loadYouTubeVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching YouTube shorts...');
        const videos = await fetchAllChannelShorts(); // Fetch all available shorts
        console.log(`Loaded ${videos.length} videos:`, videos);
        setYoutubeVideos(videos);
      } catch (err) {
        console.error('Failed to load YouTube videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
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

    // Return YouTube videos first (newest to oldest), then static images
    return [...youtubeItems, ...staticItems];
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
        <div className="relative w-full h-full flex justify-center">
          {/* Mobile: Full screen video, Desktop: Vertical container */}
          <div className="relative w-full h-full md:max-w-sm md:h-[80vh] bg-black rounded-lg overflow-hidden">
            <iframe
              key={item.videoId} // Unique key to prevent re-rendering issues
              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&loop=1&playlist=${item.videoId}&mute=0&enablejsapi=1&origin=${window.location.origin}`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`YouTube video: ${item.title}`}
              frameBorder="0"
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
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-400">
              <p>{error}</p>
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
          <div 
            className="fixed inset-0 z-50 bg-black flex flex-col md:items-center md:justify-center md:p-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Mobile: Full screen, Desktop: Centered modal */}
            <div className="md:hidden w-full h-full flex flex-col">
              {/* Mobile header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <button
                  className="text-white hover:text-accent-purple transition-colors"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                
                {/* Video counter for mobile */}
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {currentIndex + 1} / {previews.length}
                  </span>
                </div>
                
                <div className="w-6"></div> {/* Spacer for centering */}
              </div>
              
                          {/* Mobile video container */}
            <div className="flex-1 flex items-center justify-center px-4 relative">
              {renderMedia(previews[currentIndex])}
              
              {/* Swipe feedback overlay */}
              {isSwiping && (
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                  swipeDirection === 'up' ? 'bg-green-500/20' : 'bg-blue-500/20'
                }`}>
                  <div className="text-white text-2xl font-bold">
                    {swipeDirection === 'up' ? '⬆️ Next' : '⬇️ Previous'}
                  </div>
                </div>
              )}
            </div>
              
              {/* Mobile progress bar */}
              <div className="px-4 pb-4">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-purple rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / previews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Mobile swipe hints */}
              <div className="text-center text-white/60 text-sm pb-8">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⬇️</span>
                    <span>Swipe down for previous</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Swipe up for next</span>
                    <span className="text-lg">⬆️</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop modal */}
            <div className="hidden md:block relative w-full max-w-4xl">
              <button
                className="absolute top-4 right-4 text-white hover:text-accent-purple transition-colors z-10"
                onClick={() => setSelectedItem(null)}
              >
                <X className="w-8 h-8" />
              </button>
              
              {/* Video counter indicator for desktop */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full z-10">
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1} / {previews.length}
                </span>
              </div>
              
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-purple transition-colors z-10"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-purple transition-colors z-10"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div className="w-full">
                {renderMedia(previews[currentIndex])}
                {/* Only show additional info for images, videos have overlay */}
                {previews[currentIndex].type === 'image' && (
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-white">{previews[currentIndex].title}</h3>
                    <p className="text-primary-silver">{previews[currentIndex].category}</p>
                  </div>
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