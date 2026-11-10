import type { IconName } from '../atoms/icons';
export interface SourceItem {
    id: string;
    label: string;
    icon?: IconName | undefined;
    /** Icon colour: a palette name or any CSS colour (default: the accent). */
    color?: string | undefined;
    /** A number on the right (unread, items). */
    count?: number | string | undefined;
    disabled?: boolean | undefined;
}
export interface SourceSection {
    id?: string | undefined;
    /** Small caps heading; a section without one has no header. */
    title?: string | undefined;
    items: SourceItem[];
    /** The heading folds the section. */
    collapsible?: boolean | undefined;
    /** Starts folded. */
    collapsed?: boolean | undefined;
}
interface Props {
    sections: SourceSection[];
    /** The selected item id. */
    value?: string | undefined;
    onselect?: ((item: SourceItem) => void) | undefined;
    /** Accessible name of the navigation. */
    label?: string;
}
declare const SourceList: import("svelte").Component<Props, {}, "value">;
type SourceList = ReturnType<typeof SourceList>;
export default SourceList;
