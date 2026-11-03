<script lang="ts">
  /**
   * Tooltip atom — a short hint above (or below) its trigger on hover and keyboard focus,
   * linked with `aria-describedby` on the trigger (the first focusable element inside, else the
   * first element). Escape hides it, and so does opening the trigger's own menu or popover
   * (`aria-expanded="true"`). A small liquid-glass bubble that pops out of its trigger (it scales
   * from the edge that touches the trigger). `keys` adds the shortcut as key caps after the text,
   * written the platform's way (`['Mod', 'B']` → ⌘ B on Apple, Ctrl B elsewhere); `content`
   * replaces the text with your own markup. For anything interactive use a popover.
   *
   *   <Tooltip text="Reload the rows"><Button icon="reload" label="Reload" iconOnly /></Tooltip>
   *   <Tooltip text="Bold" keys={['Mod', 'B']}>…</Tooltip>
   */
  import type { Snippet } from 'svelte';
  import Kbd from './Kbd.svelte';
  import { keyLabels } from './keys';

  interface Props {
    text?: string;
    /** A shortcut shown as key caps after the text; `Mod`, `Alt`, `Shift` follow the platform. */
    keys?: readonly string[] | undefined;
    /** Rich content in place of `text`. */
    content?: Snippet | undefined;
    placement?: 'top' | 'bottom';
    /** Which edge of the trigger the bubble lines up with; `start`/`end` for triggers at an edge. */
    align?: 'center' | 'start' | 'end';
    /** Links the bubble as the trigger's description. Turn it off when the bubble only repeats
     *  the trigger's accessible name, so it is not read twice. */
    describe?: boolean;
    children: Snippet;
  }

  let {
    text = '',
    keys,
    content,
    placement = 'top',
    align = 'center',
    describe = true,
    children,
  }: Props = $props();

  const labels = $derived(keys?.length ? keyLabels(keys) : []);

  const id = $props.id();
  let open = $state(false);
  let wrap: HTMLSpanElement | undefined = $state();

  const FOCUSABLE =
    'a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

  /** The element assistive tech is on when the tip should be read: the focusable trigger. */
  function triggerOf(root: HTMLElement): HTMLElement | null {
    const focusable = root.querySelector<HTMLElement>(FOCUSABLE);
    if (focusable && !focusable.closest('[role="tooltip"]')) return focusable;
    const first = root.firstElementChild;
    return first instanceof HTMLElement && first.getAttribute('role') !== 'tooltip' ? first : null;
  }

  function link(target: HTMLElement): void {
    const ids = (target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
    if (!ids.includes(id)) target.setAttribute('aria-describedby', [...ids, id].join(' '));
  }

  function unlink(target: HTMLElement): void {
    const ids = (target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
    const rest = ids.filter((other) => other !== id);
    if (rest.length) target.setAttribute('aria-describedby', rest.join(' '));
    else target.removeAttribute('aria-describedby');
  }

  // The description belongs on the element that gets focus — a wrapper's describedby is never
  // announced. Re-link when the trigger inside is swapped.
  $effect(() => {
    const root = wrap;
    if (!root || !describe) return;
    let current: HTMLElement | null = null;
    const sync = () => {
      const next = triggerOf(root);
      if (next === current) return;
      if (current) unlink(current);
      current = next;
      if (current) link(current);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (current) unlink(current);
    };
  });
</script>

<span
  bind:this={wrap}
  class="wrap"
  role="presentation"
  onpointerenter={() => (open = true)}
  onpointerleave={() => (open = false)}
  onfocusin={() => (open = true)}
  onfocusout={() => (open = false)}
  onkeydown={(event) => event.key === 'Escape' && (open = false)}
>
  {@render children()}
  <span
    class="tip tip--{placement} tip--{align}"
    class:open
    role="tooltip"
    {id}
    aria-hidden={describe ? undefined : 'true'}
  >
    {#if content}{@render content()}{:else}{text}{/if}
    {#if labels.length}
      <span class="keys"
        >{#each labels as label, index (index)}<Kbd>{label}</Kbd>{/each}</span
      >
    {/if}
  </span>
</span>

<style>
  .wrap {
    position: relative;
    display: inline-flex;
  }
  .tip {
    /* Where the bubble sits along the trigger and the point it grows from (set per align). */
    --_x: -50%;
    --_ox: 50%;
    position: absolute;
    left: 50%;
    z-index: var(--z-tooltip);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    width: max-content;
    max-width: 18rem;
    padding: 0.4rem 0.7rem;
    border-radius: var(--radius-md);
    border: 0.75px solid var(--pill-border);
    background: var(--tooltip-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow:
      0 8px 24px rgba(12, 12, 22, 0.16),
      0 1px 3px rgba(12, 12, 22, 0.08),
      inset 0 1px 0 var(--pill-light);
    color: var(--text);
    /* Interface type, whatever its trigger sits in (a serif document, an italic quote). */
    font-family: var(--font-sans);
    font-size: var(--fs-xs);
    font-style: normal;
    font-weight: var(--fw-semibold);
    letter-spacing: normal;
    line-height: 1.4;
    text-wrap: balance;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    /* Pop from origin: it grows out of the trigger, not out of thin air. */
    transform-origin: var(--_ox) 100%;
    transform: translateX(var(--_x)) translateY(3px) scale(0.86);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      visibility 0s linear var(--motion-quick),
      transform var(--motion-quick) var(--ease-out);
  }
  .tip--top {
    bottom: calc(100% + 8px);
  }
  .tip--bottom {
    top: calc(100% + 8px);
    transform-origin: var(--_ox) 0;
    transform: translateX(var(--_x)) translateY(-3px) scale(0.86);
  }
  /* At an edge the bubble opens towards the room it has, from the trigger's corner. */
  .tip--start {
    --_x: 0%;
    --_ox: 0%;
    left: 0;
  }
  .tip--end {
    --_x: 0%;
    --_ox: 100%;
    left: auto;
    right: 0;
  }
  .keys {
    display: inline-flex;
    gap: 2px;
  }
  .open {
    opacity: 1;
    visibility: visible;
    transform: translateX(var(--_x));
    transition:
      opacity var(--motion-quick) var(--ease-out),
      visibility 0s,
      /* Can be 18rem wide: big things ease, they don't spring. */ transform var(--motion-base)
        var(--ease-out);
  }
  /* The trigger's own menu is open: a hint over it would only cover it. */
  .wrap:has(:global([aria-expanded='true'])) > .tip {
    display: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .tip,
    .tip--bottom,
    .open {
      transform: translateX(var(--_x));
      transition: opacity var(--motion-quick) var(--ease-out);
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .tip {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
</style>
