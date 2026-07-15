import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { SERVICE_LINKS } from '../data/seoPages';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const whatsappNumber = '+4915750000505';
  const message = 'Hallo! Ich möchte einen Termin vereinbaren.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const isHomePage = location.pathname === '/';
  const isSubPage = !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && isHomePage) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash, isHomePage]);

  const handleLogoClick = () => {
    if (isSubPage) {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (isSubPage) {
      navigate(`/#${sectionId}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      window.history.pushState(null, '', `/#${sectionId}`);
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: t('nav.home'), id: 'home' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.gallery'), id: 'gallery' },
  ];

  const navBackground = isSubPage
    ? 'bg-black/95 backdrop-blur-lg py-4'
    : isScrolled
      ? 'bg-primary-dark/95 backdrop-blur-lg py-4'
      : 'bg-transparent py-6';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <img
              src="https://images.cood.ai/samgo/new-logo-white.png"
              alt="FolienSam Logo"
              className="h-10"
            />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {menuItems.slice(0, 1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium flex items-center gap-1"
                onClick={() => isSubPage ? navigate('/autofolierung-berlin') : scrollToSection('services')}
              >
                {t('nav.services')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-primary-dark/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 py-2">
                    {SERVICE_LINKS.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-white/90 hover:text-accent-gold hover:bg-white/5 transition-colors"
                      >
                        {t(link.labelKey)}
                      </Link>
                    ))}
                    <Link
                      to="/ratgeber/auto-folieren-kosten"
                      className="block px-4 py-2 text-white/70 hover:text-accent-gold hover:bg-white/5 transition-colors border-t border-white/10 mt-1"
                    >
                      {t('seoPages.nav.ratgeber')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {menuItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}

            <Link
              to="/kontakt"
              className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium"
            >
              {t('seoPages.nav.kontakt')}
            </Link>

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
              aria-label={isMobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full backdrop-blur-lg py-4 ${
            isSubPage ? 'bg-black/95' : 'bg-primary-dark/95'
          }`}>
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
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/60 text-sm mb-2">{t('nav.services')}</p>
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white/90 hover:text-accent-gold py-2"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>
              <Link
                to="/kontakt"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-accent-gold transition-colors duration-300 font-medium"
              >
                {t('seoPages.nav.kontakt')}
              </Link>
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
