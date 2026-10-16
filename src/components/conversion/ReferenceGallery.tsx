import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ReferencePhoto, photoSrc, photoSrcSet } from '../../data/conversion';

interface ReferenceGalleryProps {
  photos: ReferencePhoto[];
  title?: string;
}

const ReferenceGallery: React.FC<ReferenceGalleryProps> = ({ photos, title = 'Aktuelle Projekte aus unserer Werkstatt' }) => (
  <section className="bg-white py-8 md:py-12" aria-label="Referenzen">
    <div className="seo-page-container">
      <h2 className="text-xl md:text-2xl font-bold text-black mb-4 md:mb-6">{title}</h2>
      <ul className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-2 list-none">
        {photos.map((photo) => (
          <li key={photo.slug} className="snap-start flex-shrink-0 w-[72%] sm:w-[45%] md:w-auto">
            <img
              src={photoSrc(photo, 800)}
              srcSet={photoSrcSet(photo)}
              sizes="(min-width: 768px) 33vw, 72vw"
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[3/4] object-cover rounded-xl bg-gray-200"
            />
          </li>
        ))}
      </ul>
      <Link
        to="/referenzen"
        className="inline-flex items-center gap-2 mt-4 md:mt-6 font-semibold text-[#8b0000] hover:underline"
      >
        Alle Referenzen ansehen
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export default ReferenceGallery;
