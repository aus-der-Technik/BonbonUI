<script lang="ts">
  /**
   * StatusText atom — one small live line next to a form or in a panel header: "Streaming…",
   * "Done.", "N characters" or an error. Announced politely (`danger` assertively, as an alert);
   * `busy` puts a spinner in front.
   *
   *   <StatusText tone="ok" message="Saved." />
   */
  import type { Snippet } from 'svelte';
  import Spinner from './Spinner.svelte';
  import { noticeRole, toneOf, type Tone } from '../tone';

  interface Props {
    message?: string | undefined;
    tone?:
      | Tone
      /** @deprecated Use `neutral`. */
      | 'muted'
      /** @deprecated Use `danger`. */
      | 'error';
    busy?: boolean;
    children?: Snippet | undefined;
  }

  let { message, tone = 'neutral', busy = false, children }: Props = $props();

  const shownTone = $derived(tone === 'muted' ? 'neutral' : toneOf(tone));
  const role = $derived(noticeRole(shownTone));
</script>

<span
  class="status status--{shownTone}"
  {role}
  aria-live={role === 'alert' ? 'assertive' : 'polite'}
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
  .status--neutral {
    color: var(--text-3);
  }
  .status--accent {
    color: var(--accent-ink);
  }
  .status--info {
    color: color-mix(in oklab, var(--info) var(--ink-share), var(--ink-mix));
  }
  .status--ok {
    /* Darkened in light, lightened in dark, so small text stays readable. */
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .status--warn {
    color: var(--draft);
  }
  .status--danger {
    color: var(--danger);
  }
</style>
