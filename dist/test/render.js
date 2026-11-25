// Test helper: mounts a component into a fresh host and unmounts everything after each test.
import { flushSync, mount, unmount } from 'svelte';
import { createRawSnippet } from 'svelte';
const mounted = [];
// Browsers mark the rejection of a cancelled animation's `finished` as handled; happy-dom does
// not, so unmounting a component mid-transition (Svelte cancels it) would be reported as an
// unhandled rejection.
const animate = Element.prototype.animate;
Element.prototype.animate = function (...args) {
    const animation = animate.apply(this, args);
    animation.finished?.catch(() => { });
    return animation;
};
afterEach(() => {
    for (const { app, host } of mounted.splice(0)) {
        unmount(app);
        host.remove();
    }
});
// The props are checked against the component, not used to infer its type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(component, props) {
    const host = document.createElement('div');
    document.body.append(host);
    const app = mount(component, { target: host, props });
    flushSync();
    mounted.push({ app: app, host });
    return host;
}
/** A snippet rendering static HTML, for `children` and other snippet props. */
export function html(markup) {
    return createRawSnippet(() => ({ render: () => markup }));
}
export const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
export function key(target, keyName, init = {}) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: keyName, bubbles: true, ...init }));
    flushSync();
}
export function click(target) {
    target?.click();
    flushSync();
}
export function input(target, value) {
    const el = target;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    flushSync();
}
