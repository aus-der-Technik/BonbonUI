<script lang="ts" module>
  export interface Crumb {
    label: string;
    href?: string | undefined;
    /** For in-app navigation without a URL: the crumb becomes a button that looks like a link. */
    onclick?: ((event: MouseEvent) => void) | undefined;
  }
</script>

<script lang="ts">
  /**
   * Breadcrumbs molecule — where this page sits; the last item is the current page
   * (`aria-current="page"`). Crumbs with an `href` are links; in an app that navigates without
   * URLs give a crumb `onclick`, or the whole trail `onnavigate`, and it renders a button styled
   * like the links. They get a soft accent pill on hover; the trail wraps on narrow screens.
   *
   *   <Breadcrumbs items={[{ label: 'Settings', href: '/settings' }, { label: 'Members' }]} />
   *   <Breadcrumbs items={path} onnavigate={(item, index) => openFolder(index)} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    items: Crumb[];
    label?: string;
    /** Called for crumbs without an `href` (except the current one); they render as buttons. */
    onnavigate?: ((item: Crumb, index: number) => void) | undefined;
  }

  let { items, label = 'Breadcrumb', onnavigate }: Props = $props();
</script>

<nav aria-label={label}>
  <ol>
    {#each items as item, index (index)}
      {@const last = index === items.length - 1}
      <li>
        {#if item.href && !last}
          <a class="crumb" href={item.href} onclick={item.onclick}>{item.label}</a>
        {:else if !last && (item.onclick || onnavigate)}
          <button
            type="button"
            class="crumb"
            onclick={(event) => {
              item.onclick?.(event);
              onnavigate?.(item, index);
            }}>{item.label}</button
          >
        {:else}
          <span aria-current={last ? 'page' : undefined}>{item.label}</span>
        {/if}
        {#if !last}<Icon name="chevron-right" size={12} />{/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  li {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }
  .crumb {
    padding: 0.15rem var(--space-2);
    margin: 0 calc(-1 * var(--space-1));
    border-radius: var(--radius-pill);
    /* A button crumb must be indistinguishable from a link crumb. */
    border: 0;
    background: none;
    color: var(--text-2);
    font: inherit;
    font-weight: var(--fw-medium);
    text-decoration: none;
    line-height: inherit;
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .crumb:hover {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .crumb:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  [aria-current='page'] {
    color: var(--text);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  @media (prefers-reduced-motion: reduce) {
    .crumb {
      transition: none;
    }
  }
</style>
