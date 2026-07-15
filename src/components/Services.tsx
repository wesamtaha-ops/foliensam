import React from 'react';
import { Car, Shield, Sparkles, Sun, Building, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HOMEPAGE_SERVICES } from '../data/homepageServices';

const Services = () => {
  const { t } = useTranslation();

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Car: <Car className="h-6 w-6" />,
      Shield: <Shield className="h-6 w-6" />,
      Sparkles: <Sparkles className="h-6 w-6" />,
      Sun: <Sun className="h-6 w-6" />,
      Building: <Building className="h-6 w-6" />,
    };
    return icons[iconName] || <Car className="h-6 w-6" />;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {t('seoPages.home.servicesTitle')}
          </h2>
          <div className="w-24 h-1 bg-accent-purple mx-auto rounded-full" />
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {HOMEPAGE_SERVICES.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={service.image}
                  alt={t(service.labelKey)}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent-purple text-white text-sm rounded-full">
                    {t(service.categoryKey)}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-accent-purple/10 rounded-lg text-accent-purple">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-primary-dark">
                    {t(service.labelKey)}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{t(service.descriptionKey)}</p>
                <span className="services-card-cta">
                  {t('seoPages.home.moreLink')} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
