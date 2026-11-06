/**
 * Flow — the page as one body of thick water.
 *
 * What a press moves depends on what was pressed on, because the layers touch the page
 * differently:
 *
 *   glass  — floats above the page and does not touch it: the page stays still (the glass
 *            itself gives, see `squeeze` in liquid.ts). Overlays and glass over a photo too.
 *   panel  — lies on the page: the pressed panel sinks, and the panels beside it give a little,
 *            less the further away they are. The rest of the page stays still.
 *   ground — is the page: everything on it ripples outwards from the press, except the glass
 *            floating above it.
 *
 * Pressing a control sinks the page a little: the block under the finger most (a few pixels),
 * its neighbours less, and the dip travels outwards like a wave. Letting go, everything rises
 * back on a soft spring that overshoots a hair, so the page answers every press — gently, and
 * all of it together. The pressed control keeps its own squish (Button, IconButton…).
 *
 * The blocks are the children of each `<main>` (and anything marked `data-flow`); a block
 * taller than most of the screen is split into its own children, so a big app shell still
 * ripples. Only `translate` is animated, on one frame loop that runs while something moves.
 * Blocks holding a `position: fixed` element marked `data-flow-fixed` (DetailPanel, Toaster…)
 * stay still: a transform would make them jump. Off under `prefers-reduced-motion`.
 */
import { prefersReducedMotion } from './motion';
import { frameTime, step } from './spring';
import { GLASS_SELECTOR, isGlass, PANEL_SELECTOR } from './surfaces';
const INTERACTIVE = [
    'button',
    'a[href]',
    'summary',
    'label',
    'select',
    'input[type="checkbox"]',
    'input[type="radio"]',
    '[role="button"]',
    '[role="tab"]',
    '[role="option"]',
    '[role="menuitem"]',
    '[role="switch"]',
    '[role="checkbox"]',
    '[role="radio"]',
].join(',');
// Sinking: soft but direct. Rising: looser, so it floats back with a small overshoot.
const SINK = { k: 260, c: 22 };
const RISE = { k: 150, c: 9 };
const reduced = prefersReducedMotion;
const GLASS = GLASS_SELECTOR;
const PANELS = PANEL_SELECTOR;
/** Where a press lands: on glass, on a panel (which one), or on the ground. */
export function pressLayer(target) {
    const surface = target.closest(`${GLASS}, ${PANELS}`);
    if (!surface)
        return { layer: 'ground' };
    if (isGlass(surface))
        return { layer: 'glass' };
    // A panel inside glass floats with it.
    if (surface.parentElement?.closest(GLASS))
        return { layer: 'glass' };
    return { layer: 'panel', panel: surface };
}
/** A block that is (nearly all) glass floats: a ground press leaves it alone. */
function floats(el) {
    if (isGlass(el))
        return true;
    const glass = el.querySelector(GLASS);
    if (!glass)
        return false;
    const a = el.offsetWidth * el.offsetHeight;
    return a > 0 && (glass.offsetWidth * glass.offsetHeight) / a > 0.8;
}
/**
 * Is `el` in a region marked `data-flow-off` — between it and this field's own root? A region
 * marked off for an outer field can hold a press field of its own (its root is the region).
 */
