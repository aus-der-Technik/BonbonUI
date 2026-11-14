/**
   * Widget — a square-ish glass tile for a desktop or home screen, in three sizes: `small` (a
   * square), `medium` (two squares wide) and `large` (two by two). It holds one big figure or
   * a list. The candy goes to the key number only: `figure` is set large in the widget's
   * colour, with a `caption` under it; the header stays quiet (a small coloured disc and a
   * grey title). `filled` paints the whole card — keep it for one hero tile at most. With
   * `onclick` or `href` the whole card is a control.
   *
   *   <Widget title="Weather" icon="sun" color="cyan" figure="21°" caption="Sunny · H 24°" />
   *
   * The unit is `--widget-unit` (default 10.5rem); set it on a parent to scale every widget.
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
interface Props {
    size?: 'small' | 'medium' | 'large';
    title?: string | undefined;
    icon?: IconName | undefined;
    /** Accent of the header: a palette name or any CSS colour (default: the tint). */
    color?: string | undefined;
    /** Fills the card with `color`. */
    filled?: boolean;
    /** A background image URL or CSS image behind the content. */
    image?: string | undefined;
    /** Something on the right of the header (a time, a count). */
    meta?: string | undefined;
    /** The one big number, in the widget's colour. */
    figure?: string | number | undefined;
    /** A line under the figure. */
    caption?: string | undefined;
    onclick?: (() => void) | undefined;
    href?: string | undefined;
    /** Accessible name when the card is a control (default: the title). */
    label?: string | undefined;
    class?: string;
    children?: Snippet | undefined;
}
declare const Widget: import("svelte").Component<Props, {}, "">;
type Widget = ReturnType<typeof Widget>;
export default Widget;
