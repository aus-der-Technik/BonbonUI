<script lang="ts">
  /**
   * Storybook-only: the toolbar's tints as swatches on the page. Picking one sets the same
   * Storybook global the toolbar sets, so the whole Storybook takes it on (and the toolbar shows
   * it); outside Storybook it only tints the page.
   */
  import { TINTS } from './tints';

  interface StorybookChannel {
    emit(event: string, payload: unknown): void;
  }

  const read = () => document.documentElement.style.getPropertyValue('--tint').trim() || 'default';
  let current = $state(read());

  function pick(value: string) {
    current = value;
    const channel = (window as unknown as { __STORYBOOK_ADDONS_CHANNEL__?: StorybookChannel })
      .__STORYBOOK_ADDONS_CHANNEL__;
    if (channel) channel.emit('updateGlobals', { globals: { tint: value } });
    else if (value === 'default') document.documentElement.style.removeProperty('--tint');
    else document.documentElement.style.setProperty('--tint', value);
  }
</script>

<div class="swatches" role="radiogroup" aria-label="Tint">
  {#each TINTS as t (t.value)}
    <button
      type="button"
      role="radio"
      aria-checked={current === t.value}
      class="swatch"
      title={t.title}
      onclick={() => pick(t.value)}
    >
      <span class="dot" style:background={t.right}></span>
      <span class="name">{t.title.replace(' (default)', '')}</span>
    </button>
  {/each}
</div>

<style>
  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .swatch {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 var(--space-3) 0 var(--space-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    cursor: pointer;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .swatch:hover {
    color: var(--text);
  }
  .swatch[aria-checked='true'] {
    border-color: var(--accent);
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }
  .swatch:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.12);
  }
</style>
