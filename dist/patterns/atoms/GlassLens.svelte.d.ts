import { type LensOptions } from '../../utils/lens';
interface Props extends LensOptions {
    /** True while the lens is drawn; bind it to restyle the surface. */
    active?: boolean;
}
declare const GlassLens: import("svelte").Component<Props, {}, "active">;
type GlassLens = ReturnType<typeof GlassLens>;
export default GlassLens;
