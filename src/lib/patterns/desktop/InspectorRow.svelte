<script lang="ts">
  /**
   * InspectorRow — one property: a label on the left, its value or control on the right
   * (they stack when the Inspector is narrow). Pass `for` with the control's id so a click on
   * the label focuses it and screen readers name the control.
   *
   *   <InspectorRow label="Created" value="12 Oct 2026" />
   *   <InspectorRow label="Name" for="name"><Input id="name" bind:value={name} /></InspectorRow>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    /** Plain text value (when there is no control). */
    value?: string | number | undefined;
    /** Id of the control the label belongs to. */
    for?: string | undefined;
    /** Grey help line under the control. */
    hint?: string | undefined;
    children?: Snippet | undefined;
  }

  let { label, value, for: htmlFor, hint, children }: Props = $props();
</script>

<div class="row">
  {#if htmlFor}
    <label class="label" for={htmlFor}>{label}</label>
  {:else}
    <span class="label">{label}</span>
  {/if}
  <div class="control">
    {#if children}{@render children()}{:else if value !== undefined}<span class="value"
        >{value}</span
      >{/if}
    {#if hint}<span class="hint">{hint}</span>{/if}
  </div>
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: minmax(5.5rem, 38%) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-3);
    padding: 0 var(--space-3);
  }
  .label {
    color: var(--text-2);
    font-size: var(--fs-sm);
    text-align: right;
  }
  .control {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .value {
    overflow-wrap: anywhere;
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .hint {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  /* Side by side down to a typical inspector width (~18rem); stacked below that. */
  @container inspector (max-width: 17rem) {
    .row {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-1);
    }
    .label {
      text-align: left;
    }
  }
</style>
