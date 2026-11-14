interface Props {
    /** How the checks on the change stand when the page opens. */
    checks?: 'running' | 'passed' | 'failed';
    /** Your review so far. */
    verdict?: 'pending' | 'approved' | 'changes';
}
declare const CodeReview: import("svelte").Component<Props, {}, "">;
type CodeReview = ReturnType<typeof CodeReview>;
export default CodeReview;
