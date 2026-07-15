import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SERVICE_LINKS } from '../data/seoPages';

const Footer = () => {
  const { t } = useTranslation();
  const whatsappNumber = '+4915750000505';
  const message = t('footer.whatsappMessage');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/referenzen', label: t('seoPages.nav.referenzen') },
    { path: '/#about', label: t('nav.about') },
    { path: '/kontakt', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold text-primary-dark">FolienSam</span>
            </div>
            <p className="text-gray-600 mb-6">
              {t('seoPages.home.intro')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/foliensam/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://vm.tiktok.com/ZNew77xKv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white transition-colors duration-300 text-sm font-bold"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-dark mb-6">
              {t('footer.quickLinks.title')}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-accent-blue transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-dark mb-6">
              {t('footer.services.title')}
            </h3>
            <ul className="space-y-4">
              {SERVICE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-accent-blue transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-dark mb-6">
              {t('footer.contact.title')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+4915750000505"
                  className="flex items-center space-x-3 text-gray-600 hover:text-accent-blue transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 text-accent-blue" />
                  <span>+49 157 50000505</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@foliensam.de"
                  className="flex items-center space-x-3 text-gray-600 hover:text-accent-blue transition-colors duration-300"
                >
                  <Mail className="h-5 w-5 text-accent-blue" />
                  <span>info@foliensam.de</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Max-Steinke-Straße+36,+13086+Berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 text-gray-600 hover:text-accent-blue transition-colors duration-300"
                >
                  <MapPin className="h-5 w-5 text-accent-blue flex-shrink-0 mt-0.5" />
                  <span>Max-Steinke-Straße 36, 13086 Berlin</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline font-medium"
                >
                  WhatsApp
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
