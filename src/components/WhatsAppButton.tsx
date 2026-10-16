import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { buildWhatsAppUrl, getWhatsAppTextForPath, PHONE_HREF } from '../data/conversion';

// Mobile: sticky bottom bar (WhatsApp + Anrufen) once the hero CTAs are scrolled out of view.
// Desktop: floating WhatsApp pill. Both stay real <a> links for GTM link-click triggers.
const WhatsAppButton = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const whatsappUrl = buildWhatsAppUrl(getWhatsAppTextForPath(pathname));
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    setShowBar(false);
    const heroCta = document.querySelector('[data-hero-cta]');

    if (heroCta && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        // Show once the hero CTAs have left the viewport above
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      observer.observe(heroCta);
      return () => observer.disconnect();
    }

    const onScroll = () => setShowBar(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-[#25D366] pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl text-white font-semibold transform hover:-translate-y-1 transition-all duration-300"
        aria-label={t('contact.whatsappAria')}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 flex gap-2 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] bg-black/90 backdrop-blur border-t border-white/10 transition-transform duration-300 ${
          showBar ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
        aria-hidden={!showBar}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showBar ? 0 : -1}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white font-semibold"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={PHONE_HREF}
          tabIndex={showBar ? 0 : -1}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-semibold"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Anrufen
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
