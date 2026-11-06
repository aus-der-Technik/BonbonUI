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
