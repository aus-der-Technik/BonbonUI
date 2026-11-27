<script lang="ts">
  /**
   * MoreButton molecule — the "⋯" of a row: opens the row's panel (a ContextPanel's `openFor`)
   * for the fingers that cannot right-click, and anyone who does not know they can.
   *
   *   <MoreButton label="Change {name}" onclick={(e) => panel.openFor(e.currentTarget, row)} />
   *
   * `show="touch"` (the default) shows it only on touch screens, so a desktop row keeps its calm
   * look; `show="hover"` also on a desktop while its row (`[data-row]`, `li`, `tr`) is hovered or
   * focused; `show="always"` everywhere. The dots stay small; the hit area is 44 × 44 px.
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    /** The button's accessible name ("Change Mila"). */
    label: string;
    /** Opens the panel; `currentTarget` is the button to open it under. */
    onclick: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
    /** Where it shows: `touch` screens only, also on `hover` of its row, or `always`. */
    show?: 'touch' | 'always' | 'hover';
    /** Dots stacked upright (⋮) instead of side by side. */
    vertical?: boolean;
  }

  let { label, onclick, show = 'touch', vertical = false }: Props = $props();
</script>

<button type="button" class="more show-{show}" aria-label={label} aria-haspopup="dialog" {onclick}>
  <span class="dots"><Icon name={vertical ? 'more-vertical' : 'more'} size={16} /></span>
</button>

<style>
  .more {
    position: relative;
    display: inline-grid;
    flex: none;
    place-items: center;
    width: 32px;
    height: 32px;
    margin: -6px -4px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-3);
    cursor: pointer;
    transition: scale var(--motion-quick) var(--ease-jelly);
  }
  .more:active {
    scale: 0.88;
  }
  /* 44 × 44 for a finger, without a bigger look. */
  .more::after {
    content: '';
    position: absolute;
    inset: -6px;
  }
  .dots {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-pill);
    transition: background var(--motion-quick) var(--ease-out);
  }
  .more:hover .dots,
  .more:focus-visible .dots,
  .more:active .dots {
    background: color-mix(in oklch, var(--text) 8%, transparent);
    color: var(--text);
  }
  .show-touch {
    display: none;
  }
  .show-hover {
    opacity: 0;
  }
  :global(:is([data-row], li, tr):is(:hover, :focus-within)) .show-hover {
    opacity: 1;
  }
  @media (hover: none) and (pointer: coarse) {
    .show-touch {
      display: inline-grid;
    }
    .show-hover {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .more {
      transition: none;
    }
    .more:active {
      scale: none;
    }
  }
</style>
