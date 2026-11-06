/**
   * CopyButton molecule — copies `value` to the clipboard and confirms at the control for two
   * seconds: a tick and "Copied" with a pinch of sprinkles, or a red "Copy failed" when the
   * browser refuses; both announced politely.
   * With `children` the given text itself becomes the trigger (e.g. click an ID to copy it),
   * styled as an inline link, and the outcome appears as a small note right after it; `oncopy`
   * reports the outcome to the page.
   *
   *   <CopyButton value={token} iconOnly />
   *   <CopyButton value={id}>{id}</CopyButton>
   */
import type { Snippet } from 'svelte';
interface Props {
    value: string;
    label?: string;
    copiedLabel?: string;
    failedLabel?: string;
    iconOnly?: boolean;
    size?: 'xs' | 'sm' | 'md';
    oncopy?: ((ok: boolean) => void) | undefined;
    children?: Snippet | undefined;
}
declare const CopyButton: import("svelte").Component<Props, {}, "">;
type CopyButton = ReturnType<typeof CopyButton>;
export default CopyButton;
