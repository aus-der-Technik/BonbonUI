/**
   * Badge atom — a small status label.
   *
   * Semantic tones: `live` (green, with a dot: "Editable"), `ok`, `locked` (neutral grey:
   * "Read-only"), `draft` (amber), `warn`, `danger` (red: "Failed"), `info` (blue), `accent`
   * (soft tint; `variant="solid"` for a filled tint, e.g. a classification result; `brand` is the
   * deprecated name of that). Any candy palette name
   * (`blue`, `pink`, `purple`, …) works as a tone too, for categories. `color` takes any CSS
   * colour instead.
   *
   * `variant="solid"` fills the pill; `size="sm"` is the inline meta pill next to a label (a
   * version tag), `size="lg"` a headline badge.
   *
   * Shape: a badge states something, it is not pressed, so it is a rounded tag — pills are
   * reserved for things you act on (Tag with a handler, ToggleChip, Button). `shape="pill"` opts
   * back in where a pill is wanted anyway.
   *
   *   <Badge tone="live" label="Online" />   <Badge tone="purple" variant="solid" label="Pro" />
   */
import type { Snippet } from 'svelte';
import type { IconName } from './icons';
import { type PaletteColor } from './palette';
import type { Tone } from '../tone';
/** The shared tones plus the badge's own states and the candy palette. */
type BadgeTone = Tone | 'live' | 'locked' | 'draft'
/** @deprecated Use `tone="accent" variant="solid"`. */
 | 'brand' | PaletteColor;
interface Props {
    tone?: BadgeTone;
    /** `soft` (tinted background, coloured text) or `solid` (filled). */
    variant?: 'soft' | 'solid';
    /** Any CSS colour or palette name; overrides the tone's colour. */
    color?: string | undefined;
    size?: 'sm' | 'md' | 'lg';
    /** `rounded` (default: a status) or `pill`. */
    shape?: 'rounded' | 'pill';
    /** Leading dot; on by default for `live`. */
    dot?: boolean | undefined;
    icon?: IconName | undefined;
    label?: string | undefined;
    title?: string | undefined;
    children?: Snippet | undefined;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
