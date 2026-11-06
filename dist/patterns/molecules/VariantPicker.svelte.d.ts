export interface VariantOption {
    value: string;
    label: string;
    /** A CSS colour: the option shows as a colour swatch. */
    color?: string | undefined;
    /** Sold out: shown struck through and skipped by the keyboard. */
    disabled?: boolean | undefined;
}
/**
 * VariantPicker molecule — pick one variant of a product: colour swatches or size pills, as a
 * radio group (arrow keys move and select, sold-out options are skipped). The heading shows
 * the group name with the chosen value: "Colour · Sage".
 *
 *   <VariantPicker label="Colour" bind:value options={[{ value: 'sage', label: 'Sage', color: '#9bb59a' }]} />
 */
interface Props {
    label: string;
    options: VariantOption[];
    value?: string | undefined;
    /** `swatch` for colours, `pill` for sizes; default: swatches when every option has a colour. */
    kind?: 'swatch' | 'pill' | undefined;
    /** Shows the chosen option's label next to the group name. */
    showValue?: boolean;
    size?: 'sm' | 'md';
    unavailableLabel?: string;
    onchange?: ((value: string) => void) | undefined;
}
declare const VariantPicker: import("svelte").Component<Props, {}, "value">;
type VariantPicker = ReturnType<typeof VariantPicker>;
export default VariantPicker;
