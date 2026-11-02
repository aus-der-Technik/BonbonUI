<script lang="ts">
  /**
   * Button atom — every button of the library behind one API, in candy glass.
   *
   * | variant        | looks like                                   | use for                        |
   * | -------------- | -------------------------------------------- | ------------------------------ |
   * | `primary`      | accent gradient with a glow                  | the one main action: "Save"    |
   * | `secondary`    | light glass, accent tint on hover            | "Cancel", pagers, filters      |
   * | `tinted`       | soft accent fill, accent text                | strong but not primary: "Add"  |
   * | `plain`        | text only, accent ink                        | inline actions, "Show more"    |
   * | `glass`        | frosted liquid glass, accent text            | header and floating pills      |
   * | `ghost`        | frosted liquid glass, neutral text           | "Cancel" next to a glass pill  |
   * | `success`      | green gradient                               | "Add row", confirm a good step |
   * | `danger`       | red text, red tint on hover                  | "Delete" before it is armed    |
   * | `danger-solid` | red gradient                                 | "Delete permanently"           |
   *
   * Buttons are pills by default — in this library the pill shape means "you can act on it".
   * `shape="rounded"` is for buttons that must sit flush in a dense grid (a table cell, an
   * attached input group). `collapse` drops the label to a round icon button below 640px. With
   * `href` it renders a link.
   *
   *   <Button variant="primary" icon="check" label="Save" onclick={save} />
   */
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';
  import Spinner from './Spinner.svelte';
  import type { IconName } from './icons';

  type Variant =
    | 'primary'
    | 'secondary'
    | 'tinted'
    | 'plain'
    | 'danger'
    | 'danger-solid'
    | 'success'
    | 'glass'
    | 'ghost';

  interface Props extends Omit<HTMLButtonAttributes, 'children' | 'class'> {
    variant?: Variant;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'rounded' | 'pill';
    icon?: IconName | undefined;
    /** An icon after the label, e.g. a chevron on "Next". */
    trailingIcon?: IconName | undefined;
    /** Visible text. Also the accessible name when `iconOnly`. */
    label?: string | undefined;
    /** Shows only the icon; `label` becomes `aria-label`. */
    iconOnly?: boolean;
    /** Hides the label below 640px, leaving a square icon button. */
    collapse?: boolean;
    /** Takes the full width of its container (sign-in forms, sheets on a phone). */
    block?: boolean;
    /** Spins the icon (or shows a spinner), sets `aria-busy` and swallows further clicks, so a
     *  slow submit cannot be sent twice. */
    busy?: boolean;
    /** Label while `busy`, e.g. "Saving…". */
    busyLabel?: string | undefined;
    /** Renders an `<a>` with the same look; with `disabled` it is announced as disabled and
     *  not followed. */
    href?: string | undefined;
    /** For `href`: `_blank` opens a new tab (with `rel="noopener noreferrer"`). */
    target?: string | undefined;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    variant = 'secondary',
    size = 'md',
    shape = 'pill',
    icon,
    trailingIcon,
    label,
    iconOnly = false,
    collapse = false,
    block = false,
    busy = false,
    busyLabel,
    href,
    target,
    type = 'button',
    disabled = false,
    onclick,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const iconSize = $derived(size === 'xs' ? 13 : size === 'sm' ? 15 : size === 'xl' ? 20 : 18);
  const SPINNING = new Set<IconName>(['refresh', 'reload']);
  const text = $derived(busy && busyLabel ? busyLabel : label);

  function click(event: MouseEvent) {
    if (busy || disabled) {
      event.preventDefault();
      return;
    }
    (onclick as ((event: MouseEvent) => void) | null | undefined)?.(event);
  }
  const classes = $derived(
    [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      `btn--${shape}`,
      iconOnly && 'btn--icon-only',
      collapse && 'btn--collapse',
      block && 'btn--block',
      busy && 'btn--busy',
      extraClass,
    ]
      .filter(Boolean)
      .join(' '),
  );
</script>

{#snippet content()}
  <!-- Busy: refresh-style icons spin, any other icon makes room for a spinner. -->
  {#if busy && !(icon && SPINNING.has(icon))}<Spinner size={iconSize - 4} label="" />
  {:else if icon}<Icon name={icon} size={iconSize} />{/if}
  {#if !iconOnly}
    {#if children && !(busy && busyLabel)}<span class="btn__label">{@render children()}</span>
    {:else if text}<span class="btn__label">{text}</span>{/if}
    {#if trailingIcon}<Icon name={trailingIcon} size={iconSize} class="btn__trailing" />{/if}
  {/if}
{/snippet}

{#if href}
  <a
    href={disabled ? undefined : href}
    {target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    class={classes}
    class:btn--link-disabled={disabled}
    role={disabled ? 'link' : undefined}
    aria-disabled={disabled ? 'true' : undefined}
    aria-label={iconOnly || collapse ? text : undefined}
    aria-busy={busy ? 'true' : undefined}
    onclick={click}
    {...rest as Record<string, unknown>}
  >
    {@render content()}
  </a>
{:else}
  <button
    {type}
    class={classes}
    {disabled}
    aria-label={iconOnly || collapse ? text : undefined}
    aria-busy={busy ? 'true' : undefined}
    onclick={click}
    {...rest}
  >
    {@render content()}
  </button>
{/if}

<style>
  .btn {
    /* One light from above: every raised button carries the same top highlight. */
    --_highlight: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    flex-shrink: 0;
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    box-shadow:
      0 1px 2px rgba(12, 12, 22, 0.06),
      var(--_highlight);
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      filter var(--motion-quick) var(--ease-out),
      opacity var(--motion-quick) var(--ease-out);
  }

  /* Jelly press: squish like a gummy, spring back on release. */
  .btn:active:not(:disabled):not(.btn--busy):not(.btn--link-disabled) {
    transform: var(--press-squish);
  }

  /* Focus: 2px accent ring, offset 2px; the soft halo fills the gap between button and ring.
     It lives on a pseudo-element so each variant keeps its own shadow. */
  .btn:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .btn:focus-visible::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    box-shadow: var(--focus-halo);
    pointer-events: none;
  }

  /* Sugar-glass sheen: one sweep of light across primary and front-layer buttons per hover. */
  .btn--primary::after,
  .btn--glass::after,
  .btn--ghost::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--sheen);
    background-size: 250% 100%;
    /* Rest at the end of the sweep, where the light is outside the button. */
    background-position: -50% 0;
    pointer-events: none;
  }
  .btn--primary:hover:not(:disabled):not(.btn--busy)::after,
  .btn--glass:hover:not(:disabled):not(.btn--busy)::after,
  .btn--ghost:hover:not(:disabled):not(.btn--busy)::after {
    animation: bb-sheen var(--motion-slow) var(--ease-out);
  }
  .btn--glass::after,
  .btn--ghost::after {
    opacity: 0.7;
  }

  .btn--block {
    display: flex;
    width: 100%;
  }

  .btn--link-disabled {
    opacity: 0.45;
    cursor: default;
    pointer-events: none;
  }
  .btn--busy {
    cursor: progress;
  }
  /* The busy spinner takes the label colour, so it stays visible on filled buttons. */
  .btn :global(.spinner) {
    --spinner-c: currentColor;
  }

  .btn:disabled {
    opacity: 0.45;
    cursor: default;
  }

  /* Sizes */
  .btn--xs {
    height: calc(24px * var(--density));
    padding: 0 var(--space-2);
    font-size: var(--fs-2xs);
    gap: var(--space-1);
  }
  .btn--sm {
    height: var(--control-sm);
    padding: 0 var(--space-3);
    font-size: var(--fs-xs);
    gap: 0.35rem;
  }
  .btn--md {
    height: var(--control-md);
    padding: 0 var(--space-4);
  }
  .btn--lg {
    height: var(--control-lg);
    padding: 0 var(--space-5);
    font-size: var(--fs-md);
  }
  .btn--xl {
    height: var(--control-xl);
    padding: 0 var(--space-6);
    font-size: var(--fs-base);
  }
  /* A pill's round ends eat into the label: give it a little more air than a rounded button. */
  .btn--pill.btn--sm {
    padding: 0 0.85rem;
  }
  .btn--pill.btn--md {
    padding: 0 1.15rem;
  }
  /* A leading icon sits a little closer to the edge, so icon + text look centred. */
  .btn--md:has(> :global(.icon:first-child)):not(.btn--icon-only) {
    padding-left: 0.85rem;
  }
  .btn--lg:has(> :global(.icon:first-child)):not(.btn--icon-only) {
    padding-left: var(--space-4);
  }

  /* Shapes */
  .btn--rounded {
    border-radius: var(--radius-md);
  }
  .btn--rounded.btn--xs {
    border-radius: var(--radius-sm);
  }
  .btn--rounded.btn--lg,
  .btn--rounded.btn--xl {
    border-radius: var(--radius-lg);
  }
  .btn--pill {
    border-radius: var(--radius-pill);
  }

  .btn.btn--icon-only {
    padding: 0;
    aspect-ratio: 1;
  }

  /* Variants. Buttons do not lift on hover (they are already raised); they brighten. */
  .btn--secondary:hover:not(:disabled) {
    background: color-mix(in srgb, var(--accent-faint), var(--glass-strong));
    border-color: var(--accent-border);
    color: var(--accent-ink);
    box-shadow:
      0 4px 12px color-mix(in srgb, var(--tint) 14%, transparent),
      var(--_highlight);
  }

  .btn--tinted {
    background: var(--accent-soft);
    border-color: transparent;
    color: var(--accent-ink);
    box-shadow: inset 0 1px 0 color-mix(in srgb, white 30%, transparent);
  }
  .btn--tinted:hover:not(:disabled) {
    background: color-mix(in srgb, var(--tint) 22%, transparent);
  }

  .btn--plain {
    background: transparent;
    border-color: transparent;
    color: var(--accent-ink);
    box-shadow: none;
  }
  .btn--plain:hover:not(:disabled) {
    background: var(--accent-faint);
  }

  .btn--danger {
    color: var(--danger);
  }
  .btn--danger:hover:not(:disabled) {
    background: var(--tint-danger);
    border-color: color-mix(in srgb, var(--danger) 45%, transparent);
  }
  .btn--danger:focus-visible,
  .btn--danger-solid:focus-visible {
    outline-color: var(--danger);
  }
  .btn--danger:focus-visible::before,
  .btn--danger-solid:focus-visible::before {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 20%, transparent);
  }

  .btn--danger-solid {
    background: var(--grad-danger);
    border-color: var(--border-on-accent);
    color: var(--on-danger, #fff);
    box-shadow:
      0 6px 16px color-mix(in srgb, var(--danger) 26%, transparent),
      var(--_highlight);
  }
  .btn--danger-solid:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow:
      0 10px 24px color-mix(in srgb, var(--danger) 34%, transparent),
      var(--_highlight);
  }

  .btn--primary {
    background: var(--grad-primary);
    border-color: var(--border-on-accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
  }
  .btn--primary:hover:not(:disabled) {
    filter: brightness(1.06) saturate(1.04);
    box-shadow: var(--shadow-primary-hover);
  }
  .btn--primary:disabled {
    opacity: 0.5;
  }

  .btn--success {
    background: var(--grad-success);
    border-color: var(--border-on-accent);
    color: var(--on-success, #fff);
    box-shadow: var(--shadow-success);
  }
  .btn--success:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: var(--shadow-success-hover);
  }
  .btn--success:focus-visible {
    outline-color: var(--ok);
  }

  .btn--glass,
  .btn--ghost {
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-frosted);
  }
  .btn--glass {
    color: var(--accent-ink);
  }
  .btn--ghost {
    color: var(--text);
  }
  .btn--glass:hover:not(:disabled),
  .btn--ghost:hover:not(:disabled) {
    box-shadow: var(--shadow-frosted-hover);
  }

  .btn--busy :global(.icon:not(.btn__trailing)) {
    animation: bb-spin 0.8s linear infinite;
  }

  @media (max-width: 640px) {
    .btn.btn--collapse {
      padding: 0;
      aspect-ratio: 1;
    }
    .btn--collapse .btn__label,
    .btn--collapse :global(.btn__trailing) {
      display: none;
    }
  }

  @media (prefers-reduced-transparency: reduce) {
    .btn--glass,
    .btn--ghost {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition:
        background-color var(--motion-quick) ease,
        color var(--motion-quick) ease;
    }
    .btn::after {
      animation: none !important;
    }
    .btn--busy :global(.icon:not(.btn__trailing)) {
      animation-duration: 2.4s;
    }
  }
</style>
