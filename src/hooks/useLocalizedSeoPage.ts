import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SeoPageConfig } from '../types/seoPage';
import { localizeSeoPage, SeoPageTextContent } from '../utils/localizeSeoPage';

export const useLocalizedSeoPage = (page: SeoPageConfig): SeoPageConfig => {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    if (i18n.language === 'de') return page;

    const content = t(`seoPages.content.${page.id}`, {
      returnObjects: true,
      defaultValue: '',
    }) as SeoPageTextContent | string;

    return localizeSeoPage(page, content);
  }, [page, t, i18n.language]);
};
