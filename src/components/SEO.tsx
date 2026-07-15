import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSettings } from '../services/dataService';
import { getCanonicalUrl } from '../data/seoPages';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  robots?: string;
  useGlobalFallback?: boolean;
}

const SEO = ({
  title,
  description,
  canonicalPath,
  ogImage,
  robots,
  useGlobalFallback = true,
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    const updateMetaTags = async () => {
      let resolvedTitle = title;
      let resolvedDescription = description;
      let resolvedOgImage = ogImage;
      let resolvedRobots = robots;

      if (useGlobalFallback && (!resolvedTitle || !resolvedDescription)) {
        try {
          const settings = await getSettings();
          if (settings.seo) {
            resolvedTitle = resolvedTitle || settings.seo.title;
            resolvedDescription = resolvedDescription || settings.seo.description;
            resolvedOgImage = resolvedOgImage || settings.seo.ogImage;
            resolvedRobots = resolvedRobots || settings.seo.robots;
          }
        } catch (err) {
          console.error('Failed to load SEO settings:', err);
        }
      }

      const path = canonicalPath ?? location.pathname;
      const canonicalUrl = getCanonicalUrl(path);

      if (resolvedTitle) {
        document.title = resolvedTitle;
        updateMetaTag('name', 'title', resolvedTitle);
        updateMetaTag('property', 'og:title', resolvedTitle);
        updateMetaTag('property', 'twitter:title', resolvedTitle);
      }

      if (resolvedDescription) {
        updateMetaTag('name', 'description', resolvedDescription);
        updateMetaTag('property', 'og:description', resolvedDescription);
        updateMetaTag('property', 'twitter:description', resolvedDescription);
      }

      if (resolvedOgImage) {
        updateMetaTag('property', 'og:image', resolvedOgImage);
        updateMetaTag('property', 'twitter:image', resolvedOgImage);
      }

      updateMetaTag('property', 'og:url', canonicalUrl);
      updateMetaTag('property', 'twitter:url', canonicalUrl);

      if (resolvedRobots) {
        updateMetaTag('name', 'robots', resolvedRobots);
      }

      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    };

    updateMetaTags();
  }, [title, description, canonicalPath, ogImage, robots, location.pathname, useGlobalFallback]);

  const updateMetaTag = (attribute: string, name: string, content: string) => {
    const selector = attribute === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  return null;
};

export default SEO;
