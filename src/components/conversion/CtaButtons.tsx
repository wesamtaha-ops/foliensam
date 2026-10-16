import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, PHONE_HREF } from '../../data/conversion';

interface CtaButtonsProps {
  whatsappText?: string;
  className?: string;
}

// Primary hero CTAs. Must stay real <a> links: GTM matches "wa.me" and "tel:" link clicks.
const CtaButtons: React.FC<CtaButtonsProps> = ({ whatsappText, className = '' }) => (
  <div data-hero-cta className={`flex flex-col sm:flex-row gap-3 w-full sm:w-auto ${className}`}>
    <a
      href={buildWhatsAppUrl(whatsappText)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white text-base font-semibold shadow-lg transition-colors"
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      Angebot per WhatsApp
    </a>
    <a
      href={PHONE_HREF}
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full border-2 border-white/70 text-white text-base font-semibold hover:bg-white hover:text-black transition-colors"
    >
      <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      Jetzt anrufen
    </a>
  </div>
);

export default CtaButtons;
