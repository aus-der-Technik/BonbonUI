/**
   * InspectorRow — one property: a label on the left, its value or control on the right
   * (they stack when the Inspector is narrow). Pass `for` with the control's id so a click on
   * the label focuses it and screen readers name the control.
   *
   *   <InspectorRow label="Created" value="12 Oct 2026" />
   *   <InspectorRow label="Name" for="name"><Input id="name" bind:value={name} /></InspectorRow>
   */
import type { Snippet } from 'svelte';
interface Props {
    label: string;
    /** Plain text value (when there is no control). */
    value?: string | number | undefined;
    /** Id of the control the label belongs to. */
    for?: string | undefined;
    /** Grey help line under the control. */
    hint?: string | undefined;
    children?: Snippet | undefined;
}
declare const InspectorRow: import("svelte").Component<Props, {}, "">;
type InspectorRow = ReturnType<typeof InspectorRow>;
export default InspectorRow;
