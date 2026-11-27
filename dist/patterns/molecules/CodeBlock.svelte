<script lang="ts">
  /**
   * CodeBlock molecule — preformatted monospace text (JSON payloads, tokens, curl commands)
   * on a soft inset panel, with an optional caption and a copy button. `secret` masks it until
   * revealed; `wrap` breaks long lines instead of scrolling.
   *
   *   <CodeBlock label="Request" code={'curl https://api.example.com/v1/items'} />
   */
  import Button from '../atoms/Button.svelte';
  import CopyButton from './CopyButton.svelte';

  interface Props {
    code: string;
    label?: string | undefined;
    copyable?: boolean;
    secret?: boolean;
    revealLabel?: string;
    hideLabel?: string;
    wrap?: boolean;
  }

  let {
    code,
    label,
    copyable = true,
    secret = false,
    revealLabel = 'Reveal',
    hideLabel = 'Hide',
    wrap = false,
  }: Props = $props();

  let revealed = $state(false);
  const shown = $derived(secret && !revealed ? '•'.repeat(Math.min(32, code.length)) : code);
</script>

<figure class="code">
  {#if label || copyable || secret}
    <figcaption>
      <span>{label ?? ''}</span>
      <span class="actions">
        {#if secret}
          <Button
            size="sm"
            icon="eye"
            label={revealed ? hideLabel : revealLabel}
            onclick={() => (revealed = !revealed)}
          />
        {/if}
        {#if copyable}<CopyButton value={code} />{/if}
      </span>
    </figcaption>
  {/if}
  <pre class:wrap><code>{shown}</code></pre>
</figure>

<style>
  .code {
    margin: 0;
    min-width: 0;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--editor-bg) 55%, transparent);
    box-shadow: var(--glass-inset);
    overflow: hidden;
  }
  figcaption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-md);
    padding: var(--space-1) var(--space-1) var(--space-1) var(--space-3);
    border-bottom: 1px solid var(--border-strong);
    background: var(--fill-subtle);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .actions {
    display: inline-flex;
    gap: var(--space-1);
    text-transform: none;
    letter-spacing: normal;
  }
  pre {
    margin: 0;
    padding: var(--space-3) var(--space-4);
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    line-height: 1.65;
    color: var(--text);
    tab-size: 2;
  }
  .wrap {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
</style>
