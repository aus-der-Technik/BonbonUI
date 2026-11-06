/**
 * The Introduction chapter's pages in reading order, for the pager at the end of each page.
 * Every page is one story named like its title.
 */
import { storyHref } from './study/links';

export const introPages = [
  {
    title: 'Welcome',
    id: 'introduction-welcome--welcome',
    blurb: 'What BonbonUI is, in one page.',
  },
  {
    title: 'Design language',
    id: 'introduction-design-language--design-language',
    blurb: 'Candy, disciplined: the rules behind the look.',
  },
  {
    title: 'Getting started',
    id: 'introduction-getting-started--getting-started',
    blurb: 'Install it, wrap your app, build the first page.',
  },
  {
    title: 'Layers',
    id: 'introduction-layers--layers',
    blurb: 'Ground, panel, selected and front, and what a press moves.',
  },
  {
    title: 'Light',
    id: 'introduction-light--light',
    blurb: 'Where light comes from, and what it falls on.',
  },
  {
    title: 'Colour & tint',
    id: 'introduction-colour-tint--colour-tint',
    blurb: 'One colour, and everything that grows from it.',
  },
  {
    title: 'Layout',
    id: 'introduction-layout--layout',
    blurb: 'Stacks, rows, grids and the page frame.',
  },
  { title: 'Recipes', id: 'introduction-recipes--recipes', blurb: 'Whole screens, ready to copy.' },
  {
    title: 'Design tokens',
    id: 'introduction-design-tokens--design-tokens',
    blurb: 'Every value, named and live.',
  },
  {
    title: 'Conventions',
    id: 'introduction-conventions--conventions',
    blurb: 'How the code is written, and why.',
  },
] as const;

export interface PagerStep {
  title: string;
  href: string;
  blurb?: string | undefined;
}

/** Previous and next page of the Introduction, found by the page's title. */
export function introPager(title: string): { prev?: PagerStep; next?: PagerStep } {
  const i = introPages.findIndex((p) => p.title === title);
  if (i < 0) return {};
  const step = (p: (typeof introPages)[number] | undefined) =>
    p ? { title: p.title, href: storyHref(p.id), blurb: p.blurb } : undefined;
  const prev = step(introPages[i - 1]);
  const next = step(introPages[i + 1]);
  return { ...(prev ? { prev } : {}), ...(next ? { next } : {}) };
}
