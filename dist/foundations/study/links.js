/**
 * Links between the study's pages. Stories render inside Storybook's preview iframe, so a link
 * targets the top window and is relative to it (works on any base path, e.g. GitHub Pages).
 */
export const chapters = [
    {
        slug: 'overview',
        title: 'Overview',
        blurb: 'What this study is, how to read it, and the sources.',
    },
    {
        slug: 'function-first',
        title: 'Function first',
        blurb: 'Principle 1 — beautiful because it is effortless.',
    },
    {
        slug: 'friendly-always',
        title: 'Friendly, always',
        blurb: 'Principle 2 — approachable whether the work is serious or casual.',
    },
    {
        slug: 'act-where-you-look',
        title: 'Act where you look',
        blurb: 'Principle 3 — every control sits where its effect happens.',
    },
    {
        slug: 'cause-and-effect',
        title: 'Cause and effect',
        blurb: 'Principle 4 — motion, depth and gradients that orient.',
    },
    {
        slug: 'perception-and-laws',
        title: 'Perception and laws',
        blurb: 'Gestalt, grids, and the laws of Fitts, Hick and Jakob — the science underneath.',
    },
    {
        slug: 'element-by-element',
        title: 'Element by element',
        blurb: 'How each building block must work, and why.',
    },
    {
        slug: 'corrections',
        title: 'Corrections',
        blurb: 'What the study found wrong in the system, and how it was fixed.',
    },
    {
        slug: 'the-examples',
        title: 'The examples',
        blurb: 'Every example application, and the rules it demonstrates.',
    },
];
/** Href of a story, for `<a href target="_top">`. */
export const storyHref = (id) => `./?path=/story/${id}`;
/** Href of a study chapter (each chapter is a single story named like its title). */
export const chapterHref = (slug) => storyHref(`design-study-${slug}--${slug}`);
