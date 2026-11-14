/**
   * VisuallyHidden atom — text for assistive tech only, e.g. the meaning of an icon.
   *
   *   <Icon name="lock" /><VisuallyHidden>Read-only</VisuallyHidden>
   */
import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children: Snippet;
};
declare const VisuallyHidden: import("svelte").Component<$$ComponentProps, {}, "">;
type VisuallyHidden = ReturnType<typeof VisuallyHidden>;
export default VisuallyHidden;
