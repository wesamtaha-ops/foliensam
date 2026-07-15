import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone, Mail, Check } from 'lucide-react';

const SeoCtaSidebar: React.FC = () => {
  const { t } = useTranslation();
  const whatsappNumber = '+4915750000505';

  const benefits = [
    t('features.premiumMaterials.description'),
    t('features.warranty.description'),
    t('features.consultation.description'),
  ];

  return (
    <aside className="seo-page-sidebar">
      <div className="seo-cta-card">
        <h2 className="seo-cta-title">{t('seoPages.cta.title')}</h2>
        <p className="seo-cta-text">{t('seoPages.cta.description')}</p>
        <div className="seo-cta-actions">
          <Link to="/kontakt" className="seo-cta-primary">
            {t('seoPages.cta.requestQuote')}
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('footer.whatsappMessage'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="seo-cta-whatsapp"
          >
            <MessageCircle className="seo-cta-icon" />
            WhatsApp
          </a>
          <a href={`tel:${whatsappNumber}`} className="seo-cta-phone">
            <Phone className="seo-cta-icon" />
            +49 157 50000505
          </a>
          <Link to="/kontakt" className="seo-cta-phone">
            <Mail className="seo-cta-icon" />
            {t('seoPages.cta.email')}
          </Link>
        </div>
      </div>

      <div className="seo-cta-benefits">
        <h3 className="seo-cta-benefits-title">{t('features.title')}</h3>
        <ul className="seo-cta-benefits-list">
          {benefits.map((benefit, index) => (
            <li key={index} className="seo-cta-benefit-item">
              <Check className="seo-cta-benefit-icon" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SeoCtaSidebar;
