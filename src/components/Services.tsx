import React, { useState, useEffect } from 'react';
import { Car, Shield, Sparkles, Palette, Sun, Building, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getServices, Service as ServiceType } from '../services/dataService';
import { SERVICE_SLUGS } from '../data/serviceData';

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState<ServiceType[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServicesData(data);
      } catch (err) {
        console.error('Failed to load services:', err);
        setServicesData([]);
      }
    };
    loadServices();
  }, []);

  // Icon mapping
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'Car': <Car className="h-6 w-6" />,
      'Shield': <Shield className="h-6 w-6" />,
      'Sparkles': <Sparkles className="h-6 w-6" />,
      'Palette': <Palette className="h-6 w-6" />,
      'Sun': <Sun className="h-6 w-6" />,
      'Building': <Building className="h-6 w-6" />
    };
    return icons[iconName] || <Car className="h-6 w-6" />;
  };

  const services = servicesData.map(service => ({
    title: t(service.titleKey),
    description: t(service.descriptionKey),
    image: service.image,
    icon: getIcon(service.icon),
    category: t(service.categoryKey),
    details: {
      duration: t(service.durationKey),
      warranty: t(service.warrantyKey),
      description: t(service.fullDescriptionKey),
      features: t(service.featuresKey, { returnObjects: true }),
      process: t(service.processKey, { returnObjects: true })
    }
  }));

  // Fallback services if no data in localStorage
  const fallbackServices = [
    {
      title: t('services.carWrapping.title'),
      description: t('services.carWrapping.description'),
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80",
      icon: <Car className="h-6 w-6" />,
      category: t('services.carWrapping.category'),
      details: {
        duration: t('services.carWrapping.duration'),
        warranty: t('services.carWrapping.warranty'),
        description: t('services.carWrapping.fullDescription'),
        features: t('services.carWrapping.features', { returnObjects: true }),
        process: t('services.carWrapping.process', { returnObjects: true })
      }
    },
    {
      title: t('services.windowTinting.title'),
      description: t('services.windowTinting.description'),
      image: "https://images.cood.ai/samgo/car1.png",
      icon: <Sun className="h-6 w-6" />,
      category: t('services.windowTinting.category'),
      details: {
        duration: t('services.windowTinting.duration'),
        warranty: t('services.windowTinting.warranty'),
        description: t('services.windowTinting.fullDescription'),
        features: t('services.windowTinting.features', { returnObjects: true }),
        process: t('services.windowTinting.process', { returnObjects: true })
      }
    },
    {
      title: t('services.paintProtection.title'),
      description: t('services.paintProtection.description'),
      image: "https://images.cood.ai/samgo/004.png",
      icon: <Shield className="h-6 w-6" />,
      category: t('services.paintProtection.category'),
      details: {
        duration: t('services.paintProtection.duration'),
        warranty: t('services.paintProtection.warranty'),
        description: t('services.paintProtection.fullDescription'),
        features: t('services.paintProtection.features', { returnObjects: true }),
        process: t('services.paintProtection.process', { returnObjects: true })
      }
    },
    {
      title: t('services.designWrapping.title'),
      description: t('services.designWrapping.description'),
      image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80",
      icon: <Palette className="h-6 w-6" />,
      category: t('services.designWrapping.category'),
      details: {
        duration: t('services.designWrapping.duration'),
        warranty: t('services.designWrapping.warranty'),
        description: t('services.designWrapping.fullDescription'),
        features: t('services.designWrapping.features', { returnObjects: true }),
        process: t('services.designWrapping.process', { returnObjects: true })
      }
    },
    {
      title: t('services.chromeWrapping.title'),
      description: t('services.chromeWrapping.description'),
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80",
      icon: <Sparkles className="h-6 w-6" />,
      category: t('services.chromeWrapping.category'),
      details: {
        duration: t('services.chromeWrapping.duration'),
        warranty: t('services.chromeWrapping.warranty'),
        description: t('services.chromeWrapping.fullDescription'),
        features: t('services.chromeWrapping.features', { returnObjects: true }),
        process: t('services.chromeWrapping.process', { returnObjects: true })
      }
    },
    {
      title: t('services.commercialWrapping.title'),
      description: t('services.commercialWrapping.description'),
      image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80",
      icon: <Building className="h-6 w-6" />,
      category: t('services.commercialWrapping.category'),
      details: {
        duration: t('services.commercialWrapping.duration'),
        warranty: t('services.commercialWrapping.warranty'),
        description: t('services.commercialWrapping.fullDescription'),
        features: t('services.commercialWrapping.features', { returnObjects: true }),
        process: t('services.commercialWrapping.process', { returnObjects: true })
      }
    }
  ];

  // Use fallback services if fewer than 6 services are available (to ensure all services are shown)
  const displayServices = services.length >= 6 ? services : fallbackServices;

  // Navigate to service detail page
  const handleServiceClick = (index: number) => {
    const slug = SERVICE_SLUGS[index] || `service-${index}`;
    navigate(`/service/${slug}`);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-accent-purple mx-auto rounded-full" />
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
              onClick={() => handleServiceClick(index)}
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent-purple text-white text-sm rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-accent-purple/10 rounded-lg text-accent-purple">
                    {service.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-primary-dark">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="w-full py-2 bg-accent-purple/10 text-accent-purple font-semibold rounded-lg hover:bg-accent-purple hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                  {t('services.details')} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;