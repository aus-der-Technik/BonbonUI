/**
 * The changed-value cue: a short glow (`bb-changed`) on an element whenever the value it shows
 * changes — never on the first render, never under reduced motion.
 *
 *   <span use:changeCue={formatted}>{formatted}</span>
 */
export declare function flashChanged(node: HTMLElement): void;
export declare function changeCue(node: HTMLElement, value: unknown): {
    update: (next: unknown) => void;
};
/**
 * The same cue for content passed as children: the glow follows the element's text, so
 * `<KpiTile label="Open">{count}</KpiTile>` glows when `count` changes.
 */
export declare function textCue(node: HTMLElement): {
    destroy: () => void;
};
