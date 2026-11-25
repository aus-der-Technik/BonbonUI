<script lang="ts">
  /**
   * FormSection organism — one block of a settings or edit form: title and explanation on the
   * left, the fields on the right (stacked below 760px). Optional `footer` for its own save.
   * Consecutive sections are divided by a hairline.
   *
   *   <FormSection title="Profile" description="Shown to everyone.">…fields…</FormSection>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    description?: string | undefined;
    children: Snippet;
    footer?: Snippet | undefined;
  }

  let { title, description, children, footer }: Props = $props();

  const id = $props.id();
</script>

<section class="section" aria-labelledby="{id}-title">
  <div class="intro">
    <h3 id="{id}-title">{title}</h3>
    {#if description}<p>{description}</p>{/if}
  </div>
  <div class="fields">
    {@render children()}
    {#if footer}<div class="footer">{@render footer()}</div>{/if}
  </div>
</section>

<style>
  .section {
    display: grid;
    grid-template-columns: minmax(12rem, 1fr) 2fr;
    gap: var(--space-4) var(--space-8);
    padding: var(--space-6) 0;
  }
  .section + :global(.section) {
    border-top: 1px solid var(--border-strong);
  }
  h3 {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  p {
    margin-top: var(--space-1);
    font-size: var(--fs-sm);
    line-height: 1.5;
    color: var(--text-3);
    max-width: 40ch;
  }
  .fields {
    display: grid;
    gap: var(--space-4);
    min-width: 0;
    max-width: 36rem;
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
  }
  @media (max-width: 760px) {
    .section {
      grid-template-columns: 1fr;
    }
  }
</style>
