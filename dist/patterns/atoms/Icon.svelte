<script lang="ts">
  /**
   * Icon atom — one glyph from `icons.ts`, sized in px and coloured by `currentColor`.
   * Decorative by default (`aria-hidden`); pass `label` when the icon carries meaning alone.
   */
  import { icons, type IconDef, type IconName } from './icons';

  interface Props {
    name: IconName;
    size?: number;
    /** Accessible name; without it the icon is hidden from assistive tech. */
    label?: string | undefined;
    class?: string;
  }

  let { name, size = 18, label, class: extraClass = '' }: Props = $props();

  const icon = $derived<IconDef>(icons[name]);
</script>

<svg
  class="icon {extraClass}"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill={icon.fill ? 'currentColor' : 'none'}
  stroke={icon.fill ? 'none' : 'currentColor'}
  stroke-width={icon.strokeWidth ?? 2}
  stroke-linecap="round"
  stroke-linejoin="round"
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  {#each icon.paths as d (d)}<path {d} />{/each}
</svg>

<style>
  .icon {
    flex-shrink: 0;
    display: inline-block;
    vertical-align: middle;
  }
</style>
