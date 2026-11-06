/**
 * The Explore chapter's pages in reading order, for the pager at the end of each page. Every
 * page is one story named like its title.
 */
import { storyHref } from '../study/links';
import type { PagerStep } from '../intro';

export const explorePages = [
  {
    title: 'Component catalogue',
    id: 'explore-component-catalogue--component-catalogue',
    blurb: 'Every component on one page: search, filter, open its story.',
  },
  {
    title: 'Motion & light lab',
    id: 'explore-motion-light-lab--motion-light-lab',
    blurb: 'Play with the liquid drop, the squeeze, the press and the light.',
  },
  {
    title: 'Token playground',
    id: 'explore-token-playground--token-playground',
    blurb: 'Pick tint, theme, radius and density, and watch the tokens follow.',
  },
] as const;

/** Previous and next page of the chapter, found by the page's title. */
export function explorePager(title: string): { prev?: PagerStep; next?: PagerStep } {
  const i = explorePages.findIndex((p) => p.title === title);
  if (i < 0) return {};
  const step = (p: (typeof explorePages)[number] | undefined) =>
    p ? { title: p.title, href: storyHref(p.id), blurb: p.blurb } : undefined;
  const prev = step(explorePages[i - 1]);
  const next = step(explorePages[i + 1]);
  return { ...(prev ? { prev } : {}), ...(next ? { next } : {}) };
}
