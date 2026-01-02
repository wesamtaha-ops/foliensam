import React, { useState, useEffect } from 'react';
import { Save, Search, Globe } from 'lucide-react';
import { getSettings, saveSettings } from '../../services/dataService';
import ImageUpload from './ImageUpload';

const SEOManager: React.FC = () => {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    canonicalUrl: '',
    author: '',
    robots: 'index, follow'
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSEOSettings();
  }, []);

  const loadSEOSettings = async () => {
    try {
      const settings = await getSettings();
      if (settings.seo) {
        setSeoData({
          title: settings.seo.title || '',
          description: settings.seo.description || '',
          keywords: settings.seo.keywords || '',
          ogTitle: settings.seo.ogTitle || '',
          ogDescription: settings.seo.ogDescription || '',
          ogImage: settings.seo.ogImage || '',
          ogUrl: settings.seo.ogUrl || '',
          twitterTitle: settings.seo.twitterTitle || '',
          twitterDescription: settings.seo.twitterDescription || '',
          twitterImage: settings.seo.twitterImage || '',
          canonicalUrl: settings.seo.canonicalUrl || '',
          author: settings.seo.author || '',
          robots: settings.seo.robots || 'index, follow'
        });
      }
    } catch (err) {
      console.error('Failed to load SEO settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const settings = await getSettings();
      await saveSettings({
        ...settings,
        seo: seoData
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Update meta tags immediately
      updateMetaTags();
    } catch (err) {
      console.error('Failed to save SEO settings:', err);
      alert('Failed to save. Please try again.');
    }
  };

  const updateMetaTags = () => {
    // Update title
    if (seoData.title) {
      document.title = seoData.title;
      updateMetaTag('name', 'title', seoData.title);
    }

    // Update description
    if (seoData.description) {
      updateMetaTag('name', 'description', seoData.description);
    }

    // Update keywords
    if (seoData.keywords) {
      updateMetaTag('name', 'keywords', seoData.keywords);
    }

    // Update Open Graph tags
    if (seoData.ogTitle) {
      updateMetaTag('property', 'og:title', seoData.ogTitle);
    }
    if (seoData.ogDescription) {
      updateMetaTag('property', 'og:description', seoData.ogDescription);
    }
    if (seoData.ogImage) {
      updateMetaTag('property', 'og:image', seoData.ogImage);
    }
    if (seoData.ogUrl) {
      updateMetaTag('property', 'og:url', seoData.ogUrl);
    }

    // Update Twitter tags
    if (seoData.twitterTitle) {
      updateMetaTag('property', 'twitter:title', seoData.twitterTitle);
    }
    if (seoData.twitterDescription) {
      updateMetaTag('property', 'twitter:description', seoData.twitterDescription);
    }
    if (seoData.twitterImage) {
      updateMetaTag('property', 'twitter:image', seoData.twitterImage);
    }

    // Update canonical URL
    if (seoData.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', seoData.canonicalUrl);
    }

    // Update author
    if (seoData.author) {
      updateMetaTag('name', 'author', seoData.author);
    }

    // Update robots
    if (seoData.robots) {
      updateMetaTag('name', 'robots', seoData.robots);
    }
  };

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

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center text-gray-600">Loading SEO settings...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-dark">SEO Settings</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage your website's search engine optimization</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors whitespace-nowrap"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          SEO settings saved successfully! Meta tags have been updated.
        </div>
      )}

      <div className="space-y-6">
        {/* Primary Meta Tags */}
        <div className="border-b pb-6">
          <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
            <Search className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Primary Meta Tags</h3>
              <p className="text-sm text-gray-600">Basic SEO information for search engines</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={seoData.title}
                onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="FolienSam Autofolierung Berlin | Premium Fahrzeugveredelung"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 50-60 characters. This appears in browser tabs and search results.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={seoData.description}
                onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                rows={3}
                placeholder="Your expert description for search engines..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 150-160 characters. This appears in search engine results.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={seoData.keywords}
                onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="mt-1 text-xs text-gray-500">
                Comma-separated keywords relevant to your business
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={seoData.author}
                onChange={(e) => setSeoData({ ...seoData, author: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="FolienSam Autofolierung"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Robots
              </label>
              <select
                value={seoData.robots}
                onChange={(e) => setSeoData({ ...seoData, robots: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
              >
                <option value="index, follow">Index, Follow</option>
                <option value="index, nofollow">Index, No Follow</option>
                <option value="noindex, follow">No Index, Follow</option>
                <option value="noindex, nofollow">No Index, No Follow</option>
              </select>
            </div>
          </div>
        </div>

        {/* Open Graph Tags */}
        <div className="border-b pb-6">
          <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 rounded-lg">
            <Globe className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Open Graph (Facebook)</h3>
              <p className="text-sm text-gray-600">How your site appears when shared on social media</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                OG Title
              </label>
              <input
                type="text"
                value={seoData.ogTitle}
                onChange={(e) => setSeoData({ ...seoData, ogTitle: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="FolienSam Autofolierung Berlin"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                OG Description
              </label>
              <textarea
                value={seoData.ogDescription}
                onChange={(e) => setSeoData({ ...seoData, ogDescription: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                rows={3}
                placeholder="Description for social media sharing..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                OG Image URL
              </label>
              <ImageUpload
                label=""
                value={seoData.ogImage}
                onChange={(value) => setSeoData({ ...seoData, ogImage: value })}
                placeholder="https://images.cood.ai/samgo/car1.png"
                description="Image shown when your site is shared on social media (recommended: 1200x630px)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                OG URL
              </label>
              <input
                type="url"
                value={seoData.ogUrl}
                onChange={(e) => setSeoData({ ...seoData, ogUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="https://foliensam.de/"
              />
            </div>
          </div>
        </div>

        {/* Twitter Tags */}
        <div className="border-b pb-6">
          <div className="flex items-center gap-3 mb-4 p-3 bg-sky-50 rounded-lg">
            <Globe className="h-5 w-5 text-sky-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Twitter Card</h3>
              <p className="text-sm text-gray-600">How your site appears when shared on Twitter</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter Title
              </label>
              <input
                type="text"
                value={seoData.twitterTitle}
                onChange={(e) => setSeoData({ ...seoData, twitterTitle: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="FolienSam Autofolierung Berlin"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter Description
              </label>
              <textarea
                value={seoData.twitterDescription}
                onChange={(e) => setSeoData({ ...seoData, twitterDescription: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                rows={3}
                placeholder="Description for Twitter sharing..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter Image URL
              </label>
              <ImageUpload
                label=""
                value={seoData.twitterImage}
                onChange={(value) => setSeoData({ ...seoData, twitterImage: value })}
                placeholder="https://images.cood.ai/samgo/car1.png"
                description="Image shown when your site is shared on Twitter (recommended: 1200x675px)"
              />
            </div>
          </div>
        </div>

        {/* Canonical URL */}
        <div>
          <div className="flex items-center gap-3 mb-4 p-3 bg-purple-50 rounded-lg">
            <Globe className="h-5 w-5 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Canonical URL</h3>
              <p className="text-sm text-gray-600">The preferred URL for this page</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              value={seoData.canonicalUrl}
              onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="https://foliensam.de/"
            />
            <p className="mt-1 text-xs text-gray-500">
              Helps prevent duplicate content issues. Usually your main domain URL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOManager;

