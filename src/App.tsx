import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Admin from './components/admin/Admin';
import SEO from './components/SEO';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import SeoLandingPage from './pages/SeoLandingPage';
import KontaktPage from './pages/KontaktPage';
import ReferenzenPage from './pages/ReferenzenPage';
import NotFoundPage from './pages/NotFoundPage';
import { HOME_SEO } from './data/seoPages';

const NAV_SECTIONS = ['home', 'services', 'about', 'gallery', 'contact', 'features'];

const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  vollfolierung: '/vollfolierung-berlin',
  scheibentoenung: '/scheibentoenung-berlin',
  lackschutz: '/lackschutzfolie-berlin',
  designfolierung: '/autofolierung-berlin#teilfolierung',
  chromfolierung: '/autofolierung-berlin#chromfolierung',
  firmenwerbung: '/fahrzeugbeschriftung-berlin',
};

function LegacyServiceRedirect() {
  const location = useLocation();
  const slug = location.pathname.split('/').pop() || '';
  const target = LEGACY_SERVICE_REDIRECTS[slug];

  if (!target) {
    return <Navigate to="/404" replace />;
  }

  return <Navigate to={target} replace />;
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && NAV_SECTIONS.includes(hash)) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <SEO
        title={HOME_SEO.title}
        description={HOME_SEO.description}
        canonicalPath={HOME_SEO.canonicalPath}
      />
      <header>
        <Navbar />
      </header>
      <main>
        <section id="home" aria-label="Startseite">
          <Hero />
        </section>
        <section id="about" aria-label="Über uns">
          <About />
        </section>
        <section id="services" aria-label="Unsere Leistungen">
          <Services />
        </section>
        <section id="gallery" aria-label="Galerie">
          <Gallery />
        </section>
        <section id="features" aria-label="Unsere Vorteile">
          <Features />
        </section>
        <section id="contact" aria-label="Kontakt">
          <Contact />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/autofolierung-berlin" element={<SeoLandingPage />} />
        <Route path="/vollfolierung-berlin" element={<SeoLandingPage />} />
        <Route path="/scheibentoenung-berlin" element={<SeoLandingPage />} />
        <Route path="/lackschutzfolie-berlin" element={<SeoLandingPage />} />
        <Route path="/fahrzeugbeschriftung-berlin" element={<SeoLandingPage />} />
        <Route path="/felgenfolierung-berlin" element={<SeoLandingPage />} />
        <Route path="/ratgeber/auto-folieren-kosten" element={<SeoLandingPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
        <Route path="/referenzen" element={<ReferenzenPage />} />

        <Route path="/service/:slug" element={<LegacyServiceRedirect />} />
        <Route path="/leistungen" element={<Navigate to="/autofolierung-berlin" replace />} />

        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
