interface Props {
    offset: number;
    limit: number;
    total: number;
    /** Number of items on the current page; defaults to what `limit` and `total` imply. */
    count?: number | undefined;
    previousLabel?: string;
    nextLabel?: string;
    ofLabel?: string;
    /** Accessible name of the navigation landmark. */
    label?: string;
    disabled?: boolean;
    onpage: (offset: number) => void;
}
declare const Pager: import("svelte").Component<Props, {}, "">;
type Pager = ReturnType<typeof Pager>;
export default Pager;
