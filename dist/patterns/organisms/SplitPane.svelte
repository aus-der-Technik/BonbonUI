<script lang="ts">
  /**
   * SplitPane organism — two panes side by side on one card, each with its own header strip
   * (a source and its translation, a request and its response). With `onswap` a round swap
   * button sits between the headers — a liquid-glass bead that turns on hover. Stacks below 760px.
   *
   *   <SplitPane label="Translator" onswap={swap}>
   *     {#snippet start()}…{/snippet}{#snippet end()}…{/snippet}
   *   </SplitPane>
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    label?: string | undefined;
    startHeader?: Snippet | undefined;
    endHeader?: Snippet | undefined;
    start: Snippet;
    end: Snippet;
    swapLabel?: string;
    swapDisabled?: boolean;
    onswap?: (() => void) | undefined;
    minHeight?: string;
  }

  let {
    label,
    startHeader,
    endHeader,
    start,
    end,
    swapLabel = 'Swap',
    swapDisabled = false,
    onswap,
    minHeight = '16rem',
  }: Props = $props();
</script>

<section class="split" aria-label={label} style:--min-height={minHeight}>
  <div class="pane">
    {#if startHeader || onswap}<div class="head">{@render startHeader?.()}</div>{/if}
    <div class="body">{@render start()}</div>
  </div>
  {#if onswap}
    <button
      type="button"
      class="swap"
      aria-label={swapLabel}
      title={swapLabel}
      disabled={swapDisabled}
      onclick={onswap}
    >
      <Icon name="swap" size={16} />
    </button>
  {/if}
  <div class="pane">
    {#if endHeader || onswap}<div class="head">{@render endHeader?.()}</div>{/if}
    <div class="body">{@render end()}</div>
  </div>
</section>

<style>
  .split {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    border-radius: var(--radius-card);
    border: 1px solid var(--layer-panel-border);
    background: var(--layer-panel-bg);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    box-shadow: var(--layer-panel-shadow);
  }
  .pane {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .pane + .swap + .pane,
  .pane + .pane {
    border-left: 1px solid var(--border-strong);
  }
  .head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-xl);
    padding: var(--space-2) var(--space-4);
    border-bottom: 1px solid var(--border-strong);
  }
  .body {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: var(--min-height);
  }
  .swap {
    position: absolute;
    top: calc(var(--control-xl) / 2);
    left: 50%;
    z-index: 3;
    display: grid;
    place-items: center;
    width: var(--control-md);
    height: var(--control-md);
    border-radius: 50%;
    border: 0.75px solid var(--pill-border);
    background: var(--pill-tint), var(--glass-strong);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    color: var(--text-2);
    box-shadow: var(--shadow-frosted);
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition:
      color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-slow) var(--ease-spring);
  }
  .swap:hover:not(:disabled) {
    color: var(--accent-ink);
    box-shadow:
      var(--shadow-frosted-hover),
      0 0 0 1.5px var(--accent-border);
    transform: translate(-50%, -50%) rotate(180deg);
  }
  .swap:active:not(:disabled) {
    transform: translate(-50%, -50%) rotate(180deg) scale(0.92);
  }
  .swap:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .swap:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  @media (max-width: 760px) {
    .split {
      grid-template-columns: minmax(0, 1fr);
    }
    .pane + .swap + .pane,
    .pane + .pane {
      border-left: 0;
      border-top: 1px solid var(--border-strong);
    }
    .swap {
      position: relative;
      top: auto;
      left: auto;
      justify-self: center;
      margin: calc(var(--control-md) / -2) 0;
      transform: rotate(90deg);
    }
    .swap:hover:not(:disabled) {
      transform: rotate(270deg);
    }
    .swap:active:not(:disabled) {
      transform: rotate(270deg) scale(0.92);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .swap {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .split,
    .swap {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
