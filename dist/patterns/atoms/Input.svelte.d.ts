/**
   * Input atom — a single-line text field on the translucent input surface. Focus draws an
   * accent rim with a soft halo; `invalid` turns it red with a small polite head-shake. Heights
   * follow the control scale (sm 32 / md 36 / lg 44px), so fields line up with buttons and selects.
   *
   *   <Input type="email" placeholder="name@example.com" bind:value={email} />
   */
import type { HTMLInputAttributes } from 'svelte/elements';
interface Props extends Omit<HTMLInputAttributes, 'size' | 'class' | 'value'> {
    value?: string | number | null | undefined;
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    class?: string;
    element?: HTMLInputElement | undefined;
}
declare const Input: import("svelte").Component<Props, {}, "value" | "element">;
type Input = ReturnType<typeof Input>;
export default Input;
