import { prefersReducedMotion } from '../../utils/motion';
/**
 * The changed-value cue: a short glow (`bb-changed`) on an element whenever the value it shows
 * changes — never on the first render, never under reduced motion.
 *
 *   <span use:changeCue={formatted}>{formatted}</span>
 */
export function flashChanged(node) {
    if (prefersReducedMotion())
        return;
    node.style.animation = 'none';
    // Reading layout restarts the animation when the value changes again while it still runs.
    void node.offsetWidth;
    node.style.animation = 'bb-changed var(--motion-lazy) var(--ease-out)';
}
export function changeCue(node, value) {
    let last = value;
    return {
        update(next) {
            if (Object.is(next, last))
                return;
            last = next;
            flashChanged(node);
        },
    };
}
