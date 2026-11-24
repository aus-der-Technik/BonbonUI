import type { ContextMenuItem } from './shared.svelte';
interface Props {
    items: ContextMenuItem[];
    label?: string | undefined;
    id?: string | undefined;
    /** Called after an item was picked, and on Escape (`picked` false). */
    onclose?: ((picked: boolean) => void) | undefined;
    /** Left / Right inside the menu (the MenuBar switches menus with them). */
    onside?: ((direction: -1 | 1) => void) | undefined;
    element?: HTMLDivElement | undefined;
    /** Pops in from its top-left corner, where it was opened. */
    animate?: boolean;
}
declare const MenuList: import("svelte").Component<Props, {
    focusFirst: (last?: boolean) => void;
}, "element">;
type MenuList = ReturnType<typeof MenuList>;
export default MenuList;
