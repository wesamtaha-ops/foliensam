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
          intro={page.intro}
          breadcrumbs={page.breadcrumbs}
          heroImage={heroImage}
        />

        <div className="seo-page-body-wrapper">
          <div className="seo-page-container seo-page-body">
            <div className="seo-page-content">
              <ContentRenderer sections={page.sections} />
              {page.faq && page.faq.length > 0 && (
                <FaqSection items={page.faq} title={t('seoPages.faqTitle')} />
              )}
              <SeoRelatedServices currentPath={page.path} />
              {children}
            </div>

            {showSidebar && <SeoCtaSidebar />}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SeoPageLayout;
