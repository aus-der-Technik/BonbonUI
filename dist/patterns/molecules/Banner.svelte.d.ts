/**
   * Banner molecule — a page-wide announcement above the content: planned maintenance, a new
   * feature, a trial running out. Tinted glass in its tone (`solid` for a vibrant fill), an
   * icon, a title and message, optional actions and a close button. Once dismissed it is gone
   * (bind `open` or listen to `ondismiss` to remember that). Unlike Alert and Toast, which show
   * their × only with `ondismiss`, a banner hides itself, so its × is on unless
   * `dismissible={false}`. Announced as an alert only for `danger`.
   *
   *   <Banner tone="info" title="New: shared boards" message="Invite your team." ondismiss={…} />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type LegacyTone, type Tone } from '../tone';
interface Props {
    /** `error` is a deprecated alias of `danger`. */
    tone?: Tone | LegacyTone;
    variant?: 'soft' | 'solid';
    title?: string | undefined;
    message?: string | undefined;
    /** Leading icon; each tone has a default, `false` hides it (`null` too, for older callers). */
    icon?: IconName | false | null | undefined;
    open?: boolean;
    /** Shows the × button. */
    dismissible?: boolean;
    dismissLabel?: string;
    /** Buttons or links on the right. */
    actions?: Snippet | undefined;
    ondismiss?: (() => void) | undefined;
    children?: Snippet | undefined;
}
declare const Banner: import("svelte").Component<Props, {}, "open">;
type Banner = ReturnType<typeof Banner>;
export default Banner;
