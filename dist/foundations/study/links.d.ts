/**
 * Links between the study's pages. Stories render inside Storybook's preview iframe, so a link
 * targets the top window and is relative to it (works on any base path, e.g. GitHub Pages).
 */
export declare const chapters: readonly [{
    readonly slug: "overview";
    readonly title: "Overview";
    readonly blurb: "What this study is, how to read it, and the sources.";
}, {
    readonly slug: "function-first";
    readonly title: "Function first";
    readonly blurb: "Principle 1 — beautiful because it is effortless.";
}, {
    readonly slug: "friendly-always";
    readonly title: "Friendly, always";
    readonly blurb: "Principle 2 — approachable whether the work is serious or casual.";
}, {
    readonly slug: "act-where-you-look";
    readonly title: "Act where you look";
    readonly blurb: "Principle 3 — every control sits where its effect happens.";
}, {
    readonly slug: "cause-and-effect";
    readonly title: "Cause and effect";
    readonly blurb: "Principle 4 — motion, depth and gradients that orient.";
}, {
    readonly slug: "perception-and-laws";
    readonly title: "Perception and laws";
    readonly blurb: "Gestalt, grids, and the laws of Fitts, Hick and Jakob — the science underneath.";
}, {
    readonly slug: "element-by-element";
    readonly title: "Element by element";
    readonly blurb: "How each building block must work, and why.";
}, {
    readonly slug: "corrections";
    readonly title: "Corrections";
    readonly blurb: "What the study found wrong in the system, and how it was fixed.";
}, {
    readonly slug: "the-examples";
    readonly title: "The examples";
    readonly blurb: "Every example application, and the rules it demonstrates.";
}];
export type ChapterSlug = (typeof chapters)[number]['slug'];
/** Href of a story, for `<a href target="_top">`. */
export declare const storyHref: (id: string) => string;
/** Href of a study chapter (each chapter is a single story named like its title). */
export declare const chapterHref: (slug: ChapterSlug) => string;
