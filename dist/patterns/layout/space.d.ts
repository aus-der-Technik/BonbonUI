/**
 * The spacing vocabulary of every layout helper. Seven named steps instead of free values, so
 * neighbouring elements always land on the same rhythm and edges line up.
 */
export type Space = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export declare const SPACE: Readonly<Record<Space, string>>;
export declare const space: (step: Space | undefined) => string | undefined;
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export declare const justifyValue: (j: Justify | undefined) => string | undefined;
export declare const alignValue: (a: Align | undefined) => string | undefined;
/** Breakpoints a horizontal layout can fold at (matching the page shell's own). */
export type Breakpoint = 'sm' | 'md' | 'lg';
/** The four depth layers of the design (see "Introduction/Layers"). */
export type LayerLevel = 'ground' | 'panel' | 'selected' | 'front';
/** Elements a layout container may render as. */
export type LayoutTag = 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav' | 'main' | 'form' | 'ul' | 'ol' | 'li' | 'fieldset' | 'search';
