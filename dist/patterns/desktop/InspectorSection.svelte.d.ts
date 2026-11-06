/**
   * InspectorSection — a titled group of InspectorRows. With `collapsible` the title folds it
   * (`open` is bindable).
   *
   *   <InspectorSection title="Sharing" collapsible>…rows…</InspectorSection>
   */
import type { Snippet } from 'svelte';
interface Props {
    title?: string | undefined;
    collapsible?: boolean;
    open?: boolean;
    children?: Snippet | undefined;
}
declare const InspectorSection: import("svelte").Component<Props, {}, "open">;
type InspectorSection = ReturnType<typeof InspectorSection>;
export default InspectorSection;
