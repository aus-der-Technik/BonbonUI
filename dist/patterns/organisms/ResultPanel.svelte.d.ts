/**
   * ResultPanel organism — the read-only output area of a tool (an answer, a translation, a
   * response): a header with title and status, then one of four states — `empty` (placeholder),
   * `loading` (overlay over the previous result), `ready` (children), `error` (message). With
   * `copyValue` it offers a copy button once ready. Errors use the danger colour.
   *
   *   <ResultPanel {status} title="Answer" copyValue={answer}>
   *     <Markdown source={answer} />
   *   </ResultPanel>
   */
import type { Snippet } from 'svelte';
interface Props {
    status: 'empty' | 'loading' | 'ready' | 'error';
    title?: string | undefined;
    placeholder?: string;
    loadingLabel?: string;
    error?: string | undefined;
    /** Shown in the error state when `error` is empty. */
    errorFallback?: string;
    copyValue?: string | undefined;
    minHeight?: string;
    /** Right side of the header, e.g. a StatusText. */
    headerEnd?: Snippet | undefined;
    children?: Snippet | undefined;
}
declare const ResultPanel: import("svelte").Component<Props, {}, "">;
type ResultPanel = ReturnType<typeof ResultPanel>;
export default ResultPanel;
