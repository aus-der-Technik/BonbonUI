<script lang="ts" module>
  export interface RadioOption<V extends string | number = string> {
    value: V;
    label: string;
    description?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts" generics="V extends string | number">
  /**
   * RadioGroup molecule — one-of-n radios under a legend, stacked or in a wrapping row.
   *
   *   <RadioGroup label="Plan" options={plans} bind:value={plan} />
   */
  import Radio from '../atoms/Radio.svelte';

  interface Props {
    label: string;
    options: RadioOption<V>[];
    value?: V | undefined;
    orientation?: 'vertical' | 'horizontal';
    onchange?: ((value: V) => void) | undefined;
  }

  let { label, options, value = $bindable(), orientation = 'vertical', onchange }: Props = $props();

  const name = $props.id();
</script>

<fieldset class="group group--{orientation}">
  <legend>{label}</legend>
  <div class="options">
    {#each options as option (option.value)}
      <Radio
        {name}
        value={option.value}
        label={option.label}
        description={option.description}
        disabled={option.disabled}
        group={value}
        onchange={() => {
          value = option.value;
          onchange?.(option.value);
        }}
      />
    {/each}
  </div>
</fieldset>

<style>
  .group {
    border: 0;
    min-width: 0;
  }
  legend {
    margin-bottom: var(--space-2);
    padding: 0 0 0 0.1rem;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .group--horizontal .options {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-5);
  }
</style>
