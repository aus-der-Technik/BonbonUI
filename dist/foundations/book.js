/**
 * The handbook as one book: the Introduction, Explore and the Design study in the order of the
 * Storybook sidebar, then on into the example pages. Every page's previous / next comes from
 * here, so the pager always matches the sidebar, also across chapters.
 */
import { chapters, storyHref } from './study/links';
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
];
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
];
export const book = [
    ...introPages.map((p) => ({ ...p, chapter: 'Introduction' })),
    ...explorePages.map((p) => ({ ...p, chapter: 'Explore' })),
    ...chapters.map((c) => ({
        title: c.title,
        id: `design-study-${c.slug}--${c.slug}`,
        blurb: c.blurb,
        chapter: 'Design study',
    })),
    // The book ends where the examples begin: the first page in the sidebar's Pages.
    {
        title: 'Landing page',
        id: 'pages-website--landing-page',
        blurb: 'The first of the example pages: whole applications built only from the library.',
        chapter: 'Pages',
    },
];
/** Previous and next page of the story `id` in the book. */
export function bookPager(id) {
    const i = book.findIndex((p) => p.id === id);
    if (i < 0)
        return {};
    const here = book[i].chapter;
    const step = (p) => p
        ? {
            title: p.title,
            href: storyHref(p.id),
            blurb: p.blurb,
            ...(p.chapter !== here ? { chapter: p.chapter } : {}),
        }
        : undefined;
    const prev = step(book[i - 1]);
    const next = step(book[i + 1]);
    return { ...(prev ? { prev } : {}), ...(next ? { next } : {}) };
}
/** The pager of a page found by its title in one chapter. */
export function chapterPager(chapter, title) {
    const page = book.find((p) => p.chapter === chapter && p.title === title);
    return page ? bookPager(page.id) : {};
}
