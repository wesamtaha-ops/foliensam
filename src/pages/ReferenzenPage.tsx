import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import SeoPageHero from '../components/seo/SeoPageHero';
import { SEO_PAGES } from '../data/seoPages';
import { useLocalizedSeoPage } from '../hooks/useLocalizedSeoPage';
import { getSeoPageById } from '../services/seoPageService';
import { SeoPageConfig } from '../types/seoPage';

const ReferenzenPage: React.FC = () => {
  const [page, setPage] = useState<SeoPageConfig>(SEO_PAGES.referenzen);
  const localizedPage = useLocalizedSeoPage(page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getSeoPageById('referenzen')
      .then((data) => {
        if (data) {
          setPage(data);
        }
      })
      .catch((err) => console.error('Failed to load referenzen page:', err));
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
        <section id="gallery" aria-label="Galerie">
          <Gallery />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ReferenzenPage;
