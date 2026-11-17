/**
   * Card atom — a surface of the panel layer, with an optional header row.
   *
   * - `glass`   — the content card (panel layer): a solid tile, glass only over a photo. Use it
   *   for what needs a box (a table, a form, a result); most groups need `ground`.
   * - `frosted` — the denser liquid-glass surface: sign-in card, chooser tiles, dialogs.
   * - `subtle`  — a flat neutral box inside a card (e.g. a row detail).
   * - `ink`     — a near-black tile for the one figure that should stand out (an energy
   *   reading, a balance); it carries the dark theme inside, whatever the page's theme.
   * - `ground`  — no surface at all: the content sits on the ground layer (no padding unless
   *   asked for). Most groups need no box; a heading and some air separate them well enough.
   *
   * `selected` turns it into the selected layer (tinted glass, tint rim and glow) — the chosen
   * plan, the open item. `interactive` adds a hover lift for clickable cards; with `href` the
   * whole card is a link, with `onclick` a button.
   *
   * A clickable card with a `title` uses the stretched-link pattern: the title is the real button
   * (or link, when an `href` card also has `actions`) and its hit area covers the card, so the
   * heading stays a heading and the actions stay separate buttons above it. Without a title the
   * card itself is the button — keep its content plain text then.
   *
   * `title` (with `count` and an `actions` snippet) adds a header row: caps title, muted count,
   * actions on the right. `accent` draws an accent stripe on the left edge. `gap` stacks the
   * children with that gap, so a card needs no inner wrapper.
   *
   *   <Card title="Orders" count={12} gap="sm">…</Card>
   *   <Card interactive selected={plan === 'team'} onclick={() => (plan = 'team')}>…</Card>
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { type Space } from '../layout/space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    surface?: 'glass' | 'frosted' | 'subtle' | 'ground' | 'ink';
    /** Default `md`, or `none` on the ground. */
    padding?: 'none' | 'sm' | 'md' | 'lg' | undefined;
    as?: 'div' | 'section' | 'article' | 'aside' | 'li';
    title?: string | undefined;
    /** Level of the title's heading element (default 2). */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    count?: string | number | undefined;
    accent?: boolean;
    /** The selected layer: tinted glass with a tint rim. */
    selected?: boolean;
    /** Hover lift and pointer for clickable cards. Implied by `href` and `onclick`. */
    interactive?: boolean;
    /** Makes the whole card a link. */
    href?: string | undefined;
    /** Stacks the children vertically with this gap. */
    gap?: Space | undefined;
    actions?: Snippet | undefined;
    class?: string;
    children?: Snippet | undefined;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
