/**
   * Storybook-only: the frame around a live example. `stage` is a quiet hairline outline on the
   * ground (the example stays on the page's own layers, so presses and light behave as in an
   * app); `window` clips a contained Application to a fixed height, like a screen.
   */
import type { Snippet } from 'svelte';
interface Props {
    kind?: 'stage' | 'window';
    /** Window height (any CSS length). */
    height?: string;
    /** One quiet line under the example: what to try. */
    caption?: string | undefined;
    /** Stage only: how the example is placed. */
    align?: 'center' | 'start' | 'stretch';
    children: Snippet;
}
declare const IntroDemo: import("svelte").Component<Props, {}, "">;
type IntroDemo = ReturnType<typeof IntroDemo>;
export default IntroDemo;
