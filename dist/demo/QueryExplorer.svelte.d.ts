type Preset = 'by-region' | 'by-month' | 'refunds' | 'low-stock' | 'broken' | 'empty';
interface Props {
    /** The query in the editor when the page opens; it runs once on open. */
    preset?: Preset;
}
declare const QueryExplorer: import("svelte").Component<Props, {}, "">;
type QueryExplorer = ReturnType<typeof QueryExplorer>;
export default QueryExplorer;
