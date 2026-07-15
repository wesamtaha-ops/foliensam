import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SeoPageLayout from '../components/seo/SeoPageLayout';
import { getPageByPath } from '../data/seoPages';
import { useLocalizedSeoPage } from '../hooks/useLocalizedSeoPage';

const SeoLandingPage: React.FC = () => {
  const location = useLocation();
  const page = getPageByPath(location.pathname);

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  return <SeoLandingPageContent page={page} />;
};

const SeoLandingPageContent: React.FC<{ page: NonNullable<ReturnType<typeof getPageByPath>> }> = ({
  page,
}) => {
  const localizedPage = useLocalizedSeoPage(page);
  return <SeoPageLayout page={localizedPage} />;
};

export default SeoLandingPage;
