/**
 * Keyboard shortcuts written once, shown the way each platform writes them.
 *
 * Write shortcuts with the neutral names `Mod` (⌘ on Apple, Ctrl elsewhere), `Alt`, `Shift`,
 * `Ctrl` and plain keys: `['Mod', 'Shift', 'Z']`. `keyLabels` turns them into what the key caps
 * show; `ariaKeyShortcuts` into the `aria-keyshortcuts` value assistive tech expects. Keys that are
 * already symbols (`⌘`, `↑`) pass through.
 */
/** Whether the shortcuts should be written the Apple way (⌘ ⌥ ⇧). */
export declare function isApplePlatform(): boolean;
/** What the key caps show for `keys` on this (or the given) platform. */
export declare function keyLabels(keys: readonly string[], apple?: boolean): string[];
/** The `aria-keyshortcuts` value for `keys`, e.g. `['Mod', 'B']` → `Meta+B` on Apple. */
export declare function ariaKeyShortcuts(keys: readonly string[], apple?: boolean): string;
