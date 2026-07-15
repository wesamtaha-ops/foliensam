import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import SeoPageHero from '../components/seo/SeoPageHero';
import { SEO_PAGES, SEO_HERO_IMAGES } from '../data/seoPages';
import { useLocalizedSeoPage } from '../hooks/useLocalizedSeoPage';

const KontaktPage: React.FC = () => {
  const { t } = useTranslation();
  const page = useLocalizedSeoPage(SEO_PAGES.kontakt);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col seo-page">
      <SEO
        title={page.meta.title}
        description={page.meta.description}
        canonicalPath={page.meta.canonicalPath}
      />
      <Navbar />
      <main className="flex-grow">
        <SeoPageHero
          h1={page.meta.h1}
          intro={page.intro}
          breadcrumbs={page.breadcrumbs}
          heroImage={SEO_HERO_IMAGES.kontakt}
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
