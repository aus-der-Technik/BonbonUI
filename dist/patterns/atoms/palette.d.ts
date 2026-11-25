/**
 * The candy system palette as a prop vocabulary. Components that take a `color` accept one of
 * these names (resolved to its `--color-*` token, so light and dark both look right) or any CSS
 * colour.
 */
export declare const paletteColors: readonly ["red", "orange", "yellow", "green", "mint", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "gray"];
export type PaletteColor = (typeof paletteColors)[number];
export declare const isPaletteColor: (value: unknown) => value is PaletteColor;
/** A palette name becomes its token; any other CSS colour passes through unchanged. */
export declare function colorValue(color: string | undefined): string | undefined;
/** A stable palette colour for a name, e.g. for avatars or category chips without a set colour. */
export declare function paletteFor(key: string): PaletteColor;
