<script lang="ts">
  /**
   * DetailPanel organism — a record's detail on a glass panel floating over its list: it flies
   * in from the right and fades out, the list stays visible, blurred, behind it. It closes like
   * every overlay: Escape, the close button at the top end, or a click beside the panel
   * (`closeOnBackdrop`); ← / → step through the list. Keys pressed inside a dialog opened from
   * the panel stay with that dialog.
   *
   * Two panels can stand side by side, e.g. a person opened from their organisation: the
   * organisation's panel (`layer="behind"`) slides left and leaves the keys to the person's
   * (`layer="front"`), which takes its place. Below the width two panels need (72rem), the
   * front one covers the other. Unlike Drawer it is no native `<dialog>`, which would allow
   * only one modal at a time; it traps focus itself.
   *
   * While the first load runs (`itemKey` null) it shows a skeleton; a new `itemKey`
   * cross-fades the content, and `loading` dims the item on screen while it refreshes.
   *
   *   {#if open}<DetailPanel labelledby="person-title" itemKey={person.id} onclose={close}
   *     onprevious={…} onnext={…}><DetailHeader titleId="person-title" … /></DetailPanel>{/if}
   */
  import { onMount, tick, type Snippet } from 'svelte';
  import { fade } from 'svelte/transition';
  import Button from '../atoms/Button.svelte';
  import Skeleton from '../atoms/Skeleton.svelte';
  import Alert from '../molecules/Alert.svelte';
  import { glide, motion } from '../../utils/motion';
  import { fromOtherModal, trapTab } from '../../utils/overlay';

  interface Props {
    /** Id of the heading that names the panel, e.g. DetailHeader's `titleId`. */
    labelledby: string;
    /** Identifies the item on screen; a new key cross-fades the content. `null` while loading. */
    itemKey: string | number | null;
    /** Refreshing the item on screen (e.g. another language): the content dims. */
    loading?: boolean;
    error?: string | undefined;
    onclose: () => void;
    /** A click beside the panels; closes this panel unless given. */
    onbackdrop?: (() => void) | undefined;
    /** A click beside the panels does something (`onbackdrop`, else close). */
    closeOnBackdrop?: boolean;
    /**
     * `single` — the only panel. `behind` — moved left for a panel in front of it; it keeps
     * the backdrop but not the keys. `front` — beside a panel behind it; it owns the keys.
     */
    layer?: 'single' | 'behind' | 'front';
    onprevious?: (() => void) | undefined;
    onnext?: (() => void) | undefined;
    previousLabel?: string;
    nextLabel?: string;
    closeLabel?: string;
    /** Last line of the panel, e.g. "Updated … · id …". */
    footer?: Snippet | undefined;
    children: Snippet;
  }

  let {
    labelledby,
    itemKey,
    loading = false,
    error,
    onclose,
    onbackdrop,
    closeOnBackdrop = true,
    layer = 'single',
    onprevious,
    onnext,
    previousLabel = 'Previous',
    nextLabel = 'Next',
    closeLabel = 'Close',
    footer,
    children,
  }: Props = $props();

  let panel = $state<HTMLElement>();
  // Both the press and the release on the backdrop: a drag out of the panel never closes it.
  let pressedBackdrop = false;
  function onBackdropClick() {
    const hit = pressedBackdrop;
    pressedBackdrop = false;
    if (hit && closeOnBackdrop) (onbackdrop ?? onclose)();
  }

  onMount(() => {
    if (layer === 'behind') return;
    const previous = document.activeElement as HTMLElement | null;
    void tick().then(() => panel?.focus());
    return () => previous?.focus?.();
  });

  function onkeydown(event: KeyboardEvent) {
    // A panel behind another leaves the keys to the one in front.
    if (layer === 'behind') return;
    // A Dialog opened from the panel owns its keys: its Escape must not close the panel too.
    if (fromOtherModal(event, panel)) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      onclose();
    } else if (event.key === 'ArrowLeft' && onprevious && !isTyping(event)) {
      onprevious();
    } else if (event.key === 'ArrowRight' && onnext && !isTyping(event)) {
      onnext();
    } else if (event.key === 'Tab' && panel) {
      trapTab(event, panel);
    }
  }

  const isTyping = (event: KeyboardEvent) =>
    event.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName);
</script>

