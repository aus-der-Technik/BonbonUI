/**
 * Backdrop — what the ground layer sits on: a base colour, an optional image and a soft mesh
 * of tint blobs that drifts slowly (one cycle ≈ 48s). Every colour comes from `--tint`, so
 * changing the Application's tint recolours the backdrop too. Used by Application and Page;
 * use it directly for a hero band or a window.
 */
interface Props {
    /** Base colour or any CSS background (gradient…). Default: the tinted page background. */
    color?: string | undefined;
    /** An image URL (or any CSS image), laid over the colour, covering. */
    image?: string | undefined;
    /** The tint mesh on top. */
    gradient?: boolean;
    /** Lets the mesh drift (off for `prefers-reduced-motion` anyway). */
    animate?: boolean;
    /** `fixed` stays put while the page scrolls; `contained` fills the parent only. */
    position?: 'fixed' | 'contained';
}
declare const Backdrop: import("svelte").Component<Props, {}, "">;
type Backdrop = ReturnType<typeof Backdrop>;
export default Backdrop;
