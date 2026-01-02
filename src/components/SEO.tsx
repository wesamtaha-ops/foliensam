import { useEffect } from 'react';
import { getSettings } from '../services/dataService';

const SEO = () => {
  useEffect(() => {
    const updateMetaTags = async () => {
      try {
        console.log('🔍 Loading SEO settings from backend...');
        const settings = await getSettings();
        console.log('✅ SEO settings loaded:', settings.seo);
        
        if (settings.seo) {
          const seo = settings.seo;
          console.log('📝 Updating meta tags with SEO data...');

          // Update title
          if (seo.title) {
            document.title = seo.title;
            updateMetaTag('name', 'title', seo.title);
          }

          // Update description
          if (seo.description) {
            updateMetaTag('name', 'description', seo.description);
          }

          // Update keywords
          if (seo.keywords) {
            updateMetaTag('name', 'keywords', seo.keywords);
          }

          // Update Open Graph tags
          if (seo.ogTitle) {
            updateMetaTag('property', 'og:title', seo.ogTitle);
          }
          if (seo.ogDescription) {
            updateMetaTag('property', 'og:description', seo.ogDescription);
          }
          if (seo.ogImage) {
            updateMetaTag('property', 'og:image', seo.ogImage);
            console.log('🖼️ OG Image updated to:', seo.ogImage);
          }
          if (seo.ogUrl) {
            updateMetaTag('property', 'og:url', seo.ogUrl);
          }

          // Update Twitter tags
          if (seo.twitterTitle) {
            updateMetaTag('property', 'twitter:title', seo.twitterTitle);
          }
          if (seo.twitterDescription) {
            updateMetaTag('property', 'twitter:description', seo.twitterDescription);
          }
          if (seo.twitterImage) {
            updateMetaTag('property', 'twitter:image', seo.twitterImage);
            console.log('🖼️ Twitter Image updated to:', seo.twitterImage);
          }

          // Update canonical URL
          if (seo.canonicalUrl) {
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
              canonicalLink = document.createElement('link');
              canonicalLink.setAttribute('rel', 'canonical');
              document.head.appendChild(canonicalLink);
            }
            canonicalLink.setAttribute('href', seo.canonicalUrl);
          }

          // Update author
          if (seo.author) {
            updateMetaTag('name', 'author', seo.author);
          }

          // Update robots
          if (seo.robots) {
            updateMetaTag('name', 'robots', seo.robots);
          }
          
          console.log('✅ Meta tags updated successfully');
        } else {
          console.log('⚠️ No SEO settings found, using default meta tags from index.html');
        }
      } catch (err) {
        console.error('❌ Failed to load SEO settings:', err);
      }
    };

    updateMetaTags();
  }, []);

  const updateMetaTag = (attribute: string, name: string, content: string) => {
    const selector = attribute === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
    console.log(`✅ Updated ${attribute}="${name}" to: ${content}`);
  };

  return null; // This component doesn't render anything
};

export default SEO;

