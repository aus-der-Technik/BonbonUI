/**
 * What the screen is like right now, for layouts that change on a phone — and the same facts
 * written onto `<html>` for CSS.
 *
 *   const screen = new Viewport();   screen.phone, screen.touch, screen.keyboard, screen.visible
 *   onMount(() => watchDevice());    --visible-height, --keyboard and data-typing on <html>
 *
 * The on-screen keyboard comes from `visualViewport`: iOS and Android shrink the visual viewport,
 * not the layout one, so `position: fixed; bottom: 0` would sit behind the keys. A bar that rides
 * on the keys uses `bottom: var(--keyboard, 0px)` (or `screen.keyboard` px). BonbonUI's sheets,
 * the Dialog and the BottomBar read these variables and fall back to sensible values without them.
 */
/** A phone: narrow (≤ 720 px). The one breakpoint every phone rule in BonbonUI shares. */
export const PHONE_QUERY = '(max-width: 720px)';
/** A finger, not a mouse: no hover, bigger targets. */
export const TOUCH_QUERY = '(pointer: coarse)';
/** Below this many covered pixels it is the browser's own bars coming and going, not a keyboard. */
const KEYBOARD_MIN = 80;
/** Pixels of the bottom the on-screen keyboard covers (0 when down or when the page is resized for it). */
export function keyboardInset(win = window) {
    const vv = win.visualViewport;
    if (!vv)
        return 0;
    const covered = Math.max(0, Math.round(win.innerHeight - vv.height - vv.offsetTop));
    return covered > KEYBOARD_MIN ? covered : 0;
}
/** Whether `el` takes typed text (the keyboard comes up for it). */
export function takesText(el) {
    if (el instanceof HTMLTextAreaElement)
        return !el.readOnly;
    if (el instanceof HTMLInputElement) {
        return (!el.readOnly &&
            !/^(checkbox|radio|range|color|button|submit|reset|file|date|time|datetime-local|month|week|image|hidden)$/.test(el.type));
    }
    return el instanceof HTMLElement && el.isContentEditable;
}
/**
 * Reactive screen facts. Make one where a component lays out differently on a phone; `destroy()`
 * stops listening (a page-long one never needs to).
 */
export class Viewport {
    /** Narrow (≤ 720 px): one column, sheets instead of side panels. */
    phone = $state(false);
    /** A finger (`pointer: coarse`): no hover, 44 px targets. */
    touch = $state(false);
    /** Pixels of the bottom the on-screen keyboard covers. */
    keyboard = $state(0);
    /** The height that is really visible (the visual viewport). */
    visible = $state(0);
    #stop = () => { };
    constructor() {
        if (typeof window === 'undefined' || typeof matchMedia !== 'function')
            return;
        const narrow = matchMedia(PHONE_QUERY);
        const coarse = matchMedia(TOUCH_QUERY);
        const read = () => {
            this.phone = narrow.matches;
            this.touch = coarse.matches;
        };
        const measure = () => {
            this.visible = Math.round(window.visualViewport?.height ?? window.innerHeight);
            this.keyboard = keyboardInset();
        };
        read();
        measure();
        const vv = window.visualViewport;
        narrow.addEventListener('change', read);
        coarse.addEventListener('change', read);
        vv?.addEventListener('resize', measure);
        vv?.addEventListener('scroll', measure);
        window.addEventListener('resize', measure);
        this.#stop = () => {
            narrow.removeEventListener('change', read);
            coarse.removeEventListener('change', read);
            vv?.removeEventListener('resize', measure);
            vv?.removeEventListener('scroll', measure);
            window.removeEventListener('resize', measure);
        };
    }
    /** Stops listening. */
    destroy() {
        this.#stop();
    }
}
/**
 * Writes the screen facts onto `root` for CSS and keeps them current; returns the cleanup.
 *
 *   --visible-height  the visible height (smaller while the keyboard is up)
 *   --keyboard        px of the bottom the keyboard covers
 *   data-typing       a text field has focus on a phone: bottom bars step aside, shells take
 *                     `--visible-height`, so a composer sits right above the keys
 */
export function watchDevice(options = {}) {
    const root = options.root ?? document.documentElement;
    if (options.capFocusZoom ?? true) {
        const ios = /iP(hone|ad|od)/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const meta = document.querySelector('meta[name="viewport"]');
        if (ios && meta && !meta.content.includes('maximum-scale'))
            meta.content += ', maximum-scale=1';
    }
    const phone = matchMedia(`${PHONE_QUERY} and ${TOUCH_QUERY}`);
    const measure = () => {
        root.style.setProperty('--visible-height', `${Math.round(window.visualViewport?.height ?? window.innerHeight)}px`);
        root.style.setProperty('--keyboard', `${keyboardInset()}px`);
    };
    const typing = () => root.toggleAttribute('data-typing', phone.matches && takesText(document.activeElement));
    // Focus moving between two fields passes through the body: decide once it has landed.
    const focusout = () => setTimeout(typing, 0);
    measure();
    typing();
    const vv = window.visualViewport;
    vv?.addEventListener('resize', measure);
    vv?.addEventListener('scroll', measure);
    window.addEventListener('resize', measure);
    document.addEventListener('focusin', typing);
    document.addEventListener('focusout', focusout);
    phone.addEventListener('change', typing);
    return () => {
        vv?.removeEventListener('resize', measure);
        vv?.removeEventListener('scroll', measure);
        window.removeEventListener('resize', measure);
        document.removeEventListener('focusin', typing);
        document.removeEventListener('focusout', focusout);
        phone.removeEventListener('change', typing);
        root.style.removeProperty('--visible-height');
        root.style.removeProperty('--keyboard');
        root.removeAttribute('data-typing');
    };
}
