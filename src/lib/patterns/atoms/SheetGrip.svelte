<script lang="ts">
  /**
   * SheetGrip atom — the grabber of a bottom sheet. Put it as the **first child** of a floating
   * panel (a Popover's or ContextPanel's content — or pass them `sheet` and they add it) and on
   * a phone (≤ 720 px) that panel becomes a sheet along the bottom edge: full width, rounded top,
   * clear of the home indicator, above the on-screen keyboard (`--keyboard`, see `watchDevice`),
   * the page dimmed behind it. Pull the grip down to close it; a quick flick is enough. On a wider
   * screen it renders nothing and the panel floats at its trigger as before.
   *
   *   <SheetGrip {close} />               a sheet on phones, as tall as its content
   *   <SheetGrip {close} size="half" />   at most ~58 % of the screen, nothing dimmed (the place
   *                                       on a map stays in sight above it)
   *   <SheetGrip {close} size="full" />   the whole screen (a notification centre)
   *
   * The grip is not a tab stop (keyboards close sheets with Escape). On a touch phone the sheet
   * itself takes focus once it opened, so no field throws the keyboard up and no button wears a
   * focus ring from a tap.
   */
  import { dragToClose } from '../../utils/gestures';
  import { PHONE_QUERY, TOUCH_QUERY } from '../../utils/device.svelte';

  interface Props {
    /** Closes the panel (a pull down far enough, or a tap on the grip). */
    close: () => void;
    /** `sheet` as tall as its content, `half` at most ~58 % and undimmed, `full` the whole screen. */
    size?: 'sheet' | 'half' | 'full';
    /** The grip's accessible name. */
    label?: string;
  }

  let { close, size = 'sheet', label = 'Close' }: Props = $props();

  let el: HTMLElement | undefined = $state();

  $effect(() => {
    if (!el) return;
    const host = el;
    const sheet = () => host.closest<HTMLElement>('[popover], dialog');
    const release = dragToClose(host, sheet, () => close());
    let later: ReturnType<typeof setTimeout> | undefined;
    if (
      typeof matchMedia === 'function' &&
      matchMedia(`${PHONE_QUERY} and ${TOUCH_QUERY}`).matches
    ) {
      // After the panel's own first focus (it moves focus inside on the next tick).
      later = setTimeout(() => {
        const panel = sheet();
        const active = document.activeElement;
        if (panel && active instanceof HTMLElement && panel.contains(active) && active !== panel) {
          if (!panel.hasAttribute('tabindex')) panel.tabIndex = -1;
          panel.focus({ preventScroll: true });
        }
      }, 60);
    }
    return () => {
      clearTimeout(later);
      release();
    };
  });
</script>

<div class="grip" bind:this={el} data-sheet-grip={size}>
  <!-- A pointer target only: keyboards close the sheet with Escape. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_interactive_supports_focus -->
  <div class="bar" role="button" aria-label={label} onclick={() => close()}><span></span></div>
</div>

<style>
  .grip {
    display: none;
  }
  @media (max-width: 720px) {
    .grip {
      display: grid;
      place-items: center;
      height: 24px;
      margin-bottom: 2px;
      touch-action: none;
      cursor: grab;
    }
    .bar {
      display: grid;
      place-items: center;
      width: 88px;
      height: 22px;
      cursor: inherit;
    }
    .bar span {
      width: 38px;
      height: 5px;
      border-radius: var(--radius-pill);
      background: color-mix(in oklch, var(--text) 22%, transparent);
    }

    /* The panel the grip sits in becomes the sheet. */
    :global([popover]:has(> [data-sheet-grip])) {
      position: fixed !important;
      inset: auto 0 var(--keyboard, 0px) 0 !important;
      left: 0 !important;
      top: auto !important;
      box-sizing: border-box;
      width: auto !important;
      max-width: 640px !important;
      margin-inline: auto !important;
      max-height: calc(var(--visible-height, 100dvh) - env(safe-area-inset-top) - 24px) !important;
      padding-top: 0 !important;
      padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom)) !important;
      border-radius: 24px 24px 0 0 !important;
      border-bottom: 0 !important;
      transform-origin: 50% 100% !important;
      /* A sheet covers what it is about: nearly solid glass keeps its words legible. */
      background: color-mix(in oklch, var(--bg) 92%, transparent) !important;
      backdrop-filter: blur(24px) saturate(1.2) !important;
      -webkit-backdrop-filter: blur(24px) saturate(1.2) !important;
      animation: bb-sheet-up var(--motion-slow) var(--ease-out) !important;
      overscroll-behavior: contain;
    }
    :global([popover]:has(> [data-sheet-grip])::backdrop) {
      background: var(--backdrop);
      animation: bb-sheet-fade var(--motion-base) var(--ease-out);
    }
    :global([popover]:has(> [data-sheet-grip='half'])) {
      max-height: min(
        58dvh,
        calc(var(--visible-height, 100dvh) - env(safe-area-inset-top) - 24px)
      ) !important;
    }
    :global([popover]:has(> [data-sheet-grip='half'])::backdrop) {
      background: transparent;
    }
    :global([popover]:has(> [data-sheet-grip='full'])) {
      inset: 0 0 var(--keyboard, 0px) 0 !important;
      max-width: none !important;
      max-height: none !important;
      padding-top: env(safe-area-inset-top) !important;
      padding-bottom: 0 !important;
      border-radius: 0 !important;
    }
  }
  @media (max-width: 720px) and (prefers-reduced-motion: reduce) {
    :global([popover]:has(> [data-sheet-grip])) {
      animation: bb-sheet-fade var(--motion-quick) linear !important;
    }
  }
</style>
