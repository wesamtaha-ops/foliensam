import React from 'react';
import { Shield, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbItem } from '../../types/seoPage';

interface SeoPageHeroProps {
  h1: string;
  intro: string;
  breadcrumbs: BreadcrumbItem[];
  heroImage?: string;
}

const SeoPageHero: React.FC<SeoPageHeroProps> = ({ h1, intro, breadcrumbs, heroImage }) => {
  const { t } = useTranslation();
  const imageUrl = heroImage || 'https://images.cood.ai/samgo/car1.png';

  const trustStats = [
    { icon: Users, value: t('hero.stats.experience'), label: '' },
    { icon: Award, value: t('hero.stats.projects'), label: '' },
    { icon: Shield, value: t('hero.stats.warranty'), label: '' },
  ];

  return (
    <div className="seo-page-hero">
      <div className="seo-page-hero-bg">
        <img src={imageUrl} alt="" className="seo-page-hero-image" />
        <div className="seo-page-hero-overlay" />
        <div className="seo-page-hero-pattern" />
      </div>
      <div className="seo-page-container seo-page-hero-content">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="seo-page-h1">{h1}</h1>
        <div className="seo-page-h1-accent" />
        <p className="seo-page-intro">{intro}</p>
        <div className="seo-page-trust-bar">
          {trustStats.map((stat, index) => (
            <div key={index} className="seo-page-trust-item">
              <stat.icon className="seo-page-trust-icon" />
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoPageHero;
