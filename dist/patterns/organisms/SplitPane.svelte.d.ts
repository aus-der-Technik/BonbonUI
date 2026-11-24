/**
   * SplitPane organism — two panes side by side on one card, each with its own header strip
   * (a source and its translation, a request and its response). With `onswap` a round swap
   * button sits between the headers — a liquid-glass bead that turns on hover. Stacks below 760px.
   *
   *   <SplitPane label="Translator" onswap={swap}>
   *     {#snippet start()}…{/snippet}{#snippet end()}…{/snippet}
   *   </SplitPane>
   */
import type { Snippet } from 'svelte';
interface Props {
    label?: string | undefined;
    startHeader?: Snippet | undefined;
    endHeader?: Snippet | undefined;
    start: Snippet;
    end: Snippet;
    swapLabel?: string;
    swapDisabled?: boolean;
    onswap?: (() => void) | undefined;
    minHeight?: string;
}
declare const SplitPane: import("svelte").Component<Props, {}, "">;
type SplitPane = ReturnType<typeof SplitPane>;
export default SplitPane;
