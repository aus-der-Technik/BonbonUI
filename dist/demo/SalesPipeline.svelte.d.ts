interface Props {
    /** Whose deals to show. */
    view?: 'everyone' | 'mine';
    /** A deal to open on start, e.g. `d9`. */
    open?: string | undefined;
    /** Starts with an empty pipeline (a fresh quarter). */
    empty?: boolean;
}
declare const SalesPipeline: import("svelte").Component<Props, {}, "">;
type SalesPipeline = ReturnType<typeof SalesPipeline>;
export default SalesPipeline;
