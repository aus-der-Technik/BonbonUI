interface Props {
    /** The run whose steps and log are open. */
    run?: 'main' | 'failed' | 'passed';
    /** Opens with a production rollout under way. */
    deploying?: boolean;
}
declare const Deployments: import("svelte").Component<Props, {}, "">;
type Deployments = ReturnType<typeof Deployments>;
export default Deployments;
