/**
 * Lets the lab run its own `pressField` (with its own depth, reach and speed) inside a page
 * whose Application already runs one. Both fields skip any press under `[data-flow-off]`, and
 * both look for it all the way up the document, so a nested field cannot simply opt out of the
 * outer one. The wrapper therefore carries `data-flow-off` at rest — the outer field, which
 * hears the press first (capture on the Application root), skips it — and lifts it for the
 * moment the press travels on to the inner field, then puts it back.
 */
import { pressField } from '../../utils/flow';
export function isolatedPressField(wrapper, root, options) {
    wrapper.setAttribute('data-flow-off', '');
    let restore;
    const lift = () => {
        wrapper.removeAttribute('data-flow-off');
        clearTimeout(restore);
        // In case the event is stopped before it bubbles back up.
        restore = setTimeout(put);
    };
    const put = () => wrapper.setAttribute('data-flow-off', '');
    const events = ['pointerdown', 'keydown'];
    for (const type of events) {
        wrapper.addEventListener(type, lift, true);
        wrapper.addEventListener(type, put);
    }
    const release = pressField(root, options);
    return () => {
        release();
        clearTimeout(restore);
        for (const type of events) {
            wrapper.removeEventListener(type, lift, true);
            wrapper.removeEventListener(type, put);
        }
        wrapper.removeAttribute('data-flow-off');
    };
}
