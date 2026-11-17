import type { IconName } from '../atoms/icons';
export interface CommandItem {
    id: string;
    label: string;
    icon?: IconName | undefined;
    /** Grey text after the label. */
    description?: string | undefined;
    /** Keys shown on the right, e.g. ['⌘', 'N']. */
    shortcut?: string[] | undefined;
    /** Extra words the search matches. */
    keywords?: string[] | undefined;
    onselect?: (() => void) | undefined;
}
export interface CommandGroup {
    label: string;
    items: CommandItem[];
}
interface Props {
    open?: boolean;
    groups: CommandGroup[];
    query?: string;
    /** Called for every run command (after the item's own `onselect`). */
    onselect?: ((item: CommandItem) => void) | undefined;
    onclose?: (() => void) | undefined;
    /** ⌘K / Ctrl+K toggles the palette. */
    hotkey?: boolean;
    label?: string;
    placeholder?: string;
    emptyText?: string;
}
declare const CommandPalette: import("svelte").Component<Props, {}, "open" | "query">;
type CommandPalette = ReturnType<typeof CommandPalette>;
export default CommandPalette;
