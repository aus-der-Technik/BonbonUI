<script lang="ts">
  /**
   * CopyButton molecule — copies `value` to the clipboard and confirms with a tick for two
   * seconds ("Copied") with a pinch of sprinkles, announced politely; "Copy failed" when the
   * browser refuses.
   * With `children` the given text itself becomes the trigger (e.g. click an ID to copy it),
   * styled as an inline link; `oncopy` reports the outcome to the page.
   *
   *   <CopyButton value={token} iconOnly />
   *   <CopyButton value={id}>{id}</CopyButton>
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
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
  let live = $state<HTMLElement>();

  async function copy() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(value);
      const again = status === 'copied';
      status = 'copied';
      // The trigger sits right before the live region; one small burst per fresh copy.
      const trigger = live?.previousElementSibling;
      if (trigger && !again) celebrate(trigger, 6);
    } catch {
      status = 'failed';
    }
    oncopy?.(status === 'copied');
    timer = setTimeout(() => (status = 'idle'), 2000);
  }

  const text = $derived(
    status === 'copied' ? copiedLabel : status === 'failed' ? failedLabel : label,
  );
</script>

{#if children}
  <button
    type="button"
    class="inline"
    class:copied={status === 'copied'}
    title="{label}: {value}"
    onclick={copy}
  >
    {@render children()}
  </button>
{:else}
  <Button
    {size}
    {iconOnly}
    icon={status === 'copied' ? 'check' : 'copy'}
    label={text}
    onclick={copy}
  />
{/if}
<span class="sr-only" aria-live="polite" bind:this={live}>{status === 'idle' ? '' : text}</span>

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
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
