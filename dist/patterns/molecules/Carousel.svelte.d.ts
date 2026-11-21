import type { Snippet } from 'svelte';
import { type Space } from '../layout/space';
interface Props {
    /** Accessible name of the carousel. */
    label: string;
    /** Slides visible at once on a wide screen (2 on tablets and 1 on phones at most). */
    perView?: number;
    gap?: Space;
    /** Lets the next slide peek in at the edge. */
    peek?: boolean;
    /** Shows the arrow buttons. */
    arrows?: boolean;
    /** Shows the dots under the slides. */
    dots?: boolean;
    /** Wraps from the last slide to the first. */
    loop?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    slideLabel?: (position: number, total: number) => string;
    /** Index of the first fully visible slide. */
    index?: number;
    onchange?: ((index: number) => void) | undefined;
    children: Snippet;
}
declare const Carousel: import("svelte").Component<Props, {
    goTo: (target: number) => void;
}, "index">;
type Carousel = ReturnType<typeof Carousel>;
export default Carousel;
