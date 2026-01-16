import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappNumber = "+4915750000505";
  const message = "Hallo! Ich möchte einen Termin vereinbaren.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL with hash
      window.history.pushState(null, '', `/#${sectionId}`);
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: t('nav.home'), id: 'home' },
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.gallery'), id: 'gallery' },
    { label: t('nav.contact'), id: 'contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary-dark/95 backdrop-blur-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={handleLogoClick}
          >
            <img 
              src="https://images.cood.ai/samgo/new-logo-white.png" 
              alt="FolienSam Logo" 
              className="h-10  "
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
            <LanguageSelector />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-blue to-accent-red px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              {t('nav.bookAppointment')}
            </a>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-primary-dark/95 backdrop-blur-lg py-4">
            <div className="flex flex-col space-y-4 px-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-accent-blue to-accent-red px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 text-center"
              >
                {t('nav.bookAppointment')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;