import React from 'react';
import { Shield, Star, Clock, Award, Wrench, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: t('features.premiumMaterials.title'),
      description: t('features.premiumMaterials.description'),
      gradient: 'from-blue-500/40 to-purple-500/40'
    },
    {
      icon: <Star className="h-12 w-12" />,
      title: t('features.perfectProcessing.title'),
      description: t('features.perfectProcessing.description'),
      gradient: 'from-purple-500/40 to-pink-500/40'
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: t('features.fastExecution.title'),
      description: t('features.fastExecution.description'),
      gradient: 'from-pink-500/40 to-red-500/40'
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: t('features.warranty.title'),
      description: t('features.warranty.description'),
      gradient: 'from-red-500/40 to-orange-500/40'
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: t('features.modernTechnology.title'),
      description: t('features.modernTechnology.description'),
      gradient: 'from-orange-500/40 to-yellow-500/40'
    },
    {
      icon: <Sparkles className="h-12 w-12" />,
      title: t('features.consultation.title'),
      description: t('features.consultation.description'),
      gradient: 'from-yellow-500/40 to-green-500/40'
    }
  ];

  return (
    <div className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-80" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('features.title')}
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-accent-purple/60 via-accent-gold/60 to-accent-red/60 mx-auto rounded-full" />
          <p className="mt-8 text-xl text-gray-300/90 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-30 group-hover:opacity-40 blur-sm transition duration-500`} />
              
              <div className="relative flex flex-col h-full bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 group-hover:-translate-y-1">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-5 w-fit mb-6`}>
                  <div className="text-white/90 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white/90 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300/90 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400/90 group-hover:text-gray-300/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-purple/90 to-accent-gold/90 rounded-full text-white font-semibold hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
          >
            {t('features.bookAppointment')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;