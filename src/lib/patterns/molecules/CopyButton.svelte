<script lang="ts">
  /**
   * CopyButton molecule — copies `value` to the clipboard and confirms at the control for two
   * seconds: a tick and "Copied" with a pinch of sprinkles, or a red "Copy failed" when the
   * browser refuses; both announced politely.
   * With `children` the given text itself becomes the trigger (e.g. click an ID to copy it),
   * styled as an inline link, and the outcome appears as a small note right after it; `oncopy`
   * reports the outcome to the page.
   *
   *   <CopyButton value={token} iconOnly />
   *   <CopyButton value={id}>{id}</CopyButton>
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';
  import { celebrate } from '../../utils/delight';

  interface Props {
    value: string;
    label?: string;
    copiedLabel?: string;
    failedLabel?: string;
    iconOnly?: boolean;
    size?: 'xs' | 'sm' | 'md';
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
    oncopy,
    children,
  }: Props = $props();

  let status = $state<'idle' | 'copied' | 'failed'>('idle');
  let timer: ReturnType<typeof setTimeout> | undefined;
  let root = $state<HTMLElement>();

  async function copy() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(value);
      const again = status === 'copied';
      status = 'copied';
      // One small burst per fresh copy, from the trigger itself.
      const trigger = root?.firstElementChild;
      if (trigger && !again) celebrate(trigger, 6);
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
  {:else}
    <Button
      {size}
      {iconOnly}
      variant={status === 'failed' ? 'danger' : 'secondary'}
      icon={status === 'copied' ? 'check' : status === 'failed' ? 'alert' : 'copy'}
      label={text}
      onclick={copy}
    />
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
