/**
 * The spacing vocabulary of every layout helper. Seven named steps instead of free values, so
 * neighbouring elements always land on the same rhythm and edges line up.
 */
export type Space = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const SPACE: Readonly<Record<Space, string>> = {
  none: '0',
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-4)',
  lg: 'var(--space-6)',
  xl: 'var(--space-8)',
  '2xl': 'var(--space-12)',
};

export const space = (step: Space | undefined): string | undefined =>
  step === undefined ? undefined : SPACE[step];

export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const JUSTIFY: Readonly<Record<Justify, string>> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};
const ALIGN: Readonly<Record<Align, string>> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

export const justifyValue = (j: Justify | undefined): string | undefined =>
  j === undefined ? undefined : JUSTIFY[j];
export const alignValue = (a: Align | undefined): string | undefined =>
  a === undefined ? undefined : ALIGN[a];

/** Breakpoints a horizontal layout can fold at (matching the page shell's own). */
export type Breakpoint = 'sm' | 'md' | 'lg';

/** The four depth layers of the design (see "Introduction/Layers"). */
export type LayerLevel = 'ground' | 'panel' | 'selected' | 'front';

/** Elements a layout container may render as. */
export type LayoutTag =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'nav'
  | 'main'
  | 'form'
  | 'ul'
  | 'ol'
  | 'li'
  | 'fieldset'
  | 'search';
