<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface TabItem {
    value: string;
    label: string;
    icon?: IconName | undefined;
    count?: number | undefined;
    disabled?: boolean;
    /** Route tabs: a link instead of a panel switch (pass the current route as `value`). */
    href?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * Tabs molecule — an ARIA tablist. `variant="line"` (default) draws an accent bar under the
   * active tab; `variant="pill"` puts the tabs in a recessed track with the active one on a glass
   * pill. Arrow keys, Home and End move between tabs (automatic activation); the `panel` snippet
   * renders the active one. Tabs with `href` are links (route navigation, `aria-current="page"`).
   * `actions` sits at the right end of the tab bar, e.g. a "+ New" button.
   *
   *   <Tabs label="Order" tabs={[{ value: 'items', label: 'Items' }, …]} bind:value>
   *     {#snippet panel(tab)}…{/snippet}
   *   </Tabs>
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import { indicator } from './indicator';

  interface Props {
    tabs: TabItem[];
    value?: string;
    label: string;
    variant?: 'line' | 'pill';
    onchange?: ((value: string) => void) | undefined;
    panel?: Snippet<[string]> | undefined;
    actions?: Snippet | undefined;
  }

  let {
    tabs,
    value = $bindable(tabs[0]?.value ?? ''),
    label,
    variant = 'line',
    onchange,
    panel,
    actions,
  }: Props = $props();

  const routed = $derived(tabs.some((t) => t.href));
  const current = $derived(tabs.find((t) => t.value === value));
  // The one tab stop: the selected tab, else the first enabled one (a value that matches no tab
  // must not leave the tablist unreachable).
  const focusValue = $derived(
    current && !current.disabled ? current.value : tabs.find((t) => !t.disabled)?.value,
  );

  const id = $props.id();
  let list = $state<HTMLElement>();

  function select(next: string, focus = false) {
    if (next !== value) {
      value = next;
      onchange?.(next);
    }
    if (focus) list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(next)}"]`)?.focus();
  }

  function onkeydown(event: KeyboardEvent) {
    const enabled = tabs.filter((t) => !t.disabled);
    const at = enabled.findIndex((t) => t.value === focusValue);
    const moves: Record<string, number> = {
      ArrowRight: at + 1,
      ArrowLeft: at - 1,
      Home: 0,
      End: enabled.length - 1,
    };
    const target = moves[event.key];
    if (target == null || !enabled.length) return;
    event.preventDefault();
    const next = enabled[(target + enabled.length) % enabled.length];
    if (next) select(next.value, true);
  }
</script>

<div class="tabs tabs--{variant}">
  <div class="bar">
    {#if routed}
      <nav
        class="list"
        aria-label={label}
        bind:this={list}
        use:indicator={{ selector: '[aria-current="page"]', key: value }}
      >
        {#each tabs as tab (tab.value)}
          <a
            class="tab"
            href={tab.disabled ? undefined : tab.href}
            aria-current={tab.value === value ? 'page' : undefined}
            aria-disabled={tab.disabled ? 'true' : undefined}
            data-value={tab.value}
            onclick={() => select(tab.value)}
          >
            {#if tab.icon}<Icon name={tab.icon} size={15} />{/if}{tab.label}
            {#if tab.count != null}<span class="count">{tab.count}</span>{/if}
          </a>
        {/each}
      </nav>
    {:else}
      <div
        class="list"
        role="tablist"
        aria-label={label}
        bind:this={list}
        tabindex="-1"
        {onkeydown}
        use:indicator={{ selector: '[aria-selected="true"]', key: value }}
      >
        {#each tabs as tab (tab.value)}
          <button
            class="tab"
            type="button"
            role="tab"
            id="{id}-tab-{tab.value}"
            data-value={tab.value}
            aria-selected={tab.value === value}
            aria-controls={panel ? `${id}-panel` : undefined}
            tabindex={tab.value === focusValue ? 0 : -1}
            disabled={tab.disabled}
            onclick={() => select(tab.value)}
          >
            {#if tab.icon}<Icon name={tab.icon} size={15} />{/if}{tab.label}
            {#if tab.count != null}<span class="count">{tab.count}</span>{/if}
          </button>
        {/each}
      </div>
    {/if}
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
  </div>
  {#if panel}
    <div
      class="panel"
      role="tabpanel"
      id="{id}-panel"
      aria-labelledby={current && !routed ? `${id}-tab-${value}` : undefined}
      tabindex="0"
    >
      {@render panel(value)}
    </div>
  {/if}
</div>

<style>
  .bar {
    display: flex;
    align-items: flex-end;
    gap: var(--space-3);
  }
  .tabs--line .bar {
    border-bottom: 1px solid var(--border-strong);
  }
  .tabs--pill .bar {
    align-items: center;
  }
  .list {
    position: relative;
    display: flex;
    flex: 1;
    min-width: 0;
    gap: var(--space-1);
    overflow-x: auto;
    outline: none;
    scrollbar-width: none;
  }
  .tabs--pill .list {
    flex: 0 1 auto;
    gap: 2px;
    padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    box-shadow: inset 0 1px 2px color-mix(in srgb, var(--text) 8%, transparent);
  }
  .actions {
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0;
    margin-left: auto;
    padding-bottom: var(--space-1);
  }
  .tabs--pill .actions {
    padding-bottom: 0;
  }
  .tab {
    text-decoration: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3) 0.65rem;
    border: 0;
    background: none;
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    white-space: nowrap;
    cursor: pointer;
    transition:
      color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  .tab:hover:not(:disabled):not([aria-disabled='true']) {
    color: var(--text);
  }
  .tab:is([aria-selected='true'], [aria-current='page']) {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  .tab:is([aria-selected='true'], [aria-current='page']) :global(.icon) {
    color: var(--accent-ink);
  }
  .tabs--line .tab::after {
    content: '';
    position: absolute;
    left: var(--space-2);
    right: var(--space-2);
    bottom: -1px;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: var(--accent);
    box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
    transform: scaleX(0);
    transition: transform var(--motion-base) var(--ease-out);
  }
  .tabs--line .tab:is([aria-selected='true'], [aria-current='page'])::after {
    transform: none;
  }
  /* Once measured, one shared indicator glides between tabs (see indicator.ts); until then each
     tab draws its own. */
  .list::before {
    content: '';
    position: absolute;
    left: 0;
    pointer-events: none;
    opacity: 0;
  }
  .list:global([data-indicator])::before {
    opacity: 1;
  }
  .list:global([data-indicator='moving'])::before {
    transition:
      transform var(--motion-base) var(--ease-in-out),
      width var(--motion-base) var(--ease-in-out);
  }
  .tabs--line .list::before {
    bottom: 0;
    width: calc(var(--ind-w, 0px) - 2 * var(--space-2));
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: var(--accent);
    box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
    transform: translateX(calc(var(--ind-x, 0px) + var(--space-2)));
  }
  .tabs--line .list:global([data-indicator]) .tab::after {
    content: none;
  }
  .tabs--pill .list::before {
    top: 0;
    width: var(--ind-w, 0);
    height: var(--ind-h, 0);
    border-radius: var(--radius-pill);
    transform: translate(var(--ind-x, 0), var(--ind-y, 0));
  }
  .tabs--pill .list::before {
    background: linear-gradient(180deg, var(--pill-edge), transparent 70%), var(--glass-strong);
    box-shadow:
      0 3px 10px color-mix(in srgb, var(--text) 12%, transparent),
      0 0 0 0.5px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
  }
  .tabs--pill .list:global([data-indicator]) .tab {
    background: transparent;
    box-shadow: none;
  }
  .tabs--pill .tab {
    z-index: 1;
    transition:
      color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .tabs--pill .tab:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .tabs--pill .tab {
    height: calc(var(--control-md) - 6px);
    padding: 0 var(--space-4);
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
  }
  .tabs--pill
    .tab:hover:not(:disabled):not([aria-disabled='true']):not(
      [aria-selected='true'],
      [aria-current='page']
    ) {
    background: var(--fill-hover);
  }
  .tabs--pill .tab:is([aria-selected='true'], [aria-current='page']) {
    background: linear-gradient(180deg, var(--pill-edge), transparent 70%), var(--glass-strong);
    box-shadow:
      0 3px 10px color-mix(in srgb, var(--text) 12%, transparent),
      0 0 0 0.5px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
  }
  .tab:is(:disabled, [aria-disabled='true']) {
    opacity: var(--disabled-opacity);
    cursor: default;
  }
  .tab:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
    border-radius: var(--radius-sm);
  }
  .tabs--pill .tab:focus-visible {
    border-radius: var(--radius-pill);
  }
  .count {
    min-width: 1.4em;
    padding: 0 0.4rem;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .tab:is([aria-selected='true'], [aria-current='page']) .count {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .panel {
    padding-top: var(--space-4);
    outline: none;
  }
  /* On phones the actions get their own row above the tabs, so they never cover the scrolling
     list. */
  @media (max-width: 720px) {
    .bar {
      flex-wrap: wrap;
    }
    .list {
      flex-basis: 100%;
    }
    .tabs--pill .list {
      flex-basis: auto;
      max-width: 100%;
    }
    .actions {
      order: -1;
      width: 100%;
      justify-content: flex-end;
      padding-bottom: var(--space-2);
    }
    .tabs--pill .actions {
      padding-bottom: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tab,
    .tabs--pill .tab,
    .tabs--line .tab::after,
    .list:global([data-indicator='moving'])::before {
      transition: none;
    }
    .tabs--pill .tab:active:not(:disabled) {
      transform: none;
    }
  }
</style>
