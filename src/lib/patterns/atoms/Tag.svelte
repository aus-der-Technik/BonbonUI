<script lang="ts">
  /**
   * Tag atom — a compact chip for a value.
   * - plain: a keyword or attribute; `name` makes it a key/value pair ("TYPE  venue").
   * - `onremove`: an applied filter with an × ("Remove <label>").
   * - `onclick`: a chip that does something, e.g. filters by this keyword.
   * - `href`: a link chip, e.g. a cited source; `external` opens a new tab. Long labels are cut
   *   with an ellipsis at `maxWidth`, the full text stays in the tooltip.
   * `count` adds a muted "×3"; `tone` colours it (danger for a failed call, accent for the
   * current one, or any candy palette name for categories); `color` puts a colour dot in front
   * (a palette name or any CSS colour); `mono` for ids.
   *
   *   <Tag name="City" label="Leipzig" />   <Tag label="design" tone="purple" onremove={…} />
   */
  import Icon from './Icon.svelte';
  import Swatch from './Swatch.svelte';
  import { colorValue, isPaletteColor, type PaletteColor } from './palette';

  interface Props {
    label: string;
    /** Key of a key/value tag, shown muted in front of the label. */
    name?: string | undefined;
    /** Colour dot in front of the label: a palette name or any CSS colour. */
    color?: string | undefined;
    count?: number | string | undefined;
    tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'info' | 'accent' | PaletteColor;
    mono?: boolean;
    href?: string | undefined;
    external?: boolean;
    maxWidth?: string;
    title?: string | undefined;
    removeLabel?: string;
    onremove?: (() => void) | undefined;
    onclick?: ((event: MouseEvent) => void) | undefined;
  }

  let {
    label,
    name,
    color,
    count,
    tone = 'neutral',
    mono = false,
    href,
    external = false,
    maxWidth = '22rem',
    title,
    removeLabel = 'Remove',
    onremove,
    onclick,
  }: Props = $props();

  const tip = $derived(title ?? (href && external ? href : undefined));
  const palette = $derived(isPaletteColor(tone) ? colorValue(tone) : undefined);
  const dot = $derived(colorValue(color));
</script>

{#snippet content()}
  {#if external}<Icon name="external" size={11} />{/if}
  {#if dot}<Swatch color={dot} size={8} />{/if}
  {#if name}<span class="key">{name}</span>{/if}
  <span class="label" class:mono>{label}</span>
  {#if count != null}<span class="count">×{count}</span>{/if}
{/snippet}

{#if href}
  <a
    class="tag tag--{tone} tag--action"
    class:tag--palette={palette}
    style:--tag-c={palette}
    style:max-width={maxWidth}
    {href}
    title={tip}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    {onclick}>{@render content()}</a
  >
{:else if onclick}
  <button
    type="button"
    class="tag tag--{tone} tag--action"
    class:tag--palette={palette}
    style:--tag-c={palette}
    style:max-width={maxWidth}
    title={tip}
    {onclick}
  >
    {@render content()}
  </button>
{:else}
  <span
    class="tag tag--{tone}"
    class:tag--palette={palette}
    style:--tag-c={palette}
    style:max-width={maxWidth}
    title={tip}
  >
    {@render content()}
    {#if onremove}
      <button type="button" class="remove" aria-label="{removeLabel} {label}" onclick={onremove}>
        <Icon name="close" size={12} />
      </button>
    {/if}
  </span>
{/if}

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    height: var(--control-xs);
    min-width: 0;
    padding: 0 0.65rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    box-shadow: inset 0 1px 0 color-mix(in srgb, white 35%, transparent);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text);
    text-decoration: none;
    white-space: nowrap;
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .tag--action {
    cursor: pointer;
  }
  .tag--action:hover {
    border-color: var(--accent-border);
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  /* Jelly press, like every other thing you can act on. */
  .tag--action:active {
    transform: var(--press-squish);
  }
  .tag--action:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .tag--ok {
    border-color: color-mix(in srgb, var(--ok) 40%, transparent);
    background: var(--tint-ok);
  }
  .tag--warn {
    border-color: color-mix(in srgb, var(--warn) 50%, transparent);
    background: var(--tint-warn);
  }
  .tag--danger {
    border-color: color-mix(in srgb, var(--danger) 45%, transparent);
    background: var(--tint-danger);
    color: var(--danger-strong);
  }
  .tag--info {
    border-color: color-mix(in srgb, var(--info) 40%, transparent);
    background: var(--tint-info);
  }
  .tag--accent {
    border-color: var(--accent-border);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .tag--palette {
    border-color: color-mix(in srgb, var(--tag-c) 40%, transparent);
    background: color-mix(in srgb, var(--tag-c) 14%, transparent);
    color: color-mix(in oklab, var(--tag-c) var(--ink-share), var(--ink-mix));
  }
  /* Yellow and orange are so light that the usual ink mix is not enough for small text. */
  .tag--yellow.tag--palette {
    color: color-mix(in oklab, var(--tag-c) 52%, var(--ink-mix));
  }
  .tag--orange.tag--palette {
    color: color-mix(in oklab, var(--tag-c) 62%, var(--ink-mix));
  }
  .tag--palette .key,
  .tag--palette .count,
  .tag--palette :global(.icon) {
    color: inherit;
    opacity: 0.75;
  }
  .key {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .key + .label {
    font-weight: var(--fw-semibold);
  }
  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mono {
    font-family: var(--font-mono);
  }
  .count {
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .tag :global(.icon) {
    color: var(--text-3);
  }
  .remove {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    margin-right: -0.35rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--fill-subtle);
    color: var(--text-3);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .remove:active {
    transform: scale(0.88);
  }
  .remove:hover {
    background: var(--tint-danger);
    color: var(--danger);
  }
  .remove:hover :global(.icon) {
    color: inherit;
  }
  .remove:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  @media (prefers-reduced-motion: reduce) {
    .tag {
      transition: none;
    }
    .tag--action:active,
    .remove:active {
      transform: none;
    }
  }
</style>
