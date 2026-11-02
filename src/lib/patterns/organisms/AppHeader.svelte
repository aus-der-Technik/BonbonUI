<script lang="ts">
  /**
   * AppHeader organism — the floating header of every admin app: the title pill on the left,
   * frosted actions (picker, user menu, refresh, …) on the right. It is a front-layer element,
   * so it is always sticky (design rule); without `href` the pill scrolls back to top.
   * `fillActions` lets the actions take the room right of the title pill (a list switch beside
   * the title, a toolbar stretching to the right) and aligns the pills at the top when they wrap.
   * The title pill brings its own one-shot sugar-glass sheen on hover (as on the NavBar).
   * Page renders one for you from `title` / `actions`; use it directly in your own frames.
   *
   *   <AppHeader title="Orders" subtitle="today">
   *     {#snippet actions()}<RefreshButton />{/snippet}
   *   </AppHeader>
   */
  import type { Snippet } from 'svelte';
  import TitlePill from '../molecules/TitlePill.svelte';
  import { scrollToTop } from '../../utils/motion';

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
  }

  let { title, subtitle, href, hint, onhome, fillActions = false, actions }: Props = $props();
</script>

<header class="hdr">
  <div class="inner" class:fill={fillActions}>
    <div class="title">
      <TitlePill
        {title}
        {subtitle}
        {href}
        hint={hint ?? (href ? undefined : 'Back to top')}
        onclick={href ? onhome : (onhome ?? scrollToTop)}
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
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .title {
    position: relative;
    display: flex;
    min-width: 0;
    border-radius: var(--radius-pill);
  }
  .actions {
    display: flex;
    gap: var(--space-2);
    align-items: center;
    min-width: 0;
  }
  .fill {
    align-items: flex-start;
  }
  .fill .actions {
    flex: 1;
    justify-content: flex-start;
  }
  @media (max-width: 560px) {
    .inner {
      flex-wrap: wrap;
    }
    .actions {
      width: 100%;
      justify-content: flex-end;
    }
    /* Only a field (search, picker) stretches across the phone row; buttons keep their size,
       so a refresh button never turns into a long candy blob. */
    .actions > :global(:first-child:has(input, select, [role='combobox'])) {
      flex: 1;
    }
  }
</style>