<svelte:window {onkeydown} />

{#if layer !== 'front'}
  <div
    class="backdrop"
    role="presentation"
    onpointerdown={() => (pressedBackdrop = true)}
    onclick={onBackdropClick}
    transition:fade={{ duration: motion('base').duration }}
  ></div>
{/if}

<div
  data-glass
  bind:this={panel}
  class="panel"
  class:behind={layer === 'behind'}
  class:front={layer === 'front'}
  role="dialog"
  aria-modal="true"
  aria-labelledby={labelledby}
  aria-busy={loading}
  tabindex="-1"
  in:glide={{ x: 64, speed: 'slow' }}
  out:glide={{ x: 24, speed: 'quick' }}
>
  <header>
    <div class="nav">
      <Button
        variant="ghost"
        size="sm"
        icon="chevron-left"
        label={previousLabel}
        iconOnly
        disabled={!onprevious}
        onclick={onprevious}
      />
      <Button
        variant="ghost"
        size="sm"
        icon="chevron-right"
        label={nextLabel}
        iconOnly
        disabled={!onnext}
        onclick={onnext}
      />
    </div>
    <Button variant="ghost" size="sm" icon="close" label={closeLabel} iconOnly onclick={onclose} />
  </header>

  {#if error}
    <div class="error"><Alert message={error} /></div>
  {:else if itemKey === null}
    <div class="loading">
      <div class="loading-head">
        <Skeleton shape="circle" width="96px" height="96px" />
        <div class="loading-lines"><Skeleton lines={3} /></div>
      </div>
      <Skeleton lines={6} />
    </div>
  {:else}
    {#key itemKey}
      <div class="content" class:stale={loading} in:fade={{ duration: motion('quick').duration }}>
        {@render children()}
        {#if footer}<footer>{@render footer()}</footer>{/if}
      </div>
    {/key}
  {/if}
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: calc(var(--z-panel) - 1);
    /* One backdrop for every overlay (Dialog, Drawer, DetailPanel). */
    --overlay-blur: var(--blur-backdrop, var(--blur-glass));
    background: var(--backdrop);
    backdrop-filter: var(--overlay-blur);
    -webkit-backdrop-filter: var(--overlay-blur);
  }
  .panel {
    --panel-width: min(34rem, calc(100vw - 2 * var(--space-4)));
    position: fixed;
    z-index: var(--z-panel);
    top: var(--space-4);
    right: var(--space-4);
    bottom: var(--space-4);
    width: var(--panel-width);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg), var(--glass-strong);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--shadow-dialog), var(--glass-inset);
    color: var(--text);
    outline: none;
    transition:
      right var(--motion-slow) var(--ease-in-out),
      transform var(--motion-slow) var(--ease-in-out),
      filter var(--motion-slow) var(--ease-out);
  }
  .panel:focus-visible {
    box-shadow: var(--shadow-dialog), var(--glass-inset), var(--focus-halo);
  }
  .panel.front {
    z-index: calc(var(--z-panel) + 1);
  }
  /* Two panels side by side once both fit: the one behind moves left by a panel and a gap. */
  @media (min-width: 72rem) {
    .panel.behind {
      right: calc(var(--space-4) + var(--panel-width) + var(--space-3));
    }
  }
  /* Covered by the front panel: it recedes a little, like a card further back in a stack. */
  @media (max-width: 71.99rem) {
    .panel.behind {
      transform: scale(0.96);
      filter: brightness(0.92);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .panel {
      transition: none;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) var(--space-3) 0;
  }
  .nav {
    display: flex;
    gap: 0.25rem;
  }
  .loading {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-2) var(--space-6) var(--space-5);
  }
  .loading-head {
    display: flex;
    gap: var(--space-5);
    align-items: center;
  }
  .loading-lines {
    flex: 1;
  }
  .error {
    margin: var(--space-4) var(--space-6);
  }
  .content {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-2) var(--space-6) var(--space-6);
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .content.stale {
    opacity: 0.55;
  }
  footer {
    margin-top: auto;
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-strong);
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  @media (max-width: 640px) {
    .panel {
      top: auto;
      left: var(--space-2);
      right: var(--space-2);
      bottom: var(--space-2);
      width: auto;
      max-height: 88vh;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--layer-front-bg), var(--bg);
    }
  }
</style>
