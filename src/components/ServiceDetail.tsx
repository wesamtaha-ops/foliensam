import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Shield, Check, Phone, Mail, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import { SERVICE_DATA, ServiceDetailData } from '../data/serviceData';
import { getServices } from '../services/dataService';

interface ServiceWithImage extends ServiceDetailData {
  image: string;
}

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [service, setService] = useState<ServiceWithImage | null>(null);

  const whatsappNumber = "+4915750000505";
  const whatsappMessage = t('footer.whatsappMessage');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadService = async () => {
      const foundServiceData = SERVICE_DATA.find(s => s.slug === slug);
      if (!foundServiceData) {
        navigate('/');
        return;
      }

      // Try to get image from localStorage
      try {
        const storedServices = await getServices();
        const serviceIndex = SERVICE_DATA.findIndex(s => s.slug === slug);
        
        let imageUrl = foundServiceData.fallbackImage;
        if (storedServices[serviceIndex]?.image) {
          imageUrl = storedServices[serviceIndex].image;
        }

        setService({
          ...foundServiceData,
          image: imageUrl
        });
      } catch (err) {
        // If localStorage fails, use fallback image
        setService({
          ...foundServiceData,
          image: foundServiceData.fallbackImage
        });
      }
    };

    loadService();
  }, [slug, navigate]);

  if (!service) {
    return null;
  }

  const title = t(service.titleKey);
  const description = t(service.descriptionKey);
  const category = t(service.categoryKey);
  const duration = t(service.durationKey);
  const warranty = t(service.warrantyKey);
  const fullDescription = t(service.fullDescriptionKey);
  const features = t(service.featuresKey, { returnObjects: true }) as string[];
  const process = t(service.processKey, { returnObjects: true }) as string[];

  const handleContact = () => {
    navigate('/#contact');
  };

  const handleWhatsApp = () => {
    const message = `${whatsappMessage} - ${title}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${whatsappNumber}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${title} - FolienSam`}
        description={description}
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-screen overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={service.image}
              alt={title}
              className="w-full h-full object-cover object-center scale-110 animate-[zoom_20s_ease-in-out_infinite]"
            />
          </div>
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 space-y-6 md:space-y-8">
              {/* Back Button - Positioned Absolutely */}
              <button
                onClick={() => navigate('/#services')}
                className="absolute top-24 left-6 md:left-12 lg:left-16 group inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 z-10"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">{t('legal.backToHome')}</span>
              </button>

              {/* Title Section - Centered */}
              <div className="text-center space-y-4 md:space-y-6 animate-fade-in">
                {/* Category Badge */}
                <div className="flex justify-center">
                  <span className="inline-block px-5 py-2 bg-accent-red text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                    {category}
                  </span>
                </div>
                
                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
                  <span className="inline-block animate-slide-up" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}>
                    {title}
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                  <span className="inline-block animate-slide-up" style={{ animationDelay: '0.1s', textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}>
                    {description}
                  </span>
                </p>

                {/* Quick Info Pills */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-base font-medium text-white">{duration}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Shield className="w-5 h-5 text-white" />
                    <span className="text-base font-medium text-white">{warranty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-dark mb-6">
                  {t('services.details')}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {fullDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-primary-dark mb-6">
                  {t('services.features')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Check className="h-6 w-6 text-accent-purple flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-2xl font-bold text-primary-dark mb-6">
                  {t('services.process')}
                </h3>
                <div className="space-y-4">
                  {process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-accent-purple/5 to-transparent rounded-xl border-l-4 border-accent-purple">
                      <div className="w-10 h-10 bg-accent-purple rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-2">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <div className="bg-gradient-to-br from-primary-dark to-gray-900 text-white rounded-2xl p-8 shadow-xl border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4">
                    {t('services.inquireNow')}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {t('contact.writeUs')}
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </button>
                    
                    <button
                      onClick={handleCall}
                      className="w-full bg-white/5 backdrop-blur text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-3 border border-white/10"
                    >
                      <Phone className="h-5 w-5" />
                      {whatsappNumber}
                    </button>
                    
                    <button
                      onClick={handleContact}
                      className="w-full bg-white/5 backdrop-blur text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-3 border border-white/10"
                    >
                      <Mail className="h-5 w-5" />
                      {t('contact.form.send')}
                    </button>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-primary-dark mb-4">
                    {t('features.premiumMaterials.title')}
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent-purple" />
                      {t('features.premiumMaterials.description')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent-purple" />
                      {t('features.perfectProcessing.description')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent-purple" />
                      {t('features.fastExecution.description')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
