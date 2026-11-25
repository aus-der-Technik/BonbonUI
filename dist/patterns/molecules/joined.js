/**
 * How `Joined` finds and marks its parts — apart from the component so it can be tested.
 */
/** What counts as a part, however deep a component wraps it (a Popover's trigger, an import
 *  button in a span). */
const PART = '.btn, .search, select, [data-part]';
/** Parts with a fill of their own: they stay pills inside the capsule. */
const FILLED = '.btn:is(.btn--primary, .btn--tinted, .btn--success, .btn--danger-solid)';
/** Marks the parts (`data-joined` = first | mid | last | only) and lets their wrappers step
 *  aside (`display: contents`), so corners and hairlines follow what is visible — buttons come
 *  and go with rights and state. */
export function joinParts(node) {
    const mark = () => {
        // While the group itself is not drawn (a list hidden on a phone while something else is
        // open), every part looks gone: keep the marks as they are — unmarking then left the field
        // narrow, with its own corners, once the group was shown again.
        if (node.getClientRects().length === 0)
            return;
        const found = [...node.querySelectorAll(PART)].filter((el) => !el.closest('[popover], dialog') &&
            !el.parentElement?.closest(PART) &&
            el.getClientRects().length > 0);
        for (const el of node.querySelectorAll('[data-joined]')) {
            if (found.includes(el))
                continue;
            delete el.dataset.joined;
            el.removeAttribute('data-joined-fill');
            el.removeAttribute('data-joined-after-fill');
        }
        found.forEach((el, i) => {
            const at = found.length === 1 ? 'only' : i === 0 ? 'first' : i === found.length - 1 ? 'last' : 'mid';
            if (el.dataset.joined !== at)
                el.dataset.joined = at;
            // A filled part is its own pill: no hairline on it, nor on the part after it.
            el.toggleAttribute('data-joined-fill', el.matches(FILLED));
            el.toggleAttribute('data-joined-after-fill', i > 0 && found[i - 1].matches(FILLED));
            for (let up = el.parentElement; up && up !== node; up = up.parentElement)
                up.dataset.joinedWrap = '';
        });
    };
    mark();
    const watch = new MutationObserver(mark);
    watch.observe(node, { childList: true, subtree: true });
    // Shown again (or born hidden): what came or went meanwhile is counted when it is drawn.
    const seen = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(mark);
    seen?.observe(node);
    return () => {
        watch.disconnect();
        seen?.disconnect();
    };
}
