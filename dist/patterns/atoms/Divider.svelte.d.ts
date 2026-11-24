/**
 * Divider atom — a hairline between sections, optionally with a centred caps label ("or").
 * Inside a Stack or Row it needs no margins: `spacing="none"` leaves the gap to the layout.
 *
 *   <Divider label="or" />
 */
interface Props {
    label?: string | undefined;
    orientation?: 'horizontal' | 'vertical';
    /** Vertical margin of a horizontal divider. */
    spacing?: 'none' | 'sm' | 'md';
}
declare const Divider: import("svelte").Component<Props, {}, "">;
type Divider = ReturnType<typeof Divider>;
export default Divider;
