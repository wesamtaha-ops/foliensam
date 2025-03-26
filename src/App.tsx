import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen">
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

export default App;