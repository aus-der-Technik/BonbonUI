interface Props {
    /** The button's accessible name ("Change Mila"). */
    label: string;
    /** Opens the panel; `currentTarget` is the button to open it under. */
    onclick: (event: MouseEvent & {
        currentTarget: HTMLButtonElement;
    }) => void;
    /** Where it shows: `touch` screens only, also on `hover` of its row, or `always`. */
    show?: 'touch' | 'always' | 'hover';
    /** Dots stacked upright (⋮) instead of side by side. */
    vertical?: boolean;
}
declare const MoreButton: import("svelte").Component<Props, {}, "">;
type MoreButton = ReturnType<typeof MoreButton>;
export default MoreButton;
