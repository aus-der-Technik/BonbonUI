<script lang="ts">
  /**
   * DetailPanel organism — a record's detail on a glass panel floating over its list: it flies
   * in from the right and fades out, the list stays visible, blurred, behind it. Escape, the
   * close button and a click beside the panel close it; ← / → step through the list.
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
  import { cubicOut, quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import Button from '../atoms/Button.svelte';
  import Skeleton from '../atoms/Skeleton.svelte';

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
  const reducedMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = (ms: number) => (reducedMotion ? 0 : ms);

  onMount(() => {
    if (layer === 'behind') return;
    const previous = document.activeElement as HTMLElement | null;
    void tick().then(() => panel?.focus());
    return () => previous?.focus?.();
  });

  function onkeydown(event: KeyboardEvent) {
    // A panel behind another leaves the keys to the one in front.
    if (layer === 'behind') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      onclose();
    } else if (event.key === 'ArrowLeft' && onprevious && !isTyping(event)) {
      onprevious();
    } else if (event.key === 'ArrowRight' && onnext && !isTyping(event)) {
      onnext();
    } else if (event.key === 'Tab' && panel) {
      trapFocus(event, panel);
    }
  }

  const isTyping = (event: KeyboardEvent) =>
    event.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName);

  /** Keeps Tab inside the panel while it is open. */
  function trapFocus(event: KeyboardEvent, root: HTMLElement) {
    const focusable = [
      ...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'),
    ];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && (document.activeElement === first || document.activeElement === root)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
</script>

<svelte:window {onkeydown} />

{#if layer !== 'front'}
  <div
    class="backdrop"
    role="presentation"
    onclick={onbackdrop ?? onclose}
    transition:fade={{ duration: motion(200) }}
  ></div>
{/if}

<div
  bind:this={panel}
  class="panel"
  class:behind={layer === 'behind'}
  class:front={layer === 'front'}
  role="dialog"
  aria-modal="true"
  aria-labelledby={labelledby}
  aria-busy={loading}
  tabindex="-1"
  in:fly={{ x: 64, duration: motion(380), easing: quintOut, opacity: 0 }}
  out:fly={{ x: 24, duration: motion(180), easing: cubicOut, opacity: 0 }}
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
    <p class="error" role="alert">{error}</p>
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
      <div class="content" class:stale={loading} in:fade={{ duration: motion(160) }}>
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
    background: var(--backdrop);
    backdrop-filter: blur(4px) saturate(120%);
    -webkit-backdrop-filter: blur(4px) saturate(120%);
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
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--tint-danger);
    color: var(--danger);
    font-weight: var(--fw-medium);
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
