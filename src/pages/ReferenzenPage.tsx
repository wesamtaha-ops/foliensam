import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import SeoPageHero from '../components/seo/SeoPageHero';
import { SEO_PAGES, SEO_HERO_IMAGES } from '../data/seoPages';

const ReferenzenPage: React.FC = () => {
  const page = SEO_PAGES.referenzen;

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
          heroImage={SEO_HERO_IMAGES.referenzen}
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
