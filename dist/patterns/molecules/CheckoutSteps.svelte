<script lang="ts" module>
  import type { Step } from './Stepper.svelte';

  export type CheckoutStep = string | Step;
</script>

<script lang="ts">
  /**
   * CheckoutSteps molecule — the Stepper preset for a shop checkout: Cart → Shipping → Payment →
   * Done out of the box, steps as plain strings, finished steps clickable with `onstep`. For any
   * other flow use Stepper directly.
   *
   *   <CheckoutSteps current={1} onstep={(i) => (step = i)} />
   */
  import Stepper from './Stepper.svelte';

  interface Props {
    steps?: CheckoutStep[];
    /** Index of the current step (0-based). */
    current?: number;
    /** Makes finished steps buttons to go back to. */
    onstep?: ((index: number) => void) | undefined;
    label?: string;
  }

  let {
    steps = ['Cart', 'Shipping', 'Payment', 'Done'],
    current = 0,
    onstep,
    label = 'Checkout progress',
  }: Props = $props();

  const items = $derived(steps.map((s) => (typeof s === 'string' ? { label: s } : s)));
</script>

<Stepper steps={items} {current} {label} onselect={onstep} />
