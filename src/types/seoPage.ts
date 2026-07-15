export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'list' | 'numbered-list' | 'table' | 'cta';
  text?: string;
  items?: string[];
  table?: ContentTable;
  linkTo?: string;
  linkLabel?: string;
}

export interface ContentSection {
  id?: string;
  title?: string;
  level?: 2 | 3;
  blocks: ContentBlock[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  h1: string;
  canonicalPath: string;
  ogImage?: string;
}

export interface SeoPageConfig {
  id: string;
  path: string;
  meta: SeoMeta;
  intro: string;
  heroImage?: string;
  breadcrumbs: BreadcrumbItem[];
  sections: ContentSection[];
  faq?: FaqItem[];
  serviceName?: string;
  schemaType?: 'Service' | 'Article';
  offerPrice?: string;
}

export interface ServiceLink {
  path: string;
  labelKey: string;
}
