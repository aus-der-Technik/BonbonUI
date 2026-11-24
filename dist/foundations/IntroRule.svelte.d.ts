/** Storybook-only: one numbered rule of the design language — the rule, its reason, a live example. */
import type { Snippet } from 'svelte';
interface Props {
    n: number;
    title: string;
    /** The reason, in a sentence or three; `backticked` parts are set as code. */
    text: string;
    children?: Snippet | undefined;
}
declare const IntroRule: import("svelte").Component<Props, {}, "">;
type IntroRule = ReturnType<typeof IntroRule>;
export default IntroRule;
