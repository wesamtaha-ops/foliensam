import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SeoPageLayout from '../components/seo/SeoPageLayout';
import { getSeoPageByPath } from '../services/seoPageService';
import { useLocalizedSeoPage } from '../hooks/useLocalizedSeoPage';
import { SeoPageConfig } from '../types/seoPage';

const SeoLandingPage: React.FC = () => {
  const location = useLocation();
  const [page, setPage] = useState<SeoPageConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadPage = async () => {
      setLoading(true);
      try {
        const data = await getSeoPageByPath(location.pathname);
        if (active) {
          setPage(data ?? null);
        }
      } catch (err) {
        console.error('Failed to load SEO page:', err);
        if (active) {
          setPage(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPage();
    return () => {
      active = false;
    };
  }, [location.pathname]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash || loading) {
      return;
    }

    const timer = window.setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  return <SeoLandingPageContent page={page} />;
};

const SeoLandingPageContent: React.FC<{ page: SeoPageConfig }> = ({ page }) => {
  const localizedPage = useLocalizedSeoPage(page);
  return <SeoPageLayout page={localizedPage} />;
};

export default SeoLandingPage;
