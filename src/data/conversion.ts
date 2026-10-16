// Central config for conversion CTAs (WhatsApp, phone, form) and reference photos.
// GTM tracking relies on these being rendered as real <a href="https://wa.me/..."> and
// <a href="tel:..."> links – never replace them with onClick handlers.

export const WHATSAPP_NUMBER = '4915750000505';
export const PHONE_HREF = 'tel:+4915750000505';
export const PHONE_DISPLAY = '+49 157 50000505';
export const CONTACT_EMAIL = 'info@foliensam.de';
export const GOOGLE_PROFILE_URL = 'https://share.google/xBH03XmJLL7QP2j6u';

export const GENERIC_WHATSAPP_TEXT = 'Hallo FolienSam, ich interessiere mich für eine Folierung.';

export const buildWhatsAppUrl = (text: string = GENERIC_WHATSAPP_TEXT) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export interface ReferencePhoto {
  /** Base name of the files in /public/img/projekte ({slug}-{480|800|1200}.webp) */
  slug: string;
  alt: string;
  width: number;
  height: number;
}

export const REFERENCE_PHOTO_WIDTHS = [480, 800, 1200] as const;

export const photoSrc = (photo: ReferencePhoto, width = 800) =>
  `/img/projekte/${photo.slug}-${width}.webp`;

export const photoSrcSet = (photo: ReferencePhoto) =>
  REFERENCE_PHOTO_WIDTHS.map((w) => `${photoSrc(photo, w)} ${w}w`).join(', ');

// Real FolienSam projects. Alt texts describe what is visible on the photo.
const PHOTOS = {
  panameraRosa: { slug: 'porsche-panamera-rosa', alt: 'Porsche Panamera foliert in Rosa, FolienSam Berlin', width: 1200, height: 1600 },
  panameraRosaHeck: { slug: 'porsche-panamera-rosa-heck', alt: 'Porsche Panamera in Rosa von hinten, FolienSam Berlin', width: 1200, height: 1600 },
  teslaRosa: { slug: 'tesla-model-3-rosa', alt: 'Tesla Model 3 foliert in Rosa, FolienSam Berlin', width: 1200, height: 900 },
  vitaraOliv: { slug: 'suzuki-vitara-olivgruen-matt', alt: 'Suzuki Vitara foliert in Olivgrün, FolienSam Berlin', width: 1200, height: 1600 },
  gKlasseWeiss: { slug: 'mercedes-g-klasse-weiss', alt: 'Mercedes G-Klasse in Weiß in der Werkstatt von FolienSam Berlin', width: 1200, height: 1600 },
  x6Front: { slug: 'bmw-x6-weiss-front', alt: 'BMW X6 in Weiß in der Werkstatt von FolienSam Berlin', width: 1200, height: 1600 },
  x6Seite: { slug: 'bmw-x6-weiss-seite', alt: 'BMW X6 in Weiß, Seitenansicht, FolienSam Berlin', width: 1200, height: 1600 },
  q8Front: { slug: 'audi-q8-grau-front', alt: 'Audi Q8 in Grau mit schwarzen Felgen, FolienSam Berlin', width: 1200, height: 1176 },
  q8Heck: { slug: 'audi-q8-grau-heck', alt: 'Audi Q8 in Grau von hinten, FolienSam Berlin', width: 1200, height: 1600 },
  smartSchwarz: { slug: 'smart-schwarz-matt', alt: 'Smart in Schwarz in der Werkstatt von FolienSam Berlin', width: 1200, height: 1600 },
  cKlasseSchwarz: { slug: 'mercedes-c-klasse-schwarz', alt: 'Mercedes C-Klasse in Schwarz, FolienSam Berlin', width: 1200, height: 1600 },
  slFront: { slug: 'mercedes-sl-weiss-front', alt: 'Mercedes SL Cabrio in Weiß, FolienSam Berlin', width: 1200, height: 1600 },
  slVerdeck: { slug: 'mercedes-sl-weiss-verdeck', alt: 'Mercedes SL in Weiß mit offenem Verdeck, FolienSam Berlin', width: 1200, height: 1600 },
} satisfies Record<string, ReferencePhoto>;

export interface ServiceConversionConfig {
  /** Value of the form field "Leistung" and of the dataLayer "service" key */
  service: string;
  whatsappText: string;
  heroPhoto: ReferencePhoto;
  gallery: ReferencePhoto[];
}

