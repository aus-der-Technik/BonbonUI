import type { IconName } from '../atoms/icons';
export interface TreeNode {
    id: string;
    label: string;
    /** Default: a folder for nodes with children, a file otherwise. */
    icon?: IconName | undefined;
    /** Icon colour: a palette name or any CSS colour. */
    color?: string | undefined;
    /** Grey text on the right (a size, a count). */
    meta?: string | undefined;
    children?: TreeNode[] | undefined;
}
interface Props {
    nodes: TreeNode[];
    /** The selected node id. */
    value?: string | undefined;
    /** Ids of the open folders. */
    expanded?: string[];
    onselect?: ((node: TreeNode) => void) | undefined;
    ontoggle?: ((node: TreeNode, open: boolean) => void) | undefined;
    /** Accessible name of the tree. */
    label: string;
}
declare const TreeView: import("svelte").Component<Props, {}, "value" | "expanded">;
type TreeView = ReturnType<typeof TreeView>;
export default TreeView;
