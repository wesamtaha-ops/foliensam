import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shuffled array of content
  const previews = React.useMemo(() => {
    const items = [
      {
        type: 'youtube',
        videoId: '-fNTp5sPt7Q',
        thumbnail: `https://i3.ytimg.com/vi/-fNTp5sPt7Q/maxresdefault.jpg`,
        title: "Dodge Charger",
        category: "Folierung"
      },
      {
        type: 'youtube',
        videoId: 'as5lyJ-4jPk',
        thumbnail: `https://i3.ytimg.com/vi/as5lyJ-4jPk/maxresdefault.jpg`,
        title: "Range Rover",
        category: "Folierung"
      },
      {
        type: 'youtube',
        videoId: 'FXPXQpANCPg',
        thumbnail: `https://i3.ytimg.com/vi/FXPXQpANCPg/maxresdefault.jpg`,
        title: "Audi",
        category: "Folierung"
      },
     
      {
        type: 'image',
        url: "https://images.cood.ai/samgo/001.png",
        title: "Premium Folierung",
        category: "Folierung"
      },
      {
        type: 'image',
        url: "https://images.cood.ai/samgo/002.png",
        title: "Mattfolierung",
        category: "Folierung"
      },
      {
        type: 'image',
        url: "https://images.cood.ai/samgo/003.png",
        title: "Chromfolierung",
        category: "Folierung"
      },
      {
        type: 'image',
        url: "https://images.cood.ai/samgo/004.png",
        title: "Designfolierung",
        category: "Folierung"
      },
      {
        type: 'image',
        url: "https://images.cood.ai/samgo/005.png",
        title: "Vollfolierung",
        category: "Folierung"
      }
    ];

    // Fisher-Yates shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : previews.length - 1));
  }, [previews.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < previews.length - 1 ? prev + 1 : 0));
  }, [previews.length]);

  const handleKeyDown = useCallback((e) => {
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

  const renderMedia = (item) => {
    if (item.type === 'youtube') {
      return (
        <div className="relative pt-[56.25%] w-full">
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1`}
            className="absolute inset-0 w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-auto rounded-lg"
      />
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
          {previews.map((item, index) => (
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <span className="inline-block px-2 py-1 bg-accent-purple/80 text-white text-xs rounded-full mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-white hover:text-accent-purple transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-purple transition-colors"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-purple transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="w-full max-w-4xl">
              {renderMedia(previews[currentIndex])}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">{previews[currentIndex].title}</h3>
                <p className="text-primary-silver">{previews[currentIndex].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;