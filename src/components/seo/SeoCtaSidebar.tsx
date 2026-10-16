import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone, Mail, Check } from 'lucide-react';
import ContactForm from '../ContactForm';
import {
  buildWhatsAppUrl,
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from '../../data/conversion';

interface SeoCtaSidebarProps {
  /** Preselects "Leistung" in the embedded form */
  service?: string;
  whatsappText?: string;
}

const SeoCtaSidebar: React.FC<SeoCtaSidebarProps> = ({ service, whatsappText }) => {
  const { t } = useTranslation();

  const benefits = [
    t('features.premiumMaterials.description'),
    t('features.warranty.description'),
    t('features.consultation.description'),
  ];

  return (
    <aside className="seo-page-sidebar" id="angebot">
      <div className="seo-cta-card seo-cta-card--form">
        <h2 className="seo-cta-title">{t('seoPages.cta.title')}</h2>
        <p className="seo-cta-text">{t('seoPages.cta.description')}</p>

        <ContactForm service={service} variant="dark" />

        <p className="seo-cta-divider">Oder direkt:</p>
        <div className="seo-cta-actions">
          <a
            href={buildWhatsAppUrl(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="seo-cta-whatsapp"
          >
            <MessageCircle className="seo-cta-icon" />
            WhatsApp
          </a>
          <a href={PHONE_HREF} className="seo-cta-phone">
            <Phone className="seo-cta-icon" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="seo-cta-phone">
            <Mail className="seo-cta-icon" />
            {t('seoPages.cta.email')}
          </a>
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
