/**
   * Link atom — an inline text link in the accent ink. `external` opens a new tab with
   * `rel="noopener noreferrer"` and marks it with an icon (and says so to screen readers).
   * Without an `href` it renders as a struck-through "missing" label, for link lists where some
   * targets may not exist (e.g. "Original" when there is no source file).
   *
   *   Read the <Link href="/docs">guide</Link>.
   */
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';
interface Props extends Omit<HTMLAnchorAttributes, 'children' | 'class' | 'href'> {
    href?: string | null | undefined;
    external?: boolean;
    muted?: boolean;
    externalLabel?: string;
    missingLabel?: string;
    children: Snippet;
}
declare const Link: import("svelte").Component<Props, {}, "">;
type Link = ReturnType<typeof Link>;
export default Link;
