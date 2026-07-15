import React, { useEffect } from 'react';
import { SeoPageConfig } from '../../types/seoPage';
import { getCanonicalUrl } from '../../data/seoPages';

interface StructuredDataProps {
  page: SeoPageConfig;
  faq?: { question: string; answer: string }[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ page, faq }) => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.path ? getCanonicalUrl(item.path) : getCanonicalUrl(page.path),
      })),
    };

    const schemas: object[] = [breadcrumbSchema];

    if (page.schemaType === 'Service' && page.serviceName) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.serviceName,
        serviceType: page.serviceName,
        provider: { '@id': `${getCanonicalUrl('/') }#business` },
        areaServed: { '@type': 'City', name: 'Berlin' },
        url: getCanonicalUrl(page.path),
        ...(page.offerPrice && {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: page.offerPrice,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: page.offerPrice,
              priceCurrency: 'EUR',
            },
          },
        }),
      });
    }

    if (page.schemaType === 'Article') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.meta.h1,
        author: {
          '@type': 'Person',
          name: 'Sam',
          jobTitle: 'Folierer',
        },
        publisher: {
          '@type': 'Organization',
          name: 'FolienSam',
        },
        url: getCanonicalUrl(page.path),
      });
    }

    if (faq && faq.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, [page, faq]);

  return null;
};

export default StructuredData;
