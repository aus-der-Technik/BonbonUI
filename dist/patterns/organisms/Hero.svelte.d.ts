/**
   * Hero organism — the opening of a website: an eyebrow pill, a big headline (part of it can
   * glow in the tint gradient), a line of text, the main actions and a picture or product shot
   * beside or below. With `backdrop` it sits on its own drifting tint mesh, as a rounded band.
   * On load the copy rises in line by line and the media follows; a linked eyebrow catches a
   * sugar-glass sheen on hover.
   *
   *   <Hero eyebrow="New" title="Ship ideas faster" highlight="faster" text="…" image={url}>
   *     {#snippet actions()}<Button variant="primary" size="xl" shape="pill" label="Start free" />{/snippet}
   *   </Hero>
   */
import type { Snippet } from 'svelte';
interface Props {
    title: string;
    /** A part of the title painted in the tint gradient. */
    highlight?: string | undefined;
    /** A small pill above the title ("New · Version 2"). */
    eyebrow?: string | undefined;
    eyebrowHref?: string | undefined;
    text?: string | undefined;
    actions?: Snippet | undefined;
    /** Picture side: a product shot, a mock-up, an illustration. */
    media?: Snippet | undefined;
    image?: string | undefined;
    imageAlt?: string;
    /** Where the media goes; `below` centres the text above it. */
    mediaPosition?: 'end' | 'start' | 'below';
    /** Text alignment; default `center` without media or with media below, else `start`. */
    align?: 'start' | 'center' | undefined;
    /** Its own tint mesh behind, as a rounded band. */
    backdrop?: boolean;
    /** Base colour / CSS background of that band. */
    background?: string | undefined;
    size?: 'md' | 'lg';
    /** Heading level (default 1: a hero is usually the page title). */
    heading?: 1 | 2;
    /** Extras under the actions: small print, a sign-up form, ratings. */
    children?: Snippet | undefined;
}
declare const Hero: import("svelte").Component<Props, {}, "">;
type Hero = ReturnType<typeof Hero>;
export default Hero;
