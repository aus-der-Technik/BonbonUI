/**
 * Light — where it comes from and what it falls on.
 *
 * Emitters are things that are on or chosen: a primary action, the current item of a
 * navigation, a toggle that is on, the lit part of a gauge. They carry `data-emit` (`""` for
 * full light, `"soft"` for a gentle one, `"ok"` / `"danger"` for status light). Reflectors are
 * the surfaces of the layers. Each catches the light of the emitters near it, from their
 * direction, in their colour — differently by layer:
 *
 *   ground — nothing to light: the emitter's own soft halo falls onto it (its shadow).
 *   panel  — a solid tile: a little light pools around an emitter on it, and the side that
 *            faces an emitter nearby brightens. Nothing passes through.
 *   glass  — the front layer and glass over a photo: light scatters inside the pane, so the
 *            tint shines through around the emitter, wider and stronger than on a panel.
 *
 * A surface paints its light with `background: var(--light, none), <its own background>`;
 * this module writes `--light` (radial gradients) on every surface in reach, from emitter
 * positions measured on one frame loop that only runs when something changed: a mutation (a
 * selection, a drop moving, a press), a scroll or a resize. `--light` is registered as not
 * inherited, so a nested surface never shows its parent's light.
 *
 * How much light there is overall is the `--shine` token (Application `shine`, 0 to 1,
 * default 0.6): it scales this light and the glows the tokens paint (`--glow-soft`, the
 * primary action's and a lit key's glow, the selected tile's).
 */
import { SURFACE_SELECTOR, nestedPanel, surfaceKind } from './surfaces';
const EMITTERS = '[data-emit]';
/** The light of a page when nothing says otherwise; the models below are written for it. */
export const SHINE_DEFAULT = 0.6;
/** A 0…1 knob read from a custom property (`--shine`, `--wiggle`), or `fallback`. */
export function knob(el, name, fallback) {
    const value = Number.parseFloat(getComputedStyle(el).getPropertyValue(name));
    return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : fallback;
}
/** Glass scatters light wide; a panel only takes a little of it. */
export const LIGHT_MODELS = {
    glass: { inside: 30, beside: 16, spread: 3.2 },
    panel: { inside: 15, beside: 14, spread: 2.6 },
};
const COLOURS = {
    '': 'var(--accent)',
    soft: 'var(--accent)',
    ok: 'var(--ok)',
    danger: 'var(--danger)',
};
/** What kind of reflector a surface is (see `surfaces.ts`). Over a photo, panels are glass. */
export const reflectKind = surfaceKind;
/** The light one surface catches, as a CSS value for `--light` (or '' for none). */
export function lightFor(surface, rect, emitters, shine = SHINE_DEFAULT) {
    const model = LIGHT_MODELS[reflectKind(surface)];
    const gain = shine / SHINE_DEFAULT;
    const lights = [];
    for (const e of emitters) {
        const radius = e.size * model.spread;
        const on = surface.contains(e.el);
        let alpha;
        if (on)
            alpha = model.inside * e.strength * gain;
        else {
            // From beside: only the part of the surface that faces the emitter catches it.
            const dx = Math.max(rect.left - e.x, 0, e.x - rect.right);
            const dy = Math.max(rect.top - e.y, 0, e.y - rect.bottom);
            const distance = Math.hypot(dx, dy);
            if (distance >= radius * 0.9)
                continue;
            alpha = model.beside * e.strength * gain * (1 - distance / radius);
        }
        if (alpha < 0.5)
            continue;
        const x = Math.round(e.x - rect.left);
        const y = Math.round(e.y - rect.top);
        lights.push({
            alpha,
            css: `radial-gradient(circle ${Math.round(radius)}px at ${x}px ${y}px, color-mix(in srgb, ${e.colour} ${Math.min(alpha, 100).toFixed(1)}%, transparent), transparent)`,
        });
    }
    return lights
        .sort((a, b) => b.alpha - a.alpha)
        .slice(0, 3)
        .map((l) => l.css)
        .join(', ');
}
/** Lights every surface inside `root` from its emitters, and keeps it up to date. */
export function lightField(root) {
    let frame = 0;
    const lit = new Set();
    const vw = () => window.innerWidth || 1280;
    const vh = () => window.innerHeight || 800;
    const update = () => {
        frame = 0;
        const emitters = [];
        for (const el of root.querySelectorAll(EMITTERS)) {
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height || r.bottom < -200 || r.top > vh() + 200)
                continue;
            const kind = el.getAttribute('data-emit') ?? '';
            emitters.push({
                el,
                x: r.left + r.width / 2,
                y: r.top + r.height / 2,
                size: Math.max(r.width, r.height),
                strength: kind === 'soft' ? 0.55 : 1,
                colour: COLOURS[kind] ?? COLOURS[''],
            });
        }
        const seen = new Set();
        const shine = knob(root, '--shine', SHINE_DEFAULT);
        if (emitters.length && shine > 0) {
            for (const el of root.querySelectorAll(SURFACE_SELECTOR)) {
                if (nestedPanel(el))
                    continue;
                const r = el.getBoundingClientRect();
                if (!r.width || r.bottom < 0 || r.top > vh() || r.right < 0 || r.left > vw())
                    continue;
                const value = lightFor(el, r, emitters, shine);
                if (!value)
                    continue;
                seen.add(el);
                if (el.style.getPropertyValue('--light') !== value)
                    el.style.setProperty('--light', value);
            }
        }
        for (const el of lit)
            if (!seen.has(el))
                el.style.removeProperty('--light');
        lit.clear();
        for (const el of seen)
            lit.add(el);
        // Our own writes are mutations too: drop them, or the light would re-light itself forever.
        observer?.takeRecords();
    };
    const schedule = () => {
        if (!frame)
            frame = requestAnimationFrame(update);
    };
    // While a page scrolls, emitters and the surfaces they sit on move together, so the light
    // barely changes: it catches up once the scroll settles instead of re-measuring every frame.
    let settle;
    const onScroll = () => {
        clearTimeout(settle);
        settle = setTimeout(schedule, 120);
    };
    const observer = typeof MutationObserver === 'function'
        ? new MutationObserver((records) => {
            if (records.some((r) => !(r.attributeName === 'style' && lit.has(r.target))))
                schedule();
        })
        : undefined;
    observer?.observe(root, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['data-emit', 'style', 'class', 'hidden', 'open'],
    });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
        observer?.disconnect();
        window.removeEventListener('scroll', onScroll, { capture: true });
        clearTimeout(settle);
        window.removeEventListener('resize', schedule);
        cancelAnimationFrame(frame);
        for (const el of lit)
            el.style.removeProperty('--light');
    };
}
