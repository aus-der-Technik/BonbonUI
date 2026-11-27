/**
   * PanelStack organism — room for panels that open beside each other — a group, then a person in it. One native
   * modal `<dialog>` holds them all (the top layer, the page behind made inert), so the panel
   * below stays in reach: a click on another name there swaps the one in front. Escape closes
   * the panel in front, a click on the dimmed page closes them all. It opens with its first
   * `StackPanel` and closes after its last has left.
   *
   *   <PanelStack onclose={() => ((group = null), (person = null))}>
   *     {#if group}<StackPanel title={group.name} onclose={() => (group = null)}>…</StackPanel>{/if}
   *     {#if person}<StackPanel depth={1} title={person.name} onclose={() => (person = null)}>…</StackPanel>{/if}
   *   </PanelStack>
   *
   * Wide screens show the top two side by side; where they do not fit (always on a phone) the
   * top one covers the rest and offers "‹ {title below}". On a phone every panel is the whole
   * screen. Which panels are open is yours: keep it in the address when Back should close them.
   */
import type { Snippet } from 'svelte';
interface Props {
    /** Closes every panel (the dimmed page was clicked, or the browser closed the dialog). */
    onclose: () => void;
    /** Accessible name of the dialog. */
    label?: string;
    /** The `StackPanel`s. */
    children: Snippet;
}
declare const PanelStack: import("svelte").Component<Props, {}, "">;
type PanelStack = ReturnType<typeof PanelStack>;
export default PanelStack;
