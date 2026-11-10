interface Props {
    active?: boolean;
    label?: string;
    /** Block clicks on the content underneath. */
    blocking?: boolean;
}
declare const LoadingOverlay: import("svelte").Component<Props, {}, "">;
type LoadingOverlay = ReturnType<typeof LoadingOverlay>;
export default LoadingOverlay;
