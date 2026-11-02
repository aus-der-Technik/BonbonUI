<script lang="ts" module>
  export interface VersionItem {
    value: string;
    label: string;
    /** Marks e.g. the latest version with a dot. */
    marked?: boolean;
    title?: string;
    href?: string;
  }
</script>

<script lang="ts">
  /**
   * VersionRail molecule — a wrapping row of pills to jump between versions (v1, v2, …); the
   * current one is filled with the accent, `marked` ones carry a green dot (e.g. "latest"). Links
   * with `href`, buttons otherwise.
   *
   *   <VersionRail items={versions} bind:value={version} />
   */
  interface Props {
    items: VersionItem[];
    value?: string | undefined;
    label?: string;
    markLabel?: string;
    onchange?: ((value: string) => void) | undefined;
  }

  let {
    items,
    value = $bindable(),
    label = 'Versions',
    markLabel = 'latest',
    onchange,
  }: Props = $props();

  function pick(item: VersionItem) {
    value = item.value;
    onchange?.(item.value);
  }
</script>

<nav class="rail" aria-label={label}>
  {#each items as item (item.value)}
    {@const current = item.value === value}
    {#if item.href}
      <a
        class="pill"
        class:current
        href={item.href}
        title={item.title}
        aria-current={current ? 'page' : undefined}
        onclick={() => pick(item)}
      >
        {item.label}{#if item.marked}<span class="dot" aria-label={markLabel}></span>{/if}
      </a>
    {:else}
      <button
        type="button"
        class="pill"
        class:current
        title={item.title}
        aria-pressed={current}
        onclick={() => pick(item)}
      >
        {item.label}{#if item.marked}<span class="dot" aria-label={markLabel}></span>{/if}
      </button>
    {/if}
  {/each}
</nav>

<style>
  .rail {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-xs);
    padding: 0 var(--space-3);
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    color: var(--text-2);
    text-decoration: none;
    cursor: pointer;
    transition:
      color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .pill:hover:not(.current) {
    background: var(--fill-hover);
    color: var(--text);
  }
  .pill:active {
    transform: var(--press-squish);
  }
  /* The version on screen is a selection, not an action: the selected layer, not a filled button. */
  .current {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
    box-shadow: var(--layer-selected-shadow);
  }
  .pill:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ok);
    box-shadow: 0 0 6px color-mix(in srgb, var(--ok) 60%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    .pill {
      transition: none;
    }
    .pill:active {
      transform: none;
    }
  }
</style>
