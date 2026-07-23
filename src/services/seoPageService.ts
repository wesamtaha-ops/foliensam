import { SeoPageConfig } from '../types/seoPage';
import { SEO_PAGES, SEO_HERO_IMAGES } from '../data/seoPages';
import {
  getSeoPagesData as getSeoPagesFromPHP,
  saveSeoPagesData as saveSeoPagesToPHP,
} from './phpDataService';

export const SERVICE_PAGE_IDS = [
  'autofolierung',
  'vollfolierung',
  'scheibentoenung',
  'lackschutz',
  'beschriftung',
  'felgen',
] as const;

export type ServicePageId = (typeof SERVICE_PAGE_IDS)[number];

function enrichPage(page: SeoPageConfig): SeoPageConfig {
  return {
    ...page,
    heroImage: page.heroImage || SEO_HERO_IMAGES[page.id],
  };
}

function mergeSeoPages(
  remote: Record<string, SeoPageConfig> | null
): Record<string, SeoPageConfig> {
  if (!remote || Object.keys(remote).length === 0) {
    return Object.fromEntries(
      Object.entries(SEO_PAGES).map(([id, page]) => [id, enrichPage(page)])
    );
  }

  const merged: Record<string, SeoPageConfig> = {};
  for (const [id, defaultPage] of Object.entries(SEO_PAGES)) {
    merged[id] = enrichPage(remote[id] ?? defaultPage);
  }
  for (const [id, remotePage] of Object.entries(remote)) {
    if (!merged[id]) {
      merged[id] = enrichPage(remotePage);
    }
  }
  return merged;
}

export async function getSeoPages(): Promise<Record<string, SeoPageConfig>> {
  const remote = await getSeoPagesFromPHP();
  return mergeSeoPages(remote);
}

export async function getSeoPageByPath(path: string): Promise<SeoPageConfig | undefined> {
  const normalized = path.replace(/\/$/, '') || '/';
  const pages = await getSeoPages();
  return Object.values(pages).find((page) => page.path === normalized);
}

export async function getSeoPageById(id: string): Promise<SeoPageConfig | undefined> {
  const pages = await getSeoPages();
  const page = pages[id];
  return page ? enrichPage(page) : undefined;
}

export async function saveSeoPage(page: SeoPageConfig): Promise<void> {
  const pages = await getSeoPages();
  pages[page.id] = page;
  await saveSeoPagesToPHP(pages);
}

export async function resetSeoPagesToDefaults(): Promise<Record<string, SeoPageConfig>> {
  const defaults = Object.fromEntries(
    Object.entries(SEO_PAGES).map(([id, page]) => [id, enrichPage(page)])
  );
  await saveSeoPagesToPHP(defaults);
  return defaults;
}
