/**
   * Storybook-only: a live example with its code underneath. The example is a real component;
   * `source` is the same file imported with `?raw`, shown as an app writes it (see `source.ts`),
   * so what you read is what runs.
   */
import type { Snippet } from 'svelte';
interface Props {
    /** The example's file, imported with `?raw`. */
    source: string;
    /** The file name over the code. */
    label: string;
    /** `window`: a screen of its own (a contained Application); `stage`: on the page itself. */
    kind?: 'window' | 'stage';
    /** Window height (any CSS length). */
    height?: string;
    /** Window only: the tint of its Application. */
    tint?: string | undefined;
    caption?: string | undefined;
    children: Snippet;
}
declare const LiveExample: import("svelte").Component<Props, {}, "">;
type LiveExample = ReturnType<typeof LiveExample>;
export default LiveExample;
