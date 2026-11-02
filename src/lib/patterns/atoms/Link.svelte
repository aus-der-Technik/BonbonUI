<script lang="ts">
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
  import Icon from './Icon.svelte';

  interface Props extends Omit<HTMLAnchorAttributes, 'children' | 'class' | 'href'> {
    href?: string | null | undefined;
    external?: boolean;
    muted?: boolean;
    externalLabel?: string;
    missingLabel?: string;
    children: Snippet;
  }

  let {
    href,
    external = false,
    muted = false,
    externalLabel = '(opens in a new tab)',
    missingLabel = '(not available)',
    children,
    ...rest
  }: Props = $props();
</script>

{#if href}
  <a
    {href}
    class="link"
    class:muted
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    {...rest}
  >
    {@render children()}{#if external}<Icon name="external" size={13} /><span class="sr-only"
        >{externalLabel}</span
      >{/if}
  </a>
{:else}
  <span class="link missing">{@render children()}<span class="sr-only">{missingLabel}</span></span>
{/if}

<style>
  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    color: var(--accent-ink);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    transition:
      color var(--motion-quick) var(--ease-out),
      text-decoration-color var(--motion-quick) var(--ease-out);
  }
  /* Hover firms up the underline; the ink stays readable in both themes. */
  .link:hover {
    text-decoration-color: currentColor;
  }
  .muted {
    color: var(--text-2);
  }
  .missing,
  .missing:hover {
    color: var(--text-3);
    text-decoration: line-through;
    cursor: default;
  }
  .link:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
