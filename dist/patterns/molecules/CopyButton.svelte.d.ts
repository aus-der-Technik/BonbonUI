/**
   * CopyButton molecule — copies `value` to the clipboard and confirms at the control for two
   * seconds: a tick and "Copied" with a pinch of sprinkles, or a red "Copy failed" when the
   * browser refuses; both announced politely.
   * With `children` the given text itself becomes the trigger (e.g. click an ID to copy it),
   * styled as an inline link, and the outcome appears as a small note right after it; `oncopy`
   * reports the outcome to the page.
   *
   * `value` may be a function, read at the moment of the click, for values that change while the
   * button is on screen (the link to the section in view). `variant` and `icon` dress the button
   * for where it sits: `ghost` with `icon="link"` is a floating "copy link" key. Icon-only, it
   * names itself and says the outcome in a tooltip (`hint`), so sighted users read "Copied" at
   * the control too. `sprinkles={false}` keeps a quiet surface quiet.
   *
   *   <CopyButton value={token} iconOnly />
   *   <CopyButton value={id}>{id}</CopyButton>
   *   <CopyButton value={() => location.href} variant="ghost" icon="link" iconOnly label="Copy link" />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
interface Props {
    /** What is copied; a function is read at the moment of the click. */
    value: string | (() => string);
    label?: string;
    copiedLabel?: string;
    failedLabel?: string;
    iconOnly?: boolean;
    size?: 'xs' | 'sm' | 'md';
    /** The button's look; `ghost` or `glass` float as glass inside a front layer. */
    variant?: 'secondary' | 'ghost' | 'glass' | 'plain' | 'soft';
    /** The icon before anything was copied, e.g. `link` for a "copy link" key. */
    icon?: IconName;
    /** Icon-only: a tooltip with the label, then the outcome. */
    hint?: boolean;
    tooltipPlacement?: 'top' | 'bottom';
    tooltipAlign?: 'center' | 'start' | 'end';
    /** A pinch of sprinkles on a fresh copy. */
    sprinkles?: boolean;
    oncopy?: ((ok: boolean) => void) | undefined;
    children?: Snippet | undefined;
}
declare const CopyButton: import("svelte").Component<Props, {}, "">;
type CopyButton = ReturnType<typeof CopyButton>;
export default CopyButton;
