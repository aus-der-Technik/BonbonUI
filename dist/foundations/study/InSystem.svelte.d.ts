/**
   * Storybook-only: "how BonbonUI does it" — the concrete rule a principle turns into, so every
   * idea in the study ends in something you can check in a screen. It lies on the ground under
   * a hairline; the list inside is plain prose.
   */
import type { Snippet } from 'svelte';
interface Props {
    title?: string;
    children: Snippet;
}
declare const InSystem: import("svelte").Component<Props, {}, "">;
type InSystem = ReturnType<typeof InSystem>;
export default InSystem;
