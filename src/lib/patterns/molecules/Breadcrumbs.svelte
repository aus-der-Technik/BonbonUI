<script lang="ts" module>
  export interface Crumb {
    label: string;
    href?: string;
  }
</script>

<script lang="ts">
  /**
   * Breadcrumbs molecule — where this page sits; the last item is the current page. Links get a
   * soft accent pill on hover; the trail wraps on narrow screens.
   *
   *   <Breadcrumbs items={[{ label: 'Settings', href: '/settings' }, { label: 'Members' }]} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    items: Crumb[];
    label?: string;
  }

  let { items, label = 'Breadcrumb' }: Props = $props();
</script>

<nav aria-label={label}>
  <ol>
    {#each items as item, index (index)}
      {@const last = index === items.length - 1}
      <li>
        {#if item.href && !last}
          <a href={item.href}>{item.label}</a>
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
  a {
    padding: 0.15rem var(--space-2);
    margin: 0 calc(-1 * var(--space-1));
    border-radius: var(--radius-pill);
    color: var(--text-2);
    font-weight: var(--fw-medium);
    text-decoration: none;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  a:hover {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  [aria-current='page'] {
    color: var(--text);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  @media (prefers-reduced-motion: reduce) {
    a {
      transition: none;
    }
  }
</style>
