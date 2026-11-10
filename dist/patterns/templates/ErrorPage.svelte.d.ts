/**
   * ErrorPage template — a whole page for 404s, 403s and 500s: big status code, reason, an
   * optional description and illustration, then "Go back" (history) and an optional home link.
   * The code is set huge in a candy gradient of the tint; the illustration floats gently.
   * Without a `title` the common codes get a short default (404: "This page took a coffee
   * break."); every other text is plain and says what to do.
   *
   *   <ErrorPage code={404} homeHref="/" />
   */
import type { Snippet } from 'svelte';
interface Props {
    code: number | string;
    /** Defaults to a short line for the code (see `defaultTitles`). */
    title?: string | undefined;
    /** Overrides the default titles per code. */
    titles?: Record<string, string> | undefined;
    description?: string | undefined;
    /** An image URL; or pass the `illustration` snippet. */
    image?: string | undefined;
    imageAlt?: string;
    backLabel?: string;
    homeHref?: string | undefined;
    homeLabel?: string;
    onback?: (() => void) | undefined;
    illustration?: Snippet | undefined;
    children?: Snippet | undefined;
}
declare const ErrorPage: import("svelte").Component<Props, {}, "">;
type ErrorPage = ReturnType<typeof ErrorPage>;
export default ErrorPage;
