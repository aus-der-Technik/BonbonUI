<script lang="ts">
  /**
   * Drawer organism — a liquid-glass panel that glides in from the side for a record's detail
   * or a form, without leaving the list. It floats a little off the viewport edges (full width
   * on phones). Native `<dialog>` (focus trap, Escape, top layer). It closes like every overlay:
   * Escape, the close button at the top end, or a click on the backdrop (`closeOnBackdrop`) —
   * a press that starts inside and is released beside it never counts.
   *
   *   <Drawer open={editing} title="Jane Doe" subtitle="jane.doe@example.com"
   *     onclose={() => (editing = false)}>…{#snippet footer()}…{/snippet}</Drawer>
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import { backdropClick } from '../../utils/overlay';

  interface Props {
    open: boolean;
    title: string;
    subtitle?: string | undefined;
    width?: string;
    /** The edge it slides in from. */
    side?: 'end' | 'start';
    closeLabel?: string;
    /** A click on the backdrop closes it. */
    closeOnBackdrop?: boolean;
    onclose: () => void;
    children: Snippet;
    footer?: Snippet | undefined;
  }

  let {
    open,
    title,
    subtitle,
    width = '32rem',
    side = 'end',
    closeLabel = 'Close',
    closeOnBackdrop = true,
    onclose,
    children,
    footer,
  }: Props = $props();

  const id = $props.id();
  let dialog: HTMLDialogElement;

  $effect(() => {
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  });
</script>

<dialog
  bind:this={dialog}
  class="drawer drawer--{side}"
  style:--width={width}
  aria-labelledby="{id}-title"
  onclose={() => open && onclose()}
  use:backdropClick={closeOnBackdrop ? onclose : undefined}
>
  {#if open}
    <div class="inner">
      <header>
        <div class="titles">
          <h2 id="{id}-title">{title}</h2>
          {#if subtitle}<p>{subtitle}</p>{/if}
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon="close"
          iconOnly
          label={closeLabel}
          onclick={onclose}
        />
      </header>
      <div class="body">{@render children()}</div>
      {#if footer}<footer>{@render footer()}</footer>{/if}
    </div>
  {/if}
</dialog>

<style>
  .drawer {
    --edge: var(--space-2);
    margin: var(--edge) var(--edge) var(--edge) auto;
    width: min(var(--width), calc(100vw - 2 * var(--edge)));
    max-width: none;
    height: calc(100dvh - 2 * var(--edge));
    max-height: none;
    padding: 0;
    overflow: hidden;
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    color: var(--text);
    background: var(--layer-front-bg), var(--glass-strong);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--shadow-dialog);
  }
  .drawer--start {
    margin: var(--edge) auto var(--edge) var(--edge);
  }
  .drawer[open] {
    animation: drawer-in var(--motion-slow) var(--ease-out);
  }
  .drawer--start[open] {
    animation-name: drawer-in-start;
  }
  /* One backdrop for every overlay (Dialog, Drawer, DetailPanel). */
  .drawer::backdrop {
    --overlay-blur: var(--blur-backdrop, var(--blur-glass));
    background: var(--backdrop);
    backdrop-filter: var(--overlay-blur);
    -webkit-backdrop-filter: var(--overlay-blur);
    animation: backdrop-in var(--motion-base) var(--ease-out);
  }
  .inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  header {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-5) var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border-strong);
  }
  .titles {
    flex: 1;
    min-width: 0;
  }
  h2 {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.25;
  }
  header p {
    margin-top: 2px;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: var(--space-5) var(--space-6);
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--border-strong);
  }
  @keyframes drawer-in {
    from {
      transform: translateX(32px);
      opacity: 0;
    }
  }
  @keyframes drawer-in-start {
    from {
      transform: translateX(-32px);
      opacity: 0;
    }
  }
  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
  }
  @media (max-width: 520px) {
    .drawer {
      --edge: 0px;
      border-radius: 0;
      border-width: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .drawer[open],
    .drawer::backdrop {
      animation: backdrop-in var(--motion-quick) linear;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .drawer {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--layer-front-bg), var(--bg);
    }
  }
</style>
