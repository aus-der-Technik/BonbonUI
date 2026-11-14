export interface PagerStep {
    title: string;
    href: string;
    blurb?: string | undefined;
    /** The chapter it belongs to, when that is not the current page's chapter. */
    chapter?: string | undefined;
}
export declare const introPages: readonly [{
    readonly title: "Welcome";
    readonly id: "introduction-welcome--welcome";
    readonly blurb: "What BonbonUI is, in one page.";
}, {
    readonly title: "Design language";
    readonly id: "introduction-design-language--design-language";
    readonly blurb: "Candy, disciplined: the rules behind the look.";
}, {
    readonly title: "Getting started";
    readonly id: "introduction-getting-started--getting-started";
    readonly blurb: "Install it, wrap your app, build the first page.";
}, {
    readonly title: "Layers";
    readonly id: "introduction-layers--layers";
    readonly blurb: "Ground, panel, selected and front, and what a press moves.";
}, {
    readonly title: "Light";
    readonly id: "introduction-light--light";
    readonly blurb: "Where light comes from, and what it falls on.";
}, {
    readonly title: "Colour & tint";
    readonly id: "introduction-colour-tint--colour-tint";
    readonly blurb: "One colour, and everything that grows from it.";
}, {
    readonly title: "Layout";
    readonly id: "introduction-layout--layout";
    readonly blurb: "Stacks, rows, grids and the page frame.";
}, {
    readonly title: "Recipes";
    readonly id: "introduction-recipes--recipes";
    readonly blurb: "Whole screens, ready to copy.";
}, {
    readonly title: "Design tokens";
    readonly id: "introduction-design-tokens--design-tokens";
    readonly blurb: "Every value, named and live.";
}, {
    readonly title: "Conventions";
    readonly id: "introduction-conventions--conventions";
    readonly blurb: "How the code is written, and why.";
}];
export declare const explorePages: readonly [{
    readonly title: "Component catalogue";
    readonly id: "explore-component-catalogue--component-catalogue";
    readonly blurb: "Every component on one page: search, filter, open its story.";
}, {
    readonly title: "Motion & light lab";
    readonly id: "explore-motion-light-lab--motion-light-lab";
    readonly blurb: "Play with the liquid drop, the squeeze, the press and the light.";
}, {
    readonly title: "Token playground";
    readonly id: "explore-token-playground--token-playground";
    readonly blurb: "Pick tint, theme, radius and density, and watch the tokens follow.";
}];
interface BookPage {
    title: string;
    id: string;
    blurb: string;
    chapter: string;
}
export declare const book: BookPage[];
/** Previous and next page of the story `id` in the book. */
export declare function bookPager(id: string): {
    prev?: PagerStep;
    next?: PagerStep;
};
/** The pager of a page found by its title in one chapter. */
export declare function chapterPager(chapter: string, title: string): {
    prev?: PagerStep;
    next?: PagerStep;
};
export {};
