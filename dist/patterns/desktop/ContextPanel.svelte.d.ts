/**
   * ContextPanel — the right-click panel: like ContextMenu, but it holds content instead of a
   * list of items (an in-place edit form, a comment thread), at the pointer. Right-click (or
   * the Menu key / Shift+F10 on a focused element) inside `children`: `onopen` gets the event
   * and returns the thing under the pointer; nothing (null / undefined) leaves the browser's own
   * menu alone. The `panel` snippet renders that target with a `close` function.
   *
   *   <ContextPanel onopen={(event) => rowAt(event)} label="Rename">
   *     {#snippet panel(row, close)}<RenameForm {row} ondone={close} />{/snippet}
   *     <FileList />
   *   </ContextPanel>
   *
   * `openAt(x, y, target)` and `openFor(element, target)` open it from a button or a marker.
   * It floats on glass in the top layer, so no panel, window or transform clips it, and stays
   * inside the viewport (flipped near an edge, sliding as it grows). It is rendered in place, so
   * it keeps the theme and tint of where it opened and the snippet is ordinary content of the
   * caller. Escape, a press outside or `close()` shut it and focus returns where it was; popups
   * opened from inside it (a Popover, a menu, a select, a dialog) do not count as outside.
   */
import { type Snippet } from 'svelte';
declare function $$render<T>(): {
    props: {
        /** Called on right-click or the menu keys: the thing to show, or nothing to stand aside. */
        onopen: (event: MouseEvent | KeyboardEvent) => T | null | undefined;
        onclose?: (() => void) | undefined;
        /** Accessible name of the panel. */
        label: string;
        /** Panel width (any CSS length); content decides when unset. */
        width?: string | undefined;
        /** Right-click and the menu keys leave the browser's menu alone; `openAt` still opens. */
        disabled?: boolean;
        /** Inner padding of the panel. */
        padding?: "none" | "sm" | "md";
        /** The panel's content for a target, with a function that closes it. */
        panel: Snippet<[T, () => void]>;
        /** The area that answers a right-click. */
        children: Snippet;
    };
    exports: {
        openAt: (x: number, y: number, target: T) => void;
        openFor: (element: Element, target: T) => void;
        close: () => void;
        isOpen: () => boolean;
    };
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "";
    exports(): {
        openAt: (x: number, y: number, target: T) => void;
        openFor: (element: Element, target: T) => void;
        close: () => void;
        isOpen: () => boolean;
    };
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const ContextPanel: $$IsomorphicComponent;
type ContextPanel<T> = InstanceType<typeof ContextPanel<T>>;
export default ContextPanel;
