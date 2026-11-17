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

export interface Placement {
  /** Sideways shift in px (negative: to the left). */
  x: number;
  /** On screen and in reach (the top one, or the one beside it on a wide screen). */
  shown: boolean;
  /** The one in front: it has the keys and its close button closes only itself. */
  front: boolean;
}

/** Whether the top panel and the one below fit side by side in `viewport` px. */
export function fitsBeside(widths: number[], viewport: number, phone: boolean): boolean {
  if (phone || widths.length < 2) return !phone;
  const [below, top] = widths.slice(-2) as [number, number];
  return viewport >= below + top + GAP + 2 * EDGE;
}

/**
 * Where panel `depth` stands when `top` is in front. Wide: the one below moves left by the top
 * one's width and a gap; deeper ones wait under it. Narrow: everything below steps a little left
 * and fades, the top one covers the screen.
 */
export function placement(depth: number, top: number, widths: number[], wide: boolean): Placement {
  if (depth >= top) return { x: 0, shown: true, front: true };
  const width = widths[top] ?? 0;
  if (wide) return { x: -(width + GAP), shown: depth === top - 1, front: false };
  return { x: -Math.round((widths[depth] ?? width) * 0.28), shown: false, front: false };
}

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
export class Stack {
  /** The panels open now, at most one per depth. */
  entries = $state<StackEntry[]>([]);
  /** Closes every panel (the `PanelStack`'s `onclose`). */
  readonly closeAll: () => void;
  readonly #phone = new MediaQuery(PHONE_QUERY, false);

  constructor(closeAll: () => void) {
    this.closeAll = closeAll;
  }

  /** The top two stand side by side (else the top one covers the rest). */
  get wide(): boolean {
    return fitsBeside(this.visibleWidths, innerWidth.current ?? 1440, this.#phone.current);
  }

  /** The deepest open depth, -1 when none is open. */
  get top(): number {
    return this.entries.reduce((max, e) => Math.max(max, e.depth), -1);
  }

  /** Widths by depth (0 for a missing level). */
  get widths(): number[] {
    const list: number[] = [];
    for (const e of this.entries) list[e.depth] = e.width;
    return Array.from(list, (w) => w ?? 0);
  }

  /** The widths of the panels on screen, bottom to top. */
  get visibleWidths(): number[] {
    return [...this.entries].sort((a, b) => a.depth - b.depth).map((e) => e.width);
  }

  /** The nearest open panel beneath `depth`. */
  below(depth: number): StackEntry | undefined {
    return [...this.entries].filter((e) => e.depth < depth).sort((a, b) => b.depth - a.depth)[0];
  }

  /** Adds a panel, replacing whatever stood at its depth; returns the stored (reactive) entry. */
  register(entry: StackEntry): StackEntry {
    this.entries = [...this.entries.filter((e) => e.depth !== entry.depth), entry];
    return this.entries.find((e) => e.depth === entry.depth)!;
  }

  /** Removes a panel, but only if it is still the one at `depth`. */
  unregister(depth: number, entry: StackEntry) {
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
export const provideStack = (stack: Stack) => setContext(KEY, stack);
/** The stack this component sits in, if any. */
export const useStack = (): Stack | undefined => getContext<Stack | undefined>(KEY);
