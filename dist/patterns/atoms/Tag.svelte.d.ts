import { type PaletteColor } from './palette';
import type { Tone } from '../tone';
interface Props {
    label: string;
    /** Key of a key/value tag, shown muted in front of the label. */
    name?: string | undefined;
    /** Colour dot in front of the label: a palette name or any CSS colour. */
    color?: string | undefined;
    count?: number | string | undefined;
    tone?: Tone | PaletteColor;
    mono?: boolean;
    href?: string | undefined;
    external?: boolean;
    maxWidth?: string;
    title?: string | undefined;
    removeLabel?: string;
    onremove?: (() => void) | undefined;
    onclick?: ((event: MouseEvent) => void) | undefined;
}
declare const Tag: import("svelte").Component<Props, {}, "">;
type Tag = ReturnType<typeof Tag>;
export default Tag;
