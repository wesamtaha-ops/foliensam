import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import WhatsAppButton from '../WhatsAppButton';
import SEO from '../SEO';
import SeoPageHero from './SeoPageHero';
import ContentRenderer, { FaqSection } from './ContentRenderer';
import SeoCtaSidebar from './SeoCtaSidebar';
import SeoRelatedServices from './SeoRelatedServices';
import StructuredData from './StructuredData';
import { SeoPageConfig } from '../../types/seoPage';
import { SEO_HERO_IMAGES } from '../../data/seoPages';
import ReferenceGallery from '../conversion/ReferenceGallery';
import { getServiceConversion, splitIntro } from '../../data/conversion';

interface SeoPageLayoutProps {
  page: SeoPageConfig;
  children?: React.ReactNode;
  showSidebar?: boolean;
}

const SeoPageLayout: React.FC<SeoPageLayoutProps> = ({
  page,
  children,
  showSidebar = true,
}) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [page.path, location.hash]);

  const heroImage = page.heroImage || SEO_HERO_IMAGES[page.id];
  const conversion = getServiceConversion(page.path);
  // Service pages: max. 2 sentences above the fold, the rest moves into the body (nothing removed)
  const [heroIntro, introRest] = conversion ? splitIntro(page.intro, 2) : [page.intro, ''];

  return (
    <div className="min-h-screen flex flex-col seo-page">
      <SEO
        title={page.meta.title}
        description={page.meta.description}
        canonicalPath={page.meta.canonicalPath}
      />
      <StructuredData page={page} faq={page.faq} />
      <Navbar />
      <main className="flex-grow seo-page-main">
        <SeoPageHero
          h1={page.meta.h1}
          intro={heroIntro}
          breadcrumbs={page.breadcrumbs}
          heroImage={heroImage}
          conversion={
            conversion
              ? { whatsappText: conversion.whatsappText, photo: conversion.heroPhoto }
              : undefined
          }
        />

        {conversion && <ReferenceGallery photos={conversion.gallery} />}

        <div className="seo-page-body-wrapper">
          <div className="seo-page-container seo-page-body">
            <div className="seo-page-content">
              {introRest && (
                <section className="seo-content-section mb-8">
                  <div className="seo-content-section-body">
                    <p className="seo-content-paragraph">{introRest}</p>
                  </div>
                </section>
              )}
              <ContentRenderer sections={page.sections} />
              {page.faq && page.faq.length > 0 && (
                <FaqSection items={page.faq} title={t('seoPages.faqTitle')} />
              )}
              <SeoRelatedServices currentPath={page.path} />
              {children}
            </div>

            {showSidebar && (
              <SeoCtaSidebar
                service={conversion?.service}
                whatsappText={conversion?.whatsappText}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SeoPageLayout;
