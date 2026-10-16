import React from 'react';
import { Shield, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from './Breadcrumbs';
import CtaButtons from '../conversion/CtaButtons';
import TrustLine from '../conversion/TrustLine';
import { BreadcrumbItem } from '../../types/seoPage';
import { ReferencePhoto, photoSrc, photoSrcSet } from '../../data/conversion';

interface SeoPageHeroProps {
  h1: string;
  intro: string;
  breadcrumbs: BreadcrumbItem[];
  heroImage?: string;
  /** Service pages: conversion hero with CTAs and a real reference photo */
  conversion?: {
    whatsappText: string;
    photo: ReferencePhoto;
  };
}

const SeoPageHero: React.FC<SeoPageHeroProps> = ({ h1, intro, breadcrumbs, heroImage, conversion }) => {
  const { t } = useTranslation();
  const imageUrl = heroImage || 'https://images.cood.ai/samgo/car1.png';

  const trustStats = [
    { icon: Users, value: t('hero.stats.experience'), label: '' },
    { icon: Award, value: t('hero.stats.projects'), label: '' },
    { icon: Shield, value: t('hero.stats.warranty'), label: '' },
  ];

  const trustBar = (
    <div className="seo-page-trust-bar">
      {trustStats.map((stat, index) => (
        <div key={index} className="seo-page-trust-item">
          <stat.icon className="seo-page-trust-icon" />
          <span>{stat.value}</span>
        </div>
      ))}
    </div>
  );

  if (conversion) {
    const { photo } = conversion;
    return (
      <div className="seo-page-hero seo-page-hero--conversion">
        <div className="seo-page-hero-bg">
          <div className="seo-page-hero-overlay" />
          <div className="seo-page-hero-pattern" />
        </div>
        <div className="seo-page-container seo-page-hero-content seo-page-hero-grid">
          <div className="seo-page-hero-text">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="seo-page-h1">{h1}</h1>
            <div className="seo-page-h1-accent" />
            <p className="seo-page-intro">{intro}</p>
            <CtaButtons whatsappText={conversion.whatsappText} className="mt-5" />
            <TrustLine className="mt-4" />
          </div>
          <div className="seo-page-hero-photo">
            {/* LCP element: eager + high priority, explicit size against layout shift */}
            <img
              src={photoSrc(photo, 800)}
              srcSet={photoSrcSet(photo)}
              sizes="(min-width: 1024px) 40vw, 100vw"
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="eager"
              // React 18 only passes the lowercase attribute through to the DOM
              {...{ fetchpriority: 'high' }}
            />
          </div>
          <div className="seo-page-hero-badges">{trustBar}</div>
        </div>
      </div>
    );
  }

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
        {trustBar}
      </div>
    </div>
  );
};

export default SeoPageHero;
