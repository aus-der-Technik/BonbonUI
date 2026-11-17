<script lang="ts">
  /**
   * StackPanel organism — one panel in a `PanelStack`. `depth` 0 is the first; a deeper one opens beside it (the one
   * below slides left) or, where both do not fit, over it with "‹ {title below}" to go back.
   * Its close button closes itself when in front, the whole stack when beside one in front or
   * covering one (that one has "‹ back").
   * Keyboard focus moves into a panel as it opens and back to what opened it as it leaves.
   */
  import type { Snippet } from 'svelte';
  import { onMount, tick, untrack } from 'svelte';
  import type { TransitionConfig } from 'svelte/transition';
  import Button from '../atoms/Button.svelte';
  import { motion } from '../../utils/motion';
  import { placement, useStack } from './panels.svelte';

  interface Props {
    /** Its level in the stack: 0 the first, 1 beside it, … Fixed for the panel's life. */
    depth?: number;
    /** Names the panel (and the back button of the one above it). */
    title: string;
    /** A second line under the title. */
    subtitle?: string | undefined;
    /** Its width as CSS (`30rem` by default; px or rem are used for the first fit before measuring). */
    width?: string;
    /** Closes this panel (its close button in front, Escape, the back button). */
    onclose: () => void;
    /** Replaces the title block (keep an element with `id={titleId}` in it). */
    head?: Snippet<[{ titleId: string }]> | undefined;
    /** Buttons in the head, before the close button (32 px: `size="sm"`). */
    actions?: Snippet | undefined;
    /** The close button's name in front ("Close"), and beside or under another ("Close all"). */
    closeLabel?: string;
    closeAllLabel?: string;
    /** Fixed at the bottom, below the scrolling body. */
    footer?: Snippet | undefined;
    /** The panel's body. */
    children: Snippet;
  }

  let {
    depth = 0,
    title,
    subtitle,
    width = '30rem',
    onclose,
    head,
    actions,
    closeLabel = 'Close',
    closeAllLabel = 'Close all',
    footer,
    children,
  }: Props = $props();

  const stack = useStack();
  if (!stack) throw new Error('StackPanel belongs inside a PanelStack');

  const titleId = $props.id();
  let element = $state<HTMLElement>();
  /** The rendered width in px, once known; replaces the guess in the stack. */
  let measured = $state(0);

  // Until measured: the asked width, so the first frame already knows whether it fits beside.
  // A panel keeps its depth for life; title and width follow in the effect below.
  const entry = untrack(() => {
    const guess = Math.min(
      parseFloat(width) * (width.endsWith('rem') ? 16 : 1) || 0,
      (globalThis.innerWidth ?? 1440) - 16,
    );
    return stack.register({
      depth,
      title,
      width: guess,
      close: () => onclose(),
      element: undefined,
    });
  });
  $effect(() => {
    entry.title = title;
    if (measured) entry.width = measured;
    entry.element = element;
    entry.close = () => onclose();
  });
  $effect(() => () => stack.unregister(depth, entry));

  const top = $derived(stack.top);
  const place = $derived(placement(depth, top, stack.widths, stack.wide));
  const below = $derived(depth > 0 ? stack.below(depth) : undefined);
  /** Narrow: the panel in front goes back to the one it covers. */
  const back = $derived(!stack.wide && place.front && below ? below.title : '');

  onMount(() => {
    let opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // Another name picked in the panel below swaps this one: going back lands on that name.
    const follow = (event: FocusEvent) => {
      const to = event.target;
      if (
        to instanceof HTMLElement &&
        element &&
        !element.contains(to) &&
        to.closest('[data-panel-depth]')
      )
        opener = to;
    };
    document.addEventListener('focusin', follow);
    void tick().then(() => element?.focus({ preventScroll: true }));
    return () => {
      document.removeEventListener('focusin', follow);
      // Back to the name that opened it, else into the panel it covered.
      const to =
        opener?.isConnected && !opener.closest('[inert]') ? opener : stack.below(depth)?.element;
      to?.focus({ preventScroll: true });
    };
  });

  /** In from the side: a short glide beside, a whole width over (narrow), fading in. */
  function enter(node: HTMLElement): TransitionConfig {
    const m = motion('slow', 'out', node);
    if (m.reduced) return { duration: m.duration, css: (t) => `opacity: ${t}` };
    const over = depth > 0 && !stack!.wide;
    const distance = over ? node.offsetWidth : 48;
    return {
      duration: m.duration,
      easing: m.ease,
      css: (t, u) => `opacity: ${over ? 1 : Math.min(1, t * 1.6)}; translate: ${u * distance}px 0`,
    };
  }

  /** Out to the side: the reverse of `enter`, a little slower when it covered the panel below. */
  function leave(node: HTMLElement): TransitionConfig {
    const m = motion('base', 'in-out', node);
    if (m.reduced) return { duration: m.duration, css: (t) => `opacity: ${t}` };
    const over = depth > 0 && !stack!.wide;
    const distance = over ? node.offsetWidth : 40;
    return {
      duration: over ? m.duration * 1.4 : m.duration,
      easing: m.ease,
      css: (t, u) => `opacity: ${over ? 1 : t}; translate: ${u * distance}px 0`,
    };
  }
