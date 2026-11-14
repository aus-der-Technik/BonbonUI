/**
   * Inspector — the properties panel on the right of a desktop app: a header (title, subtitle,
   * an optional preview) above InspectorSections of InspectorRows (label + control). Labels and
   * controls line up in two columns; when the panel is narrow they stack.
   *
   *   <Inspector title="report.pdf" subtitle="PDF document · 2.4 MB">
   *     <InspectorSection title="General">
   *       <InspectorRow label="Kind" value="PDF document" />
   *       <InspectorRow label="Tags"><TagInput … /></InspectorRow>
   *     </InspectorSection>
   *   </Inspector>
   */
import type { Snippet } from 'svelte';
interface Props {
    title?: string | undefined;
    subtitle?: string | undefined;
    /** A thumbnail or icon above the title. */
    preview?: Snippet | undefined;
    /** Buttons under the header. */
    actions?: Snippet | undefined;
    /** Accessible name when there is no title. */
    label?: string;
    /** Draws the panel's own glass; off inside a Window that already has one. */
    surface?: boolean;
    children?: Snippet | undefined;
}
declare const Inspector: import("svelte").Component<Props, {}, "">;
type Inspector = ReturnType<typeof Inspector>;
export default Inspector;
