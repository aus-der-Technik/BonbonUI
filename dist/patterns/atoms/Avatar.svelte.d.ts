/**
   * Avatar atom — initials on a candy gradient disc, or a picture. With `src` it shows the image
   * and falls back to the initials when it is missing or fails to load. `square` suits logos:
   * rounded corners, the whole image contained.
   *
   * The disc follows the accent; `color` takes a palette name, or `'auto'` picks a stable
   * palette colour from the name, so a list of people gets told apart at a glance.
   *
   *   <Avatar name="jane.doe@example.com" color="auto" />
   */
import { type PaletteColor } from './palette';
interface Props {
    /** A name or e-mail address; initials are derived from it. */
    name: string;
    size?: number;
    /** A portrait or logo; the initials show while it is missing or broken. */
    src?: string | undefined;
    shape?: 'round' | 'square';
    /** Disc colour: the accent (default), a palette name, or `auto` (derived from `name`). */
    color?: 'accent' | 'auto' | PaletteColor;
}
declare const Avatar: import("svelte").Component<Props, {}, "">;
type Avatar = ReturnType<typeof Avatar>;
export default Avatar;
