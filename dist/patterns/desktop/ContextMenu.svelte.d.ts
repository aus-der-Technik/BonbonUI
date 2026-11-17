/**
   * ContextMenu — the right-click menu. Wrap any content; a right click (or the Menu key /
   * Shift+F10 on a focused element inside) opens the menu at the pointer, in the top layer so
   * no glass or window clips it. Arrows move, Enter picks, Escape or a click outside closes.
   *
   *   <ContextMenu items={[{ label: 'Rename', onselect: rename }, { separator: true }, …]}>
   *     <FileGrid />
   *   </ContextMenu>
   *
   * `onopen` sees the event first; return items from it to build a menu for the clicked thing.
   * `openBelow(button)` opens `items` under a button instead (a "More" button's menu).
   */
import { type Snippet } from 'svelte';
import type { ContextMenuItem } from './shared.svelte';
interface Props {
    items?: ContextMenuItem[];
    /** Accessible name of the menu. */
    label?: string;
    /** Called on open; may return the items to show (e.g. for the right-clicked row). */
    onopen?: ((event: MouseEvent | KeyboardEvent) => ContextMenuItem[] | void | undefined) | undefined;
    onclose?: (() => void) | undefined;
    disabled?: boolean;
    children: Snippet;
}
declare const ContextMenu: import("svelte").Component<Props, {
    openBelow: (anchor: Element) => void;
    isOpen: () => boolean;
}, "">;
type ContextMenu = ReturnType<typeof ContextMenu>;
export default ContextMenu;
