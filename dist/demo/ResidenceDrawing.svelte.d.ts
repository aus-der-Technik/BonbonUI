/**
 * The Residence page's imagery: the house as an architect's line drawings instead of photos —
 * the south elevation, the ground-floor plan, section A–A and the site plan. Hairlines in the
 * text colours, cut parts filled, glass and water in the faintest tint. Strokes do not scale,
 * so the lines stay one pixel fine at any width.
 */
interface Props {
    kind: 'elevation' | 'plan' | 'section' | 'site';
    /** What the drawing shows, for screen readers. */
    label: string;
    /** The elevation's overall length, already in the chosen units. */
    length?: string | undefined;
    /** The section's ceiling height, already in the chosen units. */
    ceiling?: string | undefined;
}
declare const ResidenceDrawing: import("svelte").Component<Props, {}, "">;
type ResidenceDrawing = ReturnType<typeof ResidenceDrawing>;
export default ResidenceDrawing;
