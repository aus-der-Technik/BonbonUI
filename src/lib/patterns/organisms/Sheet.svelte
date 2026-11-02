<script lang="ts">
  /**
   * Sheet organism — a full-height working card: a head with title, description and
   * tools (badges, toggles, filter), an optional loading bar and error, the body (a grid, a
   * chooser, a sign-in card…) filling the rest, and a footer line for counts and key hints.
   * Put it last in a `fill` Page and it takes all the room below the header.
   *
   *   <Sheet title="Products" about="Edit the catalogue in place." {tools} {footer}>
   *     <EditableGrid … />
   *   </Sheet>
   */
  import type { Snippet } from 'svelte';
  import Alert from '../molecules/Alert.svelte';
  import LoadingBar from '../atoms/LoadingBar.svelte';

  interface Props {
    title: string;
    about?: string | undefined;
    loading?: boolean;
    error?: string | undefined;
    tools?: Snippet | undefined;
    footer?: Snippet | undefined;
    children: Snippet;
  }

  let { title, about, loading = false, error, tools, footer, children }: Props = $props();

  const id = $props.id();
</script>

<section class="sheet" aria-labelledby="{id}-title">
  <div class="head">
    <div class="title">
      <h1 id="{id}-title">{title}</h1>
      {#if about}<p class="about">{about}</p>{/if}
    </div>
    {#if tools}<div class="tools">{@render tools()}</div>{/if}
  </div>
  <LoadingBar active={loading} />
  {#if error}<div class="error"><Alert message={error} /></div>{/if}
  <div class="body">{@render children()}</div>
  {#if footer}<div class="foot">{@render footer()}</div>{/if}
</section>

<style>
  .sheet {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--layer-panel-bg);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    border: 1px solid var(--layer-panel-border);
    border-radius: var(--radius-card);
    box-shadow: var(--layer-panel-shadow);
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-3) var(--space-4);
    padding: var(--space-4) var(--space-5) var(--space-3);
    flex-wrap: wrap;
  }
  .title {
    min-width: 0;
    flex: 1 1 20rem;
  }
  h1 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.3;
  }
  .about {
    margin-top: 2px;
    color: var(--text-3);
    font-size: var(--fs-sm);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 90ch;
  }
  .tools {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }
  .error {
    padding: 0 var(--space-5) var(--space-3);
  }
  .body {
    position: relative;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border-strong);
  }
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2) var(--space-4);
    flex-wrap: wrap;
    padding: var(--space-2) var(--space-5);
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
    border-top: 1px solid var(--border-strong);
    background: var(--fill-subtle);
  }
  @media (max-width: 700px) {
    .tools {
      width: 100%;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .sheet {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
