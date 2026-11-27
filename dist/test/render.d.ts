import { type Component } from 'svelte';
import { type Snippet } from 'svelte';
export declare function render<P extends Record<string, any>>(component: Component<P>, props: NoInfer<P>): HTMLElement;
/** A snippet rendering static HTML, for `children` and other snippet props. */
export declare function html(markup: string): Snippet;
export declare const tick: () => Promise<void>;
export declare function key(target: Element, keyName: string, init?: KeyboardEventInit): void;
export declare function click(target: Element | null | undefined): void;
export declare function input(target: Element | null | undefined, value: string): void;
