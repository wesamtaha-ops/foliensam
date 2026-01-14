import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Cookie, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Datenschutz: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Eye,
      titleKey: 'datenschutz.sections.overview.title',
      contentKey: 'datenschutz.sections.overview.content'
    },
    {
      icon: Database,
      titleKey: 'datenschutz.sections.dataCollection.title',
      contentKey: 'datenschutz.sections.dataCollection.content'
    },
    {
      icon: Lock,
      titleKey: 'datenschutz.sections.dataUsage.title',
      contentKey: 'datenschutz.sections.dataUsage.content'
    },
    {
      icon: Cookie,
      titleKey: 'datenschutz.sections.cookies.title',
      contentKey: 'datenschutz.sections.cookies.content'
    },
    {
      icon: UserCheck,
      titleKey: 'datenschutz.sections.rights.title',
      contentKey: 'datenschutz.sections.rights.content'
    }
  ];

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
                <Shield className="w-8 h-8 text-accent-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">
                {t('datenschutz.title')}
              </h1>
            </div>

            <p className="text-gray-600 mb-8">
              {t('datenschutz.intro')}
            </p>

            {/* Responsible Party */}
            <section className="mb-10 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">
                {t('datenschutz.responsible.title')}
              </h2>
              <div className="space-y-1 text-gray-700">
                <p className="font-semibold">FolienSam</p>
                <p>Max-Steinke-Straße 36</p>
                <p>13086 Berlin, Deutschland</p>
                <div className="flex items-center gap-2 mt-3">
                  <Mail className="w-4 h-4 text-accent-blue" />
                  <a href="mailto:info@foliensam.de" className="text-accent-blue hover:underline">
                    info@foliensam.de
                  </a>
                </div>
              </div>
            </section>

            {/* Main Sections */}
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <section key={index} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-accent-blue" />
                    <h2 className="text-xl font-semibold text-primary-dark">
                      {t(section.titleKey)}
                    </h2>
                  </div>
                  <div className="pl-9 text-gray-700 space-y-3">
                    {(t(section.contentKey, { returnObjects: true }) as string[]).map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-sm leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Contact Form Data */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('datenschutz.sections.contactForm.title')}
                </h2>
              </div>
              <div className="pl-9 text-gray-700 space-y-3">
                {(t('datenschutz.sections.contactForm.content', { returnObjects: true }) as string[]).map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Third Party Services */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">
                {t('datenschutz.sections.thirdParty.title')}
              </h2>
              
              {/* YouTube */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">YouTube</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t('datenschutz.sections.thirdParty.youtube')}
                </p>
              </div>

              {/* Google Maps */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Google Maps</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t('datenschutz.sections.thirdParty.googleMaps')}
                </p>
              </div>

              {/* WhatsApp */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t('datenschutz.sections.thirdParty.whatsapp')}
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-accent-blue" />
                <h2 className="text-xl font-semibold text-primary-dark">
                  {t('datenschutz.sections.security.title')}
                </h2>
              </div>
              <p className="pl-9 text-gray-700 text-sm leading-relaxed">
                {t('datenschutz.sections.security.content')}
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">
                {t('datenschutz.sections.changes.title')}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t('datenschutz.sections.changes.content')}
              </p>
            </section>

            {/* Last Updated */}
            <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
              {t('datenschutz.lastUpdated')}: Januar 2026
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
