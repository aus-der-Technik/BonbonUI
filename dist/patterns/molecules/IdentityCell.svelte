<script lang="ts">
  /**
   * IdentityCell molecule — who or what a row is about: picture (or initials), name with an
   * optional badge, and a muted line below. For the first column of a DataTable or the leading
   * part of a list row.
   *
   *   <IdentityCell name="Jane Doe" subtitle="jane.doe@example.com" />
   */
  import type { Snippet } from 'svelte';
  import Avatar from '../atoms/Avatar.svelte';

  interface Props {
    name: string;
    /** Portrait or logo; initials when missing. */
    src?: string | undefined;
    /** The name the initials are taken from, e.g. without an academic title. */
    initialsOf?: string | undefined;
    shape?: 'round' | 'square';
    subtitle?: string | null | undefined;
    /** Keeps the subtitle to one line. */
    clamp?: boolean;
    size?: number;
    /** After the name, e.g. a Badge. */
    badge?: Snippet | undefined;
  }

  let {
    name,
    src,
    initialsOf,
    shape = 'round',
    subtitle,
    clamp = false,
    size = 36,
    badge,
  }: Props = $props();
</script>

<span class="identity">
  <Avatar name={initialsOf ?? name} {src} {shape} {size} />
  <span class="text">
    <span class="name">{name}{@render badge?.()}</span>
    {#if subtitle}<span class="subtitle" class:clamp>{subtitle}</span>{/if}
  </span>
</span>

<style>
  .identity {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
  }
  .name {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.3;
  }
  .subtitle {
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: 1.35;
  }
  .clamp {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
