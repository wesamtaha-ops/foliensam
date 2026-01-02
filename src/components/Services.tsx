import React, { useState, useEffect } from 'react';
import { Car, Shield, Sparkles, Palette, Sun, Building, X, Clock, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getServices, Service as ServiceType } from '../services/dataService';

const Services = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<any>(null);
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
              onClick={() => setSelectedService(service)}
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

        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <div className="aspect-video relative">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <span className="inline-block px-3 py-1 bg-accent-purple text-white text-sm rounded-full mb-2">
                      {selectedService.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-accent-purple" />
                      <div>
                        <p className="text-sm text-gray-600">{t('services.duration')}</p>
                        <p className="font-semibold">{selectedService.details.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <Shield className="h-5 w-5 text-accent-purple" />
                      <div>
                        <p className="text-sm text-gray-600">{t('services.warranty')}</p>
                        <p className="font-semibold">{selectedService.details.warranty}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {selectedService.details.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">{t('services.features')}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.details.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-accent-purple" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">{t('services.process')}</h4>
                    <div className="space-y-3">
                      {selectedService.details.process.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <div className="w-6 h-6 bg-accent-purple/10 rounded-full flex items-center justify-center text-accent-purple font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-gray-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="#contact"
                      onClick={() => setSelectedService(null)}
                      className="w-full bg-accent-purple text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-accent-purple/90 transition-colors duration-300"
                    >
                      {t('services.inquireNow')} <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;