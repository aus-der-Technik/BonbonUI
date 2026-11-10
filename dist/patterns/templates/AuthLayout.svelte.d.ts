/**
   * AuthLayout template — the frame of sign-in, sign-out, activation and error pages: a
   * full-screen background (a photo or gradient via `background`, else the Application's tinted
   * backdrop), a sticky liquid-glass top bar with logo and an optional clock, the content
   * centred, footer links at the bottom. With `card` the content sits on a liquid-glass card
   * that eases in and gives a polite head-shake when `shake` turns true (a wrong password).
   * `greeting` adds a friendly time-of-day line to the top bar ("Good morning"; the wink of
   * the moment shows on hover) — pass `true` or your own text.
   *
   *   <AuthLayout title="Sign in" clock links={[{ label: 'Privacy', href: '/privacy' }]}>
   *     <SignInCard … />
   *   </AuthLayout>
   */
import type { Snippet } from 'svelte';
interface FooterLink {
    label: string;
    href: string;
}
interface Props {
    /** Text beside the brand bar in the top bar (ignored with a `logo`). */
    title?: string | undefined;
    /** Any CSS background-image value, e.g. `url(/bg.jpg)` or an `image-set(…)`. */
    background?: string | undefined;
    clock?: boolean;
    /** A friendly greeting in the top bar: `true` for the time of day, or your own text. */
    greeting?: boolean | string | undefined;
    /** Locale of the clock; default: the browser's. */
    locale?: string | undefined;
    card?: boolean;
    shake?: boolean;
    cardWidth?: string;
    links?: FooterLink[];
    /** Accessible name of the footer link list. */
    linksLabel?: string;
    logo?: Snippet | undefined;
    children: Snippet;
}
declare const AuthLayout: import("svelte").Component<Props, {}, "">;
type AuthLayout = ReturnType<typeof AuthLayout>;
export default AuthLayout;
