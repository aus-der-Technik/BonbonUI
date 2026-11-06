<script lang="ts">
  /**
   * Divider atom — a hairline between sections, optionally with a centred caps label ("or").
   * Inside a Stack or Row it needs no margins: `spacing="none"` leaves the gap to the layout.
   *
   *   <Divider label="or" />
   */
  interface Props {
    label?: string | undefined;
    orientation?: 'horizontal' | 'vertical';
    /** Vertical margin of a horizontal divider. */
    spacing?: 'none' | 'sm' | 'md';
  }

  let { label, orientation = 'horizontal', spacing = 'md' }: Props = $props();
</script>

{#if orientation === 'vertical'}
  <span class="vertical" role="separator" aria-orientation="vertical"></span>
{:else if label}
  <div class="labelled spacing--{spacing}" role="separator"><span>{label}</span></div>
{:else}
  <hr class="spacing--{spacing}" />
{/if}

<style>
  hr {
    border: 0;
    border-top: 1px solid var(--border-strong);
    margin: var(--_m) 0;
  }
  .spacing--none {
    --_m: 0;
  }
  .spacing--sm {
    --_m: var(--space-2);
  }
  .spacing--md {
    --_m: var(--space-4);
  }
  .vertical {
    display: inline-block;
    align-self: stretch;
    width: 1px;
    min-height: 1em;
    background: var(--border-strong);
  }
  .labelled {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin: var(--_m) 0;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .labelled::before,
  .labelled::after {
    content: '';
    flex: 1;
    border-top: 1px solid var(--border-strong);
  }
</style>
