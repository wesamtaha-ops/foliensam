import React from 'react';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const whatsappNumber = "+4915750000505";
  const message = t('footer.whatsappMessage');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const quickLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const services = [
    t('footer.services.items.0'),
    t('footer.services.items.1'),
    t('footer.services.items.2'),
    t('footer.services.items.3'),
    t('footer.services.items.4')
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-8 w-8 text-accent-blue" />
              <span className="text-2xl font-bold text-primary-dark">SAM</span>
            </div>
            <p className="text-gray-600 mb-6">
              {t('footer.brandDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary-dark mb-6">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-gray-600 hover:text-accent-blue transition-colors duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-primary-dark mb-6">{t('footer.services.title')}</h3>
            <ul className="space-y-4">
              {services.map((item, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-600 hover:text-accent-blue transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-primary-dark mb-6">{t('footer.contact.title')}</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+4915750000505" className="flex items-center space-x-3 text-gray-600 hover:text-accent-blue transition-colors duration-300">
                  <Phone className="h-5 w-5 text-accent-blue" />
                  <span>+4915750000505</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@foliensam.de" className="flex items-center space-x-3 text-gray-600 hover:text-accent-blue transition-colors duration-300">
                  <Mail className="h-5 w-5 text-accent-blue" />
                  <span>info@foliensam.de</span>
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Musterstraße+123,+12345+Stadt" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-600 hover:text-accent-blue transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-accent-blue" />
                  <span>Max-Steinke-Straße 36
13086 Berlin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/impressum" 
                className="text-gray-600 hover:text-accent-blue transition-colors duration-300"
              >
                {t('footer.legal.impressum')}
              </Link>
              <Link 
                to="/datenschutz" 
                className="text-gray-600 hover:text-accent-blue transition-colors duration-300"
              >
                {t('footer.legal.datenschutz')}
              </Link>
            </div>
          <div className="text-center text-gray-600">
            © {new Date().getFullYear()} {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;