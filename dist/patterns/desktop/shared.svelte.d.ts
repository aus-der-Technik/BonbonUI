import type { IconName } from '../atoms/icons';
import type { PaletteColor } from '../atoms/palette';
/** A palette name ('blue', 'pink', …), `accent`, or any CSS colour. */
export type AppColor = PaletteColor | 'accent' | (string & {});
/** One entry of a menu bar menu or a context menu. */
export type ContextMenuItem = {
    label: string;
    icon?: IconName | undefined;
    /** Shown on the right, e.g. "⌘N". */
    shortcut?: string | undefined;
    /** A check mark in front (a toggled view option). */
    checked?: boolean | undefined;
    danger?: boolean | undefined;
    disabled?: boolean | undefined;
    onselect?: (() => void) | undefined;
} | {
    separator: true;
};
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
export type DockEntry = DockApp | {
    separator: true;
};
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
export declare const isSeparator: (entry: object) => entry is {
    separator: true;
};
/** Coordinates z-order and focus of the windows on one desktop. */
export declare class WindowManager {
    #private;
    /** Window ids, back to front. */
    order: string[];
    /** The area windows move in (their drag bounds). */
    area: HTMLElement | undefined;
    /** The Dock, so windows can grow out of (and shrink into) their app's icon. */
    tray: HTMLElement | undefined;
    /** The front-most window. */
    get focused(): string | undefined;
    /** Adds a window on top. */
    register(id: string): void;
    unregister(id: string): void;
    /** Brings a window to the front. */
    focus(id: string): void;
    /** Stacking index of a window (1 = back). */
    z(id: string): number;
    /** Where the app `id` sits in the Dock (viewport coordinates), if it is there. */
    anchor(id: string): DOMRect | undefined;
    /**
     * Records what opened a window — a desktop icon, a tile in the app jar, a palette row — so it
     * grows out of that place instead of the Dock. With `id`, for that window; without, for the
     * next window that opens within a second.
     *
     *   manager.openFrom(event.currentTarget, 'notes'); open('notes');
     */
    openFrom(from: Element | DOMRect, id?: string): void;
    /** Where window `id` grows from: its recorded opener (used once), else its Dock icon. */
    origin(id: string): DOMRect | undefined;
}
export declare function setDesktop(manager: WindowManager): WindowManager;
/** The surrounding Desktop's manager, if any. */
export declare function getDesktop(): WindowManager | undefined;
/** Moves focus among `items` by arrow key; returns true when the key was handled. */
export declare function rove(event: KeyboardEvent, items: HTMLElement[], orientation?: 'horizontal' | 'vertical' | 'both'): boolean;
