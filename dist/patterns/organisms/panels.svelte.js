/**
 * Panels that open beside each other (`PanelStack` + `StackPanel`): a group, then a person in
 * it. On a wide screen the panel below slides left and stays in reach; on a narrow one the new
 * panel covers it like a pushed page with "‹ Group" to go back. Which panels are open is the
 * caller's state (keep it in the address if Back should close them); this file only knows how
 * they stand.
 */
import { getContext, setContext } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';
import { innerWidth } from 'svelte/reactivity/window';
import { PHONE_QUERY } from '../../utils/device.svelte';
/** Space between two panels side by side, and around them. */
export const GAP = 12;
/** Margin in px between the panels and each edge of the window. */
export const EDGE = 8;
/** Whether the top panel and the one below fit side by side in `viewport` px. */
export function fitsBeside(widths, viewport, phone) {
    if (phone || widths.length < 2)
        return !phone;
    const [below, top] = widths.slice(-2);
    return viewport >= below + top + GAP + 2 * EDGE;
}
/**
 * Where panel `depth` stands when `top` is in front. Wide: the one below moves left by the top
 * one's width and a gap; deeper ones wait under it. Narrow: everything below steps a little left
 * and fades, the top one covers the screen.
 */
export function placement(depth, top, widths, wide) {
    if (depth >= top)
        return { x: 0, shown: true, front: true };
    const width = widths[top] ?? 0;
    if (wide)
        return { x: -(width + GAP), shown: depth === top - 1, front: false };
    return { x: -Math.round((widths[depth] ?? width) * 0.28), shown: false, front: false };
}
/**
 * What the panels of one stack know of each other. `PanelStack` makes one and provides it as
 * context; each `StackPanel` registers itself while mounted.
 */
export class Stack {
    /** The panels open now, at most one per depth. */
    entries = $state([]);
    /** Closes every panel (the `PanelStack`'s `onclose`). */
    closeAll;
    #phone = new MediaQuery(PHONE_QUERY, false);
    constructor(closeAll) {
        this.closeAll = closeAll;
    }
    /** The top two stand side by side (else the top one covers the rest). */
    get wide() {
        return fitsBeside(this.visibleWidths, innerWidth.current ?? 1440, this.#phone.current);
    }
    /** The deepest open depth, -1 when none is open. */
    get top() {
        return this.entries.reduce((max, e) => Math.max(max, e.depth), -1);
    }
    /** Widths by depth (0 for a missing level). */
    get widths() {
        const list = [];
        for (const e of this.entries)
            list[e.depth] = e.width;
        return Array.from(list, (w) => w ?? 0);
    }
    /** The widths of the panels on screen, bottom to top. */
    get visibleWidths() {
        return [...this.entries].sort((a, b) => a.depth - b.depth).map((e) => e.width);
    }
    /** The nearest open panel beneath `depth`. */
    below(depth) {
        return [...this.entries].filter((e) => e.depth < depth).sort((a, b) => b.depth - a.depth)[0];
    }
    /** Adds a panel, replacing whatever stood at its depth; returns the stored (reactive) entry. */
    register(entry) {
        this.entries = [...this.entries.filter((e) => e.depth !== entry.depth), entry];
        return this.entries.find((e) => e.depth === entry.depth);
    }
    /** Removes a panel, but only if it is still the one at `depth`. */
    unregister(depth, entry) {
        this.entries = this.entries.filter((e) => !(e.depth === depth && e === entry));
    }
    /** Closes the panel in front (Escape). */
    closeTop() {
        const top = this.top;
        this.entries.find((e) => e.depth === top)?.close();
    }
}
const KEY = Symbol('panel-stack');
/** Makes `stack` the one the `StackPanel`s below this component join. */
export const provideStack = (stack) => setContext(KEY, stack);
/** The stack this component sits in, if any. */
export const useStack = () => getContext(KEY);
