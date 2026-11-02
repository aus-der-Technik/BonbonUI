// Test helper: mounts a component into a fresh host and unmounts everything after each test.
import { flushSync, mount, unmount, type Component } from 'svelte';
import { createRawSnippet, type Snippet } from 'svelte';

const mounted: { app: Record<string, unknown>; host: HTMLElement }[] = [];

afterEach(() => {
  for (const { app, host } of mounted.splice(0)) {
    unmount(app);
    host.remove();
  }
});

// The props are checked against the component, not used to infer its type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render<P extends Record<string, any>>(
  component: Component<P>,
  props: NoInfer<P>,
): HTMLElement {
  const host = document.createElement('div');
  document.body.append(host);
  const app = mount(component, { target: host, props });
  flushSync();
  mounted.push({ app: app as Record<string, unknown>, host });
  return host;
}

/** A snippet rendering static HTML, for `children` and other snippet props. */
export function html(markup: string): Snippet {
  return createRawSnippet(() => ({ render: () => markup }));
}

export const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export function key(target: Element, keyName: string, init: KeyboardEventInit = {}): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key: keyName, bubbles: true, ...init }));
  flushSync();
}

export function click(target: Element | null | undefined): void {
  (target as HTMLElement | null)?.click();
  flushSync();
}

export function input(target: Element | null | undefined, value: string): void {
  const el = target as HTMLInputElement;
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  flushSync();
}
