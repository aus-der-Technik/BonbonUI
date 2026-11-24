/**
 * Anchored popups (menus, listboxes, popovers): one placement for all of them.
 *
 * The panel goes into the top layer (popover API) where supported and is positioned `fixed`, so
 * no scrolling or `overflow` ancestor clips it. By default it opens below its trigger and flips
 * above when there is more room there; side placements (`right-start`, `left`…) open beside the
 * trigger and flip to the other side the same way; `center` lays the panel over the trigger,
 * centred on it. It is clamped into the viewport; its height is capped to the room it has; and
 * its transform-origin sits on the edge facing the trigger, level with the trigger's centre, so it
 * visibly grows out of the thing that opened it.
 *
 * Panels can read two custom properties the helper sets: `--anchor-width` (the trigger's width,
 * for "at least as wide as the field") and `--anchor-room` (the height available on its side),
 * and `data-side` says where the panel ended up (`top`, `bottom`, `left`, `right`, `center`).
 */
const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
/** Pure placement maths: where a panel of `size` goes next to `box` in a `viewport`. */
export function computePosition(box, size, viewport, { placement = 'bottom-start', gap = 8, margin = 8 } = {}) {
    const [axis, align = 'center'] = placement.split('-');
    const fullRoom = Math.max(0, viewport.height - 2 * margin);
    const centreX = box.left + box.width / 2;
    const centreY = box.top + box.height / 2;
    if (axis === 'center') {
        const height = Math.min(size.height, fullRoom);
        const left = clamp(centreX - size.width / 2, margin, viewport.width - size.width - margin);
        const top = clamp(centreY - height / 2, margin, viewport.height - height - margin);
        const ox = Math.round(clamp(centreX - left, 0, size.width));
        const oy = Math.round(clamp(centreY - top, 0, height));
        return {
            top,
            left,
            flipped: false,
            above: false,
            side: 'center',
            origin: `${ox}px ${oy}px`,
            room: fullRoom,
        };
    }
    if (axis === 'left' || axis === 'right') {
        const roomRight = viewport.width - box.right - gap - margin;
        const roomLeft = box.left - gap - margin;
        const wantsRight = axis === 'right';
        const flipped = wantsRight
            ? roomRight < size.width && roomLeft > roomRight
            : roomLeft < size.width && roomRight > roomLeft;
        const right = wantsRight !== flipped;
        const height = Math.min(size.height, fullRoom);
        let top = align === 'start' ? box.top : align === 'end' ? box.bottom - height : centreY - height / 2;
        top = clamp(top, margin, viewport.height - height - margin);
        const left = clamp(right ? box.right + gap : box.left - gap - size.width, margin, Math.max(margin, viewport.width - size.width - margin));
        const oy = Math.round(clamp(centreY - top, 0, height));
        return {
            top,
            left,
            flipped,
            above: false,
            side: right ? 'right' : 'left',
            origin: `${right ? 'left' : 'right'} ${oy}px`,
            room: fullRoom,
        };
    }
    const wantsTop = axis === 'top';
    const roomBelow = viewport.height - box.bottom - gap - margin;
    const roomAbove = box.top - gap - margin;
    const flipped = wantsTop
        ? roomAbove < size.height && roomBelow > roomAbove
        : roomBelow < size.height && roomAbove > roomBelow;
    const above = wantsTop !== flipped;
    const room = Math.max(0, above ? roomAbove : roomBelow);
    const height = Math.min(size.height, room);
    const top = above ? box.top - gap - height : box.bottom + gap;
    let left = align === 'start'
        ? box.left
        : align === 'end'
            ? box.right - size.width
            : centreX - size.width / 2;
    left = clamp(left, margin, viewport.width - size.width - margin);
    const ox = Math.round(clamp(centreX - left, 0, size.width));
    return {
        top: Math.max(margin, top),
        left,
        flipped,
        above,
        side: above ? 'top' : 'bottom',
        origin: `${ox}px ${above ? 'bottom' : 'top'}`,
        room,
    };
}
/** Shows `panel` in the top layer where supported (it needs a `popover` attribute). */
function showInTopLayer(panel) {
    try {
        if (typeof panel.showPopover === 'function' && !panel.matches(':popover-open')) {
            panel.showPopover();
        }
    }
    catch {
        /* already shown, no popover attribute, or the API is missing: `position: fixed` remains */
    }
}
/**
 * Positions `panel` at `anchor` now and on every scroll or resize until the returned cleanup
 * runs. Call it from an effect once the panel is rendered.
 */
export function anchorTo(panel, anchor, options = {}) {
    showInTopLayer(panel);
    const place = () => {
        const box = anchor.getBoundingClientRect();
        panel.style.position = 'fixed';
        panel.style.inset = 'auto';
        panel.style.margin = '0';
        panel.style.setProperty('--anchor-width', `${box.width}px`);
        // Let the panel take its natural height before measuring; offset sizes ignore the
        // entrance animation's scale, a bounding rect would not.
        panel.style.removeProperty('--anchor-room');
        const pos = computePosition(box, { width: panel.offsetWidth, height: panel.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, options);
        panel.style.setProperty('--anchor-room', `${pos.room}px`);
        panel.style.top = `${pos.top}px`;
        panel.style.left = `${pos.left}px`;
        panel.style.transformOrigin = pos.origin;
        panel.dataset.side = pos.side;
    };
    // Scrolling the panel's own list does not move the trigger (and re-measuring would reset it).
    const onScroll = (event) => {
        if (!(event.target instanceof Node && panel.contains(event.target)))
            place();
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', onScroll, true);
    return () => {
        window.removeEventListener('resize', place);
        window.removeEventListener('scroll', onScroll, true);
    };
}