function offWithin(el, root) {
    const off = el.closest('[data-flow-off]');
    return !!off && off !== root && root.contains(off);
}
/** Finds the blocks of the page inside `root`: what moves as one piece. */
export function flowBlocks(root) {
    const out = [];
    const tall = (window.innerHeight || 800) * 0.6;
    const usable = (el) => el instanceof HTMLElement &&
        !el.hasAttribute('data-flow-fixed') &&
        !el.querySelector('[data-flow-fixed]') &&
        el.offsetWidth > 0;
    const split = (parent, depth) => {
        for (const child of parent.children) {
            if (!usable(child))
                continue;
            if (depth < 3 && child.children.length > 1 && child.offsetHeight > tall)
                split(child, depth + 1);
            else
                out.push(child);
        }
    };
    // The root itself may be marked `data-flow` (querySelectorAll does not include it).
    const seeds = [
        ...(root.matches('[data-flow]') ? [root] : []),
        ...root.querySelectorAll('main, [data-flow]'),
    ];
    for (const seed of seeds) {
        if (offWithin(seed, root))
            continue;
        split(seed, 0);
    }
    return out;
}
/** Makes every press inside `root` move what it touches (see the header). Returns the cleanup. */
export function pressField(root, options = {}) {
    const depth = options.depth ?? 3;
    const reach = options.reach ?? 360;
    const speed = options.speed ?? 1.4;
    let blocks = [];
    let frame = 0;
    let last = 0;
    let pressed = false;
    const tick = (now) => {
        const dt = frameTime(now, last);
        last = now;
        let moving = false;
        for (const b of blocks) {
            const down = pressed ? now >= b.downAt : now < b.upAt && now >= b.downAt;
            const target = down ? b.amp : 0;
            b.s.to = target;
            step(b.s, target ? SINK : RISE, dt);
            const still = Math.abs(b.s.x - target) < 0.01 && Math.abs(b.s.v) < 0.05;
            if (still && !target) {
                b.s.x = 0;
                b.el.style.translate = '';
            }
            else {
                b.el.style.translate = `0 ${b.s.x.toFixed(2)}px`;
            }
            // Waiting for the wave to arrive (or to leave) counts as moving.
            if (!still || (pressed && now < b.downAt) || (!pressed && now < b.upAt))
                moving = true;
        }
        if (moving || pressed)
            frame = requestAnimationFrame(tick);
        else {
            frame = 0;
            blocks = [];
        }
    };
    const start = () => {
        if (frame)
            return;
        last = performance.now();
        frame = requestAnimationFrame(tick);
    };
    /** The pressed panel and the panels beside it, with how far each is from the press. */
    function panelGroup(panel, x, y) {
        const near = Math.max(panel.offsetWidth, panel.offsetHeight) * 0.6 + 120;
        const group = [
            { el: panel, distance: 0, share: 1 },
        ];
        const box = panel.getBoundingClientRect();
        for (const other of root.querySelectorAll(PANELS)) {
            if (other === panel || other.contains(panel) || panel.contains(other))
                continue;
            if (isGlass(other) || other.parentElement?.closest(PANELS))
                continue;
            if (other.hasAttribute('data-flow-fixed') || other.querySelector('[data-flow-fixed]'))
                continue;
            const r = other.getBoundingClientRect();
            // The gap between the two panels: neighbours are close, the rest of the page is not.
            const gap = Math.hypot(Math.max(r.left - box.right, 0, box.left - r.right), Math.max(r.top - box.bottom, 0, box.top - r.bottom));
            if (gap > near)
                continue;
            const dx = Math.max(r.left - x, 0, x - r.right);
            const dy = Math.max(r.top - y, 0, y - r.bottom);
            group.push({ el: other, distance: Math.hypot(dx, dy), share: 0.55 * (1 - gap / near) });
        }
        return group;
    }
    function press(x, y, target) {
        if (reduced())
            return;
        const where = pressLayer(target);
        // Glass does not touch the page: nothing below it moves.
        if (where.layer === 'glass')
            return;
        const now = performance.now();
        const known = new Map(blocks.map((b) => [b.el, b]));
        const vh = window.innerHeight || 800;
        blocks = [];
        const moving = where.layer === 'panel' && where.panel
            ? panelGroup(where.panel, x, y)
            : flowBlocks(root)
                .filter((el) => !floats(el))
                .map((el) => {
                const r = el.getBoundingClientRect();
                const dx = Math.max(r.left - x, 0, x - r.right);
                const dy = Math.max(r.top - y, 0, y - r.bottom);
                return { el, distance: Math.hypot(dx, dy), share: 1 };
            });
        for (const { el, distance, share } of moving) {
            const r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top > vh)
                continue;
            const prev = known.get(el);
            blocks.push({
                el,
                s: { x: prev?.s.x ?? 0, v: prev?.s.v ?? 0, to: 0 },
                amp: depth * share * Math.exp(-distance / reach),
                downAt: now + distance / speed,
                upAt: Infinity,
            });
        }
        // Blocks of the last press that are no longer found rise on their own.
        for (const [el, b] of known)
            if (!blocks.some((n) => n.el === el))
                blocks.push({ ...b, amp: 0 });
        pressed = true;
        pressPoint = { x, y };
        start();
    }
    let pressPoint = { x: 0, y: 0 };
    function release() {
        if (!pressed)
            return;
        pressed = false;
        const now = performance.now();
        for (const b of blocks) {
            const r = b.el.getBoundingClientRect();
            const dx = Math.max(r.left - pressPoint.x, 0, pressPoint.x - r.right);
            const dy = Math.max(r.top - pressPoint.y, 0, pressPoint.y - r.bottom);
            // The release travels like the press did: the near blocks rise first.
            b.upAt = Math.max(now, b.downAt) + Math.hypot(dx, dy) / speed;
        }
        start();
    }
    const onPointerDown = (event) => {
        if (event.button !== 0 || !event.isPrimary)
            return;
        const target = event.target instanceof Element ? event.target : null;
        if (!target?.closest(INTERACTIVE) || offWithin(target, root))
            return;
        press(event.clientX, event.clientY, target);
    };
    const onKeyDown = (event) => {
        if (event.repeat || (event.key !== 'Enter' && event.key !== ' '))
            return;
        const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
        if (!target || offWithin(target, root))
            return;
        const r = target.getBoundingClientRect();
        press(r.left + r.width / 2, r.top + r.height / 2, target);
    };
    root.addEventListener('pointerdown', onPointerDown, true);
    root.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('pointerup', release, true);
    window.addEventListener('pointercancel', release, true);
    window.addEventListener('keyup', release, true);
    window.addEventListener('blur', release);
    return () => {
        root.removeEventListener('pointerdown', onPointerDown, true);
        root.removeEventListener('keydown', onKeyDown, true);
        window.removeEventListener('pointerup', release, true);
        window.removeEventListener('pointercancel', release, true);
        window.removeEventListener('keyup', release, true);
        window.removeEventListener('blur', release);
        cancelAnimationFrame(frame);
        for (const b of blocks)
            b.el.style.translate = '';
    };
}
