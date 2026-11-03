<script lang="ts">
  /**
   * ResultPanel organism — the read-only output area of a tool (an answer, a translation, a
   * response): a header with title and status, then one of four states — `empty` (placeholder),
   * `loading` (overlay over the previous result), `ready` (children), `error` (message). With
   * `copyValue` it offers a copy button once ready. Errors use the danger colour.
   *
   *   <ResultPanel {status} title="Answer" copyValue={answer}>
   *     <Markdown source={answer} />
   *   </ResultPanel>
   */
  import type { Snippet } from 'svelte';
  import LoadingOverlay from '../atoms/LoadingOverlay.svelte';
  import Alert from '../molecules/Alert.svelte';
  import CopyButton from '../molecules/CopyButton.svelte';

  interface Props {
    status: 'empty' | 'loading' | 'ready' | 'error';
    title?: string | undefined;
    placeholder?: string;
    loadingLabel?: string;
    error?: string | undefined;
    /** Shown in the error state when `error` is empty. */
    errorFallback?: string;
    copyValue?: string | undefined;
    minHeight?: string;
    /** Right side of the header, e.g. a StatusText. */
    headerEnd?: Snippet | undefined;
    children?: Snippet | undefined;
  }

  let {
    status,
    title,
    placeholder = 'The result appears here.',
    loadingLabel = 'Working…',
    error,
    errorFallback = 'Something went wrong. Try again.',
    copyValue,
    minHeight = '10rem',
    headerEnd,
    children,
  }: Props = $props();
</script>

<section class="panel" aria-busy={status === 'loading' ? 'true' : undefined} aria-label={title}>
  {#if title || headerEnd || copyValue}
    <header>
      {#if title}<h2>{title}</h2>{/if}
      <span class="right">
        {@render headerEnd?.()}
        {#if copyValue && status === 'ready'}<CopyButton value={copyValue} iconOnly />{/if}
      </span>
    </header>
  {/if}
  <div class="body" style:min-height={minHeight}>
    {#if status === 'error'}
      <div class="error"><Alert message={error || errorFallback} /></div>
    {:else if status === 'empty'}
      <p class="placeholder">{placeholder}</p>
    {:else}
      {@render children?.()}
    {/if}
    <LoadingOverlay active={status === 'loading'} label={loadingLabel} />
  </div>
</section>

<style>
  .panel {
    min-width: 0;
    border-radius: var(--radius-card);
    border: 1px solid var(--layer-panel-border);
    background: var(--layer-panel-bg);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    box-shadow: var(--layer-panel-shadow);
    overflow: hidden;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    min-height: var(--control-lg);
    padding: var(--space-1) var(--space-3) var(--space-1) var(--space-5);
    border-bottom: 1px solid var(--border-strong);
  }
  h2 {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .right {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: auto;
  }
  .body {
    position: relative;
    padding: var(--space-4) var(--space-5);
    border-radius: 0 0 var(--radius-card) var(--radius-card);
  }
  .placeholder {
    color: var(--text-3);
    font-size: var(--fs-md);
  }
  /* Error text may be a multi-line message from a tool. */
  .error {
    white-space: pre-wrap;
  }
  @media (prefers-reduced-transparency: reduce) {
    .panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
