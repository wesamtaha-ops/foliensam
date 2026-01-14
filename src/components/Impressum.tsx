import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Impressum: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('legal.backToHome')}
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-accent-blue/10 rounded-xl">
                <FileText className="w-8 h-8 text-accent-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">
                {t('impressum.title')}
              </h1>
            </div>

            <p className="text-gray-600 mb-8">
              {t('impressum.legalRequirement')}
            </p>

            {/* Company Information */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('impressum.companyInfo.title')}
                </h2>
              </div>
              <div className="pl-9 space-y-2 text-gray-700">
                <p className="font-semibold text-lg">FolienSam</p>
                <p>{t('impressum.companyInfo.type')}</p>
              </div>
            </section>

            {/* Owner / Representative */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('impressum.representative.title')}
                </h2>
              </div>
              <div className="pl-9 space-y-2 text-gray-700">
                <p>Sam (Inhaber / Owner)</p>
              </div>
            </section>

            {/* Address */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('impressum.address.title')}
                </h2>
              </div>
              <div className="pl-9 space-y-1 text-gray-700">
                <p>Max-Steinke-Straße 36</p>
                <p>13086 Berlin</p>
                <p>Deutschland / Germany</p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('impressum.contact.title')}
                </h2>
              </div>
              <div className="pl-9 space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href="tel:+4915750000505" className="hover:text-accent-blue transition-colors">
                    +49 157 50000505
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href="mailto:info@foliensam.de" className="hover:text-accent-blue transition-colors">
                    info@foliensam.de
                  </a>
                </div>
              </div>
            </section>

            {/* VAT ID (if applicable) */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('impressum.vatId.title')}
                </h2>
              </div>
              <div className="pl-9 text-gray-700">
                <p>{t('impressum.vatId.pending')}</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">
                {t('impressum.disclaimer.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">{t('impressum.disclaimer.content.title')}</h3>
                  <p className="text-sm leading-relaxed">{t('impressum.disclaimer.content.text')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('impressum.disclaimer.links.title')}</h3>
                  <p className="text-sm leading-relaxed">{t('impressum.disclaimer.links.text')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('impressum.disclaimer.copyright.title')}</h3>
                  <p className="text-sm leading-relaxed">{t('impressum.disclaimer.copyright.text')}</p>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-4">
                {t('impressum.disputeResolution.title')}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t('impressum.disputeResolution.text')}
              </p>
              <p className="text-gray-700 text-sm mt-2">
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
