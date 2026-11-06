<script lang="ts">
  /**
   * DetailHeader molecule — the top of a record's detail (e.g. in a DetailPanel): a large
   * picture or initials, a badge above the title, a subtitle and a meta line (a link to the
   * record's parent, a website) and optional `actions` on the right. Its heading id names the
   * panel.
   *
   *   <DetailHeader titleId="venue-title" title="Example Hall" subtitle="Congress centre" />
   */
  import type { Snippet } from 'svelte';
  import Avatar from '../atoms/Avatar.svelte';

  interface Props {
    title: string;
    /** Id of the heading, for the panel's `aria-labelledby`. */
    titleId: string;
    /** Portrait or logo; initials when missing. */
    src?: string | undefined;
    /** The name the initials are taken from; defaults to the title. */
    initialsOf?: string | undefined;
    shape?: 'round' | 'square';
    subtitle?: string | null | undefined;
    /** Above the title, e.g. a Badge. */
    badge?: Snippet | undefined;
    /** A small muted line below the subtitle, e.g. a link to the record's parent or website. */
    meta?: Snippet | undefined;
    /** Buttons at the end of the header, e.g. "Edit". */
    actions?: Snippet | undefined;
  }

  let {
    title,
    titleId,
    src,
    initialsOf,
    shape = 'round',
    subtitle,
    badge,
    meta,
    actions,
  }: Props = $props();
</script>

<section class="identity">
  <span class="picture" class:square={shape === 'square'}
    ><Avatar name={initialsOf ?? title} {src} {shape} size={96} /></span
  >
  <div class="titles">
    {@render badge?.()}
    <h2 id={titleId}>{title}</h2>
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    {#if meta}<div class="meta">{@render meta()}</div>{/if}
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</section>

<style>
  .identity {
    display: flex;
    gap: var(--space-5);
    align-items: center;
  }
  .picture {
    flex: none;
    display: grid;
    border-radius: 50%;
    box-shadow:
      var(--glass-shadow),
      0 0 0 3px var(--pill-light);
  }
  .picture.square {
    /* Matches the square Avatar's own corner. */
    border-radius: calc(96px * 0.2);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    align-self: flex-start;
    flex-shrink: 0;
  }
  .titles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    min-width: 0;
    flex: 1;
  }
  h2 {
    margin: var(--space-1) 0 0;
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.2;
  }
  .subtitle {
    margin: 0;
    color: var(--text-2);
  }
  .meta {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  @media (max-width: 720px) {
    .identity {
      flex-wrap: wrap;
      gap: var(--space-4);
    }
  }
</style>
