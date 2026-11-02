<script lang="ts">
  /**
   * StatusText atom — one small live line next to a form or in a panel header: "Streaming…",
   * "Done.", "N characters" or an error. Announced politely (errors assertively); `busy` puts a
   * spinner in front.
   *
   *   <StatusText tone="ok" message="Saved." />
   */
  import type { Snippet } from 'svelte';
  import Spinner from './Spinner.svelte';

  interface Props {
    message?: string | undefined;
    tone?: 'muted' | 'ok' | 'warn' | 'error';
    busy?: boolean;
    children?: Snippet | undefined;
  }

  let { message, tone = 'muted', busy = false, children }: Props = $props();
</script>

<span
  class="status status--{tone}"
  role={tone === 'error' ? 'alert' : 'status'}
  aria-live={tone === 'error' ? 'assertive' : 'polite'}
>
  {#if busy}<Spinner size={12} label="" />{/if}
  {#if children}{@render children()}{:else}{message ?? ''}{/if}
</span>

<style>
  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 1.2em;
    font-size: var(--fs-sm);
  }
  .status--muted {
    color: var(--text-3);
  }
  .status--ok {
    /* Darkened in light, lightened in dark, so small text stays readable. */
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .status--warn {
    color: var(--draft);
  }
  .status--error {
    color: var(--danger);
  }
</style>