</script>

<div
  bind:this={element}
  bind:offsetWidth={measured}
  class="panel"
  class:front={place.front}
  class:hidden={!place.shown}
  style:--width={width}
  style:--x="{place.x}px"
  style:z-index={depth + 1}
  data-panel-depth={depth}
  data-glass
  role="dialog"
  aria-modal={place.front ? 'true' : undefined}
  aria-labelledby={titleId}
  aria-hidden={place.shown ? undefined : 'true'}
  inert={!place.shown}
  tabindex="-1"
  in:enter
  out:leave
>
  <header>
    {#if back}
      <div class="nav">
        <Button variant="plain" size="sm" icon="chevron-left" label={back} onclick={onclose} />
      </div>
    {/if}
    <div class="row">
      <div class="titles">
        {#if head}
          {@render head({ titleId })}
        {:else}
          <h2 id={titleId}>{title}</h2>
          {#if subtitle}<p>{subtitle}</p>{/if}
        {/if}
      </div>
      {#if actions}<div class="actions">{@render actions()}</div>{/if}
      <Button
        variant="ghost"
        size="sm"
        icon="close"
        iconOnly
        label={place.front && !back ? closeLabel : closeAllLabel}
        onclick={() => (place.front && !back ? onclose() : stack.closeAll())}
      />
    </div>
  </header>
  <div class="body">{@render children()}</div>
  {#if footer}<footer>{@render footer()}</footer>{/if}
</div>

<style>
  .panel {
    --edge: 8px;
    position: absolute;
    top: var(--edge);
    right: var(--edge);
    bottom: var(--edge);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: min(var(--width), calc(100vw - 2 * var(--edge)));
    overflow: hidden;
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    color: var(--text);
    background: var(--layer-front-bg), var(--glass-strong);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--shadow-dialog);
    outline: none;
    transform: translateX(var(--x));
    transition:
      transform var(--motion-slow) var(--ease-out),
      opacity var(--motion-slow) var(--ease-out),
      filter var(--motion-slow) var(--ease-out);
  }
  /* Beside the one in front: still in reach, a shade quieter. */
  .panel:not(.front) {
    filter: saturate(0.92) brightness(0.985);
  }
  .panel.hidden {
    opacity: 0;
    pointer-events: none;
  }
  header {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-5) var(--space-5) var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border-strong);
  }
  .nav {
    margin: calc(-1 * var(--space-2)) 0 0 calc(-1 * var(--space-3));
  }
  .row {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
  }
  .titles {
    flex: 1;
    min-width: 0;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
  }
  h2 {
    margin: 0;
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.25;
    overflow-wrap: anywhere;
  }
  .titles > p {
    margin: 2px 0 0;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--space-5) var(--space-6);
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--border-strong);
  }
  /* A phone: every panel is the whole screen and solid — glass would only let the page (or the
     panel it covers) show through the words. It keeps off the notch and the home indicator. */
  @media (max-width: 720px) {
    .panel {
      --edge: 0px;
      width: 100vw;
      border-radius: 0;
      border-width: 0;
      background: var(--bg);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      box-shadow: none;
    }
    header {
      padding: calc(var(--space-4) + env(safe-area-inset-top)) var(--space-4) var(--space-3);
    }
    .body {
      padding: var(--space-4);
    }
    footer {
      padding: var(--space-3) var(--space-4) calc(var(--space-3) + env(safe-area-inset-bottom));
    }
    .panel:not(.front) {
      filter: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .panel {
      transition: opacity var(--motion-quick) linear;
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
