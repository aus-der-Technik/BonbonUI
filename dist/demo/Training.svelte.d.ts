interface Props {
    /** The state the live workout opens in. */
    workout?: 'ready' | 'running' | 'paused';
    /** The weekly goal is a few kilometres away, so one more session reaches it. */
    nearGoal?: boolean;
}
declare const Training: import("svelte").Component<Props, {}, "">;
type Training = ReturnType<typeof Training>;
export default Training;
