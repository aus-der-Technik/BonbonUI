/**
   * Button atom — every button of the library behind one API, in candy glass.
   *
   * | variant        | looks like                                   | use for                        |
   * | -------------- | -------------------------------------------- | ------------------------------ |
   * | `primary`      | accent gradient with a glow                  | the one main action: "Save"    |
   * | `secondary`    | light glass, accent tint on hover            | "Cancel", pagers, filters      |
   * | `tinted`       | soft accent fill, accent text                | strong but not primary: "Add"  |
   * | `plain`        | text only, accent ink                        | inline actions, "Show more"    |
   * | `glass`        | liquid glass, accent text (when it floats)   | header and floating pills      |
   * | `ghost`        | liquid glass, neutral text (when it floats)  | "Cancel" next to a glass pill  |
   * | `soft`         | a matte soft-touch key that sinks when held  | device controls on the ground  |
   * | `success`      | green gradient                               | "Add row", confirm a good step |
   * | `danger`       | red text, red tint on hover                  | "Delete" before it is armed    |
   * | `danger-solid` | red gradient                                 | "Delete permanently"           |
   *
   * Buttons are pills by default — in this library the pill shape means "you can act on it".
   * `shape="rounded"` is for buttons that must sit flush in a dense grid (a table cell, an
   * attached input group). `collapse` drops the label to a round icon button below 720px. With
   * `href` it renders a link. `xs` buttons look 24px tall but keep a 32px hit area.
   * `aria-disabled="true"` disables a button without taking it out of the tab order — use it for
   * a button that may become unavailable right after it was pressed (a pager's "Next" on the
   * last page), so focus is not dropped to the page. `soft` keys show `aria-pressed="true"` in
   * the tint, so a round `soft` icon button is a toggle too. `shimmer` lays a slow ring of light
   * behind the button — for the one action a panel is waiting for, at most one per screen.
   *
   * Glass is for what floats, and what floats is sticky: `glass` and `ghost` are liquid glass
   * only inside a front layer or an overlay (anything marked `data-layer="front"` or
   * `data-glass`). On the ground or a panel they are soft-touch keys, like `soft`.
   *
   *   <Button variant="primary" icon="check" label="Save" onclick={save} />
   */
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { IconName } from './icons';
type Variant = 'primary' | 'secondary' | 'tinted' | 'plain' | 'danger' | 'danger-solid' | 'success' | 'glass' | 'ghost' | 'soft';
interface Props extends Omit<HTMLButtonAttributes, 'children' | 'class'> {
    variant?: Variant;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'rounded' | 'pill';
    icon?: IconName | undefined;
    /** An icon after the label, e.g. a chevron on "Next". */
    trailingIcon?: IconName | undefined;
    /** Visible text. Also the accessible name when `iconOnly`. */
    label?: string | undefined;
    /** Shows only the icon; `label` becomes `aria-label`. */
    iconOnly?: boolean;
    /** Hides the label below 720px, leaving a square icon button. */
    collapse?: boolean;
    /** Takes the full width of its container (sign-in forms, sheets on a phone). */
    block?: boolean;
    /** Spins the icon (or shows a spinner), sets `aria-busy` and swallows further clicks, so a
     *  slow submit cannot be sent twice. */
    busy?: boolean;
    /** A slow ring of light behind the button: the one action its panel is waiting for. */
    shimmer?: boolean;
    /** Label while `busy`, e.g. "Saving…". */
    busyLabel?: string | undefined;
    /** Renders an `<a>` with the same look; with `disabled` it is announced as disabled and
     *  not followed. */
    href?: string | undefined;
    /** For `href`: `_blank` opens a new tab (with `rel="noopener noreferrer"`). */
    target?: string | undefined;
    class?: string;
    /** Leading content in place of the icon, e.g. a status dot; it stays when `collapse` hides
     *  the label. */
    leading?: Snippet | undefined;
    children?: Snippet | undefined;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
