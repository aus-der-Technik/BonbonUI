/** Space between two panels side by side, and around them. */
export declare const GAP = 12;
/** Margin in px between the panels and each edge of the window. */
export declare const EDGE = 8;
export interface Placement {
    /** Sideways shift in px (negative: to the left). */
    x: number;
    /** On screen and in reach (the top one, or the one beside it on a wide screen). */
    shown: boolean;
    /** The one in front: it has the keys and its close button closes only itself. */
    front: boolean;
}
/** Whether the top panel and the one below fit side by side in `viewport` px. */
export declare function fitsBeside(widths: number[], viewport: number, phone: boolean): boolean;
/**
 * Where panel `depth` stands when `top` is in front. Wide: the one below moves left by the top
 * one's width and a gap; deeper ones wait under it. Narrow: everything below steps a little left
 * and fades, the top one covers the screen.
 */
export declare function placement(depth: number, top: number, widths: number[], wide: boolean): Placement;
/** One panel registered with its stack. */
export interface StackEntry {
    /** 0 for the bottom panel, 1 for the one beside it, … */
    depth: number;
    /** Its heading, shown as "‹ {title}" on the panel that covers it. */
    title: string;
    /** Its width in px, as measured. */
    width: number;
    /** Closes only this panel. */
    close: () => void;
    /** The panel's element, once mounted. */
    element: HTMLElement | undefined;
}
/**
 * What the panels of one stack know of each other. `PanelStack` makes one and provides it as
 * context; each `StackPanel` registers itself while mounted.
 */
export declare class Stack {
    #private;
    /** The panels open now, at most one per depth. */
    entries: StackEntry[];
    /** Closes every panel (the `PanelStack`'s `onclose`). */
    readonly closeAll: () => void;
    constructor(closeAll: () => void);
    /** The top two stand side by side (else the top one covers the rest). */
    get wide(): boolean;
    /** The deepest open depth, -1 when none is open. */
    get top(): number;
    /** Widths by depth (0 for a missing level). */
    get widths(): number[];
    /** The widths of the panels on screen, bottom to top. */
    get visibleWidths(): number[];
    /** The nearest open panel beneath `depth`. */
    below(depth: number): StackEntry | undefined;
    /** Adds a panel, replacing whatever stood at its depth; returns the stored (reactive) entry. */
    register(entry: StackEntry): StackEntry;
    /** Removes a panel, but only if it is still the one at `depth`. */
    unregister(depth: number, entry: StackEntry): void;
    /** Closes the panel in front (Escape). */
    closeTop(): void;
}
/** Makes `stack` the one the `StackPanel`s below this component join. */
export declare const provideStack: (stack: Stack) => Stack;
/** The stack this component sits in, if any. */
export declare const useStack: () => Stack | undefined;
