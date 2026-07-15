import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SeoPageLayout from '../components/seo/SeoPageLayout';
import { getPageByPath } from '../data/seoPages';

const SeoLandingPage: React.FC = () => {
  const location = useLocation();
  const page = getPageByPath(location.pathname);

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  return <SeoPageLayout page={page} />;
};

export default SeoLandingPage;
