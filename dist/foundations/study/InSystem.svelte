<script lang="ts">
  /**
   * Storybook-only: "how BonbonUI does it" — the concrete rule a principle turns into, so every
   * idea in the study ends in something you can check in a screen. It lies on the ground under
   * a hairline; the list inside is plain prose.
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
  <span class="label"><Icon name="check-circle" size={15} /> {title}</span>
  <div class="body">{@render children()}</div>
</aside>

<style>
  .in-system {
    display: grid;
    gap: var(--space-3);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-strong);
  }
  .label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
</style>
