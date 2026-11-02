<script lang="ts">
  /**
   * Checkbox atom — a candy checkbox (accent fill, a check mark that draws itself in),
   * optionally with its label. `tone="ok"` paints it green (e.g. a draft row that is ready), `danger` red (rows
   * marked for deletion). `indeterminate` shows a dash for "some selected".
   *
   *   <Checkbox label="Only with comments" bind:checked={onlyComments} />
   */
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'class' | 'checked' | 'children'> {
    checked?: boolean;
    indeterminate?: boolean;
    label?: string | undefined;
    /** Grey line under the label. */
    description?: string | undefined;
    /** `red` is the old name of `accent` and still works. */
    tone?: 'accent' | 'red' | 'ok' | 'danger';
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    label,
    description,
    tone = 'accent',
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const toneClass = $derived(tone === 'red' ? 'accent' : tone);
</script>

{#snippet box(cls: string)}
  <span class="box box--{toneClass} {cls}">
    <input type="checkbox" bind:checked bind:indeterminate {...rest} />
    <svg class="mark mark--check" viewBox="0 0 24 24" aria-hidden="true"
      ><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" /></svg
    >
    <svg class="mark mark--dash" viewBox="0 0 24 24" aria-hidden="true"
      ><path d="M6 12h12" pathLength="1" /></svg
    >
  </span>
{/snippet}

{#if label || children}
  <label class="check {extraClass}" class:check--described={description}>
    {@render box('')}
    <span class="text">
      <span class="label"
        >{#if children}{@render children()}{:else}{label}{/if}</span
      >
      {#if description}<span class="desc">{description}</span>{/if}
    </span>
  </label>
{:else}
  {@render box(extraClass)}
{/if}

<style>
  .check {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    min-height: var(--control-md);
    font-size: var(--fs-md);
    color: var(--text);
    cursor: pointer;
  }
  .check--described {
    align-items: flex-start;
  }
  .check--described .box {
    margin-top: 1px;
  }
  .check:has(input:disabled) {
    cursor: default;
    opacity: 0.5;
  }
  .text {
    display: grid;
    gap: 1px;
  }
  .label {
    line-height: 1.4;
  }
  .check--described .label {
    font-weight: var(--fw-medium);
  }
  .desc {
    font-size: var(--fs-sm);
    line-height: 1.45;
    color: var(--text-3);
  }
  .box {
    --_c: var(--accent);
    --_on: var(--on-accent);
    position: relative;
    display: inline-grid;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .box--ok {
    --_c: var(--ok);
    --_on: var(--on-success, #fff);
  }
  .box--danger {
    --_c: var(--danger);
    --_on: var(--on-danger, #fff);
  }
  input {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
    margin: 0;
    appearance: none;
    border: 1.5px solid var(--fill-off);
    border-radius: calc(var(--radius-xs) + 1px);
    background: var(--input-bg);
    box-shadow: inset 0 1px 1px rgba(12, 12, 22, 0.05);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  input:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--_c) 60%, transparent);
  }
  /* Jelly press — the box squishes and springs back. */
  input:active:not(:disabled) {
    transform: var(--press-squish);
  }
  input:checked,
  input:indeterminate {
    border-color: transparent;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 60%), var(--_c);
    box-shadow:
      0 2px 6px color-mix(in srgb, var(--_c) 32%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  input:disabled {
    cursor: default;
  }
  input:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .box--danger input:focus-visible {
    outline-color: var(--danger);
  }
  .mark {
    grid-area: 1 / 1;
    width: 14px;
    height: 14px;
    place-self: center;
    fill: none;
    stroke: var(--_on);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  /* Check-mark draw: the tick is a pen stroke that writes itself in once, then the mark settles
     with a small spring. Unchecking just fades — no reverse animation to watch. */
  .mark path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 0s linear var(--motion-quick);
  }
  input:checked:not(:indeterminate) ~ .mark--check,
  input:indeterminate ~ .mark--dash {
    opacity: 1;
    transform: none;
  }
  input:checked:not(:indeterminate) ~ .mark--check path,
  input:indeterminate ~ .mark--dash path {
    stroke-dashoffset: 0;
    transition: stroke-dashoffset var(--motion-base) var(--ease-out) 40ms;
  }
  @media (prefers-reduced-motion: reduce) {
    input,
    .mark,
    .mark path,
    input:checked ~ .mark path,
    input:indeterminate ~ .mark path {
      transition: opacity var(--motion-quick) ease;
    }
    .mark,
    .mark path {
      transform: none;
      stroke-dashoffset: 0;
    }
  }
</style>
