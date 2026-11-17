/**
 * Shared types and the window manager of the desktop patterns.
 *
 * `Desktop` creates a `WindowManager` and puts it in context; every `Window` inside registers
 * with it, so stacking order and focus are coordinated without the page tracking z-indexes.
 * Overlays (menus, the app jar, notifications) read the same context to position themselves
 * inside the desktop instead of the viewport.
 */
import { getContext, setContext } from 'svelte';
export const isSeparator = (entry) => 'separator' in entry;
/** Coordinates z-order and focus of the windows on one desktop. */
export class WindowManager {
    /** Window ids, back to front. */
    order = $state([]);
    /** The area windows move in (their drag bounds). */
    area = $state();
    /** The Dock, so windows can grow out of (and shrink into) their app's icon. */
    tray;
    // Where the next windows open from; bookkeeping, nothing renders from it.
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    #openers = new Map();
    #pending;
    /** The front-most window. */
    get focused() {
        return this.order.at(-1);
    }
    /** Adds a window on top. */
    register(id) {
        this.order = [...this.order.filter((w) => w !== id), id];
    }
    unregister(id) {
        this.order = this.order.filter((w) => w !== id);
    }
    /** Brings a window to the front. */
    focus(id) {
        if (this.focused !== id)
            this.register(id);
    }
    /** Stacking index of a window (1 = back). */
    z(id) {
        return this.order.indexOf(id) + 1;
    }
    /** Where the app `id` sits in the Dock (viewport coordinates), if it is there. */
    anchor(id) {
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
    openFrom(from, id) {
        const rect = from instanceof Element ? from.getBoundingClientRect() : from;
        const entry = { rect, at: Date.now() };
        if (id)
            this.#openers.set(id, entry);
        else
            this.#pending = entry;
    }
    /** Where window `id` grows from: its recorded opener (used once), else its Dock icon. */
    origin(id) {
        const fresh = (entry) => !!entry && Date.now() - entry.at < 1000;
        const own = this.#openers.get(id);
        this.#openers.delete(id);
        if (fresh(own))
            return own.rect;
        const pending = this.#pending;
        this.#pending = undefined;
        if (fresh(pending))
            return pending.rect;
        return this.anchor(id);
    }
}
const KEY = Symbol('bb-desktop');
export function setDesktop(manager) {
    return setContext(KEY, manager);
}
/** The surrounding Desktop's manager, if any. */
export function getDesktop() {
    return getContext(KEY);
}
/** Moves focus among `items` by arrow key; returns true when the key was handled. */
export function rove(event, items, orientation = 'both') {
    const at = items.indexOf(document.activeElement);
    const prev = orientation === 'vertical'
        ? ['ArrowUp']
        : orientation === 'horizontal'
            ? ['ArrowLeft']
            : ['ArrowUp', 'ArrowLeft'];
    const next = orientation === 'vertical'
        ? ['ArrowDown']
        : orientation === 'horizontal'
            ? ['ArrowRight']
            : ['ArrowDown', 'ArrowRight'];
    let target;
    if (prev.includes(event.key))
        target = at <= 0 ? items.length - 1 : at - 1;
    else if (next.includes(event.key))
        target = at + 1 >= items.length ? 0 : at + 1;
    else if (event.key === 'Home')
        target = 0;
    else if (event.key === 'End')
        target = items.length - 1;
    if (target === undefined || !items.length)
        return false;
    event.preventDefault();
    items[target]?.focus();
    return true;
}
