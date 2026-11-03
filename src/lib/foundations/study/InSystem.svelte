<script lang="ts">
  /**
   * Storybook-only: "how BonbonUI does it" — the concrete rule a principle turns into, so every
   * idea in the study ends in something you can check in a screen.
   */
  import type { Snippet } from 'svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';

  interface Props {
    title?: string;
    children: Snippet;
  }
  let { title = 'In BonbonUI', children }: Props = $props();
</script>

<aside class="in-system">
  <span class="mark"><Icon name="check-circle" size={18} /></span>
  <div>
    <strong>{title}</strong>
    <div class="body">{@render children()}</div>
  </div>
</aside>

<style>
  .in-system {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-3);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
  }
  .mark {
    color: var(--accent-ink);
    padding-top: 2px;
  }
  strong {
    display: block;
    margin-bottom: var(--space-1);
  }
  .body :global(p),
  .body :global(li) {
    font-size: var(--fs-sm);
    color: var(--text-2);
    line-height: 1.6;
  }
  .body :global(ul) {
    display: grid;
    gap: var(--space-1);
    padding-left: 1.1rem;
    margin: 0;
  }
</style>
