<script lang="ts">
  /**
   * Tooltip atom — a short hint above (or below) its trigger on hover and keyboard focus,
   * linked with `aria-describedby`. Escape hides it. A small liquid-glass bubble that pops out of
   * its trigger (it scales from the edge that touches the trigger).
   * For anything interactive use a popover.
   *
   *   <Tooltip text="Reload the rows"><Button icon="reload" label="Reload" iconOnly /></Tooltip>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    text: string;
    placement?: 'top' | 'bottom';
    children: Snippet;
  }

  let { text, placement = 'top', children }: Props = $props();

  const id = $props.id();
  let open = $state(false);
</script>

<span
  class="wrap"
  aria-describedby={id}
  role="presentation"
  onpointerenter={() => (open = true)}
  onpointerleave={() => (open = false)}
  onfocusin={() => (open = true)}
  onfocusout={() => (open = false)}
  onkeydown={(event) => event.key === 'Escape' && (open = false)}
>
  {@render children()}
  <span class="tip tip--{placement}" class:open role="tooltip" {id}>{text}</span>
</span>

<style>
  .wrap {
    position: relative;
    display: inline-flex;
  }
  .tip {
    position: absolute;
    left: 50%;
    z-index: var(--z-tooltip);
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
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    line-height: 1.4;
    text-wrap: balance;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    /* Pop from origin: it grows out of the trigger, not out of thin air. */
    transform-origin: 50% 100%;
    transform: translateX(-50%) translateY(3px) scale(0.86);
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
    transform-origin: 50% 0;
    transform: translateX(-50%) translateY(-3px) scale(0.86);
  }
  .open {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      visibility 0s,
      transform var(--motion-base) var(--ease-spring);
  }
  @media (prefers-reduced-motion: reduce) {
    .tip,
    .tip--bottom,
    .open {
      transform: translateX(-50%);
      transition: opacity var(--motion-quick) ease;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .tip {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
</style>
