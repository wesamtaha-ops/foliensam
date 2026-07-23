import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import SeoPageHero from '../components/seo/SeoPageHero';
import { SEO_PAGES } from '../data/seoPages';
import { useLocalizedSeoPage } from '../hooks/useLocalizedSeoPage';
import { getSeoPageById } from '../services/seoPageService';
import { SeoPageConfig } from '../types/seoPage';

const KontaktPage: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<SeoPageConfig>(SEO_PAGES.kontakt);
  const localizedPage = useLocalizedSeoPage(page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getSeoPageById('kontakt')
      .then((data) => {
        if (data) {
          setPage(data);
        }
      })
      .catch((err) => console.error('Failed to load kontakt page:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col seo-page">
      <SEO
        title={localizedPage.meta.title}
        description={localizedPage.meta.description}
        canonicalPath={localizedPage.meta.canonicalPath}
      />
      <Navbar />
      <main className="flex-grow">
        <SeoPageHero
          h1={localizedPage.meta.h1}
          intro={localizedPage.intro}
          breadcrumbs={localizedPage.breadcrumbs}
          heroImage={localizedPage.heroImage}
        />
        <section id="contact" aria-label="Kontakt">
          <Contact />
        </section>
        <div className="seo-page-body-wrapper">
          <div className="seo-page-container seo-kontakt-directions">
            <div className="seo-content-section">
              <h2 className="seo-content-h2">{t('seoPages.kontakt.directions')}</h2>
              <div className="seo-page-h1-accent seo-section-accent" />
              <p className="seo-content-paragraph">
                {t('seoPages.kontakt.directionsText')}
              </p>
              <a
                href="https://maps.google.com/?q=Max-Steinke-Straße+36,+13086+Berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="seo-content-cta"
              >
                <MapPin className="seo-content-cta-icon" />
                {t('seoPages.kontakt.openMaps')}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default KontaktPage;
