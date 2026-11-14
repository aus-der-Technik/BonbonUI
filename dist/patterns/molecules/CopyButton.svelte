<script lang="ts">
  /**
   * CopyButton molecule — copies `value` to the clipboard and confirms at the control for two
   * seconds: a tick and "Copied" with a pinch of sprinkles, or a red "Copy failed" when the
   * browser refuses; both announced politely.
   * With `children` the given text itself becomes the trigger (e.g. click an ID to copy it),
   * styled as an inline link, and the outcome appears as a small note right after it; `oncopy`
   * reports the outcome to the page.
   *
   * `value` may be a function, read at the moment of the click, for values that change while the
   * button is on screen (the link to the section in view). `variant` and `icon` dress the button
   * for where it sits: `ghost` with `icon="link"` is a floating "copy link" key. Icon-only, it
   * names itself and says the outcome in a tooltip (`hint`), so sighted users read "Copied" at
   * the control too. `sprinkles={false}` keeps a quiet surface quiet.
   *
   *   <CopyButton value={token} iconOnly />
   *   <CopyButton value={id}>{id}</CopyButton>
   *   <CopyButton value={() => location.href} variant="ghost" icon="link" iconOnly label="Copy link" />
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Tooltip from '../atoms/Tooltip.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';
  import type { IconName } from '../atoms/icons';
  import { celebrate } from '../../utils/delight';

  interface Props {
    /** What is copied; a function is read at the moment of the click. */
    value: string | (() => string);
    label?: string;
    copiedLabel?: string;
    failedLabel?: string;
    iconOnly?: boolean;
    size?: 'xs' | 'sm' | 'md';
    /** The button's look; `ghost` or `glass` float as glass inside a front layer. */
    variant?: 'secondary' | 'ghost' | 'glass' | 'plain' | 'soft';
    /** The icon before anything was copied, e.g. `link` for a "copy link" key. */
    icon?: IconName;
    /** Icon-only: a tooltip with the label, then the outcome. */
    hint?: boolean;
    tooltipPlacement?: 'top' | 'bottom';
    tooltipAlign?: 'center' | 'start' | 'end';
    /** A pinch of sprinkles on a fresh copy. */
    sprinkles?: boolean;
    oncopy?: ((ok: boolean) => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    value,
    label = 'Copy',
    copiedLabel = 'Copied',
    failedLabel = 'Copy failed',
    iconOnly = false,
    size = 'sm',
    variant = 'secondary',
    icon = 'copy',
    hint = true,
    tooltipPlacement = 'top',
    tooltipAlign = 'center',
    sprinkles = true,
    oncopy,
    children,
  }: Props = $props();

  let status = $state<'idle' | 'copied' | 'failed'>('idle');
  let timer: ReturnType<typeof setTimeout> | undefined;
  let root = $state<HTMLElement>();

  async function copy() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(typeof value === 'function' ? value() : value);
      const again = status === 'copied';
      status = 'copied';
      // One small burst per fresh copy, from the trigger itself.
      const trigger = root?.firstElementChild;
      if (sprinkles && trigger && !again) celebrate(trigger, 6);
    } catch {
      status = 'failed';
    }
    oncopy?.(status === 'copied');
    timer = setTimeout(() => (status = 'idle'), 2000);
  }

  $effect(() => () => clearTimeout(timer));

  const text = $derived(
    status === 'copied' ? copiedLabel : status === 'failed' ? failedLabel : label,
  );
</script>

{#snippet button()}
  <Button
    {size}
    {iconOnly}
    variant={status === 'failed' ? 'danger' : variant}
    icon={status === 'copied' ? 'check' : status === 'failed' ? 'alert' : icon}
    label={text}
    onclick={copy}
  />
{/snippet}

<span class="copy" bind:this={root}>
  {#if children}
    <button
      type="button"
      class="inline"
      class:copied={status === 'copied'}
      class:failed={status === 'failed'}
      title="{label}: {value}"
      onclick={copy}
    >
      {@render children()}
    </button>
    <!-- Feedback at the control: the live region alone would leave sighted users guessing. -->
    {#if status !== 'idle'}
      <span class="note note--{status}" aria-hidden="true">
        <Icon name={status === 'copied' ? 'check' : 'alert'} size={12} />{text}
      </span>
    {/if}
  {:else if iconOnly && hint}
    <Tooltip {text} placement={tooltipPlacement} align={tooltipAlign} describe={false}>
      {@render button()}
    </Tooltip>
  {:else}
    {@render button()}
  {/if}
  <VisuallyHidden><span aria-live="polite">{status === 'idle' ? '' : text}</span></VisuallyHidden>
</span>

<style>
  .inline {
    display: inline;
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    color: inherit;
    text-align: inherit;
    text-decoration: underline dotted;
    text-decoration-color: var(--accent-border);
    text-underline-offset: 3px;
    border-radius: var(--radius-xs);
    cursor: copy;
    transition:
      color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  .inline:active {
    background: var(--accent-soft);
  }
  .inline:hover {
    color: var(--accent-ink);
    background: var(--accent-faint);
  }
  .inline.copied {
    color: var(--ok);
    text-decoration-color: currentColor;
  }
  .inline:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
    box-shadow: var(--focus-halo);
  }
  .inline.failed {
    color: var(--danger);
    text-decoration-color: currentColor;
  }
  .copy {
    display: contents;
  }
  .note {
    display: inline-flex;
    align-items: center;
    gap: 0.2em;
    margin-left: var(--space-1);
    padding: 0 0.4em;
    border-radius: var(--radius-xs);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    white-space: nowrap;
    vertical-align: baseline;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .note--copied {
    background: var(--tint-ok);
    color: var(--ok-dark);
  }
  .note--failed {
    background: var(--tint-danger);
    color: var(--danger);
  }
  @media (prefers-reduced-motion: reduce) {
    .note {
      animation: none;
    }
  }
</style>
