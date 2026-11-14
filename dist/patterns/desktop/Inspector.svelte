<script lang="ts">
  /**
   * Inspector — the properties panel on the right of a desktop app: a header (title, subtitle,
   * an optional preview) above InspectorSections of InspectorRows (label + control). Labels and
   * controls line up in two columns; when the panel is narrow they stack.
   *
   *   <Inspector title="report.pdf" subtitle="PDF document · 2.4 MB">
   *     <InspectorSection title="General">
   *       <InspectorRow label="Kind" value="PDF document" />
   *       <InspectorRow label="Tags"><TagInput … /></InspectorRow>
   *     </InspectorSection>
   *   </Inspector>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string | undefined;
    subtitle?: string | undefined;
    /** A thumbnail or icon above the title. */
    preview?: Snippet | undefined;
    /** Buttons under the header. */
    actions?: Snippet | undefined;
    /** Accessible name when there is no title. */
    label?: string;
    /** Draws the panel's own glass; off inside a Window that already has one. */
    surface?: boolean;
    children?: Snippet | undefined;
  }

  let {
    title,
    subtitle,
    preview,
    actions,
    label = 'Inspector',
    surface = false,
    children,
  }: Props = $props();
</script>

<aside class="inspector" class:surface aria-label={title ?? label}>
  {#if preview || title}
    <header class="head">
      {#if preview}<div class="preview">{@render preview()}</div>{/if}
      {#if title}<h2>{title}</h2>{/if}
      {#if subtitle}<p>{subtitle}</p>{/if}
      {#if actions}<div class="actions">{@render actions()}</div>{/if}
    </header>
  {/if}
  {@render children?.()}
</aside>

<style>
  .inspector {
    container: inspector / inline-size;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
    color: var(--text);
    font-size: var(--fs-md);
  }
  .surface {
    padding: var(--space-3);
    border-radius: var(--radius-card);
    border: 1px solid var(--layer-panel-border);
    background: var(--layer-panel-bg);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: var(--space-4) var(--space-3) var(--space-3);
    text-align: center;
  }
  .preview {
    margin-bottom: var(--space-3);
  }
  h2 {
    margin: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .head p {
    margin: 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }
  @media (prefers-reduced-transparency: reduce) {
    .surface {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
