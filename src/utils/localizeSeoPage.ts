import {
  BreadcrumbItem,
  ContentBlock,
  ContentSection,
  FaqItem,
  SeoPageConfig,
} from '../types/seoPage';

export interface SeoPageTextContent {
  meta?: {
    title?: string;
    description?: string;
    h1?: string;
  };
  intro?: string;
  breadcrumbs?: { label: string }[];
  serviceName?: string;
  sections?: {
    id?: string;
    title?: string;
    level?: 2 | 3;
    blocks?: ContentBlock[];
  }[];
  faq?: FaqItem[];
}

const mergeBlocks = (
  baseBlocks: ContentBlock[],
  translatedBlocks?: ContentBlock[]
): ContentBlock[] => {
  if (!translatedBlocks) return baseBlocks;

  return baseBlocks.map((block, index) => {
    const translated = translatedBlocks[index];
    if (!translated || translated.type !== block.type) return block;

    switch (block.type) {
      case 'paragraph':
        return { ...block, text: translated.text ?? block.text };
      case 'list':
      case 'numbered-list':
        return { ...block, items: translated.items ?? block.items };
      case 'table':
        return {
          ...block,
          table: translated.table
            ? {
                headers: translated.table.headers ?? block.table?.headers ?? [],
                rows: translated.table.rows ?? block.table?.rows ?? [],
                caption: translated.table.caption ?? block.table?.caption,
              }
            : block.table,
        };
      case 'cta':
        return { ...block, linkLabel: translated.linkLabel ?? block.linkLabel };
      default:
        return block;
    }
  });
};

const mergeSections = (
  baseSections: ContentSection[],
  translatedSections?: SeoPageTextContent['sections']
): ContentSection[] => {
  if (!translatedSections) return baseSections;

  return baseSections.map((section, index) => {
    const translated = translatedSections[index];
    if (!translated) return section;

    return {
      ...section,
      title: translated.title ?? section.title,
      blocks: mergeBlocks(section.blocks, translated.blocks),
    };
  });
};

const mergeBreadcrumbs = (
  baseBreadcrumbs: BreadcrumbItem[],
  translatedBreadcrumbs?: { label: string }[]
): BreadcrumbItem[] => {
  if (!translatedBreadcrumbs) return baseBreadcrumbs;

  return baseBreadcrumbs.map((crumb, index) => ({
    ...crumb,
    label: translatedBreadcrumbs[index]?.label ?? crumb.label,
  }));
};

export const localizeSeoPage = (
  page: SeoPageConfig,
  content?: SeoPageTextContent | string
): SeoPageConfig => {
  if (!content || typeof content === 'string') return page;

  return {
    ...page,
    meta: {
      ...page.meta,
      title: content.meta?.title ?? page.meta.title,
      description: content.meta?.description ?? page.meta.description,
      h1: content.meta?.h1 ?? page.meta.h1,
    },
    intro: content.intro ?? page.intro,
    breadcrumbs: mergeBreadcrumbs(page.breadcrumbs, content.breadcrumbs),
    serviceName: content.serviceName ?? page.serviceName,
    sections: mergeSections(page.sections, content.sections),
    faq: content.faq ?? page.faq,
  };
};
