/**
 * The component catalogue: every component the package exports (`src/lib/index.ts` and the
 * `map` entry), with its level, a one-line description taken from its doc comment, tags to
 * filter by, an icon for its preview, and the story that shows it. Hand-maintained;
 * `catalogue.test.ts` fails when an export is missing here or an entry no longer exists.
 */
import type { IconName } from '../../patterns/atoms/icons';
export declare const levels: readonly ["Atoms", "Molecules", "Organisms", "Templates", "Layout", "Desktop"];
export type Level = (typeof levels)[number];
export declare const levelBlurbs: Record<Level, string>;
export declare const tags: readonly ["form", "navigation", "data", "chart", "feedback", "overlay", "glass", "emits light", "content", "layout", "shop", "website", "collaboration", "deprecated"];
export type CatalogueTag = (typeof tags)[number];
export declare const tagBlurbs: Record<CatalogueTag, string>;
export interface CatalogueEntry {
    /** The export name. */
    name: string;
    level: Level;
    description: string;
    tags: readonly CatalogueTag[];
    /** Glyph of the preview when the component is too big or too modal to show small. */
    icon: IconName;
    /** Storybook id of the story that shows it best, or null when there is none yet. */
    story: string | null;
    /** The package entry it is imported from (default: the main one). */
    entry?: 'map';
}
export declare const catalogue: readonly CatalogueEntry[];
/** Lower-cased text an entry is found by. */
export declare const searchText: (entry: CatalogueEntry) => string;
/** The entries that match a query, a level (or all) and every one of the chosen tags. */
export declare function filterCatalogue(entries: readonly CatalogueEntry[], query: string, level: Level | 'All', chosen: readonly CatalogueTag[]): CatalogueEntry[];
/** The import line for an entry. */
export declare const importLine: (entry: CatalogueEntry) => string;
