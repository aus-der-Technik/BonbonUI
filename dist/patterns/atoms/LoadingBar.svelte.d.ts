/**
 * LoadingBar atom — a thin track under a toolbar with a small candy pill gliding along it while
 * a request runs.
 *
 *   <LoadingBar active={loading} />
 */
interface Props {
    active?: boolean;
    label?: string;
}
declare const LoadingBar: import("svelte").Component<Props, {}, "">;
type LoadingBar = ReturnType<typeof LoadingBar>;
export default LoadingBar;
