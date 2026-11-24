<script lang="ts">
  /**
   * Switch atom — an on/off toggle for settings that apply at once (`role="switch"`), in the
   * candy style: accent track, white knob that springs across and stretches while pressed.
   * For a choice that is submitted with a form, use a Checkbox.
   *
   *   <Switch label="Notifications" description="A daily summary." bind:checked={notify} />
   */
  interface Props {
    checked?: boolean;
    label?: string | undefined;
    /** Grey line under the label. */
    description?: string | undefined;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /** `ok` paints the track green, e.g. for "live" toggles. */
    tone?: 'accent' | 'ok';
    /** Accessible name when there is no visible `label`. */
    'aria-label'?: string | undefined;
    onchange?: ((checked: boolean) => void) | undefined;
  }

  let {
    checked = $bindable(false),
    label,
    description,
    disabled = false,
    size = 'md',
    tone = 'accent',
    'aria-label': ariaLabel,
    onchange,
  }: Props = $props();

  const id = $props.id();

  function toggle() {
    checked = !checked;
    onchange?.(checked);
  }
</script>

<div class="row row--{size} row--{tone}" class:disabled>
  <button
    type="button"
    role="switch"
    class="switch"
    aria-checked={checked}
    data-emit={checked && !disabled ? 'soft' : undefined}
    aria-labelledby={label ? `${id}-label` : undefined}
    aria-label={label ? undefined : ariaLabel}
    aria-describedby={description ? `${id}-desc` : undefined}
    {disabled}
    onclick={toggle}
  >
    <span class="thumb"></span>
  </button>
  {#if label}
    <span class="text">
      <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
      <span class="label" id="{id}-label" onclick={() => !disabled && toggle()}>{label}</span>
      {#if description}<span class="desc" id="{id}-desc">{description}</span>{/if}
    </span>
  {/if}
</div>

<style>
  .row {
    --_w: 44px;
    --_h: 26px;
    --_c: var(--accent);
    display: inline-flex;
    align-items: flex-start;
    gap: var(--space-3);
  }
  .row--sm {
    --_w: 34px;
    --_h: 20px;
  }
  .row--ok {
    --_c: var(--ok);
  }
  .switch {
    --_thumb: calc(var(--_h) - 4px);
    position: relative;
    flex-shrink: 0;
    width: var(--_w);
    height: var(--_h);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    box-shadow:
      inset 0 1px 2px rgba(12, 12, 22, 0.1),
      inset 0 0 0 0.5px rgba(12, 12, 22, 0.06);
    cursor: pointer;
    transition:
      background-color var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .row--md .switch {
    margin-top: -2px;
  }
  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: var(--_thumb);
    height: var(--_thumb);
    border-radius: var(--radius-pill);
    /* The knob stays white in both themes, like a physical part; lit from above. */
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0) 55%, rgba(12, 12, 22, 0.05)),
      var(--switch-thumb, #fff);
    box-shadow:
      0 2px 6px rgba(12, 12, 22, 0.2),
      0 0.5px 1px rgba(12, 12, 22, 0.18);
    /* A spring only on the knob: it is small, so it may overshoot and settle. */
    transition:
      transform var(--motion-base) var(--ease-spring),
      width var(--motion-quick) var(--ease-out);
  }
  /* Pressing stretches the knob towards where it will go — a gummy, not a lever. */
  .switch:active:not(:disabled) .thumb {
    width: calc(var(--_thumb) + 6px);
  }
  .switch[aria-checked='true'] {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 60%), var(--_c);
    box-shadow:
      inset 0 1px 2px rgba(12, 12, 22, 0.08),
      0 2px 8px color-mix(in srgb, var(--_c) 28%, transparent);
  }
  .switch[aria-checked='true'] .thumb {
    transform: translateX(calc(var(--_w) - var(--_thumb) - 4px));
  }
  .switch[aria-checked='true']:active:not(:disabled) .thumb {
    transform: translateX(calc(var(--_w) - var(--_thumb) - 10px));
  }
  .switch:hover:not(:disabled):not([aria-checked='true']) {
    background: var(--fill-off);
  }
  .switch:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .switch:disabled {
    cursor: default;
  }
  .disabled {
    opacity: var(--disabled-opacity);
  }
  .text {
    display: grid;
    gap: 1px;
  }
  .label {
    font-size: var(--fs-md);
    line-height: 1.4;
    color: var(--text);
    cursor: pointer;
  }
  .row:has(.desc) .label {
    font-weight: var(--fw-medium);
  }
  .row--sm .label {
    font-size: var(--fs-sm);
  }
  .disabled .label {
    cursor: default;
  }
  .desc {
    font-size: var(--fs-sm);
    line-height: 1.45;
    color: var(--text-3);
  }
  @media (prefers-reduced-motion: reduce) {
    .switch,
    .thumb {
      transition:
        background-color var(--motion-quick) var(--ease-out),
        transform var(--motion-quick) var(--ease-out);
    }
    .switch:active:not(:disabled) .thumb {
      width: var(--_thumb);
    }
    .switch[aria-checked='true']:active:not(:disabled) .thumb {
      transform: translateX(calc(var(--_w) - var(--_thumb) - 4px));
    }
  }
</style>
