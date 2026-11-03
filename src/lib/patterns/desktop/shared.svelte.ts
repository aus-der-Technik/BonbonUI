/**
 * Shared types and the window manager of the desktop patterns.
 *
 * `Desktop` creates a `WindowManager` and puts it in context; every `Window` inside registers
 * with it, so stacking order and focus are coordinated without the page tracking z-indexes.
 * Overlays (menus, the app jar, notifications) read the same context to position themselves
 * inside the desktop instead of the viewport.
 */
import { getContext, setContext } from 'svelte';
import type { IconName } from '../atoms/icons';
import type { PaletteColor } from '../atoms/palette';

/** A palette name ('blue', 'pink', …), `accent`, or any CSS colour. */
export type AppColor = PaletteColor | 'accent' | (string & {});

/** One entry of a menu bar menu or a context menu. */
export type ContextMenuItem =
  | {
      label: string;
      icon?: IconName | undefined;
      /** Shown on the right, e.g. "⌘N". */
      shortcut?: string | undefined;
      /** A check mark in front (a toggled view option). */
      checked?: boolean | undefined;
      danger?: boolean | undefined;
      disabled?: boolean | undefined;
      onselect?: (() => void) | undefined;
    }
  | { separator: true };

/** A top-level menu of the MenuBar ("File", "Edit", …). */
export interface MenuBarMenu {
  label: string;
  items: ContextMenuItem[];
}

/** An app as the Dock, the AppJar and desktop icons show it. */
export interface AppEntry {
  id: string;
  label: string;
  /** Glyph on the icon (default: the first letter of the label). */
  icon?: IconName | undefined;
  /** Icon colour: a palette name, `accent`, or any CSS colour. */
  color?: AppColor | undefined;
  /** A picture instead of the glyph. */
  src?: string | undefined;
  /** A count or short text in a red bubble ("3", "!"). */
  badge?: string | number | undefined;
  /** Group in the AppJar ("Work", "Fun"); apps without one gather at the end. */
  category?: string | undefined;
}

export interface DockApp extends AppEntry {
  /** Shows the short tint bar under the icon. */
  running?: boolean | undefined;
  /** The front app: its bar is a little longer. */
  active?: boolean | undefined;
}

export type DockEntry = DockApp | { separator: true };

/** A file or folder on the desktop surface. */
export interface DesktopIcon extends AppEntry {
  /** Grey line under the label, e.g. a size. */
  meta?: string | undefined;
  /**
   * Free placement: the icon's top-left corner in px inside the desktop area. Without both,
   * the icon joins the grid along the right edge. Phones always use the grid.
   */
  x?: number | undefined;
  y?: number | undefined;
}

/** A point inside the desktop area, in px from its top-left corner. */
export interface DesktopPoint {
  x: number;
  y: number;
}

export const isSeparator = (entry: object): entry is { separator: true } => 'separator' in entry;

/** Coordinates z-order and focus of the windows on one desktop. */
export class WindowManager {
  /** Window ids, back to front. */
  order = $state<string[]>([]);
  /** The area windows move in (their drag bounds). */
  area = $state<HTMLElement | undefined>();
  /** The Dock, so windows can grow out of (and shrink into) their app's icon. */
  tray: HTMLElement | undefined;
  // Where the next windows open from; bookkeeping, nothing renders from it.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  #openers = new Map<string, { rect: DOMRect; at: number }>();
  #pending: { rect: DOMRect; at: number } | undefined;

  /** The front-most window. */
  get focused(): string | undefined {
    return this.order.at(-1);
  }

  /** Adds a window on top. */
  register(id: string): void {
    this.order = [...this.order.filter((w) => w !== id), id];
  }

  unregister(id: string): void {
    this.order = this.order.filter((w) => w !== id);
  }

  /** Brings a window to the front. */
  focus(id: string): void {
    if (this.focused !== id) this.register(id);
  }

  /** Stacking index of a window (1 = back). */
  z(id: string): number {
    return this.order.indexOf(id) + 1;
  }

  /** Where the app `id` sits in the Dock (viewport coordinates), if it is there. */
  anchor(id: string): DOMRect | undefined {
    const icon = this.tray?.querySelector(`[data-app="${CSS.escape(id)}"]`);
    return icon?.getBoundingClientRect();
  }

  /**
   * Records what opened a window — a desktop icon, a tile in the app jar, a palette row — so it
   * grows out of that place instead of the Dock. With `id`, for that window; without, for the
   * next window that opens within a second.
   *
   *   manager.openFrom(event.currentTarget, 'notes'); open('notes');
   */
  openFrom(from: Element | DOMRect, id?: string): void {
    const rect = from instanceof Element ? from.getBoundingClientRect() : from;
    const entry = { rect, at: Date.now() };
    if (id) this.#openers.set(id, entry);
    else this.#pending = entry;
  }

  /** Where window `id` grows from: its recorded opener (used once), else its Dock icon. */
  origin(id: string): DOMRect | undefined {
    const fresh = (entry: { at: number } | undefined) => !!entry && Date.now() - entry.at < 1000;
    const own = this.#openers.get(id);
    this.#openers.delete(id);
    if (fresh(own)) return own!.rect;
    const pending = this.#pending;
    this.#pending = undefined;
    if (fresh(pending)) return pending!.rect;
    return this.anchor(id);
  }
}

const KEY = Symbol('bb-desktop');

export function setDesktop(manager: WindowManager): WindowManager {
  return setContext(KEY, manager);
}

/** The surrounding Desktop's manager, if any. */
export function getDesktop(): WindowManager | undefined {
  return getContext<WindowManager | undefined>(KEY);
}

/** Moves focus among `items` by arrow key; returns true when the key was handled. */
export function rove(
  event: KeyboardEvent,
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical' | 'both' = 'both',
): boolean {
  const at = items.indexOf(document.activeElement as HTMLElement);
  const prev =
    orientation === 'vertical'
      ? ['ArrowUp']
      : orientation === 'horizontal'
        ? ['ArrowLeft']
        : ['ArrowUp', 'ArrowLeft'];
  const next =
    orientation === 'vertical'
      ? ['ArrowDown']
      : orientation === 'horizontal'
        ? ['ArrowRight']
        : ['ArrowDown', 'ArrowRight'];
  let target: number | undefined;
  if (prev.includes(event.key)) target = at <= 0 ? items.length - 1 : at - 1;
  else if (next.includes(event.key)) target = at + 1 >= items.length ? 0 : at + 1;
  else if (event.key === 'Home') target = 0;
  else if (event.key === 'End') target = items.length - 1;
  if (target === undefined || !items.length) return false;
  event.preventDefault();
  items[target]?.focus();
  return true;
}
