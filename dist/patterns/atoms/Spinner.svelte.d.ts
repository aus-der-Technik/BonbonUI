/**
 * Spinner atom — an indeterminate busy "comet" in the accent (inside a button it takes the
 * button's text colour), announced as "Loading". Pass `label=""` when it sits next to its own
 * text.
 *
 *   <Spinner size={16} label="Saving" />
 */
interface Props {
    size?: number;
    label?: string;
}
declare const Spinner: import("svelte").Component<Props, {}, "">;
type Spinner = ReturnType<typeof Spinner>;
export default Spinner;
