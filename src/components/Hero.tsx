import React, { useState } from 'react';
import { Car, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video/GIF */}
      <div className="absolute inset-0">
        <img
          src="https://images.cood.ai/cards.gif"
          alt="Car Wrapping Process"
          className="absolute w-full h-full object-cover"
          style={{ objectPosition: 'center 75%' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/90 to-primary-dark/85" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Circuit Lines */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,100 Q200,150 400,100 T800,100"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            className="animate-draw-line"
          />
          <path
            d="M800,200 Q600,250 400,200 T0,200"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            className="animate-draw-line animation-delay-1000"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 0, 0, 0.2)" />
              <stop offset="50%" stopColor="rgba(102, 0, 0, 0.2)" />
              <stop offset="100%" stopColor="rgba(139, 0, 0, 0.2)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32">
            <svg className="animate-float" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(139, 0, 0, 0.2)" strokeWidth="2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(102, 0, 0, 0.2)" strokeWidth="2" className="animate-pulse" />
            </svg>
          </div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24">
            <svg className="animate-float animation-delay-1000" viewBox="0 0 100 100">
              <polygon points="50,10 90,90 10,90" fill="none" stroke="rgba(139, 0, 0, 0.2)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
                <Car className="h-5 w-5 text-white" />
                <span className="text-white text-sm md:text-base">{t('hero.tagline')}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold animate-gradient">
                    {t('hero.title.premium')}
                  </span>
                  <span className="block">{t('hero.title.vehicle')}</span>
                  <span className="block">{t('hero.title.refinement')}</span>
                </h1>

                <p className="text-lg md:text-xl text-primary-silver max-w-2xl">
                  {t('hero.description')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="group relative px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold overflow-hidden flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-gold transition-transform duration-300 group-hover:scale-105 rounded-full" />
                  <Play className="relative w-5 h-5 text-white" />
                  <span className="relative text-white">{t('hero.watchShowreel')}</span>
                </button>
                <a 
                  href="#contact"
                  className="group relative px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold overflow-hidden"
                >
                  <div className="absolute inset-0 border-2 border-accent-cream/30 rounded-full transition-transform duration-300 group-hover:scale-105" />
                  <span className="relative text-white group-hover:text-accent-gold transition-colors duration-300">
                    {t('nav.contact')}
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column - Video Circle */}
            <div className="relative flex items-center justify-center">
              <div className="group cursor-pointer" onClick={() => setShowVideo(true)}>
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-gold opacity-20 blur-xl animate-pulse" />
                
                {/* Inner circle with gradient */}
                <div className="relative w-96 h-96 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.cood.ai/cards.gif"
                    alt="Car Wrapping Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div className="w-full max-w-4xl mx-4" onClick={e => e.stopPropagation()}>
            <div className="relative pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/udbvm6bulGU?autoplay=1"
                className="absolute inset-0 w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 3s ease-out forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s linear infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Hero;