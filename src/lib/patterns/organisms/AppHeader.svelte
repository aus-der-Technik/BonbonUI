<script lang="ts">
  /**
   * AppHeader organism — the floating header of every admin app: the title pill on the left,
   * frosted actions (picker, user menu, refresh, …) on the right. It is a front-layer element,
   * so it is always sticky (design rule); without `href` the pill scrolls back to top.
   * `fillActions` lets the actions take the room right of the title pill (a list switch beside
   * the title, a toolbar stretching to the right) and aligns the pills at the top when they wrap.
   * The title pill brings its own one-shot sugar-glass sheen on hover (as on the NavBar).
   * When room runs short (a phone, a narrow pane) the title gives way first and ends in "…";
   * the actions drop onto their own line only when they do not fit beside a short title.
   * Page renders one for you from `title` / `actions`; use it directly in your own frames.
   *
   *   <AppHeader title="Orders" subtitle="today">
   *     {#snippet actions()}<RefreshButton />{/snippet}
   *   </AppHeader>
   */
  import type { Snippet } from 'svelte';
  import TitlePill from '../molecules/TitlePill.svelte';
  import { scrollToTop } from '../../utils/motion';
  import type { LensOptions } from '../../utils/lens';

  interface Props {
    title: string;
    subtitle?: string | undefined;
    /** Makes the pill a home link instead of "back to top". */
    href?: string | undefined;
    hint?: string | undefined;
    /** A plain click on the title pill (with `href`, e.g. to go home without a reload). */
    onhome?: ((event: MouseEvent) => void) | undefined;
    /** The actions fill the width beside the title pill, starting at its side. */
    fillActions?: boolean;
    actions?: Snippet | undefined;
    /** Refraction of the title pill (see TitlePill); `false` = frosted. */
    lens?: LensOptions | false | undefined;
    /** A mark in the title pill instead of the tint bar (an app icon, a logo). */
    logo?: Snippet | undefined;
  }

  let {
    title,
    subtitle,
    href,
    hint,
    onhome,
    fillActions = false,
    actions,
    lens,
    logo,
  }: Props = $props();
</script>

<header class="hdr" data-glass>
  <div class="inner" class:fill={fillActions}>
    <div class="title">
      <TitlePill
        {title}
        {subtitle}
        {href}
        hint={hint ?? (href ? undefined : 'Back to top')}
        onclick={href ? onhome : (onhome ?? scrollToTop)}
        {lens}
        {logo}
      />
    </div>
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
  </div>
</header>

<style>
  .hdr {
    /* Front layer: always sticky. */
    position: sticky;
    top: var(--sticky-gap);
    z-index: var(--z-header);
    padding: 0 var(--gutter);
    margin-top: var(--sticky-gap);
    flex-shrink: 0;
  }
  /* Sized by its own room, not the viewport: the title starts from a short basis and shrinks
     (with an ellipsis) before the actions wrap. Once wrapped, the actions take the whole line,
     right-aligned. Both grow into the spare room, which moves nothing visible: the pill keeps
     its width and the actions sit at the end. */
  .inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
  }
  .title {
    position: relative;
    display: flex;
    flex: 1 1 8rem;
    min-width: 0;
    border-radius: var(--radius-pill);
  }
  .actions {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-end;
    gap: var(--space-2);
    align-items: center;
    min-width: 0;
  }
  .fill {
    align-items: flex-start;
  }
  .fill .title {
    flex: 0 1 auto;
  }
  .fill .actions {
    flex: 1 1 12rem;
    justify-content: flex-start;
  }
  @media (max-width: 560px) {
    /* Only a field (search, picker) stretches across the phone row; buttons keep their size,
       so a refresh button never turns into a long candy blob. */
    .actions > :global(:first-child:has(input, select, [role='combobox'])) {
      flex: 1;
    }
  }
</style>
