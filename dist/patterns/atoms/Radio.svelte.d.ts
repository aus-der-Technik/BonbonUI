/**
   * Radio atom — one candy radio button (an accent disc whose centre dot pops in) with its label
   * and an optional grey description. Group them with RadioGroup, or bind several to one value:
   *
   *   <Radio name="plan" value="team" label="Team" bind:group={plan} />
   */
import type { HTMLInputAttributes } from 'svelte/elements';
interface Props extends Omit<HTMLInputAttributes, 'type' | 'class' | 'children'> {
    group?: string | number | undefined;
    value: string | number;
    label: string;
    description?: string | undefined;
}
declare const Radio: import("svelte").Component<Props, {}, "group">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
