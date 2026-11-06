/**
   * CallToAction organism — the closing band of a page: a headline, a line of text and the
   * actions, on a tinted surface that stands out from the panels around it.
   *
   * | tone     | looks like                                                     |
   * | -------- | -------------------------------------------------------------- |
   * | `tinted` | tinted glass with a soft tint glow (selected layer)            |
   * | `solid`  | a vivid tint gradient; put `glass` buttons on it               |
   * | `panel`  | plain frosted glass                                            |
   *
   *   <CallToAction title="Ready when you are" text="Start free, no card needed.">
   *     {#snippet actions()}<Button variant="primary" shape="pill" size="xl" label="Start free" />{/snippet}
   *   </CallToAction>
   */
import type { Snippet } from 'svelte';
interface Props {
    title: string;
    text?: string | undefined;
    eyebrow?: string | undefined;
    actions?: Snippet | undefined;
    tone?: 'tinted' | 'solid' | 'panel';
    /** `start` puts the actions on the right of the text on wide screens. */
    align?: 'center' | 'start';
    heading?: 2 | 3;
    /** Extras under the actions: a sign-up form, small print. */
    children?: Snippet | undefined;
}
declare const CallToAction: import("svelte").Component<Props, {}, "">;
type CallToAction = ReturnType<typeof CallToAction>;
export default CallToAction;
