import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { SERVICE_LINKS } from '../data/seoPages';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col seo-page">
      <SEO
        title="Seite nicht gefunden | FolienSam"
        description="Die angeforderte Seite wurde nicht gefunden."
        canonicalPath="/404"
        robots="noindex, nofollow"
      />
      <Navbar />
      <main className="flex-grow seo-not-found">
        <div className="seo-page-container">
          <h1 className="seo-not-found-title">{t('seoPages.notFound.title')}</h1>
          <div className="seo-page-h1-accent seo-not-found-accent" />
          <p className="seo-not-found-description">{t('seoPages.notFound.description')}</p>
          <div className="seo-not-found-links">
            <Link to="/" className="seo-cta-primary">
              {t('seoPages.notFound.home')}
            </Link>
            <Link to="/autofolierung-berlin" className="seo-content-cta">
              {t('seoPages.services.autofolierung')}
              <ArrowRight className="seo-content-cta-icon" />
            </Link>
          </div>
          <div className="seo-not-found-services">
            <h2 className="seo-content-h2">{t('footer.services.title')}</h2>
            <div className="seo-related-grid">
              {SERVICE_LINKS.map((link) => (
                <Link key={link.path} to={link.path} className="seo-related-card">
                  <span className="seo-related-label">{t(link.labelKey)}</span>
                  <ArrowRight className="seo-related-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
