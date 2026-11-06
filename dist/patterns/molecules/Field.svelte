<script lang="ts">
  /**
   * Field molecule — a small grey label above a control (the filter bar's `.field`).
   * The control comes in as `children`, which receives the ids to wire up: put `id` on the
   * control (the label points at it), or `labelId` into its `aria-labelledby`; with an `error`,
   * add `errorId` to its `aria-describedby` and mark it `invalid`.
   *
   *   <Field label="E-mail" hint="Used for sign-in">
   *     {#snippet children({ id })}<Input {id} type="email" />{/snippet}
   *   </Field>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    /** Plain text or a snippet, e.g. with inline `<code>`. */
    hint?: string | Snippet | undefined;
    /** Validation message under the control, in the danger colour and announced. Wire `errorId`
     *  into the control's `aria-describedby` and set it invalid. */
    error?: string | undefined;
    required?: boolean;
    /** Renders the label as a `<span>` for controls a `<label for>` cannot name (groups). */
    group?: boolean;
    children: Snippet<[{ id: string; labelId: string; errorId: string; invalid: boolean }]>;
  }

  let { label, hint, error, required = false, group = false, children }: Props = $props();

  const uid = $props.id();
  const id = `${uid}-control`;
  const labelId = `${uid}-label`;
  const errorId = `${uid}-error`;
</script>

<div class="field">
  {#if group}
    <span class="label" id={labelId}
      >{label}{#if required}<span class="req" aria-hidden="true"> *</span>{/if}</span
    >
  {:else}
    <label class="label" id={labelId} for={id}
      >{label}{#if required}<span class="req" aria-hidden="true"> *</span>{/if}</label
    >
  {/if}
  {@render children({ id, labelId, errorId, invalid: !!error })}
  {#if error}<span class="error" id={errorId} role="alert">{error}</span>
  {:else if hint}<span class="hint"
      >{#if typeof hint === 'string'}{hint}{:else}{@render hint()}{/if}</span
    >{/if}
</div>

<style>
  .field {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    min-width: 0;
    gap: var(--space-1);
    align-content: start;
  }
  .label {
    padding-left: 0.1rem;
    font-size: var(--fs-xs);
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }
  .hint {
    padding-left: 0.1rem;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .hint :global(code) {
    padding: 0 0.3em;
    border-radius: var(--radius-xs);
    background: var(--fill-muted);
    font-family: var(--font-mono);
  }
  .error {
    padding-left: 0.1rem;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--danger);
    animation: bb-drop var(--motion-quick) var(--ease-out);
  }
  .req {
    color: var(--danger);
  }
  @media (prefers-reduced-motion: reduce) {
    .error {
      animation: none;
    }
  }
</style>
