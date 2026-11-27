<script lang="ts">
  /**
   * Storybook-only: the preview tile of one catalogue entry. It mounts its live preview only
   * once the tile comes near the viewport (and keeps it), so the catalogue's 176 entries never
   * render at once. The preview is inert: the card around it is the link, and nothing inside
   * takes focus or a press.
   */
  import Icon from '../../patterns/atoms/Icon.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import PreviewAtoms from './PreviewAtoms.svelte';
  import PreviewMolecules from './PreviewMolecules.svelte';
  import PreviewLarge from './PreviewLarge.svelte';
  import type { CatalogueEntry } from './catalogue';

  let { entry }: { entry: CatalogueEntry } = $props();

  let host = $state<HTMLElement>();
  let near = $state(false);

  $effect(() => {
    if (!host || near) return;
    if (typeof IntersectionObserver === 'undefined') {
      near = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near = true;
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    observer.observe(host);
    return () => observer.disconnect();
  });
</script>

{#snippet glyph()}
  <span class="glyph"><Icon name={entry.icon} size={24} /></span>
{/snippet}

<Layer level="panel" padding="none" class="explore-tile">
  <div class="stage" bind:this={host} inert data-flow-off>
    {#if near}
      {#if entry.level === 'Atoms' || entry.level === 'Layout'}
        <PreviewAtoms name={entry.name} fallback={glyph} />
      {:else if entry.level === 'Molecules'}
        <PreviewMolecules name={entry.name} fallback={glyph} />
      {:else}
        <PreviewLarge name={entry.name} fallback={glyph} />
      {/if}
    {/if}
  </div>
</Layer>

<style>
  :global(.explore-tile) {
    overflow: clip;
  }
  .stage {
    display: grid;
    place-items: center;
    height: 9rem;
    padding: var(--space-3);
    overflow: clip;
    /* Previews are small pictures of the real thing: no text selection, no pointer cursor. */
    user-select: none;
  }
  .glyph {
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    background: var(--fill-subtle);
    color: var(--text-3);
  }
</style>
