import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { SERVICE_LINKS } from '../../data/seoPages';

interface SeoRelatedServicesProps {
  currentPath: string;
}

const SeoRelatedServices: React.FC<SeoRelatedServicesProps> = ({ currentPath }) => {
  const { t } = useTranslation();
  const related = SERVICE_LINKS.filter((link) => link.path !== currentPath).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="seo-related-section">
      <h2 className="seo-content-h2">{t('seoPages.related.title')}</h2>
      <div className="seo-page-h1-accent seo-related-accent" />
      <div className="seo-related-grid">
        {related.map((link) => (
          <Link key={link.path} to={link.path} className="seo-related-card">
            <span className="seo-related-label">{t(link.labelKey)}</span>
            <ArrowRight className="seo-related-arrow" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SeoRelatedServices;
