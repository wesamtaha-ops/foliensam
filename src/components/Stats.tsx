import React from 'react';
import { Users, Clock, Trophy, ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <Users />, number: "1200+", label: t('stats.customers') },
    { icon: <Clock />, number: "48h", label: t('stats.processingTime') },
    { icon: <Trophy />, number: "15+", label: t('stats.experience') },
    { icon: <ThumbsUp />, number: "99%", label: t('stats.satisfaction') }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-accent-blue/10 to-accent-red/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-accent-blue">
                  {React.cloneElement(stat.icon, { className: 'w-8 h-8' })}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-dark mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;