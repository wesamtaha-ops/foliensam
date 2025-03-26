import React from 'react';
import { Shield, Award, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-accent-purple to-accent-gold rounded-3xl opacity-50 blur-2xl group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative">
              <div className="aspect-[16/13] rounded-3xl overflow-hidden">
                <img
                  src="https://images.cood.ai/hero.gif"
                  alt={t('about.imageAlt')}
                  className="object-cover w-full h-full transform  transition-transform duration-700"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent-purple/10 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-accent-purple" />
                <span className="text-accent-purple font-medium">{t('about.qualityBadge')}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                {t('about.title')}
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-purple to-accent-gold rounded-full" />
            </div>
            
           
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Users className="h-6 w-6" />, label: t('about.stats.experience'), value: '12+ Jahre' },
                { icon: <Shield className="h-6 w-6" />, label: t('about.stats.warranty'), value: '5 Jahre' },
                { icon: <Award className="h-6 w-6" />, label: t('about.stats.projects'), value: '900+' },
                { icon: <Clock className="h-6 w-6" />, label: t('about.stats.expertise'), value: '100%' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-accent-purple mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-gold bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
                
              ))}
            </div>
          </div>
      
        </div>
         <h3 className="text-xl mt-14 font-light  text-gray-900">
                {t('about.description')}
              </h3>
      </div>
    </div>
  );
};

export default About;