// TODO: Scheibentönung, Lackschutzfolie, Felgen and Fahrzeugbeschriftung currently use
// colour-wrap photos – swap in service-specific project photos when available.
export const SERVICE_CONVERSION: Record<string, ServiceConversionConfig> = {
  '/autofolierung-berlin': {
    service: 'Autofolierung',
    whatsappText: 'Hallo FolienSam, ich interessiere mich für eine Autofolierung.',
    heroPhoto: PHOTOS.panameraRosa,
    gallery: [PHOTOS.vitaraOliv, PHOTOS.teslaRosa, PHOTOS.gKlasseWeiss, PHOTOS.x6Front, PHOTOS.q8Front, PHOTOS.smartSchwarz],
  },
  '/vollfolierung-berlin': {
    service: 'Vollfolierung',
    whatsappText: 'Hallo FolienSam, ich interessiere mich für eine Vollfolierung.',
    heroPhoto: PHOTOS.teslaRosa,
    gallery: [PHOTOS.panameraRosa, PHOTOS.vitaraOliv, PHOTOS.x6Seite, PHOTOS.q8Heck, PHOTOS.slFront, PHOTOS.cKlasseSchwarz],
  },
  '/scheibentoenung-berlin': {
    service: 'Scheibentönung',
    whatsappText: 'Hallo FolienSam, ich interessiere mich für eine Scheibentönung.',
    heroPhoto: PHOTOS.cKlasseSchwarz,
    gallery: [PHOTOS.panameraRosaHeck, PHOTOS.q8Heck, PHOTOS.smartSchwarz, PHOTOS.x6Front, PHOTOS.teslaRosa, PHOTOS.gKlasseWeiss],
  },
  '/lackschutzfolie-berlin': {
    service: 'Lackschutzfolie (PPF)',
    whatsappText: 'Hallo FolienSam, ich interessiere mich für eine Lackschutzfolie (PPF).',
    heroPhoto: PHOTOS.gKlasseWeiss,
    gallery: [PHOTOS.x6Front, PHOTOS.slFront, PHOTOS.panameraRosa, PHOTOS.q8Front, PHOTOS.cKlasseSchwarz, PHOTOS.teslaRosa],
  },
  '/felgenfolierung-berlin': {
    service: 'Felgenfolierung',
    whatsappText: 'Hallo FolienSam, ich interessiere mich für eine Felgenfolierung.',
    heroPhoto: PHOTOS.q8Front,
    gallery: [PHOTOS.teslaRosa, PHOTOS.x6Seite, PHOTOS.vitaraOliv, PHOTOS.gKlasseWeiss, PHOTOS.panameraRosa, PHOTOS.slVerdeck],
  },
  '/fahrzeugbeschriftung-berlin': {
    service: 'Fahrzeugbeschriftung',
    whatsappText: 'Hallo FolienSam, ich interessiere mich für eine Fahrzeugbeschriftung.',
    heroPhoto: PHOTOS.smartSchwarz,
    gallery: [PHOTOS.vitaraOliv, PHOTOS.x6Front, PHOTOS.teslaRosa, PHOTOS.cKlasseSchwarz, PHOTOS.q8Heck, PHOTOS.gKlasseWeiss],
  },
};

/** Options for the form field "Leistung" */
export const SERVICE_OPTIONS = [
  ...Object.values(SERVICE_CONVERSION).map((c) => c.service),
  'Sonstiges / Beratung',
];

export const getServiceConversion = (pathname: string): ServiceConversionConfig | undefined =>
  SERVICE_CONVERSION[pathname.replace(/\/$/, '') || '/'];

export const getWhatsAppTextForPath = (pathname: string) =>
  getServiceConversion(pathname)?.whatsappText ?? GENERIC_WHATSAPP_TEXT;

/** Splits an intro into the first `count` sentences and the remainder (nothing is dropped). */
export const splitIntro = (intro: string, count = 2): [string, string] => {
  // No lookbehind – older iOS Safari versions cannot parse it.
  const sentences = intro.trim().replace(/([.!?])\s+(?=[A-ZÄÖÜА-ЯЁ„"(])/g, '$1\u0000').split('\u0000');
  if (sentences.length <= count) return [intro.trim(), ''];
  return [sentences.slice(0, count).join(' '), sentences.slice(count).join(' ')];
};
