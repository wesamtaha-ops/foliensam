import { SERVICE_LINKS } from '../data/seoPages';

export interface HomepageService {
  id: string;
  path: string;
  labelKey: string;
  descriptionKey: string;
  image: string;
  icon: 'Car' | 'Sun' | 'Shield' | 'Building' | 'Palette' | 'Sparkles';
  categoryKey: string;
}

export const DEFAULT_HOMEPAGE_SERVICES: HomepageService[] = [
  {
    id: '1',
    path: SERVICE_LINKS[0].path,
    labelKey: 'seoPages.homeServices.autofolierung.title',
    descriptionKey: 'seoPages.homeServices.autofolierung.description',
    image: 'https://images.cood.ai/samgo/car1.png',
    icon: 'Car',
    categoryKey: 'seoPages.homeServices.autofolierung.category',
  },
  {
    id: '2',
    path: SERVICE_LINKS[1].path,
    labelKey: 'seoPages.homeServices.vollfolierung.title',
    descriptionKey: 'seoPages.homeServices.vollfolierung.description',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80',
    icon: 'Car',
    categoryKey: 'seoPages.homeServices.vollfolierung.category',
  },
  {
    id: '3',
    path: SERVICE_LINKS[2].path,
    labelKey: 'seoPages.homeServices.scheibentoenung.title',
    descriptionKey: 'seoPages.homeServices.scheibentoenung.description',
    image: 'https://images.cood.ai/samgo/car1.png',
    icon: 'Sun',
    categoryKey: 'seoPages.homeServices.scheibentoenung.category',
  },
  {
    id: '4',
    path: SERVICE_LINKS[3].path,
    labelKey: 'seoPages.homeServices.lackschutz.title',
    descriptionKey: 'seoPages.homeServices.lackschutz.description',
    image: 'https://images.cood.ai/samgo/004.png',
    icon: 'Shield',
    categoryKey: 'seoPages.homeServices.lackschutz.category',
  },
  {
    id: '5',
    path: SERVICE_LINKS[4].path,
    labelKey: 'seoPages.homeServices.beschriftung.title',
    descriptionKey: 'seoPages.homeServices.beschriftung.description',
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80',
    icon: 'Building',
    categoryKey: 'seoPages.homeServices.beschriftung.category',
  },
  {
    id: '6',
    path: SERVICE_LINKS[5].path,
    labelKey: 'seoPages.homeServices.felgen.title',
    descriptionKey: 'seoPages.homeServices.felgen.description',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80',
    icon: 'Sparkles',
    categoryKey: 'seoPages.homeServices.felgen.category',
  },
];

/** @deprecated Use DEFAULT_HOMEPAGE_SERVICES */
export const HOMEPAGE_SERVICES = DEFAULT_HOMEPAGE_SERVICES;
