export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
/**
   * Select atom — a native `<select>` dressed like the other fields, with a soft chevron. Native,
   * so it gets the platform picker on phones for free.
   *
   *   <Select aria-label="Environment" bind:value={env} options={[{ value: 'prod', label: 'Production' }]} />
   */
import type { HTMLSelectAttributes } from 'svelte/elements';
interface Props extends Omit<HTMLSelectAttributes, 'class' | 'value' | 'size'> {
    value?: string;
    size?: 'sm' | 'md' | 'lg';
    options: SelectOption[];
    class?: string;
}
declare const Select: import("svelte").Component<Props, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